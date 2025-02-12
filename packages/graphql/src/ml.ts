import type { FragmentOf } from 'gql.tada';
import { AccountFragment, PaginatedResultInfoFragment, PostFragment } from './fragments';
import { type RequestOf, graphql } from './graphql';

export const MlAccountRecommendationsQuery = graphql(
  `query MlAccountRecommendations($request: MlaccountRecommendationsRequest!) {
    value: mlAccountRecommendations(request: $request) {
      __typename
      items {
        ...Account
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AccountFragment, PaginatedResultInfoFragment],
);
export type MlAccountRecommendationsRequest = RequestOf<typeof MlAccountRecommendationsQuery>;

export const PostForYouFragment = graphql(
  `fragment PostForYou on PostForYou {
    __typename
    post {
      ...Post
    }
    source 
  }`,
  [PostFragment],
);
export type PostForYou = FragmentOf<typeof PostForYouFragment>;

export const MlPostsForYouQuery = graphql(
  `query MlPostsForYou($request: MlpostsForYouRequest!) {
    value: mlPostsForYou(request: $request) {
      __typename
      items {
        ...PostForYou
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [PostForYouFragment, PaginatedResultInfoFragment],
);
export type MlPostsForYouRequest = RequestOf<typeof MlPostsForYouQuery>;

export const MlPostsExploreQuery = graphql(
  `query MlPostsExplore($request: MlexplorePostsRequest!) {
    value: mlPostsExplore(request: $request) {
      __typename
      items {
        ...Post
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [PostFragment, PaginatedResultInfoFragment],
);
export type MlPostsExploreRequest = RequestOf<typeof MlPostsExploreQuery>;
