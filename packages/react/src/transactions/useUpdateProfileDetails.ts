import { ProfileFieldsFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UpdateProfileDetailsRequest } from '@lens-protocol/domain/use-cases/profile';
import { useState } from 'react';

import { FailedUploadError, MetadataUploadHandler } from './adapters/MetadataUploadAdapter';
import { useUpdateProfileDetailsController } from './adapters/useUpdateProfileDetailsController';

type UseUpdateProfileDetailsArgs = {
  profile: ProfileFieldsFragment;
  upload: MetadataUploadHandler;
};

export type ProfileDetails = Pick<
  UpdateProfileDetailsRequest,
  'attributes' | 'bio' | 'coverPicture' | 'name'
>;

export function useUpdateProfileDetails({ profile, upload }: UseUpdateProfileDetailsArgs) {
  const [error, setError] = useState<
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | FailedUploadError
    | null
  >(null);
  const [isPending, setIsPending] = useState(false);
  const update = useUpdateProfileDetailsController({ upload });

  return {
    update: async (details: ProfileDetails) => {
      setError(null);
      setIsPending(true);

      try {
        const result = await update({
          kind: TransactionKind.UPDATE_PROFILE_DETAILS,
          delegate: profile.dispatcher !== null,
          profileId: profile.id,
          ...details,
        });
        if (result.isFailure()) {
          setError(result.error);
        }
      } catch (err: unknown) {
        if (err instanceof FailedUploadError) {
          setError(err);
          return;
        }
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    error,
    isPending,
  };
}
