// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  WalletFragment,
  ProfileFragment,
  PostFragment,
  MirrorFragment,
  CommentFragment,
  CommonPaginatedResultInfoFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  WalletFragmentDoc,
  ProfileFragmentDoc,
  PostFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  CommonPaginatedResultInfoFragmentDoc,
} from '../../graphql/fragments.generated';
export type NewFollowerNotificationFragment = {
  __typename: 'NewFollowerNotification';
  notificationId: string;
  createdAt: string;
  isFollowedByMe: boolean;
  wallet: WalletFragment;
};

export type NewCollectNotificationFragment = {
  __typename: 'NewCollectNotification';
  notificationId: string;
  createdAt: string;
  wallet: WalletFragment;
  collectedPublication: CommentFragment | MirrorFragment | PostFragment;
};

export type NewMirrorNotificationFragment = {
  __typename: 'NewMirrorNotification';
  notificationId: string;
  createdAt: string;
  profile: ProfileFragment;
  publication: CommentFragment | PostFragment;
};

export type NewCommentNotificationFragment = {
  __typename: 'NewCommentNotification';
  notificationId: string;
  createdAt: string;
  profile: ProfileFragment;
  comment: CommentFragment;
};

export type NewMentionNotificationFragment = {
  __typename: 'NewMentionNotification';
  notificationId: string;
  createdAt: string;
  mentionPublication: CommentFragment | PostFragment;
};

export type NewReactionNotificationFragment = {
  __typename: 'NewReactionNotification';
  notificationId: string;
  createdAt: string;
  reaction: Types.ReactionTypes;
  profile: ProfileFragment;
  publication: CommentFragment | MirrorFragment | PostFragment;
};

export type NotificationsQueryVariables = Types.Exact<{
  request: Types.NotificationRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type NotificationsQuery = {
  result: {
    items: Array<
      | NewCollectNotificationFragment
      | NewCommentNotificationFragment
      | NewFollowerNotificationFragment
      | NewMentionNotificationFragment
      | NewMirrorNotificationFragment
      | NewReactionNotificationFragment
    >;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

export const NewFollowerNotificationFragmentDoc = gql`
  fragment NewFollowerNotification on NewFollowerNotification {
    __typename
    notificationId
    createdAt
    isFollowedByMe
    wallet {
      ...Wallet
    }
  }
  ${WalletFragmentDoc}
`;
export const NewCollectNotificationFragmentDoc = gql`
  fragment NewCollectNotification on NewCollectNotification {
    __typename
    notificationId
    createdAt
    wallet {
      ...Wallet
    }
    collectedPublication {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...Mirror
      }
      ... on Comment {
        ...Comment
      }
    }
  }
  ${WalletFragmentDoc}
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
`;
export const NewMirrorNotificationFragmentDoc = gql`
  fragment NewMirrorNotification on NewMirrorNotification {
    __typename
    notificationId
    createdAt
    profile {
      ...Profile
    }
    publication {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
    }
  }
  ${ProfileFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
`;
export const NewCommentNotificationFragmentDoc = gql`
  fragment NewCommentNotification on NewCommentNotification {
    __typename
    notificationId
    createdAt
    profile {
      ...Profile
    }
    comment {
      ...Comment
    }
  }
  ${ProfileFragmentDoc}
  ${CommentFragmentDoc}
`;
export const NewMentionNotificationFragmentDoc = gql`
  fragment NewMentionNotification on NewMentionNotification {
    __typename
    notificationId
    createdAt
    mentionPublication {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
    }
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
`;
export const NewReactionNotificationFragmentDoc = gql`
  fragment NewReactionNotification on NewReactionNotification {
    __typename
    notificationId
    createdAt
    profile {
      ...Profile
    }
    reaction
    publication {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
      ... on Mirror {
        ...Mirror
      }
    }
  }
  ${ProfileFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${MirrorFragmentDoc}
`;
export const NotificationsDocument = gql`
  query Notifications($request: NotificationRequest!, $observerId: ProfileId) {
    result: notifications(request: $request) {
      items {
        ... on NewFollowerNotification {
          ...NewFollowerNotification
        }
        ... on NewMirrorNotification {
          ...NewMirrorNotification
        }
        ... on NewCollectNotification {
          ...NewCollectNotification
        }
        ... on NewCommentNotification {
          ...NewCommentNotification
        }
        ... on NewMentionNotification {
          ...NewMentionNotification
        }
        ... on NewReactionNotification {
          ...NewReactionNotification
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${NewFollowerNotificationFragmentDoc}
  ${NewMirrorNotificationFragmentDoc}
  ${NewCollectNotificationFragmentDoc}
  ${NewCommentNotificationFragmentDoc}
  ${NewMentionNotificationFragmentDoc}
  ${NewReactionNotificationFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const NotificationsDocumentString = print(NotificationsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Notifications(
      variables: NotificationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: NotificationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<NotificationsQuery>(NotificationsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Notifications',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
