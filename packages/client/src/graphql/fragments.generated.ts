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
  imageMimeType: string | null;
};

export type VideoFragment = { url: string; videoMimeType: string | null };

export type VideoSetFragment = { rawURL: string; altTag: string | null; media: VideoFragment };

export type AudioFragment = { url: string; audioMimeType: string | null };

export type AudioSetFragment = { rawURL: string; media: AudioFragment };

export type ProfileCoverSetFragment = {
  rawURL: string;
  altTag: string | null;
  media: ImageFragment;
  transformed: ImageFragment | null;
};

export type ProfilePictureSetFragment = {
  rawURL: string;
  altTag: string | null;
  media: ImageFragment;
  transformed: ImageFragment | null;
};

export type ProfileFieldsFragment = {
  __typename: 'Profile';
  id: string;
  handle: string | null;
  interests: Array<string>;
  invitesLeft: number;
  createdAt: string;
  metadata: {
    rawURL: string | null;
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
  attributes: Array<{ type: Types.AttributeTypes | null; key: string; value: string }>;
  onChainIdentity: {
    proofOfHumanity: { isVerified: boolean };
    ens: { name: string } | null;
    sybilDotOrg: { source: { twitter: { handle: string | null } } } | null;
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
  endsAtOptional: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type MultirecipientFeeCollectOpenActionSettingsFragment = {
  referralFee: number;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endsAtOptional: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
  recipients: Array<{ recipient: string; split: number }>;
};

export type UnknownOpenActionSettingsFragment = {
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
  endsAt: string;
  contract: { address: string };
  amount: AmountFragment;
};

export type LegacyRevertCollectModuleSettingsFragment = { contract: NetworkAddressFragment };

export type LegacyTimedFeeCollectModuleSettingsFragment = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  endsAt: string;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyMultirecipientFeeCollectModuleSettingsFragment = {
  referralFee: number;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endsAtOptional: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
  recipients: Array<{ recipient: string; split: number }>;
};

export type LegacySimpleCollectModuleSettingsFragment = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endsAtOptional: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyErc4626FeeCollectModuleSettingsFragment = {
  vault: string;
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endsAtOptional: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type LegacyAaveFeeCollectModuleSettingsFragment = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endsAtOptional: string | null;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type UnknownCollectModuleSettingsFragment = {
  collectModuleReturnData: string;
  contract: NetworkAddressFragment;
};

export type CollectOpenActionResultFragment = { type: Types.CollectOpenActionModules | null };

export type NftDropOpenActionFragment = { tokenMinted: number | null };

export type UnknownOpenActionResultFragment = { address: string | null; redeemData: string | null };

export type CanDecryptResponseFragment = {
  result: boolean;
  reasons: Array<Types.DecryptFailReasonTypes> | null;
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
  hasActed: Array<
    CollectOpenActionResultFragment | NftDropOpenActionFragment | UnknownOpenActionResultFragment
  >;
  canDecrypt: CanDecryptResponseFragment | null;
};

export type MetadataV3LitEncryptionFragment = {
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
  condition: Types.ScalarOperator;
  contract: NetworkAddressFragment;
  amount: AmountFragment;
};

export type EoaOwnershipConditionFragment = { address: string };

export type ProfileOwnershipConditionFragment = { profileId: string };

export type FollowConditionFragment = { profileId: string };

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

export type MetadataV3Common_ArticleMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_AudioMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_CheckingInMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_EmbedMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_EventMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_ImageMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_LinkMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_LiveStreamMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_MintMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_SpaceMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_StoryMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_TextOnlyMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_ThreeDMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_TransactionMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3Common_VideoMetadataV1_Fragment = {
  id: string;
  rawURL: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  hideFromFeed: boolean;
  globalReach: boolean;
  appId: string | null;
  marketplace: MarketplaceMetadataFragment | null;
  encryptedWith: MetadataV3LitEncryptionFragment | {} | null;
};

export type MetadataV3CommonFragment =
  | MetadataV3Common_ArticleMetadataV1_Fragment
  | MetadataV3Common_AudioMetadataV1_Fragment
  | MetadataV3Common_CheckingInMetadataV1_Fragment
  | MetadataV3Common_EmbedMetadataV1_Fragment
  | MetadataV3Common_EventMetadataV1_Fragment
  | MetadataV3Common_ImageMetadataV1_Fragment
  | MetadataV3Common_LinkMetadataV1_Fragment
  | MetadataV3Common_LiveStreamMetadataV1_Fragment
  | MetadataV3Common_MintMetadataV1_Fragment
  | MetadataV3Common_SpaceMetadataV1_Fragment
  | MetadataV3Common_StoryMetadataV1_Fragment
  | MetadataV3Common_TextOnlyMetadataV1_Fragment
  | MetadataV3Common_ThreeDMetadataV1_Fragment
  | MetadataV3Common_TransactionMetadataV1_Fragment
  | MetadataV3Common_VideoMetadataV1_Fragment;

export type PublicationImageSetFragment = {
  rawURL: string;
  altTag: string | null;
  media: ImageFragment;
  transformed: ImageFragment | null;
};

export type MarketplaceMetadataAttributeFragment = {
  displayType: Types.MarketplaceMetadataAttributeDisplayTypes | null;
  traitType: string | null;
  value: string | null;
};

export type MarketplaceMetadataFragment = {
  description: string | null;
  externalUrl: string | null;
  name: string;
  image: string | null;
  animationUrl: string | null;
  attributes: Array<MarketplaceMetadataAttributeFragment>;
};

export type MetadataMediaVideoFragment = {
  duration: number | null;
  license: string | null;
  videoMimeType: string;
  videoItem: VideoSetFragment | null;
  cover: PublicationImageSetFragment | null;
};

export type MetadataMediaImageFragment = {
  license: string | null;
  imageMimeType: string;
  imageItem: PublicationImageSetFragment;
};

export type MetadataMediaAudioFragment = {
  duration: number | null;
  license: string | null;
  credits: string | null;
  artist: string | null;
  genre: string | null;
  recordLabel: string | null;
  audioType: string;
  lyrics: string | null;
  audioMimeType: string;
  audioItem: AudioSetFragment | null;
  cover: PublicationImageSetFragment | null;
};

export type MetadataV2Fragment = {
  name: string | null;
  description: string | null;
  locale: string;
  tags: Array<string> | null;
  contentWarning: Types.PublicationContentWarning | null;
  animationUrl: string | null;
  optionalContent: string | null;
  v2mainContentFocus: Types.MetadataV2MainFocus;
  v2image: PublicationImageSetFragment | null;
  media: Array<AudioSetFragment | PublicationImageSetFragment | VideoSetFragment>;
  attributes: Array<MarketplaceMetadataAttributeFragment> | null;
  encryptionInput: {
    encryptionKey: string;
    encryptedFields: {
      content: string | null;
      image: string | null;
      animationUrl: string | null;
      externalUrl: string | null;
      media: Array<{
        url: string;
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

export type VideoMetadataV1Fragment = {
  optionalContent: string | null;
  videoMainContentFocus: Types.VideoMetadataV1MainFocus;
  video: MetadataMediaVideoFragment;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_VideoMetadataV1_Fragment;

export type ImageMetadataV1Fragment = {
  optionalContent: string | null;
  imageMainContentFocus: Types.ImageMetadataV1MainFocus;
  image: MetadataMediaImageFragment;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_ImageMetadataV1_Fragment;

export type ArticleMetadataV1Fragment = {
  content: string;
  title: string | null;
  articleMainContentFocus: Types.ArticleMetadataV1MainFocus;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_ArticleMetadataV1_Fragment;

export type EventMetadataV1Fragment = {
  startsAt: string;
  endsAt: string | null;
  links: Array<string> | null;
  location: string;
  optionalContent: string | null;
  eventMainContentFocus: Types.EventMetadataV1MainFocus;
  geographic: { latitude: number; longitude: number } | null;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_EventMetadataV1_Fragment;

export type LinkMetadataV1Fragment = {
  sharingLink: string;
  optionalContent: string | null;
  linkMainContentFocus: Types.LinkMetadataV1MainFocus;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_LinkMetadataV1_Fragment;

export type EmbedMetadataV1Fragment = {
  embed: string;
  optionalContent: string | null;
  embedMainContentFocus: Types.EmbedMetadataV1MainFocus;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_EmbedMetadataV1_Fragment;

export type CheckingInMetadataV1Fragment = {
  location: string;
  optionalContent: string | null;
  checkingInMainContentFocus: Types.CheckingInMetadataV1MainFocus;
  geographic: { latitude: number; longitude: number } | null;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_CheckingInMetadataV1_Fragment;

export type TextOnlyMetadataV1Fragment = {
  content: string;
  textOnlyMainContentFocus: Types.TextOnlyMetadataV1MainFocus;
} & MetadataV3Common_TextOnlyMetadataV1_Fragment;

export type ThreeDMetadataV1Fragment = {
  optionalContent: string | null;
  threeDMainContentFocus: Types.ThreeDMetadataV1MainFocus;
  assets: Array<{
    url: string;
    zipPath: string | null;
    playerUrl: string;
    format: string;
    license: string | null;
  }>;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_ThreeDMetadataV1_Fragment;

export type StoryMetadataV1Fragment = {
  optionalContent: string | null;
  storyMainContentFocus: Types.StoryMetadataV1MainFocus;
  asset:
    | MetadataMediaAudioFragment
    | MetadataMediaImageFragment
    | MetadataMediaVideoFragment
    | null;
} & MetadataV3Common_StoryMetadataV1_Fragment;

export type TransactionMetadataV1Fragment = {
  type: Types.TransactionMetadataTypes;
  txHash: string;
  chainId: string;
  optionalContent: string | null;
  transactionMainContentFocus: Types.TransactionMetadataV1MainFocus;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_TransactionMetadataV1_Fragment;

export type MintMetadataV1Fragment = {
  mintLink: string;
  optionalContent: string | null;
  mintMainContentFocus: Types.MintMetadataV1MainFocus;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_MintMetadataV1_Fragment;

export type SpaceMetadataV1Fragment = {
  title: string | null;
  link: string;
  startsAt: string;
  optionalContent: string | null;
  spaceMainContentFocus: Types.SpaceMetadataV1MainFocus;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_SpaceMetadataV1_Fragment;

export type LiveStreamMetadataV1Fragment = {
  title: string | null;
  startsAt: string;
  endsAt: string | null;
  playbackUrl: string;
  liveUrl: string;
  isLiveNowApiCall: string | null;
  optionalContent: string | null;
  liveStreamMainContentFocus: Types.LiveStreamMetadataV1MainFocus;
  attachments: Array<
    MetadataMediaAudioFragment | MetadataMediaImageFragment | MetadataMediaVideoFragment
  > | null;
} & MetadataV3Common_LiveStreamMetadataV1_Fragment;

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
    | ImageMetadataV1Fragment
    | LinkMetadataV1Fragment
    | LiveStreamMetadataV1Fragment
    | MetadataV2Fragment
    | MintMetadataV1Fragment
    | SpaceMetadataV1Fragment
    | StoryMetadataV1Fragment
    | TextOnlyMetadataV1Fragment
    | ThreeDMetadataV1Fragment
    | TransactionMetadataV1Fragment
    | VideoMetadataV1Fragment
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
    | UnknownOpenActionSettingsFragment
  >;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettingsFragment
    | FollowOnlyReferenceModuleSettingsFragment
    | UnknownReferenceModuleSettingsFragment
    | null;
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
  operations: PublicationOperationsFragment | null;
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
    | ImageMetadataV1Fragment
    | LinkMetadataV1Fragment
    | LiveStreamMetadataV1Fragment
    | MetadataV2Fragment
    | MintMetadataV1Fragment
    | SpaceMetadataV1Fragment
    | StoryMetadataV1Fragment
    | TextOnlyMetadataV1Fragment
    | ThreeDMetadataV1Fragment
    | TransactionMetadataV1Fragment
    | VideoMetadataV1Fragment
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
    | UnknownOpenActionSettingsFragment
  >;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettingsFragment
    | FollowOnlyReferenceModuleSettingsFragment
    | UnknownReferenceModuleSettingsFragment
    | null;
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
  operations: PublicationOperationsFragment | null;
};

export type CommentFragment = {
  root: PostFragment;
  commentOn: CommentBaseFragment | PostFragment | QuoteBaseFragment | null;
  firstComment: CommentBaseFragment | null;
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
    | ImageMetadataV1Fragment
    | LinkMetadataV1Fragment
    | LiveStreamMetadataV1Fragment
    | MetadataV2Fragment
    | MintMetadataV1Fragment
    | SpaceMetadataV1Fragment
    | StoryMetadataV1Fragment
    | TextOnlyMetadataV1Fragment
    | ThreeDMetadataV1Fragment
    | TransactionMetadataV1Fragment
    | VideoMetadataV1Fragment
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
    | UnknownOpenActionSettingsFragment
  >;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettingsFragment
    | FollowOnlyReferenceModuleSettingsFragment
    | UnknownReferenceModuleSettingsFragment
    | null;
  publishedOn: AppFragment | null;
  momoka: MomokaInfoFragment | null;
  operations: PublicationOperationsFragment | null;
};

export type QuoteFragment = {
  quotedOn: CommentBaseFragment | PostFragment | QuoteBaseFragment | null;
} & QuoteBaseFragment;

export type Eip712TypedDataDomainFragment = {
  name: string;
  chainId: string;
  version: string;
  verifyingContract: string;
};

export type RelaySuccessFragment = { txHash: string; txId: string };

export type RelayErrorFragment = { reason: Types.RelayErrorReasons };

export type LensProfileManagerRelayErrorFragment = {
  reason: Types.LensProfileManagerRelayErrorReasons | null;
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
    rawURL
    media {
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
    rawURL
    media {
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
  fragment ERC20 on ERC20 {
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
      ...ERC20
    }
    value
    rate(currency: USD) {
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
      rawURL
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
      proofOfHumanity {
        isVerified
      }
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
export const UnknownCollectModuleSettingsFragmentDoc = gql`
  fragment UnknownCollectModuleSettings on UnknownCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    collectModuleReturnData
  }
  ${NetworkAddressFragmentDoc}
`;
export const MomokaInfoFragmentDoc = gql`
  fragment MomokaInfo on MomokaInfo {
    proof
  }
`;
export const PublicationImageSetFragmentDoc = gql`
  fragment PublicationImageSet on ImageSet {
    rawURL
    media {
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
    media {
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
    rawURL
    media {
      ...Audio
    }
  }
  ${AudioFragmentDoc}
`;
export const MarketplaceMetadataAttributeFragmentDoc = gql`
  fragment MarketplaceMetadataAttribute on MarketplaceMetadataAttribute {
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
    profileId
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
export const MetadataV2FragmentDoc = gql`
  fragment MetadataV2 on MetadataV2 {
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
      ...MarketplaceMetadataAttribute
    }
    locale
    tags
    contentWarning
    v2mainContentFocus: mainContentFocus
    animationUrl
    encryptionInput {
      encryptionKey
      encryptedFields {
        content
        image
        media {
          url
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
  ${MarketplaceMetadataAttributeFragmentDoc}
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
    externalUrl
    name
    attributes {
      ...MarketplaceMetadataAttribute
    }
    image
    animationUrl
  }
  ${MarketplaceMetadataAttributeFragmentDoc}
`;
export const MetadataV3LitEncryptionFragmentDoc = gql`
  fragment MetadataV3LitEncryption on MetadataV3LitEncryption {
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
export const MetadataV3CommonFragmentDoc = gql`
  fragment MetadataV3Common on MetadataV3Common {
    id
    rawURL
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
      ... on MetadataV3LitEncryption {
        ...MetadataV3LitEncryption
      }
    }
  }
  ${MarketplaceMetadataFragmentDoc}
  ${MetadataV3LitEncryptionFragmentDoc}
`;
export const MetadataMediaVideoFragmentDoc = gql`
  fragment MetadataMediaVideo on MetadataMediaVideo {
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
export const MetadataMediaImageFragmentDoc = gql`
  fragment MetadataMediaImage on MetadataMediaImage {
    imageMimeType: type
    imageItem: item {
      ...PublicationImageSet
    }
    license
  }
  ${PublicationImageSetFragmentDoc}
`;
export const MetadataMediaAudioFragmentDoc = gql`
  fragment MetadataMediaAudio on MetadataMediaAudio {
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
export const VideoMetadataV1FragmentDoc = gql`
  fragment VideoMetadataV1 on VideoMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    videoMainContentFocus: mainContentFocus
    video {
      ...MetadataMediaVideo
    }
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const ImageMetadataV1FragmentDoc = gql`
  fragment ImageMetadataV1 on ImageMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    imageMainContentFocus: mainContentFocus
    image {
      ...MetadataMediaImage
    }
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const ArticleMetadataV1FragmentDoc = gql`
  fragment ArticleMetadataV1 on ArticleMetadataV1 {
    ...MetadataV3Common
    content
    title
    articleMainContentFocus: mainContentFocus
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const EventMetadataV1FragmentDoc = gql`
  fragment EventMetadataV1 on EventMetadataV1 {
    ...MetadataV3Common
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
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const LinkMetadataV1FragmentDoc = gql`
  fragment LinkMetadataV1 on LinkMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    linkMainContentFocus: mainContentFocus
    sharingLink
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const EmbedMetadataV1FragmentDoc = gql`
  fragment EmbedMetadataV1 on EmbedMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    embedMainContentFocus: mainContentFocus
    embed
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const CheckingInMetadataV1FragmentDoc = gql`
  fragment CheckingInMetadataV1 on CheckingInMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    checkingInMainContentFocus: mainContentFocus
    location
    geographic {
      latitude
      longitude
    }
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const TextOnlyMetadataV1FragmentDoc = gql`
  fragment TextOnlyMetadataV1 on TextOnlyMetadataV1 {
    ...MetadataV3Common
    content
    textOnlyMainContentFocus: mainContentFocus
  }
  ${MetadataV3CommonFragmentDoc}
`;
export const ThreeDMetadataV1FragmentDoc = gql`
  fragment ThreeDMetadataV1 on ThreeDMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    threeDMainContentFocus: mainContentFocus
    assets {
      url
      zipPath
      playerUrl
      format
      license
    }
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const StoryMetadataV1FragmentDoc = gql`
  fragment StoryMetadataV1 on StoryMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    storyMainContentFocus: mainContentFocus
    asset {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const TransactionMetadataV1FragmentDoc = gql`
  fragment TransactionMetadataV1 on TransactionMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    transactionMainContentFocus: mainContentFocus
    type
    txHash
    chainId
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const MintMetadataV1FragmentDoc = gql`
  fragment MintMetadataV1 on MintMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    mintMainContentFocus: mainContentFocus
    mintLink
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const SpaceMetadataV1FragmentDoc = gql`
  fragment SpaceMetadataV1 on SpaceMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    spaceMainContentFocus: mainContentFocus
    title
    link
    startsAt
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
`;
export const LiveStreamMetadataV1FragmentDoc = gql`
  fragment LiveStreamMetadataV1 on LiveStreamMetadataV1 {
    ...MetadataV3Common
    optionalContent: content
    liveStreamMainContentFocus: mainContentFocus
    title
    startsAt
    endsAt
    playbackUrl
    liveUrl
    isLiveNowApiCall
    attachments {
      ... on MetadataMediaVideo {
        ...MetadataMediaVideo
      }
      ... on MetadataMediaImage {
        ...MetadataMediaImage
      }
      ... on MetadataMediaAudio {
        ...MetadataMediaAudio
      }
    }
  }
  ${MetadataV3CommonFragmentDoc}
  ${MetadataMediaVideoFragmentDoc}
  ${MetadataMediaImageFragmentDoc}
  ${MetadataMediaAudioFragmentDoc}
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
    endsAt
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
    endsAt
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
    endsAtOptional: endsAt
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
    collectLimitOptional: collectLimit
    endsAtOptional: endsAt
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const LegacyErc4626FeeCollectModuleSettingsFragmentDoc = gql`
  fragment LegacyERC4626FeeCollectModuleSettings on LegacyERC4626FeeCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    vault
    amount {
      ...Amount
    }
    recipient
    referralFee
    followerOnly
    collectLimitOptional: collectLimit
    endsAtOptional: endsAt
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
    endsAtOptional: endsAt
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
    endsAtOptional: endsAt
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
    collectLimitOptional: collectLimit
    endsAtOptional: endsAt
  }
  ${NetworkAddressFragmentDoc}
  ${AmountFragmentDoc}
`;
export const UnknownOpenActionSettingsFragmentDoc = gql`
  fragment UnknownOpenActionSettings on UnknownOpenActionSettings {
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
export const NftDropOpenActionFragmentDoc = gql`
  fragment NftDropOpenAction on NftDropOpenAction {
    tokenMinted
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
    hasUpvoted: hasReacted(type: UPVOTE)
    hasDownvoted: hasReacted(type: DOWNVOTE)
    isNotInterested
    hasBookmarked
    hasActed {
      ... on CollectOpenActionResult {
        ...CollectOpenActionResult
      }
      ... on NftDropOpenAction {
        ...NftDropOpenAction
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
  ${NftDropOpenActionFragmentDoc}
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
      ... on MetadataV2 {
        ...MetadataV2
      }
      ... on VideoMetadataV1 {
        ...VideoMetadataV1
      }
      ... on ImageMetadataV1 {
        ...ImageMetadataV1
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
      ... on UnknownOpenActionSettings {
        ...UnknownOpenActionSettings
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
    operations(by: $observerId) {
      ...PublicationOperations
    }
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${MetadataV2FragmentDoc}
  ${VideoMetadataV1FragmentDoc}
  ${ImageMetadataV1FragmentDoc}
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
  ${UnknownOpenActionSettingsFragmentDoc}
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
      ... on MetadataV2 {
        ...MetadataV2
      }
      ... on VideoMetadataV1 {
        ...VideoMetadataV1
      }
      ... on ImageMetadataV1 {
        ...ImageMetadataV1
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
      ... on UnknownOpenActionSettings {
        ...UnknownOpenActionSettings
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
    operations(by: $observerId) {
      ...PublicationOperations
    }
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${MetadataV2FragmentDoc}
  ${VideoMetadataV1FragmentDoc}
  ${ImageMetadataV1FragmentDoc}
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
  ${UnknownOpenActionSettingsFragmentDoc}
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
      ... on MetadataV2 {
        ...MetadataV2
      }
      ... on VideoMetadataV1 {
        ...VideoMetadataV1
      }
      ... on ImageMetadataV1 {
        ...ImageMetadataV1
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
      ... on UnknownOpenActionSettings {
        ...UnknownOpenActionSettings
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
    operations(by: $observerId) {
      ...PublicationOperations
    }
    createdAt
  }
  ${ProfileFieldsFragmentDoc}
  ${MetadataV2FragmentDoc}
  ${VideoMetadataV1FragmentDoc}
  ${ImageMetadataV1FragmentDoc}
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
  ${UnknownOpenActionSettingsFragmentDoc}
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
