import type {
  Account,
  MlAccountRecommendationsRequest,
  MlPostsExploreRequest,
  MlPostsForYouRequest,
  Paginated,
  Post,
  PostForYou,
} from '@lens-protocol/graphql';
import {
  MlAccountRecommendationsQuery,
  MlPostsExploreQuery,
  MlPostsForYouQuery,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient } from '../clients';
import type { UnexpectedError } from '../errors';

/**
 * Fetch account recommendations from ML.
 *
 * ```ts
 * const result = await fetchMlAccountRecommendations(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list accounts recommended.
 */
export function fetchMlAccountRecommendations(
  client: AnyClient,
  request: MlAccountRecommendationsRequest,
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
  request: MlPostsForYouRequest,
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
  request: MlPostsExploreRequest,
): ResultAsync<Paginated<Post> | null, UnexpectedError> {
  return client.query(MlPostsExploreQuery, { request });
}
