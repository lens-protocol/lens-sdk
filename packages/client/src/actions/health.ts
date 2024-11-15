import { HealthQuery } from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';
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
