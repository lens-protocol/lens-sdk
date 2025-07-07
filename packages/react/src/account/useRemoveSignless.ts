import type {
  OperationHandler,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  ValidationError,
} from '@lens-protocol/client';
import { fetchMeDetails, removeSignless } from '@lens-protocol/client/actions';
import type { TxHash } from '@lens-protocol/types';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseRemoveSignlessArgs = {
  handler: OperationHandler;
};

/**
 * Remove signless for the authenticated Account.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useRemoveSignless(
  args: UseRemoveSignlessArgs,
): UseAsyncTask<
  void,
  TxHash,
  | SigningError
  | ValidationError
  | TransactionIndexingError
  | UnauthenticatedError
  | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient) =>
    removeSignless(sessionClient)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction)
      .andTee(() => fetchMeDetails(sessionClient)),
  );
}
