import {
  ClaimProfileWithHandleErrorReasonType,
  ClaimProfileWithHandleErrorResult,
  LensProfileManagerRelayError,
  LensProfileManagerRelayErrorReasonType,
  RelayError,
  RelayErrorReasonType,
} from '@lens-protocol/api-bindings';
import {
  BroadcastingError,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { failure, Failure, InvariantError } from '@lens-protocol/shared-kernel';

import { SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

export function handleRelayError(
  error: RelayError | LensProfileManagerRelayError | ClaimProfileWithHandleErrorResult,
  fallback?: SelfFundedProtocolTransactionRequest<ProtocolTransactionRequest>,
): Failure<BroadcastingError> {
  switch (error.reason) {
    case RelayErrorReasonType.AppNotAllowed:
    case LensProfileManagerRelayErrorReasonType.AppNotAllowed:
    case RelayErrorReasonType.Failed:
    case LensProfileManagerRelayErrorReasonType.Failed:
    case RelayErrorReasonType.RateLimited:
    case LensProfileManagerRelayErrorReasonType.RateLimited:
    case RelayErrorReasonType.NotSponsored:
    case LensProfileManagerRelayErrorReasonType.NotSponsored:
    case LensProfileManagerRelayErrorReasonType.NoLensManagerEnabled:
    case ClaimProfileWithHandleErrorReasonType.CanNotFreeText:
    case ClaimProfileWithHandleErrorReasonType.ClaimNotFound:
    case ClaimProfileWithHandleErrorReasonType.ClaimNotLinkedToWallet:
    case ClaimProfileWithHandleErrorReasonType.ClaimTimeExpired:
    case ClaimProfileWithHandleErrorReasonType.ContractExecuted:
      return failure(new BroadcastingError(error.reason, fallback));
    default:
      throw new InvariantError(`Unexpected relay error reason: ${error.reason}`);
  }
}
