import type { AnyPost, PostRequest } from '@lens-protocol/graphql';
import { PostQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsePostArgs = PostRequest;

/**
 * Fetch a single post.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePost({ post: postId('34…'), suspense: true });
 * ```
 */
export function usePost(
  args: UsePostArgs & Suspendable,
): SuspenseResult<AnyPost | null>;

/**
 * Fetch a single post.
 *
 * ```tsx
 * const { data, error, loading } = usePost({ post: postId('34…') });
 * ```
 */
export function usePost(args: UsePostArgs): ReadResult<AnyPost | null>;

export function usePost({
  suspense = false,
  ...request
}: UsePostArgs & { suspense?: boolean }): SuspendableResult<AnyPost | null> {
  return useSuspendableQuery({
    document: PostQuery,
    variables: { request },
    suspense,
  });
}
