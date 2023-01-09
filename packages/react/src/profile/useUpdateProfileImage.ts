import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateOffChainProfileImageRequest,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { useCallback, useState } from 'react';

import {
  TransactionState,
  useHasPendingTransaction,
} from '../transactions/adapters/TransactionQueuePresenter';
import { useUpdateProfileImageController } from './adapters/useUpdateProfileImageController';

function isUpdateOffChainProfileImageRequest(
  request: UpdateProfileImageRequest,
): request is UpdateOffChainProfileImageRequest {
  return 'url' in request;
}

export type UseUpdateProfileImageArgs = {
  profileId: string;
};

export function useUpdateProfileImage({ profileId }: UseUpdateProfileImageArgs) {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);
  const [isPending, setIsPending] = useState(false);

  const updateImage = useUpdateProfileImageController();

  const hasPendingTx = useHasPendingTransaction(
    (tx): tx is TransactionState<UpdateProfileImageRequest> =>
      tx.request.kind === TransactionKind.UPDATE_PROFILE_IMAGE &&
      isUpdateOffChainProfileImageRequest(tx.request),
  );

  const update = useCallback(
    async (fileUrl: string) => {
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
    },
    [updateImage, profileId],
  );

  return {
    update,
    error,
    isPending: isPending || hasPendingTx,
  };
}
