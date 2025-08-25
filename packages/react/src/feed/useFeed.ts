import type { Feed, FeedRequest } from '@lens-protocol/graphql';
import { FeedQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseFeedArgs = FeedRequest;

/**
 * Fetch a single Feed.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useFeed({ feed: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useFeed(
  args: UseFeedArgs & Suspendable,
): SuspenseResult<Feed | null>;

/**
 * Fetch a single Feed.
 *
 * ```tsx
 * const { data, error, loading } = useFeed({ feed: evmAddress('0x…') });
 * ```
 */
export function useFeed(args: UseFeedArgs): ReadResult<Feed | null>;

export function useFeed({
  suspense = false,
  ...request
}: UseFeedArgs & { suspense?: boolean }): SuspendableResult<Feed | null> {
  return useSuspendableQuery({
    document: FeedQuery,
    variables: { request },
    suspense,
  });
}
