import { IEquatableError, PromiseResult, invariant } from '@lens-protocol/shared-kernel';
import { useCallback, useState } from 'react';

/**
 * An deferrable task is a function that can be executed multiple times and that can be in a pending state.
 *
 * @internal
 */
export type DeferrableTask<TValue, TError extends IEquatableError = never, TInput = void> = (
  input: TInput,
) => PromiseResult<TValue, TError>;

/**
 * The initial state of a deferred task.
 */
export type DeferredTaskIdle = {
  called: boolean;
  loading: false;
  data: undefined;
  error: undefined;
};

/**
 * The state of a deferred task during the loading.
 */
export type DeferredTaskLoading<TData> = {
  called: true;
  loading: true;
  data: TData | undefined;
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
 * @deprecated Use DeferredTaskLoading instead. Removal slated for v2.0.0.
 */
export type DeferredTaskFirstCall = DeferredTaskLoading<unknown>;
/**
 * @deprecated Use DeferredTaskLoading instead. Removal slated for v2.0.0.
 */
export type DeferredTaskNthCall<TData> = DeferredTaskLoading<TData>;

/**
 * The possible statuses of a deferred task.
 */
export type DeferredTaskState<TData, TError extends IEquatableError> =
  | DeferredTaskIdle
  | DeferredTaskLoading<TData>
  | DeferredTaskSuccess<TData>
  | DeferredTaskFailed<TError>;

/**
 * A deferred task React Hook is a lightweight wrapper for an asynchronous function.
 * It allows tracking of the task's execution status and provides access to the
 * last error that occurred during the task's execution, if any.
 *
 * ```ts
 * const { called, loading, data, error, execute }: UseDeferredTask<TData, TError, TInput> = useAnyDeferredTask();
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
 *   return <Loader />;
 * }
 *
 * if (error) {
 *   // data === undefined
 *   // error === TError
 *   return <p>Something went wrong: {error.message}</p>;
 * }
 *
 * // called === true
 * // data === TData
 * // error === undefined
 * return <p>Task completed: {data}</p>;
 * ```
 */
export type UseDeferredTask<
  TData = void,
  TError extends IEquatableError = never,
  TInput = void,
  TResultValue = TData,
> = DeferredTaskState<TData, TError> & {
  execute: DeferrableTask<TResultValue, TError, TInput>;
};

/**
 * @internal
 */
export function useDeferredTask<TData, TError extends IEquatableError, TInput = never>(
  handler: DeferrableTask<TData, TError, TInput>,
): UseDeferredTask<TData, TError, TInput> {
  const [state, setState] = useState<DeferredTaskState<TData, TError>>({
    called: false,
    loading: false,
    data: undefined,
    error: undefined,
  });

  const execute = useCallback(
    async (input: TInput) => {
      invariant(!state.loading, 'Cannot execute a task while another is in progress.');

      setState(({ data }): DeferredTaskState<TData, TError> => {
        return {
          called: true,
          loading: true,
          data,
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
      } catch (err) {
        setState((existing) => {
          return {
            ...existing,
            loading: false,
          } as DeferredTaskState<TData, TError>;
        });
        throw err;
      }
    },
    [handler, state],
  );

  return {
    ...state,
    execute,
  };
}
