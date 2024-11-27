import { HealthQuery } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';
import type { AnyClient } from '../clients';
import type { UnexpectedError } from '../errors';

/**
 * Health checks.
 *
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
