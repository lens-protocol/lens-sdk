import { type ResultAsync, invariant } from '@lens-social/types';
import { useCallback, useState } from 'react';

/**
 * An deferrable task is a function that can be executed multiple times and that can be in a pending state.
 *
 * @internal
 */
export type AsyncTask<TInput, TResult extends ResultAsync<unknown, unknown>> = (
  input: TInput,
) => TResult;

/**
 * The initial state of a async task.
 */
export type AsyncTaskIdle = {
  called: boolean;
  loading: false;
  data: undefined;
  error: undefined;
};

/**
 * The state of a async task during the loading.
 */
export type AsyncTaskLoading<TData> = {
  called: true;
  loading: true;
  data: TData | undefined;
  error: undefined;
};

/**
 * The state of a async task after a successful call.
 */
export type AsyncTaskSuccess<TData> = {
  called: true;
  loading: false;
  data: TData;
  error: undefined;
};

/**
 * The state of a async task after a failed call.
 */
export type AsyncTaskError<TError> = {
  called: true;
  loading: false;
  data: undefined;
  error: TError;
};

/**
 * The possible statuses of a async task.
 */
export type AsyncTaskState<TData, TError> =
  | AsyncTaskIdle
  | AsyncTaskLoading<TData>
  | AsyncTaskSuccess<TData>
  | AsyncTaskError<TError>;

const AsyncTaskState = {
  Idle: <TData, TError>(): AsyncTaskState<TData, TError> => ({
    called: false,
    loading: false,
    data: undefined,
    error: undefined,
  }),
  Loading: <TData, TError>(data?: TData): AsyncTaskState<TData, TError> => ({
    called: true,
    loading: true,
    data,
    error: undefined,
  }),
  Success: <TData, TError>(data: TData): AsyncTaskState<TData, TError> => ({
    called: true,
    loading: false,
    data,
    error: undefined,
  }),
  Failed: <TData, TError>(error: TError): AsyncTaskState<TData, TError> => ({
    called: true,
    loading: false,
    data: undefined,
    error,
  }),
};

/**
 * A async task React Hook is a lightweight wrapper for an asynchronous function.
 * It allows tracking of the task's execution status and provides access to the
 * last error that occurred during the task's execution, if any.
 *
 * ```ts
 * const { called, loading, data, error, execute }: UseAsyncTask<TData, TError, TInput> = useAnyAsyncTask();
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
export type UseAsyncTask<TInput, TValue, TError> = AsyncTaskState<TValue, TError> & {
  execute: AsyncTask<TInput, ResultAsync<TValue, TError>>;
};

/**
 * @internal
 */
export function useAsyncTask<TInput, TValue, TError, TResult extends ResultAsync<TValue, TError>>(
  handler: AsyncTask<TInput, TResult>,
): UseAsyncTask<TInput, TValue, TError> {
  const [state, setState] = useState(AsyncTaskState.Idle<TValue, TError>());

  const execute = useCallback(
    (input: TInput) => {
      invariant(!state.loading, 'Cannot execute a task while another is in progress.');

      setState(({ data }) => {
        return {
          called: true,
          loading: true,
          data,
          error: undefined,
        };
      });

      const result = handler(input);

      result.match(
        (value) => setState(AsyncTaskState.Success(value)),
        (error) => setState(AsyncTaskState.Failed(error)),
      );

      return result;
    },
    [handler, state],
  );

  return {
    ...state,
    execute,
  };
}
