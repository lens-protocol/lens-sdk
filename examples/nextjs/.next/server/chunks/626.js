"use strict";
exports.id = 626;
exports.ids = [626];
exports.modules = {

/***/ 8533:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bz": () => (/* binding */ HasTxHashBeenIndexedDocument),
/* harmony export */   "D9": () => (/* binding */ GetProfileDocument),
/* harmony export */   "Jk": () => (/* binding */ ProxyActionStatusTypes),
/* harmony export */   "L9": () => (/* binding */ GetAllProfilesByOwnerAddressDocument),
/* harmony export */   "LI": () => (/* binding */ BroadcastProtocolCallDocument),
/* harmony export */   "ON": () => (/* binding */ AuthChallengeDocument),
/* harmony export */   "UC": () => (/* binding */ AuthAuthenticateDocument),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "oK": () => (/* binding */ TransactionErrorReasons),
/* harmony export */   "zl": () => (/* binding */ ProxyActionStatusDocument),
/* harmony export */   "zv": () => (/* binding */ AuthRefreshDocument)
/* harmony export */ });
/* unused harmony exports ClaimStatus, CollectModules, ContractType, CustomFiltersTypes, DecryptFailReason, EncryptionProvider, FeedEventItemType, FollowModules, IdKitPhoneVerifyWebhookResultStatusType, NotificationTypes, ProfileSortCriteria, PublicationContentWarning, PublicationMainFocus, PublicationMediaSource, PublicationMetadataDisplayTypes, PublicationMetadataStatusType, PublicationReportingFraudSubreason, PublicationReportingIllegalSubreason, PublicationReportingReason, PublicationReportingSensitiveSubreason, PublicationReportingSpamSubreason, PublicationSortCriteria, PublicationTypes, ReactionTypes, ReferenceModules, RelayErrorReasons, ScalarOperator, SearchRequestTypes, TagSortCriteria, TimelineType, WorldcoinPhoneVerifyType, PublicationStatsFragmentDoc, MediaFieldsFragmentDoc, MediaSetFragmentDoc, MetadataAttributeOutputFragmentDoc, MetadataFragmentDoc, AttributeFragmentDoc, ProfileMediaFieldsFragmentDoc, Erc20FragmentDoc, ModuleFeeAmountFragmentDoc, FeeFollowModuleSettingsFragmentDoc, ProfileFollowModuleSettingsFragmentDoc, RevertFollowModuleSettingsFragmentDoc, ProfileFieldsFragmentDoc, WalletFragmentDoc, FreeCollectModuleSettingsFragmentDoc, FeeCollectModuleSettingsFragmentDoc, LimitedFeeCollectModuleSettingsFragmentDoc, LimitedTimedFeeCollectModuleSettingsFragmentDoc, RevertCollectModuleSettingsFragmentDoc, TimedFeeCollectModuleSettingsFragmentDoc, CollectModuleFragmentDoc, ReferenceModuleFragmentDoc, CommentBaseFragmentDoc, PostFragmentDoc, MirrorBaseFragmentDoc, CommentFragmentDoc, CommentWithFirstCommentFragmentDoc, CommonPaginatedResultInfoFragmentDoc, Eip712TypedDataDomainFragmentDoc, FeedItemFragmentDoc, NewFollowerNotificationFieldsFragmentDoc, MirrorFragmentDoc, NewCollectNotificationFieldsFragmentDoc, NewMirrorNotificationFieldsFragmentDoc, CommentWithCommentedPublicationFieldsFragmentDoc, NewCommentNotificationFieldsFragmentDoc, NewMentionNotificationFieldsFragmentDoc, NewReactionNotificationFieldsFragmentDoc, FollowerFragmentDoc, FollowingFragmentDoc, ProxyActionStatusResultFragmentDoc, ProxyActionErrorFragmentDoc, ProxyActionQueuedFragmentDoc, RelayerResultFragmentDoc, RelayErrorFragmentDoc, TransactionIndexedResultFragmentDoc, TransactionErrorFragmentDoc, useAuthChallengeQuery, useAuthChallengeLazyQuery, useAuthAuthenticateMutation, useAuthRefreshMutation, CommentsDocument, useCommentsQuery, useCommentsLazyQuery, EnabledModuleCurrenciesDocument, useEnabledModuleCurrenciesQuery, useEnabledModuleCurrenciesLazyQuery, FeedDocument, useFeedQuery, useFeedLazyQuery, ExploreProfilesDocument, useExploreProfilesQuery, useExploreProfilesLazyQuery, NotificationsDocument, useNotificationsQuery, useNotificationsLazyQuery, UnreadNotificationCountDocument, useUnreadNotificationCountQuery, useUnreadNotificationCountLazyQuery, CreatePostTypedDataDocument, useCreatePostTypedDataMutation, CreatePostViaDispatcherDocument, useCreatePostViaDispatcherMutation, ProfilesToFollowDocument, useProfilesToFollowQuery, useProfilesToFollowLazyQuery, useGetProfileQuery, useGetProfileLazyQuery, useGetAllProfilesByOwnerAddressQuery, useGetAllProfilesByOwnerAddressLazyQuery, CreateProfileDocument, useCreateProfileMutation, MutualFollowersProfilesDocument, useMutualFollowersProfilesQuery, useMutualFollowersProfilesLazyQuery, ProfileFollowersDocument, useProfileFollowersQuery, useProfileFollowersLazyQuery, ProfileFollowingDocument, useProfileFollowingQuery, useProfileFollowingLazyQuery, useProxyActionStatusQuery, useProxyActionStatusLazyQuery, ProxyActionDocument, useProxyActionMutation, PublicationDocument, usePublicationQuery, usePublicationLazyQuery, PublicationsDocument, usePublicationsQuery, usePublicationsLazyQuery, useHasTxHashBeenIndexedQuery, useHasTxHashBeenIndexedLazyQuery, useBroadcastProtocolCallMutation, WalletCollectedPublicationsDocument, useWalletCollectedPublicationsQuery, useWalletCollectedPublicationsLazyQuery */
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7072);


const defaultOptions = {};
/** The claim status */
var ClaimStatus;
(function (ClaimStatus) {
    ClaimStatus["AlreadyClaimed"] = "ALREADY_CLAIMED";
    ClaimStatus["ClaimFailed"] = "CLAIM_FAILED";
    ClaimStatus["NotClaimed"] = "NOT_CLAIMED";
})(ClaimStatus || (ClaimStatus = {}));
/** The collect module types */
var CollectModules;
(function (CollectModules) {
    CollectModules["LimitedFeeCollectModule"] = "LimitedFeeCollectModule";
    CollectModules["FeeCollectModule"] = "FeeCollectModule";
    CollectModules["LimitedTimedFeeCollectModule"] = "LimitedTimedFeeCollectModule";
    CollectModules["TimedFeeCollectModule"] = "TimedFeeCollectModule";
    CollectModules["AaveFeeCollectModule"] = "AaveFeeCollectModule";
    CollectModules["RevertCollectModule"] = "RevertCollectModule";
    CollectModules["FreeCollectModule"] = "FreeCollectModule";
    CollectModules["MultirecipientFeeCollectModule"] = "MultirecipientFeeCollectModule";
    CollectModules["Erc4626FeeCollectModule"] = "ERC4626FeeCollectModule";
    CollectModules["UnknownCollectModule"] = "UnknownCollectModule";
})(CollectModules || (CollectModules = {}));
/** The gated publication access criteria contract types */
var ContractType;
(function (ContractType) {
    ContractType["Erc721"] = "ERC721";
    ContractType["Erc1155"] = "ERC1155";
    ContractType["Erc20"] = "ERC20";
})(ContractType || (ContractType = {}));
/** The custom filters types */
var CustomFiltersTypes;
(function (CustomFiltersTypes) {
    CustomFiltersTypes["Gardeners"] = "GARDENERS";
})(CustomFiltersTypes || (CustomFiltersTypes = {}));
/** The reason why a profile cannot decrypt a publication */
var DecryptFailReason;
(function (DecryptFailReason) {
    DecryptFailReason["UnauthorizedAddress"] = "UNAUTHORIZED_ADDRESS";
    DecryptFailReason["DoesNotOwnNft"] = "DOES_NOT_OWN_NFT";
    DecryptFailReason["DoesNotOwnProfile"] = "DOES_NOT_OWN_PROFILE";
    DecryptFailReason["DoesNotFollowProfile"] = "DOES_NOT_FOLLOW_PROFILE";
    DecryptFailReason["HasNotCollectedPublication"] = "HAS_NOT_COLLECTED_PUBLICATION";
    DecryptFailReason["UnauthorizedBalance"] = "UNAUTHORIZED_BALANCE";
    DecryptFailReason["ProfileDoesNotExist"] = "PROFILE_DOES_NOT_EXIST";
    DecryptFailReason["MissingEncryptionParams"] = "MISSING_ENCRYPTION_PARAMS";
    DecryptFailReason["FollowNotFinalisedOnChain"] = "FOLLOW_NOT_FINALISED_ON_CHAIN";
    DecryptFailReason["CollectNotFinalisedOnChain"] = "COLLECT_NOT_FINALISED_ON_CHAIN";
    DecryptFailReason["CanNotDecrypt"] = "CAN_NOT_DECRYPT";
})(DecryptFailReason || (DecryptFailReason = {}));
/** The gated publication encryption provider */
var EncryptionProvider;
(function (EncryptionProvider) {
    EncryptionProvider["LitProtocol"] = "LIT_PROTOCOL";
})(EncryptionProvider || (EncryptionProvider = {}));
/** The feed event item filter types */
var FeedEventItemType;
(function (FeedEventItemType) {
    FeedEventItemType["Post"] = "POST";
    FeedEventItemType["Comment"] = "COMMENT";
    FeedEventItemType["Mirror"] = "MIRROR";
    FeedEventItemType["CollectPost"] = "COLLECT_POST";
    FeedEventItemType["CollectComment"] = "COLLECT_COMMENT";
    FeedEventItemType["ReactionPost"] = "REACTION_POST";
    FeedEventItemType["ReactionComment"] = "REACTION_COMMENT";
})(FeedEventItemType || (FeedEventItemType = {}));
/** The follow module types */
var FollowModules;
(function (FollowModules) {
    FollowModules["FeeFollowModule"] = "FeeFollowModule";
    FollowModules["RevertFollowModule"] = "RevertFollowModule";
    FollowModules["ProfileFollowModule"] = "ProfileFollowModule";
    FollowModules["UnknownFollowModule"] = "UnknownFollowModule";
})(FollowModules || (FollowModules = {}));
/** The verify webhook result status type */
var IdKitPhoneVerifyWebhookResultStatusType;
(function (IdKitPhoneVerifyWebhookResultStatusType) {
    IdKitPhoneVerifyWebhookResultStatusType["Success"] = "SUCCESS";
    IdKitPhoneVerifyWebhookResultStatusType["AlreadyVerified"] = "ALREADY_VERIFIED";
})(IdKitPhoneVerifyWebhookResultStatusType || (IdKitPhoneVerifyWebhookResultStatusType = {}));
/** The notification filter types */
var NotificationTypes;
(function (NotificationTypes) {
    NotificationTypes["MirroredPost"] = "MIRRORED_POST";
    NotificationTypes["MirroredComment"] = "MIRRORED_COMMENT";
    NotificationTypes["MentionPost"] = "MENTION_POST";
    NotificationTypes["MentionComment"] = "MENTION_COMMENT";
    NotificationTypes["CommentedComment"] = "COMMENTED_COMMENT";
    NotificationTypes["CommentedPost"] = "COMMENTED_POST";
    NotificationTypes["CollectedPost"] = "COLLECTED_POST";
    NotificationTypes["CollectedComment"] = "COLLECTED_COMMENT";
    NotificationTypes["Followed"] = "FOLLOWED";
    NotificationTypes["ReactionPost"] = "REACTION_POST";
    NotificationTypes["ReactionComment"] = "REACTION_COMMENT";
})(NotificationTypes || (NotificationTypes = {}));
/** profile sort criteria */
var ProfileSortCriteria;
(function (ProfileSortCriteria) {
    ProfileSortCriteria["CreatedOn"] = "CREATED_ON";
    ProfileSortCriteria["MostFollowers"] = "MOST_FOLLOWERS";
    ProfileSortCriteria["LatestCreated"] = "LATEST_CREATED";
    ProfileSortCriteria["MostPosts"] = "MOST_POSTS";
    ProfileSortCriteria["MostComments"] = "MOST_COMMENTS";
    ProfileSortCriteria["MostMirrors"] = "MOST_MIRRORS";
    ProfileSortCriteria["MostPublication"] = "MOST_PUBLICATION";
    ProfileSortCriteria["MostCollects"] = "MOST_COLLECTS";
})(ProfileSortCriteria || (ProfileSortCriteria = {}));
/** The proxy action status */
var ProxyActionStatusTypes;
(function (ProxyActionStatusTypes) {
    ProxyActionStatusTypes["Minting"] = "MINTING";
    ProxyActionStatusTypes["Transferring"] = "TRANSFERRING";
    ProxyActionStatusTypes["Complete"] = "COMPLETE";
})(ProxyActionStatusTypes || (ProxyActionStatusTypes = {}));
/** The publication content warning */
var PublicationContentWarning;
(function (PublicationContentWarning) {
    PublicationContentWarning["Nsfw"] = "NSFW";
    PublicationContentWarning["Sensitive"] = "SENSITIVE";
    PublicationContentWarning["Spoiler"] = "SPOILER";
})(PublicationContentWarning || (PublicationContentWarning = {}));
/** The publication main focus */
var PublicationMainFocus;
(function (PublicationMainFocus) {
    PublicationMainFocus["Video"] = "VIDEO";
    PublicationMainFocus["Image"] = "IMAGE";
    PublicationMainFocus["Article"] = "ARTICLE";
    PublicationMainFocus["TextOnly"] = "TEXT_ONLY";
    PublicationMainFocus["Audio"] = "AUDIO";
    PublicationMainFocus["Link"] = "LINK";
    PublicationMainFocus["Embed"] = "EMBED";
})(PublicationMainFocus || (PublicationMainFocus = {}));
/** The source of the media */
var PublicationMediaSource;
(function (PublicationMediaSource) {
    PublicationMediaSource["Lens"] = "LENS";
})(PublicationMediaSource || (PublicationMediaSource = {}));
/** The publication metadata display types */
var PublicationMetadataDisplayTypes;
(function (PublicationMetadataDisplayTypes) {
    PublicationMetadataDisplayTypes["Number"] = "number";
    PublicationMetadataDisplayTypes["String"] = "string";
    PublicationMetadataDisplayTypes["Date"] = "date";
})(PublicationMetadataDisplayTypes || (PublicationMetadataDisplayTypes = {}));
/** publication metadata status type */
var PublicationMetadataStatusType;
(function (PublicationMetadataStatusType) {
    PublicationMetadataStatusType["NotFound"] = "NOT_FOUND";
    PublicationMetadataStatusType["Pending"] = "PENDING";
    PublicationMetadataStatusType["MetadataValidationFailed"] = "METADATA_VALIDATION_FAILED";
    PublicationMetadataStatusType["Success"] = "SUCCESS";
})(PublicationMetadataStatusType || (PublicationMetadataStatusType = {}));
/** Publication reporting fraud subreason */
var PublicationReportingFraudSubreason;
(function (PublicationReportingFraudSubreason) {
    PublicationReportingFraudSubreason["Scam"] = "SCAM";
    PublicationReportingFraudSubreason["Impersonation"] = "IMPERSONATION";
})(PublicationReportingFraudSubreason || (PublicationReportingFraudSubreason = {}));
/** Publication reporting illegal subreason */
var PublicationReportingIllegalSubreason;
(function (PublicationReportingIllegalSubreason) {
    PublicationReportingIllegalSubreason["AnimalAbuse"] = "ANIMAL_ABUSE";
    PublicationReportingIllegalSubreason["HumanAbuse"] = "HUMAN_ABUSE";
    PublicationReportingIllegalSubreason["Violence"] = "VIOLENCE";
    PublicationReportingIllegalSubreason["ThreatIndividual"] = "THREAT_INDIVIDUAL";
    PublicationReportingIllegalSubreason["DirectThreat"] = "DIRECT_THREAT";
})(PublicationReportingIllegalSubreason || (PublicationReportingIllegalSubreason = {}));
/** Publication reporting reason */
var PublicationReportingReason;
(function (PublicationReportingReason) {
    PublicationReportingReason["Sensitive"] = "SENSITIVE";
    PublicationReportingReason["Illegal"] = "ILLEGAL";
    PublicationReportingReason["Fraud"] = "FRAUD";
    PublicationReportingReason["Spam"] = "SPAM";
})(PublicationReportingReason || (PublicationReportingReason = {}));
/** Publication reporting sensitive subreason */
var PublicationReportingSensitiveSubreason;
(function (PublicationReportingSensitiveSubreason) {
    PublicationReportingSensitiveSubreason["Nsfw"] = "NSFW";
    PublicationReportingSensitiveSubreason["Offensive"] = "OFFENSIVE";
})(PublicationReportingSensitiveSubreason || (PublicationReportingSensitiveSubreason = {}));
/** Publication reporting spam subreason */
var PublicationReportingSpamSubreason;
(function (PublicationReportingSpamSubreason) {
    PublicationReportingSpamSubreason["Misleading"] = "MISLEADING";
    PublicationReportingSpamSubreason["MisuseHashtags"] = "MISUSE_HASHTAGS";
    PublicationReportingSpamSubreason["Unrelated"] = "UNRELATED";
    PublicationReportingSpamSubreason["Repetitive"] = "REPETITIVE";
    PublicationReportingSpamSubreason["FakeEngagement"] = "FAKE_ENGAGEMENT";
    PublicationReportingSpamSubreason["ManipulationAlgo"] = "MANIPULATION_ALGO";
    PublicationReportingSpamSubreason["SomethingElse"] = "SOMETHING_ELSE";
})(PublicationReportingSpamSubreason || (PublicationReportingSpamSubreason = {}));
/** Publication sort criteria */
var PublicationSortCriteria;
(function (PublicationSortCriteria) {
    PublicationSortCriteria["TopCommented"] = "TOP_COMMENTED";
    PublicationSortCriteria["TopCollected"] = "TOP_COLLECTED";
    PublicationSortCriteria["TopMirrored"] = "TOP_MIRRORED";
    PublicationSortCriteria["CuratedProfiles"] = "CURATED_PROFILES";
    PublicationSortCriteria["Latest"] = "LATEST";
})(PublicationSortCriteria || (PublicationSortCriteria = {}));
/** The publication types */
var PublicationTypes;
(function (PublicationTypes) {
    PublicationTypes["Post"] = "POST";
    PublicationTypes["Comment"] = "COMMENT";
    PublicationTypes["Mirror"] = "MIRROR";
})(PublicationTypes || (PublicationTypes = {}));
/** Reaction types */
var ReactionTypes;
(function (ReactionTypes) {
    ReactionTypes["Upvote"] = "UPVOTE";
    ReactionTypes["Downvote"] = "DOWNVOTE";
})(ReactionTypes || (ReactionTypes = {}));
/** The reference module types */
var ReferenceModules;
(function (ReferenceModules) {
    ReferenceModules["FollowerOnlyReferenceModule"] = "FollowerOnlyReferenceModule";
    ReferenceModules["DegreesOfSeparationReferenceModule"] = "DegreesOfSeparationReferenceModule";
    ReferenceModules["UnknownReferenceModule"] = "UnknownReferenceModule";
})(ReferenceModules || (ReferenceModules = {}));
/** Relay error reason */
var RelayErrorReasons;
(function (RelayErrorReasons) {
    RelayErrorReasons["Rejected"] = "REJECTED";
    RelayErrorReasons["HandleTaken"] = "HANDLE_TAKEN";
    RelayErrorReasons["Expired"] = "EXPIRED";
    RelayErrorReasons["WrongWalletSigned"] = "WRONG_WALLET_SIGNED";
    RelayErrorReasons["NotAllowed"] = "NOT_ALLOWED";
})(RelayErrorReasons || (RelayErrorReasons = {}));
/** The gated publication access criteria scalar operators */
var ScalarOperator;
(function (ScalarOperator) {
    ScalarOperator["Equal"] = "EQUAL";
    ScalarOperator["NotEqual"] = "NOT_EQUAL";
    ScalarOperator["GreaterThan"] = "GREATER_THAN";
    ScalarOperator["GreaterThanOrEqual"] = "GREATER_THAN_OR_EQUAL";
    ScalarOperator["LessThan"] = "LESS_THAN";
    ScalarOperator["LessThanOrEqual"] = "LESS_THAN_OR_EQUAL";
})(ScalarOperator || (ScalarOperator = {}));
/** Search request types */
var SearchRequestTypes;
(function (SearchRequestTypes) {
    SearchRequestTypes["Publication"] = "PUBLICATION";
    SearchRequestTypes["Profile"] = "PROFILE";
})(SearchRequestTypes || (SearchRequestTypes = {}));
/** The publications tags sort criteria */
var TagSortCriteria;
(function (TagSortCriteria) {
    TagSortCriteria["MostPopular"] = "MOST_POPULAR";
    TagSortCriteria["Alphabetical"] = "ALPHABETICAL";
})(TagSortCriteria || (TagSortCriteria = {}));
/** Timeline types */
var TimelineType;
(function (TimelineType) {
    TimelineType["Post"] = "POST";
    TimelineType["Comment"] = "COMMENT";
    TimelineType["Mirror"] = "MIRROR";
    TimelineType["CollectPost"] = "COLLECT_POST";
    TimelineType["CollectComment"] = "COLLECT_COMMENT";
})(TimelineType || (TimelineType = {}));
/** Transaction error reason */
var TransactionErrorReasons;
(function (TransactionErrorReasons) {
    TransactionErrorReasons["Reverted"] = "REVERTED";
})(TransactionErrorReasons || (TransactionErrorReasons = {}));
/** The worldcoin signal type */
var WorldcoinPhoneVerifyType;
(function (WorldcoinPhoneVerifyType) {
    WorldcoinPhoneVerifyType["Phone"] = "PHONE";
    WorldcoinPhoneVerifyType["Orb"] = "ORB";
})(WorldcoinPhoneVerifyType || (WorldcoinPhoneVerifyType = {}));
const PublicationStatsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment PublicationStats on PublicationStats {
    __typename
    totalAmountOfMirrors
    totalUpvotes
    totalAmountOfCollects
    totalAmountOfComments
  }
`;
const MediaFieldsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment MediaFields on Media {
    __typename
    url
    mimeType
  }
`;
const MediaSetFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment MediaSet on MediaSet {
    __typename
    original {
      ...MediaFields
    }
  }
  ${MediaFieldsFragmentDoc}
`;
const MetadataAttributeOutputFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment MetadataAttributeOutput on MetadataAttributeOutput {
    __typename
    traitType
    value
  }
`;
const MetadataFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment Metadata on MetadataOutput {
    __typename
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
const AttributeFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment Attribute on Attribute {
    __typename
    key
    value
  }
`;
const ProfileMediaFieldsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment ProfileMediaFields on ProfileMedia {
    ... on NftImage {
      __typename
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
const Erc20FragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment Erc20 on Erc20 {
    __typename
    name
    symbol
    decimals
    address
  }
`;
const ModuleFeeAmountFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment ModuleFeeAmount on ModuleFeeAmount {
    __typename
    asset {
      ...Erc20
    }
    value
  }
  ${Erc20FragmentDoc}
`;
const FeeFollowModuleSettingsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
const ProfileFollowModuleSettingsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment ProfileFollowModuleSettings on ProfileFollowModuleSettings {
    __typename
    contractAddress
  }
`;
const RevertFollowModuleSettingsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment RevertFollowModuleSettings on RevertFollowModuleSettings {
    __typename
    contractAddress
  }
`;
const ProfileFieldsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment ProfileFields on Profile {
    __typename
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
      __typename
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
const WalletFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment Wallet on Wallet {
    __typename
    address
    defaultProfile {
      ...ProfileFields
    }
  }
  ${ProfileFieldsFragmentDoc}
`;
const FreeCollectModuleSettingsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment FreeCollectModuleSettings on FreeCollectModuleSettings {
    __typename
    contractAddress
    followerOnly
  }
`;
const FeeCollectModuleSettingsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
  ${ModuleFeeAmountFragmentDoc}
`;
const LimitedFeeCollectModuleSettingsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
  ${ModuleFeeAmountFragmentDoc}
`;
const LimitedTimedFeeCollectModuleSettingsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
  ${ModuleFeeAmountFragmentDoc}
`;
const RevertCollectModuleSettingsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment RevertCollectModuleSettings on RevertCollectModuleSettings {
    __typename
    contractAddress
  }
`;
const TimedFeeCollectModuleSettingsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
  ${ModuleFeeAmountFragmentDoc}
`;
const CollectModuleFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
const ReferenceModuleFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment ReferenceModule on ReferenceModule {
    __typename
    ... on FollowOnlyReferenceModuleSettings {
      contractAddress
    }
  }
`;
const CommentBaseFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
const PostFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
const MirrorBaseFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
const CommentFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
const CommentWithFirstCommentFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment CommentWithFirstComment on Comment {
    __typename
    ...Comment
    firstComment {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`;
const CommonPaginatedResultInfoFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment CommonPaginatedResultInfo on PaginatedResultInfo {
    __typename
    prev
    next
    totalCount
  }
`;
const Eip712TypedDataDomainFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment EIP712TypedDataDomain on EIP712TypedDataDomain {
    __typename
    name
    chainId
    version
    verifyingContract
  }
`;
const FeedItemFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
`;
const NewFollowerNotificationFieldsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment NewFollowerNotificationFields on NewFollowerNotification {
    __typename
    notificationId
    createdAt
    isFollowedByMe
    wallet {
      ...Wallet
    }
  }
  ${WalletFragmentDoc}
`;
const MirrorFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
  ${MirrorBaseFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
`;
const NewCollectNotificationFieldsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment NewCollectNotificationFields on NewCollectNotification {
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
  ${WalletFragmentDoc}
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
`;
const NewMirrorNotificationFieldsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment NewMirrorNotificationFields on NewMirrorNotification {
    __typename
    notificationId
    createdAt
    profile {
      ...ProfileFields
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
  ${ProfileFieldsFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
`;
const CommentWithCommentedPublicationFieldsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment CommentWithCommentedPublicationFields on Comment {
    __typename
    ...Comment
    commentOn {
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
  ${CommentFragmentDoc}
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
`;
const NewCommentNotificationFieldsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment NewCommentNotificationFields on NewCommentNotification {
    __typename
    notificationId
    createdAt
    profile {
      ...ProfileFields
    }
    comment {
      ...CommentWithCommentedPublicationFields
    }
  }
  ${ProfileFieldsFragmentDoc}
  ${CommentWithCommentedPublicationFieldsFragmentDoc}
`;
const NewMentionNotificationFieldsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment NewMentionNotificationFields on NewMentionNotification {
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
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
`;
const NewReactionNotificationFieldsFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment NewReactionNotificationFields on NewReactionNotification {
    __typename
    notificationId
    createdAt
    profile {
      ...ProfileFields
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
  ${ProfileFieldsFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${MirrorFragmentDoc}
`;
const FollowerFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment Follower on Follower {
    __typename
    wallet {
      ...Wallet
    }
  }
  ${WalletFragmentDoc}
`;
const FollowingFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment Following on Following {
    __typename
    profile {
      ...ProfileFields
    }
  }
  ${ProfileFieldsFragmentDoc}
`;
const ProxyActionStatusResultFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment ProxyActionStatusResult on ProxyActionStatusResult {
    __typename
    txHash
    txId
    status
  }
`;
const ProxyActionErrorFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment ProxyActionError on ProxyActionError {
    __typename
    reason
    lastKnownTxId
  }
`;
const ProxyActionQueuedFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment ProxyActionQueued on ProxyActionQueued {
    __typename
    queuedAt
  }
`;
const RelayerResultFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment RelayerResult on RelayerResult {
    __typename
    txHash
    txId
  }
`;
const RelayErrorFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment RelayError on RelayError {
    __typename
    reason
  }
`;
const TransactionIndexedResultFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment TransactionIndexedResult on TransactionIndexedResult {
    __typename
    indexed
    txHash
  }
`;
const TransactionErrorFragmentDoc = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  fragment TransactionError on TransactionError {
    __typename
    reason
  }
`;
const AuthChallengeDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query AuthChallenge($address: EthereumAddress!) {
    result: challenge(request: { address: $address }) {
      text
    }
  }
`;
/**
 * __useAuthChallengeQuery__
 *
 * To run a query within a React component, call `useAuthChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthChallengeQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
function useAuthChallengeQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(AuthChallengeDocument, options);
}
function useAuthChallengeLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(AuthChallengeDocument, options);
}
const AuthAuthenticateDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  mutation AuthAuthenticate($address: EthereumAddress!, $signature: Signature!) {
    result: authenticate(request: { address: $address, signature: $signature }) {
      accessToken
      refreshToken
    }
  }
`;
/**
 * __useAuthAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authAuthenticateMutation, { data, loading, error }] = useAuthAuthenticateMutation({
 *   variables: {
 *      address: // value for 'address'
 *      signature: // value for 'signature'
 *   },
 * });
 */
function useAuthAuthenticateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(AuthAuthenticateDocument, options);
}
const AuthRefreshDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  mutation AuthRefresh($refreshToken: Jwt!) {
    result: refresh(request: { refreshToken: $refreshToken }) {
      accessToken
      refreshToken
    }
  }
`;
/**
 * __useAuthRefreshMutation__
 *
 * To run a mutation, you first call `useAuthRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authRefreshMutation, { data, loading, error }] = useAuthRefreshMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
function useAuthRefreshMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(AuthRefreshDocument, options);
}
const CommentsDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query Comments(
    $observerId: ProfileId
    $commentsOf: InternalPublicationId!
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]
  ) {
    result: publications(
      request: { limit: $limit, cursor: $cursor, commentsOf: $commentsOf, sources: $sources }
    ) {
      items {
        ... on Comment {
          ...CommentWithFirstComment
        }
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${CommentWithFirstCommentFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      commentsOf: // value for 'commentsOf'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *   },
 * });
 */
function useCommentsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(CommentsDocument, options);
}
function useCommentsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(CommentsDocument, options);
}
const EnabledModuleCurrenciesDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query EnabledModuleCurrencies {
    result: enabledModuleCurrencies {
      ...Erc20
    }
  }
  ${Erc20FragmentDoc}
`;
/**
 * __useEnabledModuleCurrenciesQuery__
 *
 * To run a query within a React component, call `useEnabledModuleCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnabledModuleCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnabledModuleCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
function useEnabledModuleCurrenciesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(EnabledModuleCurrenciesDocument, options);
}
function useEnabledModuleCurrenciesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(EnabledModuleCurrenciesDocument, options);
}
const FeedDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
function useFeedQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FeedDocument, options);
}
function useFeedLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FeedDocument, options);
}
const ExploreProfilesDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query ExploreProfiles($observerId: ProfileId, $limit: LimitScalar!, $cursor: Cursor) {
    result: exploreProfiles(
      request: { limit: $limit, cursor: $cursor, sortCriteria: MOST_COMMENTS }
    ) {
      items {
        ...ProfileFields
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${ProfileFieldsFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
/**
 * __useExploreProfilesQuery__
 *
 * To run a query within a React component, call `useExploreProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExploreProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExploreProfilesQuery({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
function useExploreProfilesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ExploreProfilesDocument, options);
}
function useExploreProfilesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ExploreProfilesDocument, options);
}
const NotificationsDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query Notifications(
    $observerId: ProfileId!
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]
  ) {
    result: notifications(
      request: { profileId: $observerId, limit: $limit, cursor: $cursor, sources: $sources }
    ) {
      items {
        ... on NewFollowerNotification {
          ...NewFollowerNotificationFields
        }
        ... on NewMirrorNotification {
          ...NewMirrorNotificationFields
        }
        ... on NewCollectNotification {
          ...NewCollectNotificationFields
        }
        ... on NewCommentNotification {
          ...NewCommentNotificationFields
        }
        ... on NewMentionNotification {
          ...NewMentionNotificationFields
        }
        ... on NewReactionNotification {
          ...NewReactionNotificationFields
        }
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${NewFollowerNotificationFieldsFragmentDoc}
  ${NewMirrorNotificationFieldsFragmentDoc}
  ${NewCollectNotificationFieldsFragmentDoc}
  ${NewCommentNotificationFieldsFragmentDoc}
  ${NewMentionNotificationFieldsFragmentDoc}
  ${NewReactionNotificationFieldsFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *   },
 * });
 */
function useNotificationsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(NotificationsDocument, options);
}
function useNotificationsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(NotificationsDocument, options);
}
const UnreadNotificationCountDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query UnreadNotificationCount($profileId: ProfileId!, $sources: [Sources!]) {
    result: notifications(request: { profileId: $profileId, sources: $sources }) {
      pageInfo {
        totalCount
      }
    }
  }
`;
/**
 * __useUnreadNotificationCountQuery__
 *
 * To run a query within a React component, call `useUnreadNotificationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnreadNotificationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnreadNotificationCountQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      sources: // value for 'sources'
 *   },
 * });
 */
function useUnreadNotificationCountQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(UnreadNotificationCountDocument, options);
}
function useUnreadNotificationCountLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(UnreadNotificationCountDocument, options);
}
const CreatePostTypedDataDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  mutation CreatePostTypedData($request: CreatePublicPostRequest!, $options: TypedDataOptions) {
    result: createPostTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
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
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
/**
 * __useCreatePostTypedDataMutation__
 *
 * To run a mutation, you first call `useCreatePostTypedDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostTypedDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostTypedDataMutation, { data, loading, error }] = useCreatePostTypedDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *      options: // value for 'options'
 *   },
 * });
 */
function useCreatePostTypedDataMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(CreatePostTypedDataDocument, options);
}
const CreatePostViaDispatcherDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {
    result: createPostViaDispatcher(request: $request) {
      ... on RelayerResult {
        ...RelayerResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelayerResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
/**
 * __useCreatePostViaDispatcherMutation__
 *
 * To run a mutation, you first call `useCreatePostViaDispatcherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostViaDispatcherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostViaDispatcherMutation, { data, loading, error }] = useCreatePostViaDispatcherMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
function useCreatePostViaDispatcherMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(CreatePostViaDispatcherDocument, options);
}
const ProfilesToFollowDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query ProfilesToFollow($observerId: ProfileId) {
    result: recommendedProfiles {
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
function useProfilesToFollowQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ProfilesToFollowDocument, options);
}
function useProfilesToFollowLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ProfilesToFollowDocument, options);
}
const GetProfileDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
function useGetProfileQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(GetProfileDocument, options);
}
function useGetProfileLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(GetProfileDocument, options);
}
const GetAllProfilesByOwnerAddressDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
function useGetAllProfilesByOwnerAddressQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(GetAllProfilesByOwnerAddressDocument, options);
}
function useGetAllProfilesByOwnerAddressLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(GetAllProfilesByOwnerAddressDocument, options);
}
const CreateProfileDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  mutation CreateProfile($request: CreateProfileRequest!) {
    result: createProfile(request: $request) {
      ... on RelayerResult {
        ...RelayerResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelayerResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
function useCreateProfileMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(CreateProfileDocument, options);
}
const MutualFollowersProfilesDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query MutualFollowersProfiles(
    $observerId: ProfileId!
    $viewingProfileId: ProfileId!
    $limit: LimitScalar!
    $cursor: Cursor
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
        ...ProfileFields
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${ProfileFieldsFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
/**
 * __useMutualFollowersProfilesQuery__
 *
 * To run a query within a React component, call `useMutualFollowersProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMutualFollowersProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMutualFollowersProfilesQuery({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      viewingProfileId: // value for 'viewingProfileId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
function useMutualFollowersProfilesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(MutualFollowersProfilesDocument, options);
}
function useMutualFollowersProfilesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(MutualFollowersProfilesDocument, options);
}
const ProfileFollowersDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query ProfileFollowers(
    $profileId: ProfileId!
    $limit: LimitScalar!
    $cursor: Cursor
    $observerId: ProfileId
  ) {
    result: followers(request: { profileId: $profileId, limit: $limit, cursor: $cursor }) {
      items {
        ...Follower
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FollowerFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
/**
 * __useProfileFollowersQuery__
 *
 * To run a query within a React component, call `useProfileFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileFollowersQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      observerId: // value for 'observerId'
 *   },
 * });
 */
function useProfileFollowersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ProfileFollowersDocument, options);
}
function useProfileFollowersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ProfileFollowersDocument, options);
}
const ProfileFollowingDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query ProfileFollowing(
    $walletAddress: EthereumAddress!
    $limit: LimitScalar!
    $cursor: Cursor
    $observerId: ProfileId
  ) {
    result: following(request: { address: $walletAddress, limit: $limit, cursor: $cursor }) {
      items {
        ...Following
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FollowingFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
/**
 * __useProfileFollowingQuery__
 *
 * To run a query within a React component, call `useProfileFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileFollowingQuery({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      observerId: // value for 'observerId'
 *   },
 * });
 */
function useProfileFollowingQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ProfileFollowingDocument, options);
}
function useProfileFollowingLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ProfileFollowingDocument, options);
}
const ProxyActionStatusDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
  ${ProxyActionStatusResultFragmentDoc}
  ${ProxyActionErrorFragmentDoc}
  ${ProxyActionQueuedFragmentDoc}
`;
/**
 * __useProxyActionStatusQuery__
 *
 * To run a query within a React component, call `useProxyActionStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useProxyActionStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProxyActionStatusQuery({
 *   variables: {
 *      proxyActionId: // value for 'proxyActionId'
 *   },
 * });
 */
function useProxyActionStatusQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ProxyActionStatusDocument, options);
}
function useProxyActionStatusLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ProxyActionStatusDocument, options);
}
const ProxyActionDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  mutation ProxyAction($request: ProxyActionRequest!) {
    result: proxyAction(request: $request)
  }
`;
/**
 * __useProxyActionMutation__
 *
 * To run a mutation, you first call `useProxyActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProxyActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [proxyActionMutation, { data, loading, error }] = useProxyActionMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
function useProxyActionMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ProxyActionDocument, options);
}
const PublicationDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query Publication($observerId: ProfileId, $publicationId: InternalPublicationId!) {
    result: publication(request: { publicationId: $publicationId }) {
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
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
`;
/**
 * __usePublicationQuery__
 *
 * To run a query within a React component, call `usePublicationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationQuery({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      publicationId: // value for 'publicationId'
 *   },
 * });
 */
function usePublicationQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(PublicationDocument, options);
}
function usePublicationLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(PublicationDocument, options);
}
const PublicationsDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query Publications(
    $profileId: ProfileId!
    $observerId: ProfileId
    $limit: LimitScalar!
    $cursor: Cursor
    $publicationTypes: [PublicationTypes!]
  ) {
    result: publications(
      request: {
        profileId: $profileId
        limit: $limit
        cursor: $cursor
        publicationTypes: $publicationTypes
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
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
/**
 * __usePublicationsQuery__
 *
 * To run a query within a React component, call `usePublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationsQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      observerId: // value for 'observerId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      publicationTypes: // value for 'publicationTypes'
 *   },
 * });
 */
function usePublicationsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(PublicationsDocument, options);
}
function usePublicationsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(PublicationsDocument, options);
}
const HasTxHashBeenIndexedDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
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
  ${TransactionIndexedResultFragmentDoc}
  ${TransactionErrorFragmentDoc}
`;
/**
 * __useHasTxHashBeenIndexedQuery__
 *
 * To run a query within a React component, call `useHasTxHashBeenIndexedQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasTxHashBeenIndexedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasTxHashBeenIndexedQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
function useHasTxHashBeenIndexedQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(HasTxHashBeenIndexedDocument, options);
}
function useHasTxHashBeenIndexedLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(HasTxHashBeenIndexedDocument, options);
}
const BroadcastProtocolCallDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  mutation BroadcastProtocolCall($request: BroadcastRequest!) {
    result: broadcast(request: $request) {
      ... on RelayerResult {
        ...RelayerResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelayerResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
/**
 * __useBroadcastProtocolCallMutation__
 *
 * To run a mutation, you first call `useBroadcastProtocolCallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBroadcastProtocolCallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [broadcastProtocolCallMutation, { data, loading, error }] = useBroadcastProtocolCallMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
function useBroadcastProtocolCallMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(BroadcastProtocolCallDocument, options);
}
const WalletCollectedPublicationsDocument = graphql_tag__WEBPACK_IMPORTED_MODULE_0__ `
  query WalletCollectedPublications(
    $observerId: ProfileId
    $walletAddress: EthereumAddress!
    $limit: LimitScalar!
    $cursor: Cursor
    $sources: [Sources!]
  ) {
    result: publications(
      request: {
        collectedBy: $walletAddress
        limit: $limit
        cursor: $cursor
        publicationTypes: [POST, COMMENT]
        sources: $sources
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
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
/**
 * __useWalletCollectedPublicationsQuery__
 *
 * To run a query within a React component, call `useWalletCollectedPublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletCollectedPublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletCollectedPublicationsQuery({
 *   variables: {
 *      observerId: // value for 'observerId'
 *      walletAddress: // value for 'walletAddress'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      sources: // value for 'sources'
 *   },
 * });
 */
function useWalletCollectedPublicationsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(WalletCollectedPublicationsDocument, options);
}
function useWalletCollectedPublicationsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(WalletCollectedPublicationsDocument, options);
}
const result = {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (result);


/***/ }),

/***/ 8337:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$w": () => (/* binding */ WalletConnectionError),
/* harmony export */   "A3": () => (/* binding */ PendingSigningRequestError),
/* harmony export */   "Ai": () => (/* binding */ UserRejectedError),
/* harmony export */   "Sq": () => (/* binding */ WalletType),
/* harmony export */   "gr": () => (/* binding */ InsufficientGasError),
/* harmony export */   "pj": () => (/* binding */ WalletConnectionErrorReason),
/* harmony export */   "w5": () => (/* binding */ Wallet)
/* harmony export */ });
class InsufficientGasError extends Error {
    asset;
    name = 'InsufficientGasError';
    constructor(asset) {
        super('Not enough gas to pay for the operation');
        this.asset = asset;
    }
}
class PendingSigningRequestError extends Error {
    name = 'PendingSigningRequestError';
}
var WalletConnectionErrorReason;
(function (WalletConnectionErrorReason) {
    WalletConnectionErrorReason["CONNECTION_REFUSED"] = "CONNECTION_REFUSED";
    WalletConnectionErrorReason["INCORRECT_CHAIN"] = "INCORRECT_CHAIN";
    /**
     * The connected account is not the one we expect
     */
    WalletConnectionErrorReason["WRONG_ACCOUNT"] = "WRONG_ACCOUNT";
    /**
     * A previous connection request that was not yet cancelled or approved
     */
    WalletConnectionErrorReason["STALE_CONNECTION_REQUEST"] = "STALE_CONNECTION_REQUEST";
})(WalletConnectionErrorReason || (WalletConnectionErrorReason = {}));
class WalletConnectionError extends Error {
    reason;
    name = 'WalletConnectionError';
    constructor(reason) {
        super(`Wallet connection failed due to ${reason} error`);
        this.reason = reason;
    }
}
class UserRejectedError extends Error {
    name = 'UserRejectedError';
    message = 'User rejected the request';
}
var WalletType;
(function (WalletType) {
    WalletType["INJECTED"] = "injected";
    WalletType["WALLET_CONNECT"] = "wallet-connect";
    WalletType["UNSPECIFIED"] = "unspecified";
})(WalletType || (WalletType = {}));
class Wallet {
    address;
    type;
    constructor(address, type) {
        this.address = address;
        this.type = type;
    }
}
//# sourceMappingURL=Wallet.js.map

/***/ }),

/***/ 9149:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "z": () => (/* binding */ Bootstrap),
  "N": () => (/* binding */ CredentialsExpiredError)
});

;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/wallets/ILogoutPresenter.js
var LogoutReason;
(function (LogoutReason) {
    LogoutReason["CREDENTIALS_EXPIRED"] = "credentials-expired";
    LogoutReason["USER_INITIATED"] = "user-initiated";
})(LogoutReason || (LogoutReason = {}));
//# sourceMappingURL=ILogoutPresenter.js.map
;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/lifecycle/Bootstrap.js

class CredentialsExpiredError extends Error {
    name = 'CredentialsExpiredError';
    message = 'Auth credentials are expired';
}
class Bootstrap {
    activeWallet;
    credentialsGateway;
    credentialsRenewer;
    activeWalletPresenter;
    applicationPresenter;
    logoutPresenter;
    activeProfile;
    transactionQueue;
    constructor(activeWallet, credentialsGateway, credentialsRenewer, activeWalletPresenter, applicationPresenter, logoutPresenter, activeProfile, transactionQueue) {
        this.activeWallet = activeWallet;
        this.credentialsGateway = credentialsGateway;
        this.credentialsRenewer = credentialsRenewer;
        this.activeWalletPresenter = activeWalletPresenter;
        this.applicationPresenter = applicationPresenter;
        this.logoutPresenter = logoutPresenter;
        this.activeProfile = activeProfile;
        this.transactionQueue = transactionQueue;
    }
    async start() {
        const wallet = await this.activeWallet.getActiveWallet();
        if (!wallet) {
            this.applicationPresenter.signalReady();
            return;
        }
        const credentials = await this.credentialsGateway.getCredentials();
        if (!credentials) {
            await this.startWithExpCredentials(wallet);
            return;
        }
        const result = await this.credentialsRenewer.renewCredentials(credentials);
        if (result.isFailure()) {
            await this.startWithExpCredentials(wallet);
            return;
        }
        const newCredentials = result.unwrap();
        await this.credentialsGateway.save(newCredentials);
        await this.startWithCredentials(wallet);
    }
    async startWithCredentials(wallet) {
        this.activeWalletPresenter.presentActiveWallet(wallet);
        await this.activeProfile.loadActiveProfileByOwnerAddress(wallet.address);
        await this.transactionQueue.init();
        this.applicationPresenter.signalReady();
    }
    async startWithExpCredentials(wallet) {
        this.logoutPresenter.presentLogout({
            lastLoggedInWallet: wallet,
            logoutReason: LogoutReason.CREDENTIALS_EXPIRED,
        });
        this.applicationPresenter.signalReady();
    }
}
//# sourceMappingURL=Bootstrap.js.map

/***/ }),

/***/ 7646:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UC": () => (/* binding */ ApplicationsState),
/* harmony export */   "mr": () => (/* binding */ useAppState),
/* harmony export */   "q3": () => (/* binding */ ApplicationPresenter)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1859);

var ApplicationsState;
(function (ApplicationsState) {
    ApplicationsState[ApplicationsState["LOADING"] = 0] = "LOADING";
    ApplicationsState[ApplicationsState["READY"] = 1] = "READY";
})(ApplicationsState || (ApplicationsState = {}));
const applicationState = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.makeVar)(ApplicationsState.LOADING);
class ApplicationPresenter {
    signalReady() {
        applicationState(ApplicationsState.READY);
    }
}
const useAppState = () => {
    return (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.useReactiveVar)(applicationState);
};


/***/ }),

/***/ 634:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ ActiveProfilePresenter),
/* harmony export */   "iB": () => (/* binding */ useActiveProfileVar)
/* harmony export */ });
/* unused harmony export activeProfileVar */
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1859);
/* harmony import */ var _lens_protocol_api_bindings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8533);


const activeProfileVar = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.makeVar)(null);
class ActiveProfilePresenter {
    apolloClient;
    activeProfileCacheSubscription = null;
    constructor(apolloClient) {
        this.apolloClient = apolloClient;
    }
    async presentActiveProfile(profileData) {
        if (this.activeProfileCacheSubscription) {
            this.activeProfileCacheSubscription.unsubscribe();
            this.activeProfileCacheSubscription = null;
        }
        if (profileData) {
            const observable = this.apolloClient.watchQuery({
                query: _lens_protocol_api_bindings__WEBPACK_IMPORTED_MODULE_1__/* .GetProfileDocument */ .D9,
                variables: {
                    request: { profileId: profileData.id },
                },
                nextFetchPolicy: 'cache-only',
            });
            const queryResult = await observable.result();
            const profile = queryResult.data.result;
            activeProfileVar(profile);
            // watch for all the changes in the cache to make sure the active profile is always up to date
            this.activeProfileCacheSubscription = observable.subscribe((updatedQueryResult) => {
                const updatedProfile = updatedQueryResult.data.result;
                activeProfileVar(updatedProfile);
            });
        }
        else {
            activeProfileVar(null);
        }
    }
}
function useActiveProfileVar() {
    return (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.useReactiveVar)(activeProfileVar);
}


/***/ }),

/***/ 6861:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "_J": () => (/* binding */ SharedDependenciesProvider),
  "Bb": () => (/* binding */ createSharedDependencies),
  "z0": () => (/* binding */ useSharedDependencies)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@apollo+client@3.7.1_graphql@15.5.1/node_modules/@apollo/client/main.cjs
var main = __webpack_require__(6959);
// EXTERNAL MODULE: ../../packages/api-bindings/dist/esm/graphql/generated.js
var generated = __webpack_require__(8533);
;// CONCATENATED MODULE: ../../packages/api-bindings/dist/esm/apollo/createApolloCache.js

function createApolloCache({ possibleTypes, typePolicies, }) {
    return new main.InMemoryCache({
        possibleTypes,
        resultCaching: true,
        typePolicies,
    });
}

// EXTERNAL MODULE: ../../node_modules/.pnpm/@apollo+client@3.7.1_graphql@15.5.1/node_modules/@apollo/client/link/context/context.cjs
var context = __webpack_require__(2359);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@apollo+client@3.7.1_graphql@15.5.1/node_modules/@apollo/client/link/error/error.cjs
var error = __webpack_require__(7537);
;// CONCATENATED MODULE: ../../packages/api-bindings/dist/esm/apollo/createAuthLink.js



/**
 * An error code that's coming from `apollo-server-errors` `AuthenticationError`
 */
const AUTHENTICATION_ERROR_CODE = 'UNAUTHENTICATED';
const createAuthLink = (accessTokenStorage) => {
    const errorLink = (0,error/* onError */.qQ)(({ graphQLErrors, operation, forward }) => {
        if (graphQLErrors &&
            graphQLErrors.some((error) => error.extensions?.code === AUTHENTICATION_ERROR_CODE)) {
            return (0,main.fromPromise)(accessTokenStorage.refreshToken()).flatMap(() => forward(operation));
        }
        return;
    });
    const authHeaderLink = (0,context/* setContext */.v)(() => {
        const token = accessTokenStorage.getAccessToken();
        if (token) {
            return {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
        }
        return;
    });
    return (0,main.from)([errorLink, authHeaderLink]);
};

;// CONCATENATED MODULE: ../../packages/api-bindings/dist/esm/apollo/utils/cursorBasedPagination.js
function cursorBasedPagination(keyArgs) {
    return {
        keyArgs,
        read(existing, { canRead }) {
            if (!existing) {
                return existing;
            }
            const { items, pageInfo } = existing;
            // items that are not in the cache anymore (for .e.g deleted publication)
            const danglingItems = items.filter((item) => !canRead(item));
            const readRes = {
                ...existing,
                items,
                pageInfo: {
                    ...pageInfo,
                    // reduce total count by excluding dangling items so it won't cause a new page query
                    // after item was removed from the cache (for .e.g deleted publication)
                    totalCount: pageInfo.totalCount !== null ? pageInfo.totalCount - danglingItems.length : null,
                },
            };
            return readRes;
        },
        merge(existing, incoming) {
            if (!existing) {
                return incoming;
            }
            const existingItems = existing.items;
            const incomingItems = incoming.items;
            return {
                ...incoming,
                items: existingItems.concat(incomingItems),
                pageInfo: incoming.pageInfo,
            };
        },
    };
}

;// CONCATENATED MODULE: ../../packages/api-bindings/dist/esm/apollo/createExploreProfileFieldPolicy.js

function createExploreProfilesFieldPolicy() {
    return cursorBasedPagination([['request', ['observerId']]]);
}

;// CONCATENATED MODULE: ../../packages/api-bindings/dist/esm/apollo/createFeedFieldPolicy.js

function createFeedFieldPolicy() {
    return cursorBasedPagination([['request', ['profileId']]]);
}

;// CONCATENATED MODULE: ../../packages/api-bindings/dist/esm/apollo/createNotificationsFieldPolicy.js

function createNotificationsFieldPolicy() {
    return cursorBasedPagination(['profileId']);
}

;// CONCATENATED MODULE: ../../packages/api-bindings/dist/esm/apollo/createProfileTypePolicy.js
function createProfileTypePolicy() {
    return {
        fields: {
            isFollowing: {
                keyArgs: false,
            },
            isFollowedByMe: {
                keyArgs: false,
            },
            isOptimisticFollowedByMe(existing) {
                return existing ?? false;
            },
            attributes: {
                merge(_, incoming) {
                    // Attributes are not merged, but replaced cause they are not normalized.
                    // (see createAttributeTypePolicy).
                    return incoming;
                },
            },
            location(_, { readField }) {
                return (readField('attributes') ?? []).find(({ key }) => key === 'location')?.value ?? null;
            },
            twitter(_, { readField }) {
                return (readField('attributes') ?? []).find(({ key }) => key === 'twitter')?.value ?? null;
            },
            website(_, { readField }) {
                return (readField('attributes') ?? []).find(({ key }) => key === 'website')?.value ?? null;
            },
            ownedByMe() {
                // TODO: implement ownership check using active profile
                return false;
            },
        },
    };
}

;// CONCATENATED MODULE: ../../packages/api-bindings/dist/esm/apollo/createPublicationTypePolicy.js
function createPublicationTypePolicy() {
    return {
        fields: {
            mirrors: {
                // no arguments involved in caching of "mirrors" edge
                keyArgs: false,
            },
            reaction: {
                // no arguments involved in caching of "reaction" edge
                keyArgs: false,
            },
            canComment: {
                keyArgs: false,
            },
            canMirror: {
                keyArgs: false,
            },
            collectedBy: {
                merge: (existing, incoming) => {
                    // workaround: try to retain the information even if the publication is updated in
                    // cache as part of another query that does not have the collectedBy field
                    return existing ?? incoming;
                },
            },
            hasCollectedByMe: {
                keyArgs: false,
            },
            hasOptimisticCollectedByMe(existing) {
                return existing ?? false;
            },
            isOptimisticMirroredByMe(existing) {
                return existing ?? false;
            },
            ownedByMe() {
                // TODO: implement ownership check using active profile
                return false;
            },
        },
    };
}

;// CONCATENATED MODULE: ../../packages/api-bindings/dist/esm/apollo/index.js









function createTypePolicies() {
    return {
        Profile: createProfileTypePolicy(),
        Post: createPublicationTypePolicy(),
        Comment: createPublicationTypePolicy(),
        Mirror: createPublicationTypePolicy(),
        Query: {
            fields: {
                feed: createFeedFieldPolicy(),
                exploreProfiles: createExploreProfilesFieldPolicy(),
                notifications: createNotificationsFieldPolicy(),
                publications: createPublicationTypePolicy(),
            },
        },
    };
}
function createApolloClient({ backendURL, accessTokenStorage }) {
    const uri = `${backendURL}/graphql`;
    const authLink = createAuthLink(accessTokenStorage);
    const httpLink = new main.HttpLink({
        uri,
    });
    return new main.ApolloClient({
        cache: createApolloCache({
            possibleTypes: generated/* default.possibleTypes */.ZP.possibleTypes,
            typePolicies: createTypePolicies(),
        }),
        link: (0,main.from)([authLink, httpLink]),
    });
}
function createAnonymousApolloClient({ backendURL }) {
    const uri = `${backendURL}/graphql`;
    return new main.ApolloClient({
        cache: createApolloCache({
            possibleTypes: generated/* default.possibleTypes */.ZP.possibleTypes,
            typePolicies: createTypePolicies(),
        }),
        uri,
    });
}

;// CONCATENATED MODULE: ../../packages/domain/dist/esm/entities/Transactions.js
var TransactionKind;
(function (TransactionKind) {
    TransactionKind["APPROVE_MODULE"] = "APPROVE_MODULE";
    TransactionKind["COLLECT_PUBLICATION"] = "COLLECT_PUBLICATION";
    TransactionKind["CREATE_COMMENT"] = "CREATE_COMMENT";
    TransactionKind["CREATE_POST"] = "CREATE_POST";
    TransactionKind["CREATE_PROFILE"] = "CREATE_PROFILE";
    TransactionKind["FOLLOW_PROFILES"] = "FOLLOW_PROFILES";
    TransactionKind["MIRROR_PUBLICATION"] = "MIRROR_PUBLICATION";
    TransactionKind["UPDATE_PROFILE_IMAGE"] = "UPDATE_PROFILE_IMAGE";
    TransactionKind["UNFOLLOW_PROFILE"] = "UNFOLLOW_PROFILE";
    TransactionKind["UPDATE_COVER_IMAGE"] = "UPDATE_COVER_IMAGE";
    TransactionKind["UPDATE_PROFILE_DETAILS"] = "UPDATE_PROFILE_DETAILS";
    TransactionKind["UPDATE_FOLLOW_POLICY"] = "UPDATE_FOLLOW_POLICY";
    TransactionKind["UPDATE_DISPATCHER_CONFIG"] = "UPDATE_DISPATCHER_CONFIG";
})(TransactionKind || (TransactionKind = {}));
class UnsignedTransaction {
    id;
    chainType;
    request;
    constructor(id, chainType, request) {
        this.id = id;
        this.chainType = chainType;
        this.request = request;
    }
}
class SignedProtocolCall {
    id;
    signature;
    request;
    nonce;
    constructor(id, signature, request, nonce) {
        this.id = id;
        this.signature = signature;
        this.request = request;
        this.nonce = nonce;
    }
    static create({ id, signature, request, nonce, }) {
        return new SignedProtocolCall(id, signature, request, nonce);
    }
}
var TransactionEvent;
(function (TransactionEvent) {
    TransactionEvent["BROADCASTED"] = "BROADCASTED";
    TransactionEvent["UPGRADED"] = "UPGRADED";
    TransactionEvent["SETTLED"] = "SETTLED";
})(TransactionEvent || (TransactionEvent = {}));
var ProxyActionStatus;
(function (ProxyActionStatus) {
    ProxyActionStatus["MINTING"] = "MINTING";
    ProxyActionStatus["TRANSFERRING"] = "TRANSFERRING";
    ProxyActionStatus["COMPLETE"] = "COMPLETE";
})(ProxyActionStatus || (ProxyActionStatus = {}));
class MetaTransaction {
}
class NativeTransaction {
}
class ProxyTransaction {
}
var TransactionErrorReason;
(function (TransactionErrorReason) {
    TransactionErrorReason["CANNOT_EXECUTE"] = "CANNOT_EXECUTE";
    TransactionErrorReason["INDEXING_TIMEOUT"] = "INDEXING_TIMEOUT";
    TransactionErrorReason["MINING_TIMEOUT"] = "MINING_TIMEOUT";
    TransactionErrorReason["REJECTED"] = "REJECTED";
    TransactionErrorReason["REVERTED"] = "REVERTED";
    TransactionErrorReason["UNKNOWN"] = "UNKNOWN";
})(TransactionErrorReason || (TransactionErrorReason = {}));
class TransactionError extends Error {
    reason;
    txHash;
    name = 'TransactionError';
    constructor(reason, txHash) {
        super(`Transaction "${txHash}" failed due to: ${reason}`);
        this.reason = reason;
        this.txHash = txHash;
    }
}
//# sourceMappingURL=Transactions.js.map
// EXTERNAL MODULE: ../../packages/shared-kernel/dist/esm/ts-helpers/invariant.js
var invariant = __webpack_require__(1604);
;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/profile/ActiveProfile.js

class ActiveProfile {
    profileGateway;
    activeProfileGateway;
    activeProfilePresenter;
    constructor(profileGateway, activeProfileGateway, activeProfilePresenter) {
        this.profileGateway = profileGateway;
        this.activeProfileGateway = activeProfileGateway;
        this.activeProfilePresenter = activeProfilePresenter;
    }
    async loadActiveProfileByOwnerAddress(walletAddress) {
        const activeProfile = await this.activeProfileGateway.getActiveProfile();
        if (activeProfile) {
            await this.activeProfilePresenter.presentActiveProfile(activeProfile);
            return;
        }
        const [firstProfile] = await this.profileGateway.getAllProfilesByOwnerAddress(walletAddress);
        if (firstProfile) {
            await this.storeAndPresent(firstProfile);
        }
    }
    async loadActiveProfileByHandle(handle) {
        const activeProfile = await this.activeProfileGateway.getActiveProfile();
        if (activeProfile?.handle === handle) {
            await this.activeProfilePresenter.presentActiveProfile(activeProfile);
            return;
        }
        const profile = await this.profileGateway.getProfileByHandle(handle);
        (0,invariant/* invariant */.k)(profile, 'Profile not found');
        await this.storeAndPresent(profile);
    }
    async requireActiveProfile() {
        const activeProfile = await this.activeProfileGateway.getActiveProfile();
        (0,invariant/* invariant */.k)(activeProfile, 'Active profile should be defined');
        return activeProfile;
    }
    async storeAndPresent(profile) {
        await this.activeProfileGateway.setActiveProfile(profile);
        await this.activeProfilePresenter.presentActiveProfile(profile);
    }
}
//# sourceMappingURL=ActiveProfile.js.map
;// CONCATENATED MODULE: ../../packages/shared-kernel/dist/esm/Result.js
/**
 * Thrown exceptions are historically difficult to trace. They require implicit knowledge
 * of the implementation details of the code that might throw expections. This might go
 * several layers down and lead to tight coupling between modules.
 *
 * There are good reasons to leave thrown expections only for exceptional (i.e. unexpected) failure
 * scenarios and model known failure modes in way that allows traditional control flow.
 *
 * Result<T, E> is a minimalistic implementation of a value that can be a "success" or a "failure".
 * It borrows from what done in other modern languages (i.e. Rust, Kotlin, Swift, etc.).
 * It's type safe and promotes exhaustive error handling.
 *
 * See:
 *   - https://wiki.c2.com/?AvoidExceptionsWheneverPossible
 *   - https://developer.apple.com/documentation/swift/result
 *   - https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/
 *
 * Alternatives:
 *   - https://github.com/everweij/typescript-result
 *   - https://github.com/supermacro/neverthrow
 *   - https://github.com/badrap/result
 */
class Success {
    value;
    constructor(value) {
        this.value = value;
    }
    isSuccess() {
        return true;
    }
    isFailure() {
        return false;
    }
    unwrap() {
        return this.value;
    }
}
class Failure {
    error;
    constructor(error) {
        this.error = error;
    }
    isSuccess() {
        return false;
    }
    isFailure() {
        return true;
    }
    unwrap() {
        throw this.error;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Result_success(value = undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new Success(value);
}
const Result_failure = (error) => new Failure(error);
function isResult(v) {
    return v instanceof Success || v instanceof Failure;
}
//# sourceMappingURL=Result.js.map
;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/transactions/TransactionQueue.js


function broadcastedTransactionData(tx) {
    (0,invariant/* invariant */.k)(tx.hash, 'Transaction must have a hash');
    return {
        id: tx.id,
        request: tx.request,
        txHash: tx.hash,
    };
}
function transactionData(tx) {
    if (tx.hash) {
        return broadcastedTransactionData(tx);
    }
    return {
        id: tx.id,
        request: tx.request,
    };
}
class TransactionQueue {
    responders;
    transactionGateway;
    transactionQueuePresenter;
    initialized = false;
    constructor(responders, transactionGateway, transactionQueuePresenter) {
        this.responders = responders;
        this.transactionGateway = transactionGateway;
        this.transactionQueuePresenter = transactionQueuePresenter;
    }
    async clearRecent() {
        // This method might seem a bit weird, but it's actually a precursor to the
        // fully fledged solution which will store the transactions in the localStorage (at first).
        this.transactionQueuePresenter.clearRecent();
    }
    async push(transaction) {
        await this.transactionGateway.save(transaction);
        await this.handle(transaction);
    }
    async init() {
        (0,invariant/* invariant */.k)(!this.initialized, `${TransactionQueue.name} already initialized`);
        const transactions = await this.transactionGateway.getAll();
        for (const transaction of transactions) {
            await this.handle(transaction);
        }
        this.transactionGateway.subscribe(async (newTransactions) => {
            for (const transaction of newTransactions) {
                await this.handle(transaction);
            }
        });
        this.initialized = true;
    }
    async handle(transaction) {
        const txData = transactionData(transaction);
        await this.prepare(txData);
        void this.observe(transaction);
    }
    async observe(transaction) {
        const transactionResult = await this.waitTransaction(transaction);
        await this.transactionGateway.remove(transaction.id);
        if (transactionResult.isFailure()) {
            const txData = transactionData(transaction);
            await this.rollback(transactionResult.error, txData);
            return;
        }
        const txData = broadcastedTransactionData(transaction);
        await this.commit(txData);
    }
    async prepare(txData) {
        const responder = this.getResponderFor(txData.request.kind);
        await responder.prepare?.(txData);
        this.transactionQueuePresenter.broadcasting(txData);
    }
    async commit(txData) {
        const responder = this.getResponderFor(txData.request.kind);
        await responder.commit(txData);
        this.transactionQueuePresenter.settled(txData);
    }
    async rollback(error, txData) {
        const responder = this.getResponderFor(txData.request.kind);
        await responder.rollback?.(txData);
        this.transactionQueuePresenter.failed(error, txData);
    }
    async waitTransaction(transaction) {
        while (true) {
            if (transaction.hash) {
                this.transactionQueuePresenter.mining(broadcastedTransactionData(transaction));
            }
            const result = await transaction.waitNextEvent();
            if (result.isFailure()) {
                return Result_failure(result.error);
            }
            if (result.value === TransactionEvent.SETTLED) {
                return Result_success();
            }
            await this.transactionGateway.save(transaction);
        }
    }
    getResponderFor(kind) {
        return this.responders[kind];
    }
}
//# sourceMappingURL=TransactionQueue.js.map
;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/wallets/ActiveWallet.js

class ActiveWallet {
    credentialsReader;
    walletGateway;
    constructor(credentialsReader, walletGateway) {
        this.credentialsReader = credentialsReader;
        this.walletGateway = walletGateway;
    }
    async getActiveWallet() {
        const credentials = await this.credentialsReader.getCredentials();
        if (!credentials) {
            return null;
        }
        const wallet = await this.walletGateway.getByAddress(credentials.address);
        (0,invariant/* invariant */.k)(wallet, 'Active wallet should exist when credentials are present');
        return wallet;
    }
    async requireActiveWallet() {
        const wallet = await this.getActiveWallet();
        (0,invariant/* invariant */.k)(wallet, 'Active wallet should be defined');
        return wallet;
    }
}
//# sourceMappingURL=ActiveWallet.js.map
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ../../packages/react/dist/esm/ConsoleLogger.js
class ConsoleLogger {
    info(message, data) {
        console.info(message, data);
    }
    debug(message, data) {
        console.info(message, data);
    }
    warn(message, data) {
        console.error(message, data);
    }
    error(error, message, data) {
        console.error(message, error, data);
    }
    fatal(error, message, data) {
        console.error(message, error, data);
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/NoopResponder.js
class NoopResponder {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async commit(_) { }
}

// EXTERNAL MODULE: ../../node_modules/.pnpm/zod@3.19.1/node_modules/zod/lib/index.mjs
var lib = __webpack_require__(7165);
;// CONCATENATED MODULE: ../../packages/react/dist/esm/profile/adapters/ActiveProfileGateway.js

const StoredActiveProfileData = lib.z.object({
    id: lib.z.string(),
    handle: lib.z.string(),
});
class ActiveProfileGateway {
    activeProfileStorage;
    constructor(activeProfileStorage) {
        this.activeProfileStorage = activeProfileStorage;
    }
    async setActiveProfile(profile) {
        await this.activeProfileStorage.set(profile);
    }
    async getActiveProfile() {
        const data = await this.activeProfileStorage.get();
        if (!data) {
            return null;
        }
        return data;
    }
    async reset() {
        await this.activeProfileStorage.reset();
    }
}

// EXTERNAL MODULE: ../../packages/react/dist/esm/profile/adapters/ActiveProfilePresenter.js
var ActiveProfilePresenter = __webpack_require__(634);
;// CONCATENATED MODULE: ../../packages/domain/dist/esm/entities/Profile.js
class Profile {
    id;
    handle;
    constructor(id, handle) {
        this.id = id;
        this.handle = handle;
    }
    static create({ id, handle }) {
        return new Profile(id, handle);
    }
}
//# sourceMappingURL=Profile.js.map
;// CONCATENATED MODULE: ../../packages/react/dist/esm/profile/adapters/ProfileGateway.js



class ProfileGateway {
    apolloClient;
    constructor(apolloClient) {
        this.apolloClient = apolloClient;
    }
    async getAllProfilesByOwnerAddress(address) {
        const { data } = await this.apolloClient.query({
            query: generated/* GetAllProfilesByOwnerAddressDocument */.L9,
            variables: { address },
        });
        (0,invariant/* invariant */.k)(data, `Could not query profiles by owner address: ${address}`);
        return data.profilesByOwner.items.map(({ id, handle }) => Profile.create({ id, handle }));
    }
    async getProfileByHandle(handle) {
        const { data } = await this.apolloClient.query({
            query: generated/* GetProfileDocument */.D9,
            variables: { request: { handle } },
        });
        (0,invariant/* invariant */.k)(data, `Could not query profiles by handle: ${handle}`);
        if (data.result === null) {
            return null;
        }
        return Profile.create({
            id: data.result.id,
            handle: data.result.handle,
        });
    }
}

;// CONCATENATED MODULE: ../../packages/shared-kernel/dist/esm/ts-helpers/assertError.js

function assertError(error) {
    if (!(error instanceof Error)) {
        throw new invariant/* InvariantError */.e(`Invalid error type. Received ${typeof error}, expected instance of Error`);
    }
}
function assertErrorWithCode(error) {
    // eslint-disable-next-line no-prototype-builtins
    if (!(error instanceof Error && error.hasOwnProperty('code'))) {
        throw error;
    }
}
function assertErrorWithReason(error) {
    // eslint-disable-next-line no-prototype-builtins
    if (!(error instanceof Error && error.hasOwnProperty('reason'))) {
        throw error;
    }
}
//# sourceMappingURL=assertError.js.map
;// CONCATENATED MODULE: ../../packages/storage/dist/esm/BaseStorageSchema.js


class SchemaMismatchError extends Error {
    name = 'SchemaMismatchError';
    constructor(schemaId, errors) {
        super(`Schema mismatch for ${schemaId} with errors: ${errors}`);
    }
}
class NoMigrationPathError extends Error {
    name = 'NoMigrationPathError';
    constructor(schemaId, fromVersion, toVersion) {
        super(`No migration path for schema ${schemaId} from version ${fromVersion} to ${toVersion}`);
    }
}
const storageMetadata = lib.z.object({
    version: lib.z.number().int().positive(),
    createdAt: lib.z.number().int().positive(),
    updatedAt: lib.z.number().int().positive(),
})
    .strict();
/**
 * A storage schema without any migrations. Use as the base class for specific schemas when migrations are required
 */
class BaseStorageSchema {
    key;
    schema;
    version = 1;
    constructor(key, schema) {
        this.key = key;
        this.schema = schema;
    }
    async process(storageItemUnknown) {
        const storageItem = this.parseStorageItem(storageItemUnknown);
        const data = this.migrate(storageItem);
        return Promise.resolve({ data, metadata: storageItem.metadata });
    }
    migrate(storageItem) {
        const storageVersion = storageItem.metadata.version;
        if (this.version !== storageVersion) {
            throw new NoMigrationPathError(this.key, storageVersion, this.version);
        }
        // make sure we received correct shape from external storage
        return this.parseData(storageItem.data);
    }
    parseStorageItem(storageItem) {
        try {
            return lib.z.object({
                data: lib.z.unknown(),
                metadata: storageMetadata,
            })
                .strict()
                // force casting required due to the bug in zod
                // https://github.com/colinhacks/zod/issues/493
                .parse(storageItem);
        }
        catch (error) {
            assertError(error);
            throw new SchemaMismatchError(this.key, error.message);
        }
    }
    parseData(data) {
        try {
            const t = this.schema.parse(data);
            return t;
        }
        catch (error) {
            assertError(error);
            throw new SchemaMismatchError(this.key, error.message);
        }
    }
}
//# sourceMappingURL=BaseStorageSchema.js.map
;// CONCATENATED MODULE: ../../packages/storage/dist/esm/Storage.js
/**
 * An implementation of `IStorage` with support for migration strategies
 */
class Storage {
    schema;
    provider;
    constructor(schema, provider) {
        this.schema = schema;
        this.provider = provider;
    }
    async get() {
        const storageItem = await this.getWithMetadata();
        return storageItem?.data ?? null;
    }
    async reset() {
        await this.provider.removeItem(this.getStorageKey());
    }
    async set(data) {
        const lastStorageItem = await this.getWithMetadata();
        const metadata = {
            createdAt: lastStorageItem?.metadata.createdAt ?? Date.now(),
            updatedAt: Date.now(),
            version: this.schema.version,
        };
        const storageItem = { data, metadata };
        const json = JSON.stringify(storageItem);
        await this.provider.setItem(this.getStorageKey(), json);
    }
    subscribe(subscriber) {
        return this.provider.subscribe(this.getStorageKey(), async (newValue, oldValue) => {
            const newItem = newValue ? await this.parse(newValue) : { data: null };
            const oldItem = oldValue ? await this.parse(oldValue) : { data: null };
            subscriber(newItem.data, oldItem.data);
        });
    }
    async getWithMetadata() {
        const json = await this.provider.getItem(this.getStorageKey());
        if (json === null) {
            return null;
        }
        return this.parse(json);
    }
    async parse(json) {
        const item = JSON.parse(json);
        return this.schema.process(item);
    }
    getStorageKey() {
        return this.schema.key;
    }
    static createForSchema(schema, provider) {
        return new Storage(schema, provider);
    }
}
//# sourceMappingURL=Storage.js.map
;// CONCATENATED MODULE: ../../packages/react/dist/esm/profile/infrastructure/ActiveProfileStorage.js


const ActiveProfileStorageDataSchema = new BaseStorageSchema('lens.activeProfile', StoredActiveProfileData);
function createActiveProfileStorage(storageProvider) {
    return Storage.createForSchema(ActiveProfileStorageDataSchema, storageProvider);
}

;// CONCATENATED MODULE: ../../packages/shared-kernel/dist/esm/ts-helpers/assertNever.js
/**
 * Exhaustiveness checking for union and enum types
 * see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
 */

function assertNever(x, message = `Unexpected object: ${String(x)}`) {
    throw new invariant/* InvariantError */.e(message);
}
//# sourceMappingURL=assertNever.js.map
// EXTERNAL MODULE: ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/differenceBy.js
var differenceBy = __webpack_require__(6257);
// EXTERNAL MODULE: ../../packages/shared-kernel/dist/esm/crypto/ChainType.js
var ChainType = __webpack_require__(3151);
;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/wallets/TokenAllowance.js

var TokenAllowanceLimit;
(function (TokenAllowanceLimit) {
    TokenAllowanceLimit[TokenAllowanceLimit["EXACT"] = 0] = "EXACT";
    TokenAllowanceLimit[TokenAllowanceLimit["INFINITE"] = 1] = "INFINITE";
})(TokenAllowanceLimit || (TokenAllowanceLimit = {}));
class TokenAllowance {
    activeWallet;
    gateway;
    presenter;
    queue;
    constructor(activeWallet, gateway, presenter, queue) {
        this.activeWallet = activeWallet;
        this.gateway = gateway;
        this.presenter = presenter;
        this.queue = queue;
    }
    async increaseAllowance(request) {
        const wallet = await this.activeWallet.requireActiveWallet();
        const approveTransaction = await this.gateway.createApproveTransaction(request, wallet);
        const relayResult = await wallet.sendTransaction(approveTransaction);
        if (relayResult.isFailure()) {
            this.presenter.present(failure(relayResult.error));
            return;
        }
        const transaction = relayResult.value;
        await this.queue.push(transaction);
        this.presenter.present(success());
    }
}
//# sourceMappingURL=TokenAllowance.js.map
// EXTERNAL MODULE: ../../packages/shared-kernel/dist/esm/crypto/Asset.js
var Asset = __webpack_require__(7530);
// EXTERNAL MODULE: ../../node_modules/.pnpm/decimal.js@10.4.3/node_modules/decimal.js/decimal.mjs
var decimal = __webpack_require__(2527);
;// CONCATENATED MODULE: ../../packages/shared-kernel/dist/esm/arithmetic/BigDecimal.js


class BigDecimal extends decimal/* default.clone */.Z.clone({
    precision: 32,
    toExpPos: 18,
    toExpNeg: -19,
    rounding: decimal/* default.ROUND_HALF_CEIL */.Z.ROUND_HALF_CEIL,
}) {
    /**
     * Syntactic sugar over new BigDecimal
     */
    static from(value) {
        return new BigDecimal(value);
    }
    static mean(values) {
        (0,invariant/* invariant */.k)(values.length > 1, '2+ values must be provided');
        return values.reduce((total, value) => total.add(value)).div(values.length);
    }
    static rescale(value, powerOfTen) {
        return value.mul(BigDecimal.pow(10, powerOfTen));
    }
}
//# sourceMappingURL=BigDecimal.js.map
;// CONCATENATED MODULE: ../../packages/shared-kernel/dist/esm/crypto/Amount.js



const Denomination = {
    gwei(value) {
        return BigDecimal.from(value).mul(BigDecimal.pow(10, -9));
    },
    wei(value) {
        return BigDecimal.from(value).mul(BigDecimal.pow(10, -18));
    },
};
class Amount {
    asset;
    value;
    constructor(asset, value) {
        this.asset = asset;
        this.value = value;
    }
    convert(rate) {
        return new Amount(rate.asset, this.value.mul(rate.value));
    }
    eq(amount) {
        return amount.asset === this.asset && amount.value.eq(this.value);
    }
    gt(amount) {
        (0,invariant/* invariant */.k)(this.asset === amount.asset, `Cannot compare ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`);
        return this.value.gt(amount.value);
    }
    gte(amount) {
        (0,invariant/* invariant */.k)(this.asset === amount.asset, `Cannot compare ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`);
        return this.value.gte(amount.value);
    }
    lt(amount) {
        return !this.gte(amount);
    }
    lte(amount) {
        return !this.gt(amount);
    }
    add(amount) {
        (0,invariant/* invariant */.k)(this.asset === amount.asset, `Cannot add ${this.asset.symbol} Amount with ${amount.asset.symbol} Amount`);
        return new Amount(this.asset, this.value.add(amount.value));
    }
    mul(factor) {
        return new Amount(this.asset, this.value.mul(factor));
    }
    /**
     * Return the internal representation as BigDecimal truncated at the Asset max precision.
     *
     * Favour the use of Amount arithmetic methods to guarantee the maximum precision.
     *
     * Use at your own risk.
     */
    toBigDecimal() {
        return this.value.toDecimalPlaces(this.asset.decimals, BigDecimal.ROUND_FLOOR);
    }
    toFixed(decimals = this.asset.decimals) {
        return this.value.toFixed(decimals);
    }
    toSignificantDigits(significantDigits = this.asset.decimals) {
        return this.value.toSignificantDigits(significantDigits).toString();
    }
    toNumber() {
        return this.value.toNumber();
    }
    isZero() {
        return this.value.isZero();
    }
    clone(value) {
        return Amount.from(this.asset, value);
    }
    static from(asset, value) {
        switch (typeof value) {
            case 'string':
            case 'number':
                return new Amount(asset, new BigDecimal(value));
            default:
                return new Amount(asset, value);
        }
    }
    static erc20(asset, value) {
        return this.from(asset, value);
    }
    static ether(value) {
        return this.from((0,Asset/* ether */.Xx)(), value);
    }
    static usd(value) {
        return this.from((0,Asset/* usd */.TE)(), value);
    }
    static matic(value) {
        return this.from((0,Asset/* matic */.B$)(), value);
    }
}
//# sourceMappingURL=Amount.js.map
;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/adapters/PendingTransactionGateway/schema/common.js


const Erc20Schema = lib.z.object({
    kind: lib.z.literal(Asset/* Kind.ERC20 */.hY.ERC20),
    name: lib.z.string(),
    decimals: lib.z.number(),
    symbol: lib.z.string(),
    address: lib.z.string(),
    chainType: lib.z.nativeEnum(ChainType/* ChainType */.J),
})
    .transform((value) => (0,Asset/* erc20 */.mV)(value));
const Erc20AmountSchema = lib.z.object({
    asset: Erc20Schema,
    value: lib.z.string(),
})
    .transform((value) => Amount.erc20(value.asset, value.value));

;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/adapters/PendingTransactionGateway/schema/erc20.js




const TokenAllowanceRequestSchema = lib.z.object({
    amount: Erc20AmountSchema,
    spender: lib.z.string(),
    limit: lib.z.nativeEnum(TokenAllowanceLimit),
    kind: lib.z.literal(TransactionKind.APPROVE_MODULE),
});

;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/profile/UpdateFollowPolicy.js

var FollowPolicyType;
(function (FollowPolicyType) {
    FollowPolicyType["ONLY_PROFILE_OWNERS"] = "ONLY_PROFILE_OWNERS";
    FollowPolicyType["CHARGE"] = "CHARGE";
    FollowPolicyType["ANYONE"] = "ANYONE";
    FollowPolicyType["NO_ONE"] = "NO_ONE";
})(FollowPolicyType || (FollowPolicyType = {}));
class UpdateFollowPolicy extends (/* unused pure expression or super */ null && (ProtocolCallUseCase)) {
}
//# sourceMappingURL=UpdateFollowPolicy.js.map
;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/adapters/PendingTransactionGateway/schema/profiles.js




const CreateProfileRequestSchema = lib.z.object({
    handle: lib.z.string(),
    kind: lib.z.literal(TransactionKind.CREATE_PROFILE),
});
const FollowRequestFeeSchema = lib.z.object({
    amount: Erc20AmountSchema,
    contractAddress: lib.z.string(),
    recipient: lib.z.string(),
});
const UnconstrainedFollowRequestSchema = lib.z.object({
    followerAddress: lib.z.string(),
    profileId: lib.z.string(),
    kind: lib.z.literal(TransactionKind.FOLLOW_PROFILES),
});
const PaidFollowRequestSchema = lib.z.object({
    followerAddress: lib.z.string(),
    profileId: lib.z.string(),
    kind: lib.z.literal(TransactionKind.FOLLOW_PROFILES),
    fee: FollowRequestFeeSchema,
});
const ProfileOwnerFollowRequestSchema = lib.z.object({
    followerAddress: lib.z.string(),
    profileId: lib.z.string(),
    kind: lib.z.literal(TransactionKind.FOLLOW_PROFILES),
    followerProfileId: lib.z.string(),
});
const UnfollowRequestSchema = lib.z.object({
    profileId: lib.z.string(),
    kind: lib.z.literal(TransactionKind.UNFOLLOW_PROFILE),
});
const UpdateCoverImageRequestSchema = lib.z.object({
    profileId: lib.z.string(),
    url: lib.z.string().nullable(),
    delegate: lib.z.boolean(),
    kind: lib.z.literal(TransactionKind.UPDATE_COVER_IMAGE),
});
const UpdateDispatcherConfigRequestSchema = lib.z.object({
    profileId: lib.z.string(),
    enabled: lib.z.boolean(),
    kind: lib.z.literal(TransactionKind.UPDATE_DISPATCHER_CONFIG),
});
const ChargeFollowPolicySchema = lib.z.object({
    type: lib.z.literal(FollowPolicyType.CHARGE),
    amount: Erc20AmountSchema,
    recipient: lib.z.string(),
});
const NoFeeFollowPolicySchema = lib.z.object({
    type: lib.z.union([
        lib.z.literal(FollowPolicyType.ANYONE),
        lib.z.literal(FollowPolicyType.ONLY_PROFILE_OWNERS),
        lib.z.literal(FollowPolicyType.NO_ONE),
    ]),
});
const UpdateFollowPolicyRequestSchema = lib.z.object({
    profileId: lib.z.string(),
    policy: lib.z.union([ChargeFollowPolicySchema, NoFeeFollowPolicySchema]),
    kind: lib.z.literal(TransactionKind.UPDATE_FOLLOW_POLICY),
});
const ProfileDetailsSchema = lib.z.object({
    name: lib.z.string(),
    bio: lib.z.string().nullable(),
    location: lib.z.string().nullable(),
    website: lib.z.string().nullable(),
    twitter: lib.z.string().nullable(),
});
const UpdateProfileDetailsRequestSchema = lib.z.object({
    profileId: lib.z.string(),
    details: ProfileDetailsSchema,
    kind: lib.z.literal(TransactionKind.UPDATE_PROFILE_DETAILS),
    delegate: lib.z.boolean(),
});
const NftOwnershipSignatureSchema = lib.z.object({
    id: lib.z.string(),
    signature: lib.z.string(),
});
const UpdateNftProfileImageRequestSchema = lib.z.object({
    kind: lib.z.literal(TransactionKind.UPDATE_PROFILE_IMAGE),
    profileId: lib.z.string(),
    signature: NftOwnershipSignatureSchema,
});
const UpdateOffChainProfileImageRequestSchema = lib.z.object({
    url: lib.z.string(),
    kind: lib.z.literal(TransactionKind.UPDATE_PROFILE_IMAGE),
    profileId: lib.z.string(),
});

;// CONCATENATED MODULE: ../../packages/domain/dist/esm/entities/Publication.js
var PublicationType;
(function (PublicationType) {
    PublicationType["MIRROR"] = "mirror";
    PublicationType["POST"] = "post";
    PublicationType["COMMENT"] = "comment";
})(PublicationType || (PublicationType = {}));
var ReactionType;
(function (ReactionType) {
    ReactionType["UPVOTE"] = "upvote";
    ReactionType["DOWNVOTE"] = "downvote";
})(ReactionType || (ReactionType = {}));
//# sourceMappingURL=Publication.js.map
;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/publications/types.js
var ContentFocus;
(function (ContentFocus) {
    ContentFocus["TEXT"] = "TextOnly";
    ContentFocus["IMAGE"] = "Image";
    ContentFocus["VIDEO"] = "Video";
    ContentFocus["AUDIO"] = "Audio";
    ContentFocus["ARTICLE"] = "Article";
})(ContentFocus || (ContentFocus = {}));
var NftAttributeDisplayType;
(function (NftAttributeDisplayType) {
    NftAttributeDisplayType["Number"] = "Number";
    NftAttributeDisplayType["String"] = "String";
    NftAttributeDisplayType["Date"] = "Date";
})(NftAttributeDisplayType || (NftAttributeDisplayType = {}));
var ReferencePolicy;
(function (ReferencePolicy) {
    ReferencePolicy["ANYBODY"] = "ANYBODY";
    ReferencePolicy["FOLLOWERS_ONLY"] = "FOLLOWERS_ONLY";
})(ReferencePolicy || (ReferencePolicy = {}));
var CollectPolicyType;
(function (CollectPolicyType) {
    CollectPolicyType["CHARGE"] = "CHARGE";
    CollectPolicyType["FREE"] = "FREE";
    CollectPolicyType["NO_COLLECT"] = "NO_COLLECT";
})(CollectPolicyType || (CollectPolicyType = {}));
//# sourceMappingURL=types.js.map
;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/types.js
var ImageType;
(function (ImageType) {
    ImageType["JPEG"] = "image/jpeg";
    ImageType["PNG"] = "image/png";
    ImageType["WEBP"] = "image/webp";
    ImageType["GIF"] = "image/gif";
})(ImageType || (ImageType = {}));
var VideoType;
(function (VideoType) {
    VideoType["MP4"] = "video/mp4";
})(VideoType || (VideoType = {}));
var AudioType;
(function (AudioType) {
    AudioType["WAV"] = "audio/wav";
    AudioType["MP3"] = "audio/mpeg";
    AudioType["OGG"] = "audio/ogg";
})(AudioType || (AudioType = {}));
const FileType = { ...ImageType, ...VideoType, ...AudioType };
//# sourceMappingURL=types.js.map
;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/publications/config.js

const SUPPORTED_PUBLICATION_MEDIA_TYPES = [
    ImageType.PNG,
    ImageType.JPEG,
    ImageType.GIF,
    ImageType.WEBP,
    VideoType.MP4,
    AudioType.MP3,
    AudioType.OGG,
    AudioType.WAV,
];
//# sourceMappingURL=config.js.map
;// CONCATENATED MODULE: ../../packages/domain/dist/esm/use-cases/publications/CollectPublication.js

var CollectType;
(function (CollectType) {
    CollectType[CollectType["FREE"] = 0] = "FREE";
    CollectType[CollectType["PAID"] = 1] = "PAID";
})(CollectType || (CollectType = {}));
function isPaidCollectRequest(request) {
    return request.type === CollectType.PAID;
}
class CollectPublication {
    tokenAvailability;
    signedFlow;
    signlessFlow;
    collectPublicationPresenter;
    constructor(tokenAvailability, signedFlow, signlessFlow, collectPublicationPresenter) {
        this.tokenAvailability = tokenAvailability;
        this.signedFlow = signedFlow;
        this.signlessFlow = signlessFlow;
        this.collectPublicationPresenter = collectPublicationPresenter;
    }
    async execute(request) {
        if (isPaidCollectRequest(request)) {
            const result = await this.tokenAvailability.checkAvailability({
                amount: request.fee.amount,
                spender: request.fee.contractAddress,
            });
            if (result.isFailure()) {
                this.collectPublicationPresenter.present(failure(result.error));
                return;
            }
            await this.signedFlow.execute(request);
            return;
        }
        await this.signlessFlow.execute(request);
    }
}
//# sourceMappingURL=CollectPublication.js.map
;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/adapters/PendingTransactionGateway/schema/publications.js




const NftAttributeSchema = lib.z.union([
    lib.z.object({
        displayType: lib.z.literal(NftAttributeDisplayType.Date),
        value: lib.z.date(),
        traitType: lib.z.string(),
    }),
    lib.z.object({
        displayType: lib.z.literal(NftAttributeDisplayType.Number),
        value: lib.z.number(),
        traitType: lib.z.string(),
    }),
    lib.z.object({
        displayType: lib.z.literal(NftAttributeDisplayType.String),
        value: lib.z.string(),
        traitType: lib.z.string(),
    }),
]);
const NftMetadataSchema = lib.z.object({
    name: lib.z.string(),
    description: lib.z.string().optional(),
    attributes: lib.z.array(NftAttributeSchema),
});
const ChargeCollectPolicySchema = lib.z.object({
    type: lib.z.literal(CollectPolicyType.CHARGE),
    fee: Erc20AmountSchema,
    recipient: lib.z.string(),
    metadata: NftMetadataSchema,
    mirrorReward: lib.z.number(),
    collectLimit: lib.z.number().optional(),
    timeLimited: lib.z.boolean(),
    followersOnly: lib.z.boolean(),
});
const FreeCollectPolicySchema = lib.z.object({
    type: lib.z.literal(CollectPolicyType.FREE),
    metadata: NftMetadataSchema,
    followersOnly: lib.z.boolean(),
});
const NoCollectPolicySchema = lib.z.object({
    type: lib.z.literal(CollectPolicyType.NO_COLLECT),
});
const CollectPolicySchema = lib.z.union([
    ChargeCollectPolicySchema,
    FreeCollectPolicySchema,
    NoCollectPolicySchema,
]);
const MediaSchema = lib.z.object({
    url: lib.z.string(),
    mimeType: lib.z.string()
        .refine((val) => SUPPORTED_PUBLICATION_MEDIA_TYPES.some((media) => media === val), {
        message: 'Media type not supported',
    }),
});
const CreatePostRequestSchema = lib.z.object({
    content: lib.z.string().optional(),
    contentFocus: lib.z.nativeEnum(ContentFocus),
    media: lib.z.array(MediaSchema).optional(),
    reference: lib.z.nativeEnum(ReferencePolicy),
    collect: CollectPolicySchema,
    profileId: lib.z.string(),
    kind: lib.z.literal(TransactionKind.CREATE_POST),
    locale: lib.z.string(),
    delegate: lib.z.boolean(),
});
const CreateCommentRequestSchema = lib.z.object({
    publicationId: lib.z.string(),
    content: lib.z.string().optional(),
    contentFocus: lib.z.nativeEnum(ContentFocus),
    media: lib.z.array(MediaSchema).optional(),
    reference: lib.z.nativeEnum(ReferencePolicy),
    collect: CollectPolicySchema,
    profileId: lib.z.string(),
    kind: lib.z.literal(TransactionKind.CREATE_COMMENT),
    locale: lib.z.string(),
    delegate: lib.z.boolean(),
});
const CreateMirrorRequestSchema = lib.z.object({
    profileId: lib.z.string(),
    publicationId: lib.z.string(),
    publicationType: lib.z.union([lib.z.literal(PublicationType.COMMENT), lib.z.literal(PublicationType.POST)]),
    kind: lib.z.literal(TransactionKind.MIRROR_PUBLICATION),
    delegate: lib.z.boolean(),
});
const FreeCollectRequestSchema = lib.z.object({
    profileId: lib.z.string(),
    type: lib.z.literal(CollectType.FREE),
    publicationId: lib.z.string(),
    publicationType: lib.z.nativeEnum(PublicationType),
    kind: lib.z.literal(TransactionKind.COLLECT_PUBLICATION),
});
const CollectFeeSchema = lib.z.object({
    amount: Erc20AmountSchema,
    contractAddress: lib.z.string(),
});
const PaidCollectRequestSchema = lib.z.object({
    profileId: lib.z.string(),
    type: lib.z.literal(CollectType.PAID),
    publicationId: lib.z.string(),
    publicationType: lib.z.nativeEnum(PublicationType),
    fee: CollectFeeSchema,
    kind: lib.z.literal(TransactionKind.COLLECT_PUBLICATION),
});

;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/adapters/PendingTransactionGateway/schema/index.js






const SupportedRequestModelSchema = lib.z.union([
    // CollectRequest schemas
    FreeCollectRequestSchema,
    PaidCollectRequestSchema,
    // FollowRequest schemas
    UnconstrainedFollowRequestSchema,
    PaidFollowRequestSchema,
    ProfileOwnerFollowRequestSchema,
    CreatePostRequestSchema,
    CreateCommentRequestSchema,
    CreateMirrorRequestSchema,
    CreateProfileRequestSchema,
    TokenAllowanceRequestSchema,
    UnfollowRequestSchema,
    UpdateCoverImageRequestSchema,
    UpdateDispatcherConfigRequestSchema,
    UpdateFollowPolicyRequestSchema,
    UpdateProfileDetailsRequestSchema,
    // UpdateProfileImageRequest schemas
    UpdateNftProfileImageRequestSchema,
    UpdateOffChainProfileImageRequestSchema,
]);
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Native"] = 0] = "Native";
    TransactionType[TransactionType["Meta"] = 1] = "Meta";
    TransactionType[TransactionType["Proxy"] = 2] = "Proxy";
})(TransactionType || (TransactionType = {}));
const MetaTransactionSchema = lib.z.object({
    type: lib.z.literal(TransactionType.Meta),
    chainType: lib.z.nativeEnum(ChainType/* ChainType */.J),
    id: lib.z.string(),
    indexingId: lib.z.string(),
    txHash: lib.z.string(),
    nonce: lib.z.number(),
    request: SupportedRequestModelSchema,
});
const NativeTransactionSchema = lib.z.object({
    type: lib.z.literal(TransactionType.Native),
    chainType: lib.z.nativeEnum(ChainType/* ChainType */.J),
    id: lib.z.string(),
    indexingId: lib.z.string().optional(),
    txHash: lib.z.string(),
    request: SupportedRequestModelSchema,
});
const ProxyTransactionSchema = lib.z.object({
    type: lib.z.literal(TransactionType.Proxy),
    chainType: lib.z.nativeEnum(ChainType/* ChainType */.J),
    id: lib.z.string(),
    proxyId: lib.z.string(),
    txHash: lib.z.string().optional(),
    status: lib.z.nativeEnum(ProxyActionStatus).optional(),
    request: SupportedRequestModelSchema,
});
const TransactionSchema = lib.z.union([
    MetaTransactionSchema,
    NativeTransactionSchema,
    ProxyTransactionSchema,
]);
const TransactionStorageSchema = lib.z.array(TransactionSchema);

;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/adapters/PendingTransactionGateway/PendingTransactionGateway.js




const lensHubTransactionKinds = [
    TransactionKind.COLLECT_PUBLICATION,
    TransactionKind.CREATE_COMMENT,
    TransactionKind.CREATE_POST,
    TransactionKind.FOLLOW_PROFILES,
    TransactionKind.MIRROR_PUBLICATION,
    TransactionKind.UPDATE_DISPATCHER_CONFIG,
    TransactionKind.UPDATE_PROFILE_IMAGE,
    TransactionKind.UPDATE_FOLLOW_POLICY,
];
const lensPeripheryTransactionKinds = [
    TransactionKind.UPDATE_COVER_IMAGE,
    TransactionKind.UPDATE_PROFILE_DETAILS,
];
const transactionKindToFilterGroup = {
    [TransactionKind.COLLECT_PUBLICATION]: lensHubTransactionKinds,
    [TransactionKind.CREATE_COMMENT]: lensHubTransactionKinds,
    [TransactionKind.CREATE_POST]: lensHubTransactionKinds,
    [TransactionKind.FOLLOW_PROFILES]: lensHubTransactionKinds,
    [TransactionKind.MIRROR_PUBLICATION]: lensHubTransactionKinds,
    [TransactionKind.UPDATE_DISPATCHER_CONFIG]: lensHubTransactionKinds,
    [TransactionKind.UPDATE_PROFILE_IMAGE]: lensHubTransactionKinds,
    [TransactionKind.UPDATE_FOLLOW_POLICY]: lensHubTransactionKinds,
    [TransactionKind.UPDATE_COVER_IMAGE]: lensPeripheryTransactionKinds,
    [TransactionKind.UPDATE_PROFILE_DETAILS]: lensPeripheryTransactionKinds,
    [TransactionKind.APPROVE_MODULE]: [],
    [TransactionKind.CREATE_PROFILE]: [],
    [TransactionKind.UNFOLLOW_PROFILE]: [],
};
function isSerializableMetaTransaction(tx) {
    return tx instanceof MetaTransaction;
}
function toTransactionSchema(tx) {
    if (tx instanceof MetaTransaction) {
        const data = tx.toTransactionData();
        if (data === null) {
            return null;
        }
        return {
            type: TransactionType.Meta,
            ...data,
        };
    }
    if (tx instanceof NativeTransaction) {
        const data = tx.toTransactionData();
        if (data === null) {
            return null;
        }
        return {
            type: TransactionType.Native,
            ...data,
        };
    }
    if (tx instanceof ProxyTransaction) {
        const data = tx.toTransactionData();
        if (data === null) {
            return null;
        }
        return {
            type: TransactionType.Proxy,
            ...data,
        };
    }
    assertNever(tx, 'Transaction type not supported');
}
class PendingTransactionGateway {
    storage;
    transactionFactory;
    cache;
    constructor(storage, transactionFactory) {
        this.storage = storage;
        this.transactionFactory = transactionFactory;
    }
    async save(tx) {
        const transactions = await this.getAll();
        const newTransactions = [...transactions];
        const idx = transactions.findIndex((entry) => entry.id === tx.id);
        if (idx > -1) {
            newTransactions.splice(idx, 1, tx);
            await this.update(newTransactions);
            return;
        }
        if (tx instanceof MetaTransaction) {
            const expectedNonce = await this.getNextMetaTransactionNonceFor(tx.request.kind);
            if (expectedNonce) {
                (0,invariant/* invariant */.k)(expectedNonce === tx.nonce, `Nonce mismatch, was expecting ${expectedNonce}, got ${tx.nonce}`);
            }
        }
        newTransactions.unshift(tx);
        await this.update(newTransactions);
    }
    async remove(id) {
        const transactions = await this.getAll();
        await this.update(transactions.filter((tx) => tx.id !== id));
    }
    async getAll() {
        if (this.cache) {
            return this.cache.slice();
        }
        const data = await this.storage.get();
        if (data === null) {
            return [];
        }
        return data.map((entry) => this.toEntity(entry));
    }
    async getNextMetaTransactionNonceFor(kind) {
        const all = await this.getAll();
        if (all.length === 0) {
            return undefined;
        }
        const metaTransactions = all.filter(isSerializableMetaTransaction);
        if (metaTransactions.length === 0) {
            return undefined;
        }
        if (kind in transactionKindToFilterGroup) {
            const filter = transactionKindToFilterGroup[kind];
            const firstOfKind = metaTransactions.find((tx) => filter.includes(tx.request.kind));
            return firstOfKind ? firstOfKind.nonce + 1 : undefined;
        }
        return undefined;
    }
    subscribe(subscriber) {
        this.storage.subscribe(async (newData, oldData) => {
            if (newData === null) {
                return;
            }
            const updatedTransactions = newData.map((entry) => this.toEntity(entry));
            const previousTransactions = oldData?.map((entry) => this.toEntity(entry)) ?? [];
            const newTransaction = differenceBy(updatedTransactions, previousTransactions, (tx) => tx.id);
            if (newTransaction.length > 0) {
                subscriber(newTransaction);
            }
        });
    }
    async update(transactions) {
        this.cache = transactions;
        const data = transactions
            .map(toTransactionSchema)
            .filter((v) => v !== null);
        await this.storage.set(data);
    }
    toEntity(data) {
        switch (data.type) {
            case TransactionType.Meta:
                data;
                return this.transactionFactory.createMetaTransaction(data);
            case TransactionType.Native:
                return this.transactionFactory.createNativeTransaction(data);
            case TransactionType.Proxy:
                return this.transactionFactory.createProxyTransaction(data);
            default:
                assertNever(data, 'Transaction type not supported');
        }
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/adapters/ProtocolCallRelayer.js



class ProtocolCallRelayer {
    apolloClient;
    factory;
    logger;
    constructor(apolloClient, factory, logger) {
        this.apolloClient = apolloClient;
        this.factory = factory;
        this.logger = logger;
    }
    async relayProtocolCall(signedCall) {
        return this.factory.createMetaTransaction({
            chainType: ChainType/* ChainType.POLYGON */.J.POLYGON,
            signedCall,
            asyncRelayReceipt: this.broadcast(signedCall),
        });
    }
    async broadcast(signedCall) {
        try {
            const { data } = await this.apolloClient.mutate({
                mutation: generated/* BroadcastProtocolCallDocument */.LI,
                variables: {
                    request: {
                        id: signedCall.id,
                        signature: signedCall.signature,
                    },
                },
            });
            (0,invariant/* invariant */.k)(data, `Cannot relay transaction: ${signedCall.id}`);
            if (data.result.__typename === 'RelayError') {
                return Result_failure(new TransactionError(TransactionErrorReason.REJECTED));
            }
            return Result_success({
                indexingId: data.result.txId,
                txHash: data.result.txHash,
            });
        }
        catch (err) {
            this.logger.error(err, 'It was not possible to relay the transaction');
            return Result_failure(new TransactionError(TransactionErrorReason.CANNOT_EXECUTE));
        }
    }
}

// EXTERNAL MODULE: ../../node_modules/.pnpm/@apollo+client@3.7.1_47swblzip3hkvavljfwh7ztgne/node_modules/@apollo/client/main.cjs
var client_main = __webpack_require__(1859);
// EXTERNAL MODULE: ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/defaultTo.js
var defaultTo = __webpack_require__(8908);
// EXTERNAL MODULE: ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js
var isObject = __webpack_require__(3702);
;// CONCATENATED MODULE: ../../packages/shared-kernel/dist/esm/CausedError.js


/**
 * This subclass of Error supports chaining.
 * If available, it uses the built-in support for property `.cause`.
 * Otherwise, it sets it up itself.
 *
 * @see https://github.com/tc39/proposal-error-cause
 */
class CausedError extends Error {
    cause;
    constructor(message, options) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Error not yet properly typed
        super(message, options);
        if (isObject(options) && 'cause' in options && !('cause' in this)) {
            const cause = options.cause;
            this.cause = cause;
            if (typeof cause.stack === 'string') {
                this.stack = defaultTo(this.stack, '') + '\nCAUSE: ' + cause.stack;
            }
        }
    }
}
//# sourceMappingURL=CausedError.js.map
;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/adapters/TransactionQueuePresenter.js


var TxStatus;
(function (TxStatus) {
    TxStatus["BROADCASTING"] = "broadcasting";
    TxStatus["MINING"] = "mining";
    TxStatus["SETTLED"] = "settled";
    TxStatus["FAILED"] = "failed";
})(TxStatus || (TxStatus = {}));
const recentTransactions = (0,client_main.makeVar)([]);
class FailedTransactionError extends CausedError {
    data;
    constructor(cause, data) {
        super(`Failed ${data.request.kind} transaction due to ${cause.reason}`, { cause });
        this.data = data;
    }
}
class TransactionQueuePresenter {
    errorHandler;
    constructor(errorHandler) {
        this.errorHandler = errorHandler;
    }
    clearRecent() {
        const transactions = recentTransactions();
        const filteredTransactions = transactions.filter((tx) => tx.status !== TxStatus.FAILED && tx.status !== TxStatus.SETTLED);
        recentTransactions(filteredTransactions);
    }
    broadcasting(data) {
        this.addTransaction({
            id: data.id,
            status: TxStatus.BROADCASTING,
            request: data.request,
        });
    }
    mining(data) {
        if (recentTransactions().find(({ id }) => id === data.id)) {
            this.updateById(data.id, {
                ...data,
                status: TxStatus.MINING,
            });
        }
        else {
            this.addTransaction({
                id: data.id,
                status: TxStatus.MINING,
                request: data.request,
                txHash: data.txHash,
            });
        }
    }
    settled(data) {
        this.updateById(data.id, { status: TxStatus.SETTLED });
    }
    failed(error, data) {
        this.errorHandler(new FailedTransactionError(error, data));
        this.updateById(data.id, { status: TxStatus.FAILED });
    }
    addTransaction(data) {
        const transactions = recentTransactions();
        recentTransactions([data, ...transactions]);
    }
    updateById(id, update) {
        const transactions = recentTransactions();
        recentTransactions(transactions.map((data) => {
            if (id === data.id) {
                return {
                    ...data,
                    ...update,
                };
            }
            return data;
        }));
    }
}
const useRecentTransactionsVar = () => {
    return useReactiveVar(recentTransactions);
};
const useHasTransactionWith = (statuses, predicate) => {
    const transactions = useRecentTransactionsVar();
    const index = transactions.findIndex((txState) => statuses.includes(txState.status) && predicate(txState));
    return index > -1;
};
const useHasPendingTransaction = (predicate) => {
    return useHasTransactionWith([TxStatus.BROADCASTING, TxStatus.MINING], predicate);
};
const useHasSettledTransaction = (predicate) => {
    return useHasTransactionWith([TxStatus.SETTLED], predicate);
};

;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/infrastructure/TransactionFactory.js


class SerializableMetaTransaction extends MetaTransaction {
    state;
    reduce;
    constructor(state, reduce) {
        super();
        this.state = state;
        this.reduce = reduce;
    }
    toTransactionData() {
        if (this.state.txHash && this.state.indexingId) {
            return {
                chainType: this.state.chainType,
                id: this.state.id,
                indexingId: this.state.indexingId,
                nonce: this.state.nonce,
                request: this.state.request,
                txHash: this.state.txHash,
            };
        }
        return null;
    }
    get chainType() {
        return this.state.chainType;
    }
    get id() {
        return this.state.id;
    }
    get request() {
        return this.state.request;
    }
    get nonce() {
        return this.state.nonce;
    }
    get hash() {
        return this.state.txHash;
    }
    async waitNextEvent() {
        const result = await this.reduce(this.state);
        if (result.isSuccess()) {
            this.state = result.value.state;
            return Result_success(result.value.event);
        }
        return Result_failure(result.error);
    }
}
class SerializableProxyTransaction extends ProxyTransaction {
    state;
    reduce;
    constructor(state, reduce) {
        super();
        this.state = state;
        this.reduce = reduce;
    }
    toTransactionData() {
        if (this.state.txHash && this.state.proxyId) {
            return {
                chainType: this.state.chainType,
                id: this.state.id,
                proxyId: this.state.proxyId,
                request: this.state.request,
                txHash: this.state.txHash,
                status: this.state.status,
            };
        }
        return null;
    }
    get chainType() {
        return this.state.chainType;
    }
    get id() {
        return this.state.id;
    }
    get request() {
        return this.state.request;
    }
    get hash() {
        return this.state.txHash;
    }
    get status() {
        return this.state.status;
    }
    async waitNextEvent() {
        const result = await this.reduce(this.state);
        if (result.isSuccess()) {
            this.state = result.value.state;
            return Result_success(result.value.event);
        }
        return Result_failure(result.error);
    }
}
class SerializableNativeTransaction extends NativeTransaction {
    state;
    reduce;
    constructor(state, reduce) {
        super();
        this.state = state;
        this.reduce = reduce;
    }
    toTransactionData() {
        if (this.state.txHash) {
            return {
                chainType: this.state.chainType,
                id: this.state.id,
                indexingId: this.state.indexingId,
                request: this.state.request,
                txHash: this.state.txHash,
            };
        }
        return null;
    }
    get nonce() {
        throw new Error('Method not implemented.');
    }
    get chainType() {
        return this.state.chainType;
    }
    get id() {
        return this.state.id;
    }
    get request() {
        return this.state.request;
    }
    get hash() {
        return this.state?.txHash;
    }
    async waitNextEvent() {
        const result = await this.reduce(this.state);
        if (result.isSuccess()) {
            this.state = result.value.state;
            return Result_success(result.value.event);
        }
        return Result_failure(result.error);
    }
}
class TransactionFactory {
    transactionObserver;
    constructor(transactionObserver) {
        this.transactionObserver = transactionObserver;
    }
    createMetaTransaction(init) {
        if ('asyncRelayReceipt' in init) {
            return new SerializableMetaTransaction({
                chainType: init.chainType,
                id: init.signedCall.id,
                nonce: init.signedCall.nonce,
                request: init.signedCall.request,
            }, this.createProtocolCallStateReducer(init));
        }
        return new SerializableMetaTransaction({
            chainType: init.chainType,
            id: init.id,
            indexingId: init.indexingId,
            nonce: init.nonce,
            request: init.request,
            txHash: init.txHash,
        }, this.createProtocolCallStateReducer(init));
    }
    createNativeTransaction(init) {
        if ('asyncRelayReceipt' in init) {
            return new SerializableNativeTransaction({
                chainType: init.chainType,
                id: init.id,
                request: init.request,
            }, this.createProtocolCallStateReducer(init));
        }
        if (init.indexingId) {
            return new SerializableNativeTransaction({
                chainType: init.chainType,
                id: init.id,
                indexingId: init.indexingId,
                request: init.request,
                txHash: init.txHash,
            }, this.createProtocolCallStateReducer(init));
        }
        return new SerializableNativeTransaction({
            chainType: init.chainType,
            id: init.id,
            request: init.request,
            txHash: init.txHash,
        }, this.createPureBlockchainStateReducer(init));
    }
    createProxyTransaction(init) {
        return new SerializableProxyTransaction({
            chainType: init.chainType,
            id: init.id,
            proxyId: init.proxyId,
            request: init.request,
            txHash: init.txHash,
            status: init.status,
        }, this.createProxyActionStateReducer(init));
    }
    createProtocolCallStateReducer(init) {
        return async (state) => {
            if ('asyncRelayReceipt' in init) {
                const relayReceiptResult = await init.asyncRelayReceipt;
                if (relayReceiptResult.isFailure()) {
                    return Result_failure(relayReceiptResult.error);
                }
                if (state.txHash === undefined) {
                    return Result_success({
                        event: TransactionEvent.BROADCASTED,
                        state: {
                            ...state,
                            txHash: relayReceiptResult.value.txHash,
                            indexingId: relayReceiptResult.value.indexingId,
                        },
                    });
                }
            }
            (0,invariant/* invariant */.k)(state.indexingId, 'indexingId is required');
            const indexingEventResult = await this.transactionObserver.waitForNextIndexingEvent(state.indexingId);
            if (indexingEventResult.isFailure()) {
                return Result_failure(indexingEventResult.error);
            }
            if (indexingEventResult.value.indexed) {
                return Result_success({
                    event: TransactionEvent.SETTLED,
                    state: {
                        ...state,
                        txHash: indexingEventResult.value.txHash,
                    },
                });
            }
            return Result_success({
                event: TransactionEvent.UPGRADED,
                state: {
                    ...state,
                    txHash: indexingEventResult.value.txHash,
                },
            });
        };
    }
    createPureBlockchainStateReducer(init) {
        return async (state) => {
            const result = await this.transactionObserver.waitForExecuted(init.txHash, init.chainType);
            if (result.isFailure()) {
                return Result_failure(result.error);
            }
            return Result_success({
                event: TransactionEvent.SETTLED,
                state,
            });
        };
    }
    createProxyActionStateReducer(init) {
        return async (state) => {
            const result = await this.transactionObserver.waitForProxyTransactionStatus(init.proxyId);
            if (result.isFailure()) {
                return Result_failure(result.error);
            }
            switch (result.value.status) {
                case ProxyActionStatus.MINTING:
                    return Result_success({
                        event: state.status === ProxyActionStatus.MINTING
                            ? TransactionEvent.UPGRADED
                            : TransactionEvent.BROADCASTED,
                        state: {
                            ...state,
                            status: ProxyActionStatus.MINTING,
                            txHash: result.value.txHash,
                        },
                    });
                case ProxyActionStatus.TRANSFERRING:
                    return Result_success({
                        event: state.status === ProxyActionStatus.TRANSFERRING
                            ? TransactionEvent.UPGRADED
                            : TransactionEvent.BROADCASTED,
                        state: {
                            ...state,
                            status: ProxyActionStatus.TRANSFERRING,
                            txHash: result.value.txHash,
                        },
                    });
                case ProxyActionStatus.COMPLETE:
                    return Result_success({
                        event: TransactionEvent.SETTLED,
                        state: {
                            ...state,
                            status: ProxyActionStatus.COMPLETE,
                            txHash: result.value.txHash,
                        },
                    });
            }
        };
    }
}

;// CONCATENATED MODULE: ../../packages/api-bindings/dist/esm/graphql/utils/transaction.js
const isTransactionError = (publication) => {
    return publication.__typename === 'TransactionError';
};
function isProxyActionError(proxyActionResult) {
    return proxyActionResult.__typename === 'ProxyActionError';
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/infrastructure/TransactionObserver.js



const ONE_SECOND = 1000; // ms
function delay(waitInMs) {
    return new Promise((resolve) => setTimeout(resolve, waitInMs));
}
function indexingEvent({ indexed, txHash, }) {
    return {
        indexed,
        txHash,
    };
}
function resolveTransactionErrorReason(reason) {
    switch (reason) {
        case generated/* TransactionErrorReasons.Reverted */.oK.Reverted:
            return TransactionErrorReason.REVERTED;
        default:
            return TransactionErrorReason.UNKNOWN;
    }
}
class TransactionObserver {
    providerFactory;
    apolloClient;
    timings;
    constructor(providerFactory, apolloClient, timings) {
        this.providerFactory = providerFactory;
        this.apolloClient = apolloClient;
        this.timings = timings;
    }
    async waitForExecuted(txHash, chainType) {
        const provider = await this.providerFactory.createProvider({ chainType });
        const startedAt = Date.now();
        while (Date.now() - startedAt <= this.timings.maxMiningWaitTime) {
            const txResponse = await provider.getTransaction(txHash);
            if (txResponse === null) {
                await delay(ONE_SECOND);
                continue;
            }
            try {
                await Promise.race([
                    txResponse.wait(1),
                    delay(this.timings.maxMiningWaitTime).then(() => {
                        throw new TransactionError(TransactionErrorReason.MINING_TIMEOUT, txHash);
                    }),
                ]);
                return Result_success();
            }
            catch (e) {
                if (e instanceof TransactionError) {
                    return Result_failure(e);
                }
                throw e;
            }
        }
        return Result_failure(new TransactionError(TransactionErrorReason.MINING_TIMEOUT, txHash));
    }
    async waitForNextIndexingEvent(indexingId) {
        const startedAt = Date.now();
        const observable = this.apolloClient.watchQuery({
            query: generated/* HasTxHashBeenIndexedDocument */.Bz,
            variables: {
                request: { txId: indexingId },
            },
        });
        const firstResponse = await observable.result();
        if (isTransactionError(firstResponse.data.result)) {
            return Result_failure(new TransactionError(resolveTransactionErrorReason(firstResponse.data.result.reason)));
        }
        if (firstResponse.data.result.indexed) {
            return Result_success(indexingEvent(firstResponse.data.result));
        }
        const initialTxHash = firstResponse.data.result.txHash;
        observable.startPolling(this.timings.pollingPeriod);
        return new Promise((resolve, reject) => {
            const subscription = observable.subscribe({
                next: async (nextResponse) => {
                    if (nextResponse.error) {
                        subscription.unsubscribe();
                        reject(nextResponse.error);
                        return;
                    }
                    switch (nextResponse.data.result.__typename) {
                        case 'TransactionIndexedResult':
                            if (initialTxHash !== nextResponse.data.result.txHash ||
                                nextResponse.data.result.indexed) {
                                subscription.unsubscribe();
                                resolve(Result_success(indexingEvent(nextResponse.data.result)));
                                return;
                            }
                            break;
                        case 'TransactionError':
                            subscription.unsubscribe();
                            resolve(Result_failure(new TransactionError(resolveTransactionErrorReason(nextResponse.data.result.reason), initialTxHash)));
                    }
                    if (Date.now() - startedAt > this.timings.maxIndexingWaitTime) {
                        subscription.unsubscribe();
                        resolve(Result_failure(new TransactionError(TransactionErrorReason.INDEXING_TIMEOUT, initialTxHash)));
                    }
                },
                error: reject,
            });
        });
    }
    async waitForProxyTransactionStatus(proxyId) {
        const startedAt = Date.now();
        const observable = this.apolloClient.watchQuery({
            query: generated/* ProxyActionStatusDocument */.zl,
            variables: { proxyActionId: proxyId },
        });
        const firstResponse = await observable.result();
        if (isProxyActionError(firstResponse.data.result)) {
            return Result_failure(new TransactionError(TransactionErrorReason.UNKNOWN));
        }
        if (firstResponse.data.result.__typename === 'ProxyActionStatusResult' &&
            firstResponse.data.result.status === generated/* ProxyActionStatusTypes.Complete */.Jk.Complete) {
            return Result_success({
                txHash: firstResponse.data.result.txHash,
                status: ProxyActionStatus.COMPLETE,
                txId: firstResponse.data.result.txId,
            });
        }
        observable.startPolling(this.timings.pollingPeriod);
        return new Promise((resolve, reject) => {
            const subscription = observable.subscribe({
                next: async (nextResponse) => {
                    if (nextResponse.error) {
                        subscription.unsubscribe();
                        reject(nextResponse.error);
                        return;
                    }
                    switch (nextResponse.data.result.__typename) {
                        case 'ProxyActionStatusResult':
                            if (nextResponse.data.result.status === generated/* ProxyActionStatusTypes.Complete */.Jk.Complete) {
                                subscription.unsubscribe();
                                resolve(Result_success({
                                    txHash: nextResponse.data.result.txHash,
                                    status: ProxyActionStatus.COMPLETE,
                                    txId: nextResponse.data.result.txId,
                                }));
                                return;
                            }
                            break;
                        case 'ProxyActionError':
                            subscription.unsubscribe();
                            resolve(Result_failure(new TransactionError(resolveTransactionErrorReason(generated/* TransactionErrorReasons.Reverted */.oK.Reverted))));
                    }
                    // handle timeout as the last possible case, otherwise can fail with timeout on Complete tx
                    if (Date.now() - startedAt > this.timings.maxIndexingWaitTime) {
                        subscription.unsubscribe();
                        resolve(Result_failure(new TransactionError(TransactionErrorReason.INDEXING_TIMEOUT)));
                    }
                },
                error: reject,
            });
        });
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/transactions/infrastructure/TransactionStorage.js


const schema = new BaseStorageSchema('lens.transactions', TransactionStorageSchema);
function createTransactionStorage(storageProvider) {
    return Storage.createForSchema(schema, storageProvider);
}

// EXTERNAL MODULE: ../../packages/domain/dist/esm/use-cases/lifecycle/Bootstrap.js + 1 modules
var Bootstrap = __webpack_require__(9149);
;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/adapters/CredentialsFactory.js


class CredentialsFactory {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    async renewCredentials(credentials) {
        if (!credentials.canRefresh()) {
            return Result_failure(new Bootstrap/* CredentialsExpiredError */.N());
        }
        const newCredentials = await this.auth.refreshCredentials(credentials.refreshToken);
        return Result_success(newCredentials);
    }
    async issueCredentials(wallet) {
        const challenge = await this.auth.generateChallenge(wallet.address);
        const signedChallengeResult = await wallet.signMessage(challenge);
        if (signedChallengeResult.isFailure()) {
            return Result_failure(signedChallengeResult.error);
        }
        const credentials = await this.auth.generateCredentials(wallet.address, signedChallengeResult.value);
        return Result_success(credentials);
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/adapters/CredentialsGateway.js
class CredentialsGateway {
    credentialsStorage;
    constructor(credentialsStorage) {
        this.credentialsStorage = credentialsStorage;
    }
    async getCredentials() {
        return this.credentialsStorage.get();
    }
    async save(credentials) {
        await this.credentialsStorage.set(credentials);
    }
    async invalidate() {
        await this.credentialsStorage.reset();
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/adapters/LogoutPresenter.js
class LogoutPresenter {
    logoutHandler;
    constructor(logoutHandler) {
        this.logoutHandler = logoutHandler;
    }
    presentLogout(data) {
        this.logoutHandler(data);
    }
}

// EXTERNAL MODULE: ../../packages/domain/dist/esm/entities/Wallet.js
var Wallet = __webpack_require__(8337);
// EXTERNAL MODULE: external "ethers"
var external_ethers_ = __webpack_require__(1982);
;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/adapters/errors.js
function assertErrorObjectWithCode(error) {
    if (!Object.prototype.hasOwnProperty.call(error, 'code')) {
        throw error;
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/adapters/ConcreteWallet.js





const WalletDataSchema = lib.z.object({
    address: lib.z.string(),
    type: lib.z.nativeEnum(Wallet/* WalletType */.Sq),
});
class UnsignedLensProtocolCall {
    id;
    request;
    typedData;
    constructor(id, request, typedData) {
        this.id = id;
        this.request = request;
        this.typedData = typedData;
    }
    get nonce() {
        return this.typedData.value.nonce;
    }
}
class ConcreteWallet extends Wallet/* Wallet */.w5 {
    signerFactory;
    transactionFactory;
    signingInProgress = false;
    constructor(data, signerFactory, transactionFactory) {
        super(data.address, data.type);
        this.signerFactory = signerFactory;
        this.transactionFactory = transactionFactory;
    }
    async signProtocolCall(unsignedCall) {
        const result = await this.signerFactory.createSigner({
            address: this.address,
        });
        if (result.isFailure()) {
            return Result_failure(result.error);
        }
        if (this.signingInProgress) {
            return Result_failure(new Wallet/* PendingSigningRequestError */.A3());
        }
        this.signingInProgress = true;
        const signer = result.value;
        try {
            const signature = await signer._signTypedData(unsignedCall.typedData.domain, unsignedCall.typedData.types, unsignedCall.typedData.value);
            const signedCall = SignedProtocolCall.create({
                id: unsignedCall.id,
                request: unsignedCall.request,
                signature,
                nonce: unsignedCall.nonce,
            });
            return Result_success(signedCall);
        }
        catch (err) {
            assertErrorObjectWithCode(err);
            if (err.code === external_ethers_.errors.ACTION_REJECTED) {
                return Result_failure(new Wallet/* UserRejectedError */.Ai());
            }
            throw err;
        }
        finally {
            this.signingInProgress = false;
        }
    }
    async signMessage(message) {
        const result = await this.signerFactory.createSigner({
            address: this.address,
        });
        if (result.isFailure()) {
            return Result_failure(result.error);
        }
        if (this.signingInProgress) {
            return Result_failure(new Wallet/* PendingSigningRequestError */.A3());
        }
        this.signingInProgress = true;
        const signer = result.value;
        try {
            return Result_success(await signer.signMessage(message));
        }
        catch (err) {
            assertErrorObjectWithCode(err);
            if (err.code === external_ethers_.errors.ACTION_REJECTED) {
                return Result_failure(new Wallet/* UserRejectedError */.Ai());
            }
            throw err;
        }
        finally {
            this.signingInProgress = false;
        }
    }
    async sendTransaction(unsignedTransaction) {
        const result = await this.signerFactory.createSigner({
            address: this.address,
            chainType: unsignedTransaction.chainType,
        });
        if (result.isFailure()) {
            return Result_failure(result.error);
        }
        if (this.signingInProgress) {
            return Result_failure(new Wallet/* PendingSigningRequestError */.A3());
        }
        this.signingInProgress = true;
        const signer = result.value;
        try {
            const response = await signer.sendTransaction(unsignedTransaction.transactionRequest);
            const transaction = this.transactionFactory.createNativeTransaction({
                chainType: unsignedTransaction.chainType,
                id: unsignedTransaction.id,
                request: unsignedTransaction.request,
                txHash: response.hash,
            });
            return Result_success(transaction);
        }
        catch (err) {
            assertErrorObjectWithCode(err);
            switch (err.code) {
                case external_ethers_.errors.ACTION_REJECTED:
                    return Result_failure(new Wallet/* UserRejectedError */.Ai(err.message));
                case external_ethers_.errors.INSUFFICIENT_FUNDS:
                    return Result_failure(new Wallet/* InsufficientGasError */.gr((0,Asset/* matic */.B$)()));
            }
            throw err;
        }
        finally {
            this.signingInProgress = false;
        }
    }
    toWalletData() {
        return {
            address: this.address,
            type: this.type,
        };
    }
    static create(data, signerFactory, transactionFactory) {
        return new ConcreteWallet(data, signerFactory, transactionFactory);
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/adapters/WalletFactory.js

class WalletFactory {
    signerFactory;
    transactionFactory;
    constructor(signerFactory, transactionFactory) {
        this.signerFactory = signerFactory;
        this.transactionFactory = transactionFactory;
    }
    async create(request) {
        return ConcreteWallet.create(request, this.signerFactory, this.transactionFactory);
    }
    rehydrate(data) {
        return ConcreteWallet.create(data, this.signerFactory, this.transactionFactory);
    }
}

;// CONCATENATED MODULE: ../../packages/shared-kernel/dist/esm/ts-helpers/never.js
function never(message = 'Unexpected call to never()') {
    throw new Error(message);
}
//# sourceMappingURL=never.js.map
;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/adapters/WalletGateway.js



const WalletStorageSchema = lib.z.array(WalletDataSchema);
class WalletGateway {
    storage;
    factory;
    inMemoryCache = {};
    constructor(storage, factory) {
        this.storage = storage;
        this.factory = factory;
    }
    async getByAddress(address) {
        if (this.inMemoryCache[address]) {
            return this.inMemoryCache[address] ?? never();
        }
        const wallets = await this.getAll();
        const wallet = wallets.find((w) => w.address === address) ?? null;
        if (wallet) {
            this.inMemoryCache[address] = wallet;
        }
        return wallet;
    }
    async reset() {
        await this.storage.set([]);
    }
    async save(wallet) {
        const wallets = await this.getAll();
        this.inMemoryCache[wallet.address] = wallet;
        await this.storage.set(wallets.concat([wallet]).map((w) => w.toWalletData()));
    }
    async getAll() {
        const data = await this.storage.get();
        if (data === null) {
            return [];
        }
        return data.map((d) => this.factory.rehydrate(d));
    }
}

;// CONCATENATED MODULE: ../../packages/shared-kernel/dist/esm/Deferred.js
/**
 * Unwraps the promise to allow resolving/rejecting outside the Promise constructor
 */
class Deferred {
    promise;
    resolve;
    reject;
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
//# sourceMappingURL=Deferred.js.map
;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/infrastructure/AccessTokenStorage.js


class AccessTokenStorage {
    authApi;
    credentialsStorage;
    isRefreshing = false;
    pendingRequests = [];
    listeners = new Set();
    constructor(authApi, credentialsStorage) {
        this.authApi = authApi;
        this.credentialsStorage = credentialsStorage;
    }
    onExpiry(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }
    getAccessToken() {
        return this.credentialsStorage.getAccessToken();
    }
    async refreshToken() {
        if (this.isRefreshing) {
            const deferredPromise = new Deferred();
            this.pendingRequests.push(deferredPromise);
            return deferredPromise.promise;
        }
        this.isRefreshing = true;
        const credentials = await this.credentialsStorage.get();
        if (credentials && credentials.canRefresh()) {
            await this.refreshCredentials(credentials);
            this.isRefreshing = false;
            return;
        }
        this.rejectPendingRequests();
        this.isRefreshing = false;
        this.emitExpiryEvent();
        throw new Bootstrap/* CredentialsExpiredError */.N();
    }
    async refreshCredentials(credentials) {
        const newCredentials = await this.authApi.refreshCredentials(credentials.refreshToken);
        await this.credentialsStorage.set(newCredentials);
        this.pendingRequests.map((request) => request.resolve());
        this.pendingRequests = [];
    }
    rejectPendingRequests() {
        this.pendingRequests.map((request) => request.reject(new Bootstrap/* CredentialsExpiredError */.N()));
        this.pendingRequests = [];
    }
    emitExpiryEvent() {
        this.listeners.forEach((callback) => callback());
    }
}

;// CONCATENATED MODULE: ../../packages/shared-kernel/dist/esm/DateUtils.js
class DateUtils {
    static toUnix(date) {
        if (date instanceof Date) {
            return date.getTime();
        }
        if (typeof date === 'string') {
            return new Date(date).getTime();
        }
        return date;
    }
    static toISOString(date) {
        if (typeof date === 'string' || typeof date === 'number') {
            return new Date(date).toISOString();
        }
        return date.toISOString();
    }
    static unix() {
        return Date.now();
    }
    static unixInSeconds() {
        return this.unix() / 1000;
    }
    static hoursToMs(hours) {
        return this.minutesToMs(hours * 60);
    }
    static minutesToMs(minutes) {
        return minutes * 6 * 10 * 1000;
    }
    static secondsToMs(seconds) {
        return seconds * 1000;
    }
}
//# sourceMappingURL=DateUtils.js.map
// EXTERNAL MODULE: ../../node_modules/.pnpm/jwt-decode@3.1.2/node_modules/jwt-decode/build/jwt-decode.cjs.js
var jwt_decode_cjs = __webpack_require__(6942);
;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/adapters/Credentials.js



function assertIdInJwt(decodedJwt) {
    if (isObject(decodedJwt) && !('id' in decodedJwt)) {
        throw new invariant/* InvariantError */.e('Invalid JWT format.');
    }
}
// Threshold in seconds that will mark token as expired even it's still valid
// Adds some time for all communications that's required to refresh tokens
const TOKEN_EXP_THRESHOLD = DateUtils.secondsToMs(3);
class Credentials {
    accessToken;
    refreshToken;
    address;
    constructor(accessToken, refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        const decodedRefreshToken = jwt_decode_cjs(refreshToken);
        assertIdInJwt(decodedRefreshToken);
        this.address = decodedRefreshToken.id;
    }
    canRefresh() {
        const now = Date.now();
        const tokenExpDate = this.getTokenExpDate(this.refreshToken);
        return now < tokenExpDate - TOKEN_EXP_THRESHOLD;
    }
    isExpired() {
        const accessToken = this.accessToken;
        if (!accessToken) {
            return true;
        }
        const now = Date.now();
        const tokenExpDate = this.getTokenExpDate(accessToken);
        return now >= tokenExpDate - TOKEN_EXP_THRESHOLD;
    }
    getAccessTokenExpDate() {
        const accessToken = this.accessToken;
        if (!accessToken) {
            return null;
        }
        return this.getTokenExpDate(accessToken);
    }
    getTokenExpDate(token) {
        const decodedToken = jwt_decode_cjs(token);
        (0,invariant/* invariant */.k)(decodedToken.exp, 'Exp date should be provided by JWT token');
        return DateUtils.secondsToMs(decodedToken.exp);
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/infrastructure/AuthApi.js



class AuthApi {
    apolloClient;
    constructor(apolloClient) {
        this.apolloClient = apolloClient;
    }
    async generateChallenge(address) {
        const result = await this.apolloClient.query({
            query: generated/* AuthChallengeDocument */.ON,
            variables: { address },
            // challenge to sign should be always a new one
            fetchPolicy: 'network-only',
        });
        return result.data.result.text;
    }
    async generateCredentials(address, signature) {
        const result = await this.apolloClient.mutate({ mutation: generated/* AuthAuthenticateDocument */.UC, variables: { address, signature } });
        (0,invariant/* invariant */.k)(result.data, 'Not able to generate credentials. Credentials data not found.');
        const { accessToken, refreshToken } = result.data.result;
        return new Credentials(accessToken, refreshToken);
    }
    async refreshCredentials(refreshToken) {
        const result = await this.apolloClient.mutate({ mutation: generated/* AuthRefreshDocument */.zv, variables: { refreshToken } });
        (0,invariant/* invariant */.k)(result.data, 'Not able to refresh credentials. Credentials data not found.');
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data.result;
        return new Credentials(newAccessToken, newRefreshToken);
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/infrastructure/CredentialsStorage.js



const AuthData = lib.z.object({
    refreshToken: lib.z.string(),
});
const authStorageSchema = new BaseStorageSchema('lens.credentials', AuthData);
/**
 * Stores auth credentials.
 * Access token is kept in memory.
 * Refresh token is persisted permanently.
 */
class CredentialsStorage {
    refreshTokenStorage;
    accessToken = null;
    constructor(storageProvider) {
        this.refreshTokenStorage = Storage.createForSchema(authStorageSchema, storageProvider);
    }
    async set({ accessToken, refreshToken }) {
        this.accessToken = accessToken;
        await this.refreshTokenStorage.set({ refreshToken });
    }
    async get() {
        const refreshToken = await this.getRefreshToken();
        if (!refreshToken) {
            return null;
        }
        const accessToken = this.getAccessToken();
        return new Credentials(accessToken, refreshToken);
    }
    async reset() {
        this.accessToken = null;
        await this.refreshTokenStorage.reset();
    }
    subscribe(_) {
        throw new Error('Method not implemented.');
    }
    getAccessToken() {
        return this.accessToken;
    }
    async getRefreshToken() {
        const result = await this.refreshTokenStorage.get();
        return result?.refreshToken ?? null;
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/infrastructure/NotificationStorage.js


const UnreadNotificationsData = lib.z.object({
    totalReadNotificationsCount: lib.z.number().nullable(),
});
const notificationStorageDataSchema = new BaseStorageSchema('lens.notifications', UnreadNotificationsData);
function createNotificationStorage(storageProvider) {
    return Storage.createForSchema(notificationStorageDataSchema, storageProvider);
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/infrastructure/ProviderFactory.js

class ProviderFactory {
    bindings;
    chains;
    constructor(bindings, chains) {
        this.bindings = bindings;
        this.chains = chains;
    }
    async createProvider(config) {
        const chainId = this.chains[config.chainType].chainId;
        const provider = await this.bindings.getProvider({ chainId });
        const network = await provider.getNetwork();
        (0,invariant/* invariant */.k)(network.chainId === chainId, `Invalid chainId. Expected ${chainId} but got ${network.chainId}`);
        return provider;
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/infrastructure/SignerFactory.js



function isTheSameAddress(address1, address2) {
    // lowercase before comparing to avoid comparing checksum address with a normal one
    return address1.toLowerCase() === address2.toLowerCase();
}
class SignerFactory {
    bindings;
    chains;
    constructor(bindings, chains) {
        this.bindings = bindings;
        this.chains = chains;
    }
    async createSigner({ address, chainType, }) {
        const chainId = chainType ? this.chains[chainType].chainId : undefined;
        const signer = await this.bindings.getSigner({ chainId });
        const signerAddress = await signer.getAddress();
        if (!isTheSameAddress(address, signerAddress)) {
            return Result_failure(new Wallet/* WalletConnectionError */.$w(Wallet/* WalletConnectionErrorReason.WRONG_ACCOUNT */.pj.WRONG_ACCOUNT));
        }
        if (chainType) {
            const signerChainId = await signer.getChainId();
            if (signerChainId !== chainId) {
                const chainConfig = this.createAddEthereumChainParameter(chainType);
                await this.addChain(signer, chainConfig);
                const result = await this.switchChain(signer, chainConfig);
                if (result.isFailure()) {
                    return Result_failure(result.error);
                }
            }
        }
        return Result_success(signer);
    }
    createAddEthereumChainParameter(chainType) {
        const chainConfig = this.chains[chainType];
        return {
            chainId: external_ethers_.utils.hexValue(chainConfig.chainId),
            chainName: chainConfig.name,
            nativeCurrency: {
                name: chainConfig.nativeCurrency.name,
                symbol: chainConfig.nativeCurrency.symbol,
                decimals: chainConfig.nativeCurrency.decimals,
            },
            rpcUrls: [chainConfig.rpcUrl],
            blockExplorerUrls: [chainConfig.blockExplorer],
        };
    }
    async addChain(signer, chainConfig) {
        try {
            await signer.provider.send('wallet_addEthereumChain', [chainConfig]);
        }
        catch {
            // noop
        }
    }
    async switchChain(signer, chainConfig) {
        try {
            await signer.provider.send('wallet_switchEthereumChain', [{ chainId: chainConfig.chainId }]);
            return Result_success();
        }
        catch {
            return Result_failure(new Wallet/* WalletConnectionError */.$w(Wallet/* WalletConnectionErrorReason.INCORRECT_CHAIN */.pj.INCORRECT_CHAIN));
        }
    }
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/wallet/infrastructure/WalletStorage.js


const walletStorageDataSchema = new BaseStorageSchema('lens.wallets', WalletStorageSchema);
function createWalletStorage(storageProvider) {
    return Storage.createForSchema(walletStorageDataSchema, storageProvider);
}

;// CONCATENATED MODULE: ../../packages/react/dist/esm/shared.js
































function createSharedDependencies(config, { onLogout, onError }) {
    const logger = config.logger ?? new ConsoleLogger();
    // storages
    const activeProfileStorage = createActiveProfileStorage(config.storage);
    const credentialsStorage = new CredentialsStorage(config.storage);
    const walletStorage = createWalletStorage(config.storage);
    const notificationStorage = createNotificationStorage(config.storage);
    const transactionStorage = createTransactionStorage(config.storage);
    // apollo client
    const anonymousApolloClient = createAnonymousApolloClient({
        backendURL: config.environment.backend,
    });
    const authApi = new AuthApi(anonymousApolloClient);
    const accessTokenStorage = new AccessTokenStorage(authApi, credentialsStorage);
    const apolloClient = createApolloClient({
        backendURL: config.environment.backend,
        accessTokenStorage,
    });
    // adapters
    const providerFactory = new ProviderFactory(config.bindings, config.environment.chains);
    const transactionObserver = new TransactionObserver(providerFactory, apolloClient, config.environment.timings);
    const transactionFactory = new TransactionFactory(transactionObserver);
    const transactionGateway = new PendingTransactionGateway(transactionStorage, transactionFactory);
    const signerFactory = new SignerFactory(config.bindings, config.environment.chains);
    const credentialsFactory = new CredentialsFactory(authApi);
    const credentialsGateway = new CredentialsGateway(credentialsStorage);
    const walletFactory = new WalletFactory(signerFactory, transactionFactory);
    const walletGateway = new WalletGateway(walletStorage, walletFactory);
    const profileGateway = new ProfileGateway(apolloClient);
    const activeProfileGateway = new ActiveProfileGateway(activeProfileStorage);
    const activeProfilePresenter = new ActiveProfilePresenter/* ActiveProfilePresenter */.X(apolloClient);
    const logoutPresenter = new LogoutPresenter(onLogout);
    const responders = {
        [TransactionKind.APPROVE_MODULE]: new NoopResponder(),
        [TransactionKind.COLLECT_PUBLICATION]: new NoopResponder(),
        [TransactionKind.CREATE_COMMENT]: new NoopResponder(),
        [TransactionKind.CREATE_POST]: new NoopResponder(),
        [TransactionKind.CREATE_PROFILE]: new NoopResponder(),
        [TransactionKind.FOLLOW_PROFILES]: new NoopResponder(),
        [TransactionKind.MIRROR_PUBLICATION]: new NoopResponder(),
        [TransactionKind.UNFOLLOW_PROFILE]: new NoopResponder(),
        [TransactionKind.UPDATE_COVER_IMAGE]: new NoopResponder(),
        [TransactionKind.UPDATE_DISPATCHER_CONFIG]: new NoopResponder(),
        [TransactionKind.UPDATE_FOLLOW_POLICY]: new NoopResponder(),
        [TransactionKind.UPDATE_PROFILE_DETAILS]: new NoopResponder(),
        [TransactionKind.UPDATE_PROFILE_IMAGE]: new NoopResponder(),
    };
    const transactionQueuePresenter = new TransactionQueuePresenter(onError);
    const protocolCallRelayer = new ProtocolCallRelayer(apolloClient, transactionFactory, logger);
    // common interactors
    const activeProfile = new ActiveProfile(profileGateway, activeProfileGateway, activeProfilePresenter);
    const activeWallet = new ActiveWallet(credentialsGateway, walletGateway);
    const transactionQueue = new TransactionQueue(responders, transactionGateway, transactionQueuePresenter);
    return {
        activeProfile,
        activeProfileGateway,
        activeProfilePresenter,
        activeWallet,
        apolloClient,
        authApi,
        credentialsFactory,
        credentialsGateway,
        logoutPresenter,
        onError,
        sources: config.sources ?? [],
        protocolCallRelayer,
        transactionFactory,
        transactionGateway,
        transactionQueue,
        walletFactory,
        walletGateway,
        notificationStorage,
    };
}
const SharedDependenciesContext = external_react_.createContext(null);
function SharedDependenciesProvider({ children, dependencies: context, }) {
    return (jsx_runtime_.jsx(SharedDependenciesContext.Provider, { value: context, children: children }));
}
function useSharedDependencies() {
    const context = (0,external_react_.useContext)(SharedDependenciesContext);
    (0,invariant/* invariant */.k)(context, 'Could not find Lens SDK context, ensure your code is wrapped in a <LensProvider>');
    return context;
}


/***/ }),

/***/ 9924:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xt": () => (/* binding */ ActiveWalletPresenter)
/* harmony export */ });
/* unused harmony exports activeWalletVar, useActiveWallet */
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1859);

const activeWalletVar = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.makeVar)(null);
class ActiveWalletPresenter {
    presentActiveWallet(wallet) {
        activeWalletVar(wallet);
    }
}
const useActiveWallet = () => {
    return useReactiveVar(activeWalletVar);
};


/***/ }),

/***/ 7530:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B$": () => (/* binding */ matic),
/* harmony export */   "TE": () => (/* binding */ usd),
/* harmony export */   "Xx": () => (/* binding */ ether),
/* harmony export */   "hY": () => (/* binding */ Kind),
/* harmony export */   "mV": () => (/* binding */ erc20)
/* harmony export */ });
/* unused harmony exports WellKnownSymbols, NativeType */
/* harmony import */ var _ChainType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3151);

var Kind;
(function (Kind) {
    Kind[Kind["NATIVE"] = 0] = "NATIVE";
    Kind[Kind["ERC20"] = 1] = "ERC20";
    Kind[Kind["FIAT"] = 2] = "FIAT";
})(Kind || (Kind = {}));
var WellKnownSymbols;
(function (WellKnownSymbols) {
    WellKnownSymbols["ETH"] = "ETH";
    WellKnownSymbols["MATIC"] = "MATIC";
    WellKnownSymbols["USD"] = "USD";
    WellKnownSymbols["USDC"] = "USDC";
})(WellKnownSymbols || (WellKnownSymbols = {}));
var NativeType;
(function (NativeType) {
    NativeType[NativeType["ETHER"] = 0] = "ETHER";
    NativeType[NativeType["MATIC"] = 1] = "MATIC";
})(NativeType || (NativeType = {}));
// DO NOT EXPORT, see type export later on
class Fiat {
    name;
    symbol;
    kind = Kind.FIAT;
    decimals = 2;
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
    get hash() {
        return this.symbol;
    }
    isErc20() {
        return false;
    }
    isFiat() {
        return true;
    }
    toString() {
        return this.symbol;
    }
}
// DO NOT EXPORT, see type export later on
class Ether {
    kind = Kind.NATIVE;
    type = NativeType.ETHER;
    name = 'Ethereum';
    decimals = 18;
    symbol = WellKnownSymbols.ETH;
    chainType = _ChainType__WEBPACK_IMPORTED_MODULE_0__/* .ChainType.ETHEREUM */ .J.ETHEREUM;
    get hash() {
        return this.type.toString();
    }
    isErc20() {
        return false;
    }
    isNativeToken() {
        return true;
    }
    isFiat() {
        return false;
    }
    toString() {
        return this.symbol;
    }
}
// DO NOT EXPORT, see type export later on
class Matic {
    kind = Kind.NATIVE;
    type = NativeType.MATIC;
    name = 'Matic';
    decimals = 18;
    symbol = WellKnownSymbols.MATIC;
    chainType = _ChainType__WEBPACK_IMPORTED_MODULE_0__/* .ChainType.POLYGON */ .J.POLYGON;
    get hash() {
        return this.type.toString();
    }
    isErc20() {
        return false;
    }
    isNativeToken() {
        return true;
    }
    isFiat() {
        return false;
    }
    toString() {
        return this.symbol;
    }
}
// DO NOT EXPORT, see type export later on
class Erc20 {
    name;
    decimals;
    symbol;
    address;
    chainType;
    kind = Kind.ERC20;
    constructor(name, decimals, symbol, address, chainType) {
        this.name = name;
        this.decimals = decimals;
        this.symbol = symbol;
        this.address = address;
        this.chainType = chainType;
    }
    get hash() {
        return `${this.chainType}:${this.address}`;
    }
    isErc20() {
        return true;
    }
    isNativeToken() {
        return false;
    }
    isFiat() {
        return false;
    }
    toString() {
        return `${this.symbol}[chain: ${this.chainType}]`;
    }
}
const instances = new Map();
function immutable(key, asset) {
    if (instances.has(key)) {
        return instances.get(key); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }
    instances.set(key, asset);
    return asset;
}
/**
 * Given the same chainId and address it returns the same Erc20 instance.
 * Useful for fast reference equality (===).
 *
 * @param info ERC20 token details
 * @returns Erc20
 */
function erc20({ name, decimals, symbol, address, chainType }) {
    const asset = new Erc20(name, decimals, symbol, address, chainType);
    return immutable(asset.hash, asset);
}
/**
 * Returns the same Matic instance for Matic token on Polygon chain.
 * Useful for fast reference equality (===).
 *
 * @returns Matic
 */
function matic() {
    const asset = new Matic();
    return immutable(asset.hash, asset);
}
/**
 * Returns the same Eth instance.
 * Useful for fast reference equality (===).
 *
 * @returns Ether
 */
function ether() {
    const asset = new Ether();
    return immutable(asset.hash, asset);
}
/**
 * Returns the same instance Fiat.
 * Useful for fast reference equality (===).
 *
 * @returns Fiat
 */
function usd() {
    const asset = new Fiat('United States dollar', WellKnownSymbols.USD);
    return immutable(asset.hash, asset);
}
//# sourceMappingURL=Asset.js.map

/***/ }),

/***/ 3151:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ ChainType)
/* harmony export */ });
var ChainType;
(function (ChainType) {
    ChainType["ETHEREUM"] = "ethereum";
    ChainType["POLYGON"] = "polygon";
})(ChainType || (ChainType = {}));
//# sourceMappingURL=ChainType.js.map

/***/ }),

/***/ 1604:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ InvariantError),
/* harmony export */   "k": () => (/* binding */ invariant)
/* harmony export */ });
class InvariantError extends Error {
    constructor(message) {
        super(`InvariantError: ${message}`);
    }
}
/**
 * Asserts that the given condition is truthy
 *
 * @param condition - Either truthy or falsy value
 * @param message - An error message
 */
function invariant(condition, message) {
    if (!condition) {
        throw new InvariantError(message);
    }
}
//# sourceMappingURL=invariant.js.map

/***/ })

};
;