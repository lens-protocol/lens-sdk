import type { FragmentOf, VariablesOf } from 'gql.tada';
import { SponsoredTransactionRequest } from './fragments/SponsoredTransactionRequest';
import { TransactionRequest } from './fragments/TransactionRequest';
import { TransactionWillFail } from './fragments/TransactionWillFail';
import { graphql } from './graphql';

const PostResponse = graphql(`
  fragment PostResponse on PostResponse {
    __typename
    hash
  }
`);
export type PostResponse = FragmentOf<typeof PostResponse>;

const PostResult = graphql(
  `
  fragment PostResult on PostResult {
    ...on PostResponse {
      ...PostResponse
    }

    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }

    ...on TransactionRequest {
      ...TransactionRequest
    }

    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }
`,
  [PostResponse, SponsoredTransactionRequest, TransactionRequest, TransactionWillFail],
);
export type PostResult = FragmentOf<typeof PostResult>;

export const PostMutation = graphql(
  `
  mutation Post($request: CreatePostRequest!) {
    value: post(request: $request) {
      ...PostResult
    }
  }
`,
  [PostResult],
);

export type PostVariables = VariablesOf<typeof PostMutation>;

export const RepostMutation = graphql(
  `
  mutation Repost($request: CreateRepostRequest!) {
    value: repost(request: $request) {
      ...PostResult
    }
  }
`,
  [PostResult],
);

export type RepostVariables = VariablesOf<typeof RepostMutation>;

export const EditPostMutation = graphql(
  `
  mutation EditPost($request: EditPostRequest!) {
    value: editPost(request: $request) {
      ...PostResult
    }
  }
`,
  [PostResult],
);

export type EditPostVariables = VariablesOf<typeof EditPostMutation>;
