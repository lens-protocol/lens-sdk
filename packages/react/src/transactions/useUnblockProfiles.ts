import { Profile } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useUnblockProfilesController } from './adapters/useUnblockProfilesController';

export type UnblockProfileArgs = {
  /**
   * The profiles to unblock
   */
  profiles: Profile[];
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
};

export type UnblockOperation = UseDeferredTask<
  AsyncTransactionResult<void>,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | InsufficientGasError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError,
  UnblockProfileArgs
>;

/**
 * Unblock one or many profiles.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 * @param args - {@link UnblockProfileArgs}
 *
 * @example
 * ```tsx
 * import { useUnblockProfiles, ProfileId } from '@lens-protocol/react';
 *
 * function UnblockProfile({ profileId }: { profileId: ProfileId }) {
 *   const { execute: unblock, loading: blockLoading, error: blockError } = useUnblockProfiles();
 *
 *   async function handleUnblock() {
 *    await unblock({
 *     profiles: [profileId],
 *    });
 *   }
 *
 *   return (
 *     <button onClick={handleUnblock}>
 *      Unblock profile
 *     </button>
 *   );
 * }
 * ```
 */
export function useUnblockProfiles(): UnblockOperation {
  const { data: session } = useSession();
  const unblockProfile = useUnblockProfilesController();

  return useDeferredTask(async ({ profiles, sponsored }: UnblockProfileArgs) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a profile to unblock a profile. Use `useLogin` hook to authenticate.',
    );

    return unblockProfile({
      profileIds: profiles.map((profile) => profile.id),
      kind: TransactionKind.UNBLOCK_PROFILE,
      signless: session.profile.signless,
      sponsored: sponsored ?? true,
    });
  });
}
