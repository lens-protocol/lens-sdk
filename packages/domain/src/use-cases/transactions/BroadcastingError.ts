import { EthereumAddress } from '@lens-protocol/shared-kernel';

import { Data } from './PayTransaction';

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

export type RequestFallback = {
  contractAddress: EthereumAddress;
  encodedData: Data;
};

/**
 * An error thrown when the Lens API refuses to relay a transaction.
 */
export class BroadcastingError extends Error {
  name = 'BroadcastingError' as const;

  /**
   * @internal
   */
  constructor(readonly reason: BroadcastingErrorReason, readonly fallback?: RequestFallback) {
    super(`broadcasting failed with reason: ${reason}`);
  }
}
