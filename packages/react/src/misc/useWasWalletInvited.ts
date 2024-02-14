import {
  AlreadyInvitedCheckRequest,
  UnspecifiedError,
  useProfileAlreadyInvited,
  useProfileAlreadyInvitedLazyQuery,
} from '@lens-protocol/api-bindings';
import { PromiseResult, failure, invariant, success } from '@lens-protocol/shared-kernel';

import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';

/**
 * {@link useWasWalletInvited} hook arguments
 */
export type UseWasWalletInvitedArgs = AlreadyInvitedCheckRequest;

/**
 * Check if a wallet was already invited.
 *
 * @example
 * ```tsx
 * const { data, error, loading } = useWasWalletInvited({
 *   for: '0x1234567890123456789012345678901234567890',
 * });
 * ```
 *
 * @category Wallet
 * @group Hooks
 */
export function useWasWalletInvited(args: UseWasWalletInvitedArgs): ReadResult<boolean> {
  return useReadResult(
    useProfileAlreadyInvited(
      useLensApolloClient({
        variables: {
          request: args,
        },
      }),
    ),
  );
}

/**
 * Check if a wallet was already invited in a lazy way.
 *
 * This hook will not execute until the returned function is called.
 *
 * @experimental This hook is experimental and may change in the future.
 * @example
 * ```ts
 * const { called, data, error, loading, execute } = useLazyWasWalletInvited();
 *
 * const callback = async () => {
 *   const result = await execute({ for: '0x1234567890123456789012345678901234567890' });
 *
 *   if (result.isFailure()) {
 *     toast.error(result.error.message);
 *     return;
 *   }
 *
 *   const wasInvited = result.value;
 *
 *   // continue
 * }
 * ```
 *
 * @category Wallet
 * @group Hooks
 */
export function useLazyWasWalletInvited(): UseDeferredTask<
  boolean,
  UnspecifiedError,
  UseWasWalletInvitedArgs
> {
  const [fetch] = useProfileAlreadyInvitedLazyQuery(useLensApolloClient());

  return useDeferredTask(async (args): PromiseResult<boolean, UnspecifiedError> => {
    const { data, error } = await fetch({ variables: { request: args } });

    if (error) {
      return failure(new UnspecifiedError(error));
    }

    invariant(data, 'Data must be defined');

    return success(data.result);
  });
}
