import {
  ApolloCache,
  ApolloClient,
  ApolloClientOptions,
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

import { SemVer } from '../SemVer';
import {
  assertGraphQLClientMutationResult,
  assertGraphQLClientQueryResult,
  GraphQLClientMutationResult,
  GraphQLClientQueryResult,
  IGraphQLClient,
} from './IGraphQLClient';
import { UnspecifiedError, ValidationError, isValidationApolloError } from './errors';

const clientName = 'lens-sdk';
const defaultPollingInterval = 3000;

function resolveError(error: unknown) {
  assertError(error);

  if (isValidationApolloError(error)) {
    return new ValidationError(error);
  }
  return new UnspecifiedError(error);
}

function isTerminating(link: ApolloLink): boolean {
  return link.request.length <= 1;
}

export type SafeApolloClientOptions<TCacheShape> = ApolloClientOptions<TCacheShape> & {
  pollingInterval?: number;
  version?: SemVer;
  link: ApolloLink;
};

export class SafeApolloClient<TCacheShape extends NormalizedCacheObject = NormalizedCacheObject>
  extends ApolloClient<TCacheShape>
  implements IGraphQLClient<TCacheShape>
{
  private pollingInterval: number;

  constructor({
    cache,
    link,
    pollingInterval = defaultPollingInterval,
    version,
    connectToDevTools = false,
  }: SafeApolloClientOptions<TCacheShape>) {
    invariant(
      isTerminating(link),
      'The link passed to SafeApolloClient must be a terminating link.',
    );

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
      name: clientName,
      version,
      connectToDevTools,
    });
    this.pollingInterval = pollingInterval;
  }

  async query<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
    options: QueryOptions<TVariables, TData>,
  ): Promise<GraphQLClientQueryResult<TData>> {
    try {
      const result = await super.query(options);

      assertGraphQLClientQueryResult(result, getOperationName(options.query) ?? 'unknown');

      return result;
    } catch (error) {
      throw resolveError(error);
    }
  }

  async mutate<
    TData = unknown,
    TVariables extends OperationVariables = OperationVariables,
    TContext extends DefaultContext = DefaultContext,
  >(
    options: MutationOptions<TData, TVariables, TContext, ApolloCache<TCacheShape>>,
  ): Promise<GraphQLClientMutationResult<TData>> {
    try {
      const result = await super.mutate(options);

      assertGraphQLClientMutationResult(result, getOperationName(options.mutation) ?? 'unknown');

      return result;
    } catch (error) {
      throw resolveError(error);
    }
  }

  poll<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
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
