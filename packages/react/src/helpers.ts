import { ApolloError, QueryResult as ApolloQueryResult } from '@apollo/client';
import { CommonPaginatedResultInfoFragment, Maybe } from '@lens-protocol/api-bindings';

import { NetworkError } from './publication/adapters/NetworkError';

export type ReadResult<T, E> =
  | {
      data: undefined;
      error: undefined;
      loading: true;
    }
  | ({
      loading: false;
    } & (
      | {
          data: undefined;
          error: E;
        }
      | {
          data: T;
          error: undefined;
        }
    ));

function buildReadResult<T>(
  data: T | undefined,
  loading: boolean,
  error: ApolloError | undefined,
): ReadResult<T, NetworkError> {
  if (data && !loading) {
    return {
      data,
      error: undefined,
      loading: false,
    };
  }

  if (error) {
    return {
      data: undefined,
      error: new NetworkError(error),
      loading: false,
    };
  }

  return {
    data: undefined,
    error: undefined,
    loading: true,
  };
}

export type QueryData<R> = { result: R };

export function useReadResult<
  R,
  T extends QueryData<R> | QueryData<Maybe<R>> = QueryData<R>,
  V = { [key: string]: never },
>({ error, data, loading }: ApolloQueryResult<T, V>): ReadResult<R, NetworkError>;
export function useReadResult<
  U,
  R extends Maybe<U>,
  T extends QueryData<R> = QueryData<R>,
  V = { [key: string]: never },
>({ error, data, loading }: ApolloQueryResult<T, V>): ReadResult<R, NetworkError> {
  return buildReadResult(data?.result, loading, error);
}

export type PaginatedArgs<T> = T & {
  limit?: number;
};

export type PaginatedReadResult<T> = ReadResult<T, NetworkError> & {
  hasMore: boolean;
  next: () => Promise<void>;
};

export type PaginatedQueryData<K> = {
  result: { pageInfo: CommonPaginatedResultInfoFragment; items: K };
};

export function usePaginatedReadResult<
  K,
  V,
  T extends PaginatedQueryData<K> = PaginatedQueryData<K>,
>({ error, data, loading, fetchMore }: ApolloQueryResult<T, V>): PaginatedReadResult<K> {
  return {
    ...buildReadResult<K>(data?.result.items, loading, error),
    hasMore: data?.result.pageInfo.next ? true : false,
    next: async () => {
      if (data?.result.pageInfo.next) {
        await fetchMore({
          variables: {
            cursor: data?.result.pageInfo.next,
          },
        });
      }
    },
  };
}
