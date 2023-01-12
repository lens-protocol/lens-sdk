import { ApolloError, QueryResult } from '@apollo/client';
import { CommonPaginatedResultInfoFragment, Maybe } from '@lens-protocol/api-bindings';
import { CausedError } from '@lens-protocol/shared-kernel';

export type ReadResult<T> =
  | {
      loading: true;
      data: undefined;
    }
  | {
      loading: false;
      data: T;
    };

function buildReadResult<T>(
  data: T | undefined,
  loading: boolean,
  error: ApolloError | undefined,
): ReadResult<T> {
  if (error) {
    throw new CausedError(error.message, { cause: error });
  }

  if (data && !loading) {
    return {
      loading: false,
      data,
    };
  }

  return {
    loading: true,
    data: undefined,
  };
}

export function useReadResult<
  R,
  T extends { result: R } | { result: Maybe<R> } = { result: R },
  V = { [key: string]: never },
>({ error, data, loading }: QueryResult<T, V>): ReadResult<R>;
export function useReadResult<
  U,
  R extends Maybe<U>,
  T extends { result: R } = { result: R },
  V = { [key: string]: never },
>({ error, data, loading }: QueryResult<T, V>): ReadResult<R> {
  return buildReadResult(data?.result, loading, error);
}

export type PaginatedArgs<T> = T & {
  limit?: number;
};

export type PaginatedReadResult<T> = ReadResult<T> & {
  totalCount: number | null;
  hasMore: boolean;
  next: () => Promise<void>;
};

type PaginatedQueryResult<K> = {
  result: { pageInfo: CommonPaginatedResultInfoFragment; items: K };
};

export function usePaginatedReadResult<
  K,
  V,
  T extends PaginatedQueryResult<K> = PaginatedQueryResult<K>,
>({ error, data, loading, fetchMore }: QueryResult<T, V>): PaginatedReadResult<K> {
  return {
    ...buildReadResult<K>(data?.result.items, loading, error),
    totalCount: data?.result.pageInfo.totalCount ?? null,
    hasMore: data?.result.pageInfo.next ? true : false,
    next: async () => {
      await fetchMore({
        variables: {
          cursor: data?.result.pageInfo.next,
        },
      });
    },
  };
}
