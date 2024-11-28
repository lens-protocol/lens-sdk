import type {
  Account,
  AccountRequest,
  CreateAccountWithUsernameRequest,
  CreateAccountWithUsernameResult,
  EnableSignlessResult,
  SetAccountMetadataRequest,
  SetAccountMetadataResult,
} from '@lens-protocol/graphql';
import {
  AccountQuery,
  CreateAccountWithUsernameMutation,
  EnableSignlessMutation,
  RemoveSignlessMutation,
  SetAccountMetadataMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { RemoveSignlessResult } from '@lens-protocol/graphql';
import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Fetch an Account.
 *
 * Using a {@link SessionClient} will yield {@link Account#operations} specific to the authenticated Account.
 *
 * ```ts
 * const result = await fetchAccount(anyClient, {
 *   address?: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The Account query request.
 * @returns The Account or `null` if it does not exist.
 */
export function fetchAccount(
  client: AnyClient,
  request: AccountRequest,
): ResultAsync<Account | null, UnexpectedError> {
  return client.query(AccountQuery, { request });
}

/**
 * Set Account metadata for the authenticated Account.
 *
 * ```ts
 * const result = await setAccountMetadata(sessionClient, {
 *   metadataURI: uri('ar://abc123def456gh…'),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setAccountMetadata(
  client: SessionClient,
  request: SetAccountMetadataRequest,
): ResultAsync<SetAccountMetadataResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetAccountMetadataMutation, { request });
}

/**
 * Create an account with a given username.
 *
 * ```ts
 * const result = await createAccountWithUsername(sessionClient, {
 *   username: {
 *      localname: 'wagmi'
 *   },
 *   metadataUri: uri('lens://bafybxiky5jf…'),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createAccountWithUsername(
  client: SessionClient,
  request: CreateAccountWithUsernameRequest,
): ResultAsync<CreateAccountWithUsernameResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateAccountWithUsernameMutation, { request });
}

/**
 * Get transaction to enable signless.
 *
 * ```ts
 * const result = await enableSignless(sessionClient);
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function enableSignless(
  client: SessionClient,
): ResultAsync<EnableSignlessResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(EnableSignlessMutation, {});
}

/**
 * Get transaction to remove signless.
 *
 * ```ts
 * const result = await removeSignless(sessionClient);
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function removeSignless(
  client: SessionClient,
): ResultAsync<RemoveSignlessResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RemoveSignlessMutation, {});
}
