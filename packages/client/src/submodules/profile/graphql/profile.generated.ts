// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  Eip712TypedDataDomainFragment,
  ProfileFragment,
  PaginatedResultInfoFragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  Eip712TypedDataDomainFragmentDoc,
  ProfileFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
} from '../../../graphql/fragments.generated';
export type ProfileManagerFragment = { address: string };

export type CreateProfileWithHandleErrorResultFragment = {
  reason: Types.CreateProfileWithHandleErrorReasonType;
};

export type CreateOnchainSetProfileMetadataBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetProfileMetadataURI: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateChangeProfileManagersBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { ChangeDelegatedExecutorsConfig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateBlockProfilesBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetBlockStatus: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateUnblockProfilesBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetBlockStatus: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateFollowBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Follow: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateUnfollowBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Unfollow: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateSetFollowModuleBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetFollowModule: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type ProfileQueryVariables = Types.Exact<{
  request: Types.ProfileRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type ProfileQuery = { result: ProfileFragment | null };

export type ProfilesQueryVariables = Types.Exact<{
  request: Types.ProfilesRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type ProfilesQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type ProfileManagersQueryVariables = Types.Exact<{
  request: Types.ProfileManagersRequest;
}>;

export type ProfileManagersQuery = {
  result: { items: Array<ProfileManagerFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type ProfileRecommendationsQueryVariables = Types.Exact<{
  request: Types.ProfileRecommendationsRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type ProfileRecommendationsQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type FollowingQueryVariables = Types.Exact<{
  request: Types.FollowingRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type FollowingQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type FollowersQueryVariables = Types.Exact<{
  request: Types.FollowersRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type FollowersQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type MutualFollowersQueryVariables = Types.Exact<{
  request: Types.MutualFollowersRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type MutualFollowersQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type ClaimProfileMutationVariables = Types.Exact<{
  request: Types.ClaimProfileRequest;
}>;

export type ClaimProfileMutation = {
  result: CreateProfileWithHandleErrorResultFragment | RelaySuccessFragment;
};

export type CreateProfileWithHandleMutationVariables = Types.Exact<{
  request: Types.CreateProfileWithHandleRequest;
}>;

export type CreateProfileWithHandleMutation = {
  result: CreateProfileWithHandleErrorResultFragment | RelaySuccessFragment;
};

export type AddProfileInterestsMutationVariables = Types.Exact<{
  request: Types.ProfileInterestsRequest;
}>;

export type AddProfileInterestsMutation = { result: string | null };

export type RemoveProfileInterestsMutationVariables = Types.Exact<{
  request: Types.ProfileInterestsRequest;
}>;

export type RemoveProfileInterestsMutation = { result: string | null };

export type SetProfileMetadataMutationVariables = Types.Exact<{
  request: Types.OnchainSetProfileMetadataRequest;
}>;

export type SetProfileMetadataMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type BlockMutationVariables = Types.Exact<{
  request: Types.BlockRequest;
}>;

export type BlockMutation = { result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment };

export type UnblockMutationVariables = Types.Exact<{
  request: Types.UnblockRequest;
}>;

export type UnblockMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type FollowMutationVariables = Types.Exact<{
  request: Types.FollowLensManagerRequest;
}>;

export type FollowMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type UnfollowMutationVariables = Types.Exact<{
  request: Types.UnfollowRequest;
}>;

export type UnfollowMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type DismissRecommendedProfilesMutationVariables = Types.Exact<{
  request: Types.DismissRecommendedProfilesRequest;
}>;

export type DismissRecommendedProfilesMutation = { result: string | null };

export type CreateOnchainSetProfileMetadataTypedDataMutationVariables = Types.Exact<{
  request: Types.OnchainSetProfileMetadataRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnchainSetProfileMetadataTypedDataMutation = {
  result: CreateOnchainSetProfileMetadataBroadcastItemResultFragment;
};

export type CreateChangeProfileManagersTypedDataMutationVariables = Types.Exact<{
  request: Types.ChangeProfileManagersRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateChangeProfileManagersTypedDataMutation = {
  result: CreateChangeProfileManagersBroadcastItemResultFragment;
};

export type CreateBlockProfilesTypedDataMutationVariables = Types.Exact<{
  request: Types.BlockRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateBlockProfilesTypedDataMutation = {
  result: CreateBlockProfilesBroadcastItemResultFragment;
};

export type CreateUnblockProfilesTypedDataMutationVariables = Types.Exact<{
  request: Types.UnblockRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateUnblockProfilesTypedDataMutation = {
  result: CreateUnblockProfilesBroadcastItemResultFragment;
};

export type CreateFollowTypedDataMutationVariables = Types.Exact<{
  request: Types.FollowRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateFollowTypedDataMutation = { result: CreateFollowBroadcastItemResultFragment };

export type CreateUnfollowTypedDataMutationVariables = Types.Exact<{
  request: Types.UnfollowRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateUnfollowTypedDataMutation = { result: CreateUnfollowBroadcastItemResultFragment };

export type SetFollowModuleMutationVariables = Types.Exact<{
  request: Types.SetFollowModuleRequest;
}>;

export type SetFollowModuleMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type CreateSetFollowModuleTypedDataMutationVariables = Types.Exact<{
  request: Types.SetFollowModuleRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateSetFollowModuleTypedDataMutation = {
  result: CreateSetFollowModuleBroadcastItemResultFragment;
};

export type HandleLinkToProfileMutationVariables = Types.Exact<{
  request: Types.HandleLinkToProfileRequest;
}>;

export type HandleLinkToProfileMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type HandleUnlinkFromProfileMutationVariables = Types.Exact<{
  request: Types.HandleUnlinkFromProfileRequest;
}>;

export type HandleUnlinkFromProfileMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
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
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const ProfileDocument = gql`
  query Profile(
    $request: ProfileRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: profile(request: $request) {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const ProfilesDocument = gql`
  query Profiles(
    $request: ProfilesRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
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
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
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
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
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
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
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
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
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

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const ProfileDocumentString = print(ProfileDocument);
const ProfilesDocumentString = print(ProfilesDocument);
const ProfileManagersDocumentString = print(ProfileManagersDocument);
const ProfileRecommendationsDocumentString = print(ProfileRecommendationsDocument);
const FollowingDocumentString = print(FollowingDocument);
const FollowersDocumentString = print(FollowersDocument);
const MutualFollowersDocumentString = print(MutualFollowersDocument);
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
