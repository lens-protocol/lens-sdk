import type { Paginated, PostsForYouRequest } from '@lens-protocol/graphql';
import { MlPostsForYouQuery, type PostForYou } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsePostsForYouArgs = PostsForYouRequest;

/**
 * Fetch a list of recommended posts for the current user's Account.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePostsForYou({ suspense: true });
 * ```
 */
export function usePostsForYou(
  args: UsePostsForYouArgs & Suspendable,
): SuspenseResult<Paginated<PostForYou>>;

/**
 * Fetch a list of recommended posts for the current user's Account.
 *
 * ```tsx
 * const { data, error, loading } = usePostsForYou();
 * ```
 */
export function usePostsForYou(
  args?: UsePostsForYouArgs,
): ReadResult<Paginated<PostForYou>>;

export function usePostsForYou(
  args?: UsePostsForYouArgs & { suspense?: boolean },
): SuspendableResult<Paginated<PostForYou>> {
  const { suspense = false, ...request } = args ?? {};
  return useSuspendableQuery({
    document: MlPostsForYouQuery,
    variables: { request: request ?? {} },
    suspense,
  });
}
