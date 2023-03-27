/** Code generated. DO NOT EDIT. */
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-imports */
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import gql from 'graphql-tag';

import * as Operations from './operations';
const defaultOptions = {} as const;
export const FragmentPublicationStats = /*#__PURE__*/ gql`
  fragment PublicationStats on PublicationStats {
    __typename
    totalAmountOfMirrors
    totalUpvotes
    totalDownvotes
    totalAmountOfCollects
    totalAmountOfComments
    commentsCount: commentsTotal(forSources: $sources)
  }
`;
export const FragmentMedia = /*#__PURE__*/ gql`
  fragment Media on Media {
    __typename
    altTag
    cover
    mimeType
    url
  }
`;
export const FragmentMediaSet = /*#__PURE__*/ gql`
  fragment MediaSet on MediaSet {
    __typename
    original {
      ...Media
    }
  }
  ${FragmentMedia}
`;
export const FragmentMetadataAttributeOutput = /*#__PURE__*/ gql`
  fragment MetadataAttributeOutput on MetadataAttributeOutput {
    __typename
    traitType
    value
  }
`;
export const FragmentNftOwnershipOutput = /*#__PURE__*/ gql`
  fragment NftOwnershipOutput on NftOwnershipOutput {
    __typename
    contractAddress
    chainID
    contractType
    tokenIds
  }
`;
export const FragmentErc20OwnershipOutput = /*#__PURE__*/ gql`
  fragment Erc20OwnershipOutput on Erc20OwnershipOutput {
    __typename
    amount
    chainID
    condition
    contractAddress
    decimals
    name
    symbol
  }
`;
export const FragmentEoaOwnershipOutput = /*#__PURE__*/ gql`
  fragment EoaOwnershipOutput on EoaOwnershipOutput {
    __typename
    address
  }
`;
export const FragmentProfileOwnershipOutput = /*#__PURE__*/ gql`
  fragment ProfileOwnershipOutput on ProfileOwnershipOutput {
    __typename
    profileId
  }
`;
export const FragmentFollowConditionOutput = /*#__PURE__*/ gql`
  fragment FollowConditionOutput on FollowConditionOutput {
    __typename
    profileId
  }
`;
export const FragmentCollectConditionOutput = /*#__PURE__*/ gql`
  fragment CollectConditionOutput on CollectConditionOutput {
    __typename
    publicationId
    thisPublication
  }
`;
export const FragmentLeafConditionOutput = /*#__PURE__*/ gql`
  fragment LeafConditionOutput on AccessConditionOutput {
    __typename
    nft {
      ...NftOwnershipOutput
    }
    token {
      ...Erc20OwnershipOutput
    }
    eoa {
      ...EoaOwnershipOutput
    }
    profile {
      ...ProfileOwnershipOutput
    }
    follow {
      ...FollowConditionOutput
    }
    collect {
      ...CollectConditionOutput
    }
  }
  ${FragmentNftOwnershipOutput}
  ${FragmentErc20OwnershipOutput}
  ${FragmentEoaOwnershipOutput}
  ${FragmentProfileOwnershipOutput}
  ${FragmentFollowConditionOutput}
  ${FragmentCollectConditionOutput}
`;
export const FragmentOrConditionOutput = /*#__PURE__*/ gql`
  fragment OrConditionOutput on OrConditionOutput {
    __typename
    criteria {
      ...LeafConditionOutput
    }
  }
  ${FragmentLeafConditionOutput}
`;
export const FragmentAndConditionOutput = /*#__PURE__*/ gql`
  fragment AndConditionOutput on AndConditionOutput {
    __typename
    criteria {
      ...LeafConditionOutput
    }
  }
  ${FragmentLeafConditionOutput}
`;
export const FragmentAnyConditionOutput = /*#__PURE__*/ gql`
  fragment AnyConditionOutput on AccessConditionOutput {
    __typename
    ...LeafConditionOutput
    or {
      ...OrConditionOutput
    }
    and {
      ...AndConditionOutput
    }
  }
  ${FragmentLeafConditionOutput}
  ${FragmentOrConditionOutput}
  ${FragmentAndConditionOutput}
`;
export const FragmentRootConditionOutput = /*#__PURE__*/ gql`
  fragment RootConditionOutput on AccessConditionOutput {
    __typename
    or {
      criteria {
        ...AnyConditionOutput
      }
    }
  }
  ${FragmentAnyConditionOutput}
`;
export const FragmentEncryptedMedia = /*#__PURE__*/ gql`
  fragment EncryptedMedia on EncryptedMedia {
    __typename
    altTag
    cover
    mimeType
    url
  }
`;
export const FragmentEncryptedFieldsOutput = /*#__PURE__*/ gql`
  fragment EncryptedFieldsOutput on EncryptedFieldsOutput {
    __typename
    animation_url
    content
    external_url
    image
    media {
      original {
        ...EncryptedMedia
      }
    }
  }
  ${FragmentEncryptedMedia}
`;
export const FragmentEncryptionParamsOutput = /*#__PURE__*/ gql`
  fragment EncryptionParamsOutput on EncryptionParamsOutput {
    __typename
    accessCondition {
      ...RootConditionOutput
    }
    encryptionProvider
    encryptedFields {
      ...EncryptedFieldsOutput
    }
    providerSpecificParams {
      encryptionKey
    }
  }
  ${FragmentRootConditionOutput}
  ${FragmentEncryptedFieldsOutput}
`;
export const FragmentMetadataOutput = /*#__PURE__*/ gql`
  fragment MetadataOutput on MetadataOutput {
    __typename
    animatedUrl
    name
    description
    mainContentFocus
    content
    image
    media {
      ...MediaSet
    }
    attributes {
      ...MetadataAttributeOutput
    }
    encryptionParams {
      ...EncryptionParamsOutput
    }
  }
  ${FragmentMediaSet}
  ${FragmentMetadataAttributeOutput}
  ${FragmentEncryptionParamsOutput}
`;
export const FragmentNftImage = /*#__PURE__*/ gql`
  fragment NftImage on NftImage {
    __typename
    contractAddress
    tokenId
    uri
    verified
  }
`;
export const FragmentProfileStats = /*#__PURE__*/ gql`
  fragment ProfileStats on ProfileStats {
    __typename
    totalCollects
    totalComments
    totalFollowers
    totalFollowing
    totalMirrors
    totalPosts
    totalPublications
    commentsCount: commentsTotal(forSources: $sources)
    postsCount: postsTotal(forSources: $sources)
    mirrorsCount: mirrorsTotal(forSources: $sources)
  }
`;
export const FragmentErc20Fields = /*#__PURE__*/ gql`
  fragment Erc20Fields on Erc20 {
    __typename
    name
    symbol
    decimals
    address
  }
`;
export const FragmentModuleFeeAmount = /*#__PURE__*/ gql`
  fragment ModuleFeeAmount on ModuleFeeAmount {
    __typename
    asset {
      ...Erc20Fields
    }
    value
  }
  ${FragmentErc20Fields}
`;
export const FragmentFeeFollowModuleSettings = /*#__PURE__*/ gql`
  fragment FeeFollowModuleSettings on FeeFollowModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    contractAddress
    recipient
  }
  ${FragmentModuleFeeAmount}
`;
export const FragmentProfileFollowModuleSettings = /*#__PURE__*/ gql`
  fragment ProfileFollowModuleSettings on ProfileFollowModuleSettings {
    __typename
    contractAddress
  }
`;
export const FragmentRevertFollowModuleSettings = /*#__PURE__*/ gql`
  fragment RevertFollowModuleSettings on RevertFollowModuleSettings {
    __typename
    contractAddress
  }
`;
export const FragmentUnknownFollowModuleSettings = /*#__PURE__*/ gql`
  fragment UnknownFollowModuleSettings on UnknownFollowModuleSettings {
    __typename
    contractAddress
  }
`;
export const FragmentAttribute = /*#__PURE__*/ gql`
  fragment Attribute on Attribute {
    __typename
    displayType
    key
    value
  }
`;
export const FragmentProfile = /*#__PURE__*/ gql`
  fragment Profile on Profile {
    __typename
    id
    name
    bio
    handle
    ownedBy
    picture {
      ... on NftImage {
        ...NftImage
      }
      ... on MediaSet {
        ...MediaSet
      }
    }
    coverPicture {
      ... on NftImage {
        ...NftImage
      }
      ... on MediaSet {
        ...MediaSet
      }
    }
    stats {
      ...ProfileStats
    }
    followModule {
      ... on FeeFollowModuleSettings {
        ...FeeFollowModuleSettings
      }
      ... on ProfileFollowModuleSettings {
        ...ProfileFollowModuleSettings
      }
      ... on RevertFollowModuleSettings {
        ...RevertFollowModuleSettings
      }
      ... on UnknownFollowModuleSettings {
        ...UnknownFollowModuleSettings
      }
    }
    followPolicy @client
    __attributes: attributes {
      ...Attribute
    }
    attributes: attributesMap @client
    dispatcher {
      address
      canUseRelay
    }
    onChainIdentity {
      proofOfHumanity
      ens {
        name
      }
      sybilDotOrg {
        verified
        source {
          twitter {
            handle
          }
        }
      }
      worldcoin {
        isHuman
      }
    }
    isFollowedByMe
    isFollowingObserver: isFollowing(who: $observerId)
    followStatus @client
    ownedByMe @client
  }
  ${FragmentNftImage}
  ${FragmentMediaSet}
  ${FragmentProfileStats}
  ${FragmentFeeFollowModuleSettings}
  ${FragmentProfileFollowModuleSettings}
  ${FragmentRevertFollowModuleSettings}
  ${FragmentUnknownFollowModuleSettings}
  ${FragmentAttribute}
`;
export const FragmentWallet = /*#__PURE__*/ gql`
  fragment Wallet on Wallet {
    __typename
    address
    defaultProfile {
      ...Profile
    }
  }
  ${FragmentProfile}
`;
export const FragmentAaveFeeCollectModuleSettings = /*#__PURE__*/ gql`
  fragment AaveFeeCollectModuleSettings on AaveFeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    collectLimitOptional: collectLimit
    contractAddress
    followerOnly
    endTimestampOptional: endTimestamp
    recipient
    referralFee
  }
  ${FragmentModuleFeeAmount}
`;
export const FragmentErc4626FeeCollectModuleSettings = /*#__PURE__*/ gql`
  fragment Erc4626FeeCollectModuleSettings on ERC4626FeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    collectLimitOptional: collectLimit
    contractAddress
    followerOnly
    endTimestampOptional: endTimestamp
    recipient
    referralFee
    vault
  }
  ${FragmentModuleFeeAmount}
`;
export const FragmentMultirecipientFeeCollectModuleSettings = /*#__PURE__*/ gql`
  fragment MultirecipientFeeCollectModuleSettings on MultirecipientFeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    collectLimitOptional: collectLimit
    contractAddress
    followerOnly
    endTimestampOptional: endTimestamp
    recipients {
      recipient
      split
    }
    referralFee
  }
  ${FragmentModuleFeeAmount}
`;
export const FragmentUnknownCollectModuleSettings = /*#__PURE__*/ gql`
  fragment UnknownCollectModuleSettings on UnknownCollectModuleSettings {
    __typename
  }
`;
export const FragmentFreeCollectModuleSettings = /*#__PURE__*/ gql`
  fragment FreeCollectModuleSettings on FreeCollectModuleSettings {
    __typename
    contractAddress
    followerOnly
  }
`;
export const FragmentFeeCollectModuleSettings = /*#__PURE__*/ gql`
  fragment FeeCollectModuleSettings on FeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    contractAddress
    followerOnly
    recipient
    referralFee
  }
  ${FragmentModuleFeeAmount}
`;
export const FragmentLimitedFeeCollectModuleSettings = /*#__PURE__*/ gql`
  fragment LimitedFeeCollectModuleSettings on LimitedFeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    collectLimit
    contractAddress
    followerOnly
    recipient
    referralFee
  }
  ${FragmentModuleFeeAmount}
`;
export const FragmentLimitedTimedFeeCollectModuleSettings = /*#__PURE__*/ gql`
  fragment LimitedTimedFeeCollectModuleSettings on LimitedTimedFeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    collectLimit
    contractAddress
    followerOnly
    endTimestamp
    recipient
    referralFee
  }
  ${FragmentModuleFeeAmount}
`;
export const FragmentRevertCollectModuleSettings = /*#__PURE__*/ gql`
  fragment RevertCollectModuleSettings on RevertCollectModuleSettings {
    __typename
    contractAddress
  }
`;
export const FragmentTimedFeeCollectModuleSettings = /*#__PURE__*/ gql`
  fragment TimedFeeCollectModuleSettings on TimedFeeCollectModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    contractAddress
    followerOnly
    endTimestamp
    recipient
    referralFee
  }
  ${FragmentModuleFeeAmount}
`;
export const FragmentFollowOnlyReferenceModuleSettings = /*#__PURE__*/ gql`
  fragment FollowOnlyReferenceModuleSettings on FollowOnlyReferenceModuleSettings {
    __typename
    contractAddress
  }
`;
export const FragmentDegreesOfSeparationReferenceModuleSettings = /*#__PURE__*/ gql`
  fragment DegreesOfSeparationReferenceModuleSettings on DegreesOfSeparationReferenceModuleSettings {
    __typename
    contractAddress
    commentsRestricted
    degreesOfSeparation
    mirrorsRestricted
  }
`;
export const FragmentUnknownReferenceModuleSettings = /*#__PURE__*/ gql`
  fragment UnknownReferenceModuleSettings on UnknownReferenceModuleSettings {
    __typename
    contractAddress
    referenceModuleReturnData
  }
`;
export const FragmentCommentBase = /*#__PURE__*/ gql`
  fragment CommentBase on Comment {
    __typename
    id
    stats {
      ...PublicationStats
    }
    metadata {
      ...MetadataOutput
    }
    profile {
      ...Profile
    }
    collectedBy {
      ...Wallet
    }
    collectModule {
      ... on AaveFeeCollectModuleSettings {
        ...AaveFeeCollectModuleSettings
      }
      ... on ERC4626FeeCollectModuleSettings {
        ...Erc4626FeeCollectModuleSettings
      }
      ... on MultirecipientFeeCollectModuleSettings {
        ...MultirecipientFeeCollectModuleSettings
      }
      ... on UnknownCollectModuleSettings {
        ...UnknownCollectModuleSettings
      }
      ... on FreeCollectModuleSettings {
        ...FreeCollectModuleSettings
      }
      ... on FeeCollectModuleSettings {
        ...FeeCollectModuleSettings
      }
      ... on LimitedFeeCollectModuleSettings {
        ...LimitedFeeCollectModuleSettings
      }
      ... on LimitedTimedFeeCollectModuleSettings {
        ...LimitedTimedFeeCollectModuleSettings
      }
      ... on RevertCollectModuleSettings {
        ...RevertCollectModuleSettings
      }
      ... on TimedFeeCollectModuleSettings {
        ...TimedFeeCollectModuleSettings
      }
    }
    collectNftAddress
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        ...FollowOnlyReferenceModuleSettings
      }
      ... on DegreesOfSeparationReferenceModuleSettings {
        ...DegreesOfSeparationReferenceModuleSettings
      }
      ... on UnknownReferenceModuleSettings {
        ...UnknownReferenceModuleSettings
      }
    }
    createdAt
    hidden
    isGated
    reaction(request: { profileId: $observerId })
    hasCollectedByMe(isFinalisedOnChain: true)
    canComment(profileId: $observerId) {
      result
    }
    canMirror(profileId: $observerId) {
      result
    }
    canObserverDecrypt: canDecrypt(profileId: $observerId) {
      result
      reasons
    }
    mirrors(by: $observerId)
    hasOptimisticCollectedByMe @client
    isOptimisticMirroredByMe @client
    collectPolicy @client
    referencePolicy @client
    decryptionCriteria @client
  }
  ${FragmentPublicationStats}
  ${FragmentMetadataOutput}
  ${FragmentProfile}
  ${FragmentWallet}
  ${FragmentAaveFeeCollectModuleSettings}
  ${FragmentErc4626FeeCollectModuleSettings}
  ${FragmentMultirecipientFeeCollectModuleSettings}
  ${FragmentUnknownCollectModuleSettings}
  ${FragmentFreeCollectModuleSettings}
  ${FragmentFeeCollectModuleSettings}
  ${FragmentLimitedFeeCollectModuleSettings}
  ${FragmentLimitedTimedFeeCollectModuleSettings}
  ${FragmentRevertCollectModuleSettings}
  ${FragmentTimedFeeCollectModuleSettings}
  ${FragmentFollowOnlyReferenceModuleSettings}
  ${FragmentDegreesOfSeparationReferenceModuleSettings}
  ${FragmentUnknownReferenceModuleSettings}
`;
export const FragmentPost = /*#__PURE__*/ gql`
  fragment Post on Post {
    __typename
    id
    stats {
      ...PublicationStats
    }
    metadata {
      ...MetadataOutput
    }
    profile {
      ...Profile
    }
    collectedBy {
      ...Wallet
    }
    collectModule {
      ... on AaveFeeCollectModuleSettings {
        ...AaveFeeCollectModuleSettings
      }
      ... on ERC4626FeeCollectModuleSettings {
        ...Erc4626FeeCollectModuleSettings
      }
      ... on MultirecipientFeeCollectModuleSettings {
        ...MultirecipientFeeCollectModuleSettings
      }
      ... on UnknownCollectModuleSettings {
        ...UnknownCollectModuleSettings
      }
      ... on FreeCollectModuleSettings {
        ...FreeCollectModuleSettings
      }
      ... on FeeCollectModuleSettings {
        ...FeeCollectModuleSettings
      }
      ... on LimitedFeeCollectModuleSettings {
        ...LimitedFeeCollectModuleSettings
      }
      ... on LimitedTimedFeeCollectModuleSettings {
        ...LimitedTimedFeeCollectModuleSettings
      }
      ... on RevertCollectModuleSettings {
        ...RevertCollectModuleSettings
      }
      ... on TimedFeeCollectModuleSettings {
        ...TimedFeeCollectModuleSettings
      }
    }
    collectNftAddress
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        ...FollowOnlyReferenceModuleSettings
      }
      ... on DegreesOfSeparationReferenceModuleSettings {
        ...DegreesOfSeparationReferenceModuleSettings
      }
      ... on UnknownReferenceModuleSettings {
        ...UnknownReferenceModuleSettings
      }
    }
    createdAt
    hidden
    isGated
    reaction(request: { profileId: $observerId })
    hasCollectedByMe(isFinalisedOnChain: true)
    canComment(profileId: $observerId) {
      result
    }
    canMirror(profileId: $observerId) {
      result
    }
    mirrors(by: $observerId)
    canObserverDecrypt: canDecrypt(profileId: $observerId) {
      result
      reasons
    }
    hasOptimisticCollectedByMe @client
    isOptimisticMirroredByMe @client
    collectPolicy @client
    referencePolicy @client
    decryptionCriteria @client
  }
  ${FragmentPublicationStats}
  ${FragmentMetadataOutput}
  ${FragmentProfile}
  ${FragmentWallet}
  ${FragmentAaveFeeCollectModuleSettings}
  ${FragmentErc4626FeeCollectModuleSettings}
  ${FragmentMultirecipientFeeCollectModuleSettings}
  ${FragmentUnknownCollectModuleSettings}
  ${FragmentFreeCollectModuleSettings}
  ${FragmentFeeCollectModuleSettings}
  ${FragmentLimitedFeeCollectModuleSettings}
  ${FragmentLimitedTimedFeeCollectModuleSettings}
  ${FragmentRevertCollectModuleSettings}
  ${FragmentTimedFeeCollectModuleSettings}
  ${FragmentFollowOnlyReferenceModuleSettings}
  ${FragmentDegreesOfSeparationReferenceModuleSettings}
  ${FragmentUnknownReferenceModuleSettings}
`;
export const FragmentMirrorBase = /*#__PURE__*/ gql`
  fragment MirrorBase on Mirror {
    __typename
    id
    createdAt
    profile {
      ...Profile
    }
    hidden
  }
  ${FragmentProfile}
`;
export const FragmentComment = /*#__PURE__*/ gql`
  fragment Comment on Comment {
    __typename
    ...CommentBase
    commentOn {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...MirrorBase
      }
      ... on Comment {
        ...CommentBase
      }
    }
    mainPost {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...MirrorBase
      }
    }
  }
  ${FragmentCommentBase}
  ${FragmentPost}
  ${FragmentMirrorBase}
`;
export const FragmentCommentWithFirstComment = /*#__PURE__*/ gql`
  fragment CommentWithFirstComment on Comment {
    __typename
    ...Comment
    firstComment {
      ...Comment
    }
  }
  ${FragmentComment}
`;
export const FragmentCommonPaginatedResultInfo = /*#__PURE__*/ gql`
  fragment CommonPaginatedResultInfo on PaginatedResultInfo {
    __typename
    prev
    next
    totalCount
  }
`;
export const FragmentPendingPost = /*#__PURE__*/ gql`
  fragment PendingPost on PendingPost {
    __typename
    id
    content
    media {
      ...Media
    }
    profile {
      ...Profile
    }
    locale
    mainContentFocus
  }
  ${FragmentMedia}
  ${FragmentProfile}
`;
export const FragmentEip712TypedDataDomain = /*#__PURE__*/ gql`
  fragment EIP712TypedDataDomain on EIP712TypedDataDomain {
    __typename
    name
    chainId
    version
    verifyingContract
  }
`;
export const FragmentElectedMirror = /*#__PURE__*/ gql`
  fragment ElectedMirror on ElectedMirror {
    __typename
    mirrorId
    profile {
      ...Profile
    }
    timestamp
  }
  ${FragmentProfile}
`;
export const FragmentMirrorEvent = /*#__PURE__*/ gql`
  fragment MirrorEvent on MirrorEvent {
    __typename
    profile {
      ...Profile
    }
    timestamp
  }
  ${FragmentProfile}
`;
export const FragmentCollectedEvent = /*#__PURE__*/ gql`
  fragment CollectedEvent on CollectedEvent {
    __typename
    profile {
      ...Profile
    }
    timestamp
  }
  ${FragmentProfile}
`;
export const FragmentReactionEvent = /*#__PURE__*/ gql`
  fragment ReactionEvent on ReactionEvent {
    __typename
    profile {
      ...Profile
    }
    reaction
    timestamp
  }
  ${FragmentProfile}
`;
export const FragmentFeedItem = /*#__PURE__*/ gql`
  fragment FeedItem on FeedItem {
    __typename
    root {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
    }
    comments {
      ...Comment
    }
    electedMirror {
      ...ElectedMirror
    }
    mirrors {
      ...MirrorEvent
    }
    collects {
      ...CollectedEvent
    }
    reactions {
      ...ReactionEvent
    }
  }
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentElectedMirror}
  ${FragmentMirrorEvent}
  ${FragmentCollectedEvent}
  ${FragmentReactionEvent}
`;
export const FragmentEncryptedMediaSet = /*#__PURE__*/ gql`
  fragment EncryptedMediaSet on EncryptedMediaSet {
    __typename
    original {
      ...EncryptedMedia
    }
  }
  ${FragmentEncryptedMedia}
`;
export const FragmentModuleInfo = /*#__PURE__*/ gql`
  fragment ModuleInfo on ModuleInfo {
    __typename
    name
    type
  }
`;
export const FragmentEnabledModule = /*#__PURE__*/ gql`
  fragment EnabledModule on EnabledModule {
    __typename
    moduleName
    contractAddress
    inputParams {
      ...ModuleInfo
    }
    redeemParams {
      ...ModuleInfo
    }
    returnDataParams: returnDataParms {
      ...ModuleInfo
    }
  }
  ${FragmentModuleInfo}
`;
export const FragmentEnabledModules = /*#__PURE__*/ gql`
  fragment EnabledModules on EnabledModules {
    __typename
    collectModules {
      ...EnabledModule
    }
    followModules {
      ...EnabledModule
    }
    referenceModules {
      ...EnabledModule
    }
  }
  ${FragmentEnabledModule}
`;
export const FragmentNewFollowerNotification = /*#__PURE__*/ gql`
  fragment NewFollowerNotification on NewFollowerNotification {
    __typename
    notificationId
    createdAt
    isFollowedByMe
    wallet {
      ...Wallet
    }
  }
  ${FragmentWallet}
`;
export const FragmentMirror = /*#__PURE__*/ gql`
  fragment Mirror on Mirror {
    __typename
    ...MirrorBase
    mirrorOf {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
    }
  }
  ${FragmentMirrorBase}
  ${FragmentPost}
  ${FragmentComment}
`;
export const FragmentNewCollectNotification = /*#__PURE__*/ gql`
  fragment NewCollectNotification on NewCollectNotification {
    __typename
    notificationId
    createdAt
    wallet {
      ...Wallet
    }
    collectedPublication {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...Mirror
      }
      ... on Comment {
        ...Comment
      }
    }
  }
  ${FragmentWallet}
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
`;
export const FragmentNewMirrorNotification = /*#__PURE__*/ gql`
  fragment NewMirrorNotification on NewMirrorNotification {
    __typename
    notificationId
    createdAt
    profile {
      ...Profile
    }
    publication {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
    }
  }
  ${FragmentProfile}
  ${FragmentPost}
  ${FragmentComment}
`;
export const FragmentNewCommentNotification = /*#__PURE__*/ gql`
  fragment NewCommentNotification on NewCommentNotification {
    __typename
    notificationId
    createdAt
    profile {
      ...Profile
    }
    comment {
      ...Comment
    }
  }
  ${FragmentProfile}
  ${FragmentComment}
`;
export const FragmentNewMentionNotification = /*#__PURE__*/ gql`
  fragment NewMentionNotification on NewMentionNotification {
    __typename
    notificationId
    createdAt
    mentionPublication {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
    }
  }
  ${FragmentPost}
  ${FragmentComment}
`;
export const FragmentNewReactionNotification = /*#__PURE__*/ gql`
  fragment NewReactionNotification on NewReactionNotification {
    __typename
    notificationId
    createdAt
    profile {
      ...Profile
    }
    reaction
    publication {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
      ... on Mirror {
        ...Mirror
      }
    }
  }
  ${FragmentProfile}
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentMirror}
`;
export const FragmentFollower = /*#__PURE__*/ gql`
  fragment Follower on Follower {
    __typename
    wallet {
      ...Wallet
    }
  }
  ${FragmentWallet}
`;
export const FragmentFollowing = /*#__PURE__*/ gql`
  fragment Following on Following {
    __typename
    profile {
      ...Profile
    }
  }
  ${FragmentProfile}
`;
export const FragmentProxyActionStatusResult = /*#__PURE__*/ gql`
  fragment ProxyActionStatusResult on ProxyActionStatusResult {
    __typename
    txHash
    txId
    status
  }
`;
export const FragmentProxyActionError = /*#__PURE__*/ gql`
  fragment ProxyActionError on ProxyActionError {
    __typename
    reason
    lastKnownTxId
  }
`;
export const FragmentProxyActionQueued = /*#__PURE__*/ gql`
  fragment ProxyActionQueued on ProxyActionQueued {
    __typename
    queuedAt
  }
`;
export const FragmentWhoReactedResult = /*#__PURE__*/ gql`
  fragment WhoReactedResult on WhoReactedResult {
    __typename
    reactionId
    reaction
    reactionAt
    profile {
      ...Profile
    }
  }
  ${FragmentProfile}
`;
export const FragmentErc20AmountFields = /*#__PURE__*/ gql`
  fragment Erc20AmountFields on Erc20Amount {
    __typename
    asset {
      ...Erc20Fields
    }
    value
  }
  ${FragmentErc20Fields}
`;
export const FragmentRevenueAggregate = /*#__PURE__*/ gql`
  fragment RevenueAggregate on RevenueAggregate {
    __typename
    __total: total {
      ...Erc20AmountFields
    }
    totalAmount @client
  }
  ${FragmentErc20AmountFields}
`;
export const FragmentPublicationRevenue = /*#__PURE__*/ gql`
  fragment PublicationRevenue on PublicationRevenue {
    __typename
    publication {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...Mirror
      }
      ... on Comment {
        ...Comment
      }
    }
    revenue {
      ...RevenueAggregate
    }
  }
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
  ${FragmentRevenueAggregate}
`;
export const FragmentProfileFollowRevenue = /*#__PURE__*/ gql`
  fragment ProfileFollowRevenue on FollowRevenueResult {
    __typename
    revenues {
      ...RevenueAggregate
    }
  }
  ${FragmentRevenueAggregate}
`;
export const FragmentRelayerResult = /*#__PURE__*/ gql`
  fragment RelayerResult on RelayerResult {
    __typename
    txHash
    txId
  }
`;
export const FragmentRelayError = /*#__PURE__*/ gql`
  fragment RelayError on RelayError {
    __typename
    reason
  }
`;
export const FragmentRelayResult = /*#__PURE__*/ gql`
  fragment RelayResult on RelayResult {
    ... on RelayerResult {
      ...RelayerResult
    }
    ... on RelayError {
      ...RelayError
    }
  }
  ${FragmentRelayerResult}
  ${FragmentRelayError}
`;
export const FragmentTransactionIndexedResult = /*#__PURE__*/ gql`
  fragment TransactionIndexedResult on TransactionIndexedResult {
    __typename
    indexed
    txHash
  }
`;
export const FragmentTransactionError = /*#__PURE__*/ gql`
  fragment TransactionError on TransactionError {
    __typename
    reason
  }
`;
export const AuthChallengeDocument = /*#__PURE__*/ gql`
  query AuthChallenge($address: EthereumAddress!) {
    result: challenge(request: { address: $address }) {
      text
    }
  }
`;

/**
 * __useAuthChallenge__
 *
 * To run a query within a React component, call `useAuthChallenge` and pass it any options that fit your needs.
 * When your component renders, `useAuthChallenge` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthChallenge({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useAuthChallenge(
  baseOptions: Apollo.QueryHookOptions<
    Operations.AuthChallengeData,
    Operations.AuthChallengeVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.AuthChallengeData, Operations.AuthChallengeVariables>(
    AuthChallengeDocument,
    options,
  );
}
export function useAuthChallengeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.AuthChallengeData,
    Operations.AuthChallengeVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.AuthChallengeData, Operations.AuthChallengeVariables>(
    AuthChallengeDocument,
    options,
  );
}
export type AuthChallengeHookResult = ReturnType<typeof useAuthChallenge>;
export type AuthChallengeLazyQueryHookResult = ReturnType<typeof useAuthChallengeLazyQuery>;
export type AuthChallengeQueryResult = Apollo.QueryResult<
  Operations.AuthChallengeData,
  Operations.AuthChallengeVariables
>;
export const AuthAuthenticateDocument = /*#__PURE__*/ gql`
  mutation AuthAuthenticate($address: EthereumAddress!, $signature: Signature!) {
    result: authenticate(request: { address: $address, signature: $signature }) {
      accessToken
      refreshToken
    }
  }
`;
export type AuthAuthenticateMutationFn = Apollo.MutationFunction<
  Operations.AuthAuthenticateData,
  Operations.AuthAuthenticateVariables
>;

/**
 * __useAuthAuthenticate__
 *
 * To run a mutation, you first call `useAuthAuthenticate` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthAuthenticate` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authAuthenticate, { data, loading, error }] = useAuthAuthenticate({
 *   variables: {
 *      address: // value for 'address'
 *      signature: // value for 'signature'
 *   },
 * });
 */
export function useAuthAuthenticate(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.AuthAuthenticateData,
    Operations.AuthAuthenticateVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Operations.AuthAuthenticateData, Operations.AuthAuthenticateVariables>(
    AuthAuthenticateDocument,
    options,
  );
}
export type AuthAuthenticateHookResult = ReturnType<typeof useAuthAuthenticate>;
export type AuthAuthenticateMutationResult = Apollo.MutationResult<Operations.AuthAuthenticateData>;
export type AuthAuthenticateMutationOptions = Apollo.BaseMutationOptions<
  Operations.AuthAuthenticateData,
  Operations.AuthAuthenticateVariables
>;
export const AuthRefreshDocument = /*#__PURE__*/ gql`
  mutation AuthRefresh($refreshToken: Jwt!) {
    result: refresh(request: { refreshToken: $refreshToken }) {
      accessToken
      refreshToken
    }
  }
`;
export type AuthRefreshMutationFn = Apollo.MutationFunction<
  Operations.AuthRefreshData,
  Operations.AuthRefreshVariables
>;

/**
 * __useAuthRefresh__
 *
 * To run a mutation, you first call `useAuthRefresh` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthRefresh` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authRefresh, { data, loading, error }] = useAuthRefresh({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useAuthRefresh(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.AuthRefreshData,
    Operations.AuthRefreshVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Operations.AuthRefreshData, Operations.AuthRefreshVariables>(
    AuthRefreshDocument,
    options,
  );
}
export type AuthRefreshHookResult = ReturnType<typeof useAuthRefresh>;
export type AuthRefreshMutationResult = Apollo.MutationResult<Operations.AuthRefreshData>;
export type AuthRefreshMutationOptions = Apollo.BaseMutationOptions<
  Operations.AuthRefreshData,
  Operations.AuthRefreshVariables
>;
export const CreateCollectTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateCollectTypedData($request: CreateCollectRequest!, $options: TypedDataOptions) {
    result: createCollectTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          CollectWithSig {
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
          pubId
          data
        }
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export type CreateCollectTypedDataMutationFn = Apollo.MutationFunction<
  Operations.CreateCollectTypedDataData,
  Operations.CreateCollectTypedDataVariables
>;

/**
 * __useCreateCollectTypedData__
 *
 * To run a mutation, you first call `useCreateCollectTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectTypedData, { data, loading, error }] = useCreateCollectTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateCollectTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateCollectTypedDataData,
    Operations.CreateCollectTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateCollectTypedDataData,
    Operations.CreateCollectTypedDataVariables
  >(CreateCollectTypedDataDocument, options);
}
export type CreateCollectTypedDataHookResult = ReturnType<typeof useCreateCollectTypedData>;
export type CreateCollectTypedDataMutationResult =
  Apollo.MutationResult<Operations.CreateCollectTypedDataData>;
export type CreateCollectTypedDataMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateCollectTypedDataData,
  Operations.CreateCollectTypedDataVariables
>;
export const CreateCommentTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateCommentTypedData(
    $request: CreatePublicCommentRequest!
    $options: TypedDataOptions
  ) {
    result: createCommentTypedData(request: $request, options: $options) {
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
          profileId
          contentURI
          profileIdPointed
          pubIdPointed
          collectModule
          collectModuleInitData
          referenceModuleData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export type CreateCommentTypedDataMutationFn = Apollo.MutationFunction<
  Operations.CreateCommentTypedDataData,
  Operations.CreateCommentTypedDataVariables
>;

/**
 * __useCreateCommentTypedData__
 *
 * To run a mutation, you first call `useCreateCommentTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentTypedData, { data, loading, error }] = useCreateCommentTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateCommentTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateCommentTypedDataData,
    Operations.CreateCommentTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateCommentTypedDataData,
    Operations.CreateCommentTypedDataVariables
  >(CreateCommentTypedDataDocument, options);
}
export type CreateCommentTypedDataHookResult = ReturnType<typeof useCreateCommentTypedData>;
export type CreateCommentTypedDataMutationResult =
  Apollo.MutationResult<Operations.CreateCommentTypedDataData>;
export type CreateCommentTypedDataMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateCommentTypedDataData,
  Operations.CreateCommentTypedDataVariables
>;
export const CreateCommentViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateCommentViaDispatcher($request: CreatePublicCommentRequest!) {
    result: createCommentViaDispatcher(request: $request) {
      ...RelayResult
    }
  }
  ${FragmentRelayResult}
`;
export type CreateCommentViaDispatcherMutationFn = Apollo.MutationFunction<
  Operations.CreateCommentViaDispatcherData,
  Operations.CreateCommentViaDispatcherVariables
>;

/**
 * __useCreateCommentViaDispatcher__
 *
 * To run a mutation, you first call `useCreateCommentViaDispatcher` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentViaDispatcher` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentViaDispatcher, { data, loading, error }] = useCreateCommentViaDispatcher({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateCommentViaDispatcher(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateCommentViaDispatcherData,
    Operations.CreateCommentViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateCommentViaDispatcherData,
    Operations.CreateCommentViaDispatcherVariables
  >(CreateCommentViaDispatcherDocument, options);
}
export type CreateCommentViaDispatcherHookResult = ReturnType<typeof useCreateCommentViaDispatcher>;
export type CreateCommentViaDispatcherMutationResult =
  Apollo.MutationResult<Operations.CreateCommentViaDispatcherData>;
export type CreateCommentViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateCommentViaDispatcherData,
  Operations.CreateCommentViaDispatcherVariables
>;
export const CommentsDocument = /*#__PURE__*/ gql`
  query Comments(
    $observerId: ProfileId
    $commentsOf: InternalPublicationId!
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
    $metadata: PublicationMetadataFilters
  ) {
    result: publications(
      request: {
        limit: $limit
        cursor: $cursor
        commentsOf: $commentsOf
        sources: $sources
        metadata: $metadata
      }
    ) {
      items {
        ... on Comment {
          ...CommentWithFirstComment
        }
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentCommentWithFirstComment}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useComments__
 *
 * To run a query within a React component, call `useComments` and pass it any options that fit your needs.
 * When your component renders, `useComments` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComments({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      commentsOf: // value for 'commentsOf'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *      metadata: // value for 'metadata'
 *   },
 * });
 */
export function useComments(
  baseOptions: Apollo.QueryHookOptions<Operations.CommentsData, Operations.CommentsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.CommentsData, Operations.CommentsVariables>(
    CommentsDocument,
    options,
  );
}
export function useCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Operations.CommentsData, Operations.CommentsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.CommentsData, Operations.CommentsVariables>(
    CommentsDocument,
    options,
  );
}
export type CommentsHookResult = ReturnType<typeof useComments>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<
  Operations.CommentsData,
  Operations.CommentsVariables
>;
export const EnabledModuleCurrenciesDocument = /*#__PURE__*/ gql`
  query EnabledModuleCurrencies {
    result: enabledModuleCurrencies {
      ...Erc20Fields
    }
  }
  ${FragmentErc20Fields}
`;

/**
 * __useEnabledModuleCurrencies__
 *
 * To run a query within a React component, call `useEnabledModuleCurrencies` and pass it any options that fit your needs.
 * When your component renders, `useEnabledModuleCurrencies` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnabledModuleCurrencies({
 *   variables: {
 *   },
 * });
 */
export function useEnabledModuleCurrencies(
  baseOptions?: Apollo.QueryHookOptions<
    Operations.EnabledModuleCurrenciesData,
    Operations.EnabledModuleCurrenciesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.EnabledModuleCurrenciesData,
    Operations.EnabledModuleCurrenciesVariables
  >(EnabledModuleCurrenciesDocument, options);
}
export function useEnabledModuleCurrenciesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.EnabledModuleCurrenciesData,
    Operations.EnabledModuleCurrenciesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.EnabledModuleCurrenciesData,
    Operations.EnabledModuleCurrenciesVariables
  >(EnabledModuleCurrenciesDocument, options);
}
export type EnabledModuleCurrenciesHookResult = ReturnType<typeof useEnabledModuleCurrencies>;
export type EnabledModuleCurrenciesLazyQueryHookResult = ReturnType<
  typeof useEnabledModuleCurrenciesLazyQuery
>;
export type EnabledModuleCurrenciesQueryResult = Apollo.QueryResult<
  Operations.EnabledModuleCurrenciesData,
  Operations.EnabledModuleCurrenciesVariables
>;
export const FeedDocument = /*#__PURE__*/ gql`
  query Feed(
    $profileId: ProfileId!
    $restrictEventTypesTo: [FeedEventItemType!]
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
    $metadata: PublicationMetadataFilters
  ) {
    result: feed(
      request: {
        profileId: $profileId
        feedEventItemTypes: $restrictEventTypesTo
        limit: $limit
        cursor: $cursor
        sources: $sources
        metadata: $metadata
      }
    ) {
      items {
        ...FeedItem
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentFeedItem}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useFeed__
 *
 * To run a query within a React component, call `useFeed` and pass it any options that fit your needs.
 * When your component renders, `useFeed` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeed({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      restrictEventTypesTo: // value for 'restrictEventTypesTo'
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *      metadata: // value for 'metadata'
 *   },
 * });
 */
export function useFeed(
  baseOptions: Apollo.QueryHookOptions<Operations.FeedData, Operations.FeedVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.FeedData, Operations.FeedVariables>(FeedDocument, options);
}
export function useFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Operations.FeedData, Operations.FeedVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.FeedData, Operations.FeedVariables>(FeedDocument, options);
}
export type FeedHookResult = ReturnType<typeof useFeed>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<Operations.FeedData, Operations.FeedVariables>;
export const ExploreProfilesDocument = /*#__PURE__*/ gql`
  query ExploreProfiles(
    $sortCriteria: ProfileSortCriteria!
    $limit: LimitScalar
    $cursor: Cursor
    $observerId: ProfileId
    $sources: [Sources!]!
  ) {
    result: exploreProfiles(
      request: { limit: $limit, cursor: $cursor, sortCriteria: $sortCriteria }
    ) {
      items {
        ...Profile
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentProfile}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useExploreProfiles__
 *
 * To run a query within a React component, call `useExploreProfiles` and pass it any options that fit your needs.
 * When your component renders, `useExploreProfiles` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExploreProfiles({
 *   variables: {
 *      sortCriteria: // value for 'sortCriteria'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      observerId: // value for 'observerId'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useExploreProfiles(
  baseOptions: Apollo.QueryHookOptions<
    Operations.ExploreProfilesData,
    Operations.ExploreProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.ExploreProfilesData, Operations.ExploreProfilesVariables>(
    ExploreProfilesDocument,
    options,
  );
}
export function useExploreProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.ExploreProfilesData,
    Operations.ExploreProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.ExploreProfilesData, Operations.ExploreProfilesVariables>(
    ExploreProfilesDocument,
    options,
  );
}
export type ExploreProfilesHookResult = ReturnType<typeof useExploreProfiles>;
export type ExploreProfilesLazyQueryHookResult = ReturnType<typeof useExploreProfilesLazyQuery>;
export type ExploreProfilesQueryResult = Apollo.QueryResult<
  Operations.ExploreProfilesData,
  Operations.ExploreProfilesVariables
>;
export const CreateFollowTypedDataDocument = /*#__PURE__*/ gql`
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
  ${FragmentEip712TypedDataDomain}
`;
export type CreateFollowTypedDataMutationFn = Apollo.MutationFunction<
  Operations.CreateFollowTypedDataData,
  Operations.CreateFollowTypedDataVariables
>;

/**
 * __useCreateFollowTypedData__
 *
 * To run a mutation, you first call `useCreateFollowTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFollowTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFollowTypedData, { data, loading, error }] = useCreateFollowTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateFollowTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateFollowTypedDataData,
    Operations.CreateFollowTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateFollowTypedDataData,
    Operations.CreateFollowTypedDataVariables
  >(CreateFollowTypedDataDocument, options);
}
export type CreateFollowTypedDataHookResult = ReturnType<typeof useCreateFollowTypedData>;
export type CreateFollowTypedDataMutationResult =
  Apollo.MutationResult<Operations.CreateFollowTypedDataData>;
export type CreateFollowTypedDataMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateFollowTypedDataData,
  Operations.CreateFollowTypedDataVariables
>;
export const CreateMirrorTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateMirrorTypedData($request: CreateMirrorRequest!, $options: TypedDataOptions) {
    result: createMirrorTypedData(request: $request, options: $options) {
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
          profileId
          profileIdPointed
          pubIdPointed
          referenceModuleData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export type CreateMirrorTypedDataMutationFn = Apollo.MutationFunction<
  Operations.CreateMirrorTypedDataData,
  Operations.CreateMirrorTypedDataVariables
>;

/**
 * __useCreateMirrorTypedData__
 *
 * To run a mutation, you first call `useCreateMirrorTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMirrorTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMirrorTypedData, { data, loading, error }] = useCreateMirrorTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateMirrorTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateMirrorTypedDataData,
    Operations.CreateMirrorTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateMirrorTypedDataData,
    Operations.CreateMirrorTypedDataVariables
  >(CreateMirrorTypedDataDocument, options);
}
export type CreateMirrorTypedDataHookResult = ReturnType<typeof useCreateMirrorTypedData>;
export type CreateMirrorTypedDataMutationResult =
  Apollo.MutationResult<Operations.CreateMirrorTypedDataData>;
export type CreateMirrorTypedDataMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateMirrorTypedDataData,
  Operations.CreateMirrorTypedDataVariables
>;
export const CreateMirrorViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateMirrorViaDispatcher($request: CreateMirrorRequest!) {
    result: createMirrorViaDispatcher(request: $request) {
      ...RelayResult
    }
  }
  ${FragmentRelayResult}
`;
export type CreateMirrorViaDispatcherMutationFn = Apollo.MutationFunction<
  Operations.CreateMirrorViaDispatcherData,
  Operations.CreateMirrorViaDispatcherVariables
>;

/**
 * __useCreateMirrorViaDispatcher__
 *
 * To run a mutation, you first call `useCreateMirrorViaDispatcher` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMirrorViaDispatcher` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMirrorViaDispatcher, { data, loading, error }] = useCreateMirrorViaDispatcher({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateMirrorViaDispatcher(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateMirrorViaDispatcherData,
    Operations.CreateMirrorViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateMirrorViaDispatcherData,
    Operations.CreateMirrorViaDispatcherVariables
  >(CreateMirrorViaDispatcherDocument, options);
}
export type CreateMirrorViaDispatcherHookResult = ReturnType<typeof useCreateMirrorViaDispatcher>;
export type CreateMirrorViaDispatcherMutationResult =
  Apollo.MutationResult<Operations.CreateMirrorViaDispatcherData>;
export type CreateMirrorViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateMirrorViaDispatcherData,
  Operations.CreateMirrorViaDispatcherVariables
>;
export const EnabledModulesDocument = /*#__PURE__*/ gql`
  query EnabledModules {
    result: enabledModules {
      ...EnabledModules
    }
  }
  ${FragmentEnabledModules}
`;

/**
 * __useEnabledModules__
 *
 * To run a query within a React component, call `useEnabledModules` and pass it any options that fit your needs.
 * When your component renders, `useEnabledModules` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnabledModules({
 *   variables: {
 *   },
 * });
 */
export function useEnabledModules(
  baseOptions?: Apollo.QueryHookOptions<
    Operations.EnabledModulesData,
    Operations.EnabledModulesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.EnabledModulesData, Operations.EnabledModulesVariables>(
    EnabledModulesDocument,
    options,
  );
}
export function useEnabledModulesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.EnabledModulesData,
    Operations.EnabledModulesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.EnabledModulesData, Operations.EnabledModulesVariables>(
    EnabledModulesDocument,
    options,
  );
}
export type EnabledModulesHookResult = ReturnType<typeof useEnabledModules>;
export type EnabledModulesLazyQueryHookResult = ReturnType<typeof useEnabledModulesLazyQuery>;
export type EnabledModulesQueryResult = Apollo.QueryResult<
  Operations.EnabledModulesData,
  Operations.EnabledModulesVariables
>;
export const NotificationsDocument = /*#__PURE__*/ gql`
  query Notifications(
    $observerId: ProfileId!
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
    $notificationTypes: [NotificationTypes!]
  ) {
    result: notifications(
      request: {
        profileId: $observerId
        limit: $limit
        cursor: $cursor
        sources: $sources
        notificationTypes: $notificationTypes
      }
    ) {
      items {
        ... on NewFollowerNotification {
          ...NewFollowerNotification
        }
        ... on NewMirrorNotification {
          ...NewMirrorNotification
        }
        ... on NewCollectNotification {
          ...NewCollectNotification
        }
        ... on NewCommentNotification {
          ...NewCommentNotification
        }
        ... on NewMentionNotification {
          ...NewMentionNotification
        }
        ... on NewReactionNotification {
          ...NewReactionNotification
        }
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentNewFollowerNotification}
  ${FragmentNewMirrorNotification}
  ${FragmentNewCollectNotification}
  ${FragmentNewCommentNotification}
  ${FragmentNewMentionNotification}
  ${FragmentNewReactionNotification}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useNotifications__
 *
 * To run a query within a React component, call `useNotifications` and pass it any options that fit your needs.
 * When your component renders, `useNotifications` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotifications({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *      notificationTypes: // value for 'notificationTypes'
 *   },
 * });
 */
export function useNotifications(
  baseOptions: Apollo.QueryHookOptions<
    Operations.NotificationsData,
    Operations.NotificationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.NotificationsData, Operations.NotificationsVariables>(
    NotificationsDocument,
    options,
  );
}
export function useNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.NotificationsData,
    Operations.NotificationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.NotificationsData, Operations.NotificationsVariables>(
    NotificationsDocument,
    options,
  );
}
export type NotificationsHookResult = ReturnType<typeof useNotifications>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<
  Operations.NotificationsData,
  Operations.NotificationsVariables
>;
export const UnreadNotificationCountDocument = /*#__PURE__*/ gql`
  query UnreadNotificationCount(
    $profileId: ProfileId!
    $sources: [Sources!]
    $notificationTypes: [NotificationTypes!]
  ) {
    result: notifications(
      request: { profileId: $profileId, sources: $sources, notificationTypes: $notificationTypes }
    ) {
      pageInfo {
        totalCount
      }
    }
  }
`;

/**
 * __useUnreadNotificationCount__
 *
 * To run a query within a React component, call `useUnreadNotificationCount` and pass it any options that fit your needs.
 * When your component renders, `useUnreadNotificationCount` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnreadNotificationCount({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      sources: // value for 'sources'
 *      notificationTypes: // value for 'notificationTypes'
 *   },
 * });
 */
export function useUnreadNotificationCount(
  baseOptions: Apollo.QueryHookOptions<
    Operations.UnreadNotificationCountData,
    Operations.UnreadNotificationCountVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.UnreadNotificationCountData,
    Operations.UnreadNotificationCountVariables
  >(UnreadNotificationCountDocument, options);
}
export function useUnreadNotificationCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.UnreadNotificationCountData,
    Operations.UnreadNotificationCountVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.UnreadNotificationCountData,
    Operations.UnreadNotificationCountVariables
  >(UnreadNotificationCountDocument, options);
}
export type UnreadNotificationCountHookResult = ReturnType<typeof useUnreadNotificationCount>;
export type UnreadNotificationCountLazyQueryHookResult = ReturnType<
  typeof useUnreadNotificationCountLazyQuery
>;
export type UnreadNotificationCountQueryResult = Apollo.QueryResult<
  Operations.UnreadNotificationCountData,
  Operations.UnreadNotificationCountVariables
>;
export const CreatePostTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreatePostTypedData($request: CreatePublicPostRequest!, $options: TypedDataOptions) {
    result: createPostTypedData(request: $request, options: $options) {
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
          profileId
          contentURI
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export type CreatePostTypedDataMutationFn = Apollo.MutationFunction<
  Operations.CreatePostTypedDataData,
  Operations.CreatePostTypedDataVariables
>;

/**
 * __useCreatePostTypedData__
 *
 * To run a mutation, you first call `useCreatePostTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostTypedData, { data, loading, error }] = useCreatePostTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreatePostTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreatePostTypedDataData,
    Operations.CreatePostTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreatePostTypedDataData,
    Operations.CreatePostTypedDataVariables
  >(CreatePostTypedDataDocument, options);
}
export type CreatePostTypedDataHookResult = ReturnType<typeof useCreatePostTypedData>;
export type CreatePostTypedDataMutationResult =
  Apollo.MutationResult<Operations.CreatePostTypedDataData>;
export type CreatePostTypedDataMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreatePostTypedDataData,
  Operations.CreatePostTypedDataVariables
>;
export const CreatePostViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {
    result: createPostViaDispatcher(request: $request) {
      ...RelayResult
    }
  }
  ${FragmentRelayResult}
`;
export type CreatePostViaDispatcherMutationFn = Apollo.MutationFunction<
  Operations.CreatePostViaDispatcherData,
  Operations.CreatePostViaDispatcherVariables
>;

/**
 * __useCreatePostViaDispatcher__
 *
 * To run a mutation, you first call `useCreatePostViaDispatcher` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostViaDispatcher` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostViaDispatcher, { data, loading, error }] = useCreatePostViaDispatcher({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreatePostViaDispatcher(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreatePostViaDispatcherData,
    Operations.CreatePostViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreatePostViaDispatcherData,
    Operations.CreatePostViaDispatcherVariables
  >(CreatePostViaDispatcherDocument, options);
}
export type CreatePostViaDispatcherHookResult = ReturnType<typeof useCreatePostViaDispatcher>;
export type CreatePostViaDispatcherMutationResult =
  Apollo.MutationResult<Operations.CreatePostViaDispatcherData>;
export type CreatePostViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreatePostViaDispatcherData,
  Operations.CreatePostViaDispatcherVariables
>;
export const CreateSetDispatcherTypedDataDocument = /*#__PURE__*/ gql`
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
export type CreateSetDispatcherTypedDataMutationFn = Apollo.MutationFunction<
  Operations.CreateSetDispatcherTypedDataData,
  Operations.CreateSetDispatcherTypedDataVariables
>;

/**
 * __useCreateSetDispatcherTypedData__
 *
 * To run a mutation, you first call `useCreateSetDispatcherTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetDispatcherTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetDispatcherTypedData, { data, loading, error }] = useCreateSetDispatcherTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateSetDispatcherTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateSetDispatcherTypedDataData,
    Operations.CreateSetDispatcherTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateSetDispatcherTypedDataData,
    Operations.CreateSetDispatcherTypedDataVariables
  >(CreateSetDispatcherTypedDataDocument, options);
}
export type CreateSetDispatcherTypedDataHookResult = ReturnType<
  typeof useCreateSetDispatcherTypedData
>;
export type CreateSetDispatcherTypedDataMutationResult =
  Apollo.MutationResult<Operations.CreateSetDispatcherTypedDataData>;
export type CreateSetDispatcherTypedDataMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateSetDispatcherTypedDataData,
  Operations.CreateSetDispatcherTypedDataVariables
>;
export const ProfilesToFollowDocument = /*#__PURE__*/ gql`
  query ProfilesToFollow($observerId: ProfileId, $sources: [Sources!]!) {
    result: recommendedProfiles {
      ...Profile
    }
  }
  ${FragmentProfile}
`;

/**
 * __useProfilesToFollow__
 *
 * To run a query within a React component, call `useProfilesToFollow` and pass it any options that fit your needs.
 * When your component renders, `useProfilesToFollow` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilesToFollow({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useProfilesToFollow(
  baseOptions: Apollo.QueryHookOptions<
    Operations.ProfilesToFollowData,
    Operations.ProfilesToFollowVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.ProfilesToFollowData, Operations.ProfilesToFollowVariables>(
    ProfilesToFollowDocument,
    options,
  );
}
export function useProfilesToFollowLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.ProfilesToFollowData,
    Operations.ProfilesToFollowVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.ProfilesToFollowData, Operations.ProfilesToFollowVariables>(
    ProfilesToFollowDocument,
    options,
  );
}
export type ProfilesToFollowHookResult = ReturnType<typeof useProfilesToFollow>;
export type ProfilesToFollowLazyQueryHookResult = ReturnType<typeof useProfilesToFollowLazyQuery>;
export type ProfilesToFollowQueryResult = Apollo.QueryResult<
  Operations.ProfilesToFollowData,
  Operations.ProfilesToFollowVariables
>;
export const GetProfileDocument = /*#__PURE__*/ gql`
  query GetProfile(
    $request: SingleProfileQueryRequest!
    $observerId: ProfileId
    $sources: [Sources!] = []
  ) {
    result: profile(request: $request) {
      ...Profile
    }
  }
  ${FragmentProfile}
`;

/**
 * __useGetProfile__
 *
 * To run a query within a React component, call `useGetProfile` and pass it any options that fit your needs.
 * When your component renders, `useGetProfile` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfile({
 *   variables: {
 *      request: // value for 'request'
 *      observerId: // value for 'observerId'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useGetProfile(
  baseOptions: Apollo.QueryHookOptions<Operations.GetProfileData, Operations.GetProfileVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.GetProfileData, Operations.GetProfileVariables>(
    GetProfileDocument,
    options,
  );
}
export function useGetProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.GetProfileData,
    Operations.GetProfileVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.GetProfileData, Operations.GetProfileVariables>(
    GetProfileDocument,
    options,
  );
}
export type GetProfileHookResult = ReturnType<typeof useGetProfile>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<
  Operations.GetProfileData,
  Operations.GetProfileVariables
>;
export const GetAllProfilesDocument = /*#__PURE__*/ gql`
  query GetAllProfiles(
    $byProfileIds: [ProfileId!]
    $byHandles: [Handle!]
    $byOwnerAddresses: [EthereumAddress!]
    $byWhoMirroredPublicationId: InternalPublicationId
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!] = []
  ) {
    result: profiles(
      request: {
        whoMirroredPublicationId: $byWhoMirroredPublicationId
        ownedBy: $byOwnerAddresses
        profileIds: $byProfileIds
        handles: $byHandles
        limit: $limit
        cursor: $cursor
      }
    ) {
      items {
        ...Profile
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentProfile}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useGetAllProfiles__
 *
 * To run a query within a React component, call `useGetAllProfiles` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProfiles` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProfiles({
 *   variables: {
 *      byProfileIds: // value for 'byProfileIds'
 *      byHandles: // value for 'byHandles'
 *      byOwnerAddresses: // value for 'byOwnerAddresses'
 *      byWhoMirroredPublicationId: // value for 'byWhoMirroredPublicationId'
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useGetAllProfiles(
  baseOptions: Apollo.QueryHookOptions<
    Operations.GetAllProfilesData,
    Operations.GetAllProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.GetAllProfilesData, Operations.GetAllProfilesVariables>(
    GetAllProfilesDocument,
    options,
  );
}
export function useGetAllProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.GetAllProfilesData,
    Operations.GetAllProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.GetAllProfilesData, Operations.GetAllProfilesVariables>(
    GetAllProfilesDocument,
    options,
  );
}
export type GetAllProfilesHookResult = ReturnType<typeof useGetAllProfiles>;
export type GetAllProfilesLazyQueryHookResult = ReturnType<typeof useGetAllProfilesLazyQuery>;
export type GetAllProfilesQueryResult = Apollo.QueryResult<
  Operations.GetAllProfilesData,
  Operations.GetAllProfilesVariables
>;
export const CreateProfileDocument = /*#__PURE__*/ gql`
  mutation CreateProfile($request: CreateProfileRequest!) {
    result: createProfile(request: $request) {
      ...RelayResult
    }
  }
  ${FragmentRelayResult}
`;
export type CreateProfileMutationFn = Apollo.MutationFunction<
  Operations.CreateProfileData,
  Operations.CreateProfileVariables
>;

/**
 * __useCreateProfile__
 *
 * To run a mutation, you first call `useCreateProfile` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfile` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfile, { data, loading, error }] = useCreateProfile({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateProfile(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateProfileData,
    Operations.CreateProfileVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Operations.CreateProfileData, Operations.CreateProfileVariables>(
    CreateProfileDocument,
    options,
  );
}
export type CreateProfileHookResult = ReturnType<typeof useCreateProfile>;
export type CreateProfileMutationResult = Apollo.MutationResult<Operations.CreateProfileData>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateProfileData,
  Operations.CreateProfileVariables
>;
export const MutualFollowersProfilesDocument = /*#__PURE__*/ gql`
  query MutualFollowersProfiles(
    $observerId: ProfileId!
    $viewingProfileId: ProfileId!
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
  ) {
    result: mutualFollowersProfiles(
      request: {
        yourProfileId: $observerId
        viewingProfileId: $viewingProfileId
        limit: $limit
        cursor: $cursor
      }
    ) {
      items {
        ...Profile
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentProfile}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useMutualFollowersProfiles__
 *
 * To run a query within a React component, call `useMutualFollowersProfiles` and pass it any options that fit your needs.
 * When your component renders, `useMutualFollowersProfiles` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMutualFollowersProfiles({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      viewingProfileId: // value for 'viewingProfileId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useMutualFollowersProfiles(
  baseOptions: Apollo.QueryHookOptions<
    Operations.MutualFollowersProfilesData,
    Operations.MutualFollowersProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.MutualFollowersProfilesData,
    Operations.MutualFollowersProfilesVariables
  >(MutualFollowersProfilesDocument, options);
}
export function useMutualFollowersProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.MutualFollowersProfilesData,
    Operations.MutualFollowersProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.MutualFollowersProfilesData,
    Operations.MutualFollowersProfilesVariables
  >(MutualFollowersProfilesDocument, options);
}
export type MutualFollowersProfilesHookResult = ReturnType<typeof useMutualFollowersProfiles>;
export type MutualFollowersProfilesLazyQueryHookResult = ReturnType<
  typeof useMutualFollowersProfilesLazyQuery
>;
export type MutualFollowersProfilesQueryResult = Apollo.QueryResult<
  Operations.MutualFollowersProfilesData,
  Operations.MutualFollowersProfilesVariables
>;
export const CreateSetFollowModuleTypedDataDocument = /*#__PURE__*/ gql`
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
export type CreateSetFollowModuleTypedDataMutationFn = Apollo.MutationFunction<
  Operations.CreateSetFollowModuleTypedDataData,
  Operations.CreateSetFollowModuleTypedDataVariables
>;

/**
 * __useCreateSetFollowModuleTypedData__
 *
 * To run a mutation, you first call `useCreateSetFollowModuleTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetFollowModuleTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetFollowModuleTypedData, { data, loading, error }] = useCreateSetFollowModuleTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateSetFollowModuleTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateSetFollowModuleTypedDataData,
    Operations.CreateSetFollowModuleTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateSetFollowModuleTypedDataData,
    Operations.CreateSetFollowModuleTypedDataVariables
  >(CreateSetFollowModuleTypedDataDocument, options);
}
export type CreateSetFollowModuleTypedDataHookResult = ReturnType<
  typeof useCreateSetFollowModuleTypedData
>;
export type CreateSetFollowModuleTypedDataMutationResult =
  Apollo.MutationResult<Operations.CreateSetFollowModuleTypedDataData>;
export type CreateSetFollowModuleTypedDataMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateSetFollowModuleTypedDataData,
  Operations.CreateSetFollowModuleTypedDataVariables
>;
export const CreateSetProfileImageUriTypedDataDocument = /*#__PURE__*/ gql`
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
export type CreateSetProfileImageUriTypedDataMutationFn = Apollo.MutationFunction<
  Operations.CreateSetProfileImageUriTypedDataData,
  Operations.CreateSetProfileImageUriTypedDataVariables
>;

/**
 * __useCreateSetProfileImageUriTypedData__
 *
 * To run a mutation, you first call `useCreateSetProfileImageUriTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetProfileImageUriTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetProfileImageUriTypedData, { data, loading, error }] = useCreateSetProfileImageUriTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateSetProfileImageUriTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateSetProfileImageUriTypedDataData,
    Operations.CreateSetProfileImageUriTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateSetProfileImageUriTypedDataData,
    Operations.CreateSetProfileImageUriTypedDataVariables
  >(CreateSetProfileImageUriTypedDataDocument, options);
}
export type CreateSetProfileImageUriTypedDataHookResult = ReturnType<
  typeof useCreateSetProfileImageUriTypedData
>;
export type CreateSetProfileImageUriTypedDataMutationResult =
  Apollo.MutationResult<Operations.CreateSetProfileImageUriTypedDataData>;
export type CreateSetProfileImageUriTypedDataMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateSetProfileImageUriTypedDataData,
  Operations.CreateSetProfileImageUriTypedDataVariables
>;
export const CreateSetProfileImageUriViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateSetProfileImageURIViaDispatcher($request: UpdateProfileImageRequest!) {
    result: createSetProfileImageURIViaDispatcher(request: $request) {
      ...RelayResult
    }
  }
  ${FragmentRelayResult}
`;
export type CreateSetProfileImageUriViaDispatcherMutationFn = Apollo.MutationFunction<
  Operations.CreateSetProfileImageUriViaDispatcherData,
  Operations.CreateSetProfileImageUriViaDispatcherVariables
>;

/**
 * __useCreateSetProfileImageUriViaDispatcher__
 *
 * To run a mutation, you first call `useCreateSetProfileImageUriViaDispatcher` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetProfileImageUriViaDispatcher` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetProfileImageUriViaDispatcher, { data, loading, error }] = useCreateSetProfileImageUriViaDispatcher({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateSetProfileImageUriViaDispatcher(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateSetProfileImageUriViaDispatcherData,
    Operations.CreateSetProfileImageUriViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateSetProfileImageUriViaDispatcherData,
    Operations.CreateSetProfileImageUriViaDispatcherVariables
  >(CreateSetProfileImageUriViaDispatcherDocument, options);
}
export type CreateSetProfileImageUriViaDispatcherHookResult = ReturnType<
  typeof useCreateSetProfileImageUriViaDispatcher
>;
export type CreateSetProfileImageUriViaDispatcherMutationResult =
  Apollo.MutationResult<Operations.CreateSetProfileImageUriViaDispatcherData>;
export type CreateSetProfileImageUriViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateSetProfileImageUriViaDispatcherData,
  Operations.CreateSetProfileImageUriViaDispatcherVariables
>;
export const CreateSetProfileMetadataTypedDataDocument = /*#__PURE__*/ gql`
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
export type CreateSetProfileMetadataTypedDataMutationFn = Apollo.MutationFunction<
  Operations.CreateSetProfileMetadataTypedDataData,
  Operations.CreateSetProfileMetadataTypedDataVariables
>;

/**
 * __useCreateSetProfileMetadataTypedData__
 *
 * To run a mutation, you first call `useCreateSetProfileMetadataTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetProfileMetadataTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetProfileMetadataTypedData, { data, loading, error }] = useCreateSetProfileMetadataTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateSetProfileMetadataTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateSetProfileMetadataTypedDataData,
    Operations.CreateSetProfileMetadataTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateSetProfileMetadataTypedDataData,
    Operations.CreateSetProfileMetadataTypedDataVariables
  >(CreateSetProfileMetadataTypedDataDocument, options);
}
export type CreateSetProfileMetadataTypedDataHookResult = ReturnType<
  typeof useCreateSetProfileMetadataTypedData
>;
export type CreateSetProfileMetadataTypedDataMutationResult =
  Apollo.MutationResult<Operations.CreateSetProfileMetadataTypedDataData>;
export type CreateSetProfileMetadataTypedDataMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateSetProfileMetadataTypedDataData,
  Operations.CreateSetProfileMetadataTypedDataVariables
>;
export const CreateSetProfileMetadataViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateSetProfileMetadataViaDispatcher(
    $request: CreatePublicSetProfileMetadataURIRequest!
  ) {
    result: createSetProfileMetadataViaDispatcher(request: $request) {
      ...RelayResult
    }
  }
  ${FragmentRelayResult}
`;
export type CreateSetProfileMetadataViaDispatcherMutationFn = Apollo.MutationFunction<
  Operations.CreateSetProfileMetadataViaDispatcherData,
  Operations.CreateSetProfileMetadataViaDispatcherVariables
>;

/**
 * __useCreateSetProfileMetadataViaDispatcher__
 *
 * To run a mutation, you first call `useCreateSetProfileMetadataViaDispatcher` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetProfileMetadataViaDispatcher` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetProfileMetadataViaDispatcher, { data, loading, error }] = useCreateSetProfileMetadataViaDispatcher({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateSetProfileMetadataViaDispatcher(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateSetProfileMetadataViaDispatcherData,
    Operations.CreateSetProfileMetadataViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateSetProfileMetadataViaDispatcherData,
    Operations.CreateSetProfileMetadataViaDispatcherVariables
  >(CreateSetProfileMetadataViaDispatcherDocument, options);
}
export type CreateSetProfileMetadataViaDispatcherHookResult = ReturnType<
  typeof useCreateSetProfileMetadataViaDispatcher
>;
export type CreateSetProfileMetadataViaDispatcherMutationResult =
  Apollo.MutationResult<Operations.CreateSetProfileMetadataViaDispatcherData>;
export type CreateSetProfileMetadataViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateSetProfileMetadataViaDispatcherData,
  Operations.CreateSetProfileMetadataViaDispatcherVariables
>;
export const ProfileFollowersDocument = /*#__PURE__*/ gql`
  query ProfileFollowers(
    $profileId: ProfileId!
    $limit: LimitScalar!
    $cursor: Cursor
    $observerId: ProfileId
    $sources: [Sources!]!
  ) {
    result: followers(request: { profileId: $profileId, limit: $limit, cursor: $cursor }) {
      items {
        ...Follower
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentFollower}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useProfileFollowers__
 *
 * To run a query within a React component, call `useProfileFollowers` and pass it any options that fit your needs.
 * When your component renders, `useProfileFollowers` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileFollowers({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      observerId: // value for 'observerId'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useProfileFollowers(
  baseOptions: Apollo.QueryHookOptions<
    Operations.ProfileFollowersData,
    Operations.ProfileFollowersVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.ProfileFollowersData, Operations.ProfileFollowersVariables>(
    ProfileFollowersDocument,
    options,
  );
}
export function useProfileFollowersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.ProfileFollowersData,
    Operations.ProfileFollowersVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.ProfileFollowersData, Operations.ProfileFollowersVariables>(
    ProfileFollowersDocument,
    options,
  );
}
export type ProfileFollowersHookResult = ReturnType<typeof useProfileFollowers>;
export type ProfileFollowersLazyQueryHookResult = ReturnType<typeof useProfileFollowersLazyQuery>;
export type ProfileFollowersQueryResult = Apollo.QueryResult<
  Operations.ProfileFollowersData,
  Operations.ProfileFollowersVariables
>;
export const ProfileFollowingDocument = /*#__PURE__*/ gql`
  query ProfileFollowing(
    $walletAddress: EthereumAddress!
    $limit: LimitScalar!
    $cursor: Cursor
    $observerId: ProfileId
    $sources: [Sources!]!
  ) {
    result: following(request: { address: $walletAddress, limit: $limit, cursor: $cursor }) {
      items {
        ...Following
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentFollowing}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useProfileFollowing__
 *
 * To run a query within a React component, call `useProfileFollowing` and pass it any options that fit your needs.
 * When your component renders, `useProfileFollowing` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileFollowing({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      observerId: // value for 'observerId'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useProfileFollowing(
  baseOptions: Apollo.QueryHookOptions<
    Operations.ProfileFollowingData,
    Operations.ProfileFollowingVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.ProfileFollowingData, Operations.ProfileFollowingVariables>(
    ProfileFollowingDocument,
    options,
  );
}
export function useProfileFollowingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.ProfileFollowingData,
    Operations.ProfileFollowingVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.ProfileFollowingData, Operations.ProfileFollowingVariables>(
    ProfileFollowingDocument,
    options,
  );
}
export type ProfileFollowingHookResult = ReturnType<typeof useProfileFollowing>;
export type ProfileFollowingLazyQueryHookResult = ReturnType<typeof useProfileFollowingLazyQuery>;
export type ProfileFollowingQueryResult = Apollo.QueryResult<
  Operations.ProfileFollowingData,
  Operations.ProfileFollowingVariables
>;
export const ProxyActionStatusDocument = /*#__PURE__*/ gql`
  query ProxyActionStatus($proxyActionId: ProxyActionId!) {
    result: proxyActionStatus(proxyActionId: $proxyActionId) {
      ... on ProxyActionStatusResult {
        ...ProxyActionStatusResult
      }
      ... on ProxyActionError {
        ...ProxyActionError
      }
      ... on ProxyActionQueued {
        ...ProxyActionQueued
      }
    }
  }
  ${FragmentProxyActionStatusResult}
  ${FragmentProxyActionError}
  ${FragmentProxyActionQueued}
`;

/**
 * __useProxyActionStatus__
 *
 * To run a query within a React component, call `useProxyActionStatus` and pass it any options that fit your needs.
 * When your component renders, `useProxyActionStatus` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProxyActionStatus({
 *   variables: {
 *      proxyActionId: // value for 'proxyActionId'
 *   },
 * });
 */
export function useProxyActionStatus(
  baseOptions: Apollo.QueryHookOptions<
    Operations.ProxyActionStatusData,
    Operations.ProxyActionStatusVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.ProxyActionStatusData, Operations.ProxyActionStatusVariables>(
    ProxyActionStatusDocument,
    options,
  );
}
export function useProxyActionStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.ProxyActionStatusData,
    Operations.ProxyActionStatusVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.ProxyActionStatusData,
    Operations.ProxyActionStatusVariables
  >(ProxyActionStatusDocument, options);
}
export type ProxyActionStatusHookResult = ReturnType<typeof useProxyActionStatus>;
export type ProxyActionStatusLazyQueryHookResult = ReturnType<typeof useProxyActionStatusLazyQuery>;
export type ProxyActionStatusQueryResult = Apollo.QueryResult<
  Operations.ProxyActionStatusData,
  Operations.ProxyActionStatusVariables
>;
export const ProxyActionDocument = /*#__PURE__*/ gql`
  mutation ProxyAction($request: ProxyActionRequest!) {
    result: proxyAction(request: $request)
  }
`;
export type ProxyActionMutationFn = Apollo.MutationFunction<
  Operations.ProxyActionData,
  Operations.ProxyActionVariables
>;

/**
 * __useProxyAction__
 *
 * To run a mutation, you first call `useProxyAction` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProxyAction` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [proxyAction, { data, loading, error }] = useProxyAction({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useProxyAction(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.ProxyActionData,
    Operations.ProxyActionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Operations.ProxyActionData, Operations.ProxyActionVariables>(
    ProxyActionDocument,
    options,
  );
}
export type ProxyActionHookResult = ReturnType<typeof useProxyAction>;
export type ProxyActionMutationResult = Apollo.MutationResult<Operations.ProxyActionData>;
export type ProxyActionMutationOptions = Apollo.BaseMutationOptions<
  Operations.ProxyActionData,
  Operations.ProxyActionVariables
>;
export const PublicationDocument = /*#__PURE__*/ gql`
  query Publication(
    $observerId: ProfileId
    $publicationId: InternalPublicationId!
    $sources: [Sources!]!
  ) {
    result: publication(request: { publicationId: $publicationId }) {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...Mirror
      }
      ... on Comment {
        ...Comment
      }
    }
  }
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
`;

/**
 * __usePublication__
 *
 * To run a query within a React component, call `usePublication` and pass it any options that fit your needs.
 * When your component renders, `usePublication` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublication({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      publicationId: // value for 'publicationId'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function usePublication(
  baseOptions: Apollo.QueryHookOptions<Operations.PublicationData, Operations.PublicationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.PublicationData, Operations.PublicationVariables>(
    PublicationDocument,
    options,
  );
}
export function usePublicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.PublicationData,
    Operations.PublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.PublicationData, Operations.PublicationVariables>(
    PublicationDocument,
    options,
  );
}
export type PublicationHookResult = ReturnType<typeof usePublication>;
export type PublicationLazyQueryHookResult = ReturnType<typeof usePublicationLazyQuery>;
export type PublicationQueryResult = Apollo.QueryResult<
  Operations.PublicationData,
  Operations.PublicationVariables
>;
export const PublicationByTxHashDocument = /*#__PURE__*/ gql`
  query PublicationByTxHash($observerId: ProfileId, $txHash: TxHash!, $sources: [Sources!]!) {
    result: publication(request: { txHash: $txHash }) {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...Mirror
      }
      ... on Comment {
        ...CommentWithFirstComment
      }
    }
  }
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentCommentWithFirstComment}
`;

/**
 * __usePublicationByTxHash__
 *
 * To run a query within a React component, call `usePublicationByTxHash` and pass it any options that fit your needs.
 * When your component renders, `usePublicationByTxHash` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationByTxHash({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      txHash: // value for 'txHash'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function usePublicationByTxHash(
  baseOptions: Apollo.QueryHookOptions<
    Operations.PublicationByTxHashData,
    Operations.PublicationByTxHashVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.PublicationByTxHashData,
    Operations.PublicationByTxHashVariables
  >(PublicationByTxHashDocument, options);
}
export function usePublicationByTxHashLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.PublicationByTxHashData,
    Operations.PublicationByTxHashVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.PublicationByTxHashData,
    Operations.PublicationByTxHashVariables
  >(PublicationByTxHashDocument, options);
}
export type PublicationByTxHashHookResult = ReturnType<typeof usePublicationByTxHash>;
export type PublicationByTxHashLazyQueryHookResult = ReturnType<
  typeof usePublicationByTxHashLazyQuery
>;
export type PublicationByTxHashQueryResult = Apollo.QueryResult<
  Operations.PublicationByTxHashData,
  Operations.PublicationByTxHashVariables
>;
export const HidePublicationDocument = /*#__PURE__*/ gql`
  mutation HidePublication($publicationId: InternalPublicationId!) {
    hidePublication(request: { publicationId: $publicationId })
  }
`;
export type HidePublicationMutationFn = Apollo.MutationFunction<
  Operations.HidePublicationData,
  Operations.HidePublicationVariables
>;

/**
 * __useHidePublication__
 *
 * To run a mutation, you first call `useHidePublication` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHidePublication` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hidePublication, { data, loading, error }] = useHidePublication({
 *   variables: {
 *      publicationId: // value for 'publicationId'
 *   },
 * });
 */
export function useHidePublication(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.HidePublicationData,
    Operations.HidePublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Operations.HidePublicationData, Operations.HidePublicationVariables>(
    HidePublicationDocument,
    options,
  );
}
export type HidePublicationHookResult = ReturnType<typeof useHidePublication>;
export type HidePublicationMutationResult = Apollo.MutationResult<Operations.HidePublicationData>;
export type HidePublicationMutationOptions = Apollo.BaseMutationOptions<
  Operations.HidePublicationData,
  Operations.HidePublicationVariables
>;
export const PublicationsDocument = /*#__PURE__*/ gql`
  query Publications(
    $profileId: ProfileId!
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $publicationTypes: [PublicationTypes!]
    $sources: [Sources!]!
    $metadata: PublicationMetadataFilters
  ) {
    result: publications(
      request: {
        profileId: $profileId
        limit: $limit
        cursor: $cursor
        publicationTypes: $publicationTypes
        sources: $sources
        metadata: $metadata
      }
    ) {
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
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __usePublications__
 *
 * To run a query within a React component, call `usePublications` and pass it any options that fit your needs.
 * When your component renders, `usePublications` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublications({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      publicationTypes: // value for 'publicationTypes'
 *      sources: // value for 'sources'
 *      metadata: // value for 'metadata'
 *   },
 * });
 */
export function usePublications(
  baseOptions: Apollo.QueryHookOptions<
    Operations.PublicationsData,
    Operations.PublicationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.PublicationsData, Operations.PublicationsVariables>(
    PublicationsDocument,
    options,
  );
}
export function usePublicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.PublicationsData,
    Operations.PublicationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.PublicationsData, Operations.PublicationsVariables>(
    PublicationsDocument,
    options,
  );
}
export type PublicationsHookResult = ReturnType<typeof usePublications>;
export type PublicationsLazyQueryHookResult = ReturnType<typeof usePublicationsLazyQuery>;
export type PublicationsQueryResult = Apollo.QueryResult<
  Operations.PublicationsData,
  Operations.PublicationsVariables
>;
export const ExplorePublicationsDocument = /*#__PURE__*/ gql`
  query ExplorePublications(
    $cursor: Cursor
    $excludeProfileIds: [ProfileId!]
    $limit: LimitScalar!
    $metadata: PublicationMetadataFilters
    $observerId: ProfileId
    $publicationTypes: [PublicationTypes!]
    $sortCriteria: PublicationSortCriteria!
    $sources: [Sources!]!
    $timestamp: TimestampScalar
  ) {
    result: explorePublications(
      request: {
        cursor: $cursor
        excludeProfileIds: $excludeProfileIds
        limit: $limit
        metadata: $metadata
        publicationTypes: $publicationTypes
        sortCriteria: $sortCriteria
        sources: $sources
        timestamp: $timestamp
      }
    ) {
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
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useExplorePublications__
 *
 * To run a query within a React component, call `useExplorePublications` and pass it any options that fit your needs.
 * When your component renders, `useExplorePublications` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExplorePublications({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      excludeProfileIds: // value for 'excludeProfileIds'
 *      limit: // value for 'limit'
 *      metadata: // value for 'metadata'
 *      observerId: // value for 'observerId'
 *      publicationTypes: // value for 'publicationTypes'
 *      sortCriteria: // value for 'sortCriteria'
 *      sources: // value for 'sources'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useExplorePublications(
  baseOptions: Apollo.QueryHookOptions<
    Operations.ExplorePublicationsData,
    Operations.ExplorePublicationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.ExplorePublicationsData,
    Operations.ExplorePublicationsVariables
  >(ExplorePublicationsDocument, options);
}
export function useExplorePublicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.ExplorePublicationsData,
    Operations.ExplorePublicationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.ExplorePublicationsData,
    Operations.ExplorePublicationsVariables
  >(ExplorePublicationsDocument, options);
}
export type ExplorePublicationsHookResult = ReturnType<typeof useExplorePublications>;
export type ExplorePublicationsLazyQueryHookResult = ReturnType<
  typeof useExplorePublicationsLazyQuery
>;
export type ExplorePublicationsQueryResult = Apollo.QueryResult<
  Operations.ExplorePublicationsData,
  Operations.ExplorePublicationsVariables
>;
export const WhoCollectedPublicationDocument = /*#__PURE__*/ gql`
  query WhoCollectedPublication(
    $publicationId: InternalPublicationId!
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
  ) {
    result: whoCollectedPublication(
      request: { publicationId: $publicationId, limit: $limit, cursor: $cursor }
    ) {
      items {
        ...Wallet
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentWallet}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useWhoCollectedPublication__
 *
 * To run a query within a React component, call `useWhoCollectedPublication` and pass it any options that fit your needs.
 * When your component renders, `useWhoCollectedPublication` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoCollectedPublication({
 *   variables: {
 *      publicationId: // value for 'publicationId'
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useWhoCollectedPublication(
  baseOptions: Apollo.QueryHookOptions<
    Operations.WhoCollectedPublicationData,
    Operations.WhoCollectedPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.WhoCollectedPublicationData,
    Operations.WhoCollectedPublicationVariables
  >(WhoCollectedPublicationDocument, options);
}
export function useWhoCollectedPublicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.WhoCollectedPublicationData,
    Operations.WhoCollectedPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.WhoCollectedPublicationData,
    Operations.WhoCollectedPublicationVariables
  >(WhoCollectedPublicationDocument, options);
}
export type WhoCollectedPublicationHookResult = ReturnType<typeof useWhoCollectedPublication>;
export type WhoCollectedPublicationLazyQueryHookResult = ReturnType<
  typeof useWhoCollectedPublicationLazyQuery
>;
export type WhoCollectedPublicationQueryResult = Apollo.QueryResult<
  Operations.WhoCollectedPublicationData,
  Operations.WhoCollectedPublicationVariables
>;
export const ProfilePublicationsForSaleDocument = /*#__PURE__*/ gql`
  query ProfilePublicationsForSale(
    $profileId: ProfileId!
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
  ) {
    result: profilePublicationsForSale(
      request: { profileId: $profileId, limit: $limit, cursor: $cursor, sources: $sources }
    ) {
      items {
        ... on Post {
          ...Post
        }
        ... on Comment {
          ...Comment
        }
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useProfilePublicationsForSale__
 *
 * To run a query within a React component, call `useProfilePublicationsForSale` and pass it any options that fit your needs.
 * When your component renders, `useProfilePublicationsForSale` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilePublicationsForSale({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useProfilePublicationsForSale(
  baseOptions: Apollo.QueryHookOptions<
    Operations.ProfilePublicationsForSaleData,
    Operations.ProfilePublicationsForSaleVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.ProfilePublicationsForSaleData,
    Operations.ProfilePublicationsForSaleVariables
  >(ProfilePublicationsForSaleDocument, options);
}
export function useProfilePublicationsForSaleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.ProfilePublicationsForSaleData,
    Operations.ProfilePublicationsForSaleVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.ProfilePublicationsForSaleData,
    Operations.ProfilePublicationsForSaleVariables
  >(ProfilePublicationsForSaleDocument, options);
}
export type ProfilePublicationsForSaleHookResult = ReturnType<typeof useProfilePublicationsForSale>;
export type ProfilePublicationsForSaleLazyQueryHookResult = ReturnType<
  typeof useProfilePublicationsForSaleLazyQuery
>;
export type ProfilePublicationsForSaleQueryResult = Apollo.QueryResult<
  Operations.ProfilePublicationsForSaleData,
  Operations.ProfilePublicationsForSaleVariables
>;
export const AddReactionDocument = /*#__PURE__*/ gql`
  mutation AddReaction(
    $publicationId: InternalPublicationId!
    $reaction: ReactionTypes!
    $profileId: ProfileId!
  ) {
    addReaction(
      request: { publicationId: $publicationId, reaction: $reaction, profileId: $profileId }
    )
  }
`;
export type AddReactionMutationFn = Apollo.MutationFunction<
  Operations.AddReactionData,
  Operations.AddReactionVariables
>;

/**
 * __useAddReaction__
 *
 * To run a mutation, you first call `useAddReaction` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReaction` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReaction, { data, loading, error }] = useAddReaction({
 *   variables: {
 *      publicationId: // value for 'publicationId'
 *      reaction: // value for 'reaction'
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useAddReaction(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.AddReactionData,
    Operations.AddReactionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Operations.AddReactionData, Operations.AddReactionVariables>(
    AddReactionDocument,
    options,
  );
}
export type AddReactionHookResult = ReturnType<typeof useAddReaction>;
export type AddReactionMutationResult = Apollo.MutationResult<Operations.AddReactionData>;
export type AddReactionMutationOptions = Apollo.BaseMutationOptions<
  Operations.AddReactionData,
  Operations.AddReactionVariables
>;
export const RemoveReactionDocument = /*#__PURE__*/ gql`
  mutation RemoveReaction(
    $publicationId: InternalPublicationId!
    $reaction: ReactionTypes!
    $profileId: ProfileId!
  ) {
    removeReaction(
      request: { publicationId: $publicationId, reaction: $reaction, profileId: $profileId }
    )
  }
`;
export type RemoveReactionMutationFn = Apollo.MutationFunction<
  Operations.RemoveReactionData,
  Operations.RemoveReactionVariables
>;

/**
 * __useRemoveReaction__
 *
 * To run a mutation, you first call `useRemoveReaction` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReaction` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReaction, { data, loading, error }] = useRemoveReaction({
 *   variables: {
 *      publicationId: // value for 'publicationId'
 *      reaction: // value for 'reaction'
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useRemoveReaction(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.RemoveReactionData,
    Operations.RemoveReactionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Operations.RemoveReactionData, Operations.RemoveReactionVariables>(
    RemoveReactionDocument,
    options,
  );
}
export type RemoveReactionHookResult = ReturnType<typeof useRemoveReaction>;
export type RemoveReactionMutationResult = Apollo.MutationResult<Operations.RemoveReactionData>;
export type RemoveReactionMutationOptions = Apollo.BaseMutationOptions<
  Operations.RemoveReactionData,
  Operations.RemoveReactionVariables
>;
export const WhoReactedPublicationDocument = /*#__PURE__*/ gql`
  query WhoReactedPublication(
    $limit: LimitScalar
    $cursor: Cursor
    $publicationId: InternalPublicationId!
    $observerId: ProfileId
    $sources: [Sources!]!
  ) {
    result: whoReactedPublication(
      request: { limit: $limit, cursor: $cursor, publicationId: $publicationId }
    ) {
      items {
        ...WhoReactedResult
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentWhoReactedResult}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useWhoReactedPublication__
 *
 * To run a query within a React component, call `useWhoReactedPublication` and pass it any options that fit your needs.
 * When your component renders, `useWhoReactedPublication` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoReactedPublication({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      publicationId: // value for 'publicationId'
 *      observerId: // value for 'observerId'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useWhoReactedPublication(
  baseOptions: Apollo.QueryHookOptions<
    Operations.WhoReactedPublicationData,
    Operations.WhoReactedPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.WhoReactedPublicationData,
    Operations.WhoReactedPublicationVariables
  >(WhoReactedPublicationDocument, options);
}
export function useWhoReactedPublicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.WhoReactedPublicationData,
    Operations.WhoReactedPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.WhoReactedPublicationData,
    Operations.WhoReactedPublicationVariables
  >(WhoReactedPublicationDocument, options);
}
export type WhoReactedPublicationHookResult = ReturnType<typeof useWhoReactedPublication>;
export type WhoReactedPublicationLazyQueryHookResult = ReturnType<
  typeof useWhoReactedPublicationLazyQuery
>;
export type WhoReactedPublicationQueryResult = Apollo.QueryResult<
  Operations.WhoReactedPublicationData,
  Operations.WhoReactedPublicationVariables
>;
export const ReportPublicationDocument = /*#__PURE__*/ gql`
  mutation ReportPublication(
    $publicationId: InternalPublicationId!
    $reason: ReportingReasonInputParams!
    $additionalComments: String
  ) {
    reportPublication(
      request: {
        publicationId: $publicationId
        reason: $reason
        additionalComments: $additionalComments
      }
    )
  }
`;
export type ReportPublicationMutationFn = Apollo.MutationFunction<
  Operations.ReportPublicationData,
  Operations.ReportPublicationVariables
>;

/**
 * __useReportPublication__
 *
 * To run a mutation, you first call `useReportPublication` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportPublication` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportPublication, { data, loading, error }] = useReportPublication({
 *   variables: {
 *      publicationId: // value for 'publicationId'
 *      reason: // value for 'reason'
 *      additionalComments: // value for 'additionalComments'
 *   },
 * });
 */
export function useReportPublication(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.ReportPublicationData,
    Operations.ReportPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.ReportPublicationData,
    Operations.ReportPublicationVariables
  >(ReportPublicationDocument, options);
}
export type ReportPublicationHookResult = ReturnType<typeof useReportPublication>;
export type ReportPublicationMutationResult =
  Apollo.MutationResult<Operations.ReportPublicationData>;
export type ReportPublicationMutationOptions = Apollo.BaseMutationOptions<
  Operations.ReportPublicationData,
  Operations.ReportPublicationVariables
>;
export const GetPublicationRevenueDocument = /*#__PURE__*/ gql`
  query GetPublicationRevenue(
    $publicationId: InternalPublicationId!
    $observerId: ProfileId
    $sources: [Sources!]!
  ) {
    result: publicationRevenue(request: { publicationId: $publicationId }) {
      ...PublicationRevenue
    }
  }
  ${FragmentPublicationRevenue}
`;

/**
 * __useGetPublicationRevenue__
 *
 * To run a query within a React component, call `useGetPublicationRevenue` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicationRevenue` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicationRevenue({
 *   variables: {
 *      publicationId: // value for 'publicationId'
 *      observerId: // value for 'observerId'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useGetPublicationRevenue(
  baseOptions: Apollo.QueryHookOptions<
    Operations.GetPublicationRevenueData,
    Operations.GetPublicationRevenueVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.GetPublicationRevenueData,
    Operations.GetPublicationRevenueVariables
  >(GetPublicationRevenueDocument, options);
}
export function useGetPublicationRevenueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.GetPublicationRevenueData,
    Operations.GetPublicationRevenueVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.GetPublicationRevenueData,
    Operations.GetPublicationRevenueVariables
  >(GetPublicationRevenueDocument, options);
}
export type GetPublicationRevenueHookResult = ReturnType<typeof useGetPublicationRevenue>;
export type GetPublicationRevenueLazyQueryHookResult = ReturnType<
  typeof useGetPublicationRevenueLazyQuery
>;
export type GetPublicationRevenueQueryResult = Apollo.QueryResult<
  Operations.GetPublicationRevenueData,
  Operations.GetPublicationRevenueVariables
>;
export const GetProfilePublicationRevenueDocument = /*#__PURE__*/ gql`
  query GetProfilePublicationRevenue(
    $profileId: ProfileId!
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $publicationTypes: [PublicationTypes!]
    $sources: [Sources!]!
  ) {
    result: profilePublicationRevenue(
      request: {
        profileId: $profileId
        limit: $limit
        cursor: $cursor
        types: $publicationTypes
        sources: $sources
      }
    ) {
      items {
        ...PublicationRevenue
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentPublicationRevenue}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useGetProfilePublicationRevenue__
 *
 * To run a query within a React component, call `useGetProfilePublicationRevenue` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilePublicationRevenue` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfilePublicationRevenue({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      publicationTypes: // value for 'publicationTypes'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useGetProfilePublicationRevenue(
  baseOptions: Apollo.QueryHookOptions<
    Operations.GetProfilePublicationRevenueData,
    Operations.GetProfilePublicationRevenueVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.GetProfilePublicationRevenueData,
    Operations.GetProfilePublicationRevenueVariables
  >(GetProfilePublicationRevenueDocument, options);
}
export function useGetProfilePublicationRevenueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.GetProfilePublicationRevenueData,
    Operations.GetProfilePublicationRevenueVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.GetProfilePublicationRevenueData,
    Operations.GetProfilePublicationRevenueVariables
  >(GetProfilePublicationRevenueDocument, options);
}
export type GetProfilePublicationRevenueHookResult = ReturnType<
  typeof useGetProfilePublicationRevenue
>;
export type GetProfilePublicationRevenueLazyQueryHookResult = ReturnType<
  typeof useGetProfilePublicationRevenueLazyQuery
>;
export type GetProfilePublicationRevenueQueryResult = Apollo.QueryResult<
  Operations.GetProfilePublicationRevenueData,
  Operations.GetProfilePublicationRevenueVariables
>;
export const ProfileFollowRevenueDocument = /*#__PURE__*/ gql`
  query ProfileFollowRevenue($profileId: ProfileId!) {
    result: profileFollowRevenue(request: { profileId: $profileId }) {
      ...ProfileFollowRevenue
    }
  }
  ${FragmentProfileFollowRevenue}
`;

/**
 * __useProfileFollowRevenue__
 *
 * To run a query within a React component, call `useProfileFollowRevenue` and pass it any options that fit your needs.
 * When your component renders, `useProfileFollowRevenue` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileFollowRevenue({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useProfileFollowRevenue(
  baseOptions: Apollo.QueryHookOptions<
    Operations.ProfileFollowRevenueData,
    Operations.ProfileFollowRevenueVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.ProfileFollowRevenueData,
    Operations.ProfileFollowRevenueVariables
  >(ProfileFollowRevenueDocument, options);
}
export function useProfileFollowRevenueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.ProfileFollowRevenueData,
    Operations.ProfileFollowRevenueVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.ProfileFollowRevenueData,
    Operations.ProfileFollowRevenueVariables
  >(ProfileFollowRevenueDocument, options);
}
export type ProfileFollowRevenueHookResult = ReturnType<typeof useProfileFollowRevenue>;
export type ProfileFollowRevenueLazyQueryHookResult = ReturnType<
  typeof useProfileFollowRevenueLazyQuery
>;
export type ProfileFollowRevenueQueryResult = Apollo.QueryResult<
  Operations.ProfileFollowRevenueData,
  Operations.ProfileFollowRevenueVariables
>;
export const SearchPublicationsDocument = /*#__PURE__*/ gql`
  query SearchPublications(
    $limit: LimitScalar
    $cursor: Cursor
    $query: Search!
    $sources: [Sources!]!
    $observerId: ProfileId
  ) {
    result: search(
      request: {
        query: $query
        type: PUBLICATION
        limit: $limit
        cursor: $cursor
        sources: $sources
      }
    ) {
      ... on PublicationSearchResult {
        __typename
        items {
          ... on Post {
            ...Post
          }
          ... on Comment {
            ...Comment
          }
        }
        pageInfo {
          ...CommonPaginatedResultInfo
        }
      }
    }
  }
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useSearchPublications__
 *
 * To run a query within a React component, call `useSearchPublications` and pass it any options that fit your needs.
 * When your component renders, `useSearchPublications` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPublications({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      query: // value for 'query'
 *      sources: // value for 'sources'
 *      observerId: // value for 'observerId'
 *   },
 * });
 */
export function useSearchPublications(
  baseOptions: Apollo.QueryHookOptions<
    Operations.SearchPublicationsData,
    Operations.SearchPublicationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.SearchPublicationsData, Operations.SearchPublicationsVariables>(
    SearchPublicationsDocument,
    options,
  );
}
export function useSearchPublicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.SearchPublicationsData,
    Operations.SearchPublicationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.SearchPublicationsData,
    Operations.SearchPublicationsVariables
  >(SearchPublicationsDocument, options);
}
export type SearchPublicationsHookResult = ReturnType<typeof useSearchPublications>;
export type SearchPublicationsLazyQueryHookResult = ReturnType<
  typeof useSearchPublicationsLazyQuery
>;
export type SearchPublicationsQueryResult = Apollo.QueryResult<
  Operations.SearchPublicationsData,
  Operations.SearchPublicationsVariables
>;
export const SearchProfilesDocument = /*#__PURE__*/ gql`
  query SearchProfiles(
    $limit: LimitScalar!
    $cursor: Cursor
    $query: Search!
    $observerId: ProfileId
    $sources: [Sources!]!
  ) {
    result: search(request: { query: $query, type: PROFILE, limit: $limit, cursor: $cursor }) {
      ... on ProfileSearchResult {
        __typename
        items {
          ...Profile
        }
        pageInfo {
          ...CommonPaginatedResultInfo
        }
      }
    }
  }
  ${FragmentProfile}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useSearchProfiles__
 *
 * To run a query within a React component, call `useSearchProfiles` and pass it any options that fit your needs.
 * When your component renders, `useSearchProfiles` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProfiles({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      query: // value for 'query'
 *      observerId: // value for 'observerId'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useSearchProfiles(
  baseOptions: Apollo.QueryHookOptions<
    Operations.SearchProfilesData,
    Operations.SearchProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Operations.SearchProfilesData, Operations.SearchProfilesVariables>(
    SearchProfilesDocument,
    options,
  );
}
export function useSearchProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.SearchProfilesData,
    Operations.SearchProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Operations.SearchProfilesData, Operations.SearchProfilesVariables>(
    SearchProfilesDocument,
    options,
  );
}
export type SearchProfilesHookResult = ReturnType<typeof useSearchProfiles>;
export type SearchProfilesLazyQueryHookResult = ReturnType<typeof useSearchProfilesLazyQuery>;
export type SearchProfilesQueryResult = Apollo.QueryResult<
  Operations.SearchProfilesData,
  Operations.SearchProfilesVariables
>;
export const HasTxHashBeenIndexedDocument = /*#__PURE__*/ gql`
  query HasTxHashBeenIndexed($request: HasTxHashBeenIndexedRequest!) {
    result: hasTxHashBeenIndexed(request: $request) {
      ... on TransactionIndexedResult {
        ...TransactionIndexedResult
      }
      ... on TransactionError {
        ...TransactionError
      }
    }
  }
  ${FragmentTransactionIndexedResult}
  ${FragmentTransactionError}
`;

/**
 * __useHasTxHashBeenIndexed__
 *
 * To run a query within a React component, call `useHasTxHashBeenIndexed` and pass it any options that fit your needs.
 * When your component renders, `useHasTxHashBeenIndexed` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasTxHashBeenIndexed({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useHasTxHashBeenIndexed(
  baseOptions: Apollo.QueryHookOptions<
    Operations.HasTxHashBeenIndexedData,
    Operations.HasTxHashBeenIndexedVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.HasTxHashBeenIndexedData,
    Operations.HasTxHashBeenIndexedVariables
  >(HasTxHashBeenIndexedDocument, options);
}
export function useHasTxHashBeenIndexedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.HasTxHashBeenIndexedData,
    Operations.HasTxHashBeenIndexedVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.HasTxHashBeenIndexedData,
    Operations.HasTxHashBeenIndexedVariables
  >(HasTxHashBeenIndexedDocument, options);
}
export type HasTxHashBeenIndexedHookResult = ReturnType<typeof useHasTxHashBeenIndexed>;
export type HasTxHashBeenIndexedLazyQueryHookResult = ReturnType<
  typeof useHasTxHashBeenIndexedLazyQuery
>;
export type HasTxHashBeenIndexedQueryResult = Apollo.QueryResult<
  Operations.HasTxHashBeenIndexedData,
  Operations.HasTxHashBeenIndexedVariables
>;
export const BroadcastProtocolCallDocument = /*#__PURE__*/ gql`
  mutation BroadcastProtocolCall($request: BroadcastRequest!) {
    result: broadcast(request: $request) {
      ...RelayResult
    }
  }
  ${FragmentRelayResult}
`;
export type BroadcastProtocolCallMutationFn = Apollo.MutationFunction<
  Operations.BroadcastProtocolCallData,
  Operations.BroadcastProtocolCallVariables
>;

/**
 * __useBroadcastProtocolCall__
 *
 * To run a mutation, you first call `useBroadcastProtocolCall` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBroadcastProtocolCall` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [broadcastProtocolCall, { data, loading, error }] = useBroadcastProtocolCall({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBroadcastProtocolCall(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.BroadcastProtocolCallData,
    Operations.BroadcastProtocolCallVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.BroadcastProtocolCallData,
    Operations.BroadcastProtocolCallVariables
  >(BroadcastProtocolCallDocument, options);
}
export type BroadcastProtocolCallHookResult = ReturnType<typeof useBroadcastProtocolCall>;
export type BroadcastProtocolCallMutationResult =
  Apollo.MutationResult<Operations.BroadcastProtocolCallData>;
export type BroadcastProtocolCallMutationOptions = Apollo.BaseMutationOptions<
  Operations.BroadcastProtocolCallData,
  Operations.BroadcastProtocolCallVariables
>;
export const CreateUnfollowTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateUnfollowTypedData($request: UnfollowRequest!) {
    result: createUnfollowTypedData(request: $request) {
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
  ${FragmentEip712TypedDataDomain}
`;
export type CreateUnfollowTypedDataMutationFn = Apollo.MutationFunction<
  Operations.CreateUnfollowTypedDataData,
  Operations.CreateUnfollowTypedDataVariables
>;

/**
 * __useCreateUnfollowTypedData__
 *
 * To run a mutation, you first call `useCreateUnfollowTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnfollowTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnfollowTypedData, { data, loading, error }] = useCreateUnfollowTypedData({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateUnfollowTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    Operations.CreateUnfollowTypedDataData,
    Operations.CreateUnfollowTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Operations.CreateUnfollowTypedDataData,
    Operations.CreateUnfollowTypedDataVariables
  >(CreateUnfollowTypedDataDocument, options);
}
export type CreateUnfollowTypedDataHookResult = ReturnType<typeof useCreateUnfollowTypedData>;
export type CreateUnfollowTypedDataMutationResult =
  Apollo.MutationResult<Operations.CreateUnfollowTypedDataData>;
export type CreateUnfollowTypedDataMutationOptions = Apollo.BaseMutationOptions<
  Operations.CreateUnfollowTypedDataData,
  Operations.CreateUnfollowTypedDataVariables
>;
export const WalletCollectedPublicationsDocument = /*#__PURE__*/ gql`
  query WalletCollectedPublications(
    $observerId: ProfileId
    $walletAddress: EthereumAddress!
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
  ) {
    result: publications(
      request: {
        collectedBy: $walletAddress
        limit: $limit
        cursor: $cursor
        publicationTypes: [POST, COMMENT]
        sources: $sources
      }
    ) {
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
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
  ${FragmentCommonPaginatedResultInfo}
`;

/**
 * __useWalletCollectedPublications__
 *
 * To run a query within a React component, call `useWalletCollectedPublications` and pass it any options that fit your needs.
 * When your component renders, `useWalletCollectedPublications` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletCollectedPublications({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      walletAddress: // value for 'walletAddress'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useWalletCollectedPublications(
  baseOptions: Apollo.QueryHookOptions<
    Operations.WalletCollectedPublicationsData,
    Operations.WalletCollectedPublicationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Operations.WalletCollectedPublicationsData,
    Operations.WalletCollectedPublicationsVariables
  >(WalletCollectedPublicationsDocument, options);
}
export function useWalletCollectedPublicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Operations.WalletCollectedPublicationsData,
    Operations.WalletCollectedPublicationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Operations.WalletCollectedPublicationsData,
    Operations.WalletCollectedPublicationsVariables
  >(WalletCollectedPublicationsDocument, options);
}
export type WalletCollectedPublicationsHookResult = ReturnType<
  typeof useWalletCollectedPublications
>;
export type WalletCollectedPublicationsLazyQueryHookResult = ReturnType<
  typeof useWalletCollectedPublicationsLazyQuery
>;
export type WalletCollectedPublicationsQueryResult = Apollo.QueryResult<
  Operations.WalletCollectedPublicationsData,
  Operations.WalletCollectedPublicationsVariables
>;
export type AaveFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'contractAddress'
  | 'endTimestamp'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | 'type'
  | AaveFeeCollectModuleSettingsKeySpecifier
)[];
export type AaveFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  endTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AccessConditionOutputKeySpecifier = (
  | 'and'
  | 'collect'
  | 'eoa'
  | 'follow'
  | 'nft'
  | 'or'
  | 'profile'
  | 'token'
  | AccessConditionOutputKeySpecifier
)[];
export type AccessConditionOutputFieldPolicy = {
  and?: FieldPolicy<any> | FieldReadFunction<any>;
  collect?: FieldPolicy<any> | FieldReadFunction<any>;
  eoa?: FieldPolicy<any> | FieldReadFunction<any>;
  follow?: FieldPolicy<any> | FieldReadFunction<any>;
  nft?: FieldPolicy<any> | FieldReadFunction<any>;
  or?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AndConditionOutputKeySpecifier = ('criteria' | AndConditionOutputKeySpecifier)[];
export type AndConditionOutputFieldPolicy = {
  criteria?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ApprovedAllowanceAmountKeySpecifier = (
  | 'allowance'
  | 'contractAddress'
  | 'currency'
  | 'module'
  | ApprovedAllowanceAmountKeySpecifier
)[];
export type ApprovedAllowanceAmountFieldPolicy = {
  allowance?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  module?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AttributeKeySpecifier = (
  | 'displayType'
  | 'key'
  | 'traitType'
  | 'value'
  | AttributeKeySpecifier
)[];
export type AttributeFieldPolicy = {
  displayType?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  traitType?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuthChallengeResultKeySpecifier = ('text' | AuthChallengeResultKeySpecifier)[];
export type AuthChallengeResultFieldPolicy = {
  text?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuthenticationResultKeySpecifier = (
  | 'accessToken'
  | 'refreshToken'
  | AuthenticationResultKeySpecifier
)[];
export type AuthenticationResultFieldPolicy = {
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CanCommentResponseKeySpecifier = ('result' | CanCommentResponseKeySpecifier)[];
export type CanCommentResponseFieldPolicy = {
  result?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CanDecryptResponseKeySpecifier = (
  | 'extraDetails'
  | 'reasons'
  | 'result'
  | CanDecryptResponseKeySpecifier
)[];
export type CanDecryptResponseFieldPolicy = {
  extraDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  reasons?: FieldPolicy<any> | FieldReadFunction<any>;
  result?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CanMirrorResponseKeySpecifier = ('result' | CanMirrorResponseKeySpecifier)[];
export type CanMirrorResponseFieldPolicy = {
  result?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ClaimableHandlesKeySpecifier = (
  | 'canClaimFreeTextHandle'
  | 'reservedHandles'
  | ClaimableHandlesKeySpecifier
)[];
export type ClaimableHandlesFieldPolicy = {
  canClaimFreeTextHandle?: FieldPolicy<any> | FieldReadFunction<any>;
  reservedHandles?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectConditionOutputKeySpecifier = (
  | 'publicationId'
  | 'thisPublication'
  | CollectConditionOutputKeySpecifier
)[];
export type CollectConditionOutputFieldPolicy = {
  publicationId?: FieldPolicy<any> | FieldReadFunction<any>;
  thisPublication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectedEventKeySpecifier = ('profile' | 'timestamp' | CollectedEventKeySpecifier)[];
export type CollectedEventFieldPolicy = {
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommentKeySpecifier = (
  | 'appId'
  | 'canComment'
  | 'canDecrypt'
  | 'canMirror'
  | 'collectModule'
  | 'collectNftAddress'
  | 'collectPolicy'
  | 'collectedBy'
  | 'commentOn'
  | 'createdAt'
  | 'dataAvailabilityProofs'
  | 'decryptionCriteria'
  | 'firstComment'
  | 'hasCollectedByMe'
  | 'hasOptimisticCollectedByMe'
  | 'hidden'
  | 'id'
  | 'isDataAvailability'
  | 'isGated'
  | 'isOptimisticMirroredByMe'
  | 'mainPost'
  | 'metadata'
  | 'mirrors'
  | 'onChainContentURI'
  | 'profile'
  | 'rankingScore'
  | 'reaction'
  | 'referenceModule'
  | 'referencePolicy'
  | 'stats'
  | CommentKeySpecifier
)[];
export type CommentFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  canComment?: FieldPolicy<any> | FieldReadFunction<any>;
  canDecrypt?: FieldPolicy<any> | FieldReadFunction<any>;
  canMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  collectPolicy?: FieldPolicy<any> | FieldReadFunction<any>;
  collectedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  commentOn?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilityProofs?: FieldPolicy<any> | FieldReadFunction<any>;
  decryptionCriteria?: FieldPolicy<any> | FieldReadFunction<any>;
  firstComment?: FieldPolicy<any> | FieldReadFunction<any>;
  hasCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hasOptimisticCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isDataAvailability?: FieldPolicy<any> | FieldReadFunction<any>;
  isGated?: FieldPolicy<any> | FieldReadFunction<any>;
  isOptimisticMirroredByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  mainPost?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  onChainContentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  rankingScore?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referencePolicy?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateBurnEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateBurnEIP712TypedDataKeySpecifier
)[];
export type CreateBurnEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateBurnEIP712TypedDataTypesKeySpecifier = (
  | 'BurnWithSig'
  | CreateBurnEIP712TypedDataTypesKeySpecifier
)[];
export type CreateBurnEIP712TypedDataTypesFieldPolicy = {
  BurnWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateBurnEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'nonce'
  | 'tokenId'
  | CreateBurnEIP712TypedDataValueKeySpecifier
)[];
export type CreateBurnEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateBurnProfileBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateBurnProfileBroadcastItemResultKeySpecifier
)[];
export type CreateBurnProfileBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCollectBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateCollectBroadcastItemResultKeySpecifier
)[];
export type CreateCollectBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCollectEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateCollectEIP712TypedDataKeySpecifier
)[];
export type CreateCollectEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCollectEIP712TypedDataTypesKeySpecifier = (
  | 'CollectWithSig'
  | CreateCollectEIP712TypedDataTypesKeySpecifier
)[];
export type CreateCollectEIP712TypedDataTypesFieldPolicy = {
  CollectWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCollectEIP712TypedDataValueKeySpecifier = (
  | 'data'
  | 'deadline'
  | 'nonce'
  | 'profileId'
  | 'pubId'
  | CreateCollectEIP712TypedDataValueKeySpecifier
)[];
export type CreateCollectEIP712TypedDataValueFieldPolicy = {
  data?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  pubId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCommentBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateCommentBroadcastItemResultKeySpecifier
)[];
export type CreateCommentBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCommentEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateCommentEIP712TypedDataKeySpecifier
)[];
export type CreateCommentEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCommentEIP712TypedDataTypesKeySpecifier = (
  | 'CommentWithSig'
  | CreateCommentEIP712TypedDataTypesKeySpecifier
)[];
export type CreateCommentEIP712TypedDataTypesFieldPolicy = {
  CommentWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCommentEIP712TypedDataValueKeySpecifier = (
  | 'collectModule'
  | 'collectModuleInitData'
  | 'contentURI'
  | 'deadline'
  | 'nonce'
  | 'profileId'
  | 'profileIdPointed'
  | 'pubIdPointed'
  | 'referenceModule'
  | 'referenceModuleData'
  | 'referenceModuleInitData'
  | CreateCommentEIP712TypedDataValueKeySpecifier
)[];
export type CreateCommentEIP712TypedDataValueFieldPolicy = {
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  profileIdPointed?: FieldPolicy<any> | FieldReadFunction<any>;
  pubIdPointed?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateDataAvailabilityPublicationResultKeySpecifier = (
  | 'dataAvailabilityId'
  | 'id'
  | 'proofs'
  | CreateDataAvailabilityPublicationResultKeySpecifier
)[];
export type CreateDataAvailabilityPublicationResultFieldPolicy = {
  dataAvailabilityId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  proofs?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateFollowBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateFollowBroadcastItemResultKeySpecifier
)[];
export type CreateFollowBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateFollowEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateFollowEIP712TypedDataKeySpecifier
)[];
export type CreateFollowEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateFollowEIP712TypedDataTypesKeySpecifier = (
  | 'FollowWithSig'
  | CreateFollowEIP712TypedDataTypesKeySpecifier
)[];
export type CreateFollowEIP712TypedDataTypesFieldPolicy = {
  FollowWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateFollowEIP712TypedDataValueKeySpecifier = (
  | 'datas'
  | 'deadline'
  | 'nonce'
  | 'profileIds'
  | CreateFollowEIP712TypedDataValueKeySpecifier
)[];
export type CreateFollowEIP712TypedDataValueFieldPolicy = {
  datas?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMirrorBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateMirrorBroadcastItemResultKeySpecifier
)[];
export type CreateMirrorBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMirrorEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateMirrorEIP712TypedDataKeySpecifier
)[];
export type CreateMirrorEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMirrorEIP712TypedDataTypesKeySpecifier = (
  | 'MirrorWithSig'
  | CreateMirrorEIP712TypedDataTypesKeySpecifier
)[];
export type CreateMirrorEIP712TypedDataTypesFieldPolicy = {
  MirrorWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMirrorEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'nonce'
  | 'profileId'
  | 'profileIdPointed'
  | 'pubIdPointed'
  | 'referenceModule'
  | 'referenceModuleData'
  | 'referenceModuleInitData'
  | CreateMirrorEIP712TypedDataValueKeySpecifier
)[];
export type CreateMirrorEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  profileIdPointed?: FieldPolicy<any> | FieldReadFunction<any>;
  pubIdPointed?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePostBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreatePostBroadcastItemResultKeySpecifier
)[];
export type CreatePostBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePostEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreatePostEIP712TypedDataKeySpecifier
)[];
export type CreatePostEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePostEIP712TypedDataTypesKeySpecifier = (
  | 'PostWithSig'
  | CreatePostEIP712TypedDataTypesKeySpecifier
)[];
export type CreatePostEIP712TypedDataTypesFieldPolicy = {
  PostWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePostEIP712TypedDataValueKeySpecifier = (
  | 'collectModule'
  | 'collectModuleInitData'
  | 'contentURI'
  | 'deadline'
  | 'nonce'
  | 'profileId'
  | 'referenceModule'
  | 'referenceModuleInitData'
  | CreatePostEIP712TypedDataValueKeySpecifier
)[];
export type CreatePostEIP712TypedDataValueFieldPolicy = {
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetDispatcherBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateSetDispatcherBroadcastItemResultKeySpecifier
)[];
export type CreateSetDispatcherBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetDispatcherEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateSetDispatcherEIP712TypedDataKeySpecifier
)[];
export type CreateSetDispatcherEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetDispatcherEIP712TypedDataTypesKeySpecifier = (
  | 'SetDispatcherWithSig'
  | CreateSetDispatcherEIP712TypedDataTypesKeySpecifier
)[];
export type CreateSetDispatcherEIP712TypedDataTypesFieldPolicy = {
  SetDispatcherWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetDispatcherEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'dispatcher'
  | 'nonce'
  | 'profileId'
  | CreateSetDispatcherEIP712TypedDataValueKeySpecifier
)[];
export type CreateSetDispatcherEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  dispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowModuleBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateSetFollowModuleBroadcastItemResultKeySpecifier
)[];
export type CreateSetFollowModuleBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowModuleEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateSetFollowModuleEIP712TypedDataKeySpecifier
)[];
export type CreateSetFollowModuleEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowModuleEIP712TypedDataTypesKeySpecifier = (
  | 'SetFollowModuleWithSig'
  | CreateSetFollowModuleEIP712TypedDataTypesKeySpecifier
)[];
export type CreateSetFollowModuleEIP712TypedDataTypesFieldPolicy = {
  SetFollowModuleWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowModuleEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'followModule'
  | 'followModuleInitData'
  | 'nonce'
  | 'profileId'
  | CreateSetFollowModuleEIP712TypedDataValueKeySpecifier
)[];
export type CreateSetFollowModuleEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  followModule?: FieldPolicy<any> | FieldReadFunction<any>;
  followModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowNFTUriBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateSetFollowNFTUriBroadcastItemResultKeySpecifier
)[];
export type CreateSetFollowNFTUriBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowNFTUriEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateSetFollowNFTUriEIP712TypedDataKeySpecifier
)[];
export type CreateSetFollowNFTUriEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowNFTUriEIP712TypedDataTypesKeySpecifier = (
  | 'SetFollowNFTURIWithSig'
  | CreateSetFollowNFTUriEIP712TypedDataTypesKeySpecifier
)[];
export type CreateSetFollowNFTUriEIP712TypedDataTypesFieldPolicy = {
  SetFollowNFTURIWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowNFTUriEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'followNFTURI'
  | 'nonce'
  | 'profileId'
  | CreateSetFollowNFTUriEIP712TypedDataValueKeySpecifier
)[];
export type CreateSetFollowNFTUriEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  followNFTURI?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileImageUriBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateSetProfileImageUriBroadcastItemResultKeySpecifier
)[];
export type CreateSetProfileImageUriBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileImageUriEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateSetProfileImageUriEIP712TypedDataKeySpecifier
)[];
export type CreateSetProfileImageUriEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileImageUriEIP712TypedDataTypesKeySpecifier = (
  | 'SetProfileImageURIWithSig'
  | CreateSetProfileImageUriEIP712TypedDataTypesKeySpecifier
)[];
export type CreateSetProfileImageUriEIP712TypedDataTypesFieldPolicy = {
  SetProfileImageURIWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileImageUriEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'imageURI'
  | 'nonce'
  | 'profileId'
  | CreateSetProfileImageUriEIP712TypedDataValueKeySpecifier
)[];
export type CreateSetProfileImageUriEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  imageURI?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileMetadataURIBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateSetProfileMetadataURIBroadcastItemResultKeySpecifier
)[];
export type CreateSetProfileMetadataURIBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileMetadataURIEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateSetProfileMetadataURIEIP712TypedDataKeySpecifier
)[];
export type CreateSetProfileMetadataURIEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileMetadataURIEIP712TypedDataTypesKeySpecifier = (
  | 'SetProfileMetadataURIWithSig'
  | CreateSetProfileMetadataURIEIP712TypedDataTypesKeySpecifier
)[];
export type CreateSetProfileMetadataURIEIP712TypedDataTypesFieldPolicy = {
  SetProfileMetadataURIWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileMetadataURIEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'metadata'
  | 'nonce'
  | 'profileId'
  | CreateSetProfileMetadataURIEIP712TypedDataValueKeySpecifier
)[];
export type CreateSetProfileMetadataURIEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateToggleFollowBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateToggleFollowBroadcastItemResultKeySpecifier
)[];
export type CreateToggleFollowBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateToggleFollowEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateToggleFollowEIP712TypedDataKeySpecifier
)[];
export type CreateToggleFollowEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateToggleFollowEIP712TypedDataTypesKeySpecifier = (
  | 'ToggleFollowWithSig'
  | CreateToggleFollowEIP712TypedDataTypesKeySpecifier
)[];
export type CreateToggleFollowEIP712TypedDataTypesFieldPolicy = {
  ToggleFollowWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateToggleFollowEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'enables'
  | 'nonce'
  | 'profileIds'
  | CreateToggleFollowEIP712TypedDataValueKeySpecifier
)[];
export type CreateToggleFollowEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  enables?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateUnfollowBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateUnfollowBroadcastItemResultKeySpecifier
)[];
export type CreateUnfollowBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DegreesOfSeparationReferenceModuleSettingsKeySpecifier = (
  | 'commentsRestricted'
  | 'contractAddress'
  | 'degreesOfSeparation'
  | 'mirrorsRestricted'
  | 'type'
  | DegreesOfSeparationReferenceModuleSettingsKeySpecifier
)[];
export type DegreesOfSeparationReferenceModuleSettingsFieldPolicy = {
  commentsRestricted?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  degreesOfSeparation?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorsRestricted?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DispatcherKeySpecifier = ('address' | 'canUseRelay' | DispatcherKeySpecifier)[];
export type DispatcherFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  canUseRelay?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DoesFollowResponseKeySpecifier = (
  | 'followerAddress'
  | 'follows'
  | 'isFinalisedOnChain'
  | 'profileId'
  | DoesFollowResponseKeySpecifier
)[];
export type DoesFollowResponseFieldPolicy = {
  followerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  follows?: FieldPolicy<any> | FieldReadFunction<any>;
  isFinalisedOnChain?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EIP712TypedDataDomainKeySpecifier = (
  | 'chainId'
  | 'name'
  | 'verifyingContract'
  | 'version'
  | EIP712TypedDataDomainKeySpecifier
)[];
export type EIP712TypedDataDomainFieldPolicy = {
  chainId?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  verifyingContract?: FieldPolicy<any> | FieldReadFunction<any>;
  version?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EIP712TypedDataFieldKeySpecifier = (
  | 'name'
  | 'type'
  | EIP712TypedDataFieldKeySpecifier
)[];
export type EIP712TypedDataFieldFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ERC4626FeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'contractAddress'
  | 'endTimestamp'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | 'type'
  | 'vault'
  | ERC4626FeeCollectModuleSettingsKeySpecifier
)[];
export type ERC4626FeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  endTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  vault?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ElectedMirrorKeySpecifier = (
  | 'mirrorId'
  | 'profile'
  | 'timestamp'
  | ElectedMirrorKeySpecifier
)[];
export type ElectedMirrorFieldPolicy = {
  mirrorId?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EnabledModuleKeySpecifier = (
  | 'contractAddress'
  | 'inputParams'
  | 'moduleName'
  | 'redeemParams'
  | 'returnDataParms'
  | EnabledModuleKeySpecifier
)[];
export type EnabledModuleFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  inputParams?: FieldPolicy<any> | FieldReadFunction<any>;
  moduleName?: FieldPolicy<any> | FieldReadFunction<any>;
  redeemParams?: FieldPolicy<any> | FieldReadFunction<any>;
  returnDataParms?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EnabledModulesKeySpecifier = (
  | 'collectModules'
  | 'followModules'
  | 'referenceModules'
  | EnabledModulesKeySpecifier
)[];
export type EnabledModulesFieldPolicy = {
  collectModules?: FieldPolicy<any> | FieldReadFunction<any>;
  followModules?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModules?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptedFieldsOutputKeySpecifier = (
  | 'animation_url'
  | 'content'
  | 'external_url'
  | 'image'
  | 'media'
  | EncryptedFieldsOutputKeySpecifier
)[];
export type EncryptedFieldsOutputFieldPolicy = {
  animation_url?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  external_url?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  media?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptedMediaKeySpecifier = (
  | 'altTag'
  | 'cover'
  | 'height'
  | 'mimeType'
  | 'size'
  | 'url'
  | 'width'
  | EncryptedMediaKeySpecifier
)[];
export type EncryptedMediaFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  size?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  width?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptedMediaSetKeySpecifier = (
  | 'medium'
  | 'original'
  | 'small'
  | EncryptedMediaSetKeySpecifier
)[];
export type EncryptedMediaSetFieldPolicy = {
  medium?: FieldPolicy<any> | FieldReadFunction<any>;
  original?: FieldPolicy<any> | FieldReadFunction<any>;
  small?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptionParamsOutputKeySpecifier = (
  | 'accessCondition'
  | 'encryptedFields'
  | 'encryptionProvider'
  | 'providerSpecificParams'
  | EncryptionParamsOutputKeySpecifier
)[];
export type EncryptionParamsOutputFieldPolicy = {
  accessCondition?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedFields?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptionProvider?: FieldPolicy<any> | FieldReadFunction<any>;
  providerSpecificParams?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EnsOnChainIdentityKeySpecifier = ('name' | EnsOnChainIdentityKeySpecifier)[];
export type EnsOnChainIdentityFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EoaOwnershipOutputKeySpecifier = ('address' | EoaOwnershipOutputKeySpecifier)[];
export type EoaOwnershipOutputFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type Erc20KeySpecifier = ('address' | 'decimals' | 'name' | 'symbol' | Erc20KeySpecifier)[];
export type Erc20FieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  decimals?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  symbol?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type Erc20AmountKeySpecifier = ('asset' | 'value' | Erc20AmountKeySpecifier)[];
export type Erc20AmountFieldPolicy = {
  asset?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type Erc20OwnershipOutputKeySpecifier = (
  | 'amount'
  | 'chainID'
  | 'condition'
  | 'contractAddress'
  | 'decimals'
  | 'name'
  | 'symbol'
  | Erc20OwnershipOutputKeySpecifier
)[];
export type Erc20OwnershipOutputFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  chainID?: FieldPolicy<any> | FieldReadFunction<any>;
  condition?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  decimals?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  symbol?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExploreProfileResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | ExploreProfileResultKeySpecifier
)[];
export type ExploreProfileResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExplorePublicationResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | ExplorePublicationResultKeySpecifier
)[];
export type ExplorePublicationResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'contractAddress'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | 'type'
  | FeeCollectModuleSettingsKeySpecifier
)[];
export type FeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FeeFollowModuleSettingsKeySpecifier = (
  | 'amount'
  | 'contractAddress'
  | 'recipient'
  | 'type'
  | FeeFollowModuleSettingsKeySpecifier
)[];
export type FeeFollowModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FeedItemKeySpecifier = (
  | 'collects'
  | 'comments'
  | 'electedMirror'
  | 'mirrors'
  | 'reactions'
  | 'root'
  | FeedItemKeySpecifier
)[];
export type FeedItemFieldPolicy = {
  collects?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  electedMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  reactions?: FieldPolicy<any> | FieldReadFunction<any>;
  root?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowConditionOutputKeySpecifier = ('profileId' | FollowConditionOutputKeySpecifier)[];
export type FollowConditionOutputFieldPolicy = {
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowOnlyReferenceModuleSettingsKeySpecifier = (
  | 'contractAddress'
  | 'type'
  | FollowOnlyReferenceModuleSettingsKeySpecifier
)[];
export type FollowOnlyReferenceModuleSettingsFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowRevenueResultKeySpecifier = ('revenues' | FollowRevenueResultKeySpecifier)[];
export type FollowRevenueResultFieldPolicy = {
  revenues?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowerKeySpecifier = (
  | 'totalAmountOfTimesFollowed'
  | 'wallet'
  | FollowerKeySpecifier
)[];
export type FollowerFieldPolicy = {
  totalAmountOfTimesFollowed?: FieldPolicy<any> | FieldReadFunction<any>;
  wallet?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowerNftOwnedTokenIdsKeySpecifier = (
  | 'followerNftAddress'
  | 'tokensIds'
  | FollowerNftOwnedTokenIdsKeySpecifier
)[];
export type FollowerNftOwnedTokenIdsFieldPolicy = {
  followerNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  tokensIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowingKeySpecifier = (
  | 'profile'
  | 'totalAmountOfTimesFollowing'
  | FollowingKeySpecifier
)[];
export type FollowingFieldPolicy = {
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  totalAmountOfTimesFollowing?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FreeCollectModuleSettingsKeySpecifier = (
  | 'contractAddress'
  | 'followerOnly'
  | 'type'
  | FreeCollectModuleSettingsKeySpecifier
)[];
export type FreeCollectModuleSettingsFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenerateModuleCurrencyApprovalKeySpecifier = (
  | 'data'
  | 'from'
  | 'to'
  | GenerateModuleCurrencyApprovalKeySpecifier
)[];
export type GenerateModuleCurrencyApprovalFieldPolicy = {
  data?: FieldPolicy<any> | FieldReadFunction<any>;
  from?: FieldPolicy<any> | FieldReadFunction<any>;
  to?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GlobalProtocolStatsKeySpecifier = (
  | 'totalBurntProfiles'
  | 'totalCollects'
  | 'totalComments'
  | 'totalFollows'
  | 'totalMirrors'
  | 'totalPosts'
  | 'totalProfiles'
  | 'totalRevenue'
  | GlobalProtocolStatsKeySpecifier
)[];
export type GlobalProtocolStatsFieldPolicy = {
  totalBurntProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCollects?: FieldPolicy<any> | FieldReadFunction<any>;
  totalComments?: FieldPolicy<any> | FieldReadFunction<any>;
  totalFollows?: FieldPolicy<any> | FieldReadFunction<any>;
  totalMirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  totalPosts?: FieldPolicy<any> | FieldReadFunction<any>;
  totalProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  totalRevenue?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LimitedFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'contractAddress'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | 'type'
  | LimitedFeeCollectModuleSettingsKeySpecifier
)[];
export type LimitedFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LimitedTimedFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'contractAddress'
  | 'endTimestamp'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | 'type'
  | LimitedTimedFeeCollectModuleSettingsKeySpecifier
)[];
export type LimitedTimedFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  endTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LogKeySpecifier = (
  | 'address'
  | 'blockHash'
  | 'blockNumber'
  | 'data'
  | 'logIndex'
  | 'removed'
  | 'topics'
  | 'transactionHash'
  | 'transactionIndex'
  | LogKeySpecifier
)[];
export type LogFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  blockHash?: FieldPolicy<any> | FieldReadFunction<any>;
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
  logIndex?: FieldPolicy<any> | FieldReadFunction<any>;
  removed?: FieldPolicy<any> | FieldReadFunction<any>;
  topics?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionHash?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionIndex?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MediaKeySpecifier = (
  | 'altTag'
  | 'cover'
  | 'height'
  | 'mimeType'
  | 'size'
  | 'url'
  | 'width'
  | MediaKeySpecifier
)[];
export type MediaFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  size?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  width?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MediaOutputKeySpecifier = (
  | 'altTag'
  | 'cover'
  | 'item'
  | 'source'
  | 'type'
  | MediaOutputKeySpecifier
)[];
export type MediaOutputFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  item?: FieldPolicy<any> | FieldReadFunction<any>;
  source?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MediaSetKeySpecifier = ('medium' | 'original' | 'small' | MediaSetKeySpecifier)[];
export type MediaSetFieldPolicy = {
  medium?: FieldPolicy<any> | FieldReadFunction<any>;
  original?: FieldPolicy<any> | FieldReadFunction<any>;
  small?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MetadataAttributeOutputKeySpecifier = (
  | 'displayType'
  | 'traitType'
  | 'value'
  | MetadataAttributeOutputKeySpecifier
)[];
export type MetadataAttributeOutputFieldPolicy = {
  displayType?: FieldPolicy<any> | FieldReadFunction<any>;
  traitType?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MetadataOutputKeySpecifier = (
  | 'animatedUrl'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'cover'
  | 'description'
  | 'encryptionParams'
  | 'image'
  | 'locale'
  | 'mainContentFocus'
  | 'media'
  | 'name'
  | 'tags'
  | MetadataOutputKeySpecifier
)[];
export type MetadataOutputFieldPolicy = {
  animatedUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptionParams?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  mainContentFocus?: FieldPolicy<any> | FieldReadFunction<any>;
  media?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MirrorKeySpecifier = (
  | 'appId'
  | 'canComment'
  | 'canDecrypt'
  | 'canMirror'
  | 'collectModule'
  | 'collectNftAddress'
  | 'createdAt'
  | 'dataAvailabilityProofs'
  | 'hasCollectedByMe'
  | 'hidden'
  | 'id'
  | 'isDataAvailability'
  | 'isGated'
  | 'metadata'
  | 'mirrorOf'
  | 'onChainContentURI'
  | 'profile'
  | 'reaction'
  | 'referenceModule'
  | 'stats'
  | MirrorKeySpecifier
)[];
export type MirrorFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  canComment?: FieldPolicy<any> | FieldReadFunction<any>;
  canDecrypt?: FieldPolicy<any> | FieldReadFunction<any>;
  canMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilityProofs?: FieldPolicy<any> | FieldReadFunction<any>;
  hasCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isDataAvailability?: FieldPolicy<any> | FieldReadFunction<any>;
  isGated?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorOf?: FieldPolicy<any> | FieldReadFunction<any>;
  onChainContentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MirrorEventKeySpecifier = ('profile' | 'timestamp' | MirrorEventKeySpecifier)[];
export type MirrorEventFieldPolicy = {
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ModuleFeeAmountKeySpecifier = ('asset' | 'value' | ModuleFeeAmountKeySpecifier)[];
export type ModuleFeeAmountFieldPolicy = {
  asset?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ModuleInfoKeySpecifier = ('name' | 'type' | ModuleInfoKeySpecifier)[];
export type ModuleInfoFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MultirecipientFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'contractAddress'
  | 'endTimestamp'
  | 'followerOnly'
  | 'recipients'
  | 'referralFee'
  | 'type'
  | MultirecipientFeeCollectModuleSettingsKeySpecifier
)[];
export type MultirecipientFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  endTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipients?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | 'ach'
  | 'addProfileInterests'
  | 'addReaction'
  | 'authenticate'
  | 'broadcast'
  | 'broadcastDataAvailability'
  | 'claim'
  | 'createAttachMediaData'
  | 'createBurnProfileTypedData'
  | 'createCollectTypedData'
  | 'createCommentTypedData'
  | 'createCommentViaDispatcher'
  | 'createDataAvailabilityCommentTypedData'
  | 'createDataAvailabilityCommentViaDispatcher'
  | 'createDataAvailabilityMirrorTypedData'
  | 'createDataAvailabilityMirrorViaDispatcher'
  | 'createDataAvailabilityPostTypedData'
  | 'createDataAvailabilityPostViaDispatcher'
  | 'createFollowTypedData'
  | 'createMirrorTypedData'
  | 'createMirrorViaDispatcher'
  | 'createNftGallery'
  | 'createPostTypedData'
  | 'createPostViaDispatcher'
  | 'createProfile'
  | 'createSetDefaultProfileTypedData'
  | 'createSetDispatcherTypedData'
  | 'createSetFollowModuleTypedData'
  | 'createSetFollowNFTUriTypedData'
  | 'createSetFollowNFTUriViaDispatcher'
  | 'createSetProfileImageURITypedData'
  | 'createSetProfileImageURIViaDispatcher'
  | 'createSetProfileMetadataTypedData'
  | 'createSetProfileMetadataViaDispatcher'
  | 'createToggleFollowTypedData'
  | 'createUnfollowTypedData'
  | 'deleteNftGallery'
  | 'dismissRecommendedProfiles'
  | 'gci'
  | 'gcr'
  | 'gdi'
  | 'hel'
  | 'hidePublication'
  | 'idKitPhoneVerifyWebhook'
  | 'proxyAction'
  | 'refresh'
  | 'removeProfileInterests'
  | 'removeReaction'
  | 'reportPublication'
  | 'updateNftGalleryInfo'
  | 'updateNftGalleryItems'
  | 'updateNftGalleryOrder'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  ach?: FieldPolicy<any> | FieldReadFunction<any>;
  addProfileInterests?: FieldPolicy<any> | FieldReadFunction<any>;
  addReaction?: FieldPolicy<any> | FieldReadFunction<any>;
  authenticate?: FieldPolicy<any> | FieldReadFunction<any>;
  broadcast?: FieldPolicy<any> | FieldReadFunction<any>;
  broadcastDataAvailability?: FieldPolicy<any> | FieldReadFunction<any>;
  claim?: FieldPolicy<any> | FieldReadFunction<any>;
  createAttachMediaData?: FieldPolicy<any> | FieldReadFunction<any>;
  createBurnProfileTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createCollectTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createCommentTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createCommentViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createDataAvailabilityCommentTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createDataAvailabilityCommentViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createDataAvailabilityMirrorTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createDataAvailabilityMirrorViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createDataAvailabilityPostTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createDataAvailabilityPostViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createFollowTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createMirrorTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createMirrorViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createNftGallery?: FieldPolicy<any> | FieldReadFunction<any>;
  createPostTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createPostViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetDefaultProfileTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetDispatcherTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetFollowModuleTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetFollowNFTUriTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetFollowNFTUriViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetProfileImageURITypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetProfileImageURIViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetProfileMetadataTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetProfileMetadataViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createToggleFollowTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createUnfollowTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteNftGallery?: FieldPolicy<any> | FieldReadFunction<any>;
  dismissRecommendedProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  gci?: FieldPolicy<any> | FieldReadFunction<any>;
  gcr?: FieldPolicy<any> | FieldReadFunction<any>;
  gdi?: FieldPolicy<any> | FieldReadFunction<any>;
  hel?: FieldPolicy<any> | FieldReadFunction<any>;
  hidePublication?: FieldPolicy<any> | FieldReadFunction<any>;
  idKitPhoneVerifyWebhook?: FieldPolicy<any> | FieldReadFunction<any>;
  proxyAction?: FieldPolicy<any> | FieldReadFunction<any>;
  refresh?: FieldPolicy<any> | FieldReadFunction<any>;
  removeProfileInterests?: FieldPolicy<any> | FieldReadFunction<any>;
  removeReaction?: FieldPolicy<any> | FieldReadFunction<any>;
  reportPublication?: FieldPolicy<any> | FieldReadFunction<any>;
  updateNftGalleryInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  updateNftGalleryItems?: FieldPolicy<any> | FieldReadFunction<any>;
  updateNftGalleryOrder?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NFTKeySpecifier = (
  | 'chainId'
  | 'collectionName'
  | 'contentURI'
  | 'contractAddress'
  | 'contractName'
  | 'description'
  | 'ercType'
  | 'name'
  | 'originalContent'
  | 'owners'
  | 'symbol'
  | 'tokenId'
  | NFTKeySpecifier
)[];
export type NFTFieldPolicy = {
  chainId?: FieldPolicy<any> | FieldReadFunction<any>;
  collectionName?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  contractName?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  ercType?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  originalContent?: FieldPolicy<any> | FieldReadFunction<any>;
  owners?: FieldPolicy<any> | FieldReadFunction<any>;
  symbol?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NFTContentKeySpecifier = (
  | 'animatedUrl'
  | 'metaType'
  | 'uri'
  | NFTContentKeySpecifier
)[];
export type NFTContentFieldPolicy = {
  animatedUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  metaType?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NFTsResultKeySpecifier = ('items' | 'pageInfo' | NFTsResultKeySpecifier)[];
export type NFTsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewCollectNotificationKeySpecifier = (
  | 'collectedPublication'
  | 'createdAt'
  | 'notificationId'
  | 'wallet'
  | NewCollectNotificationKeySpecifier
)[];
export type NewCollectNotificationFieldPolicy = {
  collectedPublication?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  wallet?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewCommentNotificationKeySpecifier = (
  | 'comment'
  | 'createdAt'
  | 'notificationId'
  | 'profile'
  | NewCommentNotificationKeySpecifier
)[];
export type NewCommentNotificationFieldPolicy = {
  comment?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewFollowerNotificationKeySpecifier = (
  | 'createdAt'
  | 'isFollowedByMe'
  | 'notificationId'
  | 'wallet'
  | NewFollowerNotificationKeySpecifier
)[];
export type NewFollowerNotificationFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  isFollowedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  wallet?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewMentionNotificationKeySpecifier = (
  | 'createdAt'
  | 'mentionPublication'
  | 'notificationId'
  | NewMentionNotificationKeySpecifier
)[];
export type NewMentionNotificationFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  mentionPublication?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewMirrorNotificationKeySpecifier = (
  | 'createdAt'
  | 'notificationId'
  | 'profile'
  | 'publication'
  | NewMirrorNotificationKeySpecifier
)[];
export type NewMirrorNotificationFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewReactionNotificationKeySpecifier = (
  | 'createdAt'
  | 'notificationId'
  | 'profile'
  | 'publication'
  | 'reaction'
  | NewReactionNotificationKeySpecifier
)[];
export type NewReactionNotificationFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftGalleryKeySpecifier = (
  | 'createdAt'
  | 'id'
  | 'items'
  | 'name'
  | 'profileId'
  | 'updatedAt'
  | NftGalleryKeySpecifier
)[];
export type NftGalleryFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftImageKeySpecifier = (
  | 'chainId'
  | 'contractAddress'
  | 'tokenId'
  | 'uri'
  | 'verified'
  | NftImageKeySpecifier
)[];
export type NftImageFieldPolicy = {
  chainId?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenId?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
  verified?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftOwnershipChallengeResultKeySpecifier = (
  | 'id'
  | 'text'
  | 'timeout'
  | NftOwnershipChallengeResultKeySpecifier
)[];
export type NftOwnershipChallengeResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  text?: FieldPolicy<any> | FieldReadFunction<any>;
  timeout?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftOwnershipOutputKeySpecifier = (
  | 'chainID'
  | 'contractAddress'
  | 'contractType'
  | 'tokenIds'
  | NftOwnershipOutputKeySpecifier
)[];
export type NftOwnershipOutputFieldPolicy = {
  chainID?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  contractType?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OnChainIdentityKeySpecifier = (
  | 'ens'
  | 'proofOfHumanity'
  | 'sybilDotOrg'
  | 'worldcoin'
  | OnChainIdentityKeySpecifier
)[];
export type OnChainIdentityFieldPolicy = {
  ens?: FieldPolicy<any> | FieldReadFunction<any>;
  proofOfHumanity?: FieldPolicy<any> | FieldReadFunction<any>;
  sybilDotOrg?: FieldPolicy<any> | FieldReadFunction<any>;
  worldcoin?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OrConditionOutputKeySpecifier = ('criteria' | OrConditionOutputKeySpecifier)[];
export type OrConditionOutputFieldPolicy = {
  criteria?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OwnerKeySpecifier = ('address' | 'amount' | OwnerKeySpecifier)[];
export type OwnerFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedAllPublicationsTagsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedAllPublicationsTagsResultKeySpecifier
)[];
export type PaginatedAllPublicationsTagsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedFeedResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedFeedResultKeySpecifier
)[];
export type PaginatedFeedResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedFollowersResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedFollowersResultKeySpecifier
)[];
export type PaginatedFollowersResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedFollowingResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedFollowingResultKeySpecifier
)[];
export type PaginatedFollowingResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedNotificationResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedNotificationResultKeySpecifier
)[];
export type PaginatedNotificationResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedProfilePublicationsForSaleResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedProfilePublicationsForSaleResultKeySpecifier
)[];
export type PaginatedProfilePublicationsForSaleResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedProfileResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedProfileResultKeySpecifier
)[];
export type PaginatedProfileResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedPublicationResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedPublicationResultKeySpecifier
)[];
export type PaginatedPublicationResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedResultInfoKeySpecifier = (
  | 'next'
  | 'prev'
  | 'totalCount'
  | PaginatedResultInfoKeySpecifier
)[];
export type PaginatedResultInfoFieldPolicy = {
  next?: FieldPolicy<any> | FieldReadFunction<any>;
  prev?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedTimelineResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedTimelineResultKeySpecifier
)[];
export type PaginatedTimelineResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedWhoCollectedResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedWhoCollectedResultKeySpecifier
)[];
export type PaginatedWhoCollectedResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedWhoReactedResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedWhoReactedResultKeySpecifier
)[];
export type PaginatedWhoReactedResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PendingApproveFollowsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PendingApproveFollowsResultKeySpecifier
)[];
export type PendingApproveFollowsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PendingPostKeySpecifier = (
  | 'content'
  | 'id'
  | 'locale'
  | 'mainContentFocus'
  | 'media'
  | 'profile'
  | PendingPostKeySpecifier
)[];
export type PendingPostFieldPolicy = {
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  mainContentFocus?: FieldPolicy<any> | FieldReadFunction<any>;
  media?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PostKeySpecifier = (
  | 'appId'
  | 'canComment'
  | 'canDecrypt'
  | 'canMirror'
  | 'collectModule'
  | 'collectNftAddress'
  | 'collectPolicy'
  | 'collectedBy'
  | 'createdAt'
  | 'dataAvailabilityProofs'
  | 'decryptionCriteria'
  | 'hasCollectedByMe'
  | 'hasOptimisticCollectedByMe'
  | 'hidden'
  | 'id'
  | 'isDataAvailability'
  | 'isGated'
  | 'isOptimisticMirroredByMe'
  | 'metadata'
  | 'mirrors'
  | 'onChainContentURI'
  | 'profile'
  | 'reaction'
  | 'referenceModule'
  | 'referencePolicy'
  | 'stats'
  | PostKeySpecifier
)[];
export type PostFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  canComment?: FieldPolicy<any> | FieldReadFunction<any>;
  canDecrypt?: FieldPolicy<any> | FieldReadFunction<any>;
  canMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  collectPolicy?: FieldPolicy<any> | FieldReadFunction<any>;
  collectedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilityProofs?: FieldPolicy<any> | FieldReadFunction<any>;
  decryptionCriteria?: FieldPolicy<any> | FieldReadFunction<any>;
  hasCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hasOptimisticCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isDataAvailability?: FieldPolicy<any> | FieldReadFunction<any>;
  isGated?: FieldPolicy<any> | FieldReadFunction<any>;
  isOptimisticMirroredByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  onChainContentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referencePolicy?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileKeySpecifier = (
  | 'attributes'
  | 'attributesMap'
  | 'bio'
  | 'coverPicture'
  | 'dispatcher'
  | 'followModule'
  | 'followNftAddress'
  | 'followPolicy'
  | 'followStatus'
  | 'handle'
  | 'id'
  | 'interests'
  | 'isDefault'
  | 'isFollowedByMe'
  | 'isFollowing'
  | 'metadata'
  | 'name'
  | 'onChainIdentity'
  | 'ownedBy'
  | 'ownedByMe'
  | 'picture'
  | 'stats'
  | ProfileKeySpecifier
)[];
export type ProfileFieldPolicy = {
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  attributesMap?: FieldPolicy<any> | FieldReadFunction<any>;
  bio?: FieldPolicy<any> | FieldReadFunction<any>;
  coverPicture?: FieldPolicy<any> | FieldReadFunction<any>;
  dispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  followModule?: FieldPolicy<any> | FieldReadFunction<any>;
  followNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  followPolicy?: FieldPolicy<any> | FieldReadFunction<any>;
  followStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  handle?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  interests?: FieldPolicy<any> | FieldReadFunction<any>;
  isDefault?: FieldPolicy<any> | FieldReadFunction<any>;
  isFollowedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  isFollowing?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  onChainIdentity?: FieldPolicy<any> | FieldReadFunction<any>;
  ownedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  ownedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  picture?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileFollowModuleSettingsKeySpecifier = (
  | 'contractAddress'
  | 'type'
  | ProfileFollowModuleSettingsKeySpecifier
)[];
export type ProfileFollowModuleSettingsFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileOwnershipOutputKeySpecifier = (
  | 'profileId'
  | ProfileOwnershipOutputKeySpecifier
)[];
export type ProfileOwnershipOutputFieldPolicy = {
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfilePublicationRevenueResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | ProfilePublicationRevenueResultKeySpecifier
)[];
export type ProfilePublicationRevenueResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileSearchResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | 'type'
  | ProfileSearchResultKeySpecifier
)[];
export type ProfileSearchResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileStatsKeySpecifier = (
  | 'commentsTotal'
  | 'id'
  | 'mirrorsTotal'
  | 'postsTotal'
  | 'publicationsTotal'
  | 'totalCollects'
  | 'totalComments'
  | 'totalFollowers'
  | 'totalFollowing'
  | 'totalMirrors'
  | 'totalPosts'
  | 'totalPublications'
  | ProfileStatsKeySpecifier
)[];
export type ProfileStatsFieldPolicy = {
  commentsTotal?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorsTotal?: FieldPolicy<any> | FieldReadFunction<any>;
  postsTotal?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationsTotal?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCollects?: FieldPolicy<any> | FieldReadFunction<any>;
  totalComments?: FieldPolicy<any> | FieldReadFunction<any>;
  totalFollowers?: FieldPolicy<any> | FieldReadFunction<any>;
  totalFollowing?: FieldPolicy<any> | FieldReadFunction<any>;
  totalMirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  totalPosts?: FieldPolicy<any> | FieldReadFunction<any>;
  totalPublications?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProviderSpecificParamsOutputKeySpecifier = (
  | 'encryptionKey'
  | ProviderSpecificParamsOutputKeySpecifier
)[];
export type ProviderSpecificParamsOutputFieldPolicy = {
  encryptionKey?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProxyActionErrorKeySpecifier = (
  | 'lastKnownTxId'
  | 'reason'
  | ProxyActionErrorKeySpecifier
)[];
export type ProxyActionErrorFieldPolicy = {
  lastKnownTxId?: FieldPolicy<any> | FieldReadFunction<any>;
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProxyActionQueuedKeySpecifier = ('queuedAt' | ProxyActionQueuedKeySpecifier)[];
export type ProxyActionQueuedFieldPolicy = {
  queuedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProxyActionStatusResultKeySpecifier = (
  | 'status'
  | 'txHash'
  | 'txId'
  | ProxyActionStatusResultKeySpecifier
)[];
export type ProxyActionStatusResultFieldPolicy = {
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
  txId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicMediaResultsKeySpecifier = (
  | 'media'
  | 'signedUrl'
  | PublicMediaResultsKeySpecifier
)[];
export type PublicMediaResultsFieldPolicy = {
  media?: FieldPolicy<any> | FieldReadFunction<any>;
  signedUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataStatusKeySpecifier = (
  | 'reason'
  | 'status'
  | PublicationMetadataStatusKeySpecifier
)[];
export type PublicationMetadataStatusFieldPolicy = {
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationRevenueKeySpecifier = (
  | 'publication'
  | 'revenue'
  | PublicationRevenueKeySpecifier
)[];
export type PublicationRevenueFieldPolicy = {
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
  revenue?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationSearchResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | 'type'
  | PublicationSearchResultKeySpecifier
)[];
export type PublicationSearchResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationStatsKeySpecifier = (
  | 'commentsTotal'
  | 'id'
  | 'totalAmountOfCollects'
  | 'totalAmountOfComments'
  | 'totalAmountOfMirrors'
  | 'totalDownvotes'
  | 'totalUpvotes'
  | PublicationStatsKeySpecifier
)[];
export type PublicationStatsFieldPolicy = {
  commentsTotal?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  totalAmountOfCollects?: FieldPolicy<any> | FieldReadFunction<any>;
  totalAmountOfComments?: FieldPolicy<any> | FieldReadFunction<any>;
  totalAmountOfMirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  totalDownvotes?: FieldPolicy<any> | FieldReadFunction<any>;
  totalUpvotes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationValidateMetadataResultKeySpecifier = (
  | 'reason'
  | 'valid'
  | PublicationValidateMetadataResultKeySpecifier
)[];
export type PublicationValidateMetadataResultFieldPolicy = {
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
  valid?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | 'allPublicationsTags'
  | 'approvedModuleAllowanceAmount'
  | 'challenge'
  | 'claimableHandles'
  | 'claimableStatus'
  | 'cur'
  | 'defaultProfile'
  | 'doesFollow'
  | 'enabledModuleCurrencies'
  | 'enabledModules'
  | 'exploreProfiles'
  | 'explorePublications'
  | 'feed'
  | 'feedHighlights'
  | 'followerNftOwnedTokenIds'
  | 'followers'
  | 'following'
  | 'gct'
  | 'gdm'
  | 'generateModuleCurrencyApprovalData'
  | 'globalProtocolStats'
  | 'hasTxHashBeenIndexed'
  | 'internalPublicationFilter'
  | 'isIDKitPhoneVerified'
  | 'mutualFollowersProfiles'
  | 'nftGalleries'
  | 'nftOwnershipChallenge'
  | 'nfts'
  | 'notifications'
  | 'pendingApprovalFollows'
  | 'ping'
  | 'profile'
  | 'profileFollowModuleBeenRedeemed'
  | 'profileFollowRevenue'
  | 'profileInterests'
  | 'profileOnChainIdentity'
  | 'profilePublicationRevenue'
  | 'profilePublicationsForSale'
  | 'profiles'
  | 'proxyActionStatus'
  | 'publication'
  | 'publicationMetadataStatus'
  | 'publicationRevenue'
  | 'publications'
  | 'recommendedProfiles'
  | 'rel'
  | 'search'
  | 'txIdToTxHash'
  | 'unknownEnabledModules'
  | 'userSigNonces'
  | 'validatePublicationMetadata'
  | 'verify'
  | 'whoCollectedPublication'
  | 'whoReactedPublication'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  allPublicationsTags?: FieldPolicy<any> | FieldReadFunction<any>;
  approvedModuleAllowanceAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  challenge?: FieldPolicy<any> | FieldReadFunction<any>;
  claimableHandles?: FieldPolicy<any> | FieldReadFunction<any>;
  claimableStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  cur?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  doesFollow?: FieldPolicy<any> | FieldReadFunction<any>;
  enabledModuleCurrencies?: FieldPolicy<any> | FieldReadFunction<any>;
  enabledModules?: FieldPolicy<any> | FieldReadFunction<any>;
  exploreProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  explorePublications?: FieldPolicy<any> | FieldReadFunction<any>;
  feed?: FieldPolicy<any> | FieldReadFunction<any>;
  feedHighlights?: FieldPolicy<any> | FieldReadFunction<any>;
  followerNftOwnedTokenIds?: FieldPolicy<any> | FieldReadFunction<any>;
  followers?: FieldPolicy<any> | FieldReadFunction<any>;
  following?: FieldPolicy<any> | FieldReadFunction<any>;
  gct?: FieldPolicy<any> | FieldReadFunction<any>;
  gdm?: FieldPolicy<any> | FieldReadFunction<any>;
  generateModuleCurrencyApprovalData?: FieldPolicy<any> | FieldReadFunction<any>;
  globalProtocolStats?: FieldPolicy<any> | FieldReadFunction<any>;
  hasTxHashBeenIndexed?: FieldPolicy<any> | FieldReadFunction<any>;
  internalPublicationFilter?: FieldPolicy<any> | FieldReadFunction<any>;
  isIDKitPhoneVerified?: FieldPolicy<any> | FieldReadFunction<any>;
  mutualFollowersProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  nftGalleries?: FieldPolicy<any> | FieldReadFunction<any>;
  nftOwnershipChallenge?: FieldPolicy<any> | FieldReadFunction<any>;
  nfts?: FieldPolicy<any> | FieldReadFunction<any>;
  notifications?: FieldPolicy<any> | FieldReadFunction<any>;
  pendingApprovalFollows?: FieldPolicy<any> | FieldReadFunction<any>;
  ping?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  profileFollowModuleBeenRedeemed?: FieldPolicy<any> | FieldReadFunction<any>;
  profileFollowRevenue?: FieldPolicy<any> | FieldReadFunction<any>;
  profileInterests?: FieldPolicy<any> | FieldReadFunction<any>;
  profileOnChainIdentity?: FieldPolicy<any> | FieldReadFunction<any>;
  profilePublicationRevenue?: FieldPolicy<any> | FieldReadFunction<any>;
  profilePublicationsForSale?: FieldPolicy<any> | FieldReadFunction<any>;
  profiles?: FieldPolicy<any> | FieldReadFunction<any>;
  proxyActionStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationMetadataStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationRevenue?: FieldPolicy<any> | FieldReadFunction<any>;
  publications?: FieldPolicy<any> | FieldReadFunction<any>;
  recommendedProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  rel?: FieldPolicy<any> | FieldReadFunction<any>;
  search?: FieldPolicy<any> | FieldReadFunction<any>;
  txIdToTxHash?: FieldPolicy<any> | FieldReadFunction<any>;
  unknownEnabledModules?: FieldPolicy<any> | FieldReadFunction<any>;
  userSigNonces?: FieldPolicy<any> | FieldReadFunction<any>;
  validatePublicationMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  verify?: FieldPolicy<any> | FieldReadFunction<any>;
  whoCollectedPublication?: FieldPolicy<any> | FieldReadFunction<any>;
  whoReactedPublication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ReactionEventKeySpecifier = (
  | 'profile'
  | 'reaction'
  | 'timestamp'
  | ReactionEventKeySpecifier
)[];
export type ReactionEventFieldPolicy = {
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RecipientDataOutputKeySpecifier = (
  | 'recipient'
  | 'split'
  | RecipientDataOutputKeySpecifier
)[];
export type RecipientDataOutputFieldPolicy = {
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  split?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RelayErrorKeySpecifier = ('reason' | RelayErrorKeySpecifier)[];
export type RelayErrorFieldPolicy = {
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RelayerResultKeySpecifier = ('txHash' | 'txId' | RelayerResultKeySpecifier)[];
export type RelayerResultFieldPolicy = {
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
  txId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ReservedClaimableHandleKeySpecifier = (
  | 'expiry'
  | 'handle'
  | 'id'
  | 'source'
  | ReservedClaimableHandleKeySpecifier
)[];
export type ReservedClaimableHandleFieldPolicy = {
  expiry?: FieldPolicy<any> | FieldReadFunction<any>;
  handle?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  source?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RevenueAggregateKeySpecifier = (
  | 'total'
  | 'totalAmount'
  | RevenueAggregateKeySpecifier
)[];
export type RevenueAggregateFieldPolicy = {
  total?: FieldPolicy<any> | FieldReadFunction<any>;
  totalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RevertCollectModuleSettingsKeySpecifier = (
  | 'contractAddress'
  | 'type'
  | RevertCollectModuleSettingsKeySpecifier
)[];
export type RevertCollectModuleSettingsFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RevertFollowModuleSettingsKeySpecifier = (
  | 'contractAddress'
  | 'type'
  | RevertFollowModuleSettingsKeySpecifier
)[];
export type RevertFollowModuleSettingsFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetDefaultProfileBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | SetDefaultProfileBroadcastItemResultKeySpecifier
)[];
export type SetDefaultProfileBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetDefaultProfileEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | SetDefaultProfileEIP712TypedDataKeySpecifier
)[];
export type SetDefaultProfileEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetDefaultProfileEIP712TypedDataTypesKeySpecifier = (
  | 'SetDefaultProfileWithSig'
  | SetDefaultProfileEIP712TypedDataTypesKeySpecifier
)[];
export type SetDefaultProfileEIP712TypedDataTypesFieldPolicy = {
  SetDefaultProfileWithSig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetDefaultProfileEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'nonce'
  | 'profileId'
  | 'wallet'
  | SetDefaultProfileEIP712TypedDataValueKeySpecifier
)[];
export type SetDefaultProfileEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  wallet?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SybilDotOrgIdentityKeySpecifier = (
  | 'source'
  | 'verified'
  | SybilDotOrgIdentityKeySpecifier
)[];
export type SybilDotOrgIdentityFieldPolicy = {
  source?: FieldPolicy<any> | FieldReadFunction<any>;
  verified?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SybilDotOrgIdentitySourceKeySpecifier = (
  | 'twitter'
  | SybilDotOrgIdentitySourceKeySpecifier
)[];
export type SybilDotOrgIdentitySourceFieldPolicy = {
  twitter?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SybilDotOrgTwitterIdentityKeySpecifier = (
  | 'handle'
  | SybilDotOrgTwitterIdentityKeySpecifier
)[];
export type SybilDotOrgTwitterIdentityFieldPolicy = {
  handle?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TagResultKeySpecifier = ('tag' | 'total' | TagResultKeySpecifier)[];
export type TagResultFieldPolicy = {
  tag?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TimedFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'contractAddress'
  | 'endTimestamp'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | 'type'
  | TimedFeeCollectModuleSettingsKeySpecifier
)[];
export type TimedFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  endTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionErrorKeySpecifier = (
  | 'reason'
  | 'txReceipt'
  | TransactionErrorKeySpecifier
)[];
export type TransactionErrorFieldPolicy = {
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
  txReceipt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionIndexedResultKeySpecifier = (
  | 'indexed'
  | 'metadataStatus'
  | 'txHash'
  | 'txReceipt'
  | TransactionIndexedResultKeySpecifier
)[];
export type TransactionIndexedResultFieldPolicy = {
  indexed?: FieldPolicy<any> | FieldReadFunction<any>;
  metadataStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
  txReceipt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionReceiptKeySpecifier = (
  | 'blockHash'
  | 'blockNumber'
  | 'byzantium'
  | 'confirmations'
  | 'contractAddress'
  | 'cumulativeGasUsed'
  | 'effectiveGasPrice'
  | 'from'
  | 'gasUsed'
  | 'logs'
  | 'logsBloom'
  | 'root'
  | 'status'
  | 'to'
  | 'transactionHash'
  | 'transactionIndex'
  | 'type'
  | TransactionReceiptKeySpecifier
)[];
export type TransactionReceiptFieldPolicy = {
  blockHash?: FieldPolicy<any> | FieldReadFunction<any>;
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  byzantium?: FieldPolicy<any> | FieldReadFunction<any>;
  confirmations?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  cumulativeGasUsed?: FieldPolicy<any> | FieldReadFunction<any>;
  effectiveGasPrice?: FieldPolicy<any> | FieldReadFunction<any>;
  from?: FieldPolicy<any> | FieldReadFunction<any>;
  gasUsed?: FieldPolicy<any> | FieldReadFunction<any>;
  logs?: FieldPolicy<any> | FieldReadFunction<any>;
  logsBloom?: FieldPolicy<any> | FieldReadFunction<any>;
  root?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  to?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionHash?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionIndex?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownCollectModuleSettingsKeySpecifier = (
  | 'collectModuleReturnData'
  | 'contractAddress'
  | 'type'
  | UnknownCollectModuleSettingsKeySpecifier
)[];
export type UnknownCollectModuleSettingsFieldPolicy = {
  collectModuleReturnData?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownFollowModuleSettingsKeySpecifier = (
  | 'contractAddress'
  | 'followModuleReturnData'
  | 'type'
  | UnknownFollowModuleSettingsKeySpecifier
)[];
export type UnknownFollowModuleSettingsFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  followModuleReturnData?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownReferenceModuleSettingsKeySpecifier = (
  | 'contractAddress'
  | 'referenceModuleReturnData'
  | 'type'
  | UnknownReferenceModuleSettingsKeySpecifier
)[];
export type UnknownReferenceModuleSettingsFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleReturnData?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserSigNoncesKeySpecifier = (
  | 'lensHubOnChainSigNonce'
  | 'peripheryOnChainSigNonce'
  | UserSigNoncesKeySpecifier
)[];
export type UserSigNoncesFieldPolicy = {
  lensHubOnChainSigNonce?: FieldPolicy<any> | FieldReadFunction<any>;
  peripheryOnChainSigNonce?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type WalletKeySpecifier = ('address' | 'defaultProfile' | WalletKeySpecifier)[];
export type WalletFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultProfile?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type WhoReactedResultKeySpecifier = (
  | 'profile'
  | 'reaction'
  | 'reactionAt'
  | 'reactionId'
  | WhoReactedResultKeySpecifier
)[];
export type WhoReactedResultFieldPolicy = {
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  reactionAt?: FieldPolicy<any> | FieldReadFunction<any>;
  reactionId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type WorldcoinIdentityKeySpecifier = ('isHuman' | WorldcoinIdentityKeySpecifier)[];
export type WorldcoinIdentityFieldPolicy = {
  isHuman?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  AaveFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AaveFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | AaveFeeCollectModuleSettingsKeySpecifier);
    fields?: AaveFeeCollectModuleSettingsFieldPolicy;
  };
  AccessConditionOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AccessConditionOutputKeySpecifier
      | (() => undefined | AccessConditionOutputKeySpecifier);
    fields?: AccessConditionOutputFieldPolicy;
  };
  AndConditionOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AndConditionOutputKeySpecifier
      | (() => undefined | AndConditionOutputKeySpecifier);
    fields?: AndConditionOutputFieldPolicy;
  };
  ApprovedAllowanceAmount?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ApprovedAllowanceAmountKeySpecifier
      | (() => undefined | ApprovedAllowanceAmountKeySpecifier);
    fields?: ApprovedAllowanceAmountFieldPolicy;
  };
  Attribute?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AttributeKeySpecifier | (() => undefined | AttributeKeySpecifier);
    fields?: AttributeFieldPolicy;
  };
  AuthChallengeResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuthChallengeResultKeySpecifier
      | (() => undefined | AuthChallengeResultKeySpecifier);
    fields?: AuthChallengeResultFieldPolicy;
  };
  AuthenticationResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuthenticationResultKeySpecifier
      | (() => undefined | AuthenticationResultKeySpecifier);
    fields?: AuthenticationResultFieldPolicy;
  };
  CanCommentResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CanCommentResponseKeySpecifier
      | (() => undefined | CanCommentResponseKeySpecifier);
    fields?: CanCommentResponseFieldPolicy;
  };
  CanDecryptResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CanDecryptResponseKeySpecifier
      | (() => undefined | CanDecryptResponseKeySpecifier);
    fields?: CanDecryptResponseFieldPolicy;
  };
  CanMirrorResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CanMirrorResponseKeySpecifier
      | (() => undefined | CanMirrorResponseKeySpecifier);
    fields?: CanMirrorResponseFieldPolicy;
  };
  ClaimableHandles?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ClaimableHandlesKeySpecifier
      | (() => undefined | ClaimableHandlesKeySpecifier);
    fields?: ClaimableHandlesFieldPolicy;
  };
  CollectConditionOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CollectConditionOutputKeySpecifier
      | (() => undefined | CollectConditionOutputKeySpecifier);
    fields?: CollectConditionOutputFieldPolicy;
  };
  CollectedEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CollectedEventKeySpecifier | (() => undefined | CollectedEventKeySpecifier);
    fields?: CollectedEventFieldPolicy;
  };
  Comment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CommentKeySpecifier | (() => undefined | CommentKeySpecifier);
    fields?: CommentFieldPolicy;
  };
  CreateBurnEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateBurnEIP712TypedDataKeySpecifier
      | (() => undefined | CreateBurnEIP712TypedDataKeySpecifier);
    fields?: CreateBurnEIP712TypedDataFieldPolicy;
  };
  CreateBurnEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateBurnEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateBurnEIP712TypedDataTypesKeySpecifier);
    fields?: CreateBurnEIP712TypedDataTypesFieldPolicy;
  };
  CreateBurnEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateBurnEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateBurnEIP712TypedDataValueKeySpecifier);
    fields?: CreateBurnEIP712TypedDataValueFieldPolicy;
  };
  CreateBurnProfileBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateBurnProfileBroadcastItemResultKeySpecifier
      | (() => undefined | CreateBurnProfileBroadcastItemResultKeySpecifier);
    fields?: CreateBurnProfileBroadcastItemResultFieldPolicy;
  };
  CreateCollectBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateCollectBroadcastItemResultKeySpecifier
      | (() => undefined | CreateCollectBroadcastItemResultKeySpecifier);
    fields?: CreateCollectBroadcastItemResultFieldPolicy;
  };
  CreateCollectEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateCollectEIP712TypedDataKeySpecifier
      | (() => undefined | CreateCollectEIP712TypedDataKeySpecifier);
    fields?: CreateCollectEIP712TypedDataFieldPolicy;
  };
  CreateCollectEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateCollectEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateCollectEIP712TypedDataTypesKeySpecifier);
    fields?: CreateCollectEIP712TypedDataTypesFieldPolicy;
  };
  CreateCollectEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateCollectEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateCollectEIP712TypedDataValueKeySpecifier);
    fields?: CreateCollectEIP712TypedDataValueFieldPolicy;
  };
  CreateCommentBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateCommentBroadcastItemResultKeySpecifier
      | (() => undefined | CreateCommentBroadcastItemResultKeySpecifier);
    fields?: CreateCommentBroadcastItemResultFieldPolicy;
  };
  CreateCommentEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateCommentEIP712TypedDataKeySpecifier
      | (() => undefined | CreateCommentEIP712TypedDataKeySpecifier);
    fields?: CreateCommentEIP712TypedDataFieldPolicy;
  };
  CreateCommentEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateCommentEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateCommentEIP712TypedDataTypesKeySpecifier);
    fields?: CreateCommentEIP712TypedDataTypesFieldPolicy;
  };
  CreateCommentEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateCommentEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateCommentEIP712TypedDataValueKeySpecifier);
    fields?: CreateCommentEIP712TypedDataValueFieldPolicy;
  };
  CreateDataAvailabilityPublicationResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateDataAvailabilityPublicationResultKeySpecifier
      | (() => undefined | CreateDataAvailabilityPublicationResultKeySpecifier);
    fields?: CreateDataAvailabilityPublicationResultFieldPolicy;
  };
  CreateFollowBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateFollowBroadcastItemResultKeySpecifier
      | (() => undefined | CreateFollowBroadcastItemResultKeySpecifier);
    fields?: CreateFollowBroadcastItemResultFieldPolicy;
  };
  CreateFollowEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateFollowEIP712TypedDataKeySpecifier
      | (() => undefined | CreateFollowEIP712TypedDataKeySpecifier);
    fields?: CreateFollowEIP712TypedDataFieldPolicy;
  };
  CreateFollowEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateFollowEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateFollowEIP712TypedDataTypesKeySpecifier);
    fields?: CreateFollowEIP712TypedDataTypesFieldPolicy;
  };
  CreateFollowEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateFollowEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateFollowEIP712TypedDataValueKeySpecifier);
    fields?: CreateFollowEIP712TypedDataValueFieldPolicy;
  };
  CreateMirrorBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMirrorBroadcastItemResultKeySpecifier
      | (() => undefined | CreateMirrorBroadcastItemResultKeySpecifier);
    fields?: CreateMirrorBroadcastItemResultFieldPolicy;
  };
  CreateMirrorEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMirrorEIP712TypedDataKeySpecifier
      | (() => undefined | CreateMirrorEIP712TypedDataKeySpecifier);
    fields?: CreateMirrorEIP712TypedDataFieldPolicy;
  };
  CreateMirrorEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMirrorEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateMirrorEIP712TypedDataTypesKeySpecifier);
    fields?: CreateMirrorEIP712TypedDataTypesFieldPolicy;
  };
  CreateMirrorEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMirrorEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateMirrorEIP712TypedDataValueKeySpecifier);
    fields?: CreateMirrorEIP712TypedDataValueFieldPolicy;
  };
  CreatePostBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatePostBroadcastItemResultKeySpecifier
      | (() => undefined | CreatePostBroadcastItemResultKeySpecifier);
    fields?: CreatePostBroadcastItemResultFieldPolicy;
  };
  CreatePostEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatePostEIP712TypedDataKeySpecifier
      | (() => undefined | CreatePostEIP712TypedDataKeySpecifier);
    fields?: CreatePostEIP712TypedDataFieldPolicy;
  };
  CreatePostEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatePostEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreatePostEIP712TypedDataTypesKeySpecifier);
    fields?: CreatePostEIP712TypedDataTypesFieldPolicy;
  };
  CreatePostEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatePostEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreatePostEIP712TypedDataValueKeySpecifier);
    fields?: CreatePostEIP712TypedDataValueFieldPolicy;
  };
  CreateSetDispatcherBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetDispatcherBroadcastItemResultKeySpecifier
      | (() => undefined | CreateSetDispatcherBroadcastItemResultKeySpecifier);
    fields?: CreateSetDispatcherBroadcastItemResultFieldPolicy;
  };
  CreateSetDispatcherEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetDispatcherEIP712TypedDataKeySpecifier
      | (() => undefined | CreateSetDispatcherEIP712TypedDataKeySpecifier);
    fields?: CreateSetDispatcherEIP712TypedDataFieldPolicy;
  };
  CreateSetDispatcherEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetDispatcherEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateSetDispatcherEIP712TypedDataTypesKeySpecifier);
    fields?: CreateSetDispatcherEIP712TypedDataTypesFieldPolicy;
  };
  CreateSetDispatcherEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetDispatcherEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateSetDispatcherEIP712TypedDataValueKeySpecifier);
    fields?: CreateSetDispatcherEIP712TypedDataValueFieldPolicy;
  };
  CreateSetFollowModuleBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetFollowModuleBroadcastItemResultKeySpecifier
      | (() => undefined | CreateSetFollowModuleBroadcastItemResultKeySpecifier);
    fields?: CreateSetFollowModuleBroadcastItemResultFieldPolicy;
  };
  CreateSetFollowModuleEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetFollowModuleEIP712TypedDataKeySpecifier
      | (() => undefined | CreateSetFollowModuleEIP712TypedDataKeySpecifier);
    fields?: CreateSetFollowModuleEIP712TypedDataFieldPolicy;
  };
  CreateSetFollowModuleEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetFollowModuleEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateSetFollowModuleEIP712TypedDataTypesKeySpecifier);
    fields?: CreateSetFollowModuleEIP712TypedDataTypesFieldPolicy;
  };
  CreateSetFollowModuleEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetFollowModuleEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateSetFollowModuleEIP712TypedDataValueKeySpecifier);
    fields?: CreateSetFollowModuleEIP712TypedDataValueFieldPolicy;
  };
  CreateSetFollowNFTUriBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetFollowNFTUriBroadcastItemResultKeySpecifier
      | (() => undefined | CreateSetFollowNFTUriBroadcastItemResultKeySpecifier);
    fields?: CreateSetFollowNFTUriBroadcastItemResultFieldPolicy;
  };
  CreateSetFollowNFTUriEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetFollowNFTUriEIP712TypedDataKeySpecifier
      | (() => undefined | CreateSetFollowNFTUriEIP712TypedDataKeySpecifier);
    fields?: CreateSetFollowNFTUriEIP712TypedDataFieldPolicy;
  };
  CreateSetFollowNFTUriEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetFollowNFTUriEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateSetFollowNFTUriEIP712TypedDataTypesKeySpecifier);
    fields?: CreateSetFollowNFTUriEIP712TypedDataTypesFieldPolicy;
  };
  CreateSetFollowNFTUriEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetFollowNFTUriEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateSetFollowNFTUriEIP712TypedDataValueKeySpecifier);
    fields?: CreateSetFollowNFTUriEIP712TypedDataValueFieldPolicy;
  };
  CreateSetProfileImageUriBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetProfileImageUriBroadcastItemResultKeySpecifier
      | (() => undefined | CreateSetProfileImageUriBroadcastItemResultKeySpecifier);
    fields?: CreateSetProfileImageUriBroadcastItemResultFieldPolicy;
  };
  CreateSetProfileImageUriEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetProfileImageUriEIP712TypedDataKeySpecifier
      | (() => undefined | CreateSetProfileImageUriEIP712TypedDataKeySpecifier);
    fields?: CreateSetProfileImageUriEIP712TypedDataFieldPolicy;
  };
  CreateSetProfileImageUriEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetProfileImageUriEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateSetProfileImageUriEIP712TypedDataTypesKeySpecifier);
    fields?: CreateSetProfileImageUriEIP712TypedDataTypesFieldPolicy;
  };
  CreateSetProfileImageUriEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetProfileImageUriEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateSetProfileImageUriEIP712TypedDataValueKeySpecifier);
    fields?: CreateSetProfileImageUriEIP712TypedDataValueFieldPolicy;
  };
  CreateSetProfileMetadataURIBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetProfileMetadataURIBroadcastItemResultKeySpecifier
      | (() => undefined | CreateSetProfileMetadataURIBroadcastItemResultKeySpecifier);
    fields?: CreateSetProfileMetadataURIBroadcastItemResultFieldPolicy;
  };
  CreateSetProfileMetadataURIEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetProfileMetadataURIEIP712TypedDataKeySpecifier
      | (() => undefined | CreateSetProfileMetadataURIEIP712TypedDataKeySpecifier);
    fields?: CreateSetProfileMetadataURIEIP712TypedDataFieldPolicy;
  };
  CreateSetProfileMetadataURIEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetProfileMetadataURIEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateSetProfileMetadataURIEIP712TypedDataTypesKeySpecifier);
    fields?: CreateSetProfileMetadataURIEIP712TypedDataTypesFieldPolicy;
  };
  CreateSetProfileMetadataURIEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSetProfileMetadataURIEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateSetProfileMetadataURIEIP712TypedDataValueKeySpecifier);
    fields?: CreateSetProfileMetadataURIEIP712TypedDataValueFieldPolicy;
  };
  CreateToggleFollowBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateToggleFollowBroadcastItemResultKeySpecifier
      | (() => undefined | CreateToggleFollowBroadcastItemResultKeySpecifier);
    fields?: CreateToggleFollowBroadcastItemResultFieldPolicy;
  };
  CreateToggleFollowEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateToggleFollowEIP712TypedDataKeySpecifier
      | (() => undefined | CreateToggleFollowEIP712TypedDataKeySpecifier);
    fields?: CreateToggleFollowEIP712TypedDataFieldPolicy;
  };
  CreateToggleFollowEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateToggleFollowEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateToggleFollowEIP712TypedDataTypesKeySpecifier);
    fields?: CreateToggleFollowEIP712TypedDataTypesFieldPolicy;
  };
  CreateToggleFollowEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateToggleFollowEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateToggleFollowEIP712TypedDataValueKeySpecifier);
    fields?: CreateToggleFollowEIP712TypedDataValueFieldPolicy;
  };
  CreateUnfollowBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateUnfollowBroadcastItemResultKeySpecifier
      | (() => undefined | CreateUnfollowBroadcastItemResultKeySpecifier);
    fields?: CreateUnfollowBroadcastItemResultFieldPolicy;
  };
  DegreesOfSeparationReferenceModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DegreesOfSeparationReferenceModuleSettingsKeySpecifier
      | (() => undefined | DegreesOfSeparationReferenceModuleSettingsKeySpecifier);
    fields?: DegreesOfSeparationReferenceModuleSettingsFieldPolicy;
  };
  Dispatcher?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DispatcherKeySpecifier | (() => undefined | DispatcherKeySpecifier);
    fields?: DispatcherFieldPolicy;
  };
  DoesFollowResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DoesFollowResponseKeySpecifier
      | (() => undefined | DoesFollowResponseKeySpecifier);
    fields?: DoesFollowResponseFieldPolicy;
  };
  EIP712TypedDataDomain?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EIP712TypedDataDomainKeySpecifier
      | (() => undefined | EIP712TypedDataDomainKeySpecifier);
    fields?: EIP712TypedDataDomainFieldPolicy;
  };
  EIP712TypedDataField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EIP712TypedDataFieldKeySpecifier
      | (() => undefined | EIP712TypedDataFieldKeySpecifier);
    fields?: EIP712TypedDataFieldFieldPolicy;
  };
  ERC4626FeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ERC4626FeeCollectModuleSettingsKeySpecifier
      | (() => undefined | ERC4626FeeCollectModuleSettingsKeySpecifier);
    fields?: ERC4626FeeCollectModuleSettingsFieldPolicy;
  };
  ElectedMirror?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ElectedMirrorKeySpecifier | (() => undefined | ElectedMirrorKeySpecifier);
    fields?: ElectedMirrorFieldPolicy;
  };
  EnabledModule?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | EnabledModuleKeySpecifier | (() => undefined | EnabledModuleKeySpecifier);
    fields?: EnabledModuleFieldPolicy;
  };
  EnabledModules?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | EnabledModulesKeySpecifier | (() => undefined | EnabledModulesKeySpecifier);
    fields?: EnabledModulesFieldPolicy;
  };
  EncryptedFieldsOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EncryptedFieldsOutputKeySpecifier
      | (() => undefined | EncryptedFieldsOutputKeySpecifier);
    fields?: EncryptedFieldsOutputFieldPolicy;
  };
  EncryptedMedia?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | EncryptedMediaKeySpecifier | (() => undefined | EncryptedMediaKeySpecifier);
    fields?: EncryptedMediaFieldPolicy;
  };
  EncryptedMediaSet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EncryptedMediaSetKeySpecifier
      | (() => undefined | EncryptedMediaSetKeySpecifier);
    fields?: EncryptedMediaSetFieldPolicy;
  };
  EncryptionParamsOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EncryptionParamsOutputKeySpecifier
      | (() => undefined | EncryptionParamsOutputKeySpecifier);
    fields?: EncryptionParamsOutputFieldPolicy;
  };
  EnsOnChainIdentity?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EnsOnChainIdentityKeySpecifier
      | (() => undefined | EnsOnChainIdentityKeySpecifier);
    fields?: EnsOnChainIdentityFieldPolicy;
  };
  EoaOwnershipOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EoaOwnershipOutputKeySpecifier
      | (() => undefined | EoaOwnershipOutputKeySpecifier);
    fields?: EoaOwnershipOutputFieldPolicy;
  };
  Erc20?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | Erc20KeySpecifier | (() => undefined | Erc20KeySpecifier);
    fields?: Erc20FieldPolicy;
  };
  Erc20Amount?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | Erc20AmountKeySpecifier | (() => undefined | Erc20AmountKeySpecifier);
    fields?: Erc20AmountFieldPolicy;
  };
  Erc20OwnershipOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | Erc20OwnershipOutputKeySpecifier
      | (() => undefined | Erc20OwnershipOutputKeySpecifier);
    fields?: Erc20OwnershipOutputFieldPolicy;
  };
  ExploreProfileResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ExploreProfileResultKeySpecifier
      | (() => undefined | ExploreProfileResultKeySpecifier);
    fields?: ExploreProfileResultFieldPolicy;
  };
  ExplorePublicationResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ExplorePublicationResultKeySpecifier
      | (() => undefined | ExplorePublicationResultKeySpecifier);
    fields?: ExplorePublicationResultFieldPolicy;
  };
  FeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FeeCollectModuleSettingsKeySpecifier
      | (() => undefined | FeeCollectModuleSettingsKeySpecifier);
    fields?: FeeCollectModuleSettingsFieldPolicy;
  };
  FeeFollowModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FeeFollowModuleSettingsKeySpecifier
      | (() => undefined | FeeFollowModuleSettingsKeySpecifier);
    fields?: FeeFollowModuleSettingsFieldPolicy;
  };
  FeedItem?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | FeedItemKeySpecifier | (() => undefined | FeedItemKeySpecifier);
    fields?: FeedItemFieldPolicy;
  };
  FollowConditionOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FollowConditionOutputKeySpecifier
      | (() => undefined | FollowConditionOutputKeySpecifier);
    fields?: FollowConditionOutputFieldPolicy;
  };
  FollowOnlyReferenceModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FollowOnlyReferenceModuleSettingsKeySpecifier
      | (() => undefined | FollowOnlyReferenceModuleSettingsKeySpecifier);
    fields?: FollowOnlyReferenceModuleSettingsFieldPolicy;
  };
  FollowRevenueResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FollowRevenueResultKeySpecifier
      | (() => undefined | FollowRevenueResultKeySpecifier);
    fields?: FollowRevenueResultFieldPolicy;
  };
  Follower?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | FollowerKeySpecifier | (() => undefined | FollowerKeySpecifier);
    fields?: FollowerFieldPolicy;
  };
  FollowerNftOwnedTokenIds?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FollowerNftOwnedTokenIdsKeySpecifier
      | (() => undefined | FollowerNftOwnedTokenIdsKeySpecifier);
    fields?: FollowerNftOwnedTokenIdsFieldPolicy;
  };
  Following?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | FollowingKeySpecifier | (() => undefined | FollowingKeySpecifier);
    fields?: FollowingFieldPolicy;
  };
  FreeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FreeCollectModuleSettingsKeySpecifier
      | (() => undefined | FreeCollectModuleSettingsKeySpecifier);
    fields?: FreeCollectModuleSettingsFieldPolicy;
  };
  GenerateModuleCurrencyApproval?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | GenerateModuleCurrencyApprovalKeySpecifier
      | (() => undefined | GenerateModuleCurrencyApprovalKeySpecifier);
    fields?: GenerateModuleCurrencyApprovalFieldPolicy;
  };
  GlobalProtocolStats?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | GlobalProtocolStatsKeySpecifier
      | (() => undefined | GlobalProtocolStatsKeySpecifier);
    fields?: GlobalProtocolStatsFieldPolicy;
  };
  LimitedFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LimitedFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | LimitedFeeCollectModuleSettingsKeySpecifier);
    fields?: LimitedFeeCollectModuleSettingsFieldPolicy;
  };
  LimitedTimedFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LimitedTimedFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | LimitedTimedFeeCollectModuleSettingsKeySpecifier);
    fields?: LimitedTimedFeeCollectModuleSettingsFieldPolicy;
  };
  Log?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | LogKeySpecifier | (() => undefined | LogKeySpecifier);
    fields?: LogFieldPolicy;
  };
  Media?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MediaKeySpecifier | (() => undefined | MediaKeySpecifier);
    fields?: MediaFieldPolicy;
  };
  MediaOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MediaOutputKeySpecifier | (() => undefined | MediaOutputKeySpecifier);
    fields?: MediaOutputFieldPolicy;
  };
  MediaSet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MediaSetKeySpecifier | (() => undefined | MediaSetKeySpecifier);
    fields?: MediaSetFieldPolicy;
  };
  MetadataAttributeOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MetadataAttributeOutputKeySpecifier
      | (() => undefined | MetadataAttributeOutputKeySpecifier);
    fields?: MetadataAttributeOutputFieldPolicy;
  };
  MetadataOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MetadataOutputKeySpecifier | (() => undefined | MetadataOutputKeySpecifier);
    fields?: MetadataOutputFieldPolicy;
  };
  Mirror?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MirrorKeySpecifier | (() => undefined | MirrorKeySpecifier);
    fields?: MirrorFieldPolicy;
  };
  MirrorEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MirrorEventKeySpecifier | (() => undefined | MirrorEventKeySpecifier);
    fields?: MirrorEventFieldPolicy;
  };
  ModuleFeeAmount?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ModuleFeeAmountKeySpecifier
      | (() => undefined | ModuleFeeAmountKeySpecifier);
    fields?: ModuleFeeAmountFieldPolicy;
  };
  ModuleInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ModuleInfoKeySpecifier | (() => undefined | ModuleInfoKeySpecifier);
    fields?: ModuleInfoFieldPolicy;
  };
  MultirecipientFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MultirecipientFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | MultirecipientFeeCollectModuleSettingsKeySpecifier);
    fields?: MultirecipientFeeCollectModuleSettingsFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  NFT?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NFTKeySpecifier | (() => undefined | NFTKeySpecifier);
    fields?: NFTFieldPolicy;
  };
  NFTContent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NFTContentKeySpecifier | (() => undefined | NFTContentKeySpecifier);
    fields?: NFTContentFieldPolicy;
  };
  NFTsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NFTsResultKeySpecifier | (() => undefined | NFTsResultKeySpecifier);
    fields?: NFTsResultFieldPolicy;
  };
  NewCollectNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NewCollectNotificationKeySpecifier
      | (() => undefined | NewCollectNotificationKeySpecifier);
    fields?: NewCollectNotificationFieldPolicy;
  };
  NewCommentNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NewCommentNotificationKeySpecifier
      | (() => undefined | NewCommentNotificationKeySpecifier);
    fields?: NewCommentNotificationFieldPolicy;
  };
  NewFollowerNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NewFollowerNotificationKeySpecifier
      | (() => undefined | NewFollowerNotificationKeySpecifier);
    fields?: NewFollowerNotificationFieldPolicy;
  };
  NewMentionNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NewMentionNotificationKeySpecifier
      | (() => undefined | NewMentionNotificationKeySpecifier);
    fields?: NewMentionNotificationFieldPolicy;
  };
  NewMirrorNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NewMirrorNotificationKeySpecifier
      | (() => undefined | NewMirrorNotificationKeySpecifier);
    fields?: NewMirrorNotificationFieldPolicy;
  };
  NewReactionNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NewReactionNotificationKeySpecifier
      | (() => undefined | NewReactionNotificationKeySpecifier);
    fields?: NewReactionNotificationFieldPolicy;
  };
  NftGallery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NftGalleryKeySpecifier | (() => undefined | NftGalleryKeySpecifier);
    fields?: NftGalleryFieldPolicy;
  };
  NftImage?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NftImageKeySpecifier | (() => undefined | NftImageKeySpecifier);
    fields?: NftImageFieldPolicy;
  };
  NftOwnershipChallengeResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NftOwnershipChallengeResultKeySpecifier
      | (() => undefined | NftOwnershipChallengeResultKeySpecifier);
    fields?: NftOwnershipChallengeResultFieldPolicy;
  };
  NftOwnershipOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NftOwnershipOutputKeySpecifier
      | (() => undefined | NftOwnershipOutputKeySpecifier);
    fields?: NftOwnershipOutputFieldPolicy;
  };
  OnChainIdentity?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OnChainIdentityKeySpecifier
      | (() => undefined | OnChainIdentityKeySpecifier);
    fields?: OnChainIdentityFieldPolicy;
  };
  OrConditionOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OrConditionOutputKeySpecifier
      | (() => undefined | OrConditionOutputKeySpecifier);
    fields?: OrConditionOutputFieldPolicy;
  };
  Owner?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | OwnerKeySpecifier | (() => undefined | OwnerKeySpecifier);
    fields?: OwnerFieldPolicy;
  };
  PaginatedAllPublicationsTagsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedAllPublicationsTagsResultKeySpecifier
      | (() => undefined | PaginatedAllPublicationsTagsResultKeySpecifier);
    fields?: PaginatedAllPublicationsTagsResultFieldPolicy;
  };
  PaginatedFeedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedFeedResultKeySpecifier
      | (() => undefined | PaginatedFeedResultKeySpecifier);
    fields?: PaginatedFeedResultFieldPolicy;
  };
  PaginatedFollowersResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedFollowersResultKeySpecifier
      | (() => undefined | PaginatedFollowersResultKeySpecifier);
    fields?: PaginatedFollowersResultFieldPolicy;
  };
  PaginatedFollowingResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedFollowingResultKeySpecifier
      | (() => undefined | PaginatedFollowingResultKeySpecifier);
    fields?: PaginatedFollowingResultFieldPolicy;
  };
  PaginatedNotificationResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedNotificationResultKeySpecifier
      | (() => undefined | PaginatedNotificationResultKeySpecifier);
    fields?: PaginatedNotificationResultFieldPolicy;
  };
  PaginatedProfilePublicationsForSaleResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedProfilePublicationsForSaleResultKeySpecifier
      | (() => undefined | PaginatedProfilePublicationsForSaleResultKeySpecifier);
    fields?: PaginatedProfilePublicationsForSaleResultFieldPolicy;
  };
  PaginatedProfileResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedProfileResultKeySpecifier
      | (() => undefined | PaginatedProfileResultKeySpecifier);
    fields?: PaginatedProfileResultFieldPolicy;
  };
  PaginatedPublicationResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedPublicationResultKeySpecifier
      | (() => undefined | PaginatedPublicationResultKeySpecifier);
    fields?: PaginatedPublicationResultFieldPolicy;
  };
  PaginatedResultInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedResultInfoKeySpecifier
      | (() => undefined | PaginatedResultInfoKeySpecifier);
    fields?: PaginatedResultInfoFieldPolicy;
  };
  PaginatedTimelineResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedTimelineResultKeySpecifier
      | (() => undefined | PaginatedTimelineResultKeySpecifier);
    fields?: PaginatedTimelineResultFieldPolicy;
  };
  PaginatedWhoCollectedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedWhoCollectedResultKeySpecifier
      | (() => undefined | PaginatedWhoCollectedResultKeySpecifier);
    fields?: PaginatedWhoCollectedResultFieldPolicy;
  };
  PaginatedWhoReactedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedWhoReactedResultKeySpecifier
      | (() => undefined | PaginatedWhoReactedResultKeySpecifier);
    fields?: PaginatedWhoReactedResultFieldPolicy;
  };
  PendingApproveFollowsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PendingApproveFollowsResultKeySpecifier
      | (() => undefined | PendingApproveFollowsResultKeySpecifier);
    fields?: PendingApproveFollowsResultFieldPolicy;
  };
  PendingPost?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PendingPostKeySpecifier | (() => undefined | PendingPostKeySpecifier);
    fields?: PendingPostFieldPolicy;
  };
  Post?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier);
    fields?: PostFieldPolicy;
  };
  Profile?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ProfileKeySpecifier | (() => undefined | ProfileKeySpecifier);
    fields?: ProfileFieldPolicy;
  };
  ProfileFollowModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileFollowModuleSettingsKeySpecifier
      | (() => undefined | ProfileFollowModuleSettingsKeySpecifier);
    fields?: ProfileFollowModuleSettingsFieldPolicy;
  };
  ProfileOwnershipOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileOwnershipOutputKeySpecifier
      | (() => undefined | ProfileOwnershipOutputKeySpecifier);
    fields?: ProfileOwnershipOutputFieldPolicy;
  };
  ProfilePublicationRevenueResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfilePublicationRevenueResultKeySpecifier
      | (() => undefined | ProfilePublicationRevenueResultKeySpecifier);
    fields?: ProfilePublicationRevenueResultFieldPolicy;
  };
  ProfileSearchResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileSearchResultKeySpecifier
      | (() => undefined | ProfileSearchResultKeySpecifier);
    fields?: ProfileSearchResultFieldPolicy;
  };
  ProfileStats?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ProfileStatsKeySpecifier | (() => undefined | ProfileStatsKeySpecifier);
    fields?: ProfileStatsFieldPolicy;
  };
  ProviderSpecificParamsOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProviderSpecificParamsOutputKeySpecifier
      | (() => undefined | ProviderSpecificParamsOutputKeySpecifier);
    fields?: ProviderSpecificParamsOutputFieldPolicy;
  };
  ProxyActionError?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProxyActionErrorKeySpecifier
      | (() => undefined | ProxyActionErrorKeySpecifier);
    fields?: ProxyActionErrorFieldPolicy;
  };
  ProxyActionQueued?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProxyActionQueuedKeySpecifier
      | (() => undefined | ProxyActionQueuedKeySpecifier);
    fields?: ProxyActionQueuedFieldPolicy;
  };
  ProxyActionStatusResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProxyActionStatusResultKeySpecifier
      | (() => undefined | ProxyActionStatusResultKeySpecifier);
    fields?: ProxyActionStatusResultFieldPolicy;
  };
  PublicMediaResults?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicMediaResultsKeySpecifier
      | (() => undefined | PublicMediaResultsKeySpecifier);
    fields?: PublicMediaResultsFieldPolicy;
  };
  PublicationMetadataStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationMetadataStatusKeySpecifier
      | (() => undefined | PublicationMetadataStatusKeySpecifier);
    fields?: PublicationMetadataStatusFieldPolicy;
  };
  PublicationRevenue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationRevenueKeySpecifier
      | (() => undefined | PublicationRevenueKeySpecifier);
    fields?: PublicationRevenueFieldPolicy;
  };
  PublicationSearchResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationSearchResultKeySpecifier
      | (() => undefined | PublicationSearchResultKeySpecifier);
    fields?: PublicationSearchResultFieldPolicy;
  };
  PublicationStats?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationStatsKeySpecifier
      | (() => undefined | PublicationStatsKeySpecifier);
    fields?: PublicationStatsFieldPolicy;
  };
  PublicationValidateMetadataResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationValidateMetadataResultKeySpecifier
      | (() => undefined | PublicationValidateMetadataResultKeySpecifier);
    fields?: PublicationValidateMetadataResultFieldPolicy;
  };
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  ReactionEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ReactionEventKeySpecifier | (() => undefined | ReactionEventKeySpecifier);
    fields?: ReactionEventFieldPolicy;
  };
  RecipientDataOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RecipientDataOutputKeySpecifier
      | (() => undefined | RecipientDataOutputKeySpecifier);
    fields?: RecipientDataOutputFieldPolicy;
  };
  RelayError?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | RelayErrorKeySpecifier | (() => undefined | RelayErrorKeySpecifier);
    fields?: RelayErrorFieldPolicy;
  };
  RelayerResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | RelayerResultKeySpecifier | (() => undefined | RelayerResultKeySpecifier);
    fields?: RelayerResultFieldPolicy;
  };
  ReservedClaimableHandle?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ReservedClaimableHandleKeySpecifier
      | (() => undefined | ReservedClaimableHandleKeySpecifier);
    fields?: ReservedClaimableHandleFieldPolicy;
  };
  RevenueAggregate?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RevenueAggregateKeySpecifier
      | (() => undefined | RevenueAggregateKeySpecifier);
    fields?: RevenueAggregateFieldPolicy;
  };
  RevertCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RevertCollectModuleSettingsKeySpecifier
      | (() => undefined | RevertCollectModuleSettingsKeySpecifier);
    fields?: RevertCollectModuleSettingsFieldPolicy;
  };
  RevertFollowModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RevertFollowModuleSettingsKeySpecifier
      | (() => undefined | RevertFollowModuleSettingsKeySpecifier);
    fields?: RevertFollowModuleSettingsFieldPolicy;
  };
  SetDefaultProfileBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SetDefaultProfileBroadcastItemResultKeySpecifier
      | (() => undefined | SetDefaultProfileBroadcastItemResultKeySpecifier);
    fields?: SetDefaultProfileBroadcastItemResultFieldPolicy;
  };
  SetDefaultProfileEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SetDefaultProfileEIP712TypedDataKeySpecifier
      | (() => undefined | SetDefaultProfileEIP712TypedDataKeySpecifier);
    fields?: SetDefaultProfileEIP712TypedDataFieldPolicy;
  };
  SetDefaultProfileEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SetDefaultProfileEIP712TypedDataTypesKeySpecifier
      | (() => undefined | SetDefaultProfileEIP712TypedDataTypesKeySpecifier);
    fields?: SetDefaultProfileEIP712TypedDataTypesFieldPolicy;
  };
  SetDefaultProfileEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SetDefaultProfileEIP712TypedDataValueKeySpecifier
      | (() => undefined | SetDefaultProfileEIP712TypedDataValueKeySpecifier);
    fields?: SetDefaultProfileEIP712TypedDataValueFieldPolicy;
  };
  SybilDotOrgIdentity?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SybilDotOrgIdentityKeySpecifier
      | (() => undefined | SybilDotOrgIdentityKeySpecifier);
    fields?: SybilDotOrgIdentityFieldPolicy;
  };
  SybilDotOrgIdentitySource?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SybilDotOrgIdentitySourceKeySpecifier
      | (() => undefined | SybilDotOrgIdentitySourceKeySpecifier);
    fields?: SybilDotOrgIdentitySourceFieldPolicy;
  };
  SybilDotOrgTwitterIdentity?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SybilDotOrgTwitterIdentityKeySpecifier
      | (() => undefined | SybilDotOrgTwitterIdentityKeySpecifier);
    fields?: SybilDotOrgTwitterIdentityFieldPolicy;
  };
  TagResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | TagResultKeySpecifier | (() => undefined | TagResultKeySpecifier);
    fields?: TagResultFieldPolicy;
  };
  TimedFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TimedFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | TimedFeeCollectModuleSettingsKeySpecifier);
    fields?: TimedFeeCollectModuleSettingsFieldPolicy;
  };
  TransactionError?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TransactionErrorKeySpecifier
      | (() => undefined | TransactionErrorKeySpecifier);
    fields?: TransactionErrorFieldPolicy;
  };
  TransactionIndexedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TransactionIndexedResultKeySpecifier
      | (() => undefined | TransactionIndexedResultKeySpecifier);
    fields?: TransactionIndexedResultFieldPolicy;
  };
  TransactionReceipt?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TransactionReceiptKeySpecifier
      | (() => undefined | TransactionReceiptKeySpecifier);
    fields?: TransactionReceiptFieldPolicy;
  };
  UnknownCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnknownCollectModuleSettingsKeySpecifier
      | (() => undefined | UnknownCollectModuleSettingsKeySpecifier);
    fields?: UnknownCollectModuleSettingsFieldPolicy;
  };
  UnknownFollowModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnknownFollowModuleSettingsKeySpecifier
      | (() => undefined | UnknownFollowModuleSettingsKeySpecifier);
    fields?: UnknownFollowModuleSettingsFieldPolicy;
  };
  UnknownReferenceModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnknownReferenceModuleSettingsKeySpecifier
      | (() => undefined | UnknownReferenceModuleSettingsKeySpecifier);
    fields?: UnknownReferenceModuleSettingsFieldPolicy;
  };
  UserSigNonces?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserSigNoncesKeySpecifier | (() => undefined | UserSigNoncesKeySpecifier);
    fields?: UserSigNoncesFieldPolicy;
  };
  Wallet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | WalletKeySpecifier | (() => undefined | WalletKeySpecifier);
    fields?: WalletFieldPolicy;
  };
  WhoReactedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | WhoReactedResultKeySpecifier
      | (() => undefined | WhoReactedResultKeySpecifier);
    fields?: WhoReactedResultFieldPolicy;
  };
  WorldcoinIdentity?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | WorldcoinIdentityKeySpecifier
      | (() => undefined | WorldcoinIdentityKeySpecifier);
    fields?: WorldcoinIdentityFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    BroadcastDataAvailabilityUnion: ['CreateDataAvailabilityPublicationResult', 'RelayError'],
    CollectModule: [
      'AaveFeeCollectModuleSettings',
      'ERC4626FeeCollectModuleSettings',
      'FeeCollectModuleSettings',
      'FreeCollectModuleSettings',
      'LimitedFeeCollectModuleSettings',
      'LimitedTimedFeeCollectModuleSettings',
      'MultirecipientFeeCollectModuleSettings',
      'RevertCollectModuleSettings',
      'TimedFeeCollectModuleSettings',
      'UnknownCollectModuleSettings',
    ],
    FeedItemRoot: ['Comment', 'Post'],
    FollowModule: [
      'FeeFollowModuleSettings',
      'ProfileFollowModuleSettings',
      'RevertFollowModuleSettings',
      'UnknownFollowModuleSettings',
    ],
    MainPostReference: ['Mirror', 'Post'],
    MentionPublication: ['Comment', 'Post'],
    MirrorablePublication: ['Comment', 'Post'],
    Notification: [
      'NewCollectNotification',
      'NewCommentNotification',
      'NewFollowerNotification',
      'NewMentionNotification',
      'NewMirrorNotification',
      'NewReactionNotification',
    ],
    ProfileMedia: ['MediaSet', 'NftImage'],
    ProxyActionStatusResultUnion: [
      'ProxyActionError',
      'ProxyActionQueued',
      'ProxyActionStatusResult',
    ],
    Publication: ['Comment', 'Mirror', 'Post'],
    PublicationForSale: ['Comment', 'Post'],
    PublicationSearchResultItem: ['Comment', 'Post'],
    ReferenceModule: [
      'DegreesOfSeparationReferenceModuleSettings',
      'FollowOnlyReferenceModuleSettings',
      'UnknownReferenceModuleSettings',
    ],
    RelayDataAvailabilityResult: ['CreateDataAvailabilityPublicationResult', 'RelayError'],
    RelayResult: ['RelayError', 'RelayerResult'],
    SearchResult: ['ProfileSearchResult', 'PublicationSearchResult'],
    TransactionResult: ['TransactionError', 'TransactionIndexedResult'],
  },
};
export default result;
