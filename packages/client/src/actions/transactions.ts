import type {
  PrepareSignerErc20ApprovalRequest,
  PrepareSignerErc20ApprovalResult,
  TransactionStatusRequest,
  TransactionStatusResult,
} from '@lens-protocol/graphql';
import {
  PrepareSignerErc20ApprovalMutation,
  TransactionStatusQuery,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Fetch the indexing status of a Transaction.
 *
 * ```ts
 * const result = await transactionStatus(anyClient, {
 *   txHash: txHash('0x97589c9e3a3c5b007d…'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The indexing status of the Transaction.
 */
export function transactionStatus(
  client: AnyClient,
  request: TransactionStatusRequest,
): ResultAsync<TransactionStatusResult, UnexpectedError> {
  return client.query(TransactionStatusQuery, { request });
}

/**
 * Prepare a signer ERC20 approval transaction.
 *
 * ```ts
 * const result = await prepareSignerErc20Approval(sessionClient, {
 *   approval: {
 *     infinite: evmAddress('0x1235678901234567890123456789012345678901'),
 *   },
 * });
 * ```
 *
 * @param client - Session Lens client.
 * @param request - The mutation request.
 * @returns The prepared transaction.
 */
export function prepareSignerErc20Approval(
  client: SessionClient,
  request: PrepareSignerErc20ApprovalRequest,
): ResultAsync<
  PrepareSignerErc20ApprovalResult,
  UnauthenticatedError | UnexpectedError
> {
  return client.mutation(PrepareSignerErc20ApprovalMutation, { request });
}
