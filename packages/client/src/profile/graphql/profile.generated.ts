// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  ProfileFragment,
  PostFragment,
  MirrorFragment,
  CommentFragment,
  CommonPaginatedResultInfoFragment,
  FollowingFragment,
  FollowerFragment,
  RelayerResultFragment,
  RelayErrorFragment,
  Eip712TypedDataDomainFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  ProfileFragmentDoc,
  PostFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  CommonPaginatedResultInfoFragmentDoc,
  FollowingFragmentDoc,
  FollowerFragmentDoc,
  RelayerResultFragmentDoc,
  RelayErrorFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
} from '../../graphql/fragments.generated';
export type ProfileStatsFragment = {
  __typename: 'ProfileStats';
  totalCollects: number;
  totalComments: number;
  totalFollowers: number;
  totalFollowing: number;
  totalMirrors: number;
  totalPosts: number;
  totalPublications: number;
  commentsTotal: number;
  postsTotal: number;
  mirrorsTotal: number;
  publicationsTotal: number;
};

export type ProfileQueryVariables = Types.Exact<{
  request: Types.SingleProfileQueryRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type ProfileQuery = { result: ProfileFragment | null };

export type ProfileStatsQueryVariables = Types.Exact<{
  request: Types.SingleProfileQueryRequest;
  sources: Array<Types.Scalars['Sources']> | Types.Scalars['Sources'];
}>;

export type ProfileStatsQuery = { result: { stats: ProfileStatsFragment } | null };

export type ProfilesQueryVariables = Types.Exact<{
  request: Types.ProfileQueryRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type ProfilesQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type RecommendedProfilesQueryVariables = Types.Exact<{
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type RecommendedProfilesQuery = { result: Array<ProfileFragment> };

export type MutualFollowersProfilesQueryVariables = Types.Exact<{
  request: Types.MutualFollowersProfilesQueryRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type MutualFollowersProfilesQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type DoesFollowQueryVariables = Types.Exact<{
  request: Types.DoesFollowRequest;
}>;

export type DoesFollowQuery = {
  result: Array<{
    __typename: 'DoesFollowResponse';
    follows: boolean;
    followerAddress: string;
    profileId: string;
    isFinalisedOnChain: boolean;
  }>;
};

export type FollowingQueryVariables = Types.Exact<{
  request: Types.FollowingRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type FollowingQuery = {
  result: { items: Array<FollowingFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type FollowersQueryVariables = Types.Exact<{
  request: Types.FollowersRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type FollowersQuery = {
  result: { items: Array<FollowerFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type FollowerNftOwnedTokenIdsQueryVariables = Types.Exact<{
  request: Types.FollowerNftOwnedTokenIdsRequest;
}>;

export type FollowerNftOwnedTokenIdsQuery = {
  result: {
    __typename: 'FollowerNftOwnedTokenIds';
    followerNftAddress: string;
    tokensIds: Array<string>;
  } | null;
};

export type PendingApprovalFollowsQueryVariables = Types.Exact<{
  request: Types.PendingApprovalFollowsRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type PendingApprovalFollowsQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type ProfileInterestsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ProfileInterestsQuery = { result: Array<string> };

export type CreateProfileMutationVariables = Types.Exact<{
  request: Types.CreateProfileRequest;
}>;

export type CreateProfileMutation = { result: RelayErrorFragment | RelayerResultFragment };

export type CreateBurnProfileTypedDataMutationVariables = Types.Exact<{
  request: Types.BurnProfileRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateBurnProfileTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { BurnWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      value: { nonce: number; deadline: string; tokenId: string };
    };
  };
};

export type CreateSetDefaultProfileTypedDataMutationVariables = Types.Exact<{
  request: Types.CreateSetDefaultProfileRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateSetDefaultProfileTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { SetDefaultProfileWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      value: { nonce: number; deadline: string; wallet: string; profileId: string };
    };
  };
};

export type CreateSetProfileImageUriTypedDataMutationVariables = Types.Exact<{
  request: Types.UpdateProfileImageRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateSetProfileImageUriTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { SetProfileImageURIWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      value: { nonce: number; deadline: string; profileId: string; imageURI: string };
    };
  };
};

export type CreateSetProfileImageUriViaDispatcherMutationVariables = Types.Exact<{
  request: Types.UpdateProfileImageRequest;
}>;

export type CreateSetProfileImageUriViaDispatcherMutation = {
  result:
    | ({ __typename: 'RelayError' } & RelayErrorFragment)
    | ({ __typename: 'RelayerResult' } & RelayerResultFragment);
};

export type CreateSetProfileMetadataTypedDataMutationVariables = Types.Exact<{
  request: Types.CreatePublicSetProfileMetadataUriRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateSetProfileMetadataTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { SetProfileMetadataURIWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      value: { nonce: number; deadline: string; profileId: string; metadata: string };
    };
  };
};

export type CreateSetProfileMetadataViaDispatcherMutationVariables = Types.Exact<{
  request: Types.CreatePublicSetProfileMetadataUriRequest;
}>;

export type CreateSetProfileMetadataViaDispatcherMutation = {
  result:
    | ({ __typename: 'RelayError' } & RelayErrorFragment)
    | ({ __typename: 'RelayerResult' } & RelayerResultFragment);
};

export type CreateSetDispatcherTypedDataMutationVariables = Types.Exact<{
  request: Types.SetDispatcherRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateSetDispatcherTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { SetDispatcherWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      value: { nonce: number; deadline: string; profileId: string; dispatcher: string };
    };
  };
};

export type CreateFollowTypedDataMutationVariables = Types.Exact<{
  request: Types.FollowRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateFollowTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { FollowWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomainFragment;
      value: { nonce: number; deadline: string; profileIds: Array<string>; datas: Array<string> };
    };
  };
};

export type CreateUnfollowTypedDataMutationVariables = Types.Exact<{
  request: Types.UnfollowRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateUnfollowTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { BurnWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomainFragment;
      value: { nonce: number; deadline: string; tokenId: string };
    };
  };
};

export type CreateSetFollowModuleTypedDataMutationVariables = Types.Exact<{
  request: Types.CreateSetFollowModuleRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateSetFollowModuleTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { SetFollowModuleWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      value: {
        nonce: number;
        deadline: string;
        profileId: string;
        followModule: string;
        followModuleInitData: string;
      };
    };
  };
};

export type CreateSetFollowNftUriTypedDataMutationVariables = Types.Exact<{
  request: Types.CreateSetFollowNftUriRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateSetFollowNftUriTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { SetFollowNFTURIWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      value: { nonce: number; profileId: string; deadline: string; followNFTURI: string };
    };
  };
};

export type AddProfileInterestMutationVariables = Types.Exact<{
  request: Types.AddProfileInterestsRequest;
}>;

export type AddProfileInterestMutation = { addProfileInterests: void | null };

export type RemoveProfileInterestMutationVariables = Types.Exact<{
  request: Types.RemoveProfileInterestsRequest;
}>;

export type RemoveProfileInterestMutation = { removeProfileInterests: void | null };

export const ProfileStatsFragmentDoc = gql`
  fragment ProfileStats on ProfileStats {
    __typename
    totalCollects
    totalComments
    totalFollowers
    totalFollowing
    totalMirrors
    totalPosts
    totalPublications
    commentsTotal(forSources: $sources)
    postsTotal(forSources: $sources)
    mirrorsTotal(forSources: $sources)
    publicationsTotal(forSources: $sources)
  }
`;
export const ProfileDocument = gql`
  query Profile($request: SingleProfileQueryRequest!, $observerId: ProfileId) {
    result: profile(request: $request) {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const ProfileStatsDocument = gql`
  query ProfileStats($request: SingleProfileQueryRequest!, $sources: [Sources!]!) {
    result: profile(request: $request) {
      stats {
        ...ProfileStats
      }
    }
  }
  ${ProfileStatsFragmentDoc}
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
      __typename
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
    result: followerNftOwnedTokenIds(request: $request) {
      __typename
      followerNftAddress
      tokensIds
    }
  }
`;
export const PendingApprovalFollowsDocument = gql`
  query PendingApprovalFollows($request: PendingApprovalFollowsRequest!, $observerId: ProfileId) {
    result: pendingApprovalFollows(request: $request) {
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
export const ProfileInterestsDocument = gql`
  query ProfileInterests {
    result: profileInterests
  }
`;
export const CreateProfileDocument = gql`
  mutation CreateProfile($request: CreateProfileRequest!) {
    result: createProfile(request: $request) {
      ... on RelayerResult {
        ...RelayerResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelayerResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const CreateBurnProfileTypedDataDocument = gql`
  mutation CreateBurnProfileTypedData($request: BurnProfileRequest!, $options: TypedDataOptions) {
    result: createBurnProfileTypedData(request: $request, options: $options) {
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
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
  }
`;
export const CreateSetDefaultProfileTypedDataDocument = gql`
  mutation CreateSetDefaultProfileTypedData(
    $request: CreateSetDefaultProfileRequest!
    $options: TypedDataOptions
  ) {
    result: createSetDefaultProfileTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          SetDefaultProfileWithSig {
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
          wallet
          profileId
        }
      }
    }
  }
`;
export const CreateSetProfileImageUriTypedDataDocument = gql`
  mutation CreateSetProfileImageURITypedData(
    $request: UpdateProfileImageRequest!
    $options: TypedDataOptions
  ) {
    result: createSetProfileImageURITypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          SetProfileImageURIWithSig {
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
          imageURI
        }
      }
    }
  }
`;
export const CreateSetProfileImageUriViaDispatcherDocument = gql`
  mutation CreateSetProfileImageURIViaDispatcher($request: UpdateProfileImageRequest!) {
    result: createSetProfileImageURIViaDispatcher(request: $request) {
      __typename
      ... on RelayerResult {
        ...RelayerResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelayerResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const CreateSetProfileMetadataTypedDataDocument = gql`
  mutation CreateSetProfileMetadataTypedData(
    $request: CreatePublicSetProfileMetadataURIRequest!
    $options: TypedDataOptions
  ) {
    result: createSetProfileMetadataTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          SetProfileMetadataURIWithSig {
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
          metadata
        }
      }
    }
  }
`;
export const CreateSetProfileMetadataViaDispatcherDocument = gql`
  mutation CreateSetProfileMetadataViaDispatcher(
    $request: CreatePublicSetProfileMetadataURIRequest!
  ) {
    result: createSetProfileMetadataViaDispatcher(request: $request) {
      __typename
      ... on RelayerResult {
        ...RelayerResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelayerResultFragmentDoc}
  ${RelayErrorFragmentDoc}
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
  mutation CreateUnfollowTypedData($request: UnfollowRequest!, $options: TypedDataOptions) {
    result: createUnfollowTypedData(request: $request, options: $options) {
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
export const CreateSetFollowModuleTypedDataDocument = gql`
  mutation CreateSetFollowModuleTypedData(
    $request: CreateSetFollowModuleRequest!
    $options: TypedDataOptions
  ) {
    result: createSetFollowModuleTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          SetFollowModuleWithSig {
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
          followModule
          followModuleInitData
        }
      }
    }
  }
`;
export const CreateSetFollowNftUriTypedDataDocument = gql`
  mutation CreateSetFollowNFTUriTypedData(
    $request: CreateSetFollowNFTUriRequest!
    $options: TypedDataOptions
  ) {
    result: createSetFollowNFTUriTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          SetFollowNFTURIWithSig {
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
          profileId
          deadline
          followNFTURI
        }
      }
    }
  }
`;
export const AddProfileInterestDocument = gql`
  mutation AddProfileInterest($request: AddProfileInterestsRequest!) {
    addProfileInterests(request: $request)
  }
`;
export const RemoveProfileInterestDocument = gql`
  mutation RemoveProfileInterest($request: RemoveProfileInterestsRequest!) {
    removeProfileInterests(request: $request)
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const ProfileDocumentString = print(ProfileDocument);
const ProfileStatsDocumentString = print(ProfileStatsDocument);
const ProfilesDocumentString = print(ProfilesDocument);
const RecommendedProfilesDocumentString = print(RecommendedProfilesDocument);
const MutualFollowersProfilesDocumentString = print(MutualFollowersProfilesDocument);
const DoesFollowDocumentString = print(DoesFollowDocument);
const FollowingDocumentString = print(FollowingDocument);
const FollowersDocumentString = print(FollowersDocument);
const FollowerNftOwnedTokenIdsDocumentString = print(FollowerNftOwnedTokenIdsDocument);
const PendingApprovalFollowsDocumentString = print(PendingApprovalFollowsDocument);
const ProfileInterestsDocumentString = print(ProfileInterestsDocument);
const CreateProfileDocumentString = print(CreateProfileDocument);
const CreateBurnProfileTypedDataDocumentString = print(CreateBurnProfileTypedDataDocument);
const CreateSetDefaultProfileTypedDataDocumentString = print(
  CreateSetDefaultProfileTypedDataDocument,
);
const CreateSetProfileImageUriTypedDataDocumentString = print(
  CreateSetProfileImageUriTypedDataDocument,
);
const CreateSetProfileImageUriViaDispatcherDocumentString = print(
  CreateSetProfileImageUriViaDispatcherDocument,
);
const CreateSetProfileMetadataTypedDataDocumentString = print(
  CreateSetProfileMetadataTypedDataDocument,
);
const CreateSetProfileMetadataViaDispatcherDocumentString = print(
  CreateSetProfileMetadataViaDispatcherDocument,
);
const CreateSetDispatcherTypedDataDocumentString = print(CreateSetDispatcherTypedDataDocument);
const CreateFollowTypedDataDocumentString = print(CreateFollowTypedDataDocument);
const CreateUnfollowTypedDataDocumentString = print(CreateUnfollowTypedDataDocument);
const CreateSetFollowModuleTypedDataDocumentString = print(CreateSetFollowModuleTypedDataDocument);
const CreateSetFollowNftUriTypedDataDocumentString = print(CreateSetFollowNftUriTypedDataDocument);
const AddProfileInterestDocumentString = print(AddProfileInterestDocument);
const RemoveProfileInterestDocumentString = print(RemoveProfileInterestDocument);
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
    ProfileStats(
      variables: ProfileStatsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: ProfileStatsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfileStatsQuery>(ProfileStatsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ProfileStats',
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
    PendingApprovalFollows(
      variables: PendingApprovalFollowsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: PendingApprovalFollowsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PendingApprovalFollowsQuery>(
            PendingApprovalFollowsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'PendingApprovalFollows',
        'query',
      );
    },
    ProfileInterests(
      variables?: ProfileInterestsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: ProfileInterestsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfileInterestsQuery>(ProfileInterestsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ProfileInterests',
        'query',
      );
    },
    CreateProfile(
      variables: CreateProfileMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateProfileMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateProfileMutation>(CreateProfileDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateProfile',
        'mutation',
      );
    },
    CreateBurnProfileTypedData(
      variables: CreateBurnProfileTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateBurnProfileTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateBurnProfileTypedDataMutation>(
            CreateBurnProfileTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateBurnProfileTypedData',
        'mutation',
      );
    },
    CreateSetDefaultProfileTypedData(
      variables: CreateSetDefaultProfileTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateSetDefaultProfileTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateSetDefaultProfileTypedDataMutation>(
            CreateSetDefaultProfileTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateSetDefaultProfileTypedData',
        'mutation',
      );
    },
    CreateSetProfileImageURITypedData(
      variables: CreateSetProfileImageUriTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateSetProfileImageUriTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateSetProfileImageUriTypedDataMutation>(
            CreateSetProfileImageUriTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateSetProfileImageURITypedData',
        'mutation',
      );
    },
    CreateSetProfileImageURIViaDispatcher(
      variables: CreateSetProfileImageUriViaDispatcherMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateSetProfileImageUriViaDispatcherMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateSetProfileImageUriViaDispatcherMutation>(
            CreateSetProfileImageUriViaDispatcherDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateSetProfileImageURIViaDispatcher',
        'mutation',
      );
    },
    CreateSetProfileMetadataTypedData(
      variables: CreateSetProfileMetadataTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateSetProfileMetadataTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateSetProfileMetadataTypedDataMutation>(
            CreateSetProfileMetadataTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateSetProfileMetadataTypedData',
        'mutation',
      );
    },
    CreateSetProfileMetadataViaDispatcher(
      variables: CreateSetProfileMetadataViaDispatcherMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateSetProfileMetadataViaDispatcherMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateSetProfileMetadataViaDispatcherMutation>(
            CreateSetProfileMetadataViaDispatcherDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateSetProfileMetadataViaDispatcher',
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
    CreateSetFollowModuleTypedData(
      variables: CreateSetFollowModuleTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateSetFollowModuleTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateSetFollowModuleTypedDataMutation>(
            CreateSetFollowModuleTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateSetFollowModuleTypedData',
        'mutation',
      );
    },
    CreateSetFollowNFTUriTypedData(
      variables: CreateSetFollowNftUriTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateSetFollowNftUriTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateSetFollowNftUriTypedDataMutation>(
            CreateSetFollowNftUriTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateSetFollowNFTUriTypedData',
        'mutation',
      );
    },
    AddProfileInterest(
      variables: AddProfileInterestMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AddProfileInterestMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AddProfileInterestMutation>(
            AddProfileInterestDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'AddProfileInterest',
        'mutation',
      );
    },
    RemoveProfileInterest(
      variables: RemoveProfileInterestMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: RemoveProfileInterestMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RemoveProfileInterestMutation>(
            RemoveProfileInterestDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'RemoveProfileInterest',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
