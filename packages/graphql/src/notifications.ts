import type { FragmentOf } from 'gql.tada';
import { AccountFragment, PaginatedResultInfoFragment, PostFragment } from './fragments';
import { type RequestOf, graphql } from './graphql';

const FollowNotificationFragment = graphql(
  `fragment FollowNotification on FollowNotification {
    __typename
    id
    followers {
      account {
        ...Account
      }
      followedAt
    }
  }`,
  [AccountFragment],
);
export type FollowNotification = FragmentOf<typeof FollowNotificationFragment>;

const ReactionNotificationFragment = graphql(
  `fragment ReactionNotification on ReactionNotification {
    __typename
    id
    reactions {
      account {
        ...Account
      }
      reactions {
        reactedAt
        reaction
      }
    }
    post {
      ...Post
    }
  }`,
  [AccountFragment, PostFragment],
);
export type ReactionNotification = FragmentOf<typeof ReactionNotificationFragment>;

const CommentNotificationFragment = graphql(
  `fragment CommentNotification on CommentNotification {
    __typename
    id
    comment {
      ...Post
    }
  }`,
  [PostFragment],
);
export type CommentNotification = FragmentOf<typeof CommentNotificationFragment>;

const NotificationAccountRepostFragment = graphql(
  `fragment NotificationAccountRepost on NotificationAccountRepost {
    repostId
    account {
      ...Account
    }
    repostedAt
  }`,
  [AccountFragment],
);
export type NotificationAccountRepost = FragmentOf<typeof NotificationAccountRepostFragment>;

const RepostNotificationFragment = graphql(
  `fragment RepostNotification on RepostNotification {
    __typename
    id
    reposts {
      ...NotificationAccountRepost
    }
    post {
      ...Post
    }
  }`,
  [NotificationAccountRepostFragment, PostFragment],
);
export type RepostNotification = FragmentOf<typeof RepostNotificationFragment>;

const QuoteNotificationFragment = graphql(
  `fragment QuoteNotification on QuoteNotification {
    __typename
    id
    quote {
      ...Post
    }
  }`,
  [PostFragment],
);
export type QuoteNotification = FragmentOf<typeof QuoteNotificationFragment>;

const MentionNotificationFragment = graphql(
  `fragment MentionNotification on MentionNotification {
    __typename
    id
    post {
      ...Post
    }
  }`,
  [PostFragment],
);
export type MentionNotification = FragmentOf<typeof MentionNotificationFragment>;

const NotificationFragment = graphql(
  `fragment Notification on Notification {
    ... on FollowNotification {
      ...FollowNotification
    }
    ... on ReactionNotification {
      ...ReactionNotification
    }
    ... on CommentNotification {
      ...CommentNotification
    }
    ... on RepostNotification {
      ...RepostNotification
    }
    ... on QuoteNotification {
      ...QuoteNotification
    }
    ... on MentionNotification {
      ...MentionNotification
    }
  }`,
  [
    FollowNotificationFragment,
    ReactionNotificationFragment,
    CommentNotificationFragment,
    RepostNotificationFragment,
    QuoteNotificationFragment,
    MentionNotificationFragment,
  ],
);

export type Notification =
  | FollowNotification
  | ReactionNotification
  | CommentNotification
  | RepostNotification
  | QuoteNotification
  | MentionNotification;

export const NotificationsQuery = graphql(
  `query Notifications($request: NotificationRequest!) {
    value: notifications(request: $request) {
      __typename
      items {
        ...Notification
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [NotificationFragment, PaginatedResultInfoFragment],
);
export type NotificationsRequest = RequestOf<typeof NotificationsQuery>;
