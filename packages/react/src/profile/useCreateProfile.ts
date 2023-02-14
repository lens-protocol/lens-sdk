import { TransactionError, TransactionKind } from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
} from '@lens-protocol/domain/use-cases/profile';
import { failure, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers';
import {
  TransactionState,
  useWaitUntilTransactionSettled,
} from '../transactions/adapters/TransactionQueuePresenter';
import { useCreateProfileController } from './adapters/useCreateProfileController';

export type CreateProfileOperation = Operation<
  void,
  DuplicatedHandleError | TransactionError,
  [string]
>;

export function useCreateProfile(): CreateProfileOperation {
  const createProfile = useCreateProfileController();

  const waitUntilTransactionIsSettled = useWaitUntilTransactionSettled();

  return useOperation(
    async (handle: string): PromiseResult<void, DuplicatedHandleError | TransactionError> => {
      try {
        const result = await createProfile(handle);

        if (result.isSuccess()) {
          await waitUntilTransactionIsSettled(
            (transaction): transaction is TransactionState<CreateProfileRequest> =>
              transaction.request.kind === TransactionKind.CREATE_PROFILE &&
              transaction.request.handle === handle,
          );
        }

        return result;
      } catch (e) {
        if (e instanceof TransactionError) {
          return failure(e);
        }
        throw e;
      }
    },
  );
}

export { DuplicatedHandleError };
