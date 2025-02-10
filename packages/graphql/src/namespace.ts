import type { FragmentOf } from 'gql.tada';
import {
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
  UsernameNamespaceFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const CreateNamespaceResponseFragment = graphql(
  `fragment CreateNamespaceResponse on CreateNamespaceResponse {
    __typename
    hash
  }`,
);
export type CreateNamespaceResponse = FragmentOf<typeof CreateNamespaceResponseFragment>;

const CreateUsernameNamespaceResultFragment = graphql(
  `fragment CreateUsernameNamespaceResult on CreateUsernameNamespaceResult {
    ...on CreateNamespaceResponse {
      ...CreateNamespaceResponse
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    CreateNamespaceResponseFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type CreateUsernameNamespaceResult = FragmentOf<
  typeof CreateUsernameNamespaceResultFragment
>;

export const CreateUsernameNamespaceMutation = graphql(
  `mutation CreateUsernameNamespace($request: CreateUsernameNamespaceRequest!) {
    value: createUsernameNamespace(request: $request) {
      ...CreateUsernameNamespaceResult
    }
  }`,
  [CreateUsernameNamespaceResultFragment],
);
export type CreateUsernameNamespaceRequest = RequestOf<typeof CreateUsernameNamespaceMutation>;

const SetNamespaceMetadataResultFragment = graphql(
  `fragment SetNamespaceMetadataResult on SetNamespaceMetadataResult {
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
export type SetNamespaceMetadataResult = FragmentOf<typeof SetNamespaceMetadataResultFragment>;

export const SetNamespaceMetadataMutation = graphql(
  `mutation SetNamespaceMetadata($request: SetNamespaceMetadataRequest!) {
    value: setNamespaceMetadata(request: $request) {
      ...SetNamespaceMetadataResult
    }
  }`,
  [SetNamespaceMetadataResultFragment],
);
export type SetNamespaceMetadataRequest = RequestOf<typeof SetNamespaceMetadataMutation>;

export const NamespaceQuery = graphql(
  `query Namespace($request: NamespaceRequest!) {
    value: namespace(request: $request) {
      ...UsernameNamespace
    }
  }`,
  [UsernameNamespaceFragment],
);
export type NamespaceRequest = RequestOf<typeof NamespaceQuery>;

export const NamespacesQuery = graphql(
  `query Namespaces($request: NamespacesRequest!) {
    value: namespaces(request: $request) {
      __typename
      items {
        ...UsernameNamespace
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [UsernameNamespaceFragment, PaginatedResultInfoFragment],
);
export type NamespacesRequest = RequestOf<typeof NamespacesQuery>;

const UpdateNamespaceRulesResponseFragment = graphql(
  `fragment UpdateNamespaceRulesResponse on UpdateNamespaceRulesResponse {
    __typename
    hash
  }`,
);
export type UpdateNamespaceRulesResponse = FragmentOf<typeof UpdateNamespaceRulesResponseFragment>;

const UpdateNamespaceRulesResultFragment = graphql(
  `fragment UpdateNamespaceRulesResult on UpdateNamespaceRulesResult {
    ...on UpdateNamespaceRulesResponse {
      ...UpdateNamespaceRulesResponse
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
    UpdateNamespaceRulesResponseFragment,
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type UpdateNamespaceRulesResult = FragmentOf<typeof UpdateNamespaceRulesResultFragment>;

export const UpdateNamespaceRulesMutation = graphql(
  `mutation UpdateNamespaceRules($request: UpdateNamespaceRulesRequest!) {
    value: updateNamespaceRules(request: $request) {
      ...UpdateNamespaceRulesResult
    }
  }`,
  [UpdateNamespaceRulesResultFragment],
);
export type UpdateNamespaceRulesRequest = RequestOf<typeof UpdateNamespaceRulesMutation>;

const UpdateReservedUsernamesResultFragment = graphql(
  `fragment UpdateReservedUsernamesResult on UpdateReservedUsernamesResult {
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
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type UpdateReservedUsernamesResult = FragmentOf<
  typeof UpdateReservedUsernamesResultFragment
>;

export const UpdateReservedUsernamesMutation = graphql(
  `mutation UpdateReservedUsernames($request: UpdateReservedUsernamesRequest!) {
    value: updateReservedUsernames(request: $request) {
      ...UpdateReservedUsernamesResult
    }
  }`,
  [UpdateReservedUsernamesResultFragment],
);
export type UpdateReservedUsernamesRequest = RequestOf<typeof UpdateReservedUsernamesMutation>;
