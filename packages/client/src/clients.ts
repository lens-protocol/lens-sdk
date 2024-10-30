import type { EnvironmentConfig } from '@lens-social/env';
import { AuthenticateMutation, ChallengeMutation } from '@lens-social/graphql';
import type {
  AuthenticateVariables,
  AuthenticationChallenge,
  ChallengeVariables,
} from '@lens-social/graphql';
import type { Credentials, IStorage, IStorageProvider } from '@lens-social/storage';
import { InMemoryStorageProvider, createCredentialsStorage } from '@lens-social/storage';
import {
  type Result,
  ResultAsync,
  errAsync,
  evmAddress,
  invariant,
  never,
  okAsync,
  signatureFrom,
} from '@lens-social/types';
import {
  type AnyVariables,
  type Operation,
  type OperationResult,
  type OperationResultSource,
  type TypedDocumentNode,
  type Client as UrqlClient,
  createClient,
  fetchExchange,
  mapExchange,
} from '@urql/core';
import { type Logger, getLogger } from 'loglevel';

import type { EvmAddress } from '@lens-social/types';
import {
  AuthenticationError,
  GraphQLErrorCode,
  SigningError,
  UnauthenticatedError,
  UnexpectedError,
  hasExtensionCode,
} from './errors';
import { decodeIdToken } from './tokens';

/**
 * A standardized data object.
 *
 * All GQL operations should alias their results to `value` to ensure interoperability
 * with this client interface.
 */
export type StandardData<T> = { value: T };

function takeValue<T>({
  data,
  error,
}: OperationResult<StandardData<T> | undefined, AnyVariables>): T {
  invariant(data, `Expected a value, got: ${error?.message}`);
  return data.value;
}

/**
 * The options to configure the client.
 */
export type ClientOptions = {
  /**
   * The environment configuration to use (e.g. `mainnet`, `testnet`).
   */
  environment: EnvironmentConfig;
  /**
   * Whether to enable caching.
   *
   * @defaultValue `false`
   */
  cache?: boolean;
  /**
   * Whether to enable debug mode.
   *
   * @defaultValue `false`
   */
  debug?: boolean;
  /**
   * The URL origin of the client.
   *
   * Use this to set the `Origin` header for requests from non-browser environments.
   */
  origin?: string;

  /**
   * The storage provider to use.
   *
   * @defaultValue {@link InMemoryStorageProvider}
   */
  storage?: IStorageProvider;
};

/**
 * @internal
 */
type ClientContext = {
  environment: EnvironmentConfig;
  cache: boolean;
  debug: boolean;
  origin?: string;
  storage: IStorageProvider;
};

export type SignMessage = (message: string) => Promise<string>;

export type LoginParams = ChallengeVariables & {
  signMessage: SignMessage;
};

abstract class AbstractClient<TError> {
  public readonly context: ClientContext;

  protected readonly urql: UrqlClient;

  protected readonly logger: Logger;

  protected readonly credentials: IStorage<Credentials>;

  protected constructor(options: ClientOptions) {
    this.context = {
      environment: options.environment,
      cache: options.cache ?? false,
      debug: options.debug ?? false,
      origin: options.origin,
      storage: options.storage ?? new InMemoryStorageProvider(),
    };

    this.credentials = createCredentialsStorage(this.context.storage, options.environment.name);

    this.logger = getLogger(this.constructor.name);
    this.logger.setLevel(options.debug ? 'DEBUG' : 'SILENT');

    this.urql = createClient({
      url: options.environment.backend,
      exchanges: [
        mapExchange({
          onOperation: async (operation: Operation) => {
            this.logger.debug(
              'Operation:',
              // biome-ignore lint/suspicious/noExplicitAny: This is a debug log
              (operation.query.definitions[0] as any)?.name?.value ?? 'Unknown',
            );
            return {
              ...operation,
              context: {
                ...operation.context,
                fetchOptions: await this.fetchOptions(),
              },
            };
          },
        }),
        fetchExchange,
      ],
    });
  }

  /**
   * Asserts that the client is a {@link PublicClient}.
   */
  public abstract isPublicClient(): this is PublicClient;

  /**
   *  that the client is a {@link SessionClient}.
   */
  public abstract isSessionClient(): this is SessionClient;

  public abstract query<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, TError | UnexpectedError>;

  public mutation<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, TError | UnexpectedError> {
    return this.resultFrom(this.urql.mutation(document, variables)).map(takeValue);
  }

  protected fetchOptions(): RequestInit | Promise<RequestInit> {
    return {
      headers: {
        ...(this.context.origin ? { Origin: this.context.origin } : {}),
      },
    };
  }

  protected resultFrom<TData, TVariables extends AnyVariables>(
    source: OperationResultSource<OperationResult<TData, TVariables>>,
  ): ResultAsync<OperationResult<TData, TVariables>, TError | UnexpectedError> {
    return ResultAsync.fromPromise(source.toPromise(), (err: unknown) => {
      this.logger.error(err);
      return UnexpectedError.from(err);
    }).andThen((result) => {
      if (result.error?.networkError) {
        return errAsync(UnexpectedError.from(result.error.networkError));
      }
      return okAsync(result);
    });
  }
}

/**
 * A client to interact with the public access queries and mutations of the Lens GraphQL API.
 */
export class PublicClient extends AbstractClient<UnexpectedError> {
  /**
   * The current session client.
   *
   * This could be the {@link PublicClient} itself if the user is not authenticated, or a {@link SessionClient} if the user is authenticated.
   */
  public currentSession: PublicClient | SessionClient = this;

  /**
   * Create a new instance of the {@link PublicClient}.
   *
   * ```ts
   * const client = PublicClient.create({
   *   environment: mainnet,
   *   origin: 'http://example.com',
   * });
   * ```
   *
   * @param options - The options to configure the client.
   * @returns The new instance of the client.
   */
  static create(options: ClientOptions): PublicClient {
    return new PublicClient(options);
  }

  /**
   * Generate a new authentication challenge for the given account and app.
   */
  challenge({
    request,
  }: ChallengeVariables): ResultAsync<AuthenticationChallenge, UnexpectedError> {
    return this.mutation(ChallengeMutation, { request });
  }

  /**
   * Authenticate the user with the signed authentication challenge.
   */
  authenticate({
    request,
  }: AuthenticateVariables): ResultAsync<SessionClient, AuthenticationError | UnexpectedError> {
    return this.mutation(AuthenticateMutation, { request })
      .andThen((result) => {
        if (result.__typename === 'AuthenticationTokens') {
          return okAsync(result);
        }
        return AuthenticationError.from(result.reason).asResultAsync();
      })
      .map(async (tokens) => {
        await this.credentials.set(tokens);
        return new SessionClient(this);
      });
  }

  login(
    params: LoginParams,
  ): ResultAsync<SessionClient, AuthenticationError | SigningError | UnexpectedError> {
    return this.challenge(params)
      .map(async (challenge) => ({
        challenge,
        signature: await ResultAsync.fromPromise(params.signMessage(challenge.text), (err) =>
          SigningError.from(err),
        ),
      }))
      .andThen(({ challenge, signature }) => {
        if (signature.isErr()) {
          return errAsync(signature.error);
        }

        return this.authenticate({
          request: {
            id: challenge.id,
            signature: signatureFrom(signature.value),
          },
        });
      });
  }

  /**
   * Resume an instance of the SessionClient from the credentials in storage.
   *
   * @returns The session client if available.
   */
  resumeSession(): ResultAsync<SessionClient, UnauthenticatedError> {
    return ResultAsync.fromSafePromise(this.credentials.get()).andThen((credentials) => {
      if (!credentials) {
        return new UnauthenticatedError('No credentials found').asResultAsync();
      }
      return okAsync(new SessionClient(this));
    });
  }

  /**
   * {@inheritDoc AbstractClient.isPublicClient}
   */
  public override isPublicClient(): this is PublicClient {
    return true;
  }

  /**
   * {@inheritDoc AbstractClient.isSessionClient}
   */
  public override isSessionClient(): this is SessionClient {
    return false;
  }

  /**
   * Execute a GraphQL query operation.
   *
   * @param document - The GraphQL document to execute.
   * @param variables - The variables to pass to the operation.
   * @returns The result of the operation.
   */
  public query<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, UnexpectedError> {
    return this.resultFrom(this.urql.query(document, variables)).map(takeValue);
  }

  /**
   * Execute a GraphQL mutation operation.
   *
   * @param document - The GraphQL document to execute.
   * @param variables - The variables to pass to the operation.
   * @returns The result of the operation.
   */
  public mutation<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, UnexpectedError> {
    return this.resultFrom(this.urql.mutation(document, variables)).map(takeValue);
  }
}

/**
 * Represents an authenticated entity within the system, containing key addresses for identity and authorization.
 */
export type Principal = {
  /**
   * The Account address.
   * */
  account: EvmAddress;
  /**
   * The signer address.
   *
   * If different from the account address, this is the address of an Account Manager for it.
   */
  signer: EvmAddress;
};

/**
 * The client to interact with the protected queries and mutations of the Lens GraphQL API.
 *
 * @privateRemarks Intentionally not exported.
 */
class SessionClient extends AbstractClient<UnauthenticatedError | UnexpectedError> {
  public get parent(): PublicClient {
    return this._parent;
  }

  constructor(private readonly _parent: PublicClient) {
    super(_parent.context);
    _parent.currentSession = this;
  }

  /**
   * The current authentication tokens if available.
   */
  getCredentials(): ResultAsync<Credentials | null, UnexpectedError> {
    return ResultAsync.fromPromise(this.credentials.get(), (err) => UnexpectedError.from(err));
  }

  /**
   * @internal
   */
  getPrincipal(): ResultAsync<Principal, UnexpectedError> {
    return this.getCredentials().andThen((credentials) => {
      if (!credentials) {
        return UnexpectedError.from('No credentials found').asResultAsync();
      }

      const claims = decodeIdToken(credentials.identityToken);

      if (claims.isErr()) {
        return claims.error.asResultAsync();
      }

      return okAsync({
        account: claims.value.act ? claims.value.act.sub : claims.value.sub,
        signer: claims.value.sub,
      });
    });
  }

  /**
   * {@inheritDoc AbstractClient.isPublicClient}
   */
  public override isPublicClient(): this is PublicClient {
    return false;
  }

  /**
   * {@inheritDoc AbstractClient.isSessionClient}
   */
  public override isSessionClient(): this is SessionClient {
    return true;
  }

  /**
   * Execute a GraphQL query operation.
   *
   * It will automatically handle authentication errors and re-fresh credentials if necessary.
   *
   * @param document - The GraphQL document to execute.
   * @param variables - The variables to pass to the operation.
   * @returns The result of the operation.
   */

  override query<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, UnexpectedError>;
  override query<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, UnauthenticatedError | UnexpectedError> {
    return this.resultFrom(this.urql.query(document, variables))
      .andThen(this.handleAuthentication)
      .map(takeValue);
  }

  /**
   * Execute a GraphQL mutation operation.
   *
   * It will automatically handle authentication errors and re-fresh credentials if necessary.
   *
   * @param document - The GraphQL document to execute.
   * @param variables - The variables to pass to the operation.
   * @returns The result of the operation.
   */
  override mutation<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, UnauthenticatedError | UnexpectedError> {
    return this.resultFrom(this.urql.mutation(document, variables))
      .andThen(this.handleAuthentication)
      .map(takeValue);
  }

  protected override async fetchOptions(): Promise<RequestInit> {
    const base = await super.fetchOptions();
    const credentials = (await this.credentials.get()) ?? never('No credentials found');

    return {
      ...base,
      headers: {
        ...base.headers,
        'x-access-token': credentials.accessToken,
        // Authorization: `Bearer ${this.tokens.accessToken}`,
      },
    };
  }

  private handleAuthentication<
    Data,
    Variables extends AnyVariables,
    Result extends OperationResult<Data, Variables>,
  >(result: Result): ResultAsync<Result, UnauthenticatedError | UnexpectedError> {
    if (result.error) {
      if (hasExtensionCode(result.error, GraphQLErrorCode.UNAUTHENTICATED)) {
        return UnauthenticatedError.fromCombinedError(result.error).asResultAsync();
      }
      return UnexpectedError.from(result.error).asResultAsync();
    }
    return okAsync(result);
  }
}

export type { SessionClient };

/**
 * Any client that can be used to interact with the Lens GraphQL API.
 */
export type AnyClient = PublicClient | SessionClient;
