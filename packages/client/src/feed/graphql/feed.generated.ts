// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  ProfileFragment,
  PostFragment,
  CommentFragment,
  MirrorFragment,
  CommonPaginatedResultInfoFragment,
  FollowingFragment,
  FollowerFragment,
  RelayerResultFragment,
  RelayErrorFragment,
  Eip712TypedDataDomainFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  ProfileFragmentDoc,
  PostFragmentDoc,
  CommentFragmentDoc,
  MirrorFragmentDoc,
  CommonPaginatedResultInfoFragmentDoc,
  FollowingFragmentDoc,
  FollowerFragmentDoc,
  RelayerResultFragmentDoc,
  RelayErrorFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
} from '../../graphql/fragments.generated';
export type ElectedMirrorFragment = {
  __typename: 'ElectedMirror';
  mirrorId: string;
  timestamp: string;
  profile: ProfileFragment;
};

export type MirrorEventFragment = {
  __typename: 'MirrorEvent';
  timestamp: string;
  profile: ProfileFragment;
};

export type CollectedEventFragment = {
  __typename: 'CollectedEvent';
  timestamp: string;
  profile: ProfileFragment;
};

export type ReactionEventFragment = {
  __typename: 'ReactionEvent';
  reaction: Types.ReactionTypes;
  timestamp: string;
  profile: ProfileFragment;
};

export type FeedItemFragment = {
  __typename: 'FeedItem';
  root: CommentFragment | PostFragment;
  comments: Array<CommentFragment> | null;
  electedMirror: ElectedMirrorFragment | null;
  mirrors: Array<MirrorEventFragment>;
  collects: Array<CollectedEventFragment>;
  reactions: Array<ReactionEventFragment>;
};

export type FeedQueryVariables = Types.Exact<{
  request: Types.FeedRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
  mediaTransformParams: Types.MediaTransformParams;
}>;

export type FeedQuery = {
  result: { items: Array<FeedItemFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type FeedHighlightsQueryVariables = Types.Exact<{
  request: Types.FeedHighlightsRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
  mediaTransformParams: Types.MediaTransformParams;
}>;

export type FeedHighlightsQuery = {
  result: {
    items: Array<CommentFragment | MirrorFragment | PostFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

export const ElectedMirrorFragmentDoc = gql`
  fragment ElectedMirror on ElectedMirror {
    __typename
    mirrorId
    profile {
      ...Profile
    }
    timestamp
  }
  ${ProfileFragmentDoc}
`;
export const MirrorEventFragmentDoc = gql`
  fragment MirrorEvent on MirrorEvent {
    __typename
    profile {
      ...Profile
    }
    timestamp
  }
  ${ProfileFragmentDoc}
`;
export const CollectedEventFragmentDoc = gql`
  fragment CollectedEvent on CollectedEvent {
    __typename
    profile {
      ...Profile
    }
    timestamp
  }
  ${ProfileFragmentDoc}
`;
export const ReactionEventFragmentDoc = gql`
  fragment ReactionEvent on ReactionEvent {
    __typename
    profile {
      ...Profile
    }
    reaction
    timestamp
  }
  ${ProfileFragmentDoc}
`;
export const FeedItemFragmentDoc = gql`
  fragment FeedItem on FeedItem {
    __typename
    root {
      ... on Post {
        ...Post
      }
      ... on Comment {
        ...Comment
      }
    }
    comments {
      ...Comment
    }
    electedMirror {
      ...ElectedMirror
    }
    mirrors {
      ...MirrorEvent
    }
    collects {
      ...CollectedEvent
    }
    reactions {
      ...ReactionEvent
    }
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${ElectedMirrorFragmentDoc}
  ${MirrorEventFragmentDoc}
  ${CollectedEventFragmentDoc}
  ${ReactionEventFragmentDoc}
`;
export const FeedDocument = gql`
  query Feed(
    $request: FeedRequest!
    $observerId: ProfileId
    $mediaTransformParams: MediaTransformParams!
  ) {
    result: feed(request: $request) {
      items {
        ...FeedItem
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${FeedItemFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const FeedHighlightsDocument = gql`
  query FeedHighlights(
    $request: FeedHighlightsRequest!
    $observerId: ProfileId
    $mediaTransformParams: MediaTransformParams!
  ) {
    result: feedHighlights(request: $request) {
      items {
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
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const FeedDocumentString = print(FeedDocument);
const FeedHighlightsDocumentString = print(FeedHighlightsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Feed(
      variables: FeedQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: FeedQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<FeedQuery>(FeedDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Feed',
        'query',
      );
    },
    FeedHighlights(
      variables: FeedHighlightsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: FeedHighlightsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<FeedHighlightsQuery>(FeedHighlightsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'FeedHighlights',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
