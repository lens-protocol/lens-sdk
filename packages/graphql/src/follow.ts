import type { FragmentOf } from 'gql.tada';

import {
  AccountFragment,
  BooleanValue,
  PaginatedResultInfo,
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

const Follower = graphql(
  `fragment Follower on Follower {
    __typename
    follower {
      ...Account
    }
    followedOn
  }`,
  [AccountFragment],
);
export type Follower = FragmentOf<typeof Follower>;

const Following = graphql(
  `fragment Following on Following {
    __typename
    following {
      ...Account
    }
    followedOn
  }`,
  [AccountFragment],
);
export type Following = FragmentOf<typeof Following>;

export const FollowersQuery = graphql(
  `query Followers ($request: FollowersRequest!) {
    value: followers(request: $request) {
      __typename
      items {
        ...Follower
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [Follower, PaginatedResultInfo],
);
export type FollowersRequest = RequestOf<typeof FollowersQuery>;

export const FollowingQuery = graphql(
  `query Following ($request: FollowingRequest!) {
    value: following(request: $request) {
      __typename
      items {
        ...Following
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [Following, PaginatedResultInfo],
);
export type FollowingRequest = RequestOf<typeof FollowingQuery>;

export const FollowersYouKnowQuery = graphql(
  `query FollowersYouKnow ($request: FollowersYouKnowRequest!) {
    value: followersYouKnow(request: $request) {
      __typename
      items {
        ...Follower
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [Follower, PaginatedResultInfo],
);
export type FollowersYouKnowRequest = RequestOf<typeof FollowersYouKnowQuery>;

const FollowStatusResult = graphql(
  `fragment FollowStatusResult on FollowStatusResult {
    __typename
    graph
    follower
    account
    isFollowing {
      ...BooleanValue
    }
  }`,
  [BooleanValue],
);
export type FollowStatusResult = FragmentOf<typeof FollowStatusResult>;

export const FollowStatusQuery = graphql(
  `query FollowStatus ($request: FollowStatusRequest!) {
    value: followStatus(request: $request) {
      ...FollowStatusResult
    }
  }`,
  [FollowStatusResult],
);
export type FollowStatusRequest = RequestOf<typeof FollowStatusQuery>;
