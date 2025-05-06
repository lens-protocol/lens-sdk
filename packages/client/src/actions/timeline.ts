import type {
  AnyPost,
  Paginated,
  TimelineHighlightsRequest,
  TimelineItem,
  TimelineRequest,
} from '@lens-protocol/graphql';
import { TimelineHighlightsQuery, TimelineQuery } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnexpectedError } from '../errors';

/**
 * Fetch timeline from an account.
 *
 * ```ts
 * const result = await fetchTimeline(sessionClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The query request.
 * @returns The list of timeline items.
 */
export function fetchTimeline(
  client: SessionClient,
  request: TimelineRequest,
): ResultAsync<Paginated<TimelineItem>, UnexpectedError> {
  return client.query(TimelineQuery, { request });
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
  return client.query(TimelineHighlightsQuery, { request });
}
