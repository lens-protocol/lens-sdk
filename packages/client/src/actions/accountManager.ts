import type {
  AccountManager,
  AccountManagersRequest,
  AddAccountManagerResult,
  HideManagedAccountRequest,
  Paginated,
  RemoveAccountManagerRequest,
  RemoveAccountManagerResult,
  UnhideManagedAccountRequest,
  UpdateAccountManagerRequest,
  UpdateAccountManagerResult,
} from '@lens-protocol/graphql';
import {
  type AccountManagerPermissions,
  AccountManagersQuery,
  AddAccountManagerMutation,
  HideManagedAccountMutation,
  RemoveAccountManagerMutation,
  UnhideManagedAccountMutation,
  UpdateAccountManagerMutation,
} from '@lens-protocol/graphql';
import type { EvmAddress, ResultAsync } from '@lens-protocol/types';
import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

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
): ResultAsync<
  Paginated<AccountManager>,
  UnexpectedError | UnauthenticatedError
> {
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
  request: { address: EvmAddress; permissions?: AccountManagerPermissions },
): ResultAsync<
  AddAccountManagerResult,
  UnexpectedError | UnauthenticatedError
> {
  return client.mutation(AddAccountManagerMutation, {
    request: {
      address: request.address,
      permissions: request.permissions ?? {
        canExecuteTransactions: false,
        canTransferTokens: false,
        canTransferNative: false,
        canSetMetadataUri: false,
      },
    },
  });
}

/**
 * Remove manager from the authenticated account.
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
): ResultAsync<
  RemoveAccountManagerResult,
  UnexpectedError | UnauthenticatedError
> {
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
): ResultAsync<
  UpdateAccountManagerResult,
  UnexpectedError | UnauthenticatedError
> {
  return client.mutation(UpdateAccountManagerMutation, { request });
}

/**
 * Hide a managed account.
 *
 * ```ts
 * const result = await muteAccount(sessionClient, {
 *   account: evmAddress("0xe5439696f4057aF073c0FB2dc6e5e755392922e1");
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns void.
 */
export function hideManagedAccount(
  client: SessionClient,
  request: HideManagedAccountRequest,
): ResultAsync<void, UnexpectedError | UnauthenticatedError> {
  return client.mutation(HideManagedAccountMutation, { request });
}

/**
 * Unhide a managed account.
 *
 * ```ts
 * const result = await unhideManagedAccount(sessionClient, {
 *   account: evmAddress("0xe5439696f4057aF073c0FB2dc6e5e755392922e1");
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns void.
 */
export function unhideManagedAccount(
  client: SessionClient,
  request: UnhideManagedAccountRequest,
): ResultAsync<void, UnexpectedError | UnauthenticatedError> {
  return client.mutation(UnhideManagedAccountMutation, { request });
}
