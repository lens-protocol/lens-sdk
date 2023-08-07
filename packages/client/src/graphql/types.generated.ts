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
  AudioMimeType: { input: string; output: string };
  BlockchainData: { input: string; output: string };
  BroadcastId: { input: string; output: string };
  ChainId: { input: string; output: string };
  ChallengeId: { input: string; output: string };
  CollectModuleData: { input: string; output: string };
  ContentEncryptionKey: { input: string; output: string };
  ContractPublicationId: { input: string; output: string };
  CreateDeleteEIP712TypedData: { input: string; output: string };
  CreateHandle: { input: string; output: string };
  CreateMirrorEIP712TypedData: { input: string; output: string };
  Cursor: { input: string; output: string };
  DateTime: { input: string; output: string };
  EncryptedValueScalar: { input: string; output: string };
  Ens: { input: string; output: string };
  Erc20: { input: string; output: string };
  EvmAddress: { input: string; output: string };
  FeedId: { input: string; output: string };
  FollowModuleData: { input: string; output: string };
  Handle: { input: string; output: string };
  HandleClaimIdScalar: { input: string; output: string };
  ImageMimeType: { input: string; output: string };
  ImageSizeTransform: { input: ImageSizeTransform; output: ImageSizeTransform };
  IpfsCid: { input: string; output: string };
  Jwt: { input: string; output: string };
  Limit: { input: string; output: string };
  Locale: { input: string; output: string };
  Location: { input: string; output: string };
  Markdown: { input: string; output: string };
  MetadataLicenseType: { input: string; output: string };
  MetadataMediaAudioType: { input: string; output: string };
  MimeType: { input: string; output: string };
  MomokaId: { input: string; output: string };
  MomokaProof: { input: string; output: string };
  MomokaTransactionUnion: { input: string; output: string };
  NftGalleryId: { input: string; output: string };
  NftOwnershipChallengeId: { input: string; output: string };
  NftTokenId: { input: string; output: string };
  Nonce: { input: string; output: string };
  NotificationId: { input: string; output: string };
  ProfileId: { input: string; output: string };
  ProfileInterest: { input: string; output: string };
  ProfileSortCriteria: { input: string; output: string };
  PublicationId: { input: string; output: string };
  PublicationTag: { input: string; output: string };
  PublicationUrl: { input: string; output: string };
  ReactionId: { input: string; output: string };
  ReferenceModuleData: { input: string; output: string };
  Signature: { input: string; output: string };
  ThreeDFormat: { input: string; output: string };
  TxHash: { input: string; output: string };
  TxId: { input: string; output: string };
  UnixTimestamp: { input: string; output: string };
  Uri: { input: string; output: string };
  Url: { input: string; output: string };
  VideoMimeType: { input: string; output: string };
  Void: { input: string; output: string };
};

export type AchRequest = {
  ethereumAddress: Scalars['EvmAddress']['input'];
  freeTextHandle?: InputMaybe<Scalars['Boolean']['input']>;
  handle?: InputMaybe<Scalars['CreateHandle']['input']>;
  overrideAlreadyClaimed: Scalars['Boolean']['input'];
  overrideTradeMark: Scalars['Boolean']['input'];
  secret: Scalars['String']['input'];
};

export type ActedByFilter = {
  openAction: Array<OpenActionFilter>;
  who: Scalars['ProfileId']['input'];
};

export type AddProfileInterestsRequest = {
  interests: Array<Scalars['ProfileInterest']['input']>;
};

export type AlreadyInvitedCheckRequest = {
  address: Scalars['EvmAddress']['input'];
};

export type AmountInput = {
  currency: NetworkAddressInput;
  value: Scalars['String']['input'];
};

export type ApprovedModuleAllowanceAmountRequest = {
  currencies: Array<Scalars['EvmAddress']['input']>;
  followModules?: InputMaybe<Array<FollowModules>>;
  openActionModules?: InputMaybe<Array<OpenActionModules>>;
  referenceModules?: InputMaybe<Array<ReferenceModules>>;
  unknownCollectModules?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
  unknownFollowModules?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
  unknownReferenceModules?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
};

export enum ArticleMetadataV1MainFocus {
  Article = 'ARTICLE',
}

export enum AttributeTypes {
  Boolean = 'Boolean',
  Date = 'Date',
  Json = 'JSON',
  Number = 'Number',
  String = 'String',
}

export enum AudioMetadataV1MainFocus {
  Audio = 'AUDIO',
}

export type BlockRequest = {
  profile: Scalars['ProfileId']['input'];
};

export type BroadcastRequest = {
  id: Scalars['BroadcastId']['input'];
  signature: Scalars['Signature']['input'];
};

export type ChallengeRequest = {
  profileId: Scalars['ProfileId']['input'];
};

export enum CheckingInMetadataV1MainFocus {
  CheckingIn = 'CHECKING_IN',
}

export type ClaimHandleRequest = {
  followModule?: InputMaybe<FollowModuleInput>;
  freeTextHandle?: InputMaybe<Scalars['CreateHandle']['input']>;
  id?: InputMaybe<Scalars['HandleClaimIdScalar']['input']>;
};

export enum ClaimRelayErrorReasons {
  Failed = 'FAILED',
  HandleTaken = 'HANDLE_TAKEN',
}

export enum ClaimStatus {
  AlreadyClaimed = 'ALREADY_CLAIMED',
  ClaimFailed = 'CLAIM_FAILED',
  NotClaimed = 'NOT_CLAIMED',
}

export enum CollectOpenActionModules {
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
  LegacyUnknownCollectModule = 'LegacyUnknownCollectModule',
  MultirecipientCollectOpenActionModule = 'MultirecipientCollectOpenActionModule',
  SimpleCollectOpenAction = 'SimpleCollectOpenAction',
}

export enum CommentRankingFilter {
  NoneRelevant = 'NONE_RELEVANT',
  Relevant = 'RELEVANT',
}

export type CreateCommentRequest = {
  commentOn: Scalars['PublicationId']['input'];
  contentURI: Scalars['Url']['input'];
};

export type CreateMomokaCommentRequest = {
  commentOn: Scalars['PublicationId']['input'];
  contentURI: Scalars['Url']['input'];
};

export type CreateMomokaMirrorRequest = {
  from: Scalars['ProfileId']['input'];
  mirror: Scalars['PublicationId']['input'];
};

export type CreateMomokaPostRequest = {
  contentURI: Scalars['Url']['input'];
};

export type CreateOnChainCommentRequest = {
  contentURI: Scalars['Url']['input'];
  on: Scalars['PublicationId']['input'];
  openActionModule: Array<OpenActionModuleInput>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
};

export type CreateOnChainMirrorRequest = {
  on: Scalars['PublicationId']['input'];
  referenceModule?: InputMaybe<ReferenceModuleInput>;
};

export type CreateOnChainPostRequest = {
  contentURI: Scalars['Url']['input'];
  openActionModule: Array<OpenActionModuleInput>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
};

export type CreateOpenActionActRequest = {
  for: Scalars['PublicationId']['input'];
  multirecipientCollectOpenAction?: InputMaybe<Scalars['Boolean']['input']>;
  simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']['input']>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionActEquest>;
};

export type CreateProfileRequest = {
  followModule?: InputMaybe<FollowModuleInput>;
  followNFTURI?: InputMaybe<Scalars['Url']['input']>;
  handle: Scalars['CreateHandle']['input'];
  profilePictureUri?: InputMaybe<Scalars['Url']['input']>;
};

export type CreateQuoteRequest = {
  contentURI: Scalars['Url']['input'];
  on: Scalars['PublicationId']['input'];
  openActionModule: Array<OpenActionModuleInput>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
};

export enum CreateRelayErrorReasons {
  Failed = 'FAILED',
  HandleTaken = 'HANDLE_TAKEN',
}

export type CreateSetFollowModuleRequest = {
  followModule: FollowModuleInput;
};

export type CreateSetProfileMetadataUriRequest = {
  metadata: Scalars['Url']['input'];
};

export type CurRequest = {
  secret: Scalars['String']['input'];
};

export enum CustomFiltersTypes {
  Gardeners = 'GARDENERS',
}

export enum DecryptFailReasonTypes {
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

export type DegreesOfSeparationReferenceModuleInput = {
  commentsRestricted: Scalars['Boolean']['input'];
  degreesOfSeparation: Scalars['Int']['input'];
  mirrorsRestricted: Scalars['Boolean']['input'];
  quotesRestricted: Scalars['Boolean']['input'];
};

export type DeleteProfileRequest = {
  for: Scalars['ProfileId']['input'];
};

export type DismissRecommendedProfilesRequest = {
  for: Array<Scalars['ProfileId']['input']>;
};

export enum EmbedMetadataV1MainFocus {
  Embed = 'EMBED',
}

export enum EventMetadataV1MainFocus {
  Event = 'EVENT',
}

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
  limit?: InputMaybe<Scalars['Limit']['input']>;
  orderBy: ExploreProfileOrderBy;
  where?: InputMaybe<ExploreProfilesWhere>;
};

export type ExploreProfilesWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  since?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  sortCriteria: Scalars['ProfileSortCriteria']['input'];
};

export type ExplorePublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  orderBy: ExplorePublicationsOrderBy;
  where?: InputMaybe<ExplorePublicationsWhere>;
};

export enum ExplorePublicationTypes {
  Comment = 'COMMENT',
  Post = 'POST',
  Quote = 'QUOTE',
}

export enum ExplorePublicationsOrderBy {
  Latest = 'LATEST',
  LensCurated = 'LENS_CURATED',
  TopCollectedOpenAction = 'TOP_COLLECTED_OPEN_ACTION',
  TopCommented = 'TOP_COMMENTED',
  TopMirrored = 'TOP_MIRRORED',
  TopQuoted = 'TOP_QUOTED',
}

export type ExplorePublicationsWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  matadata?: InputMaybe<PublicationMetadataFilters>;
  publicationTypes?: InputMaybe<Array<ExplorePublicationTypes>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
  since?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};

export type FeeFollowModuleInput = {
  amount: AmountInput;
  recipient: Scalars['EvmAddress']['input'];
};

export type FeeFollowModuleRedeemInput = {
  amount: AmountInput;
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
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type FeedHighlightsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  where?: InputMaybe<FeedHighlightWhere>;
};

export type FeedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  where?: InputMaybe<FeedWhere>;
};

export type FeedWhere = {
  feedEventItemTypes?: InputMaybe<Array<FeedEventItemType>>;
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type Follow = {
  followModule?: InputMaybe<FollowModuleRedeemInput>;
  profile: Scalars['ProfileId']['input'];
};

export type FollowModuleInput = {
  feeFollowModule?: InputMaybe<FeeFollowModuleInput>;
  freeFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
  profileFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
  revertFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleInput>;
};

export type FollowModuleRedeemInput = {
  feeFollowModule?: InputMaybe<FeeFollowModuleRedeemInput>;
  profileFollowModule?: InputMaybe<ProfileFollowModuleRedeemInput>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemInput>;
};

export enum FollowModules {
  FeeFollowModule = 'FeeFollowModule',
  ProfileFollowModule = 'ProfileFollowModule',
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
  limit?: InputMaybe<Scalars['Limit']['input']>;
  of: Scalars['ProfileId']['input'];
};

export type FollowingRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<Scalars['Limit']['input']>;
};

export type FraudReasonInputInput = {
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
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type GddRequest = {
  domain: Scalars['Url']['input'];
  secret: Scalars['String']['input'];
};

export type GdmRequest = {
  secret: Scalars['String']['input'];
};

export type GenerateModuleCurrencyApprovalDataRequest = {
  currency: Scalars['EvmAddress']['input'];
  followModule?: InputMaybe<FollowModules>;
  openActionModule?: InputMaybe<OpenActionModules>;
  referenceModule?: InputMaybe<ReferenceModules>;
  unknownCollectModule?: InputMaybe<Scalars['EvmAddress']['input']>;
  unknownFollowModule?: InputMaybe<Scalars['EvmAddress']['input']>;
  unknownReferenceModule?: InputMaybe<Scalars['EvmAddress']['input']>;
  value: Scalars['String']['input'];
};

export type HelRequest = {
  handle: Scalars['Handle']['input'];
  remove: Scalars['Boolean']['input'];
  secret: Scalars['String']['input'];
};

export type HidePublicationRequest = {
  publicationId: Scalars['PublicationId']['input'];
};

export type IdKitPhoneVerifyWebhookRequest = {
  sharedSecret: Scalars['String']['input'];
  worldcoin?: InputMaybe<WorldcoinPhoneVerifyWebhookRequest>;
};

export enum IdKitPhoneVerifyWebhookResultStatusType {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Success = 'SUCCESS',
}

export type IllegalReasonInputInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingIllegalSubreason;
};

export enum ImageMetadataV1MainFocus {
  Image = 'IMAGE',
}

export type ImageTransform = {
  height?: InputMaybe<Scalars['ImageSizeTransform']['input']>;
  keepAspectRatio?: InputMaybe<Scalars['Boolean']['input']>;
  width?: InputMaybe<Scalars['ImageSizeTransform']['input']>;
};

export type InRequest = {
  ethereumAddress: Scalars['EvmAddress']['input'];
  numInvites: Scalars['Int']['input'];
  secret: Scalars['String']['input'];
};

export type InTotalRequest = {
  ethereumAddress: Scalars['EvmAddress']['input'];
  secret: Scalars['String']['input'];
};

export type InternalPinRequest = {
  items: Array<Scalars['Url']['input']>;
  secret: Scalars['String']['input'];
};

export type InviteRequest = {
  invites: Array<Scalars['EvmAddress']['input']>;
  secret: Scalars['String']['input'];
};

export enum LensMetadataTransactionFailureTypes {
  MetadataError = 'METADATA_ERROR',
  Reverted = 'REVERTED',
}

export enum LensProfileManagerRelayErrorReasons {
  AppGaslessNotAllowed = 'APP_GASLESS_NOT_ALLOWED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  RateLimited = 'RATE_LIMITED',
  RequiresSignature = 'REQUIRES_SIGNATURE',
  WrongWalletSigned = 'WRONG_WALLET_SIGNED',
}

export enum LensTransactionFailureTypes {
  Reverted = 'REVERTED',
}

export enum LensTransactionStatus {
  Complete = 'COMPLETE',
  Failed = 'FAILED',
  Progressing = 'PROGRESSING',
}

export type LensTransactionStatusRequest = {
  txHash?: InputMaybe<Scalars['TxHash']['input']>;
  txId?: InputMaybe<Scalars['TxId']['input']>;
};

export enum LinkMetadataV1MainFocus {
  Link = 'LINK',
}

export enum LiveStreamMetadataV1MainFocus {
  Livestream = 'LIVESTREAM',
}

export type ManagedProfilesRequest = {
  address: Scalars['EvmAddress']['input'];
};

export enum MarketplaceMetadataAttributeDisplayTypes {
  Date = 'date',
  Number = 'number',
  String = 'string',
}

export enum MetadataContentWarnings {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER',
}

export enum MetadataMainFocus {
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

export enum MetadataV2MainFocus {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK',
  TextOnly = 'TEXT_ONLY',
  Video = 'VIDEO',
}

export enum MintMetadataV1MainFocus {
  Mint = 'MINT',
}

export type ModuleFeeInput = {
  amount: AmountInput;
  recipient: Scalars['EvmAddress']['input'];
  referralFee: Scalars['Float']['input'];
};

export type MomokaTransactionRequest = {
  id: Scalars['String']['input'];
};

export type MomokaTransactionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
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
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  followerOnly: Scalars['Boolean']['input'];
  recipients: Array<RecipientDataInput>;
  referralFee?: InputMaybe<Scalars['Float']['input']>;
};

export type MutualFollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  observer: Scalars['ProfileId']['input'];
  viewing: Scalars['ProfileId']['input'];
};

export type NftOwnershipProof = {
  id: Scalars['NftOwnershipChallengeId']['input'];
  signature: Scalars['Signature']['input'];
};

export type NfTsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  where?: InputMaybe<NfTsRequestWhere>;
};

export type NfTsRequestWhere = {
  chainIds?: InputMaybe<Array<Scalars['ChainId']['input']>>;
  excludeCollections?: InputMaybe<Array<NetworkAddressInput>>;
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  includeCollections?: InputMaybe<Array<NetworkAddressInput>>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type NetworkAddressInput = {
  address: Scalars['EvmAddress']['input'];
  chainId: Scalars['ChainId']['input'];
};

export type Nfi = {
  c: Scalars['EvmAddress']['input'];
  i: Scalars['ChainId']['input'];
};

export enum NftContractType {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
}

export type NftGalleriesRequest = {
  for: Scalars['ProfileId']['input'];
};

export type NftGalleryCreateRequest = {
  items: Array<NftInput>;
  name: Scalars['String']['input'];
};

export type NftGalleryDeleteRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
};

export type NftGalleryUpdateInfoRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  name: Scalars['String']['input'];
};

export type NftGalleryUpdateItemOrderRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  updates: Array<NftUpdateItemOrder>;
};

export type NftGalleryUpdateItemsRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  toAdd?: InputMaybe<Array<NftInput>>;
  toRemove?: InputMaybe<Array<NftInput>>;
};

export type NftInput = {
  contract: NetworkAddressInput;
  tokenId: Scalars['String']['input'];
};

export type NftOwnershipChallenge = {
  contract: NetworkAddressInput;
  tokenId: Scalars['String']['input'];
};

export type NftOwnershipChallengeRequest = {
  for: Scalars['EvmAddress']['input'];
  nfts: Array<NftOwnershipChallenge>;
};

export type NftUpdateItemOrder = {
  EvmAddress: NetworkAddressInput;
  newOrder: Scalars['Int']['input'];
  tokenId: Scalars['String']['input'];
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
  limit?: InputMaybe<Scalars['Limit']['input']>;
  where?: InputMaybe<NotificationWhere>;
};

export enum NotificationTypes {
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
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  highSignalFilter?: InputMaybe<Scalars['Boolean']['input']>;
  notificationTypes?: InputMaybe<Array<NotificationTypes>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export enum OpenActionCategories {
  Collect = 'Collect',
}

export type OpenActionFilter = {
  address?: InputMaybe<Scalars['EvmAddress']['input']>;
  category?: InputMaybe<OpenActionCategories>;
  type?: InputMaybe<OpenActionModules>;
};

export type OpenActionModuleInput = {
  multirecipientCollectOpenAction?: InputMaybe<MultirecipientFeeCollectModuleInput>;
  simpleCollectOpenAction?: InputMaybe<SimpleCollectOpenActionModuleInput>;
  unknownOpenAction?: InputMaybe<UnknownCollectModuleInput>;
};

export enum OpenActionModules {
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
  LegacyUnknownCollectModule = 'LegacyUnknownCollectModule',
  MultirecipientCollectOpenActionModule = 'MultirecipientCollectOpenActionModule',
  NftDropOpenActionModule = 'NftDropOpenActionModule',
  SimpleCollectOpenAction = 'SimpleCollectOpenAction',
  UnknownOpenActionModule = 'UnknownOpenActionModule',
}

export type OwnedHandlesRequest = {
  address: Scalars['EvmAddress']['input'];
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
  limit?: InputMaybe<Scalars['Limit']['input']>;
  where?: InputMaybe<ProfileBookmarksWhere>;
};

export type ProfileBookmarksWhere = {
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type ProfileFollowModuleRedeemInput = {
  profileId: Scalars['ProfileId']['input'];
};

export type ProfileManagersRequest = {
  profile: Scalars['ProfileId']['input'];
};

export type ProfileRequest = {
  handle?: InputMaybe<Scalars['Handle']['input']>;
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};

export type ProfileSearchRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  query: Scalars['String']['input'];
  where?: InputMaybe<ProfileSearchWhere>;
};

export type ProfileSearchWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
};

export type ProfilesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  where?: InputMaybe<ProfilesRequestWhere>;
};

export type ProfilesRequestWhere = {
  ownedBy?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
  profileIds?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
  /** Direct comments only */
  whoCommentedOn?: InputMaybe<Scalars['PublicationId']['input']>;
  whoMirroredPublication?: InputMaybe<Scalars['PublicationId']['input']>;
  whoQuotedPublication?: InputMaybe<Scalars['PublicationId']['input']>;
};

export type PublicationBookmarkRequest = {
  on: Scalars['PublicationId']['input'];
};

export enum PublicationContentWarning {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER',
}

export type PublicationForYouRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<Scalars['Limit']['input']>;
};

export type PublicationMetadataContentWarningFilter = {
  oneOf?: InputMaybe<Array<PublicationContentWarning>>;
};

export type PublicationMetadataFilters = {
  contentWarning?: InputMaybe<PublicationMetadataContentWarningFilter>;
  locale?: InputMaybe<Scalars['Locale']['input']>;
  mainContentFocus?: InputMaybe<Array<MetadataMainFocus>>;
  tags?: InputMaybe<PublicationMetadataTagsFilter>;
};

export type PublicationMetadataTagsFilter = {
  all?: InputMaybe<Array<Scalars['String']['input']>>;
  oneOf?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PublicationNotInterestedRequest = {
  on: Scalars['PublicationId']['input'];
};

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
  limit?: InputMaybe<Scalars['Limit']['input']>;
  query: Scalars['String']['input'];
  where?: InputMaybe<PublicationSearchWhere>;
};

export type PublicationSearchWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  publicationTypes?: InputMaybe<Array<PublicationTypes>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export enum PublicationTypes {
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
}

export enum PublicationsOrderBy {
  CommentOfQueryRanking = 'COMMENT_OF_QUERY_RANKING',
  Latest = 'LATEST',
  TopCollectedOpenAction = 'TOP_COLLECTED_OPEN_ACTION',
  TopCommented = 'TOP_COMMENTED',
  TopMirrored = 'TOP_MIRRORED',
  TopQuoted = 'TOP_QUOTED',
}

export type PublicationsRequest = {
  commentsRankingFilter?: InputMaybe<CommentRankingFilter>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  orderBy?: InputMaybe<PublicationsOrderBy>;
  where?: InputMaybe<PublicationsWhere>;
};

export type PublicationsTagsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  orderBy: TagSortCriteria;
  where?: InputMaybe<PublicationsTagsWhere>;
};

export type PublicationsTagsWhere = {
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type PublicationsWhere = {
  actedBy?: InputMaybe<Array<OpenActionFilter>>;
  commentsOf?: InputMaybe<Scalars['PublicationId']['input']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  from?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  mirrorOf?: InputMaybe<Scalars['PublicationId']['input']>;
  publicationIds?: InputMaybe<Array<Scalars['PublicationId']['input']>>;
  publicationTypes?: InputMaybe<Array<PublicationTypes>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
  withOpenActions?: InputMaybe<Array<OpenActionFilter>>;
};

export type ReactionRequest = {
  for: Scalars['PublicationId']['input'];
  reaction: ReactionTypes;
};

export enum ReactionTypes {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE',
}

export type RecipientDataInput = {
  recipient: Scalars['EvmAddress']['input'];
  split: Scalars['Float']['input'];
};

export type RecommendedProfileRequest = {
  disableML?: InputMaybe<Scalars['Boolean']['input']>;
  shuffle?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RecommendedProfileRequestWhere>;
};

export type RecommendedProfileRequestWhere = {
  for?: InputMaybe<Scalars['ProfileId']['input']>;
};

export type ReferenceModuleInput = {
  degreesOfSeparationReferenceModule?: InputMaybe<DegreesOfSeparationReferenceModuleInput>;
  followerOnlyReferenceModule?: InputMaybe<Scalars['Boolean']['input']>;
  unknownReferenceModule?: InputMaybe<UnknownReferenceModuleInput>;
};

export enum ReferenceModules {
  DegreesOfSeparationReferenceModule = 'DegreesOfSeparationReferenceModule',
  FollowerOnlyReferenceModule = 'FollowerOnlyReferenceModule',
  UnknownReferenceModule = 'UnknownReferenceModule',
}

export type RefreshRequest = {
  refreshToken: Scalars['Jwt']['input'];
};

export type RelRequest = {
  ethereumAddress: Scalars['EvmAddress']['input'];
  secret: Scalars['String']['input'];
};

export enum RelayErrorReasons {
  AppGaslessNotAllowed = 'APP_GASLESS_NOT_ALLOWED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  RateLimited = 'RATE_LIMITED',
  WrongWalletSigned = 'WRONG_WALLET_SIGNED',
}

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

export type RemoveProfileInterestsRequest = {
  interests: Array<Scalars['ProfileInterest']['input']>;
};

export type ReportPublicationRequest = {
  additionalComments?: InputMaybe<Scalars['String']['input']>;
  for: Scalars['PublicationId']['input'];
  reason: ReportingReasonInputInput;
};

export type ReportingReasonInputInput = {
  fraudReason?: InputMaybe<FraudReasonInputInput>;
  illegalReason?: InputMaybe<IllegalReasonInputInput>;
  sensitiveReason?: InputMaybe<SensitiveReasonInputInput>;
  spamReason?: InputMaybe<SpamReasonInputInput>;
};

export type RevenueFromPublicationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<Scalars['Limit']['input']>;
  where?: InputMaybe<RevenueFromPublicationsWhere>;
};

export type RevenueFromPublicationsWhere = {
  anyOf?: InputMaybe<Array<OpenActionFilter>>;
  fromCollects?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publicationTypes?: InputMaybe<Array<PublicationTypes>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export enum ScalarOperator {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  NotEqual = 'NOT_EQUAL',
}

export type SensitiveReasonInputInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSensitiveSubreason;
};

export type SetProfileManagerRequest = {
  add?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
  for: Scalars['ProfileId']['input'];
  lens?: InputMaybe<Scalars['Boolean']['input']>;
  remove?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
};

export type SignedAuthChallenge = {
  id: Scalars['ChallengeId']['input'];
  signature: Scalars['Signature']['input'];
};

export type SimpleCollectModuleInput = {
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  fee?: InputMaybe<ModuleFeeInput>;
  followerOnly: Scalars['Boolean']['input'];
};

export type SimpleCollectOpenActionModuleInput = {
  amount: AmountInput;
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  followerOnly: Scalars['Boolean']['input'];
  recipient: Scalars['EvmAddress']['input'];
  referralFee?: InputMaybe<Scalars['Float']['input']>;
};

export enum SpaceMetadataV1MainFocus {
  Space = 'SPACE',
}

export type SpamReasonInputInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSpamSubreason;
};

export enum StoryMetadataV1MainFocus {
  Story = 'STORY',
}

export enum SupportedFiatTypes {
  Usd = 'USD',
}

export enum TagSortCriteria {
  Alphabetical = 'ALPHABETICAL',
  MostPopular = 'MOST_POPULAR',
}

export enum TextOnlyMetadataV1MainFocus {
  TextOnly = 'TEXT_ONLY',
}

export enum ThreeDMetadataV1MainFocus {
  ThreeD = 'THREE_D',
}

export enum TransactionMetadataTypes {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Other = 'OTHER',
}

export enum TransactionMetadataV1MainFocus {
  Transaction = 'TRANSACTION',
}

export type TypedDataOptions = {
  overrideSigNonce: Scalars['Nonce']['input'];
};

export type UnblockRequest = {
  profile: Scalars['ProfileId']['input'];
};

export type UnfollowRequest = {
  profile: Scalars['ProfileId']['input'];
};

export type UnknownCollectModuleInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownFollowModuleInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownFollowModuleRedeemInput = {
  data: Scalars['BlockchainData']['input'];
};

export type UnknownOpenActionActEquest = {
  address: Scalars['EvmAddress']['input'];
  data?: InputMaybe<Scalars['BlockchainData']['input']>;
};

export type UnknownReferenceModuleInput = {
  EvmAddress: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UpdateProfileImageRequest = {
  nftData?: InputMaybe<NftOwnershipProof>;
  url?: InputMaybe<Scalars['Url']['input']>;
};

export type ValidatePublicationMetadataRequest = {
  json?: InputMaybe<Scalars['String']['input']>;
  rawURL?: InputMaybe<Scalars['Url']['input']>;
};

export type VerifyRequest = {
  accessToken: Scalars['Jwt']['input'];
};

export enum VideoMetadataV1MainFocus {
  ShortVideo = 'SHORT_VIDEO',
  Video = 'VIDEO',
}

export type WhoActedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['Limit']['input']>;
  on: Scalars['PublicationId']['input'];
  where?: InputMaybe<WhoActedPublicationWhere>;
};

export type WhoActedPublicationWhere = {
  anyOf: Array<OpenActionFilter>;
};

export type WhoReactedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['PublicationId']['input'];
  limit?: InputMaybe<Scalars['Limit']['input']>;
  where?: InputMaybe<WhoReactedPublicationWhere>;
};

export type WhoReactedPublicationWhere = {
  anyOf?: InputMaybe<Array<ReactionTypes>>;
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
