import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { NativeTransaction, TransactionKind, AnyTransactionRequestModel } from '../../entities';
import { BroadcastingError } from '../transactions/BroadcastingError';
import { IGenericResultPresenter } from '../transactions/IGenericResultPresenter';
import { TransactionQueue } from '../transactions/TransactionQueue';

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
  ): PromiseResult<NativeTransaction<T>, DuplicatedHandleError | BroadcastingError>;
}

export type ICreateProfilePresenter = IGenericResultPresenter<
  void,
  DuplicatedHandleError | BroadcastingError
>;

export class CreateProfile {
  constructor(
    private readonly gateway: IProfileTransactionGateway,
    private readonly presenter: ICreateProfilePresenter,
    private readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
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
