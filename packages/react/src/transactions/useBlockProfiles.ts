import { Profile } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
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
import { useBlockProfilesController } from './adapters/useBlockProfileController';

export type BlockProfileArgs = {
  /**
   * The profiles to block
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

export type BlockOperation = UseDeferredTask<
  AsyncTransactionResult<void>,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | InsufficientGasError
  | PendingSigningRequestError
  | TransactionError
  | UserRejectedError
  | WalletConnectionError,
  BlockProfileArgs
>;

/**
 * Block one or many profiles.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 * @param args - {@link BlockProfileArgs}
 *
 * @example
 * ```tsx
 * import { useBlockProfiles, ProfileId } from '@lens-protocol/react';
 *
 * function BlockProfile({ profileId }: { profileId: ProfileId }) {
 *   const { execute: block, loading: blockLoading, error: blockError } = useBlockProfiles();
 *
 *   async function handleBlock() {
 *    await block({
 *     profiles: [profileId],
 *    });
 *   }
 *
 *   return (
 *     <button onClick={handleBlock}>
 *      Block profile
 *     </button>
 *   );
 * }
 * ```
 */
export function useBlockProfiles(): BlockOperation {
  const { data: session } = useSession();
  const blockProfile = useBlockProfilesController();

  return useDeferredTask(async ({ profiles, sponsored }: BlockProfileArgs) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a profile to block a profile. Use `useLogin` hook to authenticate.',
    );

    return blockProfile({
      profileIds: profiles.map((profile) => profile.id),
      kind: TransactionKind.BLOCK_PROFILE,
      signless: session.profile.signless,
      sponsored: sponsored ?? false,
    });
  });
}
