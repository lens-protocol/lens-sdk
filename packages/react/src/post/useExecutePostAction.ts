import type {
  ExecutePostActionRequest,
  OperationHandler,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  ValidationError,
} from '@lens-protocol/client';
import { executePostAction } from '@lens-protocol/client/actions';

import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseExecutePostActionArgs = {
  handler: OperationHandler;
};

/**
 * Execute a post action.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useExecutePostAction(
  args: UseExecutePostActionArgs,
): UseAsyncTask<
  ExecutePostActionRequest,
  void,
  | SigningError
  | TransactionIndexingError
  | UnauthenticatedError
  | UnexpectedError
  | ValidationError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    executePostAction(sessionClient, request)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction)
      .map(() => undefined),
  );
}
