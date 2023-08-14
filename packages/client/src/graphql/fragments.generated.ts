// @ts-nocheck
import * as Types from './types.generated';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type OptimisticStatusResultFragment = { value: boolean; isFinalisedOnChain: boolean | null };

export type Erc20Fragment = {
  name: string;
  symbol: string;
  decimals: number;
  contract: NetworkAddressFragment;
};

export type AmountFragment = { value: string; asset: Erc20Fragment };

export type FeeFollowModuleSettingsFragment = {
  recipient: string;
  amount: AmountFragment;
  contract: NetworkAddressFragment;
};

export type ProfileFollowModuleSettingsFragment = { contract: NetworkAddressFragment };

export type RevertFollowModuleSettingsFragment = { contract: NetworkAddressFragment };

export type UnknownFollowModuleSettingsFragment = {
  followModuleReturnData: string;
  contract: NetworkAddressFragment;
};

export type GaslessFragment = { enabled: boolean; relay: NetworkAddressFragment | null };

export type NetworkAddressFragment = { address: string; chainId: string };

export type ImageFragment = {
  url: string;
  width: number | null;
  height: number | null;
  imageMimeType: Types.ImageMimeType | null;
};

export type VideoFragment = { url: string; videoMimeType: Types.VideoMimeType | null };

export type VideoSetFragment = { rawURL: string; altTag: string | null; video: VideoFragment };

export type AudioFragment = { url: string; audioMimeType: Types.AudioMimeType | null };

export type AudioSetFragment = { rawURI: string; audio: AudioFragment };

export type ProfileCoverSetFragment = {
  rawURI: string;
  altTag: string | null;
  image: ImageFragment;
  transformed: ImageFragment | null;
};

export type ProfilePictureSetFragment = {
  rawURI: string;
  altTag: string | null;
  image: ImageFragment;
  transformed: ImageFragment | null;
};

export type ProfileFieldsFragment = {
  __typename: 'Profile';
  id: string;
  handle: string | null;
  interests: Array<string> | null;
  invitesLeft: number;
  createdAt: string;
  metadata: {
    rawURI: string;
    displayName: string | null;
    bio: string | null;
    coverPicture: ProfileCoverSetFragment | null;
  } | null;
  ownedBy: NetworkAddressFragment;
  picture:
    | ProfilePictureSetFragment
    | {
        tokenId: string;
        verified: boolean;
        collection: NetworkAddressFragment;
        image: ProfilePictureSetFragment;
      }
    | null;
  gasless: GaslessFragment;
  followModule:
    | FeeFollowModuleSettingsFragment
    | ProfileFollowModuleSettingsFragment
    | RevertFollowModuleSettingsFragment
    | UnknownFollowModuleSettingsFragment
    | null;
  followNftAddress: NetworkAddressFragment | null;
  attributes: Array<{ type: Types.AttributeType; key: string; value: string }> | null;
  onChainIdentity: {
    proofOfHumanity: boolean;
    ens: { name: string | null } | null;
    sybilDotOrg: { source: { twitter: { handle: string | null } } };
    worldcoin: { isHuman: boolean };
  };
  isFollowedByMe: OptimisticStatusResultFragment;
  isFollowingMe: OptimisticStatusResultFragment;
  guardian: { protected: boolean; cooldownEndsOn: string | null };
};

export type ProfileFragment = { invitedBy: ProfileFieldsFragment | null } & ProfileFieldsFragment;

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
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  contract: NetworkAddressFragment;
  amountOptional: AmountFragment | null;
};

export type MultirecipientFeeCollectOpenActionSettingsFragment = {
  referralFee: number;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
  recipients: Array<{ recipient: string; split: number }>;
};

export type UnknownOpenActionModuleSettingsFragment = {
  openActionModuleReturnData: string;
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
  collectLimit: string;
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyLimitedTimedFeeCollectModuleSettingsFragment = {
  collectLimit: string;
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
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
  recipients: Array<{ recipient: string; split: number }>;
};

export type LegacySimpleCollectModuleSettingsFragment = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  contract: NetworkAddressFragment;
  amountOptional: AmountFragment | null;
};

export type LegacyErc4626FeeCollectModuleSettingsFragment = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  contract: NetworkAddressFragment;
  vault: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyAaveFeeCollectModuleSettingsFragment = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type CollectOpenActionResultFragment = { type: Types.CollectOpenActionModuleType };

export type UnknownOpenActionResultFragment = { address: string; redeemData: string };

export type CanDecryptResponseFragment = {
  result: boolean;
  reasons: Array<Types.DecryptFailReasonType> | null;
  extraDetails: string | null;
};

export type PublicationOperationsFragment = {
  isNotInterested: boolean;
  hasBookmarked: boolean;
  canComment: boolean;
  canMirror: boolean;
  hasMirrored: boolean;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasActed: Array<CollectOpenActionResultFragment | UnknownOpenActionResultFragment>;
  canDecrypt: CanDecryptResponseFragment;
};

export type PublicationMetadataV3LitEncryptionFragment = {
  encryptionKey: string;
  accessCondition:
    | AndConditionFragment
    | CollectConditionFragment
    | EoaOwnershipConditionFragment
    | Erc20OwnershipConditionFragment
    | FollowConditionFragment
    | NftOwnershipConditionFragment
    | OrConditionFragment
    | ProfileOwnershipConditionFragment;
};

export type NftOwnershipConditionFragment = {
  contractType: Types.NftContractType;
  tokenIds: Array<string> | null;
  contract: NetworkAddressFragment;
};

export type Erc20OwnershipConditionFragment = {
  condition: Types.ComparisonOperatorConditionType;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type EoaOwnershipConditionFragment = { address: string };

export type ProfileOwnershipConditionFragment = { profileId: string };

export type FollowConditionFragment = { follow: string };

export type CollectConditionFragment = {
  publicationId: string | null;
  thisPublication: boolean | null;
};

export type AndConditionFragment = {
  criteria: Array<
    | CollectConditionFragment
    | EoaOwnershipConditionFragment
    | Erc20OwnershipConditionFragment
    | FollowConditionFragment
    | NftOwnershipConditionFragment
    | ProfileOwnershipConditionFragment
    | {}
  >;
};

export type OrConditionFragment = {
  criteria: Array<
    | CollectConditionFragment
    | EoaOwnershipConditionFragment
    | Erc20OwnershipConditionFragment
    | FollowConditionFragment
    | NftOwnershipConditionFragment
    | ProfileOwnershipConditionFragment
    | {}
  >;
};

export type PublicationImageSetFragment = {
  rawURI: string;
  altTag: string | null;
  image: ImageFragment;
  transformed: ImageFragment | null;
};

export type PublicationMarketplaceMetadataAttributeFragment = {
  displayType: Types.PublicationMarketplaceMetadataAttributeDisplayType | null;
  traitType: string | null;
  value: string | null;
};

export type MarketplaceMetadataFragment = {
  description: string | null;
  externalURL: string | null;
  name: string;
  image: string | null;
  animationUrl: string | null;
  attributes: Array<PublicationMarketplaceMetadataAttributeFragment> | null;
};

export type PublicationMetadataMediaVideoFragment = {
  duration: number | null;
  license: Types.PublicationMetadataLicenseType | null;
  videoMimeType: Types.VideoMimeType;
  videoItem: VideoSetFragment;
  cover: PublicationImageSetFragment | null;
};

export type PublicationMetadataMediaImageFragment = {
  license: Types.PublicationMetadataLicenseType | null;
  imageMimeType: Types.ImageMimeType;
  imageItem: PublicationImageSetFragment;
};

export type PublicationMetadataMediaAudioFragment = {
  duration: number | null;
  license: Types.PublicationMetadataLicenseType | null;
  credits: string | null;
  artist: string | null;
  genre: string | null;
  recordLabel: string | null;
  audioType: Types.PublicationMetadataMediaAudioType | null;
  lyrics: string | null;
  audioMimeType: Types.AudioMimeType;
  audioItem: AudioSetFragment;
  cover: PublicationImageSetFragment | null;
};

export type PublicationMetadataV2Fragment = {
  name: string | null;
  description: string | null;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  animationUrl: string | null;
  optionalContent: string | null;
  v2mainContentFocus: Types.PublicationMetadataV2MainFocusType;
  v2image: PublicationImageSetFragment | null;
  media: Array<AudioSetFragment | PublicationImageSetFragment | VideoSetFragment> | null;
  attributes: Array<PublicationMarketplaceMetadataAttributeFragment> | null;
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
    accessCondition:
      | AndConditionFragment
      | CollectConditionFragment
      | EoaOwnershipConditionFragment
      | Erc20OwnershipConditionFragment
      | FollowConditionFragment
      | NftOwnershipConditionFragment
      | OrConditionFragment
      | ProfileOwnershipConditionFragment;
  } | null;
};

export type PublicationVideoMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  optionalContent: string | null;
  videoMainContentFocus: Types.PublicationVideoMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  video: PublicationMetadataMediaVideoFragment;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type PublicationImageMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  optionalContent: string | null;
  imageMainContentFocus: Types.PublicationImageMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  image: PublicationMetadataMediaImageFragment;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type ArticleMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  content: string;
  optionalTitle: string | null;
  articleMainContentFocus: Types.PublicationArticleMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type EventMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  startsAt: string;
  endsAt: string;
  links: Array<string> | null;
  location: string;
  optionalContent: string | null;
  eventMainContentFocus: Types.PublicationEventMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  geographic: { latitude: number | null; longitude: number | null } | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type LinkMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  sharingLink: string;
  optionalContent: string | null;
  linkMainContentFocus: Types.PublicationLinkMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type EmbedMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  embed: string;
  optionalContent: string | null;
  embedMainContentFocus: Types.PublicationEmbedMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type CheckingInMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  location: string;
  optionalContent: string | null;
  checkingInMainContentFocus: Types.PublicationCheckingInMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  geographic: { latitude: number | null; longitude: number | null } | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type TextOnlyMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  content: string;
  textOnlyMainContentFocus: Types.PublicationTextOnlyMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
};

export type ThreeDMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  optionalContent: string | null;
  threeDMainContentFocus: Types.PublicationThreeDMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
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

export type StoryMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  optionalContent: string | null;
  storyMainContentFocus: Types.PublicationStoryMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  asset:
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment;
};

export type TransactionMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  type: Types.PublicationTransactionMetadataType;
  txHash: string;
  chainId: string;
  optionalContent: string | null;
  transactionMainContentFocus: Types.PublicationTransactionMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type MintMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  mintLink: string;
  optionalContent: string | null;
  mintMainContentFocus: Types.PublicationMintMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type SpaceMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  title: string;
  link: string;
  startsAt: string;
  optionalContent: string | null;
  spaceMainContentFocus: Types.PublicationSpaceMetadataV1MainFocusType;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type LiveStreamMetadataV1Fragment = {
  id: string;
  rawURI: string;
  locale: string | null;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarningType | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  startsAt: string;
  playbackURL: string;
  liveURL: string;
  checkLiveAPI: string | null;
  optionalContent: string | null;
  liveStreamMainContentFocus: Types.PublicationLiveStreamMetadataV1MainFocusType;
  optionalTitle: string | null;
  optionalEndsAt: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: PublicationMetadataV3LitEncryptionFragment | {} | null;
  attachments: Array<
    | PublicationMetadataMediaAudioFragment
    | PublicationMetadataMediaImageFragment
    | PublicationMetadataMediaVideoFragment
  > | null;
};

export type PostFragment = {
  id: string;
  isHidden: boolean;
  isGated: boolean;
  createdAt: string;
  by: ProfileFieldsFragment;
  metadata:
    | ArticleMetadataV1Fragment
    | CheckingInMetadataV1Fragment
    | EmbedMetadataV1Fragment
    | EventMetadataV1Fragment
    | LinkMetadataV1Fragment
    | LiveStreamMetadataV1Fragment
    | MintMetadataV1Fragment
    | PublicationImageMetadataV1Fragment
    | PublicationMetadataV2Fragment
    | PublicationVideoMetadataV1Fragment
    | SpaceMetadataV1Fragment
    | StoryMetadataV1Fragment
    | TextOnlyMetadataV1Fragment
    | ThreeDMetadataV1Fragment
    | TransactionMetadataV1Fragment
    | {};
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
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
  operations: PublicationOperationsFragment;
};

export type CommentBaseFragment = {
  id: string;
  isHidden: boolean;
  isGated: boolean;
  createdAt: string;
  by: ProfileFieldsFragment;
  metadata:
    | ArticleMetadataV1Fragment
    | CheckingInMetadataV1Fragment
    | EmbedMetadataV1Fragment
    | EventMetadataV1Fragment
    | LinkMetadataV1Fragment
    | LiveStreamMetadataV1Fragment
    | MintMetadataV1Fragment
    | PublicationImageMetadataV1Fragment
    | PublicationMetadataV2Fragment
    | PublicationVideoMetadataV1Fragment
    | SpaceMetadataV1Fragment
    | StoryMetadataV1Fragment
    | TextOnlyMetadataV1Fragment
    | ThreeDMetadataV1Fragment
    | TransactionMetadataV1Fragment
    | {};
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
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
  operations: PublicationOperationsFragment;
};

export type CommentFragment = {
  root: PostFragment;
  commentOn: CommentBaseFragment | PostFragment | QuoteBaseFragment;
  firstComment: CommentBaseFragment;
} & CommentBaseFragment;

export type MirrorFragment = {
  id: string;
  createdAt: string;
  by: ProfileFieldsFragment;
  momoka: MomokaInfoFragment | null;
  mirrorOf: CommentFragment | PostFragment | QuoteFragment;
};

export type QuoteBaseFragment = {
  id: string;
  isHidden: boolean;
  isGated: boolean;
  createdAt: string;
  by: ProfileFieldsFragment;
  metadata:
    | ArticleMetadataV1Fragment
    | CheckingInMetadataV1Fragment
    | EmbedMetadataV1Fragment
    | EventMetadataV1Fragment
    | LinkMetadataV1Fragment
    | LiveStreamMetadataV1Fragment
    | MintMetadataV1Fragment
    | PublicationImageMetadataV1Fragment
    | PublicationMetadataV2Fragment
    | PublicationVideoMetadataV1Fragment
    | SpaceMetadataV1Fragment
    | StoryMetadataV1Fragment
    | TextOnlyMetadataV1Fragment
    | ThreeDMetadataV1Fragment
    | TransactionMetadataV1Fragment
    | {};
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
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
  operations: PublicationOperationsFragment;
};

export type QuoteFragment = {
  quotedOn: CommentBaseFragment | PostFragment | QuoteBaseFragment;
} & QuoteBaseFragment;

export type Eip712TypedDataDomainFragment = {
  name: string;
  chainId: string;
  version: string;
  verifyingContract: string;
};

export type RelaySuccessFragment = {
  __typename: 'RelaySuccess';
  txHash: string | null;
  txId: string | null;
};

export type RelayErrorFragment = { __typename: 'RelayError'; reason: Types.RelayErrorReasonType };

export type LensProfileManagerRelayErrorFragment = {
  reason: Types.LensProfileManagerRelayErrorReasonType;
};

export type CreateMomokaPublicationResultFragment = { id: string; proof: string; momokaId: string };

export const ImageFragmentDoc = gql`
  fragment Image on Image {
    url
    imageMimeType: mimeType
    width
    height
  }
`;
export const ProfileCoverSetFragmentDoc = gql`
  fragment ProfileCoverSet on ImageSet {
    rawURI
    image {
      ...Image
    }
    altTag
    transformed(input: $profileCoverTransform) {
      ...Image
    }
  }
  ${ImageFragmentDoc}
`;
export const NetworkAddressFragmentDoc = gql`
  fragment NetworkAddress on NetworkAddress {
    address
    chainId
  }
`;
export const ProfilePictureSetFragmentDoc = gql`
  fragment ProfilePictureSet on ImageSet {
    rawURI
    image {
      ...Image
    }
    altTag
    transformed(input: $profilePictureTransform) {
      ...Image
    }
  }
  ${ImageFragmentDoc}
`;
export const GaslessFragmentDoc = gql`
  fragment Gasless on Gasless {
    enabled
    relay {
      ...NetworkAddress
    }
  }
  ${NetworkAddressFragmentDoc}
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
export const AmountFragmentDoc = gql`
  fragment Amount on Amount {
    asset {
      ...Erc20
    }
    value
  }
  ${Erc20FragmentDoc}
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
export const ProfileFollowModuleSettingsFragmentDoc = gql`
  fragment ProfileFollowModuleSettings on ProfileFollowModuleSettings {
    contract {
      ...NetworkAddress
    }
  }
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
export const OptimisticStatusResultFragmentDoc = gql`
  fragment OptimisticStatusResult on OptimisticStatusResult {
    value
    isFinalisedOnChain
  }
`;
export const ProfileFieldsFragmentDoc = gql`
  fragment ProfileFields on Profile {
    __typename
    id
    metadata {
      rawURI
      displayName
      bio
      coverPicture {
        ...ProfileCoverSet
      }
    }
    handle
    ownedBy {
      ...NetworkAddress
    }
    picture {
      ... on NftImage {
        collection {
          ...NetworkAddress
        }
        tokenId
        image {
          ...ProfilePictureSet
        }
        verified
      }
      ... on ImageSet {
        ...ProfilePictureSet
      }
    }
    gasless {
      ...Gasless
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
    followNftAddress {
      ...NetworkAddress
    }
    attributes {
      type
      key
      value
    }
    onChainIdentity {
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
    interests
    isFollowedByMe {
      ...OptimisticStatusResult
    }
    isFollowingMe {
      ...OptimisticStatusResult
    }
    guardian {
      protected
      cooldownEndsOn
    }
    invitesLeft
    createdAt
  }
  ${ProfileCoverSetFragmentDoc}
  ${NetworkAddressFragmentDoc}
  ${ProfilePictureSetFragmentDoc}
  ${GaslessFragmentDoc}
  ${FeeFollowModuleSettingsFragmentDoc}
  ${ProfileFollowModuleSettingsFragmentDoc}
  ${RevertFollowModuleSettingsFragmentDoc}
  ${UnknownFollowModuleSettingsFragmentDoc}
  ${OptimisticStatusResultFragmentDoc}
`;
export const ProfileFragmentDoc = gql`
  fragment Profile on Profile {
    ...ProfileFields
    invitedBy {
      ...ProfileFields
    }
  }
  ${ProfileFieldsFragmentDoc}
`;
export const PaginatedResultInfoFragmentDoc = gql`
  fragment PaginatedResultInfo on PaginatedResultInfo {
    prev
    next
  }
`;
export const MomokaInfoFragmentDoc = gql`
  fragment MomokaInfo on MomokaInfo {
    proof
  }
`;
export const PublicationImageSetFragmentDoc = gql`
  fragment PublicationImageSet on ImageSet {
    rawURI
    image {
      ...Image
    }
    altTag
    transformed(input: $publicationImageTransform) {
      ...Image
    }
  }
  ${ImageFragmentDoc}
`;
export const VideoFragmentDoc = gql`
  fragment Video on Video {
    url
    videoMimeType: mimeType
  }
`;
export const VideoSetFragmentDoc = gql`
  fragment VideoSet on VideoSet {
    rawURL
    video {
      ...Video
    }
    altTag
  }
  ${VideoFragmentDoc}
`;
export const AudioFragmentDoc = gql`
  fragment Audio on Audio {
    url
    audioMimeType: mimeType
  }
`;
export const AudioSetFragmentDoc = gql`
  fragment AudioSet on AudioSet {
    rawURI
    audio {
      ...Audio
    }
  }
  ${AudioFragmentDoc}
`;
export const PublicationMarketplaceMetadataAttributeFragmentDoc = gql`
  fragment PublicationMarketplaceMetadataAttribute on PublicationMarketplaceMetadataAttribute {
    displayType
    traitType
    value
  }
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
    contract {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    condition
  }
  ${NetworkAddressFragmentDoc}
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
export const PublicationMetadataV2FragmentDoc = gql`
  fragment PublicationMetadataV2 on PublicationMetadataV2 {
    name
    description
    optionalContent: content
    v2image: image {
      ...PublicationImageSet
    }
    media {
      ... on VideoSet {
        ...VideoSet
      }
      ... on AudioSet {
        ...AudioSet
      }
      ... on ImageSet {
        ...PublicationImageSet
      }
    }
    attributes {
      ...PublicationMarketplaceMetadataAttribute
    }
    locale
    tags
    contentWarning
    v2mainContentFocus: mainContentFocus
    animationUrl
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
  ${PublicationImageSetFragmentDoc}
  ${VideoSetFragmentDoc}
  ${AudioSetFragmentDoc}
  ${PublicationMarketplaceMetadataAttributeFragmentDoc}
  ${NftOwnershipConditionFragmentDoc}
  ${Erc20OwnershipConditionFragmentDoc}
  ${EoaOwnershipConditionFragmentDoc}
  ${ProfileOwnershipConditionFragmentDoc}
  ${FollowConditionFragmentDoc}
  ${CollectConditionFragmentDoc}
  ${AndConditionFragmentDoc}
  ${OrConditionFragmentDoc}
`;
export const MarketplaceMetadataFragmentDoc = gql`
  fragment MarketplaceMetadata on MarketplaceMetadata {
    description
    externalURL
    name
    attributes {
      ...PublicationMarketplaceMetadataAttribute
    }
    image
    animationUrl
  }
  ${PublicationMarketplaceMetadataAttributeFragmentDoc}
`;
export const PublicationMetadataV3LitEncryptionFragmentDoc = gql`
  fragment PublicationMetadataV3LitEncryption on PublicationMetadataV3LitEncryption {
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
export const PublicationMetadataMediaVideoFragmentDoc = gql`
  fragment PublicationMetadataMediaVideo on PublicationMetadataMediaVideo {
    videoMimeType: type
    videoItem: item {
      ...VideoSet
    }
    cover {
      ...PublicationImageSet
    }
    duration
    license
  }
  ${VideoSetFragmentDoc}
  ${PublicationImageSetFragmentDoc}
`;
export const PublicationMetadataMediaImageFragmentDoc = gql`
  fragment PublicationMetadataMediaImage on PublicationMetadataMediaImage {
    imageMimeType: type
    imageItem: item {
      ...PublicationImageSet
    }
    license
  }
  ${PublicationImageSetFragmentDoc}
`;
export const PublicationMetadataMediaAudioFragmentDoc = gql`
  fragment PublicationMetadataMediaAudio on PublicationMetadataMediaAudio {
    audioMimeType: type
    audioItem: item {
      ...AudioSet
    }
    cover {
      ...PublicationImageSet
    }
    duration
    license
    credits
    artist
    genre
    recordLabel
    audioType
    lyrics
  }
  ${AudioSetFragmentDoc}
  ${PublicationImageSetFragmentDoc}
`;
export const PublicationVideoMetadataV1FragmentDoc = gql`
  fragment PublicationVideoMetadataV1 on PublicationVideoMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    videoMainContentFocus: mainContentFocus
    video {
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
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const PublicationImageMetadataV1FragmentDoc = gql`
  fragment PublicationImageMetadataV1 on PublicationImageMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    imageMainContentFocus: mainContentFocus
    image {
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const ArticleMetadataV1FragmentDoc = gql`
  fragment ArticleMetadataV1 on ArticleMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    content
    optionalTitle: title
    articleMainContentFocus: mainContentFocus
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const EventMetadataV1FragmentDoc = gql`
  fragment EventMetadataV1 on EventMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    eventMainContentFocus: mainContentFocus
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const LinkMetadataV1FragmentDoc = gql`
  fragment LinkMetadataV1 on LinkMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    linkMainContentFocus: mainContentFocus
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const EmbedMetadataV1FragmentDoc = gql`
  fragment EmbedMetadataV1 on EmbedMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    embedMainContentFocus: mainContentFocus
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const CheckingInMetadataV1FragmentDoc = gql`
  fragment CheckingInMetadataV1 on CheckingInMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    checkingInMainContentFocus: mainContentFocus
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const TextOnlyMetadataV1FragmentDoc = gql`
  fragment TextOnlyMetadataV1 on TextOnlyMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    content
    textOnlyMainContentFocus: mainContentFocus
  }
  ${MarketplaceMetadataFragmentDoc}
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
`;
export const ThreeDMetadataV1FragmentDoc = gql`
  fragment ThreeDMetadataV1 on ThreeDMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    threeDMainContentFocus: mainContentFocus
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const StoryMetadataV1FragmentDoc = gql`
  fragment StoryMetadataV1 on StoryMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    storyMainContentFocus: mainContentFocus
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const TransactionMetadataV1FragmentDoc = gql`
  fragment TransactionMetadataV1 on TransactionMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    transactionMainContentFocus: mainContentFocus
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const MintMetadataV1FragmentDoc = gql`
  fragment MintMetadataV1 on MintMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    mintMainContentFocus: mainContentFocus
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const SpaceMetadataV1FragmentDoc = gql`
  fragment SpaceMetadataV1 on SpaceMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    spaceMainContentFocus: mainContentFocus
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
  ${PublicationMetadataMediaVideoFragmentDoc}
  ${PublicationMetadataMediaImageFragmentDoc}
  ${PublicationMetadataMediaAudioFragmentDoc}
`;
export const LiveStreamMetadataV1FragmentDoc = gql`
  fragment LiveStreamMetadataV1 on LiveStreamMetadataV1 {
    id
    rawURI
    locale
    tags
    contentWarning
    hideFromFeed
    globalReach
    appId
    marketplace {
      ...MarketplaceMetadata
    }
    encryptedWith {
      ... on PublicationMetadataV3LitEncryption {
        ...PublicationMetadataV3LitEncryption
      }
    }
    optionalContent: content
    liveStreamMainContentFocus: mainContentFocus
    optionalTitle: title
    startsAt
    optionalEndsAt: endsAt
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
  ${PublicationMetadataV3LitEncryptionFragmentDoc}
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
    collectLimitOptional: collectLimit
    endTimestampOptional: endTimestamp
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const LegacySimpleCollectModuleSettingsFragmentDoc = gql`
  fragment LegacySimpleCollectModuleSettings on LegacySimpleCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    amountOptional: amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
    collectLimitOptional: collectLimit
    endTimestampOptional: endTimestamp
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
    collectLimitOptional: collectLimit
    endTimestampOptional: endTimestamp
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
    collectLimitOptional: collectLimit
    endTimestampOptional: endTimestamp
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
    collectLimitOptional: collectLimit
    endTimestampOptional: endTimestamp
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const SimpleCollectOpenActionSettingsFragmentDoc = gql`
  fragment SimpleCollectOpenActionSettings on SimpleCollectOpenActionSettings {
    contract {
      ...NetworkAddress
    }
    amountOptional: amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
    collectLimitOptional: collectLimit
    endTimestampOptional: endTimestamp
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
export const AppFragmentDoc = gql`
  fragment App on App {
    id
  }
`;
export const CollectOpenActionResultFragmentDoc = gql`
  fragment CollectOpenActionResult on CollectOpenActionResult {
    type
  }
`;
export const UnknownOpenActionResultFragmentDoc = gql`
  fragment UnknownOpenActionResult on UnknownOpenActionResult {
    address
    redeemData
  }
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
    hasUpvoted: hasReacted(request: { type: UPVOTE })
    hasDownvoted: hasReacted(request: { type: DOWNVOTE })
    isNotInterested
    hasBookmarked
    hasActed {
      ... on CollectOpenActionResult {
        ...CollectOpenActionResult
      }
      ... on UnknownOpenActionResult {
        ...UnknownOpenActionResult
      }
    }
    canComment
    canMirror
    hasMirrored
    canDecrypt {
      ...CanDecryptResponse
    }
  }
  ${CollectOpenActionResultFragmentDoc}
  ${UnknownOpenActionResultFragmentDoc}
  ${CanDecryptResponseFragmentDoc}
`;
export const PostFragmentDoc = gql`
  fragment Post on Post {
    id
    by {
      ...ProfileFields
    }
    metadata {
      ... on PublicationMetadataV2 {
        ...PublicationMetadataV2
      }
      ... on PublicationVideoMetadataV1 {
        ...PublicationVideoMetadataV1
      }
      ... on PublicationImageMetadataV1 {
        ...PublicationImageMetadataV1
      }
      ... on ArticleMetadataV1 {
        ...ArticleMetadataV1
      }
      ... on EventMetadataV1 {
        ...EventMetadataV1
      }
      ... on LinkMetadataV1 {
        ...LinkMetadataV1
      }
      ... on EmbedMetadataV1 {
        ...EmbedMetadataV1
      }
      ... on CheckingInMetadataV1 {
        ...CheckingInMetadataV1
      }
      ... on TextOnlyMetadataV1 {
        ...TextOnlyMetadataV1
      }
      ... on ThreeDMetadataV1 {
        ...ThreeDMetadataV1
      }
      ... on StoryMetadataV1 {
        ...StoryMetadataV1
      }
      ... on TransactionMetadataV1 {
        ...TransactionMetadataV1
      }
      ... on MintMetadataV1 {
        ...MintMetadataV1
      }
      ... on SpaceMetadataV1 {
        ...SpaceMetadataV1
      }
      ... on LiveStreamMetadataV1 {
        ...LiveStreamMetadataV1
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
    publishedOn {
      ...App
    }
    isHidden
    isGated
    momoka {
      ...MomokaInfo
    }
    operations {
      ...PublicationOperations
    }
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${PublicationMetadataV2FragmentDoc}
  ${PublicationVideoMetadataV1FragmentDoc}
  ${PublicationImageMetadataV1FragmentDoc}
  ${ArticleMetadataV1FragmentDoc}
  ${EventMetadataV1FragmentDoc}
  ${LinkMetadataV1FragmentDoc}
  ${EmbedMetadataV1FragmentDoc}
  ${CheckingInMetadataV1FragmentDoc}
  ${TextOnlyMetadataV1FragmentDoc}
  ${ThreeDMetadataV1FragmentDoc}
  ${StoryMetadataV1FragmentDoc}
  ${TransactionMetadataV1FragmentDoc}
  ${MintMetadataV1FragmentDoc}
  ${SpaceMetadataV1FragmentDoc}
  ${LiveStreamMetadataV1FragmentDoc}
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
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
  ${PublicationOperationsFragmentDoc}
`;
export const CommentBaseFragmentDoc = gql`
  fragment CommentBase on Comment {
    id
    by {
      ...ProfileFields
    }
    metadata {
      ... on PublicationMetadataV2 {
        ...PublicationMetadataV2
      }
      ... on PublicationVideoMetadataV1 {
        ...PublicationVideoMetadataV1
      }
      ... on PublicationImageMetadataV1 {
        ...PublicationImageMetadataV1
      }
      ... on ArticleMetadataV1 {
        ...ArticleMetadataV1
      }
      ... on EventMetadataV1 {
        ...EventMetadataV1
      }
      ... on LinkMetadataV1 {
        ...LinkMetadataV1
      }
      ... on EmbedMetadataV1 {
        ...EmbedMetadataV1
      }
      ... on CheckingInMetadataV1 {
        ...CheckingInMetadataV1
      }
      ... on TextOnlyMetadataV1 {
        ...TextOnlyMetadataV1
      }
      ... on ThreeDMetadataV1 {
        ...ThreeDMetadataV1
      }
      ... on StoryMetadataV1 {
        ...StoryMetadataV1
      }
      ... on TransactionMetadataV1 {
        ...TransactionMetadataV1
      }
      ... on MintMetadataV1 {
        ...MintMetadataV1
      }
      ... on SpaceMetadataV1 {
        ...SpaceMetadataV1
      }
      ... on LiveStreamMetadataV1 {
        ...LiveStreamMetadataV1
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
    publishedOn {
      ...App
    }
    isHidden
    isGated
    momoka {
      ...MomokaInfo
    }
    operations {
      ...PublicationOperations
    }
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${PublicationMetadataV2FragmentDoc}
  ${PublicationVideoMetadataV1FragmentDoc}
  ${PublicationImageMetadataV1FragmentDoc}
  ${ArticleMetadataV1FragmentDoc}
  ${EventMetadataV1FragmentDoc}
  ${LinkMetadataV1FragmentDoc}
  ${EmbedMetadataV1FragmentDoc}
  ${CheckingInMetadataV1FragmentDoc}
  ${TextOnlyMetadataV1FragmentDoc}
  ${ThreeDMetadataV1FragmentDoc}
  ${StoryMetadataV1FragmentDoc}
  ${TransactionMetadataV1FragmentDoc}
  ${MintMetadataV1FragmentDoc}
  ${SpaceMetadataV1FragmentDoc}
  ${LiveStreamMetadataV1FragmentDoc}
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
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
  ${PublicationOperationsFragmentDoc}
`;
export const QuoteBaseFragmentDoc = gql`
  fragment QuoteBase on Quote {
    id
    by {
      ...ProfileFields
    }
    metadata {
      ... on PublicationMetadataV2 {
        ...PublicationMetadataV2
      }
      ... on PublicationVideoMetadataV1 {
        ...PublicationVideoMetadataV1
      }
      ... on PublicationImageMetadataV1 {
        ...PublicationImageMetadataV1
      }
      ... on ArticleMetadataV1 {
        ...ArticleMetadataV1
      }
      ... on EventMetadataV1 {
        ...EventMetadataV1
      }
      ... on LinkMetadataV1 {
        ...LinkMetadataV1
      }
      ... on EmbedMetadataV1 {
        ...EmbedMetadataV1
      }
      ... on CheckingInMetadataV1 {
        ...CheckingInMetadataV1
      }
      ... on TextOnlyMetadataV1 {
        ...TextOnlyMetadataV1
      }
      ... on ThreeDMetadataV1 {
        ...ThreeDMetadataV1
      }
      ... on StoryMetadataV1 {
        ...StoryMetadataV1
      }
      ... on TransactionMetadataV1 {
        ...TransactionMetadataV1
      }
      ... on MintMetadataV1 {
        ...MintMetadataV1
      }
      ... on SpaceMetadataV1 {
        ...SpaceMetadataV1
      }
      ... on LiveStreamMetadataV1 {
        ...LiveStreamMetadataV1
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
    publishedOn {
      ...App
    }
    isHidden
    isGated
    momoka {
      ...MomokaInfo
    }
    operations {
      ...PublicationOperations
    }
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${PublicationMetadataV2FragmentDoc}
  ${PublicationVideoMetadataV1FragmentDoc}
  ${PublicationImageMetadataV1FragmentDoc}
  ${ArticleMetadataV1FragmentDoc}
  ${EventMetadataV1FragmentDoc}
  ${LinkMetadataV1FragmentDoc}
  ${EmbedMetadataV1FragmentDoc}
  ${CheckingInMetadataV1FragmentDoc}
  ${TextOnlyMetadataV1FragmentDoc}
  ${ThreeDMetadataV1FragmentDoc}
  ${StoryMetadataV1FragmentDoc}
  ${TransactionMetadataV1FragmentDoc}
  ${MintMetadataV1FragmentDoc}
  ${SpaceMetadataV1FragmentDoc}
  ${LiveStreamMetadataV1FragmentDoc}
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
  ${AppFragmentDoc}
  ${MomokaInfoFragmentDoc}
  ${PublicationOperationsFragmentDoc}
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
    quotedOn {
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
    by {
      ...ProfileFields
    }
    momoka {
      ...MomokaInfo
    }
    mirrorOf {
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
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${MomokaInfoFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const Eip712TypedDataDomainFragmentDoc = gql`
  fragment EIP712TypedDataDomain on EIP712TypedDataDomain {
    name
    chainId
    version
    verifyingContract
  }
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
