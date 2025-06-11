import {
  type CreatePostRequest,
  type OperationHandler,
  type Post,
  type SigningError,
  type TransactionIndexingError,
  type UnauthenticatedError,
  type UnexpectedError,
  type ValidationError,
  expectTypename,
  nonNullable,
} from '@lens-protocol/client';
import { fetchPost, post } from '@lens-protocol/client/actions';

import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type UseCreatePostArgs = {
  handler: OperationHandler;
};

/**
 * Creates a new post on the Lens.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useCreatePost(
  args: UseCreatePostArgs,
): UseAsyncTask<
  CreatePostRequest,
  Post,
  SigningError | ValidationError | TransactionIndexingError | UnauthenticatedError | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    post(sessionClient, request)
      .andThen(args.handler)
      .andThen(sessionClient.waitForTransaction)
      .andThen((txHash) => fetchPost(sessionClient, { txHash }))
      .map(nonNullable)
      .map(expectTypename('Post')),
  );
}
