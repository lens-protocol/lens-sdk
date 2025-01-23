import type {
  AccountPostReaction,
  ActionInfo,
  AnyPost,
  Paginated,
  Post,
  PostActionsRequest,
  PostBookmarksRequest,
  PostReactionsRequest,
  PostReferencesRequest,
  PostRequest,
  PostsRequest,
} from '@lens-protocol/graphql';
import {
  PostActionsQuery,
  PostBookmarksQuery,
  PostEditsQuery,
  PostQuery,
  PostReactionStatusQuery,
  PostReactionsQuery,
  PostReferencesQuery,
  PostTagsQuery,
  PostsQuery,
  WhoActedOnPostQuery,
  WhoReferencedPostQuery,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { PostTagsRequest } from '@lens-protocol/graphql';
import type { PostReactionStatusRequest } from '@lens-protocol/graphql';
import type { PostReactionStatus } from '@lens-protocol/graphql';
import type { WhoReferencedPostRequest } from '@lens-protocol/graphql';
import type { Account } from '@lens-protocol/graphql';
import type { WhoActedOnPostQueryRequest } from '@lens-protocol/graphql';
import type { PostEditsRequest } from '@lens-protocol/graphql';
import type { PostEdit } from '@lens-protocol/graphql';
import type { AnyClient, SessionClient } from '../clients';
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
export function fetchPost(
  client: AnyClient,
  request: PostRequest,
): ResultAsync<AnyPost | null, UnexpectedError> {
  return client.query(PostQuery, { request });
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
  return client.query(PostsQuery, { request });
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
 * const result = await fetchPostBookmarks(anyClient);
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
  return client.query(PostBookmarksQuery, { request });
}

/**
 * Fetch references to a post.
 *
 * ```ts
 * const result = await fetchPostReferences(anyClient, {
 *   referencedTypes: [PostReferenceType.CommentOn],
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
  return client.query(PostReferencesQuery, { request });
}

/**
 * Fetch post tags.
 *
 * ```ts
 * const result = await fetchPostTags(anyClient, {
 *   filter: {
 *     globalFeed: true,
 *   }
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
