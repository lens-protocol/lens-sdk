import { ApolloError, QueryResult as ApolloQueryResult } from '@apollo/client';
import { PaginatedResultInfo, UnspecifiedError } from '@lens-protocol/api-bindings';
import { Prettify } from '@lens-protocol/shared-kernel';

/**
 * A discriminated union of the possible results of a read operation with no errors.
 *
 * You can rely on the `loading` value to determine if the `data` is available.
 * When `loading` is `false`, the `data` value will be available.
 */
export type ReadResultWithoutError<T> =
  | {
      data: undefined;
      loading: true;
    }
  | {
      data: T;
      loading: false;
    };

/**
 * A discriminated union of the possible results of a read operation with possible errors.
 *
 * You can rely on the `loading` value to determine if the `data` or `error` can be evaluated.
 *
 * If `error` is `undefined`, then `data` value will be available.
 */
export type ReadResultWithError<T, E> =
  | {
      data: undefined;
      error: undefined;
      loading: true;
    }
  | {
      data: T;
      error: undefined;
      loading: false;
    }
  | {
      data: undefined;
      error: E;
      loading: false;
    };

/**
 * A discriminated union of the possible results of a read operation.
 */
export type ReadResult<T, E = UnspecifiedError> = E extends Error
  ? ReadResultWithError<T, E>
  : ReadResultWithoutError<T>;

function buildReadResult<T>(
  data: T | undefined,
  loading: boolean,
  error: ApolloError | undefined,
): ReadResult<T, UnspecifiedError> {
  if (data !== undefined && !loading) {
    return {
      data,
      error: undefined,
      loading: false,
    };
  }

  if (error) {
    return {
      data: undefined,
      error: new UnspecifiedError(error),
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

type InferResult<T extends QueryData<unknown>> = T extends QueryData<infer R> ? R : never;

export function useReadResult<
  T extends QueryData<R>,
  R = InferResult<T>,
  V = { [key: string]: never },
>({ error, data, loading }: ApolloQueryResult<T, V>): ReadResult<R, UnspecifiedError> {
  return buildReadResult(data?.result, loading, error);
}

export type PaginatedArgs<T> = Prettify<
  T & {
    /**
     * The number of items to return.
     *
     * @defaultValue 10
     */
    limit?: number;
  }
>;

/**
 * A paginated read result.
 */
export type PaginatedReadResult<T> = ReadResult<T, UnspecifiedError> & {
  /**
   * Whether there are more items to fetch in the next page
   */
  hasMore: boolean;
  /**
   * Fetches the next page of items.
   *
   * @returns A promise that resolves when the next page of items has been fetched.
   */
  next: () => Promise<void>;
  /**
   * Fetches the previous page of items.
   *
   * @returns A promise that resolves when the prev page of items has been fetched.
   */
  prev: () => Promise<void>;
};

export type PaginatedQueryData<K> = {
  result: { pageInfo: PaginatedResultInfo; items: K };
};

type InferPaginatedItemsType<T extends PaginatedQueryData<unknown>> = T extends PaginatedQueryData<
  infer R
>
  ? R
  : never;

export function usePaginatedReadResult<
  V,
  T extends PaginatedQueryData<K>,
  K = InferPaginatedItemsType<T>,
>({ error, data, loading, fetchMore }: ApolloQueryResult<T, V>): PaginatedReadResult<K> {
  return {
    ...buildReadResult<K>(data?.result.items, loading, error),

    hasMore: data?.result.pageInfo.moreAfter ?? false,

    next: async () => {
      if (data?.result.pageInfo.next) {
        await fetchMore({
          variables: {
            cursor: data.result.pageInfo.next,
          },
        });
      }
    },

    prev: async () => {
      if (data?.result.pageInfo.prev) {
        await fetchMore({
          variables: {
            cursor: data.result.pageInfo.prev,
          },
        });
      }
    },
  };
}
