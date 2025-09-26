import type {
  Paginated,
  PostExecutedActions,
  WhoExecutedActionOnPostRequest,
} from '@lens-protocol/graphql';
import { WhoExecutedActionOnPostQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseWhoExecutedActionOnPostArgs = WhoExecutedActionOnPostRequest;

/**
 * Fetch who executed action on a post.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useWhoExecutedActionOnPost({
 *   post: postId('34…'),
 *   suspense: true,
 * });
 * ```
 */
export function useWhoExecutedActionOnPost(
  args: UseWhoExecutedActionOnPostArgs & Suspendable,
): SuspenseResult<Paginated<PostExecutedActions>>;

/**
 * Fetch who executed action on a post.
 *
 * ```tsx
 * const { data, error, loading } = useWhoExecutedActionOnPost({
 *   post: postId('34…'),
 * });
 * ```
 */
export function useWhoExecutedActionOnPost(
  args: UseWhoExecutedActionOnPostArgs,
): ReadResult<Paginated<PostExecutedActions>>;

export function useWhoExecutedActionOnPost({
  suspense = false,
  ...request
}: UseWhoExecutedActionOnPostArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<PostExecutedActions>
> {
  return useSuspendableQuery({
    document: WhoExecutedActionOnPostQuery,
    variables: { request },
    suspense,
  });
}
