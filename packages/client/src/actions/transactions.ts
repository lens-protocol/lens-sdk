import type { TransactionStatusRequest, TransactionStatusResult } from '@lens-protocol/graphql';
import { TransactionStatusQuery } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient } from '../clients';
import type { UnexpectedError } from '../errors';

/**
 * Fetch the indexing status of a Transaction.
 *
 * ```ts
 * const result = await transactionStatus(anyClient, {
 *   txHash: '0x97589c9e3a3c5b007d…',
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
