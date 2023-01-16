import { UpdateFollowPolicyRequest } from '@lens-protocol/domain/dist/use-cases/profile';
import { useState } from 'react';

import { useUpdateFollowPolicyController } from './adapters/useUpdateFollowPolicyController';

export function useUpdateFollowPolicy() {
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const updateFollowPolicy = useUpdateFollowPolicyController();

  return {
    updateFollowPolicy: async (args: UpdateFollowPolicyRequest) => {
      setError(null);
      setIsPending(true);

      try {
        const result = await updateFollowPolicy(args);
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
