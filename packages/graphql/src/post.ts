import type { FragmentOf } from 'gql.tada';
import {
  AccountFragment,
  AccountPostReactionFragment,
  ActionInfoFragment,
  AnyPostFragment,
  FullPostMetadataFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { type RequestOf, dynamic, graphql } from './graphql';

const PostResponseFragment = graphql(
  `fragment PostResponse on PostResponse {
    __typename
    hash
  }`,
);
export type PostResponse = FragmentOf<typeof PostResponseFragment>;

const PostResultFragment = graphql(
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
  [
    PostResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type PostResult = FragmentOf<typeof PostResultFragment>;

export const PostMutation = graphql(
  `mutation Post($request: CreatePostRequest!) {
    value: post(request: $request) {
      ...PostResult
    }
  }`,
  [PostResultFragment],
);
export type CreatePostRequest = RequestOf<typeof PostMutation>;

export const RepostMutation = graphql(
  `mutation Repost($request: CreateRepostRequest!) {
    value: repost(request: $request) {
      ...PostResult
    }
  }`,
  [PostResultFragment],
);
export type CreateRepostRequest = RequestOf<typeof RepostMutation>;

export const EditPostMutation = graphql(
  `mutation EditPost($request: EditPostRequest!) {
    value: editPost(request: $request) {
      ...PostResult
    }
  }`,
  [PostResultFragment],
);
export type EditPostRequest = RequestOf<typeof EditPostMutation>;

export const postQuery = dynamic(
  `query Post($request: PostRequest!) {
    value: post(request: $request) {
      ${'...AnyPost'}
    }
  }`,
  [AnyPostFragment],
);
export type PostRequest = RequestOf<typeof postQuery>;

export const postsQuery = dynamic(
  `query Posts($request: PostsRequest!) {
    value: posts(request: $request) {
      items {
        ${'...AnyPost'}
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AnyPostFragment, PaginatedResultInfoFragment],
);
export type PostsRequest = RequestOf<typeof postQuery>;

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
  [ActionInfoFragment, PaginatedResultInfoFragment],
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
  [AccountPostReactionFragment, PaginatedResultInfoFragment],
);
export type PostReactionsRequest = RequestOf<typeof PostReactionsQuery>;

export const postBookmarksQuery = dynamic(
  `query PostBookmarks($request: PostBookmarksRequest!) {
    value: postBookmarks(request: $request) {
      items {
        ${'...AnyPost'}
      },
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AnyPostFragment, PaginatedResultInfoFragment],
);
export type PostBookmarksRequest = RequestOf<typeof postBookmarksQuery>;

export const postReferencesQuery = dynamic(
  `query PostReferences($request: PostReferencesRequest!) {
    value: postReferences(request: $request) {
      items {
         ${'...AnyPost'}
      },
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AnyPostFragment, PaginatedResultInfoFragment],
);
export type PostReferencesRequest = RequestOf<typeof postReferencesQuery>;

const AddReactionResultFragment = graphql(
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
export type AddReactionResult = FragmentOf<typeof AddReactionResultFragment>;

export const AddReactionMutation = graphql(
  `mutation AddReaction($request: AddReactionRequest!) {
    value: addReaction(request: $request) {
      ...AddReactionResult
    }
  }`,
  [AddReactionResultFragment],
);
export type AddReactionRequest = RequestOf<typeof AddReactionMutation>;

const UndoReactionResultFragment = graphql(
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
export type UndoReactionResult = FragmentOf<typeof UndoReactionResultFragment>;

export const UndoReactionMutation = graphql(
  `mutation UndoReaction($request: UndoReactionRequest!) {
    value: undoReaction(request: $request) {
      ...UndoReactionResult
    }
  }`,
  [UndoReactionResultFragment],
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

const DeletePostResponseFragment = graphql(
  `fragment DeletePostResponse on DeletePostResponse {
    __typename
    hash
  }`,
);
export type DeletePostResponse = FragmentOf<typeof DeletePostResponseFragment>;

const DeletePostResultFragment = graphql(
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
    DeletePostResponseFragment,
    TransactionWillFailFragment,
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
  ],
);
export type DeletePostResult = FragmentOf<typeof DeletePostResultFragment>;

export const DeletePostMutation = graphql(
  `mutation DeletePost($request: DeletePostRequest!) {
    value: deletePost(request: $request) {
      ...DeletePostResult
    }
  }`,
  [DeletePostResultFragment],
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

export const PostTagsQuery = graphql(
  `query PostTags($request: PostTagsRequest!) {
    value: postTags(request: $request) {
      __typename
      items
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [PaginatedResultInfoFragment],
);
export type PostTagsRequest = RequestOf<typeof PostTagsQuery>;

export const PostReactionStatusFragment = graphql(
  `fragment PostReactionStatus on PostReactionStatus {
    __typename
    postId
    account
    result
  }`,
);
export type PostReactionStatus = FragmentOf<typeof PostReactionStatusFragment>;

export const PostReactionStatusQuery = graphql(
  `query PostReactionStatus($request: PostReactionStatusRequest!) {
    value: postReactionStatus(request: $request) {
      ...PostReactionStatus
    }
  }`,
  [PostReactionStatusFragment],
);
export type PostReactionStatusRequest = RequestOf<typeof PostReactionStatusQuery>;

export const WhoReferencedPostQuery = graphql(
  `query WhoReferencedPost($request: WhoReferencedPostRequest!) {
    value: whoReferencedPost(request: $request) {
      __typename
      items {
        ...Account
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [PaginatedResultInfoFragment, AccountFragment],
);
export type WhoReferencedPostRequest = RequestOf<typeof WhoReferencedPostQuery>;

export const WhoActedOnPostQuery = graphql(
  `query WhoReferencedPost($request: WhoActedOnPostRequest!) {
    value: whoActedOnPost(request: $request) {
      __typename
      items {
        ...Account
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [PaginatedResultInfoFragment, AccountFragment],
);
export type WhoActedOnPostQueryRequest = RequestOf<typeof WhoActedOnPostQuery>;

export const PostEditFragment = graphql(
  `fragment PostEdit on PostEdit {
    __typename
    metadata{
      ...PostMetadata
    }
    timestamp
  }`,
  [FullPostMetadataFragment],
);
export type PostEdit = FragmentOf<typeof PostEditFragment>;

export const PostEditsQuery = graphql(
  `query PostEdits($request: PostEditsRequest!) {
    value: postEdits(request: $request) {
      __typename
      items {
        ...PostEdit
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [PostEditFragment, PaginatedResultInfoFragment],
);
export type PostEditsRequest = RequestOf<typeof PostEditsQuery>;
