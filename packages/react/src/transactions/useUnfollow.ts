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
import { useUnfollowController } from './adapters/useUnfollowController';

export type UnfollowArgs = {
  /**
   * The profile to unfollow
   */
  profile: Profile;
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
  void,
  | BroadcastingError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | TransactionError,
  UnfollowArgs
> {
  const unfollowProfile = useUnfollowController();

  return useDeferredTask(async (args) => {
    return unfollowProfile({
      kind: TransactionKind.UNFOLLOW_PROFILE,
      profileId: args.profile.id,
      delegate: true,
    });
  });
}

/**
 * @deprecated use useUnfollow instead, this will be removed soon.
 */
export const useUnfollowProfile = useUnfollow;
