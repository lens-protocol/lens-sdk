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
 * Fetch a list of post recommendations for the current user's Account.
 * If current user is not authenticated, the results will not be personalized.
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
 * Fetch a list of post recommendations for the current user's Account.
 * If current user is not authenticated, the results will not be personalized.
 *
 * ```tsx
 * const { data, loading } = usePostsToExplore();
 * ```
 */
export function usePostsToExplore(
  args?: UsePostsToExploreArgs,
): ReadResult<Paginated<Post> | null>;

export function usePostsToExplore(
  args?: UsePostsToExploreArgs & { suspense?: boolean },
): SuspendableResult<Paginated<Post> | null> {
  const { suspense = false, ...request } = args ?? {};
  return useSuspendableQuery({
    document: MlPostsExploreQuery,
    variables: { request: request ?? {} },
    suspense,
  });
}
