import type {
  Account,
  AccountRequest,
  CreateAccountWithUsernameRequest,
  SetAccountMetadataRequest,
} from '@lens-social/graphql';
import {
  AccountQuery,
  CreateAccountWithUsernameMutation,
  SetAccountMetadataMutation,
} from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';

import type { SetAccountMetadataResult } from '@lens-social/graphql';
import type { CreateAccountWithUsernameResult } from '@lens-social/graphql';
import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Fetch an Account.
 *
 * Using a {@link SessionClient} will yield {@link Account#operations} specific to the authenticated Account.
 *
 * ```ts
 * const result = await fetchAccount(anyClient, {
 *   legacyProfileId?: legacyProfileId('0x01'),
 *   username?: userNameValue('alice'),
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
 *   accountManager: [evmAddress('0x01')],
 *   localName: 'wagmi',
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
