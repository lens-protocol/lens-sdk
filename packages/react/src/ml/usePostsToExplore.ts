import type { Paginated, PostsExploreRequest } from '@lens-protocol/graphql';
import { MlPostsExploreQuery, type Post } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsePostsToExploreArgs = PostsExploreRequest;

/**
 * Fetch posts to explore.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePostsToExplore({ suspense: true });
 * ```
 */
export function usePostsToExplore(
  args: UsePostsToExploreArgs & Suspendable,
): SuspenseResult<Paginated<Post> | null>;

/**
 * Fetch posts to explore.
 *
 * ```tsx
 * const { data, loading } = usePostsToExplore({});
 * ```
 */
export function usePostsToExplore(args: UsePostsToExploreArgs): ReadResult<Paginated<Post> | null>;

export function usePostsToExplore({
  suspense = false,
  ...request
}: UsePostsToExploreArgs & { suspense?: boolean }): SuspendableResult<Paginated<Post> | null> {
  return useSuspendableQuery({
    document: MlPostsExploreQuery,
    variables: { request },
    suspense,
  });
}
