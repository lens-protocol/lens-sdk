import { AnyTransactionRequestModel, TransactionError } from '@lens-protocol/domain/entities';
import {
  ITransactionResultPresenter,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  Deferred,
  failure,
  Failure,
  IEquatableError,
  Result,
  success,
} from '@lens-protocol/shared-kernel';

import { AsyncTransactionResult } from './AsyncTransactionResult';

export class TransactionResultPresenter<
  TRequest extends AnyTransactionRequestModel,
  TError extends IEquatableError,
> implements ITransactionResultPresenter<TRequest, TError>
{
  private earlyFailure: Failure<TError> | null = null;

  private deferredResult = new Deferred<Result<void, TransactionError>>();

  present(result: Result<TransactionData<TRequest>, TError | TransactionError>): void {
    if (result.isFailure()) {
      if (result.error instanceof TransactionError) {
        this.deferredResult.resolve(failure(result.error));
        return;
      }
      this.earlyFailure = failure(result.error);
      return;
    }

    this.deferredResult.resolve(success());
  }

  asResult(): Result<AsyncTransactionResult<void>, TError> {
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
