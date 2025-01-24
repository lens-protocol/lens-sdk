import {
  CreateSponsorshipMutation,
  type CreateSponsorshipRequest,
  type CreateSponsorshipResult,
  type Paginated,
  SetSponsorshipMetadataMutation,
  type SetSponsorshipMetadataRequest,
  type SetSponsorshipMetadataResult,
  type Sponsorship,
  SponsorshipLimitExclusionsQuery,
  type SponsorshipLimitExclusionsRequest,
  type SponsorshipLimitsExempt,
  SponsorshipQuery,
  type SponsorshipRequest,
  type SponsorshipSigner,
  SponsorshipSignerQuery,
  type SponsorshipSignersRequest,
  SponsorshipsQuery,
  type SponsorshipsRequest,
  UpdateSponsorshipExclusionListMutation,
  type UpdateSponsorshipExclusionListRequest,
  type UpdateSponsorshipExclusionListResult,
  UpdateSponsorshipLimitsMutation,
  type UpdateSponsorshipLimitsRequest,
  type UpdateSponsorshipLimitsResult,
  UpdateSponsorshipSignersMutation,
  type UpdateSponsorshipSignersRequest,
  type UpdateSponsorshipSignersResult,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';
import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Fetch a Sponsorship.
 *
 * ```ts
 * const result = await fetchSponsorship(anyClient, {
 *   address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The details of Sponsorship or null if not found.
 */
export function fetchSponsorship(
  client: AnyClient,
  request: SponsorshipRequest,
): ResultAsync<Sponsorship | null, UnexpectedError> {
  return client.query(SponsorshipQuery, { request });
}

/**
 * Fetch paginated Sponsorships.
 *
 * ```ts
 * const result = await fetchSponsorships(anyClient, {
 *   filter: {
 *     managedBy: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   }
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The paginated list of Sponsorships.
 */
export function fetchSponsorships(
  client: AnyClient,
  request: SponsorshipsRequest,
): ResultAsync<Paginated<Sponsorship>, UnexpectedError> {
  return client.query(SponsorshipsQuery, { request });
}

/**
 * Fetch paginated Sponsorship Signers.
 *
 * ```ts
 * const result = await fetchSponsorshipSigners(anyClient, {
 *   filter: {
 *     sponsorship: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   }
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The paginated list of Sponsorship Signers.
 */
export function fetchSponsorshipSigners(
  client: AnyClient,
  request: SponsorshipSignersRequest,
): ResultAsync<Paginated<SponsorshipSigner>, UnexpectedError> {
  return client.query(SponsorshipSignerQuery, { request });
}

/**
 * Fetch paginated exclusion list from rate limits of a given Sponsorship.
 *
 * ```ts
 * const result = await fetchSponsorshipLimitExclusions(anyClient, {
 *   filter: {
 *     sponsorship: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   }
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The paginated list of Sponsorship Signers.
 */
export function fetchSponsorshipLimitExclusions(
  client: AnyClient,
  request: SponsorshipLimitExclusionsRequest,
): ResultAsync<Paginated<SponsorshipLimitsExempt>, UnexpectedError> {
  return client.query(SponsorshipLimitExclusionsQuery, { request });
}

/**
 * Create a Sponsorship.
 *
 * ```ts
 * const result = await createSponsorship(sessionClient, {
 *   allowLensAccess: true,
 * });
 * ```
 *
 * @param client - The session client logged in as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createSponsorship(
  client: SessionClient,
  request: CreateSponsorshipRequest,
): ResultAsync<CreateSponsorshipResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateSponsorshipMutation, { request });
}

/**
 * Set Sponsorship metadata.
 *
 * ```ts
 * const result = await setSponsorshipMetadata(sessionClient, {
 *   sponsorship: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   metadataUri: uri("lens://4f91..."),
 * });
 * ```
 *
 * @param client - The session client logged in as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setSponsorshipMetadata(
  client: SessionClient,
  request: SetSponsorshipMetadataRequest,
): ResultAsync<SetSponsorshipMetadataResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetSponsorshipMetadataMutation, { request });
}

/**
 * Update Sponsorship rate limits.
 *
 * ```ts
 * const result = await updateSponsorshipLimits(sessionClient, {
 *   sponsorship: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   rateLimits: {
 *     user: {
 *       window: SponsorshipRateLimitWindow.Hour,
 *       limit: 100,
 *     },
 *     global: {
 *       window: SponsorshipRateLimitWindow.Day,
 *       limit: 1_000_000,
 *     },
 *   }
 * });
 * ```
 *
 * Remove one limit by setting it to null or not providing it.
 * ```ts
 * const result = await updateSponsorshipLimits(sessionClient, {
 *   sponsorship: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   rateLimits: {
 *     user: null,
 *     global: {
 *       window: SponsorshipRateLimitWindow.Day,
 *       limit: 1_000_000,
 *     },
 *   },
 * });
 * ```
 *
 * Remove all rate limits by setting them to null.
 * ```ts
 * const result = await updateSponsorshipLimits(sessionClient, {
 *   sponsorship: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   rateLimits: null,
 * });
 * ```
 *
 * @param client - The session client logged in as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function updateSponsorshipLimits(
  client: SessionClient,
  request: UpdateSponsorshipLimitsRequest,
): ResultAsync<UpdateSponsorshipLimitsResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(UpdateSponsorshipLimitsMutation, { request });
}

/**
 * Update exclusion list from rate limits for a given Sponsorship.
 *
 * ```ts
 * const result = await updateSponsorshipExclusionList(sessionClient, {
 *   sponsorship: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   toAdd: [
 *     {
 *       address: evmAddress('0x1234…'),
 *       label: "Bob The Builder",
 *     },
 *   ],
 *   toRemove: [
 *     evmAddress('0x5678…'),
 *   ],
 * });
 * ```
 *
 * @param client - The session client logged in as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function updateSponsorshipExclusionList(
  client: SessionClient,
  request: UpdateSponsorshipExclusionListRequest,
): ResultAsync<UpdateSponsorshipExclusionListResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(UpdateSponsorshipExclusionListMutation, { request });
}

/**
 * Update the list of signers for a given Sponsorship.
 *
 * ```ts
 * const result = await updateSponsorshipSigners(sessionClient, {
 *   sponsorship: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   toAdd: [
 *     {
 *       address: evmAddress('0x1234…'),
 *       label: "Server A",
 *     },
 *   ],
 *   toRemove: [
 *     evmAddress('0x5678…'),
 *   ],
 * });
 * ```
 *
 * @param client - The session client logged in as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function updateSponsorshipSigners(
  client: SessionClient,
  request: UpdateSponsorshipSignersRequest,
): ResultAsync<UpdateSponsorshipSignersResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(UpdateSponsorshipSignersMutation, { request });
}
