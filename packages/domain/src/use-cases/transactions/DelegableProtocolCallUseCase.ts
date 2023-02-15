import { success } from '@lens-protocol/shared-kernel';

import { IProtocolCallPresenter, ProtocolCallUseCase } from './ProtocolCallUseCase';
import { TransactionQueue } from './TransactionQueue';
import { NativeTransaction, TransactionRequestModel } from '../../entities';

export type WithDelegateFlag<T extends TransactionRequestModel> = T extends { delegate: boolean }
  ? T
  : never;

export interface IDelegableProtocolCallGateway<T extends TransactionRequestModel> {
  createDelegatedTransaction(request: T): Promise<NativeTransaction<T>>;
}

export type { IProtocolCallPresenter };

export class DelegableProtocolCallUseCase<T extends TransactionRequestModel> {
  constructor(
    private readonly protocolCallUseCase: ProtocolCallUseCase<T>,
    private readonly protocolCallGateway: IDelegableProtocolCallGateway<T>,
    private readonly transactionQueue: TransactionQueue<TransactionRequestModel>,
    private readonly presenter: IProtocolCallPresenter,
  ) {}

  async execute(request: WithDelegateFlag<T>): Promise<void> {
    if (request.delegate) {
      const transaction = await this.protocolCallGateway.createDelegatedTransaction(request);

      await this.transactionQueue.push(transaction);

      this.presenter.present(success());
      return;
    }
    return this.protocolCallUseCase.execute(request);
  }
}
