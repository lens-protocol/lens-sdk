import type { ImageSizeTransform } from './ImageSizeTransform';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  AppId: { input: string; output: string };
  BlockchainData: { input: string; output: string };
  BroadcastId: { input: string; output: string };
  ChainId: { input: string; output: string };
  ChallengeId: { input: string; output: string };
  ContentEncryptionKey: { input: string; output: string };
  CreateHandle: { input: string; output: string };
  Cursor: { input: string; output: string };
  DateTime: { input: string; output: string };
  EncryptedValue: { input: string; output: string };
  Ens: { input: string; output: string };
  EvmAddress: { input: string; output: string };
  Handle: { input: string; output: string };
  ImageSizeTransform: { input: ImageSizeTransform; output: ImageSizeTransform };
  Jwt: { input: string; output: string };
  LimitScalar: { input: number; output: number };
  Locale: { input: string; output: string };
  Markdown: { input: string; output: string };
  MimeType: { input: string; output: string };
  MomokaId: { input: string; output: string };
  MomokaProof: { input: string; output: string };
  NftGalleryId: { input: string; output: string };
  NftGalleryName: { input: string; output: string };
  Nonce: { input: string; output: string };
  OnchainPublicationId: { input: string; output: string };
  ProfileId: { input: string; output: string };
  PublicationId: { input: string; output: string };
  Signature: { input: string; output: string };
  TokenId: { input: string; output: string };
  TxHash: { input: string; output: string };
  TxId: { input: string; output: string };
  URI: { input: string; output: string };
  URL: { input: string; output: string };
  UnixTimestamp: { input: string; output: string };
  Void: { input: string; output: string };
};

export type AchRequest = {
  address: Scalars['EvmAddress']['input'];
  freeTextHandle: Scalars['Boolean']['input'];
  handle: Scalars['CreateHandle']['input'];
  overrideAlreadyClaimed: Scalars['Boolean']['input'];
  overrideTradeMark: Scalars['Boolean']['input'];
  secret: Scalars['String']['input'];
};

export type ActOnOpenActionInput = {
  multirecipientCollectOpenAction?: InputMaybe<Scalars['Boolean']['input']>;
  simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']['input']>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionActRedeemInput>;
};

/** The lens manager will only support FREE open action modules, if you want your unknown module allowed to be signless please contact us */
export type ActOnOpenActionLensManagerInput = {
  simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']['input']>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionActRedeemInput>;
};

export type ActOnOpenActionLensManagerRequest = {
  actOn: ActOnOpenActionLensManagerInput;
  for?: InputMaybe<Scalars['PublicationId']['input']>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type ActOnOpenActionRequest = {
  actOn: ActOnOpenActionInput;
  for?: InputMaybe<Scalars['PublicationId']['input']>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type AlreadyInvitedCheckRequest = {
  address: Scalars['EvmAddress']['input'];
};

export type AmountInput = {
  /** The currency */
  currency: Scalars['EvmAddress']['input'];
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String']['input'];
};

export type ApprovedModuleAllowanceAmountRequest = {
  currencies?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
  followModules?: InputMaybe<Array<FollowModuleType>>;
  openActionModules?: InputMaybe<Array<OpenActionModuleType>>;
  referenceModules?: InputMaybe<Array<ReferenceModuleType>>;
  unknownFollowModules?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
  unknownOpenActionModules?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
  unknownReferenceModules?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
};

export enum AudioMimeType {
  Mp3 = 'MP3',
}

export type BlockRequest = {
  profiles: Array<Scalars['ProfileId']['input']>;
};

export type BroadcastRequest = {
  id: Scalars['BroadcastId']['input'];
  signature: Scalars['Signature']['input'];
};

export type ChallengeRequest = {
  /** The profile ID to initiate a challenge */
  address: Scalars['EvmAddress']['input'];
  /** The profile ID to initiate a challenge */
  profileId: Scalars['ProfileId']['input'];
};

export type ChangeProfileManager = {
  action: ChangeProfileManagerActionType;
  address: Scalars['EvmAddress']['input'];
};

export enum ChangeProfileManagerActionType {
  Add = 'ADD',
  Remove = 'REMOVE',
}

export type ChangeProfileManagersRequest = {
  approveLensManager: Scalars['Boolean']['input'];
  changeManagers?: InputMaybe<Array<ChangeProfileManager>>;
};

export type ClaimProfileRequest = {
  followModule?: InputMaybe<FollowModuleInput>;
  freeTextHandle?: InputMaybe<Scalars['CreateHandle']['input']>;
  id: Scalars['String']['input'];
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
  handle: Scalars['CreateHandle']['input'];
  to: Scalars['EvmAddress']['input'];
};

export type CurRequest = {
  secret: Scalars['String']['input'];
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
  commentsRestricted: Scalars['Boolean']['input'];
  degreesOfSeparation: Scalars['Int']['input'];
  mirrorsRestricted: Scalars['Boolean']['input'];
  quotesRestricted: Scalars['Boolean']['input'];
};

export type DismissRecommendedProfilesRequest = {
  dismiss: Array<Scalars['ProfileId']['input']>;
};

/** Possible sort criteria for exploring profiles */
export enum ExploreProfileOrderBy {
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
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  /** Order criteria for exploring profiles */
  orderBy: ExploreProfileOrderBy;
  /** Filtering criteria for exploring profiles */
  where?: InputMaybe<ExploreProfilesWhere>;
};

export type ExploreProfilesWhere = {
  /** Array of custom filters for exploring profiles */
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  /** Filter profiles created since the specified timestamp */
  since?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};

export type ExplorePublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  orderBy: ExplorePublicationsOrderByType;
  where?: InputMaybe<ExplorePublicationsWhere>;
};

export enum ExplorePublicationType {
  Comment = 'COMMENT',
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
  since?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};

export type FeeFollowModuleInput = {
  amount: AmountInput;
  recipient: Scalars['EvmAddress']['input'];
};

export enum FeedEventItemType {
  CollectComment = 'COLLECT_COMMENT',
  CollectPost = 'COLLECT_POST',
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
  ReactionComment = 'REACTION_COMMENT',
  ReactionPost = 'REACTION_POST',
}

export type FeedHighlightWhere = {
  metadata: PublicationMetadataFilters;
};

export type FeedHighlightsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  where?: InputMaybe<FeedHighlightWhere>;
};

export type FeedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  where?: InputMaybe<FeedWhere>;
};

export type FeedWhere = {
  feedEventItemTypes?: InputMaybe<Array<FeedEventItemType>>;
  for: Scalars['ProfileId']['input'];
  metadata: PublicationMetadataFilters;
};

export type Follow = {
  followModule?: InputMaybe<FollowModuleRedeemInput>;
  profileId: Scalars['ProfileId']['input'];
};

export type FollowLensManager = {
  followModule?: InputMaybe<FollowLensManagerModuleRedeemInput>;
  profileId: Scalars['ProfileId']['input'];
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
  freeFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
  revertFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleInput>;
};

export type FollowModuleRedeemInput = {
  feeFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
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
  for: Scalars['ProfileId']['input'];
};

export type FollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  of: Scalars['ProfileId']['input'];
};

export type FollowingRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export type FraudReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingFraudSubreason;
};

export type GciRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  ttt: Scalars['String']['input'];
};

export type GcrRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  ttt: Scalars['String']['input'];
};

export type GctRequest = {
  secret: Scalars['String']['input'];
};

export type GddRequest = {
  domain: Scalars['URL']['input'];
  secret: Scalars['String']['input'];
};

export type GdmRequest = {
  secret: Scalars['String']['input'];
};

export type GenerateModuleCurrencyApprovalDataRequest = {
  currency: Scalars['EvmAddress']['input'];
  followModule?: InputMaybe<FollowModuleType>;
  openActionModule?: InputMaybe<OpenActionModuleType>;
  referenceModule?: InputMaybe<ReferenceModuleType>;
  unknownFollowModule?: InputMaybe<Scalars['EvmAddress']['input']>;
  unknownOpenActionModule?: InputMaybe<Scalars['EvmAddress']['input']>;
  unknownReferenceModule?: InputMaybe<Scalars['EvmAddress']['input']>;
  value: Scalars['String']['input'];
};

export type HandleLinkToProfileRequest = {
  handleId: Scalars['TokenId']['input'];
};

export type HandleUnlinkFromProfileRequest = {
  handleId: Scalars['TokenId']['input'];
};

export type HelRequest = {
  handle: Scalars['Handle']['input'];
  remove: Scalars['Boolean']['input'];
  secret: Scalars['String']['input'];
};

export type HidePublicationRequest = {
  for: Scalars['PublicationId']['input'];
};

export type IdKitPhoneVerifyWebhookRequest = {
  sharedSecret: Scalars['String']['input'];
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

export enum ImageMimeType {
  Png = 'PNG',
}

export type ImageTransform = {
  /** Set the transformed image's height */
  height?: InputMaybe<Scalars['ImageSizeTransform']['input']>;
  /** Set if you want to keep the image's original aspect ratio. True by default. If explicitly set to false, the image will stretch based on the width and height values. */
  keepAspectRatio?: InputMaybe<Scalars['Boolean']['input']>;
  /** Set the transformed image's width */
  width?: InputMaybe<Scalars['ImageSizeTransform']['input']>;
};

export type InRequest = {
  address: Scalars['EvmAddress']['input'];
  numInvites: Scalars['Int']['input'];
  secret: Scalars['String']['input'];
};

export type InTotalRequest = {
  address: Scalars['EvmAddress']['input'];
  secret: Scalars['String']['input'];
};

export type InviteRequest = {
  invites: Array<Scalars['EvmAddress']['input']>;
  secret: Scalars['String']['input'];
};

export type LegacyCollectRequest = {
  on: Scalars['PublicationId']['input'];
};

export enum LegacyPublicationMetadataVersions {
  V1 = 'V1',
  V2 = 'V2',
}

export enum LensMetadataTransactionFailureType {
  MetadataError = 'METADATA_ERROR',
  Reverted = 'REVERTED',
}

export enum LensProfileManagerRelayErrorReasonType {
  AppGaslessNotAllowed = 'APP_GASLESS_NOT_ALLOWED',
  Failed = 'FAILED',
  NoLensManagerEnabled = 'NO_LENS_MANAGER_ENABLED',
  RateLimited = 'RATE_LIMITED',
  RequiresSignature = 'REQUIRES_SIGNATURE',
}

export enum LensTransactionFailureType {
  Reverted = 'REVERTED',
}

export type LensTransactionStatusRequest = {
  /** Transaction hash for retrieving transaction status */
  txHash?: InputMaybe<Scalars['TxHash']['input']>;
  /** Transaction ID for retrieving transaction status when using the broadcaster */
  txId?: InputMaybe<Scalars['TxId']['input']>;
};

export enum LensTransactionStatusType {
  Complete = 'COMPLETE',
  Failed = 'FAILED',
  OptimisticallyUpdated = 'OPTIMISTICALLY_UPDATED',
  Progressing = 'PROGRESSING',
}

export type MomokaCommentRequest = {
  commentOn: Scalars['PublicationId']['input'];
  contentURI: Scalars['URI']['input'];
};

export type MomokaMirrorRequest = {
  from: Scalars['ProfileId']['input'];
  mirror: Scalars['PublicationId']['input'];
};

export type MomokaPostRequest = {
  contentURI: Scalars['URI']['input'];
};

export type MomokaQuoteRequest = {
  contentURI: Scalars['URI']['input'];
};

export type MomokaTransactionRequest = {
  /** The momoka transaction id or internal publication id */
  id: Scalars['String']['input'];
};

export type MomokaTransactionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export enum MomokaValidatorErrorType {
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
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  followerOnly?: InputMaybe<Scalars['Boolean']['input']>;
  recipients: Array<RecipientDataInput>;
  referralFee?: InputMaybe<Scalars['Float']['input']>;
};

export type MutualFollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  observer: Scalars['ProfileId']['input'];
  viewing: Scalars['ProfileId']['input'];
};

/** Mutual NFT collections request */
export type MutualNftCollectionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  /** Profile id of the second user */
  viewingProfileId: Scalars['ProfileId']['input'];
  /** Profile id of the first user */
  yourProfileId: Scalars['ProfileId']['input'];
};

export type MutualPoapsQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  observer: Scalars['ProfileId']['input'];
  viewing: Scalars['ProfileId']['input'];
};

export type NetworkAddressInput = {
  address: Scalars['EvmAddress']['input'];
  chainId: Scalars['ChainId']['input'];
};

export type Nfi = {
  c: Scalars['EvmAddress']['input'];
  i: Scalars['ChainId']['input'];
};

export enum NftCollectionOwnersOrder {
  FollowersFirst = 'FollowersFirst',
  None = 'None',
}

/** NFT collection owners request */
export type NftCollectionOwnersRequest = {
  /** The contract address */
  address: Scalars['EvmAddress']['input'];
  /** The chain id */
  chainId: Scalars['ChainId']['input'];
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** The profile id to use when ordering by followers */
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  /** The ordering of Nft collection owners */
  order?: InputMaybe<NftCollectionOwnersOrder>;
};

/** NFT collections request */
export type NftCollectionsRequest = {
  /** The chain ids to look for NFTs on. Ethereum and Polygon are supported. If omitted, it will look on both chains by default. */
  chainIds?: InputMaybe<Array<Scalars['ChainId']['input']>>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** Exclude Lens Follower NFTs */
  excludeFollowers?: InputMaybe<Scalars['Boolean']['input']>;
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  /** Filter by owner address */
  forAddress?: InputMaybe<Scalars['EvmAddress']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
};

export enum NftContractType {
  Erc721 = 'ERC721',
  Erc721Enumerable = 'ERC721Enumerable',
  Erc1155 = 'ERC1155',
}

export type NftGalleriesRequest = {
  for: Scalars['ProfileId']['input'];
};

export type NftGalleryCreateRequest = {
  items: Array<NftInput>;
  name: Scalars['NftGalleryName']['input'];
};

export type NftGalleryDeleteRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
};

export type NftGalleryUpdateInfoRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  name: Scalars['NftGalleryName']['input'];
};

export type NftGalleryUpdateItemOrderRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  updates?: InputMaybe<Array<NftUpdateItemOrder>>;
};

export type NftGalleryUpdateItemsRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  toAdd?: InputMaybe<Array<NftInput>>;
  toRemove?: InputMaybe<Array<NftInput>>;
};

export type NftInput = {
  contract: NetworkAddressInput;
  tokenId: Scalars['TokenId']['input'];
};

export type NftOwnershipChallenge = {
  contract: NetworkAddressInput;
  tokenId: Scalars['TokenId']['input'];
};

export type NftOwnershipChallengeRequest = {
  for: Scalars['EvmAddress']['input'];
  nfts: Array<NftOwnershipChallenge>;
};

/** NFT search query */
export type NftSearchRequest = {
  /** Chain IDs to search. Supports Ethereum and Polygon. If omitted, it will search in both chains */
  chainIds?: InputMaybe<Array<Scalars['ChainId']['input']>>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** Exclude follower NFTs from the search */
  excludeFollowers?: InputMaybe<Scalars['Boolean']['input']>;
  /** Ethereum address of the owner. If unknown you can also search by profile ID */
  forAddress?: InputMaybe<Scalars['EvmAddress']['input']>;
  /** Profile ID of the owner */
  forProfileId?: InputMaybe<Scalars['ProfileId']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  /** Search query. Has to be part of a collection name */
  query: Scalars['String']['input'];
};

export type NftUpdateItemOrder = {
  contract: NetworkAddressInput;
  newOrder: Scalars['Int']['input'];
  tokenId: Scalars['TokenId']['input'];
};

export type NftsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  where?: InputMaybe<NftsRequestWhere>;
};

export type NftsRequestWhere = {
  chainIds?: InputMaybe<Array<Scalars['ChainId']['input']>>;
  excludeCollections?: InputMaybe<Array<NetworkAddressInput>>;
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  includeCollections?: InputMaybe<Array<NetworkAddressInput>>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type NniRequest = {
  n: Array<Nfi>;
  secret: Scalars['String']['input'];
};

export type NnvRequest = {
  n: Array<Nfi>;
  secret: Scalars['String']['input'];
};

export type NotificationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  where?: InputMaybe<NotificationWhere>;
};

export type NotificationSubscriptionRequest = {
  for: Scalars['ProfileId']['input'];
};

export enum NotificationType {
  CollectActed = 'COLLECT_ACTED',
  Commented = 'COMMENTED',
  Followed = 'FOLLOWED',
  Mentioned = 'MENTIONED',
  Mirrored = 'MIRRORED',
  OtherActed = 'OTHER_ACTED',
  Quoted = 'QUOTED',
  Reacted = 'REACTED',
}

export type NotificationWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  highSignalFilter?: InputMaybe<Scalars['Boolean']['input']>;
  notificationTypes?: InputMaybe<Array<NotificationType>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type OnchainCommentRequest = {
  commentOn: Scalars['PublicationId']['input'];
  commentOnReferenceModuleData?: InputMaybe<Scalars['BlockchainData']['input']>;
  contentURI: Scalars['URI']['input'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainMirrorRequest = {
  mirrorOn: Scalars['PublicationId']['input'];
  mirrorReferenceModuleData?: InputMaybe<Scalars['BlockchainData']['input']>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainPostRequest = {
  contentURI: Scalars['URI']['input'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
};

export type OnchainQuoteRequest = {
  contentURI: Scalars['URI']['input'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  quoteOn: Scalars['PublicationId']['input'];
  quoteOnReferenceModuleData?: InputMaybe<Scalars['BlockchainData']['input']>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainReferrer = {
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
  publicationId?: InputMaybe<Scalars['PublicationId']['input']>;
};

export type OnchainSetProfileMetadataRequest = {
  metadataURI: Scalars['URI']['input'];
};

export enum OpenActionCategoryType {
  Collect = 'COLLECT',
}

export type OpenActionFilter = {
  address?: InputMaybe<Scalars['EvmAddress']['input']>;
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
  /** The Ethereum address for which to retrieve owned handles */
  address: Scalars['EvmAddress']['input'];
};

/** Pagination with Offset fields  */
export type PaginatedOffsetRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export type PoapEventQueryRequest = {
  eventId: Scalars['Float']['input'];
};

export type PoapHoldersQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  eventId: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export enum PoapTokenLayerType {
  Layer1 = 'Layer1',
  Layer2 = 'Layer2',
}

/** Popular NFT collections request */
export type PopularNftCollectionsRequest = {
  /** The chain ids to look for NFTs on. Ethereum and Polygon are supported. If omitted, it will look on both chains by default. */
  chainIds?: InputMaybe<Array<Scalars['ChainId']['input']>>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** Exclude Lens Follower NFTs */
  excludeFollowers?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  /** Include only verified collections */
  onlyVerified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PrfRequest = {
  dd: Scalars['Boolean']['input'];
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  ss: Scalars['Boolean']['input'];
};

export type PriRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type ProfileBookmarksRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  where?: InputMaybe<ProfileBookmarksWhere>;
};

export type ProfileBookmarksWhere = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type ProfileInterestsRequest = {
  interests: Scalars['String']['input'];
};

export type ProfileManagersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** The profile ID for which to retrieve managers */
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export type ProfileRecommendationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** Disable machine learning recommendations (default: false) */
  disableML?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter based on a specific profile ID */
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  /** Shuffle the recommendations (default: false) */
  shuffle?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProfileRequest = {
  /** The handle for profile you want to fetch */
  handle?: InputMaybe<Scalars['Handle']['input']>;
  /** The profile you want to fetch */
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};

export type ProfileSearchRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  /** Query for the profile search */
  query: Scalars['String']['input'];
  /** Filtering criteria for profile search */
  where?: InputMaybe<ProfileSearchWhere>;
};

export type ProfileSearchWhere = {
  /** Array of custom filters for profile search */
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
};

export type ProfileStatsArgs = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  forApps?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type ProfileStatsCountOpenActionArgs = {
  anyOf?: InputMaybe<Array<OpenActionFilter>>;
};

export type ProfileStatsReactionArgs = {
  type?: InputMaybe<PublicationReactionType>;
};

export type ProfilesManagedRequest = {
  /** The Ethereum address for which to retrieve managed profiles */
  address: Scalars['EvmAddress']['input'];
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export type ProfilesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  /** The where clause to use to filter on what you are looking for */
  where: ProfilesRequestWhere;
};

export type ProfilesRequestWhere = {
  /** Pass in an array of handles to get the profile entities */
  handles?: InputMaybe<Array<Scalars['Handle']['input']>>;
  /** Pass in an array of evm address to get the profile entities they own */
  ownedBy?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
  /** Pass in an array of profile ids to get the profile entities */
  profileIds?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
  /** Pass the publication id and get a list of the profiles who commented on it */
  whoCommentedOn?: InputMaybe<Scalars['PublicationId']['input']>;
  /** Pass the publication id and get a list of the profiles who mirrored it */
  whoMirroredPublication?: InputMaybe<Scalars['PublicationId']['input']>;
  /** Pass the publication id and get a list of the profiles who quoted it */
  whoQuotedPublication?: InputMaybe<Scalars['PublicationId']['input']>;
};

export enum PublicationArticleMetadataV1MainFocusType {
  Article = 'ARTICLE',
}

export type PublicationBookmarkRequest = {
  on: Scalars['PublicationId']['input'];
};

export enum PublicationCheckingInMetadataV1MainFocusType {
  CheckingIn = 'CHECKING_IN',
}

export type PublicationCommentOf = {
  commentsRankingFilter?: InputMaybe<CommentRankingFilterType>;
  id: Scalars['PublicationId']['input'];
};

export enum PublicationContentWarningType {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER',
}

export enum PublicationEmbedMetadataV1MainFocusType {
  Embed = 'EMBED',
}

export enum PublicationEventMetadataV1MainFocusType {
  Event = 'EVENT',
}

export type PublicationForYouRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export enum PublicationImageMetadataV1MainFocusType {
  Image = 'IMAGE',
}

export enum PublicationLinkMetadataV1MainFocusType {
  Link = 'LINK',
}

export enum PublicationLiveStreamMetadataV1MainFocusType {
  Livestream = 'LIVESTREAM',
}

export enum PublicationMarketplaceMetadataAttributeDisplayType {
  Date = 'DATE',
  Number = 'NUMBER',
  String = 'STRING',
}

export type PublicationMetadataContentWarningFilter = {
  oneOf?: InputMaybe<Array<PublicationContentWarningType>>;
};

export type PublicationMetadataFilters = {
  contentWarning?: InputMaybe<PublicationMetadataContentWarningFilter>;
  locale?: InputMaybe<Scalars['Locale']['input']>;
  mainContentFocus?: InputMaybe<Array<PublicationMetadataMainFocusType>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
  tags?: InputMaybe<PublicationMetadataTagsFilter>;
};

export enum PublicationMetadataLicenseType {
  AllRightsReserved = 'ALL_RIGHTS_RESERVED',
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
  Spaces = 'SPACES',
  Story = 'STORY',
  TextOnly = 'TEXT_ONLY',
  ThreeD = 'THREE_D',
  Transaction = 'TRANSACTION',
  Video = 'VIDEO',
}

export enum PublicationMetadataMediaAudioType {
  Mp3 = 'MP3',
}

export type PublicationMetadataTagsFilter = {
  all?: InputMaybe<Array<Scalars['String']['input']>>;
  oneOf?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum PublicationMetadataV2MainFocusType {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK',
  TextOnly = 'TEXT_ONLY',
  Video = 'VIDEO',
}

export enum PublicationMintMetadataV1MainFocusType {
  Mint = 'MINT',
}

export type PublicationNotInterestedRequest = {
  on: Scalars['PublicationId']['input'];
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
  for?: InputMaybe<Scalars['PublicationId']['input']>;
  txHash?: InputMaybe<Scalars['TxHash']['input']>;
};

export type PublicationRevenueRequest = {
  for: Scalars['PublicationId']['input'];
};

export type PublicationSearchRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  query: Scalars['String']['input'];
  where: PublicationSearchWhere;
};

export type PublicationSearchWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  publicationTypes?: InputMaybe<Array<PublicationType>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export enum PublicationSpaceMetadataV1MainFocusType {
  Space = 'SPACE',
}

export type PublicationStatsCountOpenActionArgs = {
  anyOf?: InputMaybe<Array<OpenActionFilter>>;
};

export type PublicationStatsInput = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  forApps?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type PublicationStatsReactionArgs = {
  type?: InputMaybe<PublicationReactionType>;
};

export type PublicationStatsSubscriptionRequest = {
  for: Scalars['PublicationId']['input'];
};

export enum PublicationStoryMetadataV1MainFocusType {
  Story = 'STORY',
}

export enum PublicationTextOnlyMetadataV1MainFocusType {
  TextOnly = 'TEXT_ONLY',
}

export enum PublicationThreeDMetadataV1MainFocusType {
  ThreeD = 'THREE_D',
}

export enum PublicationTransactionMetadataType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Other = 'OTHER',
}

export enum PublicationTransactionMetadataV1MainFocusType {
  Transaction = 'TRANSACTION',
}

export enum PublicationType {
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
}

export enum PublicationVideoMetadataV1MainFocusType {
  ShortVideo = 'SHORT_VIDEO',
  Video = 'VIDEO',
}

export enum PublicationsOrderByType {
  CommentOfQueryRanking = 'COMMENT_OF_QUERY_RANKING',
  Latest = 'LATEST',
  TopCollectedOpenAction = 'TOP_COLLECTED_OPEN_ACTION',
  TopCommented = 'TOP_COMMENTED',
  TopMirrored = 'TOP_MIRRORED',
  TopQuoted = 'TOP_QUOTED',
}

export type PublicationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  orderBy?: InputMaybe<PublicationsOrderByType>;
  where: PublicationsWhere;
};

export type PublicationsTagsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  orderBy?: InputMaybe<TagSortCriteriaType>;
  where?: InputMaybe<PublicationsTagsWhere>;
};

export type PublicationsTagsWhere = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type PublicationsWhere = {
  acted?: InputMaybe<Array<OpenActionFilter>>;
  commentsOf?: InputMaybe<PublicationCommentOf>;
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  from?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  mirrorOf?: InputMaybe<Scalars['PublicationId']['input']>;
  publicationIds?: InputMaybe<Array<Scalars['PublicationId']['input']>>;
  publicationTypes?: InputMaybe<Array<PublicationType>>;
  quoteOf?: InputMaybe<Scalars['PublicationId']['input']>;
  withOpenActions?: InputMaybe<Array<OpenActionFilter>>;
};

export type ReactionRequest = {
  for: Scalars['PublicationId']['input'];
  reaction: PublicationReactionType;
};

export type RecipientDataInput = {
  /** Recipient of collect fees. */
  recipient: Scalars['EvmAddress']['input'];
  /** Split %, should be between 0.01 and 100. Up to 2 decimal points supported. All % should add up to 100 */
  split: Scalars['Float']['input'];
};

export type ReferenceModuleInput = {
  degreesOfSeparationReferenceModule?: InputMaybe<DegreesOfSeparationReferenceModuleInput>;
  followerOnlyReferenceModule?: InputMaybe<Scalars['Boolean']['input']>;
  unknownReferenceModule?: InputMaybe<UnknownReferenceModuleInput>;
};

export enum ReferenceModuleType {
  DegreesOfSeparationReferenceModule = 'DegreesOfSeparationReferenceModule',
  FollowerOnlyReferenceModule = 'FollowerOnlyReferenceModule',
  UnknownReferenceModule = 'UnknownReferenceModule',
}

/** The refresh request */
export type RefreshRequest = {
  /** The refresh token */
  refreshToken: Scalars['Jwt']['input'];
};

export type RelRequest = {
  address: Scalars['EvmAddress']['input'];
  secret: Scalars['String']['input'];
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
  additionalComments?: InputMaybe<Scalars['String']['input']>;
  for: Scalars['PublicationId']['input'];
  reason: ReportingReasonInput;
};

export type ReportingReasonInput = {
  fraudReason?: InputMaybe<FraudReasonInput>;
  illegalReason?: InputMaybe<IllegalReasonInput>;
  sensitiveReason?: InputMaybe<SensitiveReasonInput>;
  spamReason?: InputMaybe<SpamReasonInput>;
};

export type RevenueFromPublicationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  where: RevenueFromPublicationsWhere;
};

export type RevenueFromPublicationsWhere = {
  anyOf?: InputMaybe<Array<OpenActionFilter>>;
  fromCollects: Scalars['Boolean']['input'];
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publicationTypes?: InputMaybe<Array<PublicationType>>;
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
  id: Scalars['ChallengeId']['input'];
  /** The signature */
  signature: Scalars['Signature']['input'];
};

export type SimpleCollectOpenActionModuleInput = {
  amount?: InputMaybe<AmountInput>;
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  followerOnly?: InputMaybe<Scalars['Boolean']['input']>;
  recipient?: InputMaybe<Scalars['EvmAddress']['input']>;
  referralFee?: InputMaybe<Scalars['Float']['input']>;
};

export type SpamReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSpamSubreason;
};

export enum TagSortCriteriaType {
  Alphabetical = 'ALPHABETICAL',
  MostPopular = 'MOST_POPULAR',
}

export type TypedDataOptions = {
  /** If you wish to override the nonce for the sig if you want to do some clever stuff in the client */
  overrideSigNonce: Scalars['Nonce']['input'];
};

export type UnblockRequest = {
  profiles: Array<Scalars['ProfileId']['input']>;
};

export type UnfollowRequest = {
  unfollow: Array<Scalars['ProfileId']['input']>;
};

export type UnknownFollowModuleInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownFollowModuleRedeemInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownOpenActionActRedeemInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownOpenActionModuleInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownReferenceModuleInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UserPoapsQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export type ValidatePublicationMetadataRequest = {
  json?: InputMaybe<Scalars['String']['input']>;
  rawURI?: InputMaybe<Scalars['URI']['input']>;
};

export type VerifyRequest = {
  /** The access token to verify */
  accessToken: Scalars['Jwt']['input'];
};

export enum VideoMimeType {
  Mp4 = 'MP4',
}

export type WhoActedOnPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  on: Scalars['PublicationId']['input'];
  where?: InputMaybe<WhoActedOnPublicationWhere>;
};

export type WhoActedOnPublicationWhere = {
  anyOf: Array<OpenActionFilter>;
};

export type WhoHaveBlockedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export type WhoReactedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['PublicationId']['input'];
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  where?: InputMaybe<WhoReactedPublicationWhere>;
};

export type WhoReactedPublicationWhere = {
  anyOf?: InputMaybe<Array<PublicationReactionType>>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export enum WorldcoinPhoneVerifyType {
  Orb = 'ORB',
  Phone = 'PHONE',
}

export type WorldcoinPhoneVerifyWebhookRequest = {
  nullifierHash: Scalars['String']['input'];
  signal: Scalars['EvmAddress']['input'];
  signalType: WorldcoinPhoneVerifyType;
};
