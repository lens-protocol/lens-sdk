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
  ID,
  IdToken,
  LegacyProfileId,
  PostId,
  RefreshToken,
  Signature,
  TxHash,
  URI,
  URL,
  UUID,
  UsernameValue,
  Void,
} from '@lens-protocol/types';
import {
  type DocumentDecoration,
  type FragmentOf,
  type TadaDocumentNode,
  initGraphQLTada,
} from 'gql.tada';
import type { StandardData } from './common';
import type {
  AccessConditionComparison,
  AccountReportReason,
  AccountsOrderBy,
  AppMetadataLensPlatformsItem,
  AppsOrderBy,
  BlockErrorType,
  ContentWarning,
  EntityType,
  EventMetadataLensSchedulingAdjustmentsTimezoneId,
  FeedsOrderBy,
  FollowersOrderBy,
  FollowersYouKnowOrderBy,
  FollowingOrderBy,
  ForYouSource,
  GraphsOrderBy,
  GroupMembersOrderBy,
  GroupsOrderBy,
  MainContentFocus,
  ManagedAccountsVisibility,
  MediaAudioKind,
  MediaAudioType,
  MediaImageType,
  MediaVideoType,
  MetadataAttributeType,
  MetadataLicenseType,
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
  PostTagsOrderBy,
  PostType,
  PostVisibilityFilter,
  SelfFundedFallbackReason,
  SponsorLimitType,
  SponsoredFallbackReason,
  ThreeDAssetFormat,
  TimelineEventItemType,
  TokenStandard,
  TransactionType,
  TriStateValue,
  UnblockErrorType,
  WhoActedOnPostOrderBy,

  WhoReferencedPostOrderBy,
} from './enums';
import type { introspection } from './graphql-env';

export const graphql = initGraphQLTada<{
  disableMasking: true;
  introspection: introspection;
  scalars: {
    AccessToken: AccessToken;
    AccessConditionComparison: AccessConditionComparison;
    AccountReportReason: AccountReportReason;
    AccountsOrderBy: AccountsOrderBy;
    AppMetadataLensPlatformsItem: AppMetadataLensPlatformsItem;
    AppsOrderBy: AppsOrderBy;
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
    FeedsOrderBy: FeedsOrderBy;
    Float: number;
    FollowersOrderBy: FollowersOrderBy;
    FollowersYouKnowOrderBy: FollowersYouKnowOrderBy;
    FollowingOrderBy: FollowingOrderBy;
    ForYouSource: ForYouSource;
    GraphsOrderBy: GraphsOrderBy;
    GroupMembersOrderBy: GroupMembersOrderBy;
    GroupsOrderBy: GroupsOrderBy;
    ID: ID;
    IdToken: IdToken;
    Int: number;
    LegacyProfileId: LegacyProfileId;
    LegacyRefreshToken: CompactJwt;
    MainContentFocus: MainContentFocus;
    ManagedAccountsVisibility: ManagedAccountsVisibility;
    MediaAudioKind: MediaAudioKind;
    MediaAudioType: MediaAudioType;
    MediaImageType: MediaImageType;
    MediaVideoType: MediaVideoType;
    MetadataAttributeType: MetadataAttributeType;
    MetadataLicenseType: MetadataLicenseType;
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
    PostTagsOrderBy: PostTagsOrderBy;
    PostType: PostType;
    PostVisibilityFilter: PostVisibilityFilter;
    RefreshToken: RefreshToken;
    SelfFundedFallbackReason: SelfFundedFallbackReason;
    Signature: Signature;
    SponsorLimitType: SponsorLimitType;
    SponsoredFallbackReason: SponsoredFallbackReason;
    String: string;
    Tag: string;
    ThreeDAssetFormat: ThreeDAssetFormat;
    TimelineEventItemType: TimelineEventItemType;
    TokenStandard: TokenStandard;
    TransactionType: TransactionType;
    TriStateValue: TriStateValue;
    TxHash: TxHash;
    URI: URI;
    URL: URL;
    UUID: UUID;
    UnblockErrorType: UnblockErrorType;
    UsernameValue: UsernameValue;
    Void: Void;
    WhoActedOnPostOrderBy: WhoActedOnPostOrderBy;
    WhoReferencedPostOrderBy: WhoReferencedPostOrderBy;
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

export type AnyGqlNode<TTypename extends string = string> = { __typename: TTypename };

export type AnyVariables = Record<string, unknown>;

/**
 * @internal
 */
export type FragmentDocumentFor<TGqlNode extends AnyGqlNode> = TGqlNode extends AnyGqlNode<
  infer TTypename
>
  ? TadaDocumentNode<
      TGqlNode,
      AnyVariables,
      {
        fragment: TTypename;
        on: TTypename;
        masked: false;
      }
    >
  : never;

export type RequestFrom<In extends string> = RequestOf<GetDocumentNode<In, FragmentShape[]>>;

// biome-ignore lint/suspicious/noExplicitAny: simplifies necessary type assertions
export type StandardDocumentNode<Value = any, Request = any> = TadaDocumentNode<
  StandardData<Value>,
  { request: Request }
>;

type FragmentDocumentFrom<
  In extends string,
  Fragments extends FragmentShape[],
  Document extends GetDocumentNode<In, Fragments> = GetDocumentNode<In, Fragments>,
> = Document extends FragmentShape ? Document : never;

type FragmentDocumentForEach<Nodes extends AnyGqlNode[]> = {
  [K in keyof Nodes]: FragmentDocumentFor<Nodes[K]>;
};

/**
 * @internal
 */
export type DynamicFragmentDocument<
  In extends string,
  StaticNodes extends AnyGqlNode[],
> = FragmentDocumentFrom<In, FragmentDocumentForEach<StaticNodes>> & {
  __phantom: In;
};

/**
 * @internal
 */
export function fragment<In extends string, StaticNodes extends AnyGqlNode[]>(
  input: In,
  staticFragments: FragmentDocumentForEach<StaticNodes> = [] as FragmentDocumentForEach<StaticNodes>,
): DynamicFragmentDocument<In, StaticNodes> {
  return graphql(input, staticFragments) as DynamicFragmentDocument<In, StaticNodes>;
}

/**
 * @internal
 */
export type DynamicFragmentOf<
  Document,
  DynamicNodes extends AnyGqlNode[],
> = Document extends DynamicFragmentDocument<infer In, infer StaticNodes>
  ? FragmentOf<FragmentDocumentFrom<In, FragmentDocumentForEach<[...DynamicNodes, ...StaticNodes]>>>
  : never;
