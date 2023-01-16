import { ProfileId, TransactionKind } from '@lens-protocol/domain/entities';
import { ChargeFollowPolicy, NoFeeFollowPolicy } from '@lens-protocol/domain/use-cases/profile';
import { useState } from 'react';

import { useUpdateFollowPolicyController } from './adapters/useUpdateFollowPolicyController';

type UseUpdateFollowPolicyArgs = {
  profileId: ProfileId;
  followPolicy: ChargeFollowPolicy | NoFeeFollowPolicy;
};

export function useUpdateFollowPolicy() {
  const [error, setError] = useState<Error | null>(null);
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
