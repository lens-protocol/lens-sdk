import { Profile } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionError,
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
import { InvariantError, invariant } from '@lens-protocol/shared-kernel';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useFollowProfileController } from './adapters/useFollowProfileController';

export class PrematureFollowError extends Error {
  name = 'PrematureFollowError' as const;
}

function createFollowRequest(profile: Profile): FollowRequest {
  const followPolicy = profile.followPolicy;
  switch (followPolicy.type) {
    case FollowPolicyType.CHARGE:
      return {
        fee: {
          amount: followPolicy.amount,
          contractAddress: followPolicy.contractAddress,
          recipient: followPolicy.recipient,
        },
        kind: TransactionKind.FOLLOW_PROFILE,
        profileId: profile.id,
      };
    case FollowPolicyType.ANYONE:
      return {
        kind: TransactionKind.FOLLOW_PROFILE,
        profileId: profile.id,
      };
    case FollowPolicyType.NO_ONE:
      throw new InvariantError(`The profile is configured so that nobody can follow it.`);
    case FollowPolicyType.UNKNOWN:
      throw new InvariantError(`The profile is configured with an unknown follow module.`);
  }
}

export type FollowProfileArgs = {
  /**
   * The profile to follow
   */
  profile: Profile;
};

/**
 * `useFollowProfile` allows you to follow another Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { execute: follow, error, loading } = useUnfollowProfile();
 *
 * <button onClick={() => follow({ profile })} disabled={loading}>
 *   Follow
 * </button>
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useFollowProfile(): UseDeferredTask<
  void,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | PrematureFollowError
  | TransactionError
  | UserRejectedError
  | WalletConnectionError,
  FollowProfileArgs
> {
  const followProfile = useFollowProfileController();

  // const hasPendingUnfollowTx = useHasPendingTransaction(
  //   isUnfollowTransactionFor({ profileId: profile.id }),
  // );

  return useDeferredTask(async ({ profile }) => {
    // if (hasPendingUnfollowTx) {
    //   return failure(
    //     new PrematureFollowError(
    //       `A previous unfollow request for ${profile.id} is still pending. Make sure you check 'profile.operations.canFollow' beforehand.`,
    //     ),
    //   );
    // }

    invariant(
      profile.operations.canFollow,
      "You're already following this profile. Check the `profile.operations.canFollow` to determine if you can call `useFollowProfile`.",
    );

    const request = createFollowRequest(profile);
    return followProfile(request);
  });
}
