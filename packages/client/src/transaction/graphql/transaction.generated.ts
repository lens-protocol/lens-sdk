// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  RelayerResultFragment,
  RelayErrorFragment,
  CreateDataAvailabilityPublicationResultFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  RelayerResultFragmentDoc,
  RelayErrorFragmentDoc,
  CreateDataAvailabilityPublicationResultFragmentDoc,
} from '../../graphql/fragments.generated';
export type TransactionIndexedResultFragment = {
  __typename: 'TransactionIndexedResult';
  indexed: boolean;
  txHash: string;
};

export type TransactionErrorFragment = {
  __typename: 'TransactionError';
  reason: Types.TransactionErrorReasons;
};

export type HasTxHashBeenIndexedQueryVariables = Types.Exact<{
  request: Types.HasTxHashBeenIndexedRequest;
}>;

export type HasTxHashBeenIndexedQuery = {
  result: TransactionErrorFragment | TransactionIndexedResultFragment;
};

export type BroadcastProtocolCallMutationVariables = Types.Exact<{
  request: Types.BroadcastRequest;
}>;

export type BroadcastProtocolCallMutation = { result: RelayErrorFragment | RelayerResultFragment };

export type BroadcastDataAvailabilityMutationVariables = Types.Exact<{
  request: Types.BroadcastRequest;
}>;

export type BroadcastDataAvailabilityMutation = {
  result: CreateDataAvailabilityPublicationResultFragment | RelayErrorFragment;
};

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
export const BroadcastDataAvailabilityDocument = gql`
  mutation BroadcastDataAvailability($request: BroadcastRequest!) {
    result: broadcastDataAvailability(request: $request) {
      ... on CreateDataAvailabilityPublicationResult {
        ...CreateDataAvailabilityPublicationResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${CreateDataAvailabilityPublicationResultFragmentDoc}
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
const BroadcastDataAvailabilityDocumentString = print(BroadcastDataAvailabilityDocument);
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
    BroadcastDataAvailability(
      variables: BroadcastDataAvailabilityMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: BroadcastDataAvailabilityMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<BroadcastDataAvailabilityMutation>(
            BroadcastDataAvailabilityDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'BroadcastDataAvailability',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
