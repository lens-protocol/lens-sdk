import {
  PendingSigningRequestError,
  ProfileId,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ChargeFollowConfig, NoFeeFollowConfig } from '@lens-protocol/domain/use-cases/profile';
import { useState } from 'react';

import { useUpdateFollowPolicyController } from './adapters/useUpdateFollowPolicyController';

type UseUpdateFollowPolicyArgs = {
  profileId: ProfileId;
  followPolicy: ChargeFollowConfig | NoFeeFollowConfig;
};

export function useUpdateFollowPolicy() {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const updateFollowPolicy = useUpdateFollowPolicyController();

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
      } finally {
        setIsPending(false);
      }
    },
    error,
    isPending,
  };
}
