import { Profile } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { Url } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useUpdateProfileImageController } from './adapters/useUpdateProfileImageController';

export type UseUpdateProfileImageArgs = {
  profile: Profile;
};

export type UpdateProfileImageOperation = Operation<
  AsyncTransactionResult<void>,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  [string]
>;

/**
 * @category Profiles
 * @group Hooks
 */
export function useUpdateProfileImage({
  profile,
}: UseUpdateProfileImageArgs): UpdateProfileImageOperation {
  const updateImage = useUpdateProfileImageController();

  return useOperation(async (url: Url) => {
    return updateImage({
      kind: TransactionKind.UPDATE_PROFILE_IMAGE,
      profileId: profile.id,
      url,
      delegate: profile.dispatcher !== null,
    });
  });
}
