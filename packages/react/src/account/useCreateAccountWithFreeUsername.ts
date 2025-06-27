import type {
  OperationHandler,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  ValidationError,
} from '@lens-protocol/client';
import {
  createAccountWithUsername,
  fetchAccount,
} from '@lens-protocol/client/actions';
import type {
  Account,
  CreateAccountWithUsernameRequest,
} from '@lens-protocol/graphql';
import { nonNullable } from '@lens-protocol/types';

import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseCreateAccountWithFreeUsernameArgs = {
  handler: OperationHandler;
};

/**
 * Use this hook to create an Account with a free username (no rules enforced)
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useCreateAccountWithFreeUsername(
  args: UseCreateAccountWithFreeUsernameArgs,
): UseAsyncTask<
  CreateAccountWithUsernameRequest,
  Account,
  | SigningError
  | ValidationError
  | TransactionIndexingError
  | UnauthenticatedError
  | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    createAccountWithUsername(sessionClient, request)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction)
      .andThen((txHash) => fetchAccount(sessionClient, { txHash }))
      .map(nonNullable),
  );
}
