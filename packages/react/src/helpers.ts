import { ApolloError, QueryResult as ApolloQueryResult } from '@apollo/client';
import { CommonPaginatedResultInfoFragment, UnspecifiedError } from '@lens-protocol/api-bindings';
import { IEquatableError, PromiseResult } from '@lens-protocol/shared-kernel';
import { useCallback, useState } from 'react';

type ReadResultWithoutError<T> =
  | {
      data: undefined;
      loading: true;
    }
  | {
      data: T;
      loading: false;
    };

type ReadResultWithError<T, E> =
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

export type PaginatedArgs<T> = T & {
  limit?: number;
};

export type PaginatedReadResult<T> = ReadResult<T, UnspecifiedError> & {
  hasMore: boolean;
  next: () => Promise<void>;
};

export type PaginatedQueryData<K> = {
  result: { pageInfo: CommonPaginatedResultInfoFragment; items: K };
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
    hasMore: data?.result.pageInfo.next ? true : false,
    next: async () => {
      if (data?.result.pageInfo.next) {
        await fetchMore({
          variables: {
            cursor: data?.result.pageInfo.next,
          },
        });
      }
    },
  };
}

export type OperationHandler<
  TResult,
  TError extends IEquatableError,
  TArgs extends unknown[] = never,
> = (...args: TArgs) => PromiseResult<TResult, TError>;

export type Operation<
  TResult,
  TError extends IEquatableError = never,
  TArgs extends unknown[] = [],
> = {
  error: TError | undefined;
  execute: (...args: TArgs) => PromiseResult<TResult, TError>;
  isPending: boolean;
};

export function useOperation<TResult, TError extends IEquatableError, TArgs extends unknown[]>(
  handler: OperationHandler<TResult, TError, TArgs>,
): Operation<TResult, TError, TArgs> {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<TError | undefined>(undefined);
  const execute = useCallback(
    async (...args: TArgs) => {
      setError(undefined);
      setIsPending(true);

      try {
        const result = await handler(...args);

        if (result.isFailure()) {
          setError(result.error);
        }

        return result;
      } finally {
        setIsPending(false);
      }
    },
    [handler],
  );

  return { error, execute, isPending };
}
