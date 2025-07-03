import type {
  CreateFollowRequest,
  OperationHandler,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  ValidationError,
} from '@lens-protocol/client';
import { fetchAccount, follow } from '@lens-protocol/client/actions';

import type { TxHash } from '@lens-protocol/types';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseFollowArgs = {
  handler: OperationHandler;
};

/**
 * Follows a user on the Lens.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useFollow(
  args: UseFollowArgs,
): UseAsyncTask<
  CreateFollowRequest,
  TxHash,
  | SigningError
  | ValidationError
  | TransactionIndexingError
  | UnauthenticatedError
  | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    follow(sessionClient, request)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction),
  );
}
