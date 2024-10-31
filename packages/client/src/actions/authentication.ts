import type {
  ActiveAuthentication,
  PaginatedActiveAuthenticationsResult,
  RefreshResult,
  RefreshVariables,
  RevokeAuthenticationVariables,
  RolloverRefreshVariables,
} from '@lens-social/graphql';

import {
  AccountAuthenticationsQuery,
  CurrentAuthenticationQuery,
  RefreshMutation,
  RevokeAuthenticationMutation,
  RolloverRefreshMutation,
} from '@lens-social/graphql';
import type { AccountAuthenticationsVariables } from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';

import type { SessionClient } from '../clients';
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
): ResultAsync<void, UnexpectedError | UnauthenticatedError> {
  return client.query(RevokeAuthenticationMutation, { request });
}

/**
 * Refresh the authentication tokens of the authenticated Account.
 *
 * ```ts
 * const result = await refresh(sessionClient, {
 *  request: {
 *   refreshToken: string
 *  },
 * });
 * ```
 *
 * @param client - The client to use for the refresh operation.
 * @param variables - The refresh request variables.
 * @returns The refreshed authentication tokens if the operation was successful.
 */
export function refresh(
  client: SessionClient,
  { request }: RefreshVariables,
): ResultAsync<RefreshResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RefreshMutation, { request });
}

/**
 * Fetch the authentications associated with the authenticated Account.
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
 * @returns The paginated authentications associated with the Account.
 */
export function fetchAccountAuthentications(
  client: SessionClient,
  { request }: AccountAuthenticationsVariables,
): ResultAsync<PaginatedActiveAuthenticationsResult, UnauthenticatedError | UnexpectedError> {
  return client.query(AccountAuthenticationsQuery, { request });
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
 * const result = await rolloverRefresh(sessionClient, {
 *  request: {
 *    refreshToken: string,
 *    app: evmAddress("0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3"),
 *  },
 * });
 * ```
 *
 * @param client - The client to use for the rollover refresh operation.
 * @param variables - The rollover refresh request variables.
 * @returns The refreshed authentication tokens if the operation was successful.
 */

export function rolloverRefresh(
  client: SessionClient,
  { request }: RolloverRefreshVariables,
): ResultAsync<RefreshResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RolloverRefreshMutation, { request });
}
