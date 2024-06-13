/* eslint-disable no-console */
import {
  ApolloError,
  QueryResult as ApolloQueryResult,
  DocumentNode,
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
} from '@apollo/client';
import {
  UnspecifiedError,
  InputMaybe,
  Cursor,
  PaginatedResultInfo,
} from '@lens-protocol/api-bindings';
import { Prettify } from '@lens-protocol/shared-kernel';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useSharedDependencies } from '../shared';

/**
 * @deprecated use {@link ReadResult | `ReadResult<T, E>`} instead. Removal slated for v3.x.
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
 * @deprecated use {@link ReadResult | `ReadResult<T, E>`} instead. Removal slated for v3.x.
 */
export type ReadResultWithError<T, E> = ReadResult<T, E>;

/**
 * A discriminated union of the possible results of a read operation.
 *
 * You can rely on the `loading` value to determine if the `data` or `error` can be evaluated.
 *
 * If `error` is `undefined`, then `data` value will be available.
 */
export type ReadResult<T, E = UnspecifiedError> =
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

/**
 * A standardized query result data object.
 *
 * All queries should alias their results to `result` to ensure interoperability
 * with this helper hooks.
 *
 * @internal
 */
export type QueryData<R> = { result: R };

/**
 * @internal
 */
export function useReadResult<
  TResult,
  TVariables extends OperationVariables = { [key: string]: never },
>({
  error,
  data,
}: ApolloQueryResult<QueryData<TResult>, TVariables>): ReadResult<TResult, UnspecifiedError> {
  return buildReadResult(data?.result, error);
}

export type PaginatedArgs<T> = Prettify<Omit<T, 'cursor'>>;

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
   * @returns A promise that resolves when the operation is complete, regardless if it had any items to fetch.
   */
  next: () => Promise<void>;
  /**
   * Fetches the previous page of items.
   *
   * @returns A promise that resolves when the operation is complete, regardless if it had any items to fetch.
   */
  prev: () => Promise<void>;
};

/**
 * @internal
 */
export type PaginatedQueryVariables = OperationVariables & { cursor?: InputMaybe<Cursor> };

/**
 * @internal
 */
export type PaginatedQueryData<TItem> = {
  result: { pageInfo: PaginatedResultInfo; items: TItem[] };
};

type InferPaginatedItemsType<TData extends PaginatedQueryData<unknown>> =
  TData extends PaginatedQueryData<infer TItem> ? TItem : never;

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

/**
 * @internal
 */
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
}: ApolloQueryResult<TData, TVariables>): // | UseSuspenseQueryResult<TData, TVariables>
PaginatedReadResult<TItem[]> {
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

    hasMore: data?.result.pageInfo.next ? true : false,

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
