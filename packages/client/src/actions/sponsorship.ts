import {
  type Paginated,
  type Sponsorship,
  SponsorshipQuery,
  type SponsorshipRequest,
  SponsorshipsQuery,
  type SponsorshipsRequest,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';
import type { AnyClient } from '../clients';
import type { UnexpectedError } from '../errors';

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
