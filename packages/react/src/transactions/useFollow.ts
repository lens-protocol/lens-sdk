import {
  ProfileOwnedByMe,
  Profile,
  isUnfollowTransactionFor,
  useHasPendingTransaction,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { FollowPolicyType, FollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';
import { failure, invariant, InvariantError, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useFollowController } from './adapters/useFollowController';

export class PrematureFollowError extends Error {
  name = 'PrematureFollowError' as const;
}

function createFollowRequest(followee: Profile, follower: Profile): FollowRequest {
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
  /**
   * The profile to follow
   */
  followee: Profile;

  /**
   * The profile that follows
   */
  follower: ProfileOwnedByMe;
};

export type FollowOperation = Operation<
  void,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | PrematureFollowError
  | UserRejectedError
  | WalletConnectionError
>;

/**
 * `useFollow` is a hook that lets you follow a profile
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 *
 * The hook `execute` function resolves with a {@link Result} when the corresponding operation is queued.
 * You can use the {@link Success.isSuccess | `Result.isSuccess`} (or {@link Failure.isFailure | `Result.isFailure`}) method
 * to check if the operation queuing was successful and determine the next step if not.
 *
 * **Pro-tip**: use the {@link ProfileOwnedByMe} instance from {@link useActiveProfile} (or {@link useProfilesOwnedByMe}) as the `follower` argument.
 *
 * You can use the {@link FollowStatus | `followee.followStatus`} property to determine the status of the follow request and if you should show the follow button.
 *
 * @category Profiles
 * @group Hooks
 * @param args - {@link UseFollowArgs}
 *
 * @example
 * Follow a profile with {@link OpenFollowPolicy}
 * ```ts
 * import { useFollow, Profile, ProfileOwnedByMe } from '@lens-protocol/react-web';
 *
 * function FollowButton({ followee, follower }: { followee: Profile; follower: ProfileOwnedByMe }) {
 *   const { execute, error, isPending } = useFollow({ followee, follower });
 *
 *   const follow = async () => {
 *     const result = await execute();
 *
 *     if (result.isFailure()) {
 *       console.error(result.error);
 *     }
 *   }
 *
 *   if (followee.followStatus.canFollow === false) {
 *     return null;
 *   }
 *
 *   if (followee.followStatus.isFollowedByMe) {
 *     return (
 *       <p>You are following this profile</p>
 *     )
 *   }
 *
 *   return (
 *     <button onClick={follow} disabled={isPending}>
 *       Follow
 *     </button>
 *   );
 * }
 * ```
 */
export function useFollow({ followee, follower }: UseFollowArgs): FollowOperation {
  const follow = useFollowController();

  const hasPendingUnfollowTx = useHasPendingTransaction(
    isUnfollowTransactionFor({ profileId: followee.id }),
  );

  return useOperation(
    async (): PromiseResult<
      void,
      | BroadcastingError
      | InsufficientAllowanceError
      | InsufficientFundsError
      | PendingSigningRequestError
      | PrematureFollowError
      | UserRejectedError
      | WalletConnectionError
    > => {
      if (hasPendingUnfollowTx) {
        return failure(
          new PrematureFollowError(
            `A previous unfollow request for ${followee.handle} is still pending. Make sure you check 'followee.followStatus.canFollow' beforehand.`,
          ),
        );
      }

      invariant(
        followee.followStatus?.canFollow,
        "You're already following this profile. Check the `followee.followStatus.canFollow` to determine if you can call `useFollow`.",
      );

      const request = createFollowRequest(followee, follower);
      return follow(request);
    },
  );
}
