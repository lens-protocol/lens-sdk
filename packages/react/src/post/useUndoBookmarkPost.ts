import type {
  BookmarkPostRequest,
  UnauthenticatedError,
  UnexpectedError,
} from '@lens-protocol/client';
import { undoBookmarkPost } from '@lens-protocol/client/actions';

import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

/**
 * Undo bookmark of a post.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 *
 * ```tsx
 * import { PostId, useUndoBookmarkPost } from '@lens-protocol/react';
 *
 * const { execute } = useUndoBookmarkPost();
 *
 * const result = await execute({
 *   post: PostId('42'),
 * });
 *
 * if (result.isErr()) {
 *   console.error(result.error);
 * }
 * ```
 */
export function useUndoBookmarkPost(): UseAsyncTask<
  BookmarkPostRequest,
  void,
  UnauthenticatedError | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    undoBookmarkPost(sessionClient, request),
  );
}
