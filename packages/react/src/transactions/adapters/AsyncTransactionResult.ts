import { TransactionError } from '@lens-protocol/domain/entities';
import { PromiseResult } from '@lens-protocol/shared-kernel';

export type AsyncTransactionResult<TValue> = {
  /**
   * Allows to wait for the transaction until it's full completion.
   *
   * For Lens Transactions this means that the transaction has been mined and indexed.
   *
   * For other blockchain transactions this means that the transaction has been mined.
   */
  waitForCompletion(): PromiseResult<TValue, TransactionError>;
};
