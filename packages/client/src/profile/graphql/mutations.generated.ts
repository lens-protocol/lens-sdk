import * as Types from '../../graphql/types.generated.js';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type CreateFollowTypedDataMutationVariables = Types.Exact<{
  request: Types.FollowRequest;
  options?: Types.Maybe<Types.TypedDataOptions>;
}>;

export type CreateFollowTypedDataMutation = {
  result: Pick<Types.CreateFollowBroadcastItemResult, 'id' | 'expiresAt'> & {
    typedData: {
      types: { FollowWithSig: Array<Pick<Types.Eip712TypedDataField, 'name' | 'type'>> };
      domain: Eip712TypedDataDomainFragment;
      value: Pick<
        Types.CreateFollowEip712TypedDataValue,
        'nonce' | 'deadline' | 'profileIds' | 'datas'
      >;
    };
  };
};

export type CreateUnfollowTypedDataMutationVariables = Types.Exact<{
  request: Types.UnfollowRequest;
}>;

export type CreateUnfollowTypedDataMutation = {
  result: Pick<Types.CreateUnfollowBroadcastItemResult, 'id' | 'expiresAt'> & {
    typedData: {
      types: { BurnWithSig: Array<Pick<Types.Eip712TypedDataField, 'name' | 'type'>> };
      domain: Eip712TypedDataDomainFragment;
      value: Pick<Types.CreateBurnEip712TypedDataValue, 'nonce' | 'deadline' | 'tokenId'>;
    };
  };
};

export type Eip712TypedDataDomainFragment = { __typename: 'EIP712TypedDataDomain' } & Pick<
  Types.Eip712TypedDataDomain,
  'name' | 'chainId' | 'version' | 'verifyingContract'
>;

export const Eip712TypedDataDomainFragmentDoc = gql`
  fragment EIP712TypedDataDomain on EIP712TypedDataDomain {
    __typename
    name
    chainId
    version
    verifyingContract
  }
`;
export const CreateFollowTypedDataDocument = gql`
  mutation CreateFollowTypedData($request: FollowRequest!, $options: TypedDataOptions) {
    result: createFollowTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          FollowWithSig {
            name
            type
          }
        }
        domain {
          ...EIP712TypedDataDomain
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateUnfollowTypedDataDocument = gql`
  mutation CreateUnfollowTypedData($request: UnfollowRequest!) {
    result: createUnfollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          BurnWithSig {
            name
            type
          }
        }
        domain {
          ...EIP712TypedDataDomain
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const CreateFollowTypedDataDocumentString = print(CreateFollowTypedDataDocument);
const CreateUnfollowTypedDataDocumentString = print(CreateUnfollowTypedDataDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateFollowTypedData(
      variables: CreateFollowTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateFollowTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateFollowTypedDataMutation>(
            CreateFollowTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateFollowTypedData',
        'mutation',
      );
    },
    CreateUnfollowTypedData(
      variables: CreateUnfollowTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateUnfollowTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateUnfollowTypedDataMutation>(
            CreateUnfollowTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateUnfollowTypedData',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
