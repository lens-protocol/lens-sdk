import type {
  AccountManager,
  AccountManagersRequest,
  AddAccountManagerRequest,
  AddAccountManagerResult,
  RemoveAccountManagerRequest,
  RemoveAccountManagerResult,
} from '@lens-social/graphql';
import {
  AccountManagersQuery,
  AddAccountManagerMutation,
  RemoveAccountManagerMutation,
} from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';

import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';
import type { Paginated } from '../types';

/**
 * Fetch Account Managers.
 *
 * ```ts
 * const result = await fetchAccountManagers(sessionClient);
 * ```
 *
 * @param client - Lens SessionClient.
 * @param request - The query request.
 * @returns List of Account Managers.
 */
export function fetchAccountManagers(
  client: SessionClient,
  request: AccountManagersRequest = {},
): ResultAsync<Paginated<AccountManager>, UnexpectedError | UnauthenticatedError> {
  return client.query(AccountManagersQuery, { request });
}

/**
 * Add an account manager to the authenticated account.
 *
 * ```ts
 * const result = await addAccountManager(sessionClient, {
 *   address: evmAddress("0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3"),
 *   permissions: {
 *     canSetMetadataUri: true,
 *     canTransferNative: true,
 *     canTransferTokens: true,
 *     canExecuteTransactions: true,
 *   },
 * });
 * ```
 *
 * @param client - Lens SessionClient.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function addAccountManager(
  client: SessionClient,
  request: AddAccountManagerRequest,
): ResultAsync<AddAccountManagerResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(AddAccountManagerMutation, { request });
}

/**
 * Add an account manager to the authenticated account.
 *
 * ```ts
 * const result = await removeAccountManager(sessionClient, {
 *   manager: evmAddress("0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3");
 * });
 * ```
 *
 * @param client - Lens SessionClient.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function removeAccountManager(
  client: SessionClient,
  request: RemoveAccountManagerRequest,
): ResultAsync<RemoveAccountManagerResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RemoveAccountManagerMutation, { request });
}
