import type { CreateFeedRequest, CreateFeedResult } from '@lens-protocol/graphql';
import { CreateFeedMutation } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a Feed
 *
 * ```ts
 * const result = await createFeed(sessionClient);
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createFeed(
  client: SessionClient,
  request: CreateFeedRequest,
): ResultAsync<CreateFeedResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateFeedMutation, { request });
}
