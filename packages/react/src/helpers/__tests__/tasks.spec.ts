import { failure, success } from '@lens-protocol/shared-kernel';
import { act, renderHook, waitFor } from '@testing-library/react';

import {
  DeferredTaskFailed,
  DeferredTaskLoading,
  DeferredTaskIdle,
  DeferredTaskSuccess,
  useDeferredTask,
} from '../tasks';

describe('Given the useDeferredTask hook', () => {
  describe('when rendered for the first time', () => {
    it('should return state in line with type of "DeferredTaskIdle"', async () => {
      const { result } = renderHook(() =>
        useDeferredTask(async (input: string) => {
          return success(input);
        }),
      );

      const expectation: DeferredTaskIdle = {
        called: false,
        loading: false,
        data: undefined,
        error: undefined,
      };

      expect(result.current).toMatchObject(expectation);
    });
  });

  describe('and the hook is executed for the first time', () => {
    describe('when the task is in progress', () => {
      it('should return the state in line with type of "DeferredTaskLoading"', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (input: string) => {
            return success(input);
          }),
        );

        act(() => {
          void result.current.execute('test');
        });

        const expectation: DeferredTaskLoading<unknown> = {
          called: true,
          loading: true,
          data: undefined,
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe(`when the tasks succeeds`, () => {
      it('should return the state in line with type of "DeferredTaskSuccess"', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (input: string) => {
            return success(input);
          }),
        );

        await act(async () => {
          await result.current.execute('test');
        });

        const expectation: DeferredTaskSuccess<string> = {
          called: true,
          loading: false,
          data: 'test',
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });

      it('should support void as success data', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (_: string) => {
            return success();
          }),
        );

        await act(async () => {
          await result.current.execute('test');
        });

        const expectation: DeferredTaskSuccess<void> = {
          called: true,
          loading: false,
          data: undefined,
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe(`when the task fails`, () => {
      it('should return the state in line with type of "DeferredTaskFailed"', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (_: string) => {
            return failure(new Error('test error'));
          }),
        );

        await act(async () => {
          await result.current.execute('test');
        });

        const expectation: DeferredTaskFailed<Error> = {
          called: true,
          loading: false,
          data: undefined,
          error: new Error('test error'),
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe(`when the task throws an unexpected error`, () => {
      it('should return the state in line with type of "DeferredTaskIdle" and re-throw the error', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (_: string) => {
            throw new Error('test error');
          }),
        );

        await act(async () => {
          await expect(() => result.current.execute('test')).rejects.toThrow();
        });

        const expectation: DeferredTaskIdle = {
          called: true,
          loading: false,
          data: undefined,
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });
  });

  describe('and the hook is executed again', () => {
    describe(`when the task is in progress`, () => {
      it('should return the state in line with type of "DeferredTaskLoading"', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (input: string) => {
            return success(input);
          }),
        );

        await act(async () => {
          await result.current.execute('one');
        });

        await waitFor(() => result.current.loading === false);

        act(() => {
          void result.current.execute('two');
        });

        const expectation: DeferredTaskLoading<string> = {
          called: true,
          loading: true,
          data: 'one',
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe('when the task succeeds', () => {
      it('should return the state in line with type of "DeferredTaskSuccess" with updated data', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (input: string) => {
            return success(input);
          }),
        );

        await act(async () => {
          await result.current.execute('one');
        });

        await waitFor(() => result.current.loading === false);

        await act(async () => {
          await result.current.execute('two');
        });

        const expectation: DeferredTaskSuccess<string> = {
          called: true,
          loading: false,
          data: 'two',
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe('when the task fails', () => {
      it('should return the state in line with type of "DeferredTaskFailed"', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (input: string) => {
            if (input === 'one') return success(input);
            return failure(new Error('test error'));
          }),
        );

        await act(async () => {
          await result.current.execute('one');
        });

        await waitFor(() => result.current.loading === false);

        await act(async () => {
          await result.current.execute('two');
        });

        const expectation: DeferredTaskFailed<Error> = {
          called: true,
          loading: false,
          data: undefined,
          error: new Error('test error'),
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe('when the task throws an unexpected error', () => {
      it('should return the state in line with type of "DeferredTaskIdle" and re-throw the error', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (input: string) => {
            if (input === 'one') return success(input);
            throw new Error('test error');
          }),
        );

        await act(async () => {
          await result.current.execute('one');
        });

        await waitFor(() => result.current.loading === false);

        await act(async () => {
          await expect(() => result.current.execute('two')).rejects.toThrow();
        });

        const expectation: DeferredTaskSuccess<string> = {
          called: true,
          loading: false,
          data: 'one',
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });
  });
});
