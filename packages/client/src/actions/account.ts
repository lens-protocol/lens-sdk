import type { Account, AccountQueryVariables } from '@lens-social/graphql';
import {
  AccountQuery,
  CreateAccountWithUsernameMutation,
  SetAccountMetadataMutation,
} from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';

import type { SetAccountMetadataVariables } from '@lens-social/graphql';
import type { SetAccountMetadataResult } from '@lens-social/graphql';
import type { CreateAccountWithUsernameVariables } from '@lens-social/graphql';
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
 *    request: {
 *      legacyProfileId?: legacyProfileId('0x01'),
 *      username?: userNameValue('alice'),
 *      address?: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 *  } });
 * ```
 *
 * @param client - Any Lens client.
 * @param variables - The Account query variables.
 * @returns The Account or `null` if it does not exist.
 */
export function fetchAccount(
  client: AnyClient,
  { request }: AccountQueryVariables,
): ResultAsync<Account | null, UnexpectedError> {
  return client.query(AccountQuery, { request });
}

/**
 * Set Account metadata for the authenticated Account.
 *
 * ```ts
 * const result = await setAccountMetadata(sessionClient, {
 *   request: {
 *     metadataURI: uri('ar://abc123def456gh…'),
 *   },
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param variables - The Account metadata request variables.
 * @returns The set account metadata operation result.
 */
export function setAccountMetadata(
  client: SessionClient,
  { request }: SetAccountMetadataVariables,
): ResultAsync<SetAccountMetadataResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetAccountMetadataMutation, { request });
}

/**
 * Create an account with a given username.
 *
 * ```ts
 * const result = await createAccountWithUsername(sessionClient, {
 *  request: {
 *    accountManager: [evmAddress('0x01')],
 *    localName: string,
 *    metadataUri: uri('lens://bafybxiky5jf…'),
 *  },
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param variables - The create account request variables.
 * @returns The create account operation result.
 */
export function createAccountWithUsername(
  client: SessionClient,
  { request }: CreateAccountWithUsernameVariables,
): ResultAsync<CreateAccountWithUsernameResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateAccountWithUsernameMutation, { request });
}
