import type {
  Account,
  Paginated,
  WhoReferencedPostRequest,
} from '@lens-protocol/graphql';
import { WhoReferencedPostQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseWhoReferencedPostArgs = WhoReferencedPostRequest;

/**
 * Fetch who referenced a post.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useWhoReferencedPost({ post: postId('34…'), suspense: true });
 * ```
 */
export function useWhoReferencedPost(
  args: UseWhoReferencedPostArgs & Suspendable,
): SuspenseResult<Paginated<Account>>;

/**
 * Fetch who referenced a post.
 *
 * ```tsx
 * const { data, loading } = useWhoReferencedPost({ post: postId('34…') });
 * ```
 */
export function useWhoReferencedPost(
  args: UseWhoReferencedPostArgs,
): ReadResult<Paginated<Account>>;

export function useWhoReferencedPost({
  suspense = false,
  ...request
}: UseWhoReferencedPostArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<Account>
> {
  return useSuspendableQuery({
    document: WhoReferencedPostQuery,
    variables: { request },
    suspense,
  });
}
