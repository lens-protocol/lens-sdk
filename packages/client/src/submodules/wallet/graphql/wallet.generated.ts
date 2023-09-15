// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import { PaginatedResultInfoFragment, ProfileFragment } from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PaginatedResultInfoFragmentDoc,
  ProfileFragmentDoc,
} from '../../../graphql/fragments.generated';
export type HandleResultFragment = { handle: string };

export type OwnedHandlesQueryVariables = Types.Exact<{
  request: Types.OwnedHandlesRequest;
}>;

export type OwnedHandlesQuery = {
  result: { items: Array<HandleResultFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type ProfilesManagedQueryVariables = Types.Exact<{
  request: Types.ProfilesManagedRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type ProfilesManagedQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type UserSigNoncesFragment = {
  lensHubOnchainSigNonce: string;
  lensTokenHandleRegistryOnchainSigNonce: string;
};

export type UserSigNoncesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserSigNoncesQuery = { result: UserSigNoncesFragment };

export const HandleResultFragmentDoc = gql`
  fragment HandleResult on HandleResult {
    handle
  }
`;
export const UserSigNoncesFragmentDoc = gql`
  fragment UserSigNonces on UserSigNonces {
    lensHubOnchainSigNonce
    lensTokenHandleRegistryOnchainSigNonce
  }
`;
export const OwnedHandlesDocument = gql`
  query OwnedHandles($request: OwnedHandlesRequest!) {
    result: ownedHandles(request: $request) {
      items {
        ...HandleResult
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${HandleResultFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const ProfilesManagedDocument = gql`
  query ProfilesManaged(
    $request: ProfilesManagedRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: profilesManaged(request: $request) {
      items {
        ...Profile
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${ProfileFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const UserSigNoncesDocument = gql`
  query UserSigNonces {
    result: userSigNonces {
      ...UserSigNonces
    }
  }
  ${UserSigNoncesFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const OwnedHandlesDocumentString = print(OwnedHandlesDocument);
const ProfilesManagedDocumentString = print(ProfilesManagedDocument);
const UserSigNoncesDocumentString = print(UserSigNoncesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    OwnedHandles(
      variables: OwnedHandlesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: OwnedHandlesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<OwnedHandlesQuery>(OwnedHandlesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'OwnedHandles',
        'query',
      );
    },
    ProfilesManaged(
      variables: ProfilesManagedQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ProfilesManagedQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfilesManagedQuery>(ProfilesManagedDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ProfilesManaged',
        'query',
      );
    },
    UserSigNonces(
      variables?: UserSigNoncesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserSigNoncesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserSigNoncesQuery>(UserSigNoncesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UserSigNonces',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
