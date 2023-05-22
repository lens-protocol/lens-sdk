import { PromiseResult, success } from '@lens-protocol/shared-kernel';

import {
  AnyTransactionRequestModel,
  ProtocolTransactionRequestModel,
  ProxyTransaction,
} from '../../entities';
import { IGenericResultPresenter } from './IGenericResultPresenter';
import { TransactionQueue } from './TransactionQueue';
import { ProxyActionUsageLimitExceededError } from './ProxyActionUsageLimitExceededError';

export interface ISignlessSubsidizedCallRelayer<T extends ProtocolTransactionRequestModel> {
  createProxyTransaction(
    request: T,
  ): PromiseResult<ProxyTransaction<T>, ProxyActionUsageLimitExceededError>;
}

export type ISignlessSubsidizeOnChainPresenter = IGenericResultPresenter<void, Error>;

export class SignlessSubsidizeOnChain<T extends ProtocolTransactionRequestModel> {
  constructor(
    protected readonly relayer: ISignlessSubsidizedCallRelayer<T>,
    protected readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    protected readonly presenter: ISignlessSubsidizeOnChainPresenter,
  ) {}

  async execute(request: T) {
    const transaction = await this.relayer.createProxyTransaction(request);

    if (transaction.isSuccess()) {
      await this.transactionQueue.push(transaction.value);

      this.presenter.present(success());
    } else {
      // handle error
    }
  }
}
