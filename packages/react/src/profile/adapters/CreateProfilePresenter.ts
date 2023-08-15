import { Profile } from '@lens-protocol/api-bindings';
import { TransactionError } from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
  ICreateProfilePresenter,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { Deferred, Failure, failure, Result, success } from '@lens-protocol/shared-kernel';

import { AsyncTransactionResult } from '../../transactions/adapters/AsyncTransactionResult';
import { IProfileCacheManager } from '../../transactions/adapters/IProfileCacheManager';

export type CreateProfileAsyncResult = AsyncTransactionResult<Profile>;

export class CreateProfilePresenter implements ICreateProfilePresenter {
  private deferredResult = new Deferred<Result<Profile, TransactionError>>();

  private earlyFailure: Failure<never, BroadcastingError | DuplicatedHandleError> | null = null;

  constructor(
    private readonly profileCacheManager: IProfileCacheManager, // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

  async present(
    result: Result<
      TransactionData<CreateProfileRequest>,
      BroadcastingError | DuplicatedHandleError | TransactionError
    >,
  ) {
    if (result.isFailure()) {
      if (
        result.error instanceof BroadcastingError ||
        result.error instanceof DuplicatedHandleError
      ) {
        this.earlyFailure = failure(result.error);
        return;
      }

      this.deferredResult.resolve(failure(result.error));
      return;
    }
    const profile = await this.profileCacheManager.fetchNewProfile(result.value.request.handle);

    this.deferredResult.resolve(success(profile));
  }

  asResult(): Result<CreateProfileAsyncResult, BroadcastingError | DuplicatedHandleError> {
    if (this.earlyFailure) {
      return this.earlyFailure;
    }

    return success({
      waitForCompletion: async () => {
        return this.deferredResult.promise;
      },
    });
  }
}
