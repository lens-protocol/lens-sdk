import type {
  AnyPost,
  Paginated,
  PostBookmarksRequest,
} from '@lens-protocol/graphql';
import { PostBookmarksQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsePostBookmarksArgs = PostBookmarksRequest;

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
  args: UsePostBookmarksArgs & Suspendable,
): SuspenseResult<Paginated<AnyPost>>;

/**
 * Fetch bookmarked posts.
 *
 * ```tsx
 * const { data, error, loading } = usePostBookmarks();
 * ```
 */
export function usePostBookmarks(
  args?: UsePostBookmarksArgs,
): ReadResult<Paginated<AnyPost>>;

export function usePostBookmarks({
  suspense = false,
  ...request
}: UsePostBookmarksArgs & { suspense?: boolean } = {}): SuspendableResult<
  Paginated<AnyPost>
> {
  return useSuspendableQuery({
    document: PostBookmarksQuery,
    variables: { request },
    suspense: suspense,
  });
}
