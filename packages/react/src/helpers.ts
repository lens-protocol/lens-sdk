import { ApolloError, QueryResult } from '@apollo/client';
import { CommonPaginatedResultInfoFragment } from '@lens-protocol/api';
import { CausedError } from '@lens-protocol/shared-kernel';

export type ReadResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

function buildReadResult<T>(
  data: T | undefined,
  loading: boolean,
  error: ApolloError | undefined,
): ReadResult<T> {
  return {
    data: data ?? null,
    loading,
    error: error ? new CausedError(error.message, { cause: error }) : null,
  };
}

export function useReadResult<T, V>({ error, data, loading }: QueryResult<T, V>): ReadResult<T> {
  return buildReadResult<T>(data, loading, error);
}

export type PaginatedArgs<T> = T & {
  limit?: number;
  cursor?: string;
};

export type PaginatedReadResult<T> = ReadResult<T> & {
  totalCount: number | null;
  hasMore: boolean;
  next: () => Promise<void>;
};

export function usePaginatedReadResult<
  K,
  T extends { result: { pageInfo: CommonPaginatedResultInfoFragment; items: K } },
  V,
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
