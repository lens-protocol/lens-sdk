import {
  isFollowTransactionFor,
  Profile,
  ProfileOwnedByMe,
  useHasPendingTransaction,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { failure, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useUnfollowController } from './adapters/useUnfollowController';

export class PrematureUnfollowError extends Error {
  name = 'PrematureUnfollowError' as const;
}

export type UseUnfollowArgs = {
  followee: Profile;
  follower: ProfileOwnedByMe;
};

export type UnfollowOperation = Operation<
  void,
  PendingSigningRequestError | WalletConnectionError | UserRejectedError | PrematureUnfollowError
>;

/**
 * @category Profiles
 * @group Hooks
 */
export function useUnfollow({ followee, follower }: UseUnfollowArgs): UnfollowOperation {
  const unfollow = useUnfollowController();

  const hasPendingFollowTx = useHasPendingTransaction(
    isFollowTransactionFor({ profileId: followee.id, followerAddress: follower.ownedBy }),
  );

  return useOperation(
    async (): PromiseResult<
      void,
      | PendingSigningRequestError
      | WalletConnectionError
      | UserRejectedError
      | PrematureUnfollowError
    > => {
      if (hasPendingFollowTx) {
        return failure(
          new PrematureUnfollowError(
            `Your follow request for ${followee.handle} is still pending.`,
          ),
        );
      }

      return unfollow({
        kind: TransactionKind.UNFOLLOW_PROFILE,
        profileId: followee.id,
      });
    },
  );
}
