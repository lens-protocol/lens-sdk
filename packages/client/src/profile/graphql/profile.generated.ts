// @ts-nocheck
import * as Types from '../../graphql/types.generated.js';

import {
  ProfileFragment,
  CommonPaginatedResultInfoFragment,
  FollowingFragment,
  FollowerFragment,
  Eip712TypedDataDomainFragment,
  RelayerResultFragment,
  RelayErrorFragment,
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
  Eip712TypedDataDomainFragmentDoc,
  RelayerResultFragmentDoc,
  RelayErrorFragmentDoc,
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
    { __typename: 'DoesFollowResponse' } & Pick<
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
    { __typename: 'FollowerNftOwnedTokenIds' } & Pick<
      Types.FollowerNftOwnedTokenIds,
      'followerNftAddress' | 'tokensIds'
    >
  >;
};

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
  options?: Types.Maybe<Types.TypedDataOptions>;
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

export type CreateProfileMutationVariables = Types.Exact<{
  request: Types.CreateProfileRequest;
}>;

export type CreateProfileMutation = { result: RelayerResultFragment | RelayErrorFragment };

export type CreateBurnProfileTypedDataMutationVariables = Types.Exact<{
  request: Types.BurnProfileRequest;
  options?: Types.Maybe<Types.TypedDataOptions>;
}>;

export type CreateBurnProfileTypedDataMutation = {
  result: Pick<Types.CreateBurnProfileBroadcastItemResult, 'id' | 'expiresAt'> & {
    typedData: {
      types: { BurnWithSig: Array<Pick<Types.Eip712TypedDataField, 'name' | 'type'>> };
      domain: Pick<
        Types.Eip712TypedDataDomain,
        'name' | 'chainId' | 'version' | 'verifyingContract'
      >;
      value: Pick<Types.CreateBurnEip712TypedDataValue, 'nonce' | 'deadline' | 'tokenId'>;
    };
  };
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
    followerNftOwnedTokenIds(request: $request) {
      __typename
      followerNftAddress
      tokensIds
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
const CreateFollowTypedDataDocumentString = print(CreateFollowTypedDataDocument);
const CreateUnfollowTypedDataDocumentString = print(CreateUnfollowTypedDataDocument);
const CreateSetDispatcherTypedDataDocumentString = print(CreateSetDispatcherTypedDataDocument);
const CreateProfileDocumentString = print(CreateProfileDocument);
const CreateBurnProfileTypedDataDocumentString = print(CreateBurnProfileTypedDataDocument);
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
