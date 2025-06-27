import type {
  OperationHandler,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  ValidationError,
} from '@lens-protocol/client';
import { createAccount, fetchAccount } from '@lens-protocol/client/actions';

import type { Account, CreateAccountRequest } from '@lens-protocol/graphql';
import { nonNullable } from '@lens-protocol/types';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseCreateAccountArgs = {
  handler: OperationHandler;
};

/**
 * Creates an Account on Lens.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useCreateAccount(
  args: UseCreateAccountArgs,
): UseAsyncTask<
  CreateAccountRequest,
  Account,
  | SigningError
  | ValidationError
  | TransactionIndexingError
  | UnauthenticatedError
  | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    createAccount(sessionClient, request)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction)
      .andThen((txHash) => fetchAccount(sessionClient, { txHash }))
      .map(nonNullable),
  );
}
