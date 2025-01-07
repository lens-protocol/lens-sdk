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
import { InvariantError } from '@lens-protocol/types';
import {
  type DocumentDecoration,
  type FragmentOf,
  type TadaDocumentNode,
  initGraphQLTada,
} from 'gql.tada';
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
  UnblockErrorType,
  WhoActedOnPostOrderBy,
  WhoReferencedPostOrderBy,
} from './enums';
import type { introspection } from './graphql-env';

/**
 * A function that may be used to create documents typed using the Lens API GraphQL schema.
 */
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

export type { FragmentOf, TadaDocumentNode };

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

type TypedSelectionSet<TTypename extends string = string> = { __typename: TTypename };

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

/**
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

type FragmentDocumentFrom<
  In extends string,
  Fragments extends FragmentShape[] = FragmentShape[],
> = GetDocumentNode<In, Fragments> extends FragmentShape ? GetDocumentNode<In, Fragments> : never;

/**
 * @internal
 */
export type PartialFragment<
  In extends string = string,
  StaticFragments extends FragmentShape[] = [],
> = FragmentDocumentFrom<In, StaticFragments> & {
  __phantom: In;
};

/**
 * @internal
 */
export function partial<In extends string, StaticFragments extends FragmentShape[] = []>(
  input: In,
  staticFragments?: StaticFragments,
): PartialFragment<In, StaticFragments> {
  return graphql(input, staticFragments) as PartialFragment<In, StaticFragments>;
}

// https://github.com/0no-co/GraphQLSP/blob/6d9ce44d46dc6adbaf387ad5c96e4125570c3a94/packages/graphqlsp/src/ast/checks.ts#L26-L27
partial.scalar = true;
partial.persisted = true;

export type PartialFragmentOf<
  Fragment extends FragmentShape,
  DynamicFragments extends FragmentShape[],
> = Fragment extends PartialFragment<infer In, infer StaticFragments>
  ? FragmentOf<FragmentDocumentFrom<In, [...StaticFragments, ...DynamicFragments]>>
  : never;

export type DynamicDocument<In extends string, StaticFragments extends FragmentShape[] = []> = <
  DynamicFragments extends FragmentShape[],
>(
  dynamicFragments: DynamicFragments,
) => GetDocumentNode<In, [...StaticFragments, ...DynamicFragments]>;

/**
 * @internal
 */
export function dynamic<In extends string, StaticFragments extends FragmentShape[] = []>(
  input: In,
  // biome-ignore lint/suspicious/noExplicitAny: simplicity
  staticFragments: StaticFragments = [] as any,
): DynamicDocument<In, StaticFragments> {
  return <DynamicFragments extends FragmentShape[]>(dynamicFragments: DynamicFragments) =>
    graphql(input, staticFragments.concat(dynamicFragments) as FragmentShape[]);
}

// https://github.com/0no-co/GraphQLSP/blob/6d9ce44d46dc6adbaf387ad5c96e4125570c3a94/packages/graphqlsp/src/ast/checks.ts#L26-L27
dynamic.scalar = true;
dynamic.persisted = true;

/**
 * @internal
 */
export type RequestOf<Document> = Document extends DynamicDocument<infer In>
  ? RequestOf<GetDocumentNode<In>>
  : Document extends DocumentDecoration<unknown, { request: infer Request }>
    ? Request
    : never;
