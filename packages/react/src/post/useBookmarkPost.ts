import type {
  BookmarkPostRequest,
  UnauthenticatedError,
  UnexpectedError,
} from '@lens-protocol/client';
import { bookmarkPost, fetchPost } from '@lens-protocol/client/actions';

import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

/**
 * Bookmark a post.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 *
 * ```tsx
 * import { postId, useBookmarkPost } from '@lens-protocol/react';
 *
 * const { execute } = useBookmarkPost();
 *
 * const result = await execute({
 *   post: postId('42'),
 * });
 *
 * if (result.isErr()) {
 *   console.error(result.error);
 * }
 * ```
 */
export function useBookmarkPost(): UseAsyncTask<
  BookmarkPostRequest,
  void,
  UnauthenticatedError | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    bookmarkPost(sessionClient, request).andTee(() =>
      fetchPost(sessionClient, { post: request.post }),
    ),
  );
}
