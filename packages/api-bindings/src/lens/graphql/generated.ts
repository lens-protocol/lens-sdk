/** Code generated. DO NOT EDIT. */
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-imports */
/* eslint-disable tsdoc/syntax */
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import type { AppId, ProfileId, PublicationId } from '@lens-protocol/domain/entities';
import type { EvmAddress, Url } from '@lens-protocol/shared-kernel';
import gql from 'graphql-tag';

import type { ContentEncryptionKey } from '../ContentEncryptionKey';
import type { Cursor } from '../Cursor';
import type { ImageSizeTransform } from '../ImageSizeTransform';
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
  /** The app id */
  AppId: AppId;
  /** Blockchain data */
  BlockchainData: string;
  /** The broadcast id */
  BroadcastId: string;
  /** The chain id */
  ChainId: number;
  /** The challenge id */
  ChallengeId: string;
  /** The content encryption key value */
  ContentEncryptionKey: ContentEncryptionKey;
  /** Create handle value */
  CreateHandle: string;
  /** Cursor custom scalar type */
  Cursor: Cursor;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string;
  /** An ISO-8610 DateTime that could also be encrypted in some circumstances. Check parent nodes to determine if the value is encrypted or ready to use. */
  EncryptableDateTime: string;
  /** A Markdown text that could also be encrypted in some circumstances. Check parent nodes to determine if the value is encrypted or ready to use. */
  EncryptableMarkdown: string;
  /** A string that could also be encrypted in some circumstances. Check parent nodes to determine if the value is encrypted or ready to use. */
  EncryptableString: string;
  /** The tx hash that could also be encrypted in some circumstances. Check parent nodes to determine if the value is encrypted or ready to use. */
  EncryptableTxHash: string;
  /** A URI value that could also be encrypted in some circumstances. Check parent nodes to determine if the value is encrypted or ready to use. */
  EncryptableURI: string;
  /** Define a path of a possibly encrypted property in the Publication Metadata */
  EncryptedPath: string;
  /** The ens name */
  Ens: string;
  /** evm address type */
  EvmAddress: EvmAddress;
  /** The handle attached to a profile - note its it own NFT and always identified by its full name */
  Handle: string;
  /** The image size transform */
  ImageSizeTransform: ImageSizeTransform;
  /** The jwt token */
  Jwt: string;
  /** The locale */
  Locale: string;
  /** The markdown value */
  Markdown: string;
  /** Mimetype type */
  MimeType: string;
  /** The momoke id */
  MomokaId: string;
  /** The momoke proof */
  MomokaProof: string;
  /** Nft gallery id type */
  NftGalleryId: string;
  /** Nft gallery name type */
  NftGalleryName: string;
  /** The nonce value */
  Nonce: number;
  /** The onchain publication id */
  OnchainPublicationId: string;
  /** The Poap Event id */
  PoapEventId: string;
  /** ProfileId custom scalar type */
  ProfileId: ProfileId;
  /** Publication id */
  PublicationId: PublicationId;
  /** The signature value */
  Signature: string;
  /** The NFT token id */
  TokenId: string;
  /** The tx hash */
  TxHash: string;
  /** The tx id */
  TxId: string;
  /** The URI value not this can be used in it can be a https OR different aka ar:// and ipfs://  */
  URI: string;
  /** The url value */
  URL: Url;
  /** The guid uuid value */
  UUID: string;
  /** The unix timestamp */
  UnixTimestamp: number;
  /** Represents NULL values */
  Void: void;
};

export type ActOnOpenActionInput = {
  multirecipientCollectOpenAction?: InputMaybe<Scalars['Boolean']>;
  simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionActRedeemInput>;
};

/** The lens manager will only support FREE open action modules, if you want your unknown module allowed to be signless please contact us */
export type ActOnOpenActionLensManagerInput = {
  simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionActRedeemInput>;
};

export type ActOnOpenActionLensManagerRequest = {
  actOn: ActOnOpenActionLensManagerInput;
  for?: InputMaybe<Scalars['PublicationId']>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type ActOnOpenActionRequest = {
  actOn: ActOnOpenActionInput;
  for: Scalars['PublicationId'];
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type AlreadyInvitedCheckRequest = {
  for: Scalars['EvmAddress'];
};

export type AmountInput = {
  /** The currency */
  currency: Scalars['EvmAddress'];
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String'];
};

export type ApprovedModuleAllowanceAmountRequest = {
  currencies: Array<Scalars['EvmAddress']>;
  followModules?: InputMaybe<Array<FollowModuleType>>;
  openActionModules?: InputMaybe<Array<OpenActionModuleType>>;
  referenceModules?: InputMaybe<Array<ReferenceModuleType>>;
  unknownFollowModules?: InputMaybe<Array<Scalars['EvmAddress']>>;
  unknownOpenActionModules?: InputMaybe<Array<Scalars['EvmAddress']>>;
  unknownReferenceModules?: InputMaybe<Array<Scalars['EvmAddress']>>;
};

export type BlockRequest = {
  profiles: Array<Scalars['ProfileId']>;
};

export type BroadcastRequest = {
  id: Scalars['BroadcastId'];
  signature: Scalars['Signature'];
};

export type ChallengeRequest = {
  /** The profile ID to initiate a challenge */
  for: Scalars['ProfileId'];
  /** The Ethereum address that will sign the challenge */
  signedBy: Scalars['EvmAddress'];
};

export type ChangeProfileManager = {
  action: ChangeProfileManagerActionType;
  address: Scalars['EvmAddress'];
};

export enum ChangeProfileManagerActionType {
  Add = 'ADD',
  Remove = 'REMOVE',
}

export type ChangeProfileManagersRequest = {
  approveLensManager?: InputMaybe<Scalars['Boolean']>;
  changeManagers?: InputMaybe<Array<ChangeProfileManager>>;
};

export type ClaimProfileRequest = {
  followModule?: InputMaybe<FollowModuleInput>;
  freeTextHandle?: InputMaybe<Scalars['CreateHandle']>;
  id: Scalars['String'];
};

export enum ClaimProfileStatusType {
  AlreadyClaimed = 'ALREADY_CLAIMED',
  ClaimFailed = 'CLAIM_FAILED',
  NotClaimed = 'NOT_CLAIMED',
}

export type CollectActionModuleInput = {
  multirecipientCollectOpenAction?: InputMaybe<MultirecipientFeeCollectModuleInput>;
  simpleCollectOpenAction?: InputMaybe<SimpleCollectOpenActionModuleInput>;
};

export enum CollectOpenActionModuleType {
  LegacyAaveFeeCollectModule = 'LegacyAaveFeeCollectModule',
  LegacyErc4626FeeCollectModule = 'LegacyERC4626FeeCollectModule',
  LegacyFeeCollectModule = 'LegacyFeeCollectModule',
  LegacyFreeCollectModule = 'LegacyFreeCollectModule',
  LegacyLimitedFeeCollectModule = 'LegacyLimitedFeeCollectModule',
  LegacyLimitedTimedFeeCollectModule = 'LegacyLimitedTimedFeeCollectModule',
  LegacyMultirecipientFeeCollectModule = 'LegacyMultirecipientFeeCollectModule',
  LegacyRevertCollectModule = 'LegacyRevertCollectModule',
  LegacySimpleCollectModule = 'LegacySimpleCollectModule',
  LegacyTimedFeeCollectModule = 'LegacyTimedFeeCollectModule',
  MultirecipientFeeCollectOpenActionModule = 'MultirecipientFeeCollectOpenActionModule',
  SimpleCollectOpenActionModule = 'SimpleCollectOpenActionModule',
  UnknownOpenActionModule = 'UnknownOpenActionModule',
}

export enum CommentRankingFilterType {
  NoneRelevant = 'NONE_RELEVANT',
  Relevant = 'RELEVANT',
}

export enum ComparisonOperatorConditionType {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  NotEqual = 'NOT_EQUAL',
}

export enum CreateProfileWithHandleErrorReasonType {
  Failed = 'FAILED',
  HandleTaken = 'HANDLE_TAKEN',
}

export type CreateProfileWithHandleRequest = {
  followModule?: InputMaybe<FollowModuleInput>;
  handle: Scalars['CreateHandle'];
  to: Scalars['EvmAddress'];
};

export enum CustomFiltersType {
  Gardeners = 'GARDENERS',
}

export enum DecryptFailReasonType {
  CanNotDecrypt = 'CAN_NOT_DECRYPT',
  CollectNotFinalisedOnChain = 'COLLECT_NOT_FINALISED_ON_CHAIN',
  DoesNotFollowProfile = 'DOES_NOT_FOLLOW_PROFILE',
  DoesNotOwnNft = 'DOES_NOT_OWN_NFT',
  DoesNotOwnProfile = 'DOES_NOT_OWN_PROFILE',
  FollowNotFinalisedOnChain = 'FOLLOW_NOT_FINALISED_ON_CHAIN',
  HasNotCollectedPublication = 'HAS_NOT_COLLECTED_PUBLICATION',
  MissingEncryptionParams = 'MISSING_ENCRYPTION_PARAMS',
  NotLoggedIn = 'NOT_LOGGED_IN',
  ProfileDoesNotExist = 'PROFILE_DOES_NOT_EXIST',
  PublicationIsNotGated = 'PUBLICATION_IS_NOT_GATED',
  UnauthorizedAddress = 'UNAUTHORIZED_ADDRESS',
  UnauthorizedBalance = 'UNAUTHORIZED_BALANCE',
}

export type DegreesOfSeparationReferenceModuleInput = {
  commentsRestricted: Scalars['Boolean'];
  degreesOfSeparation: Scalars['Int'];
  mirrorsRestricted: Scalars['Boolean'];
  quotesRestricted: Scalars['Boolean'];
};

export type DismissRecommendedProfilesRequest = {
  dismiss: Array<Scalars['ProfileId']>;
};

export type DoesFollowRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  followers: Array<Scalars['ProfileId']>;
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
};

/** Possible sort criteria for exploring profiles */
export enum ExploreProfilesOrderByType {
  CreatedOn = 'CREATED_ON',
  LatestCreated = 'LATEST_CREATED',
  MostCollects = 'MOST_COLLECTS',
  MostComments = 'MOST_COMMENTS',
  MostFollowers = 'MOST_FOLLOWERS',
  MostMirrors = 'MOST_MIRRORS',
  MostPosts = 'MOST_POSTS',
  MostPublication = 'MOST_PUBLICATION',
}

export type ExploreProfilesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  /** Order criteria for exploring profiles */
  orderBy: ExploreProfilesOrderByType;
  /** Filtering criteria for exploring profiles */
  where?: InputMaybe<ExploreProfilesWhere>;
};

export type ExploreProfilesWhere = {
  /** Array of custom filters for exploring profiles */
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  /** Filter profiles created since the specified timestamp */
  since?: InputMaybe<Scalars['UnixTimestamp']>;
};

export type ExplorePublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  orderBy: ExplorePublicationsOrderByType;
  where?: InputMaybe<ExplorePublicationsWhere>;
};

export enum ExplorePublicationType {
  Post = 'POST',
  Quote = 'QUOTE',
}

export enum ExplorePublicationsOrderByType {
  Latest = 'LATEST',
  LensCurated = 'LENS_CURATED',
  TopCollectedOpenAction = 'TOP_COLLECTED_OPEN_ACTION',
  TopCommented = 'TOP_COMMENTED',
  TopMirrored = 'TOP_MIRRORED',
  TopQuoted = 'TOP_QUOTED',
}

export type ExplorePublicationsWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publicationTypes?: InputMaybe<Array<ExplorePublicationType>>;
  since?: InputMaybe<Scalars['UnixTimestamp']>;
};

export type FeeFollowModuleInput = {
  amount: AmountInput;
  recipient: Scalars['EvmAddress'];
};

export enum FeedEventItemType {
  Acted = 'ACTED',
  Collect = 'COLLECT',
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
  Reaction = 'REACTION',
}

export type FeedHighlightWhere = {
  for?: InputMaybe<Scalars['ProfileId']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type FeedHighlightsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<FeedHighlightWhere>;
};

export type FeedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  where?: InputMaybe<FeedWhere>;
};

export type FeedWhere = {
  feedEventItemTypes?: InputMaybe<Array<FeedEventItemType>>;
  for?: InputMaybe<Scalars['ProfileId']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type Follow = {
  followModule?: InputMaybe<FollowModuleRedeemInput>;
  profileId: Scalars['ProfileId'];
};

export type FollowLensManager = {
  followModule?: InputMaybe<FollowLensManagerModuleRedeemInput>;
  profileId: Scalars['ProfileId'];
};

/** The lens manager will only support FREE follow modules, if you want your unknown module allowed to be signless please contact us */
export type FollowLensManagerModuleRedeemInput = {
  unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemInput>;
};

export type FollowLensManagerRequest = {
  follow: Array<FollowLensManager>;
};

export type FollowModuleInput = {
  feeFollowModule?: InputMaybe<FeeFollowModuleInput>;
  freeFollowModule?: InputMaybe<Scalars['Boolean']>;
  revertFollowModule?: InputMaybe<Scalars['Boolean']>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleInput>;
};

export type FollowModuleRedeemInput = {
  feeFollowModule?: InputMaybe<Scalars['Boolean']>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemInput>;
};

export enum FollowModuleType {
  FeeFollowModule = 'FeeFollowModule',
  RevertFollowModule = 'RevertFollowModule',
  UnknownFollowModule = 'UnknownFollowModule',
}

export type FollowRequest = {
  follow: Array<Follow>;
};

export type FollowRevenueRequest = {
  for: Scalars['ProfileId'];
};

export type FollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  of: Scalars['ProfileId'];
};

export type FollowingRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
};

export type FraudReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingFraudSubreason;
};

export type GenerateModuleCurrencyApprovalDataRequest = {
  allowance: AmountInput;
  module: ModuleCurrencyApproval;
};

export type GetProfileMetadataArgs = {
  /** The app id to query the profile's metadata */
  appId?: InputMaybe<Scalars['AppId']>;
  /** If true, will fallback to global profile metadata, if there is no metadata set for that specific app id */
  useFallback?: InputMaybe<Scalars['Boolean']>;
};

export type HandleLinkToProfileRequest = {
  handle: Scalars['Handle'];
};

export type HandleUnlinkFromProfileRequest = {
  handle: Scalars['Handle'];
};

export type HidePublicationRequest = {
  for: Scalars['PublicationId'];
};

export type IdKitPhoneVerifyWebhookRequest = {
  sharedSecret: Scalars['String'];
  worldcoin?: InputMaybe<WorldcoinPhoneVerifyWebhookRequest>;
};

export enum IdKitPhoneVerifyWebhookResultStatusType {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Success = 'SUCCESS',
}

export type IllegalReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingIllegalSubreason;
};

export type ImageTransform = {
  /** Set the transformed image's height */
  height?: InputMaybe<Scalars['ImageSizeTransform']>;
  /** Set if you want to keep the image's original aspect ratio. True by default. If explicitly set to false, the image will stretch based on the width and height values. */
  keepAspectRatio?: InputMaybe<Scalars['Boolean']>;
  /** Set the transformed image's width */
  width?: InputMaybe<Scalars['ImageSizeTransform']>;
};

export type InviteRequest = {
  invites: Array<Scalars['EvmAddress']>;
  secret: Scalars['String'];
};

export type LegacyCollectRequest = {
  on: Scalars['PublicationId'];
  referrer?: InputMaybe<Scalars['PublicationId']>;
};

export enum LensProfileManagerRelayErrorReasonType {
  AppGaslessNotAllowed = 'APP_GASLESS_NOT_ALLOWED',
  Failed = 'FAILED',
  NoLensManagerEnabled = 'NO_LENS_MANAGER_ENABLED',
  RateLimited = 'RATE_LIMITED',
  RequiresSignature = 'REQUIRES_SIGNATURE',
}

export enum LensTransactionFailureType {
  MetadataError = 'METADATA_ERROR',
  Reverted = 'REVERTED',
}

export type LensTransactionStatusRequest = {
  /** Transaction hash for retrieving transaction status */
  forTxHash?: InputMaybe<Scalars['TxHash']>;
  /** Transaction ID for retrieving transaction status when using the broadcaster */
  forTxId?: InputMaybe<Scalars['TxId']>;
};

export enum LensTransactionStatusType {
  Complete = 'COMPLETE',
  Failed = 'FAILED',
  OptimisticallyUpdated = 'OPTIMISTICALLY_UPDATED',
  Processing = 'PROCESSING',
}

export enum LimitType {
  Fifty = 'Fifty',
  Ten = 'Ten',
  TwentyFive = 'TwentyFive',
}

export enum MarketplaceMetadataAttributeDisplayType {
  Date = 'DATE',
  Number = 'NUMBER',
  String = 'STRING',
}

export type ModuleCurrencyApproval = {
  followModule?: InputMaybe<FollowModuleType>;
  openActionModule?: InputMaybe<OpenActionModuleType>;
  referenceModule?: InputMaybe<ReferenceModuleType>;
  unknownFollowModule?: InputMaybe<Scalars['EvmAddress']>;
  unknownOpenActionModule?: InputMaybe<Scalars['EvmAddress']>;
  unknownReferenceModule?: InputMaybe<Scalars['EvmAddress']>;
};

export type MomokaCommentRequest = {
  commentOn: Scalars['PublicationId'];
  contentURI: Scalars['URI'];
};

export type MomokaMirrorRequest = {
  mirrorOn: Scalars['PublicationId'];
};

export type MomokaPostRequest = {
  contentURI: Scalars['URI'];
};

export type MomokaQuoteRequest = {
  contentURI: Scalars['URI'];
  quoteOn: Scalars['PublicationId'];
};

export type MomokaTransactionRequest = {
  /** The momoka transaction id or internal publication id */
  for: Scalars['String'];
};

export type MomokaTransactionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for?: InputMaybe<Scalars['ProfileId']>;
  limit?: InputMaybe<LimitType>;
};

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

export type MultirecipientFeeCollectModuleInput = {
  amount: AmountInput;
  collectLimit?: InputMaybe<Scalars['String']>;
  endsAt?: InputMaybe<Scalars['DateTime']>;
  followerOnly: Scalars['Boolean'];
  recipients: Array<RecipientDataInput>;
  referralFee?: InputMaybe<Scalars['Float']>;
};

export type MutualFollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  observer: Scalars['ProfileId'];
  viewing: Scalars['ProfileId'];
};

/** Mutual NFT collections request */
export type MutualNftCollectionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  /** Profile id of the first user */
  observer: Scalars['ProfileId'];
  /** Profile id of the second user */
  viewing: Scalars['ProfileId'];
};

export type MutualPoapsQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  observer: Scalars['ProfileId'];
  viewing: Scalars['ProfileId'];
};

export type NetworkAddressInput = {
  address: Scalars['EvmAddress'];
  chainId: Scalars['ChainId'];
};

export enum NftCollectionOwnersOrder {
  FollowersFirst = 'FollowersFirst',
  None = 'None',
}

/** NFT collection owners request */
export type NftCollectionOwnersRequest = {
  /** The profile id to use when ordering by followers */
  by?: InputMaybe<Scalars['ProfileId']>;
  /** The chain id */
  chainId: Scalars['ChainId'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The contract address */
  for: Scalars['EvmAddress'];
  limit?: InputMaybe<LimitType>;
  /** The ordering of Nft collection owners */
  order?: InputMaybe<NftCollectionOwnersOrder>;
};

/** NFT collections request */
export type NftCollectionsRequest = {
  /** The chain ids to look for NFTs on. Ethereum and Polygon are supported. If omitted, it will look on both chains by default. */
  chainIds?: InputMaybe<Array<Scalars['ChainId']>>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** Exclude Lens Follower NFTs */
  excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  for?: InputMaybe<Scalars['ProfileId']>;
  /** Filter by owner address */
  forAddress?: InputMaybe<Scalars['EvmAddress']>;
  limit?: InputMaybe<LimitType>;
};

export enum NftContractType {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
}

export type NftGalleriesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
};

export type NftGalleryCreateRequest = {
  items: Array<NftInput>;
  name: Scalars['NftGalleryName'];
};

export type NftGalleryDeleteRequest = {
  galleryId: Scalars['NftGalleryId'];
};

export type NftGalleryUpdateInfoRequest = {
  galleryId: Scalars['NftGalleryId'];
  name: Scalars['NftGalleryName'];
};

export type NftGalleryUpdateItemOrderRequest = {
  galleryId: Scalars['NftGalleryId'];
  updates?: InputMaybe<Array<NftUpdateItemOrder>>;
};

export type NftGalleryUpdateItemsRequest = {
  galleryId: Scalars['NftGalleryId'];
  toAdd?: InputMaybe<Array<NftInput>>;
  toRemove?: InputMaybe<Array<NftInput>>;
};

export type NftInput = {
  contract: NetworkAddressInput;
  tokenId: Scalars['TokenId'];
};

export type NftOwnershipChallengeRequest = {
  for: Scalars['EvmAddress'];
  nfts: Array<NftInput>;
};

export type NftUpdateItemOrder = {
  contract: NetworkAddressInput;
  newOrder: Scalars['Int'];
  tokenId: Scalars['TokenId'];
};

export type NftsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<NftsRequestWhere>;
};

export type NftsRequestWhere = {
  /** Chain IDs to search. Supports Ethereum and Polygon. If omitted, it will search in both chains */
  chainIds?: InputMaybe<Array<Scalars['ChainId']>>;
  excludeCollections?: InputMaybe<Array<NetworkAddressInput>>;
  /** Exclude follower NFTs from the search */
  excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  /** Ethereum address of the owner. If unknown you can also search by profile ID */
  forAddress?: InputMaybe<Scalars['EvmAddress']>;
  /** Profile ID of the owner */
  forProfileId?: InputMaybe<Scalars['ProfileId']>;
  includeCollections?: InputMaybe<Array<NetworkAddressInput>>;
  /** Search query. Has to be part of a collection name */
  query?: InputMaybe<Scalars['String']>;
};

export type NotificationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  where?: InputMaybe<NotificationWhere>;
};

export type NotificationSubscriptionRequest = {
  for: Scalars['ProfileId'];
};

export enum NotificationType {
  Acted = 'ACTED',
  Commented = 'COMMENTED',
  Followed = 'FOLLOWED',
  Mentioned = 'MENTIONED',
  Mirrored = 'MIRRORED',
  Quoted = 'QUOTED',
  Reacted = 'REACTED',
}

export type NotificationWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  highSignalFilter?: InputMaybe<Scalars['Boolean']>;
  notificationTypes?: InputMaybe<Array<NotificationType>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']>>;
};

export type OnchainCommentRequest = {
  commentOn: Scalars['PublicationId'];
  commentOnReferenceModuleData?: InputMaybe<Scalars['BlockchainData']>;
  contentURI: Scalars['URI'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainMirrorRequest = {
  /** You can add information like app on a mirror or tracking stuff */
  metadataURI?: InputMaybe<Scalars['URI']>;
  mirrorOn: Scalars['PublicationId'];
  mirrorReferenceModuleData?: InputMaybe<Scalars['BlockchainData']>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainPostRequest = {
  contentURI: Scalars['URI'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
};

export type OnchainQuoteRequest = {
  contentURI: Scalars['URI'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  quoteOn: Scalars['PublicationId'];
  quoteOnReferenceModuleData?: InputMaybe<Scalars['BlockchainData']>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainReferrer = {
  profileId?: InputMaybe<Scalars['ProfileId']>;
  publicationId?: InputMaybe<Scalars['PublicationId']>;
};

export type OnchainSetProfileMetadataRequest = {
  metadataURI: Scalars['URI'];
};

export enum OpenActionCategoryType {
  Collect = 'COLLECT',
}

export type OpenActionFilter = {
  address?: InputMaybe<Scalars['EvmAddress']>;
  category?: InputMaybe<OpenActionCategoryType>;
  type?: InputMaybe<OpenActionModuleType>;
};

export type OpenActionModuleInput = {
  collectOpenAction?: InputMaybe<CollectActionModuleInput>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionModuleInput>;
};

export enum OpenActionModuleType {
  LegacyAaveFeeCollectModule = 'LegacyAaveFeeCollectModule',
  LegacyErc4626FeeCollectModule = 'LegacyERC4626FeeCollectModule',
  LegacyFeeCollectModule = 'LegacyFeeCollectModule',
  LegacyFreeCollectModule = 'LegacyFreeCollectModule',
  LegacyLimitedFeeCollectModule = 'LegacyLimitedFeeCollectModule',
  LegacyLimitedTimedFeeCollectModule = 'LegacyLimitedTimedFeeCollectModule',
  LegacyMultirecipientFeeCollectModule = 'LegacyMultirecipientFeeCollectModule',
  LegacyRevertCollectModule = 'LegacyRevertCollectModule',
  LegacySimpleCollectModule = 'LegacySimpleCollectModule',
  LegacyTimedFeeCollectModule = 'LegacyTimedFeeCollectModule',
  MultirecipientFeeCollectOpenActionModule = 'MultirecipientFeeCollectOpenActionModule',
  SimpleCollectOpenActionModule = 'SimpleCollectOpenActionModule',
  UnknownOpenActionModule = 'UnknownOpenActionModule',
}

export type OwnedHandlesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The Ethereum address for which to retrieve owned handles */
  for: Scalars['EvmAddress'];
  limit?: InputMaybe<LimitType>;
};

/** Pagination with Offset fields  */
export type PaginatedOffsetRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
};

export type PoapEventQueryRequest = {
  eventId: Scalars['PoapEventId'];
};

export type PoapHoldersQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  eventId: Scalars['PoapEventId'];
  limit?: InputMaybe<LimitType>;
};

export enum PoapTokenLayerType {
  Layer1 = 'Layer1',
  Layer2 = 'Layer2',
}

export enum PopularNftCollectionsOrder {
  TotalLensProfileOwners = 'TotalLensProfileOwners',
  TotalOwners = 'TotalOwners',
}

/** Popular NFT collections request */
export type PopularNftCollectionsRequest = {
  /** The chain ids to look for NFTs on. Ethereum and Polygon are supported. If omitted, it will look on both chains by default. */
  chainIds?: InputMaybe<Array<Scalars['ChainId']>>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** Exclude Lens Follower NFTs */
  excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<LimitType>;
  /** Include only verified collections */
  onlyVerified?: InputMaybe<Scalars['Boolean']>;
  /** The ordering of Nft collection owners. Defaults to Total Lens Profile owners */
  orderBy?: InputMaybe<PopularNftCollectionsOrder>;
};

export type ProfileActionHistoryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
};

/** Profile action history type */
export enum ProfileActionHistoryType {
  Acted = 'ACTED',
  Blocked = 'BLOCKED',
  Collected = 'COLLECTED',
  Comment = 'COMMENT',
  Follow = 'FOLLOW',
  LinkHandle = 'LINK_HANDLE',
  LoggedIn = 'LOGGED_IN',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
  RefreshAuthToken = 'REFRESH_AUTH_TOKEN',
  SetProfileMetadata = 'SET_PROFILE_METADATA',
  SetProfileModule = 'SET_PROFILE_MODULE',
  Unblocked = 'UNBLOCKED',
  Unfollow = 'UNFOLLOW',
  UnlinkHandle = 'UNLINK_HANDLE',
}

/** Profile interests types */
export enum ProfileInterestTypes {
  ArtEntertainment = 'ART_ENTERTAINMENT',
  ArtEntertainmentAnime = 'ART_ENTERTAINMENT__ANIME',
  ArtEntertainmentArt = 'ART_ENTERTAINMENT__ART',
  ArtEntertainmentBooks = 'ART_ENTERTAINMENT__BOOKS',
  ArtEntertainmentDesign = 'ART_ENTERTAINMENT__DESIGN',
  ArtEntertainmentFashion = 'ART_ENTERTAINMENT__FASHION',
  ArtEntertainmentFilmTv = 'ART_ENTERTAINMENT__FILM_TV',
  ArtEntertainmentMemes = 'ART_ENTERTAINMENT__MEMES',
  ArtEntertainmentMusic = 'ART_ENTERTAINMENT__MUSIC',
  ArtEntertainmentPhotography = 'ART_ENTERTAINMENT__PHOTOGRAPHY',
  Business = 'BUSINESS',
  BusinessCreatorEconomy = 'BUSINESS__CREATOR_ECONOMY',
  BusinessFinance = 'BUSINESS__FINANCE',
  BusinessMarketing = 'BUSINESS__MARKETING',
  Career = 'CAREER',
  Crypto = 'CRYPTO',
  CryptoBitcoin = 'CRYPTO__BITCOIN',
  CryptoDaos = 'CRYPTO__DAOS',
  CryptoDefi = 'CRYPTO__DEFI',
  CryptoEthereum = 'CRYPTO__ETHEREUM',
  CryptoGm = 'CRYPTO__GM',
  CryptoGovernance = 'CRYPTO__GOVERNANCE',
  CryptoL1 = 'CRYPTO__L1',
  CryptoL2 = 'CRYPTO__L2',
  CryptoMetaverse = 'CRYPTO__METAVERSE',
  CryptoNft = 'CRYPTO__NFT',
  CryptoRekt = 'CRYPTO__REKT',
  CryptoScaling = 'CRYPTO__SCALING',
  CryptoWeb3 = 'CRYPTO__WEB3',
  CryptoWeb3Social = 'CRYPTO__WEB3_SOCIAL',
  Education = 'EDUCATION',
  FamilyParenting = 'FAMILY_PARENTING',
  FoodDrink = 'FOOD_DRINK',
  FoodDrinkBeer = 'FOOD_DRINK__BEER',
  FoodDrinkCocktails = 'FOOD_DRINK__COCKTAILS',
  FoodDrinkCooking = 'FOOD_DRINK__COOKING',
  FoodDrinkRestaurants = 'FOOD_DRINK__RESTAURANTS',
  FoodDrinkWine = 'FOOD_DRINK__WINE',
  HealthFitness = 'HEALTH_FITNESS',
  HealthFitnessBiohacking = 'HEALTH_FITNESS__BIOHACKING',
  HealthFitnessExercise = 'HEALTH_FITNESS__EXERCISE',
  HobbiesInterests = 'HOBBIES_INTERESTS',
  HobbiesInterestsArtsCrafts = 'HOBBIES_INTERESTS__ARTS_CRAFTS',
  HobbiesInterestsCars = 'HOBBIES_INTERESTS__CARS',
  HobbiesInterestsCollecting = 'HOBBIES_INTERESTS__COLLECTING',
  HobbiesInterestsGaming = 'HOBBIES_INTERESTS__GAMING',
  HobbiesInterestsSports = 'HOBBIES_INTERESTS__SPORTS',
  HobbiesInterestsTravel = 'HOBBIES_INTERESTS__TRAVEL',
  HomeGarden = 'HOME_GARDEN',
  HomeGardenAnimals = 'HOME_GARDEN__ANIMALS',
  HomeGardenGardening = 'HOME_GARDEN__GARDENING',
  HomeGardenHomeImprovement = 'HOME_GARDEN__HOME_IMPROVEMENT',
  HomeGardenNature = 'HOME_GARDEN__NATURE',
  LawGovernmentPolitics = 'LAW_GOVERNMENT_POLITICS',
  LawGovernmentPoliticsRegulation = 'LAW_GOVERNMENT_POLITICS__REGULATION',
  Lens = 'LENS',
  News = 'NEWS',
  Nsfw = 'NSFW',
  Technology = 'TECHNOLOGY',
  TechnologyAiMl = 'TECHNOLOGY__AI_ML',
  TechnologyBiotech = 'TECHNOLOGY__BIOTECH',
  TechnologyProgramming = 'TECHNOLOGY__PROGRAMMING',
  TechnologyScience = 'TECHNOLOGY__SCIENCE',
  TechnologyTools = 'TECHNOLOGY__TOOLS',
}

export type ProfileInterestsRequest = {
  interests: Array<ProfileInterestTypes>;
};

export type ProfileManagersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The profile ID for which to retrieve managers */
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
};

export type ProfileRecommendationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** Disable machine learning recommendations (default: false) */
  disableML?: InputMaybe<Scalars['Boolean']>;
  /** Filter based on a specific profile ID */
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
  /** Shuffle the recommendations (default: false) */
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type ProfileRequest = {
  /** The handle for profile you want to fetch */
  forHandle?: InputMaybe<Scalars['Handle']>;
  /** The profile you want to fetch */
  forProfileId?: InputMaybe<Scalars['ProfileId']>;
};

export type ProfileSearchRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  /** Query for the profile search */
  query: Scalars['String'];
  /** Filtering criteria for profile search */
  where?: InputMaybe<ProfileSearchWhere>;
};

export type ProfileSearchWhere = {
  /** Array of custom filters for profile search */
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
};

export type ProfileStatsArg = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  forApps?: InputMaybe<Array<Scalars['AppId']>>;
};

export type ProfileStatsCountOpenActionArgs = {
  anyOf?: InputMaybe<Array<OpenActionFilter>>;
};

export type ProfileStatsReactionArgs = {
  type: PublicationReactionType;
};

export type ProfilesManagedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The Ethereum address for which to retrieve managed profiles */
  for: Scalars['EvmAddress'];
  includeOwned?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<LimitType>;
};

export type ProfilesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  /** The where clause to use to filter on what you are looking for */
  where: ProfilesRequestWhere;
};

export type ProfilesRequestWhere = {
  /** Pass in an array of handles to get the profile entities */
  handles?: InputMaybe<Array<Scalars['Handle']>>;
  /** Pass in an array of evm address to get the profile entities they own */
  ownedBy?: InputMaybe<Array<Scalars['EvmAddress']>>;
  /** Pass in an array of profile ids to get the profile entities */
  profileIds?: InputMaybe<Array<Scalars['ProfileId']>>;
  /** Pass the publication id and get a list of the profiles who commented on it */
  whoCommentedOn?: InputMaybe<Scalars['PublicationId']>;
  /** Pass the publication id and get a list of the profiles who mirrored it */
  whoMirroredPublication?: InputMaybe<Scalars['PublicationId']>;
  /** Pass the publication id and get a list of the profiles who quoted it */
  whoQuotedPublication?: InputMaybe<Scalars['PublicationId']>;
};

export type PublicationBookmarkRequest = {
  on: Scalars['PublicationId'];
};

export type PublicationBookmarksRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<PublicationBookmarksWhere>;
};

export type PublicationBookmarksWhere = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type PublicationCommentOn = {
  commentsRankingFilter?: InputMaybe<CommentRankingFilterType>;
  id: Scalars['PublicationId'];
};

export enum PublicationContentWarningType {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER',
}

export type PublicationMetadataContentWarningFilter = {
  oneOf: Array<PublicationContentWarningType>;
};

export type PublicationMetadataFilters = {
  contentWarning?: InputMaybe<PublicationMetadataContentWarningFilter>;
  locale?: InputMaybe<Scalars['Locale']>;
  mainContentFocus?: InputMaybe<Array<PublicationMetadataMainFocusType>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']>>;
  tags?: InputMaybe<PublicationMetadataTagsFilter>;
};

export enum PublicationMetadataLicenseType {
  Cco = 'CCO',
  CcBy = 'CC_BY',
  CcByNc = 'CC_BY_NC',
  CcByNd = 'CC_BY_ND',
  TbnlCDtsaNplLedger = 'TBNL_C_DTSA_NPL_Ledger',
  TbnlCDtsaNplLegal = 'TBNL_C_DTSA_NPL_Legal',
  TbnlCDtsaPlLedger = 'TBNL_C_DTSA_PL_Ledger',
  TbnlCDtsaPlLegal = 'TBNL_C_DTSA_PL_Legal',
  TbnlCDtNplLedger = 'TBNL_C_DT_NPL_Ledger',
  TbnlCDtNplLegal = 'TBNL_C_DT_NPL_Legal',
  TbnlCDtPlLedger = 'TBNL_C_DT_PL_Ledger',
  TbnlCDtPlLegal = 'TBNL_C_DT_PL_Legal',
  TbnlCDNplLedger = 'TBNL_C_D_NPL_Ledger',
  TbnlCDNplLegal = 'TBNL_C_D_NPL_Legal',
  TbnlCDPlLedger = 'TBNL_C_D_PL_Ledger',
  TbnlCDPlLegal = 'TBNL_C_D_PL_Legal',
  TbnlCNdNplLedger = 'TBNL_C_ND_NPL_Ledger',
  TbnlCNdNplLegal = 'TBNL_C_ND_NPL_Legal',
  TbnlCNdPlLedger = 'TBNL_C_ND_PL_Ledger',
  TbnlCNdPlLegal = 'TBNL_C_ND_PL_Legal',
  TbnlNcDtsaNplLedger = 'TBNL_NC_DTSA_NPL_Ledger',
  TbnlNcDtsaNplLegal = 'TBNL_NC_DTSA_NPL_Legal',
  TbnlNcDtsaPlLedger = 'TBNL_NC_DTSA_PL_Ledger',
  TbnlNcDtsaPlLegal = 'TBNL_NC_DTSA_PL_Legal',
  TbnlNcDtNplLedger = 'TBNL_NC_DT_NPL_Ledger',
  TbnlNcDtNplLegal = 'TBNL_NC_DT_NPL_Legal',
  TbnlNcDtPlLedger = 'TBNL_NC_DT_PL_Ledger',
  TbnlNcDtPlLegal = 'TBNL_NC_DT_PL_Legal',
  TbnlNcDNplLedger = 'TBNL_NC_D_NPL_Ledger',
  TbnlNcDNplLegal = 'TBNL_NC_D_NPL_Legal',
  TbnlNcDPlLedger = 'TBNL_NC_D_PL_Ledger',
  TbnlNcDPlLegal = 'TBNL_NC_D_PL_Legal',
  TbnlNcNdNplLedger = 'TBNL_NC_ND_NPL_Ledger',
  TbnlNcNdNplLegal = 'TBNL_NC_ND_NPL_Legal',
  TbnlNcNdPlLedger = 'TBNL_NC_ND_PL_Ledger',
  TbnlNcNdPlLegal = 'TBNL_NC_ND_PL_Legal',
}

export enum PublicationMetadataMainFocusType {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  CheckingIn = 'CHECKING_IN',
  Embed = 'EMBED',
  Event = 'EVENT',
  Image = 'IMAGE',
  Link = 'LINK',
  Livestream = 'LIVESTREAM',
  Mint = 'MINT',
  ShortVideo = 'SHORT_VIDEO',
  Space = 'SPACE',
  Story = 'STORY',
  TextOnly = 'TEXT_ONLY',
  ThreeD = 'THREE_D',
  Transaction = 'TRANSACTION',
  Video = 'VIDEO',
}

export type PublicationMetadataTagsFilter = {
  all?: InputMaybe<Array<Scalars['String']>>;
  oneOf?: InputMaybe<Array<Scalars['String']>>;
};

export enum PublicationMetadataTransactionType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Other = 'OTHER',
}

export type PublicationNotInterestedRequest = {
  on: Scalars['PublicationId'];
};

export type PublicationOperationsActedArgs = {
  filter?: InputMaybe<OpenActionFilter>;
};

export type PublicationOperationsReactionArgs = {
  type?: InputMaybe<PublicationReactionType>;
};

export enum PublicationReactionType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE',
}

export enum PublicationReportingFraudSubreason {
  Impersonation = 'IMPERSONATION',
  Scam = 'SCAM',
}

export enum PublicationReportingIllegalSubreason {
  AnimalAbuse = 'ANIMAL_ABUSE',
  DirectThreat = 'DIRECT_THREAT',
  HumanAbuse = 'HUMAN_ABUSE',
  ThreatIndividual = 'THREAT_INDIVIDUAL',
  Violence = 'VIOLENCE',
}

export enum PublicationReportingReason {
  Fraud = 'FRAUD',
  Illegal = 'ILLEGAL',
  Sensitive = 'SENSITIVE',
  Spam = 'SPAM',
}

export enum PublicationReportingSensitiveSubreason {
  Nsfw = 'NSFW',
  Offensive = 'OFFENSIVE',
}

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

export type PublicationRequest = {
  forId?: InputMaybe<Scalars['PublicationId']>;
  forTxHash?: InputMaybe<Scalars['TxHash']>;
};

export type PublicationSearchRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  query: Scalars['String'];
  where?: InputMaybe<PublicationSearchWhere>;
};

export type PublicationSearchWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publicationTypes?: InputMaybe<Array<SearchPublicationType>>;
};

export type PublicationStatsCountOpenActionArgs = {
  anyOf?: InputMaybe<Array<OpenActionFilter>>;
};

export type PublicationStatsInput = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  /** Filter the returned stats on apps and 1 of the following filters: tags, contentWarning, mainContentFocus, locale */
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type PublicationStatsReactionArgs = {
  type: PublicationReactionType;
};

export type PublicationStatsSubscriptionRequest = {
  for: Scalars['PublicationId'];
};

export enum PublicationType {
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
}

export enum PublicationsOrderByType {
  CommentOfQueryRanking = 'COMMENT_OF_QUERY_RANKING',
  Latest = 'LATEST',
}

export type PublicationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  orderBy?: InputMaybe<PublicationsOrderByType>;
  where: PublicationsWhere;
};

export type PublicationsTagsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  orderBy?: InputMaybe<TagSortCriteriaType>;
  where?: InputMaybe<PublicationsTagsWhere>;
};

export type PublicationsTagsWhere = {
  publishedOn?: InputMaybe<Array<Scalars['AppId']>>;
};

export type PublicationsWhere = {
  actedBy?: InputMaybe<Scalars['ProfileId']>;
  commentOn?: InputMaybe<PublicationCommentOn>;
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  from?: InputMaybe<Array<Scalars['ProfileId']>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  mirrorOn?: InputMaybe<Scalars['PublicationId']>;
  publicationIds?: InputMaybe<Array<Scalars['PublicationId']>>;
  publicationTypes?: InputMaybe<Array<PublicationType>>;
  quoteOn?: InputMaybe<Scalars['PublicationId']>;
  withOpenActions?: InputMaybe<Array<OpenActionFilter>>;
};

export type RateRequest = {
  for: SupportedFiatType;
};

export type ReactionRequest = {
  for: Scalars['PublicationId'];
  reaction: PublicationReactionType;
};

export type RecipientDataInput = {
  /** Recipient of collect fees. */
  recipient: Scalars['EvmAddress'];
  /** Split %, should be between 0.01 and 100. Up to 2 decimal points supported. All % should add up to 100 */
  split: Scalars['Float'];
};

export type ReferenceModuleInput = {
  degreesOfSeparationReferenceModule?: InputMaybe<DegreesOfSeparationReferenceModuleInput>;
  followerOnlyReferenceModule?: InputMaybe<Scalars['Boolean']>;
  unknownReferenceModule?: InputMaybe<UnknownReferenceModuleInput>;
};

export enum ReferenceModuleType {
  DegreesOfSeparationReferenceModule = 'DegreesOfSeparationReferenceModule',
  FollowerOnlyReferenceModule = 'FollowerOnlyReferenceModule',
  UnknownReferenceModule = 'UnknownReferenceModule',
}

export type RefreshPublicationMetadataRequest = {
  for: Scalars['PublicationId'];
};

export enum RefreshPublicationMetadataResultType {
  AlreadyPending = 'ALREADY_PENDING',
  Queued = 'QUEUED',
  ValidPublicationNotFound = 'VALID_PUBLICATION_NOT_FOUND',
}

/** The refresh request */
export type RefreshRequest = {
  /** The refresh token */
  refreshToken: Scalars['Jwt'];
};

export enum RelayErrorReasonType {
  AppGaslessNotAllowed = 'APP_GASLESS_NOT_ALLOWED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  RateLimited = 'RATE_LIMITED',
  WrongWalletSigned = 'WRONG_WALLET_SIGNED',
}

export enum RelayRoleKey {
  CreateProfile = 'CREATE_PROFILE',
  LensManager_1 = 'LENS_MANAGER_1',
  LensManager_2 = 'LENS_MANAGER_2',
  LensManager_3 = 'LENS_MANAGER_3',
  LensManager_4 = 'LENS_MANAGER_4',
  LensManager_5 = 'LENS_MANAGER_5',
  LensManager_6 = 'LENS_MANAGER_6',
  LensManager_7 = 'LENS_MANAGER_7',
  LensManager_8 = 'LENS_MANAGER_8',
  LensManager_9 = 'LENS_MANAGER_9',
  LensManager_10 = 'LENS_MANAGER_10',
  LensManager_11 = 'LENS_MANAGER_11',
  LensManager_12 = 'LENS_MANAGER_12',
  LensManager_13 = 'LENS_MANAGER_13',
  LensManager_14 = 'LENS_MANAGER_14',
  LensManager_15 = 'LENS_MANAGER_15',
  LensManager_16 = 'LENS_MANAGER_16',
  LensManager_17 = 'LENS_MANAGER_17',
  LensManager_18 = 'LENS_MANAGER_18',
  LensManager_19 = 'LENS_MANAGER_19',
  LensManager_20 = 'LENS_MANAGER_20',
  WithSig_1 = 'WITH_SIG_1',
  WithSig_2 = 'WITH_SIG_2',
  WithSig_3 = 'WITH_SIG_3',
  WithSig_4 = 'WITH_SIG_4',
  WithSig_5 = 'WITH_SIG_5',
  WithSig_6 = 'WITH_SIG_6',
  WithSig_7 = 'WITH_SIG_7',
  WithSig_8 = 'WITH_SIG_8',
  WithSig_9 = 'WITH_SIG_9',
  WithSig_10 = 'WITH_SIG_10',
}

export type ReportPublicationRequest = {
  additionalComments?: InputMaybe<Scalars['String']>;
  for: Scalars['PublicationId'];
  reason: ReportingReasonInput;
};

export type ReportingReasonInput = {
  fraudReason?: InputMaybe<FraudReasonInput>;
  illegalReason?: InputMaybe<IllegalReasonInput>;
  sensitiveReason?: InputMaybe<SensitiveReasonInput>;
  spamReason?: InputMaybe<SpamReasonInput>;
};

export type RevenueFromPublicationRequest = {
  for: Scalars['PublicationId'];
  /** Will return revenue for publications made on any of the provided app ids. Will include all apps if omitted */
  publishedOn?: InputMaybe<Array<Scalars['AppId']>>;
};

export type RevenueFromPublicationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** The profile to get revenue for */
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
  /** Will return revenue for publications made on any of the provided app ids. Will include all apps if omitted */
  publishedOn?: InputMaybe<Array<Scalars['AppId']>>;
};

export enum SearchPublicationType {
  Comment = 'COMMENT',
  Post = 'POST',
  Quote = 'QUOTE',
}

export type SensitiveReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSensitiveSubreason;
};

export type SetFollowModuleRequest = {
  followModule: FollowModuleInput;
};

/** The signed auth challenge */
export type SignedAuthChallenge = {
  id: Scalars['ChallengeId'];
  /** The signature */
  signature: Scalars['Signature'];
};

export type SimpleCollectOpenActionModuleInput = {
  amount?: InputMaybe<AmountInput>;
  collectLimit?: InputMaybe<Scalars['String']>;
  endsAt?: InputMaybe<Scalars['DateTime']>;
  followerOnly: Scalars['Boolean'];
  recipient?: InputMaybe<Scalars['EvmAddress']>;
  referralFee?: InputMaybe<Scalars['Float']>;
};

export type SpamReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSpamSubreason;
};

export enum SupportedFiatType {
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD',
}

export type SupportedModulesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  includeUnknown?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<LimitType>;
};

export enum TagSortCriteriaType {
  Alphabetical = 'ALPHABETICAL',
  MostPopular = 'MOST_POPULAR',
}

export enum TriStateValue {
  No = 'NO',
  Unknown = 'UNKNOWN',
  Yes = 'YES',
}

export type TypedDataOptions = {
  /** If you wish to override the nonce for the sig if you want to do some clever stuff in the client */
  overrideSigNonce: Scalars['Nonce'];
};

export type UnblockRequest = {
  profiles: Array<Scalars['ProfileId']>;
};

export type UnfollowRequest = {
  unfollow: Array<Scalars['ProfileId']>;
};

export type UnknownFollowModuleInput = {
  address: Scalars['EvmAddress'];
  data: Scalars['BlockchainData'];
};

export type UnknownFollowModuleRedeemInput = {
  address: Scalars['EvmAddress'];
  data: Scalars['BlockchainData'];
};

export type UnknownOpenActionActRedeemInput = {
  address: Scalars['EvmAddress'];
  data: Scalars['BlockchainData'];
};

export type UnknownOpenActionModuleInput = {
  address: Scalars['EvmAddress'];
  data: Scalars['BlockchainData'];
};

export type UnknownReferenceModuleInput = {
  address: Scalars['EvmAddress'];
  data: Scalars['BlockchainData'];
};

export type UserPoapsQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for: Scalars['ProfileId'];
  limit?: InputMaybe<LimitType>;
};

export type ValidatePublicationMetadataRequest = {
  json?: InputMaybe<Scalars['String']>;
  rawURI?: InputMaybe<Scalars['URI']>;
};

export type VerifyRequest = {
  /** The access token to verify */
  accessToken: Scalars['Jwt'];
};

export type WhoActedOnPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
  on: Scalars['PublicationId'];
  where?: InputMaybe<WhoActedOnPublicationWhere>;
};

export type WhoActedOnPublicationWhere = {
  anyOf: Array<OpenActionFilter>;
};

export type WhoHaveBlockedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
};

export type WhoReactedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  for: Scalars['PublicationId'];
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<WhoReactedPublicationWhere>;
};

export type WhoReactedPublicationWhere = {
  anyOf?: InputMaybe<Array<PublicationReactionType>>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<LimitType>;
};

export enum WorldcoinPhoneVerifyType {
  Orb = 'ORB',
  Phone = 'PHONE',
}

export type WorldcoinPhoneVerifyWebhookRequest = {
  nullifierHash: Scalars['String'];
  signal: Scalars['EvmAddress'];
  signalType: WorldcoinPhoneVerifyType;
};

export type AuthChallenge = { id: string; text: string };

export type AuthChallengeVariables = Exact<{
  request: ChallengeRequest;
}>;

export type AuthChallengeData = { result: AuthChallenge };

export type AuthVerifyVariables = Exact<{
  request: VerifyRequest;
}>;

export type AuthVerifyData = { result: boolean };

export type AuthAuthenticateVariables = Exact<{
  request: SignedAuthChallenge;
}>;

export type AuthAuthenticateData = { result: { accessToken: string; refreshToken: string } };

export type AuthRefreshVariables = Exact<{
  request: RefreshRequest;
}>;

export type AuthRefreshData = { result: { accessToken: string; refreshToken: string } };

export type ExplorePublicationsVariables = Exact<{
  request: ExplorePublicationRequest;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type ExplorePublicationsData = {
  result: { items: Array<Post | Quote>; pageInfo: { prev: Cursor | null; next: Cursor | null } };
};

export type ExploreProfilesVariables = Exact<{
  request: ExploreProfilesRequest;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type ExploreProfilesData = {
  result: { items: Array<Profile>; pageInfo: PaginatedResultInfo };
};

export type ReactionEvent = { reaction: PublicationReactionType; createdAt: string; by: Profile };

export type FeedItem = {
  id: string;
  root: Comment | Post | Quote;
  mirrors: Array<Mirror>;
  reactions: Array<ReactionEvent>;
  comments: Array<Comment>;
};

export type FeedVariables = Exact<{
  request: FeedRequest;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type FeedData = { result: { items: Array<FeedItem>; pageInfo: PaginatedResultInfo } };

export type FeedHighlightsVariables = Exact<{
  request: FeedHighlightsRequest;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type FeedHighlightsData = {
  result: { items: Array<Post | Quote>; pageInfo: PaginatedResultInfo };
};

export type OptimisticStatusResult = { value: boolean; isFinalisedOnchain: boolean };

export type Erc20 = { name: string; symbol: string; decimals: number; contract: NetworkAddress };

export type FiatAmount = { value: string; asset: Fiat };

export type Fiat = { name: string; symbol: string; decimals: number };

export type Amount = { value: string; asset: Erc20; rate: FiatAmount | null };

export type FeeFollowModuleSettings = {
  recipient: EvmAddress;
  amount: Amount;
  contract: NetworkAddress;
};

export type RevertFollowModuleSettings = { contract: NetworkAddress };

export type UnknownFollowModuleSettings = {
  followModuleReturnData: string;
  contract: NetworkAddress;
};

export type NetworkAddress = { address: EvmAddress; chainId: number };

export type MetadataBooleanAttribute = {
  __typename: 'MetadataBooleanAttribute';
  key: string;
  value: string;
};

export type MetadataDateAttribute = {
  __typename: 'MetadataDateAttribute';
  key: string;
  value: string;
};

export type MetadataNumberAttribute = {
  __typename: 'MetadataNumberAttribute';
  key: string;
  value: string;
};

export type MetadataJsonAttribute = {
  __typename: 'MetadataJSONAttribute';
  key: string;
  value: string;
};

export type MetadataStringAttribute = {
  __typename: 'MetadataStringAttribute';
  key: string;
  value: string;
};

export type Image = {
  uri: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type ImageSet = { raw: Image; optimized: Image | null; transformed: Image | null };

export type EncryptableImage = {
  uri: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type EncryptableImageSet = { raw: EncryptableImage; optimized: Image | null };

export type Video = { uri: string; mimeType: string | null };

export type EncryptableVideo = { mimeType: string | null; uri: string };

export type EncryptableVideoSet = { raw: EncryptableVideo; optimized: Video | null };

export type Audio = { uri: string; mimeType: string | null };

export type EncryptableAudio = { mimeType: string | null; uri: string };

export type EncryptableAudioSet = { raw: EncryptableAudio; optimized: Audio | null };

export type ProfileCoverSet = { raw: Image; optimized: Image | null; transformed: Image | null };

export type ProfilePictureSet = {
  __typename: 'ImageSet';
  raw: Image;
  optimized: Image | null;
  transformed: Image | null;
};

export type NftImage = {
  __typename: 'NftImage';
  tokenId: string;
  verified: boolean;
  collection: NetworkAddress;
  image: ProfilePictureSet;
};

export type ProfileStats = {
  id: ProfileId;
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

export type Profile = {
  __typename: 'Profile';
  id: ProfileId;
  txHash: string;
  createdAt: string;
  interests: Array<string>;
  invitesLeft: number;
  handle: string | null;
  sponsor: boolean;
  lensManager: boolean;
  ownedBy: NetworkAddress;
  operations: {
    id: ProfileId;
    canBlock: boolean;
    canUnblock: boolean;
    canFollow: TriStateValue;
    canUnfollow: boolean;
    isBlockedByMe: OptimisticStatusResult;
    isFollowedByMe: OptimisticStatusResult;
    isFollowingMe: OptimisticStatusResult;
  };
  guardian: { protected: boolean; cooldownEndsOn: string | null } | null;
  onchainIdentity: {
    proofOfHumanity: boolean;
    ens: { name: string | null } | null;
    sybilDotOrg: { source: { twitter: { handle: string | null } } | null };
    worldcoin: { isHuman: boolean };
  };
  followNftAddress: NetworkAddress | null;
  followModule:
    | FeeFollowModuleSettings
    | RevertFollowModuleSettings
    | UnknownFollowModuleSettings
    | null;
  metadata: {
    appId: AppId | null;
    displayName: string | null;
    bio: string | null;
    rawURI: string;
    picture: ProfilePictureSet | NftImage | null;
    coverPicture: ProfileCoverSet | null;
    attributes: Array<
      | MetadataBooleanAttribute
      | MetadataDateAttribute
      | MetadataJsonAttribute
      | MetadataNumberAttribute
      | MetadataStringAttribute
    > | null;
  } | null;
  invitedBy: { id: ProfileId } | null;
  stats: ProfileStats;
};

export type PaginatedResultInfo = {
  __typename: 'PaginatedResultInfo';
  moreAfter: boolean;
  prev: Cursor | null;
  next: Cursor | null;
};

export type App = { id: AppId };

export type MomokaInfo = { proof: string };

export type FollowOnlyReferenceModuleSettings = { contract: NetworkAddress };

export type DegreesOfSeparationReferenceModuleSettings = {
  commentsRestricted: boolean;
  mirrorsRestricted: boolean;
  degreesOfSeparation: number;
  contract: NetworkAddress;
};

export type UnknownReferenceModuleSettings = {
  referenceModuleReturnData: string;
  contract: NetworkAddress;
};

export type SimpleCollectOpenActionSettings = {
  recipient: EvmAddress;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddress;
  amount: Amount;
};

export type MultirecipientFeeCollectOpenActionSettings = {
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddress;
  amount: Amount;
  recipients: Array<{ recipient: EvmAddress; split: number }>;
};

export type UnknownOpenActionModuleSettings = {
  openActionModuleReturnData: string | null;
  contract: NetworkAddress;
};

export type LegacyFreeCollectModuleSettings = { followerOnly: boolean; contract: NetworkAddress };

export type LegacyFeeCollectModuleSettings = {
  recipient: EvmAddress;
  referralFee: number;
  followerOnly: boolean;
  contract: NetworkAddress;
  amount: Amount;
};

export type LegacyLimitedFeeCollectModuleSettings = {
  collectLimit: string | null;
  recipient: EvmAddress;
  referralFee: number;
  followerOnly: boolean;
  contract: NetworkAddress;
  amount: Amount;
};

export type LegacyLimitedTimedFeeCollectModuleSettings = {
  collectLimit: string | null;
  recipient: EvmAddress;
  referralFee: number;
  followerOnly: boolean;
  endTimestamp: string;
  contract: { address: EvmAddress };
  amount: Amount;
};

export type LegacyRevertCollectModuleSettings = { contract: NetworkAddress };

export type LegacyTimedFeeCollectModuleSettings = {
  recipient: EvmAddress;
  referralFee: number;
  followerOnly: boolean;
  endTimestamp: string;
  contract: NetworkAddress;
  amount: Amount;
};

export type LegacyMultirecipientFeeCollectModuleSettings = {
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddress;
  amount: Amount;
  recipients: Array<{ recipient: EvmAddress; split: number }>;
};

export type LegacySimpleCollectModuleSettings = {
  recipient: EvmAddress;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddress;
  amount: Amount;
};

export type LegacyErc4626FeeCollectModuleSettings = {
  recipient: EvmAddress;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddress;
  vault: NetworkAddress;
  amount: Amount;
};

export type LegacyAaveFeeCollectModuleSettings = {
  recipient: EvmAddress;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddress;
  amount: Amount;
};

export type UnknownOpenActionResult = {
  address: EvmAddress;
  category: OpenActionCategoryType | null;
  initReturnData: string | null;
};

export type KnownCollectOpenActionResult = { type: CollectOpenActionModuleType };

type OpenActionResult_KnownCollectOpenActionResult_ = KnownCollectOpenActionResult;

type OpenActionResult_UnknownOpenActionResult_ = UnknownOpenActionResult;

export type OpenActionResult =
  | OpenActionResult_KnownCollectOpenActionResult_
  | OpenActionResult_UnknownOpenActionResult_;

export type CanDecryptResponse = {
  result: boolean;
  reasons: Array<DecryptFailReasonType> | null;
  extraDetails: string | null;
};

export type PublicationOperations = {
  isNotInterested: boolean;
  hasBookmarked: boolean;
  hasReported: boolean;
  canAct: TriStateValue;
  canComment: TriStateValue;
  canMirror: TriStateValue;
  hasMirrored: boolean;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasActed: OptimisticStatusResult;
  actedOn: Array<
    OpenActionResult_KnownCollectOpenActionResult_ | OpenActionResult_UnknownOpenActionResult_
  >;
  canDecrypt: CanDecryptResponse;
};

export type PublicationMetadataLitEncryption = {
  __typename: 'PublicationMetadataLitEncryption';
  encryptionKey: ContentEncryptionKey;
  encryptedPaths: Array<string>;
  accessCondition: RootCondition;
};

export type NftOwnershipCondition = {
  __typename: 'NftOwnershipCondition';
  contractType: NftContractType;
  tokenIds: Array<string> | null;
  contract: NetworkAddress;
};

export type Erc20OwnershipCondition = {
  __typename: 'Erc20OwnershipCondition';
  condition: ComparisonOperatorConditionType;
  amount: Amount;
};

export type EoaOwnershipCondition = { __typename: 'EoaOwnershipCondition'; address: EvmAddress };

export type ProfileOwnershipCondition = {
  __typename: 'ProfileOwnershipCondition';
  profileId: ProfileId;
};

export type FollowCondition = { __typename: 'FollowCondition'; follow: ProfileId };

export type CollectCondition = {
  __typename: 'CollectCondition';
  publicationId: PublicationId;
  thisPublication: boolean;
};

export type AndCondition = {
  __typename: 'AndCondition';
  criteria: Array<
    | CollectCondition
    | EoaOwnershipCondition
    | Erc20OwnershipCondition
    | FollowCondition
    | NftOwnershipCondition
    | ProfileOwnershipCondition
  >;
};

export type OrCondition = {
  __typename: 'OrCondition';
  criteria: Array<
    | CollectCondition
    | EoaOwnershipCondition
    | Erc20OwnershipCondition
    | FollowCondition
    | NftOwnershipCondition
    | ProfileOwnershipCondition
  >;
};

export type RootCondition = {
  __typename: 'RootCondition';
  criteria: Array<
    | AndCondition
    | CollectCondition
    | EoaOwnershipCondition
    | Erc20OwnershipCondition
    | FollowCondition
    | NftOwnershipCondition
    | OrCondition
    | ProfileOwnershipCondition
  >;
};

export type PublicationMarketplaceMetadataAttribute = {
  displayType: MarketplaceMetadataAttributeDisplayType | null;
  traitType: string | null;
  value: string | null;
};

export type MarketplaceMetadata = {
  description: string | null;
  externalURL: Url | null;
  name: string | null;
  animationUrl: string | null;
  attributes: Array<PublicationMarketplaceMetadataAttribute> | null;
  image: ImageSet | null;
};

export type PublicationMetadataMediaVideo = {
  duration: number | null;
  license: PublicationMetadataLicenseType | null;
  altTag: string | null;
  video: EncryptableVideoSet;
  cover: EncryptableImageSet | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
};

export type PublicationMetadataMediaImage = {
  license: PublicationMetadataLicenseType | null;
  image: EncryptableImageSet;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
};

export type PublicationMetadataMediaAudio = {
  duration: number | null;
  license: PublicationMetadataLicenseType | null;
  credits: string | null;
  artist: string | null;
  genre: string | null;
  recordLabel: string | null;
  lyrics: string | null;
  audio: EncryptableAudioSet;
  cover: EncryptableImageSet | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
};

export type VideoMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  isShortVideo: boolean;
  title: string;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  asset: PublicationMetadataMediaVideo;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type AudioMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  title: string;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  asset: PublicationMetadataMediaAudio;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type ImageMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  title: string;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  asset: PublicationMetadataMediaImage;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type ArticleMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  title: string;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type EventMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  startsAt: string;
  endsAt: string;
  links: Array<string> | null;
  location: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  geographic: { latitude: number | null; longitude: number | null } | null;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type LinkMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  content: string;
  sharingLink: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type EmbedMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  content: string;
  embed: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type CheckingInMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  content: string;
  location: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  geographic: { latitude: number | null; longitude: number | null } | null;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type TextOnlyMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
};

export type ThreeDMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  assets: Array<{
    uri: string;
    zipPath: string | null;
    playerURL: string;
    format: string;
    license: PublicationMetadataLicenseType | null;
  }>;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type StoryMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  asset:
    | PublicationMetadataMediaAudio
    | PublicationMetadataMediaImage
    | PublicationMetadataMediaVideo;
};

export type TransactionMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  content: string;
  type: PublicationMetadataTransactionType;
  txHash: string;
  chainId: number;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type MintMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  content: string;
  mintLink: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type SpaceMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  content: string;
  title: string;
  link: string;
  startsAt: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type LiveStreamMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: AppId | null;
  title: string;
  content: string;
  startsAt: string;
  endsAt: string;
  playbackURL: string;
  liveURL: string;
  checkLiveAPI: string | null;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<
    | MetadataBooleanAttribute
    | MetadataDateAttribute
    | MetadataJsonAttribute
    | MetadataNumberAttribute
    | MetadataStringAttribute
  > | null;
  encryptedWith: PublicationMetadataLitEncryption | null;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type PublicationStats = {
  id: PublicationId;
  comments: number;
  mirrors: number;
  quotes: number;
  bookmarks: number;
  countOpenActions: number;
  upvoteReactions: number;
  downvoteReactions: number;
};

export type Post = {
  __typename: 'Post';
  id: PublicationId;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: App | null;
  momoka: MomokaInfo | null;
  by: Profile;
  operations: PublicationOperations;
  metadata:
    | ArticleMetadataV3
    | AudioMetadataV3
    | CheckingInMetadataV3
    | EmbedMetadataV3
    | EventMetadataV3
    | ImageMetadataV3
    | LinkMetadataV3
    | LiveStreamMetadataV3
    | MintMetadataV3
    | SpaceMetadataV3
    | StoryMetadataV3
    | TextOnlyMetadataV3
    | ThreeDMetadataV3
    | TransactionMetadataV3
    | VideoMetadataV3;
  openActionModules: Array<
    | LegacyAaveFeeCollectModuleSettings
    | LegacyErc4626FeeCollectModuleSettings
    | LegacyFeeCollectModuleSettings
    | LegacyFreeCollectModuleSettings
    | LegacyLimitedFeeCollectModuleSettings
    | LegacyLimitedTimedFeeCollectModuleSettings
    | LegacyMultirecipientFeeCollectModuleSettings
    | LegacyRevertCollectModuleSettings
    | LegacySimpleCollectModuleSettings
    | LegacyTimedFeeCollectModuleSettings
    | MultirecipientFeeCollectOpenActionSettings
    | SimpleCollectOpenActionSettings
    | UnknownOpenActionModuleSettings
  > | null;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettings
    | FollowOnlyReferenceModuleSettings
    | UnknownReferenceModuleSettings
    | null;
  stats: PublicationStats;
};

export type CommentBase = {
  __typename: 'Comment';
  id: PublicationId;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: App | null;
  momoka: MomokaInfo | null;
  by: Profile;
  operations: PublicationOperations;
  metadata:
    | ArticleMetadataV3
    | AudioMetadataV3
    | CheckingInMetadataV3
    | EmbedMetadataV3
    | EventMetadataV3
    | ImageMetadataV3
    | LinkMetadataV3
    | LiveStreamMetadataV3
    | MintMetadataV3
    | SpaceMetadataV3
    | StoryMetadataV3
    | TextOnlyMetadataV3
    | ThreeDMetadataV3
    | TransactionMetadataV3
    | VideoMetadataV3;
  openActionModules: Array<
    | LegacyAaveFeeCollectModuleSettings
    | LegacyErc4626FeeCollectModuleSettings
    | LegacyFeeCollectModuleSettings
    | LegacyFreeCollectModuleSettings
    | LegacyLimitedFeeCollectModuleSettings
    | LegacyLimitedTimedFeeCollectModuleSettings
    | LegacyMultirecipientFeeCollectModuleSettings
    | LegacyRevertCollectModuleSettings
    | LegacySimpleCollectModuleSettings
    | LegacyTimedFeeCollectModuleSettings
    | MultirecipientFeeCollectOpenActionSettings
    | SimpleCollectOpenActionSettings
    | UnknownOpenActionModuleSettings
  > | null;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettings
    | FollowOnlyReferenceModuleSettings
    | UnknownReferenceModuleSettings
    | null;
};

export type Comment = {
  root: Post;
  commentOn: CommentBase | Post | QuoteBase;
  firstComment: CommentBase | null;
  stats: PublicationStats;
} & CommentBase;

export type Mirror = {
  __typename: 'Mirror';
  id: PublicationId;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: App | null;
  momoka: MomokaInfo | null;
  by: Profile;
  mirrorOn: Comment | Post | Quote;
};

export type QuoteBase = {
  __typename: 'Quote';
  id: PublicationId;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: App | null;
  momoka: MomokaInfo | null;
  by: Profile;
  operations: PublicationOperations;
  metadata:
    | ArticleMetadataV3
    | AudioMetadataV3
    | CheckingInMetadataV3
    | EmbedMetadataV3
    | EventMetadataV3
    | ImageMetadataV3
    | LinkMetadataV3
    | LiveStreamMetadataV3
    | MintMetadataV3
    | SpaceMetadataV3
    | StoryMetadataV3
    | TextOnlyMetadataV3
    | ThreeDMetadataV3
    | TransactionMetadataV3
    | VideoMetadataV3;
  openActionModules: Array<
    | LegacyAaveFeeCollectModuleSettings
    | LegacyErc4626FeeCollectModuleSettings
    | LegacyFeeCollectModuleSettings
    | LegacyFreeCollectModuleSettings
    | LegacyLimitedFeeCollectModuleSettings
    | LegacyLimitedTimedFeeCollectModuleSettings
    | LegacyMultirecipientFeeCollectModuleSettings
    | LegacyRevertCollectModuleSettings
    | LegacySimpleCollectModuleSettings
    | LegacyTimedFeeCollectModuleSettings
    | MultirecipientFeeCollectOpenActionSettings
    | SimpleCollectOpenActionSettings
    | UnknownOpenActionModuleSettings
  > | null;
  referenceModule:
    | DegreesOfSeparationReferenceModuleSettings
    | FollowOnlyReferenceModuleSettings
    | UnknownReferenceModuleSettings
    | null;
};

export type Quote = {
  quoteOn: CommentBase | Post | QuoteBase;
  stats: PublicationStats;
} & QuoteBase;

export type Eip712TypedDataDomain = {
  name: string;
  chainId: number;
  version: string;
  verifyingContract: EvmAddress;
};

export type Eip712TypedDataField = { name: string; type: string };

export type CreateActOnOpenActionEip712TypedData = {
  types: { Act: Array<Eip712TypedDataField> };
  domain: Eip712TypedDataDomain;
  value: {
    nonce: number;
    deadline: number;
    publicationActedProfileId: ProfileId;
    publicationActedId: string;
    actorProfileId: ProfileId;
    referrerProfileIds: Array<ProfileId>;
    referrerPubIds: Array<string>;
    actionModuleAddress: EvmAddress;
    actionModuleData: string;
  };
};

export type RelaySuccess = {
  __typename: 'RelaySuccess';
  txHash: string | null;
  txId: string | null;
};

export type RelayError = { __typename: 'RelayError'; reason: RelayErrorReasonType };

export type LensProfileManagerRelayError = {
  __typename: 'LensProfileManagerRelayError';
  reason: LensProfileManagerRelayErrorReasonType;
};

export type CreateMomokaPublicationResult = {
  __typename: 'CreateMomokaPublicationResult';
  id: PublicationId;
  proof: string;
  momokaId: string;
};

export type ReactionNotification = {
  __typename: 'ReactionNotification';
  id: string;
  reactions: Array<{
    profile: Profile;
    reactions: Array<{ reaction: PublicationReactionType; reactedAt: string }>;
  }>;
  publication: Comment | Post | Quote;
};

export type CommentNotification = {
  __typename: 'CommentNotification';
  id: string;
  comment: Comment;
};

export type MirrorNotification = {
  __typename: 'MirrorNotification';
  id: string;
  mirrors: Array<{ mirrorId: PublicationId; mirroredAt: string; profile: Profile }>;
  publication: Comment | Post | Quote;
};

export type QuoteNotification = { __typename: 'QuoteNotification'; id: string; quote: Quote };

export type OpenActionProfileActed = {
  actedAt: string;
  by: Profile;
  action:
    | OpenActionResult_KnownCollectOpenActionResult_
    | OpenActionResult_UnknownOpenActionResult_;
};

export type ActedNotification = {
  __typename: 'ActedNotification';
  id: string;
  actions: Array<OpenActionProfileActed>;
  publication: Comment | Mirror | Post | Quote;
};

export type FollowNotification = {
  __typename: 'FollowNotification';
  id: string;
  followers: Array<Profile>;
};

export type MentionNotification = {
  __typename: 'MentionNotification';
  id: string;
  publication: Comment | Post | Quote;
};

export type NotificationsVariables = Exact<{
  request: NotificationRequest;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type NotificationsData = {
  result: {
    items: Array<
      | ActedNotification
      | CommentNotification
      | FollowNotification
      | MentionNotification
      | MirrorNotification
      | QuoteNotification
      | ReactionNotification
    >;
    pageInfo: PaginatedResultInfo;
  };
};

export type ProfileManager = { address: EvmAddress };

export type CreateProfileWithHandleErrorResult = { reason: CreateProfileWithHandleErrorReasonType };

export type CreateOnchainSetProfileMetadataBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetProfileMetadataURI: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: { nonce: number; deadline: number; profileId: ProfileId; metadataURI: string };
  };
};

export type CreateChangeProfileManagersBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { ChangeDelegatedExecutorsConfig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      delegatorProfileId: ProfileId;
      delegatedExecutors: Array<EvmAddress>;
      approvals: Array<boolean>;
      configNumber: number;
      switchToGivenConfig: boolean;
    };
  };
};

export type CreateBlockProfilesBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetBlockStatus: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      byProfileId: ProfileId;
      idsOfProfilesToSetBlockStatus: Array<ProfileId>;
      blockStatus: Array<boolean>;
    };
  };
};

export type CreateUnblockProfilesBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetBlockStatus: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      byProfileId: ProfileId;
      idsOfProfilesToSetBlockStatus: Array<ProfileId>;
      blockStatus: Array<boolean>;
    };
  };
};

export type CreateFollowBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Follow: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      followerProfileId: ProfileId;
      idsOfProfilesToFollow: Array<ProfileId>;
      followTokenIds: Array<string>;
      datas: Array<string>;
    };
  };
};

export type CreateUnfollowBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Unfollow: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      unfollowerProfileId: ProfileId;
      idsOfProfilesToUnfollow: Array<ProfileId>;
    };
  };
};

export type CreateSetFollowModuleBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { SetFollowModule: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      profileId: ProfileId;
      followModule: EvmAddress;
      followModuleInitData: string;
    };
  };
};

export type CreateHandleLinkToProfileBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Link: Array<Eip712TypedDataField> };
    domain: Eip712TypedDataDomain;
    value: { nonce: number; deadline: number; profileId: ProfileId; handleId: string };
  };
};

export type CreateHandleUnlinkFromProfileBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Unlink: Array<Eip712TypedDataField> };
    domain: Eip712TypedDataDomain;
    value: { nonce: number; deadline: number; profileId: ProfileId; handleId: string };
  };
};

export type ProfileVariables = Exact<{
  request: ProfileRequest;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type ProfileData = { result: Profile | null };

export type ProfilesVariables = Exact<{
  request: ProfilesRequest;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type ProfilesData = { result: { items: Array<Profile>; pageInfo: PaginatedResultInfo } };

export type ProfileManagersVariables = Exact<{
  request: ProfileManagersRequest;
}>;

export type ProfileManagersData = {
  result: { items: Array<ProfileManager>; pageInfo: PaginatedResultInfo };
};

export type ProfileRecommendationsVariables = Exact<{
  request: ProfileRecommendationsRequest;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type ProfileRecommendationsData = {
  result: { items: Array<Profile>; pageInfo: PaginatedResultInfo };
};

export type FollowingVariables = Exact<{
  request: FollowingRequest;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type FollowingData = { result: { items: Array<Profile>; pageInfo: PaginatedResultInfo } };

export type FollowersVariables = Exact<{
  request: FollowersRequest;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type FollowersData = { result: { items: Array<Profile>; pageInfo: PaginatedResultInfo } };

export type MutualFollowersVariables = Exact<{
  request: MutualFollowersRequest;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type MutualFollowersData = {
  result: { items: Array<Profile>; pageInfo: PaginatedResultInfo };
};

export type WhoActedOnPublicationVariables = Exact<{
  request: WhoActedOnPublicationRequest;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type WhoActedOnPublicationData = {
  result: { items: Array<Profile>; pageInfo: PaginatedResultInfo };
};

export type ClaimProfileVariables = Exact<{
  request: ClaimProfileRequest;
}>;

export type ClaimProfileData = { result: CreateProfileWithHandleErrorResult | RelaySuccess };

export type CreateProfileWithHandleVariables = Exact<{
  request: CreateProfileWithHandleRequest;
}>;

export type CreateProfileWithHandleData = {
  result: CreateProfileWithHandleErrorResult | RelaySuccess;
};

export type AddProfileInterestsVariables = Exact<{
  request: ProfileInterestsRequest;
}>;

export type AddProfileInterestsData = { result: void | null };

export type RemoveProfileInterestsVariables = Exact<{
  request: ProfileInterestsRequest;
}>;

export type RemoveProfileInterestsData = { result: void | null };

export type SetProfileMetadataVariables = Exact<{
  request: OnchainSetProfileMetadataRequest;
}>;

export type SetProfileMetadataData = { result: LensProfileManagerRelayError | RelaySuccess };

export type BlockVariables = Exact<{
  request: BlockRequest;
}>;

export type BlockData = { result: LensProfileManagerRelayError | RelaySuccess };

export type UnblockVariables = Exact<{
  request: UnblockRequest;
}>;

export type UnblockData = { result: LensProfileManagerRelayError | RelaySuccess };

export type FollowVariables = Exact<{
  request: FollowLensManagerRequest;
}>;

export type FollowData = { result: LensProfileManagerRelayError | RelaySuccess };

export type UnfollowVariables = Exact<{
  request: UnfollowRequest;
}>;

export type UnfollowData = { result: LensProfileManagerRelayError | RelaySuccess };

export type DismissRecommendedProfilesVariables = Exact<{
  request: DismissRecommendedProfilesRequest;
}>;

export type DismissRecommendedProfilesData = { result: void | null };

export type CreateOnchainSetProfileMetadataTypedDataVariables = Exact<{
  request: OnchainSetProfileMetadataRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateOnchainSetProfileMetadataTypedDataData = {
  result: CreateOnchainSetProfileMetadataBroadcastItemResult;
};

export type CreateChangeProfileManagersTypedDataVariables = Exact<{
  request: ChangeProfileManagersRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateChangeProfileManagersTypedDataData = {
  result: CreateChangeProfileManagersBroadcastItemResult;
};

export type CreateBlockProfilesTypedDataVariables = Exact<{
  request: BlockRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateBlockProfilesTypedDataData = { result: CreateBlockProfilesBroadcastItemResult };

export type CreateUnblockProfilesTypedDataVariables = Exact<{
  request: UnblockRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateUnblockProfilesTypedDataData = {
  result: CreateUnblockProfilesBroadcastItemResult;
};

export type CreateFollowTypedDataVariables = Exact<{
  request: FollowRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateFollowTypedDataData = { result: CreateFollowBroadcastItemResult };

export type CreateUnfollowTypedDataVariables = Exact<{
  request: UnfollowRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateUnfollowTypedDataData = { result: CreateUnfollowBroadcastItemResult };

export type SetFollowModuleVariables = Exact<{
  request: SetFollowModuleRequest;
}>;

export type SetFollowModuleData = { result: LensProfileManagerRelayError | RelaySuccess };

export type CreateSetFollowModuleTypedDataVariables = Exact<{
  request: SetFollowModuleRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateSetFollowModuleTypedDataData = {
  result: CreateSetFollowModuleBroadcastItemResult;
};

export type HandleLinkToProfileVariables = Exact<{
  request: HandleLinkToProfileRequest;
}>;

export type HandleLinkToProfileData = { result: LensProfileManagerRelayError | RelaySuccess };

export type HandleUnlinkFromProfileVariables = Exact<{
  request: HandleUnlinkFromProfileRequest;
}>;

export type HandleUnlinkFromProfileData = { result: LensProfileManagerRelayError | RelaySuccess };

export type CreateHandleLinkToProfileTypedDataVariables = Exact<{
  request: HandleLinkToProfileRequest;
}>;

export type CreateHandleLinkToProfileTypedDataData = {
  result: CreateHandleLinkToProfileBroadcastItemResult;
};

export type CreateHandleUnlinkFromProfileTypedDataVariables = Exact<{
  request: HandleUnlinkFromProfileRequest;
}>;

export type CreateHandleUnlinkFromProfileTypedDataData = {
  result: CreateHandleUnlinkFromProfileBroadcastItemResult;
};

export type TagResult = { tag: string; total: number };

export type PublicationValidateMetadataResult = { valid: boolean; reason: string | null };

export type PublicationVariables = Exact<{
  request: PublicationRequest;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type PublicationData = { result: Comment | Mirror | Post | Quote | null };

export type PublicationsVariables = Exact<{
  where: PublicationsWhere;
  orderBy?: InputMaybe<PublicationsOrderByType>;
  limit?: InputMaybe<LimitType>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type PublicationsData = {
  result: { items: Array<Comment | Mirror | Post | Quote>; pageInfo: PaginatedResultInfo };
};

export type PublicationsTagsVariables = Exact<{
  request: PublicationsTagsRequest;
}>;

export type PublicationsTagsData = {
  result: { items: Array<TagResult>; pageInfo: PaginatedResultInfo };
};

export type ValidatePublicationMetadataVariables = Exact<{
  request: ValidatePublicationMetadataRequest;
}>;

export type ValidatePublicationMetadataData = { result: PublicationValidateMetadataResult };

export type CreateOnchainPostBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Post: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      profileId: ProfileId;
      contentURI: string;
      actionModules: Array<EvmAddress>;
      actionModulesInitDatas: Array<string>;
      referenceModule: EvmAddress;
      referenceModuleInitData: string;
    };
  };
};

export type CreateOnchainCommentBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Comment: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      profileId: ProfileId;
      contentURI: string;
      pointedProfileId: ProfileId;
      pointedPubId: string;
      referrerProfileIds: Array<ProfileId>;
      referrerPubIds: Array<string>;
      referenceModuleData: string;
      actionModules: Array<EvmAddress>;
      actionModulesInitDatas: Array<string>;
      referenceModule: EvmAddress;
      referenceModuleInitData: string;
    };
  };
};

export type CreateOnchainMirrorBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Mirror: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      profileId: ProfileId;
      metadataURI: string;
      pointedProfileId: ProfileId;
      pointedPubId: string;
      referrerProfileIds: Array<ProfileId>;
      referrerPubIds: Array<string>;
      referenceModuleData: string;
    };
  };
};

export type CreateOnchainQuoteBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Quote: Array<Eip712TypedDataField> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      profileId: ProfileId;
      contentURI: string;
      pointedProfileId: ProfileId;
      pointedPubId: string;
      referrerProfileIds: Array<ProfileId>;
      referrerPubIds: Array<string>;
      referenceModuleData: string;
      actionModules: Array<EvmAddress>;
      actionModulesInitDatas: Array<string>;
      referenceModule: EvmAddress;
      referenceModuleInitData: string;
    };
  };
};

export type CreateMomokaPostBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Post: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      profileId: ProfileId;
      contentURI: string;
      actionModules: Array<EvmAddress>;
      actionModulesInitDatas: Array<string>;
      referenceModule: EvmAddress;
      referenceModuleInitData: string;
    };
  };
};

export type CreateMomokaCommentBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Comment: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      profileId: ProfileId;
      contentURI: string;
      pointedProfileId: ProfileId;
      pointedPubId: string;
      referrerProfileIds: Array<ProfileId>;
      referrerPubIds: Array<string>;
      referenceModuleData: string;
      actionModules: Array<EvmAddress>;
      actionModulesInitDatas: Array<string>;
      referenceModule: EvmAddress;
      referenceModuleInitData: string;
    };
  };
};

export type CreateMomokaMirrorBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Mirror: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      profileId: ProfileId;
      metadataURI: string;
      pointedProfileId: ProfileId;
      pointedPubId: string;
      referrerProfileIds: Array<ProfileId>;
      referrerPubIds: Array<string>;
      referenceModuleData: string;
    };
  };
};

export type CreateMomokaQuoteBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Quote: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: number;
      deadline: number;
      profileId: ProfileId;
      contentURI: string;
      pointedProfileId: ProfileId;
      pointedPubId: string;
      referrerProfileIds: Array<ProfileId>;
      referrerPubIds: Array<string>;
      referenceModuleData: string;
      actionModules: Array<EvmAddress>;
      actionModulesInitDatas: Array<string>;
      referenceModule: EvmAddress;
      referenceModuleInitData: string;
    };
  };
};

export type CreateLegacyCollectBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: CreateActOnOpenActionEip712TypedData;
};

export type CreateOnchainPostTypedDataVariables = Exact<{
  request: OnchainPostRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateOnchainPostTypedDataData = { result: CreateOnchainPostBroadcastItemResult };

export type CreateOnchainCommentTypedDataVariables = Exact<{
  request: OnchainCommentRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateOnchainCommentTypedDataData = { result: CreateOnchainCommentBroadcastItemResult };

export type CreateOnchainMirrorTypedDataVariables = Exact<{
  request: OnchainMirrorRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateOnchainMirrorTypedDataData = { result: CreateOnchainMirrorBroadcastItemResult };

export type CreateOnchainQuoteTypedDataVariables = Exact<{
  request: OnchainQuoteRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateOnchainQuoteTypedDataData = { result: CreateOnchainQuoteBroadcastItemResult };

export type CreateMomokaPostTypedDataVariables = Exact<{
  request: MomokaPostRequest;
}>;

export type CreateMomokaPostTypedDataData = { result: CreateMomokaPostBroadcastItemResult };

export type CreateMomokaCommentTypedDataVariables = Exact<{
  request: MomokaCommentRequest;
}>;

export type CreateMomokaCommentTypedDataData = { result: CreateMomokaCommentBroadcastItemResult };

export type CreateMomokaMirrorTypedDataVariables = Exact<{
  request: MomokaMirrorRequest;
}>;

export type CreateMomokaMirrorTypedDataData = { result: CreateMomokaMirrorBroadcastItemResult };

export type CreateMomokaQuoteTypedDataVariables = Exact<{
  request: MomokaQuoteRequest;
}>;

export type CreateMomokaQuoteTypedDataData = { result: CreateMomokaQuoteBroadcastItemResult };

export type PostOnchainVariables = Exact<{
  request: OnchainPostRequest;
}>;

export type PostOnchainData = { result: LensProfileManagerRelayError | RelaySuccess };

export type CommentOnchainVariables = Exact<{
  request: OnchainCommentRequest;
}>;

export type CommentOnchainData = { result: LensProfileManagerRelayError | RelaySuccess };

export type MirrorOnchainVariables = Exact<{
  request: OnchainMirrorRequest;
}>;

export type MirrorOnchainData = { result: LensProfileManagerRelayError | RelaySuccess };

export type QuoteOnchainVariables = Exact<{
  request: OnchainQuoteRequest;
}>;

export type QuoteOnchainData = { result: LensProfileManagerRelayError | RelaySuccess };

export type PostOnMomokaVariables = Exact<{
  request: MomokaPostRequest;
}>;

export type PostOnMomokaData = {
  result: CreateMomokaPublicationResult | LensProfileManagerRelayError;
};

export type CommentOnMomokaVariables = Exact<{
  request: MomokaCommentRequest;
}>;

export type CommentOnMomokaData = {
  result: CreateMomokaPublicationResult | LensProfileManagerRelayError;
};

export type MirrorOnMomokaVariables = Exact<{
  request: MomokaMirrorRequest;
}>;

export type MirrorOnMomokaData = {
  result: CreateMomokaPublicationResult | LensProfileManagerRelayError;
};

export type QuoteOnMomokaVariables = Exact<{
  request: MomokaQuoteRequest;
}>;

export type QuoteOnMomokaData = {
  result: CreateMomokaPublicationResult | LensProfileManagerRelayError;
};

export type HidePublicationVariables = Exact<{
  request: HidePublicationRequest;
}>;

export type HidePublicationData = { hidePublication: void | null };

export type ReportPublicationVariables = Exact<{
  request: ReportPublicationRequest;
}>;

export type ReportPublicationData = { reportPublication: void | null };

export type LegacyCollectVariables = Exact<{
  request: LegacyCollectRequest;
}>;

export type LegacyCollectData = { result: LensProfileManagerRelayError | RelaySuccess };

export type CreateLegacyCollectTypedDataVariables = Exact<{
  request: LegacyCollectRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateLegacyCollectTypedDataData = { result: CreateLegacyCollectBroadcastItemResult };

export type RefreshPublicationMetadataVariables = Exact<{
  request: RefreshPublicationMetadataRequest;
}>;

export type RefreshPublicationMetadataData = {
  result: { result: RefreshPublicationMetadataResultType };
};

export type RevenueAggregate = { total: Amount };

export type PublicationRevenue = {
  publication: Comment | Mirror | Post | Quote;
  revenue: Array<RevenueAggregate>;
};

export type RevenueFromPublicationsVariables = Exact<{
  request: RevenueFromPublicationsRequest;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type RevenueFromPublicationsData = {
  result: { items: Array<PublicationRevenue>; pageInfo: PaginatedResultInfo };
};

export type RevenueFromPublicationVariables = Exact<{
  request: RevenueFromPublicationRequest;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type RevenueFromPublicationData = { result: PublicationRevenue | null };

export type FollowRevenuesVariables = Exact<{
  request: FollowRevenueRequest;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type FollowRevenuesData = { result: { revenues: Array<RevenueAggregate> } };

export type SearchPublicationsVariables = Exact<{
  request: PublicationSearchRequest;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type SearchPublicationsData = {
  result: { items: Array<Comment | Post | Quote>; pageInfo: PaginatedResultInfo };
};

export type SearchProfilesVariables = Exact<{
  request: ProfileSearchRequest;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type SearchProfilesData = {
  result: { items: Array<Profile>; pageInfo: PaginatedResultInfo };
};

export type LensTransactionResult = {
  status: LensTransactionStatusType;
  txHash: string;
  reason: LensTransactionFailureType | null;
  extraInfo: string | null;
};

export type TxIdToTxHashVariables = Exact<{
  for: Scalars['TxId'];
}>;

export type TxIdToTxHashData = { result: string | null };

export type RelayQueueResult = { key: RelayRoleKey; queue: number; relay: NetworkAddress };

export type RelayQueuesVariables = Exact<{ [key: string]: never }>;

export type RelayQueuesData = { result: Array<RelayQueueResult> };

export type LensTransactionStatusVariables = Exact<{
  request: LensTransactionStatusRequest;
}>;

export type LensTransactionStatusData = { result: LensTransactionResult | null };

export type BroadcastOnchainVariables = Exact<{
  request: BroadcastRequest;
}>;

export type BroadcastOnchainData = { result: RelayError | RelaySuccess };

export type BroadcastOnMomokaVariables = Exact<{
  request: BroadcastRequest;
}>;

export type BroadcastOnMomokaData = { result: CreateMomokaPublicationResult | RelayError };

export type HandleResult = { handle: string };

export type OwnedHandlesVariables = Exact<{
  request: OwnedHandlesRequest;
}>;

export type OwnedHandlesData = {
  result: { items: Array<HandleResult>; pageInfo: PaginatedResultInfo };
};

export type ProfilesManagedVariables = Exact<{
  request: ProfilesManagedRequest;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  profileStatsArg?: InputMaybe<ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: InputMaybe<ProfileStatsCountOpenActionArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type ProfilesManagedData = {
  result: { items: Array<Profile>; pageInfo: PaginatedResultInfo };
};

export type UserSigNonces = {
  lensHubOnchainSigNonce: number;
  lensTokenHandleRegistryOnchainSigNonce: number;
};

export type UserSigNoncesVariables = Exact<{ [key: string]: never }>;

export type UserSigNoncesData = { result: UserSigNonces };

export const FragmentAuthChallenge = /*#__PURE__*/ gql`
  fragment AuthChallenge on AuthChallengeResult {
    id
    text
  }
`;
export const FragmentApp = /*#__PURE__*/ gql`
  fragment App on App {
    id
  }
`;
export const FragmentMomokaInfo = /*#__PURE__*/ gql`
  fragment MomokaInfo on MomokaInfo {
    proof
  }
`;
export const FragmentNetworkAddress = /*#__PURE__*/ gql`
  fragment NetworkAddress on NetworkAddress {
    address
    chainId
  }
`;
export const FragmentOptimisticStatusResult = /*#__PURE__*/ gql`
  fragment OptimisticStatusResult on OptimisticStatusResult {
    value
    isFinalisedOnchain
  }
`;
export const FragmentErc20 = /*#__PURE__*/ gql`
  fragment Erc20 on Erc20 {
    name
    symbol
    decimals
    contract {
      ...NetworkAddress
    }
  }
  ${FragmentNetworkAddress}
`;
export const FragmentFiat = /*#__PURE__*/ gql`
  fragment Fiat on Fiat {
    name
    symbol
    decimals
  }
`;
export const FragmentFiatAmount = /*#__PURE__*/ gql`
  fragment FiatAmount on FiatAmount {
    asset {
      ...Fiat
    }
    value
  }
  ${FragmentFiat}
`;
export const FragmentAmount = /*#__PURE__*/ gql`
  fragment Amount on Amount {
    asset {
      ...Erc20
    }
    value
    rate(request: $rateRequest) {
      ...FiatAmount
    }
  }
  ${FragmentErc20}
  ${FragmentFiatAmount}
`;
export const FragmentFeeFollowModuleSettings = /*#__PURE__*/ gql`
  fragment FeeFollowModuleSettings on FeeFollowModuleSettings {
    amount {
      ...Amount
    }
    contract {
      ...NetworkAddress
    }
    recipient
  }
  ${FragmentAmount}
  ${FragmentNetworkAddress}
`;
export const FragmentRevertFollowModuleSettings = /*#__PURE__*/ gql`
  fragment RevertFollowModuleSettings on RevertFollowModuleSettings {
    contract {
      ...NetworkAddress
    }
  }
  ${FragmentNetworkAddress}
`;
export const FragmentUnknownFollowModuleSettings = /*#__PURE__*/ gql`
  fragment UnknownFollowModuleSettings on UnknownFollowModuleSettings {
    contract {
      ...NetworkAddress
    }
    followModuleReturnData
  }
  ${FragmentNetworkAddress}
`;
export const FragmentImage = /*#__PURE__*/ gql`
  fragment Image on Image {
    uri
    mimeType
    width
    height
  }
`;
export const FragmentProfilePictureSet = /*#__PURE__*/ gql`
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
  ${FragmentImage}
`;
export const FragmentNftImage = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentProfilePictureSet}
`;
export const FragmentProfileCoverSet = /*#__PURE__*/ gql`
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
  ${FragmentImage}
`;
export const FragmentMetadataBooleanAttribute = /*#__PURE__*/ gql`
  fragment MetadataBooleanAttribute on MetadataBooleanAttribute {
    __typename
    key
    value
  }
`;
export const FragmentMetadataDateAttribute = /*#__PURE__*/ gql`
  fragment MetadataDateAttribute on MetadataDateAttribute {
    __typename
    key
    value
  }
`;
export const FragmentMetadataNumberAttribute = /*#__PURE__*/ gql`
  fragment MetadataNumberAttribute on MetadataNumberAttribute {
    __typename
    key
    value
  }
`;
export const FragmentMetadataJsonAttribute = /*#__PURE__*/ gql`
  fragment MetadataJSONAttribute on MetadataJSONAttribute {
    __typename
    key
    value
  }
`;
export const FragmentMetadataStringAttribute = /*#__PURE__*/ gql`
  fragment MetadataStringAttribute on MetadataStringAttribute {
    __typename
    key
    value
  }
`;
export const FragmentProfileStats = /*#__PURE__*/ gql`
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
export const FragmentProfile = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentOptimisticStatusResult}
  ${FragmentFeeFollowModuleSettings}
  ${FragmentRevertFollowModuleSettings}
  ${FragmentUnknownFollowModuleSettings}
  ${FragmentProfilePictureSet}
  ${FragmentNftImage}
  ${FragmentProfileCoverSet}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentProfileStats}
`;
export const FragmentKnownCollectOpenActionResult = /*#__PURE__*/ gql`
  fragment KnownCollectOpenActionResult on KnownCollectOpenActionResult {
    type
  }
`;
export const FragmentUnknownOpenActionResult = /*#__PURE__*/ gql`
  fragment UnknownOpenActionResult on UnknownOpenActionResult {
    address
    category
    initReturnData
  }
`;
export const FragmentOpenActionResult = /*#__PURE__*/ gql`
  fragment OpenActionResult on OpenActionResult {
    ... on KnownCollectOpenActionResult {
      ...KnownCollectOpenActionResult
    }
    ... on UnknownOpenActionResult {
      ...UnknownOpenActionResult
    }
  }
  ${FragmentKnownCollectOpenActionResult}
  ${FragmentUnknownOpenActionResult}
`;
export const FragmentCanDecryptResponse = /*#__PURE__*/ gql`
  fragment CanDecryptResponse on CanDecryptResponse {
    result
    reasons
    extraDetails
  }
`;
export const FragmentPublicationOperations = /*#__PURE__*/ gql`
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
  ${FragmentOptimisticStatusResult}
  ${FragmentOpenActionResult}
  ${FragmentCanDecryptResponse}
`;
export const FragmentPublicationMarketplaceMetadataAttribute = /*#__PURE__*/ gql`
  fragment PublicationMarketplaceMetadataAttribute on PublicationMarketplaceMetadataAttribute {
    displayType
    traitType
    value
  }
`;
export const FragmentImageSet = /*#__PURE__*/ gql`
  fragment ImageSet on ImageSet {
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
  ${FragmentImage}
`;
export const FragmentMarketplaceMetadata = /*#__PURE__*/ gql`
  fragment MarketplaceMetadata on MarketplaceMetadata {
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
  ${FragmentPublicationMarketplaceMetadataAttribute}
  ${FragmentImageSet}
`;
export const FragmentNftOwnershipCondition = /*#__PURE__*/ gql`
  fragment NftOwnershipCondition on NftOwnershipCondition {
    __typename
    contract {
      ...NetworkAddress
    }
    contractType
    tokenIds
  }
  ${FragmentNetworkAddress}
`;
export const FragmentErc20OwnershipCondition = /*#__PURE__*/ gql`
  fragment Erc20OwnershipCondition on Erc20OwnershipCondition {
    __typename
    amount {
      ...Amount
    }
    condition
  }
  ${FragmentAmount}
`;
export const FragmentEoaOwnershipCondition = /*#__PURE__*/ gql`
  fragment EoaOwnershipCondition on EoaOwnershipCondition {
    __typename
    address
  }
`;
export const FragmentProfileOwnershipCondition = /*#__PURE__*/ gql`
  fragment ProfileOwnershipCondition on ProfileOwnershipCondition {
    __typename
    profileId
  }
`;
export const FragmentFollowCondition = /*#__PURE__*/ gql`
  fragment FollowCondition on FollowCondition {
    __typename
    follow
  }
`;
export const FragmentCollectCondition = /*#__PURE__*/ gql`
  fragment CollectCondition on CollectCondition {
    __typename
    publicationId
    thisPublication
  }
`;
export const FragmentAndCondition = /*#__PURE__*/ gql`
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
  ${FragmentNftOwnershipCondition}
  ${FragmentErc20OwnershipCondition}
  ${FragmentEoaOwnershipCondition}
  ${FragmentProfileOwnershipCondition}
  ${FragmentFollowCondition}
  ${FragmentCollectCondition}
`;
export const FragmentOrCondition = /*#__PURE__*/ gql`
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
  ${FragmentNftOwnershipCondition}
  ${FragmentErc20OwnershipCondition}
  ${FragmentEoaOwnershipCondition}
  ${FragmentProfileOwnershipCondition}
  ${FragmentFollowCondition}
  ${FragmentCollectCondition}
`;
export const FragmentRootCondition = /*#__PURE__*/ gql`
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
  ${FragmentNftOwnershipCondition}
  ${FragmentErc20OwnershipCondition}
  ${FragmentEoaOwnershipCondition}
  ${FragmentProfileOwnershipCondition}
  ${FragmentFollowCondition}
  ${FragmentCollectCondition}
  ${FragmentAndCondition}
  ${FragmentOrCondition}
`;
export const FragmentPublicationMetadataLitEncryption = /*#__PURE__*/ gql`
  fragment PublicationMetadataLitEncryption on PublicationMetadataLitEncryption {
    __typename
    encryptionKey
    accessCondition {
      ...RootCondition
    }
    encryptedPaths
  }
  ${FragmentRootCondition}
`;
export const FragmentEncryptableAudio = /*#__PURE__*/ gql`
  fragment EncryptableAudio on EncryptableAudio {
    mimeType
    uri
  }
`;
export const FragmentAudio = /*#__PURE__*/ gql`
  fragment Audio on Audio {
    uri
    mimeType
  }
`;
export const FragmentEncryptableAudioSet = /*#__PURE__*/ gql`
  fragment EncryptableAudioSet on EncryptableAudioSet {
    raw {
      ...EncryptableAudio
    }
    optimized {
      ...Audio
    }
  }
  ${FragmentEncryptableAudio}
  ${FragmentAudio}
`;
export const FragmentEncryptableImage = /*#__PURE__*/ gql`
  fragment EncryptableImage on EncryptableImage {
    uri
    mimeType
    width
    height
  }
`;
export const FragmentEncryptableImageSet = /*#__PURE__*/ gql`
  fragment EncryptableImageSet on EncryptableImageSet {
    raw {
      ...EncryptableImage
    }
    optimized {
      ...Image
    }
  }
  ${FragmentEncryptableImage}
  ${FragmentImage}
`;
export const FragmentPublicationMetadataMediaAudio = /*#__PURE__*/ gql`
  fragment PublicationMetadataMediaAudio on PublicationMetadataMediaAudio {
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
  ${FragmentEncryptableAudioSet}
  ${FragmentEncryptableImageSet}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
`;
export const FragmentEncryptableVideo = /*#__PURE__*/ gql`
  fragment EncryptableVideo on EncryptableVideo {
    mimeType
    uri
  }
`;
export const FragmentVideo = /*#__PURE__*/ gql`
  fragment Video on Video {
    uri
    mimeType
  }
`;
export const FragmentEncryptableVideoSet = /*#__PURE__*/ gql`
  fragment EncryptableVideoSet on EncryptableVideoSet {
    raw {
      ...EncryptableVideo
    }
    optimized {
      ...Video
    }
  }
  ${FragmentEncryptableVideo}
  ${FragmentVideo}
`;
export const FragmentPublicationMetadataMediaVideo = /*#__PURE__*/ gql`
  fragment PublicationMetadataMediaVideo on PublicationMetadataMediaVideo {
    video {
      ...EncryptableVideoSet
    }
    cover {
      ...EncryptableImageSet
    }
    duration
    license
    altTag
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
  ${FragmentEncryptableVideoSet}
  ${FragmentEncryptableImageSet}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
`;
export const FragmentPublicationMetadataMediaImage = /*#__PURE__*/ gql`
  fragment PublicationMetadataMediaImage on PublicationMetadataMediaImage {
    image {
      ...EncryptableImageSet
    }
    license
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
  ${FragmentEncryptableImageSet}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
`;
export const FragmentAudioMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaAudio}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
`;
export const FragmentVideoMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentImageMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentArticleMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentEventMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentLinkMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentEmbedMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentCheckingInMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentTextOnlyMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
`;
export const FragmentThreeDMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentStoryMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentTransactionMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentMintMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentSpaceMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentLiveStreamMetadataV3 = /*#__PURE__*/ gql`
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
  ${FragmentMarketplaceMetadata}
  ${FragmentMetadataBooleanAttribute}
  ${FragmentMetadataDateAttribute}
  ${FragmentMetadataNumberAttribute}
  ${FragmentMetadataJsonAttribute}
  ${FragmentMetadataStringAttribute}
  ${FragmentPublicationMetadataLitEncryption}
  ${FragmentPublicationMetadataMediaVideo}
  ${FragmentPublicationMetadataMediaImage}
  ${FragmentPublicationMetadataMediaAudio}
`;
export const FragmentLegacyFreeCollectModuleSettings = /*#__PURE__*/ gql`
  fragment LegacyFreeCollectModuleSettings on LegacyFreeCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
    followerOnly
  }
  ${FragmentNetworkAddress}
`;
export const FragmentLegacyFeeCollectModuleSettings = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentAmount}
`;
export const FragmentLegacyLimitedFeeCollectModuleSettings = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentAmount}
`;
export const FragmentLegacyLimitedTimedFeeCollectModuleSettings = /*#__PURE__*/ gql`
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
  ${FragmentAmount}
`;
export const FragmentLegacyRevertCollectModuleSettings = /*#__PURE__*/ gql`
  fragment LegacyRevertCollectModuleSettings on LegacyRevertCollectModuleSettings {
    contract {
      ...NetworkAddress
    }
  }
  ${FragmentNetworkAddress}
`;
export const FragmentLegacyTimedFeeCollectModuleSettings = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentAmount}
`;
export const FragmentLegacyMultirecipientFeeCollectModuleSettings = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentAmount}
`;
export const FragmentLegacySimpleCollectModuleSettings = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentAmount}
`;
export const FragmentLegacyErc4626FeeCollectModuleSettings = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentAmount}
`;
export const FragmentLegacyAaveFeeCollectModuleSettings = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentAmount}
`;
export const FragmentMultirecipientFeeCollectOpenActionSettings = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentAmount}
`;
export const FragmentSimpleCollectOpenActionSettings = /*#__PURE__*/ gql`
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
  ${FragmentNetworkAddress}
  ${FragmentAmount}
`;
export const FragmentUnknownOpenActionModuleSettings = /*#__PURE__*/ gql`
  fragment UnknownOpenActionModuleSettings on UnknownOpenActionModuleSettings {
    contract {
      ...NetworkAddress
    }
    openActionModuleReturnData
  }
  ${FragmentNetworkAddress}
`;
export const FragmentFollowOnlyReferenceModuleSettings = /*#__PURE__*/ gql`
  fragment FollowOnlyReferenceModuleSettings on FollowOnlyReferenceModuleSettings {
    contract {
      ...NetworkAddress
    }
  }
  ${FragmentNetworkAddress}
`;
export const FragmentDegreesOfSeparationReferenceModuleSettings = /*#__PURE__*/ gql`
  fragment DegreesOfSeparationReferenceModuleSettings on DegreesOfSeparationReferenceModuleSettings {
    contract {
      ...NetworkAddress
    }
    commentsRestricted
    mirrorsRestricted
    degreesOfSeparation
  }
  ${FragmentNetworkAddress}
`;
export const FragmentUnknownReferenceModuleSettings = /*#__PURE__*/ gql`
  fragment UnknownReferenceModuleSettings on UnknownReferenceModuleSettings {
    contract {
      ...NetworkAddress
    }
    referenceModuleReturnData
  }
  ${FragmentNetworkAddress}
`;
export const FragmentPublicationStats = /*#__PURE__*/ gql`
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
export const FragmentPost = /*#__PURE__*/ gql`
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
  ${FragmentApp}
  ${FragmentMomokaInfo}
  ${FragmentProfile}
  ${FragmentPublicationOperations}
  ${FragmentAudioMetadataV3}
  ${FragmentVideoMetadataV3}
  ${FragmentImageMetadataV3}
  ${FragmentArticleMetadataV3}
  ${FragmentEventMetadataV3}
  ${FragmentLinkMetadataV3}
  ${FragmentEmbedMetadataV3}
  ${FragmentCheckingInMetadataV3}
  ${FragmentTextOnlyMetadataV3}
  ${FragmentThreeDMetadataV3}
  ${FragmentStoryMetadataV3}
  ${FragmentTransactionMetadataV3}
  ${FragmentMintMetadataV3}
  ${FragmentSpaceMetadataV3}
  ${FragmentLiveStreamMetadataV3}
  ${FragmentLegacyFreeCollectModuleSettings}
  ${FragmentLegacyFeeCollectModuleSettings}
  ${FragmentLegacyLimitedFeeCollectModuleSettings}
  ${FragmentLegacyLimitedTimedFeeCollectModuleSettings}
  ${FragmentLegacyRevertCollectModuleSettings}
  ${FragmentLegacyTimedFeeCollectModuleSettings}
  ${FragmentLegacyMultirecipientFeeCollectModuleSettings}
  ${FragmentLegacySimpleCollectModuleSettings}
  ${FragmentLegacyErc4626FeeCollectModuleSettings}
  ${FragmentLegacyAaveFeeCollectModuleSettings}
  ${FragmentMultirecipientFeeCollectOpenActionSettings}
  ${FragmentSimpleCollectOpenActionSettings}
  ${FragmentUnknownOpenActionModuleSettings}
  ${FragmentFollowOnlyReferenceModuleSettings}
  ${FragmentDegreesOfSeparationReferenceModuleSettings}
  ${FragmentUnknownReferenceModuleSettings}
  ${FragmentPublicationStats}
`;
export const FragmentCommentBase = /*#__PURE__*/ gql`
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
  ${FragmentApp}
  ${FragmentMomokaInfo}
  ${FragmentProfile}
  ${FragmentPublicationOperations}
  ${FragmentAudioMetadataV3}
  ${FragmentVideoMetadataV3}
  ${FragmentImageMetadataV3}
  ${FragmentArticleMetadataV3}
  ${FragmentEventMetadataV3}
  ${FragmentLinkMetadataV3}
  ${FragmentEmbedMetadataV3}
  ${FragmentCheckingInMetadataV3}
  ${FragmentTextOnlyMetadataV3}
  ${FragmentThreeDMetadataV3}
  ${FragmentStoryMetadataV3}
  ${FragmentTransactionMetadataV3}
  ${FragmentMintMetadataV3}
  ${FragmentSpaceMetadataV3}
  ${FragmentLiveStreamMetadataV3}
  ${FragmentLegacyFreeCollectModuleSettings}
  ${FragmentLegacyFeeCollectModuleSettings}
  ${FragmentLegacyLimitedFeeCollectModuleSettings}
  ${FragmentLegacyLimitedTimedFeeCollectModuleSettings}
  ${FragmentLegacyRevertCollectModuleSettings}
  ${FragmentLegacyTimedFeeCollectModuleSettings}
  ${FragmentLegacyMultirecipientFeeCollectModuleSettings}
  ${FragmentLegacySimpleCollectModuleSettings}
  ${FragmentLegacyErc4626FeeCollectModuleSettings}
  ${FragmentLegacyAaveFeeCollectModuleSettings}
  ${FragmentMultirecipientFeeCollectOpenActionSettings}
  ${FragmentSimpleCollectOpenActionSettings}
  ${FragmentUnknownOpenActionModuleSettings}
  ${FragmentFollowOnlyReferenceModuleSettings}
  ${FragmentDegreesOfSeparationReferenceModuleSettings}
  ${FragmentUnknownReferenceModuleSettings}
`;
export const FragmentQuoteBase = /*#__PURE__*/ gql`
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
  ${FragmentApp}
  ${FragmentMomokaInfo}
  ${FragmentProfile}
  ${FragmentPublicationOperations}
  ${FragmentAudioMetadataV3}
  ${FragmentVideoMetadataV3}
  ${FragmentImageMetadataV3}
  ${FragmentArticleMetadataV3}
  ${FragmentEventMetadataV3}
  ${FragmentLinkMetadataV3}
  ${FragmentEmbedMetadataV3}
  ${FragmentCheckingInMetadataV3}
  ${FragmentTextOnlyMetadataV3}
  ${FragmentThreeDMetadataV3}
  ${FragmentStoryMetadataV3}
  ${FragmentTransactionMetadataV3}
  ${FragmentMintMetadataV3}
  ${FragmentSpaceMetadataV3}
  ${FragmentLiveStreamMetadataV3}
  ${FragmentLegacyFreeCollectModuleSettings}
  ${FragmentLegacyFeeCollectModuleSettings}
  ${FragmentLegacyLimitedFeeCollectModuleSettings}
  ${FragmentLegacyLimitedTimedFeeCollectModuleSettings}
  ${FragmentLegacyRevertCollectModuleSettings}
  ${FragmentLegacyTimedFeeCollectModuleSettings}
  ${FragmentLegacyMultirecipientFeeCollectModuleSettings}
  ${FragmentLegacySimpleCollectModuleSettings}
  ${FragmentLegacyErc4626FeeCollectModuleSettings}
  ${FragmentLegacyAaveFeeCollectModuleSettings}
  ${FragmentMultirecipientFeeCollectOpenActionSettings}
  ${FragmentSimpleCollectOpenActionSettings}
  ${FragmentUnknownOpenActionModuleSettings}
  ${FragmentFollowOnlyReferenceModuleSettings}
  ${FragmentDegreesOfSeparationReferenceModuleSettings}
  ${FragmentUnknownReferenceModuleSettings}
`;
export const FragmentComment = /*#__PURE__*/ gql`
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
  ${FragmentCommentBase}
  ${FragmentPost}
  ${FragmentQuoteBase}
  ${FragmentPublicationStats}
`;
export const FragmentQuote = /*#__PURE__*/ gql`
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
  ${FragmentQuoteBase}
  ${FragmentPost}
  ${FragmentCommentBase}
  ${FragmentPublicationStats}
`;
export const FragmentMirror = /*#__PURE__*/ gql`
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
  ${FragmentApp}
  ${FragmentMomokaInfo}
  ${FragmentProfile}
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentQuote}
`;
export const FragmentReactionEvent = /*#__PURE__*/ gql`
  fragment ReactionEvent on ReactionEvent {
    by {
      ...Profile
    }
    reaction
    createdAt
  }
  ${FragmentProfile}
`;
export const FragmentFeedItem = /*#__PURE__*/ gql`
  fragment FeedItem on FeedItem {
    id
    root {
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
    mirrors {
      ...Mirror
    }
    reactions {
      ...ReactionEvent
    }
    comments {
      ...Comment
    }
  }
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentQuote}
  ${FragmentMirror}
  ${FragmentReactionEvent}
`;
export const FragmentPaginatedResultInfo = /*#__PURE__*/ gql`
  fragment PaginatedResultInfo on PaginatedResultInfo {
    __typename
    moreAfter @client
    prev
    next
  }
`;
export const FragmentRelaySuccess = /*#__PURE__*/ gql`
  fragment RelaySuccess on RelaySuccess {
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
export const FragmentLensProfileManagerRelayError = /*#__PURE__*/ gql`
  fragment LensProfileManagerRelayError on LensProfileManagerRelayError {
    __typename
    reason
  }
`;
export const FragmentCreateMomokaPublicationResult = /*#__PURE__*/ gql`
  fragment CreateMomokaPublicationResult on CreateMomokaPublicationResult {
    __typename
    id
    proof
    momokaId
  }
`;
export const FragmentReactionNotification = /*#__PURE__*/ gql`
  fragment ReactionNotification on ReactionNotification {
    __typename
    id
    reactions {
      profile {
        ...Profile
      }
      reactions {
        reaction
        reactedAt
      }
    }
    publication {
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
  ${FragmentProfile}
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentQuote}
`;
export const FragmentCommentNotification = /*#__PURE__*/ gql`
  fragment CommentNotification on CommentNotification {
    __typename
    id
    comment {
      ...Comment
    }
  }
  ${FragmentComment}
`;
export const FragmentMirrorNotification = /*#__PURE__*/ gql`
  fragment MirrorNotification on MirrorNotification {
    __typename
    id
    mirrors {
      mirrorId
      mirroredAt
      profile {
        ...Profile
      }
    }
    publication {
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
  ${FragmentProfile}
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentQuote}
`;
export const FragmentQuoteNotification = /*#__PURE__*/ gql`
  fragment QuoteNotification on QuoteNotification {
    __typename
    id
    quote {
      ...Quote
    }
  }
  ${FragmentQuote}
`;
export const FragmentOpenActionProfileActed = /*#__PURE__*/ gql`
  fragment OpenActionProfileActed on OpenActionProfileActed {
    by {
      ...Profile
    }
    action {
      ...OpenActionResult
    }
    actedAt
  }
  ${FragmentProfile}
  ${FragmentOpenActionResult}
`;
export const FragmentActedNotification = /*#__PURE__*/ gql`
  fragment ActedNotification on ActedNotification {
    __typename
    id
    actions {
      ...OpenActionProfileActed
    }
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
      ... on Quote {
        ...Quote
      }
    }
  }
  ${FragmentOpenActionProfileActed}
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentMirror}
  ${FragmentQuote}
`;
export const FragmentFollowNotification = /*#__PURE__*/ gql`
  fragment FollowNotification on FollowNotification {
    __typename
    id
    followers {
      ...Profile
    }
  }
  ${FragmentProfile}
`;
export const FragmentMentionNotification = /*#__PURE__*/ gql`
  fragment MentionNotification on MentionNotification {
    __typename
    id
    publication {
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
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentQuote}
`;
export const FragmentProfileManager = /*#__PURE__*/ gql`
  fragment ProfileManager on ProfilesManagedResult {
    address
  }
`;
export const FragmentCreateProfileWithHandleErrorResult = /*#__PURE__*/ gql`
  fragment CreateProfileWithHandleErrorResult on CreateProfileWithHandleErrorResult {
    reason
  }
`;
export const FragmentEip712TypedDataDomain = /*#__PURE__*/ gql`
  fragment EIP712TypedDataDomain on EIP712TypedDataDomain {
    name
    chainId
    version
    verifyingContract
  }
`;
export const FragmentCreateOnchainSetProfileMetadataBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateOnchainSetProfileMetadataBroadcastItemResult on CreateOnchainSetProfileMetadataBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        SetProfileMetadataURI {
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
        metadataURI
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateChangeProfileManagersBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateChangeProfileManagersBroadcastItemResult on CreateChangeProfileManagersBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        ChangeDelegatedExecutorsConfig {
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
        delegatorProfileId
        delegatedExecutors
        approvals
        configNumber
        switchToGivenConfig
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateBlockProfilesBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateBlockProfilesBroadcastItemResult on CreateBlockProfilesBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        SetBlockStatus {
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
        byProfileId
        idsOfProfilesToSetBlockStatus
        blockStatus
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateUnblockProfilesBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateUnblockProfilesBroadcastItemResult on CreateUnblockProfilesBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        SetBlockStatus {
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
        byProfileId
        idsOfProfilesToSetBlockStatus
        blockStatus
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateFollowBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateFollowBroadcastItemResult on CreateFollowBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Follow {
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
        followerProfileId
        idsOfProfilesToFollow
        followTokenIds
        datas
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateUnfollowBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateUnfollowBroadcastItemResult on CreateUnfollowBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Unfollow {
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
        unfollowerProfileId
        idsOfProfilesToUnfollow
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateSetFollowModuleBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateSetFollowModuleBroadcastItemResult on CreateSetFollowModuleBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        SetFollowModule {
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
        followModule
        followModuleInitData
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentEip712TypedDataField = /*#__PURE__*/ gql`
  fragment EIP712TypedDataField on EIP712TypedDataField {
    name
    type
  }
`;
export const FragmentCreateHandleLinkToProfileBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateHandleLinkToProfileBroadcastItemResult on CreateHandleLinkToProfileBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Link {
          ...EIP712TypedDataField
        }
      }
      domain {
        ...EIP712TypedDataDomain
      }
      value {
        nonce
        deadline
        profileId
        handleId
      }
    }
  }
  ${FragmentEip712TypedDataField}
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateHandleUnlinkFromProfileBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateHandleUnlinkFromProfileBroadcastItemResult on CreateHandleUnlinkFromProfileBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Unlink {
          ...EIP712TypedDataField
        }
      }
      domain {
        ...EIP712TypedDataDomain
      }
      value {
        nonce
        deadline
        profileId
        handleId
      }
    }
  }
  ${FragmentEip712TypedDataField}
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentTagResult = /*#__PURE__*/ gql`
  fragment TagResult on TagResult {
    tag
    total
  }
`;
export const FragmentPublicationValidateMetadataResult = /*#__PURE__*/ gql`
  fragment PublicationValidateMetadataResult on PublicationValidateMetadataResult {
    valid
    reason
  }
`;
export const FragmentCreateOnchainPostBroadcastItemResult = /*#__PURE__*/ gql`
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
        profileId
        contentURI
        actionModules
        actionModulesInitDatas
        referenceModule
        referenceModuleInitData
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateOnchainCommentBroadcastItemResult = /*#__PURE__*/ gql`
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
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateOnchainMirrorBroadcastItemResult = /*#__PURE__*/ gql`
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
        profileId
        metadataURI
        pointedProfileId
        pointedPubId
        referrerProfileIds
        referrerPubIds
        referenceModuleData
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateOnchainQuoteBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateOnchainQuoteBroadcastItemResult on CreateOnchainQuoteBroadcastItemResult {
    id
    expiresAt
    typedData {
      types {
        Quote {
          ...EIP712TypedDataField
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
    }
  }
  ${FragmentEip712TypedDataField}
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateMomokaPostBroadcastItemResult = /*#__PURE__*/ gql`
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
        profileId
        contentURI
        actionModules
        actionModulesInitDatas
        referenceModule
        referenceModuleInitData
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateMomokaCommentBroadcastItemResult = /*#__PURE__*/ gql`
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
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateMomokaMirrorBroadcastItemResult = /*#__PURE__*/ gql`
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
        profileId
        metadataURI
        pointedProfileId
        pointedPubId
        referrerProfileIds
        referrerPubIds
        referenceModuleData
      }
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateMomokaQuoteBroadcastItemResult = /*#__PURE__*/ gql`
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
    }
  }
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateActOnOpenActionEip712TypedData = /*#__PURE__*/ gql`
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
  ${FragmentEip712TypedDataField}
  ${FragmentEip712TypedDataDomain}
`;
export const FragmentCreateLegacyCollectBroadcastItemResult = /*#__PURE__*/ gql`
  fragment CreateLegacyCollectBroadcastItemResult on CreateLegacyCollectBroadcastItemResult {
    id
    expiresAt
    typedData {
      ...CreateActOnOpenActionEIP712TypedData
    }
  }
  ${FragmentCreateActOnOpenActionEip712TypedData}
`;
export const FragmentRevenueAggregate = /*#__PURE__*/ gql`
  fragment RevenueAggregate on RevenueAggregate {
    total {
      ...Amount
    }
  }
  ${FragmentAmount}
`;
export const FragmentPublicationRevenue = /*#__PURE__*/ gql`
  fragment PublicationRevenue on PublicationRevenue {
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
      ... on Quote {
        ...Quote
      }
    }
    revenue {
      ...RevenueAggregate
    }
  }
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
  ${FragmentQuote}
  ${FragmentRevenueAggregate}
`;
export const FragmentLensTransactionResult = /*#__PURE__*/ gql`
  fragment LensTransactionResult on LensTransactionResult {
    status
    txHash
    reason
    extraInfo
  }
`;
export const FragmentRelayQueueResult = /*#__PURE__*/ gql`
  fragment RelayQueueResult on RelayQueueResult {
    key
    relay {
      ...NetworkAddress
    }
    queue
  }
  ${FragmentNetworkAddress}
`;
export const FragmentHandleResult = /*#__PURE__*/ gql`
  fragment HandleResult on HandleResult {
    handle
  }
`;
export const FragmentUserSigNonces = /*#__PURE__*/ gql`
  fragment UserSigNonces on UserSigNonces {
    lensHubOnchainSigNonce
    lensTokenHandleRegistryOnchainSigNonce
  }
`;
export const AuthChallengeDocument = /*#__PURE__*/ gql`
  query AuthChallenge($request: ChallengeRequest!) {
    result: challenge(request: $request) {
      ...AuthChallenge
    }
  }
  ${FragmentAuthChallenge}
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
 *      request: // value for 'request'
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
export const AuthVerifyDocument = /*#__PURE__*/ gql`
  query AuthVerify($request: VerifyRequest!) {
    result: verify(request: $request)
  }
`;

/**
 * __useAuthVerify__
 *
 * To run a query within a React component, call `useAuthVerify` and pass it any options that fit your needs.
 * When your component renders, `useAuthVerify` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthVerify({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAuthVerify(
  baseOptions: Apollo.QueryHookOptions<AuthVerifyData, AuthVerifyVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthVerifyData, AuthVerifyVariables>(AuthVerifyDocument, options);
}
export function useAuthVerifyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AuthVerifyData, AuthVerifyVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AuthVerifyData, AuthVerifyVariables>(AuthVerifyDocument, options);
}
export type AuthVerifyHookResult = ReturnType<typeof useAuthVerify>;
export type AuthVerifyLazyQueryHookResult = ReturnType<typeof useAuthVerifyLazyQuery>;
export type AuthVerifyQueryResult = Apollo.QueryResult<AuthVerifyData, AuthVerifyVariables>;
export const AuthAuthenticateDocument = /*#__PURE__*/ gql`
  mutation AuthAuthenticate($request: SignedAuthChallenge!) {
    result: authenticate(request: $request) {
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
 *      request: // value for 'request'
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
  mutation AuthRefresh($request: RefreshRequest!) {
    result: refresh(request: $request) {
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
 *      request: // value for 'request'
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
export const ExplorePublicationsDocument = /*#__PURE__*/ gql`
  query ExplorePublications(
    $request: ExplorePublicationRequest!
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $publicationStatsInput: PublicationStatsInput! = {}
    $publicationStatsCountOpenActionArgs: PublicationStatsCountOpenActionArgs! = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: explorePublications(request: $request) {
      items {
        ... on Post {
          ...Post
        }
        ... on Quote {
          ...Quote
        }
      }
      pageInfo {
        prev
        next
      }
    }
  }
  ${FragmentPost}
  ${FragmentQuote}
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
 *      request: // value for 'request'
 *      publicationImageTransform: // value for 'publicationImageTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
 *      publicationStatsInput: // value for 'publicationStatsInput'
 *      publicationStatsCountOpenActionArgs: // value for 'publicationStatsCountOpenActionArgs'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
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
export const ExploreProfilesDocument = /*#__PURE__*/ gql`
  query ExploreProfiles(
    $request: ExploreProfilesRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: exploreProfiles(request: $request) {
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
 *      request: // value for 'request'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
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
export const FeedDocument = /*#__PURE__*/ gql`
  query Feed(
    $request: FeedRequest!
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $publicationStatsInput: PublicationStatsInput! = {}
    $publicationStatsCountOpenActionArgs: PublicationStatsCountOpenActionArgs! = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: feed(request: $request) {
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
 *      request: // value for 'request'
 *      publicationImageTransform: // value for 'publicationImageTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
 *      publicationStatsInput: // value for 'publicationStatsInput'
 *      publicationStatsCountOpenActionArgs: // value for 'publicationStatsCountOpenActionArgs'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
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
export const FeedHighlightsDocument = /*#__PURE__*/ gql`
  query FeedHighlights(
    $request: FeedHighlightsRequest!
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $publicationStatsInput: PublicationStatsInput! = {}
    $publicationStatsCountOpenActionArgs: PublicationStatsCountOpenActionArgs! = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: feedHighlights(request: $request) {
      items {
        ... on Post {
          ...Post
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
  ${FragmentPost}
  ${FragmentQuote}
  ${FragmentPaginatedResultInfo}
`;

/**
 * __useFeedHighlights__
 *
 * To run a query within a React component, call `useFeedHighlights` and pass it any options that fit your needs.
 * When your component renders, `useFeedHighlights` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedHighlights({
 *   variables: {
 *      request: // value for 'request'
 *      publicationImageTransform: // value for 'publicationImageTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
 *      publicationStatsInput: // value for 'publicationStatsInput'
 *      publicationStatsCountOpenActionArgs: // value for 'publicationStatsCountOpenActionArgs'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useFeedHighlights(
  baseOptions: Apollo.QueryHookOptions<FeedHighlightsData, FeedHighlightsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FeedHighlightsData, FeedHighlightsVariables>(
    FeedHighlightsDocument,
    options,
  );
}
export function useFeedHighlightsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FeedHighlightsData, FeedHighlightsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FeedHighlightsData, FeedHighlightsVariables>(
    FeedHighlightsDocument,
    options,
  );
}
export type FeedHighlightsHookResult = ReturnType<typeof useFeedHighlights>;
export type FeedHighlightsLazyQueryHookResult = ReturnType<typeof useFeedHighlightsLazyQuery>;
export type FeedHighlightsQueryResult = Apollo.QueryResult<
  FeedHighlightsData,
  FeedHighlightsVariables
>;
export const NotificationsDocument = /*#__PURE__*/ gql`
  query Notifications(
    $request: NotificationRequest!
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $publicationStatsInput: PublicationStatsInput! = {}
    $publicationStatsCountOpenActionArgs: PublicationStatsCountOpenActionArgs! = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: notifications(request: $request) {
      items {
        ... on ReactionNotification {
          ...ReactionNotification
        }
        ... on CommentNotification {
          ...CommentNotification
        }
        ... on MirrorNotification {
          ...MirrorNotification
        }
        ... on QuoteNotification {
          ...QuoteNotification
        }
        ... on ActedNotification {
          ...ActedNotification
        }
        ... on FollowNotification {
          ...FollowNotification
        }
        ... on MentionNotification {
          ...MentionNotification
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentReactionNotification}
  ${FragmentCommentNotification}
  ${FragmentMirrorNotification}
  ${FragmentQuoteNotification}
  ${FragmentActedNotification}
  ${FragmentFollowNotification}
  ${FragmentMentionNotification}
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
 *      request: // value for 'request'
 *      publicationImageTransform: // value for 'publicationImageTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
 *      publicationStatsInput: // value for 'publicationStatsInput'
 *      publicationStatsCountOpenActionArgs: // value for 'publicationStatsCountOpenActionArgs'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
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
export const ProfileDocument = /*#__PURE__*/ gql`
  query Profile(
    $request: ProfileRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: profile(request: $request) {
      ...Profile
    }
  }
  ${FragmentProfile}
`;

/**
 * __useProfile__
 *
 * To run a query within a React component, call `useProfile` and pass it any options that fit your needs.
 * When your component renders, `useProfile` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfile({
 *   variables: {
 *      request: // value for 'request'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useProfile(baseOptions: Apollo.QueryHookOptions<ProfileData, ProfileVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileData, ProfileVariables>(ProfileDocument, options);
}
export function useProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfileData, ProfileVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileData, ProfileVariables>(ProfileDocument, options);
}
export type ProfileHookResult = ReturnType<typeof useProfile>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileData, ProfileVariables>;
export const ProfilesDocument = /*#__PURE__*/ gql`
  query Profiles(
    $request: ProfilesRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
  ${FragmentProfile}
  ${FragmentPaginatedResultInfo}
`;

/**
 * __useProfiles__
 *
 * To run a query within a React component, call `useProfiles` and pass it any options that fit your needs.
 * When your component renders, `useProfiles` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfiles({
 *   variables: {
 *      request: // value for 'request'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useProfiles(baseOptions: Apollo.QueryHookOptions<ProfilesData, ProfilesVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfilesData, ProfilesVariables>(ProfilesDocument, options);
}
export function useProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfilesData, ProfilesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfilesData, ProfilesVariables>(ProfilesDocument, options);
}
export type ProfilesHookResult = ReturnType<typeof useProfiles>;
export type ProfilesLazyQueryHookResult = ReturnType<typeof useProfilesLazyQuery>;
export type ProfilesQueryResult = Apollo.QueryResult<ProfilesData, ProfilesVariables>;
export const ProfileManagersDocument = /*#__PURE__*/ gql`
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
  ${FragmentProfileManager}
  ${FragmentPaginatedResultInfo}
`;

/**
 * __useProfileManagers__
 *
 * To run a query within a React component, call `useProfileManagers` and pass it any options that fit your needs.
 * When your component renders, `useProfileManagers` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileManagers({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useProfileManagers(
  baseOptions: Apollo.QueryHookOptions<ProfileManagersData, ProfileManagersVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileManagersData, ProfileManagersVariables>(
    ProfileManagersDocument,
    options,
  );
}
export function useProfileManagersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfileManagersData, ProfileManagersVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileManagersData, ProfileManagersVariables>(
    ProfileManagersDocument,
    options,
  );
}
export type ProfileManagersHookResult = ReturnType<typeof useProfileManagers>;
export type ProfileManagersLazyQueryHookResult = ReturnType<typeof useProfileManagersLazyQuery>;
export type ProfileManagersQueryResult = Apollo.QueryResult<
  ProfileManagersData,
  ProfileManagersVariables
>;
export const ProfileRecommendationsDocument = /*#__PURE__*/ gql`
  query ProfileRecommendations(
    $request: ProfileRecommendationsRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
  ${FragmentProfile}
  ${FragmentPaginatedResultInfo}
`;

/**
 * __useProfileRecommendations__
 *
 * To run a query within a React component, call `useProfileRecommendations` and pass it any options that fit your needs.
 * When your component renders, `useProfileRecommendations` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileRecommendations({
 *   variables: {
 *      request: // value for 'request'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useProfileRecommendations(
  baseOptions: Apollo.QueryHookOptions<ProfileRecommendationsData, ProfileRecommendationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileRecommendationsData, ProfileRecommendationsVariables>(
    ProfileRecommendationsDocument,
    options,
  );
}
export function useProfileRecommendationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProfileRecommendationsData,
    ProfileRecommendationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileRecommendationsData, ProfileRecommendationsVariables>(
    ProfileRecommendationsDocument,
    options,
  );
}
export type ProfileRecommendationsHookResult = ReturnType<typeof useProfileRecommendations>;
export type ProfileRecommendationsLazyQueryHookResult = ReturnType<
  typeof useProfileRecommendationsLazyQuery
>;
export type ProfileRecommendationsQueryResult = Apollo.QueryResult<
  ProfileRecommendationsData,
  ProfileRecommendationsVariables
>;
export const FollowingDocument = /*#__PURE__*/ gql`
  query Following(
    $request: FollowingRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
  ${FragmentProfile}
  ${FragmentPaginatedResultInfo}
`;

/**
 * __useFollowing__
 *
 * To run a query within a React component, call `useFollowing` and pass it any options that fit your needs.
 * When your component renders, `useFollowing` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowing({
 *   variables: {
 *      request: // value for 'request'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useFollowing(
  baseOptions: Apollo.QueryHookOptions<FollowingData, FollowingVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FollowingData, FollowingVariables>(FollowingDocument, options);
}
export function useFollowingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FollowingData, FollowingVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FollowingData, FollowingVariables>(FollowingDocument, options);
}
export type FollowingHookResult = ReturnType<typeof useFollowing>;
export type FollowingLazyQueryHookResult = ReturnType<typeof useFollowingLazyQuery>;
export type FollowingQueryResult = Apollo.QueryResult<FollowingData, FollowingVariables>;
export const FollowersDocument = /*#__PURE__*/ gql`
  query Followers(
    $request: FollowersRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
  ${FragmentProfile}
  ${FragmentPaginatedResultInfo}
`;

/**
 * __useFollowers__
 *
 * To run a query within a React component, call `useFollowers` and pass it any options that fit your needs.
 * When your component renders, `useFollowers` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowers({
 *   variables: {
 *      request: // value for 'request'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useFollowers(
  baseOptions: Apollo.QueryHookOptions<FollowersData, FollowersVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FollowersData, FollowersVariables>(FollowersDocument, options);
}
export function useFollowersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FollowersData, FollowersVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FollowersData, FollowersVariables>(FollowersDocument, options);
}
export type FollowersHookResult = ReturnType<typeof useFollowers>;
export type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>;
export type FollowersQueryResult = Apollo.QueryResult<FollowersData, FollowersVariables>;
export const MutualFollowersDocument = /*#__PURE__*/ gql`
  query MutualFollowers(
    $request: MutualFollowersRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
  ${FragmentProfile}
  ${FragmentPaginatedResultInfo}
`;

/**
 * __useMutualFollowers__
 *
 * To run a query within a React component, call `useMutualFollowers` and pass it any options that fit your needs.
 * When your component renders, `useMutualFollowers` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMutualFollowers({
 *   variables: {
 *      request: // value for 'request'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useMutualFollowers(
  baseOptions: Apollo.QueryHookOptions<MutualFollowersData, MutualFollowersVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MutualFollowersData, MutualFollowersVariables>(
    MutualFollowersDocument,
    options,
  );
}
export function useMutualFollowersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MutualFollowersData, MutualFollowersVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MutualFollowersData, MutualFollowersVariables>(
    MutualFollowersDocument,
    options,
  );
}
export type MutualFollowersHookResult = ReturnType<typeof useMutualFollowers>;
export type MutualFollowersLazyQueryHookResult = ReturnType<typeof useMutualFollowersLazyQuery>;
export type MutualFollowersQueryResult = Apollo.QueryResult<
  MutualFollowersData,
  MutualFollowersVariables
>;
export const WhoActedOnPublicationDocument = /*#__PURE__*/ gql`
  query WhoActedOnPublication(
    $request: WhoActedOnPublicationRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: whoActedOnPublication(request: $request) {
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
 * __useWhoActedOnPublication__
 *
 * To run a query within a React component, call `useWhoActedOnPublication` and pass it any options that fit your needs.
 * When your component renders, `useWhoActedOnPublication` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoActedOnPublication({
 *   variables: {
 *      request: // value for 'request'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useWhoActedOnPublication(
  baseOptions: Apollo.QueryHookOptions<WhoActedOnPublicationData, WhoActedOnPublicationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WhoActedOnPublicationData, WhoActedOnPublicationVariables>(
    WhoActedOnPublicationDocument,
    options,
  );
}
export function useWhoActedOnPublicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WhoActedOnPublicationData,
    WhoActedOnPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WhoActedOnPublicationData, WhoActedOnPublicationVariables>(
    WhoActedOnPublicationDocument,
    options,
  );
}
export type WhoActedOnPublicationHookResult = ReturnType<typeof useWhoActedOnPublication>;
export type WhoActedOnPublicationLazyQueryHookResult = ReturnType<
  typeof useWhoActedOnPublicationLazyQuery
>;
export type WhoActedOnPublicationQueryResult = Apollo.QueryResult<
  WhoActedOnPublicationData,
  WhoActedOnPublicationVariables
>;
export const ClaimProfileDocument = /*#__PURE__*/ gql`
  mutation ClaimProfile($request: ClaimProfileRequest!) {
    result: claimProfile(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on CreateProfileWithHandleErrorResult {
        ...CreateProfileWithHandleErrorResult
      }
    }
  }
  ${FragmentRelaySuccess}
  ${FragmentCreateProfileWithHandleErrorResult}
`;
export type ClaimProfileMutationFn = Apollo.MutationFunction<
  ClaimProfileData,
  ClaimProfileVariables
>;

/**
 * __useClaimProfile__
 *
 * To run a mutation, you first call `useClaimProfile` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClaimProfile` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [claimProfile, { data, loading, error }] = useClaimProfile({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useClaimProfile(
  baseOptions?: Apollo.MutationHookOptions<ClaimProfileData, ClaimProfileVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ClaimProfileData, ClaimProfileVariables>(ClaimProfileDocument, options);
}
export type ClaimProfileHookResult = ReturnType<typeof useClaimProfile>;
export type ClaimProfileMutationResult = Apollo.MutationResult<ClaimProfileData>;
export type ClaimProfileMutationOptions = Apollo.BaseMutationOptions<
  ClaimProfileData,
  ClaimProfileVariables
>;
export const CreateProfileWithHandleDocument = /*#__PURE__*/ gql`
  mutation CreateProfileWithHandle($request: CreateProfileWithHandleRequest!) {
    result: createProfileWithHandle(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on CreateProfileWithHandleErrorResult {
        ...CreateProfileWithHandleErrorResult
      }
    }
  }
  ${FragmentRelaySuccess}
  ${FragmentCreateProfileWithHandleErrorResult}
`;
export type CreateProfileWithHandleMutationFn = Apollo.MutationFunction<
  CreateProfileWithHandleData,
  CreateProfileWithHandleVariables
>;

/**
 * __useCreateProfileWithHandle__
 *
 * To run a mutation, you first call `useCreateProfileWithHandle` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileWithHandle` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileWithHandle, { data, loading, error }] = useCreateProfileWithHandle({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateProfileWithHandle(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProfileWithHandleData,
    CreateProfileWithHandleVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateProfileWithHandleData, CreateProfileWithHandleVariables>(
    CreateProfileWithHandleDocument,
    options,
  );
}
export type CreateProfileWithHandleHookResult = ReturnType<typeof useCreateProfileWithHandle>;
export type CreateProfileWithHandleMutationResult =
  Apollo.MutationResult<CreateProfileWithHandleData>;
export type CreateProfileWithHandleMutationOptions = Apollo.BaseMutationOptions<
  CreateProfileWithHandleData,
  CreateProfileWithHandleVariables
>;
export const AddProfileInterestsDocument = /*#__PURE__*/ gql`
  mutation AddProfileInterests($request: ProfileInterestsRequest!) {
    result: addProfileInterests(request: $request)
  }
`;
export type AddProfileInterestsMutationFn = Apollo.MutationFunction<
  AddProfileInterestsData,
  AddProfileInterestsVariables
>;

/**
 * __useAddProfileInterests__
 *
 * To run a mutation, you first call `useAddProfileInterests` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfileInterests` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfileInterests, { data, loading, error }] = useAddProfileInterests({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddProfileInterests(
  baseOptions?: Apollo.MutationHookOptions<AddProfileInterestsData, AddProfileInterestsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddProfileInterestsData, AddProfileInterestsVariables>(
    AddProfileInterestsDocument,
    options,
  );
}
export type AddProfileInterestsHookResult = ReturnType<typeof useAddProfileInterests>;
export type AddProfileInterestsMutationResult = Apollo.MutationResult<AddProfileInterestsData>;
export type AddProfileInterestsMutationOptions = Apollo.BaseMutationOptions<
  AddProfileInterestsData,
  AddProfileInterestsVariables
>;
export const RemoveProfileInterestsDocument = /*#__PURE__*/ gql`
  mutation RemoveProfileInterests($request: ProfileInterestsRequest!) {
    result: removeProfileInterests(request: $request)
  }
`;
export type RemoveProfileInterestsMutationFn = Apollo.MutationFunction<
  RemoveProfileInterestsData,
  RemoveProfileInterestsVariables
>;

/**
 * __useRemoveProfileInterests__
 *
 * To run a mutation, you first call `useRemoveProfileInterests` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProfileInterests` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProfileInterests, { data, loading, error }] = useRemoveProfileInterests({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRemoveProfileInterests(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProfileInterestsData,
    RemoveProfileInterestsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveProfileInterestsData, RemoveProfileInterestsVariables>(
    RemoveProfileInterestsDocument,
    options,
  );
}
export type RemoveProfileInterestsHookResult = ReturnType<typeof useRemoveProfileInterests>;
export type RemoveProfileInterestsMutationResult =
  Apollo.MutationResult<RemoveProfileInterestsData>;
export type RemoveProfileInterestsMutationOptions = Apollo.BaseMutationOptions<
  RemoveProfileInterestsData,
  RemoveProfileInterestsVariables
>;
export const SetProfileMetadataDocument = /*#__PURE__*/ gql`
  mutation SetProfileMetadata($request: OnchainSetProfileMetadataRequest!) {
    result: setProfileMetadata(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type SetProfileMetadataMutationFn = Apollo.MutationFunction<
  SetProfileMetadataData,
  SetProfileMetadataVariables
>;

/**
 * __useSetProfileMetadata__
 *
 * To run a mutation, you first call `useSetProfileMetadata` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetProfileMetadata` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setProfileMetadata, { data, loading, error }] = useSetProfileMetadata({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetProfileMetadata(
  baseOptions?: Apollo.MutationHookOptions<SetProfileMetadataData, SetProfileMetadataVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SetProfileMetadataData, SetProfileMetadataVariables>(
    SetProfileMetadataDocument,
    options,
  );
}
export type SetProfileMetadataHookResult = ReturnType<typeof useSetProfileMetadata>;
export type SetProfileMetadataMutationResult = Apollo.MutationResult<SetProfileMetadataData>;
export type SetProfileMetadataMutationOptions = Apollo.BaseMutationOptions<
  SetProfileMetadataData,
  SetProfileMetadataVariables
>;
export const BlockDocument = /*#__PURE__*/ gql`
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
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type BlockMutationFn = Apollo.MutationFunction<BlockData, BlockVariables>;

/**
 * __useBlock__
 *
 * To run a mutation, you first call `useBlock` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlock` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [block, { data, loading, error }] = useBlock({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBlock(baseOptions?: Apollo.MutationHookOptions<BlockData, BlockVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BlockData, BlockVariables>(BlockDocument, options);
}
export type BlockHookResult = ReturnType<typeof useBlock>;
export type BlockMutationResult = Apollo.MutationResult<BlockData>;
export type BlockMutationOptions = Apollo.BaseMutationOptions<BlockData, BlockVariables>;
export const UnblockDocument = /*#__PURE__*/ gql`
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
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type UnblockMutationFn = Apollo.MutationFunction<UnblockData, UnblockVariables>;

/**
 * __useUnblock__
 *
 * To run a mutation, you first call `useUnblock` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblock` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblock, { data, loading, error }] = useUnblock({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnblock(
  baseOptions?: Apollo.MutationHookOptions<UnblockData, UnblockVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnblockData, UnblockVariables>(UnblockDocument, options);
}
export type UnblockHookResult = ReturnType<typeof useUnblock>;
export type UnblockMutationResult = Apollo.MutationResult<UnblockData>;
export type UnblockMutationOptions = Apollo.BaseMutationOptions<UnblockData, UnblockVariables>;
export const FollowDocument = /*#__PURE__*/ gql`
  mutation Follow($request: FollowLensManagerRequest!) {
    result: follow(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type FollowMutationFn = Apollo.MutationFunction<FollowData, FollowVariables>;

/**
 * __useFollow__
 *
 * To run a mutation, you first call `useFollow` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollow` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [follow, { data, loading, error }] = useFollow({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useFollow(baseOptions?: Apollo.MutationHookOptions<FollowData, FollowVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<FollowData, FollowVariables>(FollowDocument, options);
}
export type FollowHookResult = ReturnType<typeof useFollow>;
export type FollowMutationResult = Apollo.MutationResult<FollowData>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowData, FollowVariables>;
export const UnfollowDocument = /*#__PURE__*/ gql`
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
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowData, UnfollowVariables>;

/**
 * __useUnfollow__
 *
 * To run a mutation, you first call `useUnfollow` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollow` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollow, { data, loading, error }] = useUnfollow({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnfollow(
  baseOptions?: Apollo.MutationHookOptions<UnfollowData, UnfollowVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnfollowData, UnfollowVariables>(UnfollowDocument, options);
}
export type UnfollowHookResult = ReturnType<typeof useUnfollow>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowData>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowData, UnfollowVariables>;
export const DismissRecommendedProfilesDocument = /*#__PURE__*/ gql`
  mutation DismissRecommendedProfiles($request: DismissRecommendedProfilesRequest!) {
    result: dismissRecommendedProfiles(request: $request)
  }
`;
export type DismissRecommendedProfilesMutationFn = Apollo.MutationFunction<
  DismissRecommendedProfilesData,
  DismissRecommendedProfilesVariables
>;

/**
 * __useDismissRecommendedProfiles__
 *
 * To run a mutation, you first call `useDismissRecommendedProfiles` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDismissRecommendedProfiles` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dismissRecommendedProfiles, { data, loading, error }] = useDismissRecommendedProfiles({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDismissRecommendedProfiles(
  baseOptions?: Apollo.MutationHookOptions<
    DismissRecommendedProfilesData,
    DismissRecommendedProfilesVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DismissRecommendedProfilesData, DismissRecommendedProfilesVariables>(
    DismissRecommendedProfilesDocument,
    options,
  );
}
export type DismissRecommendedProfilesHookResult = ReturnType<typeof useDismissRecommendedProfiles>;
export type DismissRecommendedProfilesMutationResult =
  Apollo.MutationResult<DismissRecommendedProfilesData>;
export type DismissRecommendedProfilesMutationOptions = Apollo.BaseMutationOptions<
  DismissRecommendedProfilesData,
  DismissRecommendedProfilesVariables
>;
export const CreateOnchainSetProfileMetadataTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateOnchainSetProfileMetadataTypedData(
    $request: OnchainSetProfileMetadataRequest!
    $options: TypedDataOptions
  ) {
    result: createOnchainSetProfileMetadataTypedData(request: $request, options: $options) {
      ...CreateOnchainSetProfileMetadataBroadcastItemResult
    }
  }
  ${FragmentCreateOnchainSetProfileMetadataBroadcastItemResult}
`;
export type CreateOnchainSetProfileMetadataTypedDataMutationFn = Apollo.MutationFunction<
  CreateOnchainSetProfileMetadataTypedDataData,
  CreateOnchainSetProfileMetadataTypedDataVariables
>;

/**
 * __useCreateOnchainSetProfileMetadataTypedData__
 *
 * To run a mutation, you first call `useCreateOnchainSetProfileMetadataTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnchainSetProfileMetadataTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnchainSetProfileMetadataTypedData, { data, loading, error }] = useCreateOnchainSetProfileMetadataTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOnchainSetProfileMetadataTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOnchainSetProfileMetadataTypedDataData,
    CreateOnchainSetProfileMetadataTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOnchainSetProfileMetadataTypedDataData,
    CreateOnchainSetProfileMetadataTypedDataVariables
  >(CreateOnchainSetProfileMetadataTypedDataDocument, options);
}
export type CreateOnchainSetProfileMetadataTypedDataHookResult = ReturnType<
  typeof useCreateOnchainSetProfileMetadataTypedData
>;
export type CreateOnchainSetProfileMetadataTypedDataMutationResult =
  Apollo.MutationResult<CreateOnchainSetProfileMetadataTypedDataData>;
export type CreateOnchainSetProfileMetadataTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateOnchainSetProfileMetadataTypedDataData,
  CreateOnchainSetProfileMetadataTypedDataVariables
>;
export const CreateChangeProfileManagersTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateChangeProfileManagersTypedData(
    $request: ChangeProfileManagersRequest!
    $options: TypedDataOptions
  ) {
    result: createChangeProfileManagersTypedData(request: $request, options: $options) {
      ...CreateChangeProfileManagersBroadcastItemResult
    }
  }
  ${FragmentCreateChangeProfileManagersBroadcastItemResult}
`;
export type CreateChangeProfileManagersTypedDataMutationFn = Apollo.MutationFunction<
  CreateChangeProfileManagersTypedDataData,
  CreateChangeProfileManagersTypedDataVariables
>;

/**
 * __useCreateChangeProfileManagersTypedData__
 *
 * To run a mutation, you first call `useCreateChangeProfileManagersTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChangeProfileManagersTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChangeProfileManagersTypedData, { data, loading, error }] = useCreateChangeProfileManagersTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateChangeProfileManagersTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChangeProfileManagersTypedDataData,
    CreateChangeProfileManagersTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateChangeProfileManagersTypedDataData,
    CreateChangeProfileManagersTypedDataVariables
  >(CreateChangeProfileManagersTypedDataDocument, options);
}
export type CreateChangeProfileManagersTypedDataHookResult = ReturnType<
  typeof useCreateChangeProfileManagersTypedData
>;
export type CreateChangeProfileManagersTypedDataMutationResult =
  Apollo.MutationResult<CreateChangeProfileManagersTypedDataData>;
export type CreateChangeProfileManagersTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateChangeProfileManagersTypedDataData,
  CreateChangeProfileManagersTypedDataVariables
>;
export const CreateBlockProfilesTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateBlockProfilesTypedData($request: BlockRequest!, $options: TypedDataOptions) {
    result: createBlockProfilesTypedData(request: $request, options: $options) {
      ...CreateBlockProfilesBroadcastItemResult
    }
  }
  ${FragmentCreateBlockProfilesBroadcastItemResult}
`;
export type CreateBlockProfilesTypedDataMutationFn = Apollo.MutationFunction<
  CreateBlockProfilesTypedDataData,
  CreateBlockProfilesTypedDataVariables
>;

/**
 * __useCreateBlockProfilesTypedData__
 *
 * To run a mutation, you first call `useCreateBlockProfilesTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlockProfilesTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlockProfilesTypedData, { data, loading, error }] = useCreateBlockProfilesTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateBlockProfilesTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBlockProfilesTypedDataData,
    CreateBlockProfilesTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateBlockProfilesTypedDataData,
    CreateBlockProfilesTypedDataVariables
  >(CreateBlockProfilesTypedDataDocument, options);
}
export type CreateBlockProfilesTypedDataHookResult = ReturnType<
  typeof useCreateBlockProfilesTypedData
>;
export type CreateBlockProfilesTypedDataMutationResult =
  Apollo.MutationResult<CreateBlockProfilesTypedDataData>;
export type CreateBlockProfilesTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateBlockProfilesTypedDataData,
  CreateBlockProfilesTypedDataVariables
>;
export const CreateUnblockProfilesTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateUnblockProfilesTypedData($request: UnblockRequest!, $options: TypedDataOptions) {
    result: createUnblockProfilesTypedData(request: $request, options: $options) {
      ...CreateUnblockProfilesBroadcastItemResult
    }
  }
  ${FragmentCreateUnblockProfilesBroadcastItemResult}
`;
export type CreateUnblockProfilesTypedDataMutationFn = Apollo.MutationFunction<
  CreateUnblockProfilesTypedDataData,
  CreateUnblockProfilesTypedDataVariables
>;

/**
 * __useCreateUnblockProfilesTypedData__
 *
 * To run a mutation, you first call `useCreateUnblockProfilesTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnblockProfilesTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnblockProfilesTypedData, { data, loading, error }] = useCreateUnblockProfilesTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateUnblockProfilesTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUnblockProfilesTypedDataData,
    CreateUnblockProfilesTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateUnblockProfilesTypedDataData,
    CreateUnblockProfilesTypedDataVariables
  >(CreateUnblockProfilesTypedDataDocument, options);
}
export type CreateUnblockProfilesTypedDataHookResult = ReturnType<
  typeof useCreateUnblockProfilesTypedData
>;
export type CreateUnblockProfilesTypedDataMutationResult =
  Apollo.MutationResult<CreateUnblockProfilesTypedDataData>;
export type CreateUnblockProfilesTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateUnblockProfilesTypedDataData,
  CreateUnblockProfilesTypedDataVariables
>;
export const CreateFollowTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateFollowTypedData($request: FollowRequest!, $options: TypedDataOptions) {
    result: createFollowTypedData(request: $request, options: $options) {
      ...CreateFollowBroadcastItemResult
    }
  }
  ${FragmentCreateFollowBroadcastItemResult}
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
export const CreateUnfollowTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateUnfollowTypedData($request: UnfollowRequest!, $options: TypedDataOptions) {
    result: createUnfollowTypedData(request: $request, options: $options) {
      ...CreateUnfollowBroadcastItemResult
    }
  }
  ${FragmentCreateUnfollowBroadcastItemResult}
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
 *      options: // value for 'options'
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
export const SetFollowModuleDocument = /*#__PURE__*/ gql`
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
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type SetFollowModuleMutationFn = Apollo.MutationFunction<
  SetFollowModuleData,
  SetFollowModuleVariables
>;

/**
 * __useSetFollowModule__
 *
 * To run a mutation, you first call `useSetFollowModule` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetFollowModule` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setFollowModule, { data, loading, error }] = useSetFollowModule({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetFollowModule(
  baseOptions?: Apollo.MutationHookOptions<SetFollowModuleData, SetFollowModuleVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SetFollowModuleData, SetFollowModuleVariables>(
    SetFollowModuleDocument,
    options,
  );
}
export type SetFollowModuleHookResult = ReturnType<typeof useSetFollowModule>;
export type SetFollowModuleMutationResult = Apollo.MutationResult<SetFollowModuleData>;
export type SetFollowModuleMutationOptions = Apollo.BaseMutationOptions<
  SetFollowModuleData,
  SetFollowModuleVariables
>;
export const CreateSetFollowModuleTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateSetFollowModuleTypedData(
    $request: SetFollowModuleRequest!
    $options: TypedDataOptions
  ) {
    result: createSetFollowModuleTypedData(request: $request, options: $options) {
      ...CreateSetFollowModuleBroadcastItemResult
    }
  }
  ${FragmentCreateSetFollowModuleBroadcastItemResult}
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
export const HandleLinkToProfileDocument = /*#__PURE__*/ gql`
  mutation HandleLinkToProfile($request: HandleLinkToProfileRequest!) {
    result: handleLinkToProfile(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type HandleLinkToProfileMutationFn = Apollo.MutationFunction<
  HandleLinkToProfileData,
  HandleLinkToProfileVariables
>;

/**
 * __useHandleLinkToProfile__
 *
 * To run a mutation, you first call `useHandleLinkToProfile` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleLinkToProfile` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleLinkToProfile, { data, loading, error }] = useHandleLinkToProfile({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useHandleLinkToProfile(
  baseOptions?: Apollo.MutationHookOptions<HandleLinkToProfileData, HandleLinkToProfileVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<HandleLinkToProfileData, HandleLinkToProfileVariables>(
    HandleLinkToProfileDocument,
    options,
  );
}
export type HandleLinkToProfileHookResult = ReturnType<typeof useHandleLinkToProfile>;
export type HandleLinkToProfileMutationResult = Apollo.MutationResult<HandleLinkToProfileData>;
export type HandleLinkToProfileMutationOptions = Apollo.BaseMutationOptions<
  HandleLinkToProfileData,
  HandleLinkToProfileVariables
>;
export const HandleUnlinkFromProfileDocument = /*#__PURE__*/ gql`
  mutation HandleUnlinkFromProfile($request: HandleUnlinkFromProfileRequest!) {
    result: handleUnlinkFromProfile(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type HandleUnlinkFromProfileMutationFn = Apollo.MutationFunction<
  HandleUnlinkFromProfileData,
  HandleUnlinkFromProfileVariables
>;

/**
 * __useHandleUnlinkFromProfile__
 *
 * To run a mutation, you first call `useHandleUnlinkFromProfile` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleUnlinkFromProfile` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleUnlinkFromProfile, { data, loading, error }] = useHandleUnlinkFromProfile({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useHandleUnlinkFromProfile(
  baseOptions?: Apollo.MutationHookOptions<
    HandleUnlinkFromProfileData,
    HandleUnlinkFromProfileVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<HandleUnlinkFromProfileData, HandleUnlinkFromProfileVariables>(
    HandleUnlinkFromProfileDocument,
    options,
  );
}
export type HandleUnlinkFromProfileHookResult = ReturnType<typeof useHandleUnlinkFromProfile>;
export type HandleUnlinkFromProfileMutationResult =
  Apollo.MutationResult<HandleUnlinkFromProfileData>;
export type HandleUnlinkFromProfileMutationOptions = Apollo.BaseMutationOptions<
  HandleUnlinkFromProfileData,
  HandleUnlinkFromProfileVariables
>;
export const CreateHandleLinkToProfileTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateHandleLinkToProfileTypedData($request: HandleLinkToProfileRequest!) {
    result: createHandleLinkToProfileTypedData(request: $request) {
      ...CreateHandleLinkToProfileBroadcastItemResult
    }
  }
  ${FragmentCreateHandleLinkToProfileBroadcastItemResult}
`;
export type CreateHandleLinkToProfileTypedDataMutationFn = Apollo.MutationFunction<
  CreateHandleLinkToProfileTypedDataData,
  CreateHandleLinkToProfileTypedDataVariables
>;

/**
 * __useCreateHandleLinkToProfileTypedData__
 *
 * To run a mutation, you first call `useCreateHandleLinkToProfileTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHandleLinkToProfileTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHandleLinkToProfileTypedData, { data, loading, error }] = useCreateHandleLinkToProfileTypedData({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateHandleLinkToProfileTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateHandleLinkToProfileTypedDataData,
    CreateHandleLinkToProfileTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateHandleLinkToProfileTypedDataData,
    CreateHandleLinkToProfileTypedDataVariables
  >(CreateHandleLinkToProfileTypedDataDocument, options);
}
export type CreateHandleLinkToProfileTypedDataHookResult = ReturnType<
  typeof useCreateHandleLinkToProfileTypedData
>;
export type CreateHandleLinkToProfileTypedDataMutationResult =
  Apollo.MutationResult<CreateHandleLinkToProfileTypedDataData>;
export type CreateHandleLinkToProfileTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateHandleLinkToProfileTypedDataData,
  CreateHandleLinkToProfileTypedDataVariables
>;
export const CreateHandleUnlinkFromProfileTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateHandleUnlinkFromProfileTypedData($request: HandleUnlinkFromProfileRequest!) {
    result: createHandleUnlinkFromProfileTypedData(request: $request) {
      ...CreateHandleUnlinkFromProfileBroadcastItemResult
    }
  }
  ${FragmentCreateHandleUnlinkFromProfileBroadcastItemResult}
`;
export type CreateHandleUnlinkFromProfileTypedDataMutationFn = Apollo.MutationFunction<
  CreateHandleUnlinkFromProfileTypedDataData,
  CreateHandleUnlinkFromProfileTypedDataVariables
>;

/**
 * __useCreateHandleUnlinkFromProfileTypedData__
 *
 * To run a mutation, you first call `useCreateHandleUnlinkFromProfileTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHandleUnlinkFromProfileTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHandleUnlinkFromProfileTypedData, { data, loading, error }] = useCreateHandleUnlinkFromProfileTypedData({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateHandleUnlinkFromProfileTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateHandleUnlinkFromProfileTypedDataData,
    CreateHandleUnlinkFromProfileTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateHandleUnlinkFromProfileTypedDataData,
    CreateHandleUnlinkFromProfileTypedDataVariables
  >(CreateHandleUnlinkFromProfileTypedDataDocument, options);
}
export type CreateHandleUnlinkFromProfileTypedDataHookResult = ReturnType<
  typeof useCreateHandleUnlinkFromProfileTypedData
>;
export type CreateHandleUnlinkFromProfileTypedDataMutationResult =
  Apollo.MutationResult<CreateHandleUnlinkFromProfileTypedDataData>;
export type CreateHandleUnlinkFromProfileTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateHandleUnlinkFromProfileTypedDataData,
  CreateHandleUnlinkFromProfileTypedDataVariables
>;
export const PublicationDocument = /*#__PURE__*/ gql`
  query Publication(
    $request: PublicationRequest!
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $publicationStatsInput: PublicationStatsInput! = {}
    $publicationStatsCountOpenActionArgs: PublicationStatsCountOpenActionArgs! = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
  ${FragmentPost}
  ${FragmentMirror}
  ${FragmentComment}
  ${FragmentQuote}
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
 *      request: // value for 'request'
 *      publicationImageTransform: // value for 'publicationImageTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
 *      publicationStatsInput: // value for 'publicationStatsInput'
 *      publicationStatsCountOpenActionArgs: // value for 'publicationStatsCountOpenActionArgs'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function usePublication(
  baseOptions: Apollo.QueryHookOptions<PublicationData, PublicationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PublicationData, PublicationVariables>(PublicationDocument, options);
}
export function usePublicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PublicationData, PublicationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PublicationData, PublicationVariables>(PublicationDocument, options);
}
export type PublicationHookResult = ReturnType<typeof usePublication>;
export type PublicationLazyQueryHookResult = ReturnType<typeof usePublicationLazyQuery>;
export type PublicationQueryResult = Apollo.QueryResult<PublicationData, PublicationVariables>;
export const PublicationsDocument = /*#__PURE__*/ gql`
  query Publications(
    $where: PublicationsWhere!
    $orderBy: PublicationsOrderByType
    $limit: LimitType
    $cursor: Cursor
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $publicationStatsInput: PublicationStatsInput! = {}
    $publicationStatsCountOpenActionArgs: PublicationStatsCountOpenActionArgs! = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: publications(
      request: { where: $where, orderBy: $orderBy, limit: $limit, cursor: $cursor }
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
        ... on Quote {
          ...Quote
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
  ${FragmentQuote}
  ${FragmentPaginatedResultInfo}
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
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      publicationImageTransform: // value for 'publicationImageTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
 *      publicationStatsInput: // value for 'publicationStatsInput'
 *      publicationStatsCountOpenActionArgs: // value for 'publicationStatsCountOpenActionArgs'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function usePublications(
  baseOptions: Apollo.QueryHookOptions<PublicationsData, PublicationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PublicationsData, PublicationsVariables>(PublicationsDocument, options);
}
export function usePublicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PublicationsData, PublicationsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PublicationsData, PublicationsVariables>(
    PublicationsDocument,
    options,
  );
}
export type PublicationsHookResult = ReturnType<typeof usePublications>;
export type PublicationsLazyQueryHookResult = ReturnType<typeof usePublicationsLazyQuery>;
export type PublicationsQueryResult = Apollo.QueryResult<PublicationsData, PublicationsVariables>;
export const PublicationsTagsDocument = /*#__PURE__*/ gql`
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
  ${FragmentTagResult}
  ${FragmentPaginatedResultInfo}
`;

/**
 * __usePublicationsTags__
 *
 * To run a query within a React component, call `usePublicationsTags` and pass it any options that fit your needs.
 * When your component renders, `usePublicationsTags` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationsTags({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePublicationsTags(
  baseOptions: Apollo.QueryHookOptions<PublicationsTagsData, PublicationsTagsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PublicationsTagsData, PublicationsTagsVariables>(
    PublicationsTagsDocument,
    options,
  );
}
export function usePublicationsTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PublicationsTagsData, PublicationsTagsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PublicationsTagsData, PublicationsTagsVariables>(
    PublicationsTagsDocument,
    options,
  );
}
export type PublicationsTagsHookResult = ReturnType<typeof usePublicationsTags>;
export type PublicationsTagsLazyQueryHookResult = ReturnType<typeof usePublicationsTagsLazyQuery>;
export type PublicationsTagsQueryResult = Apollo.QueryResult<
  PublicationsTagsData,
  PublicationsTagsVariables
>;
export const ValidatePublicationMetadataDocument = /*#__PURE__*/ gql`
  query ValidatePublicationMetadata($request: ValidatePublicationMetadataRequest!) {
    result: validatePublicationMetadata(request: $request) {
      ...PublicationValidateMetadataResult
    }
  }
  ${FragmentPublicationValidateMetadataResult}
`;

/**
 * __useValidatePublicationMetadata__
 *
 * To run a query within a React component, call `useValidatePublicationMetadata` and pass it any options that fit your needs.
 * When your component renders, `useValidatePublicationMetadata` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatePublicationMetadata({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useValidatePublicationMetadata(
  baseOptions: Apollo.QueryHookOptions<
    ValidatePublicationMetadataData,
    ValidatePublicationMetadataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ValidatePublicationMetadataData, ValidatePublicationMetadataVariables>(
    ValidatePublicationMetadataDocument,
    options,
  );
}
export function useValidatePublicationMetadataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ValidatePublicationMetadataData,
    ValidatePublicationMetadataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ValidatePublicationMetadataData, ValidatePublicationMetadataVariables>(
    ValidatePublicationMetadataDocument,
    options,
  );
}
export type ValidatePublicationMetadataHookResult = ReturnType<
  typeof useValidatePublicationMetadata
>;
export type ValidatePublicationMetadataLazyQueryHookResult = ReturnType<
  typeof useValidatePublicationMetadataLazyQuery
>;
export type ValidatePublicationMetadataQueryResult = Apollo.QueryResult<
  ValidatePublicationMetadataData,
  ValidatePublicationMetadataVariables
>;
export const CreateOnchainPostTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateOnchainPostTypedData($request: OnchainPostRequest!, $options: TypedDataOptions) {
    result: createOnchainPostTypedData(request: $request, options: $options) {
      ...CreateOnchainPostBroadcastItemResult
    }
  }
  ${FragmentCreateOnchainPostBroadcastItemResult}
`;
export type CreateOnchainPostTypedDataMutationFn = Apollo.MutationFunction<
  CreateOnchainPostTypedDataData,
  CreateOnchainPostTypedDataVariables
>;

/**
 * __useCreateOnchainPostTypedData__
 *
 * To run a mutation, you first call `useCreateOnchainPostTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnchainPostTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnchainPostTypedData, { data, loading, error }] = useCreateOnchainPostTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOnchainPostTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOnchainPostTypedDataData,
    CreateOnchainPostTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOnchainPostTypedDataData, CreateOnchainPostTypedDataVariables>(
    CreateOnchainPostTypedDataDocument,
    options,
  );
}
export type CreateOnchainPostTypedDataHookResult = ReturnType<typeof useCreateOnchainPostTypedData>;
export type CreateOnchainPostTypedDataMutationResult =
  Apollo.MutationResult<CreateOnchainPostTypedDataData>;
export type CreateOnchainPostTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateOnchainPostTypedDataData,
  CreateOnchainPostTypedDataVariables
>;
export const CreateOnchainCommentTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateOnchainCommentTypedData(
    $request: OnchainCommentRequest!
    $options: TypedDataOptions
  ) {
    result: createOnchainCommentTypedData(request: $request, options: $options) {
      ...CreateOnchainCommentBroadcastItemResult
    }
  }
  ${FragmentCreateOnchainCommentBroadcastItemResult}
`;
export type CreateOnchainCommentTypedDataMutationFn = Apollo.MutationFunction<
  CreateOnchainCommentTypedDataData,
  CreateOnchainCommentTypedDataVariables
>;

/**
 * __useCreateOnchainCommentTypedData__
 *
 * To run a mutation, you first call `useCreateOnchainCommentTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnchainCommentTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnchainCommentTypedData, { data, loading, error }] = useCreateOnchainCommentTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOnchainCommentTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOnchainCommentTypedDataData,
    CreateOnchainCommentTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOnchainCommentTypedDataData,
    CreateOnchainCommentTypedDataVariables
  >(CreateOnchainCommentTypedDataDocument, options);
}
export type CreateOnchainCommentTypedDataHookResult = ReturnType<
  typeof useCreateOnchainCommentTypedData
>;
export type CreateOnchainCommentTypedDataMutationResult =
  Apollo.MutationResult<CreateOnchainCommentTypedDataData>;
export type CreateOnchainCommentTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateOnchainCommentTypedDataData,
  CreateOnchainCommentTypedDataVariables
>;
export const CreateOnchainMirrorTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateOnchainMirrorTypedData(
    $request: OnchainMirrorRequest!
    $options: TypedDataOptions
  ) {
    result: createOnchainMirrorTypedData(request: $request, options: $options) {
      ...CreateOnchainMirrorBroadcastItemResult
    }
  }
  ${FragmentCreateOnchainMirrorBroadcastItemResult}
`;
export type CreateOnchainMirrorTypedDataMutationFn = Apollo.MutationFunction<
  CreateOnchainMirrorTypedDataData,
  CreateOnchainMirrorTypedDataVariables
>;

/**
 * __useCreateOnchainMirrorTypedData__
 *
 * To run a mutation, you first call `useCreateOnchainMirrorTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnchainMirrorTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnchainMirrorTypedData, { data, loading, error }] = useCreateOnchainMirrorTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOnchainMirrorTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOnchainMirrorTypedDataData,
    CreateOnchainMirrorTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOnchainMirrorTypedDataData,
    CreateOnchainMirrorTypedDataVariables
  >(CreateOnchainMirrorTypedDataDocument, options);
}
export type CreateOnchainMirrorTypedDataHookResult = ReturnType<
  typeof useCreateOnchainMirrorTypedData
>;
export type CreateOnchainMirrorTypedDataMutationResult =
  Apollo.MutationResult<CreateOnchainMirrorTypedDataData>;
export type CreateOnchainMirrorTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateOnchainMirrorTypedDataData,
  CreateOnchainMirrorTypedDataVariables
>;
export const CreateOnchainQuoteTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateOnchainQuoteTypedData($request: OnchainQuoteRequest!, $options: TypedDataOptions) {
    result: createOnchainQuoteTypedData(request: $request, options: $options) {
      ...CreateOnchainQuoteBroadcastItemResult
    }
  }
  ${FragmentCreateOnchainQuoteBroadcastItemResult}
`;
export type CreateOnchainQuoteTypedDataMutationFn = Apollo.MutationFunction<
  CreateOnchainQuoteTypedDataData,
  CreateOnchainQuoteTypedDataVariables
>;

/**
 * __useCreateOnchainQuoteTypedData__
 *
 * To run a mutation, you first call `useCreateOnchainQuoteTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnchainQuoteTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnchainQuoteTypedData, { data, loading, error }] = useCreateOnchainQuoteTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOnchainQuoteTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOnchainQuoteTypedDataData,
    CreateOnchainQuoteTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOnchainQuoteTypedDataData, CreateOnchainQuoteTypedDataVariables>(
    CreateOnchainQuoteTypedDataDocument,
    options,
  );
}
export type CreateOnchainQuoteTypedDataHookResult = ReturnType<
  typeof useCreateOnchainQuoteTypedData
>;
export type CreateOnchainQuoteTypedDataMutationResult =
  Apollo.MutationResult<CreateOnchainQuoteTypedDataData>;
export type CreateOnchainQuoteTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateOnchainQuoteTypedDataData,
  CreateOnchainQuoteTypedDataVariables
>;
export const CreateMomokaPostTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateMomokaPostTypedData($request: MomokaPostRequest!) {
    result: createMomokaPostTypedData(request: $request) {
      ...CreateMomokaPostBroadcastItemResult
    }
  }
  ${FragmentCreateMomokaPostBroadcastItemResult}
`;
export type CreateMomokaPostTypedDataMutationFn = Apollo.MutationFunction<
  CreateMomokaPostTypedDataData,
  CreateMomokaPostTypedDataVariables
>;

/**
 * __useCreateMomokaPostTypedData__
 *
 * To run a mutation, you first call `useCreateMomokaPostTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMomokaPostTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMomokaPostTypedData, { data, loading, error }] = useCreateMomokaPostTypedData({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateMomokaPostTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMomokaPostTypedDataData,
    CreateMomokaPostTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateMomokaPostTypedDataData, CreateMomokaPostTypedDataVariables>(
    CreateMomokaPostTypedDataDocument,
    options,
  );
}
export type CreateMomokaPostTypedDataHookResult = ReturnType<typeof useCreateMomokaPostTypedData>;
export type CreateMomokaPostTypedDataMutationResult =
  Apollo.MutationResult<CreateMomokaPostTypedDataData>;
export type CreateMomokaPostTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateMomokaPostTypedDataData,
  CreateMomokaPostTypedDataVariables
>;
export const CreateMomokaCommentTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateMomokaCommentTypedData($request: MomokaCommentRequest!) {
    result: createMomokaCommentTypedData(request: $request) {
      ...CreateMomokaCommentBroadcastItemResult
    }
  }
  ${FragmentCreateMomokaCommentBroadcastItemResult}
`;
export type CreateMomokaCommentTypedDataMutationFn = Apollo.MutationFunction<
  CreateMomokaCommentTypedDataData,
  CreateMomokaCommentTypedDataVariables
>;

/**
 * __useCreateMomokaCommentTypedData__
 *
 * To run a mutation, you first call `useCreateMomokaCommentTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMomokaCommentTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMomokaCommentTypedData, { data, loading, error }] = useCreateMomokaCommentTypedData({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateMomokaCommentTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMomokaCommentTypedDataData,
    CreateMomokaCommentTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMomokaCommentTypedDataData,
    CreateMomokaCommentTypedDataVariables
  >(CreateMomokaCommentTypedDataDocument, options);
}
export type CreateMomokaCommentTypedDataHookResult = ReturnType<
  typeof useCreateMomokaCommentTypedData
>;
export type CreateMomokaCommentTypedDataMutationResult =
  Apollo.MutationResult<CreateMomokaCommentTypedDataData>;
export type CreateMomokaCommentTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateMomokaCommentTypedDataData,
  CreateMomokaCommentTypedDataVariables
>;
export const CreateMomokaMirrorTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateMomokaMirrorTypedData($request: MomokaMirrorRequest!) {
    result: createMomokaMirrorTypedData(request: $request) {
      ...CreateMomokaMirrorBroadcastItemResult
    }
  }
  ${FragmentCreateMomokaMirrorBroadcastItemResult}
`;
export type CreateMomokaMirrorTypedDataMutationFn = Apollo.MutationFunction<
  CreateMomokaMirrorTypedDataData,
  CreateMomokaMirrorTypedDataVariables
>;

/**
 * __useCreateMomokaMirrorTypedData__
 *
 * To run a mutation, you first call `useCreateMomokaMirrorTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMomokaMirrorTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMomokaMirrorTypedData, { data, loading, error }] = useCreateMomokaMirrorTypedData({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateMomokaMirrorTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMomokaMirrorTypedDataData,
    CreateMomokaMirrorTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateMomokaMirrorTypedDataData, CreateMomokaMirrorTypedDataVariables>(
    CreateMomokaMirrorTypedDataDocument,
    options,
  );
}
export type CreateMomokaMirrorTypedDataHookResult = ReturnType<
  typeof useCreateMomokaMirrorTypedData
>;
export type CreateMomokaMirrorTypedDataMutationResult =
  Apollo.MutationResult<CreateMomokaMirrorTypedDataData>;
export type CreateMomokaMirrorTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateMomokaMirrorTypedDataData,
  CreateMomokaMirrorTypedDataVariables
>;
export const CreateMomokaQuoteTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateMomokaQuoteTypedData($request: MomokaQuoteRequest!) {
    result: createMomokaQuoteTypedData(request: $request) {
      ...CreateMomokaQuoteBroadcastItemResult
    }
  }
  ${FragmentCreateMomokaQuoteBroadcastItemResult}
`;
export type CreateMomokaQuoteTypedDataMutationFn = Apollo.MutationFunction<
  CreateMomokaQuoteTypedDataData,
  CreateMomokaQuoteTypedDataVariables
>;

/**
 * __useCreateMomokaQuoteTypedData__
 *
 * To run a mutation, you first call `useCreateMomokaQuoteTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMomokaQuoteTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMomokaQuoteTypedData, { data, loading, error }] = useCreateMomokaQuoteTypedData({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateMomokaQuoteTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMomokaQuoteTypedDataData,
    CreateMomokaQuoteTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateMomokaQuoteTypedDataData, CreateMomokaQuoteTypedDataVariables>(
    CreateMomokaQuoteTypedDataDocument,
    options,
  );
}
export type CreateMomokaQuoteTypedDataHookResult = ReturnType<typeof useCreateMomokaQuoteTypedData>;
export type CreateMomokaQuoteTypedDataMutationResult =
  Apollo.MutationResult<CreateMomokaQuoteTypedDataData>;
export type CreateMomokaQuoteTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateMomokaQuoteTypedDataData,
  CreateMomokaQuoteTypedDataVariables
>;
export const PostOnchainDocument = /*#__PURE__*/ gql`
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
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type PostOnchainMutationFn = Apollo.MutationFunction<PostOnchainData, PostOnchainVariables>;

/**
 * __usePostOnchain__
 *
 * To run a mutation, you first call `usePostOnchain` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostOnchain` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postOnchain, { data, loading, error }] = usePostOnchain({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePostOnchain(
  baseOptions?: Apollo.MutationHookOptions<PostOnchainData, PostOnchainVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PostOnchainData, PostOnchainVariables>(PostOnchainDocument, options);
}
export type PostOnchainHookResult = ReturnType<typeof usePostOnchain>;
export type PostOnchainMutationResult = Apollo.MutationResult<PostOnchainData>;
export type PostOnchainMutationOptions = Apollo.BaseMutationOptions<
  PostOnchainData,
  PostOnchainVariables
>;
export const CommentOnchainDocument = /*#__PURE__*/ gql`
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
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type CommentOnchainMutationFn = Apollo.MutationFunction<
  CommentOnchainData,
  CommentOnchainVariables
>;

/**
 * __useCommentOnchain__
 *
 * To run a mutation, you first call `useCommentOnchain` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentOnchain` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentOnchain, { data, loading, error }] = useCommentOnchain({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCommentOnchain(
  baseOptions?: Apollo.MutationHookOptions<CommentOnchainData, CommentOnchainVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CommentOnchainData, CommentOnchainVariables>(
    CommentOnchainDocument,
    options,
  );
}
export type CommentOnchainHookResult = ReturnType<typeof useCommentOnchain>;
export type CommentOnchainMutationResult = Apollo.MutationResult<CommentOnchainData>;
export type CommentOnchainMutationOptions = Apollo.BaseMutationOptions<
  CommentOnchainData,
  CommentOnchainVariables
>;
export const MirrorOnchainDocument = /*#__PURE__*/ gql`
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
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type MirrorOnchainMutationFn = Apollo.MutationFunction<
  MirrorOnchainData,
  MirrorOnchainVariables
>;

/**
 * __useMirrorOnchain__
 *
 * To run a mutation, you first call `useMirrorOnchain` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMirrorOnchain` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mirrorOnchain, { data, loading, error }] = useMirrorOnchain({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMirrorOnchain(
  baseOptions?: Apollo.MutationHookOptions<MirrorOnchainData, MirrorOnchainVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MirrorOnchainData, MirrorOnchainVariables>(
    MirrorOnchainDocument,
    options,
  );
}
export type MirrorOnchainHookResult = ReturnType<typeof useMirrorOnchain>;
export type MirrorOnchainMutationResult = Apollo.MutationResult<MirrorOnchainData>;
export type MirrorOnchainMutationOptions = Apollo.BaseMutationOptions<
  MirrorOnchainData,
  MirrorOnchainVariables
>;
export const QuoteOnchainDocument = /*#__PURE__*/ gql`
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
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type QuoteOnchainMutationFn = Apollo.MutationFunction<
  QuoteOnchainData,
  QuoteOnchainVariables
>;

/**
 * __useQuoteOnchain__
 *
 * To run a mutation, you first call `useQuoteOnchain` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuoteOnchain` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [quoteOnchain, { data, loading, error }] = useQuoteOnchain({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useQuoteOnchain(
  baseOptions?: Apollo.MutationHookOptions<QuoteOnchainData, QuoteOnchainVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<QuoteOnchainData, QuoteOnchainVariables>(QuoteOnchainDocument, options);
}
export type QuoteOnchainHookResult = ReturnType<typeof useQuoteOnchain>;
export type QuoteOnchainMutationResult = Apollo.MutationResult<QuoteOnchainData>;
export type QuoteOnchainMutationOptions = Apollo.BaseMutationOptions<
  QuoteOnchainData,
  QuoteOnchainVariables
>;
export const PostOnMomokaDocument = /*#__PURE__*/ gql`
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
  ${FragmentCreateMomokaPublicationResult}
  ${FragmentLensProfileManagerRelayError}
`;
export type PostOnMomokaMutationFn = Apollo.MutationFunction<
  PostOnMomokaData,
  PostOnMomokaVariables
>;

/**
 * __usePostOnMomoka__
 *
 * To run a mutation, you first call `usePostOnMomoka` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostOnMomoka` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postOnMomoka, { data, loading, error }] = usePostOnMomoka({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function usePostOnMomoka(
  baseOptions?: Apollo.MutationHookOptions<PostOnMomokaData, PostOnMomokaVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PostOnMomokaData, PostOnMomokaVariables>(PostOnMomokaDocument, options);
}
export type PostOnMomokaHookResult = ReturnType<typeof usePostOnMomoka>;
export type PostOnMomokaMutationResult = Apollo.MutationResult<PostOnMomokaData>;
export type PostOnMomokaMutationOptions = Apollo.BaseMutationOptions<
  PostOnMomokaData,
  PostOnMomokaVariables
>;
export const CommentOnMomokaDocument = /*#__PURE__*/ gql`
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
  ${FragmentCreateMomokaPublicationResult}
  ${FragmentLensProfileManagerRelayError}
`;
export type CommentOnMomokaMutationFn = Apollo.MutationFunction<
  CommentOnMomokaData,
  CommentOnMomokaVariables
>;

/**
 * __useCommentOnMomoka__
 *
 * To run a mutation, you first call `useCommentOnMomoka` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentOnMomoka` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentOnMomoka, { data, loading, error }] = useCommentOnMomoka({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCommentOnMomoka(
  baseOptions?: Apollo.MutationHookOptions<CommentOnMomokaData, CommentOnMomokaVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CommentOnMomokaData, CommentOnMomokaVariables>(
    CommentOnMomokaDocument,
    options,
  );
}
export type CommentOnMomokaHookResult = ReturnType<typeof useCommentOnMomoka>;
export type CommentOnMomokaMutationResult = Apollo.MutationResult<CommentOnMomokaData>;
export type CommentOnMomokaMutationOptions = Apollo.BaseMutationOptions<
  CommentOnMomokaData,
  CommentOnMomokaVariables
>;
export const MirrorOnMomokaDocument = /*#__PURE__*/ gql`
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
  ${FragmentCreateMomokaPublicationResult}
  ${FragmentLensProfileManagerRelayError}
`;
export type MirrorOnMomokaMutationFn = Apollo.MutationFunction<
  MirrorOnMomokaData,
  MirrorOnMomokaVariables
>;

/**
 * __useMirrorOnMomoka__
 *
 * To run a mutation, you first call `useMirrorOnMomoka` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMirrorOnMomoka` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mirrorOnMomoka, { data, loading, error }] = useMirrorOnMomoka({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMirrorOnMomoka(
  baseOptions?: Apollo.MutationHookOptions<MirrorOnMomokaData, MirrorOnMomokaVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MirrorOnMomokaData, MirrorOnMomokaVariables>(
    MirrorOnMomokaDocument,
    options,
  );
}
export type MirrorOnMomokaHookResult = ReturnType<typeof useMirrorOnMomoka>;
export type MirrorOnMomokaMutationResult = Apollo.MutationResult<MirrorOnMomokaData>;
export type MirrorOnMomokaMutationOptions = Apollo.BaseMutationOptions<
  MirrorOnMomokaData,
  MirrorOnMomokaVariables
>;
export const QuoteOnMomokaDocument = /*#__PURE__*/ gql`
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
  ${FragmentCreateMomokaPublicationResult}
  ${FragmentLensProfileManagerRelayError}
`;
export type QuoteOnMomokaMutationFn = Apollo.MutationFunction<
  QuoteOnMomokaData,
  QuoteOnMomokaVariables
>;

/**
 * __useQuoteOnMomoka__
 *
 * To run a mutation, you first call `useQuoteOnMomoka` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuoteOnMomoka` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [quoteOnMomoka, { data, loading, error }] = useQuoteOnMomoka({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useQuoteOnMomoka(
  baseOptions?: Apollo.MutationHookOptions<QuoteOnMomokaData, QuoteOnMomokaVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<QuoteOnMomokaData, QuoteOnMomokaVariables>(
    QuoteOnMomokaDocument,
    options,
  );
}
export type QuoteOnMomokaHookResult = ReturnType<typeof useQuoteOnMomoka>;
export type QuoteOnMomokaMutationResult = Apollo.MutationResult<QuoteOnMomokaData>;
export type QuoteOnMomokaMutationOptions = Apollo.BaseMutationOptions<
  QuoteOnMomokaData,
  QuoteOnMomokaVariables
>;
export const HidePublicationDocument = /*#__PURE__*/ gql`
  mutation HidePublication($request: HidePublicationRequest!) {
    hidePublication(request: $request)
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
 *      request: // value for 'request'
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
export const ReportPublicationDocument = /*#__PURE__*/ gql`
  mutation ReportPublication($request: ReportPublicationRequest!) {
    reportPublication(request: $request)
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
 *      request: // value for 'request'
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
export const LegacyCollectDocument = /*#__PURE__*/ gql`
  mutation LegacyCollect($request: LegacyCollectRequest!) {
    result: legacyCollect(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type LegacyCollectMutationFn = Apollo.MutationFunction<
  LegacyCollectData,
  LegacyCollectVariables
>;

/**
 * __useLegacyCollect__
 *
 * To run a mutation, you first call `useLegacyCollect` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLegacyCollect` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [legacyCollect, { data, loading, error }] = useLegacyCollect({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useLegacyCollect(
  baseOptions?: Apollo.MutationHookOptions<LegacyCollectData, LegacyCollectVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LegacyCollectData, LegacyCollectVariables>(
    LegacyCollectDocument,
    options,
  );
}
export type LegacyCollectHookResult = ReturnType<typeof useLegacyCollect>;
export type LegacyCollectMutationResult = Apollo.MutationResult<LegacyCollectData>;
export type LegacyCollectMutationOptions = Apollo.BaseMutationOptions<
  LegacyCollectData,
  LegacyCollectVariables
>;
export const CreateLegacyCollectTypedDataDocument = /*#__PURE__*/ gql`
  mutation CreateLegacyCollectTypedData(
    $request: LegacyCollectRequest!
    $options: TypedDataOptions
  ) {
    result: createLegacyCollectTypedData(request: $request, options: $options) {
      ...CreateLegacyCollectBroadcastItemResult
    }
  }
  ${FragmentCreateLegacyCollectBroadcastItemResult}
`;
export type CreateLegacyCollectTypedDataMutationFn = Apollo.MutationFunction<
  CreateLegacyCollectTypedDataData,
  CreateLegacyCollectTypedDataVariables
>;

/**
 * __useCreateLegacyCollectTypedData__
 *
 * To run a mutation, you first call `useCreateLegacyCollectTypedData` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLegacyCollectTypedData` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLegacyCollectTypedData, { data, loading, error }] = useCreateLegacyCollectTypedData({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateLegacyCollectTypedData(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLegacyCollectTypedDataData,
    CreateLegacyCollectTypedDataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateLegacyCollectTypedDataData,
    CreateLegacyCollectTypedDataVariables
  >(CreateLegacyCollectTypedDataDocument, options);
}
export type CreateLegacyCollectTypedDataHookResult = ReturnType<
  typeof useCreateLegacyCollectTypedData
>;
export type CreateLegacyCollectTypedDataMutationResult =
  Apollo.MutationResult<CreateLegacyCollectTypedDataData>;
export type CreateLegacyCollectTypedDataMutationOptions = Apollo.BaseMutationOptions<
  CreateLegacyCollectTypedDataData,
  CreateLegacyCollectTypedDataVariables
>;
export const RefreshPublicationMetadataDocument = /*#__PURE__*/ gql`
  mutation RefreshPublicationMetadata($request: RefreshPublicationMetadataRequest!) {
    result: refreshPublicationMetadata(request: $request) {
      result
    }
  }
`;
export type RefreshPublicationMetadataMutationFn = Apollo.MutationFunction<
  RefreshPublicationMetadataData,
  RefreshPublicationMetadataVariables
>;

/**
 * __useRefreshPublicationMetadata__
 *
 * To run a mutation, you first call `useRefreshPublicationMetadata` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshPublicationMetadata` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshPublicationMetadata, { data, loading, error }] = useRefreshPublicationMetadata({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRefreshPublicationMetadata(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshPublicationMetadataData,
    RefreshPublicationMetadataVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RefreshPublicationMetadataData, RefreshPublicationMetadataVariables>(
    RefreshPublicationMetadataDocument,
    options,
  );
}
export type RefreshPublicationMetadataHookResult = ReturnType<typeof useRefreshPublicationMetadata>;
export type RefreshPublicationMetadataMutationResult =
  Apollo.MutationResult<RefreshPublicationMetadataData>;
export type RefreshPublicationMetadataMutationOptions = Apollo.BaseMutationOptions<
  RefreshPublicationMetadataData,
  RefreshPublicationMetadataVariables
>;
export const RevenueFromPublicationsDocument = /*#__PURE__*/ gql`
  query RevenueFromPublications(
    $request: RevenueFromPublicationsRequest!
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $publicationStatsInput: PublicationStatsInput! = {}
    $publicationStatsCountOpenActionArgs: PublicationStatsCountOpenActionArgs! = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: revenueFromPublications(request: $request) {
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
 * __useRevenueFromPublications__
 *
 * To run a query within a React component, call `useRevenueFromPublications` and pass it any options that fit your needs.
 * When your component renders, `useRevenueFromPublications` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevenueFromPublications({
 *   variables: {
 *      request: // value for 'request'
 *      publicationImageTransform: // value for 'publicationImageTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
 *      publicationStatsInput: // value for 'publicationStatsInput'
 *      publicationStatsCountOpenActionArgs: // value for 'publicationStatsCountOpenActionArgs'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useRevenueFromPublications(
  baseOptions: Apollo.QueryHookOptions<
    RevenueFromPublicationsData,
    RevenueFromPublicationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RevenueFromPublicationsData, RevenueFromPublicationsVariables>(
    RevenueFromPublicationsDocument,
    options,
  );
}
export function useRevenueFromPublicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RevenueFromPublicationsData,
    RevenueFromPublicationsVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RevenueFromPublicationsData, RevenueFromPublicationsVariables>(
    RevenueFromPublicationsDocument,
    options,
  );
}
export type RevenueFromPublicationsHookResult = ReturnType<typeof useRevenueFromPublications>;
export type RevenueFromPublicationsLazyQueryHookResult = ReturnType<
  typeof useRevenueFromPublicationsLazyQuery
>;
export type RevenueFromPublicationsQueryResult = Apollo.QueryResult<
  RevenueFromPublicationsData,
  RevenueFromPublicationsVariables
>;
export const RevenueFromPublicationDocument = /*#__PURE__*/ gql`
  query RevenueFromPublication(
    $request: RevenueFromPublicationRequest!
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $publicationStatsInput: PublicationStatsInput! = {}
    $publicationStatsCountOpenActionArgs: PublicationStatsCountOpenActionArgs! = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: revenueFromPublication(request: $request) {
      ...PublicationRevenue
    }
  }
  ${FragmentPublicationRevenue}
`;

/**
 * __useRevenueFromPublication__
 *
 * To run a query within a React component, call `useRevenueFromPublication` and pass it any options that fit your needs.
 * When your component renders, `useRevenueFromPublication` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevenueFromPublication({
 *   variables: {
 *      request: // value for 'request'
 *      publicationImageTransform: // value for 'publicationImageTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
 *      publicationStatsInput: // value for 'publicationStatsInput'
 *      publicationStatsCountOpenActionArgs: // value for 'publicationStatsCountOpenActionArgs'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useRevenueFromPublication(
  baseOptions: Apollo.QueryHookOptions<RevenueFromPublicationData, RevenueFromPublicationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RevenueFromPublicationData, RevenueFromPublicationVariables>(
    RevenueFromPublicationDocument,
    options,
  );
}
export function useRevenueFromPublicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RevenueFromPublicationData,
    RevenueFromPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RevenueFromPublicationData, RevenueFromPublicationVariables>(
    RevenueFromPublicationDocument,
    options,
  );
}
export type RevenueFromPublicationHookResult = ReturnType<typeof useRevenueFromPublication>;
export type RevenueFromPublicationLazyQueryHookResult = ReturnType<
  typeof useRevenueFromPublicationLazyQuery
>;
export type RevenueFromPublicationQueryResult = Apollo.QueryResult<
  RevenueFromPublicationData,
  RevenueFromPublicationVariables
>;
export const FollowRevenuesDocument = /*#__PURE__*/ gql`
  query FollowRevenues($request: FollowRevenueRequest!, $rateRequest: RateRequest = { for: USD }) {
    result: followRevenues(request: $request) {
      revenues {
        ...RevenueAggregate
      }
    }
  }
  ${FragmentRevenueAggregate}
`;

/**
 * __useFollowRevenues__
 *
 * To run a query within a React component, call `useFollowRevenues` and pass it any options that fit your needs.
 * When your component renders, `useFollowRevenues` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowRevenues({
 *   variables: {
 *      request: // value for 'request'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useFollowRevenues(
  baseOptions: Apollo.QueryHookOptions<FollowRevenuesData, FollowRevenuesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FollowRevenuesData, FollowRevenuesVariables>(
    FollowRevenuesDocument,
    options,
  );
}
export function useFollowRevenuesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FollowRevenuesData, FollowRevenuesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FollowRevenuesData, FollowRevenuesVariables>(
    FollowRevenuesDocument,
    options,
  );
}
export type FollowRevenuesHookResult = ReturnType<typeof useFollowRevenues>;
export type FollowRevenuesLazyQueryHookResult = ReturnType<typeof useFollowRevenuesLazyQuery>;
export type FollowRevenuesQueryResult = Apollo.QueryResult<
  FollowRevenuesData,
  FollowRevenuesVariables
>;
export const SearchPublicationsDocument = /*#__PURE__*/ gql`
  query SearchPublications(
    $request: PublicationSearchRequest!
    $publicationImageTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $publicationStatsInput: PublicationStatsInput! = {}
    $publicationStatsCountOpenActionArgs: PublicationStatsCountOpenActionArgs! = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: searchPublications(request: $request) {
      items {
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
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentQuote}
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
 *      request: // value for 'request'
 *      publicationImageTransform: // value for 'publicationImageTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
 *      publicationStatsInput: // value for 'publicationStatsInput'
 *      publicationStatsCountOpenActionArgs: // value for 'publicationStatsCountOpenActionArgs'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
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
    $request: ProfileSearchRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: searchProfiles(request: $request) {
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
 *      request: // value for 'request'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
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
export const TxIdToTxHashDocument = /*#__PURE__*/ gql`
  query TxIdToTxHash($for: TxId!) {
    result: txIdToTxHash(for: $for)
  }
`;

/**
 * __useTxIdToTxHash__
 *
 * To run a query within a React component, call `useTxIdToTxHash` and pass it any options that fit your needs.
 * When your component renders, `useTxIdToTxHash` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTxIdToTxHash({
 *   variables: {
 *      for: // value for 'for'
 *   },
 * });
 */
export function useTxIdToTxHash(
  baseOptions: Apollo.QueryHookOptions<TxIdToTxHashData, TxIdToTxHashVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TxIdToTxHashData, TxIdToTxHashVariables>(TxIdToTxHashDocument, options);
}
export function useTxIdToTxHashLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TxIdToTxHashData, TxIdToTxHashVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TxIdToTxHashData, TxIdToTxHashVariables>(
    TxIdToTxHashDocument,
    options,
  );
}
export type TxIdToTxHashHookResult = ReturnType<typeof useTxIdToTxHash>;
export type TxIdToTxHashLazyQueryHookResult = ReturnType<typeof useTxIdToTxHashLazyQuery>;
export type TxIdToTxHashQueryResult = Apollo.QueryResult<TxIdToTxHashData, TxIdToTxHashVariables>;
export const RelayQueuesDocument = /*#__PURE__*/ gql`
  query RelayQueues {
    result: relayQueues {
      ...RelayQueueResult
    }
  }
  ${FragmentRelayQueueResult}
`;

/**
 * __useRelayQueues__
 *
 * To run a query within a React component, call `useRelayQueues` and pass it any options that fit your needs.
 * When your component renders, `useRelayQueues` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRelayQueues({
 *   variables: {
 *   },
 * });
 */
export function useRelayQueues(
  baseOptions?: Apollo.QueryHookOptions<RelayQueuesData, RelayQueuesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RelayQueuesData, RelayQueuesVariables>(RelayQueuesDocument, options);
}
export function useRelayQueuesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RelayQueuesData, RelayQueuesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RelayQueuesData, RelayQueuesVariables>(RelayQueuesDocument, options);
}
export type RelayQueuesHookResult = ReturnType<typeof useRelayQueues>;
export type RelayQueuesLazyQueryHookResult = ReturnType<typeof useRelayQueuesLazyQuery>;
export type RelayQueuesQueryResult = Apollo.QueryResult<RelayQueuesData, RelayQueuesVariables>;
export const LensTransactionStatusDocument = /*#__PURE__*/ gql`
  query LensTransactionStatus($request: LensTransactionStatusRequest!) {
    result: lensTransactionStatus(request: $request) {
      ...LensTransactionResult
    }
  }
  ${FragmentLensTransactionResult}
`;

/**
 * __useLensTransactionStatus__
 *
 * To run a query within a React component, call `useLensTransactionStatus` and pass it any options that fit your needs.
 * When your component renders, `useLensTransactionStatus` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLensTransactionStatus({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useLensTransactionStatus(
  baseOptions: Apollo.QueryHookOptions<LensTransactionStatusData, LensTransactionStatusVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LensTransactionStatusData, LensTransactionStatusVariables>(
    LensTransactionStatusDocument,
    options,
  );
}
export function useLensTransactionStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LensTransactionStatusData,
    LensTransactionStatusVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LensTransactionStatusData, LensTransactionStatusVariables>(
    LensTransactionStatusDocument,
    options,
  );
}
export type LensTransactionStatusHookResult = ReturnType<typeof useLensTransactionStatus>;
export type LensTransactionStatusLazyQueryHookResult = ReturnType<
  typeof useLensTransactionStatusLazyQuery
>;
export type LensTransactionStatusQueryResult = Apollo.QueryResult<
  LensTransactionStatusData,
  LensTransactionStatusVariables
>;
export const BroadcastOnchainDocument = /*#__PURE__*/ gql`
  mutation BroadcastOnchain($request: BroadcastRequest!) {
    result: broadcastOnchain(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${FragmentRelaySuccess}
  ${FragmentRelayError}
`;
export type BroadcastOnchainMutationFn = Apollo.MutationFunction<
  BroadcastOnchainData,
  BroadcastOnchainVariables
>;

/**
 * __useBroadcastOnchain__
 *
 * To run a mutation, you first call `useBroadcastOnchain` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBroadcastOnchain` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [broadcastOnchain, { data, loading, error }] = useBroadcastOnchain({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBroadcastOnchain(
  baseOptions?: Apollo.MutationHookOptions<BroadcastOnchainData, BroadcastOnchainVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BroadcastOnchainData, BroadcastOnchainVariables>(
    BroadcastOnchainDocument,
    options,
  );
}
export type BroadcastOnchainHookResult = ReturnType<typeof useBroadcastOnchain>;
export type BroadcastOnchainMutationResult = Apollo.MutationResult<BroadcastOnchainData>;
export type BroadcastOnchainMutationOptions = Apollo.BaseMutationOptions<
  BroadcastOnchainData,
  BroadcastOnchainVariables
>;
export const BroadcastOnMomokaDocument = /*#__PURE__*/ gql`
  mutation BroadcastOnMomoka($request: BroadcastRequest!) {
    result: broadcastOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${FragmentCreateMomokaPublicationResult}
  ${FragmentRelayError}
`;
export type BroadcastOnMomokaMutationFn = Apollo.MutationFunction<
  BroadcastOnMomokaData,
  BroadcastOnMomokaVariables
>;

/**
 * __useBroadcastOnMomoka__
 *
 * To run a mutation, you first call `useBroadcastOnMomoka` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBroadcastOnMomoka` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [broadcastOnMomoka, { data, loading, error }] = useBroadcastOnMomoka({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBroadcastOnMomoka(
  baseOptions?: Apollo.MutationHookOptions<BroadcastOnMomokaData, BroadcastOnMomokaVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BroadcastOnMomokaData, BroadcastOnMomokaVariables>(
    BroadcastOnMomokaDocument,
    options,
  );
}
export type BroadcastOnMomokaHookResult = ReturnType<typeof useBroadcastOnMomoka>;
export type BroadcastOnMomokaMutationResult = Apollo.MutationResult<BroadcastOnMomokaData>;
export type BroadcastOnMomokaMutationOptions = Apollo.BaseMutationOptions<
  BroadcastOnMomokaData,
  BroadcastOnMomokaVariables
>;
export const OwnedHandlesDocument = /*#__PURE__*/ gql`
  query OwnedHandles($request: OwnedHandlesRequest!) {
    result: ownedHandles(request: $request) {
      items {
        ...HandleResult
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentHandleResult}
  ${FragmentPaginatedResultInfo}
`;

/**
 * __useOwnedHandles__
 *
 * To run a query within a React component, call `useOwnedHandles` and pass it any options that fit your needs.
 * When your component renders, `useOwnedHandles` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnedHandles({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useOwnedHandles(
  baseOptions: Apollo.QueryHookOptions<OwnedHandlesData, OwnedHandlesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OwnedHandlesData, OwnedHandlesVariables>(OwnedHandlesDocument, options);
}
export function useOwnedHandlesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OwnedHandlesData, OwnedHandlesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OwnedHandlesData, OwnedHandlesVariables>(
    OwnedHandlesDocument,
    options,
  );
}
export type OwnedHandlesHookResult = ReturnType<typeof useOwnedHandles>;
export type OwnedHandlesLazyQueryHookResult = ReturnType<typeof useOwnedHandlesLazyQuery>;
export type OwnedHandlesQueryResult = Apollo.QueryResult<OwnedHandlesData, OwnedHandlesVariables>;
export const ProfilesManagedDocument = /*#__PURE__*/ gql`
  query ProfilesManaged(
    $request: ProfilesManagedRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: profilesManaged(request: $request) {
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
 * __useProfilesManaged__
 *
 * To run a query within a React component, call `useProfilesManaged` and pass it any options that fit your needs.
 * When your component renders, `useProfilesManaged` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilesManaged({
 *   variables: {
 *      request: // value for 'request'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      profileStatsArg: // value for 'profileStatsArg'
 *      profileStatsCountOpenActionArgs: // value for 'profileStatsCountOpenActionArgs'
 *      rateRequest: // value for 'rateRequest'
 *   },
 * });
 */
export function useProfilesManaged(
  baseOptions: Apollo.QueryHookOptions<ProfilesManagedData, ProfilesManagedVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfilesManagedData, ProfilesManagedVariables>(
    ProfilesManagedDocument,
    options,
  );
}
export function useProfilesManagedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfilesManagedData, ProfilesManagedVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfilesManagedData, ProfilesManagedVariables>(
    ProfilesManagedDocument,
    options,
  );
}
export type ProfilesManagedHookResult = ReturnType<typeof useProfilesManaged>;
export type ProfilesManagedLazyQueryHookResult = ReturnType<typeof useProfilesManagedLazyQuery>;
export type ProfilesManagedQueryResult = Apollo.QueryResult<
  ProfilesManagedData,
  ProfilesManagedVariables
>;
export const UserSigNoncesDocument = /*#__PURE__*/ gql`
  query UserSigNonces {
    result: userSigNonces {
      ...UserSigNonces
    }
  }
  ${FragmentUserSigNonces}
`;

/**
 * __useUserSigNonces__
 *
 * To run a query within a React component, call `useUserSigNonces` and pass it any options that fit your needs.
 * When your component renders, `useUserSigNonces` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSigNonces({
 *   variables: {
 *   },
 * });
 */
export function useUserSigNonces(
  baseOptions?: Apollo.QueryHookOptions<UserSigNoncesData, UserSigNoncesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserSigNoncesData, UserSigNoncesVariables>(UserSigNoncesDocument, options);
}
export function useUserSigNoncesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserSigNoncesData, UserSigNoncesVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserSigNoncesData, UserSigNoncesVariables>(
    UserSigNoncesDocument,
    options,
  );
}
export type UserSigNoncesHookResult = ReturnType<typeof useUserSigNonces>;
export type UserSigNoncesLazyQueryHookResult = ReturnType<typeof useUserSigNoncesLazyQuery>;
export type UserSigNoncesQueryResult = Apollo.QueryResult<
  UserSigNoncesData,
  UserSigNoncesVariables
>;
export type ActedNotificationKeySpecifier = (
  | 'actions'
  | 'id'
  | 'publication'
  | ActedNotificationKeySpecifier
)[];
export type ActedNotificationFieldPolicy = {
  actions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AmountKeySpecifier = ('asset' | 'rate' | 'value' | AmountKeySpecifier)[];
export type AmountFieldPolicy = {
  asset?: FieldPolicy<any> | FieldReadFunction<any>;
  rate?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AndConditionKeySpecifier = ('criteria' | AndConditionKeySpecifier)[];
export type AndConditionFieldPolicy = {
  criteria?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppKeySpecifier = ('id' | AppKeySpecifier)[];
export type AppFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ApprovedAllowanceAmountResultKeySpecifier = (
  | 'allowance'
  | 'moduleContract'
  | 'moduleName'
  | ApprovedAllowanceAmountResultKeySpecifier
)[];
export type ApprovedAllowanceAmountResultFieldPolicy = {
  allowance?: FieldPolicy<any> | FieldReadFunction<any>;
  moduleContract?: FieldPolicy<any> | FieldReadFunction<any>;
  moduleName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ArticleMetadataV3KeySpecifier = (
  | 'appId'
  | 'attachments'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'tags'
  | 'title'
  | ArticleMetadataV3KeySpecifier
)[];
export type ArticleMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AudioKeySpecifier = ('mimeType' | 'uri' | AudioKeySpecifier)[];
export type AudioFieldPolicy = {
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AudioMetadataV3KeySpecifier = (
  | 'appId'
  | 'asset'
  | 'attachments'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'tags'
  | 'title'
  | AudioMetadataV3KeySpecifier
)[];
export type AudioMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  asset?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuthChallengeResultKeySpecifier = ('id' | 'text' | AuthChallengeResultKeySpecifier)[];
export type AuthChallengeResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type CheckingInMetadataV3KeySpecifier = (
  | 'address'
  | 'appId'
  | 'attachments'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'geographic'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'location'
  | 'marketplace'
  | 'rawURI'
  | 'tags'
  | CheckingInMetadataV3KeySpecifier
)[];
export type CheckingInMetadataV3FieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  geographic?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  location?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ClaimableProfilesResultKeySpecifier = (
  | 'canMintProfileWithFreeTextHandle'
  | 'reserved'
  | ClaimableProfilesResultKeySpecifier
)[];
export type ClaimableProfilesResultFieldPolicy = {
  canMintProfileWithFreeTextHandle?: FieldPolicy<any> | FieldReadFunction<any>;
  reserved?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectConditionKeySpecifier = (
  | 'publicationId'
  | 'thisPublication'
  | CollectConditionKeySpecifier
)[];
export type CollectConditionFieldPolicy = {
  publicationId?: FieldPolicy<any> | FieldReadFunction<any>;
  thisPublication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommentKeySpecifier = (
  | 'by'
  | 'commentOn'
  | 'createdAt'
  | 'firstComment'
  | 'id'
  | 'isHidden'
  | 'metadata'
  | 'momoka'
  | 'openActionModules'
  | 'operations'
  | 'publishedOn'
  | 'referenceModule'
  | 'root'
  | 'stats'
  | 'txHash'
  | CommentKeySpecifier
)[];
export type CommentFieldPolicy = {
  by?: FieldPolicy<any> | FieldReadFunction<any>;
  commentOn?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  firstComment?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isHidden?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  momoka?: FieldPolicy<any> | FieldReadFunction<any>;
  openActionModules?: FieldPolicy<any> | FieldReadFunction<any>;
  operations?: FieldPolicy<any> | FieldReadFunction<any>;
  publishedOn?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  root?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommentNotificationKeySpecifier = (
  | 'comment'
  | 'id'
  | CommentNotificationKeySpecifier
)[];
export type CommentNotificationFieldPolicy = {
  comment?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateActOnOpenActionBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateActOnOpenActionBroadcastItemResultKeySpecifier
)[];
export type CreateActOnOpenActionBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateActOnOpenActionEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateActOnOpenActionEIP712TypedDataKeySpecifier
)[];
export type CreateActOnOpenActionEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateActOnOpenActionEIP712TypedDataTypesKeySpecifier = (
  | 'Act'
  | CreateActOnOpenActionEIP712TypedDataTypesKeySpecifier
)[];
export type CreateActOnOpenActionEIP712TypedDataTypesFieldPolicy = {
  Act?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateActOnOpenActionEIP712TypedDataValueKeySpecifier = (
  | 'actionModuleAddress'
  | 'actionModuleData'
  | 'actorProfileId'
  | 'deadline'
  | 'nonce'
  | 'publicationActedId'
  | 'publicationActedProfileId'
  | 'referrerProfileIds'
  | 'referrerPubIds'
  | CreateActOnOpenActionEIP712TypedDataValueKeySpecifier
)[];
export type CreateActOnOpenActionEIP712TypedDataValueFieldPolicy = {
  actionModuleAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  actionModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
  actorProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationActedId?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationActedProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerProfileIds?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerPubIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateBlockProfilesBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateBlockProfilesBroadcastItemResultKeySpecifier
)[];
export type CreateBlockProfilesBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateBlockProfilesEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateBlockProfilesEIP712TypedDataKeySpecifier
)[];
export type CreateBlockProfilesEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateBlockProfilesEIP712TypedDataTypesKeySpecifier = (
  | 'SetBlockStatus'
  | CreateBlockProfilesEIP712TypedDataTypesKeySpecifier
)[];
export type CreateBlockProfilesEIP712TypedDataTypesFieldPolicy = {
  SetBlockStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateBlockProfilesEIP712TypedDataValueKeySpecifier = (
  | 'blockStatus'
  | 'byProfileId'
  | 'deadline'
  | 'idsOfProfilesToSetBlockStatus'
  | 'nonce'
  | CreateBlockProfilesEIP712TypedDataValueKeySpecifier
)[];
export type CreateBlockProfilesEIP712TypedDataValueFieldPolicy = {
  blockStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  byProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  idsOfProfilesToSetBlockStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateChangeProfileManagersBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateChangeProfileManagersBroadcastItemResultKeySpecifier
)[];
export type CreateChangeProfileManagersBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateChangeProfileManagersEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateChangeProfileManagersEIP712TypedDataKeySpecifier
)[];
export type CreateChangeProfileManagersEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateChangeProfileManagersEIP712TypedDataTypesKeySpecifier = (
  | 'ChangeDelegatedExecutorsConfig'
  | CreateChangeProfileManagersEIP712TypedDataTypesKeySpecifier
)[];
export type CreateChangeProfileManagersEIP712TypedDataTypesFieldPolicy = {
  ChangeDelegatedExecutorsConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateChangeProfileManagersEIP712TypedDataValueKeySpecifier = (
  | 'approvals'
  | 'configNumber'
  | 'deadline'
  | 'delegatedExecutors'
  | 'delegatorProfileId'
  | 'nonce'
  | 'switchToGivenConfig'
  | CreateChangeProfileManagersEIP712TypedDataValueKeySpecifier
)[];
export type CreateChangeProfileManagersEIP712TypedDataValueFieldPolicy = {
  approvals?: FieldPolicy<any> | FieldReadFunction<any>;
  configNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  delegatedExecutors?: FieldPolicy<any> | FieldReadFunction<any>;
  delegatorProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  switchToGivenConfig?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'Follow'
  | CreateFollowEIP712TypedDataTypesKeySpecifier
)[];
export type CreateFollowEIP712TypedDataTypesFieldPolicy = {
  Follow?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateFollowEIP712TypedDataValueKeySpecifier = (
  | 'datas'
  | 'deadline'
  | 'followTokenIds'
  | 'followerProfileId'
  | 'idsOfProfilesToFollow'
  | 'nonce'
  | CreateFollowEIP712TypedDataValueKeySpecifier
)[];
export type CreateFollowEIP712TypedDataValueFieldPolicy = {
  datas?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  followTokenIds?: FieldPolicy<any> | FieldReadFunction<any>;
  followerProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  idsOfProfilesToFollow?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateHandleLinkToProfileBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateHandleLinkToProfileBroadcastItemResultKeySpecifier
)[];
export type CreateHandleLinkToProfileBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateHandleLinkToProfileEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateHandleLinkToProfileEIP712TypedDataKeySpecifier
)[];
export type CreateHandleLinkToProfileEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateHandleLinkToProfileEIP712TypedDataTypesKeySpecifier = (
  | 'Link'
  | CreateHandleLinkToProfileEIP712TypedDataTypesKeySpecifier
)[];
export type CreateHandleLinkToProfileEIP712TypedDataTypesFieldPolicy = {
  Link?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateHandleLinkToProfileEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'handleId'
  | 'nonce'
  | 'profileId'
  | CreateHandleLinkToProfileEIP712TypedDataValueKeySpecifier
)[];
export type CreateHandleLinkToProfileEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  handleId?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateHandleUnlinkFromProfileBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateHandleUnlinkFromProfileBroadcastItemResultKeySpecifier
)[];
export type CreateHandleUnlinkFromProfileBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateHandleUnlinkFromProfileEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateHandleUnlinkFromProfileEIP712TypedDataKeySpecifier
)[];
export type CreateHandleUnlinkFromProfileEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateHandleUnlinkFromProfileEIP712TypedDataTypesKeySpecifier = (
  | 'Unlink'
  | CreateHandleUnlinkFromProfileEIP712TypedDataTypesKeySpecifier
)[];
export type CreateHandleUnlinkFromProfileEIP712TypedDataTypesFieldPolicy = {
  Unlink?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateHandleUnlinkFromProfileEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'handleId'
  | 'nonce'
  | 'profileId'
  | CreateHandleUnlinkFromProfileEIP712TypedDataValueKeySpecifier
)[];
export type CreateHandleUnlinkFromProfileEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  handleId?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateLegacyCollectBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateLegacyCollectBroadcastItemResultKeySpecifier
)[];
export type CreateLegacyCollectBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaCommentBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateMomokaCommentBroadcastItemResultKeySpecifier
)[];
export type CreateMomokaCommentBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaCommentEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateMomokaCommentEIP712TypedDataKeySpecifier
)[];
export type CreateMomokaCommentEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaCommentEIP712TypedDataTypesKeySpecifier = (
  | 'Comment'
  | CreateMomokaCommentEIP712TypedDataTypesKeySpecifier
)[];
export type CreateMomokaCommentEIP712TypedDataTypesFieldPolicy = {
  Comment?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaCommentEIP712TypedDataValueKeySpecifier = (
  | 'actionModules'
  | 'actionModulesInitDatas'
  | 'contentURI'
  | 'deadline'
  | 'nonce'
  | 'pointedProfileId'
  | 'pointedPubId'
  | 'profileId'
  | 'referenceModule'
  | 'referenceModuleData'
  | 'referenceModuleInitData'
  | 'referrerProfileIds'
  | 'referrerPubIds'
  | CreateMomokaCommentEIP712TypedDataValueKeySpecifier
)[];
export type CreateMomokaCommentEIP712TypedDataValueFieldPolicy = {
  actionModules?: FieldPolicy<any> | FieldReadFunction<any>;
  actionModulesInitDatas?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedPubId?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerProfileIds?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerPubIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaMirrorBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateMomokaMirrorBroadcastItemResultKeySpecifier
)[];
export type CreateMomokaMirrorBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaMirrorEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateMomokaMirrorEIP712TypedDataKeySpecifier
)[];
export type CreateMomokaMirrorEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaMirrorEIP712TypedDataTypesKeySpecifier = (
  | 'Mirror'
  | CreateMomokaMirrorEIP712TypedDataTypesKeySpecifier
)[];
export type CreateMomokaMirrorEIP712TypedDataTypesFieldPolicy = {
  Mirror?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaMirrorEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'metadataURI'
  | 'nonce'
  | 'pointedProfileId'
  | 'pointedPubId'
  | 'profileId'
  | 'referenceModuleData'
  | 'referrerProfileIds'
  | 'referrerPubIds'
  | CreateMomokaMirrorEIP712TypedDataValueKeySpecifier
)[];
export type CreateMomokaMirrorEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  metadataURI?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedPubId?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerProfileIds?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerPubIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaPostBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateMomokaPostBroadcastItemResultKeySpecifier
)[];
export type CreateMomokaPostBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaPostEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateMomokaPostEIP712TypedDataKeySpecifier
)[];
export type CreateMomokaPostEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaPostEIP712TypedDataTypesKeySpecifier = (
  | 'Post'
  | CreateMomokaPostEIP712TypedDataTypesKeySpecifier
)[];
export type CreateMomokaPostEIP712TypedDataTypesFieldPolicy = {
  Post?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaPostEIP712TypedDataValueKeySpecifier = (
  | 'actionModules'
  | 'actionModulesInitDatas'
  | 'contentURI'
  | 'deadline'
  | 'nonce'
  | 'profileId'
  | 'referenceModule'
  | 'referenceModuleInitData'
  | CreateMomokaPostEIP712TypedDataValueKeySpecifier
)[];
export type CreateMomokaPostEIP712TypedDataValueFieldPolicy = {
  actionModules?: FieldPolicy<any> | FieldReadFunction<any>;
  actionModulesInitDatas?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaPublicationResultKeySpecifier = (
  | 'id'
  | 'momokaId'
  | 'proof'
  | CreateMomokaPublicationResultKeySpecifier
)[];
export type CreateMomokaPublicationResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  momokaId?: FieldPolicy<any> | FieldReadFunction<any>;
  proof?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaQuoteBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateMomokaQuoteBroadcastItemResultKeySpecifier
)[];
export type CreateMomokaQuoteBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaQuoteEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateMomokaQuoteEIP712TypedDataKeySpecifier
)[];
export type CreateMomokaQuoteEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaQuoteEIP712TypedDataTypesKeySpecifier = (
  | 'Quote'
  | CreateMomokaQuoteEIP712TypedDataTypesKeySpecifier
)[];
export type CreateMomokaQuoteEIP712TypedDataTypesFieldPolicy = {
  Quote?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMomokaQuoteEIP712TypedDataValueKeySpecifier = (
  | 'actionModules'
  | 'actionModulesInitDatas'
  | 'contentURI'
  | 'deadline'
  | 'nonce'
  | 'pointedProfileId'
  | 'pointedPubId'
  | 'profileId'
  | 'referenceModule'
  | 'referenceModuleData'
  | 'referenceModuleInitData'
  | 'referrerProfileIds'
  | 'referrerPubIds'
  | CreateMomokaQuoteEIP712TypedDataValueKeySpecifier
)[];
export type CreateMomokaQuoteEIP712TypedDataValueFieldPolicy = {
  actionModules?: FieldPolicy<any> | FieldReadFunction<any>;
  actionModulesInitDatas?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedPubId?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerProfileIds?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerPubIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainCommentBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateOnchainCommentBroadcastItemResultKeySpecifier
)[];
export type CreateOnchainCommentBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainCommentEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateOnchainCommentEIP712TypedDataKeySpecifier
)[];
export type CreateOnchainCommentEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainCommentEIP712TypedDataTypesKeySpecifier = (
  | 'Comment'
  | CreateOnchainCommentEIP712TypedDataTypesKeySpecifier
)[];
export type CreateOnchainCommentEIP712TypedDataTypesFieldPolicy = {
  Comment?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainCommentEIP712TypedDataValueKeySpecifier = (
  | 'actionModules'
  | 'actionModulesInitDatas'
  | 'contentURI'
  | 'deadline'
  | 'nonce'
  | 'pointedProfileId'
  | 'pointedPubId'
  | 'profileId'
  | 'referenceModule'
  | 'referenceModuleData'
  | 'referenceModuleInitData'
  | 'referrerProfileIds'
  | 'referrerPubIds'
  | CreateOnchainCommentEIP712TypedDataValueKeySpecifier
)[];
export type CreateOnchainCommentEIP712TypedDataValueFieldPolicy = {
  actionModules?: FieldPolicy<any> | FieldReadFunction<any>;
  actionModulesInitDatas?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedPubId?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerProfileIds?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerPubIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainMirrorBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateOnchainMirrorBroadcastItemResultKeySpecifier
)[];
export type CreateOnchainMirrorBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainMirrorEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateOnchainMirrorEIP712TypedDataKeySpecifier
)[];
export type CreateOnchainMirrorEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainMirrorEIP712TypedDataTypesKeySpecifier = (
  | 'Mirror'
  | CreateOnchainMirrorEIP712TypedDataTypesKeySpecifier
)[];
export type CreateOnchainMirrorEIP712TypedDataTypesFieldPolicy = {
  Mirror?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainMirrorEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'metadataURI'
  | 'nonce'
  | 'pointedProfileId'
  | 'pointedPubId'
  | 'profileId'
  | 'referenceModuleData'
  | 'referrerProfileIds'
  | 'referrerPubIds'
  | CreateOnchainMirrorEIP712TypedDataValueKeySpecifier
)[];
export type CreateOnchainMirrorEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  metadataURI?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedPubId?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerProfileIds?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerPubIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainPostBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateOnchainPostBroadcastItemResultKeySpecifier
)[];
export type CreateOnchainPostBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainPostEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateOnchainPostEIP712TypedDataKeySpecifier
)[];
export type CreateOnchainPostEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainPostEIP712TypedDataTypesKeySpecifier = (
  | 'Post'
  | CreateOnchainPostEIP712TypedDataTypesKeySpecifier
)[];
export type CreateOnchainPostEIP712TypedDataTypesFieldPolicy = {
  Post?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainPostEIP712TypedDataValueKeySpecifier = (
  | 'actionModules'
  | 'actionModulesInitDatas'
  | 'contentURI'
  | 'deadline'
  | 'nonce'
  | 'profileId'
  | 'referenceModule'
  | 'referenceModuleInitData'
  | CreateOnchainPostEIP712TypedDataValueKeySpecifier
)[];
export type CreateOnchainPostEIP712TypedDataValueFieldPolicy = {
  actionModules?: FieldPolicy<any> | FieldReadFunction<any>;
  actionModulesInitDatas?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainQuoteBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateOnchainQuoteBroadcastItemResultKeySpecifier
)[];
export type CreateOnchainQuoteBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainQuoteEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateOnchainQuoteEIP712TypedDataKeySpecifier
)[];
export type CreateOnchainQuoteEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainQuoteEIP712TypedDataTypesKeySpecifier = (
  | 'Quote'
  | CreateOnchainQuoteEIP712TypedDataTypesKeySpecifier
)[];
export type CreateOnchainQuoteEIP712TypedDataTypesFieldPolicy = {
  Quote?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainQuoteEIP712TypedDataValueKeySpecifier = (
  | 'actionModules'
  | 'actionModulesInitDatas'
  | 'contentURI'
  | 'deadline'
  | 'nonce'
  | 'pointedProfileId'
  | 'pointedPubId'
  | 'profileId'
  | 'referenceModule'
  | 'referenceModuleData'
  | 'referenceModuleInitData'
  | 'referrerProfileIds'
  | 'referrerPubIds'
  | CreateOnchainQuoteEIP712TypedDataValueKeySpecifier
)[];
export type CreateOnchainQuoteEIP712TypedDataValueFieldPolicy = {
  actionModules?: FieldPolicy<any> | FieldReadFunction<any>;
  actionModulesInitDatas?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  pointedPubId?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerProfileIds?: FieldPolicy<any> | FieldReadFunction<any>;
  referrerPubIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainSetProfileMetadataBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateOnchainSetProfileMetadataBroadcastItemResultKeySpecifier
)[];
export type CreateOnchainSetProfileMetadataBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainSetProfileMetadataEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateOnchainSetProfileMetadataEIP712TypedDataKeySpecifier
)[];
export type CreateOnchainSetProfileMetadataEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainSetProfileMetadataEIP712TypedDataTypesKeySpecifier = (
  | 'SetProfileMetadataURI'
  | CreateOnchainSetProfileMetadataEIP712TypedDataTypesKeySpecifier
)[];
export type CreateOnchainSetProfileMetadataEIP712TypedDataTypesFieldPolicy = {
  SetProfileMetadataURI?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateOnchainSetProfileMetadataEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'metadataURI'
  | 'nonce'
  | 'profileId'
  | CreateOnchainSetProfileMetadataEIP712TypedDataValueKeySpecifier
)[];
export type CreateOnchainSetProfileMetadataEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  metadataURI?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateProfileWithHandleErrorResultKeySpecifier = (
  | 'reason'
  | CreateProfileWithHandleErrorResultKeySpecifier
)[];
export type CreateProfileWithHandleErrorResultFieldPolicy = {
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'SetFollowModule'
  | CreateSetFollowModuleEIP712TypedDataTypesKeySpecifier
)[];
export type CreateSetFollowModuleEIP712TypedDataTypesFieldPolicy = {
  SetFollowModule?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type CreateUnblockProfilesBroadcastItemResultKeySpecifier = (
  | 'expiresAt'
  | 'id'
  | 'typedData'
  | CreateUnblockProfilesBroadcastItemResultKeySpecifier
)[];
export type CreateUnblockProfilesBroadcastItemResultFieldPolicy = {
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateUnblockProfilesEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateUnblockProfilesEIP712TypedDataKeySpecifier
)[];
export type CreateUnblockProfilesEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateUnblockProfilesEIP712TypedDataTypesKeySpecifier = (
  | 'SetBlockStatus'
  | CreateUnblockProfilesEIP712TypedDataTypesKeySpecifier
)[];
export type CreateUnblockProfilesEIP712TypedDataTypesFieldPolicy = {
  SetBlockStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateUnblockProfilesEIP712TypedDataValueKeySpecifier = (
  | 'blockStatus'
  | 'byProfileId'
  | 'deadline'
  | 'idsOfProfilesToSetBlockStatus'
  | 'nonce'
  | CreateUnblockProfilesEIP712TypedDataValueKeySpecifier
)[];
export type CreateUnblockProfilesEIP712TypedDataValueFieldPolicy = {
  blockStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  byProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  idsOfProfilesToSetBlockStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type CreateUnfollowEIP712TypedDataKeySpecifier = (
  | 'domain'
  | 'types'
  | 'value'
  | CreateUnfollowEIP712TypedDataKeySpecifier
)[];
export type CreateUnfollowEIP712TypedDataFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateUnfollowEIP712TypedDataTypesKeySpecifier = (
  | 'Unfollow'
  | CreateUnfollowEIP712TypedDataTypesKeySpecifier
)[];
export type CreateUnfollowEIP712TypedDataTypesFieldPolicy = {
  Unfollow?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateUnfollowEIP712TypedDataValueKeySpecifier = (
  | 'deadline'
  | 'idsOfProfilesToUnfollow'
  | 'nonce'
  | 'unfollowerProfileId'
  | CreateUnfollowEIP712TypedDataValueKeySpecifier
)[];
export type CreateUnfollowEIP712TypedDataValueFieldPolicy = {
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  idsOfProfilesToUnfollow?: FieldPolicy<any> | FieldReadFunction<any>;
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  unfollowerProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DegreesOfSeparationReferenceModuleSettingsKeySpecifier = (
  | 'commentsRestricted'
  | 'contract'
  | 'degreesOfSeparation'
  | 'mirrorsRestricted'
  | 'quotesRestricted'
  | DegreesOfSeparationReferenceModuleSettingsKeySpecifier
)[];
export type DegreesOfSeparationReferenceModuleSettingsFieldPolicy = {
  commentsRestricted?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  degreesOfSeparation?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorsRestricted?: FieldPolicy<any> | FieldReadFunction<any>;
  quotesRestricted?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DoesFollowResultKeySpecifier = (
  | 'followerProfileId'
  | 'status'
  | DoesFollowResultKeySpecifier
)[];
export type DoesFollowResultFieldPolicy = {
  followerProfileId?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type EmbedMetadataV3KeySpecifier = (
  | 'appId'
  | 'attachments'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'embed'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'tags'
  | EmbedMetadataV3KeySpecifier
)[];
export type EmbedMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  embed?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptableAudioKeySpecifier = ('mimeType' | 'uri' | EncryptableAudioKeySpecifier)[];
export type EncryptableAudioFieldPolicy = {
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptableAudioSetKeySpecifier = (
  | 'optimized'
  | 'raw'
  | EncryptableAudioSetKeySpecifier
)[];
export type EncryptableAudioSetFieldPolicy = {
  optimized?: FieldPolicy<any> | FieldReadFunction<any>;
  raw?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptableImageKeySpecifier = (
  | 'height'
  | 'mimeType'
  | 'uri'
  | 'width'
  | EncryptableImageKeySpecifier
)[];
export type EncryptableImageFieldPolicy = {
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
  width?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptableImageSetKeySpecifier = (
  | 'optimized'
  | 'raw'
  | 'transformed'
  | EncryptableImageSetKeySpecifier
)[];
export type EncryptableImageSetFieldPolicy = {
  optimized?: FieldPolicy<any> | FieldReadFunction<any>;
  raw?: FieldPolicy<any> | FieldReadFunction<any>;
  transformed?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptableVideoKeySpecifier = ('mimeType' | 'uri' | EncryptableVideoKeySpecifier)[];
export type EncryptableVideoFieldPolicy = {
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptableVideoSetKeySpecifier = (
  | 'optimized'
  | 'raw'
  | EncryptableVideoSetKeySpecifier
)[];
export type EncryptableVideoSetFieldPolicy = {
  optimized?: FieldPolicy<any> | FieldReadFunction<any>;
  raw?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EnsOnchainIdentityKeySpecifier = ('name' | EnsOnchainIdentityKeySpecifier)[];
export type EnsOnchainIdentityFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EoaOwnershipConditionKeySpecifier = ('address' | EoaOwnershipConditionKeySpecifier)[];
export type EoaOwnershipConditionFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type Erc20KeySpecifier = ('contract' | 'decimals' | 'name' | 'symbol' | Erc20KeySpecifier)[];
export type Erc20FieldPolicy = {
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  decimals?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  symbol?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type Erc20OwnershipConditionKeySpecifier = (
  | 'amount'
  | 'condition'
  | Erc20OwnershipConditionKeySpecifier
)[];
export type Erc20OwnershipConditionFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  condition?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EventMetadataV3KeySpecifier = (
  | 'address'
  | 'appId'
  | 'attachments'
  | 'attributes'
  | 'contentWarning'
  | 'encryptedWith'
  | 'endsAt'
  | 'geographic'
  | 'hideFromFeed'
  | 'id'
  | 'links'
  | 'locale'
  | 'location'
  | 'marketplace'
  | 'rawURI'
  | 'startsAt'
  | 'tags'
  | EventMetadataV3KeySpecifier
)[];
export type EventMetadataV3FieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  endsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  geographic?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  links?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  location?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  startsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FeeFollowModuleSettingsKeySpecifier = (
  | 'amount'
  | 'contract'
  | 'recipient'
  | FeeFollowModuleSettingsKeySpecifier
)[];
export type FeeFollowModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FeedItemKeySpecifier = (
  | 'acted'
  | 'comments'
  | 'id'
  | 'mirrors'
  | 'reactions'
  | 'root'
  | FeedItemKeySpecifier
)[];
export type FeedItemFieldPolicy = {
  acted?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  reactions?: FieldPolicy<any> | FieldReadFunction<any>;
  root?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FiatKeySpecifier = ('decimals' | 'name' | 'symbol' | FiatKeySpecifier)[];
export type FiatFieldPolicy = {
  decimals?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  symbol?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FiatAmountKeySpecifier = ('asset' | 'value' | FiatAmountKeySpecifier)[];
export type FiatAmountFieldPolicy = {
  asset?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowConditionKeySpecifier = ('follow' | FollowConditionKeySpecifier)[];
export type FollowConditionFieldPolicy = {
  follow?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowNotificationKeySpecifier = (
  | 'followers'
  | 'id'
  | FollowNotificationKeySpecifier
)[];
export type FollowNotificationFieldPolicy = {
  followers?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowOnlyReferenceModuleSettingsKeySpecifier = (
  | 'contract'
  | FollowOnlyReferenceModuleSettingsKeySpecifier
)[];
export type FollowOnlyReferenceModuleSettingsFieldPolicy = {
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowRevenueResultKeySpecifier = ('revenues' | FollowRevenueResultKeySpecifier)[];
export type FollowRevenueResultFieldPolicy = {
  revenues?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenerateModuleCurrencyApprovalResultKeySpecifier = (
  | 'data'
  | 'from'
  | 'to'
  | GenerateModuleCurrencyApprovalResultKeySpecifier
)[];
export type GenerateModuleCurrencyApprovalResultFieldPolicy = {
  data?: FieldPolicy<any> | FieldReadFunction<any>;
  from?: FieldPolicy<any> | FieldReadFunction<any>;
  to?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GeoLocationKeySpecifier = (
  | 'latitude'
  | 'longitude'
  | 'rawURI'
  | GeoLocationKeySpecifier
)[];
export type GeoLocationFieldPolicy = {
  latitude?: FieldPolicy<any> | FieldReadFunction<any>;
  longitude?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type HandleResultKeySpecifier = ('handle' | HandleResultKeySpecifier)[];
export type HandleResultFieldPolicy = {
  handle?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ImageKeySpecifier = ('height' | 'mimeType' | 'uri' | 'width' | ImageKeySpecifier)[];
export type ImageFieldPolicy = {
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
  width?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ImageMetadataV3KeySpecifier = (
  | 'appId'
  | 'asset'
  | 'attachments'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'tags'
  | 'title'
  | ImageMetadataV3KeySpecifier
)[];
export type ImageMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  asset?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ImageSetKeySpecifier = ('optimized' | 'raw' | 'transformed' | ImageSetKeySpecifier)[];
export type ImageSetFieldPolicy = {
  optimized?: FieldPolicy<any> | FieldReadFunction<any>;
  raw?: FieldPolicy<any> | FieldReadFunction<any>;
  transformed?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InvitedResultKeySpecifier = (
  | 'by'
  | 'profileMinted'
  | 'when'
  | InvitedResultKeySpecifier
)[];
export type InvitedResultFieldPolicy = {
  by?: FieldPolicy<any> | FieldReadFunction<any>;
  profileMinted?: FieldPolicy<any> | FieldReadFunction<any>;
  when?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type KnownCollectOpenActionResultKeySpecifier = (
  | 'type'
  | KnownCollectOpenActionResultKeySpecifier
)[];
export type KnownCollectOpenActionResultFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type KnownSupportedModuleKeySpecifier = (
  | 'contract'
  | 'moduleInput'
  | 'moduleName'
  | 'redeemInput'
  | 'returnDataInput'
  | KnownSupportedModuleKeySpecifier
)[];
export type KnownSupportedModuleFieldPolicy = {
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  moduleInput?: FieldPolicy<any> | FieldReadFunction<any>;
  moduleName?: FieldPolicy<any> | FieldReadFunction<any>;
  redeemInput?: FieldPolicy<any> | FieldReadFunction<any>;
  returnDataInput?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LegacyAaveFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'contract'
  | 'endsAt'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | LegacyAaveFeeCollectModuleSettingsKeySpecifier
)[];
export type LegacyAaveFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  endsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LegacyERC4626FeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'contract'
  | 'endsAt'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | 'vault'
  | LegacyERC4626FeeCollectModuleSettingsKeySpecifier
)[];
export type LegacyERC4626FeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  endsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  vault?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LegacyFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectNft'
  | 'contract'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | LegacyFeeCollectModuleSettingsKeySpecifier
)[];
export type LegacyFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNft?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LegacyFreeCollectModuleSettingsKeySpecifier = (
  | 'collectNft'
  | 'contract'
  | 'followerOnly'
  | LegacyFreeCollectModuleSettingsKeySpecifier
)[];
export type LegacyFreeCollectModuleSettingsFieldPolicy = {
  collectNft?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LegacyLimitedFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'collectNft'
  | 'contract'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | LegacyLimitedFeeCollectModuleSettingsKeySpecifier
)[];
export type LegacyLimitedFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNft?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LegacyLimitedTimedFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'collectNft'
  | 'contract'
  | 'endTimestamp'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | LegacyLimitedTimedFeeCollectModuleSettingsKeySpecifier
)[];
export type LegacyLimitedTimedFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNft?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  endTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LegacyMultirecipientFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'collectNft'
  | 'contract'
  | 'endsAt'
  | 'followerOnly'
  | 'recipients'
  | 'referralFee'
  | LegacyMultirecipientFeeCollectModuleSettingsKeySpecifier
)[];
export type LegacyMultirecipientFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNft?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  endsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipients?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LegacyRevertCollectModuleSettingsKeySpecifier = (
  | 'contract'
  | LegacyRevertCollectModuleSettingsKeySpecifier
)[];
export type LegacyRevertCollectModuleSettingsFieldPolicy = {
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LegacySimpleCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'collectNft'
  | 'contract'
  | 'endsAt'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | LegacySimpleCollectModuleSettingsKeySpecifier
)[];
export type LegacySimpleCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNft?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  endsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LegacyTimedFeeCollectModuleSettingsKeySpecifier = (
  | 'amount'
  | 'collectNft'
  | 'contract'
  | 'endTimestamp'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | LegacyTimedFeeCollectModuleSettingsKeySpecifier
)[];
export type LegacyTimedFeeCollectModuleSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNft?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  endTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LensProfileManagerRelayErrorKeySpecifier = (
  | 'reason'
  | LensProfileManagerRelayErrorKeySpecifier
)[];
export type LensProfileManagerRelayErrorFieldPolicy = {
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LensTransactionResultKeySpecifier = (
  | 'extraInfo'
  | 'reason'
  | 'status'
  | 'txHash'
  | LensTransactionResultKeySpecifier
)[];
export type LensTransactionResultFieldPolicy = {
  extraInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LinkMetadataV3KeySpecifier = (
  | 'appId'
  | 'attachments'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'sharingLink'
  | 'tags'
  | LinkMetadataV3KeySpecifier
)[];
export type LinkMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  sharingLink?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LiveStreamMetadataV3KeySpecifier = (
  | 'appId'
  | 'attachments'
  | 'attributes'
  | 'checkLiveAPI'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'endsAt'
  | 'hideFromFeed'
  | 'id'
  | 'liveURL'
  | 'locale'
  | 'marketplace'
  | 'playbackURL'
  | 'rawURI'
  | 'startsAt'
  | 'tags'
  | 'title'
  | LiveStreamMetadataV3KeySpecifier
)[];
export type LiveStreamMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  checkLiveAPI?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  endsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  liveURL?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  playbackURL?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  startsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceMetadataKeySpecifier = (
  | 'animationUrl'
  | 'attributes'
  | 'description'
  | 'externalURL'
  | 'image'
  | 'name'
  | MarketplaceMetadataKeySpecifier
)[];
export type MarketplaceMetadataFieldPolicy = {
  animationUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  externalURL?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MentionNotificationKeySpecifier = (
  | 'id'
  | 'publication'
  | MentionNotificationKeySpecifier
)[];
export type MentionNotificationFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MetadataBooleanAttributeKeySpecifier = (
  | 'key'
  | 'value'
  | MetadataBooleanAttributeKeySpecifier
)[];
export type MetadataBooleanAttributeFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MetadataDateAttributeKeySpecifier = (
  | 'key'
  | 'value'
  | MetadataDateAttributeKeySpecifier
)[];
export type MetadataDateAttributeFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MetadataJSONAttributeKeySpecifier = (
  | 'key'
  | 'value'
  | MetadataJSONAttributeKeySpecifier
)[];
export type MetadataJSONAttributeFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MetadataNumberAttributeKeySpecifier = (
  | 'key'
  | 'value'
  | MetadataNumberAttributeKeySpecifier
)[];
export type MetadataNumberAttributeFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MetadataStringAttributeKeySpecifier = (
  | 'key'
  | 'value'
  | MetadataStringAttributeKeySpecifier
)[];
export type MetadataStringAttributeFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MintMetadataV3KeySpecifier = (
  | 'appId'
  | 'attachments'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'marketplace'
  | 'mintLink'
  | 'rawURI'
  | 'tags'
  | MintMetadataV3KeySpecifier
)[];
export type MintMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  mintLink?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MirrorKeySpecifier = (
  | 'by'
  | 'createdAt'
  | 'id'
  | 'isHidden'
  | 'mirrorOn'
  | 'momoka'
  | 'publishedOn'
  | 'txHash'
  | MirrorKeySpecifier
)[];
export type MirrorFieldPolicy = {
  by?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isHidden?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorOn?: FieldPolicy<any> | FieldReadFunction<any>;
  momoka?: FieldPolicy<any> | FieldReadFunction<any>;
  publishedOn?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MirrorNotificationKeySpecifier = (
  | 'id'
  | 'mirrors'
  | 'publication'
  | MirrorNotificationKeySpecifier
)[];
export type MirrorNotificationFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ModuleInfoKeySpecifier = ('name' | 'type' | ModuleInfoKeySpecifier)[];
export type ModuleInfoFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaCommentTransactionKeySpecifier = (
  | 'app'
  | 'commentOn'
  | 'createdAt'
  | 'publication'
  | 'submitter'
  | 'transactionId'
  | 'verificationStatus'
  | MomokaCommentTransactionKeySpecifier
)[];
export type MomokaCommentTransactionFieldPolicy = {
  app?: FieldPolicy<any> | FieldReadFunction<any>;
  commentOn?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
  submitter?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionId?: FieldPolicy<any> | FieldReadFunction<any>;
  verificationStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaInfoKeySpecifier = ('proof' | MomokaInfoKeySpecifier)[];
export type MomokaInfoFieldPolicy = {
  proof?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaMirrorTransactionKeySpecifier = (
  | 'app'
  | 'createdAt'
  | 'mirrorOn'
  | 'publication'
  | 'submitter'
  | 'transactionId'
  | 'verificationStatus'
  | MomokaMirrorTransactionKeySpecifier
)[];
export type MomokaMirrorTransactionFieldPolicy = {
  app?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorOn?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
  submitter?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionId?: FieldPolicy<any> | FieldReadFunction<any>;
  verificationStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaPostTransactionKeySpecifier = (
  | 'app'
  | 'createdAt'
  | 'publication'
  | 'submitter'
  | 'transactionId'
  | 'verificationStatus'
  | MomokaPostTransactionKeySpecifier
)[];
export type MomokaPostTransactionFieldPolicy = {
  app?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
  submitter?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionId?: FieldPolicy<any> | FieldReadFunction<any>;
  verificationStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaQuoteTransactionKeySpecifier = (
  | 'app'
  | 'createdAt'
  | 'publication'
  | 'quoteOn'
  | 'submitter'
  | 'transactionId'
  | 'verificationStatus'
  | MomokaQuoteTransactionKeySpecifier
)[];
export type MomokaQuoteTransactionFieldPolicy = {
  app?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
  quoteOn?: FieldPolicy<any> | FieldReadFunction<any>;
  submitter?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionId?: FieldPolicy<any> | FieldReadFunction<any>;
  verificationStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaSubmitterResultKeySpecifier = (
  | 'address'
  | 'name'
  | 'totalTransactions'
  | MomokaSubmitterResultKeySpecifier
)[];
export type MomokaSubmitterResultFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  totalTransactions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaSubmittersResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | MomokaSubmittersResultKeySpecifier
)[];
export type MomokaSubmittersResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaSummaryResultKeySpecifier = (
  | 'totalTransactions'
  | MomokaSummaryResultKeySpecifier
)[];
export type MomokaSummaryResultFieldPolicy = {
  totalTransactions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaTransactionsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | MomokaTransactionsResultKeySpecifier
)[];
export type MomokaTransactionsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaVerificationStatusFailureKeySpecifier = (
  | 'status'
  | MomokaVerificationStatusFailureKeySpecifier
)[];
export type MomokaVerificationStatusFailureFieldPolicy = {
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MomokaVerificationStatusSuccessKeySpecifier = (
  | 'verified'
  | MomokaVerificationStatusSuccessKeySpecifier
)[];
export type MomokaVerificationStatusSuccessFieldPolicy = {
  verified?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MultirecipientFeeCollectOpenActionSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'collectNft'
  | 'contract'
  | 'endsAt'
  | 'followerOnly'
  | 'recipients'
  | 'referralFee'
  | MultirecipientFeeCollectOpenActionSettingsKeySpecifier
)[];
export type MultirecipientFeeCollectOpenActionSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNft?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  endsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipients?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | 'actOnOpenAction'
  | 'addProfileInterests'
  | 'addPublicationBookmark'
  | 'addPublicationNotInterested'
  | 'addReaction'
  | 'authenticate'
  | 'block'
  | 'broadcastOnMomoka'
  | 'broadcastOnchain'
  | 'claimProfile'
  | 'commentOnMomoka'
  | 'commentOnchain'
  | 'createActOnOpenActionTypedData'
  | 'createBlockProfilesTypedData'
  | 'createChangeProfileManagersTypedData'
  | 'createFollowTypedData'
  | 'createHandleLinkToProfileTypedData'
  | 'createHandleUnlinkFromProfileTypedData'
  | 'createLegacyCollectTypedData'
  | 'createMomokaCommentTypedData'
  | 'createMomokaMirrorTypedData'
  | 'createMomokaPostTypedData'
  | 'createMomokaQuoteTypedData'
  | 'createNftGallery'
  | 'createOnchainCommentTypedData'
  | 'createOnchainMirrorTypedData'
  | 'createOnchainPostTypedData'
  | 'createOnchainQuoteTypedData'
  | 'createOnchainSetProfileMetadataTypedData'
  | 'createProfileWithHandle'
  | 'createSetFollowModuleTypedData'
  | 'createUnblockProfilesTypedData'
  | 'createUnfollowTypedData'
  | 'deleteNftGallery'
  | 'dismissRecommendedProfiles'
  | 'follow'
  | 'handleLinkToProfile'
  | 'handleUnlinkFromProfile'
  | 'hidePublication'
  | 'idKitPhoneVerifyWebhook'
  | 'inviteProfile'
  | 'legacyCollect'
  | 'mirrorOnMomoka'
  | 'mirrorOnchain'
  | 'nftOwnershipChallenge'
  | 'postOnMomoka'
  | 'postOnchain'
  | 'quoteOnMomoka'
  | 'quoteOnchain'
  | 'refresh'
  | 'refreshPublicationMetadata'
  | 'removeProfileInterests'
  | 'removePublicationBookmark'
  | 'removeReaction'
  | 'reportPublication'
  | 'setFollowModule'
  | 'setProfileMetadata'
  | 'unblock'
  | 'undoPublicationNotInterested'
  | 'unfollow'
  | 'updateNftGalleryInfo'
  | 'updateNftGalleryItems'
  | 'updateNftGalleryOrder'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  actOnOpenAction?: FieldPolicy<any> | FieldReadFunction<any>;
  addProfileInterests?: FieldPolicy<any> | FieldReadFunction<any>;
  addPublicationBookmark?: FieldPolicy<any> | FieldReadFunction<any>;
  addPublicationNotInterested?: FieldPolicy<any> | FieldReadFunction<any>;
  addReaction?: FieldPolicy<any> | FieldReadFunction<any>;
  authenticate?: FieldPolicy<any> | FieldReadFunction<any>;
  block?: FieldPolicy<any> | FieldReadFunction<any>;
  broadcastOnMomoka?: FieldPolicy<any> | FieldReadFunction<any>;
  broadcastOnchain?: FieldPolicy<any> | FieldReadFunction<any>;
  claimProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  commentOnMomoka?: FieldPolicy<any> | FieldReadFunction<any>;
  commentOnchain?: FieldPolicy<any> | FieldReadFunction<any>;
  createActOnOpenActionTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createBlockProfilesTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createChangeProfileManagersTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createFollowTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createHandleLinkToProfileTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createHandleUnlinkFromProfileTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createLegacyCollectTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createMomokaCommentTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createMomokaMirrorTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createMomokaPostTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createMomokaQuoteTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createNftGallery?: FieldPolicy<any> | FieldReadFunction<any>;
  createOnchainCommentTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createOnchainMirrorTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createOnchainPostTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createOnchainQuoteTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createOnchainSetProfileMetadataTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createProfileWithHandle?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetFollowModuleTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createUnblockProfilesTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createUnfollowTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteNftGallery?: FieldPolicy<any> | FieldReadFunction<any>;
  dismissRecommendedProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  follow?: FieldPolicy<any> | FieldReadFunction<any>;
  handleLinkToProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  handleUnlinkFromProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  hidePublication?: FieldPolicy<any> | FieldReadFunction<any>;
  idKitPhoneVerifyWebhook?: FieldPolicy<any> | FieldReadFunction<any>;
  inviteProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  legacyCollect?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorOnMomoka?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorOnchain?: FieldPolicy<any> | FieldReadFunction<any>;
  nftOwnershipChallenge?: FieldPolicy<any> | FieldReadFunction<any>;
  postOnMomoka?: FieldPolicy<any> | FieldReadFunction<any>;
  postOnchain?: FieldPolicy<any> | FieldReadFunction<any>;
  quoteOnMomoka?: FieldPolicy<any> | FieldReadFunction<any>;
  quoteOnchain?: FieldPolicy<any> | FieldReadFunction<any>;
  refresh?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshPublicationMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  removeProfileInterests?: FieldPolicy<any> | FieldReadFunction<any>;
  removePublicationBookmark?: FieldPolicy<any> | FieldReadFunction<any>;
  removeReaction?: FieldPolicy<any> | FieldReadFunction<any>;
  reportPublication?: FieldPolicy<any> | FieldReadFunction<any>;
  setFollowModule?: FieldPolicy<any> | FieldReadFunction<any>;
  setProfileMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  unblock?: FieldPolicy<any> | FieldReadFunction<any>;
  undoPublicationNotInterested?: FieldPolicy<any> | FieldReadFunction<any>;
  unfollow?: FieldPolicy<any> | FieldReadFunction<any>;
  updateNftGalleryInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  updateNftGalleryItems?: FieldPolicy<any> | FieldReadFunction<any>;
  updateNftGalleryOrder?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NetworkAddressKeySpecifier = ('address' | 'chainId' | NetworkAddressKeySpecifier)[];
export type NetworkAddressFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  chainId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftKeySpecifier = (
  | 'collection'
  | 'contentURI'
  | 'contract'
  | 'contractType'
  | 'metadata'
  | 'owner'
  | 'tokenId'
  | 'totalSupply'
  | NftKeySpecifier
)[];
export type NftFieldPolicy = {
  collection?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  contractType?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenId?: FieldPolicy<any> | FieldReadFunction<any>;
  totalSupply?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftCollectionKeySpecifier = (
  | 'baseUri'
  | 'contract'
  | 'contractType'
  | 'name'
  | 'symbol'
  | 'verified'
  | NftCollectionKeySpecifier
)[];
export type NftCollectionFieldPolicy = {
  baseUri?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  contractType?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  symbol?: FieldPolicy<any> | FieldReadFunction<any>;
  verified?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftCollectionWithOwnersKeySpecifier = (
  | 'collection'
  | 'totalOwners'
  | NftCollectionWithOwnersKeySpecifier
)[];
export type NftCollectionWithOwnersFieldPolicy = {
  collection?: FieldPolicy<any> | FieldReadFunction<any>;
  totalOwners?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftGalleryKeySpecifier = (
  | 'createdAt'
  | 'id'
  | 'items'
  | 'name'
  | 'owner'
  | 'updatedAt'
  | NftGalleryKeySpecifier
)[];
export type NftGalleryFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftImageKeySpecifier = (
  | 'collection'
  | 'image'
  | 'tokenId'
  | 'verified'
  | NftImageKeySpecifier
)[];
export type NftImageFieldPolicy = {
  collection?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenId?: FieldPolicy<any> | FieldReadFunction<any>;
  verified?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftMetadataKeySpecifier = (
  | 'animationUrl'
  | 'attributes'
  | 'description'
  | 'externalURL'
  | 'image'
  | 'name'
  | NftMetadataKeySpecifier
)[];
export type NftMetadataFieldPolicy = {
  animationUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  externalURL?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftOwnershipChallengeResultKeySpecifier = (
  | 'info'
  | 'success'
  | NftOwnershipChallengeResultKeySpecifier
)[];
export type NftOwnershipChallengeResultFieldPolicy = {
  info?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftOwnershipConditionKeySpecifier = (
  | 'contract'
  | 'contractType'
  | 'tokenIds'
  | NftOwnershipConditionKeySpecifier
)[];
export type NftOwnershipConditionFieldPolicy = {
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  contractType?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpenActionProfileActedKeySpecifier = (
  | 'actedAt'
  | 'action'
  | 'by'
  | OpenActionProfileActedKeySpecifier
)[];
export type OpenActionProfileActedFieldPolicy = {
  actedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  action?: FieldPolicy<any> | FieldReadFunction<any>;
  by?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OptimisticStatusResultKeySpecifier = (
  | 'isFinalisedOnchain'
  | 'value'
  | OptimisticStatusResultKeySpecifier
)[];
export type OptimisticStatusResultFieldPolicy = {
  isFinalisedOnchain?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OrConditionKeySpecifier = ('criteria' | OrConditionKeySpecifier)[];
export type OrConditionFieldPolicy = {
  criteria?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OwnerKeySpecifier = ('address' | 'amount' | OwnerKeySpecifier)[];
export type OwnerFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedCurrenciesResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedCurrenciesResultKeySpecifier
)[];
export type PaginatedCurrenciesResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedExplorePublicationResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedExplorePublicationResultKeySpecifier
)[];
export type PaginatedExplorePublicationResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedFeedHighlightsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedFeedHighlightsResultKeySpecifier
)[];
export type PaginatedFeedHighlightsResultFieldPolicy = {
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
export type PaginatedHandlesResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedHandlesResultKeySpecifier
)[];
export type PaginatedHandlesResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedNftCollectionsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedNftCollectionsResultKeySpecifier
)[];
export type PaginatedNftCollectionsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedNftGalleriesResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedNftGalleriesResultKeySpecifier
)[];
export type PaginatedNftGalleriesResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedNftsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedNftsResultKeySpecifier
)[];
export type PaginatedNftsResultFieldPolicy = {
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
export type PaginatedPoapEventResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedPoapEventResultKeySpecifier
)[];
export type PaginatedPoapEventResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedPoapTokenResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedPoapTokenResultKeySpecifier
)[];
export type PaginatedPoapTokenResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedPopularNftCollectionsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedPopularNftCollectionsResultKeySpecifier
)[];
export type PaginatedPopularNftCollectionsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedProfileActionHistoryResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedProfileActionHistoryResultKeySpecifier
)[];
export type PaginatedProfileActionHistoryResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedProfileManagersResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedProfileManagersResultKeySpecifier
)[];
export type PaginatedProfileManagersResultFieldPolicy = {
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
export type PaginatedPublicationPrimaryResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedPublicationPrimaryResultKeySpecifier
)[];
export type PaginatedPublicationPrimaryResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedPublicationsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedPublicationsResultKeySpecifier
)[];
export type PaginatedPublicationsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedPublicationsTagsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedPublicationsTagsResultKeySpecifier
)[];
export type PaginatedPublicationsTagsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedResultInfoKeySpecifier = (
  | 'moreAfter'
  | 'next'
  | 'prev'
  | PaginatedResultInfoKeySpecifier
)[];
export type PaginatedResultInfoFieldPolicy = {
  moreAfter?: FieldPolicy<any> | FieldReadFunction<any>;
  next?: FieldPolicy<any> | FieldReadFunction<any>;
  prev?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedRevenueFromPublicationsResultKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedRevenueFromPublicationsResultKeySpecifier
)[];
export type PaginatedRevenueFromPublicationsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedSupportedModulesKeySpecifier = (
  | 'items'
  | 'pageInfo'
  | PaginatedSupportedModulesKeySpecifier
)[];
export type PaginatedSupportedModulesFieldPolicy = {
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
export type PhysicalAddressKeySpecifier = (
  | 'country'
  | 'formatted'
  | 'locality'
  | 'postalCode'
  | 'region'
  | 'streetAddress'
  | PhysicalAddressKeySpecifier
)[];
export type PhysicalAddressFieldPolicy = {
  country?: FieldPolicy<any> | FieldReadFunction<any>;
  formatted?: FieldPolicy<any> | FieldReadFunction<any>;
  locality?: FieldPolicy<any> | FieldReadFunction<any>;
  postalCode?: FieldPolicy<any> | FieldReadFunction<any>;
  region?: FieldPolicy<any> | FieldReadFunction<any>;
  streetAddress?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PoapEventKeySpecifier = (
  | 'animationUrl'
  | 'city'
  | 'country'
  | 'description'
  | 'endDate'
  | 'eventTemplateId'
  | 'eventUrl'
  | 'expiryDate'
  | 'fancyId'
  | 'fromAdmin'
  | 'id'
  | 'imageUrl'
  | 'name'
  | 'privateEvent'
  | 'startDate'
  | 'virtualEvent'
  | 'year'
  | PoapEventKeySpecifier
)[];
export type PoapEventFieldPolicy = {
  animationUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  city?: FieldPolicy<any> | FieldReadFunction<any>;
  country?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  endDate?: FieldPolicy<any> | FieldReadFunction<any>;
  eventTemplateId?: FieldPolicy<any> | FieldReadFunction<any>;
  eventUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  expiryDate?: FieldPolicy<any> | FieldReadFunction<any>;
  fancyId?: FieldPolicy<any> | FieldReadFunction<any>;
  fromAdmin?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  imageUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  privateEvent?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
  virtualEvent?: FieldPolicy<any> | FieldReadFunction<any>;
  year?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PoapTokenKeySpecifier = (
  | 'created'
  | 'event'
  | 'eventId'
  | 'layer'
  | 'migrated'
  | 'owner'
  | 'tokenId'
  | PoapTokenKeySpecifier
)[];
export type PoapTokenFieldPolicy = {
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  event?: FieldPolicy<any> | FieldReadFunction<any>;
  eventId?: FieldPolicy<any> | FieldReadFunction<any>;
  layer?: FieldPolicy<any> | FieldReadFunction<any>;
  migrated?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PostKeySpecifier = (
  | 'by'
  | 'createdAt'
  | 'id'
  | 'isHidden'
  | 'metadata'
  | 'momoka'
  | 'openActionModules'
  | 'operations'
  | 'publishedOn'
  | 'referenceModule'
  | 'stats'
  | 'txHash'
  | PostKeySpecifier
)[];
export type PostFieldPolicy = {
  by?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isHidden?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  momoka?: FieldPolicy<any> | FieldReadFunction<any>;
  openActionModules?: FieldPolicy<any> | FieldReadFunction<any>;
  operations?: FieldPolicy<any> | FieldReadFunction<any>;
  publishedOn?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileKeySpecifier = (
  | 'createdAt'
  | 'followModule'
  | 'followNftAddress'
  | 'guardian'
  | 'handle'
  | 'id'
  | 'interests'
  | 'invitedBy'
  | 'invitesLeft'
  | 'lensManager'
  | 'metadata'
  | 'onchainIdentity'
  | 'operations'
  | 'ownedBy'
  | 'sponsor'
  | 'stats'
  | 'txHash'
  | ProfileKeySpecifier
)[];
export type ProfileFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  followModule?: FieldPolicy<any> | FieldReadFunction<any>;
  followNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  guardian?: FieldPolicy<any> | FieldReadFunction<any>;
  handle?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  interests?: FieldPolicy<any> | FieldReadFunction<any>;
  invitedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  invitesLeft?: FieldPolicy<any> | FieldReadFunction<any>;
  lensManager?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  onchainIdentity?: FieldPolicy<any> | FieldReadFunction<any>;
  operations?: FieldPolicy<any> | FieldReadFunction<any>;
  ownedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  sponsor?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileActionHistoryKeySpecifier = (
  | 'actionType'
  | 'actionedOn'
  | 'id'
  | 'txHash'
  | 'who'
  | ProfileActionHistoryKeySpecifier
)[];
export type ProfileActionHistoryFieldPolicy = {
  actionType?: FieldPolicy<any> | FieldReadFunction<any>;
  actionedOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
  who?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileGuardianResultKeySpecifier = (
  | 'cooldownEndsOn'
  | 'protected'
  | ProfileGuardianResultKeySpecifier
)[];
export type ProfileGuardianResultFieldPolicy = {
  cooldownEndsOn?: FieldPolicy<any> | FieldReadFunction<any>;
  protected?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileMetadataKeySpecifier = (
  | 'appId'
  | 'attributes'
  | 'bio'
  | 'coverPicture'
  | 'displayName'
  | 'picture'
  | 'rawURI'
  | ProfileMetadataKeySpecifier
)[];
export type ProfileMetadataFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  bio?: FieldPolicy<any> | FieldReadFunction<any>;
  coverPicture?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  picture?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileMirrorResultKeySpecifier = (
  | 'mirrorId'
  | 'mirroredAt'
  | 'profile'
  | ProfileMirrorResultKeySpecifier
)[];
export type ProfileMirrorResultFieldPolicy = {
  mirrorId?: FieldPolicy<any> | FieldReadFunction<any>;
  mirroredAt?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileOnchainIdentityKeySpecifier = (
  | 'ens'
  | 'proofOfHumanity'
  | 'sybilDotOrg'
  | 'worldcoin'
  | ProfileOnchainIdentityKeySpecifier
)[];
export type ProfileOnchainIdentityFieldPolicy = {
  ens?: FieldPolicy<any> | FieldReadFunction<any>;
  proofOfHumanity?: FieldPolicy<any> | FieldReadFunction<any>;
  sybilDotOrg?: FieldPolicy<any> | FieldReadFunction<any>;
  worldcoin?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileOperationsKeySpecifier = (
  | 'canBlock'
  | 'canFollow'
  | 'canUnblock'
  | 'canUnfollow'
  | 'id'
  | 'isBlockedByMe'
  | 'isFollowedByMe'
  | 'isFollowingMe'
  | ProfileOperationsKeySpecifier
)[];
export type ProfileOperationsFieldPolicy = {
  canBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  canFollow?: FieldPolicy<any> | FieldReadFunction<any>;
  canUnblock?: FieldPolicy<any> | FieldReadFunction<any>;
  canUnfollow?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isBlockedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  isFollowedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  isFollowingMe?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileOwnershipConditionKeySpecifier = (
  | 'profileId'
  | ProfileOwnershipConditionKeySpecifier
)[];
export type ProfileOwnershipConditionFieldPolicy = {
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileReactedResultKeySpecifier = (
  | 'profile'
  | 'reactions'
  | ProfileReactedResultKeySpecifier
)[];
export type ProfileReactedResultFieldPolicy = {
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  reactions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileReactionResultKeySpecifier = (
  | 'reaction'
  | 'reactionAt'
  | ProfileReactionResultKeySpecifier
)[];
export type ProfileReactionResultFieldPolicy = {
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  reactionAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileStatsKeySpecifier = (
  | 'comments'
  | 'countOpenActions'
  | 'followers'
  | 'following'
  | 'id'
  | 'mirrors'
  | 'posts'
  | 'publications'
  | 'quotes'
  | 'reacted'
  | 'reactions'
  | ProfileStatsKeySpecifier
)[];
export type ProfileStatsFieldPolicy = {
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  countOpenActions?: FieldPolicy<any> | FieldReadFunction<any>;
  followers?: FieldPolicy<any> | FieldReadFunction<any>;
  following?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  posts?: FieldPolicy<any> | FieldReadFunction<any>;
  publications?: FieldPolicy<any> | FieldReadFunction<any>;
  quotes?: FieldPolicy<any> | FieldReadFunction<any>;
  reacted?: FieldPolicy<any> | FieldReadFunction<any>;
  reactions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileWhoReactedResultKeySpecifier = (
  | 'profile'
  | 'reactions'
  | ProfileWhoReactedResultKeySpecifier
)[];
export type ProfileWhoReactedResultFieldPolicy = {
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  reactions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfilesManagedResultKeySpecifier = ('address' | ProfilesManagedResultKeySpecifier)[];
export type ProfilesManagedResultFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMarketplaceMetadataAttributeKeySpecifier = (
  | 'displayType'
  | 'traitType'
  | 'value'
  | PublicationMarketplaceMetadataAttributeKeySpecifier
)[];
export type PublicationMarketplaceMetadataAttributeFieldPolicy = {
  displayType?: FieldPolicy<any> | FieldReadFunction<any>;
  traitType?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataLitEncryptionKeySpecifier = (
  | 'accessCondition'
  | 'encryptedPaths'
  | 'encryptionKey'
  | PublicationMetadataLitEncryptionKeySpecifier
)[];
export type PublicationMetadataLitEncryptionFieldPolicy = {
  accessCondition?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedPaths?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptionKey?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataMediaAudioKeySpecifier = (
  | 'artist'
  | 'attributes'
  | 'audio'
  | 'cover'
  | 'credits'
  | 'duration'
  | 'genre'
  | 'license'
  | 'lyrics'
  | 'recordLabel'
  | PublicationMetadataMediaAudioKeySpecifier
)[];
export type PublicationMetadataMediaAudioFieldPolicy = {
  artist?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  audio?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  credits?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  genre?: FieldPolicy<any> | FieldReadFunction<any>;
  license?: FieldPolicy<any> | FieldReadFunction<any>;
  lyrics?: FieldPolicy<any> | FieldReadFunction<any>;
  recordLabel?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataMediaImageKeySpecifier = (
  | 'altTag'
  | 'attributes'
  | 'image'
  | 'license'
  | PublicationMetadataMediaImageKeySpecifier
)[];
export type PublicationMetadataMediaImageFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  license?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataMediaVideoKeySpecifier = (
  | 'altTag'
  | 'attributes'
  | 'cover'
  | 'duration'
  | 'license'
  | 'video'
  | PublicationMetadataMediaVideoKeySpecifier
)[];
export type PublicationMetadataMediaVideoFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  license?: FieldPolicy<any> | FieldReadFunction<any>;
  video?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationOperationsKeySpecifier = (
  | 'actedOn'
  | 'canAct'
  | 'canComment'
  | 'canDecrypt'
  | 'canMirror'
  | 'hasActed'
  | 'hasBookmarked'
  | 'hasMirrored'
  | 'hasReacted'
  | 'hasReported'
  | 'isNotInterested'
  | PublicationOperationsKeySpecifier
)[];
export type PublicationOperationsFieldPolicy = {
  actedOn?: FieldPolicy<any> | FieldReadFunction<any>;
  canAct?: FieldPolicy<any> | FieldReadFunction<any>;
  canComment?: FieldPolicy<any> | FieldReadFunction<any>;
  canDecrypt?: FieldPolicy<any> | FieldReadFunction<any>;
  canMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  hasActed?: FieldPolicy<any> | FieldReadFunction<any>;
  hasBookmarked?: FieldPolicy<any> | FieldReadFunction<any>;
  hasMirrored?: FieldPolicy<any> | FieldReadFunction<any>;
  hasReacted?: FieldPolicy<any> | FieldReadFunction<any>;
  hasReported?: FieldPolicy<any> | FieldReadFunction<any>;
  isNotInterested?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type PublicationStatsKeySpecifier = (
  | 'bookmarks'
  | 'comments'
  | 'countOpenActions'
  | 'id'
  | 'mirrors'
  | 'quotes'
  | 'reactions'
  | PublicationStatsKeySpecifier
)[];
export type PublicationStatsFieldPolicy = {
  bookmarks?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  countOpenActions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  quotes?: FieldPolicy<any> | FieldReadFunction<any>;
  reactions?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'approvedModuleAllowanceAmount'
  | 'challenge'
  | 'claimableProfiles'
  | 'claimableStatus'
  | 'currencies'
  | 'doesFollow'
  | 'exploreProfiles'
  | 'explorePublications'
  | 'feed'
  | 'feedHighlights'
  | 'followRevenues'
  | 'followers'
  | 'following'
  | 'generateModuleCurrencyApprovalData'
  | 'invitedProfiles'
  | 'lensTransactionStatus'
  | 'momokaSubmitters'
  | 'momokaSummary'
  | 'momokaTransaction'
  | 'momokaTransactions'
  | 'mutualFollowers'
  | 'mutualNftCollections'
  | 'mutualPoaps'
  | 'nftCollectionOwners'
  | 'nftCollections'
  | 'nftGalleries'
  | 'nfts'
  | 'notifications'
  | 'ownedHandles'
  | 'ping'
  | 'poapEvent'
  | 'poapHolders'
  | 'poaps'
  | 'popularNftCollections'
  | 'profile'
  | 'profileActionHistory'
  | 'profileAlreadyInvited'
  | 'profileInterestsOptions'
  | 'profileManagers'
  | 'profileRecommendations'
  | 'profiles'
  | 'profilesManaged'
  | 'publication'
  | 'publicationBookmarks'
  | 'publications'
  | 'publicationsTags'
  | 'relayQueues'
  | 'revenueFromPublication'
  | 'revenueFromPublications'
  | 'searchProfiles'
  | 'searchPublications'
  | 'supportedFollowModules'
  | 'supportedOpenActionCollectModules'
  | 'supportedOpenActionModules'
  | 'supportedReferenceModules'
  | 'txIdToTxHash'
  | 'userSigNonces'
  | 'validatePublicationMetadata'
  | 'verify'
  | 'whoActedOnPublication'
  | 'whoHaveBlocked'
  | 'whoReactedPublication'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  approvedModuleAllowanceAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  challenge?: FieldPolicy<any> | FieldReadFunction<any>;
  claimableProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  claimableStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  currencies?: FieldPolicy<any> | FieldReadFunction<any>;
  doesFollow?: FieldPolicy<any> | FieldReadFunction<any>;
  exploreProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  explorePublications?: FieldPolicy<any> | FieldReadFunction<any>;
  feed?: FieldPolicy<any> | FieldReadFunction<any>;
  feedHighlights?: FieldPolicy<any> | FieldReadFunction<any>;
  followRevenues?: FieldPolicy<any> | FieldReadFunction<any>;
  followers?: FieldPolicy<any> | FieldReadFunction<any>;
  following?: FieldPolicy<any> | FieldReadFunction<any>;
  generateModuleCurrencyApprovalData?: FieldPolicy<any> | FieldReadFunction<any>;
  invitedProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  lensTransactionStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  momokaSubmitters?: FieldPolicy<any> | FieldReadFunction<any>;
  momokaSummary?: FieldPolicy<any> | FieldReadFunction<any>;
  momokaTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
  momokaTransactions?: FieldPolicy<any> | FieldReadFunction<any>;
  mutualFollowers?: FieldPolicy<any> | FieldReadFunction<any>;
  mutualNftCollections?: FieldPolicy<any> | FieldReadFunction<any>;
  mutualPoaps?: FieldPolicy<any> | FieldReadFunction<any>;
  nftCollectionOwners?: FieldPolicy<any> | FieldReadFunction<any>;
  nftCollections?: FieldPolicy<any> | FieldReadFunction<any>;
  nftGalleries?: FieldPolicy<any> | FieldReadFunction<any>;
  nfts?: FieldPolicy<any> | FieldReadFunction<any>;
  notifications?: FieldPolicy<any> | FieldReadFunction<any>;
  ownedHandles?: FieldPolicy<any> | FieldReadFunction<any>;
  ping?: FieldPolicy<any> | FieldReadFunction<any>;
  poapEvent?: FieldPolicy<any> | FieldReadFunction<any>;
  poapHolders?: FieldPolicy<any> | FieldReadFunction<any>;
  poaps?: FieldPolicy<any> | FieldReadFunction<any>;
  popularNftCollections?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  profileActionHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  profileAlreadyInvited?: FieldPolicy<any> | FieldReadFunction<any>;
  profileInterestsOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  profileManagers?: FieldPolicy<any> | FieldReadFunction<any>;
  profileRecommendations?: FieldPolicy<any> | FieldReadFunction<any>;
  profiles?: FieldPolicy<any> | FieldReadFunction<any>;
  profilesManaged?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationBookmarks?: FieldPolicy<any> | FieldReadFunction<any>;
  publications?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationsTags?: FieldPolicy<any> | FieldReadFunction<any>;
  relayQueues?: FieldPolicy<any> | FieldReadFunction<any>;
  revenueFromPublication?: FieldPolicy<any> | FieldReadFunction<any>;
  revenueFromPublications?: FieldPolicy<any> | FieldReadFunction<any>;
  searchProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  searchPublications?: FieldPolicy<any> | FieldReadFunction<any>;
  supportedFollowModules?: FieldPolicy<any> | FieldReadFunction<any>;
  supportedOpenActionCollectModules?: FieldPolicy<any> | FieldReadFunction<any>;
  supportedOpenActionModules?: FieldPolicy<any> | FieldReadFunction<any>;
  supportedReferenceModules?: FieldPolicy<any> | FieldReadFunction<any>;
  txIdToTxHash?: FieldPolicy<any> | FieldReadFunction<any>;
  userSigNonces?: FieldPolicy<any> | FieldReadFunction<any>;
  validatePublicationMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  verify?: FieldPolicy<any> | FieldReadFunction<any>;
  whoActedOnPublication?: FieldPolicy<any> | FieldReadFunction<any>;
  whoHaveBlocked?: FieldPolicy<any> | FieldReadFunction<any>;
  whoReactedPublication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QuoteKeySpecifier = (
  | 'by'
  | 'createdAt'
  | 'id'
  | 'isHidden'
  | 'metadata'
  | 'momoka'
  | 'openActionModules'
  | 'operations'
  | 'publishedOn'
  | 'quoteOn'
  | 'referenceModule'
  | 'stats'
  | 'txHash'
  | QuoteKeySpecifier
)[];
export type QuoteFieldPolicy = {
  by?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isHidden?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  momoka?: FieldPolicy<any> | FieldReadFunction<any>;
  openActionModules?: FieldPolicy<any> | FieldReadFunction<any>;
  operations?: FieldPolicy<any> | FieldReadFunction<any>;
  publishedOn?: FieldPolicy<any> | FieldReadFunction<any>;
  quoteOn?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QuoteNotificationKeySpecifier = ('id' | 'quote' | QuoteNotificationKeySpecifier)[];
export type QuoteNotificationFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  quote?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ReactedResultKeySpecifier = ('reactedAt' | 'reaction' | ReactedResultKeySpecifier)[];
export type ReactedResultFieldPolicy = {
  reactedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ReactionEventKeySpecifier = (
  | 'by'
  | 'createdAt'
  | 'reaction'
  | ReactionEventKeySpecifier
)[];
export type ReactionEventFieldPolicy = {
  by?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ReactionNotificationKeySpecifier = (
  | 'id'
  | 'publication'
  | 'reactions'
  | ReactionNotificationKeySpecifier
)[];
export type ReactionNotificationFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
  reactions?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type RefreshPublicationMetadataResultKeySpecifier = (
  | 'result'
  | RefreshPublicationMetadataResultKeySpecifier
)[];
export type RefreshPublicationMetadataResultFieldPolicy = {
  result?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RelayErrorKeySpecifier = ('reason' | RelayErrorKeySpecifier)[];
export type RelayErrorFieldPolicy = {
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RelayQueueResultKeySpecifier = (
  | 'key'
  | 'queue'
  | 'relay'
  | RelayQueueResultKeySpecifier
)[];
export type RelayQueueResultFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  queue?: FieldPolicy<any> | FieldReadFunction<any>;
  relay?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RelaySuccessKeySpecifier = ('txHash' | 'txId' | RelaySuccessKeySpecifier)[];
export type RelaySuccessFieldPolicy = {
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
  txId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ReservedClaimableKeySpecifier = (
  | 'expiry'
  | 'id'
  | 'source'
  | 'withHandle'
  | ReservedClaimableKeySpecifier
)[];
export type ReservedClaimableFieldPolicy = {
  expiry?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  source?: FieldPolicy<any> | FieldReadFunction<any>;
  withHandle?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RevenueAggregateKeySpecifier = ('total' | RevenueAggregateKeySpecifier)[];
export type RevenueAggregateFieldPolicy = {
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RevertFollowModuleSettingsKeySpecifier = (
  | 'contract'
  | RevertFollowModuleSettingsKeySpecifier
)[];
export type RevertFollowModuleSettingsFieldPolicy = {
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RootConditionKeySpecifier = ('criteria' | RootConditionKeySpecifier)[];
export type RootConditionFieldPolicy = {
  criteria?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SimpleCollectOpenActionSettingsKeySpecifier = (
  | 'amount'
  | 'collectLimit'
  | 'collectNft'
  | 'contract'
  | 'endsAt'
  | 'followerOnly'
  | 'recipient'
  | 'referralFee'
  | SimpleCollectOpenActionSettingsKeySpecifier
)[];
export type SimpleCollectOpenActionSettingsFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNft?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  endsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SpaceMetadataV3KeySpecifier = (
  | 'appId'
  | 'attachments'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'link'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'startsAt'
  | 'tags'
  | 'title'
  | SpaceMetadataV3KeySpecifier
)[];
export type SpaceMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  link?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  startsAt?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StoryMetadataV3KeySpecifier = (
  | 'appId'
  | 'asset'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'tags'
  | StoryMetadataV3KeySpecifier
)[];
export type StoryMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  asset?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SubscriptionKeySpecifier = (
  | 'newMomokaTransaction'
  | 'newNotification'
  | 'newPublicationStats'
  | SubscriptionKeySpecifier
)[];
export type SubscriptionFieldPolicy = {
  newMomokaTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
  newNotification?: FieldPolicy<any> | FieldReadFunction<any>;
  newPublicationStats?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type TextOnlyMetadataV3KeySpecifier = (
  | 'appId'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'tags'
  | TextOnlyMetadataV3KeySpecifier
)[];
export type TextOnlyMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ThreeDMetadataV3KeySpecifier = (
  | 'appId'
  | 'assets'
  | 'attachments'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'tags'
  | ThreeDMetadataV3KeySpecifier
)[];
export type ThreeDMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  assets?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ThreeDMetadataV3AssetKeySpecifier = (
  | 'format'
  | 'license'
  | 'playerURL'
  | 'uri'
  | 'zipPath'
  | ThreeDMetadataV3AssetKeySpecifier
)[];
export type ThreeDMetadataV3AssetFieldPolicy = {
  format?: FieldPolicy<any> | FieldReadFunction<any>;
  license?: FieldPolicy<any> | FieldReadFunction<any>;
  playerURL?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
  zipPath?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionMetadataV3KeySpecifier = (
  | 'appId'
  | 'attachments'
  | 'attributes'
  | 'chainId'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'tags'
  | 'txHash'
  | 'type'
  | TransactionMetadataV3KeySpecifier
)[];
export type TransactionMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  chainId?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownFollowModuleSettingsKeySpecifier = (
  | 'contract'
  | 'followModuleReturnData'
  | UnknownFollowModuleSettingsKeySpecifier
)[];
export type UnknownFollowModuleSettingsFieldPolicy = {
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  followModuleReturnData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownOpenActionModuleSettingsKeySpecifier = (
  | 'collectNft'
  | 'contract'
  | 'openActionModuleReturnData'
  | UnknownOpenActionModuleSettingsKeySpecifier
)[];
export type UnknownOpenActionModuleSettingsFieldPolicy = {
  collectNft?: FieldPolicy<any> | FieldReadFunction<any>;
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  openActionModuleReturnData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownOpenActionResultKeySpecifier = (
  | 'address'
  | 'category'
  | 'initReturnData'
  | UnknownOpenActionResultKeySpecifier
)[];
export type UnknownOpenActionResultFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  initReturnData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownReferenceModuleSettingsKeySpecifier = (
  | 'contract'
  | 'referenceModuleReturnData'
  | UnknownReferenceModuleSettingsKeySpecifier
)[];
export type UnknownReferenceModuleSettingsFieldPolicy = {
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleReturnData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownSupportedModuleKeySpecifier = (
  | 'contract'
  | 'moduleName'
  | UnknownSupportedModuleKeySpecifier
)[];
export type UnknownSupportedModuleFieldPolicy = {
  contract?: FieldPolicy<any> | FieldReadFunction<any>;
  moduleName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserSigNoncesKeySpecifier = (
  | 'lensHubOnchainSigNonce'
  | 'lensTokenHandleRegistryOnchainSigNonce'
  | UserSigNoncesKeySpecifier
)[];
export type UserSigNoncesFieldPolicy = {
  lensHubOnchainSigNonce?: FieldPolicy<any> | FieldReadFunction<any>;
  lensTokenHandleRegistryOnchainSigNonce?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type VideoKeySpecifier = ('mimeType' | 'uri' | VideoKeySpecifier)[];
export type VideoFieldPolicy = {
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type VideoMetadataV3KeySpecifier = (
  | 'appId'
  | 'asset'
  | 'attachments'
  | 'attributes'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'hideFromFeed'
  | 'id'
  | 'isShortVideo'
  | 'locale'
  | 'marketplace'
  | 'rawURI'
  | 'tags'
  | 'title'
  | VideoMetadataV3KeySpecifier
)[];
export type VideoMetadataV3FieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  asset?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  hideFromFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isShortVideo?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type WorldcoinIdentityKeySpecifier = ('isHuman' | WorldcoinIdentityKeySpecifier)[];
export type WorldcoinIdentityFieldPolicy = {
  isHuman?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  ActedNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActedNotificationKeySpecifier
      | (() => undefined | ActedNotificationKeySpecifier);
    fields?: ActedNotificationFieldPolicy;
  };
  Amount?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AmountKeySpecifier | (() => undefined | AmountKeySpecifier);
    fields?: AmountFieldPolicy;
  };
  AndCondition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AndConditionKeySpecifier | (() => undefined | AndConditionKeySpecifier);
    fields?: AndConditionFieldPolicy;
  };
  App?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AppKeySpecifier | (() => undefined | AppKeySpecifier);
    fields?: AppFieldPolicy;
  };
  ApprovedAllowanceAmountResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ApprovedAllowanceAmountResultKeySpecifier
      | (() => undefined | ApprovedAllowanceAmountResultKeySpecifier);
    fields?: ApprovedAllowanceAmountResultFieldPolicy;
  };
  ArticleMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ArticleMetadataV3KeySpecifier
      | (() => undefined | ArticleMetadataV3KeySpecifier);
    fields?: ArticleMetadataV3FieldPolicy;
  };
  Audio?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AudioKeySpecifier | (() => undefined | AudioKeySpecifier);
    fields?: AudioFieldPolicy;
  };
  AudioMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AudioMetadataV3KeySpecifier
      | (() => undefined | AudioMetadataV3KeySpecifier);
    fields?: AudioMetadataV3FieldPolicy;
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
  CanDecryptResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CanDecryptResponseKeySpecifier
      | (() => undefined | CanDecryptResponseKeySpecifier);
    fields?: CanDecryptResponseFieldPolicy;
  };
  CheckingInMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CheckingInMetadataV3KeySpecifier
      | (() => undefined | CheckingInMetadataV3KeySpecifier);
    fields?: CheckingInMetadataV3FieldPolicy;
  };
  ClaimableProfilesResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ClaimableProfilesResultKeySpecifier
      | (() => undefined | ClaimableProfilesResultKeySpecifier);
    fields?: ClaimableProfilesResultFieldPolicy;
  };
  CollectCondition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CollectConditionKeySpecifier
      | (() => undefined | CollectConditionKeySpecifier);
    fields?: CollectConditionFieldPolicy;
  };
  Comment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CommentKeySpecifier | (() => undefined | CommentKeySpecifier);
    fields?: CommentFieldPolicy;
  };
  CommentNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CommentNotificationKeySpecifier
      | (() => undefined | CommentNotificationKeySpecifier);
    fields?: CommentNotificationFieldPolicy;
  };
  CreateActOnOpenActionBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateActOnOpenActionBroadcastItemResultKeySpecifier
      | (() => undefined | CreateActOnOpenActionBroadcastItemResultKeySpecifier);
    fields?: CreateActOnOpenActionBroadcastItemResultFieldPolicy;
  };
  CreateActOnOpenActionEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateActOnOpenActionEIP712TypedDataKeySpecifier
      | (() => undefined | CreateActOnOpenActionEIP712TypedDataKeySpecifier);
    fields?: CreateActOnOpenActionEIP712TypedDataFieldPolicy;
  };
  CreateActOnOpenActionEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateActOnOpenActionEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateActOnOpenActionEIP712TypedDataTypesKeySpecifier);
    fields?: CreateActOnOpenActionEIP712TypedDataTypesFieldPolicy;
  };
  CreateActOnOpenActionEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateActOnOpenActionEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateActOnOpenActionEIP712TypedDataValueKeySpecifier);
    fields?: CreateActOnOpenActionEIP712TypedDataValueFieldPolicy;
  };
  CreateBlockProfilesBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateBlockProfilesBroadcastItemResultKeySpecifier
      | (() => undefined | CreateBlockProfilesBroadcastItemResultKeySpecifier);
    fields?: CreateBlockProfilesBroadcastItemResultFieldPolicy;
  };
  CreateBlockProfilesEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateBlockProfilesEIP712TypedDataKeySpecifier
      | (() => undefined | CreateBlockProfilesEIP712TypedDataKeySpecifier);
    fields?: CreateBlockProfilesEIP712TypedDataFieldPolicy;
  };
  CreateBlockProfilesEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateBlockProfilesEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateBlockProfilesEIP712TypedDataTypesKeySpecifier);
    fields?: CreateBlockProfilesEIP712TypedDataTypesFieldPolicy;
  };
  CreateBlockProfilesEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateBlockProfilesEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateBlockProfilesEIP712TypedDataValueKeySpecifier);
    fields?: CreateBlockProfilesEIP712TypedDataValueFieldPolicy;
  };
  CreateChangeProfileManagersBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateChangeProfileManagersBroadcastItemResultKeySpecifier
      | (() => undefined | CreateChangeProfileManagersBroadcastItemResultKeySpecifier);
    fields?: CreateChangeProfileManagersBroadcastItemResultFieldPolicy;
  };
  CreateChangeProfileManagersEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateChangeProfileManagersEIP712TypedDataKeySpecifier
      | (() => undefined | CreateChangeProfileManagersEIP712TypedDataKeySpecifier);
    fields?: CreateChangeProfileManagersEIP712TypedDataFieldPolicy;
  };
  CreateChangeProfileManagersEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateChangeProfileManagersEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateChangeProfileManagersEIP712TypedDataTypesKeySpecifier);
    fields?: CreateChangeProfileManagersEIP712TypedDataTypesFieldPolicy;
  };
  CreateChangeProfileManagersEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateChangeProfileManagersEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateChangeProfileManagersEIP712TypedDataValueKeySpecifier);
    fields?: CreateChangeProfileManagersEIP712TypedDataValueFieldPolicy;
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
  CreateHandleLinkToProfileBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateHandleLinkToProfileBroadcastItemResultKeySpecifier
      | (() => undefined | CreateHandleLinkToProfileBroadcastItemResultKeySpecifier);
    fields?: CreateHandleLinkToProfileBroadcastItemResultFieldPolicy;
  };
  CreateHandleLinkToProfileEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateHandleLinkToProfileEIP712TypedDataKeySpecifier
      | (() => undefined | CreateHandleLinkToProfileEIP712TypedDataKeySpecifier);
    fields?: CreateHandleLinkToProfileEIP712TypedDataFieldPolicy;
  };
  CreateHandleLinkToProfileEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateHandleLinkToProfileEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateHandleLinkToProfileEIP712TypedDataTypesKeySpecifier);
    fields?: CreateHandleLinkToProfileEIP712TypedDataTypesFieldPolicy;
  };
  CreateHandleLinkToProfileEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateHandleLinkToProfileEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateHandleLinkToProfileEIP712TypedDataValueKeySpecifier);
    fields?: CreateHandleLinkToProfileEIP712TypedDataValueFieldPolicy;
  };
  CreateHandleUnlinkFromProfileBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateHandleUnlinkFromProfileBroadcastItemResultKeySpecifier
      | (() => undefined | CreateHandleUnlinkFromProfileBroadcastItemResultKeySpecifier);
    fields?: CreateHandleUnlinkFromProfileBroadcastItemResultFieldPolicy;
  };
  CreateHandleUnlinkFromProfileEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateHandleUnlinkFromProfileEIP712TypedDataKeySpecifier
      | (() => undefined | CreateHandleUnlinkFromProfileEIP712TypedDataKeySpecifier);
    fields?: CreateHandleUnlinkFromProfileEIP712TypedDataFieldPolicy;
  };
  CreateHandleUnlinkFromProfileEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateHandleUnlinkFromProfileEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateHandleUnlinkFromProfileEIP712TypedDataTypesKeySpecifier);
    fields?: CreateHandleUnlinkFromProfileEIP712TypedDataTypesFieldPolicy;
  };
  CreateHandleUnlinkFromProfileEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateHandleUnlinkFromProfileEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateHandleUnlinkFromProfileEIP712TypedDataValueKeySpecifier);
    fields?: CreateHandleUnlinkFromProfileEIP712TypedDataValueFieldPolicy;
  };
  CreateLegacyCollectBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateLegacyCollectBroadcastItemResultKeySpecifier
      | (() => undefined | CreateLegacyCollectBroadcastItemResultKeySpecifier);
    fields?: CreateLegacyCollectBroadcastItemResultFieldPolicy;
  };
  CreateMomokaCommentBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaCommentBroadcastItemResultKeySpecifier
      | (() => undefined | CreateMomokaCommentBroadcastItemResultKeySpecifier);
    fields?: CreateMomokaCommentBroadcastItemResultFieldPolicy;
  };
  CreateMomokaCommentEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaCommentEIP712TypedDataKeySpecifier
      | (() => undefined | CreateMomokaCommentEIP712TypedDataKeySpecifier);
    fields?: CreateMomokaCommentEIP712TypedDataFieldPolicy;
  };
  CreateMomokaCommentEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaCommentEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateMomokaCommentEIP712TypedDataTypesKeySpecifier);
    fields?: CreateMomokaCommentEIP712TypedDataTypesFieldPolicy;
  };
  CreateMomokaCommentEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaCommentEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateMomokaCommentEIP712TypedDataValueKeySpecifier);
    fields?: CreateMomokaCommentEIP712TypedDataValueFieldPolicy;
  };
  CreateMomokaMirrorBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaMirrorBroadcastItemResultKeySpecifier
      | (() => undefined | CreateMomokaMirrorBroadcastItemResultKeySpecifier);
    fields?: CreateMomokaMirrorBroadcastItemResultFieldPolicy;
  };
  CreateMomokaMirrorEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaMirrorEIP712TypedDataKeySpecifier
      | (() => undefined | CreateMomokaMirrorEIP712TypedDataKeySpecifier);
    fields?: CreateMomokaMirrorEIP712TypedDataFieldPolicy;
  };
  CreateMomokaMirrorEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaMirrorEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateMomokaMirrorEIP712TypedDataTypesKeySpecifier);
    fields?: CreateMomokaMirrorEIP712TypedDataTypesFieldPolicy;
  };
  CreateMomokaMirrorEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaMirrorEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateMomokaMirrorEIP712TypedDataValueKeySpecifier);
    fields?: CreateMomokaMirrorEIP712TypedDataValueFieldPolicy;
  };
  CreateMomokaPostBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaPostBroadcastItemResultKeySpecifier
      | (() => undefined | CreateMomokaPostBroadcastItemResultKeySpecifier);
    fields?: CreateMomokaPostBroadcastItemResultFieldPolicy;
  };
  CreateMomokaPostEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaPostEIP712TypedDataKeySpecifier
      | (() => undefined | CreateMomokaPostEIP712TypedDataKeySpecifier);
    fields?: CreateMomokaPostEIP712TypedDataFieldPolicy;
  };
  CreateMomokaPostEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaPostEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateMomokaPostEIP712TypedDataTypesKeySpecifier);
    fields?: CreateMomokaPostEIP712TypedDataTypesFieldPolicy;
  };
  CreateMomokaPostEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaPostEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateMomokaPostEIP712TypedDataValueKeySpecifier);
    fields?: CreateMomokaPostEIP712TypedDataValueFieldPolicy;
  };
  CreateMomokaPublicationResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaPublicationResultKeySpecifier
      | (() => undefined | CreateMomokaPublicationResultKeySpecifier);
    fields?: CreateMomokaPublicationResultFieldPolicy;
  };
  CreateMomokaQuoteBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaQuoteBroadcastItemResultKeySpecifier
      | (() => undefined | CreateMomokaQuoteBroadcastItemResultKeySpecifier);
    fields?: CreateMomokaQuoteBroadcastItemResultFieldPolicy;
  };
  CreateMomokaQuoteEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaQuoteEIP712TypedDataKeySpecifier
      | (() => undefined | CreateMomokaQuoteEIP712TypedDataKeySpecifier);
    fields?: CreateMomokaQuoteEIP712TypedDataFieldPolicy;
  };
  CreateMomokaQuoteEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaQuoteEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateMomokaQuoteEIP712TypedDataTypesKeySpecifier);
    fields?: CreateMomokaQuoteEIP712TypedDataTypesFieldPolicy;
  };
  CreateMomokaQuoteEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateMomokaQuoteEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateMomokaQuoteEIP712TypedDataValueKeySpecifier);
    fields?: CreateMomokaQuoteEIP712TypedDataValueFieldPolicy;
  };
  CreateOnchainCommentBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainCommentBroadcastItemResultKeySpecifier
      | (() => undefined | CreateOnchainCommentBroadcastItemResultKeySpecifier);
    fields?: CreateOnchainCommentBroadcastItemResultFieldPolicy;
  };
  CreateOnchainCommentEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainCommentEIP712TypedDataKeySpecifier
      | (() => undefined | CreateOnchainCommentEIP712TypedDataKeySpecifier);
    fields?: CreateOnchainCommentEIP712TypedDataFieldPolicy;
  };
  CreateOnchainCommentEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainCommentEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateOnchainCommentEIP712TypedDataTypesKeySpecifier);
    fields?: CreateOnchainCommentEIP712TypedDataTypesFieldPolicy;
  };
  CreateOnchainCommentEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainCommentEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateOnchainCommentEIP712TypedDataValueKeySpecifier);
    fields?: CreateOnchainCommentEIP712TypedDataValueFieldPolicy;
  };
  CreateOnchainMirrorBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainMirrorBroadcastItemResultKeySpecifier
      | (() => undefined | CreateOnchainMirrorBroadcastItemResultKeySpecifier);
    fields?: CreateOnchainMirrorBroadcastItemResultFieldPolicy;
  };
  CreateOnchainMirrorEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainMirrorEIP712TypedDataKeySpecifier
      | (() => undefined | CreateOnchainMirrorEIP712TypedDataKeySpecifier);
    fields?: CreateOnchainMirrorEIP712TypedDataFieldPolicy;
  };
  CreateOnchainMirrorEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainMirrorEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateOnchainMirrorEIP712TypedDataTypesKeySpecifier);
    fields?: CreateOnchainMirrorEIP712TypedDataTypesFieldPolicy;
  };
  CreateOnchainMirrorEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainMirrorEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateOnchainMirrorEIP712TypedDataValueKeySpecifier);
    fields?: CreateOnchainMirrorEIP712TypedDataValueFieldPolicy;
  };
  CreateOnchainPostBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainPostBroadcastItemResultKeySpecifier
      | (() => undefined | CreateOnchainPostBroadcastItemResultKeySpecifier);
    fields?: CreateOnchainPostBroadcastItemResultFieldPolicy;
  };
  CreateOnchainPostEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainPostEIP712TypedDataKeySpecifier
      | (() => undefined | CreateOnchainPostEIP712TypedDataKeySpecifier);
    fields?: CreateOnchainPostEIP712TypedDataFieldPolicy;
  };
  CreateOnchainPostEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainPostEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateOnchainPostEIP712TypedDataTypesKeySpecifier);
    fields?: CreateOnchainPostEIP712TypedDataTypesFieldPolicy;
  };
  CreateOnchainPostEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainPostEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateOnchainPostEIP712TypedDataValueKeySpecifier);
    fields?: CreateOnchainPostEIP712TypedDataValueFieldPolicy;
  };
  CreateOnchainQuoteBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainQuoteBroadcastItemResultKeySpecifier
      | (() => undefined | CreateOnchainQuoteBroadcastItemResultKeySpecifier);
    fields?: CreateOnchainQuoteBroadcastItemResultFieldPolicy;
  };
  CreateOnchainQuoteEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainQuoteEIP712TypedDataKeySpecifier
      | (() => undefined | CreateOnchainQuoteEIP712TypedDataKeySpecifier);
    fields?: CreateOnchainQuoteEIP712TypedDataFieldPolicy;
  };
  CreateOnchainQuoteEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainQuoteEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateOnchainQuoteEIP712TypedDataTypesKeySpecifier);
    fields?: CreateOnchainQuoteEIP712TypedDataTypesFieldPolicy;
  };
  CreateOnchainQuoteEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainQuoteEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateOnchainQuoteEIP712TypedDataValueKeySpecifier);
    fields?: CreateOnchainQuoteEIP712TypedDataValueFieldPolicy;
  };
  CreateOnchainSetProfileMetadataBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainSetProfileMetadataBroadcastItemResultKeySpecifier
      | (() => undefined | CreateOnchainSetProfileMetadataBroadcastItemResultKeySpecifier);
    fields?: CreateOnchainSetProfileMetadataBroadcastItemResultFieldPolicy;
  };
  CreateOnchainSetProfileMetadataEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainSetProfileMetadataEIP712TypedDataKeySpecifier
      | (() => undefined | CreateOnchainSetProfileMetadataEIP712TypedDataKeySpecifier);
    fields?: CreateOnchainSetProfileMetadataEIP712TypedDataFieldPolicy;
  };
  CreateOnchainSetProfileMetadataEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainSetProfileMetadataEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateOnchainSetProfileMetadataEIP712TypedDataTypesKeySpecifier);
    fields?: CreateOnchainSetProfileMetadataEIP712TypedDataTypesFieldPolicy;
  };
  CreateOnchainSetProfileMetadataEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateOnchainSetProfileMetadataEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateOnchainSetProfileMetadataEIP712TypedDataValueKeySpecifier);
    fields?: CreateOnchainSetProfileMetadataEIP712TypedDataValueFieldPolicy;
  };
  CreateProfileWithHandleErrorResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateProfileWithHandleErrorResultKeySpecifier
      | (() => undefined | CreateProfileWithHandleErrorResultKeySpecifier);
    fields?: CreateProfileWithHandleErrorResultFieldPolicy;
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
  CreateUnblockProfilesBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateUnblockProfilesBroadcastItemResultKeySpecifier
      | (() => undefined | CreateUnblockProfilesBroadcastItemResultKeySpecifier);
    fields?: CreateUnblockProfilesBroadcastItemResultFieldPolicy;
  };
  CreateUnblockProfilesEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateUnblockProfilesEIP712TypedDataKeySpecifier
      | (() => undefined | CreateUnblockProfilesEIP712TypedDataKeySpecifier);
    fields?: CreateUnblockProfilesEIP712TypedDataFieldPolicy;
  };
  CreateUnblockProfilesEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateUnblockProfilesEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateUnblockProfilesEIP712TypedDataTypesKeySpecifier);
    fields?: CreateUnblockProfilesEIP712TypedDataTypesFieldPolicy;
  };
  CreateUnblockProfilesEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateUnblockProfilesEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateUnblockProfilesEIP712TypedDataValueKeySpecifier);
    fields?: CreateUnblockProfilesEIP712TypedDataValueFieldPolicy;
  };
  CreateUnfollowBroadcastItemResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateUnfollowBroadcastItemResultKeySpecifier
      | (() => undefined | CreateUnfollowBroadcastItemResultKeySpecifier);
    fields?: CreateUnfollowBroadcastItemResultFieldPolicy;
  };
  CreateUnfollowEIP712TypedData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateUnfollowEIP712TypedDataKeySpecifier
      | (() => undefined | CreateUnfollowEIP712TypedDataKeySpecifier);
    fields?: CreateUnfollowEIP712TypedDataFieldPolicy;
  };
  CreateUnfollowEIP712TypedDataTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateUnfollowEIP712TypedDataTypesKeySpecifier
      | (() => undefined | CreateUnfollowEIP712TypedDataTypesKeySpecifier);
    fields?: CreateUnfollowEIP712TypedDataTypesFieldPolicy;
  };
  CreateUnfollowEIP712TypedDataValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateUnfollowEIP712TypedDataValueKeySpecifier
      | (() => undefined | CreateUnfollowEIP712TypedDataValueKeySpecifier);
    fields?: CreateUnfollowEIP712TypedDataValueFieldPolicy;
  };
  DegreesOfSeparationReferenceModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DegreesOfSeparationReferenceModuleSettingsKeySpecifier
      | (() => undefined | DegreesOfSeparationReferenceModuleSettingsKeySpecifier);
    fields?: DegreesOfSeparationReferenceModuleSettingsFieldPolicy;
  };
  DoesFollowResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DoesFollowResultKeySpecifier
      | (() => undefined | DoesFollowResultKeySpecifier);
    fields?: DoesFollowResultFieldPolicy;
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
  EmbedMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EmbedMetadataV3KeySpecifier
      | (() => undefined | EmbedMetadataV3KeySpecifier);
    fields?: EmbedMetadataV3FieldPolicy;
  };
  EncryptableAudio?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EncryptableAudioKeySpecifier
      | (() => undefined | EncryptableAudioKeySpecifier);
    fields?: EncryptableAudioFieldPolicy;
  };
  EncryptableAudioSet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EncryptableAudioSetKeySpecifier
      | (() => undefined | EncryptableAudioSetKeySpecifier);
    fields?: EncryptableAudioSetFieldPolicy;
  };
  EncryptableImage?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EncryptableImageKeySpecifier
      | (() => undefined | EncryptableImageKeySpecifier);
    fields?: EncryptableImageFieldPolicy;
  };
  EncryptableImageSet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EncryptableImageSetKeySpecifier
      | (() => undefined | EncryptableImageSetKeySpecifier);
    fields?: EncryptableImageSetFieldPolicy;
  };
  EncryptableVideo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EncryptableVideoKeySpecifier
      | (() => undefined | EncryptableVideoKeySpecifier);
    fields?: EncryptableVideoFieldPolicy;
  };
  EncryptableVideoSet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EncryptableVideoSetKeySpecifier
      | (() => undefined | EncryptableVideoSetKeySpecifier);
    fields?: EncryptableVideoSetFieldPolicy;
  };
  EnsOnchainIdentity?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EnsOnchainIdentityKeySpecifier
      | (() => undefined | EnsOnchainIdentityKeySpecifier);
    fields?: EnsOnchainIdentityFieldPolicy;
  };
  EoaOwnershipCondition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EoaOwnershipConditionKeySpecifier
      | (() => undefined | EoaOwnershipConditionKeySpecifier);
    fields?: EoaOwnershipConditionFieldPolicy;
  };
  Erc20?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | Erc20KeySpecifier | (() => undefined | Erc20KeySpecifier);
    fields?: Erc20FieldPolicy;
  };
  Erc20OwnershipCondition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | Erc20OwnershipConditionKeySpecifier
      | (() => undefined | Erc20OwnershipConditionKeySpecifier);
    fields?: Erc20OwnershipConditionFieldPolicy;
  };
  EventMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EventMetadataV3KeySpecifier
      | (() => undefined | EventMetadataV3KeySpecifier);
    fields?: EventMetadataV3FieldPolicy;
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
  Fiat?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | FiatKeySpecifier | (() => undefined | FiatKeySpecifier);
    fields?: FiatFieldPolicy;
  };
  FiatAmount?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | FiatAmountKeySpecifier | (() => undefined | FiatAmountKeySpecifier);
    fields?: FiatAmountFieldPolicy;
  };
  FollowCondition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FollowConditionKeySpecifier
      | (() => undefined | FollowConditionKeySpecifier);
    fields?: FollowConditionFieldPolicy;
  };
  FollowNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FollowNotificationKeySpecifier
      | (() => undefined | FollowNotificationKeySpecifier);
    fields?: FollowNotificationFieldPolicy;
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
  GenerateModuleCurrencyApprovalResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | GenerateModuleCurrencyApprovalResultKeySpecifier
      | (() => undefined | GenerateModuleCurrencyApprovalResultKeySpecifier);
    fields?: GenerateModuleCurrencyApprovalResultFieldPolicy;
  };
  GeoLocation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GeoLocationKeySpecifier | (() => undefined | GeoLocationKeySpecifier);
    fields?: GeoLocationFieldPolicy;
  };
  HandleResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | HandleResultKeySpecifier | (() => undefined | HandleResultKeySpecifier);
    fields?: HandleResultFieldPolicy;
  };
  Image?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ImageKeySpecifier | (() => undefined | ImageKeySpecifier);
    fields?: ImageFieldPolicy;
  };
  ImageMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ImageMetadataV3KeySpecifier
      | (() => undefined | ImageMetadataV3KeySpecifier);
    fields?: ImageMetadataV3FieldPolicy;
  };
  ImageSet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ImageSetKeySpecifier | (() => undefined | ImageSetKeySpecifier);
    fields?: ImageSetFieldPolicy;
  };
  InvitedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | InvitedResultKeySpecifier | (() => undefined | InvitedResultKeySpecifier);
    fields?: InvitedResultFieldPolicy;
  };
  KnownCollectOpenActionResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | KnownCollectOpenActionResultKeySpecifier
      | (() => undefined | KnownCollectOpenActionResultKeySpecifier);
    fields?: KnownCollectOpenActionResultFieldPolicy;
  };
  KnownSupportedModule?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | KnownSupportedModuleKeySpecifier
      | (() => undefined | KnownSupportedModuleKeySpecifier);
    fields?: KnownSupportedModuleFieldPolicy;
  };
  LegacyAaveFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyAaveFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | LegacyAaveFeeCollectModuleSettingsKeySpecifier);
    fields?: LegacyAaveFeeCollectModuleSettingsFieldPolicy;
  };
  LegacyERC4626FeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyERC4626FeeCollectModuleSettingsKeySpecifier
      | (() => undefined | LegacyERC4626FeeCollectModuleSettingsKeySpecifier);
    fields?: LegacyERC4626FeeCollectModuleSettingsFieldPolicy;
  };
  LegacyFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | LegacyFeeCollectModuleSettingsKeySpecifier);
    fields?: LegacyFeeCollectModuleSettingsFieldPolicy;
  };
  LegacyFreeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyFreeCollectModuleSettingsKeySpecifier
      | (() => undefined | LegacyFreeCollectModuleSettingsKeySpecifier);
    fields?: LegacyFreeCollectModuleSettingsFieldPolicy;
  };
  LegacyLimitedFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyLimitedFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | LegacyLimitedFeeCollectModuleSettingsKeySpecifier);
    fields?: LegacyLimitedFeeCollectModuleSettingsFieldPolicy;
  };
  LegacyLimitedTimedFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyLimitedTimedFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | LegacyLimitedTimedFeeCollectModuleSettingsKeySpecifier);
    fields?: LegacyLimitedTimedFeeCollectModuleSettingsFieldPolicy;
  };
  LegacyMultirecipientFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyMultirecipientFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | LegacyMultirecipientFeeCollectModuleSettingsKeySpecifier);
    fields?: LegacyMultirecipientFeeCollectModuleSettingsFieldPolicy;
  };
  LegacyRevertCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyRevertCollectModuleSettingsKeySpecifier
      | (() => undefined | LegacyRevertCollectModuleSettingsKeySpecifier);
    fields?: LegacyRevertCollectModuleSettingsFieldPolicy;
  };
  LegacySimpleCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacySimpleCollectModuleSettingsKeySpecifier
      | (() => undefined | LegacySimpleCollectModuleSettingsKeySpecifier);
    fields?: LegacySimpleCollectModuleSettingsFieldPolicy;
  };
  LegacyTimedFeeCollectModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyTimedFeeCollectModuleSettingsKeySpecifier
      | (() => undefined | LegacyTimedFeeCollectModuleSettingsKeySpecifier);
    fields?: LegacyTimedFeeCollectModuleSettingsFieldPolicy;
  };
  LensProfileManagerRelayError?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LensProfileManagerRelayErrorKeySpecifier
      | (() => undefined | LensProfileManagerRelayErrorKeySpecifier);
    fields?: LensProfileManagerRelayErrorFieldPolicy;
  };
  LensTransactionResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LensTransactionResultKeySpecifier
      | (() => undefined | LensTransactionResultKeySpecifier);
    fields?: LensTransactionResultFieldPolicy;
  };
  LinkMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | LinkMetadataV3KeySpecifier | (() => undefined | LinkMetadataV3KeySpecifier);
    fields?: LinkMetadataV3FieldPolicy;
  };
  LiveStreamMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LiveStreamMetadataV3KeySpecifier
      | (() => undefined | LiveStreamMetadataV3KeySpecifier);
    fields?: LiveStreamMetadataV3FieldPolicy;
  };
  MarketplaceMetadata?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceMetadataKeySpecifier
      | (() => undefined | MarketplaceMetadataKeySpecifier);
    fields?: MarketplaceMetadataFieldPolicy;
  };
  MentionNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MentionNotificationKeySpecifier
      | (() => undefined | MentionNotificationKeySpecifier);
    fields?: MentionNotificationFieldPolicy;
  };
  MetadataBooleanAttribute?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MetadataBooleanAttributeKeySpecifier
      | (() => undefined | MetadataBooleanAttributeKeySpecifier);
    fields?: MetadataBooleanAttributeFieldPolicy;
  };
  MetadataDateAttribute?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MetadataDateAttributeKeySpecifier
      | (() => undefined | MetadataDateAttributeKeySpecifier);
    fields?: MetadataDateAttributeFieldPolicy;
  };
  MetadataJSONAttribute?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MetadataJSONAttributeKeySpecifier
      | (() => undefined | MetadataJSONAttributeKeySpecifier);
    fields?: MetadataJSONAttributeFieldPolicy;
  };
  MetadataNumberAttribute?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MetadataNumberAttributeKeySpecifier
      | (() => undefined | MetadataNumberAttributeKeySpecifier);
    fields?: MetadataNumberAttributeFieldPolicy;
  };
  MetadataStringAttribute?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MetadataStringAttributeKeySpecifier
      | (() => undefined | MetadataStringAttributeKeySpecifier);
    fields?: MetadataStringAttributeFieldPolicy;
  };
  MintMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MintMetadataV3KeySpecifier | (() => undefined | MintMetadataV3KeySpecifier);
    fields?: MintMetadataV3FieldPolicy;
  };
  Mirror?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MirrorKeySpecifier | (() => undefined | MirrorKeySpecifier);
    fields?: MirrorFieldPolicy;
  };
  MirrorNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MirrorNotificationKeySpecifier
      | (() => undefined | MirrorNotificationKeySpecifier);
    fields?: MirrorNotificationFieldPolicy;
  };
  ModuleInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ModuleInfoKeySpecifier | (() => undefined | ModuleInfoKeySpecifier);
    fields?: ModuleInfoFieldPolicy;
  };
  MomokaCommentTransaction?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MomokaCommentTransactionKeySpecifier
      | (() => undefined | MomokaCommentTransactionKeySpecifier);
    fields?: MomokaCommentTransactionFieldPolicy;
  };
  MomokaInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MomokaInfoKeySpecifier | (() => undefined | MomokaInfoKeySpecifier);
    fields?: MomokaInfoFieldPolicy;
  };
  MomokaMirrorTransaction?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MomokaMirrorTransactionKeySpecifier
      | (() => undefined | MomokaMirrorTransactionKeySpecifier);
    fields?: MomokaMirrorTransactionFieldPolicy;
  };
  MomokaPostTransaction?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MomokaPostTransactionKeySpecifier
      | (() => undefined | MomokaPostTransactionKeySpecifier);
    fields?: MomokaPostTransactionFieldPolicy;
  };
  MomokaQuoteTransaction?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MomokaQuoteTransactionKeySpecifier
      | (() => undefined | MomokaQuoteTransactionKeySpecifier);
    fields?: MomokaQuoteTransactionFieldPolicy;
  };
  MomokaSubmitterResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MomokaSubmitterResultKeySpecifier
      | (() => undefined | MomokaSubmitterResultKeySpecifier);
    fields?: MomokaSubmitterResultFieldPolicy;
  };
  MomokaSubmittersResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MomokaSubmittersResultKeySpecifier
      | (() => undefined | MomokaSubmittersResultKeySpecifier);
    fields?: MomokaSubmittersResultFieldPolicy;
  };
  MomokaSummaryResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MomokaSummaryResultKeySpecifier
      | (() => undefined | MomokaSummaryResultKeySpecifier);
    fields?: MomokaSummaryResultFieldPolicy;
  };
  MomokaTransactionsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MomokaTransactionsResultKeySpecifier
      | (() => undefined | MomokaTransactionsResultKeySpecifier);
    fields?: MomokaTransactionsResultFieldPolicy;
  };
  MomokaVerificationStatusFailure?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MomokaVerificationStatusFailureKeySpecifier
      | (() => undefined | MomokaVerificationStatusFailureKeySpecifier);
    fields?: MomokaVerificationStatusFailureFieldPolicy;
  };
  MomokaVerificationStatusSuccess?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MomokaVerificationStatusSuccessKeySpecifier
      | (() => undefined | MomokaVerificationStatusSuccessKeySpecifier);
    fields?: MomokaVerificationStatusSuccessFieldPolicy;
  };
  MultirecipientFeeCollectOpenActionSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MultirecipientFeeCollectOpenActionSettingsKeySpecifier
      | (() => undefined | MultirecipientFeeCollectOpenActionSettingsKeySpecifier);
    fields?: MultirecipientFeeCollectOpenActionSettingsFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  NetworkAddress?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NetworkAddressKeySpecifier | (() => undefined | NetworkAddressKeySpecifier);
    fields?: NetworkAddressFieldPolicy;
  };
  Nft?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NftKeySpecifier | (() => undefined | NftKeySpecifier);
    fields?: NftFieldPolicy;
  };
  NftCollection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NftCollectionKeySpecifier | (() => undefined | NftCollectionKeySpecifier);
    fields?: NftCollectionFieldPolicy;
  };
  NftCollectionWithOwners?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NftCollectionWithOwnersKeySpecifier
      | (() => undefined | NftCollectionWithOwnersKeySpecifier);
    fields?: NftCollectionWithOwnersFieldPolicy;
  };
  NftGallery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NftGalleryKeySpecifier | (() => undefined | NftGalleryKeySpecifier);
    fields?: NftGalleryFieldPolicy;
  };
  NftImage?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NftImageKeySpecifier | (() => undefined | NftImageKeySpecifier);
    fields?: NftImageFieldPolicy;
  };
  NftMetadata?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NftMetadataKeySpecifier | (() => undefined | NftMetadataKeySpecifier);
    fields?: NftMetadataFieldPolicy;
  };
  NftOwnershipChallengeResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NftOwnershipChallengeResultKeySpecifier
      | (() => undefined | NftOwnershipChallengeResultKeySpecifier);
    fields?: NftOwnershipChallengeResultFieldPolicy;
  };
  NftOwnershipCondition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | NftOwnershipConditionKeySpecifier
      | (() => undefined | NftOwnershipConditionKeySpecifier);
    fields?: NftOwnershipConditionFieldPolicy;
  };
  OpenActionProfileActed?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpenActionProfileActedKeySpecifier
      | (() => undefined | OpenActionProfileActedKeySpecifier);
    fields?: OpenActionProfileActedFieldPolicy;
  };
  OptimisticStatusResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OptimisticStatusResultKeySpecifier
      | (() => undefined | OptimisticStatusResultKeySpecifier);
    fields?: OptimisticStatusResultFieldPolicy;
  };
  OrCondition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | OrConditionKeySpecifier | (() => undefined | OrConditionKeySpecifier);
    fields?: OrConditionFieldPolicy;
  };
  Owner?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | OwnerKeySpecifier | (() => undefined | OwnerKeySpecifier);
    fields?: OwnerFieldPolicy;
  };
  PaginatedCurrenciesResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedCurrenciesResultKeySpecifier
      | (() => undefined | PaginatedCurrenciesResultKeySpecifier);
    fields?: PaginatedCurrenciesResultFieldPolicy;
  };
  PaginatedExplorePublicationResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedExplorePublicationResultKeySpecifier
      | (() => undefined | PaginatedExplorePublicationResultKeySpecifier);
    fields?: PaginatedExplorePublicationResultFieldPolicy;
  };
  PaginatedFeedHighlightsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedFeedHighlightsResultKeySpecifier
      | (() => undefined | PaginatedFeedHighlightsResultKeySpecifier);
    fields?: PaginatedFeedHighlightsResultFieldPolicy;
  };
  PaginatedFeedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedFeedResultKeySpecifier
      | (() => undefined | PaginatedFeedResultKeySpecifier);
    fields?: PaginatedFeedResultFieldPolicy;
  };
  PaginatedHandlesResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedHandlesResultKeySpecifier
      | (() => undefined | PaginatedHandlesResultKeySpecifier);
    fields?: PaginatedHandlesResultFieldPolicy;
  };
  PaginatedNftCollectionsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedNftCollectionsResultKeySpecifier
      | (() => undefined | PaginatedNftCollectionsResultKeySpecifier);
    fields?: PaginatedNftCollectionsResultFieldPolicy;
  };
  PaginatedNftGalleriesResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedNftGalleriesResultKeySpecifier
      | (() => undefined | PaginatedNftGalleriesResultKeySpecifier);
    fields?: PaginatedNftGalleriesResultFieldPolicy;
  };
  PaginatedNftsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedNftsResultKeySpecifier
      | (() => undefined | PaginatedNftsResultKeySpecifier);
    fields?: PaginatedNftsResultFieldPolicy;
  };
  PaginatedNotificationResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedNotificationResultKeySpecifier
      | (() => undefined | PaginatedNotificationResultKeySpecifier);
    fields?: PaginatedNotificationResultFieldPolicy;
  };
  PaginatedPoapEventResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedPoapEventResultKeySpecifier
      | (() => undefined | PaginatedPoapEventResultKeySpecifier);
    fields?: PaginatedPoapEventResultFieldPolicy;
  };
  PaginatedPoapTokenResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedPoapTokenResultKeySpecifier
      | (() => undefined | PaginatedPoapTokenResultKeySpecifier);
    fields?: PaginatedPoapTokenResultFieldPolicy;
  };
  PaginatedPopularNftCollectionsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedPopularNftCollectionsResultKeySpecifier
      | (() => undefined | PaginatedPopularNftCollectionsResultKeySpecifier);
    fields?: PaginatedPopularNftCollectionsResultFieldPolicy;
  };
  PaginatedProfileActionHistoryResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedProfileActionHistoryResultKeySpecifier
      | (() => undefined | PaginatedProfileActionHistoryResultKeySpecifier);
    fields?: PaginatedProfileActionHistoryResultFieldPolicy;
  };
  PaginatedProfileManagersResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedProfileManagersResultKeySpecifier
      | (() => undefined | PaginatedProfileManagersResultKeySpecifier);
    fields?: PaginatedProfileManagersResultFieldPolicy;
  };
  PaginatedProfileResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedProfileResultKeySpecifier
      | (() => undefined | PaginatedProfileResultKeySpecifier);
    fields?: PaginatedProfileResultFieldPolicy;
  };
  PaginatedPublicationPrimaryResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedPublicationPrimaryResultKeySpecifier
      | (() => undefined | PaginatedPublicationPrimaryResultKeySpecifier);
    fields?: PaginatedPublicationPrimaryResultFieldPolicy;
  };
  PaginatedPublicationsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedPublicationsResultKeySpecifier
      | (() => undefined | PaginatedPublicationsResultKeySpecifier);
    fields?: PaginatedPublicationsResultFieldPolicy;
  };
  PaginatedPublicationsTagsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedPublicationsTagsResultKeySpecifier
      | (() => undefined | PaginatedPublicationsTagsResultKeySpecifier);
    fields?: PaginatedPublicationsTagsResultFieldPolicy;
  };
  PaginatedResultInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedResultInfoKeySpecifier
      | (() => undefined | PaginatedResultInfoKeySpecifier);
    fields?: PaginatedResultInfoFieldPolicy;
  };
  PaginatedRevenueFromPublicationsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedRevenueFromPublicationsResultKeySpecifier
      | (() => undefined | PaginatedRevenueFromPublicationsResultKeySpecifier);
    fields?: PaginatedRevenueFromPublicationsResultFieldPolicy;
  };
  PaginatedSupportedModules?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedSupportedModulesKeySpecifier
      | (() => undefined | PaginatedSupportedModulesKeySpecifier);
    fields?: PaginatedSupportedModulesFieldPolicy;
  };
  PaginatedWhoReactedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PaginatedWhoReactedResultKeySpecifier
      | (() => undefined | PaginatedWhoReactedResultKeySpecifier);
    fields?: PaginatedWhoReactedResultFieldPolicy;
  };
  PhysicalAddress?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PhysicalAddressKeySpecifier
      | (() => undefined | PhysicalAddressKeySpecifier);
    fields?: PhysicalAddressFieldPolicy;
  };
  PoapEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PoapEventKeySpecifier | (() => undefined | PoapEventKeySpecifier);
    fields?: PoapEventFieldPolicy;
  };
  PoapToken?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PoapTokenKeySpecifier | (() => undefined | PoapTokenKeySpecifier);
    fields?: PoapTokenFieldPolicy;
  };
  Post?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier);
    fields?: PostFieldPolicy;
  };
  Profile?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ProfileKeySpecifier | (() => undefined | ProfileKeySpecifier);
    fields?: ProfileFieldPolicy;
  };
  ProfileActionHistory?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileActionHistoryKeySpecifier
      | (() => undefined | ProfileActionHistoryKeySpecifier);
    fields?: ProfileActionHistoryFieldPolicy;
  };
  ProfileGuardianResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileGuardianResultKeySpecifier
      | (() => undefined | ProfileGuardianResultKeySpecifier);
    fields?: ProfileGuardianResultFieldPolicy;
  };
  ProfileMetadata?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileMetadataKeySpecifier
      | (() => undefined | ProfileMetadataKeySpecifier);
    fields?: ProfileMetadataFieldPolicy;
  };
  ProfileMirrorResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileMirrorResultKeySpecifier
      | (() => undefined | ProfileMirrorResultKeySpecifier);
    fields?: ProfileMirrorResultFieldPolicy;
  };
  ProfileOnchainIdentity?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileOnchainIdentityKeySpecifier
      | (() => undefined | ProfileOnchainIdentityKeySpecifier);
    fields?: ProfileOnchainIdentityFieldPolicy;
  };
  ProfileOperations?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileOperationsKeySpecifier
      | (() => undefined | ProfileOperationsKeySpecifier);
    fields?: ProfileOperationsFieldPolicy;
  };
  ProfileOwnershipCondition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileOwnershipConditionKeySpecifier
      | (() => undefined | ProfileOwnershipConditionKeySpecifier);
    fields?: ProfileOwnershipConditionFieldPolicy;
  };
  ProfileReactedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileReactedResultKeySpecifier
      | (() => undefined | ProfileReactedResultKeySpecifier);
    fields?: ProfileReactedResultFieldPolicy;
  };
  ProfileReactionResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileReactionResultKeySpecifier
      | (() => undefined | ProfileReactionResultKeySpecifier);
    fields?: ProfileReactionResultFieldPolicy;
  };
  ProfileStats?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ProfileStatsKeySpecifier | (() => undefined | ProfileStatsKeySpecifier);
    fields?: ProfileStatsFieldPolicy;
  };
  ProfileWhoReactedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfileWhoReactedResultKeySpecifier
      | (() => undefined | ProfileWhoReactedResultKeySpecifier);
    fields?: ProfileWhoReactedResultFieldPolicy;
  };
  ProfilesManagedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProfilesManagedResultKeySpecifier
      | (() => undefined | ProfilesManagedResultKeySpecifier);
    fields?: ProfilesManagedResultFieldPolicy;
  };
  PublicationMarketplaceMetadataAttribute?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationMarketplaceMetadataAttributeKeySpecifier
      | (() => undefined | PublicationMarketplaceMetadataAttributeKeySpecifier);
    fields?: PublicationMarketplaceMetadataAttributeFieldPolicy;
  };
  PublicationMetadataLitEncryption?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationMetadataLitEncryptionKeySpecifier
      | (() => undefined | PublicationMetadataLitEncryptionKeySpecifier);
    fields?: PublicationMetadataLitEncryptionFieldPolicy;
  };
  PublicationMetadataMediaAudio?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationMetadataMediaAudioKeySpecifier
      | (() => undefined | PublicationMetadataMediaAudioKeySpecifier);
    fields?: PublicationMetadataMediaAudioFieldPolicy;
  };
  PublicationMetadataMediaImage?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationMetadataMediaImageKeySpecifier
      | (() => undefined | PublicationMetadataMediaImageKeySpecifier);
    fields?: PublicationMetadataMediaImageFieldPolicy;
  };
  PublicationMetadataMediaVideo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationMetadataMediaVideoKeySpecifier
      | (() => undefined | PublicationMetadataMediaVideoKeySpecifier);
    fields?: PublicationMetadataMediaVideoFieldPolicy;
  };
  PublicationOperations?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationOperationsKeySpecifier
      | (() => undefined | PublicationOperationsKeySpecifier);
    fields?: PublicationOperationsFieldPolicy;
  };
  PublicationRevenue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationRevenueKeySpecifier
      | (() => undefined | PublicationRevenueKeySpecifier);
    fields?: PublicationRevenueFieldPolicy;
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
  Quote?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QuoteKeySpecifier | (() => undefined | QuoteKeySpecifier);
    fields?: QuoteFieldPolicy;
  };
  QuoteNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | QuoteNotificationKeySpecifier
      | (() => undefined | QuoteNotificationKeySpecifier);
    fields?: QuoteNotificationFieldPolicy;
  };
  ReactedResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ReactedResultKeySpecifier | (() => undefined | ReactedResultKeySpecifier);
    fields?: ReactedResultFieldPolicy;
  };
  ReactionEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ReactionEventKeySpecifier | (() => undefined | ReactionEventKeySpecifier);
    fields?: ReactionEventFieldPolicy;
  };
  ReactionNotification?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ReactionNotificationKeySpecifier
      | (() => undefined | ReactionNotificationKeySpecifier);
    fields?: ReactionNotificationFieldPolicy;
  };
  RecipientDataOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RecipientDataOutputKeySpecifier
      | (() => undefined | RecipientDataOutputKeySpecifier);
    fields?: RecipientDataOutputFieldPolicy;
  };
  RefreshPublicationMetadataResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RefreshPublicationMetadataResultKeySpecifier
      | (() => undefined | RefreshPublicationMetadataResultKeySpecifier);
    fields?: RefreshPublicationMetadataResultFieldPolicy;
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
  RelaySuccess?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | RelaySuccessKeySpecifier | (() => undefined | RelaySuccessKeySpecifier);
    fields?: RelaySuccessFieldPolicy;
  };
  ReservedClaimable?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ReservedClaimableKeySpecifier
      | (() => undefined | ReservedClaimableKeySpecifier);
    fields?: ReservedClaimableFieldPolicy;
  };
  RevenueAggregate?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RevenueAggregateKeySpecifier
      | (() => undefined | RevenueAggregateKeySpecifier);
    fields?: RevenueAggregateFieldPolicy;
  };
  RevertFollowModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RevertFollowModuleSettingsKeySpecifier
      | (() => undefined | RevertFollowModuleSettingsKeySpecifier);
    fields?: RevertFollowModuleSettingsFieldPolicy;
  };
  RootCondition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | RootConditionKeySpecifier | (() => undefined | RootConditionKeySpecifier);
    fields?: RootConditionFieldPolicy;
  };
  SimpleCollectOpenActionSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SimpleCollectOpenActionSettingsKeySpecifier
      | (() => undefined | SimpleCollectOpenActionSettingsKeySpecifier);
    fields?: SimpleCollectOpenActionSettingsFieldPolicy;
  };
  SpaceMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SpaceMetadataV3KeySpecifier
      | (() => undefined | SpaceMetadataV3KeySpecifier);
    fields?: SpaceMetadataV3FieldPolicy;
  };
  StoryMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | StoryMetadataV3KeySpecifier
      | (() => undefined | StoryMetadataV3KeySpecifier);
    fields?: StoryMetadataV3FieldPolicy;
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
  TextOnlyMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TextOnlyMetadataV3KeySpecifier
      | (() => undefined | TextOnlyMetadataV3KeySpecifier);
    fields?: TextOnlyMetadataV3FieldPolicy;
  };
  ThreeDMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ThreeDMetadataV3KeySpecifier
      | (() => undefined | ThreeDMetadataV3KeySpecifier);
    fields?: ThreeDMetadataV3FieldPolicy;
  };
  ThreeDMetadataV3Asset?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ThreeDMetadataV3AssetKeySpecifier
      | (() => undefined | ThreeDMetadataV3AssetKeySpecifier);
    fields?: ThreeDMetadataV3AssetFieldPolicy;
  };
  TransactionMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TransactionMetadataV3KeySpecifier
      | (() => undefined | TransactionMetadataV3KeySpecifier);
    fields?: TransactionMetadataV3FieldPolicy;
  };
  UnknownFollowModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnknownFollowModuleSettingsKeySpecifier
      | (() => undefined | UnknownFollowModuleSettingsKeySpecifier);
    fields?: UnknownFollowModuleSettingsFieldPolicy;
  };
  UnknownOpenActionModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnknownOpenActionModuleSettingsKeySpecifier
      | (() => undefined | UnknownOpenActionModuleSettingsKeySpecifier);
    fields?: UnknownOpenActionModuleSettingsFieldPolicy;
  };
  UnknownOpenActionResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnknownOpenActionResultKeySpecifier
      | (() => undefined | UnknownOpenActionResultKeySpecifier);
    fields?: UnknownOpenActionResultFieldPolicy;
  };
  UnknownReferenceModuleSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnknownReferenceModuleSettingsKeySpecifier
      | (() => undefined | UnknownReferenceModuleSettingsKeySpecifier);
    fields?: UnknownReferenceModuleSettingsFieldPolicy;
  };
  UnknownSupportedModule?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnknownSupportedModuleKeySpecifier
      | (() => undefined | UnknownSupportedModuleKeySpecifier);
    fields?: UnknownSupportedModuleFieldPolicy;
  };
  UserSigNonces?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserSigNoncesKeySpecifier | (() => undefined | UserSigNoncesKeySpecifier);
    fields?: UserSigNoncesFieldPolicy;
  };
  Video?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | VideoKeySpecifier | (() => undefined | VideoKeySpecifier);
    fields?: VideoFieldPolicy;
  };
  VideoMetadataV3?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | VideoMetadataV3KeySpecifier
      | (() => undefined | VideoMetadataV3KeySpecifier);
    fields?: VideoMetadataV3FieldPolicy;
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
    AnyPublication: ['Comment', 'Mirror', 'Post', 'Quote'],
    Asset: ['Erc20'],
    BroadcastMomokaResult: ['CreateMomokaPublicationResult', 'RelayError'],
    CreateProfileWithHandleResult: ['CreateProfileWithHandleErrorResult', 'RelaySuccess'],
    ExplorePublication: ['Post', 'Quote'],
    FeedHighlight: ['Post', 'Quote'],
    FollowModule: [
      'FeeFollowModuleSettings',
      'RevertFollowModuleSettings',
      'UnknownFollowModuleSettings',
    ],
    LensProfileManagerRelayResult: ['LensProfileManagerRelayError', 'RelaySuccess'],
    MetadataAttribute: [
      'MetadataBooleanAttribute',
      'MetadataDateAttribute',
      'MetadataJSONAttribute',
      'MetadataNumberAttribute',
      'MetadataStringAttribute',
    ],
    MirrorablePublication: ['Comment', 'Post', 'Quote'],
    MomokaTransaction: [
      'MomokaCommentTransaction',
      'MomokaMirrorTransaction',
      'MomokaPostTransaction',
      'MomokaQuoteTransaction',
    ],
    MomokaVerificationStatus: [
      'MomokaVerificationStatusFailure',
      'MomokaVerificationStatusSuccess',
    ],
    Notification: [
      'ActedNotification',
      'CommentNotification',
      'FollowNotification',
      'MentionNotification',
      'MirrorNotification',
      'QuoteNotification',
      'ReactionNotification',
    ],
    OpenActionModule: [
      'LegacyAaveFeeCollectModuleSettings',
      'LegacyERC4626FeeCollectModuleSettings',
      'LegacyFeeCollectModuleSettings',
      'LegacyFreeCollectModuleSettings',
      'LegacyLimitedFeeCollectModuleSettings',
      'LegacyLimitedTimedFeeCollectModuleSettings',
      'LegacyMultirecipientFeeCollectModuleSettings',
      'LegacyRevertCollectModuleSettings',
      'LegacySimpleCollectModuleSettings',
      'LegacyTimedFeeCollectModuleSettings',
      'MultirecipientFeeCollectOpenActionSettings',
      'SimpleCollectOpenActionSettings',
      'UnknownOpenActionModuleSettings',
    ],
    OpenActionResult: ['KnownCollectOpenActionResult', 'UnknownOpenActionResult'],
    PrimaryPublication: ['Comment', 'Post', 'Quote'],
    ProfilePicture: ['ImageSet', 'NftImage'],
    PublicationMetadata: [
      'ArticleMetadataV3',
      'AudioMetadataV3',
      'CheckingInMetadataV3',
      'EmbedMetadataV3',
      'EventMetadataV3',
      'ImageMetadataV3',
      'LinkMetadataV3',
      'LiveStreamMetadataV3',
      'MintMetadataV3',
      'SpaceMetadataV3',
      'StoryMetadataV3',
      'TextOnlyMetadataV3',
      'ThreeDMetadataV3',
      'TransactionMetadataV3',
      'VideoMetadataV3',
    ],
    PublicationMetadataEncryptionStrategy: ['PublicationMetadataLitEncryption'],
    PublicationMetadataMedia: [
      'PublicationMetadataMediaAudio',
      'PublicationMetadataMediaImage',
      'PublicationMetadataMediaVideo',
    ],
    ReferenceModule: [
      'DegreesOfSeparationReferenceModuleSettings',
      'FollowOnlyReferenceModuleSettings',
      'UnknownReferenceModuleSettings',
    ],
    RelayMomokaResult: ['CreateMomokaPublicationResult', 'LensProfileManagerRelayError'],
    RelayResult: ['RelayError', 'RelaySuccess'],
    SecondTierCondition: [
      'AndCondition',
      'CollectCondition',
      'EoaOwnershipCondition',
      'Erc20OwnershipCondition',
      'FollowCondition',
      'NftOwnershipCondition',
      'OrCondition',
      'ProfileOwnershipCondition',
    ],
    SupportedModule: ['KnownSupportedModule', 'UnknownSupportedModule'],
    ThirdTierCondition: [
      'CollectCondition',
      'EoaOwnershipCondition',
      'Erc20OwnershipCondition',
      'FollowCondition',
      'NftOwnershipCondition',
      'ProfileOwnershipCondition',
    ],
  },
};
export default result;
