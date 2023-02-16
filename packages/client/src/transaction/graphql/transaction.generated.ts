// @ts-nocheck
import * as Types from '../../graphql/types.generated.js';

import { RelayerResultFragment, RelayErrorFragment } from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { RelayerResultFragmentDoc, RelayErrorFragmentDoc } from '../../graphql/fragments.generated';
export type TransactionIndexedResultFragment = { __typename: 'TransactionIndexedResult' } & Pick<
  Types.TransactionIndexedResult,
  'indexed' | 'txHash'
>;

export type TransactionErrorFragment = { __typename: 'TransactionError' } & Pick<
  Types.TransactionError,
  'reason'
>;

export type HasTxHashBeenIndexedQueryVariables = Types.Exact<{
  request: Types.HasTxHashBeenIndexedRequest;
}>;

export type HasTxHashBeenIndexedQuery = {
  result: TransactionIndexedResultFragment | TransactionErrorFragment;
};

export type BroadcastProtocolCallMutationVariables = Types.Exact<{
  request: Types.BroadcastRequest;
}>;

export type BroadcastProtocolCallMutation = { result: RelayerResultFragment | RelayErrorFragment };

export const TransactionIndexedResultFragmentDoc = gql`
  fragment TransactionIndexedResult on TransactionIndexedResult {
    __typename
    indexed
    txHash
  }
`;
export const TransactionErrorFragmentDoc = gql`
  fragment TransactionError on TransactionError {
    __typename
    reason
  }
`;
export const HasTxHashBeenIndexedDocument = gql`
  query HasTxHashBeenIndexed($request: HasTxHashBeenIndexedRequest!) {
    result: hasTxHashBeenIndexed(request: $request) {
      ... on TransactionIndexedResult {
        ...TransactionIndexedResult
      }
      ... on TransactionError {
        ...TransactionError
      }
    }
  }
  ${TransactionIndexedResultFragmentDoc}
  ${TransactionErrorFragmentDoc}
`;
export const BroadcastProtocolCallDocument = gql`
  mutation BroadcastProtocolCall($request: BroadcastRequest!) {
    result: broadcast(request: $request) {
      ... on RelayerResult {
        ...RelayerResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelayerResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const HasTxHashBeenIndexedDocumentString = print(HasTxHashBeenIndexedDocument);
const BroadcastProtocolCallDocumentString = print(BroadcastProtocolCallDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    HasTxHashBeenIndexed(
      variables: HasTxHashBeenIndexedQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: HasTxHashBeenIndexedQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<HasTxHashBeenIndexedQuery>(
            HasTxHashBeenIndexedDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'HasTxHashBeenIndexed',
        'query',
      );
    },
    BroadcastProtocolCall(
      variables: BroadcastProtocolCallMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: BroadcastProtocolCallMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<BroadcastProtocolCallMutation>(
            BroadcastProtocolCallDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'BroadcastProtocolCall',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
