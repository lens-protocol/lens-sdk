import type { PostId } from '@lens-protocol/types';
import type { Prettify } from '@lens-protocol/types';
import type { FragmentOf } from 'gql.tada';
import { type FragmentDocumentFor, graphql } from '../graphql';
import { type Account, AccountFragment } from './account';
import {
  ActionInputInfoFragment,
  BooleanValueFragment,
  ExtraDataFragment,
  NetworkAddressFragment,
  UnknownActionFragment,
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
  VideoMetadataFragment,
} from './metadata';
import { AppFragment, type FeedRule, FeedRuleFragment } from './primitives';

export const RecipientDataOutputFragment = graphql(
  `fragment RecipientDataOutput on RecipientDataOutput {
    __typename
    recipient
    split
  }`,
);
export type RecipientDataOutput = FragmentOf<typeof RecipientDataOutputFragment>;

export const SimpleCollectActionSettingsFragment = graphql(
  `fragment SimpleCollectAction on SimpleCollectAction {
    __typename
    address
  }`,
  [],
);
export type SimpleCollectActionSettingsFragment = FragmentOf<
  typeof SimpleCollectActionSettingsFragment
>;

export const TippingPostActionSettingsFragment = graphql(
  `fragment TippingPostAction on TippingPostAction {
    __typename
    address
  }`,
  [],
);
export type TippingPostActionSettingsFragment = FragmentOf<
  typeof TippingPostActionSettingsFragment
>;

export const PostActionFragment = graphql(
  `fragment PostAction on PostAction {
    ... on SimpleCollectAction {
      ...SimpleCollectAction
    }
    ... on TippingPostAction {
      ...TippingPostAction
    }
    ... on UnknownAction {
      ...UnknownAction
    }
  }`,
  [SimpleCollectActionSettingsFragment, TippingPostActionSettingsFragment, UnknownActionFragment],
);

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
  ],
);
export type PostMetadata = FragmentOf<typeof PostMetadataFragment>;

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
    extraData {
      ...ExtraData
    }
  }`,
  [ExtraDataFragment],
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
    extraData {
      ...ExtraData
    }
  }`,
  [ExtraDataFragment],
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

export const PostOperationValidationOutcome = graphql(
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
    isNotInterested
  }`,
  [BooleanValueFragment, PostOperationValidationOutcome],
);
export type LoggedInPostOperations = FragmentOf<typeof LoggedInPostOperationsFragment>;

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

const PostFieldsFragment = graphql(
  `fragment PostFields on Post {
    __typename
    slug
    feed
    isDeleted
    isEdited
    timestamp
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
  }`,
  [
    AppFragment,
    PostMetadataFragment,
    PostMentionFragment,
    PostStatsFragment,
    PostActionFragment,
    PostRulesFragment,
    LoggedInPostOperationsFragment,
  ],
);
export type PostFields = FragmentOf<typeof PostFieldsFragment>;

export type ReferencedPost = Prettify<
  {
    id: PostId;
    author: Account;
  } & PostFields
>;
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

export const PostFragment = graphql(
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
  }
  `,
  [AccountFragment, PostFieldsFragment, ReferencedPostFragment],
);
export type Post = FragmentOf<typeof PostFragment>;

export const RepostFragment = graphql(
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
export type Repost = FragmentOf<typeof RepostFragment>;

export const AnyPostFragment = graphql(
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
export type AnyPost = FragmentOf<typeof AnyPostFragment>;

export const KnownActionFragment = graphql(
  `fragment KnownAction on KnownAction {
    __typename
    name
    setupInput {
      ...ActionInputInfo
    }
    actionInput {
      ...ActionInputInfo
    }
    returnSetupInput {
      ...ActionInputInfo
    }
    contract {
      ...NetworkAddress
    }
  }`,
  [NetworkAddressFragment, ActionInputInfoFragment],
);
export type KnownAction = FragmentOf<typeof KnownActionFragment>;

export const PostReactionFragment = graphql(
  `fragment PostReaction on PostReaction {
    __typename
    reactedAt
    reaction
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
