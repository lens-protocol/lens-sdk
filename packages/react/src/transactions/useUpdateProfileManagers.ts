import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { AtLeastOneOf, EvmAddress, invariant } from '@lens-protocol/shared-kernel';

import { useSession } from '../authentication';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { useUpdateProfileManagersController } from './adapters/useUpdateProfileManagersController';

export type UpdateProfileManagersArgs = AtLeastOneOf<{
  /**
   * Enables the Lens Profile Manager to sign transactions on behalf of the authenticated Profile.
   */
  approveSignless?: boolean;
  /**
   * Adds the given addresses to the list of Profile managers for the authenticated Profile.
   */
  add?: EvmAddress[];
  /**
   * Removes the given addresses from the list of Profile managers for the authenticated Profile.
   */
  remove?: EvmAddress[];
  /**
   * Whether the transaction costs should be sponsored by the Lens API or
   * should be paid by the authenticated wallet.
   *
   * There are scenarios where the sponsorship will be denied regardless of this value.
   * See {@link BroadcastingError} with:
   * - {@link BroadcastingErrorReason.NOT_SPONSORED} - the profile is not sponsored
   * - {@link BroadcastingErrorReason.RATE_LIMITED} - the profile reached the rate limit
   * - {@link BroadcastingErrorReason.APP_NOT_ALLOWED} - the app is not whitelisted for gasless transactions
   *
   * @defaultValue true, the request will be attempted to be sponsored by the Lens API.
   */
  sponsored?: boolean;
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
 *     approveSignless: true, // or false to disable it
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
  | InsufficientGasError
  | PendingSigningRequestError
  | TransactionError
  | UserRejectedError
  | WalletConnectionError,
  UpdateProfileManagersArgs
> {
  const { data: session } = useSession();
  const updateProfileManagers = useUpdateProfileManagersController();

  return useDeferredTask(async (args) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );

    return updateProfileManagers({
      kind: TransactionKind.UPDATE_PROFILE_MANAGERS,
      sponsored: args.sponsored ?? false,
      ...args,
    });
  });
}
