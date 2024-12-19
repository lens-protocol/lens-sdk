import type { FragmentOf } from 'gql.tada';
import {
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
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
