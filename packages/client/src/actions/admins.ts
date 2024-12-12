import type {
  AddAdminsRequest,
  AddAdminsResult,
  RemoveAdminsRequest,
  RemoveAdminsResult,
} from '@lens-protocol/graphql';
import { AddAdminsMutation, RemoveAdminsMutation } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { SessionClient } from '../clients';
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
 * @param client - The session client logged as a builder.
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
