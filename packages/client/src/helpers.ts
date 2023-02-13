import { CommonPaginatedResultInfoFragment } from './graphql/fragments.generated';

type PaginatedQueryData<K = unknown[]> = {
  pageInfo: CommonPaginatedResultInfoFragment;
  items: K;
};

export type PaginatedResult<T> = T & {
  next(): Promise<PaginatedResult<T> | null>;
  prev(): Promise<PaginatedResult<T> | null>;
};

export async function buildPaginatedQueryResult<V, K>(
  queryFn: (variables: V) => Promise<K>,
  variables: V,
): Promise<PaginatedResult<K>> {
  const result = await queryFn(variables);
  const paginatedResult = result as PaginatedQueryData;

  return {
    ...result,
    async next() {
      if (paginatedResult.pageInfo.next) {
        return buildPaginatedQueryResult(queryFn, {
          ...variables,
          cursor: paginatedResult.pageInfo.next,
        });
      }

      return null;
    },

    async prev() {
      if (paginatedResult.pageInfo.prev) {
        return buildPaginatedQueryResult(queryFn, {
          ...variables,
          cursor: paginatedResult.pageInfo.prev,
        });
      }

      return null;
    },
  };
}
