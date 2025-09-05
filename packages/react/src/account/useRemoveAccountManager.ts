import type {
  OperationHandler,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  ValidationError,
} from '@lens-protocol/client';
import {
  fetchAccountManagers,
  removeAccountManager,
} from '@lens-protocol/client/actions';
import type {
  AccountManager,
  Paginated,
  RemoveAccountManagerRequest,
} from '@lens-protocol/graphql';

import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseRemoveAccountManagerArgs = {
  handler: OperationHandler;
};

/**
 * Remove an account manager from the authenticated account.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useRemoveAccountManager(
  args: UseRemoveAccountManagerArgs,
): UseAsyncTask<
  RemoveAccountManagerRequest,
  Paginated<AccountManager>,
  | SigningError
  | ValidationError
  | TransactionIndexingError
  | UnauthenticatedError
  | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    removeAccountManager(sessionClient, request)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction)
      .andThen(() => fetchAccountManagers(sessionClient)),
  );
}
