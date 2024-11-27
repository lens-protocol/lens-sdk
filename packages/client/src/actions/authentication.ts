import type {
  AuthenticatedSession,
  AuthenticatedSessionsRequest,
  RefreshRequest,
  RefreshResult,
  RevokeAuthenticationRequest,
  RolloverRefreshRequest,
} from '@lens-protocol/graphql';
import {
  AuthenticatedSessionsQuery,
  CurrentSessionQuery,
  LegacyRolloverRefreshMutation,
  RefreshMutation,
  RevokeAuthenticationMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';
import type { Paginated } from '../types';

/**
 * Get the AuthenticatedSession associated with the authenticated Account.
 *
 * ```ts
 * const result = await currentSession(sessionClient);
 * ```
 *
 * @param client - The session client.
 * @returns The current AuthenticatedSession details.
 */
export function currentSession(
  client: SessionClient,
): ResultAsync<AuthenticatedSession, UnauthenticatedError | UnexpectedError> {
  return client.query(CurrentSessionQuery, {});
}

/**
 * Revoke the authentication of the authenticated Account.
 *
 * ```ts
 * const result = await revokeAuthentication(sessionClient, {
 *   authenticationId: 'f4dd2ea1-58d4-4210-86a2-67b7571f241a',
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Void if the operation was successful.
 */
export function revokeAuthentication(
  client: SessionClient,
  request: RevokeAuthenticationRequest,
): ResultAsync<void, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RevokeAuthenticationMutation, { request });
}

/**
 * Refresh the authentication tokens of the authenticated Account.
 *
 * ```ts
 * const result = await refresh(anyClient, {
 *   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5c…'
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The mutation request.
 * @returns The refreshed authentication tokens if the operation was successful.
 */
export function refresh(
  client: AnyClient,
  request: RefreshRequest,
): ResultAsync<RefreshResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RefreshMutation, { request });
}

/**
 * Fetch the authenticated sessions associated with the authenticated Account.
 *
 * ```ts
 * const result = await fetchActiveAuthentications(sessionClient);
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The query request.
 * @returns The paginated authenticated sessions associated with the authenticated Account.
 */
export function fetchActiveAuthentications(
  client: SessionClient,
  request: AuthenticatedSessionsRequest = {},
): ResultAsync<Paginated<AuthenticatedSession>, UnexpectedError> {
  return client.query(AuthenticatedSessionsQuery, { request });
}

/**
 * Issue new authentication tokens from a valid Lens API v2 refresh token.
 *
 * Use this to seamlessly transition your users from Lens API v2 to Lens API v3 without
 * requiring them to re-authenticate.
 *
 * The HTTP Origin header MUST be present and match the app's domain.
 *
 * ```ts
 * const result = await legacyRolloverRefresh(sessionClient, {
 *   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5c…',
 *   app: evmAddress("0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3"),
 * });
 * ```
 *
 * @param client - The client to use for the rollover refresh operation.
 * @param request - The mutation request.
 * @returns The refreshed authentication tokens if the operation was successful.
 */

export function legacyRolloverRefresh(
  client: SessionClient,
  request: RolloverRefreshRequest,
): ResultAsync<RefreshResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(LegacyRolloverRefreshMutation, { request });
}
