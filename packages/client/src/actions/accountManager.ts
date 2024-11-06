import type {
  AccountManager,
  AccountManagersVariables,
  AddAccountManagerResult,
  AddAccountManagerVariables,
  RemoveAccountManagerResult,
  RemoveAccountManagerVariables,
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
 *  const result = await fetchAccountManagers(sessionClient, {
 *   request: {
 *    cursor?: Cursor,
 *    pageSize?: "TEN" | "FIFTY",
 *  },
 * });
 * ```
 *
 * @param client - Lens SessionClient.
 * @param variables - The AccountManagers query variables.
 * @returns List of Account Managers.
 */
export function fetchAccountManagers(
  client: SessionClient,
  { request }: AccountManagersVariables,
): ResultAsync<Paginated<AccountManager>, UnexpectedError | UnauthenticatedError> {
  return client.query(AccountManagersQuery, { request });
}

/**
 * Add an account manager to the authenticated account.
 *
 * ```ts
 * const result = await addAccountManager(sessionClient, {
 *  request: {
 *    permissions: {
 *      canSetMetadataUri: true | false,
 *      canTransferNative: true | false,
 *      canTransferTokens: true | false,
 *      canExecuteTransactions: true | false,
 *    },
 *    address: evmAddress("0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3");
 *  },
 * });
 * ```
 *
 * @param client - Lens SessionClient.
 * @param variables - The AddAccountManager mutation variables.
 * @returns Transaction result.
 */
export function addAccountManager(
  client: SessionClient,
  { request }: AddAccountManagerVariables,
): ResultAsync<AddAccountManagerResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(AddAccountManagerMutation, { request });
}

/**
 * Add an account manager to the authenticated account.
 *
 * ```ts
 * const result = await removeAccountManager(sessionClient, {
 *  request: {
 *    manager: evmAddress("0x90c8c68d0Abfb40D4fCD72316A65e42161520BC3");
 *  },
 * });
 * ```
 *
 * @param client - Lens SessionClient.
 * @param variables - The RemoveAccountManager mutation variables.
 * @returns Transaction result.
 */
export function removeAccountManager(
  client: SessionClient,
  { request }: RemoveAccountManagerVariables,
): ResultAsync<RemoveAccountManagerResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RemoveAccountManagerMutation, { request });
}
