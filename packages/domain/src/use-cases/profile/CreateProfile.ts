import { failure, PromiseResult, Url } from '@lens-protocol/shared-kernel';

import { NativeTransaction, TransactionKind, AnyTransactionRequestModel } from '../../entities';
import { BroadcastingError } from '../transactions/BroadcastingError';
import { ITransactionResultPresenter } from '../transactions/ITransactionResultPresenter';
import { TransactionQueue } from '../transactions/TransactionQueue';
import { FollowPolicyConfig } from './types';

export type CreateProfileRequest = {
  handle: string;
  kind: TransactionKind.CREATE_PROFILE;
  followPolicy?: FollowPolicyConfig;
  profileImage?: Url;
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
  ): PromiseResult<NativeTransaction<T>, BroadcastingError | DuplicatedHandleError>;
}

export type ICreateProfilePresenter = ITransactionResultPresenter<
  CreateProfileRequest,
  BroadcastingError | DuplicatedHandleError
>;

export class CreateProfile {
  constructor(
    private readonly transactionFactory: IProfileTransactionGateway,
    private readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    private readonly presenter: ICreateProfilePresenter,
  ) {}

  async execute(request: CreateProfileRequest) {
    const transactionResult = await this.transactionFactory.createProfileTransaction(request);

    if (transactionResult.isFailure()) {
      this.presenter.present(transactionResult);
      return;
    }

    const transaction = transactionResult.value;

    await this.transactionQueue.push(transaction, this.presenter);
  }
}
