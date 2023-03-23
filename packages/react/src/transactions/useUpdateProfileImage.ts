import { ProfileFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';

import { Operation, useOperation } from '../helpers/operations';
import { useUpdateProfileImageController } from './adapters/useUpdateProfileImageController';

export type UseUpdateProfileImageArgs = {
  profile: ProfileFragment;
};

export type UpdateProfileImageOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  [string]
>;

export function useUpdateProfileImage({
  profile,
}: UseUpdateProfileImageArgs): UpdateProfileImageOperation {
  const updateImage = useUpdateProfileImageController();

  return useOperation(async (fileUrl: string) => {
    return updateImage({
      kind: TransactionKind.UPDATE_PROFILE_IMAGE,
      profileId: profile.id,
      url: fileUrl,
      delegate: profile.dispatcher !== null,
    });
  });
}
