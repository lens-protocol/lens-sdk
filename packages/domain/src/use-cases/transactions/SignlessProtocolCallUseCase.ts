import { success } from '@lens-protocol/shared-kernel';

import { ProxyTransaction, TransactionRequestModel } from '../../entities';
import { IGenericResultPresenter } from './IGenericResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export interface ISignlessProtocolCallRelayer<T extends TransactionRequestModel> {
  relaySignlessProtocolCall(request: T): Promise<ProxyTransaction<T>>;
}

export type ISignlessProtocolCallPresenter = IGenericResultPresenter<void, Error>;

export class SignlessProtocolCallUseCase<T extends TransactionRequestModel> {
  constructor(
    protected readonly relayer: ISignlessProtocolCallRelayer<T>,
    protected readonly transactionQueue: TransactionQueue<TransactionRequestModel>,
    protected readonly presenter: ISignlessProtocolCallPresenter,
  ) {}

  async execute(request: T) {
    const transaction = await this.relayer.relaySignlessProtocolCall(request);

    await this.transactionQueue.push(transaction);

    this.presenter.present(success());
  }
}
