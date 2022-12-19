import { TransactionRequestModel } from '@lens-protocol/domain/entities';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

export class NoopResponder<T extends TransactionRequestModel> implements ITransactionResponder<T> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async commit(_: BroadcastedTransactionData<T>) {}
}
