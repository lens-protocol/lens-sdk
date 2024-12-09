import type { CreateGraphRequest, CreateGraphResult } from '@lens-protocol/graphql';
import { CreateGraphMutation } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create a Graph
 *
 * ```ts
 * const result = await createGraph(sessionClient);
 * ```
 *
 * @param client - The session client logged as a builder.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createGraph(
  client: SessionClient,
  request: CreateGraphRequest,
): ResultAsync<CreateGraphResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateGraphMutation, { request });
}
