import { CausedError, IEquatableError } from '@lens-protocol/shared-kernel';

import { AnyTransactionRequestModel } from '../../entities';

export type RequestFallback = AnyTransactionRequestModel;

export enum BroadcastingErrorReason {
  /**
   * The app is not whitelisted to use gasless transactions.
   */
  APP_NOT_ALLOWED = 'APP_NOT_ALLOWED',
  /**
   * The profile is not sponsored for gasless transactions.
   */
  NOT_SPONSORED = 'NOT_SPONSORED',
  /**
   * The profile reached the rate limit for gasless transactions.
   */
  RATE_LIMITED = 'RATE_LIMITED',
  /**
   * The Lens Profile Manager is not enabled.
   */
  NO_LENS_MANAGER_ENABLED = 'NO_LENS_MANAGER_ENABLED',
  /**
   * The transaction requires a signature.
   */
  REQUIRES_SIGNATURE = 'REQUIRES_SIGNATURE',
  /**
   * A not recognized failure
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * An error thrown when the Lens API cannot relay a transaction.
 */
export class BroadcastingError extends CausedError implements IEquatableError {
  name = 'BroadcastingError' as const;

  constructor(readonly reason: BroadcastingErrorReason, { cause }: { cause?: Error } = {}) {
    const message = `failed to broadcast transaction due to: ${reason}`;
    super(message, { cause });
  }
}
