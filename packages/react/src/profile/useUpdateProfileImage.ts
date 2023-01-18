import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { useState } from 'react';

import { useUpdateProfileImageController } from './adapters/useUpdateProfileImageController';

export type UseUpdateProfileImageArgs = {
  profileId: string;
};

export function useUpdateProfileImage({ profileId }: UseUpdateProfileImageArgs) {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);
  const [isPending, setIsPending] = useState(false);

  const updateImage = useUpdateProfileImageController();

  const update = async (fileUrl: string) => {
    setError(null);
    setIsPending(true);

    try {
      const result = await updateImage({
        kind: TransactionKind.UPDATE_PROFILE_IMAGE,
        profileId,
        url: fileUrl,
      });

      if (result.isFailure()) {
        setError(result.error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return {
    update,
    error,
    isPending: isPending,
  };
}
