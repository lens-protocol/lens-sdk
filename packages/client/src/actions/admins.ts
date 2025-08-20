import type {
  AddAdminsRequest,
  AddAdminsResult,
  Admin,
  AdminsForRequest,
  Paginated,
  RemoveAdminsRequest,
  RemoveAdminsResult,
} from '@lens-protocol/graphql';
import {
  AddAdminsMutation,
  AdminsForQuery,
  RemoveAdminsMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';
import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Add Admins
 *
 * ```ts
 * const result = await addAdmins(sessionClient{
 *   admins: [evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 *   address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client logged in as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function addAdmins(
  client: SessionClient,
  request: AddAdminsRequest,
): ResultAsync<AddAdminsResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(AddAdminsMutation, { request });
}

/**
 * Remove admins
 *
 * ```ts
 * const result = await removeAdmins(sessionClient{
 *   admins: [evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 *   address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function removeAdmins(
  client: SessionClient,
  request: RemoveAdminsRequest,
): ResultAsync<RemoveAdminsResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RemoveAdminsMutation, { request });
}

/**
 * Fetch admins for.
 *
 * ```ts
 * const result = await fetchAdminsFor(anyClient, {
 *   address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of admins or empty if it does not exist.
 */
export function fetchAdminsFor(
  client: AnyClient,
  request: AdminsForRequest,
): ResultAsync<Paginated<Admin>, UnexpectedError> {
  return client.query(AdminsForQuery, { request });
}
