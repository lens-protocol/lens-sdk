import type { FragmentOf, VariablesOf } from 'gql.tada';
import {
  AccountPostReaction,
  ActionInfo,
  AnyPost,
  PaginatedResultInfo,
  Post,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from './fragments';
import { graphql } from './graphql';

// List of query and mutation operations related to posts
// The operations are:
// - PostMutation
// - RepostMutation
// - EditPostMutation
// - PostQuery
// - PostActionsQuery
// - PostReactionsQuery
// - PostBookmarksQuery

const PostResponse = graphql(
  `fragment PostResponse on PostResponse {
    __typename
    hash
  }`,
);
export type PostResponse = FragmentOf<typeof PostResponse>;

const PostResult = graphql(
  `fragment PostResult on PostResult {
    ...on PostResponse {
      ...PostResponse
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
  [PostResponse, SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type PostResult = FragmentOf<typeof PostResult>;

export const PostMutation = graphql(
  `mutation Post($request: CreatePostRequest!) {
    value: post(request: $request) {
      ...PostResult
    }
  }`,
  [PostResult],
);
export type PostVariables = VariablesOf<typeof PostMutation>;

export const RepostMutation = graphql(
  `mutation Repost($request: CreateRepostRequest!) {
    value: repost(request: $request) {
      ...PostResult
    }
  }`,
  [PostResult],
);
export type RepostVariables = VariablesOf<typeof RepostMutation>;

export const EditPostMutation = graphql(
  `mutation EditPost($request: EditPostRequest!) {
    value: editPost(request: $request) {
      ...PostResult
    }
  }`,
  [PostResult],
);
export type EditPostVariables = VariablesOf<typeof EditPostMutation>;

export const PostQuery = graphql(
  `query Post($request: PostRequest!) {
    value: post(request: $request) {
      ...AnyPost
    }
  }`,
  [AnyPost],
);
export type PostQueryVariables = VariablesOf<typeof PostQuery>;

export const PostActionsQuery = graphql(
  `query PostActions($request: PostActionsRequest!) {
    value: postActions(request: $request) {
      items {
        ...ActionInfo
      },
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [ActionInfo, PaginatedResultInfo],
);
export type PostActionsVariables = VariablesOf<typeof PostActionsQuery>;

export const PostReactionsQuery = graphql(
  `query PostReactions($request: PostReactionsRequest!) {
    value: postReactions(request: $request) {
      items {
        ...AccountPostReaction
      },
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AccountPostReaction, PaginatedResultInfo],
);
export type PostReactionsVariables = VariablesOf<typeof PostReactionsQuery>;

export const PostBookmarksQuery = graphql(
  `query PostBookmarks($request: PostBookmarksRequest!) {
    value: postBookmarks(request: $request) {
      items {
        ...Post
      },
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [Post, PaginatedResultInfo],
);
export type PostBookmarksVariables = VariablesOf<typeof PostBookmarksQuery>;

export const PostReferencesQuery = graphql(
  `query PostReferences($request: PostReferencesRequest!) {
    value: postReferences(request: $request) {
      items {
        ...Post
      },
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [Post, PaginatedResultInfo],
);
export type PostReferencesVariables = VariablesOf<typeof PostReferencesQuery>;
