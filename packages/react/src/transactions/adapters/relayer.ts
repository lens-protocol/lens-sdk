import { RelayError, RelayErrorReasons } from '@lens-protocol/api-bindings';
import { TransactionRequestModel } from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { failure, Failure, InvariantError } from '@lens-protocol/shared-kernel';

import { SelfFundedProtocolCallRequest } from './SelfFundedProtocolCallRequest';

export type RelayReceipt = {
  indexingId: string;
  txHash: string;
};

export function handleRelayError(
  error: RelayError,
  fallback?: SelfFundedProtocolCallRequest<TransactionRequestModel>,
): Failure<never, BroadcastingError> {
  switch (error.reason) {
    case RelayErrorReasons.NotAllowed:
    case RelayErrorReasons.Rejected:
      return failure(new BroadcastingError(error.reason, fallback));
    default:
      throw new InvariantError(`Unexpected relay error reason: ${error.reason}`);
  }
}
