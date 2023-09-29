// @ts-nocheck
import * as Types from './types.generated';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type OptimisticStatusResultFragment = { value: boolean; isFinalisedOnchain: boolean };

export type Erc20Fragment = {
  name: string;
  symbol: string;
  decimals: number;
  contract: NetworkAddressFragment;
};

export type FiatAmountFragment = { value: string; asset: FiatFragment };

export type FiatFragment = { name: string; symbol: string; decimals: number };

export type AmountFragment = {
  value: string;
  asset: Erc20Fragment;
  rate: FiatAmountFragment | null;
};

export type FeeFollowModuleSettingsFragment = {
  recipient: string;
  amount: AmountFragment;
  contract: NetworkAddressFragment;
};

export type RevertFollowModuleSettingsFragment = { contract: NetworkAddressFragment };

export type UnknownFollowModuleSettingsFragment = {
  followModuleReturnData: string;
  contract: NetworkAddressFragment;
};

export type NetworkAddressFragment = { address: string; chainId: number };

export type ImageFragment = {
  uri: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type VideoFragment = { uri: string; mimeType: string | null };

export type VideoSetFragment = { raw: VideoFragment; optimized: VideoFragment | null };

export type EncryptableVideoFragment = { mimeType: string | null; uri: string };

export type EncryptableVideoSetFragment = {
  raw: EncryptableVideoFragment;
  optimized: VideoFragment | null;
};

export type AudioFragment = { uri: string; mimeType: string | null };

export type AudioSetFragment = { raw: AudioFragment; optimized: AudioFragment | null };

export type EncryptableAudioFragment = { mimeType: string | null; uri: string };

export type EncryptableAudioSetFragment = {
  raw: EncryptableAudioFragment;
  optimized: AudioFragment | null;
};

export type LegacyAudioItemFragment = {
  altTag: string | null;
  audio: AudioSetFragment;
  cover: PublicationImageSetFragment | null;
};

export type LegacyImageItemFragment = { altTag: string | null; image: PublicationImageSetFragment };

export type LegacyVideoItemFragment = {
  altTag: string | null;
  video: VideoSetFragment;
  cover: PublicationImageSetFragment | null;
};

export type ProfileCoverSetFragment = {
  raw: ImageFragment;
  optimized: ImageFragment | null;
  transformed: ImageFragment | null;
};

export type ProfilePictureSetFragment = {
  raw: ImageFragment;
  optimized: ImageFragment | null;
  transformed: ImageFragment | null;
};

export type NftImageFragment = {
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
    displayName: string | null;
    bio: string | null;
    rawURI: string;
    picture: ProfilePictureSetFragment | NftImageFragment | null;
    coverPicture: ProfileCoverSetFragment | null;
    attributes: Array<{ type: Types.AttributeType; key: string; value: string }>;
  } | null;
  invitedBy: { id: string } | null;
  stats: ProfileStatsFragment;
};

export type PaginatedResultInfoFragment = { prev: string | null; next: string | null };

export type AppFragment = { id: string };

export type MomokaInfoFragment = { proof: string };

export type FollowOnlyReferenceModuleSettingsFragment = { contract: NetworkAddressFragment };

export type DegreesOfSeparationReferenceModuleSettingsFragment = {
  commentsRestricted: boolean;
  mirrorsRestricted: boolean;
  degreesOfSeparation: number;
  contract: NetworkAddressFragment;
};

export type UnknownReferenceModuleSettingsFragment = {
  referenceModuleReturnData: string;
  contract: NetworkAddressFragment;
};

export type SimpleCollectOpenActionSettingsFragment = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type MultirecipientFeeCollectOpenActionSettingsFragment = {
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
  recipients: Array<{ recipient: string; split: number }>;
};

export type UnknownOpenActionModuleSettingsFragment = {
  openActionModuleReturnData: string | null;
  contract: NetworkAddressFragment;
};

export type LegacyFreeCollectModuleSettingsFragment = {
  followerOnly: boolean;
  contract: NetworkAddressFragment;
};

export type LegacyFeeCollectModuleSettingsFragment = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyLimitedFeeCollectModuleSettingsFragment = {
  collectLimit: string | null;
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyLimitedTimedFeeCollectModuleSettingsFragment = {
  collectLimit: string | null;
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  endTimestamp: string;
  contract: { address: string };
  amount: AmountFragment;
};

export type LegacyRevertCollectModuleSettingsFragment = { contract: NetworkAddressFragment };

export type LegacyTimedFeeCollectModuleSettingsFragment = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  endTimestamp: string;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyMultirecipientFeeCollectModuleSettingsFragment = {
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
  recipients: Array<{ recipient: string; split: number }>;
};

export type LegacySimpleCollectModuleSettingsFragment = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyErc4626FeeCollectModuleSettingsFragment = {
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
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type UnknownOpenActionResultFragment = {
  address: string;
  category: Types.OpenActionCategoryType | null;
  initReturnData: string | null;
};

export type KnownCollectOpenActionResultFragment = { type: Types.CollectOpenActionModuleType };

export type OpenActionResult_KnownCollectOpenActionResult_Fragment =
  KnownCollectOpenActionResultFragment;

export type OpenActionResult_UnknownOpenActionResult_Fragment = UnknownOpenActionResultFragment;

export type OpenActionResultFragment =
  | OpenActionResult_KnownCollectOpenActionResult_Fragment
  | OpenActionResult_UnknownOpenActionResult_Fragment;

export type CanDecryptResponseFragment = {
  result: boolean;
  reasons: Array<Types.DecryptFailReasonType> | null;
  extraDetails: string | null;
};

export type PublicationOperationsFragment = {
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

export type PublicationMetadataEncryptionStrategyFragment = {
  __typename: 'PublicationMetadataV3LitEncryption';
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

export type PublicationImageSetFragment = {
  raw: ImageFragment;
  optimized: ImageFragment | null;
  transformed: ImageFragment | null;
};

export type EncryptableImageFragment = {
  uri: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type PublicationEncryptableImageSetFragment = {
  raw: EncryptableImageFragment;
  optimized: ImageFragment | null;
};

export type PublicationMarketplaceMetadataAttributeFragment = {
  displayType: Types.MarketplaceMetadataAttributeDisplayType | null;
  traitType: string | null;
  value: string | null;
};

export type MarketplaceMetadataFragment = {
  description: string | null;
  externalURL: string | null;
  name: string | null;
  animationUrl: string | null;
  attributes: Array<PublicationMarketplaceMetadataAttributeFragment> | null;
  image: PublicationImageSetFragment | null;
};

export type PublicationMetadataMediaVideoFragment = {
  duration: number | null;
  license: Types.PublicationMetadataLicenseType | null;
  altTag: string | null;
  video: EncryptableVideoSetFragment;
  cover: PublicationEncryptableImageSetFragment | null;
};

export type PublicationMetadataMediaImageFragment = {
  license: Types.PublicationMetadataLicenseType | null;
  image: PublicationEncryptableImageSetFragment;
};

export type PublicationMetadataMediaAudioFragment = {
  duration: number | null;
  license: Types.PublicationMetadataLicenseType | null;
  credits: string | null;
  artist: string | null;
  genre: string | null;
  recordLabel: string | null;
  lyrics: string | null;
  audio: EncryptableAudioSetFragment;
  cover: PublicationEncryptableImageSetFragment | null;
};

export type LegacyPublicationMetadataFragment = {
  content: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  mainContentFocus: Types.LegacyPublicationMetadataMainFocusType;
  media: Array<LegacyAudioItemFragment | LegacyImageItemFragment | LegacyVideoItemFragment> | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: {
    encryptionKey: string;
    encryptedFields: {
      content: string | null;
      image: string | null;
      animationUrl: string | null;
      externalUrl: string | null;
      media: Array<{
        uri: string;
        mimeType: string | null;
        altTag: string | null;
        cover: string | null;
      }> | null;
    };
    accessCondition: RootConditionFragment;
  } | null;
};

export type VideoMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  asset: PublicationMetadataMediaVideoFragment;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type AudioMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  asset: PublicationMetadataMediaAudioFragment;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type ImageMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  asset: PublicationMetadataMediaImageFragment;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type ArticleMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type EventMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  geographic: { latitude: number | null; longitude: number | null } | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type LinkMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type EmbedMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type CheckingInMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  geographic: { latitude: number | null; longitude: number | null } | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type TextOnlyMetadataV3Fragment = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
};

export type ThreeDMetadataV3Fragment = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  assets: Array<{
    uri: string;
    zipPath: string | null;
    playerURL: string;
    format: string;
    license: Types.PublicationMetadataLicenseType | null;
  }>;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type StoryMetadataV3Fragment = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  marketplace: MarketplaceMetadataFragment | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  asset:
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment;
};

export type TransactionMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type MintMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type SpaceMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type LiveStreamMetadataV3Fragment = {
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
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategyFragment | null;
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
    | LegacyPublicationMetadataFragment
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
    | LegacyPublicationMetadataFragment
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
    | LegacyPublicationMetadataFragment
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
  ${ProfileStatsFragmentDoc}
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
        ...RootCondition
      }
    }
  }
  ${LegacyAudioItemFragmentDoc}
  ${LegacyImageItemFragmentDoc}
  ${LegacyVideoItemFragmentDoc}
  ${MarketplaceMetadataFragmentDoc}
  ${RootConditionFragmentDoc}
`;
export const PublicationMetadataEncryptionStrategyFragmentDoc = gql`
  fragment PublicationMetadataEncryptionStrategy on PublicationMetadataV3LitEncryption {
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
    stats(request: $publicationStatsInput) {
      ...PublicationStats
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
