// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  Eip712TypedDataFieldFragment,
  Eip712TypedDataDomainFragment,
  ProfileFragment,
  PaginatedResultInfoFragment,
  RelayErrorFragment,
  CreateMomokaPublicationResultFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
  Eip712TypedDataFieldFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  ProfileFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  RelayErrorFragmentDoc,
  CreateMomokaPublicationResultFragmentDoc,
} from '../../../graphql/fragments.generated';
export type LensTransactionResultFragment = {
  status: Types.LensTransactionStatusType;
  txHash: string;
  reason: Types.LensTransactionFailureType | null;
  extraInfo: string | null;
};

export type TxIdToTxHashQueryVariables = Types.Exact<{
  for: Types.Scalars['TxId']['input'];
}>;

export type TxIdToTxHashQuery = { result: string | null };

export type LensTransactionStatusQueryVariables = Types.Exact<{
  request: Types.LensTransactionStatusRequest;
}>;

export type LensTransactionStatusQuery = { result: LensTransactionResultFragment | null };

export type BroadcastOnchainMutationVariables = Types.Exact<{
  request: Types.BroadcastRequest;
}>;

export type BroadcastOnchainMutation = { result: RelayErrorFragment | RelaySuccessFragment };

export type BroadcastOnMomokaMutationVariables = Types.Exact<{
  request: Types.BroadcastRequest;
}>;

export type BroadcastOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | RelayErrorFragment;
};

export const LensTransactionResultFragmentDoc = gql`
  fragment LensTransactionResult on LensTransactionResult {
    status
    txHash
    reason
    extraInfo
  }
`;
export const TxIdToTxHashDocument = gql`
  query TxIdToTxHash($for: TxId!) {
    result: txIdToTxHash(for: $for)
  }
`;
export const LensTransactionStatusDocument = gql`
  query LensTransactionStatus($request: LensTransactionStatusRequest!) {
    result: lensTransactionStatus(request: $request) {
      ...LensTransactionResult
    }
  }
  ${LensTransactionResultFragmentDoc}
`;
export const BroadcastOnchainDocument = gql`
  mutation BroadcastOnchain($request: BroadcastRequest!) {
    result: broadcastOnchain(request: $request) {
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
const BroadcastOnchainDocumentString = print(BroadcastOnchainDocument);
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
    BroadcastOnchain(
      variables: BroadcastOnchainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: BroadcastOnchainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<BroadcastOnchainMutation>(BroadcastOnchainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BroadcastOnchain',
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
