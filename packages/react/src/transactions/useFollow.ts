import { Profile } from '@lens-protocol/api-bindings';
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
import { InvariantError, invariant } from '@lens-protocol/shared-kernel';

import { Session, SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useFollowController } from './adapters/useFollowController';

export class PrematureFollowError extends Error {
  name = 'PrematureFollowError' as const;
}

function createFollowRequest(profile: Profile, session?: Session): FollowRequest {
  invariant(
    session?.authenticated,
    'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
  );
  invariant(
    session.type === SessionType.WithProfile,
    'You must have a profile to use this operation.',
  );

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
        delegate: session.profile.signless,
      };
    case FollowPolicyType.NO_ONE:
      throw new InvariantError(`The profile is configured so that nobody can follow it.`);
    case FollowPolicyType.UNKNOWN:
      throw new InvariantError(`The profile is configured with an unknown follow module.`);
  }
}

/**
 * An object representing the result of a follow operation.
 *
 * It allows to wait for the transaction to be processed and indexed.
 */
export type FollowAsyncResult = AsyncTransactionResult<void>;

export type FollowArgs = {
  /**
   * The profile to follow
   */
  profile: Profile;
};

/**
 * `useFollow` allows you to follow another Profile.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { execute: follow, error, loading } = useFollow();
 *
 * <button onClick={() => follow({ profile })} disabled={loading}>
 *   Follow
 * </button>
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useFollow(): UseDeferredTask<
  FollowAsyncResult,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | PrematureFollowError
  | UserRejectedError
  | WalletConnectionError,
  FollowArgs
> {
  const { data: session } = useSession();
  const followProfile = useFollowController();

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
      "You're already following this profile. Check the `profile.operations.canFollow` to determine if you can call `useFollow`.",
    );

    const request = createFollowRequest(profile, session);
    return followProfile(request);
  });
}

/**
 * @deprecated use useFollow instead, this will be removed soon.
 */
export const useFollowProfile = useFollow;
