import type { FragmentOf } from 'gql.tada';

import {
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const FollowResponse = graphql(
  `fragment FollowResponse on FollowResponse {
    __typename
    hash
  }`,
);
export type FollowResponse = FragmentOf<typeof FollowResponse>;

const FollowResult = graphql(
  `fragment FollowResult on FollowResult{
    ...on FollowResponse {
      ...FollowResponse
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
  [FollowResponse, SelfFundedTransactionRequest, SponsoredTransactionRequest, TransactionWillFail],
);
export type FollowResult = FragmentOf<typeof FollowResult>;

export const FollowMutation = graphql(
  `mutation Follow ($request: CreateFollowRequest!) {
    value: follow(request: $request) {
      ...FollowResult
    }
  }`,
  [FollowResult],
);
export type CreateFollowRequest = RequestOf<typeof FollowMutation>;

const UnfollowResponse = graphql(
  `fragment UnfollowResponse on UnfollowResponse {
    __typename
    hash
  }`,
);
export type UnfollowResponse = FragmentOf<typeof UnfollowResponse>;

const UnfollowResult = graphql(
  `fragment UnfollowResult on UnfollowResult{
    ...on UnfollowResponse {
      ...UnfollowResponse
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
    UnfollowResponse,
    SelfFundedTransactionRequest,
    SponsoredTransactionRequest,
    TransactionWillFail,
  ],
);
export type UnfollowResult = FragmentOf<typeof UnfollowResult>;

export const UnfollowMutation = graphql(
  `mutation Unfollow ($request: CreateUnfollowRequest!) {
    value: unfollow(request: $request) {
      ...UnfollowResult
    }
  }`,
  [UnfollowResult],
);
export type CreateUnfollowRequest = RequestOf<typeof UnfollowMutation>;
