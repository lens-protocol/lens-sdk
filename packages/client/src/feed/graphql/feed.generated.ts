// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  PostFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  CommonPaginatedResultInfoFragment,
  WalletFragment,
  FollowingFragment,
  FollowerFragment,
  Eip712TypedDataDomainFragment,
  RelayerResultFragment,
  RelayErrorFragment,
  Erc20AmountFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PostFragmentDoc,
  ProfileFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  CommonPaginatedResultInfoFragmentDoc,
  WalletFragmentDoc,
  FollowingFragmentDoc,
  FollowerFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelayerResultFragmentDoc,
  RelayErrorFragmentDoc,
  Erc20AmountFragmentDoc,
} from '../../graphql/fragments.generated';
export type FeedItemFragment = {
  __typename: 'FeedItem';
  root: CommentFragment | PostFragment;
  comments: Array<CommentFragment> | null;
};

export type FeedQueryVariables = Types.Exact<{
  request: Types.FeedRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type FeedQuery = {
  result: { items: Array<FeedItemFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type FeedHighlightsQueryVariables = Types.Exact<{
  request: Types.FeedHighlightsRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type FeedHighlightsQuery = {
  result: {
    items: Array<CommentFragment | MirrorFragment | PostFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

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
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
`;
export const FeedDocument = gql`
  query Feed($request: FeedRequest!, $observerId: ProfileId) {
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
  query FeedHighlights($request: FeedHighlightsRequest!, $observerId: ProfileId) {
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
