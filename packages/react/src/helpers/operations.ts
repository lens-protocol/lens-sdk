import { IEquatableError, PromiseResult } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

export type OperationHandler<
  TResult,
  TError extends IEquatableError,
  TArgs extends unknown[] = never,
> = (...args: TArgs) => PromiseResult<TResult, TError>;

/**
 * An operation is a function that can be executed multiple times and that can be in a pending state.
 *
 * It also provides a way to access the last error that occurred during the execution of the operation.
 */
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

  return {
    error,
    execute: async (...args: TArgs) => {
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
    isPending,
  };
}
