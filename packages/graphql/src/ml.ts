import type { FragmentOf } from 'gql.tada';
import {
  AccountFragment,
  PaginatedResultInfoFragment,
  PostFragment,
} from './fragments';
import { graphql, type RequestOf } from './graphql';

export const MlAccountRecommendationsQuery = graphql(
  `query MlAccountRecommendations($request: AccountRecommendationsRequest!) {
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
export type AccountRecommendationsRequest = RequestOf<
  typeof MlAccountRecommendationsQuery
>;

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
  `query MlPostsForYou($request: PostsForYouRequest!) {
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
export type PostsForYouRequest = RequestOf<typeof MlPostsForYouQuery>;

export const MlPostsExploreQuery = graphql(
  `query MlPostsExplore($request: PostsExploreRequest!) {
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
export type PostsExploreRequest = RequestOf<typeof MlPostsExploreQuery>;

export const MlDismissRecommendedAccountsMutation = graphql(
  `mutation MlDismissRecommendedAccounts($request: DismissRecommendedAccountsRequest!) {
    value: mlDismissRecommendedAccounts(request: $request)
  }`,
);
export type DismissRecommendedAccountsRequest = RequestOf<
  typeof MlDismissRecommendedAccountsMutation
>;

export const AddPostNotInterestedMutation = graphql(
  `mutation AddPostNotInterested($request: PostNotInterestedRequest!) {
    value: addPostNotInterested(request: $request)
  }`,
);
export const UndoPostNotInterestedMutation = graphql(
  `mutation UndoPostNotInterested($request: PostNotInterestedRequest!) {
    value: undoPostNotInterested(request: $request)
  }`,
);
export type PostNotInterestedRequest = RequestOf<
  typeof AddPostNotInterestedMutation
>;
