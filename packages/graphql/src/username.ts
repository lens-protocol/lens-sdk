import type { FragmentOf } from 'gql.tada';
import {
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
  Username,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const CreateUsernameResponse = graphql(
  `fragment CreateUsernameResponse on CreateUsernameResponse {
    __typename
    hash
  }`,
);
export type CreateUsernameResponse = FragmentOf<typeof CreateUsernameResponse>;

const CreateUsernameResult = graphql(
  `fragment CreateUsernameResult on CreateUsernameResult {
    ...on CreateUsernameResponse {
      ...CreateUsernameResponse
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
    CreateUsernameResponse,
    SelfFundedTransactionRequest,
    TransactionWillFail,
    SponsoredTransactionRequest,
  ],
);
export type CreateUsernameResult = FragmentOf<typeof CreateUsernameResult>;

export const CreateUsernameMutation = graphql(
  `mutation CreateUsername($request: CreateUsernameRequest!) {
    value: createUsername(request: $request) {
      ...CreateUsernameResult
    }
  }`,
  [CreateUsernameResult],
);
export type CreateUsernameRequest = RequestOf<typeof CreateUsernameMutation>;

const AssignUsernameResponse = graphql(
  `fragment AssignUsernameResponse on AssignUsernameResponse {
    __typename
    hash
  }`,
);
export type AssignUsernameResponse = FragmentOf<typeof AssignUsernameResponse>;

const AssignUsernameToAccountResult = graphql(
  `fragment AssignUsernameToAccountResult on AssignUsernameToAccountResult {
    ...on AssignUsernameResponse {
      ...AssignUsernameResponse
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
    AssignUsernameResponse,
  ],
);
export type AssignUsernameToAccountResult = FragmentOf<typeof AssignUsernameToAccountResult>;

export const AssignUsernameToAccountMutation = graphql(
  `mutation AssignUsernameToAccount($request: AssignUsernameToAccountRequest!) {
    value: assignUsernameToAccount(request: $request) {
      ...AssignUsernameToAccountResult
    }
  }`,
  [AssignUsernameToAccountResult],
);
export type AssignUsernameToAccountRequest = RequestOf<typeof AssignUsernameToAccountMutation>;

const UnassignUsernameResponse = graphql(
  `fragment UnassignUsernameResponse on UnassignUsernameResponse {
    __typename
    hash
  }`,
);
export type UnassignUsernameResponse = FragmentOf<typeof UnassignUsernameResponse>;

const UnassignUsernameToAccountResult = graphql(
  `fragment UnassignUsernameToAccountResult on UnassignUsernameToAccountResult {
    ...on UnassignUsernameResponse {
      ...UnassignUsernameResponse
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
    UnassignUsernameResponse,
  ],
);
export type UnassignUsernameToAccountResult = FragmentOf<typeof UnassignUsernameToAccountResult>;

export const UnassignUsernameFromAccountMutation = graphql(
  `mutation LeaveGroup($request: UnassignUsernameFromAccountRequest!) {
    value: unassignUsernameFromAccount(request: $request) {
      ...UnassignUsernameToAccountResult
    }
  }`,
  [UnassignUsernameToAccountResult],
);
export type UnassignUsernameFromAccountRequest = RequestOf<
  typeof UnassignUsernameFromAccountMutation
>;

export const UsernameQuery = graphql(
  `query Username($request: UsernameRequest!) {
    value: username(request: $request) {
      ...Username
    }
  }`,
  [Username],
);
export type UsernameRequest = RequestOf<typeof UsernameQuery>;

export const UsernamesQuery = graphql(
  `query Usernames($request: UsernamesRequest!) {
    value: usernames(request: $request) {
      __typename
      items {
        ...Username
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [Username, PaginatedResultInfoFragment],
);
export type UsernamesRequest = RequestOf<typeof UsernamesQuery>;
