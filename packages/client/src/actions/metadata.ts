import type {
  RefreshMetadataRequest,
  RefreshMetadataResult,
  RefreshMetadataStatusRequest,
  RefreshMetadataStatusResult,
} from '@lens-protocol/graphql';
import {
  IndexingStatus,
  RefreshMetadataMutation,
  RefreshMetadataStatusQuery,
} from '@lens-protocol/graphql';
import { ResultAsync, type UUID } from '@lens-protocol/types';

import type { AnyClient } from '../clients';
import { MetadataIndexingError, type UnauthenticatedError, UnexpectedError } from '../errors';
import { delay } from '../utils';

/**
 * Fetch the indexing status of metadata.
 *
 * ```ts
 * const result = await refreshMetadataStatus(anyClient, {
 *   id: uuid("a0a88a62-377f-46eb-a1ec-ca6597aef164")
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The indexing status of the metadata.
 */
export function refreshMetadataStatus(
  client: AnyClient,
  request: RefreshMetadataStatusRequest,
): ResultAsync<RefreshMetadataStatusResult, UnexpectedError> {
  return client.query(RefreshMetadataStatusQuery, { request });
}

/**
 * Refresh the metadata for a given entity.
 *
 * ```ts
 * const result = await refreshMetadata(anyClient, {
 *   entity: {
 *     post: postId('42'),
 *   },
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The mutation request.
 * @returns - UUID to track the metadata refresh.
 */
export function refreshMetadata(
  client: AnyClient,
  request: RefreshMetadataRequest,
): ResultAsync<RefreshMetadataResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(RefreshMetadataMutation, { request });
}

/**
 * Given a metadata id, wait for the metadata to be either confirmed or rejected by the Lens API.
 *
 * @param client - Any Lens client.
 * @param id - The metadata id to wait for.
 * @returns The metadata id if the metadata was confirmed or an error if the transaction was rejected.
 */
export function waitForMetadata(
  client: AnyClient,
  id: UUID,
): ResultAsync<UUID, MetadataIndexingError | UnexpectedError> {
  return ResultAsync.fromPromise(pollMetadataStatus(client, id), (err) => {
    if (err instanceof MetadataIndexingError || err instanceof UnexpectedError) {
      return err;
    }
    return UnexpectedError.from(err);
  });
}

async function pollMetadataStatus(client: AnyClient, id: UUID): Promise<UUID> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < client.context.environment.indexingTimeout) {
    const result = await refreshMetadataStatus(client, { id });
    if (result.isErr()) {
      throw UnexpectedError.from(result.error);
    }
    switch (result.value.status) {
      case IndexingStatus.Finished:
        return result.value.id;
      case IndexingStatus.Failed:
        throw MetadataIndexingError.from(result.value.reason);
      case IndexingStatus.Pending:
        await delay(client.context.environment.pollingInterval);
        break;
    }
  }
  throw MetadataIndexingError.from(`Timeout waiting for metadata ${id}`);
}
