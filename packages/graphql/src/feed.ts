import type { FragmentOf } from 'gql.tada';
import {
  FeedFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const CreateFeedResponseFragment = graphql(
  `fragment CreateFeedResponse on CreateFeedResponse {
    __typename
    hash
  }`,
);
export type CreateFeedResponse = FragmentOf<typeof CreateFeedResponseFragment>;

const CreateFeedResultFragment = graphql(
  `fragment CreateFeedResult on CreateFeedResult {
    ...on CreateFeedResponse {
      ...CreateFeedResponse
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [CreateFeedResponseFragment, SelfFundedTransactionRequestFragment, TransactionWillFailFragment],
);
export type CreateFeedResult = FragmentOf<typeof CreateFeedResultFragment>;

export const CreateFeedMutation = graphql(
  `mutation CreateFeed($request: CreateFeedRequest!) {
    value: createFeed(request: $request) {
      ...CreateFeedResult
    }
  }`,
  [CreateFeedResultFragment],
);
export type CreateFeedRequest = RequestOf<typeof CreateFeedMutation>;

export const FeedQuery = graphql(
  `query Feed($request: FeedRequest!) {
    value: feed(request: $request) {
      ...Feed
    }
  }`,
  [FeedFragment],
);
export type FeedRequest = RequestOf<typeof FeedQuery>;

export const FeedsQuery = graphql(
  `query Feeds($request: FeedsRequest!) {
    value: feeds(request: $request) {
      __typename
      items {
        ...Feed
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [FeedFragment, PaginatedResultInfoFragment],
);
export type FeedsRequest = RequestOf<typeof FeedsQuery>;
