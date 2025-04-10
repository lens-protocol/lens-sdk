import type {
  Account,
  AuthenticatedSession,
  AuthenticatedSessionsRequest,
  LastLoggedInAccountRequest,
  MeResult,
  Paginated,
  RefreshRequest,
  RefreshResult,
  RevokeAuthenticationRequest,
  RolloverRefreshRequest,
  SwitchAccountRequest,
  SwitchAccountResult,
} from '@lens-protocol/graphql';
import {
  AuthenticatedSessionsQuery,
  CurrentSessionQuery,
  LastLoggedInAccountQuery,
  LegacyRolloverRefreshMutation,
  MeQuery,
  RefreshMutation,
  RevokeAuthenticationMutation,
  SwitchAccountMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

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
 * Revoke the authentication from the provided authentication ID.
 *
 * @remarks Use the {@link SessionClient#logout} method to logout instead.
 * It's unlikely you'll need to use this action directly.
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
 * const result = await fetchAuthenticatedSessions(sessionClient);
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The query request.
 * @returns The paginated authenticated sessions associated with the authenticated Account.
 */
export function fetchAuthenticatedSessions(
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
 *   app: evmAddress("0xe5439696f4057aF073c0FB2dc6e5e755392922e1"),
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

/**
 * Switch to another managed account.
 *
 * @remarks Use the {@link SessionClient#switchAccount} method to switch to an account instead.
 * It's unlikely you'll need to use this action directly.
 *
 * @param client - The current session client.
 * @param request - The query request.
 * @returns The authenticated tokens for the switched account.
 */
export function switchAccount(
  client: SessionClient,
  request: SwitchAccountRequest,
): ResultAsync<SwitchAccountResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(SwitchAccountMutation, { request });
}

/**
 * Retrieve the details of the authenticated Account.
 *
 * @param client - The session client for the authenticated Account.
 * @returns The details of the authenticated Account.
 */
export function fetchMeDetails(
  client: SessionClient,
): ResultAsync<MeResult, UnauthenticatedError | UnexpectedError> {
  return client.query(MeQuery, {});
}

/**
 * Get the last logged in account.
 *
 * ```ts
 * const result = await lastLoggedInAccount(anyClient, {
 *   address: evmAddress('0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3'),
 * });
 * ```
 *
 * @param client - The session client.
 * @param request - The query request.
 * @returns The last logged in account.
 */
export function lastLoggedInAccount(
  client: AnyClient,
  request: LastLoggedInAccountRequest,
): ResultAsync<Account | null, UnauthenticatedError | UnexpectedError> {
  return client.query(LastLoggedInAccountQuery, { request });
}
