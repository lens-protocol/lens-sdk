import { ProfileOwnedByMeFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UpdateProfileDetailsRequest } from '@lens-protocol/domain/use-cases/profile';
import { failure, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers';
import { FailedUploadError, MetadataUploadHandler } from './adapters/MetadataUploadAdapter';
import { useUpdateProfileDetailsController } from './adapters/useUpdateProfileDetailsController';

type UseUpdateProfileDetailsArgs = {
  profile: ProfileOwnedByMeFragment;
  upload: MetadataUploadHandler;
};

export type UpdateProfileDetailsArgs = Pick<
  UpdateProfileDetailsRequest,
  'attributes' | 'bio' | 'coverPicture' | 'name'
>;

export type UpdateProfileDetailsOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError,
  [UpdateProfileDetailsArgs]
>;

export function useUpdateProfileDetails({
  profile,
  upload,
}: UseUpdateProfileDetailsArgs): UpdateProfileDetailsOperation {
  const update = useUpdateProfileDetailsController({ upload });

  return useOperation(
    async (
      details: UpdateProfileDetailsArgs,
    ): PromiseResult<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedUploadError
    > => {
      try {
        return await update({
          kind: TransactionKind.UPDATE_PROFILE_DETAILS,
          delegate: profile.dispatcher !== null,
          profileId: profile.id,
          ...details,
        });
      } catch (err: unknown) {
        if (err instanceof FailedUploadError) {
          return failure(err);
        }
        throw err;
      }
    },
  );
}
