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

export type GraphQLClientQueryResult<TData = unknown> = Omit<
  ApolloQueryResult<TData>,
  'error' | 'errors'
>;

export type GraphQLClientMutationResult<TData = unknown> = Omit<
  FetchResult<TData>,
  'error' | 'errors'
>;

export interface IGraphQLClient<TCacheShape extends NormalizedCacheObject> {
  query<TData = unknown, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, TData>,
  ): Promise<GraphQLClientQueryResult<TData>>;

  mutate<TData = unknown, TVariables = OperationVariables, TContext = DefaultContext>(
    options: MutationOptions<TData, TVariables, TContext, ApolloCache<TCacheShape>>,
  ): Promise<GraphQLClientMutationResult<TData>>;

  poll<TData = unknown, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, TData>,
  ): Observable<TData>;
}
