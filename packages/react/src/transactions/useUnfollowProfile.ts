import { Profile } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useUnfollowProfileController } from './adapters/useUnfollowProfileController';

export type UnfollowProfileArgs = {
  /**
   * The profile to unfollow
   */
  profile: Profile;
};

/**
 * `useUnfollowProfile` allows you to unfollow a Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { execute: unfollow, error, loading } = useUnfollowProfile();
 *
 * <button onClick={() => unfollow({ profile })} disabled={loading}>
 *   Unfollow
 * </button>
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useUnfollowProfile(): UseDeferredTask<
  void,
  | BroadcastingError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | TransactionError,
  UnfollowProfileArgs
> {
  const unfollowProfile = useUnfollowProfileController();

  return useDeferredTask(async (args) => {
    return unfollowProfile({
      kind: TransactionKind.UNFOLLOW_PROFILE,
      profileId: args.profile.id,
      delegate: true,
    });
  });
}
