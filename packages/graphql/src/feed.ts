import type { FragmentOf } from 'gql.tada';
import { SelfFundedTransactionRequest, TransactionWillFail } from './fragments';
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
  [CreateFeedResponse, SelfFundedTransactionRequest, TransactionWillFail],
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
