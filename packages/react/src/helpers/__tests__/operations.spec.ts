import { Deferred, failure, Result, success } from '@lens-protocol/shared-kernel';
import { act, renderHook } from '@testing-library/react';

import { OperationHandler, useOperation } from '../operations';

describe(`Given the operation hook helpers`, () => {
  describe(`when creating an hook with the ${useOperation.name} helper`, () => {
    it('should call the provided handler function with the arguments passed to the execute method', async () => {
      const fn: OperationHandler<void, never, unknown[]> = jest.fn().mockResolvedValue(success());
      const { result } = renderHook(() => useOperation(fn));

      const anyArgs = [1, '2', true, { a: 1 }, [1, 2, 3]] as const;
      await act(() => result.current.execute(...anyArgs));

      expect(fn).toHaveBeenCalledWith(...anyArgs);
    });

    it(`should return an 'isPending' flag that stays true while the operation is progress, false otherwise`, async () => {
      const deferred = new Deferred<Result<void, never>>();
      const fn: OperationHandler<void, never> = () => deferred.promise;
      const { result } = renderHook(() => useOperation(fn));

      expect(result.current.isPending).toBe(false);

      void act(() => {
        void result.current.execute();
      });

      expect(result.current.isPending).toBe(true);

      await act(async () => {
        deferred.resolve(success());
      });

      expect(result.current.isPending).toBe(false);
    });

    it(`should reset the 'isPending' flag even if the operation handler throws`, async () => {
      const fn: OperationHandler<void, never> = jest
        .fn()
        .mockRejectedValue(new Error('Something went wrong'));
      const { result } = renderHook(() => useOperation(fn));

      expect(result.current.isPending).toBe(false);

      await act(async () => {
        try {
          await result.current.execute();
        } catch {
          /* empty */
        }
      });

      expect(result.current.isPending).toBe(false);
    });

    it(`should return any operation error as state`, async () => {
      const error = new Error('Something went wrong');
      const fn: OperationHandler<void, never> = jest.fn().mockResolvedValue(failure(error));

      const { result } = renderHook(() => useOperation(fn));

      const r = await act(() => result.current.execute());

      expect(() => r.unwrap()).toThrow(error);
      expect(result.current.error).toEqual(error);
    });

    it(`should reset previous errors if the operation is executed again`, async () => {
      const error = new Error('Something went wrong');
      const fn: OperationHandler<void, never> = jest
        .fn()
        .mockResolvedValueOnce(failure(error))
        .mockResolvedValue(success());

      const { result } = renderHook(() => useOperation(fn));

      await act(() => result.current.execute());
      expect(result.current.error).toEqual(error);

      await act(() => result.current.execute());
      expect(result.current.error).toBeUndefined();
    });
  });
});
