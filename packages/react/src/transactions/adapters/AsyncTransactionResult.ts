import { TransactionError } from '@lens-protocol/domain/entities';
import { PromiseResult } from '@lens-protocol/shared-kernel';

/**
 * An object that represents the result of an async transaction.
 *
 * It allows to wait for the transaction until it's full completion.
 *
 * @experimental this interface is not yet stable and might change in the future.
 */
export type AsyncTransactionResult<TValue> = {
  /**
   * Allows to wait for the transaction until its full completion.
   *
   * For Lens Transactions this means that the transaction has been mined and indexed.
   *
   * For other blockchain transactions this means that the transaction has been mined.
   */
  waitForCompletion(): PromiseResult<TValue, TransactionError>;
};
