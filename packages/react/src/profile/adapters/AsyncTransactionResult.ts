import { TransactionError } from '@lens-protocol/domain/entities';
import { PromiseResult } from '@lens-protocol/shared-kernel';

export type AsyncTransactionResult<TValue> = {
  waitForCompletion(): PromiseResult<TValue, TransactionError>;
};
