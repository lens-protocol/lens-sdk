import type { AnyPost, Paginated, PostsRequest } from '@lens-protocol/graphql';
import { PostsQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsePostsArgs = PostsRequest;

/**
 * Fetch posts available filtered by the given arguments.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePosts({
 *   filter: {
 *     searchQuery: 'test',
 *   },
 *   suspense: true
 * });
 * ```
 */
export function usePosts(
  args: UsePostsArgs & Suspendable,
): SuspenseResult<Paginated<AnyPost>>;

/**
 * Fetch posts available filtered by the given arguments.
 *
 * ```tsx
 * const { data, loading } = usePosts({
 *   filter: {
 *     searchQuery: 'test',
 *   },
 * });
 * ```
 */
export function usePosts(args: UsePostsArgs): ReadResult<Paginated<AnyPost>>;

export function usePosts({
  suspense = false,
  ...request
}: UsePostsArgs & { suspense?: boolean }): SuspendableResult<Paginated<AnyPost>> {
  return useSuspendableQuery({
    document: PostsQuery,
    variables: { request },
    suspense: suspense,
  });
}
