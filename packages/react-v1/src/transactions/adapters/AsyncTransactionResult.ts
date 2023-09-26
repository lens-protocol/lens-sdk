import { TransactionError } from '@lens-protocol/domain/entities';
import { PromiseResult } from '@lens-protocol/shared-kernel';

export type AsyncTransactionResult<TValue> = {
  /**
   * @experimental This method can change in the future
   */
  waitForCompletion(): PromiseResult<TValue, TransactionError>;
};
