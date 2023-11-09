import { success } from '@lens-protocol/shared-kernel';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useDeferredTask } from '../tasks';

describe('Given the useDeferredTask hook', () => {
  // idle
  //first call
  // loading
  // result.success
  // result.failure
  // exception
  // n-th call
  // loading
  // result.success
  // result.failure
  // exception
  describe('when idle', () => {
    it('should return state inline with type of "DeferredTaskIdle"', async () => {
      const { result } = renderHook(() =>
        useDeferredTask(async (input: string) => {
          return success(input);
        }),
      );

      expect(result.current).toMatchObject({
        called: false,
        loading: false,
        data: undefined,
        error: undefined,
      });
    });
  });

  describe('when first call', () => {
    it('should immediately return the loading state inline with type of "DeferredTaskFirstCall"', async () => {
      const { result } = renderHook(() =>
        useDeferredTask(async (input: string) => {
          return success(input);
        }),
      );

      await act(async () => {
        await result.current.execute('test');
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      act(() => {
        void result.current.execute('test');
      });

      expect(result.current).toMatchObject({
        called: true,
        loading: true,
        data: 'test',
        error: undefined,
      });
    });
  });

  it('should return the correct state immediately after `execute` is called', async () => {});

  it('should return the correct loading state after previous successful call', async () => {});

  describe('when the task is successful', () => {
    describe('and has a return value', () => {
      it('should return the correct state', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (input: string) => {
            return success(input);
          }),
        );

        await act(async () => {
          await result.current.execute('test');
        });

        expect(result.current).toMatchObject({
          called: true,
          loading: false,
          data: 'test',
          error: undefined,
        });
      });
    });

    describe('and the return value is void', () => {
      it('should return the correct state after a completed successful call where expected result is void/undefined', async () => {
        const { result } = renderHook(() =>
          useDeferredTask(async (_: string) => {
            return success();
          }),
        );

        await act(async () => {
          await result.current.execute('test');
        });

        expect(result.current).toMatchObject({
          called: true,
          loading: false,
          data: undefined,
          error: undefined,
        });
      });
    });
  });
});
