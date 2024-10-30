import type { TransactionStatusResult, TransactionStatusVariables } from '@lens-social/graphql';
import { TransactionStatusQuery } from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';

import type { AnyClient } from '../clients';
import type { UnexpectedError } from '../errors';

/**
 * Fetch the indexing status of a Transaction.
 *
 * ```ts
 * const result = await transactionStatus(anyClient, { request: { postId: postId('0x01') } });
 * ```
 *
 * @param client - Any Lens client.
 * @returns The indexing status of the Transaction.
 */
export function transactionStatus(
  client: AnyClient,
  { request }: TransactionStatusVariables,
): ResultAsync<TransactionStatusResult, UnexpectedError> {
  return client.query(TransactionStatusQuery, { request });
}
