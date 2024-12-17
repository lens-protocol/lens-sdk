import type { FragmentOf } from 'gql.tada';

import {
  AccountFragment,
  BooleanValueFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const FollowResponseFragment = graphql(
  `fragment FollowResponse on FollowResponse {
    __typename
    hash
  }`,
);
export type FollowResponse = FragmentOf<typeof FollowResponseFragment>;

const FollowResultFragment = graphql(
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
  [
    FollowResponseFragment,
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type FollowResult = FragmentOf<typeof FollowResultFragment>;

export const FollowMutation = graphql(
  `mutation Follow ($request: CreateFollowRequest!) {
    value: follow(request: $request) {
      ...FollowResult
    }
  }`,
  [FollowResultFragment],
);
export type CreateFollowRequest = RequestOf<typeof FollowMutation>;

const UnfollowResponseFragment = graphql(
  `fragment UnfollowResponse on UnfollowResponse {
    __typename
    hash
  }`,
);
export type UnfollowResponse = FragmentOf<typeof UnfollowResponseFragment>;

const UnfollowResultFragment = graphql(
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
    UnfollowResponseFragment,
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type UnfollowResult = FragmentOf<typeof UnfollowResultFragment>;

export const UnfollowMutation = graphql(
  `mutation Unfollow ($request: CreateUnfollowRequest!) {
    value: unfollow(request: $request) {
      ...UnfollowResult
    }
  }`,
  [UnfollowResultFragment],
);
export type CreateUnfollowRequest = RequestOf<typeof UnfollowMutation>;

const FollowerFragment = graphql(
  `fragment Follower on Follower {
    __typename
    follower {
      ...Account
    }
    followedOn
  }`,
  [AccountFragment],
);
export type Follower = FragmentOf<typeof FollowerFragment>;

const FollowingFragment = graphql(
  `fragment Following on Following {
    __typename
    following {
      ...Account
    }
    followedOn
  }`,
  [AccountFragment],
);
export type Following = FragmentOf<typeof FollowingFragment>;

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
  [FollowerFragment, PaginatedResultInfoFragment],
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
  [FollowingFragment, PaginatedResultInfoFragment],
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
  [FollowerFragment, PaginatedResultInfoFragment],
);
export type FollowersYouKnowRequest = RequestOf<typeof FollowersYouKnowQuery>;

const FollowStatusResultFragment = graphql(
  `fragment FollowStatusResult on FollowStatusResult {
    __typename
    graph
    follower
    account
    isFollowing {
      ...BooleanValue
    }
  }`,
  [BooleanValueFragment],
);
export type FollowStatusResult = FragmentOf<typeof FollowStatusResultFragment>;

export const FollowStatusQuery = graphql(
  `query FollowStatus ($request: FollowStatusRequest!) {
    value: followStatus(request: $request) {
      ...FollowStatusResult
    }
  }`,
  [FollowStatusResultFragment],
);
export type FollowStatusRequest = RequestOf<typeof FollowStatusQuery>;
