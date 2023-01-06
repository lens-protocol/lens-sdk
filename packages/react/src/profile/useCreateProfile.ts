import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
} from '@lens-protocol/domain/use-cases/profile';
import { useState } from 'react';

import {
  TransactionState,
  useHasPendingTransaction,
} from '../transactions/adapters/TransactionQueuePresenter';
import { useCreateProfileController } from './adapters/useCreateProfileController';

export function useCreateProfile() {
  const [error, setError] = useState<DuplicatedHandleError | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [handle, setHandle] = useState<string>('');
  const createProfile = useCreateProfileController();

  const hasPendingTx = useHasPendingTransaction(
    (transaction): transaction is TransactionState<CreateProfileRequest> =>
      transaction.request.kind === TransactionKind.CREATE_PROFILE &&
      transaction.request.handle === handle,
  );

  return {
    create: async (_handle: string) => {
      try {
        setHandle(_handle);
        setIsPending(true);
        setError(null);

        const result = await createProfile(_handle);

        if (result.isFailure()) {
          setError(result.error);
        }
      } finally {
        setIsPending(false);
      }
    },
    error,
    isPending: isPending || hasPendingTx,
  };
}

export { DuplicatedHandleError };
