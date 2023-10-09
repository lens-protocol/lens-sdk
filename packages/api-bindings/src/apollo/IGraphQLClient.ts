import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  FetchResult,
  MutationOptions,
  NormalizedCacheObject,
  Observable,
  OperationVariables,
  QueryOptions,
} from '@apollo/client';
import { invariant } from '@lens-protocol/shared-kernel';

export type GraphQLClientQueryResult<TData = unknown> = Omit<
  ApolloQueryResult<TData>,
  'error' | 'errors'
> & {
  data: TData;
};

export type GraphQLClientMutationResult<TData = unknown> = Omit<
  FetchResult<TData>,
  'error' | 'errors'
> & {
  data: TData;
};

export function assertGraphQLClientQueryResult<TData>(
  result: ApolloQueryResult<TData>,
  operationName: string,
): asserts result is GraphQLClientQueryResult<TData> {
  invariant(result.data, `No data received for query: ${operationName}`);
}

export function assertGraphQLClientMutationResult<TData>(
  result: FetchResult<TData>,
  operationName: string,
): asserts result is GraphQLClientMutationResult<TData> {
  invariant(result.data, `No data received for mutation: ${operationName}`);
}

export interface IGraphQLClient<TCacheShape extends NormalizedCacheObject> {
  query<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
    options: QueryOptions<TVariables, TData>,
  ): Promise<GraphQLClientQueryResult<TData>>;

  mutate<
    TData = unknown,
    TVariables extends OperationVariables = OperationVariables,
    TContext extends DefaultContext = DefaultContext,
  >(
    options: MutationOptions<TData, TVariables, TContext, ApolloCache<TCacheShape>>,
  ): Promise<GraphQLClientMutationResult<TData>>;

  poll<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
    options: QueryOptions<TVariables, TData>,
  ): Observable<TData>;
}
