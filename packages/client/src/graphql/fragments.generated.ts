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
  contract: NetworkAddressFragment;
};

export type FiatAmountFragment = { __typename: 'FiatAmount'; value: string; asset: FiatFragment };

export type FiatFragment = { __typename: 'Fiat'; name: string; symbol: string; decimals: number };

export type AmountFragment = {
  __typename: 'Amount';
  value: string;
  asset: Erc20Fragment;
  rate: FiatAmountFragment | null;
};

export type FeeFollowModuleSettingsFragment = {
  __typename: 'FeeFollowModuleSettings';
  recipient: string;
  amount: AmountFragment;
  contract: NetworkAddressFragment;
};

export type RevertFollowModuleSettingsFragment = {
  __typename: 'RevertFollowModuleSettings';
  contract: NetworkAddressFragment;
};

export type UnknownFollowModuleSettingsFragment = {
  __typename: 'UnknownFollowModuleSettings';
  followModuleReturnData: string;
  contract: NetworkAddressFragment;
};

export type NetworkAddressFragment = {
  __typename: 'NetworkAddress';
  address: string;
  chainId: number;
};

export type MetadataBooleanAttributeFragment = {
  __typename: 'MetadataBooleanAttribute';
  key: string;
  value: string;
};

export type MetadataDateAttributeFragment = {
  __typename: 'MetadataDateAttribute';
  key: string;
  value: string;
};

export type MetadataNumberAttributeFragment = {
  __typename: 'MetadataNumberAttribute';
  key: string;
  value: string;
};

export type MetadataJsonAttributeFragment = {
  __typename: 'MetadataJSONAttribute';
  key: string;
  value: string;
};

export type MetadataStringAttributeFragment = {
  __typename: 'MetadataStringAttribute';
  key: string;
  value: string;
};

export type ImageFragment = {
  __typename: 'Image';
  uri: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type ImageSetFragment = {
  __typename: 'ImageSet';
  raw: ImageFragment;
  optimized: ImageFragment | null;
  transformed: ImageFragment | null;
};

export type EncryptableImageFragment = {
  __typename: 'EncryptableImage';
  uri: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type EncryptableImageSetFragment = {
  __typename: 'EncryptableImageSet';
  raw: EncryptableImageFragment;
  optimized: ImageFragment | null;
};

export type VideoFragment = { __typename: 'Video'; uri: string; mimeType: string | null };

export type EncryptableVideoFragment = {
  __typename: 'EncryptableVideo';
  mimeType: string | null;
  uri: string;
};

export type EncryptableVideoSetFragment = {
  __typename: 'EncryptableVideoSet';
  raw: EncryptableVideoFragment;
  optimized: VideoFragment | null;
};

export type AudioFragment = { __typename: 'Audio'; uri: string; mimeType: string | null };

export type EncryptableAudioFragment = {
  __typename: 'EncryptableAudio';
  mimeType: string | null;
  uri: string;
};

export type EncryptableAudioSetFragment = {
  __typename: 'EncryptableAudioSet';
  raw: EncryptableAudioFragment;
  optimized: AudioFragment | null;
};

export type ProfileCoverSetFragment = {
  __typename: 'ImageSet';
  raw: ImageFragment;
  optimized: ImageFragment | null;
  transformed: ImageFragment | null;
};

export type ProfilePictureSetFragment = {
  __typename: 'ImageSet';
  raw: ImageFragment;
  optimized: ImageFragment | null;
  transformed: ImageFragment | null;
};

export type NftImageFragment = {
  __typename: 'NftImage';
  tokenId: string;
  verified: boolean;
  collection: NetworkAddressFragment;
  image: ProfilePictureSetFragment;
};

export type ProfileStatsFragment = {
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
  upvoteReacted: number;
  downvoteReacted: number;
};

export type ProfileFragment = {
  __typename: 'Profile';
  id: string;
  txHash: string;
  createdAt: string;
  interests: Array<string>;
  invitesLeft: number;
  handle: string | null;
  sponsor: boolean;
  lensManager: boolean;
  ownedBy: NetworkAddressFragment;
  operations: {
    __typename: 'ProfileOperations';
    id: string;
    canBlock: boolean;
    canUnblock: boolean;
    canFollow: Types.TriStateValue;
    canUnfollow: boolean;
    isBlockedByMe: OptimisticStatusResultFragment;
    isFollowedByMe: OptimisticStatusResultFragment;
    isFollowingMe: OptimisticStatusResultFragment;
  };
  guardian: { protected: boolean; cooldownEndsOn: string | null } | null;
  onchainIdentity: {
    proofOfHumanity: boolean;
    ens: { name: string | null } | null;
    sybilDotOrg: { source: { twitter: { handle: string | null } } | null };
    worldcoin: { isHuman: boolean };
  };
  followNftAddress: NetworkAddressFragment | null;
  followModule:
    | FeeFollowModuleSettingsFragment
    | RevertFollowModuleSettingsFragment
    | UnknownFollowModuleSettingsFragment
    | null;
  metadata: {
    appId: string | null;
    displayName: string | null;
    bio: string | null;
    rawURI: string;
    picture: ProfilePictureSetFragment | NftImageFragment | null;
    coverPicture: ProfileCoverSetFragment | null;
    attributes: Array<
      | MetadataBooleanAttributeFragment
      | MetadataDateAttributeFragment
      | MetadataJsonAttributeFragment
      | MetadataNumberAttributeFragment
      | MetadataStringAttributeFragment
    > | null;
  } | null;
  invitedBy: { id: string } | null;
  stats: ProfileStatsFragment;
};

export type PaginatedResultInfoFragment = { prev: string | null; next: string | null };

export type AppFragment = { __typename: 'App'; id: string };

export type MomokaInfoFragment = { __typename: 'MomokaInfo'; proof: string };

export type FollowOnlyReferenceModuleSettingsFragment = {
  __typename: 'FollowOnlyReferenceModuleSettings';
  contract: NetworkAddressFragment;
};

export type DegreesOfSeparationReferenceModuleSettingsFragment = {
  __typename: 'DegreesOfSeparationReferenceModuleSettings';
  commentsRestricted: boolean;
  mirrorsRestricted: boolean;
  degreesOfSeparation: number;
  contract: NetworkAddressFragment;
};

export type UnknownReferenceModuleSettingsFragment = {
  __typename: 'UnknownReferenceModuleSettings';
  referenceModuleReturnData: string;
  contract: NetworkAddressFragment;
};

export type SimpleCollectOpenActionSettingsFragment = {
  __typename: 'SimpleCollectOpenActionSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type MultirecipientFeeCollectOpenActionSettingsFragment = {
  __typename: 'MultirecipientFeeCollectOpenActionSettings';
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
  recipients: Array<{ __typename: 'RecipientDataOutput'; recipient: string; split: number }>;
};

export type UnknownOpenActionModuleSettingsFragment = {
  __typename: 'UnknownOpenActionModuleSettings';
  openActionModuleReturnData: string | null;
  contract: NetworkAddressFragment;
};

export type LegacyFreeCollectModuleSettingsFragment = {
  followerOnly: boolean;
  contract: NetworkAddressFragment;
};

export type LegacyFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyFeeCollectModuleSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyLimitedFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyLimitedFeeCollectModuleSettings';
  collectLimit: string | null;
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyLimitedTimedFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyLimitedTimedFeeCollectModuleSettings';
  collectLimit: string | null;
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  endTimestamp: string;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyRevertCollectModuleSettingsFragment = {
  __typename: 'LegacyRevertCollectModuleSettings';
  contract: NetworkAddressFragment;
};

export type LegacyTimedFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyTimedFeeCollectModuleSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  endTimestamp: string;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyMultirecipientFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyMultirecipientFeeCollectModuleSettings';
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
  recipients: Array<{ recipient: string; split: number }>;
};

export type LegacySimpleCollectModuleSettingsFragment = {
  __typename: 'LegacySimpleCollectModuleSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyErc4626FeeCollectModuleSettingsFragment = {
  __typename: 'LegacyERC4626FeeCollectModuleSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  vault: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyAaveFeeCollectModuleSettingsFragment = {
  __typename: 'LegacyAaveFeeCollectModuleSettings';
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
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

export type OpenActionResult_KnownCollectOpenActionResult_Fragment =
  KnownCollectOpenActionResultFragment;

export type OpenActionResult_UnknownOpenActionResult_Fragment = UnknownOpenActionResultFragment;

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
  hasActed: OptimisticStatusResultFragment;
  actedOn: Array<
    | OpenActionResult_KnownCollectOpenActionResult_Fragment
    | OpenActionResult_UnknownOpenActionResult_Fragment
  >;
  canDecrypt: CanDecryptResponseFragment;
};

export type PublicationMetadataLitEncryptionFragment = {
  __typename: 'PublicationMetadataLitEncryption';
  encryptionKey: string;
  encryptedPaths: Array<string>;
  accessCondition: RootConditionFragment;
};

export type NftOwnershipConditionFragment = {
  __typename: 'NftOwnershipCondition';
  contractType: Types.NftContractType;
  tokenIds: Array<string> | null;
  contract: NetworkAddressFragment;
};

export type Erc20OwnershipConditionFragment = {
  __typename: 'Erc20OwnershipCondition';
  condition: Types.ComparisonOperatorConditionType;
  amount: AmountFragment;
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
    | CollectConditionFragment
    | EoaOwnershipConditionFragment
    | Erc20OwnershipConditionFragment
    | FollowConditionFragment
    | NftOwnershipConditionFragment
    | ProfileOwnershipConditionFragment
  >;
};

export type OrConditionFragment = {
  __typename: 'OrCondition';
  criteria: Array<
    | CollectConditionFragment
    | EoaOwnershipConditionFragment
    | Erc20OwnershipConditionFragment
    | FollowConditionFragment
    | NftOwnershipConditionFragment
    | ProfileOwnershipConditionFragment
  >;
};

export type RootConditionFragment = {
  __typename: 'RootCondition';
  criteria: Array<
    | AndConditionFragment
    | CollectConditionFragment
    | EoaOwnershipConditionFragment
    | Erc20OwnershipConditionFragment
    | FollowConditionFragment
    | NftOwnershipConditionFragment
    | OrConditionFragment
    | ProfileOwnershipConditionFragment
  >;
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
  attributes: Array<PublicationMarketplaceMetadataAttributeFragment> | null;
  image: ImageSetFragment | null;
};

export type PublicationMetadataMediaVideoFragment = {
  __typename: 'PublicationMetadataMediaVideo';
  duration: number | null;
  license: Types.PublicationMetadataLicenseType | null;
  altTag: string | null;
  video: EncryptableVideoSetFragment;
  cover: EncryptableImageSetFragment | null;
};

export type PublicationMetadataMediaImageFragment = {
  __typename: 'PublicationMetadataMediaImage';
  altTag: string | null;
  license: Types.PublicationMetadataLicenseType | null;
  image: EncryptableImageSetFragment;
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
  audio: EncryptableAudioSetFragment;
  cover: EncryptableImageSetFragment | null;
};

export type GeoLocationFragment = {
  __typename: 'GeoLocation';
  rawURI: string;
  latitude: number | null;
  longitude: number | null;
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  asset: PublicationMetadataMediaVideoFragment;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  asset: PublicationMetadataMediaAudioFragment;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  asset: PublicationMetadataMediaImageFragment;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  geographic: GeoLocationFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  geographic: GeoLocationFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
};

export type ThreeDMetadataV3AssetFragment = {
  __typename: 'ThreeDMetadataV3Asset';
  uri: string;
  zipPath: string | null;
  playerURL: string;
  format: string;
  license: Types.PublicationMetadataLicenseType | null;
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  assets: Array<ThreeDMetadataV3AssetFragment>;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  asset:
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment;
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
  chainId: number;
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
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
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<
    | MetadataBooleanAttributeFragment
    | MetadataDateAttributeFragment
    | MetadataJsonAttributeFragment
    | MetadataNumberAttributeFragment
    | MetadataStringAttributeFragment
  > | null;
  encryptedWith: PublicationMetadataLitEncryptionFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type PublicationStatsFragment = {
  id: string;
  comments: number;
  mirrors: number;
  quotes: number;
  bookmarks: number;
  countOpenActions: number;
  upvoteReactions: number;
  downvoteReactions: number;
};

export type PostFragment = {
  __typename: 'Post';
  id: string;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
  by: ProfileFragment;
  operations: PublicationOperationsFragment;
  metadata:
    | ArticleMetadataV3Fragment
    | AudioMetadataV3Fragment
    | CheckingInMetadataV3Fragment
    | EmbedMetadataV3Fragment
    | EventMetadataV3Fragment
    | ImageMetadataV3Fragment
    | LinkMetadataV3Fragment
    | LiveStreamMetadataV3Fragment
    | MintMetadataV3Fragment
    | SpaceMetadataV3Fragment
    | StoryMetadataV3Fragment
    | TextOnlyMetadataV3Fragment
    | ThreeDMetadataV3Fragment
    | TransactionMetadataV3Fragment
    | VideoMetadataV3Fragment;
  openActionModules: Array<
    | LegacyAaveFeeCollectModuleSettingsFragment
    | LegacyErc4626FeeCollectModuleSettingsFragment
    | LegacyFeeCollectModuleSettingsFragment
    | LegacyFreeCollectModuleSettingsFragment
    | LegacyLimitedFeeCollectModuleSettingsFragment
    | LegacyLimitedTimedFeeCollectModuleSettingsFragment
    | LegacyMultirecipientFeeCollectModuleSettingsFragment
    | LegacyRevertCollectModuleSettingsFragment
    | LegacySimpleCollectModuleSettingsFragment
    | LegacyTimedFeeCollectModuleSettingsFragment
    | MultirecipientFeeCollectOpenActionSettingsFragment
    | SimpleCollectOpenActionSettingsFragment
    | UnknownOpenActionModuleSettingsFragment
  > | null;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettingsFragment
    | FollowOnlyReferenceModuleSettingsFragment
    | UnknownReferenceModuleSettingsFragment
    | null;
  stats: PublicationStatsFragment;
};

export type CommentBaseFragment = {
  __typename: 'Comment';
  id: string;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
  by: ProfileFragment;
  operations: PublicationOperationsFragment;
  metadata:
    | ArticleMetadataV3Fragment
    | AudioMetadataV3Fragment
    | CheckingInMetadataV3Fragment
    | EmbedMetadataV3Fragment
    | EventMetadataV3Fragment
    | ImageMetadataV3Fragment
    | LinkMetadataV3Fragment
    | LiveStreamMetadataV3Fragment
    | MintMetadataV3Fragment
    | SpaceMetadataV3Fragment
    | StoryMetadataV3Fragment
    | TextOnlyMetadataV3Fragment
    | ThreeDMetadataV3Fragment
    | TransactionMetadataV3Fragment
    | VideoMetadataV3Fragment;
  openActionModules: Array<
    | LegacyAaveFeeCollectModuleSettingsFragment
    | LegacyErc4626FeeCollectModuleSettingsFragment
    | LegacyFeeCollectModuleSettingsFragment
    | LegacyFreeCollectModuleSettingsFragment
    | LegacyLimitedFeeCollectModuleSettingsFragment
    | LegacyLimitedTimedFeeCollectModuleSettingsFragment
    | LegacyMultirecipientFeeCollectModuleSettingsFragment
    | LegacyRevertCollectModuleSettingsFragment
    | LegacySimpleCollectModuleSettingsFragment
    | LegacyTimedFeeCollectModuleSettingsFragment
    | MultirecipientFeeCollectOpenActionSettingsFragment
    | SimpleCollectOpenActionSettingsFragment
    | UnknownOpenActionModuleSettingsFragment
  > | null;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettingsFragment
    | FollowOnlyReferenceModuleSettingsFragment
    | UnknownReferenceModuleSettingsFragment
    | null;
};

export type CommentFragment = {
  root: PostFragment;
  commentOn: CommentBaseFragment | PostFragment | QuoteBaseFragment;
  firstComment: CommentBaseFragment | null;
  stats: PublicationStatsFragment;
} & CommentBaseFragment;

export type MirrorFragment = {
  __typename: 'Mirror';
  id: string;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
  by: ProfileFragment;
  mirrorOn: CommentFragment | PostFragment | QuoteFragment;
};

export type QuoteBaseFragment = {
  __typename: 'Quote';
  id: string;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
  by: ProfileFragment;
  operations: PublicationOperationsFragment;
  metadata:
    | ArticleMetadataV3Fragment
    | AudioMetadataV3Fragment
    | CheckingInMetadataV3Fragment
    | EmbedMetadataV3Fragment
    | EventMetadataV3Fragment
    | ImageMetadataV3Fragment
    | LinkMetadataV3Fragment
    | LiveStreamMetadataV3Fragment
    | MintMetadataV3Fragment
    | SpaceMetadataV3Fragment
    | StoryMetadataV3Fragment
    | TextOnlyMetadataV3Fragment
    | ThreeDMetadataV3Fragment
    | TransactionMetadataV3Fragment
    | VideoMetadataV3Fragment;
  openActionModules: Array<
    | LegacyAaveFeeCollectModuleSettingsFragment
    | LegacyErc4626FeeCollectModuleSettingsFragment
    | LegacyFeeCollectModuleSettingsFragment
    | LegacyFreeCollectModuleSettingsFragment
    | LegacyLimitedFeeCollectModuleSettingsFragment
    | LegacyLimitedTimedFeeCollectModuleSettingsFragment
    | LegacyMultirecipientFeeCollectModuleSettingsFragment
    | LegacyRevertCollectModuleSettingsFragment
    | LegacySimpleCollectModuleSettingsFragment
    | LegacyTimedFeeCollectModuleSettingsFragment
    | MultirecipientFeeCollectOpenActionSettingsFragment
    | SimpleCollectOpenActionSettingsFragment
    | UnknownOpenActionModuleSettingsFragment
  > | null;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettingsFragment
    | FollowOnlyReferenceModuleSettingsFragment
    | UnknownReferenceModuleSettingsFragment
    | null;
};

export type QuoteFragment = {
  quoteOn: CommentBaseFragment | PostFragment | QuoteBaseFragment;
  stats: PublicationStatsFragment;
} & QuoteBaseFragment;

export type Eip712TypedDataDomainFragment = {
  name: string;
  chainId: number;
  version: string;
  verifyingContract: string;
};

export type Eip712TypedDataFieldFragment = { name: string; type: string };

export type CreateActOnOpenActionEip712TypedDataFragment = {
  types: { Act: Array<Eip712TypedDataFieldFragment> };
  domain: Eip712TypedDataDomainFragment;
  value: {
    nonce: number;
    deadline: number;
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
    __typename
    id
  }
`;
export const MomokaInfoFragmentDoc = gql`
  fragment MomokaInfo on MomokaInfo {
    __typename
    proof
  }
`;
export const NetworkAddressFragmentDoc = gql`
  fragment NetworkAddress on NetworkAddress {
    __typename
    address
    chainId
  }
`;
export const OptimisticStatusResultFragmentDoc = gql`
  fragment OptimisticStatusResult on OptimisticStatusResult {
    __typename
    value
    isFinalisedOnchain
  }
`;
export const Erc20FragmentDoc = gql`
  fragment Erc20 on Erc20 {
    __typename
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
    __typename
    name
    symbol
    decimals
  }
`;
export const FiatAmountFragmentDoc = gql`
  fragment FiatAmount on FiatAmount {
    __typename
    asset {
      ...Fiat
    }
    value
  }
  ${FiatFragmentDoc}
`;
export const AmountFragmentDoc = gql`
  fragment Amount on Amount {
    __typename
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
    __typename
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
    __typename
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const UnknownFollowModuleSettingsFragmentDoc = gql`
  fragment UnknownFollowModuleSettings on UnknownFollowModuleSettings {
    __typename
    contract {
      ...NetworkAddress
    }
    followModuleReturnData
  }
  ${NetworkAddressFragmentDoc}
`;
export const ImageFragmentDoc = gql`
  fragment Image on Image {
    __typename
    uri
    mimeType
    width
    height
  }
`;
export const ProfilePictureSetFragmentDoc = gql`
  fragment ProfilePictureSet on ImageSet {
    __typename
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
    __typename
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
    __typename
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
export const MetadataBooleanAttributeFragmentDoc = gql`
  fragment MetadataBooleanAttribute on MetadataBooleanAttribute {
    __typename
    key
    value
  }
`;
export const MetadataDateAttributeFragmentDoc = gql`
  fragment MetadataDateAttribute on MetadataDateAttribute {
    __typename
    key
    value
  }
`;
export const MetadataNumberAttributeFragmentDoc = gql`
  fragment MetadataNumberAttribute on MetadataNumberAttribute {
    __typename
    key
    value
  }
`;
export const MetadataJsonAttributeFragmentDoc = gql`
  fragment MetadataJSONAttribute on MetadataJSONAttribute {
    __typename
    key
    value
  }
`;
export const MetadataStringAttributeFragmentDoc = gql`
  fragment MetadataStringAttribute on MetadataStringAttribute {
    __typename
    key
    value
  }
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
    publications
    upvoteReactions: reactions(request: { type: UPVOTE })
    downvoteReactions: reactions(request: { type: DOWNVOTE })
    upvoteReacted: reacted(request: { type: UPVOTE })
    downvoteReacted: reacted(request: { type: DOWNVOTE })
    countOpenActions(request: $profileStatsCountOpenActionArgs)
  }
`;
export const ProfileFragmentDoc = gql`
  fragment Profile on Profile {
    __typename
    id
    ownedBy {
      ...NetworkAddress
    }
    txHash
    createdAt
    operations {
      __typename
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
      appId
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
        ... on MetadataBooleanAttribute {
          ...MetadataBooleanAttribute
        }
        ... on MetadataDateAttribute {
          ...MetadataDateAttribute
        }
        ... on MetadataNumberAttribute {
          ...MetadataNumberAttribute
        }
        ... on MetadataJSONAttribute {
          ...MetadataJSONAttribute
        }
        ... on MetadataStringAttribute {
          ...MetadataStringAttribute
        }
      }
    }
    handle
    sponsor
    lensManager
    invitedBy {
      id
    }
    stats(request: $profileStatsArg) {
      ...ProfileStats
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${ProfileStatsFragmentDoc}
`;
export const KnownCollectOpenActionResultFragmentDoc = gql`
  fragment KnownCollectOpenActionResult on KnownCollectOpenActionResult {
    __typename
    type
  }
`;
export const UnknownOpenActionResultFragmentDoc = gql`
  fragment UnknownOpenActionResult on UnknownOpenActionResult {
    __typename
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
    __typename
    result
    reasons
    extraDetails
  }
`;
export const PublicationOperationsFragmentDoc = gql`
  fragment PublicationOperations on PublicationOperations {
    __typename
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
export const PublicationMarketplaceMetadataAttributeFragmentDoc = gql`
  fragment PublicationMarketplaceMetadataAttribute on PublicationMarketplaceMetadataAttribute {
    __typename
    displayType
    traitType
    value
  }
`;
export const ImageSetFragmentDoc = gql`
  fragment ImageSet on ImageSet {
    __typename
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
export const MarketplaceMetadataFragmentDoc = gql`
  fragment MarketplaceMetadata on MarketplaceMetadata {
    __typename
    description
    externalURL
    name
    attributes {
      ...PublicationMarketplaceMetadataAttribute
    }
    image {
      ...ImageSet
    }
    animationUrl
  }
  ${PublicationMarketplaceMetadataAttributeFragmentDoc}
  ${ImageSetFragmentDoc}
`;
export const NftOwnershipConditionFragmentDoc = gql`
  fragment NftOwnershipCondition on NftOwnershipCondition {
    __typename
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
    __typename
    amount {
      ...Amount
    }
    condition
  }
  ${AmountFragmentDoc}
`;
export const EoaOwnershipConditionFragmentDoc = gql`
  fragment EoaOwnershipCondition on EoaOwnershipCondition {
    __typename
    address
  }
`;
export const ProfileOwnershipConditionFragmentDoc = gql`
  fragment ProfileOwnershipCondition on ProfileOwnershipCondition {
    __typename
    profileId
  }
`;
export const FollowConditionFragmentDoc = gql`
  fragment FollowCondition on FollowCondition {
    __typename
    follow
  }
`;
export const CollectConditionFragmentDoc = gql`
  fragment CollectCondition on CollectCondition {
    __typename
    publicationId
    thisPublication
  }
`;
export const AndConditionFragmentDoc = gql`
  fragment AndCondition on AndCondition {
    __typename
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
    __typename
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
export const RootConditionFragmentDoc = gql`
  fragment RootCondition on RootCondition {
    __typename
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
export const PublicationMetadataLitEncryptionFragmentDoc = gql`
  fragment PublicationMetadataLitEncryption on PublicationMetadataLitEncryption {
    __typename
    encryptionKey
    accessCondition {
      ...RootCondition
    }
    encryptedPaths
  }
  ${RootConditionFragmentDoc}
`;
export const EncryptableAudioFragmentDoc = gql`
  fragment EncryptableAudio on EncryptableAudio {
    __typename
    mimeType
    uri
  }
`;
export const AudioFragmentDoc = gql`
  fragment Audio on Audio {
    __typename
    uri
    mimeType
  }
`;
export const EncryptableAudioSetFragmentDoc = gql`
  fragment EncryptableAudioSet on EncryptableAudioSet {
    __typename
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
    __typename
    uri
    mimeType
    width
    height
  }
`;
export const EncryptableImageSetFragmentDoc = gql`
  fragment EncryptableImageSet on EncryptableImageSet {
    __typename
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
    __typename
    audio {
      ...EncryptableAudioSet
    }
    cover {
      ...EncryptableImageSet
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
  ${EncryptableImageSetFragmentDoc}
`;
export const EncryptableVideoFragmentDoc = gql`
  fragment EncryptableVideo on EncryptableVideo {
    __typename
    mimeType
    uri
  }
`;
export const VideoFragmentDoc = gql`
  fragment Video on Video {
    __typename
    uri
    mimeType
  }
`;
export const EncryptableVideoSetFragmentDoc = gql`
  fragment EncryptableVideoSet on EncryptableVideoSet {
    __typename
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
    __typename
    video {
      ...EncryptableVideoSet
    }
    cover {
      ...EncryptableImageSet
    }
    duration
    license
    altTag
  }
  ${EncryptableVideoSetFragmentDoc}
  ${EncryptableImageSetFragmentDoc}
`;
export const PublicationMetadataMediaImageFragmentDoc = gql`
  fragment PublicationMetadataMediaImage on PublicationMetadataMediaImage {
    __typename
    image {
      ...EncryptableImageSet
    }
    altTag
    license
  }
  ${EncryptableImageSetFragmentDoc}
`;
export const AudioMetadataV3FragmentDoc = gql`
  fragment AudioMetadataV3 on AudioMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
`;
export const VideoMetadataV3FragmentDoc = gql`
  fragment VideoMetadataV3 on VideoMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const ImageMetadataV3FragmentDoc = gql`
  fragment ImageMetadataV3 on ImageMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const ArticleMetadataV3FragmentDoc = gql`
  fragment ArticleMetadataV3 on ArticleMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const GeoLocationFragmentDoc = gql`
  fragment GeoLocation on GeoLocation {
    __typename
    rawURI
    latitude
    longitude
  }
`;
export const EventMetadataV3FragmentDoc = gql`
  fragment EventMetadataV3 on EventMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
      }
    }
    geographic {
      ...GeoLocation
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${GeoLocationFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const LinkMetadataV3FragmentDoc = gql`
  fragment LinkMetadataV3 on LinkMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const EmbedMetadataV3FragmentDoc = gql`
  fragment EmbedMetadataV3 on EmbedMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const CheckingInMetadataV3FragmentDoc = gql`
  fragment CheckingInMetadataV3 on CheckingInMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
      }
    }
    content
    location
    geographic {
      ...GeoLocation
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${GeoLocationFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const TextOnlyMetadataV3FragmentDoc = gql`
  fragment TextOnlyMetadataV3 on TextOnlyMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
      }
    }
    content
  }
  ${MarketplaceMetadataFragmentDoc}
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
`;
export const ThreeDMetadataV3AssetFragmentDoc = gql`
  fragment ThreeDMetadataV3Asset on ThreeDMetadataV3Asset {
    __typename
    uri
    zipPath
    playerURL
    format
    license
  }
`;
export const ThreeDMetadataV3FragmentDoc = gql`
  fragment ThreeDMetadataV3 on ThreeDMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
      }
    }
    content
    assets {
      ...ThreeDMetadataV3Asset
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${ThreeDMetadataV3AssetFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const StoryMetadataV3FragmentDoc = gql`
  fragment StoryMetadataV3 on StoryMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const TransactionMetadataV3FragmentDoc = gql`
  fragment TransactionMetadataV3 on TransactionMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const MintMetadataV3FragmentDoc = gql`
  fragment MintMetadataV3 on MintMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const SpaceMetadataV3FragmentDoc = gql`
  fragment SpaceMetadataV3 on SpaceMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const LiveStreamMetadataV3FragmentDoc = gql`
  fragment LiveStreamMetadataV3 on LiveStreamMetadataV3 {
    __typename
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
      ... on MetadataBooleanAttribute {
        ...MetadataBooleanAttribute
      }
      ... on MetadataDateAttribute {
        ...MetadataDateAttribute
      }
      ... on MetadataNumberAttribute {
        ...MetadataNumberAttribute
      }
      ... on MetadataJSONAttribute {
        ...MetadataJSONAttribute
      }
      ... on MetadataStringAttribute {
        ...MetadataStringAttribute
      }
    }
    encryptedWith {
      ... on PublicationMetadataLitEncryption {
        ...PublicationMetadataLitEncryption
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
  ${MetadataBooleanAttributeFragmentDoc}
  ${MetadataDateAttributeFragmentDoc}
  ${MetadataNumberAttributeFragmentDoc}
  ${MetadataJsonAttributeFragmentDoc}
  ${MetadataStringAttributeFragmentDoc}
  ${PublicationMetadataLitEncryptionFragmentDoc}
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
    __typename
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
    __typename
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
    __typename
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
    endTimestamp
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const LegacyRevertCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyRevertCollectModuleSettings on LegacyRevertCollectModuleSettings {
    __typename
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const LegacyTimedFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyTimedFeeCollectModuleSettings on LegacyTimedFeeCollectModuleSettings {
    __typename
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
    __typename
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
    __typename
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
    __typename
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
    __typename
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
    __typename
    contract {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    recipients {
      __typename
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
    __typename
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
    __typename
    contract {
      ...NetworkAddress
    }
    openActionModuleReturnData
  }
  ${NetworkAddressFragmentDoc}
`;
export const FollowOnlyReferenceModuleSettingsFragmentDoc = gql`
  fragment FollowOnlyReferenceModuleSettings on FollowOnlyReferenceModuleSettings {
    __typename
    contract {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
`;
export const DegreesOfSeparationReferenceModuleSettingsFragmentDoc = gql`
  fragment DegreesOfSeparationReferenceModuleSettings on DegreesOfSeparationReferenceModuleSettings {
    __typename
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
    __typename
    contract {
      ...NetworkAddress
    }
    referenceModuleReturnData
  }
  ${NetworkAddressFragmentDoc}
`;
export const PublicationStatsFragmentDoc = gql`
  fragment PublicationStats on PublicationStats {
    id
    comments
    mirrors
    quotes
    bookmarks
    upvoteReactions: reactions(request: { type: UPVOTE })
    downvoteReactions: reactions(request: { type: DOWNVOTE })
    countOpenActions(request: $publicationStatsCountOpenActionArgs)
  }
`;
export const PostFragmentDoc = gql`
  fragment Post on Post {
    __typename
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
    stats(request: $publicationStatsInput) {
      ...PublicationStats
    }
  }
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
  ${ProfileFragmentDoc}
  ${PublicationOperationsFragmentDoc}
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
  ${PublicationStatsFragmentDoc}
`;
export const CommentBaseFragmentDoc = gql`
  fragment CommentBase on Comment {
    __typename
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
    __typename
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
    stats(request: $publicationStatsInput) {
      ...PublicationStats
    }
  }
  ${CommentBaseFragmentDoc}
  ${PostFragmentDoc}
  ${QuoteBaseFragmentDoc}
  ${PublicationStatsFragmentDoc}
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
    stats(request: $publicationStatsInput) {
      ...PublicationStats
    }
  }
  ${QuoteBaseFragmentDoc}
  ${PostFragmentDoc}
  ${CommentBaseFragmentDoc}
  ${PublicationStatsFragmentDoc}
`;
export const MirrorFragmentDoc = gql`
  fragment Mirror on Mirror {
    __typename
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
    __typename
    txHash
    txId
  }
`;
export const RelayErrorFragmentDoc = gql`
  fragment RelayError on RelayError {
    __typename
    reason
  }
`;
export const LensProfileManagerRelayErrorFragmentDoc = gql`
  fragment LensProfileManagerRelayError on LensProfileManagerRelayError {
    __typename
    reason
  }
`;
export const CreateMomokaPublicationResultFragmentDoc = gql`
  fragment CreateMomokaPublicationResult on CreateMomokaPublicationResult {
    __typename
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
