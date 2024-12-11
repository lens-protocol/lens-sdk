import type {
  AssignUsernameToAccountRequest,
  AssignUsernameToAccountResult,
  CreateUsernameRequest,
  CreateUsernameResult,
  UnassignUsernameFromAccountRequest,
  UnassignUsernameToAccountResult,
} from '@lens-protocol/graphql';
import {
  AssignUsernameToAccountMutation,
  CreateUsernameMutation,
  UnassignUsernameFromAccountMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a username
 *
 * ```ts
 * const result = await createUsername(sessionClient, {
 *   username: {
 *    localName: 'wagmi'
 *   }
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createUsername(
  client: SessionClient,
  request: CreateUsernameRequest,
): ResultAsync<CreateUsernameResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateUsernameMutation, { request });
}

/**
 * Assign a username to the account associated with the authenticated session.
 *
 * ```ts
 * const result = await assignUsernameToAccount(sessionClient, {
 *   username: {
 *    localName: 'wagmi'
 *   }
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function assignUsernameToAccount(
  client: SessionClient,
  request: AssignUsernameToAccountRequest,
): ResultAsync<AssignUsernameToAccountResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(AssignUsernameToAccountMutation, { request });
}

/**
 * Unassign a username to the account associated with the authenticated session.
 *
 * ```ts
 * const result = await unassignUsernameFromAccount(sessionClient, {
 *   username: {
 *    localName: 'wagmi'
 *   }
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function unassignUsernameFromAccount(
  client: SessionClient,
  request: UnassignUsernameFromAccountRequest,
): ResultAsync<UnassignUsernameToAccountResult, UnauthenticatedError | UnexpectedError> {
  return client.query(UnassignUsernameFromAccountMutation, { request });
}
