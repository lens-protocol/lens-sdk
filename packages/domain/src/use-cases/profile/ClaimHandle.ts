import { PromiseResult } from '@lens-protocol/shared-kernel';

import { NativeTransaction, TransactionKind, AnyTransactionRequestModel } from '../../entities';
import { ITransactionResultPresenter } from '../transactions/ITransactionResultPresenter';
import { TransactionQueue } from '../transactions/TransactionQueue';
import { FollowPolicyConfig } from './types';

export type ClaimHandleRequest = {
  kind: TransactionKind.CLAIM_HANDLE;
  id: string;
  localName: string;
  followPolicy?: FollowPolicyConfig;
};

export class ClaimHandleError<TErrorReason extends string> extends Error {
  name = 'ClaimHandleError' as const;

  constructor(readonly localName: string, readonly reason: TErrorReason) {
    super(`Cannot claim"${localName}" because: ${reason}`);
  }
}

export interface IClaimHandleGateway<TErrorReason extends string> {
  claimHandleTransaction<T extends ClaimHandleRequest>(
    request: T,
  ): PromiseResult<NativeTransaction<T>, ClaimHandleError<TErrorReason>>;
}

export type IClaimHandlePresenter<TErrorReason extends string> = ITransactionResultPresenter<
  ClaimHandleRequest,
  ClaimHandleError<TErrorReason>
>;

export class ClaimHandle<TErrorReason extends string> {
  constructor(
    private readonly gateway: IClaimHandleGateway<TErrorReason>,
    private readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    private readonly presenter: IClaimHandlePresenter<TErrorReason>,
  ) {}

  async execute(request: ClaimHandleRequest) {
    const result = await this.gateway.claimHandleTransaction(request);

    if (result.isFailure()) {
      this.presenter.present(result);
      return;
    }

    const transaction = result.value;

    await this.transactionQueue.push(transaction, this.presenter);
  }
}
