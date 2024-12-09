import type { FragmentOf } from 'gql.tada';
import { Account, PaginatedResultInfo, Post } from './fragments';
import { type RequestOf, graphql } from './graphql';

const FollowNotification = graphql(
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
  [Account],
);
export type FollowNotification = FragmentOf<typeof FollowNotification>;

const ReactionNotification = graphql(
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
  [Account, Post],
);
export type ReactionNotification = FragmentOf<typeof ReactionNotification>;

const CommentNotification = graphql(
  `fragment CommentNotification on CommentNotification {
    __typename
    id
    comment {
      ...Post
    }
  }`,
  [Post],
);
export type CommentNotification = FragmentOf<typeof CommentNotification>;

const RepostNotification = graphql(
  `fragment RepostNotification on RepostNotification {
    __typename
    id
    reposts {
      repostId
      account {
        ...Account
      }
      repostedAt
    }
    post {
      ...Post
    }
  }`,
  [Account],
);
export type RepostNotification = FragmentOf<typeof RepostNotification>;

const QuoteNotification = graphql(
  `fragment QuoteNotification on QuoteNotification {
    __typename
    id
    quote {
      ...Post
    }
  }`,
  [Post],
);
export type QuoteNotification = FragmentOf<typeof QuoteNotification>;

const MentionNotification = graphql(
  `fragment MentionNotification on MentionNotification {
    __typename
    id
    post {
      ...Post
    }
  }`,
  [Post],
);
export type MentionNotification = FragmentOf<typeof MentionNotification>;

const Notification = graphql(
  `fragment Notification on Notification {
    __typename
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
    FollowNotification,
    ReactionNotification,
    CommentNotification,
    RepostNotification,
    QuoteNotification,
    MentionNotification,
  ],
);
export type Notification = FragmentOf<typeof Notification>;

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
  [Notification, PaginatedResultInfo],
);
export type NotificationsRequest = RequestOf<typeof NotificationsQuery>;
