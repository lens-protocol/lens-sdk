import type {
  ConfigureAccountActionRequest,
  ConfigureAccountActionResult,
  ConfigurePostActionRequest,
  ConfigurePostActionResult,
  DisableAccountActionRequest,
  DisableAccountActionResult,
  DisablePostActionRequest,
  DisablePostActionResult,
  EnableAccountActionRequest,
  EnableAccountActionResult,
  EnablePostActionRequest,
  EnablePostActionResult,
  ExecuteAccountActionRequest,
  ExecuteAccountActionResult,
  ExecutePostActionRequest,
  ExecutePostActionResult,
} from '@lens-protocol/graphql';
import {
  ConfigureAccountActionMutation,
  ConfigurePostActionMutation,
  DisableAccountActionMutation,
  DisablePostActionMutation,
  EnableAccountActionMutation,
  EnablePostActionMutation,
  ExecuteAccountActionMutation,
  ExecutePostActionMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Configure post action.
 *
 * ```ts
 * const result = await configurePostAction(sessionClient, {
 *   post: postId('1234...'),
 *   feed: evmAddress('0x1234...'),
 *   params: {
 *     simpleCollect: {
 *       amount: {
 *         value: '100',
 *         currency: evmAddress('0x5678...')
 *       }
 *     }
 *   }
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function configurePostAction(
  client: SessionClient,
  request: ConfigurePostActionRequest,
): ResultAsync<ConfigurePostActionResult, UnexpectedError | UnauthenticatedError> {
  return client.query(ConfigurePostActionMutation, { request });
}

/**
 * Enable post action.
 *
 * ```ts
 * const result = await enablePostAction(sessionClient, {
 *   post: postId('1234...'),
 *   feed: evmAddress('0x1234...'),
 *   action: 'SIMPLE_COLLECT'
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function enablePostAction(
  client: SessionClient,
  request: EnablePostActionRequest,
): ResultAsync<EnablePostActionResult, UnexpectedError | UnauthenticatedError> {
  return client.query(EnablePostActionMutation, { request });
}

/**
 * Disable post action.
 *
 * ```ts
 * const result = await disablePostAction(sessionClient, {
 *   post: postId('1234...'),
 *   feed: evmAddress('0x1234...'),
 *   action: 'SIMPLE_COLLECT'
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function disablePostAction(
  client: SessionClient,
  request: DisablePostActionRequest,
): ResultAsync<DisablePostActionResult, UnexpectedError | UnauthenticatedError> {
  return client.query(DisablePostActionMutation, { request });
}

/**
 * Execute post action.
 *
 * ```ts
 * const result = await executePostAction(sessionClient, {
 *   post: postId('1234...'),
 *   feed: evmAddress('0x1234...'),
 *   params: {
 *     simpleCollect: {
 *       value: '100',
 *       currency: evmAddress('0x5678...')
 *     }
 *   }
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function executePostAction(
  client: SessionClient,
  request: ExecutePostActionRequest,
): ResultAsync<ExecutePostActionResult, UnexpectedError | UnauthenticatedError> {
  return client.query(ExecutePostActionMutation, { request });
}

/**
 * Configure account action, only available for configure custom actions.
 * By default the tipping action is configured for all accounts.
 * Any user can tip any other user and any token.
 *
 * ```ts
 * const result = await configureAccountAction(sessionClient, {
 *   action: {
 *     params: [{
 *       key: 'usd',
 *       value: '100'
 *     }],
 *     address: evmAddress('0x1234...'),
 *   }
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function configureAccountAction(
  client: SessionClient,
  request: ConfigureAccountActionRequest,
): ResultAsync<ConfigureAccountActionResult, UnexpectedError | UnauthenticatedError> {
  return client.query(ConfigureAccountActionMutation, { request });
}

/**
 * Enable account action.
 *
 * ```ts
 * const result = await enableAccountAction(sessionClient, {
 *   action: 'TIPPING'
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function enableAccountAction(
  client: SessionClient,
  request: EnableAccountActionRequest,
): ResultAsync<EnableAccountActionResult, UnexpectedError | UnauthenticatedError> {
  return client.query(EnableAccountActionMutation, { request });
}

/**
 * Disable account action.
 *
 * ```ts
 * const result = await disableAccountAction(sessionClient, {
 *   action: 'TIPPING'
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function disableAccountAction(
  client: SessionClient,
  request: DisableAccountActionRequest,
): ResultAsync<DisableAccountActionResult, UnexpectedError | UnauthenticatedError> {
  return client.query(DisableAccountActionMutation, { request });
}

/**
 * Execute account action.
 *
 * ```ts
 * const result = await executeAccountAction(sessionClient, {
 *   targetAccount: evmAddress('0x1234...'),
 *   params: {
 *     tipping: {
 *       value: '100',
 *       currency: evmAddress('0x5678...')
 *     }
 *   }
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function executeAccountAction(
  client: SessionClient,
  request: ExecuteAccountActionRequest,
): ResultAsync<ExecuteAccountActionResult, UnexpectedError | UnauthenticatedError> {
  return client.query(ExecuteAccountActionMutation, { request });
}
