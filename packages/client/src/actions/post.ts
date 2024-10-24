import type { PostVariables } from '@lens-social/graphql';

import { PostMutation, type PostResult, RepostMutation } from '@lens-social/graphql';
import type { RepostVariables } from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';
import type { SessionClient } from '../client';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a new post.
 */
export function post(
  client: SessionClient,
  variables: PostVariables,
): ResultAsync<PostResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(PostMutation, variables);
}

/**
 * Repost a post.
 */
export function repost(
  client: SessionClient,
  variables: RepostVariables,
): ResultAsync<PostResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(RepostMutation, variables);
}
