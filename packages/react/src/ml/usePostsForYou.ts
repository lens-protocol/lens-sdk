import type { Paginated, PostsForYouRequest } from '@lens-protocol/graphql';
import { MlPostsForYouQuery, type PostForYou } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsePostsForYouArgs = PostsForYouRequest;

/**
 * Fetch a list of recommended posts for a given account address or the current user's Account.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePostsForYou({ account: evmAddress('0x…'), suspense: true });
 * ```
 */
export function usePostsForYou(
  args: UsePostsForYouArgs & Suspendable,
): SuspenseResult<Paginated<PostForYou> | null>;

/**
 * Fetch a list of recommended posts for a given account address or the current user's Account.
 *
 * ```tsx
 * const { data, loading } = usePostsForYou({ account: evmAddress('0x…') });
 * ```
 */
export function usePostsForYou(args: UsePostsForYouArgs): ReadResult<Paginated<PostForYou> | null>;

export function usePostsForYou({
  suspense = false,
  ...request
}: UsePostsForYouArgs & { suspense?: boolean }): SuspendableResult<Paginated<PostForYou> | null> {
  return useSuspendableQuery({
    document: MlPostsForYouQuery,
    variables: { request },
    suspense,
  });
}
