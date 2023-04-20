import { success } from '@lens-protocol/shared-kernel';

import {
  ProtocolCallRequestModel,
  ProxyTransaction,
  TransactionRequestModel,
} from '../../entities';
import { IGenericResultPresenter } from './IGenericResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export interface ISignlessSubsidizedCallRelayer<T extends ProtocolCallRequestModel> {
  createProxyTransaction(request: T): Promise<ProxyTransaction<T>>;
}

export type ISignlessSubsidizedCallPresenter = IGenericResultPresenter<void, Error>;

export class SignlessSubsidizedCall<T extends ProtocolCallRequestModel> {
  constructor(
    protected readonly relayer: ISignlessSubsidizedCallRelayer<T>,
    protected readonly transactionQueue: TransactionQueue<TransactionRequestModel>,
    protected readonly presenter: ISignlessSubsidizedCallPresenter,
  ) {}

  async execute(request: T) {
    const transaction = await this.relayer.createProxyTransaction(request);

    await this.transactionQueue.push(transaction);

    this.presenter.present(success());
  }
}
