// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  ProfileFieldsFragment,
  PostFragment,
  QuoteFragment,
  PaginatedResultInfoFragment,
  ProfileFragment,
  CommentFragment,
  CollectOpenActionResultFragment,
  NftDropOpenActionFragment,
  UnknownOpenActionResultFragment,
  MirrorFragment,
} from '../../graphql/fragments.generated';
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
  NftDropOpenActionFragmentDoc,
  UnknownOpenActionResultFragmentDoc,
  MirrorFragmentDoc,
} from '../../graphql/fragments.generated';
export type ElectedMirrorFragment = {
  mirrorId: string;
  timestamp: string;
  by: ProfileFieldsFragment;
};

export type MirrorEventFragment = { timestamp: string; by: ProfileFieldsFragment };

export type CollectedEventFragment = { timestamp: string; by: ProfileFieldsFragment };

export type ReactionEventFragment = {
  reaction: Types.ReactionTypes;
  timestamp: string;
  by: ProfileFieldsFragment;
};

export type FeedItemFragment = {
  id: string;
  root: CommentFragment | PostFragment | QuoteFragment;
  electedMirror: ElectedMirrorFragment | null;
  mirrors: Array<MirrorEventFragment>;
  collects: Array<CollectedEventFragment>;
  reactions: Array<ReactionEventFragment>;
  comments: Array<CommentFragment> | null;
  quotes: Array<QuoteFragment> | null;
};

export type FeedQueryVariables = Types.Exact<{
  request: Types.FeedRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']['input']>;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type FeedQuery = {
  result: { items: Array<FeedItemFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type FeedHighlightsQueryVariables = Types.Exact<{
  request: Types.FeedHighlightsRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']['input']>;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type FeedHighlightsQuery = {
  result: { items: Array<PostFragment | QuoteFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type ForYouQueryVariables = Types.Exact<{
  request: Types.PublicationForYouRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']['input']>;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type ForYouQuery = {
  result: { items: Array<PostFragment | QuoteFragment>; pageInfo: PaginatedResultInfoFragment };
};

export const ElectedMirrorFragmentDoc = gql`
  fragment ElectedMirror on ElectedMirror {
    mirrorId
    by {
      ...ProfileFields
    }
    timestamp
  }
  ${ProfileFieldsFragmentDoc}
`;
export const MirrorEventFragmentDoc = gql`
  fragment MirrorEvent on MirrorEvent {
    by {
      ...ProfileFields
    }
    timestamp
  }
  ${ProfileFieldsFragmentDoc}
`;
export const CollectedEventFragmentDoc = gql`
  fragment CollectedEvent on CollectedEvent {
    by {
      ...ProfileFields
    }
    timestamp
  }
  ${ProfileFieldsFragmentDoc}
`;
export const ReactionEventFragmentDoc = gql`
  fragment ReactionEvent on ReactionEvent {
    by {
      ...ProfileFields
    }
    reaction
    timestamp
  }
  ${ProfileFieldsFragmentDoc}
`;
export const FeedItemFragmentDoc = gql`
  fragment FeedItem on FeedItem {
    id
    root {
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
    comments {
      ...Comment
    }
    quotes {
      ...Quote
    }
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
  ${ElectedMirrorFragmentDoc}
  ${MirrorEventFragmentDoc}
  ${CollectedEventFragmentDoc}
  ${ReactionEventFragmentDoc}
`;
export const FeedDocument = gql`
  query Feed(
    $request: FeedRequest!
    $observerId: ProfileId
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
  ) {
    result: feed(request: $request) {
      items {
        ...FeedItem
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${FeedItemFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const FeedHighlightsDocument = gql`
  query FeedHighlights(
    $request: FeedHighlightsRequest!
    $observerId: ProfileId
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
  ) {
    result: feedHighlights(request: $request) {
      items {
        ... on Post {
          ...Post
        }
        ... on Quote {
          ...Quote
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${QuoteFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const ForYouDocument = gql`
  query ForYou(
    $request: PublicationForYouRequest!
    $observerId: ProfileId
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
  ) {
    result: forYou(request: $request) {
      items {
        ... on Post {
          ...Post
        }
        ... on Quote {
          ...Quote
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${QuoteFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const FeedDocumentString = print(FeedDocument);
const FeedHighlightsDocumentString = print(FeedHighlightsDocument);
const ForYouDocumentString = print(ForYouDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Feed(
      variables: FeedQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
    ForYou(
      variables: ForYouQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: ForYouQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ForYouQuery>(ForYouDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ForYou',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
