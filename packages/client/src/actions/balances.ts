import {
  AccountBalancesQuery,
  type AccountBalancesRequest,
  type AnyAccountBalance,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';
import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Fetch balances for the authenticated Account.
 *
 * ```ts
 * const result = await fetchBalancesBulk(sessionClient, {
 *   includeNative: true,
 *   tokens: [
 *     evmAddress("0x12345…"),
 *     evmAddress("0x67890…"),
 *   ]
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of balance results.
 */
export function fetchAccountBalances(
  client: SessionClient,
  request: AccountBalancesRequest,
): ResultAsync<AnyAccountBalance[], UnauthenticatedError | UnexpectedError> {
  return client.query(AccountBalancesQuery, { request });
}
