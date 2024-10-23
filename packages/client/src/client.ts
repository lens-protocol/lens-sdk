import type { EnvironmentConfig } from '@lens-social/env';
import { AuthenticateMutation, CurrentAuthenticationQuery } from '@lens-social/graphql';
import type { AuthenticateVariables } from '@lens-social/graphql';
import type { ActiveAuthentication } from '@lens-social/graphql';
import { ChallengeMutation, type ChallengeVariables } from '@lens-social/graphql';
import type { AuthenticateResult } from '@lens-social/graphql';
import type { AuthenticationTokens } from '@lens-social/graphql';
import type { AuthenticationChallenge } from '@lens-social/graphql';
import { ResultAsync, type URL, never, okAsync } from '@lens-social/types';
import type { IdToken } from '@lens-social/types';
import type { RefreshToken } from '@lens-social/types';
import type { AccessToken } from '@lens-social/types';
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
import { UnauthenticatedError, UnexpectedError } from './errors';

/**
 * A standardized data object.
 *
 * All queries should alias their results to `value` to ensure interoperability
 * with this client interface.
 *
 * @internal
 */
export type StandardData<R> = { value: R };

type ValueOf<Result> = Result extends StandardData<infer Value> ? Value : never;

function takeValue<T>(result: StandardData<T> | undefined): T {
  return result?.value ?? never('No value');
}

export type LensClientOptions = {
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
  origin: URL;
};

export class LensClient {
  protected urql: UrqlClient;

  protected logger: Logger;

  protected tokens: AuthenticationTokens | null = null;

  /**
   * The current Access Token if available.
   */
  get accessToken(): AccessToken | null {
    return this.tokens?.accessToken ?? null;
  }

  /**
   * The current ID Token if available.
   */
  get idToken(): IdToken | null {
    return this.tokens?.identityToken ?? null;
  }

  /**
   * The current Refresh Token if available.
   */
  get refreshToken(): RefreshToken | null {
    return this.tokens?.refreshToken ?? null;
  }

  constructor(options: LensClientOptions) {
    this.logger = getLogger(LensClient.name);
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
  challenge({ request }: ChallengeVariables): ResultAsync<AuthenticationChallenge, Error> {
    return this.mutation(ChallengeMutation, { request })
      .andThen(this.handleAuthentication)
      .map(takeValue);
  }

  /**
   * Authenticate the user with the signed authentication challenge.
   */
  authenticate({
    request,
  }: AuthenticateVariables): ResultAsync<ValueOf<AuthenticateResult>, Error> {
    return this.mutation(AuthenticateMutation, { request })
      .andThen(this.handleAuthentication)
      .map(takeValue)
      .andTee((tokens) => {
        if (tokens.__typename === 'AuthenticationTokens') {
          this.tokens = tokens as AuthenticationTokens;
        }
      });
  }

  /**
   * Get the current authentication status.
   */
  currentAuthentication(): ResultAsync<
    ActiveAuthentication,
    UnauthenticatedError | UnexpectedError
  > {
    return this.query(CurrentAuthenticationQuery, {})
      .andThen(this.handleAuthentication)
      .map(takeValue);
  }

  private fetchOptions(options: LensClientOptions): RequestInit {
    return {
      headers: {
        Origin: options.origin,
        ...(this.tokens ? { 'x-access-token': this.tokens.accessToken } : {}),
      },
    };
  }

  private query<Data, Variables extends AnyVariables>(
    document: TypedDocumentNode<Data, Variables>,
    variables: Variables,
  ): ResultAsync<OperationResult<Data, Variables>, UnexpectedError> {
    return this.resultFrom(this.urql.query(document, variables));
  }

  private mutation<Data, Variables extends AnyVariables>(
    document: TypedDocumentNode<Data, Variables>,
    variables: Variables,
  ): ResultAsync<OperationResult<Data, Variables>, UnexpectedError> {
    return this.resultFrom(this.urql.mutation(document, variables));
  }

  private resultFrom<Data, Variables extends AnyVariables>(
    source: OperationResultSource<OperationResult<Data, Variables>>,
  ): ResultAsync<OperationResult<Data, Variables>, UnexpectedError> {
    return ResultAsync.fromPromise(source.toPromise(), (err: unknown) => {
      this.logger.error(err);
      return UnexpectedError.from(err);
    });
  }

  private handleAuthentication<Data, Variables extends AnyVariables>({
    error,
    data,
  }: OperationResult<Data, Variables>): ResultAsync<Data | undefined, UnauthenticatedError> {
    if (error) {
      return UnauthenticatedError.from(error).asResultAsync<Data>();
    }
    return okAsync(data);
  }
}
