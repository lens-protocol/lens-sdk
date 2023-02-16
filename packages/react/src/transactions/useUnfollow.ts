import {
  isFollowTransactionFor,
  isUnfollowTransactionFor,
  ProfileFragment,
  ProfileOwnedByMeFragment,
  useHasPendingTransaction,
  useWaitUntilTransactionSettled,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { failure, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers';
import { useUnfollowController } from './adapters/useUnfollowController';

export class PrematureUnfollowError extends Error {
  name = 'PrematureUnfollowError' as const;
}

export type UseUnfollowArgs = {
  followee: ProfileFragment;
  follower: ProfileOwnedByMeFragment;
};

export type UnfollowOperation = Operation<
  void,
  PendingSigningRequestError | WalletConnectionError | UserRejectedError | PrematureUnfollowError
>;

export function useUnfollow({ followee, follower }: UseUnfollowArgs): UnfollowOperation {
  const unfollow = useUnfollowController();

  const hasPendingFollowTx = useHasPendingTransaction(
    isFollowTransactionFor({ profileId: followee.id, followerAddress: follower.ownedBy }),
  );
  const waitUntilTransactionSettled = useWaitUntilTransactionSettled();

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

      const result = await unfollow({
        kind: TransactionKind.UNFOLLOW_PROFILE,
        profileId: followee.id,
      });

      if (result.isSuccess()) {
        await waitUntilTransactionSettled(isUnfollowTransactionFor({ profileId: followee.id }));
      }

      return result;
    },
  );
}
