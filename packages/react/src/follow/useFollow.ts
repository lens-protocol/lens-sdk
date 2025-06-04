import {
  type Account,
  type CreateFollowRequest,
  type OperationHandler,
  type SigningError,
  type TransactionIndexingError,
  type UnauthenticatedError,
  type UnexpectedError,
  type ValidationError,
  nonNullable,
} from '@lens-protocol/client';
import { fetchAccount, follow } from '@lens-protocol/client/actions';

import { expectTypename } from '@lens-protocol/types';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

/**
 * Follows a user on the Lens.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useFollow(
  handler: OperationHandler,
): UseAsyncTask<
  CreateFollowRequest,
  Account,
  SigningError | ValidationError | TransactionIndexingError | UnauthenticatedError | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    follow(sessionClient, request)
      .andThen(handler)
      .andThen(sessionClient.waitForTransaction)
      .andThen(() => fetchAccount(sessionClient, { address: request.account }))
      .map(nonNullable)
      .map(expectTypename('Account')),
  );
}
