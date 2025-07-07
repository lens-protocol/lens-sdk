import type {
  OperationHandler,
  SetAccountMetadataRequest,
  SigningError,
  TransactionIndexingError,
  UnauthenticatedError,
  UnexpectedError,
  ValidationError,
} from '@lens-protocol/client';
import {
  fetchAccount,
  setAccountMetadata,
} from '@lens-protocol/client/actions';

import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseSetAccountMetadataArgs = {
  handler: OperationHandler;
};

/**
 * Set account metadata.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useSetAccountMetadata(
  args: UseSetAccountMetadataArgs,
): UseAsyncTask<
  { metadata: SetAccountMetadataRequest; account: string },
  void,
  | SigningError
  | ValidationError
  | TransactionIndexingError
  | UnauthenticatedError
  | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    setAccountMetadata(sessionClient, request.metadata)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction)
      .map(() => undefined)
      .andTee(() => fetchAccount(sessionClient, { address: request.account })),
  );
}
