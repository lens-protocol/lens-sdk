import { UnspecifiedError, useHandleToAddressLazyQuery } from '@lens-protocol/api-bindings';
import { isValidHandle } from '@lens-protocol/blockchain-bindings';
import { PromiseResult, failure, invariant, success } from '@lens-protocol/shared-kernel';

import { useLensApolloClient } from '../helpers/arguments';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useSharedDependencies } from '../shared';

export class HandleNotAvailableError extends Error {
  name = 'HandleNotAvailableError' as const;

  constructor(handle: string) {
    super(`Handle "${handle}" is already taken`);
  }
}

export class InvalidHandleError extends Error {
  name = 'InvalidHandleError' as const;

  constructor(localName: string) {
    super(`Handle "${localName}" is not valid`);
  }
}

export type ValidateHandleRequest = {
  /**
   * Just the local-name portion of the desired Handle.
   *
   * @example
   * ```ts
   * // lens/wagmi
   *
   * const localName = 'wagmi';
   * ```
   */
  localName: string;
};

/**
 * Validate the proposed new handle, its format and availability.
 *
 * This hook will not execute until the returned function is called.
 *
 * @example
 * ```ts
 * const { called, error, loading, execute } = useValidateHandle();
 * ```
 *
 * Simple example:
 * ```ts
 * const { called, error, loading, execute } = useValidateHandle();
 *
 * const callback = async () => {
 *   const result = await execute({ localName: 'wagmi' });
 *
 *   if (result.isFailure()) {
 *     console.error(result.error.message); // handle not valid or already taken
 *     return;
 *   }
 *
 *   if (result.value === true) {
 *     // success - handle is available
 *   }
 * }
 * ```
 *
 * @experimental This hook is experimental and may change in the future.
 * @category Handle
 * @group Hooks
 */
export function useValidateHandle(): UseDeferredTask<
  void,
  UnspecifiedError | HandleNotAvailableError | InvalidHandleError,
  ValidateHandleRequest
> {
  const [fetch] = useHandleToAddressLazyQuery(useLensApolloClient());

  const {
    config: { environment },
  } = useSharedDependencies();

  return useDeferredTask(
    async (
      request,
    ): PromiseResult<void, UnspecifiedError | HandleNotAvailableError | InvalidHandleError> => {
      if (!isValidHandle(request.localName)) {
        return failure(new InvalidHandleError(request.localName));
      }

      const handle = environment.handleResolver(request.localName);
      const { data, error } = await fetch({
        variables: {
          request: {
            handle: handle,
          },
        },
      });

      if (error) {
        return failure(new UnspecifiedError(error));
      }

      invariant(data, 'Data must be defined');

      if (data.result) {
        return failure(new HandleNotAvailableError(handle));
      }

      return success();
    },
  );
}
