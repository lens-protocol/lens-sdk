import type { FragmentOf } from 'gql.tada';
import {
  FeedFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
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

const SetFeedMetadataResultFragment = graphql(
  `fragment SetFeedMetadataResult on SetFeedMetadataResult {
    ... on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetFeedMetadataResult = FragmentOf<typeof SetFeedMetadataResultFragment>;

export const SetFeedMetadataMutation = graphql(
  `mutation SetFeedMetadata($request: SetFeedMetadataRequest!) {
    value: setFeedMetadata(request: $request) {
      ...SetFeedMetadataResult
    }
  }`,
  [SetFeedMetadataResultFragment],
);
export type SetFeedMetadataRequest = RequestOf<typeof SetFeedMetadataMutation>;

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

const UpdateFeedRulesResponseFragment = graphql(
  `fragment UpdateFeedRulesResponse on UpdateFeedRulesResponse {
    __typename
    hash
  }`,
);
export type UpdateFeedRulesResponse = FragmentOf<typeof UpdateFeedRulesResponseFragment>;

const UpdateFeedRulesResultFragment = graphql(
  `fragment UpdateFeedRulesResult on UpdateFeedRulesResult {
    ...on UpdateFeedRulesResponse {
      ...UpdateFeedRulesResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    UpdateFeedRulesResponseFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type UpdateFeedRulesResult = FragmentOf<typeof UpdateFeedRulesResultFragment>;

export const UpdateFeedRulesMutation = graphql(
  `mutation UpdateFeedRules($request: UpdateFeedRulesRequest!) {
    value: updateFeedRules(request: $request) {
      ...UpdateFeedRulesResult
    }
  }`,
  [UpdateFeedRulesResultFragment],
);
export type UpdateFeedRulesRequest = RequestOf<typeof UpdateFeedRulesMutation>;
