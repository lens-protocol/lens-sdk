import type {
  Account,
  App,
  CreateFollowRequest,
  CreateUnfollowRequest,
  Feed,
  FollowResult,
  Graph,
  Group,
  SimpleCollectAction,
  SimpleCollectActionContract,
  Sponsorship,
  TippingAccountAction,
  TippingPostActionContract,
  UnfollowResult,
  UnknownAccountAction,
  UnknownPostAction,
  UnknownPostActionContract,
  UsernameNamespace,
} from '@lens-protocol/graphql';
import introspectedSchema from '@lens-protocol/graphql/schema';
import { gql } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';

export const cache = /*#__PURE__*/ cacheExchange({
  schema: introspectedSchema,
  keys: {
    // Entities with address field as key
    Account: (data: Account) => data.address,
    App: (data: App) => data.address,
    Feed: (data: Feed) => data.address,
    Graph: (data: Graph) => data.address,
    Group: (data: Group) => data.address,
    UsernameNamespace: (data: UsernameNamespace) => data.address,
    Sponsorship: (data: Sponsorship) => data.address,
    SimpleCollectActionContract: (data: SimpleCollectActionContract) =>
      data.address,
    TippingPostActionContract: (data: TippingPostActionContract) =>
      data.address,
    UnknownPostActionContract: (data: UnknownPostActionContract) =>
      data.address,
    SimpleCollectAction: (data: SimpleCollectAction) => data.address,
    TippingAccountAction: (data: TippingAccountAction) => data.address,
    UnknownAccountAction: (data: UnknownAccountAction) => data.address,
    UnknownPostAction: (data: UnknownPostAction) => data.address,

    // Entities with other fields as key
    AuthenticatedSession: (data: any) => data.authenticationId,

    // Entities without keys will be embedded directly on the parent entity
    PaginatedResultInfo: () => null,
    PaginatedAccountsResult: () => null,
    PaginatedAccountsAvailableResult: () => null,
    PaginatedAccountsBlockedResult: () => null,
    PaginatedAccountManagersResult: () => null,
    PaginatedActiveAuthenticationsResult: () => null,
    PaginatedAdminsResult: () => null,
    PaginatedAnyPostsResult: () => null,
    PaginatedAppFeedsResult: () => null,
    PaginatedAppSignersResult: () => null,
    PaginatedAppUsersResult: () => null,
    PaginatedFeedsResult: () => null,
    PaginatedFollowersResult: () => null,
    PaginatedFollowingResult: () => null,
    PaginatedGraphsResult: () => null,
    PaginatedGroupBannedAccountsResult: () => null,
    PaginatedGroupMembersResult: () => null,
    PaginatedGroupMembershipRequestsResult: () => null,
    PaginatedGroupsResult: () => null,
    PaginatedNamespaceReservedUsernamesResult: () => null,
    PaginatedNotificationResult: () => null,
    PaginatedPostActionContracts: () => null,
    PaginatedPostEditsResult: () => null,
    PaginatedPostExecutedActionsResult: () => null,
    PaginatedPostReactionsResult: () => null,
    PaginatedPostTagsResult: () => null,
    PaginatedPostsForYouResult: () => null,
    PaginatedPostsResult: () => null,
    PaginatedTimelineResult: () => null,
    PaginatedUsernamesResult: () => null,
    PaginatedAccountExecutedActionsResult: () => null,
    AppsResult: () => null,
    NamespacesResult: () => null,
    SponsorshipLimitsExclusionsResult: () => null,
    SponsorshipSignersResult: () => null,
    SponsorshipsResult: () => null,
    SponsorshipGrantsResult: () => null,

    // Account related types
    AccountFollowRules: () => null,
    AccountFollowOperationValidationFailed: () => null,
    AccountFollowOperationValidationPassed: () => null,
    AccountFollowOperationValidationUnknown: () => null,
    AccountFollowUnsatisfiedRules: () => null,
    AccountFollowUnsatisfiedRule: () => null,
    AccountMetadata: () => null,
    AccountManager: () => null,
    AccountManagerPermissions: () => null,
    AccountAvailable: () => null,
    AccountManaged: () => null,
    AccountOwned: () => null,
    AccountBlocked: () => null,
    AccountStats: () => null,
    AccountFeedsStats: () => null,
    AccountGraphsFollowStats: () => null,

    // Namespace related types
    NamespaceOperationValidationFailed: () => null,
    NamespaceOperationValidationPassed: () => null,
    NamespaceOperationValidationUnknown: () => null,
    NamespaceUnsatisfiedRules: () => null,
    NamespaceUnsatisfiedRule: () => null,
    NamespaceRules: () => null,
    NamespaceRule: () => null,
    LoggedInUsernameNamespaceOperations: () => null,
    LoggedInUsernameOperations: () => null,

    // Feed related types
    FeedOperationValidationFailed: () => null,
    FeedOperationValidationPassed: () => null,
    FeedOperationValidationUnknown: () => null,
    FeedUnsatisfiedRules: () => null,
    FeedUnsatisfiedRule: () => null,
    FeedRules: () => null,
    FeedRule: () => null,
    FeedMetadata: () => null,
    LoggedInFeedPostOperations: () => null,

    // Graph related types
    GraphRules: () => null,
    GraphRule: () => null,
    GraphMetadata: () => null,

    // Group related types
    GroupOperationValidationFailed: () => null,
    GroupOperationValidationPassed: () => null,
    GroupOperationValidationUnknown: () => null,
    GroupUnsatisfiedRules: () => null,
    GroupUnsatisfiedRule: () => null,
    GroupRules: () => null,
    GroupRule: () => null,
    GroupMetadata: () => null,
    GroupMember: () => null,
    GroupMembershipRequest: () => null,
    GroupBannedAccount: () => null,
    LoggedInGroupOperations: () => null,

    // Post related types
    PostOperationValidationFailed: () => null,
    PostOperationValidationPassed: () => null,
    PostOperationValidationUnknown: () => null,
    PostUnsatisfiedRules: () => null,
    PostUnsatisfiedRule: () => null,
    PostRules: () => null,
    PostRule: () => null,
    PostStats: () => null,
    PostReaction: () => null,
    PostTip: () => null,
    PostFeedInfo: () => null,
    PostGroupInfo: () => null,
    PostForYou: () => null,
    PostTag: () => null,
    PostEdit: () => null,
    PostExecutedActions: () => null,
    LoggedInPostOperations: () => null,

    // Metadata types
    MetadataAttribute: () => null,
    ArticleMetadata: () => null,
    AudioMetadata: () => null,
    CheckingInMetadata: () => null,
    EmbedMetadata: () => null,
    EventMetadata: () => null,
    ImageMetadata: () => null,
    LinkMetadata: () => null,
    LivestreamMetadata: () => null,
    MintMetadata: () => null,
    SpaceMetadata: () => null,
    StoryMetadata: () => null,
    TextOnlyMetadata: () => null,
    ThreeDMetadata: () => null,
    TransactionMetadata: () => null,
    VideoMetadata: () => null,
    UnknownPostMetadata: () => null,
    AppMetadata: () => null,
    UsernameNamespaceMetadata: () => null,
    UsernameNamespaceMetadataStandard: () => null,
    SponsorshipMetadata: () => null,
    ActionMetadata: () => null,

    // Media types
    MediaAudio: () => null,
    MediaImage: () => null,
    MediaVideo: () => null,
    ThreeDAsset: () => null,

    // Transaction types
    TransactionStatusResult: () => null,
    FinishedTransactionStatus: () => null,
    PendingTransactionStatus: () => null,
    FailedTransactionStatus: () => null,
    NotIndexedYetStatus: () => null,
    SubOperationStatus: () => null,

    // Response types
    PostResponse: () => null,
    FollowResponse: () => null,
    UnfollowResponse: () => null,
    CreateAccountResponse: () => null,
    AssignUsernameResponse: () => null,
    UnassignUsernameResponse: () => null,
    CreateUsernameResponse: () => null,
    CreateAppResponse: () => null,
    CreateFeedResponse: () => null,
    CreateGraphResponse: () => null,
    CreateGroupResponse: () => null,
    CreateNamespaceResponse: () => null,
    CreateSponsorshipResponse: () => null,
    AccountBlockedResponse: () => null,
    AccountUnblockedResponse: () => null,

    // Notification types
    CommentNotification: () => null,
    ReactionNotification: () => null,
    RepostNotification: () => null,
    QuoteNotification: () => null,
    FollowNotification: () => null,
    MentionNotification: () => null,
    PostActionExecutedNotification: () => null,
    AccountActionExecutedNotification: () => null,
    GroupMembershipRequestApprovedNotification: () => null,
    GroupMembershipRequestRejectedNotification: () => null,

    // Other types
    Follower: () => null,
    Following: () => null,
    MeResult: () => null,
    Repost: () => null,
    TimelineItem: () => null,
    AppUser: () => null,
    AppFeed: () => null,
    AppSigner: () => null,
    Admin: () => null,
    UsernameReserved: () => null,
    UsernameNamespaceStats: () => null,
    SponsorshipLimits: () => null,
    SponsorshipRateLimit: () => null,
    SponsorshipAllowance: () => null,
    SponsorshipSigner: () => null,
    SponsorshipLimitsExempt: () => null,
    SponsorshipGrant: () => null,
    GroupStatsResponse: () => null,
    FollowStatusResult: () => null,
    PostReactionStatus: () => null,
    NotificationAccountFollow: () => null,
    NotificationAccountPostReaction: () => null,
    NotificationAccountRepost: () => null,
    AccountPostReaction: () => null,
    AccountMention: () => null,
    GroupMention: () => null,
    MentionReplace: () => null,

    // Validation types
    SimpleCollectValidationPassed: () => null,
    SimpleCollectValidationFailed: () => null,
    UsernameTaken: () => null,

    // Error types
    WrongSignerError: () => null,
    ExpiredChallengeError: () => null,
    ForbiddenError: () => null,
    InsufficientFunds: () => null,
    SignerErc20ApprovalRequired: () => null,
    TransactionWillFail: () => null,

    // Token/Amount types
    NativeAmount: () => null,
    Erc20Amount: () => null,
    NativeToken: () => null,
    Erc20: () => null,
    NativeBalanceError: () => null,
    Erc20BalanceError: () => null,
    NetworkAddress: () => null,

    // Key-Value types
    IntKeyValue: () => null,
    IntNullableKeyValue: () => null,
    AddressKeyValue: () => null,
    StringKeyValue: () => null,
    BooleanKeyValue: () => null,
    RawKeyValue: () => null,
    BigDecimalKeyValue: () => null,
    DictionaryKeyValue: () => null,
    ArrayKeyValue: () => null,
    KeyValuePair: () => null,

    // Other utility types
    BooleanValue: () => null,
    PhysicalAddress: () => null,
    EventLocation: () => null,
    EventSchedulingAdjustments: () => null,
    PayToCollectConfig: () => null,
    RecipientPercent: () => null,
    NftMetadata: () => null,
    MarketplaceMetadataAttribute: () => null,
    PaymasterParams: () => null,
    Eip712Meta: () => null,

    // Authentication types
    AuthenticationChallenge: () => null,
    AuthenticationTokens: () => null,

    // Transaction request types
    SponsoredTransactionRequest: () => null,
    SelfFundedTransactionRequest: () => null,
    Eip1559TransactionRequest: () => null,
    Eip712TransactionRequest: () => null,

    // EIP-712 types
    CreateFrameEIP712TypedData: () => null,
    CreateFrameEIP712TypedDataTypes: () => null,
    CreateFrameEIP712TypedDataValue: () => null,
    Eip712TypedDataDomain: () => null,
    Eip712TypedDataField: () => null,
    FrameLensManagerSignatureResult: () => null,

    // Action executed types
    TippingAccountActionExecuted: () => null,
    UnknownAccountActionExecuted: () => null,
    TippingPostActionExecuted: () => null,
    SimpleCollectPostActionExecuted: () => null,
    UnknownPostActionExecuted: () => null,

    // SNS types
    SnsSubscription: () => null,

    // Debug types
    DebugPostMetadataResult: () => null,
    RefreshMetadataResult: () => null,
    RefreshMetadataStatusResult: () => null,
    AccessControlResult: () => null,
  },
  updates: {
    Mutation: {
      follow: (
        result: { value: FollowResult },
        args: { request: CreateFollowRequest },
        cache,
      ) => {
        // Optimistically update the follow status if getting txHash
        if (result.value.__typename === 'FollowResponse') {
          cache.writeFragment(
            gql`
              fragment _ on LoggedInAccountOperations {
                id
                isFollowedByMe
            }`,
            {
              id: args.request.account,
              isFollowedByMe: true,
            },
          );
        }
      },
      unfollow: (
        result: { value: UnfollowResult },
        args: { request: CreateUnfollowRequest },
        cache,
      ) => {
        // Optimistically update the unfollow status if getting txHash
        if (result.value.__typename === 'UnfollowResponse') {
          cache.writeFragment(
            gql`
              fragment _ on LoggedInAccountOperations {
                id
                isFollowedByMe
            }`,
            {
              id: args.request.account,
              isFollowedByMe: false,
            },
          );
        }
      },
    },
  },
});
