import type { EditPostVariables, PostVariables } from '@lens-social/graphql';

import {
  EditPostMutation,
  PostMutation,
  type PostResult,
  RepostMutation,
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
