import * as Types from '../../graphql/types.generated.js';

import { Eip712TypedDataDomainFragment } from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { Eip712TypedDataDomainFragmentDoc } from '../../graphql/fragments.generated';
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

export type CreateSetDispatcherTypedDataMutationVariables = Types.Exact<{
  request: Types.SetDispatcherRequest;
  options?: Types.Maybe<Types.TypedDataOptions>;
}>;

export type CreateSetDispatcherTypedDataMutation = {
  result: Pick<Types.CreateSetDispatcherBroadcastItemResult, 'id' | 'expiresAt'> & {
    typedData: {
      types: { SetDispatcherWithSig: Array<Pick<Types.Eip712TypedDataField, 'name' | 'type'>> };
      domain: Pick<
        Types.Eip712TypedDataDomain,
        'name' | 'chainId' | 'version' | 'verifyingContract'
      >;
      value: Pick<
        Types.CreateSetDispatcherEip712TypedDataValue,
        'nonce' | 'deadline' | 'profileId' | 'dispatcher'
      >;
    };
  };
};

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
export const CreateSetDispatcherTypedDataDocument = gql`
  mutation CreateSetDispatcherTypedData(
    $request: SetDispatcherRequest!
    $options: TypedDataOptions
  ) {
    result: createSetDispatcherTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          SetDispatcherWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          dispatcher
        }
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const CreateFollowTypedDataDocumentString = print(CreateFollowTypedDataDocument);
const CreateUnfollowTypedDataDocumentString = print(CreateUnfollowTypedDataDocument);
const CreateSetDispatcherTypedDataDocumentString = print(CreateSetDispatcherTypedDataDocument);
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
    CreateSetDispatcherTypedData(
      variables: CreateSetDispatcherTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateSetDispatcherTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateSetDispatcherTypedDataMutation>(
            CreateSetDispatcherTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateSetDispatcherTypedData',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
