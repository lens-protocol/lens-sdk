import type {
  AccountManager,
  AccountManagersRequest,
  AddAccountManagerRequest,
  AddAccountManagerResult,
  RemoveAccountManagerRequest,
  RemoveAccountManagerResult,
  UpdateAccountManagerRequest,
  UpdateAccountManagerResult,
} from '@lens-protocol/graphql';
import {
  AccountManagersQuery,
  AddAccountManagerMutation,
  RemoveAccountManagerMutation,
  UpdateAccountManagerMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

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
 *   address: evmAddress("0xe5439696f4057aF073c0FB2dc6e5e755392922e1"),
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
 *   manager: evmAddress("0xe5439696f4057aF073c0FB2dc6e5e755392922e1");
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

/**
 * Update permissions for an account manager.
 *
 * ```ts
 * const result = await updateAccountManager(sessionClient, {
 *   permissions: {
 *       canSetMetadataUri: true;
 *       canTransferNative: false;
 *       canTransferTokens: true;
 *       canExecuteTransactions: false;
 *   },
 *   manager: evmAddress("0xe5439696f4057aF073c0FB2dc6e5e755392922e1");
 * });
 * ```
 *
 * @param client - Lens SessionClient.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function updateAccountManager(
  client: SessionClient,
  request: UpdateAccountManagerRequest,
): ResultAsync<UpdateAccountManagerResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(UpdateAccountManagerMutation, { request });
}
