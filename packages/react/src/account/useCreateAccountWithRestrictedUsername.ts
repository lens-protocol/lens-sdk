import type {
  AuthenticationError,
  OperationHandler,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  ValidationError,
} from '@lens-protocol/client';
import {
  createAccount,
  createUsername,
  fetchAccount,
} from '@lens-protocol/client/actions';
import type {
  Account,
  CreateAccountRequest,
  CreateUsernameRequest,
} from '@lens-protocol/graphql';
import { nonNullable } from '@lens-protocol/types';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseCreateAccountWithRestrictedUsernameArgs = {
  handler: OperationHandler;
};

export type UseCreateAccountWithRestrictedUsernameRequest =
  CreateAccountRequest & CreateUsernameRequest;

/**
 * Use this hook to create an Account with a username in a Namespace that enforces token gating or fees
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useCreateAccountWithRestrictedUsername(
  args: UseCreateAccountWithRestrictedUsernameArgs,
): UseAsyncTask<
  UseCreateAccountWithRestrictedUsernameRequest,
  Account,
  | SigningError
  | ValidationError
  | TransactionIndexingError
  | UnauthenticatedError
  | UnexpectedError
  | AuthenticationError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    createAccount(sessionClient, request)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction)
      .andThen((txHash) => fetchAccount(sessionClient, { txHash }))
      .map(nonNullable)
      .andThen((account) =>
        sessionClient
          .switchAccount({ account: account.address })
          .andThen(() => createUsername(sessionClient, request))
          .andThen(args.handler)
          .andThen(sessionClient.waitForTransaction)
          .andThen(() =>
            fetchAccount(sessionClient, { address: account.address }),
          )
          .map(nonNullable),
      ),
  );
}
