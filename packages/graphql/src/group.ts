import type { FragmentOf } from 'gql.tada';
import {
  AccountFragment,
  GroupFragment,
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
