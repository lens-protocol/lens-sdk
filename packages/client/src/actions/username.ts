import type { Username, UsernameRequest, UsernamesRequest } from '@lens-protocol/graphql';
import { UsernameQuery, UsernamesQuery } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient } from '../clients';
import type { UnexpectedError } from '../errors';
import type { Paginated } from '../types';

/**
 * Fetch username details.
 *
 * ```ts
 * const result = await fetchUsername(anyClient, {
 *   username: { localName: 'wagmi' },
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The username details.
 */
export function fetchUsername(
  client: AnyClient,
  request: UsernameRequest,
): ResultAsync<Username | null, UnexpectedError> {
  return client.query(UsernameQuery, { request });
}

/**
 * Fetch usernames owned by an account.
 *
 * ```ts
 * const result = await fetchUsernames(anyClient, {
 *   owner: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of owned usernames.
 */
export function fetchUsernames(
  client: AnyClient,
  request: UsernamesRequest,
): ResultAsync<Paginated<Username> | null, UnexpectedError> {
  return client.query(UsernamesQuery, { request });
}
