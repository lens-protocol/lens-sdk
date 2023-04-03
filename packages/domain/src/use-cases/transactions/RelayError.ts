export enum RelayErrorReason {
  /**
   * The gas-less broadcasting of the tx was rejected, probably due to reaching a quota limit
   */
  REJECTED = 'REJECTED',
  /**
   * A not recognized failure
   */
  UNSPECIFIED = 'UNSPECIFIED',
}

/**
 * An error that can be thrown by the relay of a transaction fails
 */
export class RelayError extends Error {
  name = 'RelayError' as const;

  constructor(readonly reason: RelayErrorReason) {
    super(`Relay failed due to: ${reason}`);
  }
}
