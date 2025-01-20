import type { AccountPostReaction, Paginated, PostReactionsRequest } from '@lens-protocol/graphql';
import { PostReactionsQuery } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type PostReactionsArgs = PostReactionsRequest;

/**
 * Fetch reactions to a post.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePostReactions({
 *   post: postId('42'),
 *   suspense: true
 * });
 * ```
 */
export function usePostReactions(
  args: PostReactionsArgs & Suspendable,
): SuspenseResult<Paginated<AccountPostReaction>>;

/**
 * Fetch reactions to a post.
 *
 * ```tsx
 * const { data } = usePostReactions({
 *   post: postId('42'),
 * );
 * ```
 */
export function usePostReactions(
  args: PostReactionsArgs,
): ReadResult<Paginated<AccountPostReaction>>;

export function usePostReactions({
  suspense = false,
  ...request
}: PostReactionsArgs & { suspense?: boolean }): SuspendableResult<Paginated<AccountPostReaction>> {
  return useSuspendableQuery({
    document: PostReactionsQuery,
    variables: { request },
    suspense: suspense,
  });
}
