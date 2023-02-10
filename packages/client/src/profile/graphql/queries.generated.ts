// @ts-nocheck
import * as Types from '../../graphql/types.generated.js';

import {
  ProfileFragment,
  CommonPaginatedResultInfoFragment,
  FollowingFragment,
  FollowerFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  ProfileFragmentDoc,
  CommonPaginatedResultInfoFragmentDoc,
  FollowingFragmentDoc,
  FollowerFragmentDoc,
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

export type DoesFollowQueryVariables = Types.Exact<{
  request: Types.DoesFollowRequest;
}>;

export type DoesFollowQuery = {
  result: Array<
    Pick<
      Types.DoesFollowResponse,
      'follows' | 'followerAddress' | 'profileId' | 'isFinalisedOnChain'
    >
  >;
};

export type FollowingQueryVariables = Types.Exact<{
  request: Types.FollowingRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type FollowingQuery = {
  result: { items: Array<FollowingFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type FollowersQueryVariables = Types.Exact<{
  request: Types.FollowersRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type FollowersQuery = {
  result: { items: Array<FollowerFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type FollowerNftOwnedTokenIdsQueryVariables = Types.Exact<{
  request: Types.FollowerNftOwnedTokenIdsRequest;
}>;

export type FollowerNftOwnedTokenIdsQuery = {
  followerNftOwnedTokenIds: Types.Maybe<
    Pick<Types.FollowerNftOwnedTokenIds, 'followerNftAddress' | 'tokensIds'>
  >;
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
export const DoesFollowDocument = gql`
  query DoesFollow($request: DoesFollowRequest!) {
    result: doesFollow(request: $request) {
      follows
      followerAddress
      profileId
      isFinalisedOnChain
    }
  }
`;
export const FollowingDocument = gql`
  query Following($request: FollowingRequest!, $observerId: ProfileId) {
    result: following(request: $request) {
      items {
        ...Following
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FollowingFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const FollowersDocument = gql`
  query Followers($request: FollowersRequest!, $observerId: ProfileId) {
    result: followers(request: $request) {
      items {
        ...Follower
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FollowerFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const FollowerNftOwnedTokenIdsDocument = gql`
  query FollowerNftOwnedTokenIds($request: FollowerNftOwnedTokenIdsRequest!) {
    followerNftOwnedTokenIds(request: $request) {
      followerNftAddress
      tokensIds
    }
  }
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
const DoesFollowDocumentString = print(DoesFollowDocument);
const FollowingDocumentString = print(FollowingDocument);
const FollowersDocumentString = print(FollowersDocument);
const FollowerNftOwnedTokenIdsDocumentString = print(FollowerNftOwnedTokenIdsDocument);
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
    DoesFollow(
      variables: DoesFollowQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: DoesFollowQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<DoesFollowQuery>(DoesFollowDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DoesFollow',
        'query',
      );
    },
    Following(
      variables: FollowingQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: FollowingQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<FollowingQuery>(FollowingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Following',
        'query',
      );
    },
    Followers(
      variables: FollowersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: FollowersQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<FollowersQuery>(FollowersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Followers',
        'query',
      );
    },
    FollowerNftOwnedTokenIds(
      variables: FollowerNftOwnedTokenIdsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: FollowerNftOwnedTokenIdsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<FollowerNftOwnedTokenIdsQuery>(
            FollowerNftOwnedTokenIdsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'FollowerNftOwnedTokenIds',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
