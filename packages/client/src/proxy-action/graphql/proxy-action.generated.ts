// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type ProxyActionStatusResultFragment = {
  __typename: 'ProxyActionStatusResult';
  txHash: string;
  txId: string;
  status: Types.ProxyActionStatusTypes;
};

export type ProxyActionErrorFragment = {
  __typename: 'ProxyActionError';
  reason: string;
  lastKnownTxId: string | null;
};

export type ProxyActionQueuedFragment = { __typename: 'ProxyActionQueued'; queuedAt: string };

export type ProxyActionStatusQueryVariables = Types.Exact<{
  proxyActionId: Types.Scalars['ProxyActionId'];
}>;

export type ProxyActionStatusQuery = {
  result: ProxyActionErrorFragment | ProxyActionQueuedFragment | ProxyActionStatusResultFragment;
};

export type ProxyActionMutationVariables = Types.Exact<{
  request: Types.ProxyActionRequest;
}>;

export type ProxyActionMutation = { result: string };

export const ProxyActionStatusResultFragmentDoc = gql`
  fragment ProxyActionStatusResult on ProxyActionStatusResult {
    __typename
    txHash
    txId
    status
  }
`;
export const ProxyActionErrorFragmentDoc = gql`
  fragment ProxyActionError on ProxyActionError {
    __typename
    reason
    lastKnownTxId
  }
`;
export const ProxyActionQueuedFragmentDoc = gql`
  fragment ProxyActionQueued on ProxyActionQueued {
    __typename
    queuedAt
  }
`;
export const ProxyActionStatusDocument = gql`
  query ProxyActionStatus($proxyActionId: ProxyActionId!) {
    result: proxyActionStatus(proxyActionId: $proxyActionId) {
      ... on ProxyActionStatusResult {
        ...ProxyActionStatusResult
      }
      ... on ProxyActionError {
        ...ProxyActionError
      }
      ... on ProxyActionQueued {
        ...ProxyActionQueued
      }
    }
  }
  ${ProxyActionStatusResultFragmentDoc}
  ${ProxyActionErrorFragmentDoc}
  ${ProxyActionQueuedFragmentDoc}
`;
export const ProxyActionDocument = gql`
  mutation ProxyAction($request: ProxyActionRequest!) {
    result: proxyAction(request: $request)
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const ProxyActionStatusDocumentString = print(ProxyActionStatusDocument);
const ProxyActionDocumentString = print(ProxyActionDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ProxyActionStatus(
      variables: ProxyActionStatusQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: ProxyActionStatusQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProxyActionStatusQuery>(ProxyActionStatusDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ProxyActionStatus',
        'query',
      );
    },
    ProxyAction(
      variables: ProxyActionMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: ProxyActionMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProxyActionMutation>(ProxyActionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ProxyAction',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
