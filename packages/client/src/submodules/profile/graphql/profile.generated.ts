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

export type CreateProfileErrorResultFragment = { reason: Types.CreateProfileErrorReasonType };

export type CreateSetProfileMetadataBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetProfileMetadataURIWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateSetProfileImageBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetProfileImageURIWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateChangeProfileManagersBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { ChangeDelegatedExecutorsConfigWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateBlockProfileBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetBlockStatusWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateUnblockProfileBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetBlockStatusWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateFollowBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { FollowWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateUnfollowBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { UnfollowWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateSetFollowModuleBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetFollowModuleWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type ProfileQueryVariables = Types.Exact<{
  request: Types.ProfileRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type ProfileQuery = { result: ProfileFragment | null };

export type ProfilesQueryVariables = Types.Exact<{
  request: Types.ProfilesRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
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
}>;

export type ProfileRecommendationsQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type FollowingQueryVariables = Types.Exact<{
  request: Types.FollowingRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type FollowingQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type FollowersQueryVariables = Types.Exact<{
  request: Types.FollowersRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type FollowersQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type MutualFollowersQueryVariables = Types.Exact<{
  request: Types.MutualFollowersRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type MutualFollowersQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type ClaimProfileMutationVariables = Types.Exact<{
  request: Types.ClaimProfileRequest;
}>;

export type ClaimProfileMutation = {
  result: CreateProfileErrorResultFragment | RelaySuccessFragment;
};

export type CreateProfileMutationVariables = Types.Exact<{
  request: Types.CreateProfileRequest;
}>;

export type CreateProfileMutation = {
  result: CreateProfileErrorResultFragment | RelaySuccessFragment;
};

export type AddProfileInterestsMutationVariables = Types.Exact<{
  request: Types.ProfileInterestsRequest;
}>;

export type AddProfileInterestsMutation = { result: string };

export type RemoveProfileInterestsMutationVariables = Types.Exact<{
  request: Types.ProfileInterestsRequest;
}>;

export type RemoveProfileInterestsMutation = { result: string };

export type SetProfileMetadataMutationVariables = Types.Exact<{
  request: Types.SetProfileMetadataRequest;
}>;

export type SetProfileMetadataMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type SetProfileImageUriMutationVariables = Types.Exact<{
  request: Types.SetProfileImageRequest;
}>;

export type SetProfileImageUriMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type SetProfileManagerMutationVariables = Types.Exact<{
  request: Types.ChangeProfileManagersRequest;
}>;

export type SetProfileManagerMutation = {
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
  request: Types.FollowRequest;
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

export type DismissRecommendedProfilesMutation = { result: string };

export type CreateSetProfileMetadataTypedDataMutationVariables = Types.Exact<{
  request: Types.SetProfileMetadataRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateSetProfileMetadataTypedDataMutation = {
  result: CreateSetProfileMetadataBroadcastItemResultFragment;
};

export type CreateSetProfileImageTypedDataMutationVariables = Types.Exact<{
  request: Types.SetProfileImageRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateSetProfileImageTypedDataMutation = {
  result: CreateSetProfileImageBroadcastItemResultFragment;
};

export type CreateChangeProfileManagersTypedDataMutationVariables = Types.Exact<{
  request: Types.ChangeProfileManagersRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateChangeProfileManagersTypedDataMutation = {
  result: CreateChangeProfileManagersBroadcastItemResultFragment;
};

export type CreateBlockProfileTypedDataMutationVariables = Types.Exact<{
  request: Types.BlockRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateBlockProfileTypedDataMutation = {
  result: CreateBlockProfileBroadcastItemResultFragment;
};

export type CreateUnblockProfileTypedDataMutationVariables = Types.Exact<{
  request: Types.UnblockRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateUnblockProfileTypedDataMutation = {
  result: CreateUnblockProfileBroadcastItemResultFragment;
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

export type LinkHandleToProfileQueryVariables = Types.Exact<{
  request: Types.LinkHandleRequest;
}>;

export type LinkHandleToProfileQuery = { linkHandleToProfile: string | null };

export type UnlinkHandleFromProfileQueryVariables = Types.Exact<{
  request: Types.UnlinkHandleRequest;
}>;

export type UnlinkHandleFromProfileQuery = { unlinkHandleFromProfile: string | null };

export const ProfileManagerFragmentDoc = gql`
  fragment ProfileManager on ProfilesManagedResult {
    address
  }
`;
export const CreateProfileErrorResultFragmentDoc = gql`
  fragment CreateProfileErrorResult on CreateProfileErrorResult {
    reason
  }
`;
export const CreateSetProfileMetadataBroadcastItemResultFragmentDoc = gql`
  fragment CreateSetProfileMetadataBroadcastItemResult on CreateSetProfileMetadataBroadcastItemResult {
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
export const CreateSetProfileImageBroadcastItemResultFragmentDoc = gql`
  fragment CreateSetProfileImageBroadcastItemResult on CreateSetProfileImageBroadcastItemResult {
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
        ChangeDelegatedExecutorsConfigWithSig {
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
export const CreateBlockProfileBroadcastItemResultFragmentDoc = gql`
  fragment CreateBlockProfileBroadcastItemResult on CreateBlockProfileBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        SetBlockStatusWithSig {
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
export const CreateUnblockProfileBroadcastItemResultFragmentDoc = gql`
  fragment CreateUnblockProfileBroadcastItemResult on CreateUnblockProfileBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        SetBlockStatusWithSig {
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
        UnfollowWithSig {
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
        SetFollowModuleWithSig {
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
      ... on CreateProfileErrorResult {
        ...CreateProfileErrorResult
      }
    }
  }
  ${RelaySuccessFragmentDoc}
  ${CreateProfileErrorResultFragmentDoc}
`;
export const CreateProfileDocument = gql`
  mutation CreateProfile($request: CreateProfileRequest!) {
    result: createProfile(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on CreateProfileErrorResult {
        ...CreateProfileErrorResult
      }
    }
  }
  ${RelaySuccessFragmentDoc}
  ${CreateProfileErrorResultFragmentDoc}
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
  mutation SetProfileMetadata($request: SetProfileMetadataRequest!) {
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
export const SetProfileImageUriDocument = gql`
  mutation SetProfileImageURI($request: SetProfileImageRequest!) {
    result: setProfileImageURI(request: $request) {
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
export const SetProfileManagerDocument = gql`
  mutation SetProfileManager($request: ChangeProfileManagersRequest!) {
    result: setProfileManager(request: $request) {
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
  mutation Follow($request: FollowRequest!) {
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
export const CreateSetProfileMetadataTypedDataDocument = gql`
  mutation CreateSetProfileMetadataTypedData(
    $request: SetProfileMetadataRequest!
    $options: TypedDataOptions
  ) {
    result: createSetProfileMetadataTypedData(request: $request, options: $options) {
      ...CreateSetProfileMetadataBroadcastItemResult
    }
  }
  ${CreateSetProfileMetadataBroadcastItemResultFragmentDoc}
`;
export const CreateSetProfileImageTypedDataDocument = gql`
  mutation CreateSetProfileImageTypedData(
    $request: SetProfileImageRequest!
    $options: TypedDataOptions
  ) {
    result: createSetProfileImageTypedData(request: $request, options: $options) {
      ...CreateSetProfileImageBroadcastItemResult
    }
  }
  ${CreateSetProfileImageBroadcastItemResultFragmentDoc}
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
export const CreateBlockProfileTypedDataDocument = gql`
  mutation CreateBlockProfileTypedData($request: BlockRequest!, $options: TypedDataOptions) {
    result: createBlockProfileTypedData(request: $request, options: $options) {
      ...CreateBlockProfileBroadcastItemResult
    }
  }
  ${CreateBlockProfileBroadcastItemResultFragmentDoc}
`;
export const CreateUnblockProfileTypedDataDocument = gql`
  mutation CreateUnblockProfileTypedData($request: UnblockRequest!, $options: TypedDataOptions) {
    result: createUnblockProfileTypedData(request: $request, options: $options) {
      ...CreateUnblockProfileBroadcastItemResult
    }
  }
  ${CreateUnblockProfileBroadcastItemResultFragmentDoc}
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
export const LinkHandleToProfileDocument = gql`
  query LinkHandleToProfile($request: LinkHandleRequest!) {
    linkHandleToProfile(request: $request)
  }
`;
export const UnlinkHandleFromProfileDocument = gql`
  query UnlinkHandleFromProfile($request: UnlinkHandleRequest!) {
    unlinkHandleFromProfile(request: $request)
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
const ProfileManagersDocumentString = print(ProfileManagersDocument);
const ProfileRecommendationsDocumentString = print(ProfileRecommendationsDocument);
const FollowingDocumentString = print(FollowingDocument);
const FollowersDocumentString = print(FollowersDocument);
const MutualFollowersDocumentString = print(MutualFollowersDocument);
const ClaimProfileDocumentString = print(ClaimProfileDocument);
const CreateProfileDocumentString = print(CreateProfileDocument);
const AddProfileInterestsDocumentString = print(AddProfileInterestsDocument);
const RemoveProfileInterestsDocumentString = print(RemoveProfileInterestsDocument);
const SetProfileMetadataDocumentString = print(SetProfileMetadataDocument);
const SetProfileImageUriDocumentString = print(SetProfileImageUriDocument);
const SetProfileManagerDocumentString = print(SetProfileManagerDocument);
const BlockDocumentString = print(BlockDocument);
const UnblockDocumentString = print(UnblockDocument);
const FollowDocumentString = print(FollowDocument);
const UnfollowDocumentString = print(UnfollowDocument);
const DismissRecommendedProfilesDocumentString = print(DismissRecommendedProfilesDocument);
const CreateSetProfileMetadataTypedDataDocumentString = print(
  CreateSetProfileMetadataTypedDataDocument,
);
const CreateSetProfileImageTypedDataDocumentString = print(CreateSetProfileImageTypedDataDocument);
const CreateChangeProfileManagersTypedDataDocumentString = print(
  CreateChangeProfileManagersTypedDataDocument,
);
const CreateBlockProfileTypedDataDocumentString = print(CreateBlockProfileTypedDataDocument);
const CreateUnblockProfileTypedDataDocumentString = print(CreateUnblockProfileTypedDataDocument);
const CreateFollowTypedDataDocumentString = print(CreateFollowTypedDataDocument);
const CreateUnfollowTypedDataDocumentString = print(CreateUnfollowTypedDataDocument);
const SetFollowModuleDocumentString = print(SetFollowModuleDocument);
const CreateSetFollowModuleTypedDataDocumentString = print(CreateSetFollowModuleTypedDataDocument);
const LinkHandleToProfileDocumentString = print(LinkHandleToProfileDocument);
const UnlinkHandleFromProfileDocumentString = print(UnlinkHandleFromProfileDocument);
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
    CreateProfile(
      variables: CreateProfileMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
    SetProfileImageURI(
      variables: SetProfileImageUriMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SetProfileImageUriMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SetProfileImageUriMutation>(
            SetProfileImageUriDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'SetProfileImageURI',
        'mutation',
      );
    },
    SetProfileManager(
      variables: SetProfileManagerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: SetProfileManagerMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SetProfileManagerMutation>(SetProfileManagerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'SetProfileManager',
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
    CreateSetProfileMetadataTypedData(
      variables: CreateSetProfileMetadataTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
    CreateSetProfileImageTypedData(
      variables: CreateSetProfileImageTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateSetProfileImageTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateSetProfileImageTypedDataMutation>(
            CreateSetProfileImageTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateSetProfileImageTypedData',
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
    CreateBlockProfileTypedData(
      variables: CreateBlockProfileTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateBlockProfileTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateBlockProfileTypedDataMutation>(
            CreateBlockProfileTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateBlockProfileTypedData',
        'mutation',
      );
    },
    CreateUnblockProfileTypedData(
      variables: CreateUnblockProfileTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateUnblockProfileTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateUnblockProfileTypedDataMutation>(
            CreateUnblockProfileTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateUnblockProfileTypedData',
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
    LinkHandleToProfile(
      variables: LinkHandleToProfileQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: LinkHandleToProfileQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LinkHandleToProfileQuery>(
            LinkHandleToProfileDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'LinkHandleToProfile',
        'query',
      );
    },
    UnlinkHandleFromProfile(
      variables: UnlinkHandleFromProfileQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UnlinkHandleFromProfileQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UnlinkHandleFromProfileQuery>(
            UnlinkHandleFromProfileDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UnlinkHandleFromProfile',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
