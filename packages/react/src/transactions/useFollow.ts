import { ProfileOwnedByMeFragment, ProfileFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { FollowPolicyType, FollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';
import { InvariantError } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers';
import { useFollowController } from './adapters/useFollowController';

function createFollowRequest(followee: ProfileFragment, follower: ProfileFragment): FollowRequest {
  const followPolicy = followee.followPolicy;
  switch (followPolicy.type) {
    case FollowPolicyType.CHARGE:
      return {
        fee: {
          amount: followPolicy.amount,
          contractAddress: followPolicy.contractAddress,
          recipient: followPolicy.recipient,
        },
        kind: TransactionKind.FOLLOW_PROFILES,
        profileId: followee.id,
        followerAddress: follower.ownedBy,
      };
    case FollowPolicyType.ONLY_PROFILE_OWNERS:
      return {
        kind: TransactionKind.FOLLOW_PROFILES,
        profileId: followee.id,
        followerAddress: follower.ownedBy,
        followerProfileId: follower.id,
      };
    case FollowPolicyType.ANYONE:
      return {
        kind: TransactionKind.FOLLOW_PROFILES,
        profileId: followee.id,
        followerAddress: follower.ownedBy,
      };
    case FollowPolicyType.NO_ONE:
      throw new InvariantError(
        `The profile is configured so that nobody can follow it. Check 'profile.followPolicy.type' beforehand.`,
      );
    case FollowPolicyType.UNKNOWN:
      throw new InvariantError(
        `The profile is configured with an unknown follow module. Check 'profile.followPolicy.type' beforehand.`,
      );
  }
}

export type UseFollowArgs = {
  follower: ProfileOwnedByMeFragment;
};

export type FollowArgs = {
  followee: ProfileFragment;
};

export type FollowOperation = Operation<
  void,
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError,
  [FollowArgs]
>;

export function useFollow({ follower }: UseFollowArgs): FollowOperation {
  const follow = useFollowController();

  return useOperation(async ({ followee }: FollowArgs) => {
    const request = createFollowRequest(followee, follower);
    return follow(request);
  });
}
