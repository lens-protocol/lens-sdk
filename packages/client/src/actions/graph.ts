import type {
  CreateGraphRequest,
  CreateGraphResult,
  Graph,
  GraphRequest,
  GraphsRequest,
  Paginated,
  SetGraphMetadataRequest,
  SetGraphMetadataResult,
} from '@lens-protocol/graphql';
import {
  CreateGraphMutation,
  GraphQuery,
  GraphsQuery,
  SetGraphMetadataMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a Graph
 *
 * ```ts
 * const result = await createGraph(sessionClient);
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createGraph(
  client: SessionClient,
  request: CreateGraphRequest,
): ResultAsync<CreateGraphResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateGraphMutation, { request });
}

/**
 * Set Graph Metadata
 *
 * ```ts
 * const result = await setGraphMetadata(sessionClient, {
 *  graph: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *  metadataUri: 'https://example.com/feed-metadata.json',
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setGraphMetadata(
  client: SessionClient,
  request: SetGraphMetadataRequest,
): ResultAsync<SetGraphMetadataResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetGraphMetadataMutation, { request });
}

/**
 * Fetch a Graph.
 *
 * ```ts
 * const result = await fetchGraph(anyClient, {
 *   graph: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The Graph query request.
 * @returns The Graph or `null` if it does not exist.
 */
export function fetchGraph(
  client: AnyClient,
  request: GraphRequest,
): ResultAsync<Graph | null, UnexpectedError> {
  return client.query(GraphQuery, { request });
}

/**
 * Fetch Graphs.
 *
 * ```ts
 * const result = await fetchGraphs(anyClient, {
 *   filter: {
 *     managedBy: {
 *       address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')
 *     }
 *   },
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The Graphs query request.
 * @returns The list of Graphs or empty list if none exist.
 */
export function fetchGraphs(
  client: AnyClient,
  request: GraphsRequest,
): ResultAsync<Paginated<Graph> | null, UnexpectedError> {
  return client.query(GraphsQuery, { request });
}
