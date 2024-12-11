import type { Post, TimelineHighlightsRequest } from '@lens-protocol/graphql';
import {
  AssignUsernameToAccountMutation,
  CreateUsernameMutation,
  TimelineHighlightsQuery,
  UnassignUsernameFromAccountMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { CreateUsernameRequest } from '@lens-protocol/graphql';
import type { CreateUsernameResult } from '@lens-protocol/graphql';
import type { AssignUsernameToAccountRequest } from '@lens-protocol/graphql';
import type { AssignUsernameToAccountResult } from '@lens-protocol/graphql';
import type { UnassignUsernameFromAccountRequest } from '@lens-protocol/graphql';
import type { UnassignUsernameToAccountResult } from '@lens-protocol/graphql';
import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';
import type { Paginated } from '../types';

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
  client: AnyClient,
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
  client: AnyClient,
  request: UnassignUsernameFromAccountRequest,
): ResultAsync<UnassignUsernameToAccountResult, UnauthenticatedError | UnexpectedError> {
  return client.query(UnassignUsernameFromAccountMutation, { request });
}
