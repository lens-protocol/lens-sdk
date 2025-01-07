import type {
  AnyPost,
  Paginated,
  TimelineHighlightsRequest,
  TimelineItem,
  TimelineRequest,
} from '@lens-protocol/graphql';
import { timelineHighlightsQuery, timelineQuery } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient } from '../clients';
import type { UnexpectedError } from '../errors';

/**
 * Fetch timeline from an account.
 *
 * ```ts
 * const result = await fetchTimeline(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of timeline items.
 */
export function fetchTimeline(
  client: AnyClient,
  request: TimelineRequest,
): ResultAsync<Paginated<TimelineItem> | null, UnexpectedError> {
  return client.query(timelineQuery, { request });
}

/**
 * Fetch Timeline Highlights for an account.
 *
 * ```ts
 * const result = await fetchTimelineHighlights(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of highlights post for an account.
 */
export function fetchTimelineHighlights(
  client: AnyClient,
  request: TimelineHighlightsRequest,
): ResultAsync<Paginated<AnyPost>, UnexpectedError> {
  return client.query(timelineHighlightsQuery, { request });
}
