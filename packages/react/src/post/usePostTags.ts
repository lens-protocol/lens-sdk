import type {
  Paginated,
  PostTag,
  PostTagsRequest,
} from '@lens-protocol/graphql';
import { PostTagsQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UsePostTagsArgs = PostTagsRequest;

/**
 * Fetch post tags.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = usePostTags({
 *   filter: {
 *     feeds: { globalFeed: true },
 *   },
 *   suspense: true
 * });
 * ```
 */
export function usePostTags(
  args: UsePostTagsArgs & Suspendable,
): SuspenseResult<Paginated<PostTag>>;

/**
 * Fetch post tags.
 *
 * ```tsx
 * const { data, error, loading } = usePostTags({
 *   filter: {
 *     feeds: { globalFeed: true },
 *   },
 * });
 * ```
 */
export function usePostTags(
  args: UsePostTagsArgs,
): ReadResult<Paginated<PostTag>>;

export function usePostTags({
  suspense = false,
  ...request
}: UsePostTagsArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<PostTag>
> {
  return useSuspendableQuery({
    document: PostTagsQuery,
    variables: { request },
    suspense,
  });
}
