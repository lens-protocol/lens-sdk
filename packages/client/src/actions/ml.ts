import type {
  Account,
  AccountRecommendationsRequest,
  DismissRecommendedAccountsRequest,
  Paginated,
  Post,
  PostForYou,
  PostNotInterestedRequest,
  PostsExploreRequest,
  PostsForYouRequest,
} from '@lens-protocol/graphql';
import {
  AddPostNotInterestedMutation,
  MlAccountRecommendationsQuery,
  MlDismissRecommendedAccountsMutation,
  MlPostsExploreQuery,
  MlPostsForYouQuery,
  UndoPostNotInterestedMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Fetch account recommendations from ML.
 *
 * ```ts
 * const result = await fetchAccountRecommendations(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list accounts recommended.
 */
export function fetchAccountRecommendations(
  client: AnyClient,
  request: AccountRecommendationsRequest,
): ResultAsync<Paginated<Account> | null, UnexpectedError> {
  return client.query(MlAccountRecommendationsQuery, { request });
}

/**
 * Fetch posts for you from ML.
 *
 * ```ts
 * const result = await fetchPostsForYou(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of recommended posts.
 */
export function fetchPostsForYou(
  client: AnyClient,
  request: PostsForYouRequest,
): ResultAsync<Paginated<PostForYou> | null, UnexpectedError> {
  return client.query(MlPostsForYouQuery, { request });
}

/**
 * Fetch posts to explore.
 *
 * ```ts
 * const result = await fetchPostsToExplore(anyClient);
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of posts to explore.
 */
export function fetchPostsToExplore(
  client: AnyClient,
  request: PostsExploreRequest,
): ResultAsync<Paginated<Post> | null, UnexpectedError> {
  return client.query(MlPostsExploreQuery, { request });
}

/**
 * Dismiss recommended accounts.
 *
 * ```ts
 * const result = await dismissRecommendedAccounts(sessionClient, {
 *   accounts: [evmAddress('0xe2f2...')],
 * });
 * ```
 *
 * @param client - Session Lens client.
 * @param request - The list of accounts to dismiss.
 * @returns - void
 */
export function dismissRecommendedAccounts(
  client: SessionClient,
  request: DismissRecommendedAccountsRequest,
): ResultAsync<void, UnexpectedError | UnauthenticatedError> {
  return client.mutation(MlDismissRecommendedAccountsMutation, { request });
}

/**
 * Flag a post as not of interest.
 *
 * ```ts
 * const result = await addPostNotInterested(sessionClient, {
 *   post: postID('34fdasd...'),
 * });
 * ```
 *
 * @param client - Session Lens client.
 * @param request - The post to add as not interested.
 * @returns - void
 */
export function addPostNotInterested(
  client: SessionClient,
  request: PostNotInterestedRequest,
): ResultAsync<void, UnexpectedError | UnauthenticatedError> {
  return client.mutation(AddPostNotInterestedMutation, { request });
}

/**
 * Undo a previous decision to flag a post as uninteresting.
 *
 * ```ts
 * const result = await undoPostNotInterested(sessionClient, {
 *   post: postID('34fdasd...'),
 * });
 * ```
 *
 * @param client - Session Lens client.
 * @param request - The post to remove as not interested.
 * @returns - void
 */
export function undoPostNotInterested(
  client: SessionClient,
  request: PostNotInterestedRequest,
): ResultAsync<void, UnexpectedError | UnauthenticatedError> {
  return client.mutation(UndoPostNotInterestedMutation, { request });
}
