import type { EnvironmentConfig } from '@lens-social/env';
import { AuthenticateMutation, CurrentAuthenticationQuery } from '@lens-social/graphql';
import type { AuthenticateVariables } from '@lens-social/graphql';
import type { ActiveAuthentication } from '@lens-social/graphql';
import { ChallengeMutation, type ChallengeVariables } from '@lens-social/graphql';
import type { AuthenticationTokens } from '@lens-social/graphql';
import type { AuthenticationChallenge } from '@lens-social/graphql';
import { ResultAsync, never, okAsync, signatureFrom } from '@lens-social/types';
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
import { AuthenticationError, UnauthenticatedError, UnexpectedError } from './errors';

/**
 * A standardized data object.
 *
 * All queries should alias their results to `value` to ensure interoperability
 * with this client interface.
 */
type StandardData<T> = { value: T };

function takeValue<T>({ data }: OperationResult<StandardData<T> | undefined, AnyVariables>): T {
  return data?.value ?? never('Expected a value');
}

type BaseOptions = {
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
};

type AuthenticatedOptions = BaseOptions & {
  /**
   * The initial authentication tokens to use.
   */
  tokens: AuthenticationTokens;
};

export type ClientOptions = BaseOptions | AuthenticatedOptions;

export type SignMessage = (message: string) => Promise<string>;

export type SignInParams = ChallengeVariables & {
  signMessage: SignMessage;
};

export class Client<BlanketError = UnexpectedError> {
  protected readonly options: ClientOptions;

  protected readonly urql: UrqlClient;

  protected readonly logger: Logger;

  static create(options: BaseOptions): Client;
  static create(options: AuthenticatedOptions): AuthenticatedClient;
  static create(options: ClientOptions): Client | AuthenticatedClient {
    if ('tokens' in options) {
      return new AuthenticatedClient(options);
    }
    return new Client<UnexpectedError>(options);
  }

  protected constructor(options: ClientOptions) {
    this.options = options;

    this.logger = getLogger(Client.name);
    this.logger.setLevel(options.debug ? 'DEBUG' : 'SILENT');

    this.urql = createClient({
      url: options.environment.backend,
      exchanges: [
        mapExchange({
          onOperation: (operation: Operation) => {
            this.logger.debug(
              'Operation:',
              // biome-ignore lint/suspicious/noExplicitAny: This is a debug log
              (operation.query.definitions[0] as any)?.name?.value ?? 'Unknown',
            );
          },
        }),
        fetchExchange,
      ],
      fetchOptions: this.fetchOptions.bind(this, options),
    });
  }

  /**
   * Generate a new authentication challenge for the given account and app.
   */
  challenge({ request }: ChallengeVariables): ResultAsync<AuthenticationChallenge, BlanketError> {
    return this.mutation(ChallengeMutation, { request });
  }

  /**
   * Authenticate the user with the signed authentication challenge.
   */
  authenticate({
    request,
  }: AuthenticateVariables): ResultAsync<AuthenticatedClient, AuthenticationError | BlanketError> {
    return this.mutation(AuthenticateMutation, { request }).andThen((result) => {
      if (result.__typename === 'AuthenticationTokens') {
        return okAsync(new AuthenticatedClient({ ...this.options, tokens: result }));
      }
      return AuthenticationError.from(result.reason).asResultAsync<AuthenticatedClient>();
    });
  }

  signIn(
    params: SignInParams,
  ): ResultAsync<AuthenticatedClient, AuthenticationError | BlanketError> {
    return this.challenge(params)
      .map(async (challenge) => ({
        challenge,
        // TODO handle signing errors
        signature: await params.signMessage(challenge.text),
      }))
      .andThen(({ challenge, signature }) =>
        this.authenticate({
          request: {
            id: challenge.id,
            signature: signatureFrom(signature),
          },
        }),
      );
  }

  protected fetchOptions(options: ClientOptions): RequestInit {
    return {
      headers: {
        ...(options.origin ? { Origin: options.origin } : {}),
      },
    };
  }

  public query<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, BlanketError> {
    return this.resultFrom(this.urql.query(document, variables)).map(takeValue);
  }

  public mutation<TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, BlanketError> {
    return this.resultFrom(this.urql.mutation(document, variables)).map(takeValue);
  }

  protected resultFrom<TData, TVariables extends AnyVariables>(
    source: OperationResultSource<OperationResult<TData, TVariables>>,
  ): ResultAsync<OperationResult<TData, TVariables>, BlanketError> {
    return ResultAsync.fromPromise(source.toPromise(), (err: unknown) => {
      this.logger.error(err);
      return UnexpectedError.from(err) as BlanketError;
    });
  }

  // TODO
  // protected mapGraphQLErrors
}

/**
 * @privateRemarks Intentionally not exported.
 */
class AuthenticatedClient extends Client<UnauthenticatedError | UnexpectedError> {
  private readonly tokens: AuthenticationTokens;

  constructor(options: AuthenticatedOptions) {
    super(options);
    this.tokens = options.tokens;
  }

  /**
   * The current authentication credentials if available.
   */
  get credentials(): AuthenticationTokens {
    return this.tokens;
  }

  /**
   * Get the current authentication status.
   */
  currentAuthentication(): ResultAsync<
    ActiveAuthentication,
    UnauthenticatedError | UnexpectedError
  > {
    return this.query(CurrentAuthenticationQuery, {});
  }

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

  protected override fetchOptions(options: ClientOptions): RequestInit {
    const base = super.fetchOptions(options);
    return {
      ...base,
      headers: {
        ...base.headers,
        'x-access-token': this.tokens.accessToken,
        // Authorization: `Bearer ${this.tokens.accessToken}`,
      },
    };
  }

  private handleAuthentication<
    Data,
    Variables extends AnyVariables,
    Result extends OperationResult<Data, Variables>,
    TError extends UnauthenticatedError | UnexpectedError,
  >(result: Result): ResultAsync<Result, TError> {
    if (result.error) {
      // TODO detect the error type from extension's code
      return UnauthenticatedError.from(result.error).asResultAsync<Result>() as ResultAsync<
        Result,
        TError
      >;
    }
    return okAsync(result);
  }
}

export type { AuthenticatedClient };
