import type { FragmentOf, VariablesOf } from 'gql.tada';
import {
  AnyPost,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from './fragments';
import { graphql } from './graphql';

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
