import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { NativeTransaction, TransactionKind, TransactionRequestModel } from '../../entities';
import { TransactionQueue } from '../transactions/TransactionQueue';
import { IGenericResultPresenter } from '../transactions/IGenericResultPresenter';

export type CreateProfileRequest = {
  handle: string;
  kind: TransactionKind.CREATE_PROFILE;
};

export class DuplicatedHandleError extends Error {
  name = 'DuplicatedHandleError' as const;

  constructor(handle: string) {
    super(`Handle "${handle}" is already taken`);
  }
}

export interface IProfileTransactionGateway {
  createProfileTransaction<T extends CreateProfileRequest>(
    request: T,
  ): PromiseResult<NativeTransaction<T>, DuplicatedHandleError>;
}

export type ICreateProfilePresenter = IGenericResultPresenter<void, DuplicatedHandleError>;

export class CreateProfile {
  constructor(
    private readonly gateway: IProfileTransactionGateway,
    private readonly presenter: ICreateProfilePresenter,
    private readonly transactionQueue: TransactionQueue<TransactionRequestModel>,
  ) {}

  async create(request: CreateProfileRequest) {
    const transactionResult = await this.gateway.createProfileTransaction(request);

    // In this occasion optimistic update is not advisable. Setting active profile handle ahead of time
    // might lead to some presentation logic to query for data using such handle, data that is not yet available.
    if (transactionResult.isFailure()) {
      this.presenter.present(failure(transactionResult.error));
      return;
    }

    const transaction = transactionResult.value;

    await this.transactionQueue.push(transaction);

    this.presenter.present(success());
  }
}
