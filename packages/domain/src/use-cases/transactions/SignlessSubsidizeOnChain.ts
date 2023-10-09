import { PromiseResult } from '@lens-protocol/shared-kernel';

import {
  ProtocolTransactionRequestModel,
  ProxyTransaction,
  AnyTransactionRequestModel,
  Transaction,
} from '../../entities';
import { BroadcastingError } from './BroadcastingError';
import { ITransactionResultPresenter } from './ITransactionResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export interface ISignlessSubsidizedCallRelayer<T extends ProtocolTransactionRequestModel> {
  createProxyTransaction(request: T): PromiseResult<ProxyTransaction<T>, BroadcastingError>;
}

export type ISignlessSubsidizeOnChainPresenter<T extends ProtocolTransactionRequestModel> =
  ITransactionResultPresenter<T, BroadcastingError>;

export class SignlessSubsidizeOnChain<T extends ProtocolTransactionRequestModel> {
  constructor(
    protected readonly relayer: ISignlessSubsidizedCallRelayer<T>,
    protected readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    protected readonly presenter: ISignlessSubsidizeOnChainPresenter<T>,
  ) {}

  async execute(request: T) {
    const result = await this.relayer.createProxyTransaction(request);

    if (result.isFailure()) {
      this.presenter.present(result);
      return;
    }

    const transaction = result.value;
    await this.transactionQueue.push(transaction as Transaction<T>, this.presenter);
  }
}
