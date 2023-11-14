import { failure, success } from '@lens-protocol/shared-kernel';
import { act, renderHook, waitFor } from '@testing-library/react';

import {
  DeferredTaskFailed,
  DeferredTaskFirstCall,
  DeferredTaskIdle,
  DeferredTaskNthCall,
  DeferredTaskSuccess,
  useDeferredTask,
} from '../tasks';

describe('Given the useDeferredTask hook', () => {
  describe('when rendered for the first time', () => {
    it('should return state inline with type of "DeferredTaskIdle"', async () => {
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

  describe('when the task is in progress', () => {
    describe(`and the execution of the hook is loading`, () => {
      it('should return the state inline with type of "DeferredTaskFirstCall"', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (input: string) => {
            return success(input);
          }),
        );

        act(() => {
          void result.current.execute('test');
        });

        const expectation: DeferredTaskFirstCall = {
          called: true,
          loading: true,
          data: undefined,
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });
  });

  describe(`when the tasks succeeds`, () => {
    it('should return the state inline with type of "DeferredTaskSuccess"', async () => {
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
    it('should return the state inline with type of "DeferredTaskFailed"', async () => {
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
    it('should return the state inline with type of "DeferredTaskIdle"', async () => {
      const { result } = renderHook(() =>
        useDeferredTask(async (_: string) => {
          throw new Error('test error');
        }),
      );

      await act(async () => {
        try {
          await result.current.execute('test');
        } catch {
          // where unexpected error would be handled in application
        }
      });

      const expectation: DeferredTaskIdle = {
        called: false,
        loading: false,
        data: undefined,
        error: undefined,
      };

      expect(result.current).toMatchObject(expectation);
    });
  });

  describe('and the hook is executed again', () => {
    describe(`when the task is in progress`, () => {
      it('should return the state inline with type of "DeferredTaskNthCall"', async () => {
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

        const expectation: DeferredTaskNthCall<string> = {
          called: true,
          loading: true,
          data: 'one',
          error: undefined,
        };

        expect(result.current).toMatchObject(expectation);
      });
    });

    describe('when the task succeeds', () => {
      it('should return the state inline with type of "DeferredTaskSuccess" with updated data', async () => {
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
      it('should return the state inline with type of "DeferredTaskFailed"', async () => {
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
      it('should return the state inline with type of "DeferredTaskIdle"', async () => {
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
          try {
            await result.current.execute('two');
          } catch {
            // where unexpected error would be handled in application
          }
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
