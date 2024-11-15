import type {
  AddReactionResult,
  AddReactionVariables,
  BookmarkPostVariables,
  EditPostVariables,
  PostVariables,
  UndoBookmarkPostVariables,
  UndoReactionResult,
  UndoReactionVariables,
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
import type { RepostVariables } from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';
import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a new Post.
 *
 * ```ts
 * const result = await post(sessionClient, {
 *   request: {
 *     contentUri: uri('https://example.com'),
 *   },
 * });
 * ```
 *
 * @param client - The session client.
 * @param variables - The post variables.
 * @returns The post operation result.
 */
export function post(
  client: SessionClient,
  variables: PostVariables,
): ResultAsync<PostResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(PostMutation, variables);
}

/**
 * Repost a Post.
 *
 * ```ts
 * const result = await repost(sessionClient, {
 *   request: {
 *     postId: post.id,
 *   },
 * });
 * ```
 *
 * @param client - The session client.
 * @param variables - The repost variables.
 * @returns The repost operation result.
 */
export function repost(
  client: SessionClient,
  variables: RepostVariables,
): ResultAsync<PostResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(RepostMutation, variables);
}

/**
 * Edit a Post.
 *
 * ```ts
 * const result = await editPost(sessionClient, {
 *   request: {
 *     postId: post.id,
 *     contentUri: uri('https://example.com'),
 *   },
 * });
 * ```
 *
 * @param client - The session client.
 * @param variables - The edit post variables.
 * @returns The edit post operation result.
 */
export function editPost(
  client: SessionClient,
  variables: EditPostVariables,
): ResultAsync<PostResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(EditPostMutation, variables);
}

/**
 * React to a post.
 *
 * ```ts
 * const result = await addReaction(sessionClient, {
 *  request: {
 *    postId: post.id,
 *    reaction: "UPVOTE" | "DOWNVOTE",
 *  },
 * });
 * ```
 *
 * @param client - The session client.
 * @param variables - The addReaction to post variables.
 * @returns Success boolean if reaction was added or error with a reason.
 */
export function addReaction(
  client: SessionClient,
  variables: AddReactionVariables,
): ResultAsync<AddReactionResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(AddReactionMutation, variables);
}

/**
 * Undo reaction from a post.
 *
 * ```ts
 * const result = await undoReaction(sessionClient, {
 *  request: {
 *    postId: post.id,
 *    reaction: "UPVOTE" | "DOWNVOTE",
 *  },
 * });
 * ```
 *
 * @param client - The session client.
 * @param variables - The undoReaction to post variables.
 * @returns Success boolean if reaction was removed or error with a reason.
 */
export function undoReaction(
  client: SessionClient,
  variables: UndoReactionVariables,
): ResultAsync<UndoReactionResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(UndoReactionMutation, variables);
}

/**
 * Bookmark a post.
 *
 * ```ts
 * const result = await bookmarkPost(sessionClient, {
 *  request: {
 *    postId: post.id,
 *  },
 * });
 * ```
 *
 * @param client - The session client.
 * @param variables - The bookmarkPost variables.
 * @returns void
 */
export function bookmarkPost(
  client: SessionClient,
  variables: BookmarkPostVariables,
): ResultAsync<void, UnauthenticatedError | UnexpectedError> {
  return client.mutation(BookmarkPostMutation, variables);
}

/**
 * Undo bookmark from a post.
 *
 * ```ts
 * const result = await undoBookmarkPost(sessionClient, {
 *  request: {
 *    postId: post.id,
 *  },
 * });
 * ```
 *
 * @param client - The session client.
 * @param variables - The undoBookmarkPost variables.
 * @returns void
 */
export function undoBookmarkPost(
  client: SessionClient,
  variables: UndoBookmarkPostVariables,
): ResultAsync<void, UnauthenticatedError | UnexpectedError> {
  return client.mutation(UndoBookmarkPostMutation, variables);
}
