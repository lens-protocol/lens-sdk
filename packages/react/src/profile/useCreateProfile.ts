import { DuplicatedHandleError } from '@lens-protocol/domain/use-cases/profile';
import { useState } from 'react';

import { useCreateProfileController } from './adapters/useCreateProfileController';

export function useCreateProfile() {
  const [error, setError] = useState<DuplicatedHandleError | null>(null);
  const [isPending, setIsPending] = useState(false);
  const createProfile = useCreateProfileController();

  return {
    create: async (handle: string) => {
      setIsPending(true);

      try {
        const result = await createProfile(handle);

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

export { DuplicatedHandleError };
