import { CommonPaginatedResultInfoFragment } from './graphql/fragments.generated';

type PaginatedQueryData<Item> = {
  pageInfo: CommonPaginatedResultInfoFragment;
  items: Item[];
};

export type PaginatedResult<T> = PaginatedQueryData<T> & {
  next(): Promise<PaginatedResult<T> | null>;
  prev(): Promise<PaginatedResult<T> | null>;
};

export async function buildPaginatedQueryResult<V, R>(
  queryFn: (variables: V) => Promise<PaginatedQueryData<R>>,
  variables: V,
): Promise<PaginatedResult<R>> {
  let result = await queryFn(variables);

  return {
    get pageInfo() {
      return result.pageInfo;
    },

    get items() {
      return result.items;
    },

    async next() {
      if (result.pageInfo.next) {
        const nextResult = await buildPaginatedQueryResult(queryFn, {
          ...variables,
          cursor: result.pageInfo.next,
        });

        result = nextResult;

        return nextResult;
      }

      return null;
    },

    async prev() {
      if (result.pageInfo.prev) {
        const prevResult = await buildPaginatedQueryResult(queryFn, {
          ...variables,
          cursor: result.pageInfo.prev,
        });

        result = prevResult;

        return prevResult;
      }

      return null;
    },
  };
}
