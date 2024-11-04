import type {
  AuthenticatedSession,
  RefreshResult,
  RefreshVariables,
  RevokeAuthenticationVariables,
} from '@lens-social/graphql';

import {
  AuthenticatedSessions,
  CurrentSessionQuery,
  RefreshMutation,
  RevokeAuthenticationMutation,
} from '@lens-social/graphql';
import type { AuthenticatedSessionsVariables } from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';

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
 *   request: {
 *     authenticationId: uuid(),
 *   },
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param variables - The revoke authentication request variables.
 * @returns Void if the operation was successful.
 */
export function revokeAuthentication(
  client: SessionClient,
  { request }: RevokeAuthenticationVariables,
): ResultAsync<void, UnexpectedError> {
  return client.query(RevokeAuthenticationMutation, { request });
}

/**
 * Refresh the authentication tokens of the authenticated Account.
 *
 * ```ts
 * const result = await refresh(anyClient, {
 *  request: {
 *   refreshToken: string
 *  },
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param variables - The refresh request variables.
 * @returns The refreshed authentication tokens if the operation was successful.
 */
export function refresh(
  client: AnyClient,
  { request }: RefreshVariables,
): ResultAsync<RefreshResult, UnexpectedError> {
  return client.query(RefreshMutation, { request });
}

/**
 * Fetch the authenticated sessions associated with the authenticated Account.
 *
 * ```ts
 * const result = await fetchAccountAuthentications(sessionClient, {
 *  request: {
 *   cursor?: cursor;
 *   pageSize?: "TEN" | "FIFTY";
 *   app?: evmAddress("0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3");
 *  },
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param variables - The refresh request variables.
 * @returns The paginated authenticated sessions associated with the authenticated Account.
 */
export function fetchAuthenticatedSessions(
  client: SessionClient,
  { request }: AuthenticatedSessionsVariables,
): ResultAsync<Paginated<AuthenticatedSession>, UnexpectedError> {
  return client.query(AuthenticatedSessions, { request });
}
