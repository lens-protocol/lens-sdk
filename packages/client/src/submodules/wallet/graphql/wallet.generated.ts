// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  PaginatedResultInfoFragment,
  ProfileFragment,
  PostFragment,
  QuoteFragment,
  CommentFragment,
  MirrorFragment,
  OpenActionResult_KnownCollectOpenActionResult_Fragment,
  OpenActionResult_UnknownOpenActionResult_Fragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PaginatedResultInfoFragmentDoc,
  ProfileFragmentDoc,
  PostFragmentDoc,
  QuoteFragmentDoc,
  CommentFragmentDoc,
  MirrorFragmentDoc,
  OpenActionResultFragmentDoc,
} from '../../../graphql/fragments.generated';
export type HandleResultFragment = { __typename: 'HandleResult'; handle: string };

export type OwnedHandlesQueryVariables = Types.Exact<{
  request: Types.OwnedHandlesRequest;
}>;

export type OwnedHandlesQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedHandlesResult';
    items: Array<{ __typename: 'HandleResult' } & HandleResultFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type ProfilesManagedQueryVariables = Types.Exact<{
  request: Types.ProfilesManagedRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type ProfilesManagedQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedProfileResult';
    items: Array<{ __typename: 'Profile' } & ProfileFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type UserSigNoncesFragment = {
  __typename: 'UserSigNonces';
  lensHubOnchainSigNonce: string;
  lensTokenHandleRegistryOnchainSigNonce: string;
};

export type UserSigNoncesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserSigNoncesQuery = {
  __typename: 'Query';
  result: { __typename: 'UserSigNonces' } & UserSigNoncesFragment;
};

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
