// @ts-nocheck
import * as Types from './types.generated';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type OptimisticStatusResultFragment = {
  __typename: 'OptimisticStatusResult';
  value: boolean;
  isFinalisedOnchain: boolean;
};

export type Erc20Fragment = {
  __typename: 'Erc20';
  name: string;
  symbol: string;
  decimals: number;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type FiatAmountFragment = {
  __typename: 'FiatAmount';
  value: string;
  asset: { __typename: 'Fiat' } & FiatFragment;
};

export type FiatFragment = { __typename: 'Fiat'; name: string; symbol: string; decimals: number };

export type AmountFragment = {
  __typename: 'Amount';
  value: string;
  asset: { __typename: 'Erc20' } & Erc20Fragment;
  rate: ({ __typename: 'FiatAmount' } & FiatAmountFragment) | null;
};

export type FeeFollowModuleSettingsFragment = {
  __typename: 'FeeFollowModuleSettings';
  recipient: string;
  amount: { __typename: 'Amount' } & AmountFragment;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type RevertFollowModuleSettingsFragment = {
  __typename: 'RevertFollowModuleSettings';
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type UnknownFollowModuleSettingsFragment = {
  __typename: 'UnknownFollowModuleSettings';
  followModuleReturnData: string;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type NetworkAddressFragment = {
  __typename: 'NetworkAddress';
  address: string;
  chainId: string;
};

export type ImageFragment = {
  __typename: 'Image';
  uri: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type VideoFragment = { __typename: 'Video'; uri: string; mimeType: string | null };

export type VideoSetFragment = {
  __typename: 'VideoSet';
  raw: { __typename: 'Video' } & VideoFragment;
  optimized: ({ __typename: 'Video' } & VideoFragment) | null;
};

export type EncryptableVideoFragment = {
  __typename: 'EncryptableVideo';
  mimeType: string | null;
  uri: string;
};

export type EncryptableVideoSetFragment = {
  __typename: 'EncryptableVideoSet';
  raw: { __typename: 'EncryptableVideo' } & EncryptableVideoFragment;
  optimized: ({ __typename: 'Video' } & VideoFragment) | null;
};

export type AudioFragment = { __typename: 'Audio'; uri: string; mimeType: string | null };

export type AudioSetFragment = {
  __typename: 'AudioSet';
  raw: { __typename: 'Audio' } & AudioFragment;
  optimized: ({ __typename: 'Audio' } & AudioFragment) | null;
};

export type EncryptableAudioFragment = {
  __typename: 'EncryptableAudio';
  mimeType: string | null;
  uri: string;
};

export type EncryptableAudioSetFragment = {
  __typename: 'EncryptableAudioSet';
  raw: { __typename: 'EncryptableAudio' } & EncryptableAudioFragment;
  optimized: ({ __typename: 'Audio' } & AudioFragment) | null;
};

export type LegacyAudioItemFragment = {
  __typename: 'LegacyAudioItem';
  altTag: string | null;
  audio: { __typename: 'AudioSet' } & AudioSetFragment;
  cover: ({ __typename: 'ImageSet' } & PublicationImageSetFragment) | null;
};

export type LegacyImageItemFragment = {
  __typename: 'LegacyImageItem';
  altTag: string | null;
  image: { __typename: 'ImageSet' } & PublicationImageSetFragment;
};

export type LegacyVideoItemFragment = {
  __typename: 'LegacyVideoItem';
  altTag: string | null;
  video: { __typename: 'VideoSet' } & VideoSetFragment;
  cover: ({ __typename: 'ImageSet' } & PublicationImageSetFragment) | null;
};

export type ProfileCoverSetFragment = {
  __typename: 'ImageSet';
  raw: { __typename: 'Image' } & ImageFragment;
  optimized: ({ __typename: 'Image' } & ImageFragment) | null;
  transformed: ({ __typename: 'Image' } & ImageFragment) | null;
};

export type ProfilePictureSetFragment = {
  __typename: 'ImageSet';
  raw: { __typename: 'Image' } & ImageFragment;
  optimized: ({ __typename: 'Image' } & ImageFragment) | null;
  transformed: ({ __typename: 'Image' } & ImageFragment) | null;
};

export type NftImageFragment = {
  __typename: 'NftImage';
  tokenId: string;
  verified: boolean;
  collection: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  image: { __typename: 'ImageSet' } & ProfilePictureSetFragment;
};

export type ProfileFragment = {
  __typename: 'Profile';
  id: string;
  txHash: string;
  createdAt: string;
  interests: Array<string>;
  invitesLeft: number | null;
  handle: string | null;
  sponsor: boolean;
  lensManager: boolean;
  ownedBy: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  operations: {
    __typename: 'ProfileOperations';
    id: string;
    canBlock: boolean;
    canUnblock: boolean;
    canFollow: Types.TriStateValue;
    canUnfollow: boolean;
    isBlockedByMe: { __typename: 'OptimisticStatusResult' } & OptimisticStatusResultFragment;
    isFollowedByMe: { __typename: 'OptimisticStatusResult' } & OptimisticStatusResultFragment;
    isFollowingMe: { __typename: 'OptimisticStatusResult' } & OptimisticStatusResultFragment;
  };
  guardian: {
    __typename: 'ProfileGuardianResult';
    protected: boolean;
    cooldownEndsOn: string | null;
  } | null;
  onchainIdentity: {
    __typename: 'ProfileOnchainIdentity';
    proofOfHumanity: boolean;
    ens: { __typename: 'EnsOnchainIdentity'; name: string | null } | null;
    sybilDotOrg: {
      __typename: 'SybilDotOrgIdentity';
      source: {
        __typename: 'SybilDotOrgIdentitySource';
        twitter: { __typename: 'SybilDotOrgTwitterIdentity'; handle: string | null };
      } | null;
    };
    worldcoin: { __typename: 'WorldcoinIdentity'; isHuman: boolean };
  };
  followNftAddress: ({ __typename: 'NetworkAddress' } & NetworkAddressFragment) | null;
  followModule:
    | ({ __typename: 'FeeFollowModuleSettings' } & FeeFollowModuleSettingsFragment)
    | ({ __typename: 'RevertFollowModuleSettings' } & RevertFollowModuleSettingsFragment)
    | ({ __typename: 'UnknownFollowModuleSettings' } & UnknownFollowModuleSettingsFragment)
    | null;
  metadata: {
    __typename: 'ProfileMetadata';
    displayName: string | null;
    bio: string | null;
    rawURI: string;
    picture:
      | ({ __typename: 'ImageSet' } & ProfilePictureSetFragment)
      | ({ __typename: 'NftImage' } & NftImageFragment)
      | null;
    coverPicture: ({ __typename: 'ImageSet' } & ProfileCoverSetFragment) | null;
    attributes: Array<{
      __typename: 'Attribute';
      type: Types.AttributeType | null;
      key: string;
      value: string;
    }>;
  } | null;
  invitedBy: { __typename: 'Profile'; id: string } | null;
};

export type PaginatedResultInfoFragment = {
  __typename: 'PaginatedResultInfo';
  prev: string | null;
  next: string | null;
};

export type AppFragment = { __typename: 'App'; id: string };

export type MomokaInfoFragment = { __typename: 'MomokaInfo'; proof: string };

export type FollowOnlyReferenceModuleSettingsFragment = {
  __typename: 'FollowOnlyReferenceModuleSettings';
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type DegreesOfSeparationReferenceModuleSettingsFragment = {
  __typename: 'DegreesOfSeparationReferenceModuleSettings';
  commentsRestricted: boolean;
  mirrorsRestricted: boolean;
  degreesOfSeparation: number;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type UnknownReferenceModuleSettingsFragment = {
  __typename: 'UnknownReferenceModuleSettings';
  referenceModuleReturnData: string;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type SimpleCollectOpenActionSettingsFragment = {
  __typename: 'SimpleCollectOpenActionSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  amount: { __typename: 'Amount' } & AmountFragment;
};

export type MultirecipientFeeCollectOpenActionSettingsFragment = {
  __typename: 'MultirecipientFeeCollectOpenActionSettings';
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  amount: { __typename: 'Amount' } & AmountFragment;
  recipients: Array<{ __typename: 'RecipientDataOutput'; recipient: string; split: number }>;
};

export type UnknownOpenActionModuleSettingsFragment = {
  __typename: 'UnknownOpenActionModuleSettings';
  openActionModuleReturnData: string | null;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type LegacyFreeCollectModuleSettingsFragment = {
  __typename: 'LegacyFreeCollectModuleSettings';
  followerOnly: boolean;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type LegacyFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyFeeCollectModuleSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  amount: { __typename: 'Amount' } & AmountFragment;
};

export type LegacyLimitedFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyLimitedFeeCollectModuleSettings';
  collectLimit: string | null;
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  amount: { __typename: 'Amount' } & AmountFragment;
};

export type LegacyLimitedTimedFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyLimitedTimedFeeCollectModuleSettings';
  collectLimit: string | null;
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  endTimestamp: string;
  contract: { __typename: 'NetworkAddress'; address: string };
  amount: { __typename: 'Amount' } & AmountFragment;
};

export type LegacyRevertCollectModuleSettingsFragment = {
  __typename: 'LegacyRevertCollectModuleSettings';
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type LegacyTimedFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyTimedFeeCollectModuleSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  endTimestamp: string;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  amount: { __typename: 'Amount' } & AmountFragment;
};

export type LegacyMultirecipientFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyMultirecipientFeeCollectModuleSettings';
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  amount: { __typename: 'Amount' } & AmountFragment;
  recipients: Array<{ __typename: 'RecipientDataOutput'; recipient: string; split: number }>;
};

export type LegacySimpleCollectModuleSettingsFragment = {
  __typename: 'LegacySimpleCollectModuleSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  amount: { __typename: 'Amount' } & AmountFragment;
};

export type LegacyErc4626FeeCollectModuleSettingsFragment = {
  __typename: 'LegacyERC4626FeeCollectModuleSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  vault: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  amount: { __typename: 'Amount' } & AmountFragment;
};

export type LegacyAaveFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyAaveFeeCollectModuleSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  amount: { __typename: 'Amount' } & AmountFragment;
};

export type UnknownOpenActionResultFragment = {
  __typename: 'UnknownOpenActionResult';
  address: string;
  category: Types.OpenActionCategoryType | null;
  initReturnData: string | null;
};

export type KnownCollectOpenActionResultFragment = {
  __typename: 'KnownCollectOpenActionResult';
  type: Types.CollectOpenActionModuleType;
};

export type OpenActionResult_KnownCollectOpenActionResult_Fragment = {
  __typename: 'KnownCollectOpenActionResult';
} & KnownCollectOpenActionResultFragment;

export type OpenActionResult_UnknownOpenActionResult_Fragment = {
  __typename: 'UnknownOpenActionResult';
} & UnknownOpenActionResultFragment;

export type OpenActionResultFragment =
  | OpenActionResult_KnownCollectOpenActionResult_Fragment
  | OpenActionResult_UnknownOpenActionResult_Fragment;

export type CanDecryptResponseFragment = {
  __typename: 'CanDecryptResponse';
  result: boolean;
  reasons: Array<Types.DecryptFailReasonType> | null;
  extraDetails: string | null;
};

export type PublicationOperationsFragment = {
  __typename: 'PublicationOperations';
  isNotInterested: boolean;
  hasBookmarked: boolean;
  hasReported: boolean;
  canAct: Types.TriStateValue;
  canComment: Types.TriStateValue;
  canMirror: Types.TriStateValue;
  hasMirrored: boolean;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasActed: { __typename: 'OptimisticStatusResult' } & OptimisticStatusResultFragment;
  actedOn: Array<
    | ({
        __typename: 'KnownCollectOpenActionResult';
      } & OpenActionResult_KnownCollectOpenActionResult_Fragment)
    | ({
        __typename: 'UnknownOpenActionResult';
      } & OpenActionResult_UnknownOpenActionResult_Fragment)
  >;
  canDecrypt: { __typename: 'CanDecryptResponse' } & CanDecryptResponseFragment;
};

export type PublicationMetadataEncryptionStrategyFragment = {
  __typename: 'PublicationMetadataV3LitEncryption';
  encryptionKey: string;
  accessCondition:
    | ({ __typename: 'AndCondition' } & AndConditionFragment)
    | ({ __typename: 'CollectCondition' } & CollectConditionFragment)
    | ({ __typename: 'EoaOwnershipCondition' } & EoaOwnershipConditionFragment)
    | ({ __typename: 'Erc20OwnershipCondition' } & Erc20OwnershipConditionFragment)
    | ({ __typename: 'FollowCondition' } & FollowConditionFragment)
    | ({ __typename: 'NftOwnershipCondition' } & NftOwnershipConditionFragment)
    | ({ __typename: 'OrCondition' } & OrConditionFragment)
    | ({ __typename: 'ProfileOwnershipCondition' } & ProfileOwnershipConditionFragment);
};

export type NftOwnershipConditionFragment = {
  __typename: 'NftOwnershipCondition';
  contractType: Types.NftContractType;
  tokenIds: Array<string> | null;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type Erc20OwnershipConditionFragment = {
  __typename: 'Erc20OwnershipCondition';
  condition: Types.ComparisonOperatorConditionType;
  amount: { __typename: 'Amount' } & AmountFragment;
};

export type EoaOwnershipConditionFragment = {
  __typename: 'EoaOwnershipCondition';
  address: string;
};

export type ProfileOwnershipConditionFragment = {
  __typename: 'ProfileOwnershipCondition';
  profileId: string;
};

export type FollowConditionFragment = { __typename: 'FollowCondition'; follow: string };

export type CollectConditionFragment = {
  __typename: 'CollectCondition';
  publicationId: string;
  thisPublication: boolean;
};

export type AndConditionFragment = {
  __typename: 'AndCondition';
  criteria: Array<
    | { __typename: 'AndCondition' }
    | ({ __typename: 'CollectCondition' } & CollectConditionFragment)
    | ({ __typename: 'EoaOwnershipCondition' } & EoaOwnershipConditionFragment)
    | ({ __typename: 'Erc20OwnershipCondition' } & Erc20OwnershipConditionFragment)
    | ({ __typename: 'FollowCondition' } & FollowConditionFragment)
    | ({ __typename: 'NftOwnershipCondition' } & NftOwnershipConditionFragment)
    | { __typename: 'OrCondition' }
    | ({ __typename: 'ProfileOwnershipCondition' } & ProfileOwnershipConditionFragment)
  >;
};

export type OrConditionFragment = {
  __typename: 'OrCondition';
  criteria: Array<
    | { __typename: 'AndCondition' }
    | ({ __typename: 'CollectCondition' } & CollectConditionFragment)
    | ({ __typename: 'EoaOwnershipCondition' } & EoaOwnershipConditionFragment)
    | ({ __typename: 'Erc20OwnershipCondition' } & Erc20OwnershipConditionFragment)
    | ({ __typename: 'FollowCondition' } & FollowConditionFragment)
    | ({ __typename: 'NftOwnershipCondition' } & NftOwnershipConditionFragment)
    | { __typename: 'OrCondition' }
    | ({ __typename: 'ProfileOwnershipCondition' } & ProfileOwnershipConditionFragment)
  >;
};

export type PublicationImageSetFragment = {
  __typename: 'ImageSet';
  raw: { __typename: 'Image' } & ImageFragment;
  optimized: ({ __typename: 'Image' } & ImageFragment) | null;
  transformed: ({ __typename: 'Image' } & ImageFragment) | null;
};

export type EncryptableImageFragment = {
  __typename: 'EncryptableImage';
  uri: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type PublicationEncryptableImageSetFragment = {
  __typename: 'EncryptableImageSet';
  raw: { __typename: 'EncryptableImage' } & EncryptableImageFragment;
  optimized: ({ __typename: 'Image' } & ImageFragment) | null;
};

export type PublicationMarketplaceMetadataAttributeFragment = {
  __typename: 'PublicationMarketplaceMetadataAttribute';
  displayType: Types.MarketplaceMetadataAttributeDisplayType | null;
  traitType: string | null;
  value: string | null;
};

export type MarketplaceMetadataFragment = {
  __typename: 'MarketplaceMetadata';
  description: string | null;
  externalURL: string | null;
  name: string | null;
  animationUrl: string | null;
  attributes: Array<
    {
      __typename: 'PublicationMarketplaceMetadataAttribute';
    } & PublicationMarketplaceMetadataAttributeFragment
  > | null;
  image: ({ __typename: 'ImageSet' } & PublicationImageSetFragment) | null;
};

export type PublicationMetadataMediaVideoFragment = {
  __typename: 'PublicationMetadataMediaVideo';
  duration: number | null;
  license: Types.PublicationMetadataLicenseType | null;
  altTag: string | null;
  video: { __typename: 'EncryptableVideoSet' } & EncryptableVideoSetFragment;
  cover: ({ __typename: 'EncryptableImageSet' } & PublicationEncryptableImageSetFragment) | null;
};

export type PublicationMetadataMediaImageFragment = {
  __typename: 'PublicationMetadataMediaImage';
  license: Types.PublicationMetadataLicenseType | null;
  image: { __typename: 'EncryptableImageSet' } & PublicationEncryptableImageSetFragment;
};

export type PublicationMetadataMediaAudioFragment = {
  __typename: 'PublicationMetadataMediaAudio';
  duration: number | null;
  license: Types.PublicationMetadataLicenseType | null;
  credits: string | null;
  artist: string | null;
  genre: string | null;
  recordLabel: string | null;
  lyrics: string | null;
  audio: { __typename: 'EncryptableAudioSet' } & EncryptableAudioSetFragment;
  cover: ({ __typename: 'EncryptableImageSet' } & PublicationEncryptableImageSetFragment) | null;
};

export type LegacyPublicationMetadataFragment = {
  __typename: 'LegacyPublicationMetadata';
  content: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  mainContentFocus: Types.LegacyPublicationMetadataMainFocusType;
  media: Array<
    | ({ __typename: 'LegacyAudioItem' } & LegacyAudioItemFragment)
    | ({ __typename: 'LegacyImageItem' } & LegacyImageItemFragment)
    | ({ __typename: 'LegacyVideoItem' } & LegacyVideoItemFragment)
  > | null;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  encryptedWith: {
    __typename: 'PublicationMetadataV2Encryption';
    encryptionKey: string;
    encryptedFields: {
      __typename: 'PublicationMetadataV2EncryptedFields';
      content: string | null;
      image: string | null;
      animationUrl: string | null;
      externalUrl: string | null;
      media: Array<{
        __typename: 'EncryptedMedia';
        uri: string;
        mimeType: string | null;
        altTag: string | null;
        cover: string | null;
      }> | null;
    };
    accessCondition:
      | ({ __typename: 'AndCondition' } & AndConditionFragment)
      | ({ __typename: 'CollectCondition' } & CollectConditionFragment)
      | ({ __typename: 'EoaOwnershipCondition' } & EoaOwnershipConditionFragment)
      | ({ __typename: 'Erc20OwnershipCondition' } & Erc20OwnershipConditionFragment)
      | ({ __typename: 'FollowCondition' } & FollowConditionFragment)
      | ({ __typename: 'NftOwnershipCondition' } & NftOwnershipConditionFragment)
      | ({ __typename: 'OrCondition' } & OrConditionFragment)
      | ({ __typename: 'ProfileOwnershipCondition' } & ProfileOwnershipConditionFragment);
  } | null;
};

export type VideoMetadataV3Fragment = {
  __typename: 'VideoMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  isShortVideo: boolean;
  title: string;
  content: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  asset: { __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type AudioMetadataV3Fragment = {
  __typename: 'AudioMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  title: string;
  content: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  asset: { __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type ImageMetadataV3Fragment = {
  __typename: 'ImageMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  title: string;
  content: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  asset: { __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type ArticleMetadataV3Fragment = {
  __typename: 'ArticleMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  title: string;
  content: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type EventMetadataV3Fragment = {
  __typename: 'EventMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  startsAt: string;
  endsAt: string;
  links: Array<string> | null;
  location: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  geographic: {
    __typename: 'GeoLocation';
    latitude: number | null;
    longitude: number | null;
  } | null;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type LinkMetadataV3Fragment = {
  __typename: 'LinkMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  sharingLink: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type EmbedMetadataV3Fragment = {
  __typename: 'EmbedMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  embed: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type CheckingInMetadataV3Fragment = {
  __typename: 'CheckingInMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  location: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  geographic: {
    __typename: 'GeoLocation';
    latitude: number | null;
    longitude: number | null;
  } | null;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type TextOnlyMetadataV3Fragment = {
  __typename: 'TextOnlyMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
};

export type ThreeDMetadataV3Fragment = {
  __typename: 'ThreeDMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  assets: Array<{
    __typename: 'ThreeDMetadataV3Asset';
    uri: string;
    zipPath: string | null;
    playerURL: string;
    format: string;
    license: Types.PublicationMetadataLicenseType | null;
  }>;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type StoryMetadataV3Fragment = {
  __typename: 'StoryMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  asset:
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment);
};

export type TransactionMetadataV3Fragment = {
  __typename: 'TransactionMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  type: Types.PublicationMetadataTransactionType;
  txHash: string;
  chainId: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type MintMetadataV3Fragment = {
  __typename: 'MintMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  mintLink: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type SpaceMetadataV3Fragment = {
  __typename: 'SpaceMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  title: string;
  link: string;
  startsAt: string;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type LiveStreamMetadataV3Fragment = {
  __typename: 'LiveStreamMetadataV3';
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  title: string;
  content: string;
  startsAt: string;
  endsAt: string;
  playbackURL: string;
  liveURL: string;
  checkLiveAPI: string | null;
  marketplace: ({ __typename: 'MarketplaceMetadata' } & MarketplaceMetadataFragment) | null;
  attributes: Array<{
    __typename: 'PublicationMetadataV3Attribute';
    key: string;
    value: string;
  }> | null;
  encryptedWith:
    | ({
        __typename: 'PublicationMetadataV3LitEncryption';
      } & PublicationMetadataEncryptionStrategyFragment)
    | null;
  attachments: Array<
    | ({ __typename: 'PublicationMetadataMediaAudio' } & PublicationMetadataMediaAudioFragment)
    | ({ __typename: 'PublicationMetadataMediaImage' } & PublicationMetadataMediaImageFragment)
    | ({ __typename: 'PublicationMetadataMediaVideo' } & PublicationMetadataMediaVideoFragment)
  > | null;
};

export type PostFragment = {
  __typename: 'Post';
  id: string;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: ({ __typename: 'App' } & AppFragment) | null;
  momoka: ({ __typename: 'MomokaInfo' } & MomokaInfoFragment) | null;
  by: { __typename: 'Profile' } & ProfileFragment;
  operations: { __typename: 'PublicationOperations' } & PublicationOperationsFragment;
  metadata:
    | ({ __typename: 'ArticleMetadataV3' } & ArticleMetadataV3Fragment)
    | ({ __typename: 'AudioMetadataV3' } & AudioMetadataV3Fragment)
    | ({ __typename: 'CheckingInMetadataV3' } & CheckingInMetadataV3Fragment)
    | ({ __typename: 'EmbedMetadataV3' } & EmbedMetadataV3Fragment)
    | ({ __typename: 'EventMetadataV3' } & EventMetadataV3Fragment)
    | ({ __typename: 'ImageMetadataV3' } & ImageMetadataV3Fragment)
    | ({ __typename: 'LegacyPublicationMetadata' } & LegacyPublicationMetadataFragment)
    | ({ __typename: 'LinkMetadataV3' } & LinkMetadataV3Fragment)
    | ({ __typename: 'LiveStreamMetadataV3' } & LiveStreamMetadataV3Fragment)
    | ({ __typename: 'MintMetadataV3' } & MintMetadataV3Fragment)
    | ({ __typename: 'SpaceMetadataV3' } & SpaceMetadataV3Fragment)
    | ({ __typename: 'StoryMetadataV3' } & StoryMetadataV3Fragment)
    | ({ __typename: 'TextOnlyMetadataV3' } & TextOnlyMetadataV3Fragment)
    | ({ __typename: 'ThreeDMetadataV3' } & ThreeDMetadataV3Fragment)
    | ({ __typename: 'TransactionMetadataV3' } & TransactionMetadataV3Fragment)
    | ({ __typename: 'VideoMetadataV3' } & VideoMetadataV3Fragment);
  openActionModules: Array<
    | ({
        __typename: 'LegacyAaveFeeCollectModuleSettings';
      } & LegacyAaveFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyERC4626FeeCollectModuleSettings';
      } & LegacyErc4626FeeCollectModuleSettingsFragment)
    | ({ __typename: 'LegacyFeeCollectModuleSettings' } & LegacyFeeCollectModuleSettingsFragment)
    | ({ __typename: 'LegacyFreeCollectModuleSettings' } & LegacyFreeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyLimitedFeeCollectModuleSettings';
      } & LegacyLimitedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyLimitedTimedFeeCollectModuleSettings';
      } & LegacyLimitedTimedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyMultirecipientFeeCollectModuleSettings';
      } & LegacyMultirecipientFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyRevertCollectModuleSettings';
      } & LegacyRevertCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacySimpleCollectModuleSettings';
      } & LegacySimpleCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyTimedFeeCollectModuleSettings';
      } & LegacyTimedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'MultirecipientFeeCollectOpenActionSettings';
      } & MultirecipientFeeCollectOpenActionSettingsFragment)
    | ({ __typename: 'SimpleCollectOpenActionSettings' } & SimpleCollectOpenActionSettingsFragment)
    | ({ __typename: 'UnknownOpenActionModuleSettings' } & UnknownOpenActionModuleSettingsFragment)
  > | null;
  referenceModule:
    | ({
        __typename: 'DegreesOfSeparationReferenceModuleSettings';
      } & DegreesOfSeparationReferenceModuleSettingsFragment)
    | ({
        __typename: 'FollowOnlyReferenceModuleSettings';
      } & FollowOnlyReferenceModuleSettingsFragment)
    | ({ __typename: 'UnknownReferenceModuleSettings' } & UnknownReferenceModuleSettingsFragment)
    | null;
};

export type CommentBaseFragment = {
  __typename: 'Comment';
  id: string;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: ({ __typename: 'App' } & AppFragment) | null;
  momoka: ({ __typename: 'MomokaInfo' } & MomokaInfoFragment) | null;
  by: { __typename: 'Profile' } & ProfileFragment;
  operations: { __typename: 'PublicationOperations' } & PublicationOperationsFragment;
  metadata:
    | ({ __typename: 'ArticleMetadataV3' } & ArticleMetadataV3Fragment)
    | ({ __typename: 'AudioMetadataV3' } & AudioMetadataV3Fragment)
    | ({ __typename: 'CheckingInMetadataV3' } & CheckingInMetadataV3Fragment)
    | ({ __typename: 'EmbedMetadataV3' } & EmbedMetadataV3Fragment)
    | ({ __typename: 'EventMetadataV3' } & EventMetadataV3Fragment)
    | ({ __typename: 'ImageMetadataV3' } & ImageMetadataV3Fragment)
    | ({ __typename: 'LegacyPublicationMetadata' } & LegacyPublicationMetadataFragment)
    | ({ __typename: 'LinkMetadataV3' } & LinkMetadataV3Fragment)
    | ({ __typename: 'LiveStreamMetadataV3' } & LiveStreamMetadataV3Fragment)
    | ({ __typename: 'MintMetadataV3' } & MintMetadataV3Fragment)
    | ({ __typename: 'SpaceMetadataV3' } & SpaceMetadataV3Fragment)
    | ({ __typename: 'StoryMetadataV3' } & StoryMetadataV3Fragment)
    | ({ __typename: 'TextOnlyMetadataV3' } & TextOnlyMetadataV3Fragment)
    | ({ __typename: 'ThreeDMetadataV3' } & ThreeDMetadataV3Fragment)
    | ({ __typename: 'TransactionMetadataV3' } & TransactionMetadataV3Fragment)
    | ({ __typename: 'VideoMetadataV3' } & VideoMetadataV3Fragment);
  openActionModules: Array<
    | ({
        __typename: 'LegacyAaveFeeCollectModuleSettings';
      } & LegacyAaveFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyERC4626FeeCollectModuleSettings';
      } & LegacyErc4626FeeCollectModuleSettingsFragment)
    | ({ __typename: 'LegacyFeeCollectModuleSettings' } & LegacyFeeCollectModuleSettingsFragment)
    | ({ __typename: 'LegacyFreeCollectModuleSettings' } & LegacyFreeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyLimitedFeeCollectModuleSettings';
      } & LegacyLimitedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyLimitedTimedFeeCollectModuleSettings';
      } & LegacyLimitedTimedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyMultirecipientFeeCollectModuleSettings';
      } & LegacyMultirecipientFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyRevertCollectModuleSettings';
      } & LegacyRevertCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacySimpleCollectModuleSettings';
      } & LegacySimpleCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyTimedFeeCollectModuleSettings';
      } & LegacyTimedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'MultirecipientFeeCollectOpenActionSettings';
      } & MultirecipientFeeCollectOpenActionSettingsFragment)
    | ({ __typename: 'SimpleCollectOpenActionSettings' } & SimpleCollectOpenActionSettingsFragment)
    | ({ __typename: 'UnknownOpenActionModuleSettings' } & UnknownOpenActionModuleSettingsFragment)
  > | null;
  referenceModule:
    | ({
        __typename: 'DegreesOfSeparationReferenceModuleSettings';
      } & DegreesOfSeparationReferenceModuleSettingsFragment)
    | ({
        __typename: 'FollowOnlyReferenceModuleSettings';
      } & FollowOnlyReferenceModuleSettingsFragment)
    | ({ __typename: 'UnknownReferenceModuleSettings' } & UnknownReferenceModuleSettingsFragment)
    | null;
};

export type CommentFragment = {
  __typename: 'Comment';
  root: { __typename: 'Post' } & PostFragment;
  commentOn:
    | ({ __typename: 'Comment' } & CommentBaseFragment)
    | ({ __typename: 'Post' } & PostFragment)
    | ({ __typename: 'Quote' } & QuoteBaseFragment);
  firstComment: ({ __typename: 'Comment' } & CommentBaseFragment) | null;
} & CommentBaseFragment;

export type MirrorFragment = {
  __typename: 'Mirror';
  id: string;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: ({ __typename: 'App' } & AppFragment) | null;
  momoka: ({ __typename: 'MomokaInfo' } & MomokaInfoFragment) | null;
  by: { __typename: 'Profile' } & ProfileFragment;
  mirrorOn:
    | ({ __typename: 'Comment' } & CommentFragment)
    | ({ __typename: 'Post' } & PostFragment)
    | ({ __typename: 'Quote' } & QuoteFragment);
};

export type QuoteBaseFragment = {
  __typename: 'Quote';
  id: string;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: ({ __typename: 'App' } & AppFragment) | null;
  momoka: ({ __typename: 'MomokaInfo' } & MomokaInfoFragment) | null;
  by: { __typename: 'Profile' } & ProfileFragment;
  operations: { __typename: 'PublicationOperations' } & PublicationOperationsFragment;
  metadata:
    | ({ __typename: 'ArticleMetadataV3' } & ArticleMetadataV3Fragment)
    | ({ __typename: 'AudioMetadataV3' } & AudioMetadataV3Fragment)
    | ({ __typename: 'CheckingInMetadataV3' } & CheckingInMetadataV3Fragment)
    | ({ __typename: 'EmbedMetadataV3' } & EmbedMetadataV3Fragment)
    | ({ __typename: 'EventMetadataV3' } & EventMetadataV3Fragment)
    | ({ __typename: 'ImageMetadataV3' } & ImageMetadataV3Fragment)
    | ({ __typename: 'LegacyPublicationMetadata' } & LegacyPublicationMetadataFragment)
    | ({ __typename: 'LinkMetadataV3' } & LinkMetadataV3Fragment)
    | ({ __typename: 'LiveStreamMetadataV3' } & LiveStreamMetadataV3Fragment)
    | ({ __typename: 'MintMetadataV3' } & MintMetadataV3Fragment)
    | ({ __typename: 'SpaceMetadataV3' } & SpaceMetadataV3Fragment)
    | ({ __typename: 'StoryMetadataV3' } & StoryMetadataV3Fragment)
    | ({ __typename: 'TextOnlyMetadataV3' } & TextOnlyMetadataV3Fragment)
    | ({ __typename: 'ThreeDMetadataV3' } & ThreeDMetadataV3Fragment)
    | ({ __typename: 'TransactionMetadataV3' } & TransactionMetadataV3Fragment)
    | ({ __typename: 'VideoMetadataV3' } & VideoMetadataV3Fragment);
  openActionModules: Array<
    | ({
        __typename: 'LegacyAaveFeeCollectModuleSettings';
      } & LegacyAaveFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyERC4626FeeCollectModuleSettings';
      } & LegacyErc4626FeeCollectModuleSettingsFragment)
    | ({ __typename: 'LegacyFeeCollectModuleSettings' } & LegacyFeeCollectModuleSettingsFragment)
    | ({ __typename: 'LegacyFreeCollectModuleSettings' } & LegacyFreeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyLimitedFeeCollectModuleSettings';
      } & LegacyLimitedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyLimitedTimedFeeCollectModuleSettings';
      } & LegacyLimitedTimedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyMultirecipientFeeCollectModuleSettings';
      } & LegacyMultirecipientFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyRevertCollectModuleSettings';
      } & LegacyRevertCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacySimpleCollectModuleSettings';
      } & LegacySimpleCollectModuleSettingsFragment)
    | ({
        __typename: 'LegacyTimedFeeCollectModuleSettings';
      } & LegacyTimedFeeCollectModuleSettingsFragment)
    | ({
        __typename: 'MultirecipientFeeCollectOpenActionSettings';
      } & MultirecipientFeeCollectOpenActionSettingsFragment)
    | ({ __typename: 'SimpleCollectOpenActionSettings' } & SimpleCollectOpenActionSettingsFragment)
    | ({ __typename: 'UnknownOpenActionModuleSettings' } & UnknownOpenActionModuleSettingsFragment)
  > | null;
  referenceModule:
    | ({
        __typename: 'DegreesOfSeparationReferenceModuleSettings';
      } & DegreesOfSeparationReferenceModuleSettingsFragment)
    | ({
        __typename: 'FollowOnlyReferenceModuleSettings';
      } & FollowOnlyReferenceModuleSettingsFragment)
    | ({ __typename: 'UnknownReferenceModuleSettings' } & UnknownReferenceModuleSettingsFragment)
    | null;
};

export type QuoteFragment = {
  __typename: 'Quote';
  quoteOn:
    | ({ __typename: 'Comment' } & CommentBaseFragment)
    | ({ __typename: 'Post' } & PostFragment)
    | ({ __typename: 'Quote' } & QuoteBaseFragment);
} & QuoteBaseFragment;

export type Eip712TypedDataDomainFragment = {
  __typename: 'EIP712TypedDataDomain';
  name: string;
  chainId: string;
  version: string;
  verifyingContract: string;
};

export type Eip712TypedDataFieldFragment = {
  __typename: 'EIP712TypedDataField';
  name: string;
  type: string;
};

export type CreateActOnOpenActionEip712TypedDataFragment = {
  __typename: 'CreateActOnOpenActionEIP712TypedData';
  types: {
    __typename: 'CreateActOnOpenActionEIP712TypedDataTypes';
    Act: Array<{ __typename: 'EIP712TypedDataField' } & Eip712TypedDataFieldFragment>;
  };
  domain: { __typename: 'EIP712TypedDataDomain' } & Eip712TypedDataDomainFragment;
  value: {
    __typename: 'CreateActOnOpenActionEIP712TypedDataValue';
    nonce: string;
    deadline: string;
    publicationActedProfileId: string;
    publicationActedId: string;
    actorProfileId: string;
    referrerProfileIds: Array<string>;
    referrerPubIds: Array<string>;
    actionModuleAddress: string;
    actionModuleData: string;
  };
};

export type RelaySuccessFragment = {
  __typename: 'RelaySuccess';
  txHash: string | null;
  txId: string | null;
};

export type RelayErrorFragment = { __typename: 'RelayError'; reason: Types.RelayErrorReasonType };

export type LensProfileManagerRelayErrorFragment = {
  __typename: 'LensProfileManagerRelayError';
  reason: Types.LensProfileManagerRelayErrorReasonType;
};

export type CreateMomokaPublicationResultFragment = {
  __typename: 'CreateMomokaPublicationResult';
  id: string;
  proof: string;
  momokaId: string;
};

export const PaginatedResultInfoFragmentDoc = gql`
  fragment PaginatedResultInfo on PaginatedResultInfo {
    prev
    next
  }
`;
export const AppFragmentDoc = gql`
  fragment App on App {
    id
  }
`;
export const MomokaInfoFragmentDoc = gql`
  fragment MomokaInfo on MomokaInfo {
    proof
  }
`;
export const NetworkAddressFragmentDoc = gql`
  fragment NetworkAddress on NetworkAddress {
    address
    chainId
  }
`;
export const OptimisticStatusResultFragmentDoc = gql`
  fragment OptimisticStatusResult on OptimisticStatusResult {
    value
    isFinalisedOnchain
  }
`;
export const Erc20FragmentDoc = gql`
  fragment Erc20 on Erc20 {
    name
    symbol
    decimals
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const FiatFragmentDoc = gql`
  fragment Fiat on Fiat {
    name
    symbol
    decimals
  }
`;
export const FiatAmountFragmentDoc = gql`
  fragment FiatAmount on FiatAmount {
    asset {
      ...Fiat
    }
    value
  }
  ${FiatFragmentDoc}
`;
export const AmountFragmentDoc = gql`
  fragment Amount on Amount {
    asset {
      ...Erc20
    }
    value
    rate(request: $rateRequest) {
      ...FiatAmount
    }
  }
  ${Erc20FragmentDoc}
  ${FiatAmountFragmentDoc}
`;
export const FeeFollowModuleSettingsFragmentDoc = gql`
  fragment FeeFollowModuleSettings on FeeFollowModuleSettings {
    amount {
      ...Amount
    }
    contract {
      ...NetworkAddress
    }
    recipient
  }
  ${AmountFragmentDoc}
  ${NetworkAddressFragmentDoc}
`;
export const RevertFollowModuleSettingsFragmentDoc = gql`
  fragment RevertFollowModuleSettings on RevertFollowModuleSettings {
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const UnknownFollowModuleSettingsFragmentDoc = gql`
  fragment UnknownFollowModuleSettings on UnknownFollowModuleSettings {
    contract {
      ...NetworkAddress
    }
    followModuleReturnData
  }
  ${NetworkAddressFragmentDoc}
`;
export const ImageFragmentDoc = gql`
  fragment Image on Image {
    uri
    mimeType
    width
    height
  }
`;
export const ProfilePictureSetFragmentDoc = gql`
  fragment ProfilePictureSet on ImageSet {
    raw {
      ...Image
    }
    optimized {
      ...Image
    }
    transformed(request: $profilePictureTransform) {
      ...Image
    }
  }
  ${ImageFragmentDoc}
`;
export const NftImageFragmentDoc = gql`
  fragment NftImage on NftImage {
    collection {
      ...NetworkAddress
    }
    tokenId
    image {
      ...ProfilePictureSet
    }
    verified
  }
  ${NetworkAddressFragmentDoc}
  ${ProfilePictureSetFragmentDoc}
`;
export const ProfileCoverSetFragmentDoc = gql`
  fragment ProfileCoverSet on ImageSet {
    raw {
      ...Image
    }
    optimized {
      ...Image
    }
    transformed(request: $profileCoverTransform) {
      ...Image
    }
  }
  ${ImageFragmentDoc}
`;
export const ProfileFragmentDoc = gql`
  fragment Profile on Profile {
    id
    ownedBy {
      ...NetworkAddress
    }
    txHash
    createdAt
    operations {
      id
      isBlockedByMe {
        ...OptimisticStatusResult
      }
      isFollowedByMe {
        ...OptimisticStatusResult
      }
      isFollowingMe {
        ...OptimisticStatusResult
      }
      canBlock
      canUnblock
      canFollow
      canUnfollow
    }
    interests
    guardian {
      protected
      cooldownEndsOn
    }
    invitesLeft
    onchainIdentity {
      proofOfHumanity
      ens {
        name
      }
      sybilDotOrg {
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
    followNftAddress {
      ...NetworkAddress
    }
    followModule {
      ... on FeeFollowModuleSettings {
        ...FeeFollowModuleSettings
      }
      ... on RevertFollowModuleSettings {
        ...RevertFollowModuleSettings
      }
      ... on UnknownFollowModuleSettings {
        ...UnknownFollowModuleSettings
      }
    }
    metadata {
      displayName
      bio
      rawURI
      picture {
        ... on ImageSet {
          ...ProfilePictureSet
        }
        ... on NftImage {
          ...NftImage
        }
      }
      coverPicture {
        ...ProfileCoverSet
      }
      attributes {
        type
        key
        value
      }
    }
    handle
    sponsor
    lensManager
    invitedBy {
      id
    }
  }
  ${NetworkAddressFragmentDoc}
  ${OptimisticStatusResultFragmentDoc}
  ${FeeFollowModuleSettingsFragmentDoc}
  ${RevertFollowModuleSettingsFragmentDoc}
  ${UnknownFollowModuleSettingsFragmentDoc}
  ${ProfilePictureSetFragmentDoc}
  ${NftImageFragmentDoc}
  ${ProfileCoverSetFragmentDoc}
`;
export const KnownCollectOpenActionResultFragmentDoc = gql`
  fragment KnownCollectOpenActionResult on KnownCollectOpenActionResult {
    type
  }
`;
export const UnknownOpenActionResultFragmentDoc = gql`
  fragment UnknownOpenActionResult on UnknownOpenActionResult {
    address
    category
    initReturnData
  }
`;
export const OpenActionResultFragmentDoc = gql`
  fragment OpenActionResult on OpenActionResult {
    ... on KnownCollectOpenActionResult {
      ...KnownCollectOpenActionResult
    }
    ... on UnknownOpenActionResult {
      ...UnknownOpenActionResult
    }
  }
  ${KnownCollectOpenActionResultFragmentDoc}
  ${UnknownOpenActionResultFragmentDoc}
`;
export const CanDecryptResponseFragmentDoc = gql`
  fragment CanDecryptResponse on CanDecryptResponse {
    result
    reasons
    extraDetails
  }
`;
export const PublicationOperationsFragmentDoc = gql`
  fragment PublicationOperations on PublicationOperations {
    isNotInterested
    hasBookmarked
    hasReported
    canAct(request: $publicationOperationsActedArgs)
    hasActed(request: $publicationOperationsActedArgs) {
      ...OptimisticStatusResult
    }
    actedOn(request: $publicationOperationsActedArgs) {
      ...OpenActionResult
    }
    hasUpvoted: hasReacted(request: { type: UPVOTE })
    hasDownvoted: hasReacted(request: { type: DOWNVOTE })
    canComment
    canMirror
    hasMirrored
    canDecrypt {
      ...CanDecryptResponse
    }
  }
  ${OptimisticStatusResultFragmentDoc}
  ${OpenActionResultFragmentDoc}
  ${CanDecryptResponseFragmentDoc}
`;
export const AudioFragmentDoc = gql`
  fragment Audio on Audio {
    uri
    mimeType
  }
`;
export const AudioSetFragmentDoc = gql`
  fragment AudioSet on AudioSet {
    raw {
      ...Audio
    }
    optimized {
      ...Audio
    }
  }
  ${AudioFragmentDoc}
`;
export const PublicationImageSetFragmentDoc = gql`
  fragment PublicationImageSet on ImageSet {
    raw {
      ...Image
    }
    optimized {
      ...Image
    }
    transformed(request: $publicationImageTransform) {
      ...Image
    }
  }
  ${ImageFragmentDoc}
`;
export const LegacyAudioItemFragmentDoc = gql`
  fragment LegacyAudioItem on LegacyAudioItem {
    audio {
      ...AudioSet
    }
    cover {
      ...PublicationImageSet
    }
    altTag
  }
  ${AudioSetFragmentDoc}
  ${PublicationImageSetFragmentDoc}
`;
export const LegacyImageItemFragmentDoc = gql`
  fragment LegacyImageItem on LegacyImageItem {
    image {
      ...PublicationImageSet
    }
    altTag
  }
  ${PublicationImageSetFragmentDoc}
`;
export const VideoFragmentDoc = gql`
  fragment Video on Video {
    uri
    mimeType
  }
`;
export const VideoSetFragmentDoc = gql`
  fragment VideoSet on VideoSet {
    raw {
      ...Video
    }
    optimized {
      ...Video
    }
  }
  ${VideoFragmentDoc}
`;
export const LegacyVideoItemFragmentDoc = gql`
  fragment LegacyVideoItem on LegacyVideoItem {
    video {
      ...VideoSet
    }
    cover {
      ...PublicationImageSet
    }
    altTag
  }
  ${VideoSetFragmentDoc}
  ${PublicationImageSetFragmentDoc}
`;
export const PublicationMarketplaceMetadataAttributeFragmentDoc = gql`
  fragment PublicationMarketplaceMetadataAttribute on PublicationMarketplaceMetadataAttribute {
    displayType
    traitType
    value
  }
`;
export const MarketplaceMetadataFragmentDoc = gql`
  fragment MarketplaceMetadata on MarketplaceMetadata {
    description
    externalURL
    name
    attributes {
      ...PublicationMarketplaceMetadataAttribute
    }
    image {
      ...PublicationImageSet
    }
    animationUrl
  }
  ${PublicationMarketplaceMetadataAttributeFragmentDoc}
  ${PublicationImageSetFragmentDoc}
`;
export const NftOwnershipConditionFragmentDoc = gql`
  fragment NftOwnershipCondition on NftOwnershipCondition {
    contract {
      ...NetworkAddress
    }
    contractType
    tokenIds
  }
  ${NetworkAddressFragmentDoc}
`;
export const Erc20OwnershipConditionFragmentDoc = gql`
  fragment Erc20OwnershipCondition on Erc20OwnershipCondition {
    amount {
      ...Amount
    }
    condition
  }
  ${AmountFragmentDoc}
`;
export const EoaOwnershipConditionFragmentDoc = gql`
  fragment EoaOwnershipCondition on EoaOwnershipCondition {
    address
  }
`;
export const ProfileOwnershipConditionFragmentDoc = gql`
  fragment ProfileOwnershipCondition on ProfileOwnershipCondition {
    profileId
  }
`;
export const FollowConditionFragmentDoc = gql`
  fragment FollowCondition on FollowCondition {
    follow
  }
`;
export const CollectConditionFragmentDoc = gql`
  fragment CollectCondition on CollectCondition {
    publicationId
    thisPublication
  }
`;
export const AndConditionFragmentDoc = gql`
  fragment AndCondition on AndCondition {
    criteria {
      ... on NftOwnershipCondition {
        ...NftOwnershipCondition
      }
      ... on Erc20OwnershipCondition {
        ...Erc20OwnershipCondition
      }
      ... on EoaOwnershipCondition {
        ...EoaOwnershipCondition
      }
      ... on ProfileOwnershipCondition {
        ...ProfileOwnershipCondition
      }
      ... on FollowCondition {
        ...FollowCondition
      }
      ... on CollectCondition {
        ...CollectCondition
      }
    }
  }
  ${NftOwnershipConditionFragmentDoc}
  ${Erc20OwnershipConditionFragmentDoc}
  ${EoaOwnershipConditionFragmentDoc}
  ${ProfileOwnershipConditionFragmentDoc}
  ${FollowConditionFragmentDoc}
  ${CollectConditionFragmentDoc}
`;
export const OrConditionFragmentDoc = gql`
  fragment OrCondition on OrCondition {
    criteria {
      ... on NftOwnershipCondition {
        ...NftOwnershipCondition
      }
      ... on Erc20OwnershipCondition {
        ...Erc20OwnershipCondition
      }
      ... on EoaOwnershipCondition {
        ...EoaOwnershipCondition
      }
      ... on ProfileOwnershipCondition {
        ...ProfileOwnershipCondition
      }
      ... on FollowCondition {
        ...FollowCondition
      }
      ... on CollectCondition {
        ...CollectCondition
      }
    }
  }
  ${NftOwnershipConditionFragmentDoc}
  ${Erc20OwnershipConditionFragmentDoc}
  ${EoaOwnershipConditionFragmentDoc}
  ${ProfileOwnershipConditionFragmentDoc}
  ${FollowConditionFragmentDoc}
  ${CollectConditionFragmentDoc}
`;
export const LegacyPublicationMetadataFragmentDoc = gql`
  fragment LegacyPublicationMetadata on LegacyPublicationMetadata {
    content
    media {
      ... on LegacyAudioItem {
        ...LegacyAudioItem
      }
      ... on LegacyImageItem {
        ...LegacyImageItem
      }
      ... on LegacyVideoItem {
        ...LegacyVideoItem
      }
    }
    locale
    tags
    contentWarning
    mainContentFocus
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      encryptionKey
      encryptedFields {
        content
        image
        media {
          uri
          mimeType
          altTag
          cover
        }
        animationUrl
        externalUrl
      }
      accessCondition {
        ... on NftOwnershipCondition {
          ...NftOwnershipCondition
        }
        ... on Erc20OwnershipCondition {
          ...Erc20OwnershipCondition
        }
        ... on EoaOwnershipCondition {
          ...EoaOwnershipCondition
        }
        ... on ProfileOwnershipCondition {
          ...ProfileOwnershipCondition
        }
        ... on FollowCondition {
          ...FollowCondition
        }
        ... on CollectCondition {
          ...CollectCondition
        }
        ... on AndCondition {
          ...AndCondition
        }
        ... on OrCondition {
          ...OrCondition
        }
      }
    }
  }
  ${LegacyAudioItemFragmentDoc}
  ${LegacyImageItemFragmentDoc}
  ${LegacyVideoItemFragmentDoc}
  ${MarketplaceMetadataFragmentDoc}
  ${NftOwnershipConditionFragmentDoc}
  ${Erc20OwnershipConditionFragmentDoc}
  ${EoaOwnershipConditionFragmentDoc}
  ${ProfileOwnershipConditionFragmentDoc}
  ${FollowConditionFragmentDoc}
  ${CollectConditionFragmentDoc}
  ${AndConditionFragmentDoc}
  ${OrConditionFragmentDoc}
`;
export const PublicationMetadataEncryptionStrategyFragmentDoc = gql`
  fragment PublicationMetadataEncryptionStrategy on PublicationMetadataV3LitEncryption {
    encryptionKey
    accessCondition {
      ... on NftOwnershipCondition {
        ...NftOwnershipCondition
      }
      ... on Erc20OwnershipCondition {
        ...Erc20OwnershipCondition
      }
      ... on EoaOwnershipCondition {
        ...EoaOwnershipCondition
      }
      ... on ProfileOwnershipCondition {
        ...ProfileOwnershipCondition
      }
      ... on FollowCondition {
        ...FollowCondition
      }
      ... on CollectCondition {
        ...CollectCondition
      }
      ... on AndCondition {
        ...AndCondition
      }
      ... on OrCondition {
        ...OrCondition
      }
    }
  }
  ${NftOwnershipConditionFragmentDoc}
  ${Erc20OwnershipConditionFragmentDoc}
  ${EoaOwnershipConditionFragmentDoc}
  ${ProfileOwnershipConditionFragmentDoc}
  ${FollowConditionFragmentDoc}
  ${CollectConditionFragmentDoc}
  ${AndConditionFragmentDoc}
  ${OrConditionFragmentDoc}
`;
export const EncryptableAudioFragmentDoc = gql`
  fragment EncryptableAudio on EncryptableAudio {
    mimeType
    uri
  }
`;
export const EncryptableAudioSetFragmentDoc = gql`
  fragment EncryptableAudioSet on EncryptableAudioSet {
    raw {
      ...EncryptableAudio
    }
    optimized {
      ...Audio
    }
  }
  ${EncryptableAudioFragmentDoc}
  ${AudioFragmentDoc}
`;
export const EncryptableImageFragmentDoc = gql`
  fragment EncryptableImage on EncryptableImage {
    uri
    mimeType
    width
    height
  }
`;
export const PublicationEncryptableImageSetFragmentDoc = gql`
  fragment PublicationEncryptableImageSet on EncryptableImageSet {
    raw {
      ...EncryptableImage
    }
    optimized {
      ...Image
    }
  }
  ${EncryptableImageFragmentDoc}
  ${ImageFragmentDoc}
`;
export const PublicationMetadataMediaAudioFragmentDoc = gql`
  fragment PublicationMetadataMediaAudio on PublicationMetadataMediaAudio {
    audio {
      ...EncryptableAudioSet
    }
    cover {
      ...PublicationEncryptableImageSet
    }
    duration
    license
    credits
    artist
    genre
    recordLabel
    lyrics
  }
  ${EncryptableAudioSetFragmentDoc}
  ${PublicationEncryptableImageSetFragmentDoc}
`;
export const EncryptableVideoFragmentDoc = gql`
  fragment EncryptableVideo on EncryptableVideo {
    mimeType
    uri
  }
`;
export const EncryptableVideoSetFragmentDoc = gql`
  fragment EncryptableVideoSet on EncryptableVideoSet {
    raw {
      ...EncryptableVideo
    }
    optimized {
      ...Video
    }
  }
  ${EncryptableVideoFragmentDoc}
  ${VideoFragmentDoc}
`;
export const PublicationMetadataMediaVideoFragmentDoc = gql`
  fragment PublicationMetadataMediaVideo on PublicationMetadataMediaVideo {
    video {
      ...EncryptableVideoSet
    }
    cover {
      ...PublicationEncryptableImageSet
    }
    duration
    license
    altTag
  }
  ${EncryptableVideoSetFragmentDoc}
  ${PublicationEncryptableImageSetFragmentDoc}
`;
export const PublicationMetadataMediaImageFragmentDoc = gql`
  fragment PublicationMetadataMediaImage on PublicationMetadataMediaImage {
    image {
      ...PublicationEncryptableImageSet
    }
    license
  }
  ${PublicationEncryptableImageSetFragmentDoc}
`;
export const AudioMetadataV3FragmentDoc = gql`
  fragment AudioMetadataV3 on AudioMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    asset {
      ...PublicationMetadataMediaAudio
    }
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
    title
    content
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
`;
export const VideoMetadataV3FragmentDoc = gql`
  fragment VideoMetadataV3 on VideoMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    asset {
      ...PublicationMetadataMediaVideo
    }
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
    isShortVideo
    title
    content
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const ImageMetadataV3FragmentDoc = gql`
  fragment ImageMetadataV3 on ImageMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    title
    content
    asset {
      ...PublicationMetadataMediaImage
    }
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const ArticleMetadataV3FragmentDoc = gql`
  fragment ArticleMetadataV3 on ArticleMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    title
    content
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const EventMetadataV3FragmentDoc = gql`
  fragment EventMetadataV3 on EventMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    geographic {
      latitude
      longitude
    }
    startsAt
    endsAt
    links
    location
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const LinkMetadataV3FragmentDoc = gql`
  fragment LinkMetadataV3 on LinkMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    content
    sharingLink
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const EmbedMetadataV3FragmentDoc = gql`
  fragment EmbedMetadataV3 on EmbedMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    content
    embed
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const CheckingInMetadataV3FragmentDoc = gql`
  fragment CheckingInMetadataV3 on CheckingInMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    content
    location
    geographic {
      latitude
      longitude
    }
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const TextOnlyMetadataV3FragmentDoc = gql`
  fragment TextOnlyMetadataV3 on TextOnlyMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    content
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
`;
export const ThreeDMetadataV3FragmentDoc = gql`
  fragment ThreeDMetadataV3 on ThreeDMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    content
    assets {
      uri
      zipPath
      playerURL
      format
      license
    }
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const StoryMetadataV3FragmentDoc = gql`
  fragment StoryMetadataV3 on StoryMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    content
    asset {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const TransactionMetadataV3FragmentDoc = gql`
  fragment TransactionMetadataV3 on TransactionMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    content
    type
    txHash
    chainId
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const MintMetadataV3FragmentDoc = gql`
  fragment MintMetadataV3 on MintMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    content
    mintLink
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const SpaceMetadataV3FragmentDoc = gql`
  fragment SpaceMetadataV3 on SpaceMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    content
    title
    link
    startsAt
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const LiveStreamMetadataV3FragmentDoc = gql`
  fragment LiveStreamMetadataV3 on LiveStreamMetadataV3 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    attributes {
      key
      value
    }
    encryptedWith {
      ... on PublicationMetadataEncryptionStrategy {
        ...PublicationMetadataEncryptionStrategy
      }
    }
    title
    content
    startsAt
    endsAt
    playbackURL
    liveURL
    checkLiveAPI
    attachments {
      ... on PublicationMetadataMediaVideo {
        ...PublicationMetadataMediaVideo
      }
      ... on PublicationMetadataMediaImage {
        ...PublicationMetadataMediaImage
      }
      ... on PublicationMetadataMediaAudio {
        ...PublicationMetadataMediaAudio
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataEncryptionStrategyFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const LegacyFreeCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyFreeCollectModuleSettings on LegacyFreeCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    followerOnly
  }
  ${NetworkAddressFragmentDoc}
`;
export const LegacyFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyFeeCollectModuleSettings on LegacyFeeCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const LegacyLimitedFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyLimitedFeeCollectModuleSettings on LegacyLimitedFeeCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    collectLimit
    amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const LegacyLimitedTimedFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyLimitedTimedFeeCollectModuleSettings on LegacyLimitedTimedFeeCollectModuleSettings {
    contract {
      address
    }
    collectLimit
    amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
    endTimestamp
  }
  ${AmountFragmentDoc}
`;
export const LegacyRevertCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyRevertCollectModuleSettings on LegacyRevertCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const LegacyTimedFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyTimedFeeCollectModuleSettings on LegacyTimedFeeCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
    endTimestamp
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const LegacyMultirecipientFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyMultirecipientFeeCollectModuleSettings on LegacyMultirecipientFeeCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    recipients {
      recipient
      split
    }
    referralFee
    followerOnly
    collectLimit
    endsAt
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const LegacySimpleCollectModuleSettingsFragmentDoc = gql`
  fragment LegacySimpleCollectModuleSettings on LegacySimpleCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
    collectLimit
    endsAt
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const LegacyErc4626FeeCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyERC4626FeeCollectModuleSettings on LegacyERC4626FeeCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    vault {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
    collectLimit
    endsAt
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const LegacyAaveFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyAaveFeeCollectModuleSettings on LegacyAaveFeeCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
    collectLimit
    endsAt
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const MultirecipientFeeCollectOpenActionSettingsFragmentDoc = gql`
  fragment MultirecipientFeeCollectOpenActionSettings on MultirecipientFeeCollectOpenActionSettings {
    contract {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    recipients {
      recipient
      split
    }
    referralFee
    followerOnly
    collectLimit
    endsAt
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const SimpleCollectOpenActionSettingsFragmentDoc = gql`
  fragment SimpleCollectOpenActionSettings on SimpleCollectOpenActionSettings {
    contract {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
    collectLimit
    endsAt
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const UnknownOpenActionModuleSettingsFragmentDoc = gql`
  fragment UnknownOpenActionModuleSettings on UnknownOpenActionModuleSettings {
    contract {
      ...NetworkAddress
    }
    openActionModuleReturnData
  }
  ${NetworkAddressFragmentDoc}
`;
export const FollowOnlyReferenceModuleSettingsFragmentDoc = gql`
  fragment FollowOnlyReferenceModuleSettings on FollowOnlyReferenceModuleSettings {
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const DegreesOfSeparationReferenceModuleSettingsFragmentDoc = gql`
  fragment DegreesOfSeparationReferenceModuleSettings on DegreesOfSeparationReferenceModuleSettings {
    contract {
      ...NetworkAddress
    }
    commentsRestricted
    mirrorsRestricted
    degreesOfSeparation
  }
  ${NetworkAddressFragmentDoc}
`;
export const UnknownReferenceModuleSettingsFragmentDoc = gql`
  fragment UnknownReferenceModuleSettings on UnknownReferenceModuleSettings {
    contract {
      ...NetworkAddress
    }
    referenceModuleReturnData
  }
  ${NetworkAddressFragmentDoc}
`;
export const PostFragmentDoc = gql`
  fragment Post on Post {
    id
    publishedOn {
      ...App
    }
    isHidden
    momoka {
      ...MomokaInfo
    }
    txHash
    createdAt
    by {
      ...Profile
    }
    operations {
      ...PublicationOperations
    }
    metadata {
      ... on LegacyPublicationMetadata {
        ...LegacyPublicationMetadata
      }
      ... on AudioMetadataV3 {
        ...AudioMetadataV3
      }
      ... on VideoMetadataV3 {
        ...VideoMetadataV3
      }
      ... on ImageMetadataV3 {
        ...ImageMetadataV3
      }
      ... on ArticleMetadataV3 {
        ...ArticleMetadataV3
      }
      ... on EventMetadataV3 {
        ...EventMetadataV3
      }
      ... on LinkMetadataV3 {
        ...LinkMetadataV3
      }
      ... on EmbedMetadataV3 {
        ...EmbedMetadataV3
      }
      ... on CheckingInMetadataV3 {
        ...CheckingInMetadataV3
      }
      ... on TextOnlyMetadataV3 {
        ...TextOnlyMetadataV3
      }
      ... on ThreeDMetadataV3 {
        ...ThreeDMetadataV3
      }
      ... on StoryMetadataV3 {
        ...StoryMetadataV3
      }
      ... on TransactionMetadataV3 {
        ...TransactionMetadataV3
      }
      ... on MintMetadataV3 {
        ...MintMetadataV3
      }
      ... on SpaceMetadataV3 {
        ...SpaceMetadataV3
      }
      ... on LiveStreamMetadataV3 {
        ...LiveStreamMetadataV3
      }
    }
    openActionModules {
      ... on LegacyFreeCollectModuleSettings {
        ...LegacyFreeCollectModuleSettings
      }
      ... on LegacyFeeCollectModuleSettings {
        ...LegacyFeeCollectModuleSettings
      }
      ... on LegacyLimitedFeeCollectModuleSettings {
        ...LegacyLimitedFeeCollectModuleSettings
      }
      ... on LegacyLimitedTimedFeeCollectModuleSettings {
        ...LegacyLimitedTimedFeeCollectModuleSettings
      }
      ... on LegacyRevertCollectModuleSettings {
        ...LegacyRevertCollectModuleSettings
      }
      ... on LegacyTimedFeeCollectModuleSettings {
        ...LegacyTimedFeeCollectModuleSettings
      }
      ... on LegacyMultirecipientFeeCollectModuleSettings {
        ...LegacyMultirecipientFeeCollectModuleSettings
      }
      ... on LegacySimpleCollectModuleSettings {
        ...LegacySimpleCollectModuleSettings
      }
      ... on LegacyERC4626FeeCollectModuleSettings {
        ...LegacyERC4626FeeCollectModuleSettings
      }
      ... on LegacyAaveFeeCollectModuleSettings {
        ...LegacyAaveFeeCollectModuleSettings
      }
      ... on MultirecipientFeeCollectOpenActionSettings {
        ...MultirecipientFeeCollectOpenActionSettings
      }
      ... on SimpleCollectOpenActionSettings {
        ...SimpleCollectOpenActionSettings
      }
      ... on UnknownOpenActionModuleSettings {
        ...UnknownOpenActionModuleSettings
      }
    }
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
  }
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
  ${ProfileFragmentDoc}
  ${PublicationOperationsFragmentDoc}
  ${LegacyPublicationMetadataFragmentDoc}
  ${AudioMetadataV3FragmentDoc}
  ${VideoMetadataV3FragmentDoc}
  ${ImageMetadataV3FragmentDoc}
  ${ArticleMetadataV3FragmentDoc}
  ${EventMetadataV3FragmentDoc}
  ${LinkMetadataV3FragmentDoc}
  ${EmbedMetadataV3FragmentDoc}
  ${CheckingInMetadataV3FragmentDoc}
  ${TextOnlyMetadataV3FragmentDoc}
  ${ThreeDMetadataV3FragmentDoc}
  ${StoryMetadataV3FragmentDoc}
  ${TransactionMetadataV3FragmentDoc}
  ${MintMetadataV3FragmentDoc}
  ${SpaceMetadataV3FragmentDoc}
  ${LiveStreamMetadataV3FragmentDoc}
  ${LegacyFreeCollectModuleSettingsFragmentDoc}
  ${LegacyFeeCollectModuleSettingsFragmentDoc}
  ${LegacyLimitedFeeCollectModuleSettingsFragmentDoc}
  ${LegacyLimitedTimedFeeCollectModuleSettingsFragmentDoc}
  ${LegacyRevertCollectModuleSettingsFragmentDoc}
  ${LegacyTimedFeeCollectModuleSettingsFragmentDoc}
  ${LegacyMultirecipientFeeCollectModuleSettingsFragmentDoc}
  ${LegacySimpleCollectModuleSettingsFragmentDoc}
  ${LegacyErc4626FeeCollectModuleSettingsFragmentDoc}
  ${LegacyAaveFeeCollectModuleSettingsFragmentDoc}
  ${MultirecipientFeeCollectOpenActionSettingsFragmentDoc}
  ${SimpleCollectOpenActionSettingsFragmentDoc}
  ${UnknownOpenActionModuleSettingsFragmentDoc}
  ${FollowOnlyReferenceModuleSettingsFragmentDoc}
  ${DegreesOfSeparationReferenceModuleSettingsFragmentDoc}
  ${UnknownReferenceModuleSettingsFragmentDoc}
`;
export const CommentBaseFragmentDoc = gql`
  fragment CommentBase on Comment {
    id
    publishedOn {
      ...App
    }
    isHidden
    momoka {
      ...MomokaInfo
    }
    txHash
    createdAt
    by {
      ...Profile
    }
    operations {
      ...PublicationOperations
    }
    metadata {
      ... on LegacyPublicationMetadata {
        ...LegacyPublicationMetadata
      }
      ... on AudioMetadataV3 {
        ...AudioMetadataV3
      }
      ... on VideoMetadataV3 {
        ...VideoMetadataV3
      }
      ... on ImageMetadataV3 {
        ...ImageMetadataV3
      }
      ... on ArticleMetadataV3 {
        ...ArticleMetadataV3
      }
      ... on EventMetadataV3 {
        ...EventMetadataV3
      }
      ... on LinkMetadataV3 {
        ...LinkMetadataV3
      }
      ... on EmbedMetadataV3 {
        ...EmbedMetadataV3
      }
      ... on CheckingInMetadataV3 {
        ...CheckingInMetadataV3
      }
      ... on TextOnlyMetadataV3 {
        ...TextOnlyMetadataV3
      }
      ... on ThreeDMetadataV3 {
        ...ThreeDMetadataV3
      }
      ... on StoryMetadataV3 {
        ...StoryMetadataV3
      }
      ... on TransactionMetadataV3 {
        ...TransactionMetadataV3
      }
      ... on MintMetadataV3 {
        ...MintMetadataV3
      }
      ... on SpaceMetadataV3 {
        ...SpaceMetadataV3
      }
      ... on LiveStreamMetadataV3 {
        ...LiveStreamMetadataV3
      }
    }
    openActionModules {
      ... on LegacyFreeCollectModuleSettings {
        ...LegacyFreeCollectModuleSettings
      }
      ... on LegacyFeeCollectModuleSettings {
        ...LegacyFeeCollectModuleSettings
      }
      ... on LegacyLimitedFeeCollectModuleSettings {
        ...LegacyLimitedFeeCollectModuleSettings
      }
      ... on LegacyLimitedTimedFeeCollectModuleSettings {
        ...LegacyLimitedTimedFeeCollectModuleSettings
      }
      ... on LegacyRevertCollectModuleSettings {
        ...LegacyRevertCollectModuleSettings
      }
      ... on LegacyTimedFeeCollectModuleSettings {
        ...LegacyTimedFeeCollectModuleSettings
      }
      ... on LegacyMultirecipientFeeCollectModuleSettings {
        ...LegacyMultirecipientFeeCollectModuleSettings
      }
      ... on LegacySimpleCollectModuleSettings {
        ...LegacySimpleCollectModuleSettings
      }
      ... on LegacyERC4626FeeCollectModuleSettings {
        ...LegacyERC4626FeeCollectModuleSettings
      }
      ... on LegacyAaveFeeCollectModuleSettings {
        ...LegacyAaveFeeCollectModuleSettings
      }
      ... on MultirecipientFeeCollectOpenActionSettings {
        ...MultirecipientFeeCollectOpenActionSettings
      }
      ... on SimpleCollectOpenActionSettings {
        ...SimpleCollectOpenActionSettings
      }
      ... on UnknownOpenActionModuleSettings {
        ...UnknownOpenActionModuleSettings
      }
    }
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
  }
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
  ${ProfileFragmentDoc}
  ${PublicationOperationsFragmentDoc}
  ${LegacyPublicationMetadataFragmentDoc}
  ${AudioMetadataV3FragmentDoc}
  ${VideoMetadataV3FragmentDoc}
  ${ImageMetadataV3FragmentDoc}
  ${ArticleMetadataV3FragmentDoc}
  ${EventMetadataV3FragmentDoc}
  ${LinkMetadataV3FragmentDoc}
  ${EmbedMetadataV3FragmentDoc}
  ${CheckingInMetadataV3FragmentDoc}
  ${TextOnlyMetadataV3FragmentDoc}
  ${ThreeDMetadataV3FragmentDoc}
  ${StoryMetadataV3FragmentDoc}
  ${TransactionMetadataV3FragmentDoc}
  ${MintMetadataV3FragmentDoc}
  ${SpaceMetadataV3FragmentDoc}
  ${LiveStreamMetadataV3FragmentDoc}
  ${LegacyFreeCollectModuleSettingsFragmentDoc}
  ${LegacyFeeCollectModuleSettingsFragmentDoc}
  ${LegacyLimitedFeeCollectModuleSettingsFragmentDoc}
  ${LegacyLimitedTimedFeeCollectModuleSettingsFragmentDoc}
  ${LegacyRevertCollectModuleSettingsFragmentDoc}
  ${LegacyTimedFeeCollectModuleSettingsFragmentDoc}
  ${LegacyMultirecipientFeeCollectModuleSettingsFragmentDoc}
  ${LegacySimpleCollectModuleSettingsFragmentDoc}
  ${LegacyErc4626FeeCollectModuleSettingsFragmentDoc}
  ${LegacyAaveFeeCollectModuleSettingsFragmentDoc}
  ${MultirecipientFeeCollectOpenActionSettingsFragmentDoc}
  ${SimpleCollectOpenActionSettingsFragmentDoc}
  ${UnknownOpenActionModuleSettingsFragmentDoc}
  ${FollowOnlyReferenceModuleSettingsFragmentDoc}
  ${DegreesOfSeparationReferenceModuleSettingsFragmentDoc}
  ${UnknownReferenceModuleSettingsFragmentDoc}
`;
export const QuoteBaseFragmentDoc = gql`
  fragment QuoteBase on Quote {
    id
    publishedOn {
      ...App
    }
    isHidden
    momoka {
      ...MomokaInfo
    }
    txHash
    createdAt
    by {
      ...Profile
    }
    operations {
      ...PublicationOperations
    }
    metadata {
      ... on LegacyPublicationMetadata {
        ...LegacyPublicationMetadata
      }
      ... on AudioMetadataV3 {
        ...AudioMetadataV3
      }
      ... on VideoMetadataV3 {
        ...VideoMetadataV3
      }
      ... on ImageMetadataV3 {
        ...ImageMetadataV3
      }
      ... on ArticleMetadataV3 {
        ...ArticleMetadataV3
      }
      ... on EventMetadataV3 {
        ...EventMetadataV3
      }
      ... on LinkMetadataV3 {
        ...LinkMetadataV3
      }
      ... on EmbedMetadataV3 {
        ...EmbedMetadataV3
      }
      ... on CheckingInMetadataV3 {
        ...CheckingInMetadataV3
      }
      ... on TextOnlyMetadataV3 {
        ...TextOnlyMetadataV3
      }
      ... on ThreeDMetadataV3 {
        ...ThreeDMetadataV3
      }
      ... on StoryMetadataV3 {
        ...StoryMetadataV3
      }
      ... on TransactionMetadataV3 {
        ...TransactionMetadataV3
      }
      ... on MintMetadataV3 {
        ...MintMetadataV3
      }
      ... on SpaceMetadataV3 {
        ...SpaceMetadataV3
      }
      ... on LiveStreamMetadataV3 {
        ...LiveStreamMetadataV3
      }
    }
    openActionModules {
      ... on LegacyFreeCollectModuleSettings {
        ...LegacyFreeCollectModuleSettings
      }
      ... on LegacyFeeCollectModuleSettings {
        ...LegacyFeeCollectModuleSettings
      }
      ... on LegacyLimitedFeeCollectModuleSettings {
        ...LegacyLimitedFeeCollectModuleSettings
      }
      ... on LegacyLimitedTimedFeeCollectModuleSettings {
        ...LegacyLimitedTimedFeeCollectModuleSettings
      }
      ... on LegacyRevertCollectModuleSettings {
        ...LegacyRevertCollectModuleSettings
      }
      ... on LegacyTimedFeeCollectModuleSettings {
        ...LegacyTimedFeeCollectModuleSettings
      }
      ... on LegacyMultirecipientFeeCollectModuleSettings {
        ...LegacyMultirecipientFeeCollectModuleSettings
      }
      ... on LegacySimpleCollectModuleSettings {
        ...LegacySimpleCollectModuleSettings
      }
      ... on LegacyERC4626FeeCollectModuleSettings {
        ...LegacyERC4626FeeCollectModuleSettings
      }
      ... on LegacyAaveFeeCollectModuleSettings {
        ...LegacyAaveFeeCollectModuleSettings
      }
      ... on MultirecipientFeeCollectOpenActionSettings {
        ...MultirecipientFeeCollectOpenActionSettings
      }
      ... on SimpleCollectOpenActionSettings {
        ...SimpleCollectOpenActionSettings
      }
      ... on UnknownOpenActionModuleSettings {
        ...UnknownOpenActionModuleSettings
      }
    }
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
  }
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
  ${ProfileFragmentDoc}
  ${PublicationOperationsFragmentDoc}
  ${LegacyPublicationMetadataFragmentDoc}
  ${AudioMetadataV3FragmentDoc}
  ${VideoMetadataV3FragmentDoc}
  ${ImageMetadataV3FragmentDoc}
  ${ArticleMetadataV3FragmentDoc}
  ${EventMetadataV3FragmentDoc}
  ${LinkMetadataV3FragmentDoc}
  ${EmbedMetadataV3FragmentDoc}
  ${CheckingInMetadataV3FragmentDoc}
  ${TextOnlyMetadataV3FragmentDoc}
  ${ThreeDMetadataV3FragmentDoc}
  ${StoryMetadataV3FragmentDoc}
  ${TransactionMetadataV3FragmentDoc}
  ${MintMetadataV3FragmentDoc}
  ${SpaceMetadataV3FragmentDoc}
  ${LiveStreamMetadataV3FragmentDoc}
  ${LegacyFreeCollectModuleSettingsFragmentDoc}
  ${LegacyFeeCollectModuleSettingsFragmentDoc}
  ${LegacyLimitedFeeCollectModuleSettingsFragmentDoc}
  ${LegacyLimitedTimedFeeCollectModuleSettingsFragmentDoc}
  ${LegacyRevertCollectModuleSettingsFragmentDoc}
  ${LegacyTimedFeeCollectModuleSettingsFragmentDoc}
  ${LegacyMultirecipientFeeCollectModuleSettingsFragmentDoc}
  ${LegacySimpleCollectModuleSettingsFragmentDoc}
  ${LegacyErc4626FeeCollectModuleSettingsFragmentDoc}
  ${LegacyAaveFeeCollectModuleSettingsFragmentDoc}
  ${MultirecipientFeeCollectOpenActionSettingsFragmentDoc}
  ${SimpleCollectOpenActionSettingsFragmentDoc}
  ${UnknownOpenActionModuleSettingsFragmentDoc}
  ${FollowOnlyReferenceModuleSettingsFragmentDoc}
  ${DegreesOfSeparationReferenceModuleSettingsFragmentDoc}
  ${UnknownReferenceModuleSettingsFragmentDoc}
`;
export const CommentFragmentDoc = gql`
  fragment Comment on Comment {
    ...CommentBase
    root {
      ...Post
    }
    commentOn {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...CommentBase
      }
      ... on Quote {
        ...QuoteBase
      }
    }
    firstComment {
      ...CommentBase
    }
  }
  ${CommentBaseFragmentDoc}
  ${PostFragmentDoc}
  ${QuoteBaseFragmentDoc}
`;
export const QuoteFragmentDoc = gql`
  fragment Quote on Quote {
    ...QuoteBase
    quoteOn {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...CommentBase
      }
      ... on Quote {
        ...QuoteBase
      }
    }
  }
  ${QuoteBaseFragmentDoc}
  ${PostFragmentDoc}
  ${CommentBaseFragmentDoc}
`;
export const MirrorFragmentDoc = gql`
  fragment Mirror on Mirror {
    id
    publishedOn {
      ...App
    }
    isHidden
    momoka {
      ...MomokaInfo
    }
    txHash
    createdAt
    by {
      ...Profile
    }
    mirrorOn {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
      ... on Quote {
        ...Quote
      }
    }
  }
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
  ${ProfileFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const Eip712TypedDataFieldFragmentDoc = gql`
  fragment EIP712TypedDataField on EIP712TypedDataField {
    name
    type
  }
`;
export const Eip712TypedDataDomainFragmentDoc = gql`
  fragment EIP712TypedDataDomain on EIP712TypedDataDomain {
    name
    chainId
    version
    verifyingContract
  }
`;
export const CreateActOnOpenActionEip712TypedDataFragmentDoc = gql`
  fragment CreateActOnOpenActionEIP712TypedData on CreateActOnOpenActionEIP712TypedData {
    types {
      Act {
        ...EIP712TypedDataField
      }
    }
    domain {
      ...EIP712TypedDataDomain
    }
    value {
      nonce
      deadline
      publicationActedProfileId
      publicationActedId
      actorProfileId
      referrerProfileIds
      referrerPubIds
      actionModuleAddress
      actionModuleData
    }
  }
  ${Eip712TypedDataFieldFragmentDoc}
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const RelaySuccessFragmentDoc = gql`
  fragment RelaySuccess on RelaySuccess {
    txHash
    txId
  }
`;
export const RelayErrorFragmentDoc = gql`
  fragment RelayError on RelayError {
    reason
  }
`;
export const LensProfileManagerRelayErrorFragmentDoc = gql`
  fragment LensProfileManagerRelayError on LensProfileManagerRelayError {
    reason
  }
`;
export const CreateMomokaPublicationResultFragmentDoc = gql`
  fragment CreateMomokaPublicationResult on CreateMomokaPublicationResult {
    id
    proof
    momokaId
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {};
}
export type Sdk = ReturnType<typeof getSdk>;
