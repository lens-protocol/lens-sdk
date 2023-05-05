import { RelayError, RelayErrorReasons } from '@lens-protocol/api-bindings';
import {
  BroadcastingError,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { failure, Failure, InvariantError } from '@lens-protocol/shared-kernel';

import { SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

export type OnChainBroadcastReceipt = {
  indexingId: string;
  txHash: string;
};

export type OffChainBroadcastReceipt = {
  id: string;
};

export function handleRelayError(
  error: RelayError,
  fallback?: SelfFundedProtocolTransactionRequest<ProtocolTransactionRequest>,
): Failure<never, BroadcastingError> {
  switch (error.reason) {
    case RelayErrorReasons.NotAllowed:
    case RelayErrorReasons.Rejected:
      return failure(new BroadcastingError(error.reason, fallback));
    default:
      throw new InvariantError(`Unexpected relay error reason: ${error.reason}`);
  }
}
