import type {
  CreateUsernameNamespaceRequest,
  CreateUsernameNamespaceResult,
  NamespaceRequest,
  NamespacesRequest,
  Paginated,
  UsernameNamespace,
} from '@lens-protocol/graphql';
import {
  CreateUsernameNamespaceMutation,
  NamespaceQuery,
  NamespacesQuery,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a Namespace
 *
 * ```ts
 * const result = await createUsernameNamespace(sessionClient, {
 *   symbol: 'NAME',
 *   namespace: 'custom-namespace',
 * });
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createUsernameNamespace(
  client: SessionClient,
  request: CreateUsernameNamespaceRequest,
): ResultAsync<CreateUsernameNamespaceResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateUsernameNamespaceMutation, { request });
}

/**
 * Fetch a Namespace.
 *
 * ```ts
 * const result = await fetchNamespace(anyClient, {
 *   namespace: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The UsernameNamespace or `null` if it does not exist.
 */
export function fetchNamespace(
  client: AnyClient,
  request: NamespaceRequest,
): ResultAsync<UsernameNamespace | null, UnexpectedError> {
  return client.query(NamespaceQuery, { request });
}

/**
 * Fetch Namespaces.
 *
 * ```ts
 * const result = await fetchNamespaces(anyClient, {
 *   filter: {
 *     managedBy: {
 *       address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')
 *     }
 *   },
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of Namespaces or empty list if none exist.
 */
export function fetchNamespaces(
  client: AnyClient,
  request: NamespacesRequest,
): ResultAsync<Paginated<UsernameNamespace> | null, UnexpectedError> {
  return client.query(NamespacesQuery, { request });
}
