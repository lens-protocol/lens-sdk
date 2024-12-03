import type {
  Post,
  TimelineHighlightsRequest,
  TimelineItem,
  TimelineRequest,
} from '@lens-protocol/graphql';
import { TimelineHighlightsQuery, TimelineQuery } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient } from '../clients';
import type { UnexpectedError } from '../errors';
import type { Paginated } from '../types';

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
  return client.query(TimelineQuery, { request });
}

/**
 * Fetch fetchTimelineHighlights from an account.
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
): ResultAsync<Paginated<Post> | null, UnexpectedError> {
  return client.query(TimelineHighlightsQuery, { request });
}
