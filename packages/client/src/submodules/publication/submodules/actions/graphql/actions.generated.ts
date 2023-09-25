// @ts-nocheck
import * as Types from '../../../../../graphql/types.generated';

import {
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  CreateActOnOpenActionEip712TypedDataFragment,
} from '../../../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
  CreateActOnOpenActionEip712TypedDataFragmentDoc,
} from '../../../../../graphql/fragments.generated';
export type ActOnOpenActionMutationVariables = Types.Exact<{
  request: Types.ActOnOpenActionLensManagerRequest;
}>;

export type ActOnOpenActionMutation = {
  __typename: 'Mutation';
  result:
    | ({ __typename: 'LensProfileManagerRelayError' } & LensProfileManagerRelayErrorFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type CreateActOnOpenActionBroadcastItemResultFragment = {
  __typename: 'CreateActOnOpenActionBroadcastItemResult';
  id: string;
  expiresAt: string;
  typedData: {
    __typename: 'CreateActOnOpenActionEIP712TypedData';
  } & CreateActOnOpenActionEip712TypedDataFragment;
};

export type CreateActOnOpenActionTypedDataMutationVariables = Types.Exact<{
  request: Types.ActOnOpenActionRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateActOnOpenActionTypedDataMutation = {
  __typename: 'Mutation';
  result: {
    __typename: 'CreateActOnOpenActionBroadcastItemResult';
  } & CreateActOnOpenActionBroadcastItemResultFragment;
};

export const CreateActOnOpenActionBroadcastItemResultFragmentDoc = gql`
  fragment CreateActOnOpenActionBroadcastItemResult on CreateActOnOpenActionBroadcastItemResult {
    id
    expiresAt
    typedData {
      ...CreateActOnOpenActionEIP712TypedData
    }
  }
  ${CreateActOnOpenActionEip712TypedDataFragmentDoc}
`;
export const ActOnOpenActionDocument = gql`
  mutation ActOnOpenAction($request: ActOnOpenActionLensManagerRequest!) {
    result: actOnOpenAction(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${RelaySuccessFragmentDoc}
  ${LensProfileManagerRelayErrorFragmentDoc}
`;
export const CreateActOnOpenActionTypedDataDocument = gql`
  mutation CreateActOnOpenActionTypedData(
    $request: ActOnOpenActionRequest!
    $options: TypedDataOptions
  ) {
    result: createActOnOpenActionTypedData(request: $request, options: $options) {
      ...CreateActOnOpenActionBroadcastItemResult
    }
  }
  ${CreateActOnOpenActionBroadcastItemResultFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const ActOnOpenActionDocumentString = print(ActOnOpenActionDocument);
const CreateActOnOpenActionTypedDataDocumentString = print(CreateActOnOpenActionTypedDataDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ActOnOpenAction(
      variables: ActOnOpenActionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ActOnOpenActionMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ActOnOpenActionMutation>(ActOnOpenActionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ActOnOpenAction',
        'mutation',
      );
    },
    CreateActOnOpenActionTypedData(
      variables: CreateActOnOpenActionTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateActOnOpenActionTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateActOnOpenActionTypedDataMutation>(
            CreateActOnOpenActionTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateActOnOpenActionTypedData',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
