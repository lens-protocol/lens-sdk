import type { Paginated, PostsExploreRequest } from '@lens-protocol/graphql';
import { MlPostsExploreQuery, Post, } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type PostsToExploreArgs = PostsExploreRequest;

/**
 * Fetch posts to explore.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePostsToExplore({ suspense: true });
 * ```
 */
export function usePostsToExplore(args: PostsToExploreArgs & Suspendable): SuspenseResult<Paginated<Post> | null>;

/**
 * Fetch posts to explore.
 *
 * ```tsx
 * const { data, loading } = usePostsToExplore({});
 * ```
 */
export function usePostsToExplore(args: PostsToExploreArgs): ReadResult<Paginated<Post> | null>;

export function usePostsToExplore({
  suspense = false,
  ...request
}: PostsToExploreArgs & { suspense?: boolean }): SuspendableResult<Paginated<Post> | null> {
  return useSuspendableQuery({
    document: MlPostsExploreQuery,
    variables: { request },
    suspense,
  });
}
