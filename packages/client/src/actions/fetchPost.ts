import type {
  AccountPostReaction,
  ActionInfo,
  AnyPost,
  Post,
  PostActionsVariables,
  PostBookmarksVariables,
  PostQueryVariables,
  PostReactionsVariables,
  PostReferencesVariables,
} from '@lens-social/graphql';
import {
  PostActionsQuery,
  PostBookmarksQuery,
  PostQuery,
  PostReactionsQuery,
  PostReferencesQuery,
} from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';

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
 * const result = await fetchPost(anyClient, { request: { postId: postId('0x01') } });
 * ```
 *
 * @param client - Any Lens client.
 * @returns The Post or `null` if it does not exist.
 */
export function fetchPost(
  client: AnyClient,
  { request }: PostQueryVariables,
): ResultAsync<AnyPost | null, UnexpectedError> {
  return client.query(PostQuery, { request });
}

/**
 * Fetch available actions for POST.
 *
 * ```ts
 * const result = await fetchPostActions(anyClient, {
 *   request: {
 *     onlyVerified?: boolean,
 *     includeOnlyCollectActions?: boolean,
 *     includeUnknown?: boolean,
 *     cursor?: Cursor,
 *     limit?: "TEN" | "FIFTY",
 *   }
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param variables - The PostActions query variables.
 * @returns The list of actions available.
 */
export function fetchPostActions(
  client: AnyClient,
  { request }: PostActionsVariables,
): ResultAsync<Paginated<ActionInfo>, UnexpectedError> {
  return client.query(PostActionsQuery, { request });
}

/**
 * Fetch reactions for a post.
 *
 * ```ts
 * const result = await fetchPostReactions(anyClient, {
 *   request: {
 *     postId: postId('0x01'),
 *     onlyVerified?: boolean,
 *     includeOnlyCollectActions?: boolean,
 *     includeUnknown?: boolean,
 *     cursor?: Cursor,
 *     limit?: "TEN" | "FIFTY",
 *   }
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param variables - The PostReactions query variables.
 * @returns The list of reactions for the post.
 */
export function fetchPostReactions(
  client: AnyClient,
  { request }: PostReactionsVariables,
): ResultAsync<Paginated<AccountPostReaction>, UnexpectedError> {
  return client.query(PostReactionsQuery, { request });
}

/**
 * Fetch bookmarked posts.
 *
 * ```ts
 * const result = await fetchPostReactions(anyClient, {
 *   request: {
 *    cursor?: Cursor,
 *    pageSize?: "TEN" | "FIFTY",
 *    filter?: ...,
 *    forFeeds?: EvmAddress[],
 *  }
 * });
 * ```
 *
 * @param client - Session Lens client.
 * @param variables - The PostBookmarks query variables.
 * @returns The list of bookmarked posts.
 */
export function fetchPostBookmarks(
  client: SessionClient,
  { request }: PostBookmarksVariables,
): ResultAsync<Paginated<Post>, UnexpectedError | UnauthenticatedError> {
  return client.query(PostBookmarksQuery, { request });
}

/**
 * Fetch references to a post.
 *
 * ```ts
 * const result = await fetchPostReferences(anyClient, {
 *   request: {
 *    cursor?: Cursor,
 *    pageSize?: "TEN" | "FIFTY",
 *    filter?: ...,
 *    forFeeds?: EvmAddress[],
 *  }
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param variables - The PostReferences query variables.
 * @returns The list of posts references.
 */
export function fetchPostReferences(
  client: AnyClient,
  { request }: PostReferencesVariables,
): ResultAsync<Paginated<Post>, UnexpectedError | UnauthenticatedError> {
  return client.query(PostReferencesQuery, { request });
}
