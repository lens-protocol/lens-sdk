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
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { failure, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useUnfollowController } from './adapters/useUnfollowController';

export class PrematureUnfollowError extends Error {
  name = 'PrematureUnfollowError' as const;
}

export type UseUnfollowArgs = {
  followee: Profile;
  follower: ProfileOwnedByMe;
};

export type UnfollowOperation = Operation<
  AsyncTransactionResult<void>,
  | BroadcastingError
  | PendingSigningRequestError
  | PrematureUnfollowError
  | UserRejectedError
  | WalletConnectionError
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
      AsyncTransactionResult<void>,
      | BroadcastingError
      | PendingSigningRequestError
      | PrematureUnfollowError
      | UserRejectedError
      | WalletConnectionError
    > => {
      if (hasPendingFollowTx) {
        return failure(
          new PrematureUnfollowError(
            `A previous follow request for ${followee.handle} is still pending. Make sure you check 'followee.followStatus.canUnfollow' beforehand.`,
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
