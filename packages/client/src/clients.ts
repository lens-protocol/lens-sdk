import type { EnvironmentConfig } from '@lens-protocol/env';
import { AuthenticateMutation, ChallengeMutation } from '@lens-protocol/graphql';
import type {
  AuthenticationChallenge,
  ChallengeRequest,
  SignedAuthChallenge,
} from '@lens-protocol/graphql';
import type { Credentials, IStorage, IStorageProvider } from '@lens-protocol/storage';
import { InMemoryStorageProvider, createCredentialsStorage } from '@lens-protocol/storage';
import {
  ResultAsync,
  type TxHash,
  errAsync,
  invariant,
  never,
  okAsync,
  signatureFrom,
} from '@lens-protocol/types';
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

import { type AuthenticatedUser, authenticatedUser } from './AuthenticatedUser';
import { transactionStatus } from './actions';
import { configureContext } from './context';
import {
  AuthenticationError,
  GraphQLErrorCode,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  hasExtensionCode,
} from './errors';
import { decodeIdToken } from './tokens';
import type { StandardData } from './types';
import { delay } from './utils';

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

export type LoginParams = ChallengeRequest & {
  signMessage: SignMessage;
};

abstract class AbstractClient<TError> {
  protected readonly urql: UrqlClient;

  protected readonly logger: Logger;

  protected readonly credentials: IStorage<Credentials>;

  protected constructor(public readonly context: ClientContext) {
    this.credentials = createCredentialsStorage(context.storage, context.environment.name);

    this.logger = getLogger(this.constructor.name);
    this.logger.setLevel(context.debug ? 'DEBUG' : 'SILENT');

    this.urql = createClient({
      url: context.environment.backend,
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
    return new PublicClient(configureContext(options));
  }

  /**
   * Generate a new authentication challenge for the given account and app.
   */
  challenge(request: ChallengeRequest): ResultAsync<AuthenticationChallenge, UnexpectedError> {
    return this.mutation(ChallengeMutation, { request });
  }

  /**
   * Authenticate the user with the signed authentication challenge.
   */
  authenticate(
    request: SignedAuthChallenge,
  ): ResultAsync<SessionClient, AuthenticationError | UnexpectedError> {
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

  /**
   * Log in into Lens.
   *
   * @param params - The login parameters.
   * @returns The SessionClient if the login was successful.
   */
  login({
    signMessage,
    ...request
  }: LoginParams): ResultAsync<
    SessionClient,
    AuthenticationError | SigningError | UnexpectedError
  > {
    return this.challenge(request)
      .map(async (challenge) => ({
        challenge,
        signature: await ResultAsync.fromPromise(signMessage(challenge.text), (err) =>
          SigningError.from(err),
        ),
      }))
      .andThen(({ challenge, signature }) => {
        if (signature.isErr()) {
          return errAsync(signature.error);
        }

        return this.authenticate({
          id: challenge.id,
          signature: signatureFrom(signature.value),
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
  getAuthenticatedUser(): ResultAsync<AuthenticatedUser, UnexpectedError> {
    return this.getCredentials().andThen((credentials) => {
      if (!credentials) {
        return UnexpectedError.from('No credentials found').asResultAsync();
      }

      const claims = decodeIdToken(credentials.idToken);

      if (claims.isErr()) {
        return claims.error.asResultAsync();
      }

      return authenticatedUser(claims.value);
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

  /**
   * Given a transaction hash, wait for the transaction to be either confirmed or rejected by the Lens API indexer.
   *
   * @param hash - The transaction hash to wait for.
   * @returns The transaction hash if the transaction was confirmed or an error if the transaction was rejected.
   */
  readonly waitForTransaction = (
    txHash: TxHash,
  ): ResultAsync<TxHash, TransactionIndexingError | UnexpectedError> => {
    return ResultAsync.fromPromise(this.pollTransactionStatus(txHash), (err) => {
      if (err instanceof TransactionIndexingError || err instanceof UnexpectedError) {
        return err;
      }
      return UnexpectedError.from(err);
    });
  };

  protected async pollTransactionStatus(txHash: TxHash): Promise<TxHash> {
    const startedAt = Date.now();

    while (Date.now() - startedAt < this.context.environment.indexingTimeout) {
      const result = await transactionStatus(this, { txHash });

      if (result.isErr()) {
        throw UnexpectedError.from(result.error);
      }

      switch (result.value.__typename) {
        case 'FinishedTransactionStatus':
          return txHash;

        case 'FailedTransactionStatus':
          throw TransactionIndexingError.from(result.value.reason);

        case 'PendingTransactionStatus':
        case 'NotIndexedYetStatus':
          await delay(this.context.environment.pollingInterval);
          break;
      }
    }
    throw TransactionIndexingError.from(`Timeout waiting for transaction ${txHash}`);
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
