import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  BroadcastingError,
  BroadcastingErrorReason,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { failure, IEquatableError, PromiseResult } from '@lens-protocol/shared-kernel';

import { usePayTransactionController } from './usePayTransactionController';

/**
 *
 */
export interface ISelfFundedFallback {
  /**
   * Retry the operation using the logged-in wallet funds to pay for the transaction gas costs.
   */
  retrySelfFunded(): PromiseResult<
    void,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;
}

class RetryableBroadcastingError extends BroadcastingError implements ISelfFundedFallback {
  constructor(
    reason: BroadcastingErrorReason,
    public retrySelfFunded: ISelfFundedFallback['retrySelfFunded'],
  ) {
    super(reason);
  }
}

/**
 * Given a {@link BroadcastingError}, returns true if it implements the {@link ISelfFundedFallback} interface.
 *
 */
export function supportsSelfFundedRetry(
  error: BroadcastingError,
): error is BroadcastingError & ISelfFundedFallback {
  return error instanceof RetryableBroadcastingError;
}

export type SubsidizedTransactionHandler<
  TRequest extends SupportedTransactionRequest,
  TError extends IEquatableError,
> = (request: TRequest) => PromiseResult<void, TError>;

export type useSelfFundedTransactionFallbackResult<
  TRequest extends SupportedTransactionRequest,
  TError extends IEquatableError,
> = (request: TRequest) => PromiseResult<void, TError>;

export function useSelfFundedTransactionFallback<
  TRequest extends SupportedTransactionRequest,
  TError extends IEquatableError,
>(
  subsidize: SubsidizedTransactionHandler<TRequest, TError | BroadcastingError>,
): useSelfFundedTransactionFallbackResult<TRequest, TError | BroadcastingError> {
  const payTransaction = usePayTransactionController<TRequest>();

  return async (request: TRequest) => {
    const subsidizedResult = await subsidize(request);

    if (subsidizedResult.isFailure()) {
      if (subsidizedResult.error instanceof BroadcastingError && subsidizedResult.error.fallback) {
        const selfPaidRequest = {
          ...request,
          ...subsidizedResult.error.fallback,
        };

        return failure(
          new RetryableBroadcastingError(subsidizedResult.error.reason, async () =>
            payTransaction(selfPaidRequest),
          ),
        );
      }
    }

    return subsidizedResult;
  };
}
