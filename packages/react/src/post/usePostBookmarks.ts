import type { AnyPost, Paginated, PostBookmarksRequest } from '@lens-protocol/graphql';
import { PostBookmarksQuery } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type PostBookmarksArgs = PostBookmarksRequest;

/**
 * Fetch bookmarked posts.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePostBookmarks({ suspense: true });
 * ```
 */
export function usePostBookmarks(
  args: PostBookmarksArgs & Suspendable,
): SuspenseResult<Paginated<AnyPost>>;

/**
 * Fetch bookmarked posts.
 *
 * ```tsx
 * const { data, loading } = usePostBookmarks();
 * ```
 */
export function usePostBookmarks(args: PostBookmarksArgs): ReadResult<Paginated<AnyPost>>;

export function usePostBookmarks({
  suspense = false,
  ...request
}: PostBookmarksArgs & { suspense?: boolean }): SuspendableResult<Paginated<AnyPost>> {
  return useSuspendableQuery({
    document: PostBookmarksQuery,
    variables: { request },
    suspense: suspense,
  });
}
