// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  PostFragment,
  QuoteFragment,
  PaginatedResultInfoFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  Eip712TypedDataDomainFragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  Eip712TypedDataFieldFragment,
  CreateMomokaPublicationResultFragment,
  RelayErrorFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PostFragmentDoc,
  QuoteFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  ProfileFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
  Eip712TypedDataFieldFragmentDoc,
  CreateMomokaPublicationResultFragmentDoc,
  RelayErrorFragmentDoc,
} from '../../../graphql/fragments.generated';
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

export type CreateOnChainPostBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { PostWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateOnChainCommentBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { CommentWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateOnChainMirrorEip712TypedDataValueFragment = {
  nonce: string;
  deadline: string;
  profileId: string;
  pointedProfileId: string;
  pointedPubId: string;
  referrerProfileIds: Array<string>;
  referrerPubIds: Array<string>;
  referenceModuleData: string;
};

export type CreateOnChainMirrorEip712TypedDataTypesFragment = {
  MirrorWithSig: Array<Eip712TypedDataFieldFragment>;
};

export type CreateOnChainMirrorEip712TypedDataFragment = {
  types: CreateOnChainMirrorEip712TypedDataTypesFragment;
  domain: Eip712TypedDataDomainFragment;
  value: CreateOnChainMirrorEip712TypedDataValueFragment;
};

export type CreateOnChainMirrorBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { MirrorWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateOnChainQuoteEip712TypedDataValueFragment = {
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

export type CreateOnChainQuoteEip712TypedDataTypesFragment = {
  QuoteWithSig: Array<Eip712TypedDataFieldFragment>;
};

export type CreateOnChainQuoteEip712TypedDataTypesFragment = {
  QuoteWithSig: Array<Eip712TypedDataFieldFragment>;
};

export type CreateOnChainQuoteEip712TypedDataFragment = {
  types: CreateOnChainQuoteEip712TypedDataTypesFragment;
  domain: Eip712TypedDataDomainFragment;
  value: CreateOnChainQuoteEip712TypedDataValueFragment;
};

export type CreateOnChainQuoteBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: CreateOnChainQuoteEip712TypedDataFragment;
};

export type CreateMomokaPostBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { PostWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateMomokaCommentBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { CommentWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateMomokaMirrorBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { MirrorWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateMomokaQuoteBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { QuoteWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateLegacyCollectPublicationEip712TypedDataFragment = {
  types: { ActWithSig: Array<{ name: string; type: string }> };
  domain: Eip712TypedDataDomainFragment;
  value: { nonce: string; deadline: string };
};

export type CreateOnChainPostTypedDataMutationVariables = Types.Exact<{
  request: Types.OnChainPostRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnChainPostTypedDataMutation = {
  result: CreateOnChainPostBroadcastItemResultFragment;
};

export type CreateOnChainCommentTypedDataMutationVariables = Types.Exact<{
  request: Types.OnChainCommentRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnChainCommentTypedDataMutation = {
  result: CreateOnChainCommentBroadcastItemResultFragment;
};

export type CreateOnChainMirrorTypedDataMutationVariables = Types.Exact<{
  request: Types.OnChainMirrorRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnChainMirrorTypedDataMutation = {
  result: CreateOnChainMirrorBroadcastItemResultFragment;
};

export type CreateOnChainQuoteTypedDataMutationVariables = Types.Exact<{
  request: Types.OnChainQuoteRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnChainQuoteTypedDataMutation = {
  result: CreateOnChainQuoteBroadcastItemResultFragment;
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

export type PostOnChainMutationVariables = Types.Exact<{
  request: Types.OnChainPostRequest;
}>;

export type PostOnChainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type CommentOnChainMutationVariables = Types.Exact<{
  request: Types.OnChainCommentRequest;
}>;

export type CommentOnChainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type MirrorOnChainMutationVariables = Types.Exact<{
  request: Types.OnChainMirrorRequest;
}>;

export type MirrorOnChainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type QuoteOnChainMutationVariables = Types.Exact<{
  request: Types.OnChainQuoteRequest;
}>;

export type QuoteOnChainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type PostOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaPostRequest;
}>;

export type PostOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | RelayErrorFragment;
};

export type CommentOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaCommentRequest;
}>;

export type CommentOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | RelayErrorFragment;
};

export type MirrorOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaMirrorRequest;
}>;

export type MirrorOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | RelayErrorFragment;
};

export type QuoteOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaQuoteRequest;
}>;

export type QuoteOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | RelayErrorFragment;
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
  request: Types.LegacyCollectPublicationRequest;
}>;

export type LegacyCollectPublicationMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type CreateLegacyCollectPublicationTypedDataMutationVariables = Types.Exact<{
  request: Types.LegacyCollectPublicationRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateLegacyCollectPublicationTypedDataMutation = {
  result: CreateLegacyCollectPublicationEip712TypedDataFragment;
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
export const CreateOnChainPostBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnChainPostBroadcastItemResult on CreateOnChainPostBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        PostWithSig {
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
export const CreateOnChainCommentBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnChainCommentBroadcastItemResult on CreateOnChainCommentBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        CommentWithSig {
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
export const CreateOnChainMirrorEip712TypedDataTypesFragmentDoc = gql`
  fragment CreateOnChainMirrorEIP712TypedDataTypes on CreateOnChainMirrorEIP712TypedDataTypes {
    MirrorWithSig {
      ...EIP712TypedDataField
    }
  }
  ${Eip712TypedDataFieldFragmentDoc}
`;
export const CreateOnChainMirrorEip712TypedDataValueFragmentDoc = gql`
  fragment CreateOnChainMirrorEIP712TypedDataValue on CreateOnChainMirrorEIP712TypedDataValue {
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
export const CreateOnChainMirrorEip712TypedDataFragmentDoc = gql`
  fragment CreateOnChainMirrorEIP712TypedData on CreateOnChainMirrorEIP712TypedData {
    types {
      ...CreateOnChainMirrorEIP712TypedDataTypes
    }
    domain {
      ...EIP712TypedDataDomain
    }
    value {
      ...CreateOnChainMirrorEIP712TypedDataValue
    }
  }
  ${CreateOnChainMirrorEip712TypedDataTypesFragmentDoc}
  ${Eip712TypedDataDomainFragmentDoc}
  ${CreateOnChainMirrorEip712TypedDataValueFragmentDoc}
`;
export const CreateOnChainMirrorBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnChainMirrorBroadcastItemResult on CreateOnChainMirrorBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        MirrorWithSig {
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
export const CreateOnChainQuoteEip712TypedDataTypesFragmentDoc = gql`
  fragment CreateOnChainQuoteEIP712TypedDataTypes on CreateOnChainQuoteEIP712TypedDataTypes {
    QuoteWithSig {
      ...EIP712TypedDataField
    }
  }
  ${Eip712TypedDataFieldFragmentDoc}
`;
export const CreateOnChainQuoteEip712TypedDataValueFragmentDoc = gql`
  fragment CreateOnChainQuoteEIP712TypedDataValue on CreateOnChainQuoteEIP712TypedDataValue {
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
export const CreateOnChainQuoteEip712TypedDataFragmentDoc = gql`
  fragment CreateOnChainQuoteEIP712TypedData on CreateOnChainQuoteEIP712TypedData {
    types {
      ...CreateOnChainQuoteEIP712TypedDataTypes
    }
    domain {
      ...EIP712TypedDataDomain
    }
    value {
      ...CreateOnChainQuoteEIP712TypedDataValue
    }
  }
  ${CreateOnChainQuoteEip712TypedDataTypesFragmentDoc}
  ${Eip712TypedDataDomainFragmentDoc}
  ${CreateOnChainQuoteEip712TypedDataValueFragmentDoc}
`;
export const CreateOnChainQuoteBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnChainQuoteBroadcastItemResult on CreateOnChainQuoteBroadcastItemResult {
    id
    expiresAt
    typedData {
      ...CreateOnChainQuoteEIP712TypedData
    }
  }
  ${CreateOnChainQuoteEip712TypedDataFragmentDoc}
`;
export const CreateMomokaPostBroadcastItemResultFragmentDoc = gql`
  fragment CreateMomokaPostBroadcastItemResult on CreateMomokaPostBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        PostWithSig {
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
        CommentWithSig {
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
        MirrorWithSig {
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
        QuoteWithSig {
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
export const CreateLegacyCollectPublicationEip712TypedDataFragmentDoc = gql`
  fragment CreateLegacyCollectPublicationEIP712TypedData on CreateLegacyCollectPublicationEIP712TypedData {
    types {
      ActWithSig {
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
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const PublicationDocument = gql`
  query Publication(
    $request: PublicationRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
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
export const CreateOnChainPostTypedDataDocument = gql`
  mutation CreateOnChainPostTypedData($request: OnChainPostRequest!, $options: TypedDataOptions) {
    result: createOnChainPostTypedData(request: $request, options: $options) {
      ...CreateOnChainPostBroadcastItemResult
    }
  }
  ${CreateOnChainPostBroadcastItemResultFragmentDoc}
`;
export const CreateOnChainCommentTypedDataDocument = gql`
  mutation CreateOnChainCommentTypedData(
    $request: OnChainCommentRequest!
    $options: TypedDataOptions
  ) {
    result: createOnChainCommentTypedData(request: $request, options: $options) {
      ...CreateOnChainCommentBroadcastItemResult
    }
  }
  ${CreateOnChainCommentBroadcastItemResultFragmentDoc}
`;
export const CreateOnChainMirrorTypedDataDocument = gql`
  mutation CreateOnChainMirrorTypedData(
    $request: OnChainMirrorRequest!
    $options: TypedDataOptions
  ) {
    result: createOnChainMirrorTypedData(request: $request, options: $options) {
      ...CreateOnChainMirrorBroadcastItemResult
    }
  }
  ${CreateOnChainMirrorBroadcastItemResultFragmentDoc}
`;
export const CreateOnChainQuoteTypedDataDocument = gql`
  mutation CreateOnChainQuoteTypedData($request: OnChainQuoteRequest!, $options: TypedDataOptions) {
    result: createOnChainQuoteTypedData(request: $request, options: $options) {
      ...CreateOnChainQuoteBroadcastItemResult
    }
  }
  ${CreateOnChainQuoteBroadcastItemResultFragmentDoc}
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
export const PostOnChainDocument = gql`
  mutation PostOnChain($request: OnChainPostRequest!) {
    result: postOnChain(request: $request) {
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
export const CommentOnChainDocument = gql`
  mutation CommentOnChain($request: OnChainCommentRequest!) {
    result: commentOnChain(request: $request) {
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
export const MirrorOnChainDocument = gql`
  mutation MirrorOnChain($request: OnChainMirrorRequest!) {
    result: mirrorOnChain(request: $request) {
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
export const QuoteOnChainDocument = gql`
  mutation QuoteOnChain($request: OnChainQuoteRequest!) {
    result: quoteOnChain(request: $request) {
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
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const CommentOnMomokaDocument = gql`
  mutation CommentOnMomoka($request: MomokaCommentRequest!) {
    result: commentOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const MirrorOnMomokaDocument = gql`
  mutation MirrorOnMomoka($request: MomokaMirrorRequest!) {
    result: mirrorOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const QuoteOnMomokaDocument = gql`
  mutation QuoteOnMomoka($request: MomokaQuoteRequest!) {
    result: quoteOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${RelayErrorFragmentDoc}
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
  mutation LegacyCollectPublication($request: LegacyCollectPublicationRequest!) {
    result: legacyCollectPublication(request: $request) {
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
export const CreateLegacyCollectPublicationTypedDataDocument = gql`
  mutation CreateLegacyCollectPublicationTypedData(
    $request: LegacyCollectPublicationRequest!
    $options: TypedDataOptions
  ) {
    result: createLegacyCollectPublicationTypedData(request: $request, options: $options) {
      ...CreateLegacyCollectPublicationEIP712TypedData
    }
  }
  ${CreateLegacyCollectPublicationEip712TypedDataFragmentDoc}
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
const CreateOnChainPostTypedDataDocumentString = print(CreateOnChainPostTypedDataDocument);
const CreateOnChainCommentTypedDataDocumentString = print(CreateOnChainCommentTypedDataDocument);
const CreateOnChainMirrorTypedDataDocumentString = print(CreateOnChainMirrorTypedDataDocument);
const CreateOnChainQuoteTypedDataDocumentString = print(CreateOnChainQuoteTypedDataDocument);
const CreateMomokaPostTypedDataDocumentString = print(CreateMomokaPostTypedDataDocument);
const CreateMomokaCommentTypedDataDocumentString = print(CreateMomokaCommentTypedDataDocument);
const CreateMomokaMirrorTypedDataDocumentString = print(CreateMomokaMirrorTypedDataDocument);
const CreateMomokaQuoteTypedDataDocumentString = print(CreateMomokaQuoteTypedDataDocument);
const PostOnChainDocumentString = print(PostOnChainDocument);
const CommentOnChainDocumentString = print(CommentOnChainDocument);
const MirrorOnChainDocumentString = print(MirrorOnChainDocument);
const QuoteOnChainDocumentString = print(QuoteOnChainDocument);
const PostOnMomokaDocumentString = print(PostOnMomokaDocument);
const CommentOnMomokaDocumentString = print(CommentOnMomokaDocument);
const MirrorOnMomokaDocumentString = print(MirrorOnMomokaDocument);
const QuoteOnMomokaDocumentString = print(QuoteOnMomokaDocument);
const HidePublicationDocumentString = print(HidePublicationDocument);
const ReportPublicationDocumentString = print(ReportPublicationDocument);
const LegacyCollectPublicationDocumentString = print(LegacyCollectPublicationDocument);
const CreateLegacyCollectPublicationTypedDataDocumentString = print(
  CreateLegacyCollectPublicationTypedDataDocument,
);
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
    CreateOnChainPostTypedData(
      variables: CreateOnChainPostTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnChainPostTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnChainPostTypedDataMutation>(
            CreateOnChainPostTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnChainPostTypedData',
        'mutation',
      );
    },
    CreateOnChainCommentTypedData(
      variables: CreateOnChainCommentTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnChainCommentTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnChainCommentTypedDataMutation>(
            CreateOnChainCommentTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnChainCommentTypedData',
        'mutation',
      );
    },
    CreateOnChainMirrorTypedData(
      variables: CreateOnChainMirrorTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnChainMirrorTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnChainMirrorTypedDataMutation>(
            CreateOnChainMirrorTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnChainMirrorTypedData',
        'mutation',
      );
    },
    CreateOnChainQuoteTypedData(
      variables: CreateOnChainQuoteTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnChainQuoteTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnChainQuoteTypedDataMutation>(
            CreateOnChainQuoteTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnChainQuoteTypedData',
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
    PostOnChain(
      variables: PostOnChainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: PostOnChainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PostOnChainMutation>(PostOnChainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PostOnChain',
        'mutation',
      );
    },
    CommentOnChain(
      variables: CommentOnChainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CommentOnChainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CommentOnChainMutation>(CommentOnChainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CommentOnChain',
        'mutation',
      );
    },
    MirrorOnChain(
      variables: MirrorOnChainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: MirrorOnChainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MirrorOnChainMutation>(MirrorOnChainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MirrorOnChain',
        'mutation',
      );
    },
    QuoteOnChain(
      variables: QuoteOnChainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: QuoteOnChainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<QuoteOnChainMutation>(QuoteOnChainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'QuoteOnChain',
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
    CreateLegacyCollectPublicationTypedData(
      variables: CreateLegacyCollectPublicationTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateLegacyCollectPublicationTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateLegacyCollectPublicationTypedDataMutation>(
            CreateLegacyCollectPublicationTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateLegacyCollectPublicationTypedData',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
