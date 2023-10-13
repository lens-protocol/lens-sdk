import {
  LensProfileManagerRelayError,
  RelayError,
  RelayErrorReasonType,
} from '@lens-protocol/api-bindings';
import {
  BroadcastingError,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { failure, Failure, InvariantError } from '@lens-protocol/shared-kernel';

import { SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

export type OffChainBroadcastReceipt = {
  id: string;
};

export function handleRelayError(
  error: RelayError | LensProfileManagerRelayError,
  fallback?: SelfFundedProtocolTransactionRequest<ProtocolTransactionRequest>,
): Failure<BroadcastingError> {
  switch (error.reason) {
    case RelayErrorReasonType.AppGaslessNotAllowed:
    case RelayErrorReasonType.Failed:
    case RelayErrorReasonType.RateLimited:
      return failure(new BroadcastingError(error.reason, fallback));
    default:
      throw new InvariantError(`Unexpected relay error reason: ${error.reason}`);
  }
}
