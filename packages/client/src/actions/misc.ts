import {
  AccessControlQuery,
  type AccessControlRequest,
  type AccessControlResult,
  HealthQuery,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';
import type { AnyClient } from '../clients';
import type { UnexpectedError } from '../errors';

/**
 * Health check query.
 *
 * ```ts
 * const result = await health(anyClient);
 * ```
 *
 * @param client - Any Lens client.
 * @returns True or false
 */
export function health(
  client: AnyClient,
): ResultAsync<boolean, UnexpectedError> {
  return client.query(HealthQuery, {});
}

/**
 * Fetch an account's Access Control details.
 *
 * ```ts
 * const result = await fetchAccessControl(anyClient, {
 *   address: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The Access Control query request.
 * @returns The Access Control or `null` if it does not exist.
 */
export function fetchAccessControl(
  client: AnyClient,
  request: AccessControlRequest,
): ResultAsync<AccessControlResult | null, UnexpectedError> {
  return client.query(AccessControlQuery, { request });
}
