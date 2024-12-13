import type { FragmentOf } from 'gql.tada';
import {
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  TransactionWillFailFragment,
  UsernameNamespaceFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const CreateNamespaceResponse = graphql(
  `fragment CreateNamespaceResponse on CreateNamespaceResponse {
    __typename
    hash
  }`,
);
export type CreateNamespaceResponse = FragmentOf<typeof CreateNamespaceResponse>;

const CreateUsernameNamespaceResult = graphql(
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
  [CreateNamespaceResponse, SelfFundedTransactionRequestFragment, TransactionWillFailFragment],
);
export type CreateUsernameNamespaceResult = FragmentOf<typeof CreateUsernameNamespaceResult>;

export const CreateUsernameNamespaceMutation = graphql(
  `mutation CreateUsernameNamespace($request: CreateUsernameNamespaceRequest!) {
    value: createUsernameNamespace(request: $request) {
      ...CreateUsernameNamespaceResult
    }
  }`,
  [CreateUsernameNamespaceResult],
);
export type CreateUsernameNamespaceRequest = RequestOf<typeof CreateUsernameNamespaceMutation>;

export const UsernameNamespaceQuery = graphql(
  `query UsernameNamespace($request: UsernameNamespaceRequest!) {
    value: usernameNamespace(request: $request) {
      ...UsernameNamespace
    }
  }`,
  [UsernameNamespaceFragment],
);
export type UsernameNamespaceRequest = RequestOf<typeof UsernameNamespaceQuery>;

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
