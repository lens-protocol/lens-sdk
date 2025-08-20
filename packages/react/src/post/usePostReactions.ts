import type {
  AccountPostReaction,
  Paginated,
  PostReactionsRequest,
} from '@lens-protocol/graphql';
import { PostReactionsQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsePostReactionsArgs = PostReactionsRequest;

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
  args: UsePostReactionsArgs & Suspendable,
): SuspenseResult<Paginated<AccountPostReaction>>;

/**
 * Fetch reactions to a post.
 *
 * ```tsx
 * const { data, loading } = usePostReactions({
 *   post: postId('42'),
 * );
 * ```
 */
export function usePostReactions(
  args: UsePostReactionsArgs,
): ReadResult<Paginated<AccountPostReaction>>;

export function usePostReactions({
  suspense = false,
  ...request
}: UsePostReactionsArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<AccountPostReaction>
> {
  return useSuspendableQuery({
    document: PostReactionsQuery,
    variables: { request },
    suspense: suspense,
  });
}
