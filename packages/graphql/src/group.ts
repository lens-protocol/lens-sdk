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
import { type RequestOf, graphql } from './graphql';

const CreateGroupResponseFragment = graphql(
  `fragment CreateGroupResponse on CreateGroupResponse {
    __typename
    hash
  }`,
);
export type CreateGroupResponse = FragmentOf<typeof CreateGroupResponseFragment>;

const CreateGroupResultFragment = graphql(
  `fragment CreateGroupResult on CreateGroupResult {
    ...on CreateGroupResponse {
      ...CreateGroupResponse
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [CreateGroupResponseFragment, SelfFundedTransactionRequestFragment, TransactionWillFailFragment],
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

const SetGroupMetadataResultFragment = graphql(
  `fragment SetGroupMetadataResult on SetGroupMetadataResult {
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
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetGroupMetadataResult = FragmentOf<typeof SetGroupMetadataResultFragment>;

export const SetGroupMetadataMutation = graphql(
  `mutation SetGroupMetadata($request: SetGroupMetadataRequest!) {
    value: setGroupMetadata(request: $request) {
      ...SetGroupMetadataResult
    }
  }`,
  [SetGroupMetadataResultFragment],
);
export type SetGroupMetadataRequest = RequestOf<typeof SetGroupMetadataMutation>;

const JoinGroupResponseFragment = graphql(
  `fragment JoinGroupResponse on JoinGroupResponse {
    __typename
    hash
  }`,
);
export type JoinGroupResponse = FragmentOf<typeof JoinGroupResponseFragment>;

const JoinGroupResultFragment = graphql(
  `fragment JoinGroupResult on JoinGroupResult {
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
export type GroupMembershipRequest = FragmentOf<typeof GroupMembershipRequestFragment>;

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
export type GroupMembershipRequestsRequest = RequestOf<typeof GroupMembershipRequestsQuery>;

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
export type GroupBannedAccountsRequest = RequestOf<typeof GroupBannedAccountsQuery>;

const UpdateGroupRulesResponseFragment = graphql(
  `fragment UpdateGroupRulesResponse on UpdateGroupRulesResponse {
    __typename
    hash
  }`,
);
export type UpdateGroupRulesResponse = FragmentOf<typeof UpdateGroupRulesResponseFragment>;

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
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    UpdateGroupRulesResponseFragment,
  ],
);
export type UpdateGroupRulesResult = FragmentOf<typeof UpdateGroupRulesResultFragment>;

export const UpdateGroupRulesMutation = graphql(
  `mutation UpdateGroupRules($request: UpdateGroupRulesRequest!) {
    value: updateGroupRules(request: $request) {
      ...UpdateGroupRulesResult
    }
  }`,
  [UpdateGroupRulesResultFragment],
);
export type UpdateGroupRulesRequest = RequestOf<typeof UpdateGroupRulesMutation>;

const AddGroupMemberResponseFragment = graphql(
  `fragment AddGroupMemberResponse on AddGroupMemberResponse {
    __typename
    hash
  }`,
);
export type AddGroupMemberResponse = FragmentOf<typeof AddGroupMemberResponseFragment>;

const AddGroupMemberResultFragment = graphql(
  `fragment AddGroupMemberResult on AddGroupMemberResult {
    ...on AddGroupMemberResponse {
      ...AddGroupMemberResponse
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
    AddGroupMemberResponseFragment,
    GroupOperationValidationFailedFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type AddGroupMemberResult = FragmentOf<typeof AddGroupMemberResultFragment>;

export const AddGroupMemberMutation = graphql(
  `mutation AddGroupMember($request: AddGroupMemberRequest!) {
    value: addGroupMember(request: $request) {
      ...AddGroupMemberResult
    }
  }`,
  [AddGroupMemberResultFragment],
);
export type AddGroupMemberRequest = RequestOf<typeof AddGroupMemberMutation>;

const RemoveGroupMemberResponseFragment = graphql(
  `fragment RemoveGroupMemberResponse on RemoveGroupMemberResponse {
    __typename
    hash
  }`,
);
export type RemoveGroupMemberResponse = FragmentOf<typeof RemoveGroupMemberResponseFragment>;

const RemoveGroupMemberResultFragment = graphql(
  `fragment RemoveGroupMemberResult on RemoveGroupMemberResult {
    ...on RemoveGroupMemberResponse {
      ...RemoveGroupMemberResponse
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
    RemoveGroupMemberResponseFragment,
  ],
);
export type RemoveGroupMemberResult = FragmentOf<typeof RemoveGroupMemberResultFragment>;

export const RemoveGroupMemberMutation = graphql(
  `mutation RemoveGroupMember($request: RemoveGroupMemberRequest!) {
    value: removeGroupMember(request: $request) {
      ...RemoveGroupMemberResult
    }
  }`,
  [RemoveGroupMemberResultFragment],
);
export type RemoveGroupMemberRequest = RequestOf<typeof RemoveGroupMemberMutation>;

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
export type RequestGroupMembershipResult = FragmentOf<typeof RequestGroupMembershipResultFragment>;

export const RequestGroupMembershipMutation = graphql(
  `mutation RequestGroupMembership($request: RequestGroupMembershipRequest!) {
    value: requestGroupMembership(request: $request) {
      ...RequestGroupMembershipResult
    }
  }`,
  [RequestGroupMembershipResultFragment],
);
export type RequestGroupMembershipRequest = RequestOf<typeof RequestGroupMembershipMutation>;

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

const RejectGroupMembershipRequestResponseFragment = graphql(
  `fragment RejectGroupMembershipRequestResponse on RejectGroupMembershipRequestResponse {
    __typename
    hash
  }`,
);
export type RejectGroupMembershipRequestResponse = FragmentOf<
  typeof RejectGroupMembershipRequestResponseFragment
>;

const RejectGroupMembershipResultFragment = graphql(
  `fragment RejectGroupMembershipResult on RejectGroupMembershipResult {
    ...on RejectGroupMembershipRequestResponse {
      ...RejectGroupMembershipRequestResponse
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
    RejectGroupMembershipRequestResponseFragment,
  ],
);
export type RejectGroupMembershipResult = FragmentOf<typeof RejectGroupMembershipResultFragment>;

export const RejectGroupMembershipRequestMutation = graphql(
  `mutation RejectGroupMembershipRequest($request: RejectGroupMembershipRequest!) {
    value: rejectGroupMembershipRequest(request: $request) {
      ...RejectGroupMembershipResult
    }
  }`,
  [RejectGroupMembershipResultFragment],
);
export type RejectGroupMembershipRequestRequest = RequestOf<
  typeof RejectGroupMembershipRequestMutation
>;

const BanGroupAccountResponseFragment = graphql(
  `fragment BanGroupAccountResponse on BanGroupAccountResponse {
    __typename
    hash
  }`,
);
export type BanGroupAccountResponse = FragmentOf<typeof BanGroupAccountResponseFragment>;

const BanGroupAccountResultFragment = graphql(
  `fragment BanGroupAccountResult on BanGroupAccountResult {
    ...on BanGroupAccountResponse {
      ...BanGroupAccountResponse
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
export type BanGroupAccountResult = FragmentOf<typeof BanGroupAccountResultFragment>;

export const BanGroupAccountMutation = graphql(
  `mutation BanGroupAccount($request: BanGroupAccountRequest!) {
    value: banGroupAccount(request: $request) {
      ...BanGroupAccountResult
    }
  }`,
  [BanGroupAccountResultFragment],
);
export type BanGroupAccountRequest = RequestOf<typeof BanGroupAccountMutation>;

const UnbanGroupAccountResponseFragment = graphql(
  `fragment UnbanGroupAccountResponse on UnbanGroupAccountResponse {
    __typename
    hash
  }`,
);
export type UnbanGroupAccountResponse = FragmentOf<typeof UnbanGroupAccountResponseFragment>;

const UnbanGroupAccountResultFragment = graphql(
  `fragment UnbanGroupAccountResult on UnbanGroupAccountResult {
    ...on UnbanGroupAccountResponse {
      ...UnbanGroupAccountResponse
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
    UnbanGroupAccountResponseFragment,
  ],
);
export type UnbanGroupAccountResult = FragmentOf<typeof UnbanGroupAccountResultFragment>;

export const UnbanGroupAccountMutation = graphql(
  `mutation UnbanGroupAccount($request: UnbanGroupAccountRequest!) {
    value: unbanGroupAccount(request: $request) {
      ...UnbanGroupAccountResult
    }
  }`,
  [UnbanGroupAccountResultFragment],
);
export type UnbanGroupAccountRequest = RequestOf<typeof UnbanGroupAccountMutation>;
