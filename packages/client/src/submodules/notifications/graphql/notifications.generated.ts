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
    __typename: 'ProfileReactedResult';
    profile: { __typename: 'Profile' } & ProfileFragment;
    reactions: Array<{
      __typename: 'ReactedResult';
      reaction: Types.PublicationReactionType;
      reactedAt: string;
    }>;
  }>;
  publication:
    | ({ __typename: 'Comment' } & CommentFragment)
    | ({ __typename: 'Post' } & PostFragment)
    | ({ __typename: 'Quote' } & QuoteFragment);
};

export type CommentNotificationFragment = {
  __typename: 'CommentNotification';
  id: string;
  comment: { __typename: 'Comment' } & CommentFragment;
};

export type MirrorNotificationFragment = {
  __typename: 'MirrorNotification';
  id: string;
  mirrors: Array<{
    __typename: 'ProfileMirrorResult';
    mirrorId: string;
    mirroredAt: string;
    profile: { __typename: 'Profile' } & ProfileFragment;
  }>;
  publication:
    | ({ __typename: 'Comment' } & CommentFragment)
    | ({ __typename: 'Post' } & PostFragment)
    | ({ __typename: 'Quote' } & QuoteFragment);
};

export type QuoteNotificationFragment = {
  __typename: 'QuoteNotification';
  id: string;
  quote: { __typename: 'Quote' } & QuoteFragment;
};

export type OpenActionProfileActedFragment = {
  __typename: 'OpenActionProfileActed';
  actedAt: string;
  by: { __typename: 'Profile' } & ProfileFragment;
  action:
    | ({
        __typename: 'KnownCollectOpenActionResult';
      } & OpenActionResult_KnownCollectOpenActionResult_Fragment)
    | ({
        __typename: 'UnknownOpenActionResult';
      } & OpenActionResult_UnknownOpenActionResult_Fragment);
};

export type ActedNotificationFragment = {
  __typename: 'ActedNotification';
  id: string;
  actions: Array<{ __typename: 'OpenActionProfileActed' } & OpenActionProfileActedFragment>;
  publication:
    | ({ __typename: 'Comment' } & CommentFragment)
    | ({ __typename: 'Mirror' } & MirrorFragment)
    | ({ __typename: 'Post' } & PostFragment)
    | ({ __typename: 'Quote' } & QuoteFragment);
};

export type FollowNotificationFragment = {
  __typename: 'FollowNotification';
  id: string;
  followers: Array<{ __typename: 'Profile' } & ProfileFragment>;
};

export type MentionNotificationFragment = {
  __typename: 'MentionNotification';
  id: string;
  publication:
    | ({ __typename: 'Comment' } & CommentFragment)
    | ({ __typename: 'Post' } & PostFragment)
    | ({ __typename: 'Quote' } & QuoteFragment);
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
  __typename: 'Query';
  result: {
    __typename: 'PaginatedNotificationResult';
    items: Array<
      | ({ __typename: 'ActedNotification' } & ActedNotificationFragment)
      | ({ __typename: 'CommentNotification' } & CommentNotificationFragment)
      | ({ __typename: 'FollowNotification' } & FollowNotificationFragment)
      | ({ __typename: 'MentionNotification' } & MentionNotificationFragment)
      | ({ __typename: 'MirrorNotification' } & MirrorNotificationFragment)
      | ({ __typename: 'QuoteNotification' } & QuoteNotificationFragment)
      | ({ __typename: 'ReactionNotification' } & ReactionNotificationFragment)
    >;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export const ReactionNotificationFragmentDoc = gql`
  fragment ReactionNotification on ReactionNotification {
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
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
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
