// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  ProfileFieldsFragment,
  PostFragment,
  QuoteFragment,
  PaginatedResultInfoFragment,
  ProfileFragment,
  CommentFragment,
  CollectOpenActionResultFragment,
  UnknownOpenActionResultFragment,
  MirrorFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  ProfileFieldsFragmentDoc,
  PostFragmentDoc,
  QuoteFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  ProfileFragmentDoc,
  CommentFragmentDoc,
  CollectOpenActionResultFragmentDoc,
  UnknownOpenActionResultFragmentDoc,
  MirrorFragmentDoc,
} from '../../../graphql/fragments.generated';
export type ReactionNotificationFragment = {
  id: string;
  reactions: Array<{
    profile: ProfileFieldsFragment;
    reactions: Array<{ reaction: Types.PublicationReactionType; reactedAt: string }>;
  }>;
  publication: CommentFragment | PostFragment | QuoteFragment;
};

export type CommentNotificationFragment = { id: string; comment: CommentFragment };

export type MirrorNotificationFragment = {
  id: string;
  mirrors: Array<{ mirrorId: string; mirroredAt: string; profile: ProfileFieldsFragment }>;
  publication: CommentFragment | PostFragment | QuoteFragment;
};

export type QuoteNotificationFragment = { id: string; quote: QuoteFragment };

export type ActedNotificationFragment = {
  id: string;
  actions: Array<{
    id: string;
    profile: ProfileFieldsFragment;
    action: CollectOpenActionResultFragment | UnknownOpenActionResultFragment;
  }>;
  publication: CommentFragment | MirrorFragment | PostFragment | QuoteFragment;
};

export type FollowNotificationFragment = { id: string; followers: Array<ProfileFieldsFragment> };

export type MentionNotificationFragment = {
  id: string;
  publication: CommentFragment | PostFragment | QuoteFragment;
};

export type NotificationsQueryVariables = Types.Exact<{
  request: Types.NotificationRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type NotificationsQuery = {
  result: {
    items: Array<
      | ActedNotificationFragment
      | CommentNotificationFragment
      | FollowNotificationFragment
      | MentionNotificationFragment
      | MirrorNotificationFragment
      | QuoteNotificationFragment
      | ReactionNotificationFragment
      | {}
    >;
    pageInfo: PaginatedResultInfoFragment;
  };
};

export const ReactionNotificationFragmentDoc = gql`
  fragment ReactionNotification on ReactionNotification {
    id
    reactions {
      profile {
        ...ProfileFields
      }
      reactions {
        reaction
        reactedAt
      }
    }
    publication {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
      ... on Quote {
        ...Quote
      }
    }
  }
  ${ProfileFieldsFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const CommentNotificationFragmentDoc = gql`
  fragment CommentNotification on CommentNotification {
    id
    comment {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`;
export const MirrorNotificationFragmentDoc = gql`
  fragment MirrorNotification on MirrorNotification {
    id
    mirrors {
      mirrorId
      mirroredAt
      profile {
        ...ProfileFields
      }
    }
    publication {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
      ... on Quote {
        ...Quote
      }
    }
  }
  ${ProfileFieldsFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const QuoteNotificationFragmentDoc = gql`
  fragment QuoteNotification on QuoteNotification {
    id
    quote {
      ...Quote
    }
  }
  ${QuoteFragmentDoc}
`;
export const ActedNotificationFragmentDoc = gql`
  fragment ActedNotification on ActedNotification {
    id
    actions {
      id
      profile {
        ...ProfileFields
      }
      action {
        ... on CollectOpenActionResult {
          ...CollectOpenActionResult
        }
        ... on UnknownOpenActionResult {
          ...UnknownOpenActionResult
        }
      }
    }
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
      ... on Quote {
        ...Quote
      }
    }
  }
  ${ProfileFieldsFragmentDoc}
  ${CollectOpenActionResultFragmentDoc}
  ${UnknownOpenActionResultFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${MirrorFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const FollowNotificationFragmentDoc = gql`
  fragment FollowNotification on FollowNotification {
    id
    followers {
      ...ProfileFields
    }
  }
  ${ProfileFieldsFragmentDoc}
`;
export const MentionNotificationFragmentDoc = gql`
  fragment MentionNotification on MentionNotification {
    id
    publication {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
      ... on Quote {
        ...Quote
      }
    }
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const NotificationsDocument = gql`
  query Notifications(
    $request: NotificationRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
  ) {
    result: notifications(request: $request) {
      items {
        ... on ReactionNotification {
          ...ReactionNotification
        }
        ... on CommentNotification {
          ...CommentNotification
        }
        ... on MirrorNotification {
          ...MirrorNotification
        }
        ... on QuoteNotification {
          ...QuoteNotification
        }
        ... on ActedNotification {
          ...ActedNotification
        }
        ... on FollowNotification {
          ...FollowNotification
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
  ${ReactionNotificationFragmentDoc}
  ${CommentNotificationFragmentDoc}
  ${MirrorNotificationFragmentDoc}
  ${QuoteNotificationFragmentDoc}
  ${ActedNotificationFragmentDoc}
  ${FollowNotificationFragmentDoc}
  ${MentionNotificationFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
