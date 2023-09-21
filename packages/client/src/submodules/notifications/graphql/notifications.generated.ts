// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  ProfileFragment,
  PostFragment,
  QuoteFragment,
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
  ProfileFragmentDoc,
  PostFragmentDoc,
  QuoteFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  CommentFragmentDoc,
  MirrorFragmentDoc,
  OpenActionResultFragmentDoc,
} from '../../../graphql/fragments.generated';
export type ReactionNotificationFragment = {
  __typename: 'ReactionNotification';
  id: string;
  reactions: Array<{
    profile: ProfileFragment;
    reactions: Array<{ reaction: Types.PublicationReactionType; reactedAt: string }>;
  }>;
  publication: CommentFragment | PostFragment | QuoteFragment;
};

export type CommentNotificationFragment = {
  __typename: 'CommentNotification';
  id: string;
  comment: CommentFragment;
};

export type MirrorNotificationFragment = {
  __typename: 'MirrorNotification';
  id: string;
  mirrors: Array<{ mirrorId: string; mirroredAt: string; profile: ProfileFragment }>;
  publication: CommentFragment | PostFragment | QuoteFragment;
};

export type QuoteNotificationFragment = {
  __typename: 'QuoteNotification';
  id: string;
  quote: QuoteFragment;
};

export type OpenActionProfileActedFragment = {
  actedAt: string;
  by: ProfileFragment;
  action:
    | OpenActionResult_KnownCollectOpenActionResult_Fragment
    | OpenActionResult_UnknownOpenActionResult_Fragment;
};

export type ActedNotificationFragment = {
  __typename: 'ActedNotification';
  id: string;
  actions: Array<OpenActionProfileActedFragment>;
  publication: CommentFragment | MirrorFragment | PostFragment | QuoteFragment;
};

export type FollowNotificationFragment = {
  __typename: 'FollowNotification';
  id: string;
  followers: Array<ProfileFragment>;
};

export type MentionNotificationFragment = {
  __typename: 'MentionNotification';
  id: string;
  publication: CommentFragment | PostFragment | QuoteFragment;
};

export type NotificationsQueryVariables = Types.Exact<{
  request: Types.NotificationRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
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
    __typename
    id
    reactions {
      profile {
        ...Profile
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
  ${ProfileFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const CommentNotificationFragmentDoc = gql`
  fragment CommentNotification on CommentNotification {
    __typename
    id
    comment {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`;
export const MirrorNotificationFragmentDoc = gql`
  fragment MirrorNotification on MirrorNotification {
    __typename
    id
    mirrors {
      mirrorId
      mirroredAt
      profile {
        ...Profile
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
  ${ProfileFragmentDoc}
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const QuoteNotificationFragmentDoc = gql`
  fragment QuoteNotification on QuoteNotification {
    __typename
    id
    quote {
      ...Quote
    }
  }
  ${QuoteFragmentDoc}
`;
export const OpenActionProfileActedFragmentDoc = gql`
  fragment OpenActionProfileActed on OpenActionProfileActed {
    by {
      ...Profile
    }
    action {
      ...OpenActionResult
    }
    actedAt
  }
  ${ProfileFragmentDoc}
  ${OpenActionResultFragmentDoc}
`;
export const ActedNotificationFragmentDoc = gql`
  fragment ActedNotification on ActedNotification {
    __typename
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
    __typename
    id
    followers {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const MentionNotificationFragmentDoc = gql`
  fragment MentionNotification on MentionNotification {
    __typename
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
    $rateRequest: RateRequest = { for: USD }
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
