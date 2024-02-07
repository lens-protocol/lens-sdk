import { ClaimProfileWithHandleErrorReasonType, Profile } from '@lens-protocol/api-bindings';
import { TransactionError } from '@lens-protocol/domain/entities';
import {
  ClaimHandleError,
  ClaimHandleRequest,
  IClaimHandlePresenter,
  isClaimReservedHandleRequest,
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

type EarlyFailureError = ClaimHandleError<ClaimProfileWithHandleErrorReasonType>;

export class ClaimProfilePresenter
  implements IClaimHandlePresenter<ClaimProfileWithHandleErrorReasonType>
{
  private deferredResult = new Deferred<Result<Profile, TransactionError>>();

  private earlyFailure: Failure<EarlyFailureError> | null = null;

  constructor(
    private readonly profileCacheManager: IProfileCacheManager,
    private readonly fullHandleResolver: ProfileHandleResolver,
  ) {}

  async present(
    result: Result<TransactionData<ClaimHandleRequest>, EarlyFailureError | TransactionError>,
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
      isClaimReservedHandleRequest(result.value.request)
        ? result.value.request.handle
        : this.fullHandleResolver(result.value.request.localName),
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
