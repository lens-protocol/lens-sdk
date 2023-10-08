import { IEquatableError, PromiseResult, UnknownObject } from '@lens-protocol/shared-kernel';
import { useCallback, useState } from 'react';

/**
 * An deferrable task is a function that can be executed multiple times and that can be in a pending state.
 */
export type DeferrableTask<
  TData,
  TError extends IEquatableError,
  TInput extends UnknownObject = never,
> = (input: TInput) => PromiseResult<TData, TError>;

/**
 * The initial state of a deferred task.
 */
export type DeferredTaskIdle = {
  called: false;
  loading: false;
  data: undefined;
  error: undefined;
};

/**
 * The state of a deferred task during the first call.
 */
export type DeferredTaskFirstCall = {
  called: true;
  loading: true;
  data: undefined;
  error: undefined;
};

/**
 * The state of a deferred task during the n-th call
 * with data from the previous successful call.
 */
export type DeferredTaskNthCall<TData> = {
  called: true;
  loading: true;
  data: TData;
  error: undefined;
};

/**
 * The state of a deferred task after a successful call.
 */
export type DeferredTaskSuccess<TData> = {
  called: true;
  loading: false;
  data: TData;
  error: undefined;
};

/**
 * The state of a deferred task after a failed call.
 */
export type DeferredTaskFailed<TError extends IEquatableError> = {
  called: true;
  loading: false;
  data: undefined;
  error: TError;
};

/**
 * The possible statuses of a deferred task.
 */
export type DeferredTaskState<TData, TError extends IEquatableError> =
  | DeferredTaskIdle
  | DeferredTaskFirstCall
  | DeferredTaskNthCall<TData>
  | DeferredTaskSuccess<TData>
  | DeferredTaskFailed<TError>;

/**
 * An deferred task React Hook is a tiny wrapper around an asynchronous function
 * that provides a way to determine when the task is running and also provide access
 * the last error that occurred during the execution of the task.
 *
 * It provides a type-safe way to consume the state of the task.
 * ```ts
 * const { called, loading, data, error, execute }: UseDeferredTask<TData, TError, TInput> = useAnyDeferredTask();
 *
 *
 * if (!called) {
 *   // data === undefined
 *   // error === undefined
 *   return <p>Click the button to execute the task</p>;
 * }
 *
 * if (loading) {
 *   // data === undefined on first call
 *   // data === TData from previous successful call
 *   // error === undefined
 *   return <p>Loading...</p>;
 * }
 *
 * if (error) {
 *   // data === undefined
 *   // error === TError
 *   return <p>Something went wrong: {error.message}</p>;
 * }
 *
 * // data === TData
 * return <p>Task completed: {data}</p>;
 * ```
 */
export type UseDeferredTask<
  TData,
  TError extends IEquatableError,
  TInput extends UnknownObject = never,
> = DeferredTaskState<TData, TError> & {
  execute: DeferrableTask<TData, TError, TInput>;
};

/**
 * @internal
 */
export function useDeferredTask<
  TData,
  TError extends IEquatableError,
  TInput extends UnknownObject = never,
>(handler: DeferrableTask<TData, TError, TInput>): UseDeferredTask<TData, TError, TInput> {
  const [state, setState] = useState<DeferredTaskState<TData, TError>>({
    called: false,
    loading: false,
    data: undefined,
    error: undefined,
  });

  const execute = useCallback(
    async (input: TInput) => {
      setState(({ data }): DeferredTaskState<TData, TError> => {
        if (data !== undefined) {
          return {
            called: true,
            loading: true,
            data: data,
            error: undefined,
          };
        }
        return {
          called: true,
          loading: true,
          data: undefined,
          error: undefined,
        };
      });

      try {
        const result = await handler(input);

        if (result.isSuccess()) {
          setState({
            called: true,
            loading: false,
            data: result.value,
            error: undefined,
          });
        } else {
          setState({
            called: true,
            loading: false,
            data: undefined,
            error: result.error,
          });
        }

        return result;
      } finally {
        setState(({ data, error }) => {
          if (data !== undefined) {
            return {
              called: true,
              data,
              error: undefined,
              loading: false,
            };
          }
          if (error) {
            return {
              called: true,
              data: undefined,
              error,
              loading: false,
            };
          }
          return {
            called: false,
            data: undefined,
            error: undefined,
            loading: false,
          };
        });
      }
    },
    [handler],
  );

  return {
    ...state,
    execute,
  };
}
