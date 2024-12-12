import type {
  CreateGroupRequest,
  CreateGroupResult,
  JoinGroupRequest,
  JoinGroupResult,
  LeaveGroupRequest,
  LeaveGroupResult,
} from '@lens-protocol/graphql';
import { CreateGroupMutation, JoinGroupMutation, LeaveGroupMutation } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a Group
 *
 * ```ts
 * const result = await createGroup(sessionClient);
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createGroup(
  client: SessionClient,
  request: CreateGroupRequest,
): ResultAsync<CreateGroupResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateGroupMutation, { request });
}

/**
 * Join a Group
 *
 * ```ts
 * const result = await joinGroup(sessionClient, {
 *   group: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function joinGroup(
  client: SessionClient,
  request: JoinGroupRequest,
): ResultAsync<JoinGroupResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(JoinGroupMutation, { request });
}

/**
 * Leave a Group
 *
 * ```ts
 * const result = await leaveGroup(sessionClient, {
 *   group: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function leaveGroup(
  client: SessionClient,
  request: LeaveGroupRequest,
): ResultAsync<LeaveGroupResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(LeaveGroupMutation, { request });
}
