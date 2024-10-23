import type { EnvironmentConfig } from '@lens-social/env';
import type { ChallengeResult } from '@lens-social/graphql';
import { AuthenticateMutation, type AuthenticateResult } from '@lens-social/graphql';
import type { AuthenticateVariables } from '@lens-social/graphql';
import type { ActiveAuthentication } from '@lens-social/graphql';
import { ChallengeMutation, type ChallengeVariables } from '@lens-social/graphql';
import { ResultAsync, type URL, never, okAsync } from '@lens-social/types';
import {
  type AnyVariables,
  type TypedDocumentNode,
  type Client as UrqlClient,
  createClient,
  fetchExchange,
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

export type LensClientOptions = {
  environment: EnvironmentConfig;
  cache: boolean;
  /**
   * Whether to enable debug mode.
   *
   * @defaultValue `false`
   */
  debug: boolean;
  origin: URL;
};

export class LensClient {
  protected urql: UrqlClient;

  protected logger: Logger;

  constructor(options: LensClientOptions) {
    this.logger = getLogger(LensClient.name);
    this.logger.setLevel(options.debug ? 'DEBUG' : 'SILENT');

    this.urql = createClient({
      url: options.environment.backend,
      exchanges: [fetchExchange],
      fetchOptions: {
        headers: {
          Origin: options.origin,
        },
      },
    });
  }

  query<T, Variables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<T>, Variables>,
    variables: Variables,
  ): ResultAsync<T, UnexpectedError | UnauthenticatedError> {
    return ResultAsync.fromPromise(
      this.urql.query(document, variables).toPromise(),
      this.unexpectedError.bind(this),
    ).andThen(({ error, data }) => {
      if (error) {
        return UnauthenticatedError.from(error).asResultAsync<T>();
      }
      return okAsync(data?.value ?? never('No value'));
    });
  }

  mutation<Value, Variables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<Value>, Variables>,
    variables: Variables,
  ): ResultAsync<Value, Error> {
    return ResultAsync.fromPromise(
      this.urql.mutation(document, variables).toPromise(),
      this.unexpectedError.bind(this),
    ).map(({ data }) => data?.value ?? never('No value'));
  }

  challenge({ request }: ChallengeVariables): ResultAsync<ValueOf<ChallengeResult>, Error> {
    return this.mutation(ChallengeMutation, { request });
  }

  authenticate({
    request,
  }: AuthenticateVariables): ResultAsync<ValueOf<AuthenticateResult>, Error> {
    return this.mutation(AuthenticateMutation, { request });
  }

  currentAuthentication(): ResultAsync<ActiveAuthentication, UnauthenticatedError> {
    never('Not implemented');
  }

  private unexpectedError(err: unknown): UnexpectedError {
    this.logger.error(err);
    return UnexpectedError.from(err);
  }
}
