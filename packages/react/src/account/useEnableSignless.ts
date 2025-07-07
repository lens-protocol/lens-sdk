import type {
  OperationHandler,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  ValidationError
} from '@lens-protocol/client';
import { enableSignless } from '@lens-protocol/client/actions';

import { fetchMeDetails } from '@lens-protocol/client/actions';
import type { TxHash } from '@lens-protocol/types';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseEnableSignlessArgs = {
  handler: OperationHandler;
};

/**
 * Enable signless for the authenticated Account.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useEnableSignless(
  args: UseEnableSignlessArgs,
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
    enableSignless(sessionClient)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction)
      .andTee(() => fetchMeDetails(sessionClient))
  );
}
