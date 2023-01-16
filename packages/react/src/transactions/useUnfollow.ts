import { ProfileFieldsFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { IEquatableError } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import { TransactionState, useHasPendingTransaction } from './adapters/TransactionQueuePresenter';
import { useUnfollowController } from './adapters/useUnfollowController';

export class PrematureUnfollowError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export type UseUnfollowArgs = {
  profile: ProfileFieldsFragment;
};

export function useUnfollow({ profile }: UseUnfollowArgs) {
  const [error, setError] = useState<
    | PendingSigningRequestError
    | WalletConnectionError
    | UserRejectedError
    | IEquatableError
    | PrematureUnfollowError
    | null
  >(null);
  const unfollow = useUnfollowController();

  const hasPendingTx = useHasPendingTransaction(
    (transaction): transaction is TransactionState<UnfollowRequest> =>
      transaction.request.kind === TransactionKind.UNFOLLOW_PROFILE &&
      transaction.request.profileId === profile.id,
  );

  return {
    unfollow: async () => {
      if (!profile.isFollowedByMe && profile.isOptimisticFollowedByMe) {
        setError(
          new PrematureUnfollowError(`Your follow request for ${profile.handle} is still pending.`),
        );
        return;
      }

      const result = await unfollow({
        kind: TransactionKind.UNFOLLOW_PROFILE,
        profileId: profile.id,
      });

      if (result.isFailure()) {
        setError(result.error);
      }
    },
    error,
    isPending: hasPendingTx,
  };
}
