/** Code generated. DO NOT EDIT. */
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-imports */
/* eslint-disable tsdoc/syntax */
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import gql from 'graphql-tag';

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
  AppId: string;
  BlockchainData: string;
  BroadcastId: string;
  ChainId: string;
  ChallengeId: string;
  ContentEncryptionKey: string;
  CreateHandle: string;
  Cursor: string;
  DateTime: string;
  EncryptableDateTime: string;
  EncryptableMarkdown: string;
  EncryptableString: string;
  EncryptableTxHash: string;
  EncryptableURI: string;
  EncryptedPath: string;
  EncryptedValue: string;
  Ens: string;
  EvmAddress: string;
  Handle: string;
  ImageSizeTransform: ImageSizeTransform;
  Jwt: string;
  Locale: string;
  Markdown: string;
  MimeType: string;
  MomokaId: string;
  MomokaProof: string;
  NftGalleryId: string;
  NftGalleryName: string;
  Nonce: string;
  OnchainPublicationId: string;
  PoapEventId: string;
  ProfileId: string;
  PublicationId: string;
  Signature: string;
  TokenId: string;
  TxHash: string;
  TxId: string;
  URI: string;
  URL: string;
  UUID: string;
  UnixTimestamp: string;
  Void: string;
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

export enum AttributeType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Json = 'JSON',
  Number = 'NUMBER',
  String = 'STRING',
}

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

export enum LegacyPublicationMetadataMainFocusType {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK',
  TextOnly = 'TEXT_ONLY',
  Video = 'VIDEO',
}

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
  followerOnly?: InputMaybe<Scalars['Boolean']>;
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
};

export type PublicationStatsCountOpenActionArgs = {
  anyOf: Array<OpenActionFilter>;
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
  followerOnly?: InputMaybe<Scalars['Boolean']>;
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

export type OptimisticStatusResult = { value: boolean; isFinalisedOnchain: boolean };

export type Erc20 = { name: string; symbol: string; decimals: number; contract: NetworkAddress };

export type FiatAmount = { value: string; asset: Fiat };

export type Fiat = { name: string; symbol: string; decimals: number };

export type Amount = { value: string; asset: Erc20; rate: FiatAmount | null };

export type FeeFollowModuleSettings = {
  recipient: string;
  amount: Amount;
  contract: NetworkAddress;
};

export type RevertFollowModuleSettings = { contract: NetworkAddress };

export type UnknownFollowModuleSettings = {
  followModuleReturnData: string;
  contract: NetworkAddress;
};

export type NetworkAddress = { address: string; chainId: string };

export type Image = {
  uri: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type Video = { uri: string; mimeType: string | null };

export type VideoSet = { raw: Video; optimized: Video | null };

export type EncryptableVideo = { mimeType: string | null; uri: string };

export type EncryptableVideoSet = { raw: EncryptableVideo; optimized: Video | null };

export type Audio = { uri: string; mimeType: string | null };

export type AudioSet = { raw: Audio; optimized: Audio | null };

export type EncryptableAudio = { mimeType: string | null; uri: string };

export type EncryptableAudioSet = { raw: EncryptableAudio; optimized: Audio | null };

export type LegacyAudioItem = {
  altTag: string | null;
  audio: AudioSet;
  cover: PublicationImageSet | null;
};

export type LegacyImageItem = { altTag: string | null; image: PublicationImageSet };

export type LegacyVideoItem = {
  altTag: string | null;
  video: VideoSet;
  cover: PublicationImageSet | null;
};

export type ProfileCoverSet = { raw: Image; optimized: Image | null; transformed: Image | null };

export type ProfilePictureSet = { raw: Image; optimized: Image | null; transformed: Image | null };

export type NftImage = {
  tokenId: string;
  verified: boolean;
  collection: NetworkAddress;
  image: ProfilePictureSet;
};

export type Profile = {
  __typename: 'Profile';
  id: string;
  txHash: string;
  createdAt: string;
  interests: Array<string>;
  invitesLeft: number | null;
  handle: string | null;
  sponsor: boolean;
  lensManager: boolean;
  ownedBy: NetworkAddress;
  operations: {
    id: string;
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
    displayName: string | null;
    bio: string | null;
    rawURI: string;
    picture: ProfilePictureSet | NftImage | null;
    coverPicture: ProfileCoverSet | null;
    attributes: Array<{ type: AttributeType | null; key: string; value: string }>;
  } | null;
  invitedBy: { id: string } | null;
};

export type PaginatedResultInfo = {
  __typename: 'PaginatedResultInfo';
  prev: string | null;
  next: string | null;
};

export type App = { id: string };

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
  recipient: string;
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
  recipients: Array<{ recipient: string; split: number }>;
};

export type UnknownOpenActionModuleSettings = {
  openActionModuleReturnData: string | null;
  contract: NetworkAddress;
};

export type LegacyFreeCollectModuleSettings = { followerOnly: boolean; contract: NetworkAddress };

export type LegacyFeeCollectModuleSettings = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  contract: NetworkAddress;
  amount: Amount;
};

export type LegacyLimitedFeeCollectModuleSettings = {
  collectLimit: string | null;
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  contract: NetworkAddress;
  amount: Amount;
};

export type LegacyLimitedTimedFeeCollectModuleSettings = {
  collectLimit: string | null;
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  endTimestamp: string;
  contract: { address: string };
  amount: Amount;
};

export type LegacyRevertCollectModuleSettings = { contract: NetworkAddress };

export type LegacyTimedFeeCollectModuleSettings = {
  recipient: string;
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
  recipients: Array<{ recipient: string; split: number }>;
};

export type LegacySimpleCollectModuleSettings = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddress;
  amount: Amount;
};

export type LegacyErc4626FeeCollectModuleSettings = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddress;
  vault: NetworkAddress;
  amount: Amount;
};

export type LegacyAaveFeeCollectModuleSettings = {
  recipient: string;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: NetworkAddress;
  amount: Amount;
};

export type UnknownOpenActionResult = {
  address: string;
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

export type PublicationMetadataEncryptionStrategy = {
  encryptionKey: string;
  accessCondition:
    | AndCondition
    | CollectCondition
    | EoaOwnershipCondition
    | Erc20OwnershipCondition
    | FollowCondition
    | NftOwnershipCondition
    | OrCondition
    | ProfileOwnershipCondition;
};

export type NftOwnershipCondition = {
  contractType: NftContractType;
  tokenIds: Array<string> | null;
  contract: NetworkAddress;
};

export type Erc20OwnershipCondition = {
  condition: ComparisonOperatorConditionType;
  amount: Amount;
};

export type EoaOwnershipCondition = { address: string };

export type ProfileOwnershipCondition = { profileId: string };

export type FollowCondition = { follow: string };

export type CollectCondition = { publicationId: string; thisPublication: boolean };

export type AndCondition = {
  criteria: Array<
    | CollectCondition
    | EoaOwnershipCondition
    | Erc20OwnershipCondition
    | FollowCondition
    | NftOwnershipCondition
    | ProfileOwnershipCondition
    | {}
  >;
};

export type OrCondition = {
  criteria: Array<
    | CollectCondition
    | EoaOwnershipCondition
    | Erc20OwnershipCondition
    | FollowCondition
    | NftOwnershipCondition
    | ProfileOwnershipCondition
    | {}
  >;
};

export type PublicationImageSet = {
  raw: Image;
  optimized: Image | null;
  transformed: Image | null;
};

export type EncryptableImage = {
  uri: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type PublicationEncryptableImageSet = { raw: EncryptableImage; optimized: Image | null };

export type PublicationMarketplaceMetadataAttribute = {
  displayType: MarketplaceMetadataAttributeDisplayType | null;
  traitType: string | null;
  value: string | null;
};

export type MarketplaceMetadata = {
  description: string | null;
  externalURL: string | null;
  name: string | null;
  animationUrl: string | null;
  attributes: Array<PublicationMarketplaceMetadataAttribute> | null;
  image: PublicationImageSet | null;
};

export type PublicationMetadataMediaVideo = {
  duration: number | null;
  license: PublicationMetadataLicenseType | null;
  altTag: string | null;
  video: EncryptableVideoSet;
  cover: PublicationEncryptableImageSet | null;
};

export type PublicationMetadataMediaImage = {
  license: PublicationMetadataLicenseType | null;
  image: PublicationEncryptableImageSet;
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
  cover: PublicationEncryptableImageSet | null;
};

export type LegacyPublicationMetadata = {
  content: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  mainContentFocus: LegacyPublicationMetadataMainFocusType;
  media: Array<LegacyAudioItem | LegacyImageItem | LegacyVideoItem> | null;
  marketplace: MarketplaceMetadata | null;
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
      | AndCondition
      | CollectCondition
      | EoaOwnershipCondition
      | Erc20OwnershipCondition
      | FollowCondition
      | NftOwnershipCondition
      | OrCondition
      | ProfileOwnershipCondition;
  } | null;
};

export type VideoMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  isShortVideo: boolean;
  title: string;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  title: string;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  title: string;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  title: string;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  startsAt: string;
  endsAt: string;
  links: Array<string> | null;
  location: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  content: string;
  sharingLink: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  content: string;
  embed: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  content: string;
  location: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
};

export type ThreeDMetadataV3 = {
  id: string;
  rawURI: string;
  locale: string;
  tags: Array<string> | null;
  contentWarning: PublicationContentWarningType | null;
  hideFromFeed: boolean;
  appId: string | null;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  content: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  content: string;
  type: PublicationMetadataTransactionType;
  txHash: string;
  chainId: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  content: string;
  mintLink: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  content: string;
  title: string;
  link: string;
  startsAt: string;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
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
  appId: string | null;
  title: string;
  content: string;
  startsAt: string;
  endsAt: string;
  playbackURL: string;
  liveURL: string;
  checkLiveAPI: string | null;
  marketplace: MarketplaceMetadata | null;
  attributes: Array<{ key: string; value: string }> | null;
  encryptedWith: PublicationMetadataEncryptionStrategy | null;
  attachments: Array<
    PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo
  > | null;
};

export type Post = {
  __typename: 'Post';
  id: string;
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
    | LegacyPublicationMetadata
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

export type CommentBase = {
  __typename: 'Comment';
  id: string;
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
    | LegacyPublicationMetadata
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
} & CommentBase;

export type Mirror = {
  __typename: 'Mirror';
  id: string;
  isHidden: boolean;
  txHash: string | null;
  createdAt: string;
  publishedOn: App | null;
  momoka: MomokaInfo | null;
  mirrorOn: Comment | Post | Quote;
  by: Profile;
};

export type QuoteBase = {
  __typename: 'Quote';
  id: string;
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
    | LegacyPublicationMetadata
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

export type Quote = { quoteOn: CommentBase | Post | QuoteBase } & QuoteBase;

export type Eip712TypedDataDomain = {
  name: string;
  chainId: string;
  version: string;
  verifyingContract: string;
};

export type Eip712TypedDataField = { name: string; type: string };

export type CreateActOnOpenActionEip712TypedData = {
  types: { Act: Array<Eip712TypedDataField> };
  domain: Eip712TypedDataDomain;
  value: {
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
  id: string;
  proof: string;
  momokaId: string;
};

export type TagResult = { tag: string; total: number };

export type PublicationValidateMetadataResult = { valid: boolean; reason: string | null };

export type PublicationStats = {
  id: string;
  comments: number;
  mirrors: number;
  quotes: number;
  bookmarks: number;
  countOpenActions: number;
  upvoteReactions: number;
  downvoteReactions: number;
};

export type PublicationVariables = Exact<{
  request: PublicationRequest;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
  rateRequest?: InputMaybe<RateRequest>;
}>;

export type PublicationData = { result: Comment | Mirror | Post | Quote | null };

export type PublicationStatsVariables = Exact<{
  request: PublicationRequest;
  statsRequest?: PublicationStatsInput;
  openActionsRequest?: PublicationStatsCountOpenActionArgs;
}>;

export type PublicationStatsData = {
  result:
    | { __typename: 'Comment'; stats: PublicationStats }
    | { __typename: 'Mirror' }
    | { __typename: 'Post'; stats: PublicationStats }
    | { __typename: 'Quote'; stats: PublicationStats }
    | null;
};

export type PublicationsVariables = Exact<{
  request: PublicationsRequest;
  publicationImageTransform?: InputMaybe<ImageTransform>;
  profileCoverTransform?: InputMaybe<ImageTransform>;
  profilePictureTransform?: InputMaybe<ImageTransform>;
  publicationOperationsActedArgs?: InputMaybe<PublicationOperationsActedArgs>;
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
      nonce: string;
      deadline: string;
      profileId: string;
      contentURI: string;
      actionModules: Array<string>;
      actionModulesInitDatas: Array<string>;
      referenceModule: string;
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
  };
};

export type CreateOnchainMirrorBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Mirror: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: string;
      deadline: string;
      profileId: string;
      metadataURI: string;
      pointedProfileId: string;
      pointedPubId: string;
      referrerProfileIds: Array<string>;
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
  };
};

export type CreateMomokaPostBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Post: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: string;
      deadline: string;
      profileId: string;
      contentURI: string;
      actionModules: Array<string>;
      actionModulesInitDatas: Array<string>;
      referenceModule: string;
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
  };
};

export type CreateMomokaMirrorBroadcastItemResult = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { Mirror: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomain;
    value: {
      nonce: string;
      deadline: string;
      profileId: string;
      metadataURI: string;
      pointedProfileId: string;
      pointedPubId: string;
      referrerProfileIds: Array<string>;
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

export type HidePublicationData = { hidePublication: string | null };

export type ReportPublicationVariables = Exact<{
  request: ReportPublicationRequest;
}>;

export type ReportPublicationData = { reportPublication: string | null };

export type LegacyCollectPublicationVariables = Exact<{
  request: LegacyCollectRequest;
}>;

export type LegacyCollectPublicationData = { result: LensProfileManagerRelayError | RelaySuccess };

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

export const FragmentAuthChallenge = /*#__PURE__*/ gql`
  fragment AuthChallenge on AuthChallengeResult {
    id
    text
  }
`;
export const FragmentPaginatedResultInfo = /*#__PURE__*/ gql`
  fragment PaginatedResultInfo on PaginatedResultInfo {
    __typename
    prev
    next
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
  ${FragmentNetworkAddress}
  ${FragmentOptimisticStatusResult}
  ${FragmentFeeFollowModuleSettings}
  ${FragmentRevertFollowModuleSettings}
  ${FragmentUnknownFollowModuleSettings}
  ${FragmentProfilePictureSet}
  ${FragmentNftImage}
  ${FragmentProfileCoverSet}
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
export const FragmentAudio = /*#__PURE__*/ gql`
  fragment Audio on Audio {
    uri
    mimeType
  }
`;
export const FragmentAudioSet = /*#__PURE__*/ gql`
  fragment AudioSet on AudioSet {
    raw {
      ...Audio
    }
    optimized {
      ...Audio
    }
  }
  ${FragmentAudio}
`;
export const FragmentPublicationImageSet = /*#__PURE__*/ gql`
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
  ${FragmentImage}
`;
export const FragmentLegacyAudioItem = /*#__PURE__*/ gql`
  fragment LegacyAudioItem on LegacyAudioItem {
    audio {
      ...AudioSet
    }
    cover {
      ...PublicationImageSet
    }
    altTag
  }
  ${FragmentAudioSet}
  ${FragmentPublicationImageSet}
`;
export const FragmentLegacyImageItem = /*#__PURE__*/ gql`
  fragment LegacyImageItem on LegacyImageItem {
    image {
      ...PublicationImageSet
    }
    altTag
  }
  ${FragmentPublicationImageSet}
`;
export const FragmentVideo = /*#__PURE__*/ gql`
  fragment Video on Video {
    uri
    mimeType
  }
`;
export const FragmentVideoSet = /*#__PURE__*/ gql`
  fragment VideoSet on VideoSet {
    raw {
      ...Video
    }
    optimized {
      ...Video
    }
  }
  ${FragmentVideo}
`;
export const FragmentLegacyVideoItem = /*#__PURE__*/ gql`
  fragment LegacyVideoItem on LegacyVideoItem {
    video {
      ...VideoSet
    }
    cover {
      ...PublicationImageSet
    }
    altTag
  }
  ${FragmentVideoSet}
  ${FragmentPublicationImageSet}
`;
export const FragmentPublicationMarketplaceMetadataAttribute = /*#__PURE__*/ gql`
  fragment PublicationMarketplaceMetadataAttribute on PublicationMarketplaceMetadataAttribute {
    displayType
    traitType
    value
  }
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
      ...PublicationImageSet
    }
    animationUrl
  }
  ${FragmentPublicationMarketplaceMetadataAttribute}
  ${FragmentPublicationImageSet}
`;
export const FragmentNftOwnershipCondition = /*#__PURE__*/ gql`
  fragment NftOwnershipCondition on NftOwnershipCondition {
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
    amount {
      ...Amount
    }
    condition
  }
  ${FragmentAmount}
`;
export const FragmentEoaOwnershipCondition = /*#__PURE__*/ gql`
  fragment EoaOwnershipCondition on EoaOwnershipCondition {
    address
  }
`;
export const FragmentProfileOwnershipCondition = /*#__PURE__*/ gql`
  fragment ProfileOwnershipCondition on ProfileOwnershipCondition {
    profileId
  }
`;
export const FragmentFollowCondition = /*#__PURE__*/ gql`
  fragment FollowCondition on FollowCondition {
    follow
  }
`;
export const FragmentCollectCondition = /*#__PURE__*/ gql`
  fragment CollectCondition on CollectCondition {
    publicationId
    thisPublication
  }
`;
export const FragmentAndCondition = /*#__PURE__*/ gql`
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
  ${FragmentNftOwnershipCondition}
  ${FragmentErc20OwnershipCondition}
  ${FragmentEoaOwnershipCondition}
  ${FragmentProfileOwnershipCondition}
  ${FragmentFollowCondition}
  ${FragmentCollectCondition}
`;
export const FragmentOrCondition = /*#__PURE__*/ gql`
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
  ${FragmentNftOwnershipCondition}
  ${FragmentErc20OwnershipCondition}
  ${FragmentEoaOwnershipCondition}
  ${FragmentProfileOwnershipCondition}
  ${FragmentFollowCondition}
  ${FragmentCollectCondition}
`;
export const FragmentLegacyPublicationMetadata = /*#__PURE__*/ gql`
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
  ${FragmentLegacyAudioItem}
  ${FragmentLegacyImageItem}
  ${FragmentLegacyVideoItem}
  ${FragmentMarketplaceMetadata}
  ${FragmentNftOwnershipCondition}
  ${FragmentErc20OwnershipCondition}
  ${FragmentEoaOwnershipCondition}
  ${FragmentProfileOwnershipCondition}
  ${FragmentFollowCondition}
  ${FragmentCollectCondition}
  ${FragmentAndCondition}
  ${FragmentOrCondition}
`;
export const FragmentPublicationMetadataEncryptionStrategy = /*#__PURE__*/ gql`
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
  ${FragmentNftOwnershipCondition}
  ${FragmentErc20OwnershipCondition}
  ${FragmentEoaOwnershipCondition}
  ${FragmentProfileOwnershipCondition}
  ${FragmentFollowCondition}
  ${FragmentCollectCondition}
  ${FragmentAndCondition}
  ${FragmentOrCondition}
`;
export const FragmentEncryptableAudio = /*#__PURE__*/ gql`
  fragment EncryptableAudio on EncryptableAudio {
    mimeType
    uri
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
export const FragmentPublicationEncryptableImageSet = /*#__PURE__*/ gql`
  fragment PublicationEncryptableImageSet on EncryptableImageSet {
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
  ${FragmentEncryptableAudioSet}
  ${FragmentPublicationEncryptableImageSet}
`;
export const FragmentEncryptableVideo = /*#__PURE__*/ gql`
  fragment EncryptableVideo on EncryptableVideo {
    mimeType
    uri
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
      ...PublicationEncryptableImageSet
    }
    duration
    license
    altTag
  }
  ${FragmentEncryptableVideoSet}
  ${FragmentPublicationEncryptableImageSet}
`;
export const FragmentPublicationMetadataMediaImage = /*#__PURE__*/ gql`
  fragment PublicationMetadataMediaImage on PublicationMetadataMediaImage {
    image {
      ...PublicationEncryptableImageSet
    }
    license
  }
  ${FragmentPublicationEncryptableImageSet}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentMarketplaceMetadata}
  ${FragmentPublicationMetadataEncryptionStrategy}
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
  ${FragmentApp}
  ${FragmentMomokaInfo}
  ${FragmentProfile}
  ${FragmentPublicationOperations}
  ${FragmentLegacyPublicationMetadata}
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
  ${FragmentApp}
  ${FragmentMomokaInfo}
  ${FragmentProfile}
  ${FragmentPublicationOperations}
  ${FragmentLegacyPublicationMetadata}
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
  ${FragmentApp}
  ${FragmentMomokaInfo}
  ${FragmentProfile}
  ${FragmentPublicationOperations}
  ${FragmentLegacyPublicationMetadata}
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
  }
  ${FragmentCommentBase}
  ${FragmentPost}
  ${FragmentQuoteBase}
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
  }
  ${FragmentQuoteBase}
  ${FragmentPost}
  ${FragmentCommentBase}
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
    by {
      ...Profile
    }
  }
  ${FragmentApp}
  ${FragmentMomokaInfo}
  ${FragmentPost}
  ${FragmentComment}
  ${FragmentQuote}
  ${FragmentProfile}
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
export const FragmentPublicationStats = /*#__PURE__*/ gql`
  fragment PublicationStats on PublicationStats {
    id
    comments
    mirrors
    quotes
    bookmarks
    upvoteReactions: reactions(request: { type: UPVOTE })
    downvoteReactions: reactions(request: { type: DOWNVOTE })
    countOpenActions(request: $openActionsRequest)
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
export const FragmentEip712TypedDataField = /*#__PURE__*/ gql`
  fragment EIP712TypedDataField on EIP712TypedDataField {
    name
    type
  }
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
export const PublicationDocument = /*#__PURE__*/ gql`
  query Publication(
    $request: PublicationRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
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
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
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
export const PublicationStatsDocument = /*#__PURE__*/ gql`
  query PublicationStats(
    $request: PublicationRequest!
    $statsRequest: PublicationStatsInput! = {}
    $openActionsRequest: PublicationStatsCountOpenActionArgs! = { anyOf: [] }
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
  ${FragmentPublicationStats}
`;

/**
 * __usePublicationStats__
 *
 * To run a query within a React component, call `usePublicationStats` and pass it any options that fit your needs.
 * When your component renders, `usePublicationStats` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationStats({
 *   variables: {
 *      request: // value for 'request'
 *      statsRequest: // value for 'statsRequest'
 *      openActionsRequest: // value for 'openActionsRequest'
 *   },
 * });
 */
export function usePublicationStats(
  baseOptions: Apollo.QueryHookOptions<PublicationStatsData, PublicationStatsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PublicationStatsData, PublicationStatsVariables>(
    PublicationStatsDocument,
    options,
  );
}
export function usePublicationStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PublicationStatsData, PublicationStatsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PublicationStatsData, PublicationStatsVariables>(
    PublicationStatsDocument,
    options,
  );
}
export type PublicationStatsHookResult = ReturnType<typeof usePublicationStats>;
export type PublicationStatsLazyQueryHookResult = ReturnType<typeof usePublicationStatsLazyQuery>;
export type PublicationStatsQueryResult = Apollo.QueryResult<
  PublicationStatsData,
  PublicationStatsVariables
>;
export const PublicationsDocument = /*#__PURE__*/ gql`
  query Publications(
    $request: PublicationsRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
 *      request: // value for 'request'
 *      publicationImageTransform: // value for 'publicationImageTransform'
 *      profileCoverTransform: // value for 'profileCoverTransform'
 *      profilePictureTransform: // value for 'profilePictureTransform'
 *      publicationOperationsActedArgs: // value for 'publicationOperationsActedArgs'
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
export const LegacyCollectPublicationDocument = /*#__PURE__*/ gql`
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
  ${FragmentRelaySuccess}
  ${FragmentLensProfileManagerRelayError}
`;
export type LegacyCollectPublicationMutationFn = Apollo.MutationFunction<
  LegacyCollectPublicationData,
  LegacyCollectPublicationVariables
>;

/**
 * __useLegacyCollectPublication__
 *
 * To run a mutation, you first call `useLegacyCollectPublication` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLegacyCollectPublication` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [legacyCollectPublication, { data, loading, error }] = useLegacyCollectPublication({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useLegacyCollectPublication(
  baseOptions?: Apollo.MutationHookOptions<
    LegacyCollectPublicationData,
    LegacyCollectPublicationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LegacyCollectPublicationData, LegacyCollectPublicationVariables>(
    LegacyCollectPublicationDocument,
    options,
  );
}
export type LegacyCollectPublicationHookResult = ReturnType<typeof useLegacyCollectPublication>;
export type LegacyCollectPublicationMutationResult =
  Apollo.MutationResult<LegacyCollectPublicationData>;
export type LegacyCollectPublicationMutationOptions = Apollo.BaseMutationOptions<
  LegacyCollectPublicationData,
  LegacyCollectPublicationVariables
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
export type AttributeKeySpecifier = ('key' | 'type' | 'value' | AttributeKeySpecifier)[];
export type AttributeFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type AudioSetKeySpecifier = ('optimized' | 'raw' | AudioSetKeySpecifier)[];
export type AudioSetFieldPolicy = {
  optimized?: FieldPolicy<any> | FieldReadFunction<any>;
  raw?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type EncryptedMediaKeySpecifier = (
  | 'altTag'
  | 'cover'
  | 'mimeType'
  | 'uri'
  | EncryptedMediaKeySpecifier
)[];
export type EncryptedMediaFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type LegacyAudioItemKeySpecifier = (
  | 'altTag'
  | 'audio'
  | 'cover'
  | LegacyAudioItemKeySpecifier
)[];
export type LegacyAudioItemFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  audio?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type LegacyImageItemKeySpecifier = ('altTag' | 'image' | LegacyImageItemKeySpecifier)[];
export type LegacyImageItemFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type LegacyPublicationMetadataKeySpecifier = (
  | 'appId'
  | 'content'
  | 'contentWarning'
  | 'encryptedWith'
  | 'id'
  | 'locale'
  | 'mainContentFocus'
  | 'marketplace'
  | 'media'
  | 'rawURI'
  | 'tags'
  | LegacyPublicationMetadataKeySpecifier
)[];
export type LegacyPublicationMetadataFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedWith?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  mainContentFocus?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  media?: FieldPolicy<any> | FieldReadFunction<any>;
  rawURI?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type LegacyVideoItemKeySpecifier = (
  | 'altTag'
  | 'cover'
  | 'video'
  | LegacyVideoItemKeySpecifier
)[];
export type LegacyVideoItemFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  video?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type PaginatedResultInfoKeySpecifier = ('next' | 'prev' | PaginatedResultInfoKeySpecifier)[];
export type PaginatedResultInfoFieldPolicy = {
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
  | 'app'
  | 'attributes'
  | 'bio'
  | 'coverPicture'
  | 'displayName'
  | 'picture'
  | 'rawURI'
  | ProfileMetadataKeySpecifier
)[];
export type ProfileMetadataFieldPolicy = {
  app?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type PublicationMetadataMediaAudioKeySpecifier = (
  | 'artist'
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
  | 'image'
  | 'license'
  | PublicationMetadataMediaImageKeySpecifier
)[];
export type PublicationMetadataMediaImageFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  license?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataMediaVideoKeySpecifier = (
  | 'altTag'
  | 'cover'
  | 'duration'
  | 'license'
  | 'video'
  | PublicationMetadataMediaVideoKeySpecifier
)[];
export type PublicationMetadataMediaVideoFieldPolicy = {
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  license?: FieldPolicy<any> | FieldReadFunction<any>;
  video?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataV2EncryptedFieldsKeySpecifier = (
  | 'animationUrl'
  | 'content'
  | 'externalUrl'
  | 'image'
  | 'media'
  | PublicationMetadataV2EncryptedFieldsKeySpecifier
)[];
export type PublicationMetadataV2EncryptedFieldsFieldPolicy = {
  animationUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  externalUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  media?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataV2EncryptionKeySpecifier = (
  | 'accessCondition'
  | 'encryptedFields'
  | 'encryptionKey'
  | PublicationMetadataV2EncryptionKeySpecifier
)[];
export type PublicationMetadataV2EncryptionFieldPolicy = {
  accessCondition?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedFields?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptionKey?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataV3AttributeKeySpecifier = (
  | 'key'
  | 'value'
  | PublicationMetadataV3AttributeKeySpecifier
)[];
export type PublicationMetadataV3AttributeFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataV3LitEncryptionKeySpecifier = (
  | 'accessCondition'
  | 'encryptedPaths'
  | 'encryptionKey'
  | PublicationMetadataV3LitEncryptionKeySpecifier
)[];
export type PublicationMetadataV3LitEncryptionFieldPolicy = {
  accessCondition?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedPaths?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptionKey?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type VideoSetKeySpecifier = ('optimized' | 'raw' | VideoSetKeySpecifier)[];
export type VideoSetFieldPolicy = {
  optimized?: FieldPolicy<any> | FieldReadFunction<any>;
  raw?: FieldPolicy<any> | FieldReadFunction<any>;
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
  Attribute?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AttributeKeySpecifier | (() => undefined | AttributeKeySpecifier);
    fields?: AttributeFieldPolicy;
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
  AudioSet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AudioSetKeySpecifier | (() => undefined | AudioSetKeySpecifier);
    fields?: AudioSetFieldPolicy;
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
  EncryptedMedia?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | EncryptedMediaKeySpecifier | (() => undefined | EncryptedMediaKeySpecifier);
    fields?: EncryptedMediaFieldPolicy;
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
  LegacyAudioItem?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyAudioItemKeySpecifier
      | (() => undefined | LegacyAudioItemKeySpecifier);
    fields?: LegacyAudioItemFieldPolicy;
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
  LegacyImageItem?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyImageItemKeySpecifier
      | (() => undefined | LegacyImageItemKeySpecifier);
    fields?: LegacyImageItemFieldPolicy;
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
  LegacyPublicationMetadata?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyPublicationMetadataKeySpecifier
      | (() => undefined | LegacyPublicationMetadataKeySpecifier);
    fields?: LegacyPublicationMetadataFieldPolicy;
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
  LegacyVideoItem?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LegacyVideoItemKeySpecifier
      | (() => undefined | LegacyVideoItemKeySpecifier);
    fields?: LegacyVideoItemFieldPolicy;
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
  PublicationMetadataV2EncryptedFields?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationMetadataV2EncryptedFieldsKeySpecifier
      | (() => undefined | PublicationMetadataV2EncryptedFieldsKeySpecifier);
    fields?: PublicationMetadataV2EncryptedFieldsFieldPolicy;
  };
  PublicationMetadataV2Encryption?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationMetadataV2EncryptionKeySpecifier
      | (() => undefined | PublicationMetadataV2EncryptionKeySpecifier);
    fields?: PublicationMetadataV2EncryptionFieldPolicy;
  };
  PublicationMetadataV3Attribute?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationMetadataV3AttributeKeySpecifier
      | (() => undefined | PublicationMetadataV3AttributeKeySpecifier);
    fields?: PublicationMetadataV3AttributeFieldPolicy;
  };
  PublicationMetadataV3LitEncryption?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PublicationMetadataV3LitEncryptionKeySpecifier
      | (() => undefined | PublicationMetadataV3LitEncryptionKeySpecifier);
    fields?: PublicationMetadataV3LitEncryptionFieldPolicy;
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
  VideoSet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | VideoSetKeySpecifier | (() => undefined | VideoSetKeySpecifier);
    fields?: VideoSetFieldPolicy;
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
    AccessCondition: [
      'AndCondition',
      'CollectCondition',
      'EoaOwnershipCondition',
      'Erc20OwnershipCondition',
      'FollowCondition',
      'NftOwnershipCondition',
      'OrCondition',
      'ProfileOwnershipCondition',
    ],
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
    LegacyMediaItem: ['LegacyAudioItem', 'LegacyImageItem', 'LegacyVideoItem'],
    LensProfileManagerRelayResult: ['LensProfileManagerRelayError', 'RelaySuccess'],
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
      'LegacyPublicationMetadata',
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
    PublicationMetadataEncryptionStrategy: ['PublicationMetadataV3LitEncryption'],
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
    SupportedModule: ['KnownSupportedModule', 'UnknownSupportedModule'],
  },
};
export default result;
