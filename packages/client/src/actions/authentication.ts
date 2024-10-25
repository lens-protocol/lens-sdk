import { type ActiveAuthentication, CurrentAuthenticationQuery } from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';
import type { SessionClient } from '../client';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Get the ActiveAuthentication associated with the current session.
 *
 * ```ts
 * const result = await currentAuthentication(sessionClient);
 * ```
 *
 * @param client - The session client.
 * @returns The current ActiveAuthentication details.
 */
export function currentAuthentication(
  client: SessionClient,
): ResultAsync<ActiveAuthentication, UnauthenticatedError | UnexpectedError> {
  return client.query(CurrentAuthenticationQuery, {});
}
