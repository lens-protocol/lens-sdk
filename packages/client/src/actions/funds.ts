import {
  AccountBalancesQuery,
  type AccountBalancesRequest,
  type AnyAccountBalance,
  DepositMutation,
  type DepositRequest,
  type DepositResult,
  UnwrapTokensMutation,
  WithdrawMutation,
  type WithdrawRequest,
  type WithdrawResult,
  WrapTokensMutation,
} from '@lens-protocol/graphql';
import type {
  UnwrapTokensRequest,
  UnwrapTokensResult,
  WrapTokensRequest,
} from '@lens-protocol/graphql';
import type { WrapTokensResult } from '@lens-protocol/graphql';
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
 * @param client - The session client for the authenticated Account.
 * @param request - The query request.
 * @returns The list of balance results.
 */
export function fetchAccountBalances(
  client: SessionClient,
  request: AccountBalancesRequest,
): ResultAsync<AnyAccountBalance[], UnauthenticatedError | UnexpectedError> {
  return client.query(AccountBalancesQuery, { request });
}

/**
 * Withdraw funds from the authenticated Account.
 *
 * ```ts
 * const result = await withdraw(sessionClient, {
 *   native: bigDecimal(42.5),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function withdraw(
  sessionClient: SessionClient,
  request: WithdrawRequest,
): ResultAsync<WithdrawResult, UnexpectedError | UnauthenticatedError> {
  return sessionClient.mutation(WithdrawMutation, { request });
}

/**
 * Deposit funds into the authenticated Account.
 *
 * ```ts
 * const result = await deposit(sessionClient, {
 *   native: bigDecimal(42.5),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function deposit(
  sessionClient: SessionClient,
  request: DepositRequest,
): ResultAsync<DepositResult, UnexpectedError | UnauthenticatedError> {
  return sessionClient.mutation(DepositMutation, { request });
}

/**
 * Convert native tokens held in the authenticated Lens Account to their ERC20 equivalent. For example:
 * - Mainnet: GHO -> WGHO
 * - Testnet: GRASS -> WGRASS
 *
 * ```ts
 * const result = await wrapTokens(sessionClient, {
 *   amount: bigDecimal(42.5),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function wrapTokens(
  sessionClient: SessionClient,
  request: WrapTokensRequest,
): ResultAsync<WrapTokensResult, UnexpectedError | UnauthenticatedError> {
  return sessionClient.mutation(WrapTokensMutation, { request });
}

/**
 * Unwrap wrapped native tokens held in the authenticated Lens Account. For example:
 * - Mainnet: WGHO -> GHO
 * - Testnet: WGRASS -> GRASS
 *
 * ```ts
 * const result = await unwrapTokens(sessionClient, {
 *   amount: bigDecimal(42.5),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function unwrapTokens(
  sessionClient: SessionClient,
  request: UnwrapTokensRequest,
): ResultAsync<UnwrapTokensResult, UnexpectedError | UnauthenticatedError> {
  return sessionClient.mutation(UnwrapTokensMutation, { request });
}
