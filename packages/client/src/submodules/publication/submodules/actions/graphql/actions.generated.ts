// @ts-nocheck
import * as Types from '../../../../../graphql/types.generated';

import {
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  Eip712TypedDataFieldFragment,
  Eip712TypedDataDomainFragment,
  ProfileFragment,
  PaginatedResultInfoFragment,
  RelayErrorFragment,
  CreateMomokaPublicationResultFragment,
} from '../../../../../graphql/fragments.generated';
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
} from '../../../../../graphql/fragments.generated';
export type ActOnOpenActionMutationVariables = Types.Exact<{
  request: Types.ActOnOpenActionLensManagerRequest;
}>;

export type ActOnOpenActionMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type CreateActOnOpenActionEip712TypedDataTypesFragment = {
  Act: Array<Eip712TypedDataFieldFragment>;
};

export type CreateActOnOpenActionEip712TypedDataValueFragment = {
  nonce: string;
  deadline: string;
  publicationActedProfileId: string;
  publicationActedId: string;
  actorProfileId: string;
  referrerProfileIds: Array<string>;
  referrerPubIds: Array<string>;
  actionModuleAddress: string;
  actionModuleData: string;
};

export type CreateActOnOpenActionEip712TypedDataFragment = {
  types: CreateActOnOpenActionEip712TypedDataTypesFragment;
  domain: Eip712TypedDataDomainFragment;
  value: CreateActOnOpenActionEip712TypedDataValueFragment;
};

export type CreateActOnOpenActionBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: CreateActOnOpenActionEip712TypedDataFragment;
};

export type CreateActOnOpenActionTypedDataMutationVariables = Types.Exact<{
  request: Types.ActOnOpenActionRequest;
}>;

export type CreateActOnOpenActionTypedDataMutation = {
  result: CreateActOnOpenActionBroadcastItemResultFragment;
};

export const CreateActOnOpenActionEip712TypedDataTypesFragmentDoc = gql`
  fragment CreateActOnOpenActionEIP712TypedDataTypes on CreateActOnOpenActionEIP712TypedDataTypes {
    Act {
      ...EIP712TypedDataField
    }
  }
  ${Eip712TypedDataFieldFragmentDoc}
`;
export const CreateActOnOpenActionEip712TypedDataValueFragmentDoc = gql`
  fragment CreateActOnOpenActionEIP712TypedDataValue on CreateActOnOpenActionEIP712TypedDataValue {
    nonce
    deadline
    publicationActedProfileId
    publicationActedId
    actorProfileId
    referrerProfileIds
    referrerPubIds
    actionModuleAddress
    actionModuleData
  }
`;
export const CreateActOnOpenActionEip712TypedDataFragmentDoc = gql`
  fragment CreateActOnOpenActionEIP712TypedData on CreateActOnOpenActionEIP712TypedData {
    types {
      ...CreateActOnOpenActionEIP712TypedDataTypes
    }
    domain {
      ...EIP712TypedDataDomain
    }
    value {
      ...CreateActOnOpenActionEIP712TypedDataValue
    }
  }
  ${CreateActOnOpenActionEip712TypedDataTypesFragmentDoc}
  ${Eip712TypedDataDomainFragmentDoc}
  ${CreateActOnOpenActionEip712TypedDataValueFragmentDoc}
`;
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
  mutation CreateActOnOpenActionTypedData($request: ActOnOpenActionRequest!) {
    result: createActOnOpenActionTypedData(request: $request) {
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
