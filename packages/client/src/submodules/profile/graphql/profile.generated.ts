// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  Eip712TypedDataDomainFragment,
  Eip712TypedDataFieldFragment,
  ProfileFragment,
  PostFragment,
  QuoteFragment,
  PaginatedResultInfoFragment,
  CommentFragment,
  MirrorFragment,
  OpenActionResult_KnownCollectOpenActionResult_Fragment,
  OpenActionResult_UnknownOpenActionResult_Fragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  Eip712TypedDataDomainFragmentDoc,
  Eip712TypedDataFieldFragmentDoc,
  ProfileFragmentDoc,
  PostFragmentDoc,
  QuoteFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  CommentFragmentDoc,
  MirrorFragmentDoc,
  OpenActionResultFragmentDoc,
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
} from '../../../graphql/fragments.generated';
export type ProfileManagerFragment = { __typename: 'ProfilesManagedResult'; address: string };

export type CreateProfileWithHandleErrorResultFragment = {
  __typename: 'CreateProfileWithHandleErrorResult';
  reason: Types.CreateProfileWithHandleErrorReasonType;
};

export type CreateOnchainSetProfileMetadataBroadcastItemResultFragment = {
  __typename: 'CreateOnchainSetProfileMetadataBroadcastItemResult';
  id: string;
  expiresAt: string;
  typedData: {
    __typename: 'CreateOnchainSetProfileMetadataEIP712TypedData';
    types: {
      __typename: 'CreateOnchainSetProfileMetadataEIP712TypedDataTypes';
      SetProfileMetadataURI: Array<{
        __typename: 'EIP712TypedDataField';
        name: string;
        type: string;
      }>;
    };
    domain: { __typename: 'EIP712TypedDataDomain' } & Eip712TypedDataDomainFragment;
    value: {
      __typename: 'CreateOnchainSetProfileMetadataEIP712TypedDataValue';
      nonce: string;
      deadline: string;
      profileId: string;
      metadataURI: string;
    };
  };
};

export type CreateChangeProfileManagersBroadcastItemResultFragment = {
  __typename: 'CreateChangeProfileManagersBroadcastItemResult';
  id: string;
  expiresAt: string;
  typedData: {
    __typename: 'CreateChangeProfileManagersEIP712TypedData';
    types: {
      __typename: 'CreateChangeProfileManagersEIP712TypedDataTypes';
      ChangeDelegatedExecutorsConfig: Array<{
        __typename: 'EIP712TypedDataField';
        name: string;
        type: string;
      }>;
    };
    domain: { __typename: 'EIP712TypedDataDomain' } & Eip712TypedDataDomainFragment;
    value: {
      __typename: 'CreateChangeProfileManagersEIP712TypedDataValue';
      nonce: string;
      deadline: string;
      delegatorProfileId: string;
      delegatedExecutors: Array<string>;
      approvals: Array<boolean>;
      configNumber: number;
      switchToGivenConfig: boolean;
    };
  };
};

export type CreateBlockProfilesBroadcastItemResultFragment = {
  __typename: 'CreateBlockProfilesBroadcastItemResult';
  id: string;
  expiresAt: string;
  typedData: {
    __typename: 'CreateBlockProfilesEIP712TypedData';
    types: {
      __typename: 'CreateBlockProfilesEIP712TypedDataTypes';
      SetBlockStatus: Array<{ __typename: 'EIP712TypedDataField'; name: string; type: string }>;
    };
    domain: { __typename: 'EIP712TypedDataDomain' } & Eip712TypedDataDomainFragment;
    value: {
      __typename: 'CreateBlockProfilesEIP712TypedDataValue';
      nonce: string;
      deadline: string;
      byProfileId: string;
      idsOfProfilesToSetBlockStatus: Array<string>;
      blockStatus: Array<boolean>;
    };
  };
};

export type CreateUnblockProfilesBroadcastItemResultFragment = {
  __typename: 'CreateUnblockProfilesBroadcastItemResult';
  id: string;
  expiresAt: string;
  typedData: {
    __typename: 'CreateUnblockProfilesEIP712TypedData';
    types: {
      __typename: 'CreateUnblockProfilesEIP712TypedDataTypes';
      SetBlockStatus: Array<{ __typename: 'EIP712TypedDataField'; name: string; type: string }>;
    };
    domain: { __typename: 'EIP712TypedDataDomain' } & Eip712TypedDataDomainFragment;
    value: {
      __typename: 'CreateUnblockProfilesEIP712TypedDataValue';
      nonce: string;
      deadline: string;
      byProfileId: string;
      idsOfProfilesToSetBlockStatus: Array<string>;
      blockStatus: Array<boolean>;
    };
  };
};

export type CreateFollowBroadcastItemResultFragment = {
  __typename: 'CreateFollowBroadcastItemResult';
  id: string;
  expiresAt: string;
  typedData: {
    __typename: 'CreateFollowEIP712TypedData';
    types: {
      __typename: 'CreateFollowEIP712TypedDataTypes';
      Follow: Array<{ __typename: 'EIP712TypedDataField'; name: string; type: string }>;
    };
    domain: { __typename: 'EIP712TypedDataDomain' } & Eip712TypedDataDomainFragment;
    value: {
      __typename: 'CreateFollowEIP712TypedDataValue';
      nonce: string;
      deadline: string;
      followerProfileId: string;
      idsOfProfilesToFollow: Array<string>;
      followTokenIds: Array<string>;
      datas: Array<string>;
    };
  };
};

export type CreateUnfollowBroadcastItemResultFragment = {
  __typename: 'CreateUnfollowBroadcastItemResult';
  id: string;
  expiresAt: string;
  typedData: {
    __typename: 'CreateUnfollowEIP712TypedData';
    types: {
      __typename: 'CreateUnfollowEIP712TypedDataTypes';
      Unfollow: Array<{ __typename: 'EIP712TypedDataField'; name: string; type: string }>;
    };
    domain: { __typename: 'EIP712TypedDataDomain' } & Eip712TypedDataDomainFragment;
    value: {
      __typename: 'CreateUnfollowEIP712TypedDataValue';
      nonce: string;
      deadline: string;
      unfollowerProfileId: string;
      idsOfProfilesToUnfollow: Array<string>;
    };
  };
};

export type CreateSetFollowModuleBroadcastItemResultFragment = {
  __typename: 'CreateSetFollowModuleBroadcastItemResult';
  id: string;
  expiresAt: string;
  typedData: {
    __typename: 'CreateSetFollowModuleEIP712TypedData';
    types: {
      __typename: 'CreateSetFollowModuleEIP712TypedDataTypes';
      SetFollowModule: Array<{ __typename: 'EIP712TypedDataField'; name: string; type: string }>;
    };
    domain: { __typename: 'EIP712TypedDataDomain' } & Eip712TypedDataDomainFragment;
    value: {
      __typename: 'CreateSetFollowModuleEIP712TypedDataValue';
      nonce: string;
      deadline: string;
      profileId: string;
      followModule: string;
      followModuleInitData: string;
    };
  };
};

export type CreateHandleLinkToProfileBroadcastItemResultFragment = {
  __typename: 'CreateHandleLinkToProfileBroadcastItemResult';
  id: string;
  expiresAt: string;
  typedData: {
    __typename: 'CreateHandleLinkToProfileEIP712TypedData';
    types: {
      __typename: 'CreateHandleLinkToProfileEIP712TypedDataTypes';
      Link: Array<{ __typename: 'EIP712TypedDataField' } & Eip712TypedDataFieldFragment>;
    };
    domain: { __typename: 'EIP712TypedDataDomain' } & Eip712TypedDataDomainFragment;
    value: {
      __typename: 'CreateHandleLinkToProfileEIP712TypedDataValue';
      nonce: string;
      deadline: string;
      profileId: string;
      handleId: string;
    };
  };
};

export type CreateHandleUnlinkFromProfileBroadcastItemResultFragment = {
  __typename: 'CreateHandleUnlinkFromProfileBroadcastItemResult';
  id: string;
  expiresAt: string;
  typedData: {
    __typename: 'CreateHandleUnlinkFromProfileEIP712TypedData';
    types: {
      __typename: 'CreateHandleUnlinkFromProfileEIP712TypedDataTypes';
      Unlink: Array<{ __typename: 'EIP712TypedDataField' } & Eip712TypedDataFieldFragment>;
    };
    domain: { __typename: 'EIP712TypedDataDomain' } & Eip712TypedDataDomainFragment;
    value: {
      __typename: 'CreateHandleUnlinkFromProfileEIP712TypedDataValue';
      nonce: string;
      deadline: string;
      profileId: string;
      handleId: string;
    };
  };
};

export type ProfileStatsFragment = {
  __typename: 'ProfileStats';
  id: string;
  followers: number;
  following: number;
  comments: number;
  posts: number;
  mirrors: number;
  quotes: number;
  publications: number;
  countOpenActions: number;
  upvoteReactions: number;
  downvoteReactions: number;
};

export type ProfileQueryVariables = Types.Exact<{
  request: Types.ProfileRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type ProfileQuery = {
  __typename: 'Query';
  result: ({ __typename: 'Profile' } & ProfileFragment) | null;
};

export type ProfileStatsQueryVariables = Types.Exact<{
  request: Types.ProfileRequest;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
}>;

export type ProfileStatsQuery = {
  __typename: 'Query';
  result: {
    __typename: 'Profile';
    stats: { __typename: 'ProfileStats' } & ProfileStatsFragment;
  } | null;
};

export type ProfilesQueryVariables = Types.Exact<{
  request: Types.ProfilesRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type ProfilesQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedProfileResult';
    items: Array<{ __typename: 'Profile' } & ProfileFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type ProfileManagersQueryVariables = Types.Exact<{
  request: Types.ProfileManagersRequest;
}>;

export type ProfileManagersQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedProfileManagersResult';
    items: Array<{ __typename: 'ProfilesManagedResult' } & ProfileManagerFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type ProfileRecommendationsQueryVariables = Types.Exact<{
  request: Types.ProfileRecommendationsRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type ProfileRecommendationsQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedProfileResult';
    items: Array<{ __typename: 'Profile' } & ProfileFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type FollowingQueryVariables = Types.Exact<{
  request: Types.FollowingRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type FollowingQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedProfileResult';
    items: Array<{ __typename: 'Profile' } & ProfileFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type FollowersQueryVariables = Types.Exact<{
  request: Types.FollowersRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type FollowersQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedProfileResult';
    items: Array<{ __typename: 'Profile' } & ProfileFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type MutualFollowersQueryVariables = Types.Exact<{
  request: Types.MutualFollowersRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type MutualFollowersQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedProfileResult';
    items: Array<{ __typename: 'Profile' } & ProfileFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type WhoActedOnPublicationQueryVariables = Types.Exact<{
  request: Types.WhoActedOnPublicationRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type WhoActedOnPublicationQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedProfileResult';
    items: Array<{ __typename: 'Profile' } & ProfileFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type ClaimProfileMutationVariables = Types.Exact<{
  request: Types.ClaimProfileRequest;
}>;

export type ClaimProfileMutation = {
  __typename: 'Mutation';
  result:
    | ({
        __typename: 'CreateProfileWithHandleErrorResult';
      } & CreateProfileWithHandleErrorResultFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type CreateProfileWithHandleMutationVariables = Types.Exact<{
  request: Types.CreateProfileWithHandleRequest;
}>;

export type CreateProfileWithHandleMutation = {
  __typename: 'Mutation';
  result:
    | ({
        __typename: 'CreateProfileWithHandleErrorResult';
      } & CreateProfileWithHandleErrorResultFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type AddProfileInterestsMutationVariables = Types.Exact<{
  request: Types.ProfileInterestsRequest;
}>;

export type AddProfileInterestsMutation = { __typename: 'Mutation'; result: string | null };

export type RemoveProfileInterestsMutationVariables = Types.Exact<{
  request: Types.ProfileInterestsRequest;
}>;

export type RemoveProfileInterestsMutation = { __typename: 'Mutation'; result: string | null };

export type SetProfileMetadataMutationVariables = Types.Exact<{
  request: Types.OnchainSetProfileMetadataRequest;
}>;

export type SetProfileMetadataMutation = {
  __typename: 'Mutation';
  result:
    | ({ __typename: 'LensProfileManagerRelayError' } & LensProfileManagerRelayErrorFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type BlockMutationVariables = Types.Exact<{
  request: Types.BlockRequest;
}>;

export type BlockMutation = {
  __typename: 'Mutation';
  result:
    | ({ __typename: 'LensProfileManagerRelayError' } & LensProfileManagerRelayErrorFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type UnblockMutationVariables = Types.Exact<{
  request: Types.UnblockRequest;
}>;

export type UnblockMutation = {
  __typename: 'Mutation';
  result:
    | ({ __typename: 'LensProfileManagerRelayError' } & LensProfileManagerRelayErrorFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type FollowMutationVariables = Types.Exact<{
  request: Types.FollowLensManagerRequest;
}>;

export type FollowMutation = {
  __typename: 'Mutation';
  result:
    | ({ __typename: 'LensProfileManagerRelayError' } & LensProfileManagerRelayErrorFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type UnfollowMutationVariables = Types.Exact<{
  request: Types.UnfollowRequest;
}>;

export type UnfollowMutation = {
  __typename: 'Mutation';
  result:
    | ({ __typename: 'LensProfileManagerRelayError' } & LensProfileManagerRelayErrorFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type DismissRecommendedProfilesMutationVariables = Types.Exact<{
  request: Types.DismissRecommendedProfilesRequest;
}>;

export type DismissRecommendedProfilesMutation = { __typename: 'Mutation'; result: string | null };

export type CreateOnchainSetProfileMetadataTypedDataMutationVariables = Types.Exact<{
  request: Types.OnchainSetProfileMetadataRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnchainSetProfileMetadataTypedDataMutation = {
  __typename: 'Mutation';
  result: {
    __typename: 'CreateOnchainSetProfileMetadataBroadcastItemResult';
  } & CreateOnchainSetProfileMetadataBroadcastItemResultFragment;
};

export type CreateChangeProfileManagersTypedDataMutationVariables = Types.Exact<{
  request: Types.ChangeProfileManagersRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateChangeProfileManagersTypedDataMutation = {
  __typename: 'Mutation';
  result: {
    __typename: 'CreateChangeProfileManagersBroadcastItemResult';
  } & CreateChangeProfileManagersBroadcastItemResultFragment;
};

export type CreateBlockProfilesTypedDataMutationVariables = Types.Exact<{
  request: Types.BlockRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateBlockProfilesTypedDataMutation = {
  __typename: 'Mutation';
  result: {
    __typename: 'CreateBlockProfilesBroadcastItemResult';
  } & CreateBlockProfilesBroadcastItemResultFragment;
};

export type CreateUnblockProfilesTypedDataMutationVariables = Types.Exact<{
  request: Types.UnblockRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateUnblockProfilesTypedDataMutation = {
  __typename: 'Mutation';
  result: {
    __typename: 'CreateUnblockProfilesBroadcastItemResult';
  } & CreateUnblockProfilesBroadcastItemResultFragment;
};

export type CreateFollowTypedDataMutationVariables = Types.Exact<{
  request: Types.FollowRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateFollowTypedDataMutation = {
  __typename: 'Mutation';
  result: {
    __typename: 'CreateFollowBroadcastItemResult';
  } & CreateFollowBroadcastItemResultFragment;
};

export type CreateUnfollowTypedDataMutationVariables = Types.Exact<{
  request: Types.UnfollowRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateUnfollowTypedDataMutation = {
  __typename: 'Mutation';
  result: {
    __typename: 'CreateUnfollowBroadcastItemResult';
  } & CreateUnfollowBroadcastItemResultFragment;
};

export type SetFollowModuleMutationVariables = Types.Exact<{
  request: Types.SetFollowModuleRequest;
}>;

export type SetFollowModuleMutation = {
  __typename: 'Mutation';
  result:
    | ({ __typename: 'LensProfileManagerRelayError' } & LensProfileManagerRelayErrorFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type CreateSetFollowModuleTypedDataMutationVariables = Types.Exact<{
  request: Types.SetFollowModuleRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateSetFollowModuleTypedDataMutation = {
  __typename: 'Mutation';
  result: {
    __typename: 'CreateSetFollowModuleBroadcastItemResult';
  } & CreateSetFollowModuleBroadcastItemResultFragment;
};

export type HandleLinkToProfileMutationVariables = Types.Exact<{
  request: Types.HandleLinkToProfileRequest;
}>;

export type HandleLinkToProfileMutation = {
  __typename: 'Mutation';
  result:
    | ({ __typename: 'LensProfileManagerRelayError' } & LensProfileManagerRelayErrorFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type HandleUnlinkFromProfileMutationVariables = Types.Exact<{
  request: Types.HandleUnlinkFromProfileRequest;
}>;

export type HandleUnlinkFromProfileMutation = {
  __typename: 'Mutation';
  result:
    | ({ __typename: 'LensProfileManagerRelayError' } & LensProfileManagerRelayErrorFragment)
    | ({ __typename: 'RelaySuccess' } & RelaySuccessFragment);
};

export type CreateHandleLinkToProfileTypedDataMutationVariables = Types.Exact<{
  request: Types.HandleLinkToProfileRequest;
}>;

export type CreateHandleLinkToProfileTypedDataMutation = {
  __typename: 'Mutation';
  result: {
    __typename: 'CreateHandleLinkToProfileBroadcastItemResult';
  } & CreateHandleLinkToProfileBroadcastItemResultFragment;
};

export type CreateHandleUnlinkFromProfileTypedDataMutationVariables = Types.Exact<{
  request: Types.HandleUnlinkFromProfileRequest;
}>;

export type CreateHandleUnlinkFromProfileTypedDataMutation = {
  __typename: 'Mutation';
  result: {
    __typename: 'CreateHandleUnlinkFromProfileBroadcastItemResult';
  } & CreateHandleUnlinkFromProfileBroadcastItemResultFragment;
};

export const ProfileManagerFragmentDoc = gql`
  fragment ProfileManager on ProfilesManagedResult {
    address
  }
`;
export const CreateProfileWithHandleErrorResultFragmentDoc = gql`
  fragment CreateProfileWithHandleErrorResult on CreateProfileWithHandleErrorResult {
    reason
  }
`;
export const CreateOnchainSetProfileMetadataBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnchainSetProfileMetadataBroadcastItemResult on CreateOnchainSetProfileMetadataBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        SetProfileMetadataURI {
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
        profileId
        metadataURI
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateChangeProfileManagersBroadcastItemResultFragmentDoc = gql`
  fragment CreateChangeProfileManagersBroadcastItemResult on CreateChangeProfileManagersBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        ChangeDelegatedExecutorsConfig {
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
        delegatorProfileId
        delegatedExecutors
        approvals
        configNumber
        switchToGivenConfig
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateBlockProfilesBroadcastItemResultFragmentDoc = gql`
  fragment CreateBlockProfilesBroadcastItemResult on CreateBlockProfilesBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        SetBlockStatus {
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
        byProfileId
        idsOfProfilesToSetBlockStatus
        blockStatus
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateUnblockProfilesBroadcastItemResultFragmentDoc = gql`
  fragment CreateUnblockProfilesBroadcastItemResult on CreateUnblockProfilesBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        SetBlockStatus {
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
        byProfileId
        idsOfProfilesToSetBlockStatus
        blockStatus
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateFollowBroadcastItemResultFragmentDoc = gql`
  fragment CreateFollowBroadcastItemResult on CreateFollowBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Follow {
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
        followerProfileId
        idsOfProfilesToFollow
        followTokenIds
        datas
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateUnfollowBroadcastItemResultFragmentDoc = gql`
  fragment CreateUnfollowBroadcastItemResult on CreateUnfollowBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Unfollow {
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
        unfollowerProfileId
        idsOfProfilesToUnfollow
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateSetFollowModuleBroadcastItemResultFragmentDoc = gql`
  fragment CreateSetFollowModuleBroadcastItemResult on CreateSetFollowModuleBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        SetFollowModule {
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
        profileId
        followModule
        followModuleInitData
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateHandleLinkToProfileBroadcastItemResultFragmentDoc = gql`
  fragment CreateHandleLinkToProfileBroadcastItemResult on CreateHandleLinkToProfileBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Link {
          ...EIP712TypedDataField
        }
      }
      domain {
        ...EIP712TypedDataDomain
      }
      value {
        nonce
        deadline
        profileId
        handleId
      }
    }
  }
  ${Eip712TypedDataFieldFragmentDoc}
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateHandleUnlinkFromProfileBroadcastItemResultFragmentDoc = gql`
  fragment CreateHandleUnlinkFromProfileBroadcastItemResult on CreateHandleUnlinkFromProfileBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Unlink {
          ...EIP712TypedDataField
        }
      }
      domain {
        ...EIP712TypedDataDomain
      }
      value {
        nonce
        deadline
        profileId
        handleId
      }
    }
  }
  ${Eip712TypedDataFieldFragmentDoc}
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const ProfileStatsFragmentDoc = gql`
  fragment ProfileStats on ProfileStats {
    id
    followers
    following
    comments
    posts
    mirrors
    quotes
    mirrors
    quotes
    publications
    upvoteReactions: reactions(request: { type: UPVOTE })
    downvoteReactions: reactions(request: { type: DOWNVOTE })
    countOpenActions(request: $profileStatsCountOpenActionArgs)
  }
`;
export const ProfileDocument = gql`
  query Profile(
    $request: ProfileRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: profile(request: $request) {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const ProfileStatsDocument = gql`
  query ProfileStats(
    $request: ProfileRequest!
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
  ) {
    result: profile(request: $request) {
      stats(request: $profileStatsArg) {
        ...ProfileStats
      }
    }
  }
  ${ProfileStatsFragmentDoc}
`;
export const ProfilesDocument = gql`
  query Profiles(
    $request: ProfilesRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: profiles(request: $request) {
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
export const ProfileManagersDocument = gql`
  query ProfileManagers($request: ProfileManagersRequest!) {
    result: profileManagers(request: $request) {
      items {
        ...ProfileManager
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${ProfileManagerFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const ProfileRecommendationsDocument = gql`
  query ProfileRecommendations(
    $request: ProfileRecommendationsRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: profileRecommendations(request: $request) {
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
export const FollowingDocument = gql`
  query Following(
    $request: FollowingRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: following(request: $request) {
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
export const FollowersDocument = gql`
  query Followers(
    $request: FollowersRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: followers(request: $request) {
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
export const MutualFollowersDocument = gql`
  query MutualFollowers(
    $request: MutualFollowersRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: mutualFollowers(request: $request) {
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
export const WhoActedOnPublicationDocument = gql`
  query WhoActedOnPublication(
    $request: WhoActedOnPublicationRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: whoActedOnPublication(request: $request) {
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
export const ClaimProfileDocument = gql`
  mutation ClaimProfile($request: ClaimProfileRequest!) {
    result: claimProfile(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on CreateProfileWithHandleErrorResult {
        ...CreateProfileWithHandleErrorResult
      }
    }
  }
  ${RelaySuccessFragmentDoc}
  ${CreateProfileWithHandleErrorResultFragmentDoc}
`;
export const CreateProfileWithHandleDocument = gql`
  mutation CreateProfileWithHandle($request: CreateProfileWithHandleRequest!) {
    result: createProfileWithHandle(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on CreateProfileWithHandleErrorResult {
        ...CreateProfileWithHandleErrorResult
      }
    }
  }
  ${RelaySuccessFragmentDoc}
  ${CreateProfileWithHandleErrorResultFragmentDoc}
`;
export const AddProfileInterestsDocument = gql`
  mutation AddProfileInterests($request: ProfileInterestsRequest!) {
    result: addProfileInterests(request: $request)
  }
`;
export const RemoveProfileInterestsDocument = gql`
  mutation RemoveProfileInterests($request: ProfileInterestsRequest!) {
    result: removeProfileInterests(request: $request)
  }
`;
export const SetProfileMetadataDocument = gql`
  mutation SetProfileMetadata($request: OnchainSetProfileMetadataRequest!) {
    result: setProfileMetadata(request: $request) {
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
export const BlockDocument = gql`
  mutation Block($request: BlockRequest!) {
    result: block(request: $request) {
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
export const UnblockDocument = gql`
  mutation Unblock($request: UnblockRequest!) {
    result: unblock(request: $request) {
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
export const FollowDocument = gql`
  mutation Follow($request: FollowLensManagerRequest!) {
    result: follow(request: $request) {
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
export const UnfollowDocument = gql`
  mutation Unfollow($request: UnfollowRequest!) {
    result: unfollow(request: $request) {
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
export const DismissRecommendedProfilesDocument = gql`
  mutation DismissRecommendedProfiles($request: DismissRecommendedProfilesRequest!) {
    result: dismissRecommendedProfiles(request: $request)
  }
`;
export const CreateOnchainSetProfileMetadataTypedDataDocument = gql`
  mutation CreateOnchainSetProfileMetadataTypedData(
    $request: OnchainSetProfileMetadataRequest!
    $options: TypedDataOptions
  ) {
    result: createOnchainSetProfileMetadataTypedData(request: $request, options: $options) {
      ...CreateOnchainSetProfileMetadataBroadcastItemResult
    }
  }
  ${CreateOnchainSetProfileMetadataBroadcastItemResultFragmentDoc}
`;
export const CreateChangeProfileManagersTypedDataDocument = gql`
  mutation CreateChangeProfileManagersTypedData(
    $request: ChangeProfileManagersRequest!
    $options: TypedDataOptions
  ) {
    result: createChangeProfileManagersTypedData(request: $request, options: $options) {
      ...CreateChangeProfileManagersBroadcastItemResult
    }
  }
  ${CreateChangeProfileManagersBroadcastItemResultFragmentDoc}
`;
export const CreateBlockProfilesTypedDataDocument = gql`
  mutation CreateBlockProfilesTypedData($request: BlockRequest!, $options: TypedDataOptions) {
    result: createBlockProfilesTypedData(request: $request, options: $options) {
      ...CreateBlockProfilesBroadcastItemResult
    }
  }
  ${CreateBlockProfilesBroadcastItemResultFragmentDoc}
`;
export const CreateUnblockProfilesTypedDataDocument = gql`
  mutation CreateUnblockProfilesTypedData($request: UnblockRequest!, $options: TypedDataOptions) {
    result: createUnblockProfilesTypedData(request: $request, options: $options) {
      ...CreateUnblockProfilesBroadcastItemResult
    }
  }
  ${CreateUnblockProfilesBroadcastItemResultFragmentDoc}
`;
export const CreateFollowTypedDataDocument = gql`
  mutation CreateFollowTypedData($request: FollowRequest!, $options: TypedDataOptions) {
    result: createFollowTypedData(request: $request, options: $options) {
      ...CreateFollowBroadcastItemResult
    }
  }
  ${CreateFollowBroadcastItemResultFragmentDoc}
`;
export const CreateUnfollowTypedDataDocument = gql`
  mutation CreateUnfollowTypedData($request: UnfollowRequest!, $options: TypedDataOptions) {
    result: createUnfollowTypedData(request: $request, options: $options) {
      ...CreateUnfollowBroadcastItemResult
    }
  }
  ${CreateUnfollowBroadcastItemResultFragmentDoc}
`;
export const SetFollowModuleDocument = gql`
  mutation SetFollowModule($request: SetFollowModuleRequest!) {
    result: setFollowModule(request: $request) {
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
export const CreateSetFollowModuleTypedDataDocument = gql`
  mutation CreateSetFollowModuleTypedData(
    $request: SetFollowModuleRequest!
    $options: TypedDataOptions
  ) {
    result: createSetFollowModuleTypedData(request: $request, options: $options) {
      ...CreateSetFollowModuleBroadcastItemResult
    }
  }
  ${CreateSetFollowModuleBroadcastItemResultFragmentDoc}
`;
export const HandleLinkToProfileDocument = gql`
  mutation HandleLinkToProfile($request: HandleLinkToProfileRequest!) {
    result: handleLinkToProfile(request: $request) {
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
export const HandleUnlinkFromProfileDocument = gql`
  mutation HandleUnlinkFromProfile($request: HandleUnlinkFromProfileRequest!) {
    result: handleUnlinkFromProfile(request: $request) {
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
export const CreateHandleLinkToProfileTypedDataDocument = gql`
  mutation CreateHandleLinkToProfileTypedData($request: HandleLinkToProfileRequest!) {
    result: createHandleLinkToProfileTypedData(request: $request) {
      ...CreateHandleLinkToProfileBroadcastItemResult
    }
  }
  ${CreateHandleLinkToProfileBroadcastItemResultFragmentDoc}
`;
export const CreateHandleUnlinkFromProfileTypedDataDocument = gql`
  mutation CreateHandleUnlinkFromProfileTypedData($request: HandleUnlinkFromProfileRequest!) {
    result: createHandleUnlinkFromProfileTypedData(request: $request) {
      ...CreateHandleUnlinkFromProfileBroadcastItemResult
    }
  }
  ${CreateHandleUnlinkFromProfileBroadcastItemResultFragmentDoc}
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
const ProfileManagersDocumentString = print(ProfileManagersDocument);
const ProfileRecommendationsDocumentString = print(ProfileRecommendationsDocument);
const FollowingDocumentString = print(FollowingDocument);
const FollowersDocumentString = print(FollowersDocument);
const MutualFollowersDocumentString = print(MutualFollowersDocument);
const WhoActedOnPublicationDocumentString = print(WhoActedOnPublicationDocument);
const ClaimProfileDocumentString = print(ClaimProfileDocument);
const CreateProfileWithHandleDocumentString = print(CreateProfileWithHandleDocument);
const AddProfileInterestsDocumentString = print(AddProfileInterestsDocument);
const RemoveProfileInterestsDocumentString = print(RemoveProfileInterestsDocument);
const SetProfileMetadataDocumentString = print(SetProfileMetadataDocument);
const BlockDocumentString = print(BlockDocument);
const UnblockDocumentString = print(UnblockDocument);
const FollowDocumentString = print(FollowDocument);
const UnfollowDocumentString = print(UnfollowDocument);
const DismissRecommendedProfilesDocumentString = print(DismissRecommendedProfilesDocument);
const CreateOnchainSetProfileMetadataTypedDataDocumentString = print(
  CreateOnchainSetProfileMetadataTypedDataDocument,
);
const CreateChangeProfileManagersTypedDataDocumentString = print(
  CreateChangeProfileManagersTypedDataDocument,
);
const CreateBlockProfilesTypedDataDocumentString = print(CreateBlockProfilesTypedDataDocument);
const CreateUnblockProfilesTypedDataDocumentString = print(CreateUnblockProfilesTypedDataDocument);
const CreateFollowTypedDataDocumentString = print(CreateFollowTypedDataDocument);
const CreateUnfollowTypedDataDocumentString = print(CreateUnfollowTypedDataDocument);
const SetFollowModuleDocumentString = print(SetFollowModuleDocument);
const CreateSetFollowModuleTypedDataDocumentString = print(CreateSetFollowModuleTypedDataDocument);
const HandleLinkToProfileDocumentString = print(HandleLinkToProfileDocument);
const HandleUnlinkFromProfileDocumentString = print(HandleUnlinkFromProfileDocument);
const CreateHandleLinkToProfileTypedDataDocumentString = print(
  CreateHandleLinkToProfileTypedDataDocument,
);
const CreateHandleUnlinkFromProfileTypedDataDocumentString = print(
  CreateHandleUnlinkFromProfileTypedDataDocument,
);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Profile(
      variables: ProfileQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
    ProfileManagers(
      variables: ProfileManagersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ProfileManagersQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfileManagersQuery>(ProfileManagersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ProfileManagers',
        'query',
      );
    },
    ProfileRecommendations(
      variables: ProfileRecommendationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ProfileRecommendationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfileRecommendationsQuery>(
            ProfileRecommendationsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ProfileRecommendations',
        'query',
      );
    },
    Following(
      variables: FollowingQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
    MutualFollowers(
      variables: MutualFollowersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: MutualFollowersQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MutualFollowersQuery>(MutualFollowersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MutualFollowers',
        'query',
      );
    },
    WhoActedOnPublication(
      variables: WhoActedOnPublicationQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: WhoActedOnPublicationQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<WhoActedOnPublicationQuery>(
            WhoActedOnPublicationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'WhoActedOnPublication',
        'query',
      );
    },
    ClaimProfile(
      variables: ClaimProfileMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ClaimProfileMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ClaimProfileMutation>(ClaimProfileDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ClaimProfile',
        'mutation',
      );
    },
    CreateProfileWithHandle(
      variables: CreateProfileWithHandleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateProfileWithHandleMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateProfileWithHandleMutation>(
            CreateProfileWithHandleDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateProfileWithHandle',
        'mutation',
      );
    },
    AddProfileInterests(
      variables: AddProfileInterestsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AddProfileInterestsMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AddProfileInterestsMutation>(
            AddProfileInterestsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'AddProfileInterests',
        'mutation',
      );
    },
    RemoveProfileInterests(
      variables: RemoveProfileInterestsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: RemoveProfileInterestsMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RemoveProfileInterestsMutation>(
            RemoveProfileInterestsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'RemoveProfileInterests',
        'mutation',
      );
    },
    SetProfileMetadata(
      variables: SetProfileMetadataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SetProfileMetadataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SetProfileMetadataMutation>(
            SetProfileMetadataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'SetProfileMetadata',
        'mutation',
      );
    },
    Block(
      variables: BlockMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: BlockMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<BlockMutation>(BlockDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Block',
        'mutation',
      );
    },
    Unblock(
      variables: UnblockMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UnblockMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UnblockMutation>(UnblockDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Unblock',
        'mutation',
      );
    },
    Follow(
      variables: FollowMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: FollowMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<FollowMutation>(FollowDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Follow',
        'mutation',
      );
    },
    Unfollow(
      variables: UnfollowMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UnfollowMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UnfollowMutation>(UnfollowDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Unfollow',
        'mutation',
      );
    },
    DismissRecommendedProfiles(
      variables: DismissRecommendedProfilesMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: DismissRecommendedProfilesMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<DismissRecommendedProfilesMutation>(
            DismissRecommendedProfilesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DismissRecommendedProfiles',
        'mutation',
      );
    },
    CreateOnchainSetProfileMetadataTypedData(
      variables: CreateOnchainSetProfileMetadataTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnchainSetProfileMetadataTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnchainSetProfileMetadataTypedDataMutation>(
            CreateOnchainSetProfileMetadataTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnchainSetProfileMetadataTypedData',
        'mutation',
      );
    },
    CreateChangeProfileManagersTypedData(
      variables: CreateChangeProfileManagersTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateChangeProfileManagersTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateChangeProfileManagersTypedDataMutation>(
            CreateChangeProfileManagersTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateChangeProfileManagersTypedData',
        'mutation',
      );
    },
    CreateBlockProfilesTypedData(
      variables: CreateBlockProfilesTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateBlockProfilesTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateBlockProfilesTypedDataMutation>(
            CreateBlockProfilesTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateBlockProfilesTypedData',
        'mutation',
      );
    },
    CreateUnblockProfilesTypedData(
      variables: CreateUnblockProfilesTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateUnblockProfilesTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateUnblockProfilesTypedDataMutation>(
            CreateUnblockProfilesTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateUnblockProfilesTypedData',
        'mutation',
      );
    },
    CreateFollowTypedData(
      variables: CreateFollowTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
    SetFollowModule(
      variables: SetFollowModuleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SetFollowModuleMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SetFollowModuleMutation>(SetFollowModuleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'SetFollowModule',
        'mutation',
      );
    },
    CreateSetFollowModuleTypedData(
      variables: CreateSetFollowModuleTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
    HandleLinkToProfile(
      variables: HandleLinkToProfileMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: HandleLinkToProfileMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<HandleLinkToProfileMutation>(
            HandleLinkToProfileDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'HandleLinkToProfile',
        'mutation',
      );
    },
    HandleUnlinkFromProfile(
      variables: HandleUnlinkFromProfileMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: HandleUnlinkFromProfileMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<HandleUnlinkFromProfileMutation>(
            HandleUnlinkFromProfileDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'HandleUnlinkFromProfile',
        'mutation',
      );
    },
    CreateHandleLinkToProfileTypedData(
      variables: CreateHandleLinkToProfileTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateHandleLinkToProfileTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateHandleLinkToProfileTypedDataMutation>(
            CreateHandleLinkToProfileTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateHandleLinkToProfileTypedData',
        'mutation',
      );
    },
    CreateHandleUnlinkFromProfileTypedData(
      variables: CreateHandleUnlinkFromProfileTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateHandleUnlinkFromProfileTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateHandleUnlinkFromProfileTypedDataMutation>(
            CreateHandleUnlinkFromProfileTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateHandleUnlinkFromProfileTypedData',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
