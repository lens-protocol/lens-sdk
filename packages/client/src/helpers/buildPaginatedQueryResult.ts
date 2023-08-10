import { PaginatedResultInfoFragment } from '../graphql/fragments.generated';

/**
 * @internal
 */
export type PaginatedQueryData<Item> = {
  pageInfo: PaginatedResultInfoFragment;
  items: Item[];
};

/**
 * A paginated query result.
 */
export type PaginatedResult<T> = PaginatedQueryData<T> & {
  /**
   * Fetches the next page of items.
   *
   * @returns A promise that resolves when the next page of items has been fetched.
   */
  next(): Promise<PaginatedResult<T> | null>;
  /**
   * Fetches the previous page of items.
   *
   * @returns A promise that resolves when the previous page of items has been fetched.
   */
  prev(): Promise<PaginatedResult<T> | null>;
};

/**
 * @internal
 */
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
