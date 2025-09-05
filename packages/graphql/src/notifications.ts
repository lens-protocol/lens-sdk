import type { DateTime, ID, PostId } from '@lens-protocol/types';

import {
  type Account,
  AccountFragment,
  type Erc20Amount,
  Erc20AmountFragment,
  type Group,
  GroupFragment,
  PaginatedResultInfoFragment,
  type PayableAmount,
  PayableAmountFragment,
  type PostReaction,
  PostReactionFragment,
  type RawKeyValue,
  RawKeyValueFragment,
  type ReferencedPost,
  ReferencedPostFragment,
  type SimpleCollectAction,
  SimpleCollectActionFragment,
  type UnknownAccountAction,
  UnknownAccountActionFragment,
  type UnknownPostAction,
  UnknownPostActionFragment,
} from './fragments';
import {
  type __FutureProofUnion,
  type FragmentDocumentFor,
  graphql,
  type RequestOf,
} from './graphql';

export interface NotificationAccountFollow {
  __typename: 'NotificationAccountFollow';
  followedAt: DateTime;
  account: Account;
}

export const NotificationAccountFollowFragment: FragmentDocumentFor<NotificationAccountFollow> =
  graphql(
    `fragment NotificationAccountFollow on NotificationAccountFollow {
      __typename
      followedAt
      account {
        ...Account
      }
    }`,
    [AccountFragment],
  );

export interface FollowNotification {
  __typename: 'FollowNotification';
  id: ID;
  followers: NotificationAccountFollow[];
}

export const FollowNotificationFragment: FragmentDocumentFor<FollowNotification> =
  graphql(
    `fragment FollowNotification on FollowNotification {
    __typename
    id
    followers {
      ...NotificationAccountFollow
    }
  }`,
    [NotificationAccountFollowFragment],
  );

export interface NotificationAccountPostReaction {
  __typename: 'NotificationAccountPostReaction';
  account: Account;
  reactions: PostReaction[];
}

export const NotificationAccountPostReactionFragment: FragmentDocumentFor<NotificationAccountPostReaction> =
  graphql(
    `fragment NotificationAccountPostReaction on NotificationAccountPostReaction {
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

export interface ReactionNotification {
  __typename: 'ReactionNotification';
  id: ID;
  reactions: NotificationAccountPostReaction[];
  post: ReferencedPost;
}

export const ReactionNotificationFragment: FragmentDocumentFor<ReactionNotification> =
  graphql(
    `fragment ReactionNotification on ReactionNotification {
    __typename
    id
    reactions {
      ...NotificationAccountPostReaction
    }
    post {
      ...ReferencedPost
    }
  }`,
    [NotificationAccountPostReactionFragment, ReferencedPostFragment],
  );

export interface CommentNotification {
  __typename: 'CommentNotification';
  id: ID;
  comment: ReferencedPost;
}

export const CommentNotificationFragment: FragmentDocumentFor<CommentNotification> =
  graphql(
    `fragment CommentNotification on CommentNotification {
    __typename
    id
    comment {
      ...ReferencedPost
    }
  }`,
    [ReferencedPostFragment],
  );

export interface NotificationAccountRepost {
  __typename: 'NotificationAccountRepost';
  account: Account;
  repostedAt: DateTime;
  repostId: PostId;
}

export const NotificationAccountRepostFragment: FragmentDocumentFor<NotificationAccountRepost> =
  graphql(
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

export interface RepostNotification {
  __typename: 'RepostNotification';
  id: ID;
  reposts: NotificationAccountRepost[];
  post: ReferencedPost;
}

export const RepostNotificationFragment: FragmentDocumentFor<RepostNotification> =
  graphql(
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

export interface QuoteNotification {
  __typename: 'QuoteNotification';
  id: ID;
  quote: ReferencedPost;
}

export const QuoteNotificationFragment: FragmentDocumentFor<QuoteNotification> =
  graphql(
    `fragment QuoteNotification on QuoteNotification {
    __typename
    id
    quote {
      ...ReferencedPost
    }
  }`,
    [ReferencedPostFragment],
  );

export interface MentionNotification {
  __typename: 'MentionNotification';
  id: ID;
  post: ReferencedPost;
}

export const MentionNotificationFragment: FragmentDocumentFor<MentionNotification> =
  graphql(
    `fragment MentionNotification on MentionNotification {
    __typename
    id
    post {
      ...ReferencedPost
    }
  }`,
    [ReferencedPostFragment],
  );

export interface TippingAccountActionExecuted {
  __typename: 'TippingAccountActionExecuted';
  /**
   * @deprecated Use `tipAmount` field instead which supports both ERC20 and native amounts.
   */
  amount: Erc20Amount;
  tipAmount: PayableAmount;
  executedBy: Account;
  executedAt: DateTime;
}

export const TippingAccountActionExecutedFragment: FragmentDocumentFor<TippingAccountActionExecuted> =
  graphql(
    `fragment TippingAccountActionExecuted on TippingAccountActionExecuted {
      __typename
      amount {
        ...Erc20Amount
      }
      tipAmount {
        ...PayableAmount
      }
      executedBy{
        ...Account
      }
      executedAt
    }`,
    [AccountFragment, Erc20AmountFragment, PayableAmountFragment],
  );

export interface UnknownAccountActionExecuted {
  __typename: 'UnknownAccountActionExecuted';
  params: RawKeyValue[];
  executedBy: Account;
  executedAt: DateTime;
  action: UnknownAccountAction;
}

export const UnknownAccountActionExecutedFragment: FragmentDocumentFor<UnknownAccountActionExecuted> =
  graphql(
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

export type AccountActionExecuted =
  | __FutureProofUnion
  | TippingAccountActionExecuted
  | UnknownAccountActionExecuted;

export const AccountActionExecutedFragment: FragmentDocumentFor<
  AccountActionExecuted,
  'AccountActionExecuted'
> = graphql(
  `fragment AccountActionExecuted on AccountActionExecuted {
    ... on TippingAccountActionExecuted{
      ...TippingAccountActionExecuted
    }
    ... on UnknownAccountActionExecuted {
      ...UnknownAccountActionExecuted
    }
  }`,
  [TippingAccountActionExecutedFragment, UnknownAccountActionExecutedFragment],
);

export interface AccountActionExecutedNotification {
  __typename: 'AccountActionExecutedNotification';
  id: ID;
  actions: AccountActionExecuted[];
}

export const AccountActionExecutedNotificationFragment: FragmentDocumentFor<AccountActionExecutedNotification> =
  graphql(
    `fragment AccountActionExecutedNotification on AccountActionExecutedNotification {
      __typename
      id
      actions {
        ...AccountActionExecuted
      }
    }`,
    [AccountActionExecutedFragment],
  );

export interface GroupMembershipRequestApprovedNotification {
  __typename: 'GroupMembershipRequestApprovedNotification';
  id: ID;
  group: Group;
  approvedBy: Account;
  approvedAt: DateTime;
}

export const GroupMembershipRequestApprovedNotificationFragment: FragmentDocumentFor<GroupMembershipRequestApprovedNotification> =
  graphql(
    `fragment GroupMembershipRequestApprovedNotification on GroupMembershipRequestApprovedNotification {
      __typename
      id
      group {
        ...Group
      }
      approvedBy {
        ...Account
      }
      approvedAt
    }`,
    [AccountFragment, GroupFragment],
  );

export interface GroupMembershipRequestRejectedNotification {
  __typename: 'GroupMembershipRequestRejectedNotification';
  id: ID;
  group: Group;
  rejectedBy: Account;
  rejectedAt: DateTime;
}

export const GroupMembershipRequestRejectedNotificationFragment: FragmentDocumentFor<GroupMembershipRequestRejectedNotification> =
  graphql(
    `fragment GroupMembershipRequestRejectedNotification on GroupMembershipRequestRejectedNotification {
      __typename
      id
      group {
        ...Group
      }
      rejectedBy {
        ...Account
      }
      rejectedAt
    }`,
    [AccountFragment, GroupFragment],
  );

export interface SimpleCollectPostActionExecuted {
  __typename: 'SimpleCollectPostActionExecuted';
  executedBy: Account;
  executedAt: DateTime;
  action: SimpleCollectAction;
}

export const SimpleCollectPostActionExecutedFragment: FragmentDocumentFor<SimpleCollectPostActionExecuted> =
  graphql(
    `fragment SimpleCollectPostActionExecuted on SimpleCollectPostActionExecuted {
      __typename
      executedBy {
        ...Account
      }
      executedAt
      action {
        ...SimpleCollectAction
      }
    }`,
    [AccountFragment, SimpleCollectActionFragment],
  );

export interface TippingPostActionExecuted {
  __typename: 'TippingPostActionExecuted';
  executedAt: DateTime;
  /**
   * @deprecated Use `tipAmount` field instead which supports both ERC20 and native amounts.
   */
  amount: Erc20Amount;
  tipAmount: PayableAmount;
  executedBy: Account;
}

export const TippingPostActionExecutedFragment: FragmentDocumentFor<TippingPostActionExecuted> =
  graphql(
    `fragment TippingPostActionExecuted on TippingPostActionExecuted {
      __typename
      executedAt
      amount {
        ...Erc20Amount
      }
      tipAmount {
        ...PayableAmount
      }
      executedBy {
        ...Account
      }
    }`,
    [AccountFragment, Erc20AmountFragment, PayableAmountFragment],
  );

export interface UnknownPostActionExecuted {
  __typename: 'UnknownPostActionExecuted';
  action: UnknownPostAction;
  executedAt: DateTime;
  executedBy: Account;
  params: RawKeyValue[];
}

export const UnknownPostActionExecutedFragment: FragmentDocumentFor<UnknownPostActionExecuted> =
  graphql(
    `fragment UnknownPostActionExecuted on UnknownPostActionExecuted {
      __typename
      params {
        ...RawKeyValue
      }
      executedBy {
        ...Account
      }
      executedAt
      action {
        ...UnknownPostAction
      }
    }`,
    [AccountFragment, RawKeyValueFragment, UnknownPostActionFragment],
  );

export type PostActionExecuted =
  | __FutureProofUnion
  | SimpleCollectPostActionExecuted
  | TippingPostActionExecuted
  | UnknownPostActionExecuted;

export const PostActionExecutedFragment: FragmentDocumentFor<
  PostActionExecuted,
  'PostActionExecuted'
> = graphql(
  `fragment PostActionExecuted on PostActionExecuted {
    ... on SimpleCollectPostActionExecuted {
      ...SimpleCollectPostActionExecuted
    }
    ... on TippingPostActionExecuted {
      ...TippingPostActionExecuted
    }
    ... on UnknownPostActionExecuted {
      ...UnknownPostActionExecuted
    }
  }`,
  [
    SimpleCollectPostActionExecutedFragment,
    TippingPostActionExecutedFragment,
    UnknownPostActionExecutedFragment,
  ],
);

export interface PostActionExecutedNotification {
  __typename: 'PostActionExecutedNotification';
  id: ID;
  actions: PostActionExecuted[];
  post: ReferencedPost;
}

const PostActionExecutedNotificationFragment: FragmentDocumentFor<PostActionExecutedNotification> =
  graphql(
    `fragment PostActionExecutedNotification on PostActionExecutedNotification {
      __typename
      id
      post {
        ...ReferencedPost
      }
      actions{
        ...PostActionExecuted
      }
    }`,
    [PostActionExecutedFragment, ReferencedPostFragment],
  );

export interface TokenDistributedNotification {
  __typename: 'TokenDistributedNotification';
  id: ID;
  account: Account;
  amount: PayableAmount;
  actionDate: DateTime;
}

export const TokenDistributedNotificationFragment: FragmentDocumentFor<TokenDistributedNotification> =
  graphql(
    `fragment TokenDistributedNotification on TokenDistributedNotification {
      __typename
      id
      account {
        ...Account
      }
      amount {
        ...PayableAmount
      }
      actionDate
    }`,
    [AccountFragment, PayableAmountFragment],
  );

export type Notification =
  | __FutureProofUnion
  | AccountActionExecutedNotification
  | GroupMembershipRequestApprovedNotification
  | GroupMembershipRequestRejectedNotification
  | PostActionExecutedNotification
  | FollowNotification
  | ReactionNotification
  | CommentNotification
  | RepostNotification
  | QuoteNotification
  | MentionNotification
  | TokenDistributedNotification;

const NotificationFragment: FragmentDocumentFor<Notification, 'Notification'> =
  graphql(
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
    ... on TokenDistributedNotification {
      ...TokenDistributedNotification
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
      TokenDistributedNotificationFragment,
    ],
  );

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
