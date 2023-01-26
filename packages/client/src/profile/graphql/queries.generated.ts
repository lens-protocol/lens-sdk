import * as Types from '../../graphql/types.generated.js';

import {
  ProfileFragment,
  CommonPaginatedResultInfoFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  ProfileFragmentDoc,
  CommonPaginatedResultInfoFragmentDoc,
} from '../../graphql/fragments.generated';
export type ProfileQueryVariables = Types.Exact<{
  request: Types.SingleProfileQueryRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type ProfileQuery = { result: Types.Maybe<ProfileFragment> };

export type DefaultProfileQueryVariables = Types.Exact<{
  address: Types.Scalars['EthereumAddress'];
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type DefaultProfileQuery = { result: Types.Maybe<ProfileFragment> };

export type AllProfilesByOwnerAddressQueryVariables = Types.Exact<{
  address: Types.Scalars['EthereumAddress'];
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
  limit: Types.Scalars['LimitScalar'];
  cursor?: Types.Maybe<Types.Scalars['Cursor']>;
}>;

export type AllProfilesByOwnerAddressQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export const ProfileDocument = gql`
  query Profile($request: SingleProfileQueryRequest!, $observerId: ProfileId) {
    result: profile(request: $request) {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const DefaultProfileDocument = gql`
  query DefaultProfile($address: EthereumAddress!, $observerId: ProfileId) {
    result: defaultProfile(request: { ethereumAddress: $address }) {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const AllProfilesByOwnerAddressDocument = gql`
  query AllProfilesByOwnerAddress(
    $address: EthereumAddress!
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
  ) {
    result: profiles(request: { ownedBy: [$address], limit: $limit, cursor: $cursor }) {
      items {
        ...Profile
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${ProfileFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const ProfileDocumentString = print(ProfileDocument);
const DefaultProfileDocumentString = print(DefaultProfileDocument);
const AllProfilesByOwnerAddressDocumentString = print(AllProfilesByOwnerAddressDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Profile(
      variables: ProfileQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: ProfileQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfileQuery>(ProfileDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Profile',
        'query',
      );
    },
    DefaultProfile(
      variables: DefaultProfileQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: DefaultProfileQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<DefaultProfileQuery>(DefaultProfileDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DefaultProfile',
        'query',
      );
    },
    AllProfilesByOwnerAddress(
      variables: AllProfilesByOwnerAddressQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AllProfilesByOwnerAddressQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AllProfilesByOwnerAddressQuery>(
            AllProfilesByOwnerAddressDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'AllProfilesByOwnerAddress',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
