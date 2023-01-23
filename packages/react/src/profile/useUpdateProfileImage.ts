import { ProfileFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { useState } from 'react';

import { useUpdateProfileImageController } from './adapters/useUpdateProfileImageController';

export type UseUpdateProfileImageArgs = {
  profile: ProfileFragment;
};

export function useUpdateProfileImage({ profile }: UseUpdateProfileImageArgs) {
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
        profileId: profile.id,
        url: fileUrl,
        delegate: profile.dispatcher !== null,
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
