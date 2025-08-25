import type { Feed } from '@lens-protocol/graphql';
import {
  FeedsQuery,
  type FeedsRequest,
  type Paginated,
} from '@lens-protocol/graphql';
import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseFeedsArgs = FeedsRequest;

/**
 * Fetch a list of Feeds.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useFeeds({
 *   filter: {
 *     managedBy: {
 *       address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')
 *     }
 *   },
 *   suspense: true });
 * ```
 */
export function useFeeds(
  args: UseFeedsArgs & Suspendable,
): SuspenseResult<Paginated<Feed> | null>;

/**
 * Fetch a list of Feeds.
 *
 * ```tsx
 * const { data, error, loading } = useFeeds({
 *   filter: {
 *     managedBy: {
 *       address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')
 *     }
 *   },
 * });
 * ```
 */
export function useFeeds(
  args: UseFeedsArgs,
): ReadResult<Paginated<Feed> | null>;

export function useFeeds({
  suspense = false,
  ...request
}: UseFeedsArgs & {
  suspense?: boolean;
}): SuspendableResult<Paginated<Feed> | null> {
  return useSuspendableQuery({
    document: FeedsQuery,
    variables: { request },
    suspense,
  });
}
