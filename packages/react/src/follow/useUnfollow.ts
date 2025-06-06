import {
  type CreateUnfollowRequest,
  type OperationHandler,
  type SigningError,
  type TransactionIndexingError,
  type UnauthenticatedError,
  type UnexpectedError,
  type ValidationError
} from '@lens-protocol/client';
import { unfollow } from '@lens-protocol/client/actions';

import { TxHash } from '@lens-protocol/types';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseUnfollowArgs = {
  handler: OperationHandler;
};

/**
 * Unfollows a user on the Lens.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useUnfollow(
  args: UseUnfollowArgs,
): UseAsyncTask<
  CreateUnfollowRequest,
  TxHash,
  SigningError | ValidationError | TransactionIndexingError | UnauthenticatedError | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    unfollow(sessionClient, request)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction)
  );
}
