// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  ProfileFieldsFragment,
  PostFragment,
  QuoteFragment,
  ProfileFragment,
  PaginatedResultInfoFragment,
  CommentFragment,
  MirrorFragment,
  OpenActionResult_KnownCollectOpenActionResult_Fragment,
  OpenActionResult_UnknownOpenActionResult_Fragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  ProfileFieldsFragmentDoc,
  PostFragmentDoc,
  QuoteFragmentDoc,
  ProfileFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  CommentFragmentDoc,
  MirrorFragmentDoc,
  OpenActionResultFragmentDoc,
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

export type OpenActionProfileActedFragment = {
  actedAt: string;
  profile: ProfileFieldsFragment;
  action:
    | OpenActionResult_KnownCollectOpenActionResult_Fragment
    | OpenActionResult_UnknownOpenActionResult_Fragment;
};

export type ActedNotificationFragment = {
  id: string;
  actions: Array<OpenActionProfileActedFragment>;
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
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
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
export const OpenActionProfileActedFragmentDoc = gql`
  fragment OpenActionProfileActed on OpenActionProfileActed {
    profile {
      ...ProfileFields
    }
    action {
      ...OpenActionResult
    }
    actedAt
  }
  ${ProfileFieldsFragmentDoc}
  ${OpenActionResultFragmentDoc}
`;
export const ActedNotificationFragmentDoc = gql`
  fragment ActedNotification on ActedNotification {
    id
    actions {
      ...OpenActionProfileActed
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
  ${OpenActionProfileActedFragmentDoc}
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
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
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
