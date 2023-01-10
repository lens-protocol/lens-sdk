import {
  WalletConnectionError,
  WalletConnectionErrorReason,
  UserRejectedError,
  PendingSigningRequestError,
} from '@lens-protocol/domain/entities';
import { IConnectionErrorPresenter } from '@lens-protocol/domain/use-cases/wallets';

import { ErrorHandler } from '../../ErrorHandler';
function isConnectionRequestCancelled(
  error: PendingSigningRequestError | UserRejectedError | WalletConnectionError,
) {
  return (
    error instanceof WalletConnectionError &&
    error.reason === WalletConnectionErrorReason.CONNECTION_REFUSED
  );
}

function isSigningRequestCancelled(
  error: PendingSigningRequestError | UserRejectedError | WalletConnectionError,
): error is UserRejectedError {
  return error instanceof UserRejectedError;
}

export class ConnectionErrorPresenter implements IConnectionErrorPresenter {
  constructor(
    private readonly errorHandler: ErrorHandler<
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >,
  ) {}

  presentConnectionError(
    error: PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  ): void {
    if (isSigningRequestCancelled(error) || isConnectionRequestCancelled(error)) {
      return;
    }
    this.errorHandler(error);
  }
}
