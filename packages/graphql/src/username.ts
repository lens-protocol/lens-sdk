import type { FragmentOf } from 'gql.tada';
import { UsernameTakenFragment } from './accounts';
import {
  NamespaceOperationValidationFailedFragment,
  NamespaceOperationValidationPassedFragment,
  NamespaceOperationValidationUnknownFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
  UsernameFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const CreateUsernameResponseFragment = graphql(
  `fragment CreateUsernameResponse on CreateUsernameResponse {
    __typename
    hash
  }`,
);
export type CreateUsernameResponse = FragmentOf<typeof CreateUsernameResponseFragment>;

const CreateUsernameResultFragment = graphql(
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
    ...on NamespaceOperationValidationFailed {
      ...NamespaceOperationValidationFailed
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    CreateUsernameResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    NamespaceOperationValidationFailedFragment,
    TransactionWillFailFragment,
  ],
);
export type CreateUsernameResult = FragmentOf<typeof CreateUsernameResultFragment>;

export const CreateUsernameMutation = graphql(
  `mutation CreateUsername($request: CreateUsernameRequest!) {
    value: createUsername(request: $request) {
      ...CreateUsernameResult
    }
  }`,
  [CreateUsernameResultFragment],
);
export type CreateUsernameRequest = RequestOf<typeof CreateUsernameMutation>;

const AssignUsernameResponseFragment = graphql(
  `fragment AssignUsernameResponse on AssignUsernameResponse {
    __typename
    hash
  }`,
);
export type AssignUsernameResponse = FragmentOf<typeof AssignUsernameResponseFragment>;

const AssignUsernameToAccountResultFragment = graphql(
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
    ...on NamespaceOperationValidationFailed {
      ...NamespaceOperationValidationFailed
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    AssignUsernameResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    NamespaceOperationValidationFailedFragment,
    TransactionWillFailFragment,
  ],
);
export type AssignUsernameToAccountResult = FragmentOf<
  typeof AssignUsernameToAccountResultFragment
>;

export const AssignUsernameToAccountMutation = graphql(
  `mutation AssignUsernameToAccount($request: AssignUsernameToAccountRequest!) {
    value: assignUsernameToAccount(request: $request) {
      ...AssignUsernameToAccountResult
    }
  }`,
  [AssignUsernameToAccountResultFragment],
);
export type AssignUsernameToAccountRequest = RequestOf<typeof AssignUsernameToAccountMutation>;

const UnassignUsernameResponseFragment = graphql(
  `fragment UnassignUsernameResponse on UnassignUsernameResponse {
    __typename
    hash
  }`,
);
export type UnassignUsernameResponse = FragmentOf<typeof UnassignUsernameResponseFragment>;

const UnassignUsernameToAccountResultFragment = graphql(
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
    ...on NamespaceOperationValidationFailed {
      ...NamespaceOperationValidationFailed
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    UnassignUsernameResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    NamespaceOperationValidationFailedFragment,
    TransactionWillFailFragment,
  ],
);
export type UnassignUsernameToAccountResult = FragmentOf<
  typeof UnassignUsernameToAccountResultFragment
>;

export const UnassignUsernameFromAccountMutation = graphql(
  `mutation LeaveGroup($request: UnassignUsernameFromAccountRequest!) {
    value: unassignUsernameFromAccount(request: $request) {
      ...UnassignUsernameToAccountResult
    }
  }`,
  [UnassignUsernameToAccountResultFragment],
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
  [UsernameFragment],
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
  [UsernameFragment, PaginatedResultInfoFragment],
);
export type UsernamesRequest = RequestOf<typeof UsernamesQuery>;

const CanCreateUsernameResultFragment = graphql(
  `fragment CanCreateUsernameResult on CanCreateUsernameResult {
    __typename
    ... on NamespaceOperationValidationPassed {
      ...NamespaceOperationValidationPassed
    }
    ... on NamespaceOperationValidationUnknown {
      ...NamespaceOperationValidationUnknown
    }
    ... on NamespaceOperationValidationFailed {
      ...NamespaceOperationValidationFailed
    }
    ...on UsernameTaken {
      ...UsernameTaken
    }
  }`,
  [
    NamespaceOperationValidationPassedFragment,
    NamespaceOperationValidationUnknownFragment,
    NamespaceOperationValidationFailedFragment,
    UsernameTakenFragment,
  ],
);
export type CanCreateUsernameResult = FragmentOf<typeof CanCreateUsernameResultFragment>;

export const CanCreateUsernameQuery = graphql(
  `query CanCreateUsername($request: UsernameInput!) {
    value: canCreateUsername(request: $request) {
      ...CanCreateUsernameResult
    }
  }`,
  [CanCreateUsernameResultFragment],
);
export type CanCreateUsernameRequest = RequestOf<typeof CanCreateUsernameQuery>;
