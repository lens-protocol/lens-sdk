import type {
  AccountPostReaction,
  ActionInfo,
  AnyPost,
  Post,
  PostActionsRequest,
  PostBookmarksRequest,
  PostReactionsRequest,
  PostReferencesRequest,
  PostRequest,
} from '@lens-protocol/graphql';
import {
  PostActionsQuery,
  PostBookmarksQuery,
  PostQuery,
  PostReactionsQuery,
  PostReferencesQuery,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';
import type { Paginated } from '../types';

/**
 * Fetch a Post.
 *
 * Using a {@link SessionClient} will yield {@link Post#operations}
 * and {@link Account#operations} specific to the authenticated Account.
 *
 * ```ts
 * const result = await fetchPost(anyClient, {
 *   post: postId('0x01')
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
  return client.query(PostBookmarksQuery, { request });
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
  return client.query(PostReferencesQuery, { request });
}
