import type {
  Account,
  AccountPostReaction,
  ActionInfo,
  AnyPost,
  Paginated,
  Post,
  PostActionsRequest,
  PostBookmarksRequest,
  PostEdit,
  PostEditsRequest,
  PostFields,
  PostReactionStatus,
  PostReactionStatusRequest,
  PostReactionsRequest,
  PostReferencesRequest,
  PostRequest,
  PostTagsRequest,
  PostsRequest,
  WhoActedOnPostQueryRequest,
  WhoReferencedPostRequest,
} from '@lens-protocol/graphql';
import {
  PostActionsQuery,
  PostEditsQuery,
  PostReactionStatusQuery,
  PostReactionsQuery,
  PostTagsQuery,
  WhoActedOnPostQuery,
  WhoReferencedPostQuery,
  postBookmarksQuery,
  postQuery,
  postReferencesQuery,
  postsQuery,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { Context } from '../context';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Fetch a Post.
 *
 * Using a {@link SessionClient} will yield {@link Post#operations}
 * and {@link Account#operations} specific to the authenticated Account.
 *
 * ```ts
 * const result = await fetchPost(anyClient, {
 *   post: postId('42')
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The Post or `null` if it does not exist.
 */
export function fetchPost<TAccount extends Account, TPostFields extends PostFields>(
  client: AnyClient<Context<TAccount, TPostFields>>,
  request: PostRequest,
): ResultAsync<AnyPost<TPostFields, TAccount> | null, UnexpectedError> {
  return client.query(
    postQuery([client.context.postFieldsFragment, client.context.accountFragment]),
    { request },
  );
}

/**
 * Fetch paginated Posts.
 *
 * Using a {@link SessionClient} will yield {@link Post#operations}
 * and {@link Account#operations} specific to the authenticated Account.
 *
 * ```ts
 * const result = await fetchPosts(anyClient, {
 *   filter: {
 *     authors: [evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 *   }
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The paginated list of Posts.
 */
export function fetchPosts(
  client: AnyClient,
  request: PostsRequest,
): ResultAsync<Paginated<AnyPost>, UnexpectedError> {
  return client.query(postsQuery, { request });
}

/**
 * Fetch available actions for POST.
 *
 * ```ts
 * const result = await fetchPostActions(anyClient);
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of actions available.
 */
export function fetchPostActions(
  client: AnyClient,
  request: PostActionsRequest = {},
): ResultAsync<Paginated<ActionInfo>, UnexpectedError> {
  return client.query(PostActionsQuery, { request });
}

/**
 * Fetch reactions for a post.
 *
 * ```ts
 * const result = await fetchPostReactions(anyClient, {
 *   post: postId('42'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of reactions for the post.
 */
export function fetchPostReactions(
  client: AnyClient,
  request: PostReactionsRequest,
): ResultAsync<Paginated<AccountPostReaction>, UnexpectedError> {
  return client.query(PostReactionsQuery, { request });
}

/**
 * Fetch bookmarked posts.
 *
 * ```ts
 * const result = await fetchPostReactions(anyClient);
 * ```
 *
 * @param client - Session Lens client.
 * @param request - The query request.
 * @returns The list of bookmarked posts.
 */
export function fetchPostBookmarks(
  client: SessionClient,
  request: PostBookmarksRequest = {},
): ResultAsync<Paginated<AnyPost>, UnexpectedError | UnauthenticatedError> {
  return client.query(postBookmarksQuery, { request });
}

/**
 * Fetch references to a post.
 *
 * ```ts
 * const result = await fetchPostReferences(anyClient, {
 *   referencedPost: postId('42'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of posts references.
 */
export function fetchPostReferences(
  client: AnyClient,
  request: PostReferencesRequest,
): ResultAsync<Paginated<AnyPost>, UnexpectedError | UnauthenticatedError> {
  return client.query(postReferencesQuery, { request });
}

/**
 * Fetch post tags.
 *
 * ```ts
 * const result = await fetchPostTags(anyClient, {
 *   forFeeds: [evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of post tags.
 */
export function fetchPostTags(
  client: AnyClient,
  request: PostTagsRequest,
): ResultAsync<Paginated<string>, UnexpectedError> {
  return client.query(PostTagsQuery, { request });
}

/**
 * Fetch post reaction status.
 *
 * ```ts
 * const result = await fetchPostReactionStatus(anyClient, {
 *   pairs: [{
 *     account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5')],
 *     post: postId('42'),
 *   }],
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of post reaction status.
 */
export function fetchPostReactionStatus(
  client: AnyClient,
  request: PostReactionStatusRequest,
): ResultAsync<PostReactionStatus[], UnexpectedError> {
  return client.query(PostReactionStatusQuery, { request });
}

/**
 * Fetch who referenced post.
 *
 * ```ts
 * const result = await fetchWhoReferencedPost(anyClient, {
 *   referenceTypes: [PostReferenceType.CommentOn]
 *   post: postId('42'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of accounts who referenced the post.
 */
export function fetchWhoReferencedPost(
  client: AnyClient,
  request: WhoReferencedPostRequest,
): ResultAsync<Paginated<Account>, UnexpectedError> {
  return client.query(WhoReferencedPostQuery, { request });
}

/**
 * Fetch who acted on post.
 *
 * ```ts
 * const result = await fetchWhoActedOnPost(anyClient, {
 *   post:  postId('42'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of accounts who acted on the post.
 */
export function fetchWhoActedOnPost(
  client: AnyClient,
  request: WhoActedOnPostQueryRequest,
): ResultAsync<Paginated<Account>, UnexpectedError> {
  return client.query(WhoActedOnPostQuery, { request });
}

/**
 * Fetch post edits.
 *
 * ```ts
 * const result = await fetchPostEdits(anyClient, {
 *   post:  postId('42'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of edits for the post.
 */
export function fetchPostEdits(
  client: AnyClient,
  request: PostEditsRequest,
): ResultAsync<Paginated<PostEdit>, UnexpectedError> {
  return client.query(PostEditsQuery, { request });
}
