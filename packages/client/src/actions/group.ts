import type {
  CreateGroupRequest,
  CreateGroupResult,
  Group,
  GroupBannedAccount,
  GroupBannedAccountsRequest,
  GroupMember,
  GroupMembersRequest,
  GroupMembershipRequest,
  GroupMembershipRequestsRequest,
  GroupRequest,
  GroupStatsRequest,
  GroupStatsResponse,
  GroupsRequest,
  JoinGroupRequest,
  JoinGroupResult,
  LeaveGroupRequest,
  LeaveGroupResult,
  Paginated,
  SetGroupMetadataRequest,
  SetGroupMetadataResult,
} from '@lens-protocol/graphql';
import {
  CreateGroupMutation,
  GroupBannedAccountsQuery,
  GroupMembersQuery,
  GroupMembershipRequestsQuery,
  GroupQuery,
  GroupStatsQuery,
  GroupsQuery,
  JoinGroupMutation,
  LeaveGroupMutation,
  SetGroupMetadataMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a Group
 *
 * ```ts
 * const result = await createGroup(sessionClient);
 * ```
 *
 * @param client - The session client logged in as a builder.
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
 * Set Group Metadata
 *
 * ```ts
 * const result = await setGroupMetadata(sessionClient, {
 *  group: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *  metadataUri: uri("lens://4f91..."),
 * });
 * ```
 *
 * @param client - The session client logged in as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setGroupMetadata(
  client: SessionClient,
  request: SetGroupMetadataRequest,
): ResultAsync<SetGroupMetadataResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetGroupMetadataMutation, { request });
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
): ResultAsync<Paginated<Group>, UnexpectedError> {
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
): ResultAsync<Paginated<GroupMember>, UnexpectedError> {
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

/**
 * Fetch banned accounts for a group.
 *
 * ```ts
 * const result = await fetchGroupBannedAccounts(anyClient, {
 *   group: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of banned accounts for the group.
 */
export function fetchGroupBannedAccounts(
  client: AnyClient,
  request: GroupBannedAccountsRequest,
): ResultAsync<Paginated<GroupBannedAccount>, UnexpectedError> {
  return client.query(GroupBannedAccountsQuery, { request });
}

/**
 * Fetch membership requests for a group (only admin/owner).
 *
 * ```ts
 * const result = await fetchGroupMembershipRequests(sessionClient, {
 *   group: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The query request.
 * @returns The list of membership requests for the group.
 */
export function fetchGroupMembershipRequests(
  client: SessionClient,
  request: GroupMembershipRequestsRequest,
): ResultAsync<Paginated<GroupMembershipRequest>, UnexpectedError> {
  return client.query(GroupMembershipRequestsQuery, { request });
}
