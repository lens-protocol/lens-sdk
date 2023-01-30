import { TransactionError, TransactionKind } from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
} from '@lens-protocol/domain/use-cases/profile';
import { useState } from 'react';

import {
  TransactionState,
  useWaitUntilTransactionSettled,
} from '../transactions/adapters/TransactionQueuePresenter';
import { useCreateProfileController } from './adapters/useCreateProfileController';

export function useCreateProfile() {
  const [error, setError] = useState<DuplicatedHandleError | TransactionError | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const createProfile = useCreateProfileController();

  const waitUntilTransactionIsSettled = useWaitUntilTransactionSettled();

  return {
    create: async (handle: string) => {
      try {
        setIsPending(true);
        setError(null);

        const result = await createProfile(handle);

        if (result.isFailure()) {
          setError(result.error);
          return;
        }

        await waitUntilTransactionIsSettled(
          (transaction): transaction is TransactionState<CreateProfileRequest> =>
            transaction.request.kind === TransactionKind.CREATE_PROFILE &&
            transaction.request.handle === handle,
        );
      } catch (e) {
        if (e instanceof TransactionError) {
          setError(e);
          return;
        }
        throw e;
      } finally {
        setIsPending(false);
      }
    },
    error,
    isPending,
  };
}

export { DuplicatedHandleError };
