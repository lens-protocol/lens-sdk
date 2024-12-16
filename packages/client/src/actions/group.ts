import type {
  CreateGroupRequest,
  CreateGroupResult,
  Group,
  GroupMembersRequest,
  GroupRequest,
  GroupStatsRequest,
  GroupStatsResponse,
  GroupsRequest,
  JoinGroupRequest,
  JoinGroupResult,
  LeaveGroupRequest,
  LeaveGroupResult,
  Paginated,
} from '@lens-protocol/graphql';
import {
  CreateGroupMutation,
  GroupMembersQuery,
  GroupQuery,
  GroupStatsQuery,
  GroupsQuery,
  JoinGroupMutation,
  LeaveGroupMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { Account } from '@lens-protocol/graphql';
import type { AnyClient, SessionClient } from '../clients';
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

/**
 * Fetch a Group.
 *
 * ```ts
 * const result = await fetchGroup(anyClient, {
 *   group: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The Group or `null` if it does not exist.
 */
export function fetchGroup(
  client: AnyClient,
  request: GroupRequest,
): ResultAsync<Group | null, UnexpectedError> {
  return client.query(GroupQuery, { request });
}

/**
 * Fetch groups.
 *
 * ```ts
 * const result = await fetchGroups(anyClient);
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of groups.
 */
export function fetchGroups(
  client: AnyClient,
  request: GroupsRequest = {},
): ResultAsync<Paginated<Group> | null, UnexpectedError> {
  return client.query(GroupsQuery, { request });
}

/**
 * Fetch group members.
 *
 * ```ts
 * const result = await fetchGroupMembers(anyClient, {
 *   group: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of members for the group.
 */
export function fetchGroupMembers(
  client: AnyClient,
  request: GroupMembersRequest,
): ResultAsync<Paginated<Account>, UnexpectedError> {
  return client.query(GroupMembersQuery, { request });
}

/**
 * Fetch stats for a group.
 *
 * ```ts
 * const result = await fetchGroupStats(anyClient, {
 *   group: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The stats for the group.
 */
export function fetchGroupStats(
  client: AnyClient,
  request: GroupStatsRequest,
): ResultAsync<GroupStatsResponse | null, UnexpectedError> {
  return client.query(GroupStatsQuery, { request });
}
