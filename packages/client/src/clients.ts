import { AuthenticateMutation, ChallengeMutation, RefreshMutation } from '@lens-protocol/graphql';
import type {
  AuthenticationChallenge,
  ChallengeRequest,
  SignedAuthChallenge,
  StandardData,
} from '@lens-protocol/graphql';
import type { Credentials, IStorage } from '@lens-protocol/storage';
import { createCredentialsStorage } from '@lens-protocol/storage';
import {
  ResultAsync,
  type TxHash,
  errAsync,
  invariant,
  okAsync,
  signatureFrom,
} from '@lens-protocol/types';
import {
  type AnyVariables,
  type Exchange,
  type OperationResult,
  type OperationResultSource,
  type TypedDocumentNode,
  type Client as UrqlClient,
  createClient,
  fetchExchange,
} from '@urql/core';
import { type Logger, getLogger } from 'loglevel';

import type { SwitchAccountRequest } from '@lens-protocol/graphql';
import { type AuthConfig, authExchange } from '@urql/exchange-auth';
import { type AuthenticatedUser, authenticatedUser } from './AuthenticatedUser';
import { switchAccount, transactionStatus } from './actions';
import type { ClientConfig } from './config';
import { type Context, type ContextFrom, configureContext } from './context';
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
import { delay } from './utils';

function takeValue<T>({
  data,
  error,
}: OperationResult<StandardData<T> | undefined, AnyVariables>): T {
  invariant(data, `Expected a value, got: ${error?.message}`);
  return data.value;
}

export type SignMessage = (message: string) => Promise<string>;

export type LoginParams = ChallengeRequest & {
  signMessage: SignMessage;
};

abstract class AbstractClient<TContext extends Context, TError> {
  protected readonly urql: UrqlClient;

  protected readonly logger: Logger;

  protected readonly credentials: IStorage<Credentials>;

  protected constructor(public readonly context: TContext) {
    this.credentials = createCredentialsStorage(context.storage, context.environment.name);

    this.logger = getLogger(this.constructor.name);
    this.logger.setLevel(context.debug ? 'DEBUG' : 'SILENT');

    this.urql = createClient({
      url: context.environment.backend,
      fetchOptions: {
        headers: {
          ...(this.context.origin ? { Origin: this.context.origin } : {}),
        },
      },
      exchanges: this.exchanges(),
    });
  }

  /**
   * Asserts that the client is a {@link PublicClient}.
   */
  public abstract isPublicClient(): this is PublicClient<TContext>;

  /**
   *  that the client is a {@link SessionClient}.
   */
  public abstract isSessionClient(): this is SessionClient<TContext>;

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

  protected exchanges(): Exchange[] {
    return [fetchExchange];
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
export class PublicClient<TContext extends Context = Context> extends AbstractClient<
  TContext,
  UnexpectedError
> {
  /**
   * The current session client.
   *
   * This could be the {@link PublicClient} itself if the user is not authenticated, or a {@link SessionClient} if the user is authenticated.
   */
  public currentSession: PublicClient<TContext> | SessionClient<TContext> = this;

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
  static create<TConfig extends ClientConfig>(
    options: TConfig,
  ): PublicClient<ContextFrom<TConfig>> {
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
  ): ResultAsync<SessionClient<TContext>, AuthenticationError | UnexpectedError> {
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
    SessionClient<TContext>,
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
  resumeSession(): ResultAsync<SessionClient<TContext>, UnauthenticatedError> {
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
  public override isPublicClient(): this is PublicClient<TContext> {
    return true;
  }

  /**
   * {@inheritDoc AbstractClient.isSessionClient}
   */
  public override isSessionClient(): this is SessionClient<TContext> {
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
class SessionClient<TContext extends Context = Context> extends AbstractClient<
  TContext,
  UnauthenticatedError | UnexpectedError
> {
  public get parent(): PublicClient<TContext> {
    return this._parent;
  }

  constructor(private readonly _parent: PublicClient<TContext>) {
    super(_parent.context);
    _parent.currentSession = this;
  }

  /**
   * The current authentication tokens if available.
   *
   * @internal
   */
  getCredentials(): ResultAsync<Credentials | null, UnexpectedError> {
    return ResultAsync.fromPromise(this.credentials.get(), (err) => UnexpectedError.from(err));
  }

  /**
   * The AuthenticatedUser associated with the current session.
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
  public override isPublicClient(): this is PublicClient<TContext> {
    return false;
  }

  /**
   * {@inheritDoc AbstractClient.isSessionClient}
   */
  public override isSessionClient(): this is SessionClient<TContext> {
    return true;
  }

  /**
   * Switch authenticated account to a new account.
   *
   * You MUST be authenticated as Onboarding User, Account Owner, or Account Manager to be able to switch.
   * The signer associated with the current session MUST be the owner or a manager of the account.
   *
   * @returns The updated SessionClient if the switch was successful.
   */
  switchAccount(
    request: SwitchAccountRequest,
  ): ResultAsync<
    SessionClient<TContext>,
    AuthenticationError | UnauthenticatedError | UnexpectedError
  > {
    return switchAccount(this, request)
      .andThen((result) => {
        if (result.__typename === 'AuthenticationTokens') {
          return okAsync(result);
        }
        return AuthenticationError.from(result.reason).asResultAsync();
      })
      .map(async (tokens) => {
        await this.credentials.set(tokens);
        return new SessionClient(this.parent);
      });
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

  protected override exchanges(): Exchange[] {
    return [
      authExchange(async (utils): Promise<AuthConfig> => {
        let credentials = await this.getCredentials().unwrapOr(null);

        return {
          addAuthToOperation: (operation) => {
            if (!credentials) return operation;

            return utils.appendHeaders(operation, {
              Authorization: `Bearer ${credentials.accessToken}`,
            });
          },

          didAuthError: (error) => hasExtensionCode(error, GraphQLErrorCode.UNAUTHENTICATED),

          refreshAuth: async () => {
            const result = await utils.mutate(RefreshMutation, {
              request: {
                refreshToken: credentials?.refreshToken,
              },
            });

            if (result.data) {
              switch (result.data.value.__typename) {
                case 'AuthenticationTokens':
                  credentials = result.data?.value;
                  await this.credentials.set(result.data?.value);
                  break;

                case 'ForbiddenError':
                  throw AuthenticationError.from(result.data.value.reason);

                default:
                  throw AuthenticationError.from(
                    `Unsupported refresh token response ${result.data.value}`,
                  );
              }
            }
          },
        };
      }),
      fetchExchange,
    ];
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
export type AnyClient<TContext extends Context = Context> =
  | PublicClient<TContext>
  | SessionClient<TContext>;
