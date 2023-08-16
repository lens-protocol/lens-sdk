// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  RelaySuccessFragment,
  RelayErrorFragment,
  CreateMomokaPublicationResultFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  RelaySuccessFragmentDoc,
  RelayErrorFragmentDoc,
  CreateMomokaPublicationResultFragmentDoc,
} from '../../graphql/fragments.generated';
export type LensTransactionFragment = {
  __typename: 'LensTransaction';
  status: Types.LensTransactionStatusType;
  txHash: string;
  reason: Types.LensTransactionFailureType | null;
  extraInfo: string | null;
};

export type LensMetadataTransactionFragment = {
  __typename: 'LensMetadataTransaction';
  status: Types.LensTransactionStatusType;
  metadataFailedReason: Types.LensMetadataTransactionFailureType | null;
  extraInfo: string | null;
};

export type TxIdToTxHashQueryVariables = Types.Exact<{
  txId: Types.Scalars['TxId']['input'];
}>;

export type TxIdToTxHashQuery = { result: string };

export type LensTransactionStatusQueryVariables = Types.Exact<{
  request: Types.LensTransactionStatusRequest;
}>;

export type LensTransactionStatusQuery = {
  result: LensMetadataTransactionFragment | LensTransactionFragment;
};

export type BroadcastOnChainMutationVariables = Types.Exact<{
  request: Types.BroadcastRequest;
}>;

export type BroadcastOnChainMutation = { result: RelayErrorFragment | RelaySuccessFragment };

export type BroadcastOnMomokaMutationVariables = Types.Exact<{
  request: Types.BroadcastRequest;
}>;

export type BroadcastOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | RelayErrorFragment;
};

export const LensTransactionFragmentDoc = gql`
  fragment LensTransaction on LensTransaction {
    __typename
    status
    txHash
    reason
    extraInfo
  }
`;
export const LensMetadataTransactionFragmentDoc = gql`
  fragment LensMetadataTransaction on LensMetadataTransaction {
    __typename
    status
    metadataFailedReason
    extraInfo
  }
`;
export const TxIdToTxHashDocument = gql`
  query TxIdToTxHash($txId: TxId!) {
    result: txIdToTxHash(txId: $txId)
  }
`;
export const LensTransactionStatusDocument = gql`
  query LensTransactionStatus($request: LensTransactionStatusRequest!) {
    result: lensTransactionStatus(request: $request) {
      ... on LensTransaction {
        ...LensTransaction
      }
      ... on LensMetadataTransaction {
        ...LensMetadataTransaction
      }
    }
  }
  ${LensTransactionFragmentDoc}
  ${LensMetadataTransactionFragmentDoc}
`;
export const BroadcastOnChainDocument = gql`
  mutation BroadcastOnChain($request: BroadcastRequest!) {
    result: broadcastOnChain(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelaySuccessFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const BroadcastOnMomokaDocument = gql`
  mutation BroadcastOnMomoka($request: BroadcastRequest!) {
    result: broadcastOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const TxIdToTxHashDocumentString = print(TxIdToTxHashDocument);
const LensTransactionStatusDocumentString = print(LensTransactionStatusDocument);
const BroadcastOnChainDocumentString = print(BroadcastOnChainDocument);
const BroadcastOnMomokaDocumentString = print(BroadcastOnMomokaDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TxIdToTxHash(
      variables: TxIdToTxHashQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: TxIdToTxHashQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<TxIdToTxHashQuery>(TxIdToTxHashDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'TxIdToTxHash',
        'query',
      );
    },
    LensTransactionStatus(
      variables: LensTransactionStatusQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: LensTransactionStatusQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LensTransactionStatusQuery>(
            LensTransactionStatusDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'LensTransactionStatus',
        'query',
      );
    },
    BroadcastOnChain(
      variables: BroadcastOnChainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: BroadcastOnChainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<BroadcastOnChainMutation>(BroadcastOnChainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BroadcastOnChain',
        'mutation',
      );
    },
    BroadcastOnMomoka(
      variables: BroadcastOnMomokaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: BroadcastOnMomokaMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<BroadcastOnMomokaMutation>(BroadcastOnMomokaDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BroadcastOnMomoka',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
