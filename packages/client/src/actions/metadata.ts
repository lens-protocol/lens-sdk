import type {
  RefreshMetadataRequest,
  RefreshMetadataResult,
  RefreshMetadataStatusResult,
} from '@lens-protocol/graphql';
import { RefreshMetadataMutation, RefreshMetadataStatusQuery } from '@lens-protocol/graphql';
import type { ResultAsync, UUID } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Fetch the indexing status of metadata.
 *
 * ```ts
 * const result = await refreshMetadataStatus(anyClient,
 *   uuid("a0a88a62-377f-46eb-a1ec-ca6597aef164")
 * );
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The indexing status of the metadata.
 */
export function refreshMetadataStatus(
  client: AnyClient,
  request: UUID,
): ResultAsync<RefreshMetadataStatusResult, UnexpectedError> {
  return client.query(RefreshMetadataStatusQuery, { request });
}

/**
 * Refresh the metadata for a given entity.
 *
 * ```ts
 * const result = await refreshMetadata(sessionClient, {
 *   post: postId('42'),
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The mutation request.
 * @returns - UUID to track the metadata refresh.
 */
export function refreshMetadata(
  client: SessionClient,
  request: RefreshMetadataRequest,
): ResultAsync<RefreshMetadataResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(RefreshMetadataMutation, { request });
}
