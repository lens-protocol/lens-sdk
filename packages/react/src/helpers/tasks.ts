import { IEquatableError, PromiseResult, UnknownObject } from '@lens-protocol/shared-kernel';
import { useCallback, useState } from 'react';

/**
 * An async task is a function that can be executed multiple times and that can be in a pending state.
 *
 * @internal
 */
export type AsyncTask<
  TValue,
  TError extends IEquatableError,
  TInput extends UnknownObject = never,
> = (input: TInput) => PromiseResult<TValue, TError>;

/**
 * An async task React Hook is a tiny wrapper around an async task that provides a way to
 * determine when the task is running and also provide access the last error that occurred
 * during the execution of the task.
 */
export type UseAsyncTask<
  TValue,
  TError extends IEquatableError,
  TInput extends UnknownObject = never,
> = {
  error: TError | undefined;
  execute: AsyncTask<TValue, TError, TInput>;
  isPending: boolean;
};

/**
 * @internal
 */
export function useAsyncTask<
  TValue,
  TError extends IEquatableError,
  TInput extends UnknownObject = never,
>(handler: AsyncTask<TValue, TError, TInput>): UseAsyncTask<TValue, TError, TInput> {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<TError | undefined>(undefined);

  return {
    error,
    execute: useCallback(
      async (input: TInput) => {
        setError(undefined);
        setIsPending(true);

        try {
          const result = await handler(input);

          if (result.isFailure()) {
            setError(result.error);
          }

          return result;
        } finally {
          setIsPending(false);
        }
      },
      [handler],
    ),
    isPending,
  };
}
