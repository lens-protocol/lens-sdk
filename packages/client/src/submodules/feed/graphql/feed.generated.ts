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
export type ReactionEventFragment = {
  reaction: Types.PublicationReactionType;
  createdAt: string;
  by: ProfileFieldsFragment;
};

export type FeedItemFragment = {
  id: string;
  root: CommentFragment | PostFragment | QuoteFragment;
  mirrors: Array<MirrorFragment>;
  reactions: Array<ReactionEventFragment>;
  comments: Array<CommentFragment>;
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
  result: { items: Array<FeedItemFragment>; pageInfo: PaginatedResultInfoFragment };
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
  result: { items: Array<PostFragment | QuoteFragment>; pageInfo: PaginatedResultInfoFragment };
};

export const ReactionEventFragmentDoc = gql`
  fragment ReactionEvent on ReactionEvent {
    by {
      ...ProfileFields
    }
    reaction
    createdAt
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
