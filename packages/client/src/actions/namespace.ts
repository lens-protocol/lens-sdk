import type {
  CreateUsernameNamespaceRequest,
  CreateUsernameNamespaceResult,
  NamespaceRequest,
  NamespacesRequest,
  Paginated,
  SetNamespaceMetadataRequest,
  SetNamespaceMetadataResult,
  UpdateNamespaceRulesRequest,
  UpdateNamespaceRulesResult,
  UpdateReservedUsernamesRequest,
  UpdateReservedUsernamesResult,
  UsernameNamespace,
} from '@lens-protocol/graphql';
import {
  CreateUsernameNamespaceMutation,
  NamespaceQuery,
  NamespacesQuery,
  SetNamespaceMetadataMutation,
  UpdateNamespaceRulesMutation,
  UpdateReservedUsernamesMutation,
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
 * @param client - The session client logged in as a builder.
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
 * Set Namespace Metadata
 *
 * ```ts
 * const result = await setNamespaceMetadata(sessionClient, {
 *   namespace: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *   metadataUri: uri("lens://4f91..."),
 * });
 * ```
 *
 * @param client - The session client logged in as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setNamespaceMetadata(
  client: SessionClient,
  request: SetNamespaceMetadataRequest,
): ResultAsync<SetNamespaceMetadataResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetNamespaceMetadataMutation, { request });
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
): ResultAsync<Paginated<UsernameNamespace>, UnexpectedError> {
  return client.query(NamespacesQuery, { request });
}

/**
 * Update namespace rules.
 *
 * ```ts
 * const result = await updateNamespaceRules(sessionClient, {
 *   namespace: evmAddress('0x1234…'),
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
export function updateNamespaceRules(
  client: SessionClient,
  request: UpdateNamespaceRulesRequest,
): ResultAsync<UpdateNamespaceRulesResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(UpdateNamespaceRulesMutation, { request });
}

/**
 * Update reserved usernames in a namespace.
 *
 * ```ts
 * const result = await updateReservedUsernames(sessionClient, {
 *   namespace: evmAddress('0x1234…'),
 *   toRelease: ['alice', 'bob'],
 *   toReserve: ['charlie', 'dave'],
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function updateReservedUsernames(
  client: SessionClient,
  request: UpdateReservedUsernamesRequest,
): ResultAsync<UpdateReservedUsernamesResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(UpdateReservedUsernamesMutation, { request });
}
