import type { FragmentOf } from 'gql.tada';
import {
  AccountFragment,
  AnyPostFragment,
  Erc20AmountFragment,
  GroupFragment,
  PaginatedResultInfoFragment,
  RawKeyValueFragment,
  ReferencedPostFragment,
  UnknownAccountActionFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';
import {
  SimpleCollectPostActionExecutedFragment,
  TippingPostActionExecutedFragment,
  UnknownPostActionExecutedFragment,
} from './post';

const FollowNotificationFragment = graphql(
  `fragment FollowNotification on FollowNotification {
    __typename
    id
    followers {
      __typename
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
      __typename
      account {
        ...Account
      }
      reactions {
        __typename
        reactedAt
        reaction
      }
    }
    post {
      ...ReferencedPost
    }
  }`,
  [AccountFragment, ReferencedPostFragment],
);
export type ReactionNotification = FragmentOf<typeof ReactionNotificationFragment>;

const CommentNotificationFragment = graphql(
  `fragment CommentNotification on CommentNotification {
    __typename
    id
    comment {
      ...ReferencedPost
    }
  }`,
  [ReferencedPostFragment],
);
export type CommentNotification = FragmentOf<typeof CommentNotificationFragment>;

const NotificationAccountRepostFragment = graphql(
  `fragment NotificationAccountRepost on NotificationAccountRepost {
    __typename
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
      ...ReferencedPost
    }
  }`,
  [NotificationAccountRepostFragment, ReferencedPostFragment],
);
export type RepostNotification = FragmentOf<typeof RepostNotificationFragment>;

const QuoteNotificationFragment = graphql(
  `fragment QuoteNotification on QuoteNotification {
    __typename
    id
    quote {
      ...ReferencedPost
    }
  }`,
  [ReferencedPostFragment],
);
export type QuoteNotification = FragmentOf<typeof QuoteNotificationFragment>;

const MentionNotificationFragment = graphql(
  `fragment MentionNotification on MentionNotification {
    __typename
    id
    post {
      ...ReferencedPost
    }
  }`,
  [ReferencedPostFragment],
);
export type MentionNotification = FragmentOf<typeof MentionNotificationFragment>;

export const TippingAccountActionExecutedFragment = graphql(
  `fragment TippingAccountActionExecuted on TippingAccountActionExecuted {
    __typename
    amount {
      ...Erc20Amount
    }
    executedBy{
      ...Account
    }
    executedAt
  }`,
  [AccountFragment, Erc20AmountFragment],
);
export type TippingAccountActionExecuted = FragmentOf<typeof TippingAccountActionExecutedFragment>;

export const UnknownAccountActionExecutedFragment = graphql(
  `fragment UnknownAccountActionExecuted on UnknownAccountActionExecuted {
    __typename
    params {
      ...RawKeyValue
    }
    executedBy {
      ...Account
    }
    executedAt
    action {
      ...UnknownAccountAction
    }
  }`,
  [AccountFragment, UnknownAccountActionFragment, RawKeyValueFragment],
);
export type UnknownAccountActionExecuted = FragmentOf<typeof UnknownAccountActionExecutedFragment>;

export const AccountActionExecutedNotificationFragment = graphql(
  `fragment AccountActionExecutedNotification on AccountActionExecutedNotification {
    __typename
    id
    actions {
      ... on TippingAccountActionExecuted{
        ...TippingAccountActionExecuted
      }
      ... on UnknownAccountActionExecuted {
        ...UnknownAccountActionExecuted
      }
    }
  }`,
  [TippingAccountActionExecutedFragment, UnknownAccountActionExecutedFragment],
);
export type AccountActionExecutedNotification = FragmentOf<
  typeof AccountActionExecutedNotificationFragment
>;

const GroupMembershipRequestApprovedNotificationFragment = graphql(
  `fragment GroupMembershipRequestApprovedNotification on GroupMembershipRequestApprovedNotification {
    __typename
    id
    group {
      ...Group
    }
    approvedBy {
      ...Account
    }
  }`,
  [AccountFragment, GroupFragment],
);
export type GroupMembershipRequestApprovedNotification = FragmentOf<
  typeof GroupMembershipRequestApprovedNotificationFragment
>;

const GroupMembershipRequestRejectedNotificationFragment = graphql(
  `fragment GroupMembershipRequestRejectedNotification on GroupMembershipRequestRejectedNotification {
    __typename
    id
    group {
      ...Group
    }
    rejectedBy {
      ...Account
    }
  }`,
  [AccountFragment, GroupFragment],
);
export type GroupMembershipRequestRejectedNotification = FragmentOf<
  typeof GroupMembershipRequestRejectedNotificationFragment
>;

export const PostActionExecutedNotificationFragment = graphql(
  `fragment PostActionExecutedNotification on PostActionExecutedNotification {
    __typename
    id
    post {
      ...AnyPost
    }
    actions{
      ... on SimpleCollectPostActionExecuted {
        ...SimpleCollectPostActionExecuted
      }
      ... on TippingPostActionExecuted {
        ...TippingPostActionExecuted
      }
      ... on UnknownPostActionExecuted {
        ...UnknownPostActionExecuted
      }
    }
  }`,
  [
    SimpleCollectPostActionExecutedFragment,
    TippingPostActionExecutedFragment,
    UnknownPostActionExecutedFragment,
    AnyPostFragment,
  ],
);
export type PostActionExecutedNotification = FragmentOf<
  typeof PostActionExecutedNotificationFragment
>;

const NotificationFragment = graphql(
  `fragment Notification on Notification {
    __typename
    ... on AccountActionExecutedNotification {
      ...AccountActionExecutedNotification
    }
    ... on GroupMembershipRequestApprovedNotification {
      ...GroupMembershipRequestApprovedNotification
    }
    ... on GroupMembershipRequestRejectedNotification {
      ...GroupMembershipRequestRejectedNotification
    }
    ... on PostActionExecutedNotification {
      ...PostActionExecutedNotification
    }
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
    AccountActionExecutedNotificationFragment,
    GroupMembershipRequestApprovedNotificationFragment,
    GroupMembershipRequestRejectedNotificationFragment,
    PostActionExecutedNotificationFragment,
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
