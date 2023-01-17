import {
  PendingSigningRequestError,
  ProfileId,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  ChargeFollowPolicy,
  NoFeeFollowPolicy,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { useState } from 'react';

import {
  TransactionState,
  useWaitUntilTransactionSettled,
} from './adapters/TransactionQueuePresenter';
import { useUpdateFollowPolicyController } from './adapters/useUpdateFollowPolicyController';

type UseUpdateFollowPolicyArgs = {
  profileId: ProfileId;
  followPolicy: ChargeFollowPolicy | NoFeeFollowPolicy;
};

export function useUpdateFollowPolicy() {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const updateFollowPolicy = useUpdateFollowPolicyController();
  const waitUntilTransactionIsSettled = useWaitUntilTransactionSettled();

  return {
    updateFollowPolicy: async ({ profileId, followPolicy }: UseUpdateFollowPolicyArgs) => {
      setError(null);
      setIsPending(true);

      try {
        const result = await updateFollowPolicy({
          profileId,
          policy: followPolicy,
          kind: TransactionKind.UPDATE_FOLLOW_POLICY,
        });

        if (result.isFailure()) {
          setError(result.error);
        }

        await waitUntilTransactionIsSettled(
          (transaction): transaction is TransactionState<UpdateFollowPolicyRequest> =>
            transaction.request.kind === TransactionKind.UPDATE_FOLLOW_POLICY &&
            transaction.request.profileId === profileId,
        );
      } finally {
        setIsPending(false);
      }
    },
    error,
    isPending,
  };
}
