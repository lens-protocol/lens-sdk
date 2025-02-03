import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';
import { AccountFragment } from './account';
import {
  ActionInputInfoFragment,
  AmountFragment,
  BooleanValueFragment,
  ExtraDataFragment,
  NetworkAddressFragment,
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
import { AppFragment, FeedFragment } from './primitives';

export const RecipientDataOutputFragment = graphql(
  `fragment RecipientDataOutput on RecipientDataOutput {
    __typename
    recipient
    split
  }`,
);
export type RecipientDataOutput = FragmentOf<typeof RecipientDataOutputFragment>;

export const SimpleCollectActionSettingsFragment = graphql(
  `fragment SimpleCollectActionSettings on SimpleCollectActionSettings {
    __typename
    contract {
      ...NetworkAddress
    }
    amount {
      ...Amount
    }
    collectNft
    collectLimit
    followerOnly
    recipient
    referralFee
    endsAt
    recipients {
      ...RecipientDataOutput
    }
  }`,
  [AmountFragment, NetworkAddressFragment, RecipientDataOutputFragment],
);
export type SimpleCollectActionSettingsFragment = FragmentOf<
  typeof SimpleCollectActionSettingsFragment
>;

export const UnknownActionSettingsFragment = graphql(
  `fragment UnknownActionSettings on UnknownActionSettings {
    __typename
    initializeCalldata
    initializeResultData
    verified
    contract {
      ...NetworkAddress
    }
    collectNft
  }`,
  [NetworkAddressFragment],
);
export type UnknownActionSettings = FragmentOf<typeof UnknownActionSettingsFragment>;

export const PostActionFragment = graphql(
  `fragment PostAction on PostAction {
    ... on SimpleCollectActionSettings {
      ...SimpleCollectActionSettings
    }
    ... on UnknownActionSettings {
      ...UnknownActionSettings
    }
  }`,
  [SimpleCollectActionSettingsFragment, UnknownActionSettingsFragment],
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

export const FeedRuleFragment = graphql(
  `fragment FeedRule on FeedRule {
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
export type FeedRule = FragmentOf<typeof FeedRuleFragment>;

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
  `fragment PostOperationValidationRule on OperationValidationRule {
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

/*
type PostUnsatisfiedRule {
  rule: EvmAddress!
  reason: PostRuleUnsatisfiedReason!
  message: String!
  extraData: [ExtraData!]!
}

type PostUnsatisfiedRules {
  required: [PostUnsatisfiedRule!]!
  anyOf: [PostUnsatisfiedRule!]!
}

type PostOperationValidationFailed {
  unsatisfiedRules: PostUnsatisfiedRules
  reason: String!
}

union PostOperationValidationOutcome = PostOperationValidationPassed | PostOperationValidationUnknown | PostOperationValidationFailed
*/

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

export const ReferencedPostFragment = graphql(
  `fragment ReferencedPost on Post {
    __typename
    id
    author {
      ...Account
    }
    feed {
      ...Feed
    }
    timestamp
    app {
      ...App
    }
    metadata {
      ...PostMetadata
    }
    actions {
      ...PostAction
    }
    operations {
      ...LoggedInPostOperations
    }
  }
  `,
  [
    AccountFragment,
    AppFragment,
    FeedFragment,
    PostMetadataFragment,
    PostActionFragment,
    LoggedInPostOperationsFragment,
  ],
);

export const PostStatsFragment = graphql(
  `fragment PostStats on PostStats {
    __typename
    bookmarks
    collects
    comments
    quotes
    reactions
    reposts
  }`,
);
export type PostStats = FragmentOf<typeof PostStatsFragment>;

export const PostFragment = graphql(
  `fragment Post on Post {
    __typename
    id
    author {
      ...Account
    }
    feed {
      ...Feed
    }
    timestamp
    slug
    stats {
      ...PostStats
    }
    app {
      ...App
    }
    metadata {
      ...PostMetadata
    }
    root {
      ...ReferencedPost
    }
    quoteOf {
      ...ReferencedPost
    }
    commentOn {
      ...ReferencedPost
    }
    actions {
      ...PostAction
    }
    operations {
      ...LoggedInPostOperations
    }
  }
  `,
  [
    AccountFragment,
    AppFragment,
    FeedFragment,
    PostMetadataFragment,
    PostActionFragment,
    PostStatsFragment,
    ReferencedPostFragment,
    LoggedInPostOperationsFragment,
  ],
);
export type Post = FragmentOf<typeof PostFragment>;

// operations: LoggedInPostOperations
export const RepostFragment = graphql(
  `fragment Repost on Repost {
    __typename
    id
  }`,
  [],
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

export const UnknownActionFragment = graphql(
  `fragment UnknownAction on UnknownAction {
    __typename
    name
    contract {
      ...NetworkAddress
    }
  }`,
  [NetworkAddressFragment],
);
export type UnknownAction = FragmentOf<typeof UnknownActionFragment>;

export const ActionInfoFragment = graphql(
  `fragment ActionInfo on ActionInfo {
    ... on KnownAction {
      ...KnownAction
    }
    ... on UnknownAction {
      ...UnknownAction
    }
  }`,
  [KnownActionFragment, UnknownActionFragment],
);
export type ActionInfo = FragmentOf<typeof ActionInfoFragment>;

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
