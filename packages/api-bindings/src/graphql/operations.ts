/** Code generated. DO NOT EDIT. */
/* eslint-disable @typescript-eslint/ban-types */
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

import type { CollectPolicy } from './CollectPolicy';
import type { ContentEncryptionKey } from './ContentEncryptionKey';
import type { FollowPolicy } from './FollowPolicy';
import type { FollowStatus } from './FollowStatus';
import type { ProfileAttributes } from './ProfileAttributes';
import type { ReferencePolicy } from './ReferencePolicy';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Blockchain data scalar type */
  BlockchainData: unknown;
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
  /** Contract address custom scalar type */
  ContractAddress: string;
  /** create handle custom scalar type */
  CreateHandle: unknown;
  /** Cursor custom scalar type */
  Cursor: string;
  /** The da id */
  DataAvailabilityId: unknown;
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
  FollowModuleData: unknown;
  FollowPolicy: FollowPolicy;
  FollowStatus: FollowStatus;
  /** handle custom scalar type */
  Handle: string;
  /** handle claim id custom scalar type */
  HandleClaimIdScalar: unknown;
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
  PublicationId: unknown;
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

export type InternalPublicationsFilterRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  /** must be DD/MM/YYYY */
  fromDate: Scalars['String'];
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** The shared secret */
  secret: Scalars['String'];
  /** The App Id */
  source: Scalars['Sources'];
  /** must be DD/MM/YYYY */
  toDate: Scalars['String'];
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

export type NfTsRequest = {
  /** Chain Ids */
  chainIds: Array<Scalars['ChainId']>;
  /** Filter by contract address */
  contractAddress?: InputMaybe<Scalars['ContractAddress']>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** Filter by owner address */
  ownerAddress: Scalars['EthereumAddress'];
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

export type NotificationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  highSignalFilter?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  /** The profile id */
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
  /** Needs to only match all */
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
      value: {
        nonce: number;
        deadline: unknown;
        profileId: ProfileId;
        pubId: unknown;
        data: unknown;
      };
    };
  };
};

export type CreateCommentTypedDataVariables = Exact<{
  request: CreatePublicCommentRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateCommentTypedDataData = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { CommentWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomain;
      value: {
        nonce: number;
        deadline: unknown;
        profileId: ProfileId;
        contentURI: Url;
        profileIdPointed: ProfileId;
        pubIdPointed: unknown;
        collectModule: string;
        collectModuleInitData: string;
        referenceModuleData: string;
        referenceModule: string;
        referenceModuleInitData: string;
      };
    };
  };
};

export type CreateCommentViaDispatcherVariables = Exact<{
  request: CreatePublicCommentRequest;
}>;

export type CreateCommentViaDispatcherData = {
  result: RelayResult_RelayError_ | RelayResult_RelayerResult_;
};

export type CommentWithFirstComment = {
  __typename: 'Comment';
  firstComment: Comment | null;
} & Comment;

export type CommentsVariables = Exact<{
  observerId?: InputMaybe<Scalars['ProfileId']>;
  commentsOf: Scalars['InternalPublicationId'];
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  metadata?: InputMaybe<PublicationMetadataFilters>;
}>;

export type CommentsData = {
  result: { items: Array<CommentWithFirstComment | {}>; pageInfo: CommonPaginatedResultInfo };
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

export type MediaSet = { __typename: 'MediaSet'; original: Media };

export type MetadataOutput = {
  __typename: 'MetadataOutput';
  animatedUrl: Url | null;
  name: string | null;
  description: string | null;
  mainContentFocus: PublicationMainFocus;
  content: string | null;
  image: Url | null;
  media: Array<MediaSet>;
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
  collectPolicy: CollectPolicy;
  referencePolicy: ReferencePolicy;
  decryptionCriteria: DecryptionCriteria | null;
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

export type CommonPaginatedResultInfo = {
  __typename: 'PaginatedResultInfo';
  prev: string | null;
  next: string | null;
  totalCount: number | null;
};

export type Comment = {
  __typename: 'Comment';
  commentOn: CommentBase | MirrorBase | Post | null;
  mainPost: MirrorBase | Post;
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
  collectPolicy: CollectPolicy;
  referencePolicy: ReferencePolicy;
  decryptionCriteria: DecryptionCriteria | null;
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
}>;

export type FeedData = { result: { items: Array<FeedItem>; pageInfo: CommonPaginatedResultInfo } };

export type ExploreProfilesVariables = Exact<{
  sortCriteria: ProfileSortCriteria;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type ExploreProfilesData = {
  result: { items: Array<Profile>; pageInfo: CommonPaginatedResultInfo };
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
      value: {
        nonce: number;
        deadline: unknown;
        profileIds: Array<ProfileId>;
        datas: Array<unknown>;
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

export type CreateMirrorTypedDataVariables = Exact<{
  request: CreateMirrorRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreateMirrorTypedDataData = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { MirrorWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomain;
      value: {
        nonce: number;
        deadline: unknown;
        profileId: ProfileId;
        profileIdPointed: ProfileId;
        pubIdPointed: unknown;
        referenceModuleData: string;
        referenceModule: string;
        referenceModuleInitData: string;
      };
    };
  };
};

export type CreateMirrorViaDispatcherVariables = Exact<{
  request: CreateMirrorRequest;
}>;

export type CreateMirrorViaDispatcherData = {
  result: RelayResult_RelayError_ | RelayResult_RelayerResult_;
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
    pageInfo: CommonPaginatedResultInfo;
  };
};

export type UnreadNotificationCountVariables = Exact<{
  profileId: Scalars['ProfileId'];
  sources?: InputMaybe<Array<Scalars['Sources']> | Scalars['Sources']>;
  notificationTypes?: InputMaybe<Array<NotificationTypes> | NotificationTypes>;
}>;

export type UnreadNotificationCountData = { result: { pageInfo: { totalCount: number | null } } };

export type CreatePostTypedDataVariables = Exact<{
  request: CreatePublicPostRequest;
  options?: InputMaybe<TypedDataOptions>;
}>;

export type CreatePostTypedDataData = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { PostWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomain;
      value: {
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
  };
};

export type CreatePostViaDispatcherVariables = Exact<{
  request: CreatePublicPostRequest;
}>;

export type CreatePostViaDispatcherData = {
  result: RelayResult_RelayError_ | RelayResult_RelayerResult_;
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
      value: {
        nonce: number;
        deadline: unknown;
        profileId: ProfileId;
        dispatcher: EthereumAddress;
      };
    };
  };
};

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

export type Profile = {
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
  picture: MediaSet | NftImage | null;
  coverPicture: MediaSet | NftImage | null;
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

export type ProfilesToFollowVariables = Exact<{
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type ProfilesToFollowData = { result: Array<Profile> };

export type GetProfileVariables = Exact<{
  request: SingleProfileQueryRequest;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources?: InputMaybe<Array<Scalars['Sources']> | Scalars['Sources']>;
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
}>;

export type GetAllProfilesData = {
  result: { items: Array<Profile>; pageInfo: CommonPaginatedResultInfo };
};

export type CreateProfileVariables = Exact<{
  request: CreateProfileRequest;
}>;

export type CreateProfileData = { result: RelayResult_RelayError_ | RelayResult_RelayerResult_ };

export type MutualFollowersProfilesVariables = Exact<{
  observerId: Scalars['ProfileId'];
  viewingProfileId: Scalars['ProfileId'];
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type MutualFollowersProfilesData = {
  result: { items: Array<Profile>; pageInfo: CommonPaginatedResultInfo };
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
      value: {
        nonce: number;
        deadline: unknown;
        profileId: ProfileId;
        followModule: string;
        followModuleInitData: unknown;
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
      value: { nonce: number; deadline: unknown; profileId: ProfileId; imageURI: Url };
    };
  };
};

export type CreateSetProfileImageUriViaDispatcherVariables = Exact<{
  request: UpdateProfileImageRequest;
}>;

export type CreateSetProfileImageUriViaDispatcherData = {
  result: RelayResult_RelayError_ | RelayResult_RelayerResult_;
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
      value: { nonce: number; deadline: unknown; profileId: ProfileId; metadata: Url };
    };
  };
};

export type CreateSetProfileMetadataViaDispatcherVariables = Exact<{
  request: CreatePublicSetProfileMetadataUriRequest;
}>;

export type CreateSetProfileMetadataViaDispatcherData = {
  result: RelayResult_RelayError_ | RelayResult_RelayerResult_;
};

export type Follower = { __typename: 'Follower'; wallet: Wallet };

export type Following = { __typename: 'Following'; profile: Profile };

export type ProfileFollowersVariables = Exact<{
  profileId: Scalars['ProfileId'];
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type ProfileFollowersData = {
  result: { items: Array<Follower>; pageInfo: CommonPaginatedResultInfo };
};

export type ProfileFollowingVariables = Exact<{
  walletAddress: Scalars['EthereumAddress'];
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type ProfileFollowingData = {
  result: { items: Array<Following>; pageInfo: CommonPaginatedResultInfo };
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

export type PublicationVariables = Exact<{
  observerId?: InputMaybe<Scalars['ProfileId']>;
  publicationId: Scalars['InternalPublicationId'];
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type PublicationData = { result: Comment | Mirror | Post | null };

export type PublicationByTxHashVariables = Exact<{
  observerId?: InputMaybe<Scalars['ProfileId']>;
  txHash: Scalars['TxHash'];
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type PublicationByTxHashData = { result: CommentWithFirstComment | Mirror | Post | null };

export type HidePublicationVariables = Exact<{
  publicationId: Scalars['InternalPublicationId'];
}>;

export type HidePublicationData = { hidePublication: void | null };

export type PublicationsVariables = Exact<{
  profileId: Scalars['ProfileId'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  publicationTypes?: InputMaybe<Array<PublicationTypes> | PublicationTypes>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
  metadata?: InputMaybe<PublicationMetadataFilters>;
}>;

export type PublicationsData = {
  result: { items: Array<Comment | Mirror | Post>; pageInfo: CommonPaginatedResultInfo };
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
}>;

export type ExplorePublicationsData = {
  result: { items: Array<Comment | Mirror | Post>; pageInfo: CommonPaginatedResultInfo };
};

export type WhoCollectedPublicationVariables = Exact<{
  publicationId: Scalars['InternalPublicationId'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type WhoCollectedPublicationData = {
  result: { items: Array<Wallet>; pageInfo: CommonPaginatedResultInfo };
};

export type ProfilePublicationsForSaleVariables = Exact<{
  profileId: Scalars['ProfileId'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type ProfilePublicationsForSaleData = {
  result: { items: Array<Comment | Post>; pageInfo: CommonPaginatedResultInfo };
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
}>;

export type WhoReactedPublicationData = {
  result: { items: Array<WhoReactedResult>; pageInfo: CommonPaginatedResultInfo };
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
}>;

export type GetPublicationRevenueData = { result: PublicationRevenue | null };

export type GetProfilePublicationRevenueVariables = Exact<{
  profileId: Scalars['ProfileId'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  publicationTypes?: InputMaybe<Array<PublicationTypes> | PublicationTypes>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type GetProfilePublicationRevenueData = {
  result: { items: Array<PublicationRevenue>; pageInfo: CommonPaginatedResultInfo };
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
}>;

export type SearchPublicationsData = {
  result:
    | {
        __typename: 'PublicationSearchResult';
        items: Array<Comment | Post>;
        pageInfo: CommonPaginatedResultInfo;
      }
    | {};
};

export type SearchProfilesVariables = Exact<{
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  query: Scalars['Search'];
  observerId?: InputMaybe<Scalars['ProfileId']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type SearchProfilesData = {
  result:
    | {
        __typename: 'ProfileSearchResult';
        items: Array<Profile>;
        pageInfo: CommonPaginatedResultInfo;
      }
    | {};
};

export type RelayerResult = { __typename: 'RelayerResult'; txHash: string; txId: string };

export type RelayError = { __typename: 'RelayError'; reason: RelayErrorReasons };

type RelayResult_RelayError_ = RelayError;

type RelayResult_RelayerResult_ = RelayerResult;

export type RelayResult = RelayResult_RelayError_ | RelayResult_RelayerResult_;

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

export type BroadcastProtocolCallVariables = Exact<{
  request: BroadcastRequest;
}>;

export type BroadcastProtocolCallData = {
  result: RelayResult_RelayError_ | RelayResult_RelayerResult_;
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
      value: { nonce: number; deadline: unknown; tokenId: string };
    };
  };
};

export type WalletCollectedPublicationsVariables = Exact<{
  observerId?: InputMaybe<Scalars['ProfileId']>;
  walletAddress: Scalars['EthereumAddress'];
  limit: Scalars['LimitScalar'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  sources: Array<Scalars['Sources']> | Scalars['Sources'];
}>;

export type WalletCollectedPublicationsData = {
  result: { items: Array<Comment | Mirror | Post>; pageInfo: CommonPaginatedResultInfo };
};
