import type { FragmentOf } from 'gql.tada';
import {
  FeedFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const CreateFeedResponse = graphql(
  `fragment CreateFeedResponse on CreateFeedResponse {
    __typename
    hash
  }`,
);
export type CreateFeedResponse = FragmentOf<typeof CreateFeedResponse>;

const CreateFeedResult = graphql(
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
  [CreateFeedResponse, SelfFundedTransactionRequestFragment, TransactionWillFailFragment],
);
export type CreateFeedResult = FragmentOf<typeof CreateFeedResult>;

export const CreateFeedMutation = graphql(
  `mutation CreateFeed($request: CreateFeedRequest!) {
    value: createFeed(request: $request) {
      ...CreateFeedResult
    }
  }`,
  [CreateFeedResult],
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
