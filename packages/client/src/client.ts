import type { EnvironmentConfig } from '@lens-social/env';
import { AuthenticateMutation, ChallengeMutation } from '@lens-social/graphql';
import type {
  AuthenticateVariables,
  AuthenticationChallenge,
  AuthenticationTokens,
  ChallengeVariables,
} from '@lens-social/graphql';
import type { Credentials, IStorage, IStorageProvider } from '@lens-social/storage';
import { InMemoryStorageProvider, createCredentialsStorage } from '@lens-social/storage';
import { ResultAsync, errAsync, never, okAsync, signatureFrom } from '@lens-social/types';
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

import {
  AuthenticationError,
  GraphQLErrorCode,
  SigningError,
  UnauthenticatedError,
  UnexpectedError,
  hasExtensionCode,
} from './errors';

/**
 * A standardized data object.
 *
 * All GQL operations should alias their results to `value` to ensure interoperability
 * with this client interface.
 */
type StandardData<T> = { value: T };

function takeValue<T>({ data }: OperationResult<StandardData<T> | undefined, AnyVariables>): T {
  return data?.value ?? never('Expected a value');
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

export class Client<TError = UnexpectedError> {
  protected readonly context: ClientContext;

  protected readonly urql: UrqlClient;

  protected readonly logger: Logger;

  protected readonly credentials: IStorage<Credentials>;

  static create(options: ClientOptions): Client {
    return new Client(options);
  }

  protected constructor(options: ClientOptions) {
    this.context = {
      environment: options.environment,
      cache: options.cache ?? false,
      debug: options.debug ?? false,
      origin: options.origin,
      storage: options.storage ?? new InMemoryStorageProvider(),
    };

    this.credentials = createCredentialsStorage(this.context.storage, options.environment.name);

    this.logger = getLogger(Client.name);
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
   * Generate a new authentication challenge for the given account and app.
   */
  challenge({ request }: ChallengeVariables): ResultAsync<AuthenticationChallenge, TError> {
    return this.mutation(ChallengeMutation, { request });
  }

  /**
   * Authenticate the user with the signed authentication challenge.
   */
  authenticate({
    request,
  }: AuthenticateVariables): ResultAsync<SessionClient, AuthenticationError | TError> {
    return this.mutation(AuthenticateMutation, { request })
      .andThen((result) => {
        if (result.__typename === 'AuthenticationTokens') {
          return okAsync(result);
        }
        return AuthenticationError.from(result.reason).asResultAsync<AuthenticationTokens>();
      })
      .map(async (tokens) => {
        await this.credentials.set(tokens);
        return new SessionClient(this.context);
      });
  }

  login(
    params: LoginParams,
  ): ResultAsync<SessionClient, AuthenticationError | SigningError | TError> {
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

  resumeSession(): ResultAsync<SessionClient, UnauthenticatedError> {
    return ResultAsync.fromSafePromise(this.credentials.get()).andThen((credentials) => {
      if (!credentials) {
        return new UnauthenticatedError('No credentials found').asResultAsync<SessionClient>();
      }
      return okAsync(new SessionClient(this.context));
    });
  }

  protected fetchOptions(): RequestInit | Promise<RequestInit> {
    return {
      headers: {
        ...(this.context.origin ? { Origin: this.context.origin } : {}),
      },
    };
  }

  public query<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, TError> {
    return this.resultFrom(this.urql.query(document, variables)).map(takeValue);
  }

  public mutation<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, TError> {
    return this.resultFrom(this.urql.mutation(document, variables)).map(takeValue);
  }

  protected resultFrom<TData, TVariables extends AnyVariables>(
    source: OperationResultSource<OperationResult<TData, TVariables>>,
  ): ResultAsync<OperationResult<TData, TVariables>, TError> {
    return ResultAsync.fromPromise(source.toPromise(), (err: unknown) => {
      this.logger.error(err);
      return UnexpectedError.from(err) as TError;
    });
  }
}

/**
 * @privateRemarks Intentionally not exported.
 */
class SessionClient extends Client<UnauthenticatedError | UnexpectedError> {
  /**
   * The current authentication credentials if available.
   */
  // get credentials(): AuthenticationTokens {
  //   return this.tokens;
  // }

  override query<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, UnauthenticatedError | UnexpectedError> {
    return this.resultFrom(this.urql.query(document, variables))
      .andThen(this.handleAuthentication)
      .map(takeValue);
  }

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
        return UnauthenticatedError.from(result.error).asResultAsync<Result>();
      }
      return UnexpectedError.from(result.error).asResultAsync<Result>();
    }
    return okAsync(result);
  }
}

export type { SessionClient };
