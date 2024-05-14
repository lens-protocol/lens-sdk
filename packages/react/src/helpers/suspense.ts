/* eslint-disable react-hooks/rules-of-hooks */
import {
  DocumentNode,
  OperationVariables,
  UseSuspenseQueryResult,
  QueryHookOptions,
  SuspenseQueryHookOptions,
  useQuery,
  useSuspenseQuery,
} from '@apollo/client';

import {
  PaginatedQueryData,
  QueryData,
  ReadResult,
  useReadResult,
  PaginatedReadResult,
  usePaginatedReadResult,
  PaginatedQueryVariables,
} from './reads';

/**
 * A read result that supports React Suspense and includes an error.
 *
 * @experimental This is an experimental type that can change at any time.
 */
export type SuspenseResultWithError<T, E> =
  | {
      data: undefined;
      error: E;
    }
  | {
      data: T;
      error: undefined;
    };

/**
 * A read result that supports React Suspense
 *
 * @experimental This is an experimental type that can change at any time.
 */
export type SuspenseResult<T> = { data: T };

/**
 * @deprecated Use {@link SuspenseResult | `SuspenseResult`} instead.
 */
export type SuspenseReadResult<T, E = never> = SuspenseResultWithError<T, E>;

/**
 * Helper type to enable Suspense mode.
 *
 * @experimental This is an experimental type that can change at any time.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type SuspenseEnabled<T = {}> = T & { suspense: true };

/**
 * @internal
 */
export type UseSuspenseQueryArgs<TData, TVariables extends OperationVariables> = {
  suspense: true;
  query: DocumentNode;
  options: QueryHookOptions<TData, TVariables>;
};

/**
 * @internal
 */
export type UseQueryArgs<TData, TVariables extends OperationVariables> = {
  suspense: false;
  query: DocumentNode;
  options: QueryHookOptions<TData, TVariables>;
};

/**
 * @internal
 */
export type UseSuspendableQueryArgs<TData, TVariables extends OperationVariables> =
  | UseSuspenseQueryArgs<TData, TVariables>
  | UseQueryArgs<TData, TVariables>;

function useSuspenseResult<TResult, TVariables extends OperationVariables>({
  data,
  error,
}: UseSuspenseQueryResult<QueryData<TResult>, TVariables>) {
  if (error) {
    throw error;
  }

  return {
    data: data.result,
  };
}

/**
 * @internal
 */
export function useSuspendableQuery<TResult, TVariables extends OperationVariables>(
  args: UseSuspendableQueryArgs<QueryData<TResult>, TVariables>,
): ReadResult<TResult> | SuspenseResult<TResult> {
  if (args.suspense) {
    return useSuspenseResult(
      useSuspenseQuery<QueryData<TResult>>(args.query, args.options as SuspenseQueryHookOptions),
    );
  }
  return useReadResult(useQuery(args.query, args.options as QueryHookOptions));
}

/**
 * A paginated read result that supports React Suspense.
 *
 * @experimental This is an experimental type that can change at any time.
 */
export type SuspensePaginatedResult<T> = SuspenseResult<T> & {
  /**
   * @deprecated not used with Suspense mode
   */
  beforeCount: number;
  /**
   * Whether there are more items to fetch in the next page
   */
  hasMore: boolean;
  /**
   * Fetches the next page of items.
   *
   * Calling this function will cause the component to re-suspend,
   * unless the call site is wrapped in [startTransition](https://react.dev/reference/react/startTransition).
   *
   * @returns A promise that resolves when the operation is complete, regardless if it had any items to fetch.
   */
  next: () => Promise<void>;
  /**
   * Fetches the previous page of items.
   *
   * Calling this function will cause the component to re-suspend,
   * unless the call site is wrapped in [startTransition](https://react.dev/reference/react/startTransition).
   *
   * @returns A promise that resolves when the operation is complete, regardless if it had any items to fetch.
   */
  prev: () => Promise<void>;
};

/**
 * A paginated read result that supports React Suspense.
 *
 * @experimental This is an experimental type that can change at any time.
 */
export type SuspendablePaginatedResult<T> = PaginatedReadResult<T> | SuspensePaginatedResult<T>;

function useSuspensePaginatedResult<TItem, TVariables extends PaginatedQueryVariables>({
  data,
  error,
  fetchMore,
}: UseSuspenseQueryResult<PaginatedQueryData<TItem>, TVariables>): SuspensePaginatedResult<
  TItem[]
> {
  if (error) {
    throw error;
  }

  return {
    beforeCount: 0,

    data: data.result.items,

    hasMore: data.result.pageInfo.next ? true : false,

    next: async () => {
      if (data.result.pageInfo.next) {
        await fetchMore({
          variables: {
            cursor: data.result.pageInfo.next,
          } as TVariables,
        });
      }
    },

    prev: async () => {
      if (data.result.pageInfo.prev) {
        await fetchMore({
          variables: {
            cursor: data.result.pageInfo.prev,
          } as TVariables,
        });
      }
    },
  };
}

/**
 * @internal
 */
export function useSuspendablePaginatedQuery<TItem, TVariables extends OperationVariables>(
  args: UseSuspendableQueryArgs<PaginatedQueryData<TItem>, TVariables>,
): PaginatedReadResult<TItem[]> | SuspensePaginatedResult<TItem[]> {
  if (args.suspense) {
    return useSuspensePaginatedResult(
      useSuspenseQuery<PaginatedQueryData<TItem>>(
        args.query,
        args.options as SuspenseQueryHookOptions,
      ),
    );
  }

  return usePaginatedReadResult(useQuery(args.query, args.options as QueryHookOptions));
}
