import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import {
  ProtocolTransactionRequestModel,
  AnyTransactionRequestModel,
  Transaction,
} from '../../entities';
import { BroadcastingError } from './BroadcastingError';
import { IGenericResultPresenter } from './IGenericResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export type WithDelegateFlag<T extends ProtocolTransactionRequestModel> = T extends {
  delegate: boolean;
}
  ? T
  : never;

export interface ISignedOperation<T extends ProtocolTransactionRequestModel> {
  execute(request: T): Promise<void>;
}

export interface IDelegatedTransactionGateway<T extends ProtocolTransactionRequestModel> {
  createDelegatedTransaction(request: T): PromiseResult<Transaction<T>, BroadcastingError>;
}

export type IDelegatedTransactionPresenter = IGenericResultPresenter<void, BroadcastingError>;

export class DelegableSigning<T extends ProtocolTransactionRequestModel> {
  constructor(
    private readonly signedOperation: ISignedOperation<T>,
    private readonly transactionGateway: IDelegatedTransactionGateway<T>,
    private readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    private readonly presenter: IDelegatedTransactionPresenter,
  ) {}

  async execute(request: WithDelegateFlag<T>): Promise<void> {
    if (request.delegate) {
      const result = await this.transactionGateway.createDelegatedTransaction(request);

      if (result.isFailure()) {
        this.presenter.present(failure(result.error));
        return;
      }

      const transaction = result.value;
      await this.transactionQueue.push(transaction);

      this.presenter.present(success());
      return;
    }
    return this.signedOperation.execute(request);
  }
}
