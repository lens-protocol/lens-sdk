import { DuplicatedHandleError } from '@lens-protocol/domain/use-cases/profile';
import { useState } from 'react';

import { useCreateProfileController } from './adapters/useCreateProfileController';

export function useCreateProfile() {
  const [error, setError] = useState<DuplicatedHandleError | null>(null);
  const [isPending, setIsPending] = useState(false);
  const createProfile = useCreateProfileController();

  return {
    create: (handle: string) => {
      setIsPending(true);

      void createProfile(handle)
        .then((result) => {
          if (result.isFailure()) {
            setError(result.error);
          }
        })
        .finally(() => setIsPending(false));
    },
    error,
    isPending,
  };
}
export { DuplicatedHandleError };
