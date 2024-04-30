import {
  LensProfileManagerRelayError,
  LensProfileManagerRelayErrorReasonType,
  RelayError,
  RelayErrorReasonType,
} from '@lens-protocol/api-bindings';
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
import { failure, Failure, InvariantError } from '@lens-protocol/shared-kernel';

export function handleRelayError(
  error: RelayError | LensProfileManagerRelayError,
  _?: unknown,
): Failure<BroadcastingError> {
  switch (error.reason) {
    case RelayErrorReasonType.AppNotAllowed:
    case LensProfileManagerRelayErrorReasonType.AppNotAllowed:
      return failure(new BroadcastingError(BroadcastingErrorReason.APP_NOT_ALLOWED));

    case RelayErrorReasonType.RateLimited:
    case LensProfileManagerRelayErrorReasonType.RateLimited:
      return failure(new BroadcastingError(BroadcastingErrorReason.RATE_LIMITED));

    case RelayErrorReasonType.NotSponsored:
    case LensProfileManagerRelayErrorReasonType.NotSponsored:
      return failure(new BroadcastingError(BroadcastingErrorReason.NOT_SPONSORED));

    case RelayErrorReasonType.Failed:
    case LensProfileManagerRelayErrorReasonType.Failed:
      return failure(new BroadcastingError(BroadcastingErrorReason.UNKNOWN));

    case LensProfileManagerRelayErrorReasonType.NoLensManagerEnabled:
      return failure(new BroadcastingError(BroadcastingErrorReason.NO_LENS_MANAGER_ENABLED));

    case LensProfileManagerRelayErrorReasonType.RequiresSignature:
      return failure(new BroadcastingError(BroadcastingErrorReason.REQUIRES_SIGNATURE));

    default:
      throw new InvariantError(`Unexpected relay error reason: ${error.reason}`);
  }
}
