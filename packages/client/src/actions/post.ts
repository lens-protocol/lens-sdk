import type { PostVariables } from '@lens-social/graphql';

import { PostMutation, type PostResult } from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';
import type { AuthenticatedClient } from '../client';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

export function post(
  client: AuthenticatedClient, // | Result<AuthenticatedClient, UnexpectedError>,
  variables: PostVariables,
): ResultAsync<PostResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(PostMutation, variables);
}
