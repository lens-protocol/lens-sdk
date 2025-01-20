import type { Paginated, TimelineItem, TimelineRequest } from '@lens-protocol/graphql';
import { TimelineQuery } from '@lens-protocol/graphql';

import type { ReadResult, Suspendable, SuspendableResult, SuspenseResult } from '../helpers';
import { useSuspendableQuery } from '../helpers';

export type TimelineArgs = TimelineRequest;

/**
 * Fetch timeline from an account.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useTimeline({ account: evmAddress('0x…'), suspense: true });
 * ```
 */
export function useTimeline(
  args: TimelineArgs & Suspendable,
): SuspenseResult<Paginated<TimelineItem>>;

/**
 * Fetch timeline from an account.
 *
 * ```tsx
 * const { data } = useTimeline({ account: evmAddress('0x…') });
 * ```
 */
export function useTimeline(args: TimelineArgs): ReadResult<Paginated<TimelineItem>>;

export function useTimeline({
  suspense = false,
  ...request
}: TimelineArgs & { suspense?: boolean }): SuspendableResult<Paginated<TimelineItem>> {
  return useSuspendableQuery({
    document: TimelineQuery,
    variables: { request },
    suspense: suspense,
  });
}
