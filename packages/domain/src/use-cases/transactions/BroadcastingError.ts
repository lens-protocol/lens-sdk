import { TransactionRequestModel } from '../../entities';

export type RequestFallback = TransactionRequestModel;

/**
 * An error thrown when the Lens API refuses to relay a transaction.
 */
export class BroadcastingError extends Error {
  name = 'BroadcastingError' as const;

  /**
   * @internal
   */
  constructor(reason: string, readonly fallback?: RequestFallback) {
    super(`broadcasting failed with reason: ${reason}`);
  }
}
