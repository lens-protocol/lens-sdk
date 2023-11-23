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
  AppId: string;
  BlockchainData: string;
  BroadcastId: string;
  ChainId: number;
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
  Ens: string;
  EvmAddress: string;
  Handle: string;
  ImageSizeTransform: string;
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
  readonly multirecipientCollectOpenAction?: InputMaybe<Scalars['Boolean']>;
  readonly simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']>;
  readonly unknownOpenAction?: InputMaybe<UnknownOpenActionActRedeemInput>;
};

/** The lens manager will only support FREE open action modules, if you want your unknown module allowed to be signless please contact us */
export type ActOnOpenActionLensManagerInput = {
  readonly simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']>;
  readonly unknownOpenAction?: InputMaybe<UnknownOpenActionActRedeemInput>;
};

export type ActOnOpenActionLensManagerRequest = {
  readonly actOn: ActOnOpenActionLensManagerInput;
  readonly for: Scalars['PublicationId'];
  readonly referrers?: InputMaybe<ReadonlyArray<OnchainReferrer>>;
};

export type ActOnOpenActionRequest = {
  readonly actOn: ActOnOpenActionInput;
  readonly for: Scalars['PublicationId'];
  readonly referrers?: InputMaybe<ReadonlyArray<OnchainReferrer>>;
};

export type ActedNotification = {
  readonly __typename: 'ActedNotification';
  readonly actions: ReadonlyArray<OpenActionProfileActed>;
  readonly id: Scalars['UUID'];
  readonly publication: AnyPublication;
};

/** Condition that checks if the given on-chain contract function returns true. It only supports view functions */
export type AdvancedContractCondition = {
  readonly __typename: 'AdvancedContractCondition';
  /** The contract ABI. Has to be in human readable single string format containing the signature of the function you want to call. See https://docs.ethers.org/v5/api/utils/abi/fragments/#human-readable-abi for more info */
  readonly abi: Scalars['String'];
  /** The check to perform on the result of the function. In case of boolean outputs, "EQUALS" and "NOT_EQUALS" are supported. For BigNumber outputs, you can use every comparison option */
  readonly comparison: ComparisonOperatorConditionType;
  /** The address and chain ID of the contract to call */
  readonly contract: NetworkAddress;
  /** The name of the function to call. Must be included in the provided abi */
  readonly functionName: Scalars['String'];
  /** ABI encoded function parameters. In order to represent the address of the person trying to decrypt, you *have* to use the string ":userAddress" as this param represents the decrypting user address. If a param is an array or tuple, it will be in stringified format. */
  readonly params: ReadonlyArray<Scalars['String']>;
  /** The value to compare the result of the function against. Can be "true", "false" or a number in string format */
  readonly value: Scalars['String'];
};

export type AlreadyInvitedCheckRequest = {
  readonly for: Scalars['EvmAddress'];
};

export type Amount = {
  readonly __typename: 'Amount';
  /** The asset */
  readonly asset: Asset;
  readonly rate?: Maybe<FiatAmount>;
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  readonly value: Scalars['String'];
};

export type AmountRateArgs = {
  request: RateRequest;
};

export type AmountInput = {
  /** The currency */
  readonly currency: Scalars['EvmAddress'];
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  readonly value: Scalars['String'];
};

export type AndCondition = {
  readonly __typename: 'AndCondition';
  readonly criteria: ReadonlyArray<ThirdTierCondition>;
};

export type AnyPublication = Comment | Mirror | Post | Quote;

export type App = {
  readonly __typename: 'App';
  readonly id: Scalars['AppId'];
};

export type ApprovedAllowanceAmountResult = {
  readonly __typename: 'ApprovedAllowanceAmountResult';
  readonly allowance: Amount;
  readonly moduleContract: NetworkAddress;
  readonly moduleName: Scalars['String'];
};

export type ApprovedAuthentication = {
  readonly __typename: 'ApprovedAuthentication';
  readonly authorizationId: Scalars['UUID'];
  readonly browser?: Maybe<Scalars['String']>;
  readonly createdAt: Scalars['DateTime'];
  readonly device?: Maybe<Scalars['String']>;
  readonly expiresAt: Scalars['DateTime'];
  readonly origin?: Maybe<Scalars['URI']>;
  readonly os?: Maybe<Scalars['String']>;
  readonly updatedAt: Scalars['DateTime'];
};

export type ApprovedAuthenticationRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
};

export type ApprovedModuleAllowanceAmountRequest = {
  readonly currencies: ReadonlyArray<Scalars['EvmAddress']>;
  readonly followModules?: InputMaybe<ReadonlyArray<FollowModuleType>>;
  readonly openActionModules?: InputMaybe<ReadonlyArray<OpenActionModuleType>>;
  readonly referenceModules?: InputMaybe<ReadonlyArray<ReferenceModuleType>>;
  readonly unknownFollowModules?: InputMaybe<ReadonlyArray<Scalars['EvmAddress']>>;
  readonly unknownOpenActionModules?: InputMaybe<ReadonlyArray<Scalars['EvmAddress']>>;
  readonly unknownReferenceModules?: InputMaybe<ReadonlyArray<Scalars['EvmAddress']>>;
};

export type ArticleMetadataV3 = {
  readonly __typename: 'ArticleMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
  /** The title of the article. Empty if not set. */
  readonly title: Scalars['String'];
};

export type Asset = Erc20;

export type Audio = {
  readonly __typename: 'Audio';
  readonly mimeType?: Maybe<Scalars['MimeType']>;
  readonly uri: Scalars['URI'];
};

export type AudioMetadataV3 = {
  readonly __typename: 'AudioMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly asset: PublicationMetadataMediaAudio;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
  /** The title of the audio. Empty if not set. */
  readonly title: Scalars['String'];
};

export type AuthChallengeResult = {
  readonly __typename: 'AuthChallengeResult';
  readonly id: Scalars['ChallengeId'];
  /** The text that needs to be signed */
  readonly text: Scalars['String'];
};

/** The authentication result */
export type AuthenticationResult = {
  readonly __typename: 'AuthenticationResult';
  /** The access token */
  readonly accessToken: Scalars['Jwt'];
  /** The refresh token */
  readonly refreshToken: Scalars['Jwt'];
};

export type BlockRequest = {
  readonly profiles: ReadonlyArray<Scalars['ProfileId']>;
};

export type BroadcastMomokaResult = CreateMomokaPublicationResult | RelayError;

export type BroadcastRequest = {
  readonly id: Scalars['BroadcastId'];
  readonly signature: Scalars['Signature'];
};

export type CanClaimRequest = {
  readonly addresses: ReadonlyArray<Scalars['EvmAddress']>;
};

export type CanClaimResult = {
  readonly __typename: 'CanClaimResult';
  readonly address: Scalars['EvmAddress'];
  readonly canClaim: Scalars['Boolean'];
};

export type CanDecryptResponse = {
  readonly __typename: 'CanDecryptResponse';
  readonly extraDetails?: Maybe<Scalars['String']>;
  readonly reasons?: Maybe<ReadonlyArray<DecryptFailReasonType>>;
  readonly result: Scalars['Boolean'];
};

export type ChallengeRequest = {
  /** The profile ID to initiate a challenge - note if you do not pass this in you be logging in as a wallet and wont be able to use all the features */
  readonly for?: InputMaybe<Scalars['ProfileId']>;
  /** The Ethereum address that will sign the challenge */
  readonly signedBy: Scalars['EvmAddress'];
};

export type ChangeProfileManager = {
  readonly action: ChangeProfileManagerActionType;
  readonly address: Scalars['EvmAddress'];
};

export enum ChangeProfileManagerActionType {
  Add = 'ADD',
  Remove = 'REMOVE',
}

export type ChangeProfileManagersRequest = {
  /** if you define this true will enable it and false will disable it within the same tx as any other managers you are changing state for. Leave it blank if you do not want to change its current state */
  readonly approveSignless?: InputMaybe<Scalars['Boolean']>;
  readonly changeManagers?: InputMaybe<ReadonlyArray<ChangeProfileManager>>;
};

export type CheckingInMetadataV3 = {
  readonly __typename: 'CheckingInMetadataV3';
  readonly address?: Maybe<PhysicalAddress>;
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly geographic?: Maybe<GeoLocation>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly location: Scalars['EncryptableString'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
};

export enum ClaimProfileStatusType {
  AlreadyClaimed = 'ALREADY_CLAIMED',
  ClaimFailed = 'CLAIM_FAILED',
  NotClaimed = 'NOT_CLAIMED',
}

/** Claim profile with handle error reason type */
export enum ClaimProfileWithHandleErrorReasonType {
  CanNotFreeText = 'CAN_NOT_FREE_TEXT',
  ClaimNotFound = 'CLAIM_NOT_FOUND',
  ClaimNotLinkedToWallet = 'CLAIM_NOT_LINKED_TO_WALLET',
  ClaimTimeExpired = 'CLAIM_TIME_EXPIRED',
  ContractExecuted = 'CONTRACT_EXECUTED',
  HandleAlreadyClaimed = 'HANDLE_ALREADY_CLAIMED',
  HandleAlreadyExists = 'HANDLE_ALREADY_EXISTS',
  HandleReserved = 'HANDLE_RESERVED',
}

export type ClaimProfileWithHandleErrorResult = {
  readonly __typename: 'ClaimProfileWithHandleErrorResult';
  readonly reason: ClaimProfileWithHandleErrorReasonType;
};

export type ClaimProfileWithHandleRequest = {
  readonly followModule?: InputMaybe<FollowModuleInput>;
  readonly freeTextHandle?: InputMaybe<Scalars['CreateHandle']>;
  readonly id?: InputMaybe<Scalars['String']>;
};

export type ClaimProfileWithHandleResult = ClaimProfileWithHandleErrorResult | RelaySuccess;

export type ClaimableProfilesResult = {
  readonly __typename: 'ClaimableProfilesResult';
  readonly canMintProfileWithFreeTextHandle: Scalars['Boolean'];
  readonly reserved: ReadonlyArray<ReservedClaimable>;
};

export type CollectActionModuleInput = {
  readonly multirecipientCollectOpenAction?: InputMaybe<MultirecipientFeeCollectModuleInput>;
  readonly simpleCollectOpenAction?: InputMaybe<SimpleCollectOpenActionModuleInput>;
};

export type CollectCondition = {
  readonly __typename: 'CollectCondition';
  readonly publicationId: Scalars['PublicationId'];
  readonly thisPublication: Scalars['Boolean'];
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

export type Comment = {
  readonly __typename: 'Comment';
  readonly by: Profile;
  readonly commentOn: PrimaryPublication;
  readonly createdAt: Scalars['DateTime'];
  readonly firstComment?: Maybe<Comment>;
  readonly hashtagsMentioned: ReadonlyArray<Scalars['String']>;
  readonly id: Scalars['PublicationId'];
  readonly isEncrypted: Scalars['Boolean'];
  readonly isHidden: Scalars['Boolean'];
  readonly metadata: PublicationMetadata;
  readonly momoka?: Maybe<MomokaInfo>;
  readonly openActionModules: ReadonlyArray<OpenActionModule>;
  readonly operations: PublicationOperations;
  readonly profilesMentioned: ReadonlyArray<ProfileMentioned>;
  readonly publishedOn?: Maybe<App>;
  readonly referenceModule?: Maybe<ReferenceModule>;
  readonly root: CommentablePublication;
  readonly stats: PublicationStats;
  readonly txHash?: Maybe<Scalars['TxHash']>;
};

export type CommentStatsArgs = {
  request?: InputMaybe<PublicationStatsInput>;
};

export type CommentNotification = {
  readonly __typename: 'CommentNotification';
  readonly comment: Comment;
  readonly id: Scalars['UUID'];
};

export enum CommentRankingFilterType {
  All = 'ALL',
  NoneRelevant = 'NONE_RELEVANT',
  Relevant = 'RELEVANT',
}

export type CommentablePublication = Post | Quote;

export enum ComparisonOperatorConditionType {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  NotEqual = 'NOT_EQUAL',
}

export type CreateActOnOpenActionBroadcastItemResult = {
  readonly __typename: 'CreateActOnOpenActionBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateActOnOpenActionEip712TypedData;
};

export type CreateActOnOpenActionEip712TypedData = {
  readonly __typename: 'CreateActOnOpenActionEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateActOnOpenActionEip712TypedDataTypes;
  /** The values */
  readonly value: CreateActOnOpenActionEip712TypedDataValue;
};

export type CreateActOnOpenActionEip712TypedDataTypes = {
  readonly __typename: 'CreateActOnOpenActionEIP712TypedDataTypes';
  readonly Act: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateActOnOpenActionEip712TypedDataValue = {
  readonly __typename: 'CreateActOnOpenActionEIP712TypedDataValue';
  readonly actionModuleAddress: Scalars['EvmAddress'];
  readonly actionModuleData: Scalars['BlockchainData'];
  readonly actorProfileId: Scalars['ProfileId'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly nonce: Scalars['Nonce'];
  readonly publicationActedId: Scalars['OnchainPublicationId'];
  readonly publicationActedProfileId: Scalars['ProfileId'];
  readonly referrerProfileIds: ReadonlyArray<Scalars['ProfileId']>;
  readonly referrerPubIds: ReadonlyArray<Scalars['OnchainPublicationId']>;
};

export type CreateBlockProfilesBroadcastItemResult = {
  readonly __typename: 'CreateBlockProfilesBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateBlockProfilesEip712TypedData;
};

export type CreateBlockProfilesEip712TypedData = {
  readonly __typename: 'CreateBlockProfilesEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateBlockProfilesEip712TypedDataTypes;
  /** The values */
  readonly value: CreateBlockProfilesEip712TypedDataValue;
};

export type CreateBlockProfilesEip712TypedDataTypes = {
  readonly __typename: 'CreateBlockProfilesEIP712TypedDataTypes';
  readonly SetBlockStatus: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateBlockProfilesEip712TypedDataValue = {
  readonly __typename: 'CreateBlockProfilesEIP712TypedDataValue';
  readonly blockStatus: ReadonlyArray<Scalars['Boolean']>;
  readonly byProfileId: Scalars['ProfileId'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly idsOfProfilesToSetBlockStatus: ReadonlyArray<Scalars['ProfileId']>;
  readonly nonce: Scalars['Nonce'];
};

export type CreateChangeProfileManagersBroadcastItemResult = {
  readonly __typename: 'CreateChangeProfileManagersBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateChangeProfileManagersEip712TypedData;
};

export type CreateChangeProfileManagersEip712TypedData = {
  readonly __typename: 'CreateChangeProfileManagersEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateChangeProfileManagersEip712TypedDataTypes;
  /** The values */
  readonly value: CreateChangeProfileManagersEip712TypedDataValue;
};

export type CreateChangeProfileManagersEip712TypedDataTypes = {
  readonly __typename: 'CreateChangeProfileManagersEIP712TypedDataTypes';
  readonly ChangeDelegatedExecutorsConfig: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateChangeProfileManagersEip712TypedDataValue = {
  readonly __typename: 'CreateChangeProfileManagersEIP712TypedDataValue';
  readonly approvals: ReadonlyArray<Scalars['Boolean']>;
  readonly configNumber: Scalars['Int'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly delegatedExecutors: ReadonlyArray<Scalars['EvmAddress']>;
  readonly delegatorProfileId: Scalars['ProfileId'];
  readonly nonce: Scalars['Nonce'];
  readonly switchToGivenConfig: Scalars['Boolean'];
};

export type CreateFollowBroadcastItemResult = {
  readonly __typename: 'CreateFollowBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateFollowEip712TypedData;
};

/** The create follow eip 712 typed data */
export type CreateFollowEip712TypedData = {
  readonly __typename: 'CreateFollowEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateFollowEip712TypedDataTypes;
  /** The values */
  readonly value: CreateFollowEip712TypedDataValue;
};

/** The create follow eip 712 typed data types */
export type CreateFollowEip712TypedDataTypes = {
  readonly __typename: 'CreateFollowEIP712TypedDataTypes';
  readonly Follow: ReadonlyArray<Eip712TypedDataField>;
};

/** The create follow eip 712 typed data value */
export type CreateFollowEip712TypedDataValue = {
  readonly __typename: 'CreateFollowEIP712TypedDataValue';
  readonly datas: ReadonlyArray<Scalars['BlockchainData']>;
  readonly deadline: Scalars['UnixTimestamp'];
  readonly followTokenIds: ReadonlyArray<Scalars['TokenId']>;
  readonly followerProfileId: Scalars['ProfileId'];
  readonly idsOfProfilesToFollow: ReadonlyArray<Scalars['ProfileId']>;
  readonly nonce: Scalars['Nonce'];
};

export type CreateLegacyCollectBroadcastItemResult = {
  readonly __typename: 'CreateLegacyCollectBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateLegacyCollectEip712TypedData;
};

export type CreateLegacyCollectEip712TypedData = {
  readonly __typename: 'CreateLegacyCollectEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateLegacyCollectEip712TypedDataTypes;
  /** The values */
  readonly value: CreateLegacyCollectEip712TypedDataValue;
};

export type CreateLegacyCollectEip712TypedDataTypes = {
  readonly __typename: 'CreateLegacyCollectEIP712TypedDataTypes';
  readonly CollectLegacy: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateLegacyCollectEip712TypedDataValue = {
  readonly __typename: 'CreateLegacyCollectEIP712TypedDataValue';
  readonly collectModuleData: Scalars['BlockchainData'];
  readonly collectorProfileId: Scalars['ProfileId'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly nonce: Scalars['Nonce'];
  readonly publicationCollectedId: Scalars['OnchainPublicationId'];
  readonly publicationCollectedProfileId: Scalars['ProfileId'];
  readonly referrerProfileId: Scalars['ProfileId'];
  readonly referrerPubId: Scalars['OnchainPublicationId'];
};

export type CreateLinkHandleToProfileBroadcastItemResult = {
  readonly __typename: 'CreateLinkHandleToProfileBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateLinkHandleToProfileEip712TypedData;
};

export type CreateLinkHandleToProfileEip712TypedData = {
  readonly __typename: 'CreateLinkHandleToProfileEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateLinkHandleToProfileEip712TypedDataTypes;
  /** The values */
  readonly value: CreateLinkHandleToProfileEip712TypedDataValue;
};

export type CreateLinkHandleToProfileEip712TypedDataTypes = {
  readonly __typename: 'CreateLinkHandleToProfileEIP712TypedDataTypes';
  readonly Link: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateLinkHandleToProfileEip712TypedDataValue = {
  readonly __typename: 'CreateLinkHandleToProfileEIP712TypedDataValue';
  readonly deadline: Scalars['UnixTimestamp'];
  readonly handleId: Scalars['TokenId'];
  readonly nonce: Scalars['Nonce'];
  readonly profileId: Scalars['ProfileId'];
};

export type CreateMomokaCommentBroadcastItemResult = {
  readonly __typename: 'CreateMomokaCommentBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateMomokaCommentEip712TypedData;
};

export type CreateMomokaCommentEip712TypedData = {
  readonly __typename: 'CreateMomokaCommentEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateMomokaCommentEip712TypedDataTypes;
  /** The values */
  readonly value: CreateMomokaCommentEip712TypedDataValue;
};

export type CreateMomokaCommentEip712TypedDataTypes = {
  readonly __typename: 'CreateMomokaCommentEIP712TypedDataTypes';
  readonly Comment: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateMomokaCommentEip712TypedDataValue = {
  readonly __typename: 'CreateMomokaCommentEIP712TypedDataValue';
  readonly actionModules: ReadonlyArray<Scalars['EvmAddress']>;
  readonly actionModulesInitDatas: ReadonlyArray<Scalars['BlockchainData']>;
  readonly contentURI: Scalars['URI'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly nonce: Scalars['Nonce'];
  readonly pointedProfileId: Scalars['ProfileId'];
  readonly pointedPubId: Scalars['OnchainPublicationId'];
  readonly profileId: Scalars['ProfileId'];
  readonly referenceModule: Scalars['EvmAddress'];
  readonly referenceModuleData: Scalars['BlockchainData'];
  readonly referenceModuleInitData: Scalars['BlockchainData'];
  readonly referrerProfileIds: ReadonlyArray<Scalars['ProfileId']>;
  readonly referrerPubIds: ReadonlyArray<Scalars['OnchainPublicationId']>;
};

export type CreateMomokaMirrorBroadcastItemResult = {
  readonly __typename: 'CreateMomokaMirrorBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateMomokaMirrorEip712TypedData;
};

export type CreateMomokaMirrorEip712TypedData = {
  readonly __typename: 'CreateMomokaMirrorEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateMomokaMirrorEip712TypedDataTypes;
  /** The values */
  readonly value: CreateMomokaMirrorEip712TypedDataValue;
};

export type CreateMomokaMirrorEip712TypedDataTypes = {
  readonly __typename: 'CreateMomokaMirrorEIP712TypedDataTypes';
  readonly Mirror: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateMomokaMirrorEip712TypedDataValue = {
  readonly __typename: 'CreateMomokaMirrorEIP712TypedDataValue';
  readonly deadline: Scalars['UnixTimestamp'];
  readonly metadataURI: Scalars['String'];
  readonly nonce: Scalars['Nonce'];
  readonly pointedProfileId: Scalars['ProfileId'];
  readonly pointedPubId: Scalars['OnchainPublicationId'];
  readonly profileId: Scalars['ProfileId'];
  readonly referenceModuleData: Scalars['BlockchainData'];
  readonly referrerProfileIds: ReadonlyArray<Scalars['ProfileId']>;
  readonly referrerPubIds: ReadonlyArray<Scalars['OnchainPublicationId']>;
};

export type CreateMomokaPostBroadcastItemResult = {
  readonly __typename: 'CreateMomokaPostBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateMomokaPostEip712TypedData;
};

export type CreateMomokaPostEip712TypedData = {
  readonly __typename: 'CreateMomokaPostEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateMomokaPostEip712TypedDataTypes;
  /** The values */
  readonly value: CreateMomokaPostEip712TypedDataValue;
};

export type CreateMomokaPostEip712TypedDataTypes = {
  readonly __typename: 'CreateMomokaPostEIP712TypedDataTypes';
  readonly Post: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateMomokaPostEip712TypedDataValue = {
  readonly __typename: 'CreateMomokaPostEIP712TypedDataValue';
  readonly actionModules: ReadonlyArray<Scalars['EvmAddress']>;
  readonly actionModulesInitDatas: ReadonlyArray<Scalars['BlockchainData']>;
  readonly contentURI: Scalars['URI'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly nonce: Scalars['Nonce'];
  readonly profileId: Scalars['ProfileId'];
  readonly referenceModule: Scalars['EvmAddress'];
  readonly referenceModuleInitData: Scalars['BlockchainData'];
};

export type CreateMomokaPublicationResult = {
  readonly __typename: 'CreateMomokaPublicationResult';
  readonly id: Scalars['PublicationId'];
  readonly momokaId: Scalars['MomokaId'];
  readonly proof: Scalars['MomokaProof'];
};

export type CreateMomokaQuoteBroadcastItemResult = {
  readonly __typename: 'CreateMomokaQuoteBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateMomokaQuoteEip712TypedData;
};

export type CreateMomokaQuoteEip712TypedData = {
  readonly __typename: 'CreateMomokaQuoteEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateMomokaQuoteEip712TypedDataTypes;
  /** The values */
  readonly value: CreateMomokaQuoteEip712TypedDataValue;
};

export type CreateMomokaQuoteEip712TypedDataTypes = {
  readonly __typename: 'CreateMomokaQuoteEIP712TypedDataTypes';
  readonly Quote: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateMomokaQuoteEip712TypedDataValue = {
  readonly __typename: 'CreateMomokaQuoteEIP712TypedDataValue';
  readonly actionModules: ReadonlyArray<Scalars['EvmAddress']>;
  readonly actionModulesInitDatas: ReadonlyArray<Scalars['BlockchainData']>;
  readonly contentURI: Scalars['URI'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly nonce: Scalars['Nonce'];
  readonly pointedProfileId: Scalars['ProfileId'];
  readonly pointedPubId: Scalars['OnchainPublicationId'];
  readonly profileId: Scalars['ProfileId'];
  readonly referenceModule: Scalars['EvmAddress'];
  readonly referenceModuleData: Scalars['BlockchainData'];
  readonly referenceModuleInitData: Scalars['BlockchainData'];
  readonly referrerProfileIds: ReadonlyArray<Scalars['ProfileId']>;
  readonly referrerPubIds: ReadonlyArray<Scalars['OnchainPublicationId']>;
};

export type CreateOnchainCommentBroadcastItemResult = {
  readonly __typename: 'CreateOnchainCommentBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateOnchainCommentEip712TypedData;
};

export type CreateOnchainCommentEip712TypedData = {
  readonly __typename: 'CreateOnchainCommentEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateOnchainCommentEip712TypedDataTypes;
  /** The values */
  readonly value: CreateOnchainCommentEip712TypedDataValue;
};

export type CreateOnchainCommentEip712TypedDataTypes = {
  readonly __typename: 'CreateOnchainCommentEIP712TypedDataTypes';
  readonly Comment: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateOnchainCommentEip712TypedDataValue = {
  readonly __typename: 'CreateOnchainCommentEIP712TypedDataValue';
  readonly actionModules: ReadonlyArray<Scalars['EvmAddress']>;
  readonly actionModulesInitDatas: ReadonlyArray<Scalars['BlockchainData']>;
  readonly contentURI: Scalars['URI'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly nonce: Scalars['Nonce'];
  readonly pointedProfileId: Scalars['ProfileId'];
  readonly pointedPubId: Scalars['OnchainPublicationId'];
  readonly profileId: Scalars['ProfileId'];
  readonly referenceModule: Scalars['EvmAddress'];
  readonly referenceModuleData: Scalars['BlockchainData'];
  readonly referenceModuleInitData: Scalars['BlockchainData'];
  readonly referrerProfileIds: ReadonlyArray<Scalars['ProfileId']>;
  readonly referrerPubIds: ReadonlyArray<Scalars['OnchainPublicationId']>;
};

export type CreateOnchainMirrorBroadcastItemResult = {
  readonly __typename: 'CreateOnchainMirrorBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateOnchainMirrorEip712TypedData;
};

export type CreateOnchainMirrorEip712TypedData = {
  readonly __typename: 'CreateOnchainMirrorEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateOnchainMirrorEip712TypedDataTypes;
  /** The values */
  readonly value: CreateOnchainMirrorEip712TypedDataValue;
};

export type CreateOnchainMirrorEip712TypedDataTypes = {
  readonly __typename: 'CreateOnchainMirrorEIP712TypedDataTypes';
  readonly Mirror: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateOnchainMirrorEip712TypedDataValue = {
  readonly __typename: 'CreateOnchainMirrorEIP712TypedDataValue';
  readonly deadline: Scalars['UnixTimestamp'];
  readonly metadataURI: Scalars['String'];
  readonly nonce: Scalars['Nonce'];
  readonly pointedProfileId: Scalars['ProfileId'];
  readonly pointedPubId: Scalars['OnchainPublicationId'];
  readonly profileId: Scalars['ProfileId'];
  readonly referenceModuleData: Scalars['BlockchainData'];
  readonly referrerProfileIds: ReadonlyArray<Scalars['ProfileId']>;
  readonly referrerPubIds: ReadonlyArray<Scalars['OnchainPublicationId']>;
};

export type CreateOnchainPostBroadcastItemResult = {
  readonly __typename: 'CreateOnchainPostBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateOnchainPostEip712TypedData;
};

export type CreateOnchainPostEip712TypedData = {
  readonly __typename: 'CreateOnchainPostEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateOnchainPostEip712TypedDataTypes;
  /** The values */
  readonly value: CreateOnchainPostEip712TypedDataValue;
};

export type CreateOnchainPostEip712TypedDataTypes = {
  readonly __typename: 'CreateOnchainPostEIP712TypedDataTypes';
  readonly Post: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateOnchainPostEip712TypedDataValue = {
  readonly __typename: 'CreateOnchainPostEIP712TypedDataValue';
  readonly actionModules: ReadonlyArray<Scalars['EvmAddress']>;
  readonly actionModulesInitDatas: ReadonlyArray<Scalars['BlockchainData']>;
  readonly contentURI: Scalars['URI'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly nonce: Scalars['Nonce'];
  readonly profileId: Scalars['ProfileId'];
  readonly referenceModule: Scalars['EvmAddress'];
  readonly referenceModuleInitData: Scalars['BlockchainData'];
};

export type CreateOnchainQuoteBroadcastItemResult = {
  readonly __typename: 'CreateOnchainQuoteBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateOnchainQuoteEip712TypedData;
};

export type CreateOnchainQuoteEip712TypedData = {
  readonly __typename: 'CreateOnchainQuoteEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateOnchainQuoteEip712TypedDataTypes;
  /** The values */
  readonly value: CreateOnchainQuoteEip712TypedDataValue;
};

export type CreateOnchainQuoteEip712TypedDataTypes = {
  readonly __typename: 'CreateOnchainQuoteEIP712TypedDataTypes';
  readonly Quote: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateOnchainQuoteEip712TypedDataValue = {
  readonly __typename: 'CreateOnchainQuoteEIP712TypedDataValue';
  readonly actionModules: ReadonlyArray<Scalars['EvmAddress']>;
  readonly actionModulesInitDatas: ReadonlyArray<Scalars['BlockchainData']>;
  readonly contentURI: Scalars['URI'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly nonce: Scalars['Nonce'];
  readonly pointedProfileId: Scalars['ProfileId'];
  readonly pointedPubId: Scalars['OnchainPublicationId'];
  readonly profileId: Scalars['ProfileId'];
  readonly referenceModule: Scalars['EvmAddress'];
  readonly referenceModuleData: Scalars['BlockchainData'];
  readonly referenceModuleInitData: Scalars['BlockchainData'];
  readonly referrerProfileIds: ReadonlyArray<Scalars['ProfileId']>;
  readonly referrerPubIds: ReadonlyArray<Scalars['OnchainPublicationId']>;
};

export type CreateOnchainSetProfileMetadataBroadcastItemResult = {
  readonly __typename: 'CreateOnchainSetProfileMetadataBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateOnchainSetProfileMetadataEip712TypedData;
};

export type CreateOnchainSetProfileMetadataEip712TypedData = {
  readonly __typename: 'CreateOnchainSetProfileMetadataEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateOnchainSetProfileMetadataEip712TypedDataTypes;
  /** The values */
  readonly value: CreateOnchainSetProfileMetadataEip712TypedDataValue;
};

export type CreateOnchainSetProfileMetadataEip712TypedDataTypes = {
  readonly __typename: 'CreateOnchainSetProfileMetadataEIP712TypedDataTypes';
  readonly SetProfileMetadataURI: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateOnchainSetProfileMetadataEip712TypedDataValue = {
  readonly __typename: 'CreateOnchainSetProfileMetadataEIP712TypedDataValue';
  readonly deadline: Scalars['UnixTimestamp'];
  readonly metadataURI: Scalars['URI'];
  readonly nonce: Scalars['Nonce'];
  readonly profileId: Scalars['ProfileId'];
};

export type CreateProfileRequest = {
  readonly followModule?: InputMaybe<FollowModuleInput>;
  readonly to: Scalars['EvmAddress'];
};

export enum CreateProfileWithHandleErrorReasonType {
  Failed = 'FAILED',
  HandleTaken = 'HANDLE_TAKEN',
}

export type CreateProfileWithHandleErrorResult = {
  readonly __typename: 'CreateProfileWithHandleErrorResult';
  readonly reason: CreateProfileWithHandleErrorReasonType;
};

export type CreateProfileWithHandleRequest = {
  readonly followModule?: InputMaybe<FollowModuleInput>;
  readonly handle: Scalars['CreateHandle'];
  readonly to: Scalars['EvmAddress'];
};

export type CreateProfileWithHandleResult = CreateProfileWithHandleErrorResult | RelaySuccess;

export type CreateSetFollowModuleBroadcastItemResult = {
  readonly __typename: 'CreateSetFollowModuleBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateSetFollowModuleEip712TypedData;
};

export type CreateSetFollowModuleEip712TypedData = {
  readonly __typename: 'CreateSetFollowModuleEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateSetFollowModuleEip712TypedDataTypes;
  /** The values */
  readonly value: CreateSetFollowModuleEip712TypedDataValue;
};

export type CreateSetFollowModuleEip712TypedDataTypes = {
  readonly __typename: 'CreateSetFollowModuleEIP712TypedDataTypes';
  readonly SetFollowModule: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateSetFollowModuleEip712TypedDataValue = {
  readonly __typename: 'CreateSetFollowModuleEIP712TypedDataValue';
  readonly deadline: Scalars['UnixTimestamp'];
  readonly followModule: Scalars['EvmAddress'];
  readonly followModuleInitData: Scalars['BlockchainData'];
  readonly nonce: Scalars['Nonce'];
  readonly profileId: Scalars['ProfileId'];
};

export type CreateUnblockProfilesBroadcastItemResult = {
  readonly __typename: 'CreateUnblockProfilesBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateUnblockProfilesEip712TypedData;
};

export type CreateUnblockProfilesEip712TypedData = {
  readonly __typename: 'CreateUnblockProfilesEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateUnblockProfilesEip712TypedDataTypes;
  /** The values */
  readonly value: CreateUnblockProfilesEip712TypedDataValue;
};

export type CreateUnblockProfilesEip712TypedDataTypes = {
  readonly __typename: 'CreateUnblockProfilesEIP712TypedDataTypes';
  readonly SetBlockStatus: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateUnblockProfilesEip712TypedDataValue = {
  readonly __typename: 'CreateUnblockProfilesEIP712TypedDataValue';
  readonly blockStatus: ReadonlyArray<Scalars['Boolean']>;
  readonly byProfileId: Scalars['ProfileId'];
  readonly deadline: Scalars['UnixTimestamp'];
  readonly idsOfProfilesToSetBlockStatus: ReadonlyArray<Scalars['ProfileId']>;
  readonly nonce: Scalars['Nonce'];
};

export type CreateUnfollowBroadcastItemResult = {
  readonly __typename: 'CreateUnfollowBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateUnfollowEip712TypedData;
};

export type CreateUnfollowEip712TypedData = {
  readonly __typename: 'CreateUnfollowEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateUnfollowEip712TypedDataTypes;
  /** The values */
  readonly value: CreateUnfollowEip712TypedDataValue;
};

export type CreateUnfollowEip712TypedDataTypes = {
  readonly __typename: 'CreateUnfollowEIP712TypedDataTypes';
  readonly Unfollow: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateUnfollowEip712TypedDataValue = {
  readonly __typename: 'CreateUnfollowEIP712TypedDataValue';
  readonly deadline: Scalars['UnixTimestamp'];
  readonly idsOfProfilesToUnfollow: ReadonlyArray<Scalars['ProfileId']>;
  readonly nonce: Scalars['Nonce'];
  readonly unfollowerProfileId: Scalars['ProfileId'];
};

export type CreateUnlinkHandleFromProfileBroadcastItemResult = {
  readonly __typename: 'CreateUnlinkHandleFromProfileBroadcastItemResult';
  /** The date the broadcast item expiries */
  readonly expiresAt: Scalars['DateTime'];
  /** This broadcast item ID */
  readonly id: Scalars['BroadcastId'];
  /** The typed data */
  readonly typedData: CreateUnlinkHandleFromProfileEip712TypedData;
};

export type CreateUnlinkHandleFromProfileEip712TypedData = {
  readonly __typename: 'CreateUnlinkHandleFromProfileEIP712TypedData';
  /** The typed data domain */
  readonly domain: Eip712TypedDataDomain;
  /** The types */
  readonly types: CreateUnlinkHandleFromProfileEip712TypedDataTypes;
  /** The values */
  readonly value: CreateUnlinkHandleFromProfileEip712TypedDataValue;
};

export type CreateUnlinkHandleFromProfileEip712TypedDataTypes = {
  readonly __typename: 'CreateUnlinkHandleFromProfileEIP712TypedDataTypes';
  readonly Unlink: ReadonlyArray<Eip712TypedDataField>;
};

export type CreateUnlinkHandleFromProfileEip712TypedDataValue = {
  readonly __typename: 'CreateUnlinkHandleFromProfileEIP712TypedDataValue';
  readonly deadline: Scalars['UnixTimestamp'];
  readonly handleId: Scalars['TokenId'];
  readonly nonce: Scalars['Nonce'];
  readonly profileId: Scalars['ProfileId'];
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
  Unsupported = 'UNSUPPORTED',
}

export type DefaultProfileRequest = {
  readonly for: Scalars['EvmAddress'];
};

export type DegreesOfSeparationReferenceModuleInput = {
  readonly commentsRestricted: Scalars['Boolean'];
  readonly degreesOfSeparation: Scalars['Int'];
  readonly mirrorsRestricted: Scalars['Boolean'];
  readonly quotesRestricted: Scalars['Boolean'];
  /** You can set the degree to follow someone elses graph, if you leave blank it use your profile */
  readonly sourceProfileId?: InputMaybe<Scalars['ProfileId']>;
};

export type DegreesOfSeparationReferenceModuleSettings = {
  readonly __typename: 'DegreesOfSeparationReferenceModuleSettings';
  /** Applied to comments */
  readonly commentsRestricted: Scalars['Boolean'];
  readonly contract: NetworkAddress;
  /** Degrees of separation */
  readonly degreesOfSeparation: Scalars['Int'];
  /** Applied to mirrors */
  readonly mirrorsRestricted: Scalars['Boolean'];
  /** Applied to quotes */
  readonly quotesRestricted: Scalars['Boolean'];
  /** Who the degree of separation is applied to */
  readonly sourceProfileId: Scalars['ProfileId'];
  readonly type: ReferenceModuleType;
};

export type DismissRecommendedProfilesRequest = {
  readonly dismiss: ReadonlyArray<Scalars['ProfileId']>;
};

/** The eip 712 typed data domain */
export type Eip712TypedDataDomain = {
  readonly __typename: 'EIP712TypedDataDomain';
  /** The chainId */
  readonly chainId: Scalars['ChainId'];
  /** The name of the typed data domain */
  readonly name: Scalars['String'];
  /** The verifying contract */
  readonly verifyingContract: Scalars['EvmAddress'];
  /** The version */
  readonly version: Scalars['String'];
};

/** The eip 712 typed data field */
export type Eip712TypedDataField = {
  readonly __typename: 'EIP712TypedDataField';
  /** The name of the typed data field */
  readonly name: Scalars['String'];
  /** The type of the typed data field */
  readonly type: Scalars['String'];
};

export type EmbedMetadataV3 = {
  readonly __typename: 'EmbedMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly embed: Scalars['EncryptableURI'];
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type EncryptableAudio = {
  readonly __typename: 'EncryptableAudio';
  readonly mimeType?: Maybe<Scalars['MimeType']>;
  readonly uri: Scalars['EncryptableURI'];
};

export type EncryptableAudioSet = {
  readonly __typename: 'EncryptableAudioSet';
  readonly optimized?: Maybe<Audio>;
  readonly raw: EncryptableAudio;
};

export type EncryptableImage = {
  readonly __typename: 'EncryptableImage';
  /** Height of the image */
  readonly height?: Maybe<Scalars['Int']>;
  /** MIME type of the image */
  readonly mimeType?: Maybe<Scalars['MimeType']>;
  readonly uri: Scalars['EncryptableURI'];
  /** Width of the image */
  readonly width?: Maybe<Scalars['Int']>;
};

export type EncryptableImageSet = {
  readonly __typename: 'EncryptableImageSet';
  readonly optimized?: Maybe<Image>;
  readonly raw: EncryptableImage;
  readonly transformed?: Maybe<Image>;
};

export type EncryptableImageSetTransformedArgs = {
  request: ImageTransform;
};

export type EncryptableVideo = {
  readonly __typename: 'EncryptableVideo';
  readonly mimeType?: Maybe<Scalars['MimeType']>;
  readonly uri: Scalars['EncryptableURI'];
};

export type EncryptableVideoSet = {
  readonly __typename: 'EncryptableVideoSet';
  readonly optimized?: Maybe<Video>;
  readonly raw: EncryptableVideo;
};

export type EnsOnchainIdentity = {
  readonly __typename: 'EnsOnchainIdentity';
  /** The default ens mapped to this address */
  readonly name?: Maybe<Scalars['Ens']>;
};

export type EoaOwnershipCondition = {
  readonly __typename: 'EoaOwnershipCondition';
  readonly address: Scalars['EvmAddress'];
};

/** The erc20 type */
export type Erc20 = {
  readonly __typename: 'Erc20';
  /** The erc20 address */
  readonly contract: NetworkAddress;
  /** Decimal places for the token */
  readonly decimals: Scalars['Int'];
  /** Name of the symbol */
  readonly name: Scalars['String'];
  /** Symbol for the token */
  readonly symbol: Scalars['String'];
};

export type Erc20OwnershipCondition = {
  readonly __typename: 'Erc20OwnershipCondition';
  readonly amount: Amount;
  readonly condition: ComparisonOperatorConditionType;
};

export type EventMetadataV3 = {
  readonly __typename: 'EventMetadataV3';
  readonly address?: Maybe<PhysicalAddress>;
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly endsAt: Scalars['EncryptableDateTime'];
  readonly geographic?: Maybe<GeoLocation>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly links?: Maybe<ReadonlyArray<Scalars['EncryptableURI']>>;
  readonly locale: Scalars['Locale'];
  readonly location: Scalars['EncryptableString'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly startsAt: Scalars['EncryptableDateTime'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
  /** The optional title of the event. Empty if not set. */
  readonly title: Scalars['String'];
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
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  /** Order criteria for exploring profiles */
  readonly orderBy: ExploreProfilesOrderByType;
  /** Filtering criteria for exploring profiles */
  readonly where?: InputMaybe<ExploreProfilesWhere>;
};

export type ExploreProfilesWhere = {
  /** Array of custom filters for exploring profiles */
  readonly customFilters?: InputMaybe<ReadonlyArray<CustomFiltersType>>;
  /** Filter profiles created since the specified timestamp */
  readonly since?: InputMaybe<Scalars['UnixTimestamp']>;
};

export type ExplorePublication = Post | Quote;

export type ExplorePublicationRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly orderBy: ExplorePublicationsOrderByType;
  readonly where?: InputMaybe<ExplorePublicationsWhere>;
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
  readonly customFilters?: InputMaybe<ReadonlyArray<CustomFiltersType>>;
  readonly metadata?: InputMaybe<PublicationMetadataFilters>;
  readonly publicationTypes?: InputMaybe<ReadonlyArray<ExplorePublicationType>>;
  readonly since?: InputMaybe<Scalars['UnixTimestamp']>;
};

export type FeeFollowModuleInput = {
  readonly amount: AmountInput;
  readonly recipient: Scalars['EvmAddress'];
};

export type FeeFollowModuleRedeemInput = {
  readonly amount: AmountInput;
};

export type FeeFollowModuleSettings = {
  readonly __typename: 'FeeFollowModuleSettings';
  /** The amount info */
  readonly amount: Amount;
  readonly contract: NetworkAddress;
  /** The module recipient address */
  readonly recipient: Scalars['EvmAddress'];
  readonly type: FollowModuleType;
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

export type FeedHighlight = Post | Quote;

export type FeedHighlightsRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly where?: InputMaybe<FeedHighlightsWhere>;
};

export type FeedHighlightsWhere = {
  readonly for?: InputMaybe<Scalars['ProfileId']>;
  readonly metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type FeedItem = {
  readonly __typename: 'FeedItem';
  readonly acted: ReadonlyArray<OpenActionProfileActed>;
  readonly comments: ReadonlyArray<Comment>;
  readonly id: Scalars['String'];
  readonly mirrors: ReadonlyArray<Mirror>;
  readonly reactions: ReadonlyArray<ReactionEvent>;
  readonly root: PrimaryPublication;
};

export type FeedRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly where?: InputMaybe<FeedWhere>;
};

export type FeedWhere = {
  readonly feedEventItemTypes?: InputMaybe<ReadonlyArray<FeedEventItemType>>;
  readonly for?: InputMaybe<Scalars['ProfileId']>;
  readonly metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type Fiat = {
  readonly __typename: 'Fiat';
  readonly decimals: Scalars['Int'];
  readonly name: Scalars['String'];
  readonly symbol: Scalars['String'];
};

export type FiatAmount = {
  readonly __typename: 'FiatAmount';
  readonly asset: Fiat;
  readonly value: Scalars['String'];
};

export type Follow = {
  readonly followModule?: InputMaybe<FollowModuleRedeemInput>;
  readonly profileId: Scalars['ProfileId'];
};

export type FollowCondition = {
  readonly __typename: 'FollowCondition';
  readonly follow: Scalars['ProfileId'];
};

export type FollowLensManager = {
  readonly followModule?: InputMaybe<FollowLensManagerModuleRedeemInput>;
  readonly profileId: Scalars['ProfileId'];
};

/** The lens manager will only support FREE follow modules, if you want your unknown module allowed to be signless please contact us */
export type FollowLensManagerModuleRedeemInput = {
  readonly unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemInput>;
};

export type FollowLensManagerRequest = {
  readonly follow: ReadonlyArray<FollowLensManager>;
};

export type FollowModule =
  | FeeFollowModuleSettings
  | RevertFollowModuleSettings
  | UnknownFollowModuleSettings;

export type FollowModuleInput = {
  readonly feeFollowModule?: InputMaybe<FeeFollowModuleInput>;
  readonly freeFollowModule?: InputMaybe<Scalars['Boolean']>;
  readonly revertFollowModule?: InputMaybe<Scalars['Boolean']>;
  readonly unknownFollowModule?: InputMaybe<UnknownFollowModuleInput>;
};

export type FollowModuleRedeemInput = {
  readonly feeFollowModule?: InputMaybe<FeeFollowModuleRedeemInput>;
  readonly unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemInput>;
};

export enum FollowModuleType {
  FeeFollowModule = 'FeeFollowModule',
  RevertFollowModule = 'RevertFollowModule',
  UnknownFollowModule = 'UnknownFollowModule',
}

export type FollowNotification = {
  readonly __typename: 'FollowNotification';
  readonly followers: ReadonlyArray<Profile>;
  readonly id: Scalars['UUID'];
};

export type FollowOnlyReferenceModuleSettings = {
  readonly __typename: 'FollowOnlyReferenceModuleSettings';
  readonly contract: NetworkAddress;
  readonly type: ReferenceModuleType;
};

export type FollowRequest = {
  readonly follow: ReadonlyArray<Follow>;
};

export type FollowRevenueRequest = {
  readonly for: Scalars['ProfileId'];
};

export type FollowRevenueResult = {
  readonly __typename: 'FollowRevenueResult';
  readonly revenues: ReadonlyArray<RevenueAggregate>;
};

export type FollowStatusBulk = {
  readonly follower: Scalars['ProfileId'];
  readonly profileId: Scalars['ProfileId'];
};

export type FollowStatusBulkRequest = {
  readonly followInfos: ReadonlyArray<FollowStatusBulk>;
};

export type FollowStatusBulkResult = {
  readonly __typename: 'FollowStatusBulkResult';
  readonly follower: Scalars['ProfileId'];
  readonly profileId: Scalars['ProfileId'];
  readonly status: OptimisticStatusResult;
};

export type FollowersRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly of: Scalars['ProfileId'];
};

export type FollowingRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly for: Scalars['ProfileId'];
  readonly limit?: InputMaybe<LimitType>;
};

export type FraudReasonInput = {
  readonly reason: PublicationReportingReason;
  readonly subreason: PublicationReportingFraudSubreason;
};

export type GenerateModuleCurrencyApprovalDataRequest = {
  readonly allowance: AmountInput;
  readonly module: ModuleCurrencyApproval;
};

export type GenerateModuleCurrencyApprovalResult = {
  readonly __typename: 'GenerateModuleCurrencyApprovalResult';
  readonly data: Scalars['BlockchainData'];
  readonly from: Scalars['EvmAddress'];
  readonly to: Scalars['EvmAddress'];
};

export type GeoLocation = {
  readonly __typename: 'GeoLocation';
  /** `null` when `rawURI` is encrypted */
  readonly latitude?: Maybe<Scalars['Float']>;
  /** `null` when `rawURI` is encrypted */
  readonly longitude?: Maybe<Scalars['Float']>;
  /** The raw Geo URI of the location. If encrypted `latitude` and `longitude` will be `null` */
  readonly rawURI: Scalars['EncryptableURI'];
};

export type GetProfileMetadataArgs = {
  /** The app id to query the profile's metadata */
  readonly appId?: InputMaybe<Scalars['AppId']>;
  /** If true, will fallback to global profile metadata, if there is no metadata set for that specific app id */
  readonly useFallback?: InputMaybe<Scalars['Boolean']>;
};

export type HandleInfo = {
  readonly __typename: 'HandleInfo';
  /** The full handle - namespace/localname */
  readonly fullHandle: Scalars['Handle'];
  /** The handle nft token id */
  readonly id: Scalars['TokenId'];
  /** If null its not linked to anything */
  readonly linkedTo?: Maybe<HandleLinkedTo>;
  /** The localname */
  readonly localName: Scalars['String'];
  /** The namespace */
  readonly namespace: Scalars['String'];
  readonly ownedBy: Scalars['EvmAddress'];
  /** The suggested format to use on UI for ease but you can innovate and slice and dice as you want */
  readonly suggestedFormatted: SuggestedFormattedHandle;
};

export type HandleLinkedTo = {
  readonly __typename: 'HandleLinkedTo';
  /** The contract address it is linked to */
  readonly contract: NetworkAddress;
  /** The nft token id it is linked to (this can be the profile Id) */
  readonly nftTokenId: Scalars['TokenId'];
};

export type HidePublicationRequest = {
  readonly for: Scalars['PublicationId'];
};

export type IdKitPhoneVerifyWebhookRequest = {
  readonly sharedSecret: Scalars['String'];
  readonly worldcoin?: InputMaybe<WorldcoinPhoneVerifyWebhookRequest>;
};

export enum IdKitPhoneVerifyWebhookResultStatusType {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Success = 'SUCCESS',
}

export type IllegalReasonInput = {
  readonly reason: PublicationReportingReason;
  readonly subreason: PublicationReportingIllegalSubreason;
};

export type Image = {
  readonly __typename: 'Image';
  /** Height of the image */
  readonly height?: Maybe<Scalars['Int']>;
  /** MIME type of the image */
  readonly mimeType?: Maybe<Scalars['MimeType']>;
  readonly uri: Scalars['URI'];
  /** Width of the image */
  readonly width?: Maybe<Scalars['Int']>;
};

export type ImageMetadataV3 = {
  readonly __typename: 'ImageMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly asset: PublicationMetadataMediaImage;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
  /** The title of the image. Empty if not set. */
  readonly title: Scalars['String'];
};

export type ImageSet = {
  readonly __typename: 'ImageSet';
  readonly optimized?: Maybe<Image>;
  readonly raw: Image;
  readonly transformed?: Maybe<Image>;
};

export type ImageSetTransformedArgs = {
  request: ImageTransform;
};

export type ImageTransform = {
  /** Set the transformed image's height */
  readonly height?: InputMaybe<Scalars['ImageSizeTransform']>;
  /** Set if you want to keep the image's original aspect ratio. True by default. If explicitly set to false, the image will stretch based on the width and height values. */
  readonly keepAspectRatio?: InputMaybe<Scalars['Boolean']>;
  /** Set the transformed image's width */
  readonly width?: InputMaybe<Scalars['ImageSizeTransform']>;
};

export type InternalAddCuratedTagRequest = {
  readonly hhh: Scalars['String'];
  readonly secret: Scalars['String'];
  readonly ttt: Scalars['String'];
};

export type InternalAddInvitesRequest = {
  readonly n: Scalars['Int'];
  readonly p: Scalars['ProfileId'];
  readonly secret: Scalars['String'];
};

export type InternalAllowDomainRequest = {
  readonly domain: Scalars['URI'];
  readonly secret: Scalars['String'];
};

export type InternalAllowedDomainsRequest = {
  readonly secret: Scalars['String'];
};

export type InternalClaimRequest = {
  readonly address: Scalars['EvmAddress'];
  readonly freeTextHandle?: InputMaybe<Scalars['Boolean']>;
  readonly handle?: InputMaybe<Scalars['CreateHandle']>;
  readonly overrideAlreadyClaimed: Scalars['Boolean'];
  readonly overrideTradeMark: Scalars['Boolean'];
  readonly secret: Scalars['String'];
};

export type InternalClaimStatusRequest = {
  readonly address: Scalars['EvmAddress'];
  readonly secret: Scalars['String'];
};

export type InternalCuratedHandlesRequest = {
  readonly secret: Scalars['String'];
};

export type InternalCuratedTagsRequest = {
  readonly hhh: Scalars['String'];
  readonly secret: Scalars['String'];
};

export type InternalCuratedUpdateRequest = {
  /** The full handle - namespace/localname */
  readonly handle: Scalars['Handle'];
  readonly remove: Scalars['Boolean'];
  readonly secret: Scalars['String'];
};

export type InternalInvitesRequest = {
  readonly p: Scalars['ProfileId'];
  readonly secret: Scalars['String'];
};

export type InternalNftIndexRequest = {
  readonly n: ReadonlyArray<Nfi>;
  readonly secret: Scalars['String'];
};

export type InternalNftVerifyRequest = {
  readonly n: ReadonlyArray<Nfi>;
  readonly secret: Scalars['String'];
};

export type InternalProfileStatusRequest = {
  readonly hhh: Scalars['String'];
  readonly secret: Scalars['String'];
};

export type InternalRemoveCuratedTagRequest = {
  readonly hhh: Scalars['String'];
  readonly secret: Scalars['String'];
  readonly ttt: Scalars['String'];
};

export type InternalUpdateProfileStatusRequest = {
  readonly dd: Scalars['Boolean'];
  readonly hhh: Scalars['String'];
  readonly secret: Scalars['String'];
  readonly ss: Scalars['Boolean'];
};

export type InviteRequest = {
  readonly invites: ReadonlyArray<Scalars['EvmAddress']>;
};

export type InvitedResult = {
  readonly __typename: 'InvitedResult';
  readonly by: Scalars['EvmAddress'];
  readonly profileMinted?: Maybe<Profile>;
  readonly when: Scalars['DateTime'];
};

export type KnownCollectOpenActionResult = {
  readonly __typename: 'KnownCollectOpenActionResult';
  readonly type: CollectOpenActionModuleType;
};

export type KnownSupportedModule = {
  readonly __typename: 'KnownSupportedModule';
  readonly contract: NetworkAddress;
  readonly moduleInput: ReadonlyArray<ModuleInfo>;
  readonly moduleName: Scalars['String'];
  readonly redeemInput: ReadonlyArray<ModuleInfo>;
  readonly returnDataInput: ReadonlyArray<ModuleInfo>;
};

export type LastLoggedInProfileRequest = {
  readonly for: Scalars['EvmAddress'];
};

export type LegacyAaveFeeCollectModuleSettings = {
  readonly __typename: 'LegacyAaveFeeCollectModuleSettings';
  /** The collect module amount info */
  readonly amount: Amount;
  /** The maximum number of collects for this publication. */
  readonly collectLimit?: Maybe<Scalars['String']>;
  readonly contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  readonly endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  readonly followerOnly: Scalars['Boolean'];
  /** Recipient of collect fees. */
  readonly recipient: Scalars['EvmAddress'];
  /** The referral fee associated with this publication. */
  readonly referralFee: Scalars['Float'];
  readonly type: OpenActionModuleType;
};

export type LegacyCollectRequest = {
  readonly on: Scalars['PublicationId'];
  readonly referrer?: InputMaybe<Scalars['PublicationId']>;
};

export type LegacyDegreesOfSeparationReferenceModuleSettings = {
  readonly __typename: 'LegacyDegreesOfSeparationReferenceModuleSettings';
  /** Applied to comments */
  readonly commentsRestricted: Scalars['Boolean'];
  readonly contract: NetworkAddress;
  /** Degrees of separation */
  readonly degreesOfSeparation: Scalars['Int'];
  /** Applied to mirrors */
  readonly mirrorsRestricted: Scalars['Boolean'];
  readonly type: ReferenceModuleType;
};

export type LegacyErc4626FeeCollectModuleSettings = {
  readonly __typename: 'LegacyERC4626FeeCollectModuleSettings';
  /** The collect module amount info */
  readonly amount: Amount;
  /** The maximum number of collects for this publication. */
  readonly collectLimit?: Maybe<Scalars['String']>;
  readonly contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  readonly endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  readonly followerOnly: Scalars['Boolean'];
  /** The recipient of the ERC4626 vault shares */
  readonly recipient: Scalars['EvmAddress'];
  /** The referral fee associated with this publication. */
  readonly referralFee: Scalars['Float'];
  readonly type: OpenActionModuleType;
  /** The ERC4626 vault address */
  readonly vault: NetworkAddress;
};

export type LegacyFeeCollectModuleSettings = {
  readonly __typename: 'LegacyFeeCollectModuleSettings';
  /** The collect module amount info */
  readonly amount: Amount;
  /** The collect nft address - only deployed on first collect */
  readonly collectNft?: Maybe<Scalars['EvmAddress']>;
  readonly contract: NetworkAddress;
  /** Follower only */
  readonly followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  readonly recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  readonly referralFee: Scalars['Float'];
  readonly type: OpenActionModuleType;
};

export type LegacyFollowOnlyReferenceModuleSettings = {
  readonly __typename: 'LegacyFollowOnlyReferenceModuleSettings';
  readonly contract: NetworkAddress;
  readonly type: ReferenceModuleType;
};

export type LegacyFreeCollectModuleSettings = {
  readonly __typename: 'LegacyFreeCollectModuleSettings';
  /** The collect nft address - only deployed on first collect */
  readonly collectNft?: Maybe<Scalars['EvmAddress']>;
  readonly contract: NetworkAddress;
  /** Follower only */
  readonly followerOnly: Scalars['Boolean'];
  readonly type: OpenActionModuleType;
};

export type LegacyLimitedFeeCollectModuleSettings = {
  readonly __typename: 'LegacyLimitedFeeCollectModuleSettings';
  /** The collect module amount info */
  readonly amount: Amount;
  /** The collect module limit. */
  readonly collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  readonly collectNft?: Maybe<Scalars['EvmAddress']>;
  readonly contract: NetworkAddress;
  /** Follower only */
  readonly followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  readonly recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  readonly referralFee: Scalars['Float'];
  readonly type: OpenActionModuleType;
};

export type LegacyLimitedTimedFeeCollectModuleSettings = {
  readonly __typename: 'LegacyLimitedTimedFeeCollectModuleSettings';
  /** The collect module amount info */
  readonly amount: Amount;
  /** The collect module limit */
  readonly collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  readonly collectNft?: Maybe<Scalars['EvmAddress']>;
  readonly contract: NetworkAddress;
  /** The collect module end timestamp */
  readonly endTimestamp: Scalars['DateTime'];
  /** Follower only */
  readonly followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  readonly recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  readonly referralFee: Scalars['Float'];
  readonly type: OpenActionModuleType;
};

export type LegacyMultirecipientFeeCollectModuleSettings = {
  readonly __typename: 'LegacyMultirecipientFeeCollectModuleSettings';
  /** The collect module amount info */
  readonly amount: Amount;
  /** The maximum number of collects for this publication. */
  readonly collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  readonly collectNft?: Maybe<Scalars['EvmAddress']>;
  readonly contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  readonly endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  readonly followerOnly: Scalars['Boolean'];
  /** Recipient of collect fees. */
  readonly recipients: ReadonlyArray<RecipientDataOutput>;
  /** The referral fee associated with this publication. */
  readonly referralFee: Scalars['Float'];
  readonly type: OpenActionModuleType;
};

export type LegacyRevertCollectModuleSettings = {
  readonly __typename: 'LegacyRevertCollectModuleSettings';
  readonly contract: NetworkAddress;
  readonly type: OpenActionModuleType;
};

export type LegacySimpleCollectModuleSettings = {
  readonly __typename: 'LegacySimpleCollectModuleSettings';
  /** The collect module amount info. `Amount.value = 0` in case of free collects. */
  readonly amount: Amount;
  /** The maximum number of collects for this publication. */
  readonly collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  readonly collectNft?: Maybe<Scalars['EvmAddress']>;
  readonly contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  readonly endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  readonly followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  readonly recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  readonly referralFee: Scalars['Float'];
  readonly type: OpenActionModuleType;
};

export type LegacyTimedFeeCollectModuleSettings = {
  readonly __typename: 'LegacyTimedFeeCollectModuleSettings';
  /** The collect module amount info */
  readonly amount: Amount;
  /** The collect nft address - only deployed on first collect */
  readonly collectNft?: Maybe<Scalars['EvmAddress']>;
  readonly contract: NetworkAddress;
  /** The collect module end timestamp */
  readonly endTimestamp: Scalars['DateTime'];
  /** Follower only */
  readonly followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  readonly recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  readonly referralFee: Scalars['Float'];
  readonly type: OpenActionModuleType;
};

export type LensProfileManagerRelayError = {
  readonly __typename: 'LensProfileManagerRelayError';
  readonly reason: LensProfileManagerRelayErrorReasonType;
};

export enum LensProfileManagerRelayErrorReasonType {
  AppNotAllowed = 'APP_NOT_ALLOWED',
  Failed = 'FAILED',
  NotSponsored = 'NOT_SPONSORED',
  NoLensManagerEnabled = 'NO_LENS_MANAGER_ENABLED',
  RateLimited = 'RATE_LIMITED',
  RequiresSignature = 'REQUIRES_SIGNATURE',
}

export type LensProfileManagerRelayResult = LensProfileManagerRelayError | RelaySuccess;

export enum LensProtocolVersion {
  V1 = 'V1',
  V2 = 'V2',
}

export enum LensTransactionFailureType {
  MetadataError = 'METADATA_ERROR',
  Reverted = 'REVERTED',
}

export type LensTransactionResult = {
  readonly __typename: 'LensTransactionResult';
  readonly extraInfo?: Maybe<Scalars['String']>;
  readonly reason?: Maybe<LensTransactionFailureType>;
  readonly status: LensTransactionStatusType;
  readonly txHash: Scalars['TxHash'];
};

export type LensTransactionStatusRequest = {
  /** Transaction hash for retrieving transaction status */
  readonly forTxHash?: InputMaybe<Scalars['TxHash']>;
  /** Transaction ID for retrieving transaction status when using the broadcaster */
  readonly forTxId?: InputMaybe<Scalars['TxId']>;
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

export type LinkHandleToProfileRequest = {
  /** The full handle - namespace/localname */
  readonly handle: Scalars['Handle'];
};

export type LinkMetadataV3 = {
  readonly __typename: 'LinkMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly sharingLink: Scalars['EncryptableURI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type LiveStreamMetadataV3 = {
  readonly __typename: 'LiveStreamMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  readonly checkLiveAPI?: Maybe<Scalars['EncryptableURI']>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  /** Optional end time. Empty if not set. */
  readonly endsAt: Scalars['EncryptableDateTime'];
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly liveURL: Scalars['EncryptableURI'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly playbackURL: Scalars['EncryptableURI'];
  readonly rawURI: Scalars['URI'];
  readonly startsAt: Scalars['EncryptableDateTime'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
  /** The title of the live-stream. Empty if not set. */
  readonly title: Scalars['String'];
};

export type MarketplaceMetadata = {
  readonly __typename: 'MarketplaceMetadata';
  readonly animationUrl?: Maybe<Scalars['URI']>;
  readonly attributes?: Maybe<ReadonlyArray<PublicationMarketplaceMetadataAttribute>>;
  readonly description?: Maybe<Scalars['Markdown']>;
  readonly externalURL?: Maybe<Scalars['URL']>;
  readonly image?: Maybe<ImageSet>;
  readonly name?: Maybe<Scalars['String']>;
};

export enum MarketplaceMetadataAttributeDisplayType {
  Date = 'DATE',
  Number = 'NUMBER',
  String = 'STRING',
}

export type MentionNotification = {
  readonly __typename: 'MentionNotification';
  readonly id: Scalars['UUID'];
  readonly publication: PrimaryPublication;
};

export type MetadataAttribute = {
  readonly __typename: 'MetadataAttribute';
  readonly key: Scalars['String'];
  /**
   * The type of the attribute. When:
   * - BOOLEAN: the `value` is `true`|`false`
   * - DATE: the `value` is a valid ISO 8601 date string
   * - NUMBER: the `value` is a valid JS number as string
   * - STRING: the `value` is a string.
   * - JSON: the `value` is a valid JSON serialized as string
   *
   */
  readonly type: MetadataAttributeType;
  /** The value serialized as string. It's consumer responsibility to parse it according to `type`. */
  readonly value: Scalars['String'];
};

export enum MetadataAttributeType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Json = 'JSON',
  Number = 'NUMBER',
  String = 'STRING',
}

export type MintMetadataV3 = {
  readonly __typename: 'MintMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly mintLink: Scalars['EncryptableURI'];
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type Mirror = {
  readonly __typename: 'Mirror';
  readonly by: Profile;
  readonly createdAt: Scalars['DateTime'];
  readonly id: Scalars['PublicationId'];
  readonly isHidden: Scalars['Boolean'];
  readonly mirrorOn: MirrorablePublication;
  readonly momoka?: Maybe<MomokaInfo>;
  readonly publishedOn?: Maybe<App>;
  readonly txHash?: Maybe<Scalars['TxHash']>;
};

export type MirrorNotification = {
  readonly __typename: 'MirrorNotification';
  readonly id: Scalars['UUID'];
  readonly mirrors: ReadonlyArray<ProfileMirrorResult>;
  readonly publication: PrimaryPublication;
};

export type MirrorablePublication = Comment | Post | Quote;

export type ModuleCurrencyApproval = {
  readonly followModule?: InputMaybe<FollowModuleType>;
  readonly openActionModule?: InputMaybe<OpenActionModuleType>;
  readonly referenceModule?: InputMaybe<ReferenceModuleType>;
  readonly unknownFollowModule?: InputMaybe<Scalars['EvmAddress']>;
  readonly unknownOpenActionModule?: InputMaybe<Scalars['EvmAddress']>;
  readonly unknownReferenceModule?: InputMaybe<Scalars['EvmAddress']>;
};

export type ModuleInfo = {
  readonly __typename: 'ModuleInfo';
  readonly name: Scalars['String'];
  readonly type: Scalars['String'];
};

export type MomokaCommentRequest = {
  readonly commentOn: Scalars['PublicationId'];
  readonly contentURI: Scalars['URI'];
};

export type MomokaCommentTransaction = {
  readonly __typename: 'MomokaCommentTransaction';
  readonly app?: Maybe<App>;
  readonly commentOn: PrimaryPublication;
  readonly createdAt: Scalars['DateTime'];
  readonly publication: Comment;
  readonly submitter: Scalars['EvmAddress'];
  readonly transactionId: Scalars['String'];
  readonly verificationStatus: MomokaVerificationStatus;
};

export type MomokaInfo = {
  readonly __typename: 'MomokaInfo';
  readonly proof: Scalars['MomokaProof'];
};

export type MomokaMirrorRequest = {
  /** You can add information like app on a mirror or tracking stuff */
  readonly metadataURI?: InputMaybe<Scalars['URI']>;
  readonly mirrorOn: Scalars['PublicationId'];
};

export type MomokaMirrorTransaction = {
  readonly __typename: 'MomokaMirrorTransaction';
  readonly app?: Maybe<App>;
  readonly createdAt: Scalars['DateTime'];
  readonly mirrorOn: PrimaryPublication;
  readonly publication: Mirror;
  readonly submitter: Scalars['EvmAddress'];
  readonly transactionId: Scalars['String'];
  readonly verificationStatus: MomokaVerificationStatus;
};

export type MomokaPostRequest = {
  readonly contentURI: Scalars['URI'];
};

export type MomokaPostTransaction = {
  readonly __typename: 'MomokaPostTransaction';
  readonly app?: Maybe<App>;
  readonly createdAt: Scalars['DateTime'];
  readonly publication: Post;
  readonly submitter: Scalars['EvmAddress'];
  readonly transactionId: Scalars['String'];
  readonly verificationStatus: MomokaVerificationStatus;
};

export type MomokaQuoteRequest = {
  readonly contentURI: Scalars['URI'];
  readonly quoteOn: Scalars['PublicationId'];
};

export type MomokaQuoteTransaction = {
  readonly __typename: 'MomokaQuoteTransaction';
  readonly app?: Maybe<App>;
  readonly createdAt: Scalars['DateTime'];
  readonly publication: Quote;
  readonly quoteOn: PrimaryPublication;
  readonly submitter: Scalars['EvmAddress'];
  readonly transactionId: Scalars['String'];
  readonly verificationStatus: MomokaVerificationStatus;
};

export type MomokaSubmitterResult = {
  readonly __typename: 'MomokaSubmitterResult';
  readonly address: Scalars['EvmAddress'];
  readonly name: Scalars['String'];
  readonly totalTransactions: Scalars['Int'];
};

export type MomokaSubmittersResult = {
  readonly __typename: 'MomokaSubmittersResult';
  readonly items: ReadonlyArray<MomokaSubmitterResult>;
  readonly pageInfo: PaginatedResultInfo;
};

export type MomokaSummaryResult = {
  readonly __typename: 'MomokaSummaryResult';
  readonly totalTransactions: Scalars['Int'];
};

export type MomokaTransaction =
  | MomokaCommentTransaction
  | MomokaMirrorTransaction
  | MomokaPostTransaction
  | MomokaQuoteTransaction;

export type MomokaTransactionRequest = {
  /** The momoka transaction id or internal publication id */
  readonly for: Scalars['String'];
};

export type MomokaTransactionsRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly for?: InputMaybe<Scalars['ProfileId']>;
  readonly limit?: InputMaybe<LimitType>;
};

export type MomokaTransactionsResult = {
  readonly __typename: 'MomokaTransactionsResult';
  readonly items: ReadonlyArray<MomokaTransaction>;
  readonly pageInfo: PaginatedResultInfo;
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

export type MomokaVerificationStatus =
  | MomokaVerificationStatusFailure
  | MomokaVerificationStatusSuccess;

export type MomokaVerificationStatusFailure = {
  readonly __typename: 'MomokaVerificationStatusFailure';
  readonly status: MomokaValidatorError;
};

export type MomokaVerificationStatusSuccess = {
  readonly __typename: 'MomokaVerificationStatusSuccess';
  readonly verified: Scalars['Boolean'];
};

export type MultirecipientFeeCollectModuleInput = {
  readonly amount: AmountInput;
  readonly collectLimit?: InputMaybe<Scalars['String']>;
  readonly endsAt?: InputMaybe<Scalars['DateTime']>;
  readonly followerOnly: Scalars['Boolean'];
  readonly recipients: ReadonlyArray<RecipientDataInput>;
  readonly referralFee?: InputMaybe<Scalars['Float']>;
};

export type MultirecipientFeeCollectOpenActionSettings = {
  readonly __typename: 'MultirecipientFeeCollectOpenActionSettings';
  /** The collect module amount info */
  readonly amount: Amount;
  /** The maximum number of collects for this publication. */
  readonly collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  readonly collectNft?: Maybe<Scalars['EvmAddress']>;
  readonly contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  readonly endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  readonly followerOnly: Scalars['Boolean'];
  /** Recipient of collect fees. */
  readonly recipients: ReadonlyArray<RecipientDataOutput>;
  /** The referral fee associated with this publication. */
  readonly referralFee: Scalars['Float'];
  readonly type: OpenActionModuleType;
};

export type Mutation = {
  readonly __typename: 'Mutation';
  readonly actOnOpenAction: LensProfileManagerRelayResult;
  readonly addProfileInterests?: Maybe<Scalars['Void']>;
  readonly addPublicationBookmark?: Maybe<Scalars['Void']>;
  readonly addPublicationNotInterested?: Maybe<Scalars['Void']>;
  readonly addReaction?: Maybe<Scalars['Void']>;
  readonly authenticate: AuthenticationResult;
  readonly block: LensProfileManagerRelayResult;
  readonly broadcastOnMomoka: BroadcastMomokaResult;
  readonly broadcastOnchain: RelayResult;
  readonly claimProfileWithHandle: ClaimProfileWithHandleResult;
  readonly commentOnMomoka: RelayMomokaResult;
  readonly commentOnchain: LensProfileManagerRelayResult;
  readonly createActOnOpenActionTypedData: CreateActOnOpenActionBroadcastItemResult;
  readonly createBlockProfilesTypedData: CreateBlockProfilesBroadcastItemResult;
  readonly createChangeProfileManagersTypedData: CreateChangeProfileManagersBroadcastItemResult;
  readonly createFollowTypedData: CreateFollowBroadcastItemResult;
  readonly createLegacyCollectTypedData: CreateLegacyCollectBroadcastItemResult;
  readonly createLinkHandleToProfileTypedData: CreateLinkHandleToProfileBroadcastItemResult;
  readonly createMomokaCommentTypedData: CreateMomokaCommentBroadcastItemResult;
  readonly createMomokaMirrorTypedData: CreateMomokaMirrorBroadcastItemResult;
  readonly createMomokaPostTypedData: CreateMomokaPostBroadcastItemResult;
  readonly createMomokaQuoteTypedData: CreateMomokaQuoteBroadcastItemResult;
  readonly createNftGallery: Scalars['NftGalleryId'];
  readonly createOnchainCommentTypedData: CreateOnchainCommentBroadcastItemResult;
  readonly createOnchainMirrorTypedData: CreateOnchainMirrorBroadcastItemResult;
  readonly createOnchainPostTypedData: CreateOnchainPostBroadcastItemResult;
  readonly createOnchainQuoteTypedData: CreateOnchainQuoteBroadcastItemResult;
  readonly createOnchainSetProfileMetadataTypedData: CreateOnchainSetProfileMetadataBroadcastItemResult;
  readonly createProfile: RelaySuccess;
  readonly createProfileWithHandle: CreateProfileWithHandleResult;
  readonly createSetFollowModuleTypedData: CreateSetFollowModuleBroadcastItemResult;
  readonly createUnblockProfilesTypedData: CreateUnblockProfilesBroadcastItemResult;
  readonly createUnfollowTypedData: CreateUnfollowBroadcastItemResult;
  readonly createUnlinkHandleFromProfileTypedData: CreateUnlinkHandleFromProfileBroadcastItemResult;
  readonly deleteNftGallery?: Maybe<Scalars['Void']>;
  readonly dismissRecommendedProfiles?: Maybe<Scalars['Void']>;
  readonly follow: LensProfileManagerRelayResult;
  readonly hidePublication?: Maybe<Scalars['Void']>;
  readonly idKitPhoneVerifyWebhook: IdKitPhoneVerifyWebhookResultStatusType;
  readonly internalAddCuratedTag?: Maybe<Scalars['Void']>;
  readonly internalAddInvites?: Maybe<Scalars['Void']>;
  readonly internalAllowDomain?: Maybe<Scalars['Void']>;
  readonly internalClaim?: Maybe<Scalars['Void']>;
  readonly internalCuratedUpdate?: Maybe<Scalars['Void']>;
  readonly internalNftIndex?: Maybe<Scalars['Void']>;
  readonly internalNftVerify?: Maybe<Scalars['Void']>;
  readonly internalRemoveCuratedTag?: Maybe<Scalars['Void']>;
  readonly internalUpdateProfileStatus?: Maybe<Scalars['Void']>;
  readonly invite?: Maybe<Scalars['Void']>;
  readonly legacyCollect: LensProfileManagerRelayResult;
  readonly linkHandleToProfile: LensProfileManagerRelayResult;
  readonly mirrorOnMomoka: RelayMomokaResult;
  readonly mirrorOnchain: LensProfileManagerRelayResult;
  readonly nftOwnershipChallenge: NftOwnershipChallengeResult;
  readonly postOnMomoka: RelayMomokaResult;
  readonly postOnchain: LensProfileManagerRelayResult;
  readonly quoteOnMomoka: RelayMomokaResult;
  readonly quoteOnchain: LensProfileManagerRelayResult;
  readonly refresh: AuthenticationResult;
  readonly refreshPublicationMetadata: RefreshPublicationMetadataResult;
  readonly removeProfileInterests?: Maybe<Scalars['Void']>;
  readonly removePublicationBookmark?: Maybe<Scalars['Void']>;
  readonly removeReaction?: Maybe<Scalars['Void']>;
  readonly reportPublication?: Maybe<Scalars['Void']>;
  readonly revokeAuthentication?: Maybe<Scalars['Void']>;
  readonly setDefaultProfile?: Maybe<Scalars['Void']>;
  readonly setFollowModule: LensProfileManagerRelayResult;
  readonly setProfileMetadata: LensProfileManagerRelayResult;
  readonly unblock: LensProfileManagerRelayResult;
  readonly undoPublicationNotInterested?: Maybe<Scalars['Void']>;
  readonly unfollow: LensProfileManagerRelayResult;
  readonly unlinkHandleFromProfile: LensProfileManagerRelayResult;
  readonly updateNftGalleryInfo?: Maybe<Scalars['Void']>;
  readonly updateNftGalleryItems?: Maybe<Scalars['Void']>;
  readonly updateNftGalleryOrder?: Maybe<Scalars['Void']>;
  readonly walletAuthenticationToProfileAuthentication: AuthenticationResult;
};

export type MutationActOnOpenActionArgs = {
  request: ActOnOpenActionLensManagerRequest;
};

export type MutationAddProfileInterestsArgs = {
  request: ProfileInterestsRequest;
};

export type MutationAddPublicationBookmarkArgs = {
  request: PublicationBookmarkRequest;
};

export type MutationAddPublicationNotInterestedArgs = {
  request: PublicationNotInterestedRequest;
};

export type MutationAddReactionArgs = {
  request: ReactionRequest;
};

export type MutationAuthenticateArgs = {
  request: SignedAuthChallenge;
};

export type MutationBlockArgs = {
  request: BlockRequest;
};

export type MutationBroadcastOnMomokaArgs = {
  request: BroadcastRequest;
};

export type MutationBroadcastOnchainArgs = {
  request: BroadcastRequest;
};

export type MutationClaimProfileWithHandleArgs = {
  request: ClaimProfileWithHandleRequest;
};

export type MutationCommentOnMomokaArgs = {
  request: MomokaCommentRequest;
};

export type MutationCommentOnchainArgs = {
  request: OnchainCommentRequest;
};

export type MutationCreateActOnOpenActionTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: ActOnOpenActionRequest;
};

export type MutationCreateBlockProfilesTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: BlockRequest;
};

export type MutationCreateChangeProfileManagersTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: ChangeProfileManagersRequest;
};

export type MutationCreateFollowTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: FollowRequest;
};

export type MutationCreateLegacyCollectTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: LegacyCollectRequest;
};

export type MutationCreateLinkHandleToProfileTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: LinkHandleToProfileRequest;
};

export type MutationCreateMomokaCommentTypedDataArgs = {
  request: MomokaCommentRequest;
};

export type MutationCreateMomokaMirrorTypedDataArgs = {
  request: MomokaMirrorRequest;
};

export type MutationCreateMomokaPostTypedDataArgs = {
  request: MomokaPostRequest;
};

export type MutationCreateMomokaQuoteTypedDataArgs = {
  request: MomokaQuoteRequest;
};

export type MutationCreateNftGalleryArgs = {
  request: NftGalleryCreateRequest;
};

export type MutationCreateOnchainCommentTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainCommentRequest;
};

export type MutationCreateOnchainMirrorTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainMirrorRequest;
};

export type MutationCreateOnchainPostTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainPostRequest;
};

export type MutationCreateOnchainQuoteTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainQuoteRequest;
};

export type MutationCreateOnchainSetProfileMetadataTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainSetProfileMetadataRequest;
};

export type MutationCreateProfileArgs = {
  request: CreateProfileRequest;
};

export type MutationCreateProfileWithHandleArgs = {
  request: CreateProfileWithHandleRequest;
};

export type MutationCreateSetFollowModuleTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: SetFollowModuleRequest;
};

export type MutationCreateUnblockProfilesTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UnblockRequest;
};

export type MutationCreateUnfollowTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UnfollowRequest;
};

export type MutationCreateUnlinkHandleFromProfileTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UnlinkHandleFromProfileRequest;
};

export type MutationDeleteNftGalleryArgs = {
  request: NftGalleryDeleteRequest;
};

export type MutationDismissRecommendedProfilesArgs = {
  request: DismissRecommendedProfilesRequest;
};

export type MutationFollowArgs = {
  request: FollowLensManagerRequest;
};

export type MutationHidePublicationArgs = {
  request: HidePublicationRequest;
};

export type MutationIdKitPhoneVerifyWebhookArgs = {
  request: IdKitPhoneVerifyWebhookRequest;
};

export type MutationInternalAddCuratedTagArgs = {
  request: InternalAddCuratedTagRequest;
};

export type MutationInternalAddInvitesArgs = {
  request: InternalAddInvitesRequest;
};

export type MutationInternalAllowDomainArgs = {
  request: InternalAllowDomainRequest;
};

export type MutationInternalClaimArgs = {
  request: InternalClaimRequest;
};

export type MutationInternalCuratedUpdateArgs = {
  request: InternalCuratedUpdateRequest;
};

export type MutationInternalNftIndexArgs = {
  request: InternalNftIndexRequest;
};

export type MutationInternalNftVerifyArgs = {
  request: InternalNftVerifyRequest;
};

export type MutationInternalRemoveCuratedTagArgs = {
  request: InternalRemoveCuratedTagRequest;
};

export type MutationInternalUpdateProfileStatusArgs = {
  request: InternalUpdateProfileStatusRequest;
};

export type MutationInviteArgs = {
  request: InviteRequest;
};

export type MutationLegacyCollectArgs = {
  request: LegacyCollectRequest;
};

export type MutationLinkHandleToProfileArgs = {
  request: LinkHandleToProfileRequest;
};

export type MutationMirrorOnMomokaArgs = {
  request: MomokaMirrorRequest;
};

export type MutationMirrorOnchainArgs = {
  request: OnchainMirrorRequest;
};

export type MutationNftOwnershipChallengeArgs = {
  request: NftOwnershipChallengeRequest;
};

export type MutationPostOnMomokaArgs = {
  request: MomokaPostRequest;
};

export type MutationPostOnchainArgs = {
  request: OnchainPostRequest;
};

export type MutationQuoteOnMomokaArgs = {
  request: MomokaQuoteRequest;
};

export type MutationQuoteOnchainArgs = {
  request: OnchainQuoteRequest;
};

export type MutationRefreshArgs = {
  request: RefreshRequest;
};

export type MutationRefreshPublicationMetadataArgs = {
  request: RefreshPublicationMetadataRequest;
};

export type MutationRemoveProfileInterestsArgs = {
  request: ProfileInterestsRequest;
};

export type MutationRemovePublicationBookmarkArgs = {
  request: PublicationBookmarkRequest;
};

export type MutationRemoveReactionArgs = {
  request: ReactionRequest;
};

export type MutationReportPublicationArgs = {
  request: ReportPublicationRequest;
};

export type MutationRevokeAuthenticationArgs = {
  request: RevokeAuthenticationRequest;
};

export type MutationSetDefaultProfileArgs = {
  request: SetDefaultProfileRequest;
};

export type MutationSetFollowModuleArgs = {
  request: SetFollowModuleRequest;
};

export type MutationSetProfileMetadataArgs = {
  request: OnchainSetProfileMetadataRequest;
};

export type MutationUnblockArgs = {
  request: UnblockRequest;
};

export type MutationUndoPublicationNotInterestedArgs = {
  request: PublicationNotInterestedRequest;
};

export type MutationUnfollowArgs = {
  request: UnfollowRequest;
};

export type MutationUnlinkHandleFromProfileArgs = {
  request: UnlinkHandleFromProfileRequest;
};

export type MutationUpdateNftGalleryInfoArgs = {
  request: NftGalleryUpdateInfoRequest;
};

export type MutationUpdateNftGalleryItemsArgs = {
  request: NftGalleryUpdateItemsRequest;
};

export type MutationUpdateNftGalleryOrderArgs = {
  request: NftGalleryUpdateItemOrderRequest;
};

export type MutationWalletAuthenticationToProfileAuthenticationArgs = {
  request: WalletAuthenticationToProfileAuthenticationRequest;
};

export type MutualFollowersRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly observer: Scalars['ProfileId'];
  readonly viewing: Scalars['ProfileId'];
};

/** Mutual NFT collections request */
export type MutualNftCollectionsRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  /** Profile id of the first user */
  readonly observer: Scalars['ProfileId'];
  /** Profile id of the second user */
  readonly viewing: Scalars['ProfileId'];
};

export type MutualPoapsQueryRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly observer: Scalars['ProfileId'];
  readonly viewing: Scalars['ProfileId'];
};

export type NetworkAddress = {
  readonly __typename: 'NetworkAddress';
  readonly address: Scalars['EvmAddress'];
  readonly chainId: Scalars['ChainId'];
};

export type NetworkAddressInput = {
  readonly address: Scalars['EvmAddress'];
  readonly chainId: Scalars['ChainId'];
};

export type Nfi = {
  readonly c: Scalars['EvmAddress'];
  readonly i: Scalars['ChainId'];
};

export type Nft = {
  readonly __typename: 'Nft';
  readonly collection: NftCollection;
  readonly contentURI: Scalars['URI'];
  readonly contract: NetworkAddress;
  readonly contractType: NftContractType;
  readonly metadata: NftMetadata;
  readonly owner: Owner;
  readonly tokenId: Scalars['TokenId'];
  readonly totalSupply: Scalars['String'];
};

/** Nft Collection type */
export type NftCollection = {
  readonly __typename: 'NftCollection';
  /** Collection base URI for token metadata */
  readonly baseUri?: Maybe<Scalars['URI']>;
  /** The contract info, address and chain id */
  readonly contract: NetworkAddress;
  /** Collection ERC type */
  readonly contractType: NftContractType;
  /** Collection name */
  readonly name: Scalars['String'];
  /** Collection symbol */
  readonly symbol: Scalars['String'];
  /** Collection verified status */
  readonly verified: Scalars['Boolean'];
};

export enum NftCollectionOwnersOrder {
  FollowersFirst = 'FollowersFirst',
  None = 'None',
}

/** NFT collection owners request */
export type NftCollectionOwnersRequest = {
  /** The profile id to use when ordering by followers */
  readonly by?: InputMaybe<Scalars['ProfileId']>;
  /** The chain id */
  readonly chainId: Scalars['ChainId'];
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  /** The contract address */
  readonly for: Scalars['EvmAddress'];
  readonly limit?: InputMaybe<LimitType>;
  /** The ordering of Nft collection owners */
  readonly order?: InputMaybe<NftCollectionOwnersOrder>;
};

/** A wrapper object containing an Nft collection, the total number of Lens profiles that own it, and optional field resolvers */
export type NftCollectionWithOwners = {
  readonly __typename: 'NftCollectionWithOwners';
  /** The Nft collection */
  readonly collection: NftCollection;
  /** The total number of Lens profile owners that have at least 1 NFT from this collection */
  readonly totalOwners: Scalars['Float'];
};

/** NFT collections request */
export type NftCollectionsRequest = {
  /** The chain ids to look for NFTs on. Ethereum and Polygon are supported. If omitted, it will look on both chains by default. */
  readonly chainIds?: InputMaybe<ReadonlyArray<Scalars['ChainId']>>;
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  /** Exclude Lens Follower NFTs */
  readonly excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  readonly for?: InputMaybe<Scalars['ProfileId']>;
  /** Filter by owner address */
  readonly forAddress?: InputMaybe<Scalars['EvmAddress']>;
  readonly limit?: InputMaybe<LimitType>;
};

export enum NftContractType {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
}

export type NftGalleriesRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly for: Scalars['ProfileId'];
  readonly limit?: InputMaybe<LimitType>;
};

export type NftGallery = {
  readonly __typename: 'NftGallery';
  readonly createdAt: Scalars['DateTime'];
  readonly id: Scalars['NftGalleryId'];
  readonly items: ReadonlyArray<Nft>;
  readonly name: Scalars['NftGalleryName'];
  readonly owner: Scalars['ProfileId'];
  readonly updatedAt: Scalars['DateTime'];
};

export type NftGalleryCreateRequest = {
  readonly items: ReadonlyArray<NftInput>;
  readonly name: Scalars['NftGalleryName'];
};

export type NftGalleryDeleteRequest = {
  readonly galleryId: Scalars['NftGalleryId'];
};

export type NftGalleryUpdateInfoRequest = {
  readonly galleryId: Scalars['NftGalleryId'];
  readonly name: Scalars['NftGalleryName'];
};

export type NftGalleryUpdateItemOrderRequest = {
  readonly galleryId: Scalars['NftGalleryId'];
  readonly updates?: InputMaybe<ReadonlyArray<NftUpdateItemOrder>>;
};

export type NftGalleryUpdateItemsRequest = {
  readonly galleryId: Scalars['NftGalleryId'];
  readonly toAdd?: InputMaybe<ReadonlyArray<NftInput>>;
  readonly toRemove?: InputMaybe<ReadonlyArray<NftInput>>;
};

export type NftImage = {
  readonly __typename: 'NftImage';
  /** The contract address of the NFT collection */
  readonly collection: NetworkAddress;
  /** The image set for the NFT */
  readonly image: ImageSet;
  /** The token ID of the NFT */
  readonly tokenId: Scalars['TokenId'];
  /** Indicates whether the NFT is from a verified collection or not */
  readonly verified: Scalars['Boolean'];
};

export type NftInput = {
  readonly contract: NetworkAddressInput;
  readonly tokenId: Scalars['TokenId'];
};

export type NftMetadata = {
  readonly __typename: 'NftMetadata';
  readonly animationUrl?: Maybe<Scalars['URI']>;
  readonly attributes?: Maybe<ReadonlyArray<PublicationMarketplaceMetadataAttribute>>;
  readonly description?: Maybe<Scalars['Markdown']>;
  readonly externalURL?: Maybe<Scalars['URL']>;
  readonly image?: Maybe<ImageSet>;
  readonly name?: Maybe<Scalars['String']>;
};

export type NftOwnershipChallengeRequest = {
  readonly for: Scalars['EvmAddress'];
  readonly nfts: ReadonlyArray<NftInput>;
};

export type NftOwnershipChallengeResult = {
  readonly __typename: 'NftOwnershipChallengeResult';
  readonly info?: Maybe<Scalars['String']>;
  readonly success: Scalars['Boolean'];
};

export type NftOwnershipCondition = {
  readonly __typename: 'NftOwnershipCondition';
  readonly contract: NetworkAddress;
  readonly contractType: NftContractType;
  readonly tokenIds?: Maybe<ReadonlyArray<Scalars['TokenId']>>;
};

export type NftUpdateItemOrder = {
  readonly contract: NetworkAddressInput;
  readonly newOrder: Scalars['Int'];
  readonly tokenId: Scalars['TokenId'];
};

export type NftsRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly where?: InputMaybe<NftsRequestWhere>;
};

export type NftsRequestWhere = {
  /** Chain IDs to search. Supports Ethereum and Polygon. If omitted, it will search in both chains */
  readonly chainIds?: InputMaybe<ReadonlyArray<Scalars['ChainId']>>;
  readonly excludeCollections?: InputMaybe<ReadonlyArray<NetworkAddressInput>>;
  /** Exclude follower NFTs from the search */
  readonly excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  /** Ethereum address of the owner. If unknown you can also search by profile ID */
  readonly forAddress?: InputMaybe<Scalars['EvmAddress']>;
  /** Profile ID of the owner */
  readonly forProfileId?: InputMaybe<Scalars['ProfileId']>;
  readonly includeCollections?: InputMaybe<ReadonlyArray<NetworkAddressInput>>;
  /** Search query. Has to be part of a collection name */
  readonly query?: InputMaybe<Scalars['String']>;
};

export type Notification =
  | ActedNotification
  | CommentNotification
  | FollowNotification
  | MentionNotification
  | MirrorNotification
  | QuoteNotification
  | ReactionNotification;

export type NotificationRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly where?: InputMaybe<NotificationWhere>;
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
  readonly customFilters?: InputMaybe<ReadonlyArray<CustomFiltersType>>;
  readonly highSignalFilter?: InputMaybe<Scalars['Boolean']>;
  readonly notificationTypes?: InputMaybe<ReadonlyArray<NotificationType>>;
  readonly publishedOn?: InputMaybe<ReadonlyArray<Scalars['AppId']>>;
};

export type OnchainCommentRequest = {
  readonly commentOn: Scalars['PublicationId'];
  /** If your using an unknown reference modules you need to pass this in. `followerOnlyReferenceModule` and `degreesOfSeparationReferenceModule` is handled automatically for you and if you supply this on publications with those settings it will be ignored */
  readonly commentOnReferenceModuleData?: InputMaybe<Scalars['BlockchainData']>;
  readonly contentURI: Scalars['URI'];
  readonly openActionModules?: InputMaybe<ReadonlyArray<OpenActionModuleInput>>;
  readonly referenceModule?: InputMaybe<ReferenceModuleInput>;
  readonly referrers?: InputMaybe<ReadonlyArray<OnchainReferrer>>;
};

export type OnchainMirrorRequest = {
  /** You can add information like app on a mirror or tracking stuff */
  readonly metadataURI?: InputMaybe<Scalars['URI']>;
  readonly mirrorOn: Scalars['PublicationId'];
  /** If your using an unknown reference modules you need to pass this in. `followerOnlyReferenceModule` and `degreesOfSeparationReferenceModule` is handled automatically for you and if you supply this on publications with those settings it will be ignored */
  readonly mirrorReferenceModuleData?: InputMaybe<Scalars['BlockchainData']>;
  readonly referrers?: InputMaybe<ReadonlyArray<OnchainReferrer>>;
};

export type OnchainPostRequest = {
  readonly contentURI: Scalars['URI'];
  readonly openActionModules?: InputMaybe<ReadonlyArray<OpenActionModuleInput>>;
  readonly referenceModule?: InputMaybe<ReferenceModuleInput>;
};

export type OnchainQuoteRequest = {
  readonly contentURI: Scalars['URI'];
  readonly openActionModules?: InputMaybe<ReadonlyArray<OpenActionModuleInput>>;
  readonly quoteOn: Scalars['PublicationId'];
  /** If your using an unknown reference modules you need to pass this in. `followerOnlyReferenceModule` and `degreesOfSeparationReferenceModule` is handled automatically for you and if you supply this on publications with those settings it will be ignored */
  readonly quoteOnReferenceModuleData?: InputMaybe<Scalars['BlockchainData']>;
  readonly referenceModule?: InputMaybe<ReferenceModuleInput>;
  readonly referrers?: InputMaybe<ReadonlyArray<OnchainReferrer>>;
};

export type OnchainReferrer = {
  readonly profileId?: InputMaybe<Scalars['ProfileId']>;
  readonly publicationId?: InputMaybe<Scalars['PublicationId']>;
};

export type OnchainSetProfileMetadataRequest = {
  readonly metadataURI: Scalars['URI'];
};

export enum OpenActionCategoryType {
  Collect = 'COLLECT',
}

export type OpenActionFilter = {
  readonly address?: InputMaybe<Scalars['EvmAddress']>;
  readonly category?: InputMaybe<OpenActionCategoryType>;
  readonly type?: InputMaybe<OpenActionModuleType>;
};

export type OpenActionModule =
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
  | UnknownOpenActionModuleSettings;

export type OpenActionModuleInput = {
  readonly collectOpenAction?: InputMaybe<CollectActionModuleInput>;
  readonly unknownOpenAction?: InputMaybe<UnknownOpenActionModuleInput>;
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

export type OpenActionProfileActed = {
  readonly __typename: 'OpenActionProfileActed';
  readonly actedAt: Scalars['DateTime'];
  readonly action: OpenActionResult;
  readonly by: Profile;
};

export type OpenActionResult = KnownCollectOpenActionResult | UnknownOpenActionResult;

export type OptimisticStatusResult = {
  readonly __typename: 'OptimisticStatusResult';
  readonly isFinalisedOnchain: Scalars['Boolean'];
  readonly value: Scalars['Boolean'];
};

export type OrCondition = {
  readonly __typename: 'OrCondition';
  readonly criteria: ReadonlyArray<ThirdTierCondition>;
};

export type OwnedHandlesRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  /** The Ethereum address for which to retrieve owned handles */
  readonly for: Scalars['EvmAddress'];
  readonly limit?: InputMaybe<LimitType>;
};

export type Owner = {
  readonly __typename: 'Owner';
  readonly address: Scalars['EvmAddress'];
  readonly amount: Scalars['String'];
};

export type PaginatedApprovedAuthenticationResult = {
  readonly __typename: 'PaginatedApprovedAuthenticationResult';
  readonly items: ReadonlyArray<ApprovedAuthentication>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedCurrenciesResult = {
  readonly __typename: 'PaginatedCurrenciesResult';
  readonly items: ReadonlyArray<Erc20>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedExplorePublicationResult = {
  readonly __typename: 'PaginatedExplorePublicationResult';
  readonly items: ReadonlyArray<ExplorePublication>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedFeedHighlightsResult = {
  readonly __typename: 'PaginatedFeedHighlightsResult';
  readonly items: ReadonlyArray<FeedHighlight>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedFeedResult = {
  readonly __typename: 'PaginatedFeedResult';
  readonly items: ReadonlyArray<FeedItem>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedHandlesResult = {
  readonly __typename: 'PaginatedHandlesResult';
  readonly items: ReadonlyArray<HandleInfo>;
  readonly pageInfo: PaginatedResultInfo;
};

/** Nft collections paginated result */
export type PaginatedNftCollectionsResult = {
  readonly __typename: 'PaginatedNftCollectionsResult';
  readonly items: ReadonlyArray<NftCollection>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedNftGalleriesResult = {
  readonly __typename: 'PaginatedNftGalleriesResult';
  readonly items: ReadonlyArray<NftGallery>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedNftsResult = {
  readonly __typename: 'PaginatedNftsResult';
  readonly items: ReadonlyArray<Nft>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedNotificationResult = {
  readonly __typename: 'PaginatedNotificationResult';
  readonly items: ReadonlyArray<Notification>;
  readonly pageInfo: PaginatedResultInfo;
};

/** Pagination with Offset fields  */
export type PaginatedOffsetRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
};

/** The paginated Poap Events result */
export type PaginatedPoapEventResult = {
  readonly __typename: 'PaginatedPoapEventResult';
  readonly items: ReadonlyArray<PoapEvent>;
  readonly pageInfo: PaginatedResultInfo;
};

/** The paginated Poap Token Results */
export type PaginatedPoapTokenResult = {
  readonly __typename: 'PaginatedPoapTokenResult';
  readonly items: ReadonlyArray<PoapToken>;
  readonly pageInfo: PaginatedResultInfo;
};

/** Popular Nft collections paginated result */
export type PaginatedPopularNftCollectionsResult = {
  readonly __typename: 'PaginatedPopularNftCollectionsResult';
  readonly items: ReadonlyArray<NftCollectionWithOwners>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedProfileActionHistoryResult = {
  readonly __typename: 'PaginatedProfileActionHistoryResult';
  readonly items: ReadonlyArray<ProfileActionHistory>;
  readonly pageInfo: PaginatedResultInfo;
};

/** The paginated profile managers result */
export type PaginatedProfileManagersResult = {
  readonly __typename: 'PaginatedProfileManagersResult';
  readonly items: ReadonlyArray<ProfilesManagedResult>;
  readonly pageInfo: PaginatedResultInfo;
};

/** The paginated profile result */
export type PaginatedProfileResult = {
  readonly __typename: 'PaginatedProfileResult';
  readonly items: ReadonlyArray<Profile>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationPrimaryResult = {
  readonly __typename: 'PaginatedPublicationPrimaryResult';
  readonly items: ReadonlyArray<PrimaryPublication>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationsResult = {
  readonly __typename: 'PaginatedPublicationsResult';
  readonly items: ReadonlyArray<AnyPublication>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationsTagsResult = {
  readonly __typename: 'PaginatedPublicationsTagsResult';
  readonly items: ReadonlyArray<TagResult>;
  readonly pageInfo: PaginatedResultInfo;
};

/** The paginated result info */
export type PaginatedResultInfo = {
  readonly __typename: 'PaginatedResultInfo';
  /** Cursor to query next results */
  readonly next?: Maybe<Scalars['Cursor']>;
  /** Cursor to query the actual results */
  readonly prev?: Maybe<Scalars['Cursor']>;
};

export type PaginatedRevenueFromPublicationsResult = {
  readonly __typename: 'PaginatedRevenueFromPublicationsResult';
  readonly items: ReadonlyArray<PublicationRevenue>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedSupportedModules = {
  readonly __typename: 'PaginatedSupportedModules';
  readonly items: ReadonlyArray<SupportedModule>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PaginatedWhoReactedResult = {
  readonly __typename: 'PaginatedWhoReactedResult';
  readonly items: ReadonlyArray<ProfileWhoReactedResult>;
  readonly pageInfo: PaginatedResultInfo;
};

export type PhysicalAddress = {
  readonly __typename: 'PhysicalAddress';
  /** The country name component. */
  readonly country: Scalars['EncryptableString'];
  /** The full mailing address formatted for display. */
  readonly formatted?: Maybe<Scalars['EncryptableString']>;
  /** The city or locality. */
  readonly locality: Scalars['EncryptableString'];
  /** The zip or postal code. */
  readonly postalCode?: Maybe<Scalars['EncryptableString']>;
  /** The state or region. */
  readonly region?: Maybe<Scalars['EncryptableString']>;
  /** The street address including house number, street name, P.O. Box, apartment or unit number and extended multi-line address information. */
  readonly streetAddress?: Maybe<Scalars['EncryptableString']>;
};

/** The POAP Event result */
export type PoapEvent = {
  readonly __typename: 'PoapEvent';
  readonly animationUrl?: Maybe<Scalars['URL']>;
  readonly city?: Maybe<Scalars['String']>;
  readonly country?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly endDate?: Maybe<Scalars['DateTime']>;
  readonly eventTemplateId?: Maybe<Scalars['Int']>;
  readonly eventUrl?: Maybe<Scalars['URL']>;
  readonly expiryDate?: Maybe<Scalars['DateTime']>;
  readonly fancyId?: Maybe<Scalars['String']>;
  readonly fromAdmin?: Maybe<Scalars['Boolean']>;
  readonly id: Scalars['PoapEventId'];
  readonly imageUrl?: Maybe<Scalars['URL']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly privateEvent?: Maybe<Scalars['Boolean']>;
  readonly startDate?: Maybe<Scalars['DateTime']>;
  readonly virtualEvent?: Maybe<Scalars['Boolean']>;
  readonly year?: Maybe<Scalars['Int']>;
};

export type PoapEventQueryRequest = {
  readonly eventId: Scalars['PoapEventId'];
};

export type PoapHoldersQueryRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly eventId: Scalars['PoapEventId'];
  readonly limit?: InputMaybe<LimitType>;
};

/** The Poap Token Event */
export type PoapToken = {
  readonly __typename: 'PoapToken';
  readonly created: Scalars['DateTime'];
  readonly event: PoapEvent;
  /** Poap Event Id */
  readonly eventId: Scalars['PoapEventId'];
  /** Which network the token is: L1 (eth) or L2 (Gnosis) */
  readonly layer: PoapTokenLayerType;
  /** migrated to L1 at */
  readonly migrated?: Maybe<Scalars['DateTime']>;
  readonly owner: NetworkAddress;
  readonly tokenId: Scalars['TokenId'];
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
  readonly chainIds?: InputMaybe<ReadonlyArray<Scalars['ChainId']>>;
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  /** Exclude Lens Follower NFTs */
  readonly excludeFollowers?: InputMaybe<Scalars['Boolean']>;
  readonly limit?: InputMaybe<LimitType>;
  /** Include only verified collections */
  readonly onlyVerified?: InputMaybe<Scalars['Boolean']>;
  /** The ordering of Nft collection owners. Defaults to Total Lens Profile owners */
  readonly orderBy?: InputMaybe<PopularNftCollectionsOrder>;
};

export type Post = {
  readonly __typename: 'Post';
  readonly by: Profile;
  readonly createdAt: Scalars['DateTime'];
  readonly hashtagsMentioned: ReadonlyArray<Scalars['String']>;
  readonly id: Scalars['PublicationId'];
  readonly isEncrypted: Scalars['Boolean'];
  readonly isHidden: Scalars['Boolean'];
  readonly metadata: PublicationMetadata;
  readonly momoka?: Maybe<MomokaInfo>;
  readonly openActionModules: ReadonlyArray<OpenActionModule>;
  readonly operations: PublicationOperations;
  readonly profilesMentioned: ReadonlyArray<ProfileMentioned>;
  readonly publishedOn?: Maybe<App>;
  readonly referenceModule?: Maybe<ReferenceModule>;
  readonly stats: PublicationStats;
  readonly txHash?: Maybe<Scalars['TxHash']>;
};

export type PostStatsArgs = {
  request?: InputMaybe<PublicationStatsInput>;
};

export type PrfResult = {
  readonly __typename: 'PrfResult';
  readonly dd: Scalars['Boolean'];
  readonly ss: Scalars['Boolean'];
};

export type PrimaryPublication = Comment | Post | Quote;

/** The Profile */
export type Profile = {
  readonly __typename: 'Profile';
  /** When the profile was created */
  readonly createdAt: Scalars['DateTime'];
  /** The follow module */
  readonly followModule?: Maybe<FollowModule>;
  /** The profile follow nft address */
  readonly followNftAddress?: Maybe<NetworkAddress>;
  readonly guardian?: Maybe<ProfileGuardianResult>;
  /** The profile handle - a profile may not have one */
  readonly handle?: Maybe<HandleInfo>;
  /** The profile id */
  readonly id: Scalars['ProfileId'];
  readonly interests: ReadonlyArray<Scalars['String']>;
  readonly invitedBy?: Maybe<Profile>;
  /** The number of invites left */
  readonly invitesLeft: Scalars['Int'];
  /** The profile metadata. You can optionally query profile metadata by app id.  */
  readonly metadata?: Maybe<ProfileMetadata>;
  /** The on chain identity */
  readonly onchainIdentity: ProfileOnchainIdentity;
  readonly operations: ProfileOperations;
  /** Who owns the profile */
  readonly ownedBy: NetworkAddress;
  /** If the profile has got signless enabled */
  readonly signless: Scalars['Boolean'];
  /** If lens API will sponsor this persons for gasless experience, note they can have signless on but sponsor false which means it be rejected */
  readonly sponsor: Scalars['Boolean'];
  readonly stats: ProfileStats;
  readonly txHash: Scalars['TxHash'];
};

/** The Profile */
export type ProfileMetadataArgs = {
  request?: InputMaybe<GetProfileMetadataArgs>;
};

/** The Profile */
export type ProfileStatsArgs = {
  request?: InputMaybe<ProfileStatsArg>;
};

/** The Profile */
export type ProfileActionHistory = {
  readonly __typename: 'ProfileActionHistory';
  readonly actionType: ProfileActionHistoryType;
  readonly actionedOn: Scalars['DateTime'];
  readonly id: Scalars['Float'];
  readonly txHash?: Maybe<Scalars['TxHash']>;
  readonly who: Scalars['EvmAddress'];
};

export type ProfileActionHistoryRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
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

export type ProfileGuardianResult = {
  readonly __typename: 'ProfileGuardianResult';
  readonly cooldownEndsOn?: Maybe<Scalars['DateTime']>;
  readonly protected: Scalars['Boolean'];
};

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
  readonly interests: ReadonlyArray<ProfileInterestTypes>;
};

export type ProfileManagersRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  /** The profile ID for which to retrieve managers */
  readonly for: Scalars['ProfileId'];
  readonly limit?: InputMaybe<LimitType>;
};

export type ProfileMentioned = {
  readonly __typename: 'ProfileMentioned';
  readonly profile: Profile;
  readonly snapshotHandleMentioned: HandleInfo;
  readonly stillOwnsHandle: Scalars['Boolean'];
};

export type ProfileMetadata = {
  readonly __typename: 'ProfileMetadata';
  /** The app that this metadata is displayed on */
  readonly appId?: Maybe<Scalars['AppId']>;
  /** Profile Custom attributes */
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** The bio for the profile */
  readonly bio?: Maybe<Scalars['Markdown']>;
  /** The cover picture for the profile */
  readonly coverPicture?: Maybe<ImageSet>;
  /** The display name for the profile */
  readonly displayName?: Maybe<Scalars['String']>;
  /** The picture for the profile */
  readonly picture?: Maybe<ProfilePicture>;
  /** The raw uri for the which the profile metadata was set as */
  readonly rawURI: Scalars['URI'];
};

export type ProfileMirrorResult = {
  readonly __typename: 'ProfileMirrorResult';
  readonly mirrorId: Scalars['PublicationId'];
  readonly mirroredAt: Scalars['DateTime'];
  readonly profile: Profile;
};

export type ProfileOnchainIdentity = {
  readonly __typename: 'ProfileOnchainIdentity';
  /** The ens information */
  readonly ens?: Maybe<EnsOnchainIdentity>;
  /** The POH status */
  readonly proofOfHumanity: Scalars['Boolean'];
  /** The sybil dot org information */
  readonly sybilDotOrg: SybilDotOrgIdentity;
  /** The worldcoin identity */
  readonly worldcoin: WorldcoinIdentity;
};

export type ProfileOperations = {
  readonly __typename: 'ProfileOperations';
  readonly canBlock: Scalars['Boolean'];
  readonly canFollow: TriStateValue;
  readonly canUnblock: Scalars['Boolean'];
  readonly canUnfollow: Scalars['Boolean'];
  readonly hasBlockedMe: OptimisticStatusResult;
  readonly id: Scalars['ProfileId'];
  readonly isBlockedByMe: OptimisticStatusResult;
  readonly isFollowedByMe: OptimisticStatusResult;
  readonly isFollowingMe: OptimisticStatusResult;
};

export type ProfileOwnershipCondition = {
  readonly __typename: 'ProfileOwnershipCondition';
  readonly profileId: Scalars['ProfileId'];
};

export type ProfilePicture = ImageSet | NftImage;

export type ProfileReactedResult = {
  readonly __typename: 'ProfileReactedResult';
  readonly profile: Profile;
  readonly reactions: ReadonlyArray<ReactedResult>;
};

/** The reaction details for a publication */
export type ProfileReactionResult = {
  readonly __typename: 'ProfileReactionResult';
  /** The reaction */
  readonly reaction: PublicationReactionType;
  /** The reaction date */
  readonly reactionAt: Scalars['DateTime'];
};

export type ProfileRecommendationsRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  /** Disable machine learning recommendations (default: false) */
  readonly disableML?: InputMaybe<Scalars['Boolean']>;
  /** Filter based on a specific profile ID */
  readonly for: Scalars['ProfileId'];
  readonly limit?: InputMaybe<LimitType>;
  /** Shuffle the recommendations (default: false) */
  readonly shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type ProfileRequest = {
  /** The handle for profile you want to fetch - namespace/localname */
  readonly forHandle?: InputMaybe<Scalars['Handle']>;
  /** The profile you want to fetch */
  readonly forProfileId?: InputMaybe<Scalars['ProfileId']>;
};

export type ProfileSearchRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  /** Query for the profile search */
  readonly query: Scalars['String'];
  /** Filtering criteria for profile search */
  readonly where?: InputMaybe<ProfileSearchWhere>;
};

export type ProfileSearchWhere = {
  /** Array of custom filters for profile search */
  readonly customFilters?: InputMaybe<ReadonlyArray<CustomFiltersType>>;
};

/** The Profile Stats */
export type ProfileStats = {
  readonly __typename: 'ProfileStats';
  readonly comments: Scalars['Int'];
  readonly countOpenActions: Scalars['Int'];
  readonly followers: Scalars['Int'];
  readonly following: Scalars['Int'];
  readonly id: Scalars['ProfileId'];
  readonly mirrors: Scalars['Int'];
  readonly posts: Scalars['Int'];
  readonly publications: Scalars['Int'];
  readonly quotes: Scalars['Int'];
  /** How many times a profile has reacted on something */
  readonly reacted: Scalars['Int'];
  /** How many times other profiles have reacted on something this profile did */
  readonly reactions: Scalars['Int'];
};

/** The Profile Stats */
export type ProfileStatsCountOpenActionsArgs = {
  request?: InputMaybe<ProfileStatsCountOpenActionArgs>;
};

/** The Profile Stats */
export type ProfileStatsReactedArgs = {
  request?: InputMaybe<ProfileStatsReactionArgs>;
};

/** The Profile Stats */
export type ProfileStatsReactionsArgs = {
  request?: InputMaybe<ProfileStatsReactionArgs>;
};

export type ProfileStatsArg = {
  readonly customFilters?: InputMaybe<ReadonlyArray<CustomFiltersType>>;
  readonly forApps?: InputMaybe<ReadonlyArray<Scalars['AppId']>>;
};

export type ProfileStatsCountOpenActionArgs = {
  readonly anyOf?: InputMaybe<ReadonlyArray<OpenActionFilter>>;
};

export type ProfileStatsReactionArgs = {
  readonly type: PublicationReactionType;
};

export type ProfileWhoReactedResult = {
  readonly __typename: 'ProfileWhoReactedResult';
  readonly profile: Profile;
  readonly reactions: ReadonlyArray<ProfileReactionResult>;
};

export type ProfilesManagedRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  /** The Ethereum address for which to retrieve managed profiles */
  readonly for: Scalars['EvmAddress'];
  readonly includeOwned?: InputMaybe<Scalars['Boolean']>;
  readonly limit?: InputMaybe<LimitType>;
};

export type ProfilesManagedResult = {
  readonly __typename: 'ProfilesManagedResult';
  readonly address: Scalars['EvmAddress'];
  readonly isLensManager: Scalars['Boolean'];
};

export type ProfilesRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  /** The where clause to use to filter on what you are looking for */
  readonly where: ProfilesRequestWhere;
};

export type ProfilesRequestWhere = {
  /** Pass in an array of handles to get the profile entities */
  readonly handles?: InputMaybe<ReadonlyArray<Scalars['Handle']>>;
  /** Pass in an array of evm address to get the profile entities they own */
  readonly ownedBy?: InputMaybe<ReadonlyArray<Scalars['EvmAddress']>>;
  /** Pass in an array of profile ids to get the profile entities */
  readonly profileIds?: InputMaybe<ReadonlyArray<Scalars['ProfileId']>>;
  /** Pass the publication id and get a list of the profiles who commented on it */
  readonly whoCommentedOn?: InputMaybe<Scalars['PublicationId']>;
  /** Pass the publication id and get a list of the profiles who mirrored it */
  readonly whoMirroredPublication?: InputMaybe<Scalars['PublicationId']>;
  /** Pass the publication id and get a list of the profiles who quoted it */
  readonly whoQuotedPublication?: InputMaybe<Scalars['PublicationId']>;
};

export type PublicationBookmarkRequest = {
  readonly on: Scalars['PublicationId'];
};

export type PublicationBookmarksRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly where?: InputMaybe<PublicationBookmarksWhere>;
};

export type PublicationBookmarksWhere = {
  readonly metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type PublicationCommentOn = {
  readonly id: Scalars['PublicationId'];
  readonly ranking?: InputMaybe<PublicationCommentOnRanking>;
};

export type PublicationCommentOnRanking = {
  readonly filter?: InputMaybe<CommentRankingFilterType>;
};

export enum PublicationContentWarningType {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER',
}

export type PublicationMarketplaceMetadataAttribute = {
  readonly __typename: 'PublicationMarketplaceMetadataAttribute';
  readonly displayType?: Maybe<MarketplaceMetadataAttributeDisplayType>;
  readonly traitType?: Maybe<Scalars['String']>;
  readonly value?: Maybe<Scalars['String']>;
};

export type PublicationMetadata =
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

export type PublicationMetadataContentWarningFilter = {
  readonly oneOf: ReadonlyArray<PublicationContentWarningType>;
};

export type PublicationMetadataEncryptionStrategy = PublicationMetadataLitEncryption;

export type PublicationMetadataFilters = {
  readonly contentWarning?: InputMaybe<PublicationMetadataContentWarningFilter>;
  readonly locale?: InputMaybe<Scalars['Locale']>;
  readonly mainContentFocus?: InputMaybe<ReadonlyArray<PublicationMetadataMainFocusType>>;
  readonly publishedOn?: InputMaybe<ReadonlyArray<Scalars['AppId']>>;
  readonly tags?: InputMaybe<PublicationMetadataTagsFilter>;
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

export type PublicationMetadataLitEncryption = {
  readonly __typename: 'PublicationMetadataLitEncryption';
  readonly accessCondition: RootCondition;
  readonly encryptedPaths: ReadonlyArray<Scalars['EncryptedPath']>;
  readonly encryptionKey: Scalars['ContentEncryptionKey'];
};

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

export type PublicationMetadataMedia =
  | PublicationMetadataMediaAudio
  | PublicationMetadataMediaImage
  | PublicationMetadataMediaVideo;

export type PublicationMetadataMediaAudio = {
  readonly __typename: 'PublicationMetadataMediaAudio';
  readonly artist?: Maybe<Scalars['EncryptableString']>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  readonly audio: EncryptableAudioSet;
  readonly cover?: Maybe<EncryptableImageSet>;
  readonly credits?: Maybe<Scalars['EncryptableString']>;
  readonly duration?: Maybe<Scalars['Int']>;
  readonly genre?: Maybe<Scalars['EncryptableString']>;
  readonly license?: Maybe<PublicationMetadataLicenseType>;
  readonly lyrics?: Maybe<Scalars['EncryptableString']>;
  readonly recordLabel?: Maybe<Scalars['EncryptableString']>;
};

export type PublicationMetadataMediaImage = {
  readonly __typename: 'PublicationMetadataMediaImage';
  /** Alternative text for the image */
  readonly altTag?: Maybe<Scalars['EncryptableString']>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  readonly image: EncryptableImageSet;
  readonly license?: Maybe<PublicationMetadataLicenseType>;
};

export type PublicationMetadataMediaVideo = {
  readonly __typename: 'PublicationMetadataMediaVideo';
  /** Alternative text for the video */
  readonly altTag?: Maybe<Scalars['EncryptableString']>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  readonly cover?: Maybe<EncryptableImageSet>;
  readonly duration?: Maybe<Scalars['Int']>;
  readonly license?: Maybe<PublicationMetadataLicenseType>;
  readonly video: EncryptableVideoSet;
};

export type PublicationMetadataTagsFilter = {
  readonly all?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly oneOf?: InputMaybe<ReadonlyArray<Scalars['String']>>;
};

export enum PublicationMetadataTransactionType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Other = 'OTHER',
}

export type PublicationNotInterestedRequest = {
  readonly on: Scalars['PublicationId'];
};

export type PublicationOperations = {
  readonly __typename: 'PublicationOperations';
  readonly actedOn: ReadonlyArray<OpenActionResult>;
  readonly canAct: TriStateValue;
  readonly canComment: TriStateValue;
  readonly canDecrypt: CanDecryptResponse;
  readonly canMirror: TriStateValue;
  readonly canQuote: TriStateValue;
  readonly hasActed: OptimisticStatusResult;
  readonly hasBookmarked: Scalars['Boolean'];
  readonly hasMirrored: Scalars['Boolean'];
  readonly hasQuoted: Scalars['Boolean'];
  readonly hasReacted: Scalars['Boolean'];
  readonly hasReported: Scalars['Boolean'];
  readonly id: Scalars['PublicationId'];
  readonly isNotInterested: Scalars['Boolean'];
};

export type PublicationOperationsActedOnArgs = {
  request?: InputMaybe<PublicationOperationsActedArgs>;
};

export type PublicationOperationsCanActArgs = {
  request?: InputMaybe<PublicationOperationsActedArgs>;
};

export type PublicationOperationsHasActedArgs = {
  request?: InputMaybe<PublicationOperationsActedArgs>;
};

export type PublicationOperationsHasReactedArgs = {
  request?: InputMaybe<PublicationOperationsReactionArgs>;
};

export type PublicationOperationsActedArgs = {
  readonly filter?: InputMaybe<OpenActionFilter>;
};

export type PublicationOperationsReactionArgs = {
  readonly type?: InputMaybe<PublicationReactionType>;
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
  readonly forId?: InputMaybe<Scalars['PublicationId']>;
  readonly forTxHash?: InputMaybe<Scalars['TxHash']>;
};

export type PublicationRevenue = {
  readonly __typename: 'PublicationRevenue';
  readonly publication: AnyPublication;
  readonly revenue: ReadonlyArray<RevenueAggregate>;
};

export type PublicationSearchRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly query: Scalars['String'];
  readonly where?: InputMaybe<PublicationSearchWhere>;
};

export type PublicationSearchWhere = {
  readonly customFilters?: InputMaybe<ReadonlyArray<CustomFiltersType>>;
  readonly metadata?: InputMaybe<PublicationMetadataFilters>;
  readonly publicationTypes?: InputMaybe<ReadonlyArray<SearchPublicationType>>;
};

export type PublicationStats = {
  readonly __typename: 'PublicationStats';
  readonly bookmarks: Scalars['Int'];
  readonly comments: Scalars['Int'];
  readonly countOpenActions: Scalars['Int'];
  readonly id: Scalars['PublicationId'];
  readonly mirrors: Scalars['Int'];
  readonly quotes: Scalars['Int'];
  readonly reactions: Scalars['Int'];
};

export type PublicationStatsCountOpenActionsArgs = {
  request?: InputMaybe<PublicationStatsCountOpenActionArgs>;
};

export type PublicationStatsReactionsArgs = {
  request?: InputMaybe<PublicationStatsReactionArgs>;
};

export type PublicationStatsCountOpenActionArgs = {
  readonly anyOf?: InputMaybe<ReadonlyArray<OpenActionFilter>>;
};

export type PublicationStatsInput = {
  readonly customFilters?: InputMaybe<ReadonlyArray<CustomFiltersType>>;
  /** Filter the returned stats on apps and 1 of the following filters: tags, contentWarning, mainContentFocus, locale */
  readonly metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type PublicationStatsReactionArgs = {
  readonly type: PublicationReactionType;
};

export enum PublicationType {
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
}

export type PublicationValidateMetadataResult = {
  readonly __typename: 'PublicationValidateMetadataResult';
  readonly reason?: Maybe<Scalars['String']>;
  readonly valid: Scalars['Boolean'];
};

export type PublicationsRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly where: PublicationsWhere;
};

export type PublicationsTagsRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly orderBy?: InputMaybe<TagSortCriteriaType>;
  readonly where?: InputMaybe<PublicationsTagsWhere>;
};

export type PublicationsTagsWhere = {
  readonly publishedOn?: InputMaybe<ReadonlyArray<Scalars['AppId']>>;
};

export type PublicationsWhere = {
  readonly actedBy?: InputMaybe<Scalars['ProfileId']>;
  readonly commentOn?: InputMaybe<PublicationCommentOn>;
  readonly customFilters?: InputMaybe<ReadonlyArray<CustomFiltersType>>;
  readonly from?: InputMaybe<ReadonlyArray<Scalars['ProfileId']>>;
  readonly metadata?: InputMaybe<PublicationMetadataFilters>;
  readonly mirrorOn?: InputMaybe<Scalars['PublicationId']>;
  readonly publicationIds?: InputMaybe<ReadonlyArray<Scalars['PublicationId']>>;
  readonly publicationTypes?: InputMaybe<ReadonlyArray<PublicationType>>;
  readonly quoteOn?: InputMaybe<Scalars['PublicationId']>;
  readonly withOpenActions?: InputMaybe<ReadonlyArray<OpenActionFilter>>;
};

export type Query = {
  readonly __typename: 'Query';
  readonly approvedAuthentications: PaginatedApprovedAuthenticationResult;
  readonly approvedModuleAllowanceAmount: ReadonlyArray<ApprovedAllowanceAmountResult>;
  readonly canClaim: ReadonlyArray<CanClaimResult>;
  readonly challenge: AuthChallengeResult;
  readonly claimableProfiles: ClaimableProfilesResult;
  readonly claimableStatus: ClaimProfileStatusType;
  /** Get all enabled currencies */
  readonly currencies: PaginatedCurrenciesResult;
  readonly currentSession: ApprovedAuthentication;
  /** Get the default profile for a given EvmAddress. If no default is explicitly set, you will get the oldest profile owned by the address. */
  readonly defaultProfile?: Maybe<Profile>;
  readonly exploreProfiles: PaginatedProfileResult;
  readonly explorePublications: PaginatedExplorePublicationResult;
  readonly feed: PaginatedFeedResult;
  readonly feedHighlights: PaginatedFeedHighlightsResult;
  readonly followRevenues: FollowRevenueResult;
  readonly followStatusBulk: ReadonlyArray<FollowStatusBulkResult>;
  readonly followers: PaginatedProfileResult;
  readonly following: PaginatedProfileResult;
  readonly generateModuleCurrencyApprovalData: GenerateModuleCurrencyApprovalResult;
  readonly internalAllowedDomains: ReadonlyArray<Scalars['URI']>;
  readonly internalClaimStatus?: Maybe<Scalars['Void']>;
  readonly internalCuratedHandles: ReadonlyArray<Scalars['String']>;
  readonly internalCuratedTags: ReadonlyArray<Scalars['String']>;
  readonly internalInvites: Scalars['Int'];
  readonly internalProfileStatus: PrfResult;
  readonly invitedProfiles: ReadonlyArray<InvitedResult>;
  readonly lastLoggedInProfile?: Maybe<Profile>;
  readonly lensAPIOwnedEOAs: ReadonlyArray<Scalars['EvmAddress']>;
  readonly lensProtocolVersion: LensProtocolVersion;
  readonly lensTransactionStatus?: Maybe<LensTransactionResult>;
  readonly momokaSubmitters: MomokaSubmittersResult;
  readonly momokaSummary: MomokaSummaryResult;
  readonly momokaTransaction?: Maybe<MomokaTransaction>;
  readonly momokaTransactions: MomokaTransactionsResult;
  /** Returns a paged list of profiles that are followed by both the observer and the viewing profile */
  readonly mutualFollowers: PaginatedProfileResult;
  /** Get the NFT collections that the given two profiles own at least one NFT of. */
  readonly mutualNftCollections: PaginatedNftCollectionsResult;
  readonly mutualPoaps: PaginatedPoapEventResult;
  /** Get the Lens Profiles that own NFTs from a given collection. */
  readonly nftCollectionOwners: PaginatedProfileResult;
  /** Get the NFT collections that the given wallet or profileId owns at least one NFT of. Only supports Ethereum and Polygon NFTs. Note excludeFollowers is set to true by default, so the result will not include Lens Follower NFTsunless explicitly requested. */
  readonly nftCollections: PaginatedNftCollectionsResult;
  readonly nftGalleries: PaginatedNftGalleriesResult;
  readonly nfts: PaginatedNftsResult;
  readonly notifications: PaginatedNotificationResult;
  readonly ownedHandles: PaginatedHandlesResult;
  readonly ping: Scalars['String'];
  readonly poapEvent?: Maybe<PoapEvent>;
  readonly poapHolders: PaginatedProfileResult;
  readonly poaps: PaginatedPoapTokenResult;
  /** Get the most popular NFT collections. Popularity is based on how many Lens Profiles own NFTs from a given collection. */
  readonly popularNftCollections: PaginatedPopularNftCollectionsResult;
  readonly profile?: Maybe<Profile>;
  readonly profileActionHistory: PaginatedProfileActionHistoryResult;
  readonly profileAlreadyInvited: Scalars['Boolean'];
  readonly profileInterestsOptions: ReadonlyArray<Scalars['String']>;
  readonly profileManagers: PaginatedProfileManagersResult;
  readonly profileRecommendations: PaginatedProfileResult;
  readonly profiles: PaginatedProfileResult;
  readonly profilesManaged: PaginatedProfileResult;
  readonly publication?: Maybe<AnyPublication>;
  readonly publicationBookmarks: PaginatedPublicationsResult;
  readonly publications: PaginatedPublicationsResult;
  readonly publicationsTags: PaginatedPublicationsTagsResult;
  readonly relayQueues: ReadonlyArray<RelayQueueResult>;
  readonly revenueFromPublication?: Maybe<PublicationRevenue>;
  readonly revenueFromPublications: PaginatedRevenueFromPublicationsResult;
  readonly searchProfiles: PaginatedProfileResult;
  readonly searchPublications: PaginatedPublicationPrimaryResult;
  readonly supportedFollowModules: PaginatedSupportedModules;
  readonly supportedOpenActionCollectModules: PaginatedSupportedModules;
  readonly supportedOpenActionModules: PaginatedSupportedModules;
  readonly supportedReferenceModules: PaginatedSupportedModules;
  readonly txIdToTxHash?: Maybe<Scalars['TxHash']>;
  readonly userSigNonces: UserSigNonces;
  readonly validatePublicationMetadata: PublicationValidateMetadataResult;
  readonly verify: Scalars['Boolean'];
  readonly whoActedOnPublication: PaginatedProfileResult;
  /** The list of profiles that the logged in profile has blocked */
  readonly whoHaveBlocked: PaginatedProfileResult;
  readonly whoReactedPublication: PaginatedWhoReactedResult;
};

export type QueryApprovedAuthenticationsArgs = {
  request: ApprovedAuthenticationRequest;
};

export type QueryApprovedModuleAllowanceAmountArgs = {
  request: ApprovedModuleAllowanceAmountRequest;
};

export type QueryCanClaimArgs = {
  request: CanClaimRequest;
};

export type QueryChallengeArgs = {
  request: ChallengeRequest;
};

export type QueryCurrenciesArgs = {
  request: PaginatedOffsetRequest;
};

export type QueryDefaultProfileArgs = {
  request: DefaultProfileRequest;
};

export type QueryExploreProfilesArgs = {
  request: ExploreProfilesRequest;
};

export type QueryExplorePublicationsArgs = {
  request: ExplorePublicationRequest;
};

export type QueryFeedArgs = {
  request: FeedRequest;
};

export type QueryFeedHighlightsArgs = {
  request: FeedHighlightsRequest;
};

export type QueryFollowRevenuesArgs = {
  request: FollowRevenueRequest;
};

export type QueryFollowStatusBulkArgs = {
  request: FollowStatusBulkRequest;
};

export type QueryFollowersArgs = {
  request: FollowersRequest;
};

export type QueryFollowingArgs = {
  request: FollowingRequest;
};

export type QueryGenerateModuleCurrencyApprovalDataArgs = {
  request: GenerateModuleCurrencyApprovalDataRequest;
};

export type QueryInternalAllowedDomainsArgs = {
  request: InternalAllowedDomainsRequest;
};

export type QueryInternalClaimStatusArgs = {
  request: InternalClaimStatusRequest;
};

export type QueryInternalCuratedHandlesArgs = {
  request: InternalCuratedHandlesRequest;
};

export type QueryInternalCuratedTagsArgs = {
  request: InternalCuratedTagsRequest;
};

export type QueryInternalInvitesArgs = {
  request: InternalInvitesRequest;
};

export type QueryInternalProfileStatusArgs = {
  request: InternalProfileStatusRequest;
};

export type QueryLastLoggedInProfileArgs = {
  request: LastLoggedInProfileRequest;
};

export type QueryLensTransactionStatusArgs = {
  request: LensTransactionStatusRequest;
};

export type QueryMomokaTransactionArgs = {
  request: MomokaTransactionRequest;
};

export type QueryMomokaTransactionsArgs = {
  request: MomokaTransactionsRequest;
};

export type QueryMutualFollowersArgs = {
  request: MutualFollowersRequest;
};

export type QueryMutualNftCollectionsArgs = {
  request: MutualNftCollectionsRequest;
};

export type QueryMutualPoapsArgs = {
  request: MutualPoapsQueryRequest;
};

export type QueryNftCollectionOwnersArgs = {
  request: NftCollectionOwnersRequest;
};

export type QueryNftCollectionsArgs = {
  request: NftCollectionsRequest;
};

export type QueryNftGalleriesArgs = {
  request: NftGalleriesRequest;
};

export type QueryNftsArgs = {
  request: NftsRequest;
};

export type QueryNotificationsArgs = {
  request?: InputMaybe<NotificationRequest>;
};

export type QueryOwnedHandlesArgs = {
  request: OwnedHandlesRequest;
};

export type QueryPoapEventArgs = {
  request: PoapEventQueryRequest;
};

export type QueryPoapHoldersArgs = {
  request: PoapHoldersQueryRequest;
};

export type QueryPoapsArgs = {
  request: UserPoapsQueryRequest;
};

export type QueryPopularNftCollectionsArgs = {
  request: PopularNftCollectionsRequest;
};

export type QueryProfileArgs = {
  request: ProfileRequest;
};

export type QueryProfileActionHistoryArgs = {
  request: ProfileActionHistoryRequest;
};

export type QueryProfileAlreadyInvitedArgs = {
  request: AlreadyInvitedCheckRequest;
};

export type QueryProfileManagersArgs = {
  request: ProfileManagersRequest;
};

export type QueryProfileRecommendationsArgs = {
  request: ProfileRecommendationsRequest;
};

export type QueryProfilesArgs = {
  request: ProfilesRequest;
};

export type QueryProfilesManagedArgs = {
  request: ProfilesManagedRequest;
};

export type QueryPublicationArgs = {
  request: PublicationRequest;
};

export type QueryPublicationBookmarksArgs = {
  request?: InputMaybe<PublicationBookmarksRequest>;
};

export type QueryPublicationsArgs = {
  request: PublicationsRequest;
};

export type QueryPublicationsTagsArgs = {
  request?: InputMaybe<PublicationsTagsRequest>;
};

export type QueryRevenueFromPublicationArgs = {
  request: RevenueFromPublicationRequest;
};

export type QueryRevenueFromPublicationsArgs = {
  request: RevenueFromPublicationsRequest;
};

export type QuerySearchProfilesArgs = {
  request: ProfileSearchRequest;
};

export type QuerySearchPublicationsArgs = {
  request: PublicationSearchRequest;
};

export type QuerySupportedFollowModulesArgs = {
  request: SupportedModulesRequest;
};

export type QuerySupportedOpenActionCollectModulesArgs = {
  request: SupportedModulesRequest;
};

export type QuerySupportedOpenActionModulesArgs = {
  request: SupportedModulesRequest;
};

export type QuerySupportedReferenceModulesArgs = {
  request: SupportedModulesRequest;
};

export type QueryTxIdToTxHashArgs = {
  for: Scalars['TxId'];
};

export type QueryValidatePublicationMetadataArgs = {
  request: ValidatePublicationMetadataRequest;
};

export type QueryVerifyArgs = {
  request: VerifyRequest;
};

export type QueryWhoActedOnPublicationArgs = {
  request: WhoActedOnPublicationRequest;
};

export type QueryWhoHaveBlockedArgs = {
  request: WhoHaveBlockedRequest;
};

export type QueryWhoReactedPublicationArgs = {
  request: WhoReactedPublicationRequest;
};

export type Quote = {
  readonly __typename: 'Quote';
  readonly by: Profile;
  readonly createdAt: Scalars['DateTime'];
  readonly hashtagsMentioned: ReadonlyArray<Scalars['String']>;
  readonly id: Scalars['PublicationId'];
  readonly isEncrypted: Scalars['Boolean'];
  readonly isHidden: Scalars['Boolean'];
  readonly metadata: PublicationMetadata;
  readonly momoka?: Maybe<MomokaInfo>;
  readonly openActionModules: ReadonlyArray<OpenActionModule>;
  readonly operations: PublicationOperations;
  readonly profilesMentioned: ReadonlyArray<ProfileMentioned>;
  readonly publishedOn?: Maybe<App>;
  readonly quoteOn: PrimaryPublication;
  readonly referenceModule?: Maybe<ReferenceModule>;
  readonly stats: PublicationStats;
  readonly txHash?: Maybe<Scalars['TxHash']>;
};

export type QuoteStatsArgs = {
  request?: InputMaybe<PublicationStatsInput>;
};

export type QuoteNotification = {
  readonly __typename: 'QuoteNotification';
  readonly id: Scalars['UUID'];
  readonly quote: Quote;
};

export type RateRequest = {
  readonly for: SupportedFiatType;
};

export type ReactedResult = {
  readonly __typename: 'ReactedResult';
  readonly reactedAt: Scalars['DateTime'];
  readonly reaction: PublicationReactionType;
};

export type ReactionEvent = {
  readonly __typename: 'ReactionEvent';
  readonly by: Profile;
  readonly createdAt: Scalars['DateTime'];
  readonly reaction: PublicationReactionType;
};

export type ReactionNotification = {
  readonly __typename: 'ReactionNotification';
  readonly id: Scalars['UUID'];
  readonly publication: PrimaryPublication;
  readonly reactions: ReadonlyArray<ProfileReactedResult>;
};

export type ReactionRequest = {
  readonly for: Scalars['PublicationId'];
  readonly reaction: PublicationReactionType;
};

export type RecipientDataInput = {
  /** Recipient of collect fees. */
  readonly recipient: Scalars['EvmAddress'];
  /** Split %, should be between 0.01 and 100. Up to 2 decimal points supported. All % should add up to 100 */
  readonly split: Scalars['Float'];
};

export type RecipientDataOutput = {
  readonly __typename: 'RecipientDataOutput';
  /** Recipient of collect fees. */
  readonly recipient: Scalars['EvmAddress'];
  /** Split %, should be between 0.01 and 100. Up to 2 decimal points supported. All % should add up to 100 */
  readonly split: Scalars['Float'];
};

export type ReferenceModule =
  | DegreesOfSeparationReferenceModuleSettings
  | FollowOnlyReferenceModuleSettings
  | LegacyDegreesOfSeparationReferenceModuleSettings
  | LegacyFollowOnlyReferenceModuleSettings
  | UnknownReferenceModuleSettings;

export type ReferenceModuleInput = {
  readonly degreesOfSeparationReferenceModule?: InputMaybe<DegreesOfSeparationReferenceModuleInput>;
  readonly followerOnlyReferenceModule?: InputMaybe<Scalars['Boolean']>;
  readonly unknownReferenceModule?: InputMaybe<UnknownReferenceModuleInput>;
};

export enum ReferenceModuleType {
  DegreesOfSeparationReferenceModule = 'DegreesOfSeparationReferenceModule',
  FollowerOnlyReferenceModule = 'FollowerOnlyReferenceModule',
  LegacyDegreesOfSeparationReferenceModule = 'LegacyDegreesOfSeparationReferenceModule',
  LegacyFollowerOnlyReferenceModule = 'LegacyFollowerOnlyReferenceModule',
  UnknownReferenceModule = 'UnknownReferenceModule',
}

export type RefreshPublicationMetadataRequest = {
  readonly for: Scalars['PublicationId'];
};

export type RefreshPublicationMetadataResult = {
  readonly __typename: 'RefreshPublicationMetadataResult';
  readonly result: RefreshPublicationMetadataResultType;
};

export enum RefreshPublicationMetadataResultType {
  AlreadyPending = 'ALREADY_PENDING',
  Queued = 'QUEUED',
  ValidPublicationNotFound = 'VALID_PUBLICATION_NOT_FOUND',
}

/** The refresh request */
export type RefreshRequest = {
  /** The refresh token */
  readonly refreshToken: Scalars['Jwt'];
};

export type RelayError = {
  readonly __typename: 'RelayError';
  readonly reason: RelayErrorReasonType;
};

export enum RelayErrorReasonType {
  AppNotAllowed = 'APP_NOT_ALLOWED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  NotSponsored = 'NOT_SPONSORED',
  RateLimited = 'RATE_LIMITED',
  WrongWalletSigned = 'WRONG_WALLET_SIGNED',
}

export type RelayMomokaResult = CreateMomokaPublicationResult | LensProfileManagerRelayError;

export type RelayQueueResult = {
  readonly __typename: 'RelayQueueResult';
  readonly key: RelayRoleKey;
  readonly queue: Scalars['Int'];
  readonly relay: NetworkAddress;
};

export type RelayResult = RelayError | RelaySuccess;

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

export type RelaySuccess = {
  readonly __typename: 'RelaySuccess';
  readonly txHash?: Maybe<Scalars['TxHash']>;
  readonly txId: Scalars['TxId'];
};

export type ReportPublicationRequest = {
  readonly additionalComments?: InputMaybe<Scalars['String']>;
  readonly for: Scalars['PublicationId'];
  readonly reason: ReportingReasonInput;
};

export type ReportingReasonInput = {
  readonly fraudReason?: InputMaybe<FraudReasonInput>;
  readonly illegalReason?: InputMaybe<IllegalReasonInput>;
  readonly sensitiveReason?: InputMaybe<SensitiveReasonInput>;
  readonly spamReason?: InputMaybe<SpamReasonInput>;
};

export type ReservedClaimable = {
  readonly __typename: 'ReservedClaimable';
  readonly expiry: Scalars['DateTime'];
  readonly id: Scalars['String'];
  readonly source: Scalars['AppId'];
  /** The full handle - namespace/localname */
  readonly withHandle: Scalars['Handle'];
};

export type RevenueAggregate = {
  readonly __typename: 'RevenueAggregate';
  readonly total: Amount;
};

export type RevenueFromPublicationRequest = {
  readonly for: Scalars['PublicationId'];
  /** Will return revenue for publications made on any of the provided app ids. Will include all apps if omitted */
  readonly publishedOn?: InputMaybe<ReadonlyArray<Scalars['AppId']>>;
};

export type RevenueFromPublicationsRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  /** The profile to get revenue for */
  readonly for: Scalars['ProfileId'];
  readonly limit?: InputMaybe<LimitType>;
  /** Will return revenue for publications made on any of the provided app ids. Will include all apps if omitted */
  readonly publishedOn?: InputMaybe<ReadonlyArray<Scalars['AppId']>>;
};

export type RevertFollowModuleSettings = {
  readonly __typename: 'RevertFollowModuleSettings';
  readonly contract: NetworkAddress;
  readonly type: FollowModuleType;
};

export type RevokeAuthenticationRequest = {
  /** The token authorization id wish to revoke */
  readonly authorizationId: Scalars['UUID'];
};

export type RootCondition = {
  readonly __typename: 'RootCondition';
  readonly criteria: ReadonlyArray<SecondTierCondition>;
};

export enum SearchPublicationType {
  Comment = 'COMMENT',
  Post = 'POST',
  Quote = 'QUOTE',
}

export type SecondTierCondition =
  | AdvancedContractCondition
  | AndCondition
  | CollectCondition
  | EoaOwnershipCondition
  | Erc20OwnershipCondition
  | FollowCondition
  | NftOwnershipCondition
  | OrCondition
  | ProfileOwnershipCondition;

export type SensitiveReasonInput = {
  readonly reason: PublicationReportingReason;
  readonly subreason: PublicationReportingSensitiveSubreason;
};

export type SetDefaultProfileRequest = {
  readonly profileId: Scalars['ProfileId'];
};

export type SetFollowModuleRequest = {
  readonly followModule: FollowModuleInput;
};

/** The signed auth challenge */
export type SignedAuthChallenge = {
  readonly id: Scalars['ChallengeId'];
  /** The signature */
  readonly signature: Scalars['Signature'];
};

export type SimpleCollectOpenActionModuleInput = {
  readonly amount?: InputMaybe<AmountInput>;
  readonly collectLimit?: InputMaybe<Scalars['String']>;
  readonly endsAt?: InputMaybe<Scalars['DateTime']>;
  readonly followerOnly: Scalars['Boolean'];
  readonly recipient?: InputMaybe<Scalars['EvmAddress']>;
  readonly referralFee?: InputMaybe<Scalars['Float']>;
};

export type SimpleCollectOpenActionSettings = {
  readonly __typename: 'SimpleCollectOpenActionSettings';
  /** The collect module amount info. `Amount.value = 0` in case of free collects. */
  readonly amount: Amount;
  /** The maximum number of collects for this publication. */
  readonly collectLimit?: Maybe<Scalars['String']>;
  /** The collect nft address - only deployed on first collect */
  readonly collectNft?: Maybe<Scalars['EvmAddress']>;
  readonly contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  readonly endsAt?: Maybe<Scalars['DateTime']>;
  /** True if only followers of publisher may collect the post. */
  readonly followerOnly: Scalars['Boolean'];
  /** The collect module recipient address */
  readonly recipient: Scalars['EvmAddress'];
  /** The collect module referral fee */
  readonly referralFee: Scalars['Float'];
  readonly type: OpenActionModuleType;
};

export type SpaceMetadataV3 = {
  readonly __typename: 'SpaceMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly link: Scalars['EncryptableURI'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly startsAt: Scalars['EncryptableDateTime'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly title: Scalars['String'];
};

export type SpamReasonInput = {
  readonly reason: PublicationReportingReason;
  readonly subreason: PublicationReportingSpamSubreason;
};

export type StoryMetadataV3 = {
  readonly __typename: 'StoryMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly asset: PublicationMetadataMedia;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type Subscription = {
  readonly __typename: 'Subscription';
  readonly authorizationRecordRevoked?: Maybe<Scalars['Void']>;
  readonly newMomokaTransaction: MomokaTransaction;
  readonly newNotification?: Maybe<Notification>;
  readonly newPublicationStats: PublicationStats;
  readonly userSigNonces: UserSigNonces;
};

export type SubscriptionAuthorizationRecordRevokedArgs = {
  authorizationId: Scalars['UUID'];
};

export type SubscriptionNewNotificationArgs = {
  for: Scalars['ProfileId'];
};

export type SubscriptionNewPublicationStatsArgs = {
  for: Scalars['PublicationId'];
};

export type SubscriptionUserSigNoncesArgs = {
  address: Scalars['EvmAddress'];
};

export type SuggestedFormattedHandle = {
  readonly __typename: 'SuggestedFormattedHandle';
  /** The full formatted handle - namespace/@localname */
  readonly full: Scalars['String'];
  /** The formatted handle - @localname */
  readonly localName: Scalars['String'];
};

export enum SupportedFiatType {
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD',
}

export type SupportedModule = KnownSupportedModule | UnknownSupportedModule;

export type SupportedModulesRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly includeUnknown?: InputMaybe<Scalars['Boolean']>;
  readonly limit?: InputMaybe<LimitType>;
};

export type SybilDotOrgIdentity = {
  readonly __typename: 'SybilDotOrgIdentity';
  readonly source?: Maybe<SybilDotOrgIdentitySource>;
  /** The sybil dot org status */
  readonly verified: Scalars['Boolean'];
};

export type SybilDotOrgIdentitySource = {
  readonly __typename: 'SybilDotOrgIdentitySource';
  readonly twitter: SybilDotOrgTwitterIdentity;
};

export type SybilDotOrgTwitterIdentity = {
  readonly __typename: 'SybilDotOrgTwitterIdentity';
  readonly handle?: Maybe<Scalars['String']>;
};

export type TagResult = {
  readonly __typename: 'TagResult';
  readonly tag: Scalars['String'];
  readonly total: Scalars['Int'];
};

export enum TagSortCriteriaType {
  Alphabetical = 'ALPHABETICAL',
  MostPopular = 'MOST_POPULAR',
}

export type TextOnlyMetadataV3 = {
  readonly __typename: 'TextOnlyMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type ThirdTierCondition =
  | AdvancedContractCondition
  | CollectCondition
  | EoaOwnershipCondition
  | Erc20OwnershipCondition
  | FollowCondition
  | NftOwnershipCondition
  | ProfileOwnershipCondition;

export type ThreeDMetadataV3 = {
  readonly __typename: 'ThreeDMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly assets: ReadonlyArray<ThreeDMetadataV3Asset>;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type ThreeDMetadataV3Asset = {
  readonly __typename: 'ThreeDMetadataV3Asset';
  readonly format: Scalars['String'];
  readonly license?: Maybe<PublicationMetadataLicenseType>;
  readonly playerURL: Scalars['EncryptableURI'];
  readonly uri: Scalars['EncryptableURI'];
  readonly zipPath?: Maybe<Scalars['String']>;
};

export type TransactionMetadataV3 = {
  readonly __typename: 'TransactionMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  readonly chainId: Scalars['ChainId'];
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly txHash: Scalars['EncryptableTxHash'];
  readonly type: PublicationMetadataTransactionType;
};

export enum TriStateValue {
  No = 'NO',
  Unknown = 'UNKNOWN',
  Yes = 'YES',
}

export type TypedDataOptions = {
  /** If you wish to override the nonce for the sig if you want to do some clever stuff in the client */
  readonly overrideSigNonce: Scalars['Nonce'];
};

export type UnblockRequest = {
  readonly profiles: ReadonlyArray<Scalars['ProfileId']>;
};

export type UnfollowRequest = {
  readonly unfollow: ReadonlyArray<Scalars['ProfileId']>;
};

export type UnknownFollowModuleInput = {
  readonly address: Scalars['EvmAddress'];
  readonly data: Scalars['BlockchainData'];
};

export type UnknownFollowModuleRedeemInput = {
  readonly address: Scalars['EvmAddress'];
  readonly data: Scalars['BlockchainData'];
};

export type UnknownFollowModuleSettings = {
  readonly __typename: 'UnknownFollowModuleSettings';
  readonly contract: NetworkAddress;
  /** The data used to setup the module which you can decode with your known ABI  */
  readonly followModuleReturnData?: Maybe<Scalars['BlockchainData']>;
  readonly type: FollowModuleType;
};

export type UnknownOpenActionActRedeemInput = {
  readonly address: Scalars['EvmAddress'];
  readonly data: Scalars['BlockchainData'];
};

export type UnknownOpenActionModuleInput = {
  readonly address: Scalars['EvmAddress'];
  readonly data: Scalars['BlockchainData'];
};

export type UnknownOpenActionModuleSettings = {
  readonly __typename: 'UnknownOpenActionModuleSettings';
  /** The collect nft address - only deployed on first collect and if its a collectable open action */
  readonly collectNft?: Maybe<Scalars['EvmAddress']>;
  readonly contract: NetworkAddress;
  /** The data used to setup the module which you can decode with your known ABI  */
  readonly openActionModuleReturnData?: Maybe<Scalars['BlockchainData']>;
  readonly type: OpenActionModuleType;
};

export type UnknownOpenActionResult = {
  readonly __typename: 'UnknownOpenActionResult';
  readonly address: Scalars['EvmAddress'];
  readonly category?: Maybe<OpenActionCategoryType>;
  readonly initReturnData?: Maybe<Scalars['BlockchainData']>;
};

export type UnknownReferenceModuleInput = {
  readonly address: Scalars['EvmAddress'];
  readonly data: Scalars['BlockchainData'];
};

export type UnknownReferenceModuleSettings = {
  readonly __typename: 'UnknownReferenceModuleSettings';
  readonly contract: NetworkAddress;
  /** The data used to setup the module which you can decode with your known ABI  */
  readonly referenceModuleReturnData?: Maybe<Scalars['BlockchainData']>;
  readonly type: ReferenceModuleType;
};

export type UnknownSupportedModule = {
  readonly __typename: 'UnknownSupportedModule';
  readonly contract: NetworkAddress;
  readonly moduleName: Scalars['String'];
};

export type UnlinkHandleFromProfileRequest = {
  /** The full handle - namespace/localname */
  readonly handle: Scalars['Handle'];
};

export type UserPoapsQueryRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly for: Scalars['ProfileId'];
  readonly limit?: InputMaybe<LimitType>;
};

export type UserSigNonces = {
  readonly __typename: 'UserSigNonces';
  readonly lensHubOnchainSigNonce: Scalars['Nonce'];
  readonly lensPublicActProxyOnchainSigNonce: Scalars['Nonce'];
  readonly lensTokenHandleRegistryOnchainSigNonce: Scalars['Nonce'];
};

export type ValidatePublicationMetadataRequest = {
  readonly json?: InputMaybe<Scalars['String']>;
  readonly rawURI?: InputMaybe<Scalars['URI']>;
};

export type VerifyRequest = {
  /** The access token to verify */
  readonly accessToken: Scalars['Jwt'];
};

export type Video = {
  readonly __typename: 'Video';
  readonly mimeType?: Maybe<Scalars['MimeType']>;
  readonly uri: Scalars['URI'];
};

export type VideoMetadataV3 = {
  readonly __typename: 'VideoMetadataV3';
  readonly appId?: Maybe<Scalars['AppId']>;
  readonly asset: PublicationMetadataMediaVideo;
  readonly attachments?: Maybe<ReadonlyArray<PublicationMetadataMedia>>;
  readonly attributes?: Maybe<ReadonlyArray<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  readonly content: Scalars['EncryptableMarkdown'];
  readonly contentWarning?: Maybe<PublicationContentWarningType>;
  readonly encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  readonly hideFromFeed: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly isShortVideo: Scalars['Boolean'];
  readonly locale: Scalars['Locale'];
  readonly marketplace?: Maybe<MarketplaceMetadata>;
  readonly rawURI: Scalars['URI'];
  readonly tags?: Maybe<ReadonlyArray<Scalars['String']>>;
  /** The title of the video. Empty if not set. */
  readonly title: Scalars['String'];
};

export type WalletAuthenticationToProfileAuthenticationRequest = {
  /** This can convert a wallet token to a profile token if you now onboarded */
  readonly profileId: Scalars['ProfileId'];
};

export type WhoActedOnPublicationRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
  readonly on: Scalars['PublicationId'];
  readonly where?: InputMaybe<WhoActedOnPublicationWhere>;
};

export type WhoActedOnPublicationWhere = {
  readonly anyOf: ReadonlyArray<OpenActionFilter>;
};

export type WhoHaveBlockedRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly limit?: InputMaybe<LimitType>;
};

export type WhoReactedPublicationRequest = {
  readonly cursor?: InputMaybe<Scalars['Cursor']>;
  readonly for: Scalars['PublicationId'];
  readonly limit?: InputMaybe<LimitType>;
  readonly where?: InputMaybe<WhoReactedPublicationWhere>;
};

export type WhoReactedPublicationWhere = {
  readonly anyOf?: InputMaybe<ReadonlyArray<PublicationReactionType>>;
};

export type WorldcoinIdentity = {
  readonly __typename: 'WorldcoinIdentity';
  /** If the profile has verified as a user */
  readonly isHuman: Scalars['Boolean'];
};

export enum WorldcoinPhoneVerifyType {
  Orb = 'ORB',
  Phone = 'PHONE',
}

export type WorldcoinPhoneVerifyWebhookRequest = {
  readonly nullifierHash: Scalars['String'];
  readonly signal: Scalars['EvmAddress'];
  readonly signalType: WorldcoinPhoneVerifyType;
};
