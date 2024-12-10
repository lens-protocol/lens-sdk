import type { Prettify } from '@lens-protocol/types';
import type { FragmentOf } from 'gql.tada';
import { type Account, PaginatedResultInfoFragment, PostFragment } from './fragments';
import {
  type DynamicFragmentOf,
  type FragmentDocumentFor,
  type Paginated,
  type RequestFrom,
  type StandardDocumentNode,
  fragment,
  graphql,
} from './graphql';

const FollowNotificationFragment = fragment(
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
);
export type FollowNotification<TAccount extends Account> = DynamicFragmentOf<
  typeof FollowNotificationFragment,
  [TAccount]
>;

const ReactionNotificationFragment = fragment(
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
  [PostFragment],
);
export type ReactionNotification<TAccount extends Account> = DynamicFragmentOf<
  typeof ReactionNotificationFragment,
  [TAccount]
>;

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

const RepostNotificationFragment = fragment(
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
  [PostFragment],
);
export type RepostNotification<TAccount extends Account> = Prettify<
  DynamicFragmentOf<typeof RepostNotificationFragment, [TAccount]>
>;

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

export type Notification<TAccount extends Account> =
  | FollowNotification<TAccount>
  | ReactionNotification<TAccount>
  | CommentNotification
  | RepostNotification<TAccount>
  | QuoteNotification
  | MentionNotification;

const query = `
  query Notifications($request: NotificationRequest!) {
    value: notifications(request: $request) {
      __typename
      items {
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
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
`;
export type NotificationsRequest = RequestFrom<typeof query>;

export function notificationsQuery<TAccount extends Account>(
  AccountFragment: FragmentDocumentFor<TAccount>,
): StandardDocumentNode<Paginated<Notification<TAccount>>, NotificationsRequest> {
  return graphql(query, [
    FollowNotificationFragment,
    ReactionNotificationFragment,
    CommentNotificationFragment,
    RepostNotificationFragment,
    QuoteNotificationFragment,
    MentionNotificationFragment,
    AccountFragment,
    PostFragment,
    PaginatedResultInfoFragment,
  ]) as StandardDocumentNode;
}
