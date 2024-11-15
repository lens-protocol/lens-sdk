import type {
  AddReactionRequest,
  AddReactionResult,
  BookmarkPostRequest,
  CreatePostRequest,
  CreateRepostRequest,
  EditPostRequest,
  UndoBookmarkPostRequest,
  UndoReactionRequest,
  UndoReactionResult,
} from '@lens-social/graphql';

import {
  AddReactionMutation,
  BookmarkPostMutation,
  EditPostMutation,
  PostMutation,
  type PostResult,
  RepostMutation,
  UndoBookmarkPostMutation,
  UndoReactionMutation,
} from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';
import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a new Post.
 *
 * ```ts
 * const result = await post(sessionClient, {
 *   contentUri: uri('https://example.com'),
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function post(
  client: SessionClient,
  request: CreatePostRequest,
): ResultAsync<PostResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(PostMutation, { request });
}

/**
 * Repost a Post.
 *
 * ```ts
 * const result = await repost(sessionClient, {
 *   post: post.id,
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function repost(
  client: SessionClient,
  request: CreateRepostRequest,
): ResultAsync<PostResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(RepostMutation, { request });
}

/**
 * Edit a Post.
 *
 * ```ts
 * const result = await editPost(sessionClient, {
 *   post: post.id,
 *   contentUri: uri('https://example.com'),
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function editPost(
  client: SessionClient,
  request: EditPostRequest,
): ResultAsync<PostResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(EditPostMutation, { request });
}

/**
 * React to a post.
 *
 * ```ts
 * const result = await addReaction(sessionClient, {
 *   post: post.id,
 *   reaction: "UPVOTE" | "DOWNVOTE",
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The mutation request.
 * @returns Success boolean if reaction was added or error with a reason.
 */
export function addReaction(
  client: SessionClient,
  request: AddReactionRequest,
): ResultAsync<AddReactionResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(AddReactionMutation, { request });
}

/**
 * Undo reaction from a post.
 *
 * ```ts
 * const result = await undoReaction(sessionClient, {
 *   post: post.id,
 *   reaction: "UPVOTE" | "DOWNVOTE",
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The mutation request.
 * @returns Success boolean if reaction was removed or error with a reason.
 */
export function undoReaction(
  client: SessionClient,
  request: UndoReactionRequest,
): ResultAsync<UndoReactionResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(UndoReactionMutation, { request });
}

/**
 * Bookmark a post.
 *
 * ```ts
 * const result = await bookmarkPost(sessionClient, {
 *   post: post.id,
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The mutation request.
 * @returns void
 */
export function bookmarkPost(
  client: SessionClient,
  request: BookmarkPostRequest,
): ResultAsync<void, UnauthenticatedError | UnexpectedError> {
  return client.mutation(BookmarkPostMutation, { request });
}

/**
 * Undo bookmark from a post.
 *
 * ```ts
 * const result = await undoBookmarkPost(sessionClient, {
 *   post: post.id,
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The mutation request.
 * @returns void
 */
export function undoBookmarkPost(
  client: SessionClient,
  request: UndoBookmarkPostRequest,
): ResultAsync<void, UnauthenticatedError | UnexpectedError> {
  return client.mutation(UndoBookmarkPostMutation, { request });
}
