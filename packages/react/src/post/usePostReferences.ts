import type {
  AnyPost,
  Paginated,
  PostReferencesRequest,
} from '@lens-protocol/graphql';
import { PostReferencesQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsePostReferencesArgs = PostReferencesRequest;

/**
 * Fetch references to a post.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePostReferences({
 *   referencedTypes: [PostReferenceType.CommentOn],
 *   referencedPost: postId('42'),
 *   suspense: true
 * });
 * ```
 */
export function usePostReferences(
  args: UsePostReferencesArgs & Suspendable,
): SuspenseResult<Paginated<AnyPost>>;

/**
 * Fetch references to a post.
 *
 * ```tsx
 * const { data, loading } = usePostReferences({
 *   referencedTypes: [PostReferenceType.CommentOn],
 *   referencedPost: postId('42'),
 * );
 * ```
 */
export function usePostReferences(
  args: UsePostReferencesArgs,
): ReadResult<Paginated<AnyPost>>;

export function usePostReferences({
  suspense = false,
  ...request
}: UsePostReferencesArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<AnyPost>
> {
  return useSuspendableQuery({
    document: PostReferencesQuery,
    variables: { request },
    suspense: suspense,
  });
}
