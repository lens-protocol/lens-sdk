import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { NativeTransaction, TransactionRequestModel } from '../../entities';
import { BroadcastingError } from './BroadcastingError';
import { IProtocolCallPresenter, SubsidizedCall } from './SubsidizedCall';
import { TransactionQueue } from './TransactionQueue';

export type WithDelegateFlag<T extends TransactionRequestModel> = T extends { delegate: boolean }
  ? T
  : never;

export interface IDelegableProtocolCallGateway<T extends TransactionRequestModel> {
  createDelegatedTransaction(request: T): PromiseResult<NativeTransaction<T>, BroadcastingError>;
}

export type { IProtocolCallPresenter };

export class DelegableProtocolCallUseCase<T extends TransactionRequestModel> {
  constructor(
    private readonly subsidizedCall: SubsidizedCall<T>,
    private readonly protocolCallGateway: IDelegableProtocolCallGateway<T>,
    private readonly transactionQueue: TransactionQueue<TransactionRequestModel>,
    private readonly presenter: IProtocolCallPresenter,
  ) {}

  async execute(request: WithDelegateFlag<T>): Promise<void> {
    if (request.delegate) {
      const result = await this.protocolCallGateway.createDelegatedTransaction(request);

      if (result.isFailure()) {
        this.presenter.present(failure(result.error));
        return;
      }

      const transaction = result.value;
      await this.transactionQueue.push(transaction);

      this.presenter.present(success());
      return;
    }
    return this.subsidizedCall.execute(request);
  }
}
