import type { Paginated, PostsExploreRequest } from '@lens-protocol/graphql';
import { MlPostsExploreQuery, type Post } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsePostsToExploreArgs = PostsExploreRequest;

/**
 * Fetch a list of recommended posts using Lens's ML algorithms.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePostsToExplore({ suspense: true });
 * ```
 */
export function usePostsToExplore(
  args: UsePostsToExploreArgs & Suspendable,
): SuspenseResult<Paginated<Post>>;

/**
 * Fetch a list of recommended posts using Lens's ML algorithms.
 *
 * ```tsx
 * const { data, loading } = usePostsToExplore();
 * ```
 */
export function usePostsToExplore(
  args?: UsePostsToExploreArgs,
): ReadResult<Paginated<Post>>;

export function usePostsToExplore(
  args?: UsePostsToExploreArgs & { suspense?: boolean },
): SuspendableResult<Paginated<Post>> {
  const { suspense = false, ...request } = args ?? {};
  return useSuspendableQuery({
    document: MlPostsExploreQuery,
    variables: { request: request ?? {} },
    suspense,
  });
}
