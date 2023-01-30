import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  DefaultContext,
  MutationOptions,
  NormalizedCacheObject,
  Observable,
  OperationVariables,
  QueryOptions,
} from '@apollo/client';
import { getOperationName } from '@apollo/client/utilities';
import { assertError, invariant } from '@lens-protocol/shared-kernel';

import {
  GraphQLClientMutationResult,
  GraphQLClientQueryResult,
  IGraphQLClient,
} from './IGraphQLClient';
import { UnspecifiedError, ValidationError } from './errors';
import { isGraphQLValidationError } from './isGraphQLValidationError';

export type LensApolloClientOptions<TCacheShape> = {
  cache: ApolloCache<TCacheShape>;
  link: ApolloLink;
  pollingInterval?: number;
};

const defaultPollingInterval = 3000;

function resolveError(error: unknown) {
  assertError(error);

  if (isGraphQLValidationError(error)) {
    return new ValidationError(error);
  }
  return new UnspecifiedError(error);
}

export class LensApolloClient<TCacheShape extends NormalizedCacheObject = NormalizedCacheObject>
  extends ApolloClient<TCacheShape>
  implements IGraphQLClient<TCacheShape>
{
  private pollingInterval: number;

  constructor({
    cache,
    link,
    pollingInterval = defaultPollingInterval,
  }: LensApolloClientOptions<TCacheShape>) {
    super({
      cache,
      defaultOptions: {
        query: {
          errorPolicy: 'none',
        },
        mutate: {
          errorPolicy: 'none',
        },
        watchQuery: {
          errorPolicy: 'none',
        },
      },
      link,
    });
    this.pollingInterval = pollingInterval;
  }

  async query<TData = unknown, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, TData>,
  ): Promise<GraphQLClientQueryResult<TData>> {
    try {
      const result = await super.query(options);

      invariant(
        result.data,
        `No data received for: ${getOperationName(options.query) ?? 'unnamed query'}`,
      );

      return result;
    } catch (error) {
      throw resolveError(error);
    }
  }

  async mutate<TData = unknown, TVariables = OperationVariables, TContext = DefaultContext>(
    options: MutationOptions<TData, TVariables, TContext, ApolloCache<TCacheShape>>,
  ): Promise<GraphQLClientMutationResult<TData>> {
    try {
      const result = await super.mutate(options);

      invariant(
        result.data,
        `No data received for: ${getOperationName(options.mutation) ?? 'unnamed mutation'}`,
      );

      return result;
    } catch (error) {
      throw resolveError(error);
    }
  }

  poll<TData = unknown, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, TData>,
  ): Observable<TData> {
    const observable = super.watchQuery<TData, TVariables>(options);

    observable.startPolling(this.pollingInterval);

    return new Observable((observer) =>
      observable.subscribe({
        next({ data }) {
          observer.next(data);
        },
        error(err) {
          observer.error(resolveError(err));
        },
        complete() {
          observer.complete();
        },
      }),
    );
  }
}
