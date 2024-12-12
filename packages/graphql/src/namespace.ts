import type { FragmentOf } from 'gql.tada';
import { SelfFundedTransactionRequest, TransactionWillFail } from './fragments';
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
  [CreateNamespaceResponse, SelfFundedTransactionRequest, TransactionWillFail],
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
