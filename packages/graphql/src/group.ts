import type { FragmentOf } from 'gql.tada';
import {
  AccountFragment,
  GroupFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const CreateGroupResponse = graphql(
  `fragment CreateGroupResponse on CreateGroupResponse {
    __typename
    hash
  }`,
);
export type CreateGroupResponse = FragmentOf<typeof CreateGroupResponse>;

const CreateGroupResult = graphql(
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
  [CreateGroupResponse, SelfFundedTransactionRequest, TransactionWillFail],
);
export type CreateGroupResult = FragmentOf<typeof CreateGroupResult>;

export const CreateGroupMutation = graphql(
  `mutation CreateGroup($request: CreateGroupRequest!) {
    value: createGroup(request: $request) {
      ...CreateGroupResult
    }
  }`,
  [CreateGroupResult],
);
export type CreateGroupRequest = RequestOf<typeof CreateGroupMutation>;

const JoinGroupResponse = graphql(
  `fragment JoinGroupResponse on JoinGroupResponse {
    __typename
    hash
  }`,
);
export type JoinGroupResponse = FragmentOf<typeof JoinGroupResponse>;

const JoinGroupResult = graphql(
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
    SponsoredTransactionRequest,
    SelfFundedTransactionRequest,
    TransactionWillFail,
    JoinGroupResponse,
  ],
);
export type JoinGroupResult = FragmentOf<typeof JoinGroupResult>;

export const JoinGroupMutation = graphql(
  `mutation JoinGroup($request: JoinGroupRequest!) {
    value: joinGroup(request: $request) {
      ...JoinGroupResult
    }
  }`,
  [JoinGroupResult],
);
export type JoinGroupRequest = RequestOf<typeof JoinGroupMutation>;

const LeaveGroupResponse = graphql(
  `fragment LeaveGroupResponse on LeaveGroupResponse {
    __typename
    hash
  }`,
);
export type LeaveGroupResponse = FragmentOf<typeof LeaveGroupResponse>;

const LeaveGroupResult = graphql(
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
    SponsoredTransactionRequest,
    SelfFundedTransactionRequest,
    TransactionWillFail,
    LeaveGroupResponse,
  ],
);
export type LeaveGroupResult = FragmentOf<typeof LeaveGroupResult>;

export const LeaveGroupMutation = graphql(
  `mutation LeaveGroup($request: LeaveGroupRequest!) {
    value: leaveGroup(request: $request) {
      ...LeaveGroupResult
    }
  }`,
  [LeaveGroupResult],
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

export const GroupMembersQuery = graphql(
  `query GroupMembers($request: GroupMembersRequest!) {
    value: groupMembers(request: $request) {
      __typename
      items {
        ...Account
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AccountFragment, PaginatedResultInfoFragment],
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
