import type { Feed, FeedRequest } from '@lens-protocol/graphql';
import { FeedQuery } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type FeedArgs = FeedRequest;

/**
 * Fetch a single Feed.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useFeed({ feed: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useFeed(args: FeedArgs & Suspendable): SuspenseResult<Feed | null>;

/**
 * Fetch a single Feed.
 *
 * ```tsx
 * const { data, loading } = useFeed({ feed: evmAddress('0x…') });
 * ```
 */
export function useFeed(args: FeedArgs): ReadResult<Feed | null>;

export function useFeed({
  suspense = false,
  ...request
}: FeedArgs & { suspense?: boolean }): SuspendableResult<Feed | null> {
  return useSuspendableQuery({
    document: FeedQuery,
    variables: { request },
    suspense,
  });
}
