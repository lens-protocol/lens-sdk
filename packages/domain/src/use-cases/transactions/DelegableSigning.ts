import { PromiseResult } from '@lens-protocol/shared-kernel';

import {
  ProtocolTransactionRequestModel,
  AnyTransactionRequestModel,
  Transaction,
} from '../../entities';
import { BroadcastingError } from './BroadcastingError';
import { ITransactionResultPresenter } from './ITransactionResultPresenter';
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

export type IDelegatedTransactionPresenter<T extends ProtocolTransactionRequestModel> =
  ITransactionResultPresenter<T, BroadcastingError>;

export class DelegableSigning<T extends ProtocolTransactionRequestModel> {
  constructor(
    private readonly signedOperation: ISignedOperation<T>,
    private readonly transactionGateway: IDelegatedTransactionGateway<T>,
    private readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    private readonly presenter: IDelegatedTransactionPresenter<T>,
  ) {}

  async execute(request: WithDelegateFlag<T>): Promise<void> {
    if (request.delegate) {
      const result = await this.transactionGateway.createDelegatedTransaction(request);

      if (result.isFailure()) {
        this.presenter.present(result);
        return;
      }

      const transaction = result.value;
      await this.transactionQueue.push(transaction, this.presenter);
      return;
    }
    return this.signedOperation.execute(request);
  }
}
