import {
  type Account,
  type CreateUnfollowRequest,
  type OperationHandler,
  type SigningError,
  type TransactionIndexingError,
  type UnauthenticatedError,
  type UnexpectedError,
  type ValidationError,
  nonNullable,
} from '@lens-protocol/client';
import { fetchAccount, unfollow } from '@lens-protocol/client/actions';

import { expectTypename } from '@lens-protocol/types';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

/**
 * Unfollows a user on the Lens.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useUnfollow(
  handler: OperationHandler,
): UseAsyncTask<
  CreateUnfollowRequest,
  Account,
  SigningError | ValidationError | TransactionIndexingError | UnauthenticatedError | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    unfollow(sessionClient, request)
      .andThen(handler)
      .andThen(sessionClient.waitForTransaction)
      .andThen(() => fetchAccount(sessionClient, { address: request.account }))
      .map(nonNullable)
      .map(expectTypename('Account')),
  );
}
