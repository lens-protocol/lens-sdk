import type { FragmentOf } from 'gql.tada';
import {
  AccountPostReaction,
  ActionInfo,
  AnyPost,
  PaginatedResultInfo,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

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
export type CreatePostRequest = RequestOf<typeof PostMutation>;

export const RepostMutation = graphql(
  `mutation Repost($request: CreateRepostRequest!) {
    value: repost(request: $request) {
      ...PostResult
    }
  }`,
  [PostResult],
);
export type CreateRepostRequest = RequestOf<typeof RepostMutation>;

export const EditPostMutation = graphql(
  `mutation EditPost($request: EditPostRequest!) {
    value: editPost(request: $request) {
      ...PostResult
    }
  }`,
  [PostResult],
);
export type EditPostRequest = RequestOf<typeof EditPostMutation>;

export const PostQuery = graphql(
  `query Post($request: PostRequest!) {
    value: post(request: $request) {
      ...AnyPost
    }
  }`,
  [AnyPost],
);
export type PostRequest = RequestOf<typeof PostQuery>;

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
export type PostActionsRequest = RequestOf<typeof PostActionsQuery>;

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
export type PostReactionsRequest = RequestOf<typeof PostReactionsQuery>;

export const PostBookmarksQuery = graphql(
  `query PostBookmarks($request: PostBookmarksRequest!) {
    value: postBookmarks(request: $request) {
      items {
        ...AnyPost
      },
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AnyPost, PaginatedResultInfo],
);
export type PostBookmarksRequest = RequestOf<typeof PostBookmarksQuery>;

export const PostReferencesQuery = graphql(
  `query PostReferences($request: PostReferencesRequest!) {
    value: postReferences(request: $request) {
      items {
        ...AnyPost
      },
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AnyPost, PaginatedResultInfo],
);
export type PostReferencesRequest = RequestOf<typeof PostReferencesQuery>;

const AddReactionResult = graphql(
  `fragment AddReactionResult on AddReactionResult {
    ... on AddReactionResponse {
      __typename
      success
    }
    ... on AddReactionFailure {
      __typename
      reason
    }
  }`,
);
export type AddReactionResult = FragmentOf<typeof AddReactionResult>;

export const AddReactionMutation = graphql(
  `mutation AddReaction($request: AddReactionRequest!) {
    value: addReaction(request: $request) {
      ...AddReactionResult
    }
  }`,
  [AddReactionResult],
);
export type AddReactionRequest = RequestOf<typeof AddReactionMutation>;

const UndoReactionResult = graphql(
  `fragment UndoReactionResult on UndoReactionResult {
    ... on UndoReactionResponse {
      __typename
      success
    }
    ... on UndoReactionFailure {
      __typename
      reason
    }
  }`,
);
export type UndoReactionResult = FragmentOf<typeof UndoReactionResult>;

export const UndoReactionMutation = graphql(
  `mutation UndoReaction($request: UndoReactionRequest!) {
    value: undoReaction(request: $request) {
      ...UndoReactionResult
    }
  }`,
  [UndoReactionResult],
);
export type UndoReactionRequest = RequestOf<typeof UndoReactionMutation>;

export const BookmarkPostMutation = graphql(
  `mutation BookmarkPost($request: BookmarkPostRequest!) {
    value: bookmarkPost(request: $request) 
  }`,
);
export type BookmarkPostRequest = RequestOf<typeof BookmarkPostMutation>;

export const UndoBookmarkPostMutation = graphql(
  `mutation UndoBookmarkPost($request: BookmarkPostRequest!) {
    value: undoBookmarkPost(request: $request) 
  }`,
);
export type UndoBookmarkPostRequest = RequestOf<typeof UndoBookmarkPostMutation>;

const DeletePostResponse = graphql(
  `fragment DeletePostResponse on DeletePostResponse {
    __typename
    hash
  }`,
);
export type DeletePostResponse = FragmentOf<typeof DeletePostResponse>;

const DeletePostResult = graphql(
  `fragment DeletePostResult on DeletePostResult {
    ... on DeletePostResponse {
      ...DeletePostResponse
    }
    ... on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ... on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ... on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    DeletePostResponse,
    TransactionWillFail,
    SelfFundedTransactionRequest,
    SponsoredTransactionRequest,
  ],
);
export type DeletePostResult = FragmentOf<typeof DeletePostResult>;

export const DeletePostMutation = graphql(
  `mutation DeletePost($request: DeletePostRequest!) {
    value: deletePost(request: $request) {
      ...DeletePostResult
    }
  }`,
  [DeletePostResult],
);
export type DeletePostRequest = RequestOf<typeof DeletePostMutation>;

export const HideReplyMutation = graphql(
  `mutation HideReply($request: HideReplyRequest!) {
    value: hideReply(request: $request) 
  }`,
);
export type HideReplyRequest = RequestOf<typeof HideReplyMutation>;

export const UnhideReplyMutation = graphql(
  `mutation UnhideReply($request: UnhideReplyRequest!) {
    value: unhideReply(request: $request) 
  }`,
);
export type UnhideReplyRequest = RequestOf<typeof UnhideReplyMutation>;

export const ReportPostMutation = graphql(
  `mutation ReportPost($request: ReportPostRequest!) {
    value: reportPost(request: $request) 
  }`,
);
export type ReportPostRequest = RequestOf<typeof ReportPostMutation>;
