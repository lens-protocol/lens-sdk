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
export type ReactionEventFragment = {
  __typename: 'ReactionEvent';
  reaction: Types.PublicationReactionType;
  createdAt: string;
  by: { __typename: 'Profile' } & ProfileFragment;
};

export type FeedItemFragment = {
  __typename: 'FeedItem';
  id: string;
  root:
    | ({ __typename: 'Comment' } & CommentFragment)
    | ({ __typename: 'Post' } & PostFragment)
    | ({ __typename: 'Quote' } & QuoteFragment);
  mirrors: Array<{ __typename: 'Mirror' } & MirrorFragment>;
  reactions: Array<{ __typename: 'ReactionEvent' } & ReactionEventFragment>;
  comments: Array<{ __typename: 'Comment' } & CommentFragment>;
};

export type FeedQueryVariables = Types.Exact<{
  request: Types.FeedRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type FeedQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedFeedResult';
    items: Array<{ __typename: 'FeedItem' } & FeedItemFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type FeedHighlightsQueryVariables = Types.Exact<{
  request: Types.FeedHighlightsRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  publicationOperationsActedArgs?: Types.InputMaybe<Types.PublicationOperationsActedArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type FeedHighlightsQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedFeedHighlightsResult';
    items: Array<
      ({ __typename: 'Post' } & PostFragment) | ({ __typename: 'Quote' } & QuoteFragment)
    >;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export const ReactionEventFragmentDoc = gql`
  fragment ReactionEvent on ReactionEvent {
    by {
      ...Profile
    }
    reaction
    createdAt
  }
  ${ProfileFragmentDoc}
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
    mirrors {
      ...Mirror
    }
    reactions {
      ...ReactionEvent
    }
    comments {
      ...Comment
    }
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
  ${MirrorFragmentDoc}
  ${ReactionEventFragmentDoc}
`;
export const FeedDocument = gql`
  query Feed(
    $request: FeedRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $publicationOperationsActedArgs: PublicationOperationsActedArgs = {}
    $rateRequest: RateRequest = { for: USD }
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
