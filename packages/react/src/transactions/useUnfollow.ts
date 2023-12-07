import { Profile } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useUnfollowController } from './adapters/useUnfollowController';

/**
 * An object representing the result of an unfollow operation.
 *
 * It allows to wait for the transaction to be processed and indexed.
 */
export type UnfollowAsyncResult = AsyncTransactionResult<void>;

export type UnfollowArgs = {
  /**
   * The profile to unfollow
   */
  profile: Profile;
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

/**
 * `useUnfollow` allows you to unfollow a Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { execute: unfollow, error, loading } = useUnfollow();
 *
 * <button onClick={() => unfollow({ profile })} disabled={loading}>
 *   Unfollow
 * </button>
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useUnfollow(): UseDeferredTask<
  UnfollowAsyncResult,
  | BroadcastingError
  | InsufficientGasError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError,
  UnfollowArgs
> {
  const { data: session } = useSession();
  const unfollowProfile = useUnfollowController();

  return useDeferredTask(async (args) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to use this operation.',
    );

    return unfollowProfile({
      kind: TransactionKind.UNFOLLOW_PROFILE,
      profileId: args.profile.id,
      signless: session.profile.signless,
      sponsored: args.sponsored ?? true,
    });
  });
}
