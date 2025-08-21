import type {
  OperationHandler,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  ValidationError,
} from '@lens-protocol/client';
import {
  addAccountManager,
  fetchAccountManagers,
} from '@lens-protocol/client/actions';
import type {
  AccountManager,
  AddAccountManagerRequest,
  Paginated,
} from '@lens-protocol/graphql';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseAddAccountManagerArgs = {
  handler: OperationHandler;
};

const DEFAULT_PERMISSIONS = {
  canExecuteTransactions: false,
  canTransferTokens: false,
  canTransferNative: false,
  canSetMetadataUri: true,
};

/**
 * Add an account manager to the authenticated account.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useAddAccountManager(
  args: UseAddAccountManagerArgs,
): UseAsyncTask<
  AddAccountManagerRequest,
  Paginated<AccountManager>,
  | SigningError
  | ValidationError
  | TransactionIndexingError
  | UnauthenticatedError
  | UnexpectedError
> {
  return useAuthenticatedAsyncTask(
    (sessionClient, { address, permissions }) => {
      const request = {
        address,
        permissions: permissions ?? DEFAULT_PERMISSIONS,
      };

      return addAccountManager(sessionClient, request)
        .andThen(args.handler)
        .andThen(sessionClient.waitForTransaction)
        .andThen(() => fetchAccountManagers(sessionClient));
    },
  );
}
