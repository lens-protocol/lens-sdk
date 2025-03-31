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
export function health(client: AnyClient): ResultAsync<boolean, UnexpectedError> {
  return client.query(HealthQuery, {});
}

/**
 * Fetch an Access Control details.
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
