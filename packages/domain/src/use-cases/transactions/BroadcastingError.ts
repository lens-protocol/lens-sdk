export enum BroadcastingErrorReason {
  /**
   * The gas-less broadcasting of the tx was rejected, probably due to reaching a quota limit
   */
  REJECTED = 'REJECTED',
  /**
   * A not specified reason
   */
  UNSPECIFIED = 'UNSPECIFIED',
}

/**
 * An error thrown when the Lens API refuses to relay a transaction.
 */
export class BroadcastingError extends Error {
  name = 'BroadcastingError' as const;

  constructor(readonly reason: BroadcastingErrorReason) {
    super(`broadcasting failed with reason: ${reason}`);
  }
}
