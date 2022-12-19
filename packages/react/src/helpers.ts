import { ApolloError, QueryResult } from '@apollo/client';
import { CommonPaginatedResultInfoFragment } from '@lens-protocol/api';
import { CausedError } from '@lens-protocol/shared-kernel';

function buildLensResponse<T>(
  data: T | undefined,
  loading: boolean,
  error: ApolloError | undefined,
): LensResponse<T> {
  return {
    data: data ?? null,
    loading,
    error: error ? new CausedError(error.message, { cause: error }) : null,
  };
}

export type LensResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useLensResponse<T, V>({
  error,
  data,
  loading,
}: QueryResult<T, V>): LensResponse<T> {
  return buildLensResponse<T>(data, loading, error);
}

export type PaginatedArgs<T> = T & {
  limit?: number;
  cursor?: string;
};

export type LensResponseWithPagination<T> = LensResponse<T> & {
  totalCount: number | null;
  hasMore: boolean;
  next: () => Promise<void>;
};

export function useLensResponseWithPagination<
  K,
  T extends { result: { pageInfo: CommonPaginatedResultInfoFragment; items: K } },
  V,
>({ error, data, loading, fetchMore }: QueryResult<T, V>): LensResponseWithPagination<K> {
  return {
    ...buildLensResponse<K>(data?.result.items, loading, error),
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
