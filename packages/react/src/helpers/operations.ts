import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
import { IEquatableError, PromiseResult } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

export type OperationHandler<
  TResult,
  TError extends IEquatableError,
  TArgs extends unknown[] = never,
> = (...args: TArgs) => PromiseResult<TResult, TError>;

/**
 * An operation is a function that can be executed multiple times and that can be in a pending state.
 *
 * It also provides a way to access the last error that occurred during the execution of the operation.
 */
export type Operation<
  TResult,
  TError extends IEquatableError = never,
  TArgs extends unknown[] = [],
> = {
  error: TError | undefined;
  execute: (...args: TArgs) => PromiseResult<TResult, TError>;
  isPending: boolean;
};

export function useOperation<TResult, TError extends IEquatableError, TArgs extends unknown[]>(
  handler: OperationHandler<TResult, TError, TArgs>,
): Operation<TResult, TError, TArgs> {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<TError | undefined>(undefined);

  return {
    error,
    execute: async (...args: TArgs) => {
      setError(undefined);
      setIsPending(true);

      try {
        const result = await handler(...args);

        if (result.isFailure()) {
          setError(result.error);
        }

        return result;
      } finally {
        setIsPending(false);
      }
    },
    isPending,
  };
}

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

export class RetryableBroadcastingError extends BroadcastingError implements ISelfFundedFallback {
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
