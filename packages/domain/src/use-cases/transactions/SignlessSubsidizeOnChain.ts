import { PromiseResult, failure, success } from '@lens-protocol/shared-kernel';

import {
  ProtocolTransactionRequestModel,
  ProxyTransaction,
  AnyTransactionRequestModel,
  Transaction,
} from '../../entities';
import { BroadcastingError } from './BroadcastingError';
import { IGenericResultPresenter } from './IGenericResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export interface ISignlessSubsidizedCallRelayer<T extends ProtocolTransactionRequestModel> {
  createProxyTransaction(request: T): PromiseResult<ProxyTransaction<T>, BroadcastingError>;
}

export type ISignlessSubsidizeOnChainPresenter = IGenericResultPresenter<void, BroadcastingError>;

export class SignlessSubsidizeOnChain<T extends ProtocolTransactionRequestModel> {
  constructor(
    protected readonly relayer: ISignlessSubsidizedCallRelayer<T>,
    protected readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    protected readonly presenter: ISignlessSubsidizeOnChainPresenter,
  ) {}

  async execute(request: T) {
    const transaction = await this.relayer.createProxyTransaction(request);

    if (transaction.isFailure()) {
      this.presenter.present(failure(transaction.error));
      return;
    }
    await this.transactionQueue.push(transaction.value as Transaction<T>);

    this.presenter.present(success());
  }
}
