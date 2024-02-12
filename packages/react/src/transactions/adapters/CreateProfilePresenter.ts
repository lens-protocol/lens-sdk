import { Profile } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  ICreateProfilePresenter,
} from '@lens-protocol/domain/use-cases/profile';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import {
  Deferred,
  Failure,
  Result,
  failure,
  invariant,
  success,
} from '@lens-protocol/shared-kernel';

import { ProfileHandleResolver } from '../../environments';
import { IProfileCacheManager } from '../../profile/adapters/IProfileCacheManager';
import { AsyncTransactionResult } from './AsyncTransactionResult';

type EarlyFailureError =
  | PendingSigningRequestError
  | InsufficientGasError
  | UserRejectedError
  | WalletConnectionError;

export class CreateProfilePresenter implements ICreateProfilePresenter {
  private deferredResult = new Deferred<Result<Profile, TransactionError>>();

  private earlyFailure: Failure<EarlyFailureError> | null = null;

  constructor(
    private readonly profileCacheManager: IProfileCacheManager,
    private readonly fullHandleResolver: ProfileHandleResolver,
  ) {}

  async present(
    result: Result<TransactionData<CreateProfileRequest>, EarlyFailureError | TransactionError>,
  ) {
    if (result.isFailure()) {
      if (!(result.error instanceof TransactionError)) {
        this.earlyFailure = failure(result.error);
        return;
      }

      this.deferredResult.resolve(failure(result.error));
      return;
    }

    const profile = await this.profileCacheManager.fetchProfileByHandle(
      this.fullHandleResolver(result.value.request.localName),
    );

    invariant(profile, 'Profile not found');

    this.deferredResult.resolve(success(profile));
  }

  asResult(): Result<AsyncTransactionResult<Profile>, EarlyFailureError> {
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
