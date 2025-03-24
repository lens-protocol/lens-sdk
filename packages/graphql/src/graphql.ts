import type {
  AccessToken,
  BigDecimal,
  BigIntString,
  BlockchainData,
  CompactJwt,
  Cursor,
  DateTime,
  EncodedTransaction,
  EvmAddress,
  FixedBytes32,
  GrantId,
  ID,
  IdToken,
  JsonString,
  LegacyProfileId,
  PostId,
  RefreshToken,
  RuleId,
  Signature,
  TxHash,
  URI,
  URL,
  UUID,
  UsernameValue,
  Void,
} from '@lens-protocol/types';
import { InvariantError } from '@lens-protocol/types';
import { type DocumentDecoration, type TadaDocumentNode, initGraphQLTada } from 'gql.tada';
import type { StandardData } from './common';
import type {
  AccessConditionComparison,
  AccountFollowRuleType,
  AccountFollowRuleUnsatisfiedReason,
  AccountReportReason,
  AccountsOrderBy,
  AppMetadataLensPlatformsItem,
  AppUsersOrderBy,
  AppsOrderBy,
  BlockErrorType,
  ContentWarning,
  EntityType,
  EventMetadataLensSchedulingAdjustmentsTimezoneId,
  FeedRuleExecuteOn,
  FeedRuleType,
  FeedRuleUnsatisfiedReason,
  FeedsOrderBy,
  FollowersOrderBy,
  FollowersYouKnowOrderBy,
  FollowingOrderBy,
  ForYouSource,
  FrameVerifySignatureResult,
  GraphRuleExecuteOn,
  GraphRuleType,
  GraphsOrderBy,
  GroupMembersOrderBy,
  GroupRuleExecuteOn,
  GroupRuleType,
  GroupRuleUnsatisfiedReason,
  GroupsOrderBy,
  IndexingStatus,
  MainContentFocus,
  ManagedAccountsVisibility,
  MarketplaceMetadataAttributeType,
  MediaAudioKind,
  MediaAudioType,
  MediaImageType,
  MediaVideoType,
  MetadataAttributeType,
  MetadataLicenseType,
  NamespaceRuleExecuteOn,
  NamespaceRuleType,
  NamespaceRuleUnsatisfiedReason,
  NamespacesOrderBy,
  NftContractType,
  NotificationOrderBy,
  NotificationType,
  PageSize,
  PostActionCategoryType,
  PostActionType,
  PostReactionOrderBy,
  PostReactionType,
  PostReferenceType,
  PostReportReason,
  PostRuleExecuteOn,
  PostRuleType,
  PostRuleUnsatisfiedReason,
  PostTagsOrderBy,
  PostType,
  PostVisibilityFilter,
  SelfFundedFallbackReason,
  SimpleCollectValidationFailedReason,
  SponsorLimitType,
  SponsoredFallbackReason,
  SponsorshipLimitExclusionsOrderBy,
  SponsorshipRateLimitWindow,
  SponsorshipSignersOrderBy,
  SponsorshipsOrderBy,
  ThreeDAssetFormat,
  TimelineEventItemType,
  TokenStandard,
  TransactionType,
  WhoExecutedActionOnAccountOrderBy,
  WhoExecutedActionOnPostOrderBy,
  WhoReferencedPostOrderBy,
} from './enums';
import type { introspection } from './graphql-env';
import type { ServerAPIKey } from './scalars';

export const graphql = initGraphQLTada<{
  disableMasking: true;
  introspection: introspection;
  scalars: {
    AccessConditionComparison: AccessConditionComparison;
    AccessToken: AccessToken;
    AccountFollowRuleType: AccountFollowRuleType;
    AccountFollowRuleUnsatisfiedReason: AccountFollowRuleUnsatisfiedReason;
    AccountReportReason: AccountReportReason;
    AccountsOrderBy: AccountsOrderBy;
    AlwaysTrue: true;
    AppMetadataLensPlatformsItem: AppMetadataLensPlatformsItem;
    AppsOrderBy: AppsOrderBy;
    AppUsersOrderBy: AppUsersOrderBy;
    BigDecimal: BigDecimal;
    BigInt: BigIntString;
    BlockchainData: BlockchainData;
    BlockErrorType: BlockErrorType;
    Boolean: boolean;
    ContentWarning: ContentWarning;
    Cursor: Cursor;
    DateTime: DateTime;
    EncodedTransaction: EncodedTransaction;
    EntityType: EntityType;
    EventMetadataLensSchedulingAdjustmentsTimezoneId: EventMetadataLensSchedulingAdjustmentsTimezoneId;
    EvmAddress: EvmAddress;
    FeedRuleExecuteOn: FeedRuleExecuteOn;
    FeedRuleType: FeedRuleType;
    FeedRuleUnsatisfiedReason: FeedRuleUnsatisfiedReason;
    FeedsOrderBy: FeedsOrderBy;
    FixedBytes32: FixedBytes32;
    Float: number;
    FollowersOrderBy: FollowersOrderBy;
    FollowersYouKnowOrderBy: FollowersYouKnowOrderBy;
    FollowingOrderBy: FollowingOrderBy;
    ForYouSource: ForYouSource;
    FrameVerifySignatureResult: FrameVerifySignatureResult;
    GeneratedNotificationId: ID;
    GrantId: GrantId;
    GraphRuleExecuteOn: GraphRuleExecuteOn;
    GraphRuleType: GraphRuleType;
    GraphsOrderBy: GraphsOrderBy;
    GroupMembersOrderBy: GroupMembersOrderBy;
    GroupRuleExecuteOn: GroupRuleExecuteOn;
    GroupRuleType: GroupRuleType;
    GroupRuleUnsatisfiedReason: GroupRuleUnsatisfiedReason;
    GroupsOrderBy: GroupsOrderBy;
    ID: ID;
    IdToken: IdToken;
    IndexingStatus: IndexingStatus;
    Int: number;
    LegacyProfileId: LegacyProfileId;
    LegacyRefreshToken: CompactJwt;
    MainContentFocus: MainContentFocus;
    ManagedAccountsVisibility: ManagedAccountsVisibility;
    MarketplaceMetadataAttributeType: MarketplaceMetadataAttributeType;
    MarketplaceMetadataAttributeValue: string;
    MediaAudioKind: MediaAudioKind;
    MediaAudioType: MediaAudioType;
    MediaImageType: MediaImageType;
    MediaVideoType: MediaVideoType;
    MetadataAttributeType: MetadataAttributeType;
    MetadataLicenseType: MetadataLicenseType;
    NamespaceRuleExecuteOn: NamespaceRuleExecuteOn;
    NamespaceRuleType: NamespaceRuleType;
    NamespaceRuleUnsatisfiedReason: NamespaceRuleUnsatisfiedReason;
    NamespacesOrderBy: NamespacesOrderBy;
    NftContractType: NftContractType;
    NotificationOrderBy: NotificationOrderBy;
    NotificationType: NotificationType;
    PageSize: PageSize;
    PostActionCategoryType: PostActionCategoryType;
    PostActionType: PostActionType;
    PostId: PostId;
    PostReactionOrderBy: PostReactionOrderBy;
    PostReactionType: PostReactionType;
    PostReferenceType: PostReferenceType;
    PostReportReason: PostReportReason;
    PostRuleExecuteOn: PostRuleExecuteOn;
    PostRuleType: PostRuleType;
    PostRuleUnsatisfiedReason: PostRuleUnsatisfiedReason;
    PostTagsOrderBy: PostTagsOrderBy;
    PostType: PostType;
    PostVisibilityFilter: PostVisibilityFilter;
    RefreshToken: RefreshToken;
    RuleId: RuleId;
    SelfFundedFallbackReason: SelfFundedFallbackReason;
    ServerAPIKey: ServerAPIKey;
    Signature: Signature;
    SimpleCollectValidationFailedReason: SimpleCollectValidationFailedReason;
    // SnsNotificationType: SnsNotificationType; intentionally not mapped since it grows often and not an input enum
    SponsoredFallbackReason: SponsoredFallbackReason;
    SponsorLimitType: SponsorLimitType;
    SponsorshipLimitExclusionsOrderBy: SponsorshipLimitExclusionsOrderBy;
    SponsorshipRateLimitWindow: SponsorshipRateLimitWindow;
    SponsorshipSignersOrderBy: SponsorshipSignersOrderBy;
    SponsorshipsOrderBy: SponsorshipsOrderBy;
    String: string;
    Tag: string;
    ThreeDAssetFormat: ThreeDAssetFormat;
    TimelineEventItemType: TimelineEventItemType;
    TokenStandard: TokenStandard;
    // TransactionOperation: TransactionOperation; intentionally not mapped since it grows often and it's a debug information
    TransactionType: TransactionType;
    TxHash: TxHash;
    URI: URI;
    URL: URL;
    UsernameValue: UsernameValue;
    UUID: UUID;
    Void: Void;
    WhoExecutedActionOnAccountOrderBy: WhoExecutedActionOnAccountOrderBy;
    WhoExecutedActionOnPostOrderBy: WhoExecutedActionOnPostOrderBy;
    WhoReferencedPostOrderBy: WhoReferencedPostOrderBy;
    JSONString: JsonString;
  };
}>();

/**
 * @internal
 */
export type RequestOf<Document> = Document extends DocumentDecoration<
  unknown,
  { request: infer Request }
>
  ? Request
  : never;

/**
 * @internal
 */
export type FragmentShape = NonNullable<Parameters<typeof graphql>[1]>[number];

type GetDocumentNode<
  In extends string = string,
  Fragments extends FragmentShape[] = FragmentShape[],
> = ReturnType<typeof graphql<In, Fragments>>;

/**
 * @internal
 */
export type AnySelectionSet = Record<string, unknown>;

/**
 * @internal
 */
export type AnyVariables = Record<string, unknown>;

/**
 * @internal
 */
export type TypedSelectionSet<TTypename extends string = string> = { __typename: TTypename };

/**
 * @internal
 */
export type FragmentDocumentFor<
  TGqlNode extends AnySelectionSet,
  TTypename extends string = TGqlNode extends TypedSelectionSet<infer TTypename>
    ? TTypename
    : never,
  TFragmentName extends string = TTypename,
> = TadaDocumentNode<
  TGqlNode,
  AnyVariables,
  {
    fragment: TFragmentName;
    on: TTypename;
    masked: false;
  }
>;

export type RequestFrom<In extends string> = RequestOf<GetDocumentNode<In, FragmentShape[]>>;

// biome-ignore lint/suspicious/noExplicitAny: simplifies necessary type assertions
export type StandardDocumentNode<Value = any, Request = any> = TadaDocumentNode<
  StandardData<Value>,
  { request: Request }
>;

/*
 * Asserts that the node is of a specific type in a union.
 *
 * ```ts
 * type A = { __typename: 'A', a: string };
 * type B = { __typename: 'B', b: string };
 *
 * const node: A | B = { __typename: 'A', a: 'a' };
 *
 * assertTypename(node, 'A');
 *
 * console.log(node.a); // OK
 * ```
 *
 * @param node - The node to assert the typename of
 * @param typename - The expected typename
 */
export function assertTypename<Typename extends string>(
  node: TypedSelectionSet,
  typename: Typename,
): asserts node is TypedSelectionSet<Typename> {
  if (node.__typename !== typename) {
    throw new InvariantError(
      `Expected node to have typename "${typename}", but got "${node.__typename}"`,
    );
  }
}
