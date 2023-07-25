/** Code generated. DO NOT EDIT. */
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-imports */
/* eslint-disable tsdoc/syntax */
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import type {
  AppId,
  DecryptionCriteria,
  ProfileId,
  PublicationId,
} from '@lens-protocol/domain/entities';
import type {
  Erc20Amount as ClientErc20Amount,
  EthereumAddress,
  Url,
} from '@lens-protocol/shared-kernel';
import gql from 'graphql-tag';

import type { CollectPolicy } from './CollectPolicy';
import type { ContentEncryptionKey } from './ContentEncryptionKey';
import type { ContentInsight } from './ContentInsight';
import type { Cursor } from './Cursor';
import type { FollowPolicy } from './FollowPolicy';
import type { FollowStatus } from './FollowStatus';
import type { ProfileAttributes } from './ProfileAttributes';
import type { ReferencePolicy } from './ReferencePolicy';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Blockchain data scalar type */
  BlockchainData: string;
  /** Broadcast scalar id type */
  BroadcastId: string;
  /** ChainId custom scalar type */
  ChainId: number;
  ClientErc20Amount: ClientErc20Amount;
  /** collect module data scalar type */
  CollectModuleData: string;
  CollectPolicy: CollectPolicy;
  /** ContentEncryptionKey scalar type */
  ContentEncryptionKey: ContentEncryptionKey;
  ContentInsight: ContentInsight;
  /** Contract address custom scalar type */
  ContractAddress: string;
  /** create handle custom scalar type */
  CreateHandle: unknown;
  /** Cursor custom scalar type */
  Cursor: Cursor;
  /** The da id */
  DataAvailabilityId: string;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string;
  DecryptionCriteria: DecryptionCriteria;
  /** EncryptedValue custom scalar type */
  EncryptedValueScalar: string;
  /** Ens custom scalar type */
  Ens: unknown;
  /** Ethereum address custom scalar type */
  EthereumAddress: EthereumAddress;
  /** follow module data scalar type */
  FollowModuleData: string;
  FollowPolicy: FollowPolicy;
  FollowStatus: FollowStatus;
  /** handle custom scalar type */
  Handle: string;
  /** handle claim id custom scalar type */
  HandleClaimIdScalar: unknown;
  /** image size transform custom scalar type */
  ImageSizeTransform: unknown;
  /** Internal publication id custom scalar type */
  InternalPublicationId: PublicationId;
  /** IpfsCid scalar type */
  IpfsCid: unknown;
  /** jwt custom scalar type */
  Jwt: string;
  /** limit custom scalar type */
  LimitScalar: number;
  /** Locale scalar type */
  Locale: string;
  /** Markdown scalar type */
  Markdown: string;
  /** mimetype custom scalar type */
  MimeType: string;
  /** Nft gallery id type */
  NftGalleryId: unknown;
  /** Nft gallery name type */
  NftGalleryName: unknown;
  /** Nft ownership id type */
  NftOwnershipId: string;
  /** Nonce custom scalar type */
  Nonce: number;
  /** The notification id */
  NotificationId: string;
  PendingPublicationId: string;
  ProfileAttributes: ProfileAttributes;
  /** ProfileId custom scalar type */
  ProfileId: ProfileId;
  /** ProfileInterest custom scalar type */
  ProfileInterest: string;
  /** proxy action scalar id type */
  ProxyActionId: string;
  /** Publication id custom scalar type */
  PublicationId: string;
  /** The publication tag */
  PublicationTag: unknown;
  /** Publication url scalar type */
  PublicationUrl: Url;
  /** The reaction id */
  ReactionId: unknown;
  /** reference module data scalar type */
  ReferenceModuleData: string;
  ReferencePolicy: ReferencePolicy;
  /** Query search */
  Search: string;
  /** Relayer signature */
  Signature: string;
  /** Sources custom scalar type */
  Sources: AppId;
  /** timestamp date custom scalar type */
  TimestampScalar: unknown;
  /** The NFT token id */
  TokenId: string;
  /** The tx hash */
  TxHash: string;
  /** The tx id */
  TxId: string;
  /** UnixTimestamp custom scalar type */
  UnixTimestamp: unknown;
  /** Url scalar type */
  Url: Url;
  /** Represents NULL values */
  Void: void;
};

export type AaveFeeCollectModuleParams = {
  /** The collect module amount info */
  amount: ModuleFeeAmountParams;
  /** The collect module limit */
  collectLimit?: InputMaybe<Scalars['String']>;
  /** The timestamp that this collect module will expire */
  endTimestamp?: InputMaybe<Scalars['DateTime']>;
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

/** The access conditions for the publication */
export type AccessConditionInput = {
  /** AND condition */
  and?: InputMaybe<AndConditionInput>;
  /** Profile follow condition */
  collect?: InputMaybe<CollectConditionInput>;
  /** EOA ownership condition */
  eoa?: InputMaybe<EoaOwnershipInput>;
  /** Profile follow condition */
  follow?: InputMaybe<FollowConditionInput>;
  /** NFT ownership condition */
  nft?: InputMaybe<NftOwnershipInput>;
  /** OR condition */
  or?: InputMaybe<OrConditionInput>;
  /** Profile ownership condition */
  profile?: InputMaybe<ProfileOwnershipInput>;
  /** ERC20 token ownership condition */
  token?: InputMaybe<Erc20OwnershipInput>;
};

export type AchRequest = {
  ethereumAddress: Scalars['EthereumAddress'];
  freeTextHandle?: InputMaybe<Scalars['Boolean']>;
  handle?: InputMaybe<Scalars['CreateHandle']>;
  overrideAlreadyClaimed: Scalars['Boolean'];
  overrideTradeMark: Scalars['Boolean'];
  secret: Scalars['String'];
};

/** The request object to add interests to a profile */
export type AddProfileInterestsRequest = {
  /** The profile interest to add */
  interests: Array<Scalars['ProfileInterest']>;
  /** The profileId to add interests to */
  profileId: Scalars['ProfileId'];
};

export type AllPublicationsTagsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  sort: TagSortCriteria;
  /** The App Id */
  source?: InputMaybe<Scalars['Sources']>;
};

export type AlreadyInvitedCheckRequest = {
  address: Scalars['EthereumAddress'];
};

export type AndConditionInput = {
  /** The list of conditions to apply AND to. You can only use nested boolean conditions at the root level. */
  criteria: Array<AccessConditionInput>;
};

export type ApprovedModuleAllowanceAmountRequest = {
  collectModules?: InputMaybe<Array<CollectModules>>;
  /** The contract addresses for the module approved currencies you want to find information on about the user */
  currencies: Array<Scalars['ContractAddress']>;
  followModules?: InputMaybe<Array<FollowModules>>;
  referenceModules?: InputMaybe<Array<ReferenceModules>>;
  unknownCollectModules?: InputMaybe<Array<Scalars['ContractAddress']>>;
  unknownFollowModules?: InputMaybe<Array<Scalars['ContractAddress']>>;
  unknownReferenceModules?: InputMaybe<Array<Scalars['ContractAddress']>>;
};

export type BroadcastRequest = {
  id: Scalars['BroadcastId'];
  signature: Scalars['Signature'];
};

export type BurnProfileRequest = {
  profileId: Scalars['ProfileId'];
};

/** The challenge request */
export type ChallengeRequest = {
  /** The ethereum address you want to login with */
  address: Scalars['EthereumAddress'];
};

export type ClaimHandleRequest = {
  /** The follow module */
  followModule?: InputMaybe<FollowModuleParams>;
  freeTextHandle?: InputMaybe<Scalars['CreateHandle']>;
  id?: InputMaybe<Scalars['HandleClaimIdScalar']>;
};

/** The claim status */
export enum ClaimStatus {
  AlreadyClaimed = 'ALREADY_CLAIMED',
  ClaimFailed = 'CLAIM_FAILED',
  NotClaimed = 'NOT_CLAIMED',
}

/** Condition that signifies if address or profile has collected a publication */
export type CollectConditionInput = {
  /** The publication id that has to be collected to unlock content */
  publicationId?: InputMaybe<Scalars['InternalPublicationId']>;
  /** True if the content will be unlocked for this specific publication */
  thisPublication?: InputMaybe<Scalars['Boolean']>;
};

export type CollectModuleParams = {
  /** The collect aave fee collect module */
  aaveFeeCollectModule?: InputMaybe<AaveFeeCollectModuleParams>;
  /** The collect ERC4626 fee collect module */
  erc4626FeeCollectModule?: InputMaybe<Erc4626FeeCollectModuleParams>;
  /** The collect fee collect module */
  feeCollectModule?: InputMaybe<FeeCollectModuleParams>;
  /** The collect empty collect module */
  freeCollectModule?: InputMaybe<FreeCollectModuleParams>;
  /** The collect limited fee collect module */
  limitedFeeCollectModule?: InputMaybe<LimitedFeeCollectModuleParams>;
  /** The collect limited timed fee collect module */
  limitedTimedFeeCollectModule?: InputMaybe<LimitedTimedFeeCollectModuleParams>;
  /** The multirecipient fee collect module */
  multirecipientFeeCollectModule?: InputMaybe<MultirecipientFeeCollectModuleParams>;
  /** The collect revert collect module */
  revertCollectModule?: InputMaybe<Scalars['Boolean']>;
  /** The collect simple fee collect module */
  simpleCollectModule?: InputMaybe<SimpleCollectModuleParams>;
  /** The collect timed fee collect module */
  timedFeeCollectModule?: InputMaybe<TimedFeeCollectModuleParams>;
  /** A unknown collect module */
  unknownCollectModule?: InputMaybe<UnknownCollectModuleParams>;
};

/** The collect module types */
export enum CollectModules {
  AaveFeeCollectModule = 'AaveFeeCollectModule',
  Erc4626FeeCollectModule = 'ERC4626FeeCollectModule',
  FeeCollectModule = 'FeeCollectModule',
  FreeCollectModule = 'FreeCollectModule',
  LimitedFeeCollectModule = 'LimitedFeeCollectModule',
  LimitedTimedFeeCollectModule = 'LimitedTimedFeeCollectModule',
  MultirecipientFeeCollectModule = 'MultirecipientFeeCollectModule',
  RevertCollectModule = 'RevertCollectModule',
  SimpleCollectModule = 'SimpleCollectModule',
  TimedFeeCollectModule = 'TimedFeeCollectModule',
  UnknownCollectModule = 'UnknownCollectModule',
}

export type CollectProxyAction = {
  freeCollect?: InputMaybe<FreeCollectProxyAction>;
};

/** The comment ordering types */
export enum CommentOrderingTypes {
  Desc = 'DESC',
  Ranking = 'RANKING',
}

/** The comment ranking filter types */
export enum CommentRankingFilter {
  NoneRelevant = 'NONE_RELEVANT',
  Relevant = 'RELEVANT',
}

/** The gated publication access criteria contract types */
export enum ContractType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
}

export type CreateCollectRequest = {
  publicationId: Scalars['InternalPublicationId'];
  /** The encoded data to collect with if using an unknown module */
  unknownModuleData?: InputMaybe<Scalars['BlockchainData']>;
};

export type CreateDataAvailabilityCommentRequest = {
  /** Publication your commenting on */
  commentOn: Scalars['InternalPublicationId'];
  /** The metadata contentURI resolver */
  contentURI: Scalars['Url'];
  /** Profile id */
  from: Scalars['ProfileId'];
};

export type CreateDataAvailabilityMirrorRequest = {
  /** Profile id which will broadcast the mirror */
  from: Scalars['ProfileId'];
  /** The publication to mirror */
  mirror: Scalars['InternalPublicationId'];
};

export type CreateDataAvailabilityPostRequest = {
  /** The metadata contentURI resolver */
  contentURI: Scalars['Url'];
  /** Profile id */
  from: Scalars['ProfileId'];
};

export type CreateMirrorRequest = {
  /** Profile id */
  profileId: Scalars['ProfileId'];
  /** Publication id of what you want to mirror on remember if this is a comment it will be that as the id */
  publicationId: Scalars['InternalPublicationId'];
  /** The reference module info */
  referenceModule?: InputMaybe<ReferenceModuleParams>;
};

export type CreateProfileRequest = {
  /** The follow module */
  followModule?: InputMaybe<FollowModuleParams>;
  /** The follow NFT URI is the NFT metadata your followers will mint when they follow you. This can be updated at all times. If you do not pass in anything it will create a super cool changing NFT which will show the last publication of your profile as the NFT which looks awesome! This means people do not have to worry about writing this logic but still have the ability to customise it for their followers */
  followNFTURI?: InputMaybe<Scalars['Url']>;
  handle: Scalars['CreateHandle'];
  /** The profile picture uri */
  profilePictureUri?: InputMaybe<Scalars['Url']>;
};

export type CreatePublicCommentRequest = {
  /** The collect module */
  collectModule: CollectModuleParams;
  /** The metadata contentURI resolver */
  contentURI: Scalars['Url'];
  /** The criteria to access the publication data */
  gated?: InputMaybe<GatedPublicationParamsInput>;
  /** Profile id */
  profileId: Scalars['ProfileId'];
  /** Publication id of what your comments on remember if this is a comment you commented on it will be that as the id */
  publicationId: Scalars['InternalPublicationId'];
  /** The reference module */
  referenceModule?: InputMaybe<ReferenceModuleParams>;
};

export type CreatePublicPostRequest = {
  /** The collect module */
  collectModule: CollectModuleParams;
  /** The metadata uploaded somewhere passing in the url to reach it */
  contentURI: Scalars['Url'];
  /** The criteria to access the publication data */
  gated?: InputMaybe<GatedPublicationParamsInput>;
  /** Profile id */
  profileId: Scalars['ProfileId'];
  /** The reference module */
  referenceModule?: InputMaybe<ReferenceModuleParams>;
};

export type CreatePublicSetProfileMetadataUriRequest = {
  /** The metadata uploaded somewhere passing in the url to reach it */
  metadata: Scalars['Url'];
  /** Profile id */
  profileId: Scalars['ProfileId'];
};

export type CreateSetDefaultProfileRequest = {
  /** Profile id */
  profileId: Scalars['ProfileId'];
};

export type CreateSetFollowModuleRequest = {
  /** The follow module info */
  followModule: FollowModuleParams;
  profileId: Scalars['ProfileId'];
};

export type CreateSetFollowNftUriRequest = {
  /** The follow NFT URI is the NFT metadata your followers will mint when they follow you. This can be updated at all times. If you do not pass in anything it will create a super cool changing NFT which will show the last publication of your profile as the NFT which looks awesome! This means people do not have to worry about writing this logic but still have the ability to customise it for their followers */
  followNFTURI?: InputMaybe<Scalars['Url']>;
  profileId: Scalars['ProfileId'];
};

export type CreateToggleFollowRequest = {
  enables: Array<Scalars['Boolean']>;
  profileIds: Array<Scalars['ProfileId']>;
};

export type CurRequest = {
  secret: Scalars['String'];
};

/** The custom filters types */
export enum CustomFiltersTypes {
  Gardeners = 'GARDENERS',
}

export type DataAvailabilityTransactionRequest = {
  /** The DA transaction id or internal publiation id */
  id: Scalars['String'];
};

export type DataAvailabilityTransactionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  profileId?: InputMaybe<Scalars['ProfileId']>;
};

/** The reason why a profile cannot decrypt a publication */
export enum DecryptFailReason {
  CanNotDecrypt = 'CAN_NOT_DECRYPT',
  CollectNotFinalisedOnChain = 'COLLECT_NOT_FINALISED_ON_CHAIN',
  DoesNotFollowProfile = 'DOES_NOT_FOLLOW_PROFILE',
  DoesNotOwnNft = 'DOES_NOT_OWN_NFT',
  DoesNotOwnProfile = 'DOES_NOT_OWN_PROFILE',
  FollowNotFinalisedOnChain = 'FOLLOW_NOT_FINALISED_ON_CHAIN',
  HasNotCollectedPublication = 'HAS_NOT_COLLECTED_PUBLICATION',
  MissingEncryptionParams = 'MISSING_ENCRYPTION_PARAMS',
  ProfileDoesNotExist = 'PROFILE_DOES_NOT_EXIST',
  UnauthorizedAddress = 'UNAUTHORIZED_ADDRESS',
  UnauthorizedBalance = 'UNAUTHORIZED_BALANCE',
}

export type DefaultProfileRequest = {
  ethereumAddress: Scalars['EthereumAddress'];
};

export type DegreesOfSeparationReferenceModuleParams = {
  /** Applied to comments */
  commentsRestricted: Scalars['Boolean'];
  /** Degrees of separation */
  degreesOfSeparation: Scalars['Int'];
  /** Applied to mirrors */
  mirrorsRestricted: Scalars['Boolean'];
};

export type DismissRecommendedProfilesRequest = {
  profileIds: Array<Scalars['ProfileId']>;
};

export type DoesFollow = {
  /** The follower address remember wallets follow profiles */
  followerAddress: Scalars['EthereumAddress'];
  /** The profile id */
  profileId: Scalars['ProfileId'];
};

export type DoesFollowRequest = {
  /** The follower infos */
  followInfos: Array<DoesFollow>;
};

export type Erc4626FeeCollectModuleParams = {
  /** The collecting cost associated with this publication. 0 for free collect. */
  amount: ModuleFeeAmountParams;
  /** The maximum number of collects for this publication. Omit for no limit. */
  collectLimit?: InputMaybe<Scalars['String']>;
  /** The end timestamp after which collecting is impossible. Omit for no expiry. */
  endTimestamp?: InputMaybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean'];
  /** The address of the recipient who will recieve vault shares after depositing is completed. */
  recipient: Scalars['EthereumAddress'];
  /** The referral fee associated with this publication. */
  referralFee?: InputMaybe<Scalars['Float']>;
  /** The address of the ERC4626 vault to deposit funds to. */
  vault: Scalars['ContractAddress'];
};

/** The gated publication encryption provider */
export enum EncryptionProvider {
  LitProtocol = 'LIT_PROTOCOL',
}

export type EoaOwnershipInput = {
  /** The address that will have access to the content */
  address: Scalars['EthereumAddress'];
};

export type Erc20OwnershipInput = {
  /** The amount of tokens required to access the content */
  amount: Scalars['String'];
  /** The amount of tokens required to access the content */
  chainID: Scalars['ChainId'];
  /** The operator to use when comparing the amount of tokens */
  condition: ScalarOperator;
  /** The ERC20 token ethereum address */
  contractAddress: Scalars['ContractAddress'];
  /** The amount of decimals of the ERC20 contract */
  decimals: Scalars['Float'];
};

export type ExploreProfilesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  sortCriteria: ProfileSortCriteria;
  timestamp?: InputMaybe<Scalars['TimestampScalar']>;
};

export type ExplorePublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  /** If you wish to exclude any results for profile ids */
  excludeProfileIds?: InputMaybe<Array<Scalars['ProfileId']>>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  /** If you want the randomizer off (default on) */
  noRandomize?: InputMaybe<Scalars['Boolean']>;
  /** The publication types you want to query */
  publicationTypes?: InputMaybe<Array<PublicationTypes>>;
  sortCriteria: PublicationSortCriteria;
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
  timestamp?: InputMaybe<Scalars['TimestampScalar']>;
};

export type FeeCollectModuleParams = {
  /** The collect module amount info */
  amount: ModuleFeeAmountParams;
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

export type FeeFollowModuleParams = {
  /** The follow module amount info */
  amount: ModuleFeeAmountParams;
  /** The follow module recipient address */
  recipient: Scalars['EthereumAddress'];
};

export type FeeFollowModuleRedeemParams = {
  /** The expected amount to pay */
  amount: ModuleFeeAmountParams;
};

/** The feed event item filter types */
export enum FeedEventItemType {
  CollectComment = 'COLLECT_COMMENT',
  CollectPost = 'COLLECT_POST',
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  ReactionComment = 'REACTION_COMMENT',
  ReactionPost = 'REACTION_POST',
}

export type FeedHighlightsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
};

export type FeedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** Filter your feed to whatever you wish */
  feedEventItemTypes?: InputMaybe<Array<FeedEventItemType>>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
};

export type Follow = {
  followModule?: InputMaybe<FollowModuleRedeemParams>;
  profile: Scalars['ProfileId'];
};

export type FollowConditionInput = {
  /** The profile id of the gated profile */
  profileId: Scalars['ProfileId'];
};

export type FollowModuleParams = {
  /** The follower fee follower module */
  feeFollowModule?: InputMaybe<FeeFollowModuleParams>;
  /** The empty follow module */
  freeFollowModule?: InputMaybe<Scalars['Boolean']>;
  /** The profile follow module */
  profileFollowModule?: InputMaybe<Scalars['Boolean']>;
  /** The revert follow module */
  revertFollowModule?: InputMaybe<Scalars['Boolean']>;
  /** A unknown follow module */
  unknownFollowModule?: InputMaybe<UnknownFollowModuleParams>;
};

export type FollowModuleRedeemParams = {
  /** The follower fee follower module */
  feeFollowModule?: InputMaybe<FeeFollowModuleRedeemParams>;
  /** The profile follower module */
  profileFollowModule?: InputMaybe<ProfileFollowModuleRedeemParams>;
  /** A unknown follow module */
  unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemParams>;
};

/** The follow module types */
export enum FollowModules {
  FeeFollowModule = 'FeeFollowModule',
  ProfileFollowModule = 'ProfileFollowModule',
  RevertFollowModule = 'RevertFollowModule',
  UnknownFollowModule = 'UnknownFollowModule',
}

export type FollowProxyAction = {
  freeFollow?: InputMaybe<FreeFollowProxyAction>;
};

export type FollowRequest = {
  follow: Array<Follow>;
};

export type FollowerNftOwnedTokenIdsRequest = {
  address: Scalars['EthereumAddress'];
  profileId: Scalars['ProfileId'];
};

export type FollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  profileId: Scalars['ProfileId'];
};

export type FollowingRequest = {
  address: Scalars['EthereumAddress'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
};

export type FraudReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingFraudSubreason;
};

export type FreeCollectModuleParams = {
  /** Follower only */
  followerOnly: Scalars['Boolean'];
};

export type FreeCollectProxyAction = {
  publicationId: Scalars['InternalPublicationId'];
};

export type FreeFollowProxyAction = {
  profileId: Scalars['ProfileId'];
};

/** The access conditions for the publication */
export type GatedPublicationParamsInput = {
  /** AND condition */
  and?: InputMaybe<AndConditionInput>;
  /** Profile follow condition */
  collect?: InputMaybe<CollectConditionInput>;
  /** The LIT Protocol encrypted symmetric key */
  encryptedSymmetricKey: Scalars['ContentEncryptionKey'];
  /** EOA ownership condition */
  eoa?: InputMaybe<EoaOwnershipInput>;
  /** Profile follow condition */
  follow?: InputMaybe<FollowConditionInput>;
  /** NFT ownership condition */
  nft?: InputMaybe<NftOwnershipInput>;
  /** OR condition */
  or?: InputMaybe<OrConditionInput>;
  /** Profile ownership condition */
  profile?: InputMaybe<ProfileOwnershipInput>;
  /** ERC20 token ownership condition */
  token?: InputMaybe<Erc20OwnershipInput>;
};

export type GciRequest = {
  hhh: Scalars['String'];
  secret: Scalars['String'];
  ttt: Scalars['String'];
};

export type GcrRequest = {
  hhh: Scalars['String'];
  secret: Scalars['String'];
  ttt: Scalars['String'];
};

export type GctRequest = {
  hhh: Scalars['String'];
  secret: Scalars['String'];
};

export type GddRequest = {
  domain: Scalars['Url'];
  secret: Scalars['String'];
};

export type GdmRequest = {
  secret: Scalars['String'];
};

export type GenerateModuleCurrencyApprovalDataRequest = {
  collectModule?: InputMaybe<CollectModules>;
  currency: Scalars['ContractAddress'];
  followModule?: InputMaybe<FollowModules>;
  referenceModule?: InputMaybe<ReferenceModules>;
  unknownCollectModule?: InputMaybe<Scalars['ContractAddress']>;
  unknownFollowModule?: InputMaybe<Scalars['ContractAddress']>;
  unknownReferenceModule?: InputMaybe<Scalars['ContractAddress']>;
  /** Floating point number as string (e.g. 42.009837). The server will move its decimal places for you */
  value: Scalars['String'];
};

export type GetPublicationMetadataStatusRequest = {
  publicationId?: InputMaybe<Scalars['InternalPublicationId']>;
  txHash?: InputMaybe<Scalars['TxHash']>;
  txId?: InputMaybe<Scalars['TxId']>;
};

export type GlobalProtocolStatsRequest = {
  /** Unix time from timestamp - if not supplied it will go from 0 timestamp */
  fromTimestamp?: InputMaybe<Scalars['UnixTimestamp']>;
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
  /** Unix time to timestamp - if not supplied it go to the present timestamp */
  toTimestamp?: InputMaybe<Scalars['UnixTimestamp']>;
};

export type HasTxHashBeenIndexedRequest = {
  /** Tx hash.. if your using the broadcaster you should use txId due to gas price upgrades */
  txHash?: InputMaybe<Scalars['TxHash']>;
  /** Tx id.. if your using the broadcaster you should always use this field */
  txId?: InputMaybe<Scalars['TxId']>;
};

export type HelRequest = {
  handle: Scalars['Handle'];
  remove: Scalars['Boolean'];
  secret: Scalars['String'];
};

export type HidePublicationRequest = {
  /** Publication id */
  publicationId: Scalars['InternalPublicationId'];
};

export type IdKitPhoneVerifyWebhookRequest = {
  sharedSecret: Scalars['String'];
  worldcoin?: InputMaybe<WorldcoinPhoneVerifyWebhookRequest>;
};

/** The verify webhook result status type */
export enum IdKitPhoneVerifyWebhookResultStatusType {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Success = 'SUCCESS',
}

export type IllegalReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingIllegalSubreason;
};

export type InRequest = {
  ethereumAddress: Scalars['EthereumAddress'];
  numInvites: Scalars['Int'];
  secret: Scalars['String'];
};

export type InTotalRequest = {
  ethereumAddress: Scalars['EthereumAddress'];
  secret: Scalars['String'];
};

export type InternalPinRequest = {
  /** The shared secret */
  items: Array<Scalars['Url']>;
  /** The shared secret */
  secret: Scalars['String'];
};

export type InviteRequest = {
  invites: Array<Scalars['EthereumAddress']>;
  secret: Scalars['String'];
};

export type LimitedFeeCollectModuleParams = {
  /** The collect module amount info */
  amount: ModuleFeeAmountParams;
  /** The collect module limit */
  collectLimit: Scalars['String'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

export type LimitedTimedFeeCollectModuleParams = {
  /** The collect module amount info */
  amount: ModuleFeeAmountParams;
  /** The collect module limit */
  collectLimit: Scalars['String'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

export type MediaTransformParams = {
  /** Set the transformed image's height. You can use specific size in pixels eg. 100px, a percentage eg. 50% or set as 'auto' to be set automatically. Default value is 'auto'. */
  height?: InputMaybe<Scalars['ImageSizeTransform']>;
  /** Set if you want to keep the image's original aspect ratio. True by default. If explicitly set to false, the image will stretch based on the width and height values. */
  keepAspectRatio?: InputMaybe<Scalars['Boolean']>;
  /** Set the transformed image's width. You can use specific size in pixels eg. 100px, a percentage eg. 50% or set as 'auto' to be set automatically. Default value is 'auto'. */
  width?: InputMaybe<Scalars['ImageSizeTransform']>;
};

/** The metadata attribute input */
export type MetadataAttributeInput = {
  /** The display type */
  displayType?: InputMaybe<PublicationMetadataDisplayTypes>;
  /** The trait type - can be anything its the name it will render so include spaces */
  traitType: Scalars['String'];
  /** The value */
  value: Scalars['String'];
};

export type ModuleFeeAmountParams = {
  /** The currency address */
  currency: Scalars['ContractAddress'];
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String'];
};

export type ModuleFeeParams = {
  /** The fee amount */
  amount: ModuleFeeAmountParams;
  /** The fee recipient */
  recipient: Scalars['EthereumAddress'];
  /** The referral fee */
  referralFee: Scalars['Float'];
};

/** The momka validator error */
export enum MomokaValidatorError {
  BlockCantBeReadFromNode = 'BLOCK_CANT_BE_READ_FROM_NODE',
  BlockTooFar = 'BLOCK_TOO_FAR',
  CanNotConnectToBundlr = 'CAN_NOT_CONNECT_TO_BUNDLR',
  ChainSignatureAlreadyUsed = 'CHAIN_SIGNATURE_ALREADY_USED',
  DataCantBeReadFromNode = 'DATA_CANT_BE_READ_FROM_NODE',
  EventMismatch = 'EVENT_MISMATCH',
  GeneratedPublicationIdMismatch = 'GENERATED_PUBLICATION_ID_MISMATCH',
  InvalidEventTimestamp = 'INVALID_EVENT_TIMESTAMP',
  InvalidFormattedTypedData = 'INVALID_FORMATTED_TYPED_DATA',
  InvalidPointerSetNotNeeded = 'INVALID_POINTER_SET_NOT_NEEDED',
  InvalidSignatureSubmitter = 'INVALID_SIGNATURE_SUBMITTER',
  InvalidTxId = 'INVALID_TX_ID',
  InvalidTypedDataDeadlineTimestamp = 'INVALID_TYPED_DATA_DEADLINE_TIMESTAMP',
  NotClosestBlock = 'NOT_CLOSEST_BLOCK',
  NoSignatureSubmitter = 'NO_SIGNATURE_SUBMITTER',
  PointerFailedVerification = 'POINTER_FAILED_VERIFICATION',
  PotentialReorg = 'POTENTIAL_REORG',
  PublicationNonceInvalid = 'PUBLICATION_NONCE_INVALID',
  PublicationNoneDa = 'PUBLICATION_NONE_DA',
  PublicationNoPointer = 'PUBLICATION_NO_POINTER',
  PublicationSignerNotAllowed = 'PUBLICATION_SIGNER_NOT_ALLOWED',
  SimulationFailed = 'SIMULATION_FAILED',
  SimulationNodeCouldNotRun = 'SIMULATION_NODE_COULD_NOT_RUN',
  TimestampProofInvalidDaId = 'TIMESTAMP_PROOF_INVALID_DA_ID',
  TimestampProofInvalidSignature = 'TIMESTAMP_PROOF_INVALID_SIGNATURE',
  TimestampProofInvalidType = 'TIMESTAMP_PROOF_INVALID_TYPE',
  TimestampProofNotSubmitter = 'TIMESTAMP_PROOF_NOT_SUBMITTER',
  Unknown = 'UNKNOWN',
}

export type MultirecipientFeeCollectModuleParams = {
  /** The collecting cost associated with this publication. 0 for free collect. */
  amount: ModuleFeeAmountParams;
  /** The maximum number of collects for this publication. Omit for no limit. */
  collectLimit?: InputMaybe<Scalars['String']>;
  /** The end timestamp after which collecting is impossible. Omit for no expiry. */
  endTimestamp?: InputMaybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean'];
  /** Recipient of collect fees. */
  recipients: Array<RecipientDataInput>;
  /** The referral fee associated with this publication. */
  referralFee?: InputMaybe<Scalars['Float']>;
};

export type MutualFollowersProfilesQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** The profile id your viewing */
  viewingProfileId: Scalars['ProfileId'];
  /** The profile id you want the result to come back as your viewing from */
  yourProfileId: Scalars['ProfileId'];
};

export type NftData = {
  /** Id of the nft ownership challenge */
  id: Scalars['NftOwnershipId'];
  /** The signature */
  signature: Scalars['Signature'];
};

/** NFT search query */
export type NftSearchRequest = {
  /** Chain IDs to search. Supports Ethereum and Polygon. If omitted, it will search in both chains */
  chainIds?: InputMaybe<Array<Scalars['ChainId']>>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** Exclude follower NFTs from the search */
  excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** Ethereum address of the owner. If unknown you can also search by profile ID */
  ownerAddress?: InputMaybe<Scalars['EthereumAddress']>;
  /** Profile ID of the owner */
  profileId?: InputMaybe<Scalars['ProfileId']>;
  /** Search query. Has to be part of a collection name */
  query: Scalars['String'];
};

export type NfTsRequest = {
  /** Chain Ids */
  chainIds?: InputMaybe<Array<Scalars['ChainId']>>;
  /** Filter by contract address */
  contractAddress?: InputMaybe<Scalars['ContractAddress']>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** Exclude filtered collection addresses from the search. Cannot be used together ith `includeCollections` */
  excludeCollections?: InputMaybe<Array<NftCollectionInput>>;
  /** Exclude follower NFTs from the search. */
  excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  /** Include only filtered collection addresses in the search. Overrides `contractAddress` */
  includeCollections?: InputMaybe<Array<NftCollectionInput>>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** Filter by owner address */
  ownerAddress: Scalars['EthereumAddress'];
};

export type Nfi = {
  c: Scalars['ContractAddress'];
  i: Scalars['ChainId'];
};

/** NFT collection filtering input */
export type NftCollectionInput = {
  /** The chain id that the collection exists in */
  chainId: Scalars['ChainId'];
  /** Filter by NFT collection contract address */
  contractAddress: Scalars['ContractAddress'];
};

/** The NFT gallery input */
export type NftGalleriesRequest = {
  /** The profile id */
  profileId: Scalars['ProfileId'];
};

/** The input for creating a new NFT gallery */
export type NftGalleryCreateRequest = {
  /** The NFTs in the gallery */
  items: Array<NftInput>;
  /** The name of the NFT gallery */
  name: Scalars['NftGalleryName'];
  /** The owner profile id */
  profileId: Scalars['ProfileId'];
};

/** The input for deleting gallery */
export type NftGalleryDeleteRequest = {
  /** The NFT gallery id */
  galleryId: Scalars['NftGalleryId'];
  /** The profile id of the gallery owner */
  profileId: Scalars['ProfileId'];
};

/** The input for updating NFT gallery name */
export type NftGalleryUpdateInfoRequest = {
  /** The NFT gallery id */
  galleryId: Scalars['NftGalleryId'];
  /** The name of the NFT gallery */
  name: Scalars['NftGalleryName'];
  /** The profile id of the gallery owner */
  profileId: Scalars['ProfileId'];
};

/** The input for reordering gallery items */
export type NftGalleryUpdateItemOrderRequest = {
  /** The NFT gallery id */
  galleryId: Scalars['NftGalleryId'];
  /** The profile id of the gallery owner */
  profileId: Scalars['ProfileId'];
  /** The order of the NFTs in the gallery */
  updates: Array<NftUpdateItemOrder>;
};

/** The input for adding/removing gallery items */
export type NftGalleryUpdateItemsRequest = {
  /** The NFT gallery id */
  galleryId: Scalars['NftGalleryId'];
  /** The profile id of the gallery owner */
  profileId: Scalars['ProfileId'];
  /** The contents of the NFT gallery */
  toAdd?: InputMaybe<Array<NftInput>>;
  /** The contents of the NFT gallery */
  toRemove?: InputMaybe<Array<NftInput>>;
};

/** The NFT input for gallery */
export type NftInput = {
  /** The chain ID of the NFT */
  chainId: Scalars['ChainId'];
  /** The contract address of the NFT */
  contractAddress: Scalars['ContractAddress'];
  /** The token ID of the NFT */
  tokenId: Scalars['String'];
};

export type NftOwnershipChallenge = {
  /** Chain Id */
  chainId: Scalars['ChainId'];
  /** ContractAddress for nft */
  contractAddress: Scalars['ContractAddress'];
  /** Token id for NFT */
  tokenId: Scalars['String'];
};

export type NftOwnershipChallengeRequest = {
  /** The wallet address which owns the NFT */
  ethereumAddress: Scalars['EthereumAddress'];
  nfts: Array<NftOwnershipChallenge>;
};

export type NftOwnershipInput = {
  /** The NFT chain id */
  chainID: Scalars['ChainId'];
  /** The NFT collection's ethereum address */
  contractAddress: Scalars['ContractAddress'];
  /** The unlocker contract type */
  contractType: ContractType;
  /** The optional token ID(s) to check for ownership */
  tokenIds?: InputMaybe<Array<Scalars['TokenId']>>;
};

/** The input for updating the order of a NFT gallery item */
export type NftUpdateItemOrder = {
  /** The chain ID of the NFT */
  chainId: Scalars['ChainId'];
  /** The contract address of the NFT */
  contractAddress: Scalars['ContractAddress'];
  /** The new order of the NFT in the gallery */
  newOrder: Scalars['Int'];
  /** The token ID of the NFT */
  tokenId: Scalars['String'];
};

export type NniRequest = {
  n: Array<Nfi>;
  secret: Scalars['String'];
};

export type NnvRequest = {
  n: Array<Nfi>;
  secret: Scalars['String'];
};

export type NotificationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  highSignalFilter?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** The notification types */
  notificationTypes?: InputMaybe<Array<NotificationTypes>>;
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
};

/** The notification filter types */
export enum NotificationTypes {
  CollectedComment = 'COLLECTED_COMMENT',
  CollectedPost = 'COLLECTED_POST',
  CommentedComment = 'COMMENTED_COMMENT',
  CommentedPost = 'COMMENTED_POST',
  Followed = 'FOLLOWED',
  MentionComment = 'MENTION_COMMENT',
  MentionPost = 'MENTION_POST',
  MirroredComment = 'MIRRORED_COMMENT',
  MirroredPost = 'MIRRORED_POST',
  ReactionComment = 'REACTION_COMMENT',
  ReactionPost = 'REACTION_POST',
}

export type OrConditionInput = {
  /** The list of conditions to apply OR to. You can only use nested boolean conditions at the root level. */
  criteria: Array<AccessConditionInput>;
};

export type PendingApprovalFollowsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
};

export type PrfRequest = {
  dd: Scalars['Boolean'];
  hhh: Scalars['String'];
  secret: Scalars['String'];
  ss: Scalars['Boolean'];
};

export type PriRequest = {
  hhh: Scalars['String'];
  secret: Scalars['String'];
};

export type ProfileFollowModuleBeenRedeemedRequest = {
  followProfileId: Scalars['ProfileId'];
  redeemingProfileId: Scalars['ProfileId'];
};

export type ProfileFollowModuleRedeemParams = {
  /** The profile id to use to follow this profile */
  profileId: Scalars['ProfileId'];
};

export type ProfileFollowRevenueQueryRequest = {
  /** The profile id */
  profileId: Scalars['ProfileId'];
};

export type ProfileGuardianRequest = {
  profileId: Scalars['ProfileId'];
};

export type ProfileOnChainIdentityRequest = {
  profileIds: Array<Scalars['ProfileId']>;
};

/** Condition that signifies if address has access to profile */
export type ProfileOwnershipInput = {
  /** The profile id */
  profileId: Scalars['ProfileId'];
};

export type ProfilePublicationRevenueQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
  /** The revenue types */
  types?: InputMaybe<Array<PublicationTypes>>;
};

export type ProfilePublicationsForSaleRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  /** Profile id */
  profileId: Scalars['ProfileId'];
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
};

export type ProfileQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The handles for the profile */
  handles?: InputMaybe<Array<Scalars['Handle']>>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** The ethereum addresses */
  ownedBy?: InputMaybe<Array<Scalars['EthereumAddress']>>;
  /** The profile ids */
  profileIds?: InputMaybe<Array<Scalars['ProfileId']>>;
  /** The mirrored publication id */
  whoMirroredPublicationId?: InputMaybe<Scalars['InternalPublicationId']>;
};

/** profile sort criteria */
export enum ProfileSortCriteria {
  CreatedOn = 'CREATED_ON',
  LatestCreated = 'LATEST_CREATED',
  MostCollects = 'MOST_COLLECTS',
  MostComments = 'MOST_COMMENTS',
  MostFollowers = 'MOST_FOLLOWERS',
  MostMirrors = 'MOST_MIRRORS',
  MostPosts = 'MOST_POSTS',
  MostPublication = 'MOST_PUBLICATION',
}

export type ProxyActionRequest = {
  collect?: InputMaybe<CollectProxyAction>;
  follow?: InputMaybe<FollowProxyAction>;
};

/** The proxy action status */
export enum ProxyActionStatusTypes {
  Complete = 'COMPLETE',
  Minting = 'MINTING',
  Transferring = 'TRANSFERRING',
}

export type PublicMediaRequest = {
  /** The alt tags for accessibility */
  altTag?: InputMaybe<Scalars['String']>;
  /** The cover for any video or audio you attached */
  cover?: InputMaybe<Scalars['Url']>;
  /** Pre calculated cid of the file to push */
  itemCid: Scalars['IpfsCid'];
  /** This is the mime type of media */
  type?: InputMaybe<Scalars['MimeType']>;
};

/** The publication content warning */
export enum PublicationContentWarning {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER',
}

export type PublicationForYouRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for: Scalars['ProfileId'];
  limit?: InputMaybe<Scalars['LimitScalar']>;
};

/** The publication main focus */
export enum PublicationMainFocus {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK',
  TextOnly = 'TEXT_ONLY',
  Video = 'VIDEO',
}

/** The source of the media */
export enum PublicationMediaSource {
  Lens = 'LENS',
}

/** Publication metadata content warning filters */
export type PublicationMetadataContentWarningFilter = {
  /** By default all content warnings will be hidden you can include them in your query by adding them to this array. */
  includeOneOf?: InputMaybe<Array<PublicationContentWarning>>;
};

/** The publication metadata display types */
export enum PublicationMetadataDisplayTypes {
  Date = 'date',
  Number = 'number',
  String = 'string',
}

/** Publication metadata filters */
export type PublicationMetadataFilters = {
  contentWarning?: InputMaybe<PublicationMetadataContentWarningFilter>;
  /** IOS 639-1 language code aka en or it and ISO 3166-1 alpha-2 region code aka US or IT aka en-US or it-IT. You can just filter on language if you wish. */
  locale?: InputMaybe<Scalars['Locale']>;
  mainContentFocus?: InputMaybe<Array<PublicationMainFocus>>;
  tags?: InputMaybe<PublicationMetadataTagsFilter>;
};

/** The metadata attribute input */
export type PublicationMetadataMediaInput = {
  /** The alt tags for accessibility */
  altTag?: InputMaybe<Scalars['String']>;
  /** The cover for any video or audio you attached */
  cover?: InputMaybe<Scalars['Url']>;
  item: Scalars['Url'];
  source?: InputMaybe<PublicationMediaSource>;
  /** This is the mime type of media */
  type?: InputMaybe<Scalars['MimeType']>;
};

/** publication metadata status type */
export enum PublicationMetadataStatusType {
  MetadataValidationFailed = 'METADATA_VALIDATION_FAILED',
  NotFound = 'NOT_FOUND',
  Pending = 'PENDING',
  Success = 'SUCCESS',
}

/** Publication metadata tag filter */
export type PublicationMetadataTagsFilter = {
  /** Needs to match all */
  all?: InputMaybe<Array<Scalars['String']>>;
  /** Needs to only match one of */
  oneOf?: InputMaybe<Array<Scalars['String']>>;
};

export type PublicationMetadataV1Input = {
  /**
   * A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
   *       and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
   *       Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
   *       WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
   */
  animation_url?: InputMaybe<Scalars['Url']>;
  /**  This is the appId the content belongs to */
  appId?: InputMaybe<Scalars['Sources']>;
  /**  These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item. */
  attributes: Array<MetadataAttributeInput>;
  /** The content of a publication. If this is blank `media` must be defined or its out of spec */
  content?: InputMaybe<Scalars['Markdown']>;
  /** A human-readable description of the item. */
  description?: InputMaybe<Scalars['Markdown']>;
  /**
   * This is the URL that will appear below the asset's image on OpenSea and others etc
   *       and will allow users to leave OpenSea and view the item on the site.
   */
  external_url?: InputMaybe<Scalars['Url']>;
  /** legacy to support OpenSea will store any NFT image here. */
  image?: InputMaybe<Scalars['Url']>;
  /** This is the mime type of the image. This is used if your uploading more advanced cover images as sometimes ipfs does not emit the content header so this solves that */
  imageMimeType?: InputMaybe<Scalars['MimeType']>;
  /**  This is lens supported attached media items to the publication */
  media?: InputMaybe<Array<PublicationMetadataMediaInput>>;
  /** The metadata id can be anything but if your uploading to ipfs you will want it to be random.. using uuid could be an option! */
  metadata_id: Scalars['String'];
  /** Name of the item. */
  name: Scalars['String'];
  /** Signed metadata to validate the owner */
  signatureContext?: InputMaybe<PublicationSignatureContextInput>;
  /** The metadata version. (1.0.0 | 2.0.0) */
  version: Scalars['String'];
};

export type PublicationMetadataV2Input = {
  /**
   * A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
   *       and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
   *       Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
   *       WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
   */
  animation_url?: InputMaybe<Scalars['Url']>;
  /**  This is the appId the content belongs to */
  appId?: InputMaybe<Scalars['Sources']>;
  /**  These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item. */
  attributes: Array<MetadataAttributeInput>;
  /** The content of a publication. If this is blank `media` must be defined or its out of spec */
  content?: InputMaybe<Scalars['Markdown']>;
  /** Ability to add a content warning */
  contentWarning?: InputMaybe<PublicationContentWarning>;
  /** A human-readable description of the item. */
  description?: InputMaybe<Scalars['Markdown']>;
  /**
   * This is the URL that will appear below the asset's image on OpenSea and others etc
   *       and will allow users to leave OpenSea and view the item on the site.
   */
  external_url?: InputMaybe<Scalars['Url']>;
  /** legacy to support OpenSea will store any NFT image here. */
  image?: InputMaybe<Scalars['Url']>;
  /** This is the mime type of the image. This is used if your uploading more advanced cover images as sometimes ipfs does not emit the content header so this solves that */
  imageMimeType?: InputMaybe<Scalars['MimeType']>;
  /** IOS 639-1 language code aka en or it and ISO 3166-1 alpha-2 region code aka US or IT aka en-US or it-IT */
  locale: Scalars['Locale'];
  /** Main content focus that for this publication */
  mainContentFocus: PublicationMainFocus;
  /**  This is lens supported attached media items to the publication */
  media?: InputMaybe<Array<PublicationMetadataMediaInput>>;
  /** The metadata id can be anything but if your uploading to ipfs you will want it to be random.. using uuid could be an option! */
  metadata_id: Scalars['String'];
  /** Name of the item. */
  name: Scalars['String'];
  /** Signed metadata to validate the owner */
  signatureContext?: InputMaybe<PublicationSignatureContextInput>;
  /** Ability to tag your publication */
  tags?: InputMaybe<Array<Scalars['String']>>;
  /** The metadata version. (1.0.0 | 2.0.0) */
  version: Scalars['String'];
};

export type PublicationProfileBookmarkRequest = {
  /** Profile id to perform the action */
  profileId: Scalars['ProfileId'];
  /** The internal publication id */
  publicationId: Scalars['InternalPublicationId'];
};

export type PublicationProfileNotInterestedRequest = {
  /** Profile id to perform the action */
  profileId: Scalars['ProfileId'];
  /** The internal publication id */
  publicationId: Scalars['InternalPublicationId'];
};

export type PublicationQueryRequest = {
  /** The publication id */
  publicationId?: InputMaybe<Scalars['InternalPublicationId']>;
  /** The tx hash */
  txHash?: InputMaybe<Scalars['TxHash']>;
};

/** Publication reporting fraud subreason */
export enum PublicationReportingFraudSubreason {
  Impersonation = 'IMPERSONATION',
  Scam = 'SCAM',
}

/** Publication reporting illegal subreason */
export enum PublicationReportingIllegalSubreason {
  AnimalAbuse = 'ANIMAL_ABUSE',
  DirectThreat = 'DIRECT_THREAT',
  HumanAbuse = 'HUMAN_ABUSE',
  ThreatIndividual = 'THREAT_INDIVIDUAL',
  Violence = 'VIOLENCE',
}

/** Publication reporting reason */
export enum PublicationReportingReason {
  Fraud = 'FRAUD',
  Illegal = 'ILLEGAL',
  Sensitive = 'SENSITIVE',
  Spam = 'SPAM',
}

/** Publication reporting sensitive subreason */
export enum PublicationReportingSensitiveSubreason {
  Nsfw = 'NSFW',
  Offensive = 'OFFENSIVE',
}

/** Publication reporting spam subreason */
export enum PublicationReportingSpamSubreason {
  FakeEngagement = 'FAKE_ENGAGEMENT',
  LowSignal = 'LOW_SIGNAL',
  ManipulationAlgo = 'MANIPULATION_ALGO',
  Misleading = 'MISLEADING',
  MisuseHashtags = 'MISUSE_HASHTAGS',
  Repetitive = 'REPETITIVE',
  SomethingElse = 'SOMETHING_ELSE',
  Unrelated = 'UNRELATED',
}

export type PublicationRevenueQueryRequest = {
  /** The publication id */
  publicationId: Scalars['InternalPublicationId'];
};

export type PublicationSignatureContextInput = {
  signature: Scalars['String'];
};

/** Publication sort criteria */
export enum PublicationSortCriteria {
  CuratedProfiles = 'CURATED_PROFILES',
  Latest = 'LATEST',
  TopCollected = 'TOP_COLLECTED',
  TopCommented = 'TOP_COMMENTED',
  TopMirrored = 'TOP_MIRRORED',
}

/** The publication types */
export enum PublicationTypes {
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
}

export type PublicationsProfileBookmarkedQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  /** Profile id */
  profileId: Scalars['ProfileId'];
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
};

export type PublicationsQueryRequest = {
  /** The ethereum address */
  collectedBy?: InputMaybe<Scalars['EthereumAddress']>;
  /** The publication id you wish to get comments for */
  commentsOf?: InputMaybe<Scalars['InternalPublicationId']>;
  /** The comment ordering type - only used when you use commentsOf */
  commentsOfOrdering?: InputMaybe<CommentOrderingTypes>;
  /** The comment ranking filter, you can use  - only used when you use commentsOf + commentsOfOrdering=ranking */
  commentsRankingFilter?: InputMaybe<CommentRankingFilter>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  /** Profile id */
  profileId?: InputMaybe<Scalars['ProfileId']>;
  /** Profile ids */
  profileIds?: InputMaybe<Array<Scalars['ProfileId']>>;
  /** The publication id */
  publicationIds?: InputMaybe<Array<Scalars['InternalPublicationId']>>;
  /** The publication types you want to query */
  publicationTypes?: InputMaybe<Array<PublicationTypes>>;
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
};

export type ReactionFieldResolverRequest = {
  /** Profile id */
  profileId?: InputMaybe<Scalars['ProfileId']>;
};

export type ReactionRequest = {
  /** Profile id to perform the action */
  profileId: Scalars['ProfileId'];
  /** The internal publication id */
  publicationId: Scalars['InternalPublicationId'];
  /** The reaction */
  reaction: ReactionTypes;
};

/** Reaction types */
export enum ReactionTypes {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE',
}

export type RecipientDataInput = {
  /** Recipient of collect fees. */
  recipient: Scalars['EthereumAddress'];
  /** Split %, should be between 0.01 and 100. Up to 2 decimal points supported. All % should add up to 100 */
  split: Scalars['Float'];
};

export type RecommendedProfileOptions = {
  /** If you wish to turn ML off */
  disableML?: InputMaybe<Scalars['Boolean']>;
  /** The more advanced who to follow you should pass this in */
  profileId?: InputMaybe<Scalars['ProfileId']>;
  /** If you wish to shuffle the results */
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type ReferenceModuleParams = {
  /** The degrees of separation reference module */
  degreesOfSeparationReferenceModule?: InputMaybe<DegreesOfSeparationReferenceModuleParams>;
  /** The follower only reference module */
  followerOnlyReferenceModule?: InputMaybe<Scalars['Boolean']>;
  /** A unknown reference module */
  unknownReferenceModule?: InputMaybe<UnknownReferenceModuleParams>;
};

/** The reference module types */
export enum ReferenceModules {
  DegreesOfSeparationReferenceModule = 'DegreesOfSeparationReferenceModule',
  FollowerOnlyReferenceModule = 'FollowerOnlyReferenceModule',
  UnknownReferenceModule = 'UnknownReferenceModule',
}

/** The refresh request */
export type RefreshRequest = {
  /** The refresh token */
  refreshToken: Scalars['Jwt'];
};

export type RelRequest = {
  ethereumAddress: Scalars['EthereumAddress'];
  secret: Scalars['String'];
};

/** Relay error reason */
export enum RelayErrorReasons {
  Expired = 'EXPIRED',
  HandleTaken = 'HANDLE_TAKEN',
  NotAllowed = 'NOT_ALLOWED',
  Rejected = 'REJECTED',
  WrongWalletSigned = 'WRONG_WALLET_SIGNED',
}

/** The relay role key */
export enum RelayRoleKey {
  CreateProfile = 'CREATE_PROFILE',
  Dispatcher_1 = 'DISPATCHER_1',
  Dispatcher_2 = 'DISPATCHER_2',
  Dispatcher_3 = 'DISPATCHER_3',
  Dispatcher_4 = 'DISPATCHER_4',
  Dispatcher_5 = 'DISPATCHER_5',
  Dispatcher_6 = 'DISPATCHER_6',
  Dispatcher_7 = 'DISPATCHER_7',
  Dispatcher_8 = 'DISPATCHER_8',
  Dispatcher_9 = 'DISPATCHER_9',
  Dispatcher_10 = 'DISPATCHER_10',
  ProxyActionCollect_1 = 'PROXY_ACTION_COLLECT_1',
  ProxyActionCollect_2 = 'PROXY_ACTION_COLLECT_2',
  ProxyActionCollect_3 = 'PROXY_ACTION_COLLECT_3',
  ProxyActionCollect_4 = 'PROXY_ACTION_COLLECT_4',
  ProxyActionCollect_5 = 'PROXY_ACTION_COLLECT_5',
  ProxyActionCollect_6 = 'PROXY_ACTION_COLLECT_6',
  ProxyActionFollow_1 = 'PROXY_ACTION_FOLLOW_1',
  ProxyActionFollow_2 = 'PROXY_ACTION_FOLLOW_2',
  ProxyActionFollow_3 = 'PROXY_ACTION_FOLLOW_3',
  ProxyActionFollow_4 = 'PROXY_ACTION_FOLLOW_4',
  ProxyActionFollow_5 = 'PROXY_ACTION_FOLLOW_5',
  ProxyActionFollow_6 = 'PROXY_ACTION_FOLLOW_6',
  ProxyActionFollow_7 = 'PROXY_ACTION_FOLLOW_7',
  ProxyActionFollow_8 = 'PROXY_ACTION_FOLLOW_8',
  ProxyActionFollow_9 = 'PROXY_ACTION_FOLLOW_9',
  ProxyActionFollow_10 = 'PROXY_ACTION_FOLLOW_10',
  WithSig_1 = 'WITH_SIG_1',
  WithSig_2 = 'WITH_SIG_2',
  WithSig_3 = 'WITH_SIG_3',
  ZkRelayer_1 = 'ZK_RELAYER_1',
}

/** The request object to remove interests from a profile */
export type RemoveProfileInterestsRequest = {
  /** The profile interest to add */
  interests: Array<Scalars['ProfileInterest']>;
  /** The profileId to add interests to */
  profileId: Scalars['ProfileId'];
};

export type ReportPublicationRequest = {
  additionalComments?: InputMaybe<Scalars['String']>;
  publicationId: Scalars['InternalPublicationId'];
  reason: ReportingReasonInputParams;
};

export type ReportingReasonInputParams = {
  fraudReason?: InputMaybe<FraudReasonInputParams>;
  illegalReason?: InputMaybe<IllegalReasonInputParams>;
  sensitiveReason?: InputMaybe<SensitiveReasonInputParams>;
  spamReason?: InputMaybe<SpamReasonInputParams>;
};

/** The gated publication access criteria scalar operators */
export enum ScalarOperator {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  NotEqual = 'NOT_EQUAL',
}

export type SearchQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** The search term */
  query: Scalars['Search'];
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
  type: SearchRequestTypes;
};

/** Search request types */
export enum SearchRequestTypes {
  Profile = 'PROFILE',
  Publication = 'PUBLICATION',
}

export type SensitiveReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSensitiveSubreason;
};

export type SetDispatcherRequest = {
  /** The dispatcher address - they can post, comment, mirror, set follow module, change your profile picture on your behalf, if left as none it will use the built in dispatcher address. */
  dispatcher?: InputMaybe<Scalars['EthereumAddress']>;
  /** If you want to enable or disable it */
  enable?: InputMaybe<Scalars['Boolean']>;
  /** The profile id */
  profileId: Scalars['ProfileId'];
};

/** The signed auth challenge */
export type SignedAuthChallenge = {
  /** The ethereum address you signed the signature with */
  address: Scalars['EthereumAddress'];
  /** The signature */
  signature: Scalars['Signature'];
};

export type SimpleCollectModuleParams = {
  /** The collect module limit */
  collectLimit?: InputMaybe<Scalars['String']>;
  /** The timestamp that this collect module will expire */
  endTimestamp?: InputMaybe<Scalars['DateTime']>;
  /** The collect module fee params */
  fee?: InputMaybe<ModuleFeeParams>;
  /** Collectible by followers only */
  followerOnly: Scalars['Boolean'];
};

export type SingleProfileQueryRequest = {
  /** The handle for the profile */
  handle?: InputMaybe<Scalars['Handle']>;
  /** The profile id */
  profileId?: InputMaybe<Scalars['ProfileId']>;
};

export type SpamReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSpamSubreason;
};

/** The publications tags sort criteria */
export enum TagSortCriteria {
  Alphabetical = 'ALPHABETICAL',
  MostPopular = 'MOST_POPULAR',
}

export type TimedFeeCollectModuleParams = {
  /** The collect module amount info */
  amount: ModuleFeeAmountParams;
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
};

/** Transaction error reason */
export enum TransactionErrorReasons {
  Reverted = 'REVERTED',
}

export type TypedDataOptions = {
  /** If you wish to override the nonce for the sig if you want to do some clever stuff in the client */
  overrideSigNonce: Scalars['Nonce'];
};

export type UnfollowRequest = {
  profile: Scalars['ProfileId'];
};

export type UnknownCollectModuleParams = {
  contractAddress: Scalars['ContractAddress'];
  /** The encoded data to submit with the module */
  data: Scalars['BlockchainData'];
};

export type UnknownFollowModuleParams = {
  contractAddress: Scalars['ContractAddress'];
  /** The encoded data to submit with the module */
  data: Scalars['BlockchainData'];
};

export type UnknownFollowModuleRedeemParams = {
  /** The encoded data to submit with the module */
  data: Scalars['BlockchainData'];
};

export type UnknownReferenceModuleParams = {
  contractAddress: Scalars['ContractAddress'];
  /** The encoded data to submit with the module */
  data: Scalars['BlockchainData'];
};

export type UpdateProfileImageRequest = {
  /** The nft data */
  nftData?: InputMaybe<NftData>;
  profileId: Scalars['ProfileId'];
  /** The url to the image if offline */
  url?: InputMaybe<Scalars['Url']>;
};

export type ValidatePublicationMetadataRequest = {
  metadatav1?: InputMaybe<PublicationMetadataV1Input>;
  metadatav2?: InputMaybe<PublicationMetadataV2Input>;
};

/** The access request */
export type VerifyRequest = {
  /** The access token */
  accessToken: Scalars['Jwt'];
};

export type WhoCollectedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** Internal publication id */
  publicationId: Scalars['InternalPublicationId'];
};

export type WhoReactedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** Internal publication id */
  publicationId: Scalars['InternalPublicationId'];
};

/** The worldcoin signal type */
export enum WorldcoinPhoneVerifyType {
  Orb = 'ORB',
  Phone = 'PHONE',
}

export type WorldcoinPhoneVerifyWebhookRequest = {
  nullifierHash: Scalars['String'];
  signal: Scalars['EthereumAddress'];
  signalType: WorldcoinPhoneVerifyType;
};

export type AuthChallengeVariables = Exact<{
  address: Scalars['EthereumAddress'];
}>;

export type AuthChallengeData = { result: { text: string } };

export type AuthAuthenticateVariables = Exact<{
  address: Scalars['EthereumAddress'];
  signature: Scalars['Signature'];
}>;

export type AuthAuthenticateData = { result: { accessToken: string; refreshToken: string } };

export type AuthRefreshVariables = Exact<{
  refreshToken: Scalars['Jwt'];
}>;

export type AuthRefreshData = { result: { accessToken: string; refreshToken: string } };

export type CreateCollectTypedDataVariables = Exact<{
  request: CreateCollectRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateCollectTypedDataData = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { CollectWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomain;
      message: {
        nonce: number;
        deadline: unknown;
        profileId: ProfileId;
        pubId: string;
        data: string;
      };
    };
  };
};

export type CreateCommentEip712TypedData = {
  types: { CommentWithSig: Array<{ name: string; type: string }> };
  domain: Eip712TypedDataDomain;
  message: {
    nonce: number;
    deadline: unknown;
    profileId: ProfileId;
    contentURI: Url;
    profileIdPointed: ProfileId;
    pubIdPointed: string;
    collectModule: string;
    collectModuleInitData: string;
    referenceModuleData: string;
    referenceModule: string;
    referenceModuleInitData: string;
  };
};

export type CreateCommentTypedDataVariables = Exact<{
  request: CreatePublicCommentRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateCommentTypedDataData = {
  result: { id: string; expiresAt: string; typedData: CreateCommentEip712TypedData };
};

export type CreateCommentViaDispatcherVariables = Exact<{
  request: CreatePublicCommentRequest;
}>;

export type CreateCommentViaDispatcherData = {
  result: BroadcastOnChainResult_RelayError_ | BroadcastOnChainResult_RelayerResult_;
};

export type CreateDataAvailabilityCommentTypedDataVariables = Exact<{
  request: CreateDataAvailabilityCommentRequest;
}>;

export type CreateDataAvailabilityCommentTypedDataData = {
  result: { id: string; expiresAt: string; typedData: CreateCommentEip712TypedData };
};

export type CreateDataAvailabilityCommentViaDispatcherVariables = Exact<{
  request: CreateDataAvailabilityCommentRequest;
}>;

export type CreateDataAvailabilityCommentViaDispatcherData = {
  result:
    | BroadcastOffChainResult_CreateDataAvailabilityPublicationResult_
    | BroadcastOffChainResult_RelayError_;
};

export type Erc20Fields = {
  __typename: 'Erc20';
  name: string;
  symbol: string;
  decimals: number;
  address: string;
};

export type Erc20AmountFields = { __typename: 'Erc20Amount'; value: string; asset: Erc20Fields };

export type ModuleFeeAmount = { __typename: 'ModuleFeeAmount'; value: string; asset: Erc20Fields };

export type AaveFeeCollectModuleSettings = {
  __typename: 'AaveFeeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  recipient: EthereumAddress;
  referralFee: number;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  amount: ModuleFeeAmount;
};

export type Erc4626FeeCollectModuleSettings = {
  __typename: 'ERC4626FeeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  recipient: EthereumAddress;
  referralFee: number;
  vault: string;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  amount: ModuleFeeAmount;
};

export type MultirecipientFeeCollectModuleSettings = {
  __typename: 'MultirecipientFeeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  referralFee: number;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  amount: ModuleFeeAmount;
  recipients: Array<{ recipient: EthereumAddress; split: number }>;
};

export type UnknownCollectModuleSettings = {
  __typename: 'UnknownCollectModuleSettings';
  contractAddress: string;
  collectModuleReturnData: string;
};

export type FreeCollectModuleSettings = {
  __typename: 'FreeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
};

export type FeeCollectModuleSettings = {
  __typename: 'FeeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  recipient: EthereumAddress;
  referralFee: number;
  amount: ModuleFeeAmount;
};

export type LimitedFeeCollectModuleSettings = {
  __typename: 'LimitedFeeCollectModuleSettings';
  collectLimit: string;
  contractAddress: string;
  followerOnly: boolean;
  recipient: EthereumAddress;
  referralFee: number;
  amount: ModuleFeeAmount;
};

export type LimitedTimedFeeCollectModuleSettings = {
  __typename: 'LimitedTimedFeeCollectModuleSettings';
  collectLimit: string;
  contractAddress: string;
  followerOnly: boolean;
  endTimestamp: string;
  recipient: EthereumAddress;
  referralFee: number;
  amount: ModuleFeeAmount;
};

export type RevertCollectModuleSettings = {
  __typename: 'RevertCollectModuleSettings';
  contractAddress: string;
};

export type TimedFeeCollectModuleSettings = {
  __typename: 'TimedFeeCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  endTimestamp: string;
  recipient: EthereumAddress;
  referralFee: number;
  amount: ModuleFeeAmount;
};

export type SimpleCollectModuleSettings = {
  __typename: 'SimpleCollectModuleSettings';
  contractAddress: string;
  followerOnly: boolean;
  collectLimitOptional: string | null;
  endTimestampOptional: string | null;
  feeOptional: { referralFee: number; recipient: EthereumAddress; amount: ModuleFeeAmount } | null;
};

export type Wallet = {
  __typename: 'Wallet';
  address: EthereumAddress;
  defaultProfile: Profile | null;
};

export type Media = {
  __typename: 'Media';
  altTag: string | null;
  cover: Url | null;
  mimeType: string | null;
  url: Url;
};

export type PublicationMediaSet = {
  __typename: 'MediaSet';
  original: Media;
  optimized: Media | null;
  small: Media | null;
  medium: Media | null;
};

export type ProfilePictureSet = {
  __typename: 'MediaSet';
  original: Media;
  optimized: Media | null;
  thumbnail: Media | null;
};

export type ProfileCoverSet = { __typename: 'MediaSet'; original: Media; optimized: Media | null };

export type MetadataOutput = {
  __typename: 'MetadataOutput';
  animatedUrl: Url | null;
  content: string | null;
  contentWarning: PublicationContentWarning | null;
  description: string | null;
  image: Url | null;
  locale: string | null;
  mainContentFocus: PublicationMainFocus;
  name: string | null;
  tags: Array<string>;
  media: Array<PublicationMediaSet>;
  attributes: Array<MetadataAttributeOutput>;
  encryptionParams: EncryptionParamsOutput | null;
};

export type MetadataAttributeOutput = {
  __typename: 'MetadataAttributeOutput';
  traitType: string | null;
  value: string | null;
};

export type PublicationStats = {
  __typename: 'PublicationStats';
  totalAmountOfMirrors: number;
  totalUpvotes: number;
  totalDownvotes: number;
  totalAmountOfCollects: number;
  totalAmountOfComments: number;
  commentsCount: number;
};

export type MirrorBase = {
  __typename: 'Mirror';
  id: PublicationId;
  createdAt: string;
  hidden: boolean;
  profile: Profile;
};

export type Mirror = { __typename: 'Mirror'; mirrorOf: Comment | Post } & MirrorBase;

export type FollowOnlyReferenceModuleSettings = {
  __typename: 'FollowOnlyReferenceModuleSettings';
  contractAddress: string;
};

export type DegreesOfSeparationReferenceModuleSettings = {
  __typename: 'DegreesOfSeparationReferenceModuleSettings';
  contractAddress: string;
  commentsRestricted: boolean;
  degreesOfSeparation: number;
  mirrorsRestricted: boolean;
};

export type UnknownReferenceModuleSettings = {
  __typename: 'UnknownReferenceModuleSettings';
  contractAddress: string;
  referenceModuleReturnData: string;
};

export type CommentBase = {
  __typename: 'Comment';
  id: PublicationId;
  collectNftAddress: string | null;
  createdAt: string;
  hidden: boolean;
  isGated: boolean;
  reaction: ReactionTypes | null;
  hasCollectedByMe: boolean;
  mirrors: Array<PublicationId>;
  hasOptimisticCollectedByMe: boolean;
  isOptimisticMirroredByMe: boolean;
  isMirroredByMe: boolean;
  collectPolicy: CollectPolicy;
  referencePolicy: ReferencePolicy;
  decryptionCriteria: DecryptionCriteria | null;
  contentInsight: ContentInsight;
  stats: PublicationStats;
  metadata: MetadataOutput;
  profile: Profile;
  collectedBy: Wallet | null;
  collectModule:
    | AaveFeeCollectModuleSettings
    | Erc4626FeeCollectModuleSettings
    | FeeCollectModuleSettings
    | FreeCollectModuleSettings
    | LimitedFeeCollectModuleSettings
    | LimitedTimedFeeCollectModuleSettings
    | MultirecipientFeeCollectModuleSettings
    | RevertCollectModuleSettings
    | SimpleCollectModuleSettings
    | TimedFeeCollectModuleSettings
    | UnknownCollectModuleSettings;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettings
    | FollowOnlyReferenceModuleSettings
    | UnknownReferenceModuleSettings
    | null;
  canComment: { result: boolean };
  canMirror: { result: boolean };
  canObserverDecrypt: { result: boolean; reasons: Array<DecryptFailReason> | null };
};

export type PaginatedResultInfo = {
  __typename: 'PaginatedResultInfo';
  beforeCount: number;
  moreAfter: boolean;
  prev: Cursor | null;
  next: Cursor | null;
  totalCount: number | null;
};

export type Comment = {
  __typename: 'Comment';
  commentOn: CommentBase | MirrorBase | Post | null;
  mainPost: MirrorBase | Post;
  firstComment: CommentBase | null;
} & CommentBase;

export type Post = {
  __typename: 'Post';
  id: PublicationId;
  collectNftAddress: string | null;
  createdAt: string;
  hidden: boolean;
  isGated: boolean;
  reaction: ReactionTypes | null;
  hasCollectedByMe: boolean;
  mirrors: Array<PublicationId>;
  hasOptimisticCollectedByMe: boolean;
  isOptimisticMirroredByMe: boolean;
  isMirroredByMe: boolean;
  collectPolicy: CollectPolicy;
  referencePolicy: ReferencePolicy;
  decryptionCriteria: DecryptionCriteria | null;
  contentInsight: ContentInsight;
  stats: PublicationStats;
  metadata: MetadataOutput;
  profile: Profile;
  collectedBy: Wallet | null;
  collectModule:
    | AaveFeeCollectModuleSettings
    | Erc4626FeeCollectModuleSettings
    | FeeCollectModuleSettings
    | FreeCollectModuleSettings
    | LimitedFeeCollectModuleSettings
    | LimitedTimedFeeCollectModuleSettings
    | MultirecipientFeeCollectModuleSettings
    | RevertCollectModuleSettings
    | SimpleCollectModuleSettings
    | TimedFeeCollectModuleSettings
    | UnknownCollectModuleSettings;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettings
    | FollowOnlyReferenceModuleSettings
    | UnknownReferenceModuleSettings
    | null;
  canComment: { result: boolean };
  canMirror: { result: boolean };
  canObserverDecrypt: { result: boolean; reasons: Array<DecryptFailReason> | null };
};

type Publication_Comment_ = Comment;

type Publication_Mirror_ = Mirror;

type Publication_Post_ = Post;

export type Publication = Publication_Comment_ | Publication_Mirror_ | Publication_Post_;

export type PendingPost = {
  __typename: 'PendingPost';
  id: string;
  content: string | null;
  locale: string;
  mainContentFocus: PublicationMainFocus;
  media: Array<Media> | null;
  profile: Profile;
};

export type Eip712TypedDataDomain = {
  __typename: 'EIP712TypedDataDomain';
  name: string;
  chainId: number;
  version: string;
  verifyingContract: string;
};

export type EnabledModuleCurrenciesVariables = Exact<{ [key: string]: never }>;

export type EnabledModuleCurrenciesData = { result: Array<Erc20Fields> };

export type ElectedMirror = {
  __typename: 'ElectedMirror';
  mirrorId: PublicationId;
  timestamp: string;
  profile: Profile;
};

export type MirrorEvent = { __typename: 'MirrorEvent'; timestamp: string; profile: Profile };

export type CollectedEvent = { __typename: 'CollectedEvent'; timestamp: string; profile: Profile };

export type ReactionEvent = {
  __typename: 'ReactionEvent';
  reaction: ReactionTypes;
  timestamp: string;
  profile: Profile;
};

export type FeedItem = {
  __typename: 'FeedItem';
  root: Comment | Post;
  comments: Array<Comment> | null;
  electedMirror: ElectedMirror | null;
  mirrors: Array<MirrorEvent>;
  collects: Array<CollectedEvent>;
  reactions: Array<ReactionEvent>;
};

export type FeedVariables = Exact<{
  profileId: Scalars['ProfileId'];
  restrictEventTypesTo?: InputMaybe<Array<FeedEventItemType> | FeedEventItemType>;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  metadata?: InputMaybe<PublicationMetadataFilters>;
  mediaTransformPublicationSmall?: InputMaybe<MediaTransformParams>;
  mediaTransformPublicationMedium?: InputMaybe<MediaTransformParams>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type FeedData = { result: { items: Array<FeedItem>; pageInfo: PaginatedResultInfo } };

export type ExploreProfilesVariables = Exact<{
  sortCriteria: ProfileSortCriteria;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type ExploreProfilesData = {
  result: { items: Array<Profile>; pageInfo: PaginatedResultInfo };
};

export type CreateFollowTypedDataVariables = Exact<{
  request: FollowRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateFollowTypedDataData = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { FollowWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomain;
      message: {
        nonce: number;
        deadline: unknown;
        profileIds: Array<ProfileId>;
        datas: Array<string>;
      };
    };
  };
};

export type NftOwnershipOutput = {
  __typename: 'NftOwnershipOutput';
  contractAddress: string;
  chainID: number;
  contractType: ContractType;
  tokenIds: Array<string> | null;
};

export type Erc20OwnershipOutput = {
  __typename: 'Erc20OwnershipOutput';
  amount: string;
  chainID: number;
  condition: ScalarOperator;
  contractAddress: string;
  decimals: number;
  name: string;
  symbol: string;
};

export type EoaOwnershipOutput = { __typename: 'EoaOwnershipOutput'; address: EthereumAddress };

export type ProfileOwnershipOutput = { __typename: 'ProfileOwnershipOutput'; profileId: ProfileId };

export type FollowConditionOutput = { __typename: 'FollowConditionOutput'; profileId: ProfileId };

export type CollectConditionOutput = {
  __typename: 'CollectConditionOutput';
  publicationId: PublicationId | null;
  thisPublication: boolean | null;
};

export type LeafConditionOutput = {
  __typename: 'AccessConditionOutput';
  nft: NftOwnershipOutput | null;
  token: Erc20OwnershipOutput | null;
  eoa: EoaOwnershipOutput | null;
  profile: ProfileOwnershipOutput | null;
  follow: FollowConditionOutput | null;
  collect: CollectConditionOutput | null;
};

export type OrConditionOutput = {
  __typename: 'OrConditionOutput';
  criteria: Array<LeafConditionOutput>;
};

export type AndConditionOutput = {
  __typename: 'AndConditionOutput';
  criteria: Array<LeafConditionOutput>;
};

export type AnyConditionOutput = {
  __typename: 'AccessConditionOutput';
  or: OrConditionOutput | null;
  and: AndConditionOutput | null;
} & LeafConditionOutput;

export type RootConditionOutput = {
  __typename: 'AccessConditionOutput';
  or: { criteria: Array<AnyConditionOutput> } | null;
};

export type EncryptedMedia = {
  __typename: 'EncryptedMedia';
  altTag: string | null;
  cover: string | null;
  mimeType: string | null;
  url: Url;
};

export type EncryptedMediaSet = { __typename: 'EncryptedMediaSet'; original: EncryptedMedia };

export type EncryptedFieldsOutput = {
  __typename: 'EncryptedFieldsOutput';
  animation_url: string | null;
  content: string | null;
  external_url: string | null;
  image: string | null;
  media: Array<{ original: EncryptedMedia }> | null;
};

export type EncryptionParamsOutput = {
  __typename: 'EncryptionParamsOutput';
  encryptionProvider: EncryptionProvider;
  accessCondition: RootConditionOutput;
  encryptedFields: EncryptedFieldsOutput;
  providerSpecificParams: { encryptionKey: ContentEncryptionKey };
};

export type CreateMirrorEip712TypedData = {
  types: { MirrorWithSig: Array<{ name: string; type: string }> };
  domain: Eip712TypedDataDomain;
  message: {
    nonce: number;
    deadline: unknown;
    profileId: ProfileId;
    profileIdPointed: ProfileId;
    pubIdPointed: string;
    referenceModuleData: string;
    referenceModule: string;
    referenceModuleInitData: string;
  };
};

export type CreateMirrorTypedDataVariables = Exact<{
  request: CreateMirrorRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateMirrorTypedDataData = {
  result: { id: string; expiresAt: string; typedData: CreateMirrorEip712TypedData };
};

export type CreateMirrorViaDispatcherVariables = Exact<{
  request: CreateMirrorRequest;
}>;

export type CreateMirrorViaDispatcherData = {
  result: BroadcastOnChainResult_RelayError_ | BroadcastOnChainResult_RelayerResult_;
};

export type CreateDataAvailabilityMirrorTypedDataVariables = Exact<{
  request: CreateDataAvailabilityMirrorRequest;
}>;

export type CreateDataAvailabilityMirrorTypedDataData = {
  result: { id: string; expiresAt: string; typedData: CreateMirrorEip712TypedData };
};

export type CreateDataAvailabilityMirrorViaDispatcherVariables = Exact<{
  request: CreateDataAvailabilityMirrorRequest;
}>;

export type CreateDataAvailabilityMirrorViaDispatcherData = {
  result:
    | BroadcastOffChainResult_CreateDataAvailabilityPublicationResult_
    | BroadcastOffChainResult_RelayError_;
};

export type ModuleInfo = { __typename: 'ModuleInfo'; name: string; type: string };

export type EnabledModule = {
  __typename: 'EnabledModule';
  moduleName: string;
  contractAddress: string;
  inputParams: Array<ModuleInfo>;
  redeemParams: Array<ModuleInfo>;
  returnDataParams: Array<ModuleInfo>;
};

export type EnabledModules = {
  __typename: 'EnabledModules';
  collectModules: Array<EnabledModule>;
  followModules: Array<EnabledModule>;
  referenceModules: Array<EnabledModule>;
};

export type EnabledModulesVariables = Exact<{ [key: string]: never }>;

export type EnabledModulesData = { result: EnabledModules };

export type NewFollowerNotification = {
  __typename: 'NewFollowerNotification';
  notificationId: string;
  createdAt: string;
  isFollowedByMe: boolean;
  wallet: Wallet;
};

export type NewCollectNotification = {
  __typename: 'NewCollectNotification';
  notificationId: string;
  createdAt: string;
  wallet: Wallet;
  collectedPublication: Comment | Mirror | Post;
};

export type NewMirrorNotification = {
  __typename: 'NewMirrorNotification';
  notificationId: string;
  createdAt: string;
  profile: Profile;
  publication: Comment | Post;
};

export type NewCommentNotification = {
  __typename: 'NewCommentNotification';
  notificationId: string;
  createdAt: string;
  profile: Profile;
  comment: Comment;
};

export type NewMentionNotification = {
  __typename: 'NewMentionNotification';
  notificationId: string;
  createdAt: string;
  mentionPublication: Comment | Post;
};

export type NewReactionNotification = {
  __typename: 'NewReactionNotification';
  notificationId: string;
  createdAt: string;
  reaction: ReactionTypes;
  profile: Profile;
  publication: Comment | Mirror | Post;
};

export type NotificationsVariables = Exact<{
  observerId: Scalars['ProfileId'];
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  notificationTypes?: InputMaybe<Array<NotificationTypes> | NotificationTypes>;
  mediaTransformPublicationSmall?: InputMaybe<MediaTransformParams>;
  mediaTransformPublicationMedium?: InputMaybe<MediaTransformParams>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type NotificationsData = {
  result: {
    items: Array<
      | NewCollectNotification
      | NewCommentNotification
      | NewFollowerNotification
      | NewMentionNotification
      | NewMirrorNotification
      | NewReactionNotification
    >;
    pageInfo: PaginatedResultInfo;
  };
};

export type UnreadNotificationCountVariables = Exact<{
  profileId: Scalars['ProfileId'];
  sources?: InputMaybe<Array<Scalars['Sources']> | Scalars['Sources']>;
  notificationTypes?: InputMaybe<Array<NotificationTypes> | NotificationTypes>;
}>;

export type UnreadNotificationCountData = { result: { pageInfo: { totalCount: number | null } } };

export type CreatePostEip712TypedData = {
  types: { PostWithSig: Array<{ name: string; type: string }> };
  domain: Eip712TypedDataDomain;
  message: {
    nonce: number;
    deadline: unknown;
    profileId: ProfileId;
    contentURI: Url;
    collectModule: string;
    collectModuleInitData: string;
    referenceModule: string;
    referenceModuleInitData: string;
  };
};

export type CreatePostTypedDataVariables = Exact<{
  request: CreatePublicPostRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreatePostTypedDataData = {
  result: { id: string; expiresAt: string; typedData: CreatePostEip712TypedData };
};

export type CreatePostViaDispatcherVariables = Exact<{
  request: CreatePublicPostRequest;
}>;

export type CreatePostViaDispatcherData = {
  result: BroadcastOnChainResult_RelayError_ | BroadcastOnChainResult_RelayerResult_;
};

export type CreateDataAvailabilityPostTypedDataVariables = Exact<{
  request: CreateDataAvailabilityPostRequest;
}>;

export type CreateDataAvailabilityPostTypedDataData = {
  result: { id: string; expiresAt: string; typedData: CreatePostEip712TypedData };
};

export type CreateDataAvailabilityPostViaDispatcherVariables = Exact<{
  request: CreateDataAvailabilityPostRequest;
}>;

export type CreateDataAvailabilityPostViaDispatcherData = {
  result:
    | BroadcastOffChainResult_CreateDataAvailabilityPublicationResult_
    | BroadcastOffChainResult_RelayError_;
};

export type CreateSetDispatcherTypedDataVariables = Exact<{
  request: SetDispatcherRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateSetDispatcherTypedDataData = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { SetDispatcherWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      message: {
        nonce: number;
        deadline: unknown;
        profileId: ProfileId;
        dispatcher: EthereumAddress;
      };
    };
  };
};

export type ProfileGuardianResult = {
  protected: boolean;
  disablingProtectionTimestamp: string | null;
};

export type ProfileGuardianVariables = Exact<{
  request: ProfileGuardianRequest;
}>;

export type ProfileGuardianData = { result: ProfileGuardianResult };

export type FeeFollowModuleSettings = {
  __typename: 'FeeFollowModuleSettings';
  contractAddress: string;
  recipient: EthereumAddress;
  amount: ModuleFeeAmount;
};

export type ProfileFollowModuleSettings = {
  __typename: 'ProfileFollowModuleSettings';
  contractAddress: string;
};

export type RevertFollowModuleSettings = {
  __typename: 'RevertFollowModuleSettings';
  contractAddress: string;
};

export type UnknownFollowModuleSettings = {
  __typename: 'UnknownFollowModuleSettings';
  contractAddress: string;
};

export type NftImage = {
  __typename: 'NftImage';
  contractAddress: string;
  tokenId: string;
  uri: Url;
  verified: boolean;
};

export type Attribute = {
  __typename: 'Attribute';
  displayType: string | null;
  key: string;
  value: string;
};

export type ProfileStats = {
  __typename: 'ProfileStats';
  totalCollects: number;
  totalComments: number;
  totalFollowers: number;
  totalFollowing: number;
  totalMirrors: number;
  totalPosts: number;
  totalPublications: number;
  commentsCount: number;
  postsCount: number;
  mirrorsCount: number;
};

export type ProfileFields = {
  __typename: 'Profile';
  id: ProfileId;
  name: string | null;
  bio: string | null;
  handle: string;
  ownedBy: EthereumAddress;
  interests: Array<string> | null;
  followPolicy: FollowPolicy;
  isFollowedByMe: boolean;
  followStatus: FollowStatus | null;
  ownedByMe: boolean;
  attributes: ProfileAttributes;
  isFollowingObserver: boolean;
  picture: ProfilePictureSet | NftImage | null;
  coverPicture: ProfileCoverSet | NftImage | null;
  stats: ProfileStats;
  followModule:
    | FeeFollowModuleSettings
    | ProfileFollowModuleSettings
    | RevertFollowModuleSettings
    | UnknownFollowModuleSettings
    | null;
  __attributes: Array<Attribute> | null;
  dispatcher: { address: EthereumAddress; canUseRelay: boolean } | null;
  onChainIdentity: {
    proofOfHumanity: boolean;
    ens: { name: unknown | null } | null;
    sybilDotOrg: { verified: boolean; source: { twitter: { handle: string | null } } };
    worldcoin: { isHuman: boolean };
  };
};

export type Profile = { invitedBy: ProfileFields | null } & ProfileFields;

export type ProfilesToFollowVariables = Exact<{
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type ProfilesToFollowData = { result: Array<Profile> };

export type GetProfileVariables = Exact<{
  request: SingleProfileQueryRequest;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources?: InputMaybe<Array<Scalars['Sources']> | Scalars['Sources']>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type GetProfileData = { result: Profile | null };

export type GetAllProfilesVariables = Exact<{
  byProfileIds?: InputMaybe<Array<Scalars['ProfileId']> | Scalars['ProfileId']>;
  byHandles?: InputMaybe<Array<Scalars['Handle']> | Scalars['Handle']>;
  byOwnerAddresses?: InputMaybe<Array<Scalars['EthereumAddress']> | Scalars['EthereumAddress']>;
  byWhoMirroredPublicationId?: InputMaybe<Scalars['InternalPublicationId']>;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources?: InputMaybe<Array<Scalars['Sources']> | Scalars['Sources']>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type GetAllProfilesData = {
  result: { items: Array<Profile>; pageInfo: PaginatedResultInfo };
};

export type CreateProfileVariables = Exact<{
  request: CreateProfileRequest;
}>;

export type CreateProfileData = {
  result: BroadcastOnChainResult_RelayError_ | BroadcastOnChainResult_RelayerResult_;
};

export type MutualFollowersProfilesVariables = Exact<{
  observerId: Scalars['ProfileId'];
  viewingProfileId: Scalars['ProfileId'];
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type MutualFollowersProfilesData = {
  result: { items: Array<Profile>; pageInfo: PaginatedResultInfo };
};

export type CreateSetFollowModuleTypedDataVariables = Exact<{
  request: CreateSetFollowModuleRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateSetFollowModuleTypedDataData = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { SetFollowModuleWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      message: {
        nonce: number;
        deadline: unknown;
        profileId: ProfileId;
        followModule: string;
        followModuleInitData: string;
      };
    };
  };
};

export type CreateSetProfileImageUriTypedDataVariables = Exact<{
  request: UpdateProfileImageRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateSetProfileImageUriTypedDataData = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { SetProfileImageURIWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      message: { nonce: number; deadline: unknown; profileId: ProfileId; imageURI: Url };
    };
  };
};

export type CreateSetProfileImageUriViaDispatcherVariables = Exact<{
  request: UpdateProfileImageRequest;
}>;

export type CreateSetProfileImageUriViaDispatcherData = {
  result: BroadcastOnChainResult_RelayError_ | BroadcastOnChainResult_RelayerResult_;
};

export type CreateSetProfileMetadataTypedDataVariables = Exact<{
  request: CreatePublicSetProfileMetadataUriRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateSetProfileMetadataTypedDataData = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { SetProfileMetadataURIWithSig: Array<{ name: string; type: string }> };
      domain: { name: string; chainId: number; version: string; verifyingContract: string };
      message: { nonce: number; deadline: unknown; profileId: ProfileId; metadata: Url };
    };
  };
};

export type CreateSetProfileMetadataViaDispatcherVariables = Exact<{
  request: CreatePublicSetProfileMetadataUriRequest;
}>;

export type CreateSetProfileMetadataViaDispatcherData = {
  result: BroadcastOnChainResult_RelayError_ | BroadcastOnChainResult_RelayerResult_;
};

export type Follower = { __typename: 'Follower'; wallet: Wallet };

export type Following = { __typename: 'Following'; profile: Profile };

export type ProfileFollowersVariables = Exact<{
  profileId: Scalars['ProfileId'];
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type ProfileFollowersData = {
  result: { items: Array<Follower>; pageInfo: PaginatedResultInfo };
};

export type ProfileFollowingVariables = Exact<{
  walletAddress: Scalars['EthereumAddress'];
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type ProfileFollowingData = {
  result: { items: Array<Following>; pageInfo: PaginatedResultInfo };
};

export type ProxyActionStatusResult = {
  __typename: 'ProxyActionStatusResult';
  txHash: string;
  txId: string;
  status: ProxyActionStatusTypes;
};

export type ProxyActionError = {
  __typename: 'ProxyActionError';
  reason: string;
  lastKnownTxId: string | null;
};

export type ProxyActionQueued = { __typename: 'ProxyActionQueued'; queuedAt: string };

export type ProxyActionStatusVariables = Exact<{
  proxyActionId: Scalars['ProxyActionId'];
}>;

export type ProxyActionStatusData = {
  result: ProxyActionError | ProxyActionQueued | ProxyActionStatusResult;
};

export type ProxyActionVariables = Exact<{
  request: ProxyActionRequest;
}>;

export type ProxyActionData = { result: string };

export type GetPublicationVariables = Exact<{
  request: PublicationQueryRequest;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformPublicationSmall?: InputMaybe<MediaTransformParams>;
  mediaTransformPublicationMedium?: InputMaybe<MediaTransformParams>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type GetPublicationData = { result: Comment | Mirror | Post | null };

export type HidePublicationVariables = Exact<{
  publicationId: Scalars['InternalPublicationId'];
}>;

export type HidePublicationData = { hidePublication: void | null };

export type GetPublicationsVariables = Exact<{
  profileId?: InputMaybe<Scalars['ProfileId']>;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  publicationTypes?: InputMaybe<Array<PublicationTypes> | PublicationTypes>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  metadata?: InputMaybe<PublicationMetadataFilters>;
  commentsOf?: InputMaybe<Scalars['InternalPublicationId']>;
  walletAddress?: InputMaybe<Scalars['EthereumAddress']>;
  mediaTransformPublicationSmall?: InputMaybe<MediaTransformParams>;
  mediaTransformPublicationMedium?: InputMaybe<MediaTransformParams>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type GetPublicationsData = {
  result: { items: Array<Comment | Mirror | Post>; pageInfo: PaginatedResultInfo };
};

export type ExplorePublicationsVariables = Exact<{
  cursor?: InputMaybe<Scalars['Cursor']>;
  excludeProfileIds?: InputMaybe<Array<Scalars['ProfileId']> | Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  metadata?: InputMaybe<PublicationMetadataFilters>;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  publicationTypes?: InputMaybe<Array<PublicationTypes> | PublicationTypes>;
  sortCriteria: PublicationSortCriteria;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  timestamp?: InputMaybe<Scalars['TimestampScalar']>;
  mediaTransformPublicationSmall?: InputMaybe<MediaTransformParams>;
  mediaTransformPublicationMedium?: InputMaybe<MediaTransformParams>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type ExplorePublicationsData = {
  result: { items: Array<Comment | Mirror | Post>; pageInfo: PaginatedResultInfo };
};

export type WhoCollectedPublicationVariables = Exact<{
  publicationId: Scalars['InternalPublicationId'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type WhoCollectedPublicationData = {
  result: { items: Array<Wallet>; pageInfo: PaginatedResultInfo };
};

export type ProfilePublicationsForSaleVariables = Exact<{
  profileId: Scalars['ProfileId'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformPublicationSmall?: InputMaybe<MediaTransformParams>;
  mediaTransformPublicationMedium?: InputMaybe<MediaTransformParams>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type ProfilePublicationsForSaleData = {
  result: { items: Array<Comment | Post>; pageInfo: PaginatedResultInfo };
};

export type AddReactionVariables = Exact<{
  publicationId: Scalars['InternalPublicationId'];
  reaction: ReactionTypes;
  profileId: Scalars['ProfileId'];
}>;

export type AddReactionData = { addReaction: void | null };

export type RemoveReactionVariables = Exact<{
  publicationId: Scalars['InternalPublicationId'];
  reaction: ReactionTypes;
  profileId: Scalars['ProfileId'];
}>;

export type RemoveReactionData = { removeReaction: void | null };

export type WhoReactedResult = {
  __typename: 'WhoReactedResult';
  reactionId: unknown;
  reaction: ReactionTypes;
  reactionAt: string;
  profile: Profile;
};

export type WhoReactedPublicationVariables = Exact<{
  limit?: InputMaybe<Scalars['LimitScalar']>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  publicationId: Scalars['InternalPublicationId'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type WhoReactedPublicationData = {
  result: { items: Array<WhoReactedResult>; pageInfo: PaginatedResultInfo };
};

export type ReportPublicationVariables = Exact<{
  publicationId: Scalars['InternalPublicationId'];
  reason: ReportingReasonInputParams;
  additionalComments?: InputMaybe<Scalars['String']>;
}>;

export type ReportPublicationData = { reportPublication: void | null };

export type RevenueAggregate = {
  __typename: 'RevenueAggregate';
  totalAmount: ClientErc20Amount;
  __total: Erc20AmountFields;
};

export type PublicationRevenue = {
  __typename: 'PublicationRevenue';
  publication: Comment | Mirror | Post;
  revenue: RevenueAggregate;
};

export type GetPublicationRevenueVariables = Exact<{
  publicationId: Scalars['InternalPublicationId'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformPublicationSmall?: InputMaybe<MediaTransformParams>;
  mediaTransformPublicationMedium?: InputMaybe<MediaTransformParams>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type GetPublicationRevenueData = { result: PublicationRevenue | null };

export type GetProfilePublicationRevenueVariables = Exact<{
  profileId: Scalars['ProfileId'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  publicationTypes?: InputMaybe<Array<PublicationTypes> | PublicationTypes>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformPublicationSmall?: InputMaybe<MediaTransformParams>;
  mediaTransformPublicationMedium?: InputMaybe<MediaTransformParams>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type GetProfilePublicationRevenueData = {
  result: { items: Array<PublicationRevenue>; pageInfo: PaginatedResultInfo };
};

export type ProfileFollowRevenue = {
  __typename: 'FollowRevenueResult';
  revenues: Array<RevenueAggregate>;
};

export type ProfileFollowRevenueVariables = Exact<{
  profileId: Scalars['ProfileId'];
}>;

export type ProfileFollowRevenueData = { result: ProfileFollowRevenue };

export type SearchPublicationsVariables = Exact<{
  limit?: InputMaybe<Scalars['LimitScalar']>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  query: Scalars['Search'];
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  mediaTransformPublicationSmall?: InputMaybe<MediaTransformParams>;
  mediaTransformPublicationMedium?: InputMaybe<MediaTransformParams>;
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type SearchPublicationsData = {
  result:
    | {
        __typename: 'PublicationSearchResult';
        items: Array<Comment | Post>;
        pageInfo: PaginatedResultInfo;
      }
    | {};
};

export type SearchProfilesVariables = Exact<{
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  query: Scalars['Search'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  mediaTransformProfileThumbnail?: InputMaybe<MediaTransformParams>;
}>;

export type SearchProfilesData = {
  result:
    | { __typename: 'ProfileSearchResult'; items: Array<Profile>; pageInfo: PaginatedResultInfo }
    | {};
};

export type RelayerResult = { __typename: 'RelayerResult'; txHash: string; txId: string };

export type RelayError = { __typename: 'RelayError'; reason: RelayErrorReasons };

type BroadcastOnChainResult_RelayError_ = RelayError;

type BroadcastOnChainResult_RelayerResult_ = RelayerResult;

export type BroadcastOnChainResult =
  | BroadcastOnChainResult_RelayError_
  | BroadcastOnChainResult_RelayerResult_;

export type DataAvailabilityPublicationResult = {
  __typename: 'CreateDataAvailabilityPublicationResult';
  id: PublicationId;
  dataAvailabilityId: string;
};

type BroadcastOffChainResult_CreateDataAvailabilityPublicationResult_ =
  DataAvailabilityPublicationResult;

type BroadcastOffChainResult_RelayError_ = RelayError;

export type BroadcastOffChainResult =
  | BroadcastOffChainResult_CreateDataAvailabilityPublicationResult_
  | BroadcastOffChainResult_RelayError_;

export type TransactionIndexedResult = {
  __typename: 'TransactionIndexedResult';
  indexed: boolean;
  txHash: string;
};

export type TransactionError = { __typename: 'TransactionError'; reason: TransactionErrorReasons };

export type HasTxHashBeenIndexedVariables = Exact<{
  request: HasTxHashBeenIndexedRequest;
}>;

export type HasTxHashBeenIndexedData = { result: TransactionError | TransactionIndexedResult };

export type BroadcastOnChainVariables = Exact<{
  request: BroadcastRequest;
}>;

export type BroadcastOnChainData = {
  result: BroadcastOnChainResult_RelayError_ | BroadcastOnChainResult_RelayerResult_;
};

export type BroadcastOffChainVariables = Exact<{
  request: BroadcastRequest;
}>;

export type BroadcastOffChainData = {
  result:
    | BroadcastOffChainResult_CreateDataAvailabilityPublicationResult_
    | BroadcastOffChainResult_RelayError_;
};

export type CreateUnfollowTypedDataVariables = Exact<{
  request: UnfollowRequest;
}>;

export type CreateUnfollowTypedDataData = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { BurnWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomain;
      message: { nonce: number; deadline: unknown; tokenId: string };
    };
  };
};

export const FragmentEip712TypedDataDomain = /*#__PURE__*/ gql`
  fragment EIP712TypedDataDomain on EIP712TypedDataDomain {
    __typename
    name
    chainId
    version
    verifyingContract
  }
`;
export const FragmentCreateCommentEip712TypedData = /*#__PURE__*/ gql`
  fragment CreateCommentEIP712TypedData on CreateCommentEIP712TypedData {
    types {
      CommentWithSig {
        name
        type
      }
    }
    domain {
      ...EIP712TypedDataDomain
    }
    message: value {
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
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentPaginatedResultInfo = /*#__PURE__*/ gql`
  fragment PaginatedResultInfo on PaginatedResultInfo {
    __typename
    beforeCount @client
    moreAfter @client
    prev
    next
    totalCount
  }
`;
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
export const FragmentPublicationMediaSet = /*#__PURE__*/ gql`
  fragment PublicationMediaSet on MediaSet {
    __typename
    original {
      ...Media
    }
    optimized {
      ...Media
    }
    small: transformed(params: $mediaTransformPublicationSmall) {
      ...Media
    }
    medium: transformed(params: $mediaTransformPublicationMedium) {
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
    content
    contentWarning
    description
    image
    locale
    mainContentFocus
    name
    media {
      ...PublicationMediaSet
    }
    attributes {
      ...MetadataAttributeOutput
    }
    encryptionParams {
      ...EncryptionParamsOutput
    }
    tags
  }
  ${FragmentPublicationMediaSet}
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
export const FragmentProfilePictureSet = /*#__PURE__*/ gql`
  fragment ProfilePictureSet on MediaSet {
    __typename
    original {
      ...Media
    }
    optimized {
      ...Media
    }
    thumbnail: transformed(params: $mediaTransformProfileThumbnail) {
      ...Media
    }
  }
  ${FragmentMedia}
`;
export const FragmentProfileCoverSet = /*#__PURE__*/ gql`
  fragment ProfileCoverSet on MediaSet {
    __typename
    original {
      ...Media
    }
    optimized {
      ...Media
    }
  }
  ${FragmentMedia}
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
export const FragmentProfileFields = /*#__PURE__*/ gql`
  fragment ProfileFields on Profile {
    __typename
    id
    name
    bio
    handle
    ownedBy
    interests
    picture {
      ... on NftImage {
        ...NftImage
      }
      ... on MediaSet {
        ...ProfilePictureSet
      }
    }
    coverPicture {
      ... on NftImage {
        ...NftImage
      }
      ... on MediaSet {
        ...ProfileCoverSet
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
  ${FragmentProfilePictureSet}
  ${FragmentProfileCoverSet}
  ${FragmentProfileStats}
  ${FragmentFeeFollowModuleSettings}
  ${FragmentProfileFollowModuleSettings}
  ${FragmentRevertFollowModuleSettings}
  ${FragmentUnknownFollowModuleSettings}
  ${FragmentAttribute}
`;
export const FragmentProfile = /*#__PURE__*/ gql`
  fragment Profile on Profile {
    ...ProfileFields
    invitedBy {
      ...ProfileFields
    }
  }
  ${FragmentProfileFields}
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
    contractAddress
    collectModuleReturnData
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
export const FragmentSimpleCollectModuleSettings = /*#__PURE__*/ gql`
  fragment SimpleCollectModuleSettings on SimpleCollectModuleSettings {
    __typename
    contractAddress
    followerOnly
    feeOptional: fee {
      amount {
        ...ModuleFeeAmount
      }
      referralFee
      recipient
    }
    collectLimitOptional: collectLimit
    endTimestampOptional: endTimestamp
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
      ... on SimpleCollectModuleSettings {
        ...SimpleCollectModuleSettings
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
    hasCollectedByMe
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
    isMirroredByMe @client
    collectPolicy @client
    referencePolicy @client
    decryptionCriteria @client
    contentInsight @client
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
  ${FragmentSimpleCollectModuleSettings}
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
      ... on SimpleCollectModuleSettings {
        ...SimpleCollectModuleSettings
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
    hasCollectedByMe
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
    isMirroredByMe @client
    collectPolicy @client
    referencePolicy @client
    decryptionCriteria @client
    contentInsight @client
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
  ${FragmentSimpleCollectModuleSettings}
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
    firstComment {
      ...CommentBase
    }
  }
  ${FragmentCommentBase}
  ${FragmentPost}
  ${FragmentMirrorBase}
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
export const FragmentPublication = /*#__PURE__*/ gql`
  fragment Publication on Publication {
    ... on Comment {
      ...Comment
    }
    ... on Post {
      ...Post
    }
    ... on Mirror {
      ...Mirror
    }
  }
  ${FragmentComment}
  ${FragmentPost}
  ${FragmentMirror}
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
export const FragmentCreateMirrorEip712TypedData = /*#__PURE__*/ gql`
  fragment CreateMirrorEIP712TypedData on CreateMirrorEIP712TypedData {
    types {
      MirrorWithSig {
        name
        type
      }
    }
    domain {
      ...EIP712TypedDataDomain
    }
    message: value {
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
  ${FragmentEip712TypedDataDomain}
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
export const FragmentCreatePostEip712TypedData = /*#__PURE__*/ gql`
  fragment CreatePostEIP712TypedData on CreatePostEIP712TypedData {
    types {
      PostWithSig {
        name
        type
      }
    }
    domain {
      ...EIP712TypedDataDomain
    }
    message: value {
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
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentProfileGuardianResult = /*#__PURE__*/ gql`
  fragment ProfileGuardianResult on ProfileGuardianResult {
    protected
    disablingProtectionTimestamp
  }
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
export const FragmentBroadcastOnChainResult = /*#__PURE__*/ gql`
  fragment BroadcastOnChainResult on RelayResult {
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
export const FragmentDataAvailabilityPublicationResult = /*#__PURE__*/ gql`
  fragment DataAvailabilityPublicationResult on CreateDataAvailabilityPublicationResult {
    __typename
    id
    dataAvailabilityId
  }
`;
export const FragmentBroadcastOffChainResult = /*#__PURE__*/ gql`
  fragment BroadcastOffChainResult on BroadcastDataAvailabilityUnion {
    ... on CreateDataAvailabilityPublicationResult {
      ...DataAvailabilityPublicationResult
    }
    ... on RelayError {
      ...RelayError
    }
  }
  ${FragmentDataAvailabilityPublicationResult}
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
  baseOptions: Apollo.QueryHookOptions<AuthChallengeData, AuthChallengeVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthChallengeData, AuthChallengeVariables>(AuthChallengeDocument, options);
}
export function useAuthChallengeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AuthChallengeData, AuthChallengeVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AuthChallengeData, AuthChallengeVariables>(
    AuthChallengeDocument,
    options,
  );
}
export type AuthChallengeHookResult = ReturnType<typeof useAuthChallenge>;
export type AuthChallengeLazyQueryHookResult = ReturnType<typeof useAuthChallengeLazyQuery>;
export type AuthChallengeQueryResult = Apollo.QueryResult<
  AuthChallengeData,
  AuthChallengeVariables
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
  AuthAuthenticateData,
  AuthAuthenticateVariables
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
  baseOptions?: Apollo.MutationHookOptions<AuthAuthenticateData, AuthAuthenticateVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AuthAuthenticateData, AuthAuthenticateVariables>(
    AuthAuthenticateDocument,
    options,
  );
}
export type AuthAuthenticateHookResult = ReturnType<typeof useAuthAuthenticate>;
export type AuthAuthenticateMutationResult = Apollo.MutationResult<AuthAuthenticateData>;
export type AuthAuthenticateMutationOptions = Apollo.BaseMutationOptions<
  AuthAuthenticateData,
  AuthAuthenticateVariables
>;
export const AuthRefreshDocument = /*#__PURE__*/ gql`
  mutation AuthRefresh($refreshToken: Jwt!) {
    result: refresh(request: { refreshToken: $refreshToken }) {
      accessToken
      refreshToken
    }
  }
`;
export type AuthRefreshMutationFn = Apollo.MutationFunction<AuthRefreshData, AuthRefreshVariables>;

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
  baseOptions?: Apollo.MutationHookOptions<AuthRefreshData, AuthRefreshVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AuthRefreshData, AuthRefreshVariables>(AuthRefreshDocument, options);
}
export type AuthRefreshHookResult = ReturnType<typeof useAuthRefresh>;
export type AuthRefreshMutationResult = Apollo.MutationResult<AuthRefreshData>;
export type AuthRefreshMutationOptions = Apollo.BaseMutationOptions<
  AuthRefreshData,
  AuthRefreshVariables
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
        message: value {
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
  CreateCollectTypedDataData,
  CreateCollectTypedDataVariables
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
    CreateCollectTypedDataData,
    CreateCollectTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCollectTypedDataData, CreateCollectTypedDataVariables>(
    CreateCollectTypedDataDocument,
    options,
  );
}
export type CreateCollectTypedDataHookResult = ReturnType<typeof useCreateCollectTypedData>;
export type CreateCollectTypedDataMutationResult =
  Apollo.MutationResult<CreateCollectTypedDataData>;
export type CreateCollectTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateCollectTypedDataData,
  CreateCollectTypedDataVariables
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
        ...CreateCommentEIP712TypedData
      }
    }
  }
  ${FragmentCreateCommentEip712TypedData}
`;
export type CreateCommentTypedDataMutationFn = Apollo.MutationFunction<
  CreateCommentTypedDataData,
  CreateCommentTypedDataVariables
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
    CreateCommentTypedDataData,
    CreateCommentTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCommentTypedDataData, CreateCommentTypedDataVariables>(
    CreateCommentTypedDataDocument,
    options,
  );
}
export type CreateCommentTypedDataHookResult = ReturnType<typeof useCreateCommentTypedData>;
export type CreateCommentTypedDataMutationResult =
  Apollo.MutationResult<CreateCommentTypedDataData>;
export type CreateCommentTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentTypedDataData,
  CreateCommentTypedDataVariables
>;
export const CreateCommentViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateCommentViaDispatcher($request: CreatePublicCommentRequest!) {
    result: createCommentViaDispatcher(request: $request) {
      ...BroadcastOnChainResult
    }
  }
  ${FragmentBroadcastOnChainResult}
`;
export type CreateCommentViaDispatcherMutationFn = Apollo.MutationFunction<
  CreateCommentViaDispatcherData,
  CreateCommentViaDispatcherVariables
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
    CreateCommentViaDispatcherData,
    CreateCommentViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCommentViaDispatcherData, CreateCommentViaDispatcherVariables>(
    CreateCommentViaDispatcherDocument,
    options,
  );
}
export type CreateCommentViaDispatcherHookResult = ReturnType<typeof useCreateCommentViaDispatcher>;
export type CreateCommentViaDispatcherMutationResult =
  Apollo.MutationResult<CreateCommentViaDispatcherData>;
export type CreateCommentViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentViaDispatcherData,
  CreateCommentViaDispatcherVariables
>;
export const CreateDataAvailabilityCommentTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateDataAvailabilityCommentTypedData($request: CreateDataAvailabilityCommentRequest!) {
    result: createDataAvailabilityCommentTypedData(request: $request) {
      id
      expiresAt
      typedData {
        ...CreateCommentEIP712TypedData
      }
    }
  }
  ${FragmentCreateCommentEip712TypedData}
`;
export type CreateDataAvailabilityCommentTypedDataMutationFn = Apollo.MutationFunction<
  CreateDataAvailabilityCommentTypedDataData,
  CreateDataAvailabilityCommentTypedDataVariables
>;

/**
 * __useCreateDataAvailabilityCommentTypedData__
 *
 * To run a mutation, you first call `useCreateDataAvailabilityCommentTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataAvailabilityCommentTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataAvailabilityCommentTypedData, { data, loading, error }] = useCreateDataAvailabilityCommentTypedData({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateDataAvailabilityCommentTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDataAvailabilityCommentTypedDataData,
    CreateDataAvailabilityCommentTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDataAvailabilityCommentTypedDataData,
    CreateDataAvailabilityCommentTypedDataVariables
  >(CreateDataAvailabilityCommentTypedDataDocument, options);
}
export type CreateDataAvailabilityCommentTypedDataHookResult = ReturnType<
  typeof useCreateDataAvailabilityCommentTypedData
>;
export type CreateDataAvailabilityCommentTypedDataMutationResult =
  Apollo.MutationResult<CreateDataAvailabilityCommentTypedDataData>;
export type CreateDataAvailabilityCommentTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateDataAvailabilityCommentTypedDataData,
  CreateDataAvailabilityCommentTypedDataVariables
>;
export const CreateDataAvailabilityCommentViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateDataAvailabilityCommentViaDispatcher(
    $request: CreateDataAvailabilityCommentRequest!
  ) {
    result: createDataAvailabilityCommentViaDispatcher(request: $request) {
      ...BroadcastOffChainResult
    }
  }
  ${FragmentBroadcastOffChainResult}
`;
export type CreateDataAvailabilityCommentViaDispatcherMutationFn = Apollo.MutationFunction<
  CreateDataAvailabilityCommentViaDispatcherData,
  CreateDataAvailabilityCommentViaDispatcherVariables
>;

/**
 * __useCreateDataAvailabilityCommentViaDispatcher__
 *
 * To run a mutation, you first call `useCreateDataAvailabilityCommentViaDispatcher` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataAvailabilityCommentViaDispatcher` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataAvailabilityCommentViaDispatcher, { data, loading, error }] = useCreateDataAvailabilityCommentViaDispatcher({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateDataAvailabilityCommentViaDispatcher(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDataAvailabilityCommentViaDispatcherData,
    CreateDataAvailabilityCommentViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDataAvailabilityCommentViaDispatcherData,
    CreateDataAvailabilityCommentViaDispatcherVariables
  >(CreateDataAvailabilityCommentViaDispatcherDocument, options);
}
export type CreateDataAvailabilityCommentViaDispatcherHookResult = ReturnType<
  typeof useCreateDataAvailabilityCommentViaDispatcher
>;
export type CreateDataAvailabilityCommentViaDispatcherMutationResult =
  Apollo.MutationResult<CreateDataAvailabilityCommentViaDispatcherData>;
export type CreateDataAvailabilityCommentViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  CreateDataAvailabilityCommentViaDispatcherData,
  CreateDataAvailabilityCommentViaDispatcherVariables
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
    EnabledModuleCurrenciesData,
    EnabledModuleCurrenciesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EnabledModuleCurrenciesData, EnabledModuleCurrenciesVariables>(
    EnabledModuleCurrenciesDocument,
    options,
  );
}
export function useEnabledModuleCurrenciesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EnabledModuleCurrenciesData,
    EnabledModuleCurrenciesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EnabledModuleCurrenciesData, EnabledModuleCurrenciesVariables>(
    EnabledModuleCurrenciesDocument,
    options,
  );
}
export type EnabledModuleCurrenciesHookResult = ReturnType<typeof useEnabledModuleCurrencies>;
export type EnabledModuleCurrenciesLazyQueryHookResult = ReturnType<
  typeof useEnabledModuleCurrenciesLazyQuery
>;
export type EnabledModuleCurrenciesQueryResult = Apollo.QueryResult<
  EnabledModuleCurrenciesData,
  EnabledModuleCurrenciesVariables
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
    $mediaTransformPublicationSmall: MediaTransformParams = {}
    $mediaTransformPublicationMedium: MediaTransformParams = {}
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentFeedItem}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformPublicationSmall: // value for 'mediaTransformPublicationSmall'
 *      mediaTransformPublicationMedium: // value for 'mediaTransformPublicationMedium'
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useFeed(baseOptions: Apollo.QueryHookOptions<FeedData, FeedVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FeedData, FeedVariables>(FeedDocument, options);
}
export function useFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FeedData, FeedVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FeedData, FeedVariables>(FeedDocument, options);
}
export type FeedHookResult = ReturnType<typeof useFeed>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedData, FeedVariables>;
export const ExploreProfilesDocument = /*#__PURE__*/ gql`
  query ExploreProfiles(
    $sortCriteria: ProfileSortCriteria!
    $limit: LimitScalar
    $cursor: Cursor
    $observerId: ProfileId
    $sources: [Sources!]!
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
  ) {
    result: exploreProfiles(
      request: { limit: $limit, cursor: $cursor, sortCriteria: $sortCriteria }
    ) {
      items {
        ...Profile
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentProfile}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useExploreProfiles(
  baseOptions: Apollo.QueryHookOptions<ExploreProfilesData, ExploreProfilesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExploreProfilesData, ExploreProfilesVariables>(
    ExploreProfilesDocument,
    options,
  );
}
export function useExploreProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExploreProfilesData, ExploreProfilesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExploreProfilesData, ExploreProfilesVariables>(
    ExploreProfilesDocument,
    options,
  );
}
export type ExploreProfilesHookResult = ReturnType<typeof useExploreProfiles>;
export type ExploreProfilesLazyQueryHookResult = ReturnType<typeof useExploreProfilesLazyQuery>;
export type ExploreProfilesQueryResult = Apollo.QueryResult<
  ExploreProfilesData,
  ExploreProfilesVariables
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
        message: value {
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
  CreateFollowTypedDataData,
  CreateFollowTypedDataVariables
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
    CreateFollowTypedDataData,
    CreateFollowTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateFollowTypedDataData, CreateFollowTypedDataVariables>(
    CreateFollowTypedDataDocument,
    options,
  );
}
export type CreateFollowTypedDataHookResult = ReturnType<typeof useCreateFollowTypedData>;
export type CreateFollowTypedDataMutationResult = Apollo.MutationResult<CreateFollowTypedDataData>;
export type CreateFollowTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateFollowTypedDataData,
  CreateFollowTypedDataVariables
>;
export const CreateMirrorTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateMirrorTypedData($request: CreateMirrorRequest!, $options: TypedDataOptions) {
    result: createMirrorTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        ...CreateMirrorEIP712TypedData
      }
    }
  }
  ${FragmentCreateMirrorEip712TypedData}
`;
export type CreateMirrorTypedDataMutationFn = Apollo.MutationFunction<
  CreateMirrorTypedDataData,
  CreateMirrorTypedDataVariables
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
    CreateMirrorTypedDataData,
    CreateMirrorTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateMirrorTypedDataData, CreateMirrorTypedDataVariables>(
    CreateMirrorTypedDataDocument,
    options,
  );
}
export type CreateMirrorTypedDataHookResult = ReturnType<typeof useCreateMirrorTypedData>;
export type CreateMirrorTypedDataMutationResult = Apollo.MutationResult<CreateMirrorTypedDataData>;
export type CreateMirrorTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateMirrorTypedDataData,
  CreateMirrorTypedDataVariables
>;
export const CreateMirrorViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateMirrorViaDispatcher($request: CreateMirrorRequest!) {
    result: createMirrorViaDispatcher(request: $request) {
      ...BroadcastOnChainResult
    }
  }
  ${FragmentBroadcastOnChainResult}
`;
export type CreateMirrorViaDispatcherMutationFn = Apollo.MutationFunction<
  CreateMirrorViaDispatcherData,
  CreateMirrorViaDispatcherVariables
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
    CreateMirrorViaDispatcherData,
    CreateMirrorViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateMirrorViaDispatcherData, CreateMirrorViaDispatcherVariables>(
    CreateMirrorViaDispatcherDocument,
    options,
  );
}
export type CreateMirrorViaDispatcherHookResult = ReturnType<typeof useCreateMirrorViaDispatcher>;
export type CreateMirrorViaDispatcherMutationResult =
  Apollo.MutationResult<CreateMirrorViaDispatcherData>;
export type CreateMirrorViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  CreateMirrorViaDispatcherData,
  CreateMirrorViaDispatcherVariables
>;
export const CreateDataAvailabilityMirrorTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateDataAvailabilityMirrorTypedData($request: CreateDataAvailabilityMirrorRequest!) {
    result: createDataAvailabilityMirrorTypedData(request: $request) {
      id
      expiresAt
      typedData {
        ...CreateMirrorEIP712TypedData
      }
    }
  }
  ${FragmentCreateMirrorEip712TypedData}
`;
export type CreateDataAvailabilityMirrorTypedDataMutationFn = Apollo.MutationFunction<
  CreateDataAvailabilityMirrorTypedDataData,
  CreateDataAvailabilityMirrorTypedDataVariables
>;

/**
 * __useCreateDataAvailabilityMirrorTypedData__
 *
 * To run a mutation, you first call `useCreateDataAvailabilityMirrorTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataAvailabilityMirrorTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataAvailabilityMirrorTypedData, { data, loading, error }] = useCreateDataAvailabilityMirrorTypedData({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateDataAvailabilityMirrorTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDataAvailabilityMirrorTypedDataData,
    CreateDataAvailabilityMirrorTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDataAvailabilityMirrorTypedDataData,
    CreateDataAvailabilityMirrorTypedDataVariables
  >(CreateDataAvailabilityMirrorTypedDataDocument, options);
}
export type CreateDataAvailabilityMirrorTypedDataHookResult = ReturnType<
  typeof useCreateDataAvailabilityMirrorTypedData
>;
export type CreateDataAvailabilityMirrorTypedDataMutationResult =
  Apollo.MutationResult<CreateDataAvailabilityMirrorTypedDataData>;
export type CreateDataAvailabilityMirrorTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateDataAvailabilityMirrorTypedDataData,
  CreateDataAvailabilityMirrorTypedDataVariables
>;
export const CreateDataAvailabilityMirrorViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateDataAvailabilityMirrorViaDispatcher(
    $request: CreateDataAvailabilityMirrorRequest!
  ) {
    result: createDataAvailabilityMirrorViaDispatcher(request: $request) {
      ...BroadcastOffChainResult
    }
  }
  ${FragmentBroadcastOffChainResult}
`;
export type CreateDataAvailabilityMirrorViaDispatcherMutationFn = Apollo.MutationFunction<
  CreateDataAvailabilityMirrorViaDispatcherData,
  CreateDataAvailabilityMirrorViaDispatcherVariables
>;

/**
 * __useCreateDataAvailabilityMirrorViaDispatcher__
 *
 * To run a mutation, you first call `useCreateDataAvailabilityMirrorViaDispatcher` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataAvailabilityMirrorViaDispatcher` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataAvailabilityMirrorViaDispatcher, { data, loading, error }] = useCreateDataAvailabilityMirrorViaDispatcher({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateDataAvailabilityMirrorViaDispatcher(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDataAvailabilityMirrorViaDispatcherData,
    CreateDataAvailabilityMirrorViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDataAvailabilityMirrorViaDispatcherData,
    CreateDataAvailabilityMirrorViaDispatcherVariables
  >(CreateDataAvailabilityMirrorViaDispatcherDocument, options);
}
export type CreateDataAvailabilityMirrorViaDispatcherHookResult = ReturnType<
  typeof useCreateDataAvailabilityMirrorViaDispatcher
>;
export type CreateDataAvailabilityMirrorViaDispatcherMutationResult =
  Apollo.MutationResult<CreateDataAvailabilityMirrorViaDispatcherData>;
export type CreateDataAvailabilityMirrorViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  CreateDataAvailabilityMirrorViaDispatcherData,
  CreateDataAvailabilityMirrorViaDispatcherVariables
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
  baseOptions?: Apollo.QueryHookOptions<EnabledModulesData, EnabledModulesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EnabledModulesData, EnabledModulesVariables>(
    EnabledModulesDocument,
    options,
  );
}
export function useEnabledModulesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EnabledModulesData, EnabledModulesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EnabledModulesData, EnabledModulesVariables>(
    EnabledModulesDocument,
    options,
  );
}
export type EnabledModulesHookResult = ReturnType<typeof useEnabledModules>;
export type EnabledModulesLazyQueryHookResult = ReturnType<typeof useEnabledModulesLazyQuery>;
export type EnabledModulesQueryResult = Apollo.QueryResult<
  EnabledModulesData,
  EnabledModulesVariables
>;
export const NotificationsDocument = /*#__PURE__*/ gql`
  query Notifications(
    $observerId: ProfileId!
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
    $notificationTypes: [NotificationTypes!]
    $mediaTransformPublicationSmall: MediaTransformParams = {}
    $mediaTransformPublicationMedium: MediaTransformParams = {}
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentNewFollowerNotification}
  ${FragmentNewMirrorNotification}
  ${FragmentNewCollectNotification}
  ${FragmentNewCommentNotification}
  ${FragmentNewMentionNotification}
  ${FragmentNewReactionNotification}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformPublicationSmall: // value for 'mediaTransformPublicationSmall'
 *      mediaTransformPublicationMedium: // value for 'mediaTransformPublicationMedium'
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useNotifications(
  baseOptions: Apollo.QueryHookOptions<NotificationsData, NotificationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NotificationsData, NotificationsVariables>(NotificationsDocument, options);
}
export function useNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NotificationsData, NotificationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NotificationsData, NotificationsVariables>(
    NotificationsDocument,
    options,
  );
}
export type NotificationsHookResult = ReturnType<typeof useNotifications>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<
  NotificationsData,
  NotificationsVariables
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
    UnreadNotificationCountData,
    UnreadNotificationCountVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UnreadNotificationCountData, UnreadNotificationCountVariables>(
    UnreadNotificationCountDocument,
    options,
  );
}
export function useUnreadNotificationCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UnreadNotificationCountData,
    UnreadNotificationCountVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UnreadNotificationCountData, UnreadNotificationCountVariables>(
    UnreadNotificationCountDocument,
    options,
  );
}
export type UnreadNotificationCountHookResult = ReturnType<typeof useUnreadNotificationCount>;
export type UnreadNotificationCountLazyQueryHookResult = ReturnType<
  typeof useUnreadNotificationCountLazyQuery
>;
export type UnreadNotificationCountQueryResult = Apollo.QueryResult<
  UnreadNotificationCountData,
  UnreadNotificationCountVariables
>;
export const CreatePostTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreatePostTypedData($request: CreatePublicPostRequest!, $options: TypedDataOptions) {
    result: createPostTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        ...CreatePostEIP712TypedData
      }
    }
  }
  ${FragmentCreatePostEip712TypedData}
`;
export type CreatePostTypedDataMutationFn = Apollo.MutationFunction<
  CreatePostTypedDataData,
  CreatePostTypedDataVariables
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
  baseOptions?: Apollo.MutationHookOptions<CreatePostTypedDataData, CreatePostTypedDataVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostTypedDataData, CreatePostTypedDataVariables>(
    CreatePostTypedDataDocument,
    options,
  );
}
export type CreatePostTypedDataHookResult = ReturnType<typeof useCreatePostTypedData>;
export type CreatePostTypedDataMutationResult = Apollo.MutationResult<CreatePostTypedDataData>;
export type CreatePostTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreatePostTypedDataData,
  CreatePostTypedDataVariables
>;
export const CreatePostViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {
    result: createPostViaDispatcher(request: $request) {
      ...BroadcastOnChainResult
    }
  }
  ${FragmentBroadcastOnChainResult}
`;
export type CreatePostViaDispatcherMutationFn = Apollo.MutationFunction<
  CreatePostViaDispatcherData,
  CreatePostViaDispatcherVariables
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
    CreatePostViaDispatcherData,
    CreatePostViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostViaDispatcherData, CreatePostViaDispatcherVariables>(
    CreatePostViaDispatcherDocument,
    options,
  );
}
export type CreatePostViaDispatcherHookResult = ReturnType<typeof useCreatePostViaDispatcher>;
export type CreatePostViaDispatcherMutationResult =
  Apollo.MutationResult<CreatePostViaDispatcherData>;
export type CreatePostViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  CreatePostViaDispatcherData,
  CreatePostViaDispatcherVariables
>;
export const CreateDataAvailabilityPostTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateDataAvailabilityPostTypedData($request: CreateDataAvailabilityPostRequest!) {
    result: createDataAvailabilityPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        ...CreatePostEIP712TypedData
      }
    }
  }
  ${FragmentCreatePostEip712TypedData}
`;
export type CreateDataAvailabilityPostTypedDataMutationFn = Apollo.MutationFunction<
  CreateDataAvailabilityPostTypedDataData,
  CreateDataAvailabilityPostTypedDataVariables
>;

/**
 * __useCreateDataAvailabilityPostTypedData__
 *
 * To run a mutation, you first call `useCreateDataAvailabilityPostTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataAvailabilityPostTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataAvailabilityPostTypedData, { data, loading, error }] = useCreateDataAvailabilityPostTypedData({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateDataAvailabilityPostTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDataAvailabilityPostTypedDataData,
    CreateDataAvailabilityPostTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDataAvailabilityPostTypedDataData,
    CreateDataAvailabilityPostTypedDataVariables
  >(CreateDataAvailabilityPostTypedDataDocument, options);
}
export type CreateDataAvailabilityPostTypedDataHookResult = ReturnType<
  typeof useCreateDataAvailabilityPostTypedData
>;
export type CreateDataAvailabilityPostTypedDataMutationResult =
  Apollo.MutationResult<CreateDataAvailabilityPostTypedDataData>;
export type CreateDataAvailabilityPostTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateDataAvailabilityPostTypedDataData,
  CreateDataAvailabilityPostTypedDataVariables
>;
export const CreateDataAvailabilityPostViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateDataAvailabilityPostViaDispatcher($request: CreateDataAvailabilityPostRequest!) {
    result: createDataAvailabilityPostViaDispatcher(request: $request) {
      ...BroadcastOffChainResult
    }
  }
  ${FragmentBroadcastOffChainResult}
`;
export type CreateDataAvailabilityPostViaDispatcherMutationFn = Apollo.MutationFunction<
  CreateDataAvailabilityPostViaDispatcherData,
  CreateDataAvailabilityPostViaDispatcherVariables
>;

/**
 * __useCreateDataAvailabilityPostViaDispatcher__
 *
 * To run a mutation, you first call `useCreateDataAvailabilityPostViaDispatcher` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataAvailabilityPostViaDispatcher` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataAvailabilityPostViaDispatcher, { data, loading, error }] = useCreateDataAvailabilityPostViaDispatcher({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateDataAvailabilityPostViaDispatcher(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDataAvailabilityPostViaDispatcherData,
    CreateDataAvailabilityPostViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDataAvailabilityPostViaDispatcherData,
    CreateDataAvailabilityPostViaDispatcherVariables
  >(CreateDataAvailabilityPostViaDispatcherDocument, options);
}
export type CreateDataAvailabilityPostViaDispatcherHookResult = ReturnType<
  typeof useCreateDataAvailabilityPostViaDispatcher
>;
export type CreateDataAvailabilityPostViaDispatcherMutationResult =
  Apollo.MutationResult<CreateDataAvailabilityPostViaDispatcherData>;
export type CreateDataAvailabilityPostViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  CreateDataAvailabilityPostViaDispatcherData,
  CreateDataAvailabilityPostViaDispatcherVariables
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
        message: value {
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
  CreateSetDispatcherTypedDataData,
  CreateSetDispatcherTypedDataVariables
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
    CreateSetDispatcherTypedDataData,
    CreateSetDispatcherTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSetDispatcherTypedDataData,
    CreateSetDispatcherTypedDataVariables
  >(CreateSetDispatcherTypedDataDocument, options);
}
export type CreateSetDispatcherTypedDataHookResult = ReturnType<
  typeof useCreateSetDispatcherTypedData
>;
export type CreateSetDispatcherTypedDataMutationResult =
  Apollo.MutationResult<CreateSetDispatcherTypedDataData>;
export type CreateSetDispatcherTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateSetDispatcherTypedDataData,
  CreateSetDispatcherTypedDataVariables
>;
export const ProfileGuardianDocument = /*#__PURE__*/ gql`
  query ProfileGuardian($request: ProfileGuardianRequest!) {
    result: profileGuardianInformation(request: $request) {
      ...ProfileGuardianResult
    }
  }
  ${FragmentProfileGuardianResult}
`;

/**
 * __useProfileGuardian__
 *
 * To run a query within a React component, call `useProfileGuardian` and pass it any options that fit your needs.
 * When your component renders, `useProfileGuardian` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileGuardian({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useProfileGuardian(
  baseOptions: Apollo.QueryHookOptions<ProfileGuardianData, ProfileGuardianVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileGuardianData, ProfileGuardianVariables>(
    ProfileGuardianDocument,
    options,
  );
}
export function useProfileGuardianLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfileGuardianData, ProfileGuardianVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileGuardianData, ProfileGuardianVariables>(
    ProfileGuardianDocument,
    options,
  );
}
export type ProfileGuardianHookResult = ReturnType<typeof useProfileGuardian>;
export type ProfileGuardianLazyQueryHookResult = ReturnType<typeof useProfileGuardianLazyQuery>;
export type ProfileGuardianQueryResult = Apollo.QueryResult<
  ProfileGuardianData,
  ProfileGuardianVariables
>;
export const ProfilesToFollowDocument = /*#__PURE__*/ gql`
  query ProfilesToFollow(
    $observerId: ProfileId
    $sources: [Sources!]!
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
  ) {
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
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useProfilesToFollow(
  baseOptions: Apollo.QueryHookOptions<ProfilesToFollowData, ProfilesToFollowVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfilesToFollowData, ProfilesToFollowVariables>(
    ProfilesToFollowDocument,
    options,
  );
}
export function useProfilesToFollowLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfilesToFollowData, ProfilesToFollowVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfilesToFollowData, ProfilesToFollowVariables>(
    ProfilesToFollowDocument,
    options,
  );
}
export type ProfilesToFollowHookResult = ReturnType<typeof useProfilesToFollow>;
export type ProfilesToFollowLazyQueryHookResult = ReturnType<typeof useProfilesToFollowLazyQuery>;
export type ProfilesToFollowQueryResult = Apollo.QueryResult<
  ProfilesToFollowData,
  ProfilesToFollowVariables
>;
export const GetProfileDocument = /*#__PURE__*/ gql`
  query GetProfile(
    $request: SingleProfileQueryRequest!
    $observerId: ProfileId
    $sources: [Sources!] = []
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useGetProfile(
  baseOptions: Apollo.QueryHookOptions<GetProfileData, GetProfileVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProfileData, GetProfileVariables>(GetProfileDocument, options);
}
export function useGetProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProfileData, GetProfileVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProfileData, GetProfileVariables>(GetProfileDocument, options);
}
export type GetProfileHookResult = ReturnType<typeof useGetProfile>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileData, GetProfileVariables>;
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
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentProfile}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useGetAllProfiles(
  baseOptions: Apollo.QueryHookOptions<GetAllProfilesData, GetAllProfilesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllProfilesData, GetAllProfilesVariables>(
    GetAllProfilesDocument,
    options,
  );
}
export function useGetAllProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllProfilesData, GetAllProfilesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllProfilesData, GetAllProfilesVariables>(
    GetAllProfilesDocument,
    options,
  );
}
export type GetAllProfilesHookResult = ReturnType<typeof useGetAllProfiles>;
export type GetAllProfilesLazyQueryHookResult = ReturnType<typeof useGetAllProfilesLazyQuery>;
export type GetAllProfilesQueryResult = Apollo.QueryResult<
  GetAllProfilesData,
  GetAllProfilesVariables
>;
export const CreateProfileDocument = /*#__PURE__*/ gql`
  mutation CreateProfile($request: CreateProfileRequest!) {
    result: createProfile(request: $request) {
      ...BroadcastOnChainResult
    }
  }
  ${FragmentBroadcastOnChainResult}
`;
export type CreateProfileMutationFn = Apollo.MutationFunction<
  CreateProfileData,
  CreateProfileVariables
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
  baseOptions?: Apollo.MutationHookOptions<CreateProfileData, CreateProfileVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateProfileData, CreateProfileVariables>(
    CreateProfileDocument,
    options,
  );
}
export type CreateProfileHookResult = ReturnType<typeof useCreateProfile>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileData>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<
  CreateProfileData,
  CreateProfileVariables
>;
export const MutualFollowersProfilesDocument = /*#__PURE__*/ gql`
  query MutualFollowersProfiles(
    $observerId: ProfileId!
    $viewingProfileId: ProfileId!
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentProfile}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useMutualFollowersProfiles(
  baseOptions: Apollo.QueryHookOptions<
    MutualFollowersProfilesData,
    MutualFollowersProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MutualFollowersProfilesData, MutualFollowersProfilesVariables>(
    MutualFollowersProfilesDocument,
    options,
  );
}
export function useMutualFollowersProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MutualFollowersProfilesData,
    MutualFollowersProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MutualFollowersProfilesData, MutualFollowersProfilesVariables>(
    MutualFollowersProfilesDocument,
    options,
  );
}
export type MutualFollowersProfilesHookResult = ReturnType<typeof useMutualFollowersProfiles>;
export type MutualFollowersProfilesLazyQueryHookResult = ReturnType<
  typeof useMutualFollowersProfilesLazyQuery
>;
export type MutualFollowersProfilesQueryResult = Apollo.QueryResult<
  MutualFollowersProfilesData,
  MutualFollowersProfilesVariables
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
        message: value {
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
  CreateSetFollowModuleTypedDataData,
  CreateSetFollowModuleTypedDataVariables
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
    CreateSetFollowModuleTypedDataData,
    CreateSetFollowModuleTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSetFollowModuleTypedDataData,
    CreateSetFollowModuleTypedDataVariables
  >(CreateSetFollowModuleTypedDataDocument, options);
}
export type CreateSetFollowModuleTypedDataHookResult = ReturnType<
  typeof useCreateSetFollowModuleTypedData
>;
export type CreateSetFollowModuleTypedDataMutationResult =
  Apollo.MutationResult<CreateSetFollowModuleTypedDataData>;
export type CreateSetFollowModuleTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateSetFollowModuleTypedDataData,
  CreateSetFollowModuleTypedDataVariables
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
        message: value {
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
  CreateSetProfileImageUriTypedDataData,
  CreateSetProfileImageUriTypedDataVariables
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
    CreateSetProfileImageUriTypedDataData,
    CreateSetProfileImageUriTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSetProfileImageUriTypedDataData,
    CreateSetProfileImageUriTypedDataVariables
  >(CreateSetProfileImageUriTypedDataDocument, options);
}
export type CreateSetProfileImageUriTypedDataHookResult = ReturnType<
  typeof useCreateSetProfileImageUriTypedData
>;
export type CreateSetProfileImageUriTypedDataMutationResult =
  Apollo.MutationResult<CreateSetProfileImageUriTypedDataData>;
export type CreateSetProfileImageUriTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateSetProfileImageUriTypedDataData,
  CreateSetProfileImageUriTypedDataVariables
>;
export const CreateSetProfileImageUriViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateSetProfileImageURIViaDispatcher($request: UpdateProfileImageRequest!) {
    result: createSetProfileImageURIViaDispatcher(request: $request) {
      ...BroadcastOnChainResult
    }
  }
  ${FragmentBroadcastOnChainResult}
`;
export type CreateSetProfileImageUriViaDispatcherMutationFn = Apollo.MutationFunction<
  CreateSetProfileImageUriViaDispatcherData,
  CreateSetProfileImageUriViaDispatcherVariables
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
    CreateSetProfileImageUriViaDispatcherData,
    CreateSetProfileImageUriViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSetProfileImageUriViaDispatcherData,
    CreateSetProfileImageUriViaDispatcherVariables
  >(CreateSetProfileImageUriViaDispatcherDocument, options);
}
export type CreateSetProfileImageUriViaDispatcherHookResult = ReturnType<
  typeof useCreateSetProfileImageUriViaDispatcher
>;
export type CreateSetProfileImageUriViaDispatcherMutationResult =
  Apollo.MutationResult<CreateSetProfileImageUriViaDispatcherData>;
export type CreateSetProfileImageUriViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  CreateSetProfileImageUriViaDispatcherData,
  CreateSetProfileImageUriViaDispatcherVariables
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
        message: value {
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
  CreateSetProfileMetadataTypedDataData,
  CreateSetProfileMetadataTypedDataVariables
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
    CreateSetProfileMetadataTypedDataData,
    CreateSetProfileMetadataTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSetProfileMetadataTypedDataData,
    CreateSetProfileMetadataTypedDataVariables
  >(CreateSetProfileMetadataTypedDataDocument, options);
}
export type CreateSetProfileMetadataTypedDataHookResult = ReturnType<
  typeof useCreateSetProfileMetadataTypedData
>;
export type CreateSetProfileMetadataTypedDataMutationResult =
  Apollo.MutationResult<CreateSetProfileMetadataTypedDataData>;
export type CreateSetProfileMetadataTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateSetProfileMetadataTypedDataData,
  CreateSetProfileMetadataTypedDataVariables
>;
export const CreateSetProfileMetadataViaDispatcherDocument = /*#__PURE__*/ gql`
  mutation CreateSetProfileMetadataViaDispatcher(
    $request: CreatePublicSetProfileMetadataURIRequest!
  ) {
    result: createSetProfileMetadataViaDispatcher(request: $request) {
      ...BroadcastOnChainResult
    }
  }
  ${FragmentBroadcastOnChainResult}
`;
export type CreateSetProfileMetadataViaDispatcherMutationFn = Apollo.MutationFunction<
  CreateSetProfileMetadataViaDispatcherData,
  CreateSetProfileMetadataViaDispatcherVariables
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
    CreateSetProfileMetadataViaDispatcherData,
    CreateSetProfileMetadataViaDispatcherVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSetProfileMetadataViaDispatcherData,
    CreateSetProfileMetadataViaDispatcherVariables
  >(CreateSetProfileMetadataViaDispatcherDocument, options);
}
export type CreateSetProfileMetadataViaDispatcherHookResult = ReturnType<
  typeof useCreateSetProfileMetadataViaDispatcher
>;
export type CreateSetProfileMetadataViaDispatcherMutationResult =
  Apollo.MutationResult<CreateSetProfileMetadataViaDispatcherData>;
export type CreateSetProfileMetadataViaDispatcherMutationOptions = Apollo.BaseMutationOptions<
  CreateSetProfileMetadataViaDispatcherData,
  CreateSetProfileMetadataViaDispatcherVariables
>;
export const ProfileFollowersDocument = /*#__PURE__*/ gql`
  query ProfileFollowers(
    $profileId: ProfileId!
    $limit: LimitScalar!
    $cursor: Cursor
    $observerId: ProfileId
    $sources: [Sources!]!
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
  ) {
    result: followers(request: { profileId: $profileId, limit: $limit, cursor: $cursor }) {
      items {
        ...Follower
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentFollower}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useProfileFollowers(
  baseOptions: Apollo.QueryHookOptions<ProfileFollowersData, ProfileFollowersVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileFollowersData, ProfileFollowersVariables>(
    ProfileFollowersDocument,
    options,
  );
}
export function useProfileFollowersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfileFollowersData, ProfileFollowersVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileFollowersData, ProfileFollowersVariables>(
    ProfileFollowersDocument,
    options,
  );
}
export type ProfileFollowersHookResult = ReturnType<typeof useProfileFollowers>;
export type ProfileFollowersLazyQueryHookResult = ReturnType<typeof useProfileFollowersLazyQuery>;
export type ProfileFollowersQueryResult = Apollo.QueryResult<
  ProfileFollowersData,
  ProfileFollowersVariables
>;
export const ProfileFollowingDocument = /*#__PURE__*/ gql`
  query ProfileFollowing(
    $walletAddress: EthereumAddress!
    $limit: LimitScalar!
    $cursor: Cursor
    $observerId: ProfileId
    $sources: [Sources!]!
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
  ) {
    result: following(request: { address: $walletAddress, limit: $limit, cursor: $cursor }) {
      items {
        ...Following
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentFollowing}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useProfileFollowing(
  baseOptions: Apollo.QueryHookOptions<ProfileFollowingData, ProfileFollowingVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileFollowingData, ProfileFollowingVariables>(
    ProfileFollowingDocument,
    options,
  );
}
export function useProfileFollowingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfileFollowingData, ProfileFollowingVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileFollowingData, ProfileFollowingVariables>(
    ProfileFollowingDocument,
    options,
  );
}
export type ProfileFollowingHookResult = ReturnType<typeof useProfileFollowing>;
export type ProfileFollowingLazyQueryHookResult = ReturnType<typeof useProfileFollowingLazyQuery>;
export type ProfileFollowingQueryResult = Apollo.QueryResult<
  ProfileFollowingData,
  ProfileFollowingVariables
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
  baseOptions: Apollo.QueryHookOptions<ProxyActionStatusData, ProxyActionStatusVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProxyActionStatusData, ProxyActionStatusVariables>(
    ProxyActionStatusDocument,
    options,
  );
}
export function useProxyActionStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProxyActionStatusData, ProxyActionStatusVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProxyActionStatusData, ProxyActionStatusVariables>(
    ProxyActionStatusDocument,
    options,
  );
}
export type ProxyActionStatusHookResult = ReturnType<typeof useProxyActionStatus>;
export type ProxyActionStatusLazyQueryHookResult = ReturnType<typeof useProxyActionStatusLazyQuery>;
export type ProxyActionStatusQueryResult = Apollo.QueryResult<
  ProxyActionStatusData,
  ProxyActionStatusVariables
>;
export const ProxyActionDocument = /*#__PURE__*/ gql`
  mutation ProxyAction($request: ProxyActionRequest!) {
    result: proxyAction(request: $request)
  }
`;
export type ProxyActionMutationFn = Apollo.MutationFunction<ProxyActionData, ProxyActionVariables>;

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
  baseOptions?: Apollo.MutationHookOptions<ProxyActionData, ProxyActionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ProxyActionData, ProxyActionVariables>(ProxyActionDocument, options);
}
export type ProxyActionHookResult = ReturnType<typeof useProxyAction>;
export type ProxyActionMutationResult = Apollo.MutationResult<ProxyActionData>;
export type ProxyActionMutationOptions = Apollo.BaseMutationOptions<
  ProxyActionData,
  ProxyActionVariables
>;
export const GetPublicationDocument = /*#__PURE__*/ gql`
  query GetPublication(
    $request: PublicationQueryRequest!
    $observerId: ProfileId
    $sources: [Sources!]!
    $mediaTransformPublicationSmall: MediaTransformParams = {}
    $mediaTransformPublicationMedium: MediaTransformParams = {}
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
    }
  }
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
`;

/**
 * __useGetPublication__
 *
 * To run a query within a React component, call `useGetPublication` and pass it any options that fit your needs.
 * When your component renders, `useGetPublication` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublication({
 *   variables: {
 *      request: // value for 'request'
 *      observerId: // value for 'observerId'
 *      sources: // value for 'sources'
 *      mediaTransformPublicationSmall: // value for 'mediaTransformPublicationSmall'
 *      mediaTransformPublicationMedium: // value for 'mediaTransformPublicationMedium'
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useGetPublication(
  baseOptions: Apollo.QueryHookOptions<GetPublicationData, GetPublicationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPublicationData, GetPublicationVariables>(
    GetPublicationDocument,
    options,
  );
}
export function useGetPublicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPublicationData, GetPublicationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPublicationData, GetPublicationVariables>(
    GetPublicationDocument,
    options,
  );
}
export type GetPublicationHookResult = ReturnType<typeof useGetPublication>;
export type GetPublicationLazyQueryHookResult = ReturnType<typeof useGetPublicationLazyQuery>;
export type GetPublicationQueryResult = Apollo.QueryResult<
  GetPublicationData,
  GetPublicationVariables
>;
export const HidePublicationDocument = /*#__PURE__*/ gql`
  mutation HidePublication($publicationId: InternalPublicationId!) {
    hidePublication(request: { publicationId: $publicationId })
  }
`;
export type HidePublicationMutationFn = Apollo.MutationFunction<
  HidePublicationData,
  HidePublicationVariables
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
  baseOptions?: Apollo.MutationHookOptions<HidePublicationData, HidePublicationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<HidePublicationData, HidePublicationVariables>(
    HidePublicationDocument,
    options,
  );
}
export type HidePublicationHookResult = ReturnType<typeof useHidePublication>;
export type HidePublicationMutationResult = Apollo.MutationResult<HidePublicationData>;
export type HidePublicationMutationOptions = Apollo.BaseMutationOptions<
  HidePublicationData,
  HidePublicationVariables
>;
export const GetPublicationsDocument = /*#__PURE__*/ gql`
  query GetPublications(
    $profileId: ProfileId
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $publicationTypes: [PublicationTypes!]
    $sources: [Sources!]!
    $metadata: PublicationMetadataFilters
    $commentsOf: InternalPublicationId
    $walletAddress: EthereumAddress
    $mediaTransformPublicationSmall: MediaTransformParams = {}
    $mediaTransformPublicationMedium: MediaTransformParams = {}
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
  ) {
    result: publications(
      request: {
        profileId: $profileId
        limit: $limit
        collectedBy: $walletAddress
        cursor: $cursor
        publicationTypes: $publicationTypes
        commentsOf: $commentsOf
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
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
  ${FragmentPaginatedResultInfo}
`;

/**
 * __useGetPublications__
 *
 * To run a query within a React component, call `useGetPublications` and pass it any options that fit your needs.
 * When your component renders, `useGetPublications` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublications({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      publicationTypes: // value for 'publicationTypes'
 *      sources: // value for 'sources'
 *      metadata: // value for 'metadata'
 *      commentsOf: // value for 'commentsOf'
 *      walletAddress: // value for 'walletAddress'
 *      mediaTransformPublicationSmall: // value for 'mediaTransformPublicationSmall'
 *      mediaTransformPublicationMedium: // value for 'mediaTransformPublicationMedium'
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useGetPublications(
  baseOptions: Apollo.QueryHookOptions<GetPublicationsData, GetPublicationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPublicationsData, GetPublicationsVariables>(
    GetPublicationsDocument,
    options,
  );
}
export function useGetPublicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPublicationsData, GetPublicationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPublicationsData, GetPublicationsVariables>(
    GetPublicationsDocument,
    options,
  );
}
export type GetPublicationsHookResult = ReturnType<typeof useGetPublications>;
export type GetPublicationsLazyQueryHookResult = ReturnType<typeof useGetPublicationsLazyQuery>;
export type GetPublicationsQueryResult = Apollo.QueryResult<
  GetPublicationsData,
  GetPublicationsVariables
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
    $mediaTransformPublicationSmall: MediaTransformParams = {}
    $mediaTransformPublicationMedium: MediaTransformParams = {}
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformPublicationSmall: // value for 'mediaTransformPublicationSmall'
 *      mediaTransformPublicationMedium: // value for 'mediaTransformPublicationMedium'
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useExplorePublications(
  baseOptions: Apollo.QueryHookOptions<ExplorePublicationsData, ExplorePublicationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExplorePublicationsData, ExplorePublicationsVariables>(
    ExplorePublicationsDocument,
    options,
  );
}
export function useExplorePublicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExplorePublicationsData, ExplorePublicationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExplorePublicationsData, ExplorePublicationsVariables>(
    ExplorePublicationsDocument,
    options,
  );
}
export type ExplorePublicationsHookResult = ReturnType<typeof useExplorePublications>;
export type ExplorePublicationsLazyQueryHookResult = ReturnType<
  typeof useExplorePublicationsLazyQuery
>;
export type ExplorePublicationsQueryResult = Apollo.QueryResult<
  ExplorePublicationsData,
  ExplorePublicationsVariables
>;
export const WhoCollectedPublicationDocument = /*#__PURE__*/ gql`
  query WhoCollectedPublication(
    $publicationId: InternalPublicationId!
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
  ) {
    result: whoCollectedPublication(
      request: { publicationId: $publicationId, limit: $limit, cursor: $cursor }
    ) {
      items {
        ...Wallet
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentWallet}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useWhoCollectedPublication(
  baseOptions: Apollo.QueryHookOptions<
    WhoCollectedPublicationData,
    WhoCollectedPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WhoCollectedPublicationData, WhoCollectedPublicationVariables>(
    WhoCollectedPublicationDocument,
    options,
  );
}
export function useWhoCollectedPublicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WhoCollectedPublicationData,
    WhoCollectedPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WhoCollectedPublicationData, WhoCollectedPublicationVariables>(
    WhoCollectedPublicationDocument,
    options,
  );
}
export type WhoCollectedPublicationHookResult = ReturnType<typeof useWhoCollectedPublication>;
export type WhoCollectedPublicationLazyQueryHookResult = ReturnType<
  typeof useWhoCollectedPublicationLazyQuery
>;
export type WhoCollectedPublicationQueryResult = Apollo.QueryResult<
  WhoCollectedPublicationData,
  WhoCollectedPublicationVariables
>;
export const ProfilePublicationsForSaleDocument = /*#__PURE__*/ gql`
  query ProfilePublicationsForSale(
    $profileId: ProfileId!
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]!
    $mediaTransformPublicationSmall: MediaTransformParams = {}
    $mediaTransformPublicationMedium: MediaTransformParams = {}
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformPublicationSmall: // value for 'mediaTransformPublicationSmall'
 *      mediaTransformPublicationMedium: // value for 'mediaTransformPublicationMedium'
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useProfilePublicationsForSale(
  baseOptions: Apollo.QueryHookOptions<
    ProfilePublicationsForSaleData,
    ProfilePublicationsForSaleVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfilePublicationsForSaleData, ProfilePublicationsForSaleVariables>(
    ProfilePublicationsForSaleDocument,
    options,
  );
}
export function useProfilePublicationsForSaleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProfilePublicationsForSaleData,
    ProfilePublicationsForSaleVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfilePublicationsForSaleData, ProfilePublicationsForSaleVariables>(
    ProfilePublicationsForSaleDocument,
    options,
  );
}
export type ProfilePublicationsForSaleHookResult = ReturnType<typeof useProfilePublicationsForSale>;
export type ProfilePublicationsForSaleLazyQueryHookResult = ReturnType<
  typeof useProfilePublicationsForSaleLazyQuery
>;
export type ProfilePublicationsForSaleQueryResult = Apollo.QueryResult<
  ProfilePublicationsForSaleData,
  ProfilePublicationsForSaleVariables
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
export type AddReactionMutationFn = Apollo.MutationFunction<AddReactionData, AddReactionVariables>;

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
  baseOptions?: Apollo.MutationHookOptions<AddReactionData, AddReactionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddReactionData, AddReactionVariables>(AddReactionDocument, options);
}
export type AddReactionHookResult = ReturnType<typeof useAddReaction>;
export type AddReactionMutationResult = Apollo.MutationResult<AddReactionData>;
export type AddReactionMutationOptions = Apollo.BaseMutationOptions<
  AddReactionData,
  AddReactionVariables
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
  RemoveReactionData,
  RemoveReactionVariables
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
  baseOptions?: Apollo.MutationHookOptions<RemoveReactionData, RemoveReactionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveReactionData, RemoveReactionVariables>(
    RemoveReactionDocument,
    options,
  );
}
export type RemoveReactionHookResult = ReturnType<typeof useRemoveReaction>;
export type RemoveReactionMutationResult = Apollo.MutationResult<RemoveReactionData>;
export type RemoveReactionMutationOptions = Apollo.BaseMutationOptions<
  RemoveReactionData,
  RemoveReactionVariables
>;
export const WhoReactedPublicationDocument = /*#__PURE__*/ gql`
  query WhoReactedPublication(
    $limit: LimitScalar
    $cursor: Cursor
    $publicationId: InternalPublicationId!
    $observerId: ProfileId
    $sources: [Sources!]!
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
  ) {
    result: whoReactedPublication(
      request: { limit: $limit, cursor: $cursor, publicationId: $publicationId }
    ) {
      items {
        ...WhoReactedResult
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentWhoReactedResult}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useWhoReactedPublication(
  baseOptions: Apollo.QueryHookOptions<WhoReactedPublicationData, WhoReactedPublicationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WhoReactedPublicationData, WhoReactedPublicationVariables>(
    WhoReactedPublicationDocument,
    options,
  );
}
export function useWhoReactedPublicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WhoReactedPublicationData,
    WhoReactedPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WhoReactedPublicationData, WhoReactedPublicationVariables>(
    WhoReactedPublicationDocument,
    options,
  );
}
export type WhoReactedPublicationHookResult = ReturnType<typeof useWhoReactedPublication>;
export type WhoReactedPublicationLazyQueryHookResult = ReturnType<
  typeof useWhoReactedPublicationLazyQuery
>;
export type WhoReactedPublicationQueryResult = Apollo.QueryResult<
  WhoReactedPublicationData,
  WhoReactedPublicationVariables
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
  ReportPublicationData,
  ReportPublicationVariables
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
  baseOptions?: Apollo.MutationHookOptions<ReportPublicationData, ReportPublicationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReportPublicationData, ReportPublicationVariables>(
    ReportPublicationDocument,
    options,
  );
}
export type ReportPublicationHookResult = ReturnType<typeof useReportPublication>;
export type ReportPublicationMutationResult = Apollo.MutationResult<ReportPublicationData>;
export type ReportPublicationMutationOptions = Apollo.BaseMutationOptions<
  ReportPublicationData,
  ReportPublicationVariables
>;
export const GetPublicationRevenueDocument = /*#__PURE__*/ gql`
  query GetPublicationRevenue(
    $publicationId: InternalPublicationId!
    $observerId: ProfileId
    $sources: [Sources!]!
    $mediaTransformPublicationSmall: MediaTransformParams = {}
    $mediaTransformPublicationMedium: MediaTransformParams = {}
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
 *      mediaTransformPublicationSmall: // value for 'mediaTransformPublicationSmall'
 *      mediaTransformPublicationMedium: // value for 'mediaTransformPublicationMedium'
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useGetPublicationRevenue(
  baseOptions: Apollo.QueryHookOptions<GetPublicationRevenueData, GetPublicationRevenueVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPublicationRevenueData, GetPublicationRevenueVariables>(
    GetPublicationRevenueDocument,
    options,
  );
}
export function useGetPublicationRevenueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPublicationRevenueData,
    GetPublicationRevenueVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPublicationRevenueData, GetPublicationRevenueVariables>(
    GetPublicationRevenueDocument,
    options,
  );
}
export type GetPublicationRevenueHookResult = ReturnType<typeof useGetPublicationRevenue>;
export type GetPublicationRevenueLazyQueryHookResult = ReturnType<
  typeof useGetPublicationRevenueLazyQuery
>;
export type GetPublicationRevenueQueryResult = Apollo.QueryResult<
  GetPublicationRevenueData,
  GetPublicationRevenueVariables
>;
export const GetProfilePublicationRevenueDocument = /*#__PURE__*/ gql`
  query GetProfilePublicationRevenue(
    $profileId: ProfileId!
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $publicationTypes: [PublicationTypes!]
    $sources: [Sources!]!
    $mediaTransformPublicationSmall: MediaTransformParams = {}
    $mediaTransformPublicationMedium: MediaTransformParams = {}
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentPublicationRevenue}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformPublicationSmall: // value for 'mediaTransformPublicationSmall'
 *      mediaTransformPublicationMedium: // value for 'mediaTransformPublicationMedium'
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useGetProfilePublicationRevenue(
  baseOptions: Apollo.QueryHookOptions<
    GetProfilePublicationRevenueData,
    GetProfilePublicationRevenueVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProfilePublicationRevenueData, GetProfilePublicationRevenueVariables>(
    GetProfilePublicationRevenueDocument,
    options,
  );
}
export function useGetProfilePublicationRevenueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProfilePublicationRevenueData,
    GetProfilePublicationRevenueVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetProfilePublicationRevenueData,
    GetProfilePublicationRevenueVariables
  >(GetProfilePublicationRevenueDocument, options);
}
export type GetProfilePublicationRevenueHookResult = ReturnType<
  typeof useGetProfilePublicationRevenue
>;
export type GetProfilePublicationRevenueLazyQueryHookResult = ReturnType<
  typeof useGetProfilePublicationRevenueLazyQuery
>;
export type GetProfilePublicationRevenueQueryResult = Apollo.QueryResult<
  GetProfilePublicationRevenueData,
  GetProfilePublicationRevenueVariables
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
  baseOptions: Apollo.QueryHookOptions<ProfileFollowRevenueData, ProfileFollowRevenueVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileFollowRevenueData, ProfileFollowRevenueVariables>(
    ProfileFollowRevenueDocument,
    options,
  );
}
export function useProfileFollowRevenueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProfileFollowRevenueData,
    ProfileFollowRevenueVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileFollowRevenueData, ProfileFollowRevenueVariables>(
    ProfileFollowRevenueDocument,
    options,
  );
}
export type ProfileFollowRevenueHookResult = ReturnType<typeof useProfileFollowRevenue>;
export type ProfileFollowRevenueLazyQueryHookResult = ReturnType<
  typeof useProfileFollowRevenueLazyQuery
>;
export type ProfileFollowRevenueQueryResult = Apollo.QueryResult<
  ProfileFollowRevenueData,
  ProfileFollowRevenueVariables
>;
export const SearchPublicationsDocument = /*#__PURE__*/ gql`
  query SearchPublications(
    $limit: LimitScalar
    $cursor: Cursor
    $query: Search!
    $sources: [Sources!]!
    $observerId: ProfileId
    $mediaTransformPublicationSmall: MediaTransformParams = {}
    $mediaTransformPublicationMedium: MediaTransformParams = {}
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
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
          ...PaginatedResultInfo
        }
      }
    }
  }
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformPublicationSmall: // value for 'mediaTransformPublicationSmall'
 *      mediaTransformPublicationMedium: // value for 'mediaTransformPublicationMedium'
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useSearchPublications(
  baseOptions: Apollo.QueryHookOptions<SearchPublicationsData, SearchPublicationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchPublicationsData, SearchPublicationsVariables>(
    SearchPublicationsDocument,
    options,
  );
}
export function useSearchPublicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchPublicationsData, SearchPublicationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchPublicationsData, SearchPublicationsVariables>(
    SearchPublicationsDocument,
    options,
  );
}
export type SearchPublicationsHookResult = ReturnType<typeof useSearchPublications>;
export type SearchPublicationsLazyQueryHookResult = ReturnType<
  typeof useSearchPublicationsLazyQuery
>;
export type SearchPublicationsQueryResult = Apollo.QueryResult<
  SearchPublicationsData,
  SearchPublicationsVariables
>;
export const SearchProfilesDocument = /*#__PURE__*/ gql`
  query SearchProfiles(
    $limit: LimitScalar!
    $cursor: Cursor
    $query: Search!
    $observerId: ProfileId
    $sources: [Sources!]!
    $mediaTransformProfileThumbnail: MediaTransformParams = {}
  ) {
    result: search(request: { query: $query, type: PROFILE, limit: $limit, cursor: $cursor }) {
      ... on ProfileSearchResult {
        __typename
        items {
          ...Profile
        }
        pageInfo {
          ...PaginatedResultInfo
        }
      }
    }
  }
  ${FragmentProfile}
  ${FragmentPaginatedResultInfo}
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
 *      mediaTransformProfileThumbnail: // value for 'mediaTransformProfileThumbnail'
 *   },
 * });
 */
export function useSearchProfiles(
  baseOptions: Apollo.QueryHookOptions<SearchProfilesData, SearchProfilesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchProfilesData, SearchProfilesVariables>(
    SearchProfilesDocument,
    options,
  );
}
export function useSearchProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchProfilesData, SearchProfilesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchProfilesData, SearchProfilesVariables>(
    SearchProfilesDocument,
    options,
  );
}
export type SearchProfilesHookResult = ReturnType<typeof useSearchProfiles>;
export type SearchProfilesLazyQueryHookResult = ReturnType<typeof useSearchProfilesLazyQuery>;
export type SearchProfilesQueryResult = Apollo.QueryResult<
  SearchProfilesData,
  SearchProfilesVariables
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
  baseOptions: Apollo.QueryHookOptions<HasTxHashBeenIndexedData, HasTxHashBeenIndexedVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HasTxHashBeenIndexedData, HasTxHashBeenIndexedVariables>(
    HasTxHashBeenIndexedDocument,
    options,
  );
}
export function useHasTxHashBeenIndexedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HasTxHashBeenIndexedData,
    HasTxHashBeenIndexedVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HasTxHashBeenIndexedData, HasTxHashBeenIndexedVariables>(
    HasTxHashBeenIndexedDocument,
    options,
  );
}
export type HasTxHashBeenIndexedHookResult = ReturnType<typeof useHasTxHashBeenIndexed>;
export type HasTxHashBeenIndexedLazyQueryHookResult = ReturnType<
  typeof useHasTxHashBeenIndexedLazyQuery
>;
export type HasTxHashBeenIndexedQueryResult = Apollo.QueryResult<
  HasTxHashBeenIndexedData,
  HasTxHashBeenIndexedVariables
>;
export const BroadcastOnChainDocument = /*#__PURE__*/ gql`
  mutation BroadcastOnChain($request: BroadcastRequest!) {
    result: broadcast(request: $request) {
      ...BroadcastOnChainResult
    }
  }
  ${FragmentBroadcastOnChainResult}
`;
export type BroadcastOnChainMutationFn = Apollo.MutationFunction<
  BroadcastOnChainData,
  BroadcastOnChainVariables
>;

/**
 * __useBroadcastOnChain__
 *
 * To run a mutation, you first call `useBroadcastOnChain` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBroadcastOnChain` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [broadcastOnChain, { data, loading, error }] = useBroadcastOnChain({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBroadcastOnChain(
  baseOptions?: Apollo.MutationHookOptions<BroadcastOnChainData, BroadcastOnChainVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BroadcastOnChainData, BroadcastOnChainVariables>(
    BroadcastOnChainDocument,
    options,
  );
}
export type BroadcastOnChainHookResult = ReturnType<typeof useBroadcastOnChain>;
export type BroadcastOnChainMutationResult = Apollo.MutationResult<BroadcastOnChainData>;
export type BroadcastOnChainMutationOptions = Apollo.BaseMutationOptions<
  BroadcastOnChainData,
  BroadcastOnChainVariables
>;
export const BroadcastOffChainDocument = /*#__PURE__*/ gql`
  mutation BroadcastOffChain($request: BroadcastRequest!) {
    result: broadcastDataAvailability(request: $request) {
      ...BroadcastOffChainResult
    }
  }
  ${FragmentBroadcastOffChainResult}
`;
export type BroadcastOffChainMutationFn = Apollo.MutationFunction<
  BroadcastOffChainData,
  BroadcastOffChainVariables
>;

/**
 * __useBroadcastOffChain__
 *
 * To run a mutation, you first call `useBroadcastOffChain` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBroadcastOffChain` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [broadcastOffChain, { data, loading, error }] = useBroadcastOffChain({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBroadcastOffChain(
  baseOptions?: Apollo.MutationHookOptions<BroadcastOffChainData, BroadcastOffChainVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BroadcastOffChainData, BroadcastOffChainVariables>(
    BroadcastOffChainDocument,
    options,
  );
}
export type BroadcastOffChainHookResult = ReturnType<typeof useBroadcastOffChain>;
export type BroadcastOffChainMutationResult = Apollo.MutationResult<BroadcastOffChainData>;
export type BroadcastOffChainMutationOptions = Apollo.BaseMutationOptions<
  BroadcastOffChainData,
  BroadcastOffChainVariables
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
        message: value {
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
  CreateUnfollowTypedDataData,
  CreateUnfollowTypedDataVariables
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
    CreateUnfollowTypedDataData,
    CreateUnfollowTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUnfollowTypedDataData, CreateUnfollowTypedDataVariables>(
    CreateUnfollowTypedDataDocument,
    options,
  );
}
export type CreateUnfollowTypedDataHookResult = ReturnType<typeof useCreateUnfollowTypedData>;
export type CreateUnfollowTypedDataMutationResult =
  Apollo.MutationResult<CreateUnfollowTypedDataData>;
export type CreateUnfollowTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateUnfollowTypedDataData,
  CreateUnfollowTypedDataVariables
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
  | 'bookmarked'
  | 'canComment'
  | 'canDecrypt'
  | 'canMirror'
  | 'collectModule'
  | 'collectNftAddress'
  | 'collectPolicy'
  | 'collectedBy'
  | 'commentOn'
  | 'contentInsight'
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
  | 'isMirroredByMe'
  | 'isOptimisticMirroredByMe'
  | 'mainPost'
  | 'metadata'
  | 'mirrors'
  | 'notInterested'
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
  bookmarked?: FieldPolicy<any> | FieldReadFunction<any>;
  canComment?: FieldPolicy<any> | FieldReadFunction<any>;
  canDecrypt?: FieldPolicy<any> | FieldReadFunction<any>;
  canMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  collectPolicy?: FieldPolicy<any> | FieldReadFunction<any>;
  collectedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  commentOn?: FieldPolicy<any> | FieldReadFunction<any>;
  contentInsight?: FieldPolicy<any> | FieldReadFunction<any>;
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
  isMirroredByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  isOptimisticMirroredByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  mainPost?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  notInterested?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type DataAvailabilityCommentKeySpecifier = (
  | 'appId'
  | 'commentedOnProfile'
  | 'commentedOnPublicationId'
  | 'createdAt'
  | 'profile'
  | 'publicationId'
  | 'submitter'
  | 'transactionId'
  | 'verificationStatus'
  | DataAvailabilityCommentKeySpecifier
)[];
export type DataAvailabilityCommentFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  commentedOnProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  commentedOnPublicationId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationId?: FieldPolicy<any> | FieldReadFunction<any>;
  submitter?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionId?: FieldPolicy<any> | FieldReadFunction<any>;
  verificationStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DataAvailabilityMirrorKeySpecifier = (
  | 'appId'
  | 'createdAt'
  | 'mirrorOfProfile'
  | 'mirrorOfPublicationId'
  | 'profile'
  | 'publicationId'
  | 'submitter'
  | 'transactionId'
  | 'verificationStatus'
  | DataAvailabilityMirrorKeySpecifier
)[];
export type DataAvailabilityMirrorFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorOfProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorOfPublicationId?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationId?: FieldPolicy<any> | FieldReadFunction<any>;
  submitter?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionId?: FieldPolicy<any> | FieldReadFunction<any>;
  verificationStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DataAvailabilityPostKeySpecifier = (
  | 'appId'
  | 'createdAt'
  | 'profile'
  | 'publicationId'
  | 'submitter'
  | 'transactionId'
  | 'verificationStatus'
  | DataAvailabilityPostKeySpecifier
)[];
export type DataAvailabilityPostFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationId?: FieldPolicy<any> | FieldReadFunction<any>;
  submitter?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionId?: FieldPolicy<any> | FieldReadFunction<any>;
  verificationStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DataAvailabilitySubmitterResultKeySpecifier = (
  | 'address'
  | 'name'
  | 'totalTransactions'
  | DataAvailabilitySubmitterResultKeySpecifier
)[];
export type DataAvailabilitySubmitterResultFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  totalTransactions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DataAvailabilitySubmittersResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | DataAvailabilitySubmittersResultKeySpecifier
)[];
export type DataAvailabilitySubmittersResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DataAvailabilitySummaryResultKeySpecifier = (
  | 'totalTransactions'
  | DataAvailabilitySummaryResultKeySpecifier
)[];
export type DataAvailabilitySummaryResultFieldPolicy = {
  totalTransactions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DataAvailabilityTransactionsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | DataAvailabilityTransactionsResultKeySpecifier
)[];
export type DataAvailabilityTransactionsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DataAvailabilityVerificationStatusFailureKeySpecifier = (
  | 'status'
  | DataAvailabilityVerificationStatusFailureKeySpecifier
)[];
export type DataAvailabilityVerificationStatusFailureFieldPolicy = {
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DataAvailabilityVerificationStatusSuccessKeySpecifier = (
  | 'verified'
  | DataAvailabilityVerificationStatusSuccessKeySpecifier
)[];
export type DataAvailabilityVerificationStatusSuccessFieldPolicy = {
  verified?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type DispatcherKeySpecifier = (
  | 'address'
  | 'canUseRelay'
  | 'sponsor'
  | DispatcherKeySpecifier
)[];
export type DispatcherFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  canUseRelay?: FieldPolicy<any> | FieldReadFunction<any>;
  sponsor?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type InternalPinResultKeySpecifier = (
  | 'ipfs'
  | 'referenceItem'
  | InternalPinResultKeySpecifier
)[];
export type InternalPinResultFieldPolicy = {
  ipfs?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceItem?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InvitedResultKeySpecifier = ('address' | 'when' | InvitedResultKeySpecifier)[];
export type InvitedResultFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  when?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type MediaSetKeySpecifier = (
  | 'medium'
  | 'onChain'
  | 'optimized'
  | 'original'
  | 'small'
  | 'transformed'
  | MediaSetKeySpecifier
)[];
export type MediaSetFieldPolicy = {
  medium?: FieldPolicy<any> | FieldReadFunction<any>;
  onChain?: FieldPolicy<any> | FieldReadFunction<any>;
  optimized?: FieldPolicy<any> | FieldReadFunction<any>;
  original?: FieldPolicy<any> | FieldReadFunction<any>;
  small?: FieldPolicy<any> | FieldReadFunction<any>;
  transformed?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'bookmarked'
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
  | 'notInterested'
  | 'onChainContentURI'
  | 'profile'
  | 'reaction'
  | 'referenceModule'
  | 'stats'
  | MirrorKeySpecifier
)[];
export type MirrorFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  bookmarked?: FieldPolicy<any> | FieldReadFunction<any>;
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
  notInterested?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type ModuleFeeKeySpecifier = (
  | 'amount'
  | 'recipient'
  | 'referralFee'
  | ModuleFeeKeySpecifier
)[];
export type ModuleFeeFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'addPublicationProfileBookmark'
  | 'addPublicationProfileNotInterested'
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
  | 'dss'
  | 'gci'
  | 'gcr'
  | 'gdi'
  | 'hel'
  | 'hidePublication'
  | 'idKitPhoneVerifyWebhook'
  | 'in'
  | 'invite'
  | 'nni'
  | 'nnv'
  | 'proxyAction'
  | 'refresh'
  | 'removeProfileInterests'
  | 'removePublicationProfileBookmark'
  | 'removePublicationProfileNotInterested'
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
  addPublicationProfileBookmark?: FieldPolicy<any> | FieldReadFunction<any>;
  addPublicationProfileNotInterested?: FieldPolicy<any> | FieldReadFunction<any>;
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
  dss?: FieldPolicy<any> | FieldReadFunction<any>;
  gci?: FieldPolicy<any> | FieldReadFunction<any>;
  gcr?: FieldPolicy<any> | FieldReadFunction<any>;
  gdi?: FieldPolicy<any> | FieldReadFunction<any>;
  hel?: FieldPolicy<any> | FieldReadFunction<any>;
  hidePublication?: FieldPolicy<any> | FieldReadFunction<any>;
  idKitPhoneVerifyWebhook?: FieldPolicy<any> | FieldReadFunction<any>;
  in?: FieldPolicy<any> | FieldReadFunction<any>;
  invite?: FieldPolicy<any> | FieldReadFunction<any>;
  nni?: FieldPolicy<any> | FieldReadFunction<any>;
  nnv?: FieldPolicy<any> | FieldReadFunction<any>;
  proxyAction?: FieldPolicy<any> | FieldReadFunction<any>;
  refresh?: FieldPolicy<any> | FieldReadFunction<any>;
  removeProfileInterests?: FieldPolicy<any> | FieldReadFunction<any>;
  removePublicationProfileBookmark?: FieldPolicy<any> | FieldReadFunction<any>;
  removePublicationProfileNotInterested?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type PaginatedForYouResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedForYouResultKeySpecifier
)[];
export type PaginatedForYouResultFieldPolicy = {
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
  | 'beforeCount'
  | 'moreAfter'
  | 'next'
  | 'prev'
  | 'totalCount'
  | PaginatedResultInfoKeySpecifier
)[];
export type PaginatedResultInfoFieldPolicy = {
  beforeCount?: FieldPolicy<any> | FieldReadFunction<any>;
  moreAfter?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'bookmarked'
  | 'canComment'
  | 'canDecrypt'
  | 'canMirror'
  | 'collectModule'
  | 'collectNftAddress'
  | 'collectPolicy'
  | 'collectedBy'
  | 'contentInsight'
  | 'createdAt'
  | 'dataAvailabilityProofs'
  | 'decryptionCriteria'
  | 'hasCollectedByMe'
  | 'hasOptimisticCollectedByMe'
  | 'hidden'
  | 'id'
  | 'isDataAvailability'
  | 'isGated'
  | 'isMirroredByMe'
  | 'isOptimisticMirroredByMe'
  | 'metadata'
  | 'mirrors'
  | 'notInterested'
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
  bookmarked?: FieldPolicy<any> | FieldReadFunction<any>;
  canComment?: FieldPolicy<any> | FieldReadFunction<any>;
  canDecrypt?: FieldPolicy<any> | FieldReadFunction<any>;
  canMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  collectPolicy?: FieldPolicy<any> | FieldReadFunction<any>;
  collectedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  contentInsight?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilityProofs?: FieldPolicy<any> | FieldReadFunction<any>;
  decryptionCriteria?: FieldPolicy<any> | FieldReadFunction<any>;
  hasCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hasOptimisticCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isDataAvailability?: FieldPolicy<any> | FieldReadFunction<any>;
  isGated?: FieldPolicy<any> | FieldReadFunction<any>;
  isMirroredByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  isOptimisticMirroredByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  notInterested?: FieldPolicy<any> | FieldReadFunction<any>;
  onChainContentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referencePolicy?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PrfResponseKeySpecifier = ('dd' | 'ss' | PrfResponseKeySpecifier)[];
export type PrfResponseFieldPolicy = {
  dd?: FieldPolicy<any> | FieldReadFunction<any>;
  ss?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'invitedBy'
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
  invitedBy?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type ProfileGuardianResultKeySpecifier = (
  | 'disablingProtectionTimestamp'
  | 'protected'
  | ProfileGuardianResultKeySpecifier
)[];
export type ProfileGuardianResultFieldPolicy = {
  disablingProtectionTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  protected?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'totalBookmarks'
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
  totalBookmarks?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'alreadyInvited'
  | 'approvedModuleAllowanceAmount'
  | 'challenge'
  | 'claimableHandles'
  | 'claimableStatus'
  | 'cur'
  | 'dataAvailabilitySubmitters'
  | 'dataAvailabilitySummary'
  | 'dataAvailabilityTransaction'
  | 'dataAvailabilityTransactions'
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
  | 'forYou'
  | 'gct'
  | 'gdm'
  | 'generateModuleCurrencyApprovalData'
  | 'globalProtocolStats'
  | 'hasTxHashBeenIndexed'
  | 'internalPin'
  | 'intotal'
  | 'invited'
  | 'invitesLeft'
  | 'isIDKitPhoneVerified'
  | 'iss'
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
  | 'profileGuardianInformation'
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
  | 'publicationsProfileBookmarks'
  | 'recommendedProfiles'
  | 'rel'
  | 'relayQueues'
  | 'search'
  | 'searchNfts'
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
  alreadyInvited?: FieldPolicy<any> | FieldReadFunction<any>;
  approvedModuleAllowanceAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  challenge?: FieldPolicy<any> | FieldReadFunction<any>;
  claimableHandles?: FieldPolicy<any> | FieldReadFunction<any>;
  claimableStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  cur?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilitySubmitters?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilitySummary?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilityTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilityTransactions?: FieldPolicy<any> | FieldReadFunction<any>;
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
  forYou?: FieldPolicy<any> | FieldReadFunction<any>;
  gct?: FieldPolicy<any> | FieldReadFunction<any>;
  gdm?: FieldPolicy<any> | FieldReadFunction<any>;
  generateModuleCurrencyApprovalData?: FieldPolicy<any> | FieldReadFunction<any>;
  globalProtocolStats?: FieldPolicy<any> | FieldReadFunction<any>;
  hasTxHashBeenIndexed?: FieldPolicy<any> | FieldReadFunction<any>;
  internalPin?: FieldPolicy<any> | FieldReadFunction<any>;
  intotal?: FieldPolicy<any> | FieldReadFunction<any>;
  invited?: FieldPolicy<any> | FieldReadFunction<any>;
  invitesLeft?: FieldPolicy<any> | FieldReadFunction<any>;
  isIDKitPhoneVerified?: FieldPolicy<any> | FieldReadFunction<any>;
  iss?: FieldPolicy<any> | FieldReadFunction<any>;
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
  profileGuardianInformation?: FieldPolicy<any> | FieldReadFunction<any>;
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
  publicationsProfileBookmarks?: FieldPolicy<any> | FieldReadFunction<any>;
  recommendedProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  rel?: FieldPolicy<any> | FieldReadFunction<any>;
  relayQueues?: FieldPolicy<any> | FieldReadFunction<any>;
  search?: FieldPolicy<any> | FieldReadFunction<any>;
  searchNfts?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type RelayQueueResultKeySpecifier = (
  | 'address'
  | 'queue'
  | 'relayer'
  | RelayQueueResultKeySpecifier
)[];
export type RelayQueueResultFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  queue?: FieldPolicy<any> | FieldReadFunction<any>;
  relayer?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type SimpleCollectModuleSettingsKeySpecifier = (
  | 'collectLimit'
  | 'contractAddress'
  | 'endTimestamp'
  | 'fee'
  | 'followerOnly'
  | 'type'
  | SimpleCollectModuleSettingsKeySpecifier
)[];
export type SimpleCollectModuleSettingsFieldPolicy = {
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  endTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  fee?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SubscriptionKeySpecifier = (
  | 'newDataAvailabilityTransaction'
  | SubscriptionKeySpecifier
)[];
export type SubscriptionFieldPolicy = {
  newDataAvailabilityTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
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
  DataAvailabilityComment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DataAvailabilityCommentKeySpecifier
      | (() => undefined | DataAvailabilityCommentKeySpecifier);
    fields?: DataAvailabilityCommentFieldPolicy;
  };
  DataAvailabilityMirror?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DataAvailabilityMirrorKeySpecifier
      | (() => undefined | DataAvailabilityMirrorKeySpecifier);
    fields?: DataAvailabilityMirrorFieldPolicy;
  };
  DataAvailabilityPost?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DataAvailabilityPostKeySpecifier
      | (() => undefined | DataAvailabilityPostKeySpecifier);
    fields?: DataAvailabilityPostFieldPolicy;
  };
  DataAvailabilitySubmitterResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DataAvailabilitySubmitterResultKeySpecifier
      | (() => undefined | DataAvailabilitySubmitterResultKeySpecifier);
    fields?: DataAvailabilitySubmitterResultFieldPolicy;
  };
  DataAvailabilitySubmittersResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DataAvailabilitySubmittersResultKeySpecifier
      | (() => undefined | DataAvailabilitySubmittersResultKeySpecifier);
    fields?: DataAvailabilitySubmittersResultFieldPolicy;
  };
  DataAvailabilitySummaryResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DataAvailabilitySummaryResultKeySpecifier
      | (() => undefined | DataAvailabilitySummaryResultKeySpecifier);
    fields?: DataAvailabilitySummaryResultFieldPolicy;
  };
  DataAvailabilityTransactionsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DataAvailabilityTransactionsResultKeySpecifier
      | (() => undefined | DataAvailabilityTransactionsResultKeySpecifier);
    fields?: DataAvailabilityTransactionsResultFieldPolicy;
  };
  DataAvailabilityVerificationStatusFailure?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DataAvailabilityVerificationStatusFailureKeySpecifier
      | (() => undefined | DataAvailabilityVerificationStatusFailureKeySpecifier);
    fields?: DataAvailabilityVerificationStatusFailureFieldPolicy;
  };
  DataAvailabilityVerificationStatusSuccess?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DataAvailabilityVerificationStatusSuccessKeySpecifier
      | (() => undefined | DataAvailabilityVerificationStatusSuccessKeySpecifier);
    fields?: DataAvailabilityVerificationStatusSuccessFieldPolicy;
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
  InternalPinResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | InternalPinResultKeySpecifier
      | (() => undefined | InternalPinResultKeySpecifier);
    fields?: InternalPinResultFieldPolicy;
  };
  InvitedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | InvitedResultKeySpecifier | (() => undefined | InvitedResultKeySpecifier);
    fields?: InvitedResultFieldPolicy;
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
  ModuleFee?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ModuleFeeKeySpecifier | (() => undefined | ModuleFeeKeySpecifier);
    fields?: ModuleFeeFieldPolicy;
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
  PaginatedForYouResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedForYouResultKeySpecifier
      | (() => undefined | PaginatedForYouResultKeySpecifier);
    fields?: PaginatedForYouResultFieldPolicy;
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
  PrfResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PrfResponseKeySpecifier | (() => undefined | PrfResponseKeySpecifier);
    fields?: PrfResponseFieldPolicy;
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
  ProfileGuardianResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileGuardianResultKeySpecifier
      | (() => undefined | ProfileGuardianResultKeySpecifier);
    fields?: ProfileGuardianResultFieldPolicy;
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
  RelayQueueResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RelayQueueResultKeySpecifier
      | (() => undefined | RelayQueueResultKeySpecifier);
    fields?: RelayQueueResultFieldPolicy;
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
  SimpleCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SimpleCollectModuleSettingsKeySpecifier
      | (() => undefined | SimpleCollectModuleSettingsKeySpecifier);
    fields?: SimpleCollectModuleSettingsFieldPolicy;
  };
  Subscription?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier);
    fields?: SubscriptionFieldPolicy;
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
      'SimpleCollectModuleSettings',
      'TimedFeeCollectModuleSettings',
      'UnknownCollectModuleSettings',
    ],
    DataAvailabilityTransactionUnion: [
      'DataAvailabilityComment',
      'DataAvailabilityMirror',
      'DataAvailabilityPost',
    ],
    DataAvailabilityVerificationStatusUnion: [
      'DataAvailabilityVerificationStatusFailure',
      'DataAvailabilityVerificationStatusSuccess',
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
