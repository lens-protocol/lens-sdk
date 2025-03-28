import type { DateTime, PostId, Prettify } from '@lens-protocol/types';
import type { FragmentOf } from 'gql.tada';
import { type FragmentDocumentFor, graphql } from '../graphql';
import { type Account, AccountFragment } from './account';
import {
  AnyKeyValueFragment,
  BooleanValueFragment,
  Erc20AmountFragment,
  FollowerOnFragment,
  UnknownPostActionFragment,
} from './common';
import {
  ArticleMetadataFragment,
  AudioMetadataFragment,
  CheckingInMetadataFragment,
  EmbedMetadataFragment,
  EventMetadataFragment,
  ImageMetadataFragment,
  LivestreamMetadataFragment,
  MintMetadataFragment,
  SpaceMetadataFragment,
  StoryMetadataFragment,
  TextOnlyMetadataFragment,
  ThreeDMetadataFragment,
  TransactionMetadataFragment,
  UnknownPostMetadataFragment,
  VideoMetadataFragment,
} from './metadata';
import {
  type App,
  AppFragment,
  FeedMetadataFragment,
  type FeedRule,
  FeedRuleFragment,
  GroupMetadataFragment,
} from './primitives';

export const RecipientPercentFragment = graphql(
  `fragment RecipientPercent on RecipientPercent {
    __typename
    address
    percent
  }`,
);
export type RecipientPercent = FragmentOf<typeof RecipientPercentFragment>;

export const PayToCollectConfigFragment = graphql(
  `fragment PayToCollectConfig on PayToCollectConfig {
    __typename
    amount {
      ...Erc20Amount
    }
    recipients {
      ...RecipientPercent
    }
    referralShare
  }`,
  [Erc20AmountFragment, RecipientPercentFragment],
);
export type PayToCollectConfig = FragmentOf<typeof PayToCollectConfigFragment>;

export const SimpleCollectActionFragment = graphql(
  `fragment SimpleCollectAction on SimpleCollectAction {
    __typename
    address
    payToCollect {
      ...PayToCollectConfig
    }
    collectLimit
    followerOnGraph {
      ...FollowerOn
    }
    endsAt
    isImmutable
    collectNftAddress
  }`,
  [PayToCollectConfigFragment, FollowerOnFragment],
);
export type SimpleCollectAction = FragmentOf<typeof SimpleCollectActionFragment>;

export const PostActionFragment = graphql(
  `fragment PostAction on PostAction {
    ... on SimpleCollectAction {
      ...SimpleCollectAction
    }
    ... on UnknownPostAction {
      ...UnknownPostAction
    }
  }`,
  [SimpleCollectActionFragment, UnknownPostActionFragment],
);
export type PostAction = FragmentOf<typeof PostActionFragment>;

export const PostMetadataFragment = graphql(
  `fragment PostMetadata on PostMetadata {
    ... on ArticleMetadata {
      ...ArticleMetadata
    }
    ... on AudioMetadata {
      ...AudioMetadata
    }
    ... on TextOnlyMetadata {
      ...TextOnlyMetadata
    }
    ... on CheckingInMetadata {
      ...CheckingInMetadata
    }
    ... on ImageMetadata {
      ...ImageMetadata
    }
    ... on VideoMetadata {
      ...VideoMetadata
    }
    ... on EmbedMetadata {
      ...EmbedMetadata
    }
    ... on EventMetadata {
      ...EventMetadata
    }
    ... on LivestreamMetadata {
      ...LivestreamMetadata
    }
    ... on MintMetadata {
      ...MintMetadata
    }
    ... on SpaceMetadata {
      ...SpaceMetadata
    }
    ... on StoryMetadata {
      ...StoryMetadata
    }
    ... on ThreeDMetadata {
      ...ThreeDMetadata
    }
    ... on TransactionMetadata {
      ...TransactionMetadata
    }
    ... on UnknownPostMetadata {
      ...UnknownPostMetadata
    }
  }`,
  [
    ArticleMetadataFragment,
    AudioMetadataFragment,
    TextOnlyMetadataFragment,
    CheckingInMetadataFragment,
    ImageMetadataFragment,
    VideoMetadataFragment,
    EmbedMetadataFragment,
    EventMetadataFragment,
    LivestreamMetadataFragment,
    MintMetadataFragment,
    SpaceMetadataFragment,
    StoryMetadataFragment,
    ThreeDMetadataFragment,
    TransactionMetadataFragment,
    UnknownPostMetadataFragment,
  ],
);
// The following type is purposefully named so that a PostMetadata type can be defined
// by the consumer's code as module augmentation.
export type FullPostMetadata = FragmentOf<typeof PostMetadataFragment>;

export const PostOperationValidationPassedFragment = graphql(
  `fragment PostOperationValidationPassed on PostOperationValidationPassed {
    __typename
  }`,
);
export type PostOperationValidationPassed = FragmentOf<
  typeof PostOperationValidationPassedFragment
>;

export const PostRuleFragment = graphql(
  `fragment PostRule on PostRule {
    __typename
    id
    type
    address
    executesOn
    config {
      ...AnyKeyValue
    }
  }`,
  [AnyKeyValueFragment],
);
export type PostRule = FragmentOf<typeof PostRuleFragment>;

export const PostOperationValidationRuleFragment = graphql(
  `fragment PostOperationValidationRule on PostOperationValidationRule {
    ... on PostRule {
      ...PostRule
    }
    ... on FeedRule {
      ...FeedRule
    }
  }`,
  [PostRuleFragment, FeedRuleFragment],
);
export type PostOperationValidationRule = FeedRule | PostRule;

export const PostOperationValidationUnknownFragment = graphql(
  `fragment PostOperationValidationUnknown on PostOperationValidationUnknown {
    __typename
    extraChecksRequired {
      ...PostOperationValidationRule
    }
  }`,
  [PostOperationValidationRuleFragment],
);
export type PostOperationValidationUnknown = FragmentOf<
  typeof PostOperationValidationUnknownFragment
>;

export const PostUnsatisfiedRuleFragment = graphql(
  `fragment PostUnsatisfiedRule on PostUnsatisfiedRule {
    __typename
    rule
    reason
    message
    config {
      ...AnyKeyValue
    }
  }`,
  [AnyKeyValueFragment],
);
export type PostUnsatisfiedRule = FragmentOf<typeof PostUnsatisfiedRuleFragment>;

export const PostUnsatisfiedRulesFragment = graphql(
  `fragment PostUnsatisfiedRules on PostUnsatisfiedRules {
    __typename
    required {
      ...PostUnsatisfiedRule
    }
    anyOf {
      ...PostUnsatisfiedRule
    }
  }`,
  [PostUnsatisfiedRuleFragment],
);
export type PostUnsatisfiedRules = FragmentOf<typeof PostUnsatisfiedRulesFragment>;

export const PostOperationValidationFailedFragment = graphql(
  `fragment PostOperationValidationFailed on PostOperationValidationFailed {
    __typename
    unsatisfiedRules {
      ...PostUnsatisfiedRules
    }
    reason
  }`,
  [PostUnsatisfiedRulesFragment],
);
export type PostOperationValidationFailed = FragmentOf<
  typeof PostOperationValidationFailedFragment
>;

export const PostOperationValidationOutcomeFragment = graphql(
  `fragment PostOperationValidationOutcome on PostOperationValidationOutcome {
    ... on PostOperationValidationPassed {
      ...PostOperationValidationPassed
    }
    ... on PostOperationValidationUnknown {
      ...PostOperationValidationUnknown
    }
    ... on PostOperationValidationFailed {
      ...PostOperationValidationFailed
    }
  }`,
  [
    PostOperationValidationPassedFragment,
    PostOperationValidationUnknownFragment,
    PostOperationValidationFailedFragment,
  ],
);
export type OperationValidationOutcome =
  | PostOperationValidationPassed
  | PostOperationValidationUnknown
  | PostOperationValidationFailed;

export const PostTipFragment = graphql(
  `fragment PostTip on PostTip {
    __typename
    amount {
      ...Erc20Amount
    }
    date
  }`,
  [Erc20AmountFragment],
);
export type PostTip = FragmentOf<typeof PostTipFragment>;

export const SimpleCollectValidationPassedFragment = graphql(
  `fragment SimpleCollectValidationPassed on SimpleCollectValidationPassed {
    __typename
  }`,
);
export type SimpleCollectValidationPassed = FragmentOf<
  typeof SimpleCollectValidationPassedFragment
>;

export const SimpleCollectValidationFailedFragment = graphql(
  `fragment SimpleCollectValidationFailed on SimpleCollectValidationFailed {
    __typename
    reasonType
    reason
  }`,
);
export type SimpleCollectValidationFailed = FragmentOf<
  typeof SimpleCollectValidationFailedFragment
>;

export const SimpleCollectValidationOutcomeFragment = graphql(
  `fragment SimpleCollectValidationOutcome on SimpleCollectValidationOutcome {
    __typename
    ... on SimpleCollectValidationPassed {
      ...SimpleCollectValidationPassed
    }
    ... on SimpleCollectValidationFailed {
      ...SimpleCollectValidationFailed
    }
  }`,
  [SimpleCollectValidationPassedFragment, SimpleCollectValidationFailedFragment],
);
export type SimpleCollectValidationOutcome =
  | SimpleCollectValidationPassed
  | SimpleCollectValidationFailed;

export const LoggedInPostOperationsFragment = graphql(
  `fragment LoggedInPostOperations on LoggedInPostOperations {
    __typename
    id
    canComment {
      ...PostOperationValidationOutcome
    }
    canDelete {
      ...PostOperationValidationOutcome
    }
    canEdit {
      ...PostOperationValidationOutcome
    }
    canQuote {
      ...PostOperationValidationOutcome
    }
    canRepost {
      ...PostOperationValidationOutcome
    }
    canSimpleCollect {
      ...SimpleCollectValidationOutcome
    }
    canTip
    hasBookmarked
    hasCommented {
      ...BooleanValue
    }
    hasQuoted {
      ...BooleanValue
    }
    hasUpvoted: hasReacted(request: { type: UPVOTE })
    hasDownvoted: hasReacted(request: { type: DOWNVOTE })
    hasReported
    hasReposted {
      ...BooleanValue
    }
    hasSimpleCollected
    hasTipped
    isNotInterested
    lastTip {
      ...PostTip
    }
    postTipCount
    simpleCollectCount
  }`,
  [
    BooleanValueFragment,
    PostOperationValidationOutcomeFragment,
    PostTipFragment,
    SimpleCollectValidationOutcomeFragment,
  ],
);
export interface LoggedInPostOperations extends FragmentOf<typeof LoggedInPostOperationsFragment> {}

export const MentionReplaceFragment = graphql(
  `fragment MentionReplace on MentionReplace {
    __typename
    from
    to
  }`,
);
export type MentionReplace = FragmentOf<typeof MentionReplaceFragment>;

export const AccountMentionFragment = graphql(
  `fragment AccountMention on AccountMention {
    __typename
    account
    namespace
    replace {
      ...MentionReplace
    }
  }`,
  [MentionReplaceFragment],
);
export type AccountMention = FragmentOf<typeof AccountMentionFragment>;

export const GroupMentionFragment = graphql(
  `fragment GroupMention on GroupMention {
    __typename
    group
    replace {
      ...MentionReplace
    }
  }`,
  [MentionReplaceFragment],
);
export type GroupMention = FragmentOf<typeof GroupMentionFragment>;

export const PostMentionFragment = graphql(
  `fragment PostMention on PostMention {
    ... on AccountMention {
      ...AccountMention
    }
    ... on GroupMention {
      ...GroupMention
    }
  }`,
  [AccountMentionFragment, GroupMentionFragment],
);
export type PostMention = AccountMention | GroupMention;

export const PostStatsFragment = graphql(
  `fragment PostStats on PostStats {
    __typename
    bookmarks
    collects
    comments
    quotes
    upvotes: reactions(request: { type: UPVOTE })
    downvotes: reactions(request: { type: UPVOTE })
    reposts
    tips
  }`,
);
export type PostStats = FragmentOf<typeof PostStatsFragment>;

export const PostRulesFragment = graphql(
  `fragment PostRules on PostRules {
    __typename
    required {
      ...PostRule
    }
    anyOf {
      ...PostRule
    }
  }`,
  [PostRuleFragment],
);
export type PostRules = FragmentOf<typeof PostRulesFragment>;

export const MarketplaceMetadataAttributeFragment = graphql(
  `fragment MarketplaceMetadataAttribute on MarketplaceMetadataAttribute {
    __typename
    displayType
    traitType
    value
  }`,
);
export type MarketplaceMetadataAttribute = FragmentOf<typeof MarketplaceMetadataAttributeFragment>;

export const NftMetadataFragment = graphql(
  `fragment NftMetadata on NftMetadata {
    __typename
    animationUrl
    attributes {
      ...MarketplaceMetadataAttribute
    }
    description
    externalUrl
    image
    name
  }`,
  [MarketplaceMetadataAttributeFragment],
);
export interface NftMetadata extends FragmentOf<typeof NftMetadataFragment> {}

export const PostGroupInfoFragment = graphql(
  `fragment PostGroupInfo on PostGroupInfo {
    __typename
    address
    metadata {
      ...GroupMetadata
    }
  }`,
  [GroupMetadataFragment],
);
export interface PostGroupInfo extends FragmentOf<typeof PostGroupInfoFragment> {}

export const PostFeedInfoFragment = graphql(
  `fragment PostFeedInfo on PostFeedInfo {
    __typename
    address
    metadata {
      ...FeedMetadata
    }
    group {
      ...PostGroupInfo
    }
  }`,
  [FeedMetadataFragment, PostGroupInfoFragment],
);
export interface PostFeedInfo extends FragmentOf<typeof PostFeedInfoFragment> {}

const PostFieldsFragment = graphql(
  `fragment PostFields on Post {
    __typename
    slug
    isDeleted
    isEdited
    timestamp
    contentUri
    snapshotUrl: contentUri(request: { useSnapshot: true })
    feed {
      ...PostFeedInfo
    }
    app {
      ...App
    }
    metadata {
      ...PostMetadata
    }
    mentions {
      ...PostMention
    }
    stats {
      ...PostStats
    }
    actions {
      ...PostAction
    }
    rules {
      ...PostRules
    }
    operations {
      ...LoggedInPostOperations
    }
    collectibleMetadata {
      ...NftMetadata
    }
  }`,
  [
    PostFeedInfoFragment,
    AppFragment,
    PostMetadataFragment,
    PostMentionFragment,
    PostStatsFragment,
    PostActionFragment,
    PostRulesFragment,
    LoggedInPostOperationsFragment,
    NftMetadataFragment,
  ],
);
export interface PostFields extends FragmentOf<typeof PostFieldsFragment> {}

export interface ReferencedPost
  extends Prettify<
    {
      __typename: 'Post';
      id: PostId;
      author: Account;
    } & PostFields
  > {}

// mitigates error TS7056: The inferred type of this node exceeds the maximum length
// the compiler will serialize. An explicit type annotation is needed.
export const ReferencedPostFragment: FragmentDocumentFor<ReferencedPost, 'Post', 'ReferencedPost'> =
  graphql(
    `fragment ReferencedPost on Post {
      __typename
      id
      author {
        ...Account
      }
      ...PostFields
    }`,
    [AccountFragment, PostFieldsFragment],
  );

export interface Post
  extends Prettify<
    {
      __typename: 'Post';
      id: PostId;
      author: Account;
      root?: ReferencedPost | null;
      quoteOf?: ReferencedPost | null;
      commentOn?: ReferencedPost | null;
    } & PostFields
  > {}

export const PostFragment: FragmentDocumentFor<Post> = graphql(
  `fragment Post on Post {
    __typename
    id
    author {
      ...Account
    }
    ...PostFields

    root {
      ...ReferencedPost
    }
    quoteOf {
      ...ReferencedPost
    }
    commentOn {
      ...ReferencedPost
    }
  }`,
  [AccountFragment, PostFieldsFragment, ReferencedPostFragment],
);

export interface Repost {
  __typename: 'Repost';
  id: PostId;
  slug: PostId;
  isDeleted: boolean;
  timestamp: DateTime;
  app: App;
  author: Account;
  repostOf: Post;
}

export const RepostFragment: FragmentDocumentFor<Repost, 'Repost'> = graphql(
  `fragment Repost on Repost {
    __typename
    id
    slug
    isDeleted
    timestamp
    app {
      ...App
    }
    author {
      ...Account
    }
    repostOf {
      ...Post
    }
  }`,
  [AppFragment, AccountFragment, PostFragment],
);

export type AnyPost = Post | Repost;

export const AnyPostFragment: FragmentDocumentFor<AnyPost, 'AnyPost'> = graphql(
  `fragment AnyPost on AnyPost {
    ...on Post {
      ...Post
    }

    ...on Repost {
      ...Repost
    }
  }`,
  [PostFragment, RepostFragment],
);

export const PostReactionFragment = graphql(
  `fragment PostReaction on PostReaction {
    __typename
    reactedAt
    reaction
    app
  }`,
);
export type PostReaction = FragmentOf<typeof PostReactionFragment>;

export const AccountPostReactionFragment = graphql(
  `fragment AccountPostReaction on AccountPostReaction {
    __typename
    account {
      ...Account
    }
    reactions {
      ...PostReaction
    }
  }`,
  [AccountFragment, PostReactionFragment],
);
export type AccountPostReaction = FragmentOf<typeof AccountPostReactionFragment>;
