import type { Paginated, PostsForYouRequest } from '@lens-protocol/graphql';
import { MlPostsForYouQuery, PostForYou } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type PostsForYouArgs = PostsForYouRequest;

/**
 * Fetch posts for you from ML.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAccountRecommendations({ account: evmAddress('0x…'), suspense: true });
 * ```
 */
export function usePostsForYou(args: PostsForYouArgs & Suspendable): SuspenseResult<Paginated<PostForYou> | null>;

/**
 * Fetch posts for you from ML.
 *
 * ```tsx
 * const { data, loading } = useAccountRecommendations({ account: evmAddress('0x…') });
 * ```
 */
export function usePostsForYou(args: PostsForYouArgs): ReadResult<Paginated<PostForYou> | null>;

export function usePostsForYou({
  suspense = false,
  ...request
}: PostsForYouArgs & { suspense?: boolean }): SuspendableResult<Paginated<PostForYou> | null> {
  return useSuspendableQuery({
    document: MlPostsForYouQuery,
    variables: { request },
    suspense,
  });
}
