import type {
  Paginated,
  Post,
  TimelineHighlightsRequest,
} from '@lens-protocol/graphql';
import { TimelineHighlightsQuery } from '@lens-protocol/graphql';

import type {
  ReadResult,
  Suspendable,
  SuspendableResult,
  SuspenseResult,
} from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type UseTimelineHighlightsArgs = TimelineHighlightsRequest;

/**
 * Fetch Timeline Highlights for an account.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useTimelineHighlights({ account: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useTimelineHighlights(
  args: UseTimelineHighlightsArgs & Suspendable,
): SuspenseResult<Paginated<Post>>;

/**
 * Fetch Timeline Highlights for an account.
 *
 * ```tsx
 * const { data, error, loading } = useTimelineHighlights({ account: evmAddress('0x…') });
 * ```
 */
export function useTimelineHighlights(
  args: UseTimelineHighlightsArgs,
): ReadResult<Paginated<Post>>;

export function useTimelineHighlights({
  suspense = false,
  ...request
}: UseTimelineHighlightsArgs & { suspense?: boolean }): SuspendableResult<
  Paginated<Post>
> {
  return useSuspendableQuery({
    document: TimelineHighlightsQuery,
    variables: { request },
    suspense: suspense,
  });
}
