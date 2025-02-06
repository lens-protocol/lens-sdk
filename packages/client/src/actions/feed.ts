import type {
  CreateFeedRequest,
  CreateFeedResult,
  Feed,
  FeedRequest,
  FeedsRequest,
  Paginated,
  SetFeedMetadataRequest,
  SetFeedMetadataResult,
  UpdateFeedRulesRequest,
  UpdateFeedRulesResult,
} from '@lens-protocol/graphql';
import {
  CreateFeedMutation,
  FeedQuery,
  FeedsQuery,
  SetFeedMetadataMutation,
  UpdateFeedRulesMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a Feed
 *
 * ```ts
 * const result = await createFeed(sessionClient);
 * ```
 *
 * @param client - The session client logged in as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createFeed(
  client: SessionClient,
  request: CreateFeedRequest,
): ResultAsync<CreateFeedResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateFeedMutation, { request });
}

/**
 * Set Feed Metadata
 *
 * ```ts
 * const result = await setFeedMetadata(sessionClient, {
 *  feed: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *  metadataUri: uri("lens://4f91..."),
 * });
 * ```
 *
 * @param client - The session client logged in as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setFeedMetadata(
  client: SessionClient,
  request: SetFeedMetadataRequest,
): ResultAsync<SetFeedMetadataResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetFeedMetadataMutation, { request });
}

/**
 * Fetch a Feed.
 *
 * ```ts
 * const result = await fetchFeed(anyClient, {
 *   feed: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The Feed query request.
 * @returns The Feed or `null` if it does not exist.
 */
export function fetchFeed(
  client: AnyClient,
  request: FeedRequest,
): ResultAsync<Feed | null, UnexpectedError> {
  return client.query(FeedQuery, { request });
}

/**
 * Fetch Feeds.
 *
 * ```ts
 * const result = await fetchFeeds(anyClient, {
 *   filter: {
 *     managedBy: {
 *       address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')
 *     }
 *   },
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The Feeds query request.
 * @returns The list of Feeds or empty list if none exist.
 */
export function fetchFeeds(
  client: AnyClient,
  request: FeedsRequest,
): ResultAsync<Paginated<Feed>, UnexpectedError> {
  return client.query(FeedsQuery, { request });
}

/**
 * Update feed rules.
 *
 * ```ts
 * const result = await updateFeedRules(sessionClient, {
 *   feed: evmAddress('0x1234…'),
 *   toAdd: {
 *     required: [{
 *       tokenGatedRule: {
 *         standard: TokenStandard.Erc20,
 *         currency: evmAddress('0x5678…'),
 *         value: '1.5', // Token value in its main unit
 *       }
 *     }],
 *     anyOf: [],
 *   }
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function updateFeedRules(
  client: SessionClient,
  request: UpdateFeedRulesRequest,
): ResultAsync<UpdateFeedRulesResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(UpdateFeedRulesMutation, { request });
}
