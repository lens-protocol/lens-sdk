// @ts-nocheck
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

export type ProfilesQueryVariables = Types.Exact<{
  request: Types.ProfileQueryRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type ProfilesQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type RecommendedProfilesQueryVariables = Types.Exact<{
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type RecommendedProfilesQuery = { result: Array<ProfileFragment> };

export type MutualFollowersProfilesQueryVariables = Types.Exact<{
  request: Types.MutualFollowersProfilesQueryRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type MutualFollowersProfilesQuery = {
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
export const ProfilesDocument = gql`
  query Profiles($request: ProfileQueryRequest!, $observerId: ProfileId) {
    result: profiles(request: $request) {
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
export const RecommendedProfilesDocument = gql`
  query RecommendedProfiles($observerId: ProfileId) {
    result: recommendedProfiles {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const MutualFollowersProfilesDocument = gql`
  query MutualFollowersProfiles(
    $request: MutualFollowersProfilesQueryRequest!
    $observerId: ProfileId
  ) {
    result: mutualFollowersProfiles(request: $request) {
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
const ProfilesDocumentString = print(ProfilesDocument);
const RecommendedProfilesDocumentString = print(RecommendedProfilesDocument);
const MutualFollowersProfilesDocumentString = print(MutualFollowersProfilesDocument);
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
    Profiles(
      variables: ProfilesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: ProfilesQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfilesQuery>(ProfilesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Profiles',
        'query',
      );
    },
    RecommendedProfiles(
      variables?: RecommendedProfilesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: RecommendedProfilesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RecommendedProfilesQuery>(
            RecommendedProfilesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'RecommendedProfiles',
        'query',
      );
    },
    MutualFollowersProfiles(
      variables: MutualFollowersProfilesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: MutualFollowersProfilesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MutualFollowersProfilesQuery>(
            MutualFollowersProfilesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'MutualFollowersProfiles',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
