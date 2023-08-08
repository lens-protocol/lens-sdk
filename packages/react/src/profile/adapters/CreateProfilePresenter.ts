import { Profile } from '@lens-protocol/api-bindings';
import { TransactionError } from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
  ICreateProfilePresenter,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import {
  Deferred,
  Failure,
  failure,
  PromiseResult,
  Result,
  success,
} from '@lens-protocol/shared-kernel';

import { IProfileCacheManager } from '../../transactions/adapters/IProfileCacheManager';

type AsyncTransactionResult<TValue> = {
  waitForCompletion(): PromiseResult<TValue, TransactionError>;
};

export type CreateProfileAsyncResult = AsyncTransactionResult<Profile>;

export class CreateProfilePresenter implements ICreateProfilePresenter {
  private deferred = new Deferred<Result<Profile, TransactionError>>();

  private failure: Failure<never, BroadcastingError | DuplicatedHandleError> | null = null;

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
        this.failure = failure(result.error);
        return;
      }

      this.deferred.resolve(failure(result.error));
      return;
    }
    const profile = await this.profileCacheManager.fetchNewProfile(result.value.request.handle);

    this.deferred.resolve(success(profile));
  }

  asResult(): Result<CreateProfileAsyncResult, BroadcastingError | DuplicatedHandleError> {
    if (this.failure) {
      return this.failure;
    }

    return success({
      waitForCompletion: async () => {
        return this.deferred.promise;
      },
    });
  }
}
