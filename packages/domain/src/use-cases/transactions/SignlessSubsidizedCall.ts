import { success } from '@lens-protocol/shared-kernel';

import {
  ProtocolTransactionRequestModel,
  ProxyTransaction,
  AnyTransactionRequestModel,
} from '../../entities';
import { IGenericResultPresenter } from './IGenericResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export interface ISignlessSubsidizedCallRelayer<T extends ProtocolTransactionRequestModel> {
  createProxyTransaction(request: T): Promise<ProxyTransaction<T>>;
}

export type ISignlessSubsidizedCallPresenter = IGenericResultPresenter<void, Error>;

export class SignlessSubsidizedCall<T extends ProtocolTransactionRequestModel> {
  constructor(
    protected readonly relayer: ISignlessSubsidizedCallRelayer<T>,
    protected readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    protected readonly presenter: ISignlessSubsidizedCallPresenter,
  ) {}

  async execute(request: T) {
    const transaction = await this.relayer.createProxyTransaction(request);

    await this.transactionQueue.push(transaction);

    this.presenter.present(success());
  }
}
