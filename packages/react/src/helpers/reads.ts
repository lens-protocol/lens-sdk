/* eslint-disable no-console */
import {
  ApolloError,
  DocumentNode,
  LazyQueryExecFunction,
  OperationVariables,
  QueryResult as ApolloQueryResult,
  useLazyQuery,
} from '@apollo/client';
import {
  Cursor,
  PaginatedResultInfo,
  UnspecifiedError,
  InputMaybe,
} from '@lens-protocol/api-bindings';
import { Prettify } from '@lens-protocol/shared-kernel';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useSharedDependencies } from '../shared';

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
  error: ApolloError | undefined,
): ReadResult<T, UnspecifiedError> {
  if (data !== undefined) {
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
>({ error, data }: ApolloQueryResult<T, V>): ReadResult<R, UnspecifiedError> {
  return buildReadResult(data?.result, error);
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
   * The number of items that are available before the results set.
   *
   * Use this to determine if you want to offer the option of loading more items
   * at the beginning of the list via the `prev` method.
   */
  beforeCount: number;
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

type PaginatedQueryVariables = OperationVariables & { cursor?: InputMaybe<Cursor> };

export type PaginatedQueryData<K> = {
  result: { pageInfo: PaginatedResultInfo; items: K[] };
};

type InferPaginatedItemsType<T extends PaginatedQueryData<unknown>> = T extends PaginatedQueryData<
  infer R
>
  ? R
  : never;

function useAdHocQuery<
  TVariables extends PaginatedQueryVariables,
  TData extends PaginatedQueryData<TItem>,
  TItem = InferPaginatedItemsType<TData>,
>(query: DocumentNode): LazyQueryExecFunction<TData, TVariables> {
  const { apolloClient } = useSharedDependencies();
  const [fetch] = useLazyQuery<TData, TVariables>(query, {
    fetchPolicy: 'no-cache',
    client: apolloClient,
  });

  return fetch;
}

export function usePaginatedReadResult<
  TVariables extends PaginatedQueryVariables,
  TData extends PaginatedQueryData<TItem>,
  TItem = InferPaginatedItemsType<TData>,
>({
  error,
  data,
  loading,
  fetchMore,
  variables,
  observable,
}: ApolloQueryResult<TData, TVariables>): PaginatedReadResult<TItem[]> {
  const fetch = useAdHocQuery<TVariables, TData, TItem>(observable.query);
  const cachedData = useRef(data).current;

  const [beforeCount, setBeforeCount] = useState(0);

  const probeForNewerResults = useCallback(
    async function (prev: Cursor) {
      const response = await fetch({
        variables: {
          ...variables,
          cursor: prev,
        } as TVariables,
      });

      if (response.data) {
        setBeforeCount(response.data.result.items.length);
      }
    },
    [fetch, variables],
  );

  useEffect(() => {
    if (cachedData?.result.pageInfo.prev) {
      void probeForNewerResults(cachedData.result.pageInfo.prev);
    }
  }, [cachedData, probeForNewerResults]);

  return {
    ...buildReadResult(data?.result.items, error),

    beforeCount,

    hasMore: data?.result.pageInfo.moreAfter ?? false,

    next: async () => {
      if (loading) {
        console.warn('Cannot fetch next page while loading, this is a no-op.');
        return;
      }
      if (!loading && data?.result.pageInfo.next) {
        await fetchMore({
          variables: {
            cursor: data.result.pageInfo.next,
          },
        });
      }
    },

    prev: async () => {
      if (loading) {
        console.warn('Cannot fetch previous page while loading, this is a no-op.');
        return;
      }
      if (!loading && data?.result.pageInfo.prev) {
        await fetchMore({
          variables: {
            cursor: data.result.pageInfo.prev,
          },
        });
        setBeforeCount(0);
      }
    },
  };
}
