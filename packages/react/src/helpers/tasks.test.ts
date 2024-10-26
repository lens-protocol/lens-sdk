import { act, renderHook, waitFor } from '@testing-library/react';

import { errAsync, okAsync } from '@lens-social/types';
import { describe, expect, it } from 'vitest';
import {
  type AsyncTaskError,
  type AsyncTaskIdle,
  type AsyncTaskLoading,
  type AsyncTaskSuccess,
  useAsyncTask,
} from './tasks';

describe(`Given the '${useAsyncTask.name}' hook`, () => {
  describe('When rendered for the first time', () => {
    it('Then it should return state in line with type of `AsyncTaskIdle`', async () => {
      const { result } = renderHook(() => useAsyncTask((input: string) => okAsync(input)));

      const expectation: AsyncTaskIdle = {
        called: false,
        loading: false,
        data: undefined,
        error: undefined,
      };

      expect(result.current).toMatchObject(expectation);
    });
  });

  describe('And the hook is executed for the first time', () => {
    describe('When the task is in progress', () => {
      it('Then it should return the state in line with type of `AsyncTaskLoading`', async () => {
        const { result } = renderHook(() => useAsyncTask((input: string) => okAsync(input)));

        act(() => {
          void result.current.execute('test');
        });

        const expectation: AsyncTaskLoading<unknown> = {
          called: true,
          loading: true,
          data: undefined,
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe('When the tasks succeeds', () => {
      it('Then it should return the state in line with type of `AsyncTaskSuccess`', async () => {
        const { result } = renderHook(() => useAsyncTask((input: string) => okAsync(input)));

        await act(async () => {
          await result.current.execute('test');
        });

        const expectation: AsyncTaskSuccess<string> = {
          called: true,
          loading: false,
          data: 'test',
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });

      it('Then it should support void as success data', async () => {
        const { result } = renderHook(() => useAsyncTask((_: string) => okAsync(void 0)));

        await act(async () => {
          await result.current.execute('test');
        });

        const expectation: AsyncTaskSuccess<void> = {
          called: true,
          loading: false,
          data: undefined,
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe('When the task fails', () => {
      it('Then it should return the state in line with type of `AsyncTaskFailed`', async () => {
        const { result } = renderHook(() =>
          useAsyncTask((_: string) => errAsync(new Error('test error'))),
        );

        await act(async () => {
          await result.current.execute('test');
        });

        const expectation: AsyncTaskError<Error> = {
          called: true,
          loading: false,
          data: undefined,
          error: new Error('test error'),
        };

        expect(result.current).toMatchObject(expectation);
      });
    });
  });

  describe('And the hook is executed again', () => {
    describe('When the task is in progress', () => {
      it('Then it should return the state in line with type of `AsyncTaskLoading`', async () => {
        const { result } = renderHook(() => useAsyncTask((input: string) => okAsync(input)));

        await act(async () => {
          await result.current.execute('one');
        });

        await waitFor(() => result.current.loading === false);

        act(() => {
          void result.current.execute('two');
        });

        const expectation: AsyncTaskLoading<string> = {
          called: true,
          loading: true,
          data: 'one',
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe('When the task succeeds', () => {
      it('Then it should return the state in line with type of `AsyncTaskSuccess` with updated data', async () => {
        const { result } = renderHook(() => useAsyncTask((input: string) => okAsync(input)));

        await act(async () => {
          await result.current.execute('one');
        });

        await waitFor(() => result.current.loading === false);

        await act(async () => {
          await result.current.execute('two');
        });

        const expectation: AsyncTaskSuccess<string> = {
          called: true,
          loading: false,
          data: 'two',
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe('When the task fails', () => {
      it('Then it should return the state in line with type of `AsyncTaskFailed`', async () => {
        const { result } = renderHook(() =>
          useAsyncTask((input: string) => {
            if (input === 'one') return okAsync(input);
            return errAsync(new Error('test error'));
          }),
        );

        await act(async () => {
          await result.current.execute('one');
        });

        await waitFor(() => result.current.loading === false);

        await act(async () => {
          await result.current.execute('two');
        });

        const expectation: AsyncTaskError<Error> = {
          called: true,
          loading: false,
          data: undefined,
          error: new Error('test error'),
        };

        expect(result.current).toMatchObject(expectation);
      });
    });
  });
});
