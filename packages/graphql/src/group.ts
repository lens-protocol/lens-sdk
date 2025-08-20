import type { FragmentOf } from 'gql.tada';
import {
  AccountFragment,
  GroupFragment,
  GroupOperationValidationFailedFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { graphql, type RequestOf } from './graphql';

const CreateGroupResponseFragment = graphql(
  `fragment CreateGroupResponse on CreateGroupResponse {
    __typename
    hash
  }`,
);
export type CreateGroupResponse = FragmentOf<
  typeof CreateGroupResponseFragment
>;

const CreateGroupResultFragment = graphql(
  `fragment CreateGroupResult on CreateGroupResult {
    ...on CreateGroupResponse {
      ...CreateGroupResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    CreateGroupResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type CreateGroupResult = FragmentOf<typeof CreateGroupResultFragment>;

export const CreateGroupMutation = graphql(
  `mutation CreateGroup($request: CreateGroupRequest!) {
    value: createGroup(request: $request) {
      ...CreateGroupResult
    }
  }`,
  [CreateGroupResultFragment],
);
export type CreateGroupRequest = RequestOf<typeof CreateGroupMutation>;

const SetGroupMetadataResponseFragment = graphql(
  `fragment SetGroupMetadataResponse on SetGroupMetadataResponse {
    __typename
    hash
  }`,
);
export type SetGroupMetadataResponse = FragmentOf<
  typeof SetGroupMetadataResponseFragment
>;

const SetGroupMetadataResultFragment = graphql(
  `fragment SetGroupMetadataResult on SetGroupMetadataResult {
    ...on SetGroupMetadataResponse {
      ...SetGroupMetadataResponse
    }
    ... on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SetGroupMetadataResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetGroupMetadataResult = FragmentOf<
  typeof SetGroupMetadataResultFragment
>;

export const SetGroupMetadataMutation = graphql(
  `mutation SetGroupMetadata($request: SetGroupMetadataRequest!) {
    value: setGroupMetadata(request: $request) {
      ...SetGroupMetadataResult
    }
  }`,
  [SetGroupMetadataResultFragment],
);
export type SetGroupMetadataRequest = RequestOf<
  typeof SetGroupMetadataMutation
>;

const JoinGroupResponseFragment = graphql(
  `fragment JoinGroupResponse on JoinGroupResponse {
    __typename
    hash
  }`,
);
export type JoinGroupResponse = FragmentOf<typeof JoinGroupResponseFragment>;

const JoinGroupResultFragment = graphql(
  `fragment JoinGroupResult on JoinGroupResult {
    ...on GroupOperationValidationFailed {
      ...GroupOperationValidationFailed
    }
    ...on JoinGroupResponse {
      ...JoinGroupResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    GroupOperationValidationFailedFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    JoinGroupResponseFragment,
  ],
);
export type JoinGroupResult = FragmentOf<typeof JoinGroupResultFragment>;

export const JoinGroupMutation = graphql(
  `mutation JoinGroup($request: JoinGroupRequest!) {
    value: joinGroup(request: $request) {
      ...JoinGroupResult
    }
  }`,
  [JoinGroupResultFragment],
);
export type JoinGroupRequest = RequestOf<typeof JoinGroupMutation>;

const LeaveGroupResponseFragment = graphql(
  `fragment LeaveGroupResponse on LeaveGroupResponse {
    __typename
    hash
  }`,
);
export type LeaveGroupResponse = FragmentOf<typeof LeaveGroupResponseFragment>;

const LeaveGroupResultFragment = graphql(
  `fragment LeaveGroupResult on LeaveGroupResult {
    ...on GroupOperationValidationFailed {
      ...GroupOperationValidationFailed
    }
    ...on LeaveGroupResponse {
      ...LeaveGroupResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    GroupOperationValidationFailedFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    LeaveGroupResponseFragment,
  ],
);
export type LeaveGroupResult = FragmentOf<typeof LeaveGroupResultFragment>;

export const LeaveGroupMutation = graphql(
  `mutation LeaveGroup($request: LeaveGroupRequest!) {
    value: leaveGroup(request: $request) {
      ...LeaveGroupResult
    }
  }`,
  [LeaveGroupResultFragment],
);
export type LeaveGroupRequest = RequestOf<typeof LeaveGroupMutation>;

export const GroupQuery = graphql(
  `query Group($request: GroupRequest!) {
    value: group(request: $request) {
      ...Group
    }
  }`,
  [GroupFragment],
);
export type GroupRequest = RequestOf<typeof GroupQuery>;

export const GroupsQuery = graphql(
  `query Groups($request: GroupsRequest!) {
    value: groups(request: $request) {
      __typename
      items {
        ...Group
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [GroupFragment, PaginatedResultInfoFragment],
);
export type GroupsRequest = RequestOf<typeof GroupsQuery>;

export const GroupMemberFragment = graphql(
  `fragment GroupMember on GroupMember {
    __typename
    account {
      ...Account
    }
    lastActiveAt
    joinedAt
  }`,
  [AccountFragment],
);
export type GroupMember = FragmentOf<typeof GroupMemberFragment>;

export const GroupMembersQuery = graphql(
  `query GroupMembers($request: GroupMembersRequest!) {
    value: groupMembers(request: $request) {
      __typename
      items {
        ...GroupMember
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [GroupMemberFragment, PaginatedResultInfoFragment],
);
export type GroupMembersRequest = RequestOf<typeof GroupMembersQuery>;

export const GroupStatsResponseFragment = graphql(
  `fragment GroupStatsResponse on GroupStatsResponse {
      __typename
      totalMembers
  }`,
);
export type GroupStatsResponse = FragmentOf<typeof GroupStatsResponseFragment>;

export const GroupStatsQuery = graphql(
  `query GroupStats($request: GroupStatsRequest!) {
    value: groupStats(request: $request) {
      ...GroupStatsResponse
    }
  }`,
  [GroupStatsResponseFragment],
);
export type GroupStatsRequest = RequestOf<typeof GroupStatsQuery>;

export const GroupMembershipRequestFragment = graphql(
  `fragment GroupMembershipRequest on GroupMembershipRequest {
      __typename
      ruleId
      requestedAt
      lastActiveAt
      account {
        ...Account
      }
  }`,
  [AccountFragment],
);
export type GroupMembershipRequest = FragmentOf<
  typeof GroupMembershipRequestFragment
>;

export const GroupMembershipRequestsQuery = graphql(
  `query GroupMembershipRequests($request: GroupMembershipRequestsRequest!) {
    value: groupMembershipRequests(request: $request) {
      __typename
      items {
        ...GroupMembershipRequest
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [GroupMembershipRequestFragment, PaginatedResultInfoFragment],
);
export type GroupMembershipRequestsRequest = RequestOf<
  typeof GroupMembershipRequestsQuery
>;

export const GroupBannedAccountFragment = graphql(
  `fragment GroupBannedAccount on GroupBannedAccount {
      __typename
      ruleId
      lastActiveAt
      bannedAt
      bannedBy {
        ...Account
      }
      account {
        ...Account
      }
  }`,
  [AccountFragment],
);
export type GroupBannedAccount = FragmentOf<typeof GroupBannedAccountFragment>;

export const GroupBannedAccountsQuery = graphql(
  `query GroupBannedAccounts($request: GroupBannedAccountsRequest!) {
    value: groupBannedAccounts(request: $request) {
      __typename
      items {
        ...GroupBannedAccount
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [GroupBannedAccountFragment, PaginatedResultInfoFragment],
);
export type GroupBannedAccountsRequest = RequestOf<
  typeof GroupBannedAccountsQuery
>;

export const UpdateGroupRulesResponseFragment = graphql(
  `fragment UpdateGroupRulesResponse on UpdateGroupRulesResponse {
    __typename
    hash
  }`,
);
export type UpdateGroupRulesResponse = FragmentOf<
  typeof UpdateGroupRulesResponseFragment
>;

const UpdateGroupRulesResultFragment = graphql(
  `fragment UpdateGroupRulesResult on UpdateGroupRulesResult {
    ...on UpdateGroupRulesResponse {
      ...UpdateGroupRulesResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    UpdateGroupRulesResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type UpdateGroupRulesResult = FragmentOf<
  typeof UpdateGroupRulesResultFragment
>;

export const UpdateGroupRulesMutation = graphql(
  `mutation UpdateGroupRules($request: UpdateGroupRulesRequest!) {
    value: updateGroupRules(request: $request) {
      ...UpdateGroupRulesResult
    }
  }`,
  [UpdateGroupRulesResultFragment],
);
export type UpdateGroupRulesRequest = RequestOf<
  typeof UpdateGroupRulesMutation
>;

const ApproveGroupMembershipRequestsResponseFragment = graphql(
  `fragment ApproveGroupMembershipRequestsResponse on ApproveGroupMembershipRequestsResponse {
    __typename
    hash
  }`,
);

const ApproveGroupMembershipResultFragment = graphql(
  `fragment ApproveGroupMembershipResult on ApproveGroupMembershipResult {
    ...on ApproveGroupMembershipRequestsResponse {
      ...ApproveGroupMembershipRequestsResponse
    }
    ...on GroupOperationValidationFailed {
      ...GroupOperationValidationFailed
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    ApproveGroupMembershipRequestsResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    GroupOperationValidationFailedFragment,
  ],
);
export type ApproveGroupMembershipResult = FragmentOf<
  typeof ApproveGroupMembershipResultFragment
>;

export const ApproveGroupMembershipRequestsMutation = graphql(
  `mutation ApproveGroupMembershipRequests($request: ApproveGroupMembershipRequest!) {
    value: approveGroupMembershipRequests(request: $request) {
      ...ApproveGroupMembershipResult
    }
  }`,
  [ApproveGroupMembershipResultFragment],
);
export type ApproveGroupMembershipRequest = RequestOf<
  typeof ApproveGroupMembershipRequestsMutation
>;

const RemoveGroupMembersResponseFragment = graphql(
  `fragment RemoveGroupMembersResponse on RemoveGroupMembersResponse {
    __typename
    hash
  }`,
);
export type RemoveGroupMembersResponse = FragmentOf<
  typeof RemoveGroupMembersResponseFragment
>;

const RemoveGroupMembersResultFragment = graphql(
  `fragment RemoveGroupMembersResult on RemoveGroupMembersResult {
    ...on RemoveGroupMembersResponse {
      ...RemoveGroupMembersResponse
    }
    ...on GroupOperationValidationFailed {
      ...GroupOperationValidationFailed
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    GroupOperationValidationFailedFragment,
    RemoveGroupMembersResponseFragment,
  ],
);
export type RemoveGroupMembersResult = FragmentOf<
  typeof RemoveGroupMembersResultFragment
>;

export const RemoveGroupMembersMutation = graphql(
  `mutation RemoveGroupMembers($request: RemoveGroupMembersRequest!) {
    value: removeGroupMembers(request: $request) {
      ...RemoveGroupMembersResult
    }
  }`,
  [RemoveGroupMembersResultFragment],
);
export type RemoveGroupMembersRequest = RequestOf<
  typeof RemoveGroupMembersMutation
>;

const RequestGroupMembershipResponseFragment = graphql(
  `fragment RequestGroupMembershipResponse on RequestGroupMembershipResponse {
    __typename
    hash
  }`,
);
export type RequestGroupMembershipResponse = FragmentOf<
  typeof RequestGroupMembershipResponseFragment
>;

const RequestGroupMembershipResultFragment = graphql(
  `fragment RequestGroupMembershipResult on RequestGroupMembershipResult {
    ...on RequestGroupMembershipResponse {
      ...RequestGroupMembershipResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    RequestGroupMembershipResponseFragment,
  ],
);
export type RequestGroupMembershipResult = FragmentOf<
  typeof RequestGroupMembershipResultFragment
>;

export const RequestGroupMembershipMutation = graphql(
  `mutation RequestGroupMembership($request: RequestGroupMembershipRequest!) {
    value: requestGroupMembership(request: $request) {
      ...RequestGroupMembershipResult
    }
  }`,
  [RequestGroupMembershipResultFragment],
);
export type RequestGroupMembershipRequest = RequestOf<
  typeof RequestGroupMembershipMutation
>;

const CancelGroupMembershipRequestResponseFragment = graphql(
  `fragment CancelGroupMembershipRequestResponse on CancelGroupMembershipRequestResponse {
    __typename
    hash
  }`,
);
export type CancelGroupMembershipRequestResponse = FragmentOf<
  typeof CancelGroupMembershipRequestResponseFragment
>;

const CancelGroupMembershipRequestResultFragment = graphql(
  `fragment CancelGroupMembershipRequestResult on CancelGroupMembershipRequestResult {
    ...on CancelGroupMembershipRequestResponse {
      ...CancelGroupMembershipRequestResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    CancelGroupMembershipRequestResponseFragment,
  ],
);
export type CancelGroupMembershipRequestResult = FragmentOf<
  typeof CancelGroupMembershipRequestResultFragment
>;

export const CancelGroupMembershipRequestMutation = graphql(
  `mutation CancelGroupMembershipRequest($request: CancelGroupMembershipRequestRequest!) {
    value: cancelGroupMembershipRequest(request: $request) {
      ...CancelGroupMembershipRequestResult
    }
  }`,
  [CancelGroupMembershipRequestResultFragment],
);
export type CancelGroupMembershipRequestRequest = RequestOf<
  typeof CancelGroupMembershipRequestMutation
>;

const RejectGroupMembershipRequestsResponseFragment = graphql(
  `fragment RejectGroupMembershipRequestsResponse on RejectGroupMembershipRequestsResponse {
    __typename
    hash
  }`,
);
export type RejectGroupMembershipRequestsResponse = FragmentOf<
  typeof RejectGroupMembershipRequestsResponseFragment
>;

const RejectGroupMembershipResultFragment = graphql(
  `fragment RejectGroupMembershipResult on RejectGroupMembershipResult {
    ...on RejectGroupMembershipRequestsResponse {
      ...RejectGroupMembershipRequestsResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    RejectGroupMembershipRequestsResponseFragment,
  ],
);
export type RejectGroupMembershipResult = FragmentOf<
  typeof RejectGroupMembershipResultFragment
>;

export const RejectGroupMembershipRequestsMutation = graphql(
  `mutation RejectGroupMembershipRequests($request: RejectGroupMembershipRequest!) {
    value: rejectGroupMembershipRequests(request: $request) {
      ...RejectGroupMembershipResult
    }
  }`,
  [RejectGroupMembershipResultFragment],
);
export type RejectGroupMembershipRequest = RequestOf<
  typeof RejectGroupMembershipRequestsMutation
>;

const BanGroupAccountResponseFragment = graphql(
  `fragment BanGroupAccountsResponse on BanGroupAccountsResponse {
    __typename
    hash
  }`,
);
export type BanGroupAccountsResponse = FragmentOf<
  typeof BanGroupAccountResponseFragment
>;

const BanGroupAccountResultFragment = graphql(
  `fragment BanGroupAccountsResult on BanGroupAccountsResult {
    ...on BanGroupAccountsResponse {
      ...BanGroupAccountsResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    BanGroupAccountResponseFragment,
  ],
);
export type BanGroupAccountsResult = FragmentOf<
  typeof BanGroupAccountResultFragment
>;

export const BanGroupAccountsMutation = graphql(
  `mutation BanGroupAccounts($request: BanGroupAccountsRequest!) {
    value: banGroupAccounts(request: $request) {
      ...BanGroupAccountsResult
    }
  }`,
  [BanGroupAccountResultFragment],
);
export type BanGroupAccountsRequest = RequestOf<
  typeof BanGroupAccountsMutation
>;

const UnbanGroupAccountsResponseFragment = graphql(
  `fragment UnbanGroupAccountsResponse on UnbanGroupAccountsResponse {
    __typename
    hash
  }`,
);
export type UnbanGroupAccountsResponse = FragmentOf<
  typeof UnbanGroupAccountsResponseFragment
>;

const UnbanGroupAccountsResultFragment = graphql(
  `fragment UnbanGroupAccountsResult on UnbanGroupAccountsResult {
    ...on UnbanGroupAccountsResponse {
      ...UnbanGroupAccountsResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    UnbanGroupAccountsResponseFragment,
  ],
);
export type UnbanGroupAccountsResult = FragmentOf<
  typeof UnbanGroupAccountsResultFragment
>;

export const UnbanGroupAccountsMutation = graphql(
  `mutation UnbanGroupAccounts($request: UnbanGroupAccountsRequest!) {
    value: unbanGroupAccounts(request: $request) {
      ...UnbanGroupAccountsResult
    }
  }`,
  [UnbanGroupAccountsResultFragment],
);
export type UnbanGroupAccountsRequest = RequestOf<
  typeof UnbanGroupAccountsMutation
>;
