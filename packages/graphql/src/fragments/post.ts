import type { FragmentOf } from 'gql.tada';
import { type FragmentDocumentFor, type PartialFragmentOf, graphql, partial } from '../graphql';
import { type Account, AccountFragment } from './account';
import {
  ActionInputInfoFragment,
  AmountFragment,
  BooleanValueFragment,
  NetworkAddressFragment,
  OperationValidationOutcomeFragment,
} from './common';
import {
  ArticleMetadataFragment,
  AudioMetadataFragment,
  CheckingInMetadataFragment,
  EmbedMetadataFragment,
  EventMetadataFragment,
  ImageMetadataFragment,
  LinkMetadataFragment,
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
export type SimpleCollectActionSettings = FragmentOf<typeof SimpleCollectActionSettingsFragment>;

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

export type PostAction = SimpleCollectActionSettings | UnknownActionSettings;
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

/**
 * @deprecated Define your own PostMetadataFragment instead using {@link graphql} and {@link FragmentOf}.
 */
export const FullPostMetadataFragment = graphql(
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
    ... on LinkMetadata {
      ...LinkMetadata
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
    LinkMetadataFragment,
    TransactionMetadataFragment,
    VideoMetadataFragment,
  ],
);

export type FullPostMetadata = FragmentOf<typeof FullPostMetadataFragment>;

export const LoggedInPostOperationsFragment = graphql(
  `fragment LoggedInPostOperations on LoggedInPostOperations {
    __typename
    id
    canComment {
      ...OperationValidationOutcome
    }
    canDelete {
      ...OperationValidationOutcome
    }
    canEdit {
      ...OperationValidationOutcome
    }
    canQuote {
      ...OperationValidationOutcome
    }
    canRepost {
      ...OperationValidationOutcome
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
  [BooleanValueFragment, OperationValidationOutcomeFragment],
);
export type LoggedInPostOperations = FragmentOf<typeof LoggedInPostOperationsFragment>;

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

export const PostFieldsFragment = graphql(
  `fragment PostFields on Post {
    __typename
    id
    timestamp
    slug
  }`,
);
export type PostFields = FragmentOf<typeof PostFieldsFragment>;

/**
 * @deprecated Define your own PostFieldsFragment instead using {@link graphql} and {@link FragmentOf}.
 *
 * @example
 * ```ts
 * const PostFieldsFragment = graphql(
 *   `fragment PostFields on Post {
 *     __typename
 *     id
 *     timestamp
 *     metadata {
 *       ...PostMetadata
 *     }
 *   }`,
 *   [],
 * );
 *
 * type PostFields = FragmentOf<typeof PostFieldsFragment>;
 * ```
 */
export const FullPostFieldsFragment = graphql(
  `fragment PostFields on Post {
    __typename
    id
    timestamp
    slug
    app {
      ...App
    }
    feed {
      ...Feed
    }
    metadata {
      ...PostMetadata
    }
    operations {
      ...LoggedInPostOperations
    }
    stats {
      ...PostStats
    }
  }`,
  [
    AppFragment,
    FeedFragment,
    LoggedInPostOperationsFragment,
    FullPostMetadataFragment,
    PostStatsFragment,
  ],
);
/**
 * @deprecated Define your own FullPostFieldsFragment instead using {@link graphql} and {@link FragmentOf}.
 */
export type FullPostFields = FragmentOf<typeof FullPostFieldsFragment>;

export const PostFragment = partial(
  `fragment Post on Post {
    ${'...PostFields'}

    author {
      ...Account
    }
    root {
      ${'...PostFields'}
      
      author {
        ...Account
      }
    }
    quoteOf {
      ${'...PostFields'}
      
      author {
        ...Account
      }
    }
    commentOn {
      ${'...PostFields'}
      
      author {
        ...Account
      }
    }
  }`,
);

export type Post<
  TPostFields extends PostFields = PostFields,
  TAccount extends Account = Account,
> = PartialFragmentOf<
  typeof PostFragment,
  [FragmentDocumentFor<TPostFields, 'Post', 'PostFields'>, FragmentDocumentFor<TAccount>]
>;

export const RepostFragment = partial(
  `fragment Repost on Repost {
    __typename
    id
    author {
      ...Account
    }
    isDeleted
    timestamp
    app {
      ...App
    }
    repostOf {
      ${'...PostFields'}

      author {
        ...Account
      }

      root {
        ${'...PostFields'}
      
        author {
          ...Account
        }
      }
      quoteOf {
        ${'...PostFields'}
      
        author {
          ...Account
        }
      }
      commentOn {
        ${'...PostFields'}
      
        author {
          ...Account
        }
      }
    }
  }`,
  [AppFragment],
);

export type Repost<
  TPostFields extends PostFields = PostFields,
  TAccount extends Account = Account,
> = PartialFragmentOf<
  typeof RepostFragment,
  [FragmentDocumentFor<TPostFields, 'Post', 'PostFields'>, FragmentDocumentFor<TAccount>]
>;

export const AnyPostFragment = partial(
  `fragment AnyPost on AnyPost {
    ...on Post {
      ${'...Post'}
    }

    ...on Repost {
      ${'...Repost'}
    }
  }`,
  [PostFragment, RepostFragment],
);
export type AnyPost<
  TPostFields extends PostFields = PostFields,
  TAccount extends Account = Account,
> = Post<TPostFields, TAccount> | Repost<TPostFields, TAccount>;

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
