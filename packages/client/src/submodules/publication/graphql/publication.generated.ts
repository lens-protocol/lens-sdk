// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  PostFragment,
  QuoteFragment,
  ProfileFragment,
  PaginatedResultInfoFragment,
  MirrorFragment,
  CommentFragment,
  Eip712TypedDataDomainFragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  Eip712TypedDataFieldFragment,
  CreateMomokaPublicationResultFragment,
} from '../../../graphql/fragments.generated';
import { CreateActOnOpenActionEip712TypedDataFragment } from '../submodules/actions/graphql/actions.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PostFragmentDoc,
  QuoteFragmentDoc,
  ProfileFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
  Eip712TypedDataFieldFragmentDoc,
  CreateMomokaPublicationResultFragmentDoc,
} from '../../../graphql/fragments.generated';
import { CreateActOnOpenActionEip712TypedDataFragmentDoc } from '../submodules/actions/graphql/actions.generated';
export type TagResultFragment = { tag: string; total: number };

export type PublicationValidateMetadataResultFragment = { valid: boolean; reason: string | null };

export type PublicationStatsFragment = {
  id: string;
  comments: number;
  mirrors: number;
  quotes: number;
  reactions: number;
  countOpenActions: number;
  additionalArgs: {
    forApps: Array<string> | null;
    customFilters: Array<Types.CustomFiltersType> | null;
  };
};

export type PublicationQueryVariables = Types.Exact<{
  request: Types.PublicationRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
}>;

export type PublicationQuery = {
  result: CommentFragment | MirrorFragment | PostFragment | QuoteFragment | null;
};

export type PublicationStatsQueryVariables = Types.Exact<{
  request: Types.PublicationRequest;
  statsRequest: Types.PublicationStatsInput;
  reactionsRequest: Types.PublicationStatsReactionArgs;
  openActionsRequest: Types.PublicationStatsCountOpenActionArgs;
}>;

export type PublicationStatsQuery = {
  result:
    | { __typename: 'Comment'; stats: PublicationStatsFragment }
    | { __typename: 'Mirror' }
    | { __typename: 'Post'; stats: PublicationStatsFragment }
    | { __typename: 'Quote'; stats: PublicationStatsFragment }
    | null;
};

export type PublicationsQueryVariables = Types.Exact<{
  request: Types.PublicationsRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
}>;

export type PublicationsQuery = {
  result: {
    items: Array<CommentFragment | MirrorFragment | PostFragment | QuoteFragment>;
    pageInfo: PaginatedResultInfoFragment;
  };
};

export type PublicationsTagsQueryVariables = Types.Exact<{
  request: Types.PublicationsTagsRequest;
}>;

export type PublicationsTagsQuery = {
  result: { items: Array<TagResultFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type ValidatePublicationMetadataQueryVariables = Types.Exact<{
  request: Types.ValidatePublicationMetadataRequest;
}>;

export type ValidatePublicationMetadataQuery = {
  result: PublicationValidateMetadataResultFragment;
};

export type CreateOnchainPostBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Post: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateOnchainCommentBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Comment: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateOnchainMirrorEip712TypedDataValueFragment = {
  nonce: string;
  deadline: string;
  profileId: string;
  pointedProfileId: string;
  pointedPubId: string;
  referrerProfileIds: Array<string>;
  referrerPubIds: Array<string>;
  referenceModuleData: string;
};

export type CreateOnchainMirrorEip712TypedDataTypesFragment = {
  Mirror: Array<Eip712TypedDataFieldFragment>;
};

export type CreateOnchainMirrorEip712TypedDataFragment = {
  types: CreateOnchainMirrorEip712TypedDataTypesFragment;
  domain: Eip712TypedDataDomainFragment;
  value: CreateOnchainMirrorEip712TypedDataValueFragment;
};

export type CreateOnchainMirrorBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Mirror: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateOnchainQuoteEip712TypedDataValueFragment = {
  nonce: string;
  deadline: string;
  profileId: string;
  contentURI: string;
  pointedProfileId: string;
  pointedPubId: string;
  referrerProfileIds: Array<string>;
  referrerPubIds: Array<string>;
  referenceModuleData: string;
  actionModules: Array<string>;
  actionModulesInitDatas: Array<string>;
  referenceModule: string;
  referenceModuleInitData: string;
};

export type CreateOnchainQuoteEip712TypedDataTypesFragment = {
  Quote: Array<Eip712TypedDataFieldFragment>;
};

export type CreateOnchainQuoteEip712TypedDataFragment = {
  types: CreateOnchainQuoteEip712TypedDataTypesFragment;
  domain: Eip712TypedDataDomainFragment;
  value: CreateOnchainQuoteEip712TypedDataValueFragment;
};

export type CreateOnchainQuoteBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: CreateOnchainQuoteEip712TypedDataFragment;
};

export type CreateMomokaPostBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Post: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateMomokaCommentBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Comment: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateMomokaMirrorBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Mirror: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateMomokaQuoteBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Quote: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateLegacyCollectBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: CreateActOnOpenActionEip712TypedDataFragment;
};

export type CreateOnchainPostTypedDataMutationVariables = Types.Exact<{
  request: Types.OnchainPostRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnchainPostTypedDataMutation = {
  result: CreateOnchainPostBroadcastItemResultFragment;
};

export type CreateOnchainCommentTypedDataMutationVariables = Types.Exact<{
  request: Types.OnchainCommentRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnchainCommentTypedDataMutation = {
  result: CreateOnchainCommentBroadcastItemResultFragment;
};

export type CreateOnchainMirrorTypedDataMutationVariables = Types.Exact<{
  request: Types.OnchainMirrorRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnchainMirrorTypedDataMutation = {
  result: CreateOnchainMirrorBroadcastItemResultFragment;
};

export type CreateOnchainQuoteTypedDataMutationVariables = Types.Exact<{
  request: Types.OnchainQuoteRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnchainQuoteTypedDataMutation = {
  result: CreateOnchainQuoteBroadcastItemResultFragment;
};

export type CreateMomokaPostTypedDataMutationVariables = Types.Exact<{
  request: Types.MomokaPostRequest;
}>;

export type CreateMomokaPostTypedDataMutation = {
  result: CreateMomokaPostBroadcastItemResultFragment;
};

export type CreateMomokaCommentTypedDataMutationVariables = Types.Exact<{
  request: Types.MomokaCommentRequest;
}>;

export type CreateMomokaCommentTypedDataMutation = {
  result: CreateMomokaCommentBroadcastItemResultFragment;
};

export type CreateMomokaMirrorTypedDataMutationVariables = Types.Exact<{
  request: Types.MomokaMirrorRequest;
}>;

export type CreateMomokaMirrorTypedDataMutation = {
  result: CreateMomokaMirrorBroadcastItemResultFragment;
};

export type CreateMomokaQuoteTypedDataMutationVariables = Types.Exact<{
  request: Types.MomokaQuoteRequest;
}>;

export type CreateMomokaQuoteTypedDataMutation = {
  result: CreateMomokaQuoteBroadcastItemResultFragment;
};

export type PostOnchainMutationVariables = Types.Exact<{
  request: Types.OnchainPostRequest;
}>;

export type PostOnchainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type CommentOnchainMutationVariables = Types.Exact<{
  request: Types.OnchainCommentRequest;
}>;

export type CommentOnchainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type MirrorOnchainMutationVariables = Types.Exact<{
  request: Types.OnchainMirrorRequest;
}>;

export type MirrorOnchainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type QuoteOnchainMutationVariables = Types.Exact<{
  request: Types.OnchainQuoteRequest;
}>;

export type QuoteOnchainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type PostOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaPostRequest;
}>;

export type PostOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | LensProfileManagerRelayErrorFragment;
};

export type CommentOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaCommentRequest;
}>;

export type CommentOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | LensProfileManagerRelayErrorFragment;
};

export type MirrorOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaMirrorRequest;
}>;

export type MirrorOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | LensProfileManagerRelayErrorFragment;
};

export type QuoteOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaQuoteRequest;
}>;

export type QuoteOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | LensProfileManagerRelayErrorFragment;
};

export type HidePublicationMutationVariables = Types.Exact<{
  request: Types.HidePublicationRequest;
}>;

export type HidePublicationMutation = { hidePublication: string };

export type ReportPublicationMutationVariables = Types.Exact<{
  request: Types.ReportPublicationRequest;
}>;

export type ReportPublicationMutation = { reportPublication: string };

export type LegacyCollectPublicationMutationVariables = Types.Exact<{
  request: Types.LegacyCollectRequest;
}>;

export type LegacyCollectPublicationMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type CreateLegacyCollectTypedDataMutationVariables = Types.Exact<{
  request: Types.LegacyCollectRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateLegacyCollectTypedDataMutation = {
  result: CreateLegacyCollectBroadcastItemResultFragment;
};

export const TagResultFragmentDoc = gql`
  fragment TagResult on TagResult {
    tag
    total
  }
`;
export const PublicationValidateMetadataResultFragmentDoc = gql`
  fragment PublicationValidateMetadataResult on PublicationValidateMetadataResult {
    valid
    reason
  }
`;
export const PublicationStatsFragmentDoc = gql`
  fragment PublicationStats on PublicationStats {
    additionalArgs {
      forApps
      customFilters
    }
    id
    comments
    mirrors
    quotes
    reactions(request: $reactionsRequest)
    countOpenActions(request: $openActionsRequest)
  }
`;
export const CreateOnchainPostBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnchainPostBroadcastItemResult on CreateOnchainPostBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Post {
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
export const CreateOnchainCommentBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnchainCommentBroadcastItemResult on CreateOnchainCommentBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Comment {
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
export const CreateOnchainMirrorEip712TypedDataTypesFragmentDoc = gql`
  fragment CreateOnchainMirrorEIP712TypedDataTypes on CreateOnchainMirrorEIP712TypedDataTypes {
    Mirror {
      ...EIP712TypedDataField
    }
  }
  ${Eip712TypedDataFieldFragmentDoc}
`;
export const CreateOnchainMirrorEip712TypedDataValueFragmentDoc = gql`
  fragment CreateOnchainMirrorEIP712TypedDataValue on CreateOnchainMirrorEIP712TypedDataValue {
    nonce
    deadline
    profileId
    pointedProfileId
    pointedPubId
    referrerProfileIds
    referrerProfileIds
    referrerPubIds
    referenceModuleData
  }
`;
export const CreateOnchainMirrorEip712TypedDataFragmentDoc = gql`
  fragment CreateOnchainMirrorEIP712TypedData on CreateOnchainMirrorEIP712TypedData {
    types {
      ...CreateOnchainMirrorEIP712TypedDataTypes
    }
    domain {
      ...EIP712TypedDataDomain
    }
    value {
      ...CreateOnchainMirrorEIP712TypedDataValue
    }
  }
  ${CreateOnchainMirrorEip712TypedDataTypesFragmentDoc}
  ${Eip712TypedDataDomainFragmentDoc}
  ${CreateOnchainMirrorEip712TypedDataValueFragmentDoc}
`;
export const CreateOnchainMirrorBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnchainMirrorBroadcastItemResult on CreateOnchainMirrorBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Mirror {
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
export const CreateOnchainQuoteEip712TypedDataTypesFragmentDoc = gql`
  fragment CreateOnchainQuoteEIP712TypedDataTypes on CreateOnchainQuoteEIP712TypedDataTypes {
    Quote {
      ...EIP712TypedDataField
    }
  }
  ${Eip712TypedDataFieldFragmentDoc}
`;
export const CreateOnchainQuoteEip712TypedDataValueFragmentDoc = gql`
  fragment CreateOnchainQuoteEIP712TypedDataValue on CreateOnchainQuoteEIP712TypedDataValue {
    nonce
    deadline
    profileId
    contentURI
    pointedProfileId
    pointedPubId
    referrerProfileIds
    referrerPubIds
    referenceModuleData
    actionModules
    actionModulesInitDatas
    referenceModule
    referenceModuleInitData
  }
`;
export const CreateOnchainQuoteEip712TypedDataFragmentDoc = gql`
  fragment CreateOnchainQuoteEIP712TypedData on CreateOnchainQuoteEIP712TypedData {
    types {
      ...CreateOnchainQuoteEIP712TypedDataTypes
    }
    domain {
      ...EIP712TypedDataDomain
    }
    value {
      ...CreateOnchainQuoteEIP712TypedDataValue
    }
  }
  ${CreateOnchainQuoteEip712TypedDataTypesFragmentDoc}
  ${Eip712TypedDataDomainFragmentDoc}
  ${CreateOnchainQuoteEip712TypedDataValueFragmentDoc}
`;
export const CreateOnchainQuoteBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnchainQuoteBroadcastItemResult on CreateOnchainQuoteBroadcastItemResult {
    id
    expiresAt
    typedData {
      ...CreateOnchainQuoteEIP712TypedData
    }
  }
  ${CreateOnchainQuoteEip712TypedDataFragmentDoc}
`;
export const CreateMomokaPostBroadcastItemResultFragmentDoc = gql`
  fragment CreateMomokaPostBroadcastItemResult on CreateMomokaPostBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Post {
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
export const CreateMomokaCommentBroadcastItemResultFragmentDoc = gql`
  fragment CreateMomokaCommentBroadcastItemResult on CreateMomokaCommentBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Comment {
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
export const CreateMomokaMirrorBroadcastItemResultFragmentDoc = gql`
  fragment CreateMomokaMirrorBroadcastItemResult on CreateMomokaMirrorBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Mirror {
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
export const CreateMomokaQuoteBroadcastItemResultFragmentDoc = gql`
  fragment CreateMomokaQuoteBroadcastItemResult on CreateMomokaQuoteBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Quote {
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
export const CreateLegacyCollectBroadcastItemResultFragmentDoc = gql`
  fragment CreateLegacyCollectBroadcastItemResult on CreateLegacyCollectBroadcastItemResult {
    id
    expiresAt
    typedData {
      ...CreateActOnOpenActionEIP712TypedData
    }
  }
  ${CreateActOnOpenActionEip712TypedDataFragmentDoc}
`;
export const PublicationDocument = gql`
  query Publication(
    $request: PublicationRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
  ) {
    result: publication(request: $request) {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...Mirror
      }
      ... on Comment {
        ...Comment
      }
      ... on Quote {
        ...Quote
      }
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const PublicationStatsDocument = gql`
  query PublicationStats(
    $request: PublicationRequest!
    $statsRequest: PublicationStatsInput!
    $reactionsRequest: PublicationStatsReactionArgs!
    $openActionsRequest: PublicationStatsCountOpenActionArgs!
  ) {
    result: publication(request: $request) {
      ... on Post {
        __typename
        stats(request: $statsRequest) {
          ...PublicationStats
        }
      }
      ... on Comment {
        __typename
        stats(request: $statsRequest) {
          ...PublicationStats
        }
      }
      ... on Quote {
        __typename
        stats(request: $statsRequest) {
          ...PublicationStats
        }
      }
      ... on Mirror {
        __typename
      }
    }
  }
  ${PublicationStatsFragmentDoc}
`;
export const PublicationsDocument = gql`
  query Publications(
    $request: PublicationsRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
  ) {
    result: publications(request: $request) {
      items {
        ... on Post {
          ...Post
        }
        ... on Mirror {
          ...Mirror
        }
        ... on Comment {
          ...Comment
        }
        ... on Quote {
          ...Quote
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const PublicationsTagsDocument = gql`
  query PublicationsTags($request: PublicationsTagsRequest!) {
    result: publicationsTags(request: $request) {
      items {
        ...TagResult
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${TagResultFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const ValidatePublicationMetadataDocument = gql`
  query ValidatePublicationMetadata($request: ValidatePublicationMetadataRequest!) {
    result: validatePublicationMetadata(request: $request) {
      ...PublicationValidateMetadataResult
    }
  }
  ${PublicationValidateMetadataResultFragmentDoc}
`;
export const CreateOnchainPostTypedDataDocument = gql`
  mutation CreateOnchainPostTypedData($request: OnchainPostRequest!, $options: TypedDataOptions) {
    result: createOnchainPostTypedData(request: $request, options: $options) {
      ...CreateOnchainPostBroadcastItemResult
    }
  }
  ${CreateOnchainPostBroadcastItemResultFragmentDoc}
`;
export const CreateOnchainCommentTypedDataDocument = gql`
  mutation CreateOnchainCommentTypedData(
    $request: OnchainCommentRequest!
    $options: TypedDataOptions
  ) {
    result: createOnchainCommentTypedData(request: $request, options: $options) {
      ...CreateOnchainCommentBroadcastItemResult
    }
  }
  ${CreateOnchainCommentBroadcastItemResultFragmentDoc}
`;
export const CreateOnchainMirrorTypedDataDocument = gql`
  mutation CreateOnchainMirrorTypedData(
    $request: OnchainMirrorRequest!
    $options: TypedDataOptions
  ) {
    result: createOnchainMirrorTypedData(request: $request, options: $options) {
      ...CreateOnchainMirrorBroadcastItemResult
    }
  }
  ${CreateOnchainMirrorBroadcastItemResultFragmentDoc}
`;
export const CreateOnchainQuoteTypedDataDocument = gql`
  mutation CreateOnchainQuoteTypedData($request: OnchainQuoteRequest!, $options: TypedDataOptions) {
    result: createOnchainQuoteTypedData(request: $request, options: $options) {
      ...CreateOnchainQuoteBroadcastItemResult
    }
  }
  ${CreateOnchainQuoteBroadcastItemResultFragmentDoc}
`;
export const CreateMomokaPostTypedDataDocument = gql`
  mutation CreateMomokaPostTypedData($request: MomokaPostRequest!) {
    result: createMomokaPostTypedData(request: $request) {
      ...CreateMomokaPostBroadcastItemResult
    }
  }
  ${CreateMomokaPostBroadcastItemResultFragmentDoc}
`;
export const CreateMomokaCommentTypedDataDocument = gql`
  mutation CreateMomokaCommentTypedData($request: MomokaCommentRequest!) {
    result: createMomokaCommentTypedData(request: $request) {
      ...CreateMomokaCommentBroadcastItemResult
    }
  }
  ${CreateMomokaCommentBroadcastItemResultFragmentDoc}
`;
export const CreateMomokaMirrorTypedDataDocument = gql`
  mutation CreateMomokaMirrorTypedData($request: MomokaMirrorRequest!) {
    result: createMomokaMirrorTypedData(request: $request) {
      ...CreateMomokaMirrorBroadcastItemResult
    }
  }
  ${CreateMomokaMirrorBroadcastItemResultFragmentDoc}
`;
export const CreateMomokaQuoteTypedDataDocument = gql`
  mutation CreateMomokaQuoteTypedData($request: MomokaQuoteRequest!) {
    result: createMomokaQuoteTypedData(request: $request) {
      ...CreateMomokaQuoteBroadcastItemResult
    }
  }
  ${CreateMomokaQuoteBroadcastItemResultFragmentDoc}
`;
export const PostOnchainDocument = gql`
  mutation PostOnchain($request: OnchainPostRequest!) {
    result: postOnchain(request: $request) {
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
export const CommentOnchainDocument = gql`
  mutation CommentOnchain($request: OnchainCommentRequest!) {
    result: commentOnchain(request: $request) {
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
export const MirrorOnchainDocument = gql`
  mutation MirrorOnchain($request: OnchainMirrorRequest!) {
    result: mirrorOnchain(request: $request) {
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
export const QuoteOnchainDocument = gql`
  mutation QuoteOnchain($request: OnchainQuoteRequest!) {
    result: quoteOnchain(request: $request) {
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
export const PostOnMomokaDocument = gql`
  mutation PostOnMomoka($request: MomokaPostRequest!) {
    result: postOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${LensProfileManagerRelayErrorFragmentDoc}
`;
export const CommentOnMomokaDocument = gql`
  mutation CommentOnMomoka($request: MomokaCommentRequest!) {
    result: commentOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${LensProfileManagerRelayErrorFragmentDoc}
`;
export const MirrorOnMomokaDocument = gql`
  mutation MirrorOnMomoka($request: MomokaMirrorRequest!) {
    result: mirrorOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${LensProfileManagerRelayErrorFragmentDoc}
`;
export const QuoteOnMomokaDocument = gql`
  mutation QuoteOnMomoka($request: MomokaQuoteRequest!) {
    result: quoteOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${LensProfileManagerRelayErrorFragmentDoc}
`;
export const HidePublicationDocument = gql`
  mutation HidePublication($request: HidePublicationRequest!) {
    hidePublication(request: $request)
  }
`;
export const ReportPublicationDocument = gql`
  mutation ReportPublication($request: ReportPublicationRequest!) {
    reportPublication(request: $request)
  }
`;
export const LegacyCollectPublicationDocument = gql`
  mutation LegacyCollectPublication($request: LegacyCollectRequest!) {
    result: legacyCollect(request: $request) {
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
export const CreateLegacyCollectTypedDataDocument = gql`
  mutation CreateLegacyCollectTypedData(
    $request: LegacyCollectRequest!
    $options: TypedDataOptions
  ) {
    result: createLegacyCollectTypedData(request: $request, options: $options) {
      ...CreateLegacyCollectBroadcastItemResult
    }
  }
  ${CreateLegacyCollectBroadcastItemResultFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const PublicationDocumentString = print(PublicationDocument);
const PublicationStatsDocumentString = print(PublicationStatsDocument);
const PublicationsDocumentString = print(PublicationsDocument);
const PublicationsTagsDocumentString = print(PublicationsTagsDocument);
const ValidatePublicationMetadataDocumentString = print(ValidatePublicationMetadataDocument);
const CreateOnchainPostTypedDataDocumentString = print(CreateOnchainPostTypedDataDocument);
const CreateOnchainCommentTypedDataDocumentString = print(CreateOnchainCommentTypedDataDocument);
const CreateOnchainMirrorTypedDataDocumentString = print(CreateOnchainMirrorTypedDataDocument);
const CreateOnchainQuoteTypedDataDocumentString = print(CreateOnchainQuoteTypedDataDocument);
const CreateMomokaPostTypedDataDocumentString = print(CreateMomokaPostTypedDataDocument);
const CreateMomokaCommentTypedDataDocumentString = print(CreateMomokaCommentTypedDataDocument);
const CreateMomokaMirrorTypedDataDocumentString = print(CreateMomokaMirrorTypedDataDocument);
const CreateMomokaQuoteTypedDataDocumentString = print(CreateMomokaQuoteTypedDataDocument);
const PostOnchainDocumentString = print(PostOnchainDocument);
const CommentOnchainDocumentString = print(CommentOnchainDocument);
const MirrorOnchainDocumentString = print(MirrorOnchainDocument);
const QuoteOnchainDocumentString = print(QuoteOnchainDocument);
const PostOnMomokaDocumentString = print(PostOnMomokaDocument);
const CommentOnMomokaDocumentString = print(CommentOnMomokaDocument);
const MirrorOnMomokaDocumentString = print(MirrorOnMomokaDocument);
const QuoteOnMomokaDocumentString = print(QuoteOnMomokaDocument);
const HidePublicationDocumentString = print(HidePublicationDocument);
const ReportPublicationDocumentString = print(ReportPublicationDocument);
const LegacyCollectPublicationDocumentString = print(LegacyCollectPublicationDocument);
const CreateLegacyCollectTypedDataDocumentString = print(CreateLegacyCollectTypedDataDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Publication(
      variables: PublicationQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: PublicationQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationQuery>(PublicationDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Publication',
        'query',
      );
    },
    PublicationStats(
      variables: PublicationStatsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: PublicationStatsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationStatsQuery>(PublicationStatsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PublicationStats',
        'query',
      );
    },
    Publications(
      variables: PublicationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: PublicationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationsQuery>(PublicationsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Publications',
        'query',
      );
    },
    PublicationsTags(
      variables: PublicationsTagsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: PublicationsTagsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationsTagsQuery>(PublicationsTagsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PublicationsTags',
        'query',
      );
    },
    ValidatePublicationMetadata(
      variables: ValidatePublicationMetadataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ValidatePublicationMetadataQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ValidatePublicationMetadataQuery>(
            ValidatePublicationMetadataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ValidatePublicationMetadata',
        'query',
      );
    },
    CreateOnchainPostTypedData(
      variables: CreateOnchainPostTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnchainPostTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnchainPostTypedDataMutation>(
            CreateOnchainPostTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnchainPostTypedData',
        'mutation',
      );
    },
    CreateOnchainCommentTypedData(
      variables: CreateOnchainCommentTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnchainCommentTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnchainCommentTypedDataMutation>(
            CreateOnchainCommentTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnchainCommentTypedData',
        'mutation',
      );
    },
    CreateOnchainMirrorTypedData(
      variables: CreateOnchainMirrorTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnchainMirrorTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnchainMirrorTypedDataMutation>(
            CreateOnchainMirrorTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnchainMirrorTypedData',
        'mutation',
      );
    },
    CreateOnchainQuoteTypedData(
      variables: CreateOnchainQuoteTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnchainQuoteTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnchainQuoteTypedDataMutation>(
            CreateOnchainQuoteTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnchainQuoteTypedData',
        'mutation',
      );
    },
    CreateMomokaPostTypedData(
      variables: CreateMomokaPostTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateMomokaPostTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateMomokaPostTypedDataMutation>(
            CreateMomokaPostTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMomokaPostTypedData',
        'mutation',
      );
    },
    CreateMomokaCommentTypedData(
      variables: CreateMomokaCommentTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateMomokaCommentTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateMomokaCommentTypedDataMutation>(
            CreateMomokaCommentTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMomokaCommentTypedData',
        'mutation',
      );
    },
    CreateMomokaMirrorTypedData(
      variables: CreateMomokaMirrorTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateMomokaMirrorTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateMomokaMirrorTypedDataMutation>(
            CreateMomokaMirrorTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMomokaMirrorTypedData',
        'mutation',
      );
    },
    CreateMomokaQuoteTypedData(
      variables: CreateMomokaQuoteTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateMomokaQuoteTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateMomokaQuoteTypedDataMutation>(
            CreateMomokaQuoteTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMomokaQuoteTypedData',
        'mutation',
      );
    },
    PostOnchain(
      variables: PostOnchainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: PostOnchainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PostOnchainMutation>(PostOnchainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PostOnchain',
        'mutation',
      );
    },
    CommentOnchain(
      variables: CommentOnchainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CommentOnchainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CommentOnchainMutation>(CommentOnchainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CommentOnchain',
        'mutation',
      );
    },
    MirrorOnchain(
      variables: MirrorOnchainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: MirrorOnchainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MirrorOnchainMutation>(MirrorOnchainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MirrorOnchain',
        'mutation',
      );
    },
    QuoteOnchain(
      variables: QuoteOnchainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: QuoteOnchainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<QuoteOnchainMutation>(QuoteOnchainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'QuoteOnchain',
        'mutation',
      );
    },
    PostOnMomoka(
      variables: PostOnMomokaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: PostOnMomokaMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PostOnMomokaMutation>(PostOnMomokaDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PostOnMomoka',
        'mutation',
      );
    },
    CommentOnMomoka(
      variables: CommentOnMomokaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CommentOnMomokaMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CommentOnMomokaMutation>(CommentOnMomokaDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CommentOnMomoka',
        'mutation',
      );
    },
    MirrorOnMomoka(
      variables: MirrorOnMomokaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: MirrorOnMomokaMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MirrorOnMomokaMutation>(MirrorOnMomokaDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MirrorOnMomoka',
        'mutation',
      );
    },
    QuoteOnMomoka(
      variables: QuoteOnMomokaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: QuoteOnMomokaMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<QuoteOnMomokaMutation>(QuoteOnMomokaDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'QuoteOnMomoka',
        'mutation',
      );
    },
    HidePublication(
      variables: HidePublicationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: HidePublicationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<HidePublicationMutation>(HidePublicationDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'HidePublication',
        'mutation',
      );
    },
    ReportPublication(
      variables: ReportPublicationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReportPublicationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReportPublicationMutation>(ReportPublicationDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ReportPublication',
        'mutation',
      );
    },
    LegacyCollectPublication(
      variables: LegacyCollectPublicationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: LegacyCollectPublicationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LegacyCollectPublicationMutation>(
            LegacyCollectPublicationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'LegacyCollectPublication',
        'mutation',
      );
    },
    CreateLegacyCollectTypedData(
      variables: CreateLegacyCollectTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateLegacyCollectTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateLegacyCollectTypedDataMutation>(
            CreateLegacyCollectTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateLegacyCollectTypedData',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
