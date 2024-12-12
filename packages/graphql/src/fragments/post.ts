import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';
import { AccountFragment } from './account';
import { ActionInputInfo, Amount, BooleanValue, NetworkAddress } from './common';
import { App, Feed } from './primitives';

export type PostActionType = ReturnType<typeof graphql.scalar<'PostActionType'>>;

export const RecipientDataOutput = graphql(
  `fragment RecipientDataOutput on RecipientDataOutput {
    __typename
    recipient
    split
  }`,
);
export type RecipientDataOutput = FragmentOf<typeof RecipientDataOutput>;

export const SimpleCollectActionSettings = graphql(
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
  [Amount, NetworkAddress, RecipientDataOutput],
);
export type SimpleCollectActionSettings = FragmentOf<typeof SimpleCollectActionSettings>;

export const UnknownActionSettings = graphql(
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
  [NetworkAddress],
);
export type UnknownActionSettings = FragmentOf<typeof UnknownActionSettings>;

export const PostAction = graphql(
  `fragment PostAction on PostAction {
    ... on SimpleCollectActionSettings {
      ...SimpleCollectActionSettings
    }
    ... on UnknownActionSettings {
      ...UnknownActionSettings
    }
  }`,
  [SimpleCollectActionSettings, UnknownActionSettings],
);
export type PostAction = FragmentOf<typeof PostAction>;

// TODO add metadata fragments once problems with current schema are resolved
export const PostMetadata = graphql(
  `fragment PostMetadata on PostMetadata {
    __typename
  }`,
);
export type PostMetadata = FragmentOf<typeof PostMetadata>;

export type PostReactionType = ReturnType<typeof graphql.scalar<'PostReactionType'>>;

export const LoggedInPostOperations = graphql(
  `fragment LoggedInPostOperations on LoggedInPostOperations {
    __typename
    id
    isNotInterested
    hasBookmarked
    hasReported
    hasUpvoted: hasReacted(request: { type: UPVOTE })
    hasDownvoted: hasReacted(request: { type: DOWNVOTE })
    canComment
    canQuote
    canRepost
    hasCommented {
      ...BooleanValue
    }
    hasQuoted {
      ...BooleanValue
    }
    hasReposted {
      ...BooleanValue
    }
  }`,
  [BooleanValue],
);
export type LoggedInPostOperations = FragmentOf<typeof LoggedInPostOperations>;

export const PostReference = graphql(
  `fragment PostReference on PostReference {
    id
  }`,
);
export type PostReference = FragmentOf<typeof PostReference>;

export const ReferencedPost = graphql(
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
  }`,
  [App, Feed, PostMetadata, PostAction, LoggedInPostOperations],
);

export const NestedPost = graphql(
  `fragment NestedPost on NestedPost {
    ...on Post {
      ...ReferencedPost
    }
    ...on PostReference {
      ...PostReference
    }
  }`,
  [PostReference, ReferencedPost],
);
export type NestedPost = FragmentOf<typeof NestedPost>;

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
    app {
      ...App
    }
    metadata {
      ...PostMetadata
    }
    root {
      ...NestedPost
    }
    quoteOf {
      ...NestedPost
    }
    commentOn {
      ...NestedPost
    }
    actions {
      ...PostAction
    }
    operations {
      ...LoggedInPostOperations
    }
  }
  `,
  [App, Feed, PostMetadata, PostAction, NestedPost, LoggedInPostOperations],
);

export type Post = FragmentOf<typeof PostFragment>;

// operations: LoggedInPostOperations
export const Repost = graphql(
  `fragment Repost on Repost {
    __typename
    id
  }`,
  [],
);
export type Repost = FragmentOf<typeof Repost>;

export const AnyPost = graphql(
  `fragment AnyPost on AnyPost {
    ...on Post {
      ...Post
    }

    ...on Repost {
      ...Repost
    }
  }`,
  [PostFragment, Repost],
);
export type AnyPost = FragmentOf<typeof AnyPost>;

export const KnownAction = graphql(
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
  [NetworkAddress, ActionInputInfo],
);
export type KnownAction = FragmentOf<typeof KnownAction>;

export const UnknownAction = graphql(
  `fragment UnknownAction on UnknownAction {
    __typename
    name
    contract {
      ...NetworkAddress
    }
  }`,
  [NetworkAddress],
);
export type UnknownAction = FragmentOf<typeof UnknownAction>;

export const ActionInfo = graphql(
  `fragment ActionInfo on ActionInfo {
    ... on KnownAction {
      ...KnownAction
    }
    ... on UnknownAction {
      ...UnknownAction
    }
  }`,
  [KnownAction, UnknownAction],
);
export type ActionInfo = FragmentOf<typeof ActionInfo>;

export const PostReaction = graphql(
  `fragment PostReaction on PostReaction {
    __typename
    reactedAt
    reaction
  }`,
);
export type PostReaction = FragmentOf<typeof PostReaction>;

export const AccountPostReaction = graphql(
  `fragment AccountPostReaction on AccountPostReaction {
    __typename
    account {
      ...Account
    }
    reactions {
      ...PostReaction
    }
  }`,
  [AccountFragment, PostReaction],
);
export type AccountPostReaction = FragmentOf<typeof AccountPostReaction>;
