import gql from 'graphql-tag';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
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
  /** collect module data scalar type */
  CollectModuleData: unknown;
  /** ContentEncryptionKey scalar type */
  ContentEncryptionKey: unknown;
  /** Contract address custom scalar type */
  ContractAddress: string;
  /** create handle custom scalar type */
  CreateHandle: unknown;
  /** Cursor custom scalar type */
  Cursor: string;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string;
  /** EncryptedValue custom scalar type */
  EncryptedValueScalar: unknown;
  /** Ens custom scalar type */
  Ens: unknown;
  /** Ethereum address custom scalar type */
  EthereumAddress: string;
  /** follow module data scalar type */
  FollowModuleData: unknown;
  /** handle custom scalar type */
  Handle: string;
  /** handle claim id custom scalar type */
  HandleClaimIdScalar: unknown;
  /** IfpsCid scalar type */
  IfpsCid: unknown;
  /** Internal publication id custom scalar type */
  InternalPublicationId: string;
  /** jwt custom scalar type */
  Jwt: string;
  /** limit custom scalar type */
  LimitScalar: number;
  /** Locale scalar type */
  Locale: unknown;
  /** Markdown scalar type */
  Markdown: string;
  /** mimetype custom scalar type */
  MimeType: string;
  /** Nft ownership id type */
  NftOwnershipId: string;
  /** Nonce custom scalar type */
  Nonce: number;
  /** The notification id */
  NotificationId: string;
  /** ProfileId custom scalar type */
  ProfileId: string;
  /** ProfileInterest custom scalar type */
  ProfileInterest: unknown;
  /** proxy action scalar id type */
  ProxyActionId: string;
  /** Publication id custom scalar type */
  PublicationId: unknown;
  /** The publication tag */
  PublicationTag: unknown;
  /** Publication url scalar type */
  PublicationUrl: unknown;
  /** The reaction id */
  ReactionId: unknown;
  /** reference module data scalar type */
  ReferenceModuleData: unknown;
  /** Query search */
  Search: unknown;
  /** Relayer signature */
  Signature: string;
  /** Sources custom scalar type */
  Sources: unknown;
  /** timestamp date custom scalar type */
  TimestampScalar: unknown;
  /** The NFT token id */
  TokenId: unknown;
  /** The tx hash */
  TxHash: string;
  /** The tx id */
  TxId: string;
  /** UnixTimestamp custom scalar type */
  UnixTimestamp: unknown;
  /** Url scalar type */
  Url: string;
  /** Represents NULL values */
  Void: string;
};

/** The access conditions for the publication */
export type AccessConditionInput = {
  /** NFT ownership condition */
  nft?: Maybe<NftOwnershipInput>;
  /** ERC20 token ownership condition */
  token?: Maybe<Erc20OwnershipInput>;
  /** EOA ownership condition */
  eoa?: Maybe<EoaOwnershipInput>;
  /** Profile ownership condition */
  profile?: Maybe<ProfileOwnershipInput>;
  /** Profile follow condition */
  follow?: Maybe<FollowConditionInput>;
  /** Profile follow condition */
  collect?: Maybe<CollectConditionInput>;
  /** AND condition */
  and?: Maybe<AndConditionInput>;
  /** OR condition */
  or?: Maybe<OrConditionInput>;
};

/** The access conditions for the publication */
export type AccessConditionOutput = {
  __typename: 'AccessConditionOutput';
  /** NFT ownership condition */
  nft: Maybe<NftOwnershipOutput>;
  /** ERC20 token ownership condition */
  token: Maybe<Erc20OwnershipOutput>;
  /** EOA ownership condition */
  eoa: Maybe<EoaOwnershipOutput>;
  /** Profile ownership condition */
  profile: Maybe<ProfileOwnershipOutput>;
  /** Profile follow condition */
  follow: Maybe<FollowConditionOutput>;
  /** Profile follow condition */
  collect: Maybe<CollectConditionOutput>;
  /** AND condition */
  and: Maybe<AndConditionOutput>;
  /** OR condition */
  or: Maybe<OrConditionOutput>;
};

export type AchRequest = {
  secret: Scalars['String'];
  ethereumAddress: Scalars['EthereumAddress'];
  handle?: Maybe<Scalars['CreateHandle']>;
  freeTextHandle?: Maybe<Scalars['Boolean']>;
  overrideTradeMark: Scalars['Boolean'];
  overrideAlreadyClaimed: Scalars['Boolean'];
};

/** The request object to add interests to a profile */
export type AddProfileInterestsRequest = {
  /** The profile interest to add */
  interests: Array<Scalars['ProfileInterest']>;
  /** The profileId to add interests to */
  profileId: Scalars['ProfileId'];
};

export type AllPublicationsTagsRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  sort: TagSortCriteria;
  /** The App Id */
  source?: Maybe<Scalars['Sources']>;
};

export type AndConditionInput = {
  /** The list of conditions to apply AND to. You can only use nested boolean conditions at the root level. */
  criteria: Array<AccessConditionInput>;
};

export type AndConditionOutput = {
  __typename: 'AndConditionOutput';
  /** The list of conditions to apply AND to. You can only use nested boolean conditions at the root level. */
  criteria: Array<AccessConditionOutput>;
};

export type ApprovedAllowanceAmount = {
  __typename: 'ApprovedAllowanceAmount';
  currency: Scalars['ContractAddress'];
  module: Scalars['String'];
  contractAddress: Scalars['ContractAddress'];
  allowance: Scalars['String'];
};

export type ApprovedModuleAllowanceAmountRequest = {
  /** The contract addresses for the module approved currencies you want to find information on about the user */
  currencies: Array<Scalars['ContractAddress']>;
  collectModules?: Maybe<Array<CollectModules>>;
  unknownCollectModules?: Maybe<Array<Scalars['ContractAddress']>>;
  followModules?: Maybe<Array<FollowModules>>;
  unknownFollowModules?: Maybe<Array<Scalars['ContractAddress']>>;
  referenceModules?: Maybe<Array<ReferenceModules>>;
  unknownReferenceModules?: Maybe<Array<Scalars['ContractAddress']>>;
};

/** The Profile */
export type Attribute = {
  __typename: 'Attribute';
  /** The display type */
  displayType: Maybe<Scalars['String']>;
  /** The trait type - can be anything its the name it will render so include spaces */
  traitType: Maybe<Scalars['String']>;
  /** identifier of this attribute, we will update by this id  */
  key: Scalars['String'];
  /** Value attribute */
  value: Scalars['String'];
};

/** The auth challenge result */
export type AuthChallengeResult = {
  __typename: 'AuthChallengeResult';
  /** The text to sign */
  text: Scalars['String'];
};

/** The authentication result */
export type AuthenticationResult = {
  __typename: 'AuthenticationResult';
  /** The access token */
  accessToken: Scalars['Jwt'];
  /** The refresh token */
  refreshToken: Scalars['Jwt'];
};

export type BroadcastRequest = {
  id: Scalars['BroadcastId'];
  signature: Scalars['Signature'];
};

export type BurnProfileRequest = {
  profileId: Scalars['ProfileId'];
};

export type CanCommentResponse = {
  __typename: 'CanCommentResponse';
  result: Scalars['Boolean'];
};

export type CanDecryptResponse = {
  __typename: 'CanDecryptResponse';
  result: Scalars['Boolean'];
  reasons: Maybe<Array<DecryptFailReason>>;
};

export type CanMirrorResponse = {
  __typename: 'CanMirrorResponse';
  result: Scalars['Boolean'];
};

/** The challenge request */
export type ChallengeRequest = {
  /** The ethereum address you want to login with */
  address: Scalars['EthereumAddress'];
};

export type ClaimHandleRequest = {
  id?: Maybe<Scalars['HandleClaimIdScalar']>;
  freeTextHandle?: Maybe<Scalars['CreateHandle']>;
  /** The follow module */
  followModule?: Maybe<FollowModuleParams>;
};

/** The claim status */
export enum ClaimStatus {
  AlreadyClaimed = 'ALREADY_CLAIMED',
  ClaimFailed = 'CLAIM_FAILED',
  NotClaimed = 'NOT_CLAIMED',
}

export type ClaimableHandles = {
  __typename: 'ClaimableHandles';
  reservedHandles: Array<ReservedClaimableHandle>;
  canClaimFreeTextHandle: Scalars['Boolean'];
};

/** Condition that signifies if address or profile has collected a publication */
export type CollectConditionInput = {
  /** The publication id that has to be collected to unlock content */
  publicationId?: Maybe<Scalars['InternalPublicationId']>;
  /** True if the content will be unlocked for this specific publication */
  thisPublication?: Maybe<Scalars['Boolean']>;
};

/** Condition that signifies if address or profile has collected a publication */
export type CollectConditionOutput = {
  __typename: 'CollectConditionOutput';
  /** The publication id that has to be collected to unlock content */
  publicationId: Maybe<Scalars['InternalPublicationId']>;
  /** True if the content will be unlocked for this specific publication */
  thisPublication: Maybe<Scalars['Boolean']>;
};

export type CollectModule =
  | FreeCollectModuleSettings
  | FeeCollectModuleSettings
  | LimitedFeeCollectModuleSettings
  | LimitedTimedFeeCollectModuleSettings
  | RevertCollectModuleSettings
  | TimedFeeCollectModuleSettings
  | UnknownCollectModuleSettings;

export type CollectModuleParams = {
  /** The collect empty collect module */
  freeCollectModule?: Maybe<FreeCollectModuleParams>;
  /** The collect revert collect module */
  revertCollectModule?: Maybe<Scalars['Boolean']>;
  /** The collect fee collect module */
  feeCollectModule?: Maybe<FeeCollectModuleParams>;
  /** The collect limited fee collect module */
  limitedFeeCollectModule?: Maybe<LimitedFeeCollectModuleParams>;
  /** The collect limited timed fee collect module */
  limitedTimedFeeCollectModule?: Maybe<LimitedTimedFeeCollectModuleParams>;
  /** The collect timed fee collect module */
  timedFeeCollectModule?: Maybe<TimedFeeCollectModuleParams>;
  /** A unknown collect module */
  unknownCollectModule?: Maybe<UnknownCollectModuleParams>;
};

/** The collect module types */
export enum CollectModules {
  LimitedFeeCollectModule = 'LimitedFeeCollectModule',
  FeeCollectModule = 'FeeCollectModule',
  LimitedTimedFeeCollectModule = 'LimitedTimedFeeCollectModule',
  TimedFeeCollectModule = 'TimedFeeCollectModule',
  RevertCollectModule = 'RevertCollectModule',
  FreeCollectModule = 'FreeCollectModule',
  UnknownCollectModule = 'UnknownCollectModule',
}

export type CollectProxyAction = {
  freeCollect?: Maybe<FreeCollectProxyAction>;
};

export type CollectedEvent = {
  __typename: 'CollectedEvent';
  profile: Profile;
  timestamp: Scalars['DateTime'];
};

/** The social comment */
export type Comment = {
  __typename: 'Comment';
  /** ID of the source */
  appId: Maybe<Scalars['Sources']>;
  canComment: CanCommentResponse;
  canDecrypt: CanDecryptResponse;
  canMirror: CanMirrorResponse;
  /** The collect module */
  collectModule: CollectModule;
  /** The contract address for the collect nft.. if its null it means nobody collected yet as it lazy deployed */
  collectNftAddress: Maybe<Scalars['ContractAddress']>;
  /** Who collected it, this is used for timeline results and like this for better caching for the client */
  collectedBy: Maybe<Wallet>;
  /** Which comment this points to if its null the pointer too deep so do another query to find it out */
  commentOn: Maybe<Publication>;
  /** The date the post was created on */
  createdAt: Scalars['DateTime'];
  dataAvailabilityProofs: Maybe<Scalars['String']>;
  /** This will bring back the first comment of a comment and only be defined if using `publication` query and `commentOf` */
  firstComment: Maybe<Comment>;
  hasCollectedByMe: Scalars['Boolean'];
  hasOptimisticCollectedByMe: Scalars['Boolean'];
  /** If the publication has been hidden if it has then the content and media is not available */
  hidden: Scalars['Boolean'];
  /** The internal publication id */
  id: Scalars['InternalPublicationId'];
  /** Indicates if the publication is data availability post */
  isDataAvailability: Scalars['Boolean'];
  /** Indicates if the publication is gated behind some access criteria */
  isGated: Scalars['Boolean'];
  isOptimisticMirroredByMe: Scalars['Boolean'];
  /** The top level post/mirror this comment lives on */
  mainPost: MainPostReference;
  /** The metadata for the post */
  metadata: MetadataOutput;
  mirrors: Array<Scalars['InternalPublicationId']>;
  /** The on chain content uri could be `ipfs://` or `https` */
  onChainContentURI: Scalars['String'];
  ownedByMe: Scalars['Boolean'];
  /** The profile ref */
  profile: Profile;
  reaction: Maybe<ReactionTypes>;
  /** The reference module */
  referenceModule: Maybe<ReferenceModule>;
  /** The publication stats */
  stats: PublicationStats;
};

/** The social comment */
export type CommentCanCommentArgs = {
  profileId?: Maybe<Scalars['ProfileId']>;
};

/** The social comment */
export type CommentCanDecryptArgs = {
  profileId?: Maybe<Scalars['ProfileId']>;
  address?: Maybe<Scalars['EthereumAddress']>;
};

/** The social comment */
export type CommentCanMirrorArgs = {
  profileId?: Maybe<Scalars['ProfileId']>;
};

/** The social comment */
export type CommentHasCollectedByMeArgs = {
  isFinalisedOnChain?: Maybe<Scalars['Boolean']>;
};

/** The social comment */
export type CommentMirrorsArgs = {
  by?: Maybe<Scalars['ProfileId']>;
};

/** The social comment */
export type CommentReactionArgs = {
  request?: Maybe<ReactionFieldResolverRequest>;
};

/** The gated publication access criteria contract types */
export enum ContractType {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
  Erc20 = 'ERC20',
}

/** The create burn eip 712 typed data */
export type CreateBurnEip712TypedData = {
  __typename: 'CreateBurnEIP712TypedData';
  /** The types */
  types: CreateBurnEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateBurnEip712TypedDataValue;
};

/** The create burn eip 712 typed data types */
export type CreateBurnEip712TypedDataTypes = {
  __typename: 'CreateBurnEIP712TypedDataTypes';
  BurnWithSig: Array<Eip712TypedDataField>;
};

/** The create burn eip 712 typed data value */
export type CreateBurnEip712TypedDataValue = {
  __typename: 'CreateBurnEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  tokenId: Scalars['String'];
};

/** The broadcast item */
export type CreateBurnProfileBroadcastItemResult = {
  __typename: 'CreateBurnProfileBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateBurnEip712TypedData;
};

/** The broadcast item */
export type CreateCollectBroadcastItemResult = {
  __typename: 'CreateCollectBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateCollectEip712TypedData;
};

/** The collect eip 712 typed data */
export type CreateCollectEip712TypedData = {
  __typename: 'CreateCollectEIP712TypedData';
  /** The types */
  types: CreateCollectEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateCollectEip712TypedDataValue;
};

/** The collect eip 712 typed data types */
export type CreateCollectEip712TypedDataTypes = {
  __typename: 'CreateCollectEIP712TypedDataTypes';
  CollectWithSig: Array<Eip712TypedDataField>;
};

/** The collect eip 712 typed data value */
export type CreateCollectEip712TypedDataValue = {
  __typename: 'CreateCollectEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileId: Scalars['ProfileId'];
  pubId: Scalars['PublicationId'];
  data: Scalars['BlockchainData'];
};

export type CreateCollectRequest = {
  publicationId: Scalars['InternalPublicationId'];
  /** The encoded data to collect with if using an unknown module */
  unknownModuleData?: Maybe<Scalars['BlockchainData']>;
};

/** The broadcast item */
export type CreateCommentBroadcastItemResult = {
  __typename: 'CreateCommentBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateCommentEip712TypedData;
};

/** The create comment eip 712 typed data */
export type CreateCommentEip712TypedData = {
  __typename: 'CreateCommentEIP712TypedData';
  /** The types */
  types: CreateCommentEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateCommentEip712TypedDataValue;
};

/** The create comment eip 712 typed data types */
export type CreateCommentEip712TypedDataTypes = {
  __typename: 'CreateCommentEIP712TypedDataTypes';
  CommentWithSig: Array<Eip712TypedDataField>;
};

/** The create comment eip 712 typed data value */
export type CreateCommentEip712TypedDataValue = {
  __typename: 'CreateCommentEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileId: Scalars['ProfileId'];
  contentURI: Scalars['PublicationUrl'];
  profileIdPointed: Scalars['ProfileId'];
  pubIdPointed: Scalars['PublicationId'];
  collectModule: Scalars['ContractAddress'];
  collectModuleInitData: Scalars['CollectModuleData'];
  referenceModule: Scalars['ContractAddress'];
  referenceModuleInitData: Scalars['ReferenceModuleData'];
  referenceModuleData: Scalars['ReferenceModuleData'];
};

/** The broadcast item */
export type CreateFollowBroadcastItemResult = {
  __typename: 'CreateFollowBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateFollowEip712TypedData;
};

/** The create follow eip 712 typed data */
export type CreateFollowEip712TypedData = {
  __typename: 'CreateFollowEIP712TypedData';
  /** The types */
  types: CreateFollowEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateFollowEip712TypedDataValue;
};

/** The create follow eip 712 typed data types */
export type CreateFollowEip712TypedDataTypes = {
  __typename: 'CreateFollowEIP712TypedDataTypes';
  FollowWithSig: Array<Eip712TypedDataField>;
};

/** The create follow eip 712 typed data value */
export type CreateFollowEip712TypedDataValue = {
  __typename: 'CreateFollowEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileIds: Array<Scalars['ProfileId']>;
  datas: Array<Scalars['BlockchainData']>;
};

/** The broadcast item */
export type CreateMirrorBroadcastItemResult = {
  __typename: 'CreateMirrorBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateMirrorEip712TypedData;
};

/** The mirror eip 712 typed data */
export type CreateMirrorEip712TypedData = {
  __typename: 'CreateMirrorEIP712TypedData';
  /** The types */
  types: CreateMirrorEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateMirrorEip712TypedDataValue;
};

/** The mirror eip 712 typed data types */
export type CreateMirrorEip712TypedDataTypes = {
  __typename: 'CreateMirrorEIP712TypedDataTypes';
  MirrorWithSig: Array<Eip712TypedDataField>;
};

/** The mirror eip 712 typed data value */
export type CreateMirrorEip712TypedDataValue = {
  __typename: 'CreateMirrorEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileId: Scalars['ProfileId'];
  profileIdPointed: Scalars['ProfileId'];
  pubIdPointed: Scalars['PublicationId'];
  referenceModuleData: Scalars['ReferenceModuleData'];
  referenceModule: Scalars['ContractAddress'];
  referenceModuleInitData: Scalars['ReferenceModuleData'];
};

export type CreateMirrorRequest = {
  /** Profile id */
  profileId: Scalars['ProfileId'];
  /** Publication id of what you want to mirror on remember if this is a comment it will be that as the id */
  publicationId: Scalars['InternalPublicationId'];
  /** The reference module info */
  referenceModule?: Maybe<ReferenceModuleParams>;
};

/** The broadcast item */
export type CreatePostBroadcastItemResult = {
  __typename: 'CreatePostBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreatePostEip712TypedData;
};

/** The create post eip 712 typed data */
export type CreatePostEip712TypedData = {
  __typename: 'CreatePostEIP712TypedData';
  /** The types */
  types: CreatePostEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreatePostEip712TypedDataValue;
};

/** The create post eip 712 typed data types */
export type CreatePostEip712TypedDataTypes = {
  __typename: 'CreatePostEIP712TypedDataTypes';
  PostWithSig: Array<Eip712TypedDataField>;
};

/** The create post eip 712 typed data value */
export type CreatePostEip712TypedDataValue = {
  __typename: 'CreatePostEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileId: Scalars['ProfileId'];
  contentURI: Scalars['PublicationUrl'];
  collectModule: Scalars['ContractAddress'];
  collectModuleInitData: Scalars['CollectModuleData'];
  referenceModule: Scalars['ContractAddress'];
  referenceModuleInitData: Scalars['ReferenceModuleData'];
};

export type CreatePublicCommentRequest = {
  /** Profile id */
  profileId: Scalars['ProfileId'];
  /** Publication id of what your comments on remember if this is a comment you commented on it will be that as the id */
  publicationId: Scalars['InternalPublicationId'];
  /** The metadata uploaded somewhere passing in the url to reach it */
  contentURI: Scalars['Url'];
  /** The collect module */
  collectModule: CollectModuleParams;
  /** The reference module */
  referenceModule?: Maybe<ReferenceModuleParams>;
  /** The criteria to access the publication data */
  gated?: Maybe<GatedPublicationParamsInput>;
};

export type CreatePublicPostRequest = {
  /** Profile id */
  profileId: Scalars['ProfileId'];
  /** The metadata uploaded somewhere passing in the url to reach it */
  contentURI: Scalars['Url'];
  /** The collect module */
  collectModule: CollectModuleParams;
  /** The reference module */
  referenceModule?: Maybe<ReferenceModuleParams>;
  /** The criteria to access the publication data */
  gated?: Maybe<GatedPublicationParamsInput>;
};

export type CreatePublicSetProfileMetadataUriRequest = {
  /** Profile id */
  profileId: Scalars['ProfileId'];
  /** The metadata uploaded somewhere passing in the url to reach it */
  metadata: Scalars['Url'];
};

export type CreateSetDefaultProfileRequest = {
  /** Profile id */
  profileId: Scalars['ProfileId'];
};

/** The broadcast item */
export type CreateSetDispatcherBroadcastItemResult = {
  __typename: 'CreateSetDispatcherBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateSetDispatcherEip712TypedData;
};

/** The set dispatcher eip 712 typed data */
export type CreateSetDispatcherEip712TypedData = {
  __typename: 'CreateSetDispatcherEIP712TypedData';
  /** The types */
  types: CreateSetDispatcherEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateSetDispatcherEip712TypedDataValue;
};

/** The set dispatcher eip 712 typed data types */
export type CreateSetDispatcherEip712TypedDataTypes = {
  __typename: 'CreateSetDispatcherEIP712TypedDataTypes';
  SetDispatcherWithSig: Array<Eip712TypedDataField>;
};

/** The set dispatcher eip 712 typed data value */
export type CreateSetDispatcherEip712TypedDataValue = {
  __typename: 'CreateSetDispatcherEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileId: Scalars['ProfileId'];
  dispatcher: Scalars['EthereumAddress'];
};

/** The broadcast item */
export type CreateSetFollowModuleBroadcastItemResult = {
  __typename: 'CreateSetFollowModuleBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateSetFollowModuleEip712TypedData;
};

/** The set follow module eip 712 typed data */
export type CreateSetFollowModuleEip712TypedData = {
  __typename: 'CreateSetFollowModuleEIP712TypedData';
  /** The types */
  types: CreateSetFollowModuleEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateSetFollowModuleEip712TypedDataValue;
};

/** The set follow module eip 712 typed data types */
export type CreateSetFollowModuleEip712TypedDataTypes = {
  __typename: 'CreateSetFollowModuleEIP712TypedDataTypes';
  SetFollowModuleWithSig: Array<Eip712TypedDataField>;
};

/** The set follow module eip 712 typed data value */
export type CreateSetFollowModuleEip712TypedDataValue = {
  __typename: 'CreateSetFollowModuleEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileId: Scalars['ProfileId'];
  followModule: Scalars['ContractAddress'];
  followModuleInitData: Scalars['FollowModuleData'];
};

export type CreateSetFollowModuleRequest = {
  profileId: Scalars['ProfileId'];
  /** The follow module info */
  followModule: FollowModuleParams;
};

/** The broadcast item */
export type CreateSetFollowNftUriBroadcastItemResult = {
  __typename: 'CreateSetFollowNFTUriBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateSetFollowNftUriEip712TypedData;
};

/** The set follow nft uri eip 712 typed data */
export type CreateSetFollowNftUriEip712TypedData = {
  __typename: 'CreateSetFollowNFTUriEIP712TypedData';
  /** The types */
  types: CreateSetFollowNftUriEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateSetFollowNftUriEip712TypedDataValue;
};

/** The set follow nft uri eip 712 typed data types */
export type CreateSetFollowNftUriEip712TypedDataTypes = {
  __typename: 'CreateSetFollowNFTUriEIP712TypedDataTypes';
  SetFollowNFTURIWithSig: Array<Eip712TypedDataField>;
};

/** The set follow nft uri eip 712 typed data value */
export type CreateSetFollowNftUriEip712TypedDataValue = {
  __typename: 'CreateSetFollowNFTUriEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileId: Scalars['ProfileId'];
  followNFTURI: Scalars['Url'];
};

export type CreateSetFollowNftUriRequest = {
  profileId: Scalars['ProfileId'];
  /** The follow NFT URI is the NFT metadata your followers will mint when they follow you. This can be updated at all times. If you do not pass in anything it will create a super cool changing NFT which will show the last publication of your profile as the NFT which looks awesome! This means people do not have to worry about writing this logic but still have the ability to customise it for their followers */
  followNFTURI?: Maybe<Scalars['Url']>;
};

/** The broadcast item */
export type CreateSetProfileImageUriBroadcastItemResult = {
  __typename: 'CreateSetProfileImageUriBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateSetProfileImageUriEip712TypedData;
};

/** The set profile uri eip 712 typed data */
export type CreateSetProfileImageUriEip712TypedData = {
  __typename: 'CreateSetProfileImageUriEIP712TypedData';
  /** The types */
  types: CreateSetProfileImageUriEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateSetProfileImageUriEip712TypedDataValue;
};

/** The set profile image uri eip 712 typed data types */
export type CreateSetProfileImageUriEip712TypedDataTypes = {
  __typename: 'CreateSetProfileImageUriEIP712TypedDataTypes';
  SetProfileImageURIWithSig: Array<Eip712TypedDataField>;
};

/** The set profile uri eip 712 typed data value */
export type CreateSetProfileImageUriEip712TypedDataValue = {
  __typename: 'CreateSetProfileImageUriEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileId: Scalars['ProfileId'];
  imageURI: Scalars['Url'];
};

/** The broadcast item */
export type CreateSetProfileMetadataUriBroadcastItemResult = {
  __typename: 'CreateSetProfileMetadataURIBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateSetProfileMetadataUrieip712TypedData;
};

/** The set follow nft uri eip 712 typed data */
export type CreateSetProfileMetadataUrieip712TypedData = {
  __typename: 'CreateSetProfileMetadataURIEIP712TypedData';
  /** The types */
  types: CreateSetProfileMetadataUrieip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateSetProfileMetadataUrieip712TypedDataValue;
};

/** The set follow nft uri eip 712 typed data types */
export type CreateSetProfileMetadataUrieip712TypedDataTypes = {
  __typename: 'CreateSetProfileMetadataURIEIP712TypedDataTypes';
  SetProfileMetadataURIWithSig: Array<Eip712TypedDataField>;
};

/** The set follow nft uri eip 712 typed data value */
export type CreateSetProfileMetadataUrieip712TypedDataValue = {
  __typename: 'CreateSetProfileMetadataURIEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileId: Scalars['ProfileId'];
  metadata: Scalars['Url'];
};

/** The broadcast item */
export type CreateToggleFollowBroadcastItemResult = {
  __typename: 'CreateToggleFollowBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateToggleFollowEip712TypedData;
};

/** The create toggle follows eip 712 typed data */
export type CreateToggleFollowEip712TypedData = {
  __typename: 'CreateToggleFollowEIP712TypedData';
  /** The types */
  types: CreateToggleFollowEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: CreateToggleFollowEip712TypedDataValue;
};

/** The create toggle follows eip 712 typed data types */
export type CreateToggleFollowEip712TypedDataTypes = {
  __typename: 'CreateToggleFollowEIP712TypedDataTypes';
  ToggleFollowWithSig: Array<Eip712TypedDataField>;
};

/** The create toggle follow eip 712 typed data value */
export type CreateToggleFollowEip712TypedDataValue = {
  __typename: 'CreateToggleFollowEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  profileIds: Array<Scalars['ProfileId']>;
  enables: Array<Scalars['Boolean']>;
};

export type CreateToggleFollowRequest = {
  profileIds: Array<Scalars['ProfileId']>;
  enables: Array<Scalars['Boolean']>;
};

/** The broadcast item */
export type CreateUnfollowBroadcastItemResult = {
  __typename: 'CreateUnfollowBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: CreateBurnEip712TypedData;
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
  UnauthorizedAddress = 'UNAUTHORIZED_ADDRESS',
  DoesNotOwnNft = 'DOES_NOT_OWN_NFT',
  DoesNotOwnProfile = 'DOES_NOT_OWN_PROFILE',
  DoesNotFollowProfile = 'DOES_NOT_FOLLOW_PROFILE',
  HasNotCollectedPublication = 'HAS_NOT_COLLECTED_PUBLICATION',
  UnauthorizedBalance = 'UNAUTHORIZED_BALANCE',
  ProfileDoesNotExist = 'PROFILE_DOES_NOT_EXIST',
  MissingEncryptionParams = 'MISSING_ENCRYPTION_PARAMS',
  FollowNotFinalisedOnChain = 'FOLLOW_NOT_FINALISED_ON_CHAIN',
  CollectNotFinalisedOnChain = 'COLLECT_NOT_FINALISED_ON_CHAIN',
}

export type DefaultProfileRequest = {
  ethereumAddress: Scalars['EthereumAddress'];
};

export type DegreesOfSeparationReferenceModuleParams = {
  /** Applied to comments */
  commentsRestricted: Scalars['Boolean'];
  /** Applied to mirrors */
  mirrorsRestricted: Scalars['Boolean'];
  /** Degrees of separation */
  degreesOfSeparation: Scalars['Int'];
};

export type DegreesOfSeparationReferenceModuleSettings = {
  __typename: 'DegreesOfSeparationReferenceModuleSettings';
  /** The reference modules enum */
  type: ReferenceModules;
  contractAddress: Scalars['ContractAddress'];
  /** Applied to comments */
  commentsRestricted: Scalars['Boolean'];
  /** Applied to mirrors */
  mirrorsRestricted: Scalars['Boolean'];
  /** Degrees of separation */
  degreesOfSeparation: Scalars['Int'];
};

/** The dispatcher */
export type Dispatcher = {
  __typename: 'Dispatcher';
  /** The dispatcher address */
  address: Scalars['EthereumAddress'];
  /** If the dispatcher can use the relay */
  canUseRelay: Scalars['Boolean'];
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

/** The does follow response */
export type DoesFollowResponse = {
  __typename: 'DoesFollowResponse';
  /** The follower address remember wallets follow profiles */
  followerAddress: Scalars['EthereumAddress'];
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** If the user does follow */
  follows: Scalars['Boolean'];
  /** Is finalised on-chain */
  isFinalisedOnChain: Scalars['Boolean'];
};

/** The eip 712 typed data domain */
export type Eip712TypedDataDomain = {
  __typename: 'EIP712TypedDataDomain';
  /** The name of the typed data domain */
  name: Scalars['String'];
  /** The chainId */
  chainId: Scalars['ChainId'];
  /** The version */
  version: Scalars['String'];
  /** The verifying contract */
  verifyingContract: Scalars['ContractAddress'];
};

/** The eip 712 typed data field */
export type Eip712TypedDataField = {
  __typename: 'EIP712TypedDataField';
  /** The name of the typed data field */
  name: Scalars['String'];
  /** The type of the typed data field */
  type: Scalars['String'];
};

export type ElectedMirror = {
  __typename: 'ElectedMirror';
  mirrorId: Scalars['InternalPublicationId'];
  profile: Profile;
  timestamp: Scalars['DateTime'];
};

export type EnabledModule = {
  __typename: 'EnabledModule';
  moduleName: Scalars['String'];
  contractAddress: Scalars['ContractAddress'];
  inputParams: Array<ModuleInfo>;
  redeemParams: Array<ModuleInfo>;
  returnDataParms: Array<ModuleInfo>;
};

/** The enabled modules */
export type EnabledModules = {
  __typename: 'EnabledModules';
  collectModules: Array<EnabledModule>;
  followModules: Array<EnabledModule>;
  referenceModules: Array<EnabledModule>;
};

/** The encrypted fields */
export type EncryptedFieldsOutput = {
  __typename: 'EncryptedFieldsOutput';
  /** The encrypted content field */
  content: Maybe<Scalars['EncryptedValueScalar']>;
  /** The encrypted image field */
  image: Maybe<Scalars['EncryptedValueScalar']>;
  /** The encrypted media field */
  media: Maybe<Array<EncryptedMediaSet>>;
  /** The encrypted animation_url field */
  animation_url: Maybe<Scalars['EncryptedValueScalar']>;
  /** The encrypted external_url field */
  external_url: Maybe<Scalars['EncryptedValueScalar']>;
};

/** The Encrypted Media url and metadata */
export type EncryptedMedia = {
  __typename: 'EncryptedMedia';
  /** The encrypted value for the URL */
  url: Scalars['Url'];
  /** Width - will always be null on the public API */
  width: Maybe<Scalars['Int']>;
  /** Height - will always be null on the public API */
  height: Maybe<Scalars['Int']>;
  /** Size - will always be null on the public API */
  size: Maybe<Scalars['Int']>;
  /** The image/audio/video mime type for the publication */
  mimeType: Maybe<Scalars['MimeType']>;
  /** The encrypted alt tags for accessibility */
  altTag: Maybe<Scalars['EncryptedValueScalar']>;
  /** The encrypted cover for any video or audio you attached */
  cover: Maybe<Scalars['EncryptedValueScalar']>;
};

/** The encrypted media set */
export type EncryptedMediaSet = {
  __typename: 'EncryptedMediaSet';
  /** Original media */
  original: EncryptedMedia;
  /**
   * Small media - will always be null on the public API
   * @deprecated should not be used will always be null
   */
  small: Maybe<EncryptedMedia>;
  /**
   * Medium media - will always be null on the public API
   * @deprecated should not be used will always be null
   */
  medium: Maybe<EncryptedMedia>;
};

/** The metadata encryption params */
export type EncryptionParamsOutput = {
  __typename: 'EncryptionParamsOutput';
  /** The provider-specific encryption params */
  providerSpecificParams: ProviderSpecificParamsOutput;
  /** The encryption provider */
  encryptionProvider: EncryptionProvider;
  /** The access conditions */
  accessCondition: AccessConditionOutput;
  /** The encrypted fields */
  encryptedFields: EncryptedFieldsOutput;
};

/** The gated publication encryption provider */
export enum EncryptionProvider {
  LitProtocol = 'LIT_PROTOCOL',
}

export type EnsOnChainIdentity = {
  __typename: 'EnsOnChainIdentity';
  /** The default ens mapped to this address */
  name: Maybe<Scalars['Ens']>;
};

export type EoaOwnershipInput = {
  /** The address that will have access to the content */
  address: Scalars['EthereumAddress'];
};

export type EoaOwnershipOutput = {
  __typename: 'EoaOwnershipOutput';
  /** The address that will have access to the content */
  address: Scalars['EthereumAddress'];
};

/** The erc20 type */
export type Erc20 = {
  __typename: 'Erc20';
  /** Name of the symbol */
  name: Scalars['String'];
  /** Symbol for the token */
  symbol: Scalars['String'];
  /** Decimal places for the token */
  decimals: Scalars['Int'];
  /** The erc20 address */
  address: Scalars['ContractAddress'];
};

export type Erc20Amount = {
  __typename: 'Erc20Amount';
  /** The erc20 token info */
  asset: Erc20;
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String'];
};

export type Erc20OwnershipInput = {
  /** The ERC20 token's ethereum address */
  contractAddress: Scalars['ContractAddress'];
  /** The amount of tokens required to access the content */
  chainID: Scalars['ChainId'];
  /** The amount of tokens required to access the content */
  amount: Scalars['String'];
  /** The amount of decimals of the ERC20 contract */
  decimals: Scalars['Float'];
  /** The operator to use when comparing the amount of tokens */
  condition: ScalarOperator;
};

export type Erc20OwnershipOutput = {
  __typename: 'Erc20OwnershipOutput';
  /** The ERC20 token's ethereum address */
  contractAddress: Scalars['ContractAddress'];
  /** The amount of tokens required to access the content */
  chainID: Scalars['ChainId'];
  /** The amount of tokens required to access the content */
  amount: Scalars['String'];
  /** The amount of decimals of the ERC20 contract */
  decimals: Scalars['Float'];
  /** The operator to use when comparing the amount of tokens */
  condition: ScalarOperator;
};

/** The paginated publication result */
export type ExploreProfileResult = {
  __typename: 'ExploreProfileResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
};

export type ExploreProfilesRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  timestamp?: Maybe<Scalars['TimestampScalar']>;
  sortCriteria: ProfileSortCriteria;
  customFilters?: Maybe<Array<CustomFiltersTypes>>;
};

export type ExplorePublicationRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  timestamp?: Maybe<Scalars['TimestampScalar']>;
  sortCriteria: PublicationSortCriteria;
  /** The App Id */
  sources?: Maybe<Array<Scalars['Sources']>>;
  /** The publication types you want to query */
  publicationTypes?: Maybe<Array<PublicationTypes>>;
  /** If you want the randomizer off (default on) */
  noRandomize?: Maybe<Scalars['Boolean']>;
  /** If you wish to exclude any results for profile ids */
  excludeProfileIds?: Maybe<Array<Scalars['ProfileId']>>;
  metadata?: Maybe<PublicationMetadataFilters>;
  customFilters?: Maybe<Array<CustomFiltersTypes>>;
};

/** The paginated publication result */
export type ExplorePublicationResult = {
  __typename: 'ExplorePublicationResult';
  items: Array<Publication>;
  pageInfo: PaginatedResultInfo;
};

export type FeeCollectModuleParams = {
  /** The collect module amount info */
  amount: ModuleFeeAmountParams;
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
};

export type FeeCollectModuleSettings = {
  __typename: 'FeeCollectModuleSettings';
  /** The collect modules enum */
  type: CollectModules;
  contractAddress: Scalars['ContractAddress'];
  /** The collect module amount info */
  amount: ModuleFeeAmount;
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
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

export type FeeFollowModuleSettings = {
  __typename: 'FeeFollowModuleSettings';
  /** The follow modules enum */
  type: FollowModules;
  contractAddress: Scalars['ContractAddress'];
  /** The collect module amount info */
  amount: ModuleFeeAmount;
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
};

/** The feed event item filter types */
export enum FeedEventItemType {
  Post = 'POST',
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  CollectPost = 'COLLECT_POST',
  CollectComment = 'COLLECT_COMMENT',
  ReactionPost = 'REACTION_POST',
  ReactionComment = 'REACTION_COMMENT',
}

export type FeedHighlightsRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** The App Id */
  sources?: Maybe<Array<Scalars['Sources']>>;
  metadata?: Maybe<PublicationMetadataFilters>;
};

export type FeedItem = {
  __typename: 'FeedItem';
  root: FeedItemRoot;
  /** The elected mirror will be the first Mirror publication within the page results set */
  electedMirror: Maybe<ElectedMirror>;
  /** Sorted by most recent first. Up to page size - 1 mirrors */
  mirrors: Array<MirrorEvent>;
  /** Sorted by most recent first. Resolves defaultProfile and if null omits the wallet collect event from the list. */
  collects: Array<CollectedEvent>;
  /** Sorted by most recent first. Up to page size - 1 reactions */
  reactions: Array<ReactionEvent>;
  /** Sorted by most recent first. Up to page size - 1 comments. */
  comments: Maybe<Array<Comment>>;
};

export type FeedItemRoot = Post | Comment;

export type FeedRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** Filter your feed to whatever you wish */
  feedEventItemTypes?: Maybe<Array<FeedEventItemType>>;
  /** The App Id */
  sources?: Maybe<Array<Scalars['Sources']>>;
  metadata?: Maybe<PublicationMetadataFilters>;
};

export type Follow = {
  profile: Scalars['ProfileId'];
  followModule?: Maybe<FollowModuleRedeemParams>;
};

export type FollowConditionInput = {
  /** The profile id of the gated profile */
  profileId: Scalars['ProfileId'];
};

export type FollowConditionOutput = {
  __typename: 'FollowConditionOutput';
  /** The profile id of the gated profile */
  profileId: Scalars['ProfileId'];
};

export type FollowModule =
  | FeeFollowModuleSettings
  | ProfileFollowModuleSettings
  | RevertFollowModuleSettings
  | UnknownFollowModuleSettings;

export type FollowModuleParams = {
  /** The follower fee follower module */
  feeFollowModule?: Maybe<FeeFollowModuleParams>;
  /** The profile follow module */
  profileFollowModule?: Maybe<Scalars['Boolean']>;
  /** The revert follow module */
  revertFollowModule?: Maybe<Scalars['Boolean']>;
  /** The empty follow module */
  freeFollowModule?: Maybe<Scalars['Boolean']>;
  /** A unknown follow module */
  unknownFollowModule?: Maybe<UnknownFollowModuleParams>;
};

export type FollowModuleRedeemParams = {
  /** The follower fee follower module */
  feeFollowModule?: Maybe<FeeFollowModuleRedeemParams>;
  /** The profile follower module */
  profileFollowModule?: Maybe<ProfileFollowModuleRedeemParams>;
  /** A unknown follow module */
  unknownFollowModule?: Maybe<UnknownFollowModuleRedeemParams>;
};

/** The follow module types */
export enum FollowModules {
  FeeFollowModule = 'FeeFollowModule',
  RevertFollowModule = 'RevertFollowModule',
  ProfileFollowModule = 'ProfileFollowModule',
  UnknownFollowModule = 'UnknownFollowModule',
}

export type FollowOnlyReferenceModuleSettings = {
  __typename: 'FollowOnlyReferenceModuleSettings';
  /** The reference modules enum */
  type: ReferenceModules;
  contractAddress: Scalars['ContractAddress'];
};

export type FollowProxyAction = {
  freeFollow?: Maybe<FreeFollowProxyAction>;
};

export type FollowRequest = {
  follow: Array<Follow>;
};

export type FollowRevenueResult = {
  __typename: 'FollowRevenueResult';
  revenues: Array<RevenueAggregate>;
};

export type Follower = {
  __typename: 'Follower';
  wallet: Wallet;
  totalAmountOfTimesFollowed: Scalars['Int'];
};

export type FollowerNftOwnedTokenIds = {
  __typename: 'FollowerNftOwnedTokenIds';
  followerNftAddress: Scalars['ContractAddress'];
  tokensIds: Array<Scalars['String']>;
};

export type FollowerNftOwnedTokenIdsRequest = {
  address: Scalars['EthereumAddress'];
  profileId: Scalars['ProfileId'];
};

export type FollowersRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  profileId: Scalars['ProfileId'];
};

export type Following = {
  __typename: 'Following';
  profile: Profile;
  totalAmountOfTimesFollowing: Scalars['Int'];
};

export type FollowingRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  address: Scalars['EthereumAddress'];
};

export type FraudReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingFraudSubreason;
};

export type FreeCollectModuleParams = {
  /** Follower only */
  followerOnly: Scalars['Boolean'];
};

export type FreeCollectModuleSettings = {
  __typename: 'FreeCollectModuleSettings';
  /** The collect modules enum */
  type: CollectModules;
  contractAddress: Scalars['ContractAddress'];
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
  /** NFT ownership condition */
  nft?: Maybe<NftOwnershipInput>;
  /** ERC20 token ownership condition */
  token?: Maybe<Erc20OwnershipInput>;
  /** EOA ownership condition */
  eoa?: Maybe<EoaOwnershipInput>;
  /** Profile ownership condition */
  profile?: Maybe<ProfileOwnershipInput>;
  /** Profile follow condition */
  follow?: Maybe<FollowConditionInput>;
  /** Profile follow condition */
  collect?: Maybe<CollectConditionInput>;
  /** AND condition */
  and?: Maybe<AndConditionInput>;
  /** OR condition */
  or?: Maybe<OrConditionInput>;
  /** The LIT Protocol encrypted symmetric key */
  encryptedSymmetricKey: Scalars['ContentEncryptionKey'];
};

export type GenerateModuleCurrencyApproval = {
  __typename: 'GenerateModuleCurrencyApproval';
  to: Scalars['ContractAddress'];
  from: Scalars['EthereumAddress'];
  data: Scalars['BlockchainData'];
};

export type GenerateModuleCurrencyApprovalDataRequest = {
  currency: Scalars['ContractAddress'];
  /** Floating point number as string (e.g. 42.009837). The server will move its decimal places for you */
  value: Scalars['String'];
  collectModule?: Maybe<CollectModules>;
  unknownCollectModule?: Maybe<Scalars['ContractAddress']>;
  followModule?: Maybe<FollowModules>;
  unknownFollowModule?: Maybe<Scalars['ContractAddress']>;
  referenceModule?: Maybe<ReferenceModules>;
  unknownReferenceModule?: Maybe<Scalars['ContractAddress']>;
};

export type GetPublicationMetadataStatusRequest = {
  publicationId?: Maybe<Scalars['InternalPublicationId']>;
  txHash?: Maybe<Scalars['TxHash']>;
  txId?: Maybe<Scalars['TxId']>;
};

export type GlobalProtocolStats = {
  __typename: 'GlobalProtocolStats';
  totalProfiles: Scalars['Int'];
  totalBurntProfiles: Scalars['Int'];
  totalPosts: Scalars['Int'];
  totalMirrors: Scalars['Int'];
  totalComments: Scalars['Int'];
  totalCollects: Scalars['Int'];
  totalFollows: Scalars['Int'];
  totalRevenue: Array<Erc20Amount>;
};

export type GlobalProtocolStatsRequest = {
  /** Unix time from timestamp - if not supplied it will go from 0 timestamp */
  fromTimestamp?: Maybe<Scalars['UnixTimestamp']>;
  /** Unix time to timestamp - if not supplied it go to the present timestamp */
  toTimestamp?: Maybe<Scalars['UnixTimestamp']>;
  /** The App Id */
  sources?: Maybe<Array<Scalars['Sources']>>;
};

export type HasTxHashBeenIndexedRequest = {
  /** Tx hash.. if your using the broadcaster you should use txId due to gas price upgrades */
  txHash?: Maybe<Scalars['TxHash']>;
  /** Tx id.. if your using the broadcaster you should always use this field */
  txId?: Maybe<Scalars['TxId']>;
};

export type HelRequest = {
  secret: Scalars['String'];
  handle: Scalars['Handle'];
  remove: Scalars['Boolean'];
};

export type HidePublicationRequest = {
  /** Publication id */
  publicationId: Scalars['InternalPublicationId'];
};

export type IllegalReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingIllegalSubreason;
};

export type InternalPublicationsFilterRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** must be DD/MM/YYYY */
  fromDate: Scalars['String'];
  /** must be DD/MM/YYYY */
  toDate: Scalars['String'];
  /** The App Id */
  source: Scalars['Sources'];
  /** The shared secret */
  secret: Scalars['String'];
};

export type LimitedFeeCollectModuleParams = {
  /** The collect module limit */
  collectLimit: Scalars['String'];
  /** The collect module amount info */
  amount: ModuleFeeAmountParams;
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
};

export type LimitedFeeCollectModuleSettings = {
  __typename: 'LimitedFeeCollectModuleSettings';
  /** The collect modules enum */
  type: CollectModules;
  contractAddress: Scalars['ContractAddress'];
  /** The collect module limit */
  collectLimit: Scalars['String'];
  /** The collect module amount info */
  amount: ModuleFeeAmount;
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
};

export type LimitedTimedFeeCollectModuleParams = {
  /** The collect module limit */
  collectLimit: Scalars['String'];
  /** The collect module amount info */
  amount: ModuleFeeAmountParams;
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
};

export type LimitedTimedFeeCollectModuleSettings = {
  __typename: 'LimitedTimedFeeCollectModuleSettings';
  /** The collect modules enum */
  type: CollectModules;
  contractAddress: Scalars['ContractAddress'];
  /** The collect module limit */
  collectLimit: Scalars['String'];
  /** The collect module amount info */
  amount: ModuleFeeAmount;
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module end timestamp */
  endTimestamp: Scalars['DateTime'];
};

export type Log = {
  __typename: 'Log';
  blockNumber: Scalars['Int'];
  blockHash: Scalars['String'];
  transactionIndex: Scalars['Int'];
  removed: Scalars['Boolean'];
  address: Scalars['ContractAddress'];
  data: Scalars['String'];
  topics: Array<Scalars['String']>;
  transactionHash: Scalars['TxHash'];
  logIndex: Scalars['Int'];
};

export type MainPostReference = Post | Mirror;

/** The Media url */
export type Media = {
  __typename: 'Media';
  /** The token image nft */
  url: Scalars['Url'];
  /** Width - will always be null on the public API */
  width: Maybe<Scalars['Int']>;
  /** Height - will always be null on the public API */
  height: Maybe<Scalars['Int']>;
  /** Size - will always be null on the public API */
  size: Maybe<Scalars['Int']>;
  /** The image/audio/video mime type for the publication */
  mimeType: Maybe<Scalars['MimeType']>;
  /** The alt tags for accessibility */
  altTag: Maybe<Scalars['String']>;
  /** The cover for any video or audio you attached */
  cover: Maybe<Scalars['Url']>;
};

/** Media object output */
export type MediaOutput = {
  __typename: 'MediaOutput';
  item: Scalars['Url'];
  /** This is the mime type of media */
  type: Maybe<Scalars['MimeType']>;
  /** The alt tags for accessibility */
  altTag: Maybe<Scalars['String']>;
  /** The cover for any video or audio you attached */
  cover: Maybe<Scalars['Url']>;
  source: Maybe<PublicationMediaSource>;
};

/** The Media Set */
export type MediaSet = {
  __typename: 'MediaSet';
  /** Original media */
  original: Media;
  /**
   * Small media - will always be null on the public API
   * @deprecated should not be used will always be null
   */
  small: Maybe<Media>;
  /**
   * Medium media - will always be null on the public API
   * @deprecated should not be used will always be null
   */
  medium: Maybe<Media>;
};

export type MentionPublication = Post | Comment;

/** The metadata attribute input */
export type MetadataAttributeInput = {
  /** The display type */
  displayType?: Maybe<PublicationMetadataDisplayTypes>;
  /** The trait type - can be anything its the name it will render so include spaces */
  traitType: Scalars['String'];
  /** The value */
  value: Scalars['String'];
};

/** The metadata attribute output */
export type MetadataAttributeOutput = {
  __typename: 'MetadataAttributeOutput';
  /** The display type */
  displayType: Maybe<PublicationMetadataDisplayTypes>;
  /** The trait type - can be anything its the name it will render so include spaces */
  traitType: Maybe<Scalars['String']>;
  /** The value */
  value: Maybe<Scalars['String']>;
};

/** The metadata output */
export type MetadataOutput = {
  __typename: 'MetadataOutput';
  /** The metadata name */
  name: Maybe<Scalars['String']>;
  /** This is the metadata description */
  description: Maybe<Scalars['Markdown']>;
  /** This is the metadata content for the publication, should be markdown */
  content: Maybe<Scalars['Markdown']>;
  /** This is the image attached to the metadata and the property used to show the NFT! */
  image: Maybe<Scalars['Url']>;
  /** The image cover for video/music publications */
  cover: Maybe<MediaSet>;
  /** The images/audios/videos for the publication */
  media: Array<MediaSet>;
  /** The attributes */
  attributes: Array<MetadataAttributeOutput>;
  /** The locale of the publication,  */
  locale: Maybe<Scalars['Locale']>;
  /** The tags for the publication */
  tags: Array<Scalars['String']>;
  /** The content warning for the publication */
  contentWarning: Maybe<PublicationContentWarning>;
  /** The main focus of the publication */
  mainContentFocus: PublicationMainFocus;
  /** The main focus of the publication */
  animatedUrl: Maybe<Scalars['Url']>;
  /** The publication's encryption params in case it's encrypted */
  encryptionParams: Maybe<EncryptionParamsOutput>;
};

/** The social mirror */
export type Mirror = {
  __typename: 'Mirror';
  /** ID of the source */
  appId: Maybe<Scalars['Sources']>;
  canComment: CanCommentResponse;
  canDecrypt: CanDecryptResponse;
  canMirror: CanMirrorResponse;
  /** The collect module */
  collectModule: CollectModule;
  /** The contract address for the collect nft.. if its null it means nobody collected yet as it lazy deployed */
  collectNftAddress: Maybe<Scalars['ContractAddress']>;
  /** The date the post was created on */
  createdAt: Scalars['DateTime'];
  dataAvailabilityProofs: Maybe<Scalars['String']>;
  hasCollectedByMe: Scalars['Boolean'];
  hasOptimisticCollectedByMe: Scalars['Boolean'];
  /** If the publication has been hidden if it has then the content and media is not available */
  hidden: Scalars['Boolean'];
  /** The internal publication id */
  id: Scalars['InternalPublicationId'];
  /** Indicates if the publication is data availability post */
  isDataAvailability: Scalars['Boolean'];
  /** Indicates if the publication is gated behind some access criteria */
  isGated: Scalars['Boolean'];
  isOptimisticMirroredByMe: Scalars['Boolean'];
  /** The metadata for the post */
  metadata: MetadataOutput;
  /** The mirror publication */
  mirrorOf: MirrorablePublication;
  /** The on chain content uri could be `ipfs://` or `https` */
  onChainContentURI: Scalars['String'];
  ownedByMe: Scalars['Boolean'];
  /** The profile ref */
  profile: Profile;
  reaction: Maybe<ReactionTypes>;
  /** The reference module */
  referenceModule: Maybe<ReferenceModule>;
  /** The publication stats */
  stats: PublicationStats;
};

/** The social mirror */
export type MirrorCanCommentArgs = {
  profileId?: Maybe<Scalars['ProfileId']>;
};

/** The social mirror */
export type MirrorCanDecryptArgs = {
  profileId?: Maybe<Scalars['ProfileId']>;
  address?: Maybe<Scalars['EthereumAddress']>;
};

/** The social mirror */
export type MirrorCanMirrorArgs = {
  profileId?: Maybe<Scalars['ProfileId']>;
};

/** The social mirror */
export type MirrorHasCollectedByMeArgs = {
  isFinalisedOnChain?: Maybe<Scalars['Boolean']>;
};

/** The social mirror */
export type MirrorReactionArgs = {
  request?: Maybe<ReactionFieldResolverRequest>;
};

export type MirrorEvent = {
  __typename: 'MirrorEvent';
  profile: Profile;
  timestamp: Scalars['DateTime'];
};

export type MirrorablePublication = Post | Comment;

export type ModuleFeeAmount = {
  __typename: 'ModuleFeeAmount';
  /** The erc20 token info */
  asset: Erc20;
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String'];
};

export type ModuleFeeAmountParams = {
  /** The currency address */
  currency: Scalars['ContractAddress'];
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String'];
};

export type ModuleInfo = {
  __typename: 'ModuleInfo';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  authenticate: AuthenticationResult;
  refresh: AuthenticationResult;
  broadcast: RelayResult;
  createSetDispatcherTypedData: CreateSetDispatcherBroadcastItemResult;
  createFollowTypedData: CreateFollowBroadcastItemResult;
  createUnfollowTypedData: CreateUnfollowBroadcastItemResult;
  createSetFollowModuleTypedData: CreateSetFollowModuleBroadcastItemResult;
  createSetFollowNFTUriTypedData: CreateSetFollowNftUriBroadcastItemResult;
  createToggleFollowTypedData: CreateToggleFollowBroadcastItemResult;
  createCollectTypedData: CreateCollectBroadcastItemResult;
  createSetDefaultProfileTypedData: SetDefaultProfileBroadcastItemResult;
  createSetProfileImageURITypedData: CreateSetProfileImageUriBroadcastItemResult;
  createSetProfileImageURIViaDispatcher: RelayResult;
  createBurnProfileTypedData: CreateBurnProfileBroadcastItemResult;
  createPostTypedData: CreatePostBroadcastItemResult;
  createPostViaDispatcher: RelayResult;
  createCommentTypedData: CreateCommentBroadcastItemResult;
  createCommentViaDispatcher: RelayResult;
  createMirrorTypedData: CreateMirrorBroadcastItemResult;
  hidePublication: Maybe<Scalars['Void']>;
  createMirrorViaDispatcher: RelayResult;
  createAttachMediaData: PublicMediaResults;
  claim: RelayResult;
  /** Adds profile interests to the given profile */
  addProfileInterests: Maybe<Scalars['Void']>;
  /** Removes profile interests from the given profile */
  removeProfileInterests: Maybe<Scalars['Void']>;
  createSetProfileMetadataTypedData: CreateSetProfileMetadataUriBroadcastItemResult;
  createSetProfileMetadataViaDispatcher: RelayResult;
  proxyAction: Scalars['ProxyActionId'];
  addReaction: Maybe<Scalars['Void']>;
  removeReaction: Maybe<Scalars['Void']>;
  reportPublication: Maybe<Scalars['Void']>;
  ach: Maybe<Scalars['Void']>;
  hel: Maybe<Scalars['Void']>;
};

export type MutationAuthenticateArgs = {
  request: SignedAuthChallenge;
};

export type MutationRefreshArgs = {
  request: RefreshRequest;
};

export type MutationBroadcastArgs = {
  request: BroadcastRequest;
};

export type MutationCreateSetDispatcherTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: SetDispatcherRequest;
};

export type MutationCreateFollowTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: FollowRequest;
};

export type MutationCreateUnfollowTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: UnfollowRequest;
};

export type MutationCreateSetFollowModuleTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: CreateSetFollowModuleRequest;
};

export type MutationCreateSetFollowNftUriTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: CreateSetFollowNftUriRequest;
};

export type MutationCreateToggleFollowTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: CreateToggleFollowRequest;
};

export type MutationCreateCollectTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: CreateCollectRequest;
};

export type MutationCreateSetDefaultProfileTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: CreateSetDefaultProfileRequest;
};

export type MutationCreateSetProfileImageUriTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: UpdateProfileImageRequest;
};

export type MutationCreateSetProfileImageUriViaDispatcherArgs = {
  request: UpdateProfileImageRequest;
};

export type MutationCreateBurnProfileTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: BurnProfileRequest;
};

export type MutationCreatePostTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: CreatePublicPostRequest;
};

export type MutationCreatePostViaDispatcherArgs = {
  request: CreatePublicPostRequest;
};

export type MutationCreateCommentTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: CreatePublicCommentRequest;
};

export type MutationCreateCommentViaDispatcherArgs = {
  request: CreatePublicCommentRequest;
};

export type MutationCreateMirrorTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: CreateMirrorRequest;
};

export type MutationHidePublicationArgs = {
  request: HidePublicationRequest;
};

export type MutationCreateMirrorViaDispatcherArgs = {
  request: CreateMirrorRequest;
};

export type MutationCreateAttachMediaDataArgs = {
  request: PublicMediaRequest;
};

export type MutationClaimArgs = {
  request: ClaimHandleRequest;
};

export type MutationAddProfileInterestsArgs = {
  request: AddProfileInterestsRequest;
};

export type MutationRemoveProfileInterestsArgs = {
  request: RemoveProfileInterestsRequest;
};

export type MutationCreateSetProfileMetadataTypedDataArgs = {
  options?: Maybe<TypedDataOptions>;
  request: CreatePublicSetProfileMetadataUriRequest;
};

export type MutationCreateSetProfileMetadataViaDispatcherArgs = {
  request: CreatePublicSetProfileMetadataUriRequest;
};

export type MutationProxyActionArgs = {
  request: ProxyActionRequest;
};

export type MutationAddReactionArgs = {
  request: ReactionRequest;
};

export type MutationRemoveReactionArgs = {
  request: ReactionRequest;
};

export type MutationReportPublicationArgs = {
  request: ReportPublicationRequest;
};

export type MutationAchArgs = {
  request: AchRequest;
};

export type MutationHelArgs = {
  request: HelRequest;
};

export type MutualFollowersProfilesQueryRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** The profile id your viewing */
  viewingProfileId: Scalars['ProfileId'];
  /** The profile id you want the result to come back as your viewing from */
  yourProfileId: Scalars['ProfileId'];
};

/** The nft type */
export type Nft = {
  __typename: 'NFT';
  /** aka us CryptoKitties */
  contractName: Scalars['String'];
  /** aka 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e  */
  contractAddress: Scalars['ContractAddress'];
  /** aka RARI */
  symbol: Scalars['String'];
  /** aka "13"  */
  tokenId: Scalars['String'];
  /** aka { address: 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e, amount:"2" }  */
  owners: Array<Owner>;
  /** aka "Beard Coffee"  */
  name: Scalars['String'];
  /** aka "Hey cutie! I m Beard Coffee. ....  */
  description: Scalars['String'];
  /** aka "https://api.criptokitt..."  */
  contentURI: Scalars['String'];
  /** aka "{ uri:"https://ipfs....", metaType:"image/png" }"  */
  originalContent: NftContent;
  /** aka "1"  */
  chainId: Scalars['ChainId'];
  /** aka "CryptoKitties"  */
  collectionName: Scalars['String'];
  /** aka "ERC721"  */
  ercType: Scalars['String'];
};

/** The NFT content uri */
export type NftContent = {
  __typename: 'NFTContent';
  /** The token uri  nft */
  uri: Scalars['String'];
  /** The meta type content */
  metaType: Scalars['String'];
  /** The animated url */
  animatedUrl: Maybe<Scalars['String']>;
};

export type NftData = {
  /** Id of the nft ownership challenge */
  id: Scalars['NftOwnershipId'];
  /** The signature */
  signature: Scalars['Signature'];
};

export type NfTsRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** Filter by owner address */
  ownerAddress: Scalars['EthereumAddress'];
  /** Filter by contract address */
  contractAddress?: Maybe<Scalars['ContractAddress']>;
  /** Chain Ids */
  chainIds: Array<Scalars['ChainId']>;
};

/** Paginated nft results */
export type NfTsResult = {
  __typename: 'NFTsResult';
  items: Array<Nft>;
  pageInfo: PaginatedResultInfo;
};

export type NewCollectNotification = {
  __typename: 'NewCollectNotification';
  notificationId: Scalars['NotificationId'];
  createdAt: Scalars['DateTime'];
  wallet: Wallet;
  collectedPublication: Publication;
};

export type NewCommentNotification = {
  __typename: 'NewCommentNotification';
  notificationId: Scalars['NotificationId'];
  createdAt: Scalars['DateTime'];
  /** The profile */
  profile: Profile;
  comment: Comment;
};

export type NewFollowerNotification = {
  __typename: 'NewFollowerNotification';
  notificationId: Scalars['NotificationId'];
  createdAt: Scalars['DateTime'];
  wallet: Wallet;
  isFollowedByMe: Scalars['Boolean'];
};

export type NewMentionNotification = {
  __typename: 'NewMentionNotification';
  notificationId: Scalars['NotificationId'];
  createdAt: Scalars['DateTime'];
  mentionPublication: MentionPublication;
};

export type NewMirrorNotification = {
  __typename: 'NewMirrorNotification';
  notificationId: Scalars['NotificationId'];
  createdAt: Scalars['DateTime'];
  /** The profile */
  profile: Profile;
  publication: MirrorablePublication;
};

export type NewReactionNotification = {
  __typename: 'NewReactionNotification';
  notificationId: Scalars['NotificationId'];
  createdAt: Scalars['DateTime'];
  /** The profile */
  profile: Profile;
  reaction: ReactionTypes;
  publication: Publication;
};

/** The NFT image */
export type NftImage = {
  __typename: 'NftImage';
  /** The contract address */
  contractAddress: Scalars['ContractAddress'];
  /** The token id of the nft */
  tokenId: Scalars['String'];
  /** The token image nft */
  uri: Scalars['Url'];
  /** The token image nft */
  chainId: Scalars['Int'];
  /** If the NFT is verified */
  verified: Scalars['Boolean'];
};

export type NftOwnershipChallenge = {
  /** ContractAddress for nft */
  contractAddress: Scalars['ContractAddress'];
  /** Token id for NFT */
  tokenId: Scalars['String'];
  /** Chain Id */
  chainId: Scalars['ChainId'];
};

export type NftOwnershipChallengeRequest = {
  /** The wallet address which owns the NFT */
  ethereumAddress: Scalars['EthereumAddress'];
  nfts: Array<NftOwnershipChallenge>;
};

/** NFT ownership challenge result */
export type NftOwnershipChallengeResult = {
  __typename: 'NftOwnershipChallengeResult';
  /** Id of the nft ownership challenge */
  id: Scalars['NftOwnershipId'];
  text: Scalars['String'];
  /** Timeout of the validation */
  timeout: Scalars['TimestampScalar'];
};

export type NftOwnershipInput = {
  /** The NFT collection's ethereum address */
  contractAddress: Scalars['ContractAddress'];
  /** The NFT chain id */
  chainID: Scalars['ChainId'];
  /** The unlocker contract type */
  contractType: ContractType;
  /** The optional token ID(s) to check for ownership */
  tokenIds?: Maybe<Array<Scalars['TokenId']>>;
};

export type NftOwnershipOutput = {
  __typename: 'NftOwnershipOutput';
  /** The NFT collection's ethereum address */
  contractAddress: Scalars['ContractAddress'];
  /** The NFT chain id */
  chainID: Scalars['ChainId'];
  /** The unlocker contract type */
  contractType: ContractType;
  /** The optional token ID(s) to check for ownership */
  tokenIds: Maybe<Array<Scalars['TokenId']>>;
};

export type Notification =
  | NewFollowerNotification
  | NewCollectNotification
  | NewCommentNotification
  | NewMirrorNotification
  | NewMentionNotification
  | NewReactionNotification;

export type NotificationRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** The profile id */
  notificationTypes?: Maybe<Array<NotificationTypes>>;
  /** The App Id */
  sources?: Maybe<Array<Scalars['Sources']>>;
  metadata?: Maybe<PublicationMetadataFilters>;
  customFilters?: Maybe<Array<CustomFiltersTypes>>;
};

/** The notification filter types */
export enum NotificationTypes {
  MirroredPost = 'MIRRORED_POST',
  MirroredComment = 'MIRRORED_COMMENT',
  MentionPost = 'MENTION_POST',
  MentionComment = 'MENTION_COMMENT',
  CommentedComment = 'COMMENTED_COMMENT',
  CommentedPost = 'COMMENTED_POST',
  CollectedPost = 'COLLECTED_POST',
  CollectedComment = 'COLLECTED_COMMENT',
  Followed = 'FOLLOWED',
  ReactionPost = 'REACTION_POST',
  ReactionComment = 'REACTION_COMMENT',
}

export type OnChainIdentity = {
  __typename: 'OnChainIdentity';
  /** The POH status */
  proofOfHumanity: Scalars['Boolean'];
  /** The ens information */
  ens: Maybe<EnsOnChainIdentity>;
  /** The sybil dot org information */
  sybilDotOrg: SybilDotOrgIdentity;
  /** The worldcoin identity */
  worldcoin: WorldcoinIdentity;
};

export type OrConditionInput = {
  /** The list of conditions to apply OR to. You can only use nested boolean conditions at the root level. */
  criteria: Array<AccessConditionInput>;
};

export type OrConditionOutput = {
  __typename: 'OrConditionOutput';
  /** The list of conditions to apply OR to. You can only use nested boolean conditions at the root level. */
  criteria: Array<AccessConditionOutput>;
};

/** The nft type */
export type Owner = {
  __typename: 'Owner';
  /** number of tokens owner */
  amount: Scalars['Float'];
  /** aka 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e  */
  address: Scalars['EthereumAddress'];
};

/** The paginated wallet result */
export type PaginatedAllPublicationsTagsResult = {
  __typename: 'PaginatedAllPublicationsTagsResult';
  items: Array<TagResult>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated feed result */
export type PaginatedFeedResult = {
  __typename: 'PaginatedFeedResult';
  items: Array<FeedItem>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated followers result */
export type PaginatedFollowersResult = {
  __typename: 'PaginatedFollowersResult';
  items: Array<Follower>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedFollowingResult = {
  __typename: 'PaginatedFollowingResult';
  items: Array<Following>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated notification result */
export type PaginatedNotificationResult = {
  __typename: 'PaginatedNotificationResult';
  items: Array<Notification>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated wallet result */
export type PaginatedProfilePublicationsForSaleResult = {
  __typename: 'PaginatedProfilePublicationsForSaleResult';
  items: Array<PublicationForSale>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated profile result */
export type PaginatedProfileResult = {
  __typename: 'PaginatedProfileResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated publication result */
export type PaginatedPublicationResult = {
  __typename: 'PaginatedPublicationResult';
  items: Array<Publication>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated result info */
export type PaginatedResultInfo = {
  __typename: 'PaginatedResultInfo';
  /** Cursor to query the actual results */
  prev: Maybe<Scalars['Cursor']>;
  /** Cursor to query next results */
  next: Maybe<Scalars['Cursor']>;
  /** The total number of entities the pagination iterates over. If null it means it can not work it out due to dynamic or aggregated query e.g. For a query that requests all nfts with more than 10 likes, this field gives the total amount of nfts with more than 10 likes, not the total amount of nfts */
  totalCount: Maybe<Scalars['Int']>;
};

/** The paginated timeline result */
export type PaginatedTimelineResult = {
  __typename: 'PaginatedTimelineResult';
  items: Array<Publication>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated wallet result */
export type PaginatedWhoCollectedResult = {
  __typename: 'PaginatedWhoCollectedResult';
  items: Array<Wallet>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedWhoReactedResult = {
  __typename: 'PaginatedWhoReactedResult';
  items: Array<WhoReactedResult>;
  pageInfo: PaginatedResultInfo;
};

export type PendingApprovalFollowsRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
};

/** The paginated follow result */
export type PendingApproveFollowsResult = {
  __typename: 'PendingApproveFollowsResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
};

/** The social post */
export type Post = {
  __typename: 'Post';
  /** ID of the source */
  appId: Maybe<Scalars['Sources']>;
  canComment: CanCommentResponse;
  canDecrypt: CanDecryptResponse;
  canMirror: CanMirrorResponse;
  /** The collect module */
  collectModule: CollectModule;
  /** The contract address for the collect nft.. if its null it means nobody collected yet as it lazy deployed */
  collectNftAddress: Maybe<Scalars['ContractAddress']>;
  /**
   * Who collected it, this is used for timeline results and like this for better caching for the client
   * @deprecated use `feed` query, timeline query will be killed on the 15th November. This includes this field.
   */
  collectedBy: Maybe<Wallet>;
  /** The date the post was created on */
  createdAt: Scalars['DateTime'];
  dataAvailabilityProofs: Maybe<Scalars['String']>;
  hasCollectedByMe: Scalars['Boolean'];
  hasOptimisticCollectedByMe: Scalars['Boolean'];
  /** If the publication has been hidden if it has then the content and media is not available */
  hidden: Scalars['Boolean'];
  /** The internal publication id */
  id: Scalars['InternalPublicationId'];
  /** Indicates if the publication is data availability post */
  isDataAvailability: Scalars['Boolean'];
  /** Indicates if the publication is gated behind some access criteria */
  isGated: Scalars['Boolean'];
  isOptimisticMirroredByMe: Scalars['Boolean'];
  /** The metadata for the post */
  metadata: MetadataOutput;
  mirrors: Array<Scalars['InternalPublicationId']>;
  /** The on chain content uri could be `ipfs://` or `https` */
  onChainContentURI: Scalars['String'];
  ownedByMe: Scalars['Boolean'];
  /** The profile ref */
  profile: Profile;
  reaction: Maybe<ReactionTypes>;
  /** The reference module */
  referenceModule: Maybe<ReferenceModule>;
  /** The publication stats */
  stats: PublicationStats;
};

/** The social post */
export type PostCanCommentArgs = {
  profileId?: Maybe<Scalars['ProfileId']>;
};

/** The social post */
export type PostCanDecryptArgs = {
  profileId?: Maybe<Scalars['ProfileId']>;
  address?: Maybe<Scalars['EthereumAddress']>;
};

/** The social post */
export type PostCanMirrorArgs = {
  profileId?: Maybe<Scalars['ProfileId']>;
};

/** The social post */
export type PostHasCollectedByMeArgs = {
  isFinalisedOnChain?: Maybe<Scalars['Boolean']>;
};

/** The social post */
export type PostMirrorsArgs = {
  by?: Maybe<Scalars['ProfileId']>;
};

/** The social post */
export type PostReactionArgs = {
  request?: Maybe<ReactionFieldResolverRequest>;
};

/** The Profile */
export type Profile = {
  __typename: 'Profile';
  /** Optionals param to add extra attributes on the metadata */
  attributes: Maybe<Array<Attribute>>;
  /** Bio of the profile */
  bio: Maybe<Scalars['String']>;
  /** The cover picture for the profile */
  coverPicture: Maybe<ProfileMedia>;
  /** The dispatcher */
  dispatcher: Maybe<Dispatcher>;
  /** The follow module */
  followModule: Maybe<FollowModule>;
  /** Follow nft address */
  followNftAddress: Maybe<Scalars['ContractAddress']>;
  /** The profile handle */
  handle: Scalars['Handle'];
  /** The profile id */
  id: Scalars['ProfileId'];
  /** The profile interests */
  interests: Maybe<Array<Scalars['ProfileInterest']>>;
  /** Is the profile default */
  isDefault: Scalars['Boolean'];
  isFollowedByMe: Scalars['Boolean'];
  isFollowing: Scalars['Boolean'];
  isOptimisticFollowedByMe: Scalars['Boolean'];
  location: Maybe<Scalars['String']>;
  /** Metadata url */
  metadata: Maybe<Scalars['Url']>;
  /** Name of the profile */
  name: Maybe<Scalars['String']>;
  /** The on chain identity */
  onChainIdentity: OnChainIdentity;
  /** Who owns the profile */
  ownedBy: Scalars['EthereumAddress'];
  ownedByMe: Scalars['Boolean'];
  /** The picture for the profile */
  picture: Maybe<ProfileMedia>;
  /** Profile stats */
  stats: ProfileStats;
  twitter: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};

/** The Profile */
export type ProfileIsFollowedByMeArgs = {
  isFinalisedOnChain?: Maybe<Scalars['Boolean']>;
};

/** The Profile */
export type ProfileIsFollowingArgs = {
  who?: Maybe<Scalars['ProfileId']>;
};

export type ProfileFollowModuleBeenRedeemedRequest = {
  followProfileId: Scalars['ProfileId'];
  redeemingProfileId: Scalars['ProfileId'];
};

export type ProfileFollowModuleRedeemParams = {
  /** The profile id to use to follow this profile */
  profileId: Scalars['ProfileId'];
};

export type ProfileFollowModuleSettings = {
  __typename: 'ProfileFollowModuleSettings';
  /** The follow module enum */
  type: FollowModules;
  contractAddress: Scalars['ContractAddress'];
};

export type ProfileFollowRevenueQueryRequest = {
  /** The profile id */
  profileId: Scalars['ProfileId'];
};

export type ProfileMedia = NftImage | MediaSet;

export type ProfileOnChainIdentityRequest = {
  profileIds: Array<Scalars['ProfileId']>;
};

/** Condition that signifies if address has access to profile */
export type ProfileOwnershipInput = {
  /** The profile id */
  profileId: Scalars['ProfileId'];
};

/** Condition that signifies if address has access to profile */
export type ProfileOwnershipOutput = {
  __typename: 'ProfileOwnershipOutput';
  /** The profile id */
  profileId: Scalars['ProfileId'];
};

export type ProfilePublicationRevenueQueryRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** The App Id */
  sources?: Maybe<Array<Scalars['Sources']>>;
  /** The revenue types */
  types?: Maybe<Array<PublicationTypes>>;
  metadata?: Maybe<PublicationMetadataFilters>;
};

/** The paginated revenue result */
export type ProfilePublicationRevenueResult = {
  __typename: 'ProfilePublicationRevenueResult';
  items: Array<PublicationRevenue>;
  pageInfo: PaginatedResultInfo;
};

export type ProfilePublicationsForSaleRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** Profile id */
  profileId: Scalars['ProfileId'];
  /** The App Id */
  sources?: Maybe<Array<Scalars['Sources']>>;
  metadata?: Maybe<PublicationMetadataFilters>;
};

export type ProfileQueryRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** The profile ids */
  profileIds?: Maybe<Array<Scalars['ProfileId']>>;
  /** The ethereum addresses */
  ownedBy?: Maybe<Array<Scalars['EthereumAddress']>>;
  /** The handles for the profile */
  handles?: Maybe<Array<Scalars['Handle']>>;
  /** The mirrored publication id */
  whoMirroredPublicationId?: Maybe<Scalars['InternalPublicationId']>;
};

/** Profile search results */
export type ProfileSearchResult = {
  __typename: 'ProfileSearchResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
  type: SearchRequestTypes;
};

/** profile sort criteria */
export enum ProfileSortCriteria {
  CreatedOn = 'CREATED_ON',
  MostFollowers = 'MOST_FOLLOWERS',
  LatestCreated = 'LATEST_CREATED',
  MostPosts = 'MOST_POSTS',
  MostComments = 'MOST_COMMENTS',
  MostMirrors = 'MOST_MIRRORS',
  MostPublication = 'MOST_PUBLICATION',
  MostCollects = 'MOST_COLLECTS',
}

/** The Profile Stats */
export type ProfileStats = {
  __typename: 'ProfileStats';
  id: Scalars['ProfileId'];
  /** Total follower count */
  totalFollowers: Scalars['Int'];
  /** Total following count (remember the wallet follows not profile so will be same for every profile they own) */
  totalFollowing: Scalars['Int'];
  /** Total post count */
  totalPosts: Scalars['Int'];
  /** Total comment count */
  totalComments: Scalars['Int'];
  /** Total mirror count */
  totalMirrors: Scalars['Int'];
  /** Total publication count */
  totalPublications: Scalars['Int'];
  /** Total collects count */
  totalCollects: Scalars['Int'];
  commentsTotal: Scalars['Int'];
  postsTotal: Scalars['Int'];
  mirrorsTotal: Scalars['Int'];
  publicationsTotal: Scalars['Int'];
};

/** The Profile Stats */
export type ProfileStatsCommentsTotalArgs = {
  forSources: Array<Scalars['Sources']>;
};

/** The Profile Stats */
export type ProfileStatsPostsTotalArgs = {
  forSources: Array<Scalars['Sources']>;
};

/** The Profile Stats */
export type ProfileStatsMirrorsTotalArgs = {
  forSources: Array<Scalars['Sources']>;
};

/** The Profile Stats */
export type ProfileStatsPublicationsTotalArgs = {
  forSources: Array<Scalars['Sources']>;
};

/** The provider-specific encryption params */
export type ProviderSpecificParamsOutput = {
  __typename: 'ProviderSpecificParamsOutput';
  /** The encryption key */
  encryptionKey: Scalars['ContentEncryptionKey'];
};

export type ProxyActionError = {
  __typename: 'ProxyActionError';
  reason: Scalars['String'];
  lastKnownTxId: Maybe<Scalars['TxId']>;
};

export type ProxyActionQueued = {
  __typename: 'ProxyActionQueued';
  queuedAt: Scalars['DateTime'];
};

export type ProxyActionRequest = {
  follow?: Maybe<FollowProxyAction>;
  collect?: Maybe<CollectProxyAction>;
};

export type ProxyActionStatusResult = {
  __typename: 'ProxyActionStatusResult';
  txHash: Scalars['TxHash'];
  txId: Scalars['TxId'];
  status: ProxyActionStatusTypes;
};

export type ProxyActionStatusResultUnion =
  | ProxyActionStatusResult
  | ProxyActionError
  | ProxyActionQueued;

/** The proxy action status */
export enum ProxyActionStatusTypes {
  Minting = 'MINTING',
  Transferring = 'TRANSFERRING',
  Complete = 'COMPLETE',
}

export type PublicMediaRequest = {
  /** Pre calculated cid of the file to push */
  itemCid: Scalars['IfpsCid'];
  /** This is the mime type of media */
  type?: Maybe<Scalars['MimeType']>;
  /** The alt tags for accessibility */
  altTag?: Maybe<Scalars['String']>;
  /** The cover for any video or audio you attached */
  cover?: Maybe<Scalars['Url']>;
};

/** The response to upload the attached file */
export type PublicMediaResults = {
  __typename: 'PublicMediaResults';
  /** Signed url to push the file */
  signedUrl: Scalars['String'];
  /** ipfs uri to add on the metadata */
  media: MediaOutput;
};

export type Publication = Post | Comment | Mirror;

/** The publication content warning */
export enum PublicationContentWarning {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER',
}

export type PublicationForSale = Post | Comment;

/** The publication main focus */
export enum PublicationMainFocus {
  Video = 'VIDEO',
  Image = 'IMAGE',
  Article = 'ARTICLE',
  TextOnly = 'TEXT_ONLY',
  Audio = 'AUDIO',
  Link = 'LINK',
  Embed = 'EMBED',
}

/** The source of the media */
export enum PublicationMediaSource {
  Lens = 'LENS',
}

/** Publication metadata content waring filters */
export type PublicationMetadataContentWarningFilter = {
  /** By default all content warnings will be hidden you can include them in your query by adding them to this array. */
  includeOneOf?: Maybe<Array<PublicationContentWarning>>;
};

/** The publication metadata display types */
export enum PublicationMetadataDisplayTypes {
  Number = 'number',
  String = 'string',
  Date = 'date',
}

/** Publication metadata filters */
export type PublicationMetadataFilters = {
  /** IOS 639-1 language code aka en or it and ISO 3166-1 alpha-2 region code aka US or IT aka en-US or it-IT. You can just filter on language if you wish. */
  locale?: Maybe<Scalars['Locale']>;
  contentWarning?: Maybe<PublicationMetadataContentWarningFilter>;
  mainContentFocus?: Maybe<Array<PublicationMainFocus>>;
  tags?: Maybe<PublicationMetadataTagsFilter>;
};

/** The metadata attribute input */
export type PublicationMetadataMediaInput = {
  item: Scalars['Url'];
  /** This is the mime type of media */
  type?: Maybe<Scalars['MimeType']>;
  /** The alt tags for accessibility */
  altTag?: Maybe<Scalars['String']>;
  /** The cover for any video or audio you attached */
  cover?: Maybe<Scalars['Url']>;
  source?: Maybe<PublicationMediaSource>;
};

export type PublicationMetadataStatus = {
  __typename: 'PublicationMetadataStatus';
  status: PublicationMetadataStatusType;
  /** If metadata validation failed it will put a reason why here */
  reason: Maybe<Scalars['String']>;
};

/** publication metadata status type */
export enum PublicationMetadataStatusType {
  NotFound = 'NOT_FOUND',
  Pending = 'PENDING',
  MetadataValidationFailed = 'METADATA_VALIDATION_FAILED',
  Success = 'SUCCESS',
}

/** Publication metadata tag filter */
export type PublicationMetadataTagsFilter = {
  /** Needs to only match one of */
  oneOf?: Maybe<Array<Scalars['String']>>;
  /** Needs to only match all */
  all?: Maybe<Array<Scalars['String']>>;
};

export type PublicationMetadataV1Input = {
  /** The metadata version. (1.0.0 | 2.0.0) */
  version: Scalars['String'];
  /** The metadata id can be anything but if your uploading to ipfs you will want it to be random.. using uuid could be an option! */
  metadata_id: Scalars['String'];
  /**  This is the appId the content belongs to */
  appId?: Maybe<Scalars['Sources']>;
  /** A human-readable description of the item. */
  description?: Maybe<Scalars['Markdown']>;
  /** The content of a publication. If this is blank `media` must be defined or its out of spec */
  content?: Maybe<Scalars['Markdown']>;
  /**
   * This is the URL that will appear below the asset's image on OpenSea and others etc
   *       and will allow users to leave OpenSea and view the item on the site.
   */
  external_url?: Maybe<Scalars['Url']>;
  /** Signed metadata to validate the owner */
  signatureContext?: Maybe<PublicationSignatureContextInput>;
  /** Name of the item. */
  name: Scalars['String'];
  /**  These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item. */
  attributes: Array<MetadataAttributeInput>;
  /** legacy to support OpenSea will store any NFT image here. */
  image?: Maybe<Scalars['Url']>;
  /** This is the mime type of the image. This is used if your uploading more advanced cover images as sometimes ipfs does not emit the content header so this solves that */
  imageMimeType?: Maybe<Scalars['MimeType']>;
  /**  This is lens supported attached media items to the publication */
  media?: Maybe<Array<PublicationMetadataMediaInput>>;
  /**
   * A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
   *       and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
   *       Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
   *       WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
   */
  animation_url?: Maybe<Scalars['Url']>;
};

export type PublicationMetadataV2Input = {
  /** The metadata version. (1.0.0 | 2.0.0) */
  version: Scalars['String'];
  /** The metadata id can be anything but if your uploading to ipfs you will want it to be random.. using uuid could be an option! */
  metadata_id: Scalars['String'];
  /**  This is the appId the content belongs to */
  appId?: Maybe<Scalars['Sources']>;
  /** A human-readable description of the item. */
  description?: Maybe<Scalars['Markdown']>;
  /** The content of a publication. If this is blank `media` must be defined or its out of spec */
  content?: Maybe<Scalars['Markdown']>;
  /**
   * This is the URL that will appear below the asset's image on OpenSea and others etc
   *       and will allow users to leave OpenSea and view the item on the site.
   */
  external_url?: Maybe<Scalars['Url']>;
  /** Signed metadata to validate the owner */
  signatureContext?: Maybe<PublicationSignatureContextInput>;
  /** Name of the item. */
  name: Scalars['String'];
  /**  These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item. */
  attributes: Array<MetadataAttributeInput>;
  /** legacy to support OpenSea will store any NFT image here. */
  image?: Maybe<Scalars['Url']>;
  /** This is the mime type of the image. This is used if your uploading more advanced cover images as sometimes ipfs does not emit the content header so this solves that */
  imageMimeType?: Maybe<Scalars['MimeType']>;
  /**  This is lens supported attached media items to the publication */
  media?: Maybe<Array<PublicationMetadataMediaInput>>;
  /**
   * A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
   *       and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
   *       Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
   *       WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
   */
  animation_url?: Maybe<Scalars['Url']>;
  /** IOS 639-1 language code aka en or it and ISO 3166-1 alpha-2 region code aka US or IT aka en-US or it-IT */
  locale: Scalars['Locale'];
  /** Ability to tag your publication */
  tags?: Maybe<Array<Scalars['String']>>;
  /** Ability to add a content warning */
  contentWarning?: Maybe<PublicationContentWarning>;
  /** Main content focus that for this publication */
  mainContentFocus: PublicationMainFocus;
};

export type PublicationQueryRequest = {
  /** The publication id */
  publicationId?: Maybe<Scalars['InternalPublicationId']>;
  /** The tx hash */
  txHash?: Maybe<Scalars['TxHash']>;
};

/** Publication reporting fraud subreason */
export enum PublicationReportingFraudSubreason {
  Scam = 'SCAM',
  Impersonation = 'IMPERSONATION',
}

/** Publication reporting illegal subreason */
export enum PublicationReportingIllegalSubreason {
  AnimalAbuse = 'ANIMAL_ABUSE',
  HumanAbuse = 'HUMAN_ABUSE',
  Violence = 'VIOLENCE',
  ThreatIndividual = 'THREAT_INDIVIDUAL',
  DirectThreat = 'DIRECT_THREAT',
}

/** Publication reporting reason */
export enum PublicationReportingReason {
  Sensitive = 'SENSITIVE',
  Illegal = 'ILLEGAL',
  Fraud = 'FRAUD',
  Spam = 'SPAM',
}

/** Publication reporting sensitive subreason */
export enum PublicationReportingSensitiveSubreason {
  Nsfw = 'NSFW',
  Offensive = 'OFFENSIVE',
}

/** Publication reporting spam subreason */
export enum PublicationReportingSpamSubreason {
  Misleading = 'MISLEADING',
  MisuseHashtags = 'MISUSE_HASHTAGS',
  Unrelated = 'UNRELATED',
  Repetitive = 'REPETITIVE',
  FakeEngagement = 'FAKE_ENGAGEMENT',
  ManipulationAlgo = 'MANIPULATION_ALGO',
  SomethingElse = 'SOMETHING_ELSE',
}

/** The social comment */
export type PublicationRevenue = {
  __typename: 'PublicationRevenue';
  publication: Publication;
  revenue: RevenueAggregate;
};

export type PublicationRevenueQueryRequest = {
  /** The publication id */
  publicationId: Scalars['InternalPublicationId'];
};

/** Publication search results */
export type PublicationSearchResult = {
  __typename: 'PublicationSearchResult';
  items: Array<PublicationSearchResultItem>;
  pageInfo: PaginatedResultInfo;
  type: SearchRequestTypes;
};

export type PublicationSearchResultItem = Post | Comment;

export type PublicationSignatureContextInput = {
  signature: Scalars['String'];
};

/** Publication sort criteria */
export enum PublicationSortCriteria {
  TopCommented = 'TOP_COMMENTED',
  TopCollected = 'TOP_COLLECTED',
  TopMirrored = 'TOP_MIRRORED',
  CuratedProfiles = 'CURATED_PROFILES',
  Latest = 'LATEST',
}

/** The publication stats */
export type PublicationStats = {
  __typename: 'PublicationStats';
  /** The publication id */
  id: Scalars['InternalPublicationId'];
  /** The total amount of mirrors */
  totalAmountOfMirrors: Scalars['Int'];
  /** The total amount of collects */
  totalAmountOfCollects: Scalars['Int'];
  /** The total amount of comments */
  totalAmountOfComments: Scalars['Int'];
  /** The total amount of downvotes */
  totalUpvotes: Scalars['Int'];
  /** The total amount of upvotes */
  totalDownvotes: Scalars['Int'];
  commentsTotal: Scalars['Int'];
};

/** The publication stats */
export type PublicationStatsCommentsTotalArgs = {
  forSources: Array<Scalars['Sources']>;
};

/** The publication types */
export enum PublicationTypes {
  Post = 'POST',
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
}

export type PublicationValidateMetadataResult = {
  __typename: 'PublicationValidateMetadataResult';
  valid: Scalars['Boolean'];
  /** If `valid` is false it will put a reason why here */
  reason: Maybe<Scalars['String']>;
};

export type PublicationsQueryRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** Profile id */
  profileId?: Maybe<Scalars['ProfileId']>;
  /** Profile ids */
  profileIds?: Maybe<Array<Scalars['ProfileId']>>;
  /** The publication types you want to query */
  publicationTypes?: Maybe<Array<PublicationTypes>>;
  /** The publication id you wish to get comments for */
  commentsOf?: Maybe<Scalars['InternalPublicationId']>;
  /** The App Id */
  sources?: Maybe<Array<Scalars['Sources']>>;
  /** The ethereum address */
  collectedBy?: Maybe<Scalars['EthereumAddress']>;
  /** The publication id */
  publicationIds?: Maybe<Array<Scalars['InternalPublicationId']>>;
  metadata?: Maybe<PublicationMetadataFilters>;
  customFilters?: Maybe<Array<CustomFiltersTypes>>;
};

export type Query = {
  __typename: 'Query';
  challenge: AuthChallengeResult;
  verify: Scalars['Boolean'];
  txIdToTxHash: Scalars['TxHash'];
  explorePublications: ExplorePublicationResult;
  exploreProfiles: ExploreProfileResult;
  feed: PaginatedFeedResult;
  feedHighlights: PaginatedTimelineResult;
  /** @deprecated You should be using feed, this will not be supported after 15th November 2021, please migrate. */
  timeline: PaginatedTimelineResult;
  pendingApprovalFollows: PendingApproveFollowsResult;
  doesFollow: Array<DoesFollowResponse>;
  following: PaginatedFollowingResult;
  followers: PaginatedFollowersResult;
  followerNftOwnedTokenIds: Maybe<FollowerNftOwnedTokenIds>;
  mutualFollowersProfiles: PaginatedProfileResult;
  ping: Scalars['String'];
  hasTxHashBeenIndexed: TransactionResult;
  enabledModuleCurrencies: Array<Erc20>;
  approvedModuleAllowanceAmount: Array<ApprovedAllowanceAmount>;
  generateModuleCurrencyApprovalData: GenerateModuleCurrencyApproval;
  profileFollowModuleBeenRedeemed: Scalars['Boolean'];
  enabledModules: EnabledModules;
  unknownEnabledModules: EnabledModules;
  nfts: NfTsResult;
  nftOwnershipChallenge: NftOwnershipChallengeResult;
  notifications: PaginatedNotificationResult;
  profiles: PaginatedProfileResult;
  profile: Maybe<Profile>;
  recommendedProfiles: Array<Profile>;
  defaultProfile: Maybe<Profile>;
  globalProtocolStats: GlobalProtocolStats;
  publications: PaginatedPublicationResult;
  publication: Maybe<Publication>;
  whoCollectedPublication: PaginatedWhoCollectedResult;
  profilePublicationsForSale: PaginatedProfilePublicationsForSaleResult;
  allPublicationsTags: PaginatedAllPublicationsTagsResult;
  search: SearchResult;
  userSigNonces: UserSigNonces;
  claimableHandles: ClaimableHandles;
  claimableStatus: ClaimStatus;
  internalPublicationFilter: PaginatedPublicationResult;
  profileOnChainIdentity: Array<OnChainIdentity>;
  /** Get the list of profile interests */
  profileInterests: Array<Scalars['ProfileInterest']>;
  proxyActionStatus: ProxyActionStatusResultUnion;
  validatePublicationMetadata: PublicationValidateMetadataResult;
  publicationMetadataStatus: PublicationMetadataStatus;
  whoReactedPublication: PaginatedWhoReactedResult;
  profilePublicationRevenue: ProfilePublicationRevenueResult;
  publicationRevenue: Maybe<PublicationRevenue>;
  profileFollowRevenue: FollowRevenueResult;
  rel: Maybe<Scalars['Void']>;
  cur: Array<Scalars['String']>;
};

export type QueryChallengeArgs = {
  request: ChallengeRequest;
};

export type QueryVerifyArgs = {
  request: VerifyRequest;
};

export type QueryTxIdToTxHashArgs = {
  txId: Scalars['TxId'];
};

export type QueryExplorePublicationsArgs = {
  request: ExplorePublicationRequest;
};

export type QueryExploreProfilesArgs = {
  request: ExploreProfilesRequest;
};

export type QueryFeedArgs = {
  request: FeedRequest;
};

export type QueryFeedHighlightsArgs = {
  request: FeedHighlightsRequest;
};

export type QueryTimelineArgs = {
  request: TimelineRequest;
};

export type QueryPendingApprovalFollowsArgs = {
  request: PendingApprovalFollowsRequest;
};

export type QueryDoesFollowArgs = {
  request: DoesFollowRequest;
};

export type QueryFollowingArgs = {
  request: FollowingRequest;
};

export type QueryFollowersArgs = {
  request: FollowersRequest;
};

export type QueryFollowerNftOwnedTokenIdsArgs = {
  request: FollowerNftOwnedTokenIdsRequest;
};

export type QueryMutualFollowersProfilesArgs = {
  request: MutualFollowersProfilesQueryRequest;
};

export type QueryHasTxHashBeenIndexedArgs = {
  request: HasTxHashBeenIndexedRequest;
};

export type QueryApprovedModuleAllowanceAmountArgs = {
  request: ApprovedModuleAllowanceAmountRequest;
};

export type QueryGenerateModuleCurrencyApprovalDataArgs = {
  request: GenerateModuleCurrencyApprovalDataRequest;
};

export type QueryProfileFollowModuleBeenRedeemedArgs = {
  request: ProfileFollowModuleBeenRedeemedRequest;
};

export type QueryNftsArgs = {
  request: NfTsRequest;
};

export type QueryNftOwnershipChallengeArgs = {
  request: NftOwnershipChallengeRequest;
};

export type QueryNotificationsArgs = {
  request: NotificationRequest;
};

export type QueryProfilesArgs = {
  request: ProfileQueryRequest;
};

export type QueryProfileArgs = {
  request: SingleProfileQueryRequest;
};

export type QueryRecommendedProfilesArgs = {
  options?: Maybe<RecommendedProfileOptions>;
};

export type QueryDefaultProfileArgs = {
  request: DefaultProfileRequest;
};

export type QueryGlobalProtocolStatsArgs = {
  request?: Maybe<GlobalProtocolStatsRequest>;
};

export type QueryPublicationsArgs = {
  request: PublicationsQueryRequest;
};

export type QueryPublicationArgs = {
  request: PublicationQueryRequest;
};

export type QueryWhoCollectedPublicationArgs = {
  request: WhoCollectedPublicationRequest;
};

export type QueryProfilePublicationsForSaleArgs = {
  request: ProfilePublicationsForSaleRequest;
};

export type QueryAllPublicationsTagsArgs = {
  request: AllPublicationsTagsRequest;
};

export type QuerySearchArgs = {
  request: SearchQueryRequest;
};

export type QueryInternalPublicationFilterArgs = {
  request: InternalPublicationsFilterRequest;
};

export type QueryProfileOnChainIdentityArgs = {
  request: ProfileOnChainIdentityRequest;
};

export type QueryProxyActionStatusArgs = {
  proxyActionId: Scalars['ProxyActionId'];
};

export type QueryValidatePublicationMetadataArgs = {
  request: ValidatePublicationMetadataRequest;
};

export type QueryPublicationMetadataStatusArgs = {
  request: GetPublicationMetadataStatusRequest;
};

export type QueryWhoReactedPublicationArgs = {
  request: WhoReactedPublicationRequest;
};

export type QueryProfilePublicationRevenueArgs = {
  request: ProfilePublicationRevenueQueryRequest;
};

export type QueryPublicationRevenueArgs = {
  request: PublicationRevenueQueryRequest;
};

export type QueryProfileFollowRevenueArgs = {
  request: ProfileFollowRevenueQueryRequest;
};

export type QueryRelArgs = {
  request: RelRequest;
};

export type QueryCurArgs = {
  request: CurRequest;
};

export type ReactionEvent = {
  __typename: 'ReactionEvent';
  profile: Profile;
  reaction: ReactionTypes;
  timestamp: Scalars['DateTime'];
};

export type ReactionFieldResolverRequest = {
  /** Profile id */
  profileId?: Maybe<Scalars['ProfileId']>;
};

export type ReactionRequest = {
  /** Profile id to perform the action */
  profileId: Scalars['ProfileId'];
  /** The reaction */
  reaction: ReactionTypes;
  /** The internal publication id */
  publicationId: Scalars['InternalPublicationId'];
};

/** Reaction types */
export enum ReactionTypes {
  Upvote = 'UPVOTE',
  Downvote = 'DOWNVOTE',
}

export type RecommendedProfileOptions = {
  /** If you wish to turn ML off */
  disableML?: Maybe<Scalars['Boolean']>;
  /** If you wish to shuffle the results */
  shuffle?: Maybe<Scalars['Boolean']>;
};

export type ReferenceModule =
  | FollowOnlyReferenceModuleSettings
  | UnknownReferenceModuleSettings
  | DegreesOfSeparationReferenceModuleSettings;

export type ReferenceModuleParams = {
  /** The follower only reference module */
  followerOnlyReferenceModule?: Maybe<Scalars['Boolean']>;
  /** A unknown reference module */
  unknownReferenceModule?: Maybe<UnknownReferenceModuleParams>;
  /** The degrees of seperation reference module */
  degreesOfSeparationReferenceModule?: Maybe<DegreesOfSeparationReferenceModuleParams>;
};

/** The reference module types */
export enum ReferenceModules {
  FollowerOnlyReferenceModule = 'FollowerOnlyReferenceModule',
  DegreesOfSeparationReferenceModule = 'DegreesOfSeparationReferenceModule',
  UnknownReferenceModule = 'UnknownReferenceModule',
}

/** The refresh request */
export type RefreshRequest = {
  /** The refresh token */
  refreshToken: Scalars['Jwt'];
};

export type RelRequest = {
  secret: Scalars['String'];
  ethereumAddress: Scalars['EthereumAddress'];
};

export type RelayError = {
  __typename: 'RelayError';
  reason: RelayErrorReasons;
};

/** Relay error reason */
export enum RelayErrorReasons {
  Rejected = 'REJECTED',
  HandleTaken = 'HANDLE_TAKEN',
  Expired = 'EXPIRED',
  WrongWalletSigned = 'WRONG_WALLET_SIGNED',
  NotAllowed = 'NOT_ALLOWED',
}

export type RelayResult = RelayerResult | RelayError;

/** The relayer result */
export type RelayerResult = {
  __typename: 'RelayerResult';
  /** The tx hash - you should use the `txId` as your identifier as gas prices can be upgraded meaning txHash will change */
  txHash: Scalars['TxHash'];
  /** The tx id */
  txId: Scalars['TxId'];
};

/** The request object to remove interests from a profile */
export type RemoveProfileInterestsRequest = {
  /** The profile interest to add */
  interests: Array<Scalars['ProfileInterest']>;
  /** The profileId to add interests to */
  profileId: Scalars['ProfileId'];
};

export type ReportPublicationRequest = {
  publicationId: Scalars['InternalPublicationId'];
  reason: ReportingReasonInputParams;
  additionalComments?: Maybe<Scalars['String']>;
};

export type ReportingReasonInputParams = {
  sensitiveReason?: Maybe<SensitiveReasonInputParams>;
  illegalReason?: Maybe<IllegalReasonInputParams>;
  fraudReason?: Maybe<FraudReasonInputParams>;
  spamReason?: Maybe<SpamReasonInputParams>;
};

export type ReservedClaimableHandle = {
  __typename: 'ReservedClaimableHandle';
  id: Scalars['HandleClaimIdScalar'];
  handle: Scalars['Handle'];
  source: Scalars['String'];
  expiry: Scalars['DateTime'];
};

export type RevenueAggregate = {
  __typename: 'RevenueAggregate';
  total: Erc20Amount;
};

export type RevertCollectModuleSettings = {
  __typename: 'RevertCollectModuleSettings';
  /** The collect modules enum */
  type: CollectModules;
  contractAddress: Scalars['ContractAddress'];
};

export type RevertFollowModuleSettings = {
  __typename: 'RevertFollowModuleSettings';
  /** The follow module enum */
  type: FollowModules;
  contractAddress: Scalars['ContractAddress'];
};

/** The gated publication access criteria scalar operators */
export enum ScalarOperator {
  Equal = 'EQUAL',
  NotEqual = 'NOT_EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
}

export type SearchQueryRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** The search term */
  query: Scalars['Search'];
  type: SearchRequestTypes;
  customFilters?: Maybe<Array<CustomFiltersTypes>>;
  /** The App Id */
  sources?: Maybe<Array<Scalars['Sources']>>;
};

/** Search request types */
export enum SearchRequestTypes {
  Publication = 'PUBLICATION',
  Profile = 'PROFILE',
}

export type SearchResult = PublicationSearchResult | ProfileSearchResult;

export type SensitiveReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSensitiveSubreason;
};

/** The broadcast item */
export type SetDefaultProfileBroadcastItemResult = {
  __typename: 'SetDefaultProfileBroadcastItemResult';
  /** This broadcast item ID */
  id: Scalars['BroadcastId'];
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime'];
  /** The typed data */
  typedData: SetDefaultProfileEip712TypedData;
};

/** The default profile eip 712 typed data */
export type SetDefaultProfileEip712TypedData = {
  __typename: 'SetDefaultProfileEIP712TypedData';
  /** The types */
  types: SetDefaultProfileEip712TypedDataTypes;
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The values */
  value: SetDefaultProfileEip712TypedDataValue;
};

/** The default profile eip 712 typed data types */
export type SetDefaultProfileEip712TypedDataTypes = {
  __typename: 'SetDefaultProfileEIP712TypedDataTypes';
  SetDefaultProfileWithSig: Array<Eip712TypedDataField>;
};

/** The default profile eip 712 typed data value */
export type SetDefaultProfileEip712TypedDataValue = {
  __typename: 'SetDefaultProfileEIP712TypedDataValue';
  nonce: Scalars['Nonce'];
  deadline: Scalars['UnixTimestamp'];
  wallet: Scalars['EthereumAddress'];
  profileId: Scalars['ProfileId'];
};

export type SetDispatcherRequest = {
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** The dispatcher address - they can post, comment, mirror, set follow module, change your profile picture on your behalf, if left as none it will use the built in dispatcher address. */
  dispatcher?: Maybe<Scalars['EthereumAddress']>;
  /** If you want to enable or disable it */
  enable?: Maybe<Scalars['Boolean']>;
};

/** The signed auth challenge */
export type SignedAuthChallenge = {
  /** The ethereum address you signed the signature with */
  address: Scalars['EthereumAddress'];
  /** The signature */
  signature: Scalars['Signature'];
};

export type SingleProfileQueryRequest = {
  /** The profile id */
  profileId?: Maybe<Scalars['ProfileId']>;
  /** The handle for the profile */
  handle?: Maybe<Scalars['Handle']>;
};

export type SpamReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSpamSubreason;
};

export type SybilDotOrgIdentity = {
  __typename: 'SybilDotOrgIdentity';
  /** The sybil dot org status */
  verified: Scalars['Boolean'];
  source: SybilDotOrgIdentitySource;
};

export type SybilDotOrgIdentitySource = {
  __typename: 'SybilDotOrgIdentitySource';
  twitter: SybilDotOrgTwitterIdentity;
};

export type SybilDotOrgTwitterIdentity = {
  __typename: 'SybilDotOrgTwitterIdentity';
  handle: Maybe<Scalars['String']>;
};

/** The social comment */
export type TagResult = {
  __typename: 'TagResult';
  /** The tag */
  tag: Scalars['PublicationTag'];
  /** The total amount of publication tagged */
  total: Scalars['Int'];
};

/** The publications tags sort criteria */
export enum TagSortCriteria {
  MostPopular = 'MOST_POPULAR',
  Alphabetical = 'ALPHABETICAL',
}

export type TimedFeeCollectModuleParams = {
  /** The collect module amount info */
  amount: ModuleFeeAmountParams;
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
};

export type TimedFeeCollectModuleSettings = {
  __typename: 'TimedFeeCollectModuleSettings';
  /** The collect modules enum */
  type: CollectModules;
  contractAddress: Scalars['ContractAddress'];
  /** The collect module amount info */
  amount: ModuleFeeAmount;
  /** The collect module recipient address */
  recipient: Scalars['EthereumAddress'];
  /** The collect module referral fee */
  referralFee: Scalars['Float'];
  /** Follower only */
  followerOnly: Scalars['Boolean'];
  /** The collect module end timestamp */
  endTimestamp: Scalars['DateTime'];
};

export type TimelineRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** The profile id */
  profileId: Scalars['ProfileId'];
  /** The App Id */
  sources?: Maybe<Array<Scalars['Sources']>>;
  /** The timeline types you wish to include, if nothing passed in will bring back all */
  timelineTypes?: Maybe<Array<TimelineType>>;
  metadata?: Maybe<PublicationMetadataFilters>;
};

/** Timeline types */
export enum TimelineType {
  Post = 'POST',
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  CollectPost = 'COLLECT_POST',
  CollectComment = 'COLLECT_COMMENT',
}

export type TransactionError = {
  __typename: 'TransactionError';
  reason: TransactionErrorReasons;
  txReceipt: Maybe<TransactionReceipt>;
};

/** Transaction error reason */
export enum TransactionErrorReasons {
  Reverted = 'REVERTED',
}

export type TransactionIndexedResult = {
  __typename: 'TransactionIndexedResult';
  indexed: Scalars['Boolean'];
  txHash: Scalars['TxHash'];
  txReceipt: Maybe<TransactionReceipt>;
  /** Publications can be indexed but the ipfs link for example not findable for x time. This allows you to work that out for publications. If its not a publication tx then it always be null. */
  metadataStatus: Maybe<PublicationMetadataStatus>;
};

export type TransactionReceipt = {
  __typename: 'TransactionReceipt';
  to: Maybe<Scalars['EthereumAddress']>;
  from: Scalars['EthereumAddress'];
  contractAddress: Maybe<Scalars['ContractAddress']>;
  transactionIndex: Scalars['Int'];
  root: Maybe<Scalars['String']>;
  gasUsed: Scalars['String'];
  logsBloom: Scalars['String'];
  blockHash: Scalars['String'];
  transactionHash: Scalars['TxHash'];
  logs: Array<Log>;
  blockNumber: Scalars['Int'];
  confirmations: Scalars['Int'];
  cumulativeGasUsed: Scalars['String'];
  effectiveGasPrice: Scalars['String'];
  byzantium: Scalars['Boolean'];
  type: Scalars['Int'];
  status: Maybe<Scalars['Int']>;
};

export type TransactionResult = TransactionIndexedResult | TransactionError;

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

export type UnknownCollectModuleSettings = {
  __typename: 'UnknownCollectModuleSettings';
  /** The collect modules enum */
  type: CollectModules;
  contractAddress: Scalars['ContractAddress'];
  /** The data used to setup the module which you can decode with your known ABI  */
  collectModuleReturnData: Scalars['CollectModuleData'];
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

export type UnknownFollowModuleSettings = {
  __typename: 'UnknownFollowModuleSettings';
  /** The follow modules enum */
  type: FollowModules;
  contractAddress: Scalars['ContractAddress'];
  /** The data used to setup the module which you can decode with your known ABI  */
  followModuleReturnData: Scalars['FollowModuleData'];
};

export type UnknownReferenceModuleParams = {
  contractAddress: Scalars['ContractAddress'];
  /** The encoded data to submit with the module */
  data: Scalars['BlockchainData'];
};

export type UnknownReferenceModuleSettings = {
  __typename: 'UnknownReferenceModuleSettings';
  /** The reference modules enum */
  type: ReferenceModules;
  contractAddress: Scalars['ContractAddress'];
  /** The data used to setup the module which you can decode with your known ABI  */
  referenceModuleReturnData: Scalars['ReferenceModuleData'];
};

export type UpdateProfileImageRequest = {
  profileId: Scalars['ProfileId'];
  /** The url to the image if offline */
  url?: Maybe<Scalars['Url']>;
  /** The nft data */
  nftData?: Maybe<NftData>;
};

export type UserSigNonces = {
  __typename: 'UserSigNonces';
  lensHubOnChainSigNonce: Scalars['Nonce'];
  peripheryOnChainSigNonce: Scalars['Nonce'];
};

export type ValidatePublicationMetadataRequest = {
  metadatav1?: Maybe<PublicationMetadataV1Input>;
  metadatav2?: Maybe<PublicationMetadataV2Input>;
};

/** The access request */
export type VerifyRequest = {
  /** The access token */
  accessToken: Scalars['Jwt'];
};

export type Wallet = {
  __typename: 'Wallet';
  address: Scalars['EthereumAddress'];
  /** The default profile for the wallet for now it is just their first profile, this will be the default profile they picked soon enough */
  defaultProfile: Maybe<Profile>;
};

export type WhoCollectedPublicationRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** Internal publication id */
  publicationId: Scalars['InternalPublicationId'];
};

export type WhoReactedPublicationRequest = {
  limit?: Maybe<Scalars['LimitScalar']>;
  cursor?: Maybe<Scalars['Cursor']>;
  /** Internal publication id */
  publicationId: Scalars['InternalPublicationId'];
};

/** The Profile */
export type WhoReactedResult = {
  __typename: 'WhoReactedResult';
  /** The reaction id */
  reactionId: Scalars['ReactionId'];
  /** The reaction */
  reaction: ReactionTypes;
  /** The reaction */
  reactionAt: Scalars['DateTime'];
  profile: Profile;
};

export type WorldcoinIdentity = {
  __typename: 'WorldcoinIdentity';
  /** If the profile has verified as a user */
  isHuman: Scalars['Boolean'];
};

export type Erc20Fragment = { __typename: 'Erc20' } & Pick<
  Erc20,
  'name' | 'symbol' | 'decimals' | 'address'
>;

export type ModuleFeeAmountFragment = { __typename: 'ModuleFeeAmount' } & Pick<
  ModuleFeeAmount,
  'value'
> & { asset: { __typename: 'Erc20' } & Erc20Fragment };

type ReferenceModule_FollowOnlyReferenceModuleSettings_Fragment = {
  __typename: 'FollowOnlyReferenceModuleSettings';
} & Pick<FollowOnlyReferenceModuleSettings, 'contractAddress'>;

type ReferenceModule_UnknownReferenceModuleSettings_Fragment = {
  __typename: 'UnknownReferenceModuleSettings';
};

type ReferenceModule_DegreesOfSeparationReferenceModuleSettings_Fragment = {
  __typename: 'DegreesOfSeparationReferenceModuleSettings';
};

export type ReferenceModuleFragment =
  | ReferenceModule_FollowOnlyReferenceModuleSettings_Fragment
  | ReferenceModule_UnknownReferenceModuleSettings_Fragment
  | ReferenceModule_DegreesOfSeparationReferenceModuleSettings_Fragment;

export type FreeCollectModuleSettingsFragment = { __typename: 'FreeCollectModuleSettings' } & Pick<
  FreeCollectModuleSettings,
  'contractAddress' | 'followerOnly'
>;

export type FeeCollectModuleSettingsFragment = { __typename: 'FeeCollectModuleSettings' } & Pick<
  FeeCollectModuleSettings,
  'contractAddress' | 'followerOnly' | 'recipient' | 'referralFee'
> & { amount: { __typename: 'ModuleFeeAmount' } & ModuleFeeAmountFragment };

export type LimitedFeeCollectModuleSettingsFragment = {
  __typename: 'LimitedFeeCollectModuleSettings';
} & Pick<
  LimitedFeeCollectModuleSettings,
  'collectLimit' | 'contractAddress' | 'followerOnly' | 'recipient' | 'referralFee'
> & { amount: { __typename: 'ModuleFeeAmount' } & ModuleFeeAmountFragment };

export type LimitedTimedFeeCollectModuleSettingsFragment = {
  __typename: 'LimitedTimedFeeCollectModuleSettings';
} & Pick<
  LimitedTimedFeeCollectModuleSettings,
  'collectLimit' | 'contractAddress' | 'followerOnly' | 'endTimestamp' | 'recipient' | 'referralFee'
> & { amount: { __typename: 'ModuleFeeAmount' } & ModuleFeeAmountFragment };

export type RevertCollectModuleSettingsFragment = {
  __typename: 'RevertCollectModuleSettings';
} & Pick<RevertCollectModuleSettings, 'contractAddress'>;

export type TimedFeeCollectModuleSettingsFragment = {
  __typename: 'TimedFeeCollectModuleSettings';
} & Pick<
  TimedFeeCollectModuleSettings,
  'contractAddress' | 'followerOnly' | 'endTimestamp' | 'recipient' | 'referralFee'
> & { amount: { __typename: 'ModuleFeeAmount' } & ModuleFeeAmountFragment };

type CollectModule_FreeCollectModuleSettings_Fragment = {
  __typename: 'FreeCollectModuleSettings';
} & FreeCollectModuleSettingsFragment;

type CollectModule_FeeCollectModuleSettings_Fragment = {
  __typename: 'FeeCollectModuleSettings';
} & FeeCollectModuleSettingsFragment;

type CollectModule_LimitedFeeCollectModuleSettings_Fragment = {
  __typename: 'LimitedFeeCollectModuleSettings';
} & LimitedFeeCollectModuleSettingsFragment;

type CollectModule_LimitedTimedFeeCollectModuleSettings_Fragment = {
  __typename: 'LimitedTimedFeeCollectModuleSettings';
} & LimitedTimedFeeCollectModuleSettingsFragment;

type CollectModule_RevertCollectModuleSettings_Fragment = {
  __typename: 'RevertCollectModuleSettings';
} & RevertCollectModuleSettingsFragment;

type CollectModule_TimedFeeCollectModuleSettings_Fragment = {
  __typename: 'TimedFeeCollectModuleSettings';
} & TimedFeeCollectModuleSettingsFragment;

type CollectModule_UnknownCollectModuleSettings_Fragment = {
  __typename: 'UnknownCollectModuleSettings';
};

export type CollectModuleFragment =
  | CollectModule_FreeCollectModuleSettings_Fragment
  | CollectModule_FeeCollectModuleSettings_Fragment
  | CollectModule_LimitedFeeCollectModuleSettings_Fragment
  | CollectModule_LimitedTimedFeeCollectModuleSettings_Fragment
  | CollectModule_RevertCollectModuleSettings_Fragment
  | CollectModule_TimedFeeCollectModuleSettings_Fragment
  | CollectModule_UnknownCollectModuleSettings_Fragment;

export type WalletFragment = { __typename: 'Wallet' } & Pick<Wallet, 'address'> & {
    defaultProfile: Maybe<{ __typename: 'Profile' } & ProfileFieldsFragment>;
  };

export type MetadataFragment = { __typename: 'MetadataOutput' } & Pick<
  MetadataOutput,
  'name' | 'description' | 'mainContentFocus' | 'content'
> & {
    media: Array<{ __typename: 'MediaSet' } & MediaSetFragment>;
    attributes: Array<{ __typename: 'MetadataAttributeOutput' } & MetadataAttributeOutputFragment>;
  };

export type MetadataAttributeOutputFragment = { __typename: 'MetadataAttributeOutput' } & Pick<
  MetadataAttributeOutput,
  'traitType' | 'value'
>;

export type PublicationStatsFragment = { __typename: 'PublicationStats' } & Pick<
  PublicationStats,
  'totalAmountOfMirrors' | 'totalUpvotes' | 'totalAmountOfCollects' | 'totalAmountOfComments'
>;

export type MirrorBaseFragment = { __typename: 'Mirror' } & Pick<
  Mirror,
  | 'id'
  | 'createdAt'
  | 'hidden'
  | 'isGated'
  | 'reaction'
  | 'hasCollectedByMe'
  | 'hasOptimisticCollectedByMe'
  | 'isOptimisticMirroredByMe'
  | 'ownedByMe'
> & {
    stats: { __typename: 'PublicationStats' } & PublicationStatsFragment;
    metadata: { __typename: 'MetadataOutput' } & MetadataFragment;
    profile: { __typename: 'Profile' } & ProfileFieldsFragment;
    collectModule:
      | ({
          __typename: 'FreeCollectModuleSettings';
        } & CollectModule_FreeCollectModuleSettings_Fragment)
      | ({
          __typename: 'FeeCollectModuleSettings';
        } & CollectModule_FeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'LimitedFeeCollectModuleSettings';
        } & CollectModule_LimitedFeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'LimitedTimedFeeCollectModuleSettings';
        } & CollectModule_LimitedTimedFeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'RevertCollectModuleSettings';
        } & CollectModule_RevertCollectModuleSettings_Fragment)
      | ({
          __typename: 'TimedFeeCollectModuleSettings';
        } & CollectModule_TimedFeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'UnknownCollectModuleSettings';
        } & CollectModule_UnknownCollectModuleSettings_Fragment);
    referenceModule: Maybe<
      | ({
          __typename: 'FollowOnlyReferenceModuleSettings';
        } & ReferenceModule_FollowOnlyReferenceModuleSettings_Fragment)
      | ({
          __typename: 'UnknownReferenceModuleSettings';
        } & ReferenceModule_UnknownReferenceModuleSettings_Fragment)
      | ({
          __typename: 'DegreesOfSeparationReferenceModuleSettings';
        } & ReferenceModule_DegreesOfSeparationReferenceModuleSettings_Fragment)
    >;
    canComment: { __typename: 'CanCommentResponse' } & Pick<CanCommentResponse, 'result'>;
    canMirror: { __typename: 'CanMirrorResponse' } & Pick<CanMirrorResponse, 'result'>;
  };

export type MirrorFragment = { __typename: 'Mirror' } & {
  mirrorOf: ({ __typename: 'Post' } & PostFragment) | ({ __typename: 'Comment' } & CommentFragment);
} & MirrorBaseFragment;

export type CommentBaseFragment = { __typename: 'Comment' } & Pick<
  Comment,
  | 'id'
  | 'createdAt'
  | 'hidden'
  | 'isGated'
  | 'reaction'
  | 'hasCollectedByMe'
  | 'mirrors'
  | 'hasOptimisticCollectedByMe'
  | 'isOptimisticMirroredByMe'
  | 'ownedByMe'
> & {
    stats: { __typename: 'PublicationStats' } & PublicationStatsFragment;
    metadata: { __typename: 'MetadataOutput' } & MetadataFragment;
    profile: { __typename: 'Profile' } & ProfileFieldsFragment;
    collectedBy: Maybe<{ __typename: 'Wallet' } & WalletFragment>;
    collectModule:
      | ({
          __typename: 'FreeCollectModuleSettings';
        } & CollectModule_FreeCollectModuleSettings_Fragment)
      | ({
          __typename: 'FeeCollectModuleSettings';
        } & CollectModule_FeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'LimitedFeeCollectModuleSettings';
        } & CollectModule_LimitedFeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'LimitedTimedFeeCollectModuleSettings';
        } & CollectModule_LimitedTimedFeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'RevertCollectModuleSettings';
        } & CollectModule_RevertCollectModuleSettings_Fragment)
      | ({
          __typename: 'TimedFeeCollectModuleSettings';
        } & CollectModule_TimedFeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'UnknownCollectModuleSettings';
        } & CollectModule_UnknownCollectModuleSettings_Fragment);
    referenceModule: Maybe<
      | ({
          __typename: 'FollowOnlyReferenceModuleSettings';
        } & ReferenceModule_FollowOnlyReferenceModuleSettings_Fragment)
      | ({
          __typename: 'UnknownReferenceModuleSettings';
        } & ReferenceModule_UnknownReferenceModuleSettings_Fragment)
      | ({
          __typename: 'DegreesOfSeparationReferenceModuleSettings';
        } & ReferenceModule_DegreesOfSeparationReferenceModuleSettings_Fragment)
    >;
    canComment: { __typename: 'CanCommentResponse' } & Pick<CanCommentResponse, 'result'>;
    canMirror: { __typename: 'CanMirrorResponse' } & Pick<CanMirrorResponse, 'result'>;
  };

export type CommonPaginatedResultInfoFragment = { __typename: 'PaginatedResultInfo' } & Pick<
  PaginatedResultInfo,
  'prev' | 'next' | 'totalCount'
>;

export type CommentFragment = { __typename: 'Comment' } & {
  commentOn: Maybe<
    | ({ __typename: 'Post' } & PostFragment)
    | ({ __typename: 'Comment' } & CommentBaseFragment)
    | ({ __typename: 'Mirror' } & MirrorBaseFragment)
  >;
  mainPost:
    | ({ __typename: 'Post' } & PostFragment)
    | ({ __typename: 'Mirror' } & MirrorBaseFragment);
} & CommentBaseFragment;

export type PostFragment = { __typename: 'Post' } & Pick<
  Post,
  | 'id'
  | 'createdAt'
  | 'hidden'
  | 'isGated'
  | 'reaction'
  | 'hasCollectedByMe'
  | 'mirrors'
  | 'hasOptimisticCollectedByMe'
  | 'isOptimisticMirroredByMe'
  | 'ownedByMe'
> & {
    stats: { __typename: 'PublicationStats' } & PublicationStatsFragment;
    metadata: { __typename: 'MetadataOutput' } & MetadataFragment;
    profile: { __typename: 'Profile' } & ProfileFieldsFragment;
    collectedBy: Maybe<{ __typename: 'Wallet' } & WalletFragment>;
    collectModule:
      | ({
          __typename: 'FreeCollectModuleSettings';
        } & CollectModule_FreeCollectModuleSettings_Fragment)
      | ({
          __typename: 'FeeCollectModuleSettings';
        } & CollectModule_FeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'LimitedFeeCollectModuleSettings';
        } & CollectModule_LimitedFeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'LimitedTimedFeeCollectModuleSettings';
        } & CollectModule_LimitedTimedFeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'RevertCollectModuleSettings';
        } & CollectModule_RevertCollectModuleSettings_Fragment)
      | ({
          __typename: 'TimedFeeCollectModuleSettings';
        } & CollectModule_TimedFeeCollectModuleSettings_Fragment)
      | ({
          __typename: 'UnknownCollectModuleSettings';
        } & CollectModule_UnknownCollectModuleSettings_Fragment);
    referenceModule: Maybe<
      | ({
          __typename: 'FollowOnlyReferenceModuleSettings';
        } & ReferenceModule_FollowOnlyReferenceModuleSettings_Fragment)
      | ({
          __typename: 'UnknownReferenceModuleSettings';
        } & ReferenceModule_UnknownReferenceModuleSettings_Fragment)
      | ({
          __typename: 'DegreesOfSeparationReferenceModuleSettings';
        } & ReferenceModule_DegreesOfSeparationReferenceModuleSettings_Fragment)
    >;
    canComment: { __typename: 'CanCommentResponse' } & Pick<CanCommentResponse, 'result'>;
    canMirror: { __typename: 'CanMirrorResponse' } & Pick<CanMirrorResponse, 'result'>;
  };

export type FeedItemFragment = { __typename: 'FeedItem' } & {
  root: ({ __typename: 'Post' } & PostFragment) | ({ __typename: 'Comment' } & CommentFragment);
  comments: Maybe<Array<{ __typename: 'Comment' } & CommentFragment>>;
};

export type FeedQueryVariables = Exact<{
  profileId: Scalars['ProfileId'];
  observerId?: Maybe<Scalars['ProfileId']>;
  limit: Scalars['LimitScalar'];
  cursor?: Maybe<Scalars['Cursor']>;
  sources?: Maybe<Array<Scalars['Sources']> | Scalars['Sources']>;
}>;

export type FeedQuery = {
  result: { __typename: 'PaginatedFeedResult' } & {
    items: Array<{ __typename: 'FeedItem' } & FeedItemFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & CommonPaginatedResultInfoFragment;
  };
};

export type MediaFieldsFragment = { __typename: 'Media' } & Pick<Media, 'url' | 'mimeType'>;

export type MediaSetFragment = { __typename: 'MediaSet' } & {
  original: { __typename: 'Media' } & MediaFieldsFragment;
};

export type FeeFollowModuleSettingsFragment = { __typename: 'FeeFollowModuleSettings' } & Pick<
  FeeFollowModuleSettings,
  'contractAddress' | 'recipient'
> & { amount: { __typename: 'ModuleFeeAmount' } & ModuleFeeAmountFragment };

export type ProfileFollowModuleSettingsFragment = {
  __typename: 'ProfileFollowModuleSettings';
} & Pick<ProfileFollowModuleSettings, 'contractAddress'>;

export type RevertFollowModuleSettingsFragment = {
  __typename: 'RevertFollowModuleSettings';
} & Pick<RevertFollowModuleSettings, 'contractAddress'>;

type ProfileMediaFields_NftImage_Fragment = { __typename: 'NftImage' } & Pick<
  NftImage,
  'contractAddress' | 'tokenId' | 'uri' | 'verified'
>;

type ProfileMediaFields_MediaSet_Fragment = { __typename: 'MediaSet' } & MediaSetFragment;

export type ProfileMediaFieldsFragment =
  | ProfileMediaFields_NftImage_Fragment
  | ProfileMediaFields_MediaSet_Fragment;

export type AttributeFragment = { __typename: 'Attribute' } & Pick<Attribute, 'key' | 'value'>;

export type ProfileFieldsFragment = { __typename: 'Profile' } & Pick<
  Profile,
  | 'id'
  | 'name'
  | 'bio'
  | 'handle'
  | 'ownedBy'
  | 'isFollowedByMe'
  | 'isFollowing'
  | 'isOptimisticFollowedByMe'
  | 'location'
  | 'twitter'
  | 'website'
  | 'ownedByMe'
> & {
    attributes: Maybe<Array<{ __typename: 'Attribute' } & AttributeFragment>>;
    picture: Maybe<
      | ({ __typename: 'NftImage' } & ProfileMediaFields_NftImage_Fragment)
      | ({ __typename: 'MediaSet' } & ProfileMediaFields_MediaSet_Fragment)
    >;
    coverPicture: Maybe<
      | ({ __typename: 'NftImage' } & ProfileMediaFields_NftImage_Fragment)
      | ({ __typename: 'MediaSet' } & ProfileMediaFields_MediaSet_Fragment)
    >;
    stats: { __typename: 'ProfileStats' } & Pick<
      ProfileStats,
      'totalFollowers' | 'totalFollowing' | 'totalPosts'
    >;
    followModule: Maybe<
      | ({ __typename: 'FeeFollowModuleSettings' } & FeeFollowModuleSettingsFragment)
      | ({ __typename: 'ProfileFollowModuleSettings' } & ProfileFollowModuleSettingsFragment)
      | ({ __typename: 'RevertFollowModuleSettings' } & RevertFollowModuleSettingsFragment)
      | { __typename: 'UnknownFollowModuleSettings' }
    >;
    dispatcher: Maybe<{ __typename: 'Dispatcher' } & Pick<Dispatcher, 'address' | 'canUseRelay'>>;
  };

export type ProfilesToFollowQueryVariables = Exact<{
  observerId?: Maybe<Scalars['ProfileId']>;
}>;

export type ProfilesToFollowQuery = {
  recommendedProfiles: Array<{ __typename: 'Profile' } & ProfileFieldsFragment>;
};

export type GetProfileQueryVariables = Exact<{
  request: SingleProfileQueryRequest;
  observerId?: Maybe<Scalars['ProfileId']>;
}>;

export type GetProfileQuery = { result: Maybe<{ __typename: 'Profile' } & ProfileFieldsFragment> };

export type GetAllProfilesByOwnerAddressQueryVariables = Exact<{
  address: Scalars['EthereumAddress'];
  observerId?: Maybe<Scalars['ProfileId']>;
}>;

export type GetAllProfilesByOwnerAddressQuery = {
  profilesByOwner: { __typename: 'PaginatedProfileResult' } & {
    items: Array<{ __typename: 'Profile' } & ProfileFieldsFragment>;
  };
};

export const PublicationStatsFragmentDoc = gql`
  fragment PublicationStats on PublicationStats {
    totalAmountOfMirrors
    totalUpvotes
    totalAmountOfCollects
    totalAmountOfComments
  }
`;
export const MediaFieldsFragmentDoc = gql`
  fragment MediaFields on Media {
    url
    mimeType
  }
`;
export const MediaSetFragmentDoc = gql`
  fragment MediaSet on MediaSet {
    original {
      ...MediaFields
    }
  }
  ${MediaFieldsFragmentDoc}
`;
export const MetadataAttributeOutputFragmentDoc = gql`
  fragment MetadataAttributeOutput on MetadataAttributeOutput {
    traitType
    value
  }
`;
export const MetadataFragmentDoc = gql`
  fragment Metadata on MetadataOutput {
    name
    description
    mainContentFocus
    content
    media {
      ...MediaSet
    }
    attributes {
      ...MetadataAttributeOutput
    }
  }
  ${MediaSetFragmentDoc}
  ${MetadataAttributeOutputFragmentDoc}
`;
export const AttributeFragmentDoc = gql`
  fragment Attribute on Attribute {
    __typename
    key
    value
  }
`;
export const ProfileMediaFieldsFragmentDoc = gql`
  fragment ProfileMediaFields on ProfileMedia {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      ...MediaSet
    }
  }
  ${MediaSetFragmentDoc}
`;
export const Erc20FragmentDoc = gql`
  fragment Erc20 on Erc20 {
    name
    symbol
    decimals
    address
  }
`;
export const ModuleFeeAmountFragmentDoc = gql`
  fragment ModuleFeeAmount on ModuleFeeAmount {
    asset {
      ...Erc20
    }
    value
  }
  ${Erc20FragmentDoc}
`;
export const FeeFollowModuleSettingsFragmentDoc = gql`
  fragment FeeFollowModuleSettings on FeeFollowModuleSettings {
    __typename
    amount {
      ...ModuleFeeAmount
    }
    contractAddress
    recipient
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const ProfileFollowModuleSettingsFragmentDoc = gql`
  fragment ProfileFollowModuleSettings on ProfileFollowModuleSettings {
    __typename
    contractAddress
  }
`;
export const RevertFollowModuleSettingsFragmentDoc = gql`
  fragment RevertFollowModuleSettings on RevertFollowModuleSettings {
    __typename
    contractAddress
  }
`;
export const ProfileFieldsFragmentDoc = gql`
  fragment ProfileFields on Profile {
    id
    name
    bio
    handle
    ownedBy
    attributes {
      ...Attribute
    }
    picture {
      ...ProfileMediaFields
    }
    coverPicture {
      ...ProfileMediaFields
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
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
    }
    dispatcher {
      address
      canUseRelay
    }
    isFollowedByMe(isFinalisedOnChain: true)
    isFollowing(who: $observerId)
    isOptimisticFollowedByMe @client
    location @client
    twitter @client
    website @client
    ownedByMe @client
  }
  ${AttributeFragmentDoc}
  ${ProfileMediaFieldsFragmentDoc}
  ${FeeFollowModuleSettingsFragmentDoc}
  ${ProfileFollowModuleSettingsFragmentDoc}
  ${RevertFollowModuleSettingsFragmentDoc}
`;
export const FreeCollectModuleSettingsFragmentDoc = gql`
  fragment FreeCollectModuleSettings on FreeCollectModuleSettings {
    contractAddress
    followerOnly
  }
`;
export const FeeCollectModuleSettingsFragmentDoc = gql`
  fragment FeeCollectModuleSettings on FeeCollectModuleSettings {
    amount {
      ...ModuleFeeAmount
    }
    contractAddress
    followerOnly
    recipient
    referralFee
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const LimitedFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LimitedFeeCollectModuleSettings on LimitedFeeCollectModuleSettings {
    amount {
      ...ModuleFeeAmount
    }
    collectLimit
    contractAddress
    followerOnly
    recipient
    referralFee
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const LimitedTimedFeeCollectModuleSettingsFragmentDoc = gql`
  fragment LimitedTimedFeeCollectModuleSettings on LimitedTimedFeeCollectModuleSettings {
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
  ${ModuleFeeAmountFragmentDoc}
`;
export const RevertCollectModuleSettingsFragmentDoc = gql`
  fragment RevertCollectModuleSettings on RevertCollectModuleSettings {
    contractAddress
  }
`;
export const TimedFeeCollectModuleSettingsFragmentDoc = gql`
  fragment TimedFeeCollectModuleSettings on TimedFeeCollectModuleSettings {
    amount {
      ...ModuleFeeAmount
    }
    contractAddress
    followerOnly
    endTimestamp
    recipient
    referralFee
  }
  ${ModuleFeeAmountFragmentDoc}
`;
export const CollectModuleFragmentDoc = gql`
  fragment CollectModule on CollectModule {
    __typename
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
  }
  ${FreeCollectModuleSettingsFragmentDoc}
  ${FeeCollectModuleSettingsFragmentDoc}
  ${LimitedFeeCollectModuleSettingsFragmentDoc}
  ${LimitedTimedFeeCollectModuleSettingsFragmentDoc}
  ${RevertCollectModuleSettingsFragmentDoc}
  ${TimedFeeCollectModuleSettingsFragmentDoc}
`;
export const ReferenceModuleFragmentDoc = gql`
  fragment ReferenceModule on ReferenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      contractAddress
    }
  }
`;
export const MirrorBaseFragmentDoc = gql`
  fragment MirrorBase on Mirror {
    __typename
    id
    stats {
      ...PublicationStats
    }
    metadata {
      ...Metadata
    }
    profile {
      ...ProfileFields
    }
    collectModule {
      ...CollectModule
    }
    referenceModule {
      ...ReferenceModule
    }
    createdAt
    hidden
    isGated
    reaction(request: { profileId: $observerId })
    hasCollectedByMe(isFinalisedOnChain: true)
    canComment(profileId: $observerId) {
      result
    }
    canMirror(profileId: $observerId) {
      result
    }
    hasOptimisticCollectedByMe @client
    isOptimisticMirroredByMe @client
    ownedByMe @client
  }
  ${PublicationStatsFragmentDoc}
  ${MetadataFragmentDoc}
  ${ProfileFieldsFragmentDoc}
  ${CollectModuleFragmentDoc}
  ${ReferenceModuleFragmentDoc}
`;
export const WalletFragmentDoc = gql`
  fragment Wallet on Wallet {
    address
    defaultProfile {
      ...ProfileFields
    }
  }
  ${ProfileFieldsFragmentDoc}
`;
export const PostFragmentDoc = gql`
  fragment Post on Post {
    __typename
    id
    stats {
      ...PublicationStats
    }
    metadata {
      ...Metadata
    }
    profile {
      ...ProfileFields
    }
    collectedBy {
      ...Wallet
    }
    collectModule {
      ...CollectModule
    }
    referenceModule {
      ...ReferenceModule
    }
    createdAt
    hidden
    isGated
    reaction(request: { profileId: $observerId })
    hasCollectedByMe(isFinalisedOnChain: true)
    canComment(profileId: $observerId) {
      result
    }
    canMirror(profileId: $observerId) {
      result
    }
    mirrors(by: $observerId)
    hasOptimisticCollectedByMe @client
    isOptimisticMirroredByMe @client
    ownedByMe @client
  }
  ${PublicationStatsFragmentDoc}
  ${MetadataFragmentDoc}
  ${ProfileFieldsFragmentDoc}
  ${WalletFragmentDoc}
  ${CollectModuleFragmentDoc}
  ${ReferenceModuleFragmentDoc}
`;
export const CommentBaseFragmentDoc = gql`
  fragment CommentBase on Comment {
    __typename
    id
    stats {
      ...PublicationStats
    }
    metadata {
      ...Metadata
    }
    profile {
      ...ProfileFields
    }
    collectedBy {
      ...Wallet
    }
    collectModule {
      ...CollectModule
    }
    referenceModule {
      ...ReferenceModule
    }
    createdAt
    hidden
    isGated
    reaction(request: { profileId: $observerId })
    hasCollectedByMe(isFinalisedOnChain: true)
    canComment(profileId: $observerId) {
      result
    }
    canMirror(profileId: $observerId) {
      result
    }
    mirrors(by: $observerId)
    hasOptimisticCollectedByMe @client
    isOptimisticMirroredByMe @client
    ownedByMe @client
  }
  ${PublicationStatsFragmentDoc}
  ${MetadataFragmentDoc}
  ${ProfileFieldsFragmentDoc}
  ${WalletFragmentDoc}
  ${CollectModuleFragmentDoc}
  ${ReferenceModuleFragmentDoc}
`;
export const CommentFragmentDoc = gql`
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
  }
  ${CommentBaseFragmentDoc}
  ${PostFragmentDoc}
  ${MirrorBaseFragmentDoc}
`;
export const MirrorFragmentDoc = gql`
  fragment Mirror on Mirror {
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
  ${MirrorBaseFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
`;
export const CommonPaginatedResultInfoFragmentDoc = gql`
  fragment CommonPaginatedResultInfo on PaginatedResultInfo {
    prev
    next
    totalCount
  }
`;
export const FeedItemFragmentDoc = gql`
  fragment FeedItem on FeedItem {
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
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
`;
export const FeedDocument = gql`
  query Feed(
    $profileId: ProfileId!
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]
  ) {
    result: feed(
      request: { profileId: $profileId, limit: $limit, cursor: $cursor, sources: $sources }
    ) {
      items {
        ...FeedItem
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FeedItemFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
}
export function useFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
}
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const ProfilesToFollowDocument = gql`
  query ProfilesToFollow($observerId: ProfileId) {
    recommendedProfiles {
      ...ProfileFields
    }
  }
  ${ProfileFieldsFragmentDoc}
`;

/**
 * __useProfilesToFollowQuery__
 *
 * To run a query within a React component, call `useProfilesToFollowQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilesToFollowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilesToFollowQuery({
 *   variables: {
 *      observerId: // value for 'observerId'
 *   },
 * });
 */
export function useProfilesToFollowQuery(
  baseOptions?: Apollo.QueryHookOptions<ProfilesToFollowQuery, ProfilesToFollowQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfilesToFollowQuery, ProfilesToFollowQueryVariables>(
    ProfilesToFollowDocument,
    options,
  );
}
export function useProfilesToFollowLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfilesToFollowQuery, ProfilesToFollowQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfilesToFollowQuery, ProfilesToFollowQueryVariables>(
    ProfilesToFollowDocument,
    options,
  );
}
export type ProfilesToFollowQueryHookResult = ReturnType<typeof useProfilesToFollowQuery>;
export type ProfilesToFollowLazyQueryHookResult = ReturnType<typeof useProfilesToFollowLazyQuery>;
export type ProfilesToFollowQueryResult = Apollo.QueryResult<
  ProfilesToFollowQuery,
  ProfilesToFollowQueryVariables
>;
export const GetProfileDocument = gql`
  query GetProfile($request: SingleProfileQueryRequest!, $observerId: ProfileId) {
    result: profile(request: $request) {
      ...ProfileFields
    }
  }
  ${ProfileFieldsFragmentDoc}
`;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      request: // value for 'request'
 *      observerId: // value for 'observerId'
 *   },
 * });
 */
export function useGetProfileQuery(
  baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
}
export function useGetProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(
    GetProfileDocument,
    options,
  );
}
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const GetAllProfilesByOwnerAddressDocument = gql`
  query GetAllProfilesByOwnerAddress($address: EthereumAddress!, $observerId: ProfileId) {
    profilesByOwner: profiles(request: { ownedBy: [$address] }) {
      items {
        ...ProfileFields
      }
    }
  }
  ${ProfileFieldsFragmentDoc}
`;

/**
 * __useGetAllProfilesByOwnerAddressQuery__
 *
 * To run a query within a React component, call `useGetAllProfilesByOwnerAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProfilesByOwnerAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProfilesByOwnerAddressQuery({
 *   variables: {
 *      address: // value for 'address'
 *      observerId: // value for 'observerId'
 *   },
 * });
 */
export function useGetAllProfilesByOwnerAddressQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllProfilesByOwnerAddressQuery,
    GetAllProfilesByOwnerAddressQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllProfilesByOwnerAddressQuery,
    GetAllProfilesByOwnerAddressQueryVariables
  >(GetAllProfilesByOwnerAddressDocument, options);
}
export function useGetAllProfilesByOwnerAddressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllProfilesByOwnerAddressQuery,
    GetAllProfilesByOwnerAddressQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllProfilesByOwnerAddressQuery,
    GetAllProfilesByOwnerAddressQueryVariables
  >(GetAllProfilesByOwnerAddressDocument, options);
}
export type GetAllProfilesByOwnerAddressQueryHookResult = ReturnType<
  typeof useGetAllProfilesByOwnerAddressQuery
>;
export type GetAllProfilesByOwnerAddressLazyQueryHookResult = ReturnType<
  typeof useGetAllProfilesByOwnerAddressLazyQuery
>;
export type GetAllProfilesByOwnerAddressQueryResult = Apollo.QueryResult<
  GetAllProfilesByOwnerAddressQuery,
  GetAllProfilesByOwnerAddressQueryVariables
>;
export type AccessConditionOutputKeySpecifier = (
  | 'nft'
  | 'token'
  | 'eoa'
  | 'profile'
  | 'follow'
  | 'collect'
  | 'and'
  | 'or'
  | AccessConditionOutputKeySpecifier
)[];
export type AccessConditionOutputFieldPolicy = {
  nft?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
  eoa?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  follow?: FieldPolicy<any> | FieldReadFunction<any>;
  collect?: FieldPolicy<any> | FieldReadFunction<any>;
  and?: FieldPolicy<any> | FieldReadFunction<any>;
  or?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AndConditionOutputKeySpecifier = ('criteria' | AndConditionOutputKeySpecifier)[];
export type AndConditionOutputFieldPolicy = {
  criteria?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ApprovedAllowanceAmountKeySpecifier = (
  | 'currency'
  | 'module'
  | 'contractAddress'
  | 'allowance'
  | ApprovedAllowanceAmountKeySpecifier
)[];
export type ApprovedAllowanceAmountFieldPolicy = {
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  module?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  allowance?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AttributeKeySpecifier = (
  | 'displayType'
  | 'traitType'
  | 'key'
  | 'value'
  | AttributeKeySpecifier
)[];
export type AttributeFieldPolicy = {
  displayType?: FieldPolicy<any> | FieldReadFunction<any>;
  traitType?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'result'
  | 'reasons'
  | CanDecryptResponseKeySpecifier
)[];
export type CanDecryptResponseFieldPolicy = {
  result?: FieldPolicy<any> | FieldReadFunction<any>;
  reasons?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CanMirrorResponseKeySpecifier = ('result' | CanMirrorResponseKeySpecifier)[];
export type CanMirrorResponseFieldPolicy = {
  result?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ClaimableHandlesKeySpecifier = (
  | 'reservedHandles'
  | 'canClaimFreeTextHandle'
  | ClaimableHandlesKeySpecifier
)[];
export type ClaimableHandlesFieldPolicy = {
  reservedHandles?: FieldPolicy<any> | FieldReadFunction<any>;
  canClaimFreeTextHandle?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'canComment'
  | 'canDecrypt'
  | 'canMirror'
  | 'collectModule'
  | 'collectNftAddress'
  | 'collectedBy'
  | 'commentOn'
  | 'createdAt'
  | 'dataAvailabilityProofs'
  | 'firstComment'
  | 'hasCollectedByMe'
  | 'hasOptimisticCollectedByMe'
  | 'hidden'
  | 'id'
  | 'isDataAvailability'
  | 'isGated'
  | 'isOptimisticMirroredByMe'
  | 'mainPost'
  | 'metadata'
  | 'mirrors'
  | 'onChainContentURI'
  | 'ownedByMe'
  | 'profile'
  | 'reaction'
  | 'referenceModule'
  | 'stats'
  | CommentKeySpecifier
)[];
export type CommentFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  canComment?: FieldPolicy<any> | FieldReadFunction<any>;
  canDecrypt?: FieldPolicy<any> | FieldReadFunction<any>;
  canMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  collectedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  commentOn?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilityProofs?: FieldPolicy<any> | FieldReadFunction<any>;
  firstComment?: FieldPolicy<any> | FieldReadFunction<any>;
  hasCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hasOptimisticCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isDataAvailability?: FieldPolicy<any> | FieldReadFunction<any>;
  isGated?: FieldPolicy<any> | FieldReadFunction<any>;
  isOptimisticMirroredByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  mainPost?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  onChainContentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  ownedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateBurnEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateBurnEIP712TypedDataKeySpecifier
)[];
export type CreateBurnEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'tokenId'
  | CreateBurnEIP712TypedDataValueKeySpecifier
)[];
export type CreateBurnEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateBurnProfileBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateBurnProfileBroadcastItemResultKeySpecifier
)[];
export type CreateBurnProfileBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCollectBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateCollectBroadcastItemResultKeySpecifier
)[];
export type CreateCollectBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCollectEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateCollectEIP712TypedDataKeySpecifier
)[];
export type CreateCollectEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileId'
  | 'pubId'
  | 'data'
  | CreateCollectEIP712TypedDataValueKeySpecifier
)[];
export type CreateCollectEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  pubId?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCommentBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateCommentBroadcastItemResultKeySpecifier
)[];
export type CreateCommentBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCommentEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateCommentEIP712TypedDataKeySpecifier
)[];
export type CreateCommentEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileId'
  | 'contentURI'
  | 'profileIdPointed'
  | 'pubIdPointed'
  | 'collectModule'
  | 'collectModuleInitData'
  | 'referenceModule'
  | 'referenceModuleInitData'
  | 'referenceModuleData'
  | CreateCommentEIP712TypedDataValueKeySpecifier
)[];
export type CreateCommentEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  profileIdPointed?: FieldPolicy<any> | FieldReadFunction<any>;
  pubIdPointed?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateFollowBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateFollowBroadcastItemResultKeySpecifier
)[];
export type CreateFollowBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateFollowEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateFollowEIP712TypedDataKeySpecifier
)[];
export type CreateFollowEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileIds'
  | 'datas'
  | CreateFollowEIP712TypedDataValueKeySpecifier
)[];
export type CreateFollowEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileIds?: FieldPolicy<any> | FieldReadFunction<any>;
  datas?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMirrorBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateMirrorBroadcastItemResultKeySpecifier
)[];
export type CreateMirrorBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateMirrorEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateMirrorEIP712TypedDataKeySpecifier
)[];
export type CreateMirrorEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileId'
  | 'profileIdPointed'
  | 'pubIdPointed'
  | 'referenceModuleData'
  | 'referenceModule'
  | 'referenceModuleInitData'
  | CreateMirrorEIP712TypedDataValueKeySpecifier
)[];
export type CreateMirrorEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  profileIdPointed?: FieldPolicy<any> | FieldReadFunction<any>;
  pubIdPointed?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleData?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePostBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreatePostBroadcastItemResultKeySpecifier
)[];
export type CreatePostBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePostEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreatePostEIP712TypedDataKeySpecifier
)[];
export type CreatePostEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileId'
  | 'contentURI'
  | 'collectModule'
  | 'collectModuleInitData'
  | 'referenceModule'
  | 'referenceModuleInitData'
  | CreatePostEIP712TypedDataValueKeySpecifier
)[];
export type CreatePostEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetDispatcherBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateSetDispatcherBroadcastItemResultKeySpecifier
)[];
export type CreateSetDispatcherBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetDispatcherEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateSetDispatcherEIP712TypedDataKeySpecifier
)[];
export type CreateSetDispatcherEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileId'
  | 'dispatcher'
  | CreateSetDispatcherEIP712TypedDataValueKeySpecifier
)[];
export type CreateSetDispatcherEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  dispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowModuleBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateSetFollowModuleBroadcastItemResultKeySpecifier
)[];
export type CreateSetFollowModuleBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowModuleEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateSetFollowModuleEIP712TypedDataKeySpecifier
)[];
export type CreateSetFollowModuleEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileId'
  | 'followModule'
  | 'followModuleInitData'
  | CreateSetFollowModuleEIP712TypedDataValueKeySpecifier
)[];
export type CreateSetFollowModuleEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  followModule?: FieldPolicy<any> | FieldReadFunction<any>;
  followModuleInitData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowNFTUriBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateSetFollowNFTUriBroadcastItemResultKeySpecifier
)[];
export type CreateSetFollowNFTUriBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetFollowNFTUriEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateSetFollowNFTUriEIP712TypedDataKeySpecifier
)[];
export type CreateSetFollowNFTUriEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileId'
  | 'followNFTURI'
  | CreateSetFollowNFTUriEIP712TypedDataValueKeySpecifier
)[];
export type CreateSetFollowNFTUriEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  followNFTURI?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileImageUriBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateSetProfileImageUriBroadcastItemResultKeySpecifier
)[];
export type CreateSetProfileImageUriBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileImageUriEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateSetProfileImageUriEIP712TypedDataKeySpecifier
)[];
export type CreateSetProfileImageUriEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileId'
  | 'imageURI'
  | CreateSetProfileImageUriEIP712TypedDataValueKeySpecifier
)[];
export type CreateSetProfileImageUriEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  imageURI?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileMetadataURIBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateSetProfileMetadataURIBroadcastItemResultKeySpecifier
)[];
export type CreateSetProfileMetadataURIBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSetProfileMetadataURIEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateSetProfileMetadataURIEIP712TypedDataKeySpecifier
)[];
export type CreateSetProfileMetadataURIEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileId'
  | 'metadata'
  | CreateSetProfileMetadataURIEIP712TypedDataValueKeySpecifier
)[];
export type CreateSetProfileMetadataURIEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateToggleFollowBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateToggleFollowBroadcastItemResultKeySpecifier
)[];
export type CreateToggleFollowBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateToggleFollowEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | CreateToggleFollowEIP712TypedDataKeySpecifier
)[];
export type CreateToggleFollowEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'profileIds'
  | 'enables'
  | CreateToggleFollowEIP712TypedDataValueKeySpecifier
)[];
export type CreateToggleFollowEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  profileIds?: FieldPolicy<any> | FieldReadFunction<any>;
  enables?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateUnfollowBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | CreateUnfollowBroadcastItemResultKeySpecifier
)[];
export type CreateUnfollowBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DegreesOfSeparationReferenceModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | 'commentsRestricted'
  | 'mirrorsRestricted'
  | 'degreesOfSeparation'
  | DegreesOfSeparationReferenceModuleSettingsKeySpecifier
)[];
export type DegreesOfSeparationReferenceModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  commentsRestricted?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorsRestricted?: FieldPolicy<any> | FieldReadFunction<any>;
  degreesOfSeparation?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DispatcherKeySpecifier = ('address' | 'canUseRelay' | DispatcherKeySpecifier)[];
export type DispatcherFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  canUseRelay?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DoesFollowResponseKeySpecifier = (
  | 'followerAddress'
  | 'profileId'
  | 'follows'
  | 'isFinalisedOnChain'
  | DoesFollowResponseKeySpecifier
)[];
export type DoesFollowResponseFieldPolicy = {
  followerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
  follows?: FieldPolicy<any> | FieldReadFunction<any>;
  isFinalisedOnChain?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EIP712TypedDataDomainKeySpecifier = (
  | 'name'
  | 'chainId'
  | 'version'
  | 'verifyingContract'
  | EIP712TypedDataDomainKeySpecifier
)[];
export type EIP712TypedDataDomainFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  chainId?: FieldPolicy<any> | FieldReadFunction<any>;
  version?: FieldPolicy<any> | FieldReadFunction<any>;
  verifyingContract?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'moduleName'
  | 'contractAddress'
  | 'inputParams'
  | 'redeemParams'
  | 'returnDataParms'
  | EnabledModuleKeySpecifier
)[];
export type EnabledModuleFieldPolicy = {
  moduleName?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  inputParams?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'content'
  | 'image'
  | 'media'
  | 'animation_url'
  | 'external_url'
  | EncryptedFieldsOutputKeySpecifier
)[];
export type EncryptedFieldsOutputFieldPolicy = {
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  media?: FieldPolicy<any> | FieldReadFunction<any>;
  animation_url?: FieldPolicy<any> | FieldReadFunction<any>;
  external_url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptedMediaKeySpecifier = (
  | 'url'
  | 'width'
  | 'height'
  | 'size'
  | 'mimeType'
  | 'altTag'
  | 'cover'
  | EncryptedMediaKeySpecifier
)[];
export type EncryptedMediaFieldPolicy = {
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  width?: FieldPolicy<any> | FieldReadFunction<any>;
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  size?: FieldPolicy<any> | FieldReadFunction<any>;
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptedMediaSetKeySpecifier = (
  | 'original'
  | 'small'
  | 'medium'
  | EncryptedMediaSetKeySpecifier
)[];
export type EncryptedMediaSetFieldPolicy = {
  original?: FieldPolicy<any> | FieldReadFunction<any>;
  small?: FieldPolicy<any> | FieldReadFunction<any>;
  medium?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EncryptionParamsOutputKeySpecifier = (
  | 'providerSpecificParams'
  | 'encryptionProvider'
  | 'accessCondition'
  | 'encryptedFields'
  | EncryptionParamsOutputKeySpecifier
)[];
export type EncryptionParamsOutputFieldPolicy = {
  providerSpecificParams?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptionProvider?: FieldPolicy<any> | FieldReadFunction<any>;
  accessCondition?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptedFields?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EnsOnChainIdentityKeySpecifier = ('name' | EnsOnChainIdentityKeySpecifier)[];
export type EnsOnChainIdentityFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EoaOwnershipOutputKeySpecifier = ('address' | EoaOwnershipOutputKeySpecifier)[];
export type EoaOwnershipOutputFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type Erc20KeySpecifier = ('name' | 'symbol' | 'decimals' | 'address' | Erc20KeySpecifier)[];
export type Erc20FieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  symbol?: FieldPolicy<any> | FieldReadFunction<any>;
  decimals?: FieldPolicy<any> | FieldReadFunction<any>;
  address?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type Erc20AmountKeySpecifier = ('asset' | 'value' | Erc20AmountKeySpecifier)[];
export type Erc20AmountFieldPolicy = {
  asset?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type Erc20OwnershipOutputKeySpecifier = (
  | 'contractAddress'
  | 'chainID'
  | 'amount'
  | 'decimals'
  | 'condition'
  | Erc20OwnershipOutputKeySpecifier
)[];
export type Erc20OwnershipOutputFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  chainID?: FieldPolicy<any> | FieldReadFunction<any>;
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  decimals?: FieldPolicy<any> | FieldReadFunction<any>;
  condition?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'type'
  | 'contractAddress'
  | 'amount'
  | 'recipient'
  | 'referralFee'
  | 'followerOnly'
  | FeeCollectModuleSettingsKeySpecifier
)[];
export type FeeCollectModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FeeFollowModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | 'amount'
  | 'recipient'
  | FeeFollowModuleSettingsKeySpecifier
)[];
export type FeeFollowModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FeedItemKeySpecifier = (
  | 'root'
  | 'electedMirror'
  | 'mirrors'
  | 'collects'
  | 'reactions'
  | 'comments'
  | FeedItemKeySpecifier
)[];
export type FeedItemFieldPolicy = {
  root?: FieldPolicy<any> | FieldReadFunction<any>;
  electedMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  collects?: FieldPolicy<any> | FieldReadFunction<any>;
  reactions?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowConditionOutputKeySpecifier = ('profileId' | FollowConditionOutputKeySpecifier)[];
export type FollowConditionOutputFieldPolicy = {
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowOnlyReferenceModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | FollowOnlyReferenceModuleSettingsKeySpecifier
)[];
export type FollowOnlyReferenceModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowRevenueResultKeySpecifier = ('revenues' | FollowRevenueResultKeySpecifier)[];
export type FollowRevenueResultFieldPolicy = {
  revenues?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FollowerKeySpecifier = (
  | 'wallet'
  | 'totalAmountOfTimesFollowed'
  | FollowerKeySpecifier
)[];
export type FollowerFieldPolicy = {
  wallet?: FieldPolicy<any> | FieldReadFunction<any>;
  totalAmountOfTimesFollowed?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'type'
  | 'contractAddress'
  | 'followerOnly'
  | FreeCollectModuleSettingsKeySpecifier
)[];
export type FreeCollectModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenerateModuleCurrencyApprovalKeySpecifier = (
  | 'to'
  | 'from'
  | 'data'
  | GenerateModuleCurrencyApprovalKeySpecifier
)[];
export type GenerateModuleCurrencyApprovalFieldPolicy = {
  to?: FieldPolicy<any> | FieldReadFunction<any>;
  from?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GlobalProtocolStatsKeySpecifier = (
  | 'totalProfiles'
  | 'totalBurntProfiles'
  | 'totalPosts'
  | 'totalMirrors'
  | 'totalComments'
  | 'totalCollects'
  | 'totalFollows'
  | 'totalRevenue'
  | GlobalProtocolStatsKeySpecifier
)[];
export type GlobalProtocolStatsFieldPolicy = {
  totalProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  totalBurntProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  totalPosts?: FieldPolicy<any> | FieldReadFunction<any>;
  totalMirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  totalComments?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCollects?: FieldPolicy<any> | FieldReadFunction<any>;
  totalFollows?: FieldPolicy<any> | FieldReadFunction<any>;
  totalRevenue?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LimitedFeeCollectModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | 'collectLimit'
  | 'amount'
  | 'recipient'
  | 'referralFee'
  | 'followerOnly'
  | LimitedFeeCollectModuleSettingsKeySpecifier
)[];
export type LimitedFeeCollectModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LimitedTimedFeeCollectModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | 'collectLimit'
  | 'amount'
  | 'recipient'
  | 'referralFee'
  | 'followerOnly'
  | 'endTimestamp'
  | LimitedTimedFeeCollectModuleSettingsKeySpecifier
)[];
export type LimitedTimedFeeCollectModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  collectLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  endTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LogKeySpecifier = (
  | 'blockNumber'
  | 'blockHash'
  | 'transactionIndex'
  | 'removed'
  | 'address'
  | 'data'
  | 'topics'
  | 'transactionHash'
  | 'logIndex'
  | LogKeySpecifier
)[];
export type LogFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  blockHash?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionIndex?: FieldPolicy<any> | FieldReadFunction<any>;
  removed?: FieldPolicy<any> | FieldReadFunction<any>;
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
  topics?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionHash?: FieldPolicy<any> | FieldReadFunction<any>;
  logIndex?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MediaKeySpecifier = (
  | 'url'
  | 'width'
  | 'height'
  | 'size'
  | 'mimeType'
  | 'altTag'
  | 'cover'
  | MediaKeySpecifier
)[];
export type MediaFieldPolicy = {
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  width?: FieldPolicy<any> | FieldReadFunction<any>;
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  size?: FieldPolicy<any> | FieldReadFunction<any>;
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MediaOutputKeySpecifier = (
  | 'item'
  | 'type'
  | 'altTag'
  | 'cover'
  | 'source'
  | MediaOutputKeySpecifier
)[];
export type MediaOutputFieldPolicy = {
  item?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  altTag?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  source?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MediaSetKeySpecifier = ('original' | 'small' | 'medium' | MediaSetKeySpecifier)[];
export type MediaSetFieldPolicy = {
  original?: FieldPolicy<any> | FieldReadFunction<any>;
  small?: FieldPolicy<any> | FieldReadFunction<any>;
  medium?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'name'
  | 'description'
  | 'content'
  | 'image'
  | 'cover'
  | 'media'
  | 'attributes'
  | 'locale'
  | 'tags'
  | 'contentWarning'
  | 'mainContentFocus'
  | 'animatedUrl'
  | 'encryptionParams'
  | MetadataOutputKeySpecifier
)[];
export type MetadataOutputFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  cover?: FieldPolicy<any> | FieldReadFunction<any>;
  media?: FieldPolicy<any> | FieldReadFunction<any>;
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  contentWarning?: FieldPolicy<any> | FieldReadFunction<any>;
  mainContentFocus?: FieldPolicy<any> | FieldReadFunction<any>;
  animatedUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  encryptionParams?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MirrorKeySpecifier = (
  | 'appId'
  | 'canComment'
  | 'canDecrypt'
  | 'canMirror'
  | 'collectModule'
  | 'collectNftAddress'
  | 'createdAt'
  | 'dataAvailabilityProofs'
  | 'hasCollectedByMe'
  | 'hasOptimisticCollectedByMe'
  | 'hidden'
  | 'id'
  | 'isDataAvailability'
  | 'isGated'
  | 'isOptimisticMirroredByMe'
  | 'metadata'
  | 'mirrorOf'
  | 'onChainContentURI'
  | 'ownedByMe'
  | 'profile'
  | 'reaction'
  | 'referenceModule'
  | 'stats'
  | MirrorKeySpecifier
)[];
export type MirrorFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  canComment?: FieldPolicy<any> | FieldReadFunction<any>;
  canDecrypt?: FieldPolicy<any> | FieldReadFunction<any>;
  canMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilityProofs?: FieldPolicy<any> | FieldReadFunction<any>;
  hasCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hasOptimisticCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isDataAvailability?: FieldPolicy<any> | FieldReadFunction<any>;
  isGated?: FieldPolicy<any> | FieldReadFunction<any>;
  isOptimisticMirroredByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorOf?: FieldPolicy<any> | FieldReadFunction<any>;
  onChainContentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  ownedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type MutationKeySpecifier = (
  | 'authenticate'
  | 'refresh'
  | 'broadcast'
  | 'createSetDispatcherTypedData'
  | 'createFollowTypedData'
  | 'createUnfollowTypedData'
  | 'createSetFollowModuleTypedData'
  | 'createSetFollowNFTUriTypedData'
  | 'createToggleFollowTypedData'
  | 'createCollectTypedData'
  | 'createSetDefaultProfileTypedData'
  | 'createSetProfileImageURITypedData'
  | 'createSetProfileImageURIViaDispatcher'
  | 'createBurnProfileTypedData'
  | 'createPostTypedData'
  | 'createPostViaDispatcher'
  | 'createCommentTypedData'
  | 'createCommentViaDispatcher'
  | 'createMirrorTypedData'
  | 'hidePublication'
  | 'createMirrorViaDispatcher'
  | 'createAttachMediaData'
  | 'claim'
  | 'addProfileInterests'
  | 'removeProfileInterests'
  | 'createSetProfileMetadataTypedData'
  | 'createSetProfileMetadataViaDispatcher'
  | 'proxyAction'
  | 'addReaction'
  | 'removeReaction'
  | 'reportPublication'
  | 'ach'
  | 'hel'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  authenticate?: FieldPolicy<any> | FieldReadFunction<any>;
  refresh?: FieldPolicy<any> | FieldReadFunction<any>;
  broadcast?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetDispatcherTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createFollowTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createUnfollowTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetFollowModuleTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetFollowNFTUriTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createToggleFollowTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createCollectTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetDefaultProfileTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetProfileImageURITypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetProfileImageURIViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createBurnProfileTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createPostTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createPostViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createCommentTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createCommentViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createMirrorTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  hidePublication?: FieldPolicy<any> | FieldReadFunction<any>;
  createMirrorViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  createAttachMediaData?: FieldPolicy<any> | FieldReadFunction<any>;
  claim?: FieldPolicy<any> | FieldReadFunction<any>;
  addProfileInterests?: FieldPolicy<any> | FieldReadFunction<any>;
  removeProfileInterests?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetProfileMetadataTypedData?: FieldPolicy<any> | FieldReadFunction<any>;
  createSetProfileMetadataViaDispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  proxyAction?: FieldPolicy<any> | FieldReadFunction<any>;
  addReaction?: FieldPolicy<any> | FieldReadFunction<any>;
  removeReaction?: FieldPolicy<any> | FieldReadFunction<any>;
  reportPublication?: FieldPolicy<any> | FieldReadFunction<any>;
  ach?: FieldPolicy<any> | FieldReadFunction<any>;
  hel?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NFTKeySpecifier = (
  | 'contractName'
  | 'contractAddress'
  | 'symbol'
  | 'tokenId'
  | 'owners'
  | 'name'
  | 'description'
  | 'contentURI'
  | 'originalContent'
  | 'chainId'
  | 'collectionName'
  | 'ercType'
  | NFTKeySpecifier
)[];
export type NFTFieldPolicy = {
  contractName?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  symbol?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenId?: FieldPolicy<any> | FieldReadFunction<any>;
  owners?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  contentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  originalContent?: FieldPolicy<any> | FieldReadFunction<any>;
  chainId?: FieldPolicy<any> | FieldReadFunction<any>;
  collectionName?: FieldPolicy<any> | FieldReadFunction<any>;
  ercType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NFTContentKeySpecifier = (
  | 'uri'
  | 'metaType'
  | 'animatedUrl'
  | NFTContentKeySpecifier
)[];
export type NFTContentFieldPolicy = {
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
  metaType?: FieldPolicy<any> | FieldReadFunction<any>;
  animatedUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NFTsResultKeySpecifier = ('items' | 'pageInfo' | NFTsResultKeySpecifier)[];
export type NFTsResultFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewCollectNotificationKeySpecifier = (
  | 'notificationId'
  | 'createdAt'
  | 'wallet'
  | 'collectedPublication'
  | NewCollectNotificationKeySpecifier
)[];
export type NewCollectNotificationFieldPolicy = {
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  wallet?: FieldPolicy<any> | FieldReadFunction<any>;
  collectedPublication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewCommentNotificationKeySpecifier = (
  | 'notificationId'
  | 'createdAt'
  | 'profile'
  | 'comment'
  | NewCommentNotificationKeySpecifier
)[];
export type NewCommentNotificationFieldPolicy = {
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  comment?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewFollowerNotificationKeySpecifier = (
  | 'notificationId'
  | 'createdAt'
  | 'wallet'
  | 'isFollowedByMe'
  | NewFollowerNotificationKeySpecifier
)[];
export type NewFollowerNotificationFieldPolicy = {
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  wallet?: FieldPolicy<any> | FieldReadFunction<any>;
  isFollowedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewMentionNotificationKeySpecifier = (
  | 'notificationId'
  | 'createdAt'
  | 'mentionPublication'
  | NewMentionNotificationKeySpecifier
)[];
export type NewMentionNotificationFieldPolicy = {
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  mentionPublication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewMirrorNotificationKeySpecifier = (
  | 'notificationId'
  | 'createdAt'
  | 'profile'
  | 'publication'
  | NewMirrorNotificationKeySpecifier
)[];
export type NewMirrorNotificationFieldPolicy = {
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewReactionNotificationKeySpecifier = (
  | 'notificationId'
  | 'createdAt'
  | 'profile'
  | 'reaction'
  | 'publication'
  | NewReactionNotificationKeySpecifier
)[];
export type NewReactionNotificationFieldPolicy = {
  notificationId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftImageKeySpecifier = (
  | 'contractAddress'
  | 'tokenId'
  | 'uri'
  | 'chainId'
  | 'verified'
  | NftImageKeySpecifier
)[];
export type NftImageFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenId?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
  chainId?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'contractAddress'
  | 'chainID'
  | 'contractType'
  | 'tokenIds'
  | NftOwnershipOutputKeySpecifier
)[];
export type NftOwnershipOutputFieldPolicy = {
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  chainID?: FieldPolicy<any> | FieldReadFunction<any>;
  contractType?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OnChainIdentityKeySpecifier = (
  | 'proofOfHumanity'
  | 'ens'
  | 'sybilDotOrg'
  | 'worldcoin'
  | OnChainIdentityKeySpecifier
)[];
export type OnChainIdentityFieldPolicy = {
  proofOfHumanity?: FieldPolicy<any> | FieldReadFunction<any>;
  ens?: FieldPolicy<any> | FieldReadFunction<any>;
  sybilDotOrg?: FieldPolicy<any> | FieldReadFunction<any>;
  worldcoin?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OrConditionOutputKeySpecifier = ('criteria' | OrConditionOutputKeySpecifier)[];
export type OrConditionOutputFieldPolicy = {
  criteria?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OwnerKeySpecifier = ('amount' | 'address' | OwnerKeySpecifier)[];
export type OwnerFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  address?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'prev'
  | 'next'
  | 'totalCount'
  | PaginatedResultInfoKeySpecifier
)[];
export type PaginatedResultInfoFieldPolicy = {
  prev?: FieldPolicy<any> | FieldReadFunction<any>;
  next?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type PostKeySpecifier = (
  | 'appId'
  | 'canComment'
  | 'canDecrypt'
  | 'canMirror'
  | 'collectModule'
  | 'collectNftAddress'
  | 'collectedBy'
  | 'createdAt'
  | 'dataAvailabilityProofs'
  | 'hasCollectedByMe'
  | 'hasOptimisticCollectedByMe'
  | 'hidden'
  | 'id'
  | 'isDataAvailability'
  | 'isGated'
  | 'isOptimisticMirroredByMe'
  | 'metadata'
  | 'mirrors'
  | 'onChainContentURI'
  | 'ownedByMe'
  | 'profile'
  | 'reaction'
  | 'referenceModule'
  | 'stats'
  | PostKeySpecifier
)[];
export type PostFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  canComment?: FieldPolicy<any> | FieldReadFunction<any>;
  canDecrypt?: FieldPolicy<any> | FieldReadFunction<any>;
  canMirror?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModule?: FieldPolicy<any> | FieldReadFunction<any>;
  collectNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  collectedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  dataAvailabilityProofs?: FieldPolicy<any> | FieldReadFunction<any>;
  hasCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hasOptimisticCollectedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isDataAvailability?: FieldPolicy<any> | FieldReadFunction<any>;
  isGated?: FieldPolicy<any> | FieldReadFunction<any>;
  isOptimisticMirroredByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  onChainContentURI?: FieldPolicy<any> | FieldReadFunction<any>;
  ownedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModule?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileKeySpecifier = (
  | 'attributes'
  | 'bio'
  | 'coverPicture'
  | 'dispatcher'
  | 'followModule'
  | 'followNftAddress'
  | 'handle'
  | 'id'
  | 'interests'
  | 'isDefault'
  | 'isFollowedByMe'
  | 'isFollowing'
  | 'isOptimisticFollowedByMe'
  | 'location'
  | 'metadata'
  | 'name'
  | 'onChainIdentity'
  | 'ownedBy'
  | 'ownedByMe'
  | 'picture'
  | 'stats'
  | 'twitter'
  | 'website'
  | ProfileKeySpecifier
)[];
export type ProfileFieldPolicy = {
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  bio?: FieldPolicy<any> | FieldReadFunction<any>;
  coverPicture?: FieldPolicy<any> | FieldReadFunction<any>;
  dispatcher?: FieldPolicy<any> | FieldReadFunction<any>;
  followModule?: FieldPolicy<any> | FieldReadFunction<any>;
  followNftAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  handle?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  interests?: FieldPolicy<any> | FieldReadFunction<any>;
  isDefault?: FieldPolicy<any> | FieldReadFunction<any>;
  isFollowedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  isFollowing?: FieldPolicy<any> | FieldReadFunction<any>;
  isOptimisticFollowedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  location?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  onChainIdentity?: FieldPolicy<any> | FieldReadFunction<any>;
  ownedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  ownedByMe?: FieldPolicy<any> | FieldReadFunction<any>;
  picture?: FieldPolicy<any> | FieldReadFunction<any>;
  stats?: FieldPolicy<any> | FieldReadFunction<any>;
  twitter?: FieldPolicy<any> | FieldReadFunction<any>;
  website?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileFollowModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | ProfileFollowModuleSettingsKeySpecifier
)[];
export type ProfileFollowModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'id'
  | 'totalFollowers'
  | 'totalFollowing'
  | 'totalPosts'
  | 'totalComments'
  | 'totalMirrors'
  | 'totalPublications'
  | 'totalCollects'
  | 'commentsTotal'
  | 'postsTotal'
  | 'mirrorsTotal'
  | 'publicationsTotal'
  | ProfileStatsKeySpecifier
)[];
export type ProfileStatsFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  totalFollowers?: FieldPolicy<any> | FieldReadFunction<any>;
  totalFollowing?: FieldPolicy<any> | FieldReadFunction<any>;
  totalPosts?: FieldPolicy<any> | FieldReadFunction<any>;
  totalComments?: FieldPolicy<any> | FieldReadFunction<any>;
  totalMirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  totalPublications?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCollects?: FieldPolicy<any> | FieldReadFunction<any>;
  commentsTotal?: FieldPolicy<any> | FieldReadFunction<any>;
  postsTotal?: FieldPolicy<any> | FieldReadFunction<any>;
  mirrorsTotal?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationsTotal?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProviderSpecificParamsOutputKeySpecifier = (
  | 'encryptionKey'
  | ProviderSpecificParamsOutputKeySpecifier
)[];
export type ProviderSpecificParamsOutputFieldPolicy = {
  encryptionKey?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProxyActionErrorKeySpecifier = (
  | 'reason'
  | 'lastKnownTxId'
  | ProxyActionErrorKeySpecifier
)[];
export type ProxyActionErrorFieldPolicy = {
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
  lastKnownTxId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProxyActionQueuedKeySpecifier = ('queuedAt' | ProxyActionQueuedKeySpecifier)[];
export type ProxyActionQueuedFieldPolicy = {
  queuedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProxyActionStatusResultKeySpecifier = (
  | 'txHash'
  | 'txId'
  | 'status'
  | ProxyActionStatusResultKeySpecifier
)[];
export type ProxyActionStatusResultFieldPolicy = {
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
  txId?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicMediaResultsKeySpecifier = (
  | 'signedUrl'
  | 'media'
  | PublicMediaResultsKeySpecifier
)[];
export type PublicMediaResultsFieldPolicy = {
  signedUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  media?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationMetadataStatusKeySpecifier = (
  | 'status'
  | 'reason'
  | PublicationMetadataStatusKeySpecifier
)[];
export type PublicationMetadataStatusFieldPolicy = {
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'id'
  | 'totalAmountOfMirrors'
  | 'totalAmountOfCollects'
  | 'totalAmountOfComments'
  | 'totalUpvotes'
  | 'totalDownvotes'
  | 'commentsTotal'
  | PublicationStatsKeySpecifier
)[];
export type PublicationStatsFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  totalAmountOfMirrors?: FieldPolicy<any> | FieldReadFunction<any>;
  totalAmountOfCollects?: FieldPolicy<any> | FieldReadFunction<any>;
  totalAmountOfComments?: FieldPolicy<any> | FieldReadFunction<any>;
  totalUpvotes?: FieldPolicy<any> | FieldReadFunction<any>;
  totalDownvotes?: FieldPolicy<any> | FieldReadFunction<any>;
  commentsTotal?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PublicationValidateMetadataResultKeySpecifier = (
  | 'valid'
  | 'reason'
  | PublicationValidateMetadataResultKeySpecifier
)[];
export type PublicationValidateMetadataResultFieldPolicy = {
  valid?: FieldPolicy<any> | FieldReadFunction<any>;
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | 'challenge'
  | 'verify'
  | 'txIdToTxHash'
  | 'explorePublications'
  | 'exploreProfiles'
  | 'feed'
  | 'feedHighlights'
  | 'timeline'
  | 'pendingApprovalFollows'
  | 'doesFollow'
  | 'following'
  | 'followers'
  | 'followerNftOwnedTokenIds'
  | 'mutualFollowersProfiles'
  | 'ping'
  | 'hasTxHashBeenIndexed'
  | 'enabledModuleCurrencies'
  | 'approvedModuleAllowanceAmount'
  | 'generateModuleCurrencyApprovalData'
  | 'profileFollowModuleBeenRedeemed'
  | 'enabledModules'
  | 'unknownEnabledModules'
  | 'nfts'
  | 'nftOwnershipChallenge'
  | 'notifications'
  | 'profiles'
  | 'profile'
  | 'recommendedProfiles'
  | 'defaultProfile'
  | 'globalProtocolStats'
  | 'publications'
  | 'publication'
  | 'whoCollectedPublication'
  | 'profilePublicationsForSale'
  | 'allPublicationsTags'
  | 'search'
  | 'userSigNonces'
  | 'claimableHandles'
  | 'claimableStatus'
  | 'internalPublicationFilter'
  | 'profileOnChainIdentity'
  | 'profileInterests'
  | 'proxyActionStatus'
  | 'validatePublicationMetadata'
  | 'publicationMetadataStatus'
  | 'whoReactedPublication'
  | 'profilePublicationRevenue'
  | 'publicationRevenue'
  | 'profileFollowRevenue'
  | 'rel'
  | 'cur'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  challenge?: FieldPolicy<any> | FieldReadFunction<any>;
  verify?: FieldPolicy<any> | FieldReadFunction<any>;
  txIdToTxHash?: FieldPolicy<any> | FieldReadFunction<any>;
  explorePublications?: FieldPolicy<any> | FieldReadFunction<any>;
  exploreProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  feed?: FieldPolicy<any> | FieldReadFunction<any>;
  feedHighlights?: FieldPolicy<any> | FieldReadFunction<any>;
  timeline?: FieldPolicy<any> | FieldReadFunction<any>;
  pendingApprovalFollows?: FieldPolicy<any> | FieldReadFunction<any>;
  doesFollow?: FieldPolicy<any> | FieldReadFunction<any>;
  following?: FieldPolicy<any> | FieldReadFunction<any>;
  followers?: FieldPolicy<any> | FieldReadFunction<any>;
  followerNftOwnedTokenIds?: FieldPolicy<any> | FieldReadFunction<any>;
  mutualFollowersProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  ping?: FieldPolicy<any> | FieldReadFunction<any>;
  hasTxHashBeenIndexed?: FieldPolicy<any> | FieldReadFunction<any>;
  enabledModuleCurrencies?: FieldPolicy<any> | FieldReadFunction<any>;
  approvedModuleAllowanceAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  generateModuleCurrencyApprovalData?: FieldPolicy<any> | FieldReadFunction<any>;
  profileFollowModuleBeenRedeemed?: FieldPolicy<any> | FieldReadFunction<any>;
  enabledModules?: FieldPolicy<any> | FieldReadFunction<any>;
  unknownEnabledModules?: FieldPolicy<any> | FieldReadFunction<any>;
  nfts?: FieldPolicy<any> | FieldReadFunction<any>;
  nftOwnershipChallenge?: FieldPolicy<any> | FieldReadFunction<any>;
  notifications?: FieldPolicy<any> | FieldReadFunction<any>;
  profiles?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  recommendedProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  globalProtocolStats?: FieldPolicy<any> | FieldReadFunction<any>;
  publications?: FieldPolicy<any> | FieldReadFunction<any>;
  publication?: FieldPolicy<any> | FieldReadFunction<any>;
  whoCollectedPublication?: FieldPolicy<any> | FieldReadFunction<any>;
  profilePublicationsForSale?: FieldPolicy<any> | FieldReadFunction<any>;
  allPublicationsTags?: FieldPolicy<any> | FieldReadFunction<any>;
  search?: FieldPolicy<any> | FieldReadFunction<any>;
  userSigNonces?: FieldPolicy<any> | FieldReadFunction<any>;
  claimableHandles?: FieldPolicy<any> | FieldReadFunction<any>;
  claimableStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  internalPublicationFilter?: FieldPolicy<any> | FieldReadFunction<any>;
  profileOnChainIdentity?: FieldPolicy<any> | FieldReadFunction<any>;
  profileInterests?: FieldPolicy<any> | FieldReadFunction<any>;
  proxyActionStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  validatePublicationMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationMetadataStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  whoReactedPublication?: FieldPolicy<any> | FieldReadFunction<any>;
  profilePublicationRevenue?: FieldPolicy<any> | FieldReadFunction<any>;
  publicationRevenue?: FieldPolicy<any> | FieldReadFunction<any>;
  profileFollowRevenue?: FieldPolicy<any> | FieldReadFunction<any>;
  rel?: FieldPolicy<any> | FieldReadFunction<any>;
  cur?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type RelayErrorKeySpecifier = ('reason' | RelayErrorKeySpecifier)[];
export type RelayErrorFieldPolicy = {
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RelayerResultKeySpecifier = ('txHash' | 'txId' | RelayerResultKeySpecifier)[];
export type RelayerResultFieldPolicy = {
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
  txId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ReservedClaimableHandleKeySpecifier = (
  | 'id'
  | 'handle'
  | 'source'
  | 'expiry'
  | ReservedClaimableHandleKeySpecifier
)[];
export type ReservedClaimableHandleFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  handle?: FieldPolicy<any> | FieldReadFunction<any>;
  source?: FieldPolicy<any> | FieldReadFunction<any>;
  expiry?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RevenueAggregateKeySpecifier = ('total' | RevenueAggregateKeySpecifier)[];
export type RevenueAggregateFieldPolicy = {
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RevertCollectModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | RevertCollectModuleSettingsKeySpecifier
)[];
export type RevertCollectModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RevertFollowModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | RevertFollowModuleSettingsKeySpecifier
)[];
export type RevertFollowModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetDefaultProfileBroadcastItemResultKeySpecifier = (
  | 'id'
  | 'expiresAt'
  | 'typedData'
  | SetDefaultProfileBroadcastItemResultKeySpecifier
)[];
export type SetDefaultProfileBroadcastItemResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresAt?: FieldPolicy<any> | FieldReadFunction<any>;
  typedData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetDefaultProfileEIP712TypedDataKeySpecifier = (
  | 'types'
  | 'domain'
  | 'value'
  | SetDefaultProfileEIP712TypedDataKeySpecifier
)[];
export type SetDefaultProfileEIP712TypedDataFieldPolicy = {
  types?: FieldPolicy<any> | FieldReadFunction<any>;
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'nonce'
  | 'deadline'
  | 'wallet'
  | 'profileId'
  | SetDefaultProfileEIP712TypedDataValueKeySpecifier
)[];
export type SetDefaultProfileEIP712TypedDataValueFieldPolicy = {
  nonce?: FieldPolicy<any> | FieldReadFunction<any>;
  deadline?: FieldPolicy<any> | FieldReadFunction<any>;
  wallet?: FieldPolicy<any> | FieldReadFunction<any>;
  profileId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SybilDotOrgIdentityKeySpecifier = (
  | 'verified'
  | 'source'
  | SybilDotOrgIdentityKeySpecifier
)[];
export type SybilDotOrgIdentityFieldPolicy = {
  verified?: FieldPolicy<any> | FieldReadFunction<any>;
  source?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'type'
  | 'contractAddress'
  | 'amount'
  | 'recipient'
  | 'referralFee'
  | 'followerOnly'
  | 'endTimestamp'
  | TimedFeeCollectModuleSettingsKeySpecifier
)[];
export type TimedFeeCollectModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  referralFee?: FieldPolicy<any> | FieldReadFunction<any>;
  followerOnly?: FieldPolicy<any> | FieldReadFunction<any>;
  endTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'txHash'
  | 'txReceipt'
  | 'metadataStatus'
  | TransactionIndexedResultKeySpecifier
)[];
export type TransactionIndexedResultFieldPolicy = {
  indexed?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
  txReceipt?: FieldPolicy<any> | FieldReadFunction<any>;
  metadataStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionReceiptKeySpecifier = (
  | 'to'
  | 'from'
  | 'contractAddress'
  | 'transactionIndex'
  | 'root'
  | 'gasUsed'
  | 'logsBloom'
  | 'blockHash'
  | 'transactionHash'
  | 'logs'
  | 'blockNumber'
  | 'confirmations'
  | 'cumulativeGasUsed'
  | 'effectiveGasPrice'
  | 'byzantium'
  | 'type'
  | 'status'
  | TransactionReceiptKeySpecifier
)[];
export type TransactionReceiptFieldPolicy = {
  to?: FieldPolicy<any> | FieldReadFunction<any>;
  from?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionIndex?: FieldPolicy<any> | FieldReadFunction<any>;
  root?: FieldPolicy<any> | FieldReadFunction<any>;
  gasUsed?: FieldPolicy<any> | FieldReadFunction<any>;
  logsBloom?: FieldPolicy<any> | FieldReadFunction<any>;
  blockHash?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionHash?: FieldPolicy<any> | FieldReadFunction<any>;
  logs?: FieldPolicy<any> | FieldReadFunction<any>;
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  confirmations?: FieldPolicy<any> | FieldReadFunction<any>;
  cumulativeGasUsed?: FieldPolicy<any> | FieldReadFunction<any>;
  effectiveGasPrice?: FieldPolicy<any> | FieldReadFunction<any>;
  byzantium?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownCollectModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | 'collectModuleReturnData'
  | UnknownCollectModuleSettingsKeySpecifier
)[];
export type UnknownCollectModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  collectModuleReturnData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownFollowModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | 'followModuleReturnData'
  | UnknownFollowModuleSettingsKeySpecifier
)[];
export type UnknownFollowModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  followModuleReturnData?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnknownReferenceModuleSettingsKeySpecifier = (
  | 'type'
  | 'contractAddress'
  | 'referenceModuleReturnData'
  | UnknownReferenceModuleSettingsKeySpecifier
)[];
export type UnknownReferenceModuleSettingsFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  referenceModuleReturnData?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'reactionId'
  | 'reaction'
  | 'reactionAt'
  | 'profile'
  | WhoReactedResultKeySpecifier
)[];
export type WhoReactedResultFieldPolicy = {
  reactionId?: FieldPolicy<any> | FieldReadFunction<any>;
  reaction?: FieldPolicy<any> | FieldReadFunction<any>;
  reactionAt?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type WorldcoinIdentityKeySpecifier = ('isHuman' | WorldcoinIdentityKeySpecifier)[];
export type WorldcoinIdentityFieldPolicy = {
  isHuman?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TypedTypePolicies = TypePolicies & {
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
  Post?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier);
    fields?: PostFieldPolicy;
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
  RelayError?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | RelayErrorKeySpecifier | (() => undefined | RelayErrorKeySpecifier);
    fields?: RelayErrorFieldPolicy;
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

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    CollectModule: [
      'FreeCollectModuleSettings',
      'FeeCollectModuleSettings',
      'LimitedFeeCollectModuleSettings',
      'LimitedTimedFeeCollectModuleSettings',
      'RevertCollectModuleSettings',
      'TimedFeeCollectModuleSettings',
      'UnknownCollectModuleSettings',
    ],
    FeedItemRoot: ['Post', 'Comment'],
    FollowModule: [
      'FeeFollowModuleSettings',
      'ProfileFollowModuleSettings',
      'RevertFollowModuleSettings',
      'UnknownFollowModuleSettings',
    ],
    MainPostReference: ['Post', 'Mirror'],
    MentionPublication: ['Post', 'Comment'],
    MirrorablePublication: ['Post', 'Comment'],
    Notification: [
      'NewFollowerNotification',
      'NewCollectNotification',
      'NewCommentNotification',
      'NewMirrorNotification',
      'NewMentionNotification',
      'NewReactionNotification',
    ],
    ProfileMedia: ['NftImage', 'MediaSet'],
    ProxyActionStatusResultUnion: [
      'ProxyActionStatusResult',
      'ProxyActionError',
      'ProxyActionQueued',
    ],
    Publication: ['Post', 'Comment', 'Mirror'],
    PublicationForSale: ['Post', 'Comment'],
    PublicationSearchResultItem: ['Post', 'Comment'],
    ReferenceModule: [
      'FollowOnlyReferenceModuleSettings',
      'UnknownReferenceModuleSettings',
      'DegreesOfSeparationReferenceModuleSettings',
    ],
    RelayResult: ['RelayerResult', 'RelayError'],
    SearchResult: ['PublicationSearchResult', 'ProfileSearchResult'],
    TransactionResult: ['TransactionIndexedResult', 'TransactionError'],
  },
};
export default result;
