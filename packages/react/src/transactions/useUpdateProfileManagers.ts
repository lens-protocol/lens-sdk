import {
  PendingSigningRequestError,
  TransactionError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { AtLeastOneOf, EvmAddress } from '@lens-protocol/shared-kernel';

import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { useUpdateProfileManagersController } from './adapters/useUpdateProfileManagersController';

export type UpdateProfileManagersArgs = AtLeastOneOf<{
  /**
   * Enables the Lens Profile Manager to sign transactions on behalf of the authenticated Profile.
   */
  lensManager?: boolean;
  /**
   * Adds the given addresses to the list of Profile managers for the authenticated Profile.
   */
  add?: EvmAddress[];
  /**
   * Removes the given addresses from the list of Profile managers for the authenticated Profile.
   */
  remove?: EvmAddress[];
}>;

/**
 * `useUpdateProfileManagers` is a React Hook that allows you to update the Profile managers
 * configuration for the authenticated Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * **NOTE** This hook waits for the transaction to be mined and indexed before returning.
 * This is due to fact that until a Profile Manager configuration change is fully finalized the enabled managers cannot sign transactions (yet),
 * and in the case of disabling profile managers, it's very likely you'll want the rest of the application to not perform operations like the
 * profile managers are still enabled.
 *
 * @example
 * Enable/disable the Lens Profile Manager. This allows to perform signless transaction through the Lens API.
 * ```ts
 * const { execute, loading, error } = useUpdateProfileManagers();
 *
 * const callback = async () => {
 *   const result = await execute({
 *     lensManager: true, // or false to disable it
 *   });
 *
 *   if (result.isFailure()) {
 *     toast.error(result.error.message);
 *   }
 * };
 * ```
 *
 * @example
 * Add/remove an arbitrary address to the list of Profile managers for the authenticated Profile.
 * ```ts
 * const { execute, loading, error } = useUpdateProfileManagers();
 *
 * const callback = async () => {
 *   const result = await execute({
 *     add: ['0x1234567890123456789012345678901234567890', '0x1234567890123456789012345678901234567891'],
 *     remove: ['0x1234567890123456789012345678901234567892'],
 *   });
 * }
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useUpdateProfileManagers(): UseDeferredTask<
  void,
  | BroadcastingError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | TransactionError,
  UpdateProfileManagersArgs
> {
  const updateProfileManagers = useUpdateProfileManagersController();

  return useDeferredTask(async (args) => {
    return updateProfileManagers({
      kind: TransactionKind.UPDATE_PROFILE_MANAGERS,
      ...args,
    });
  });
}
