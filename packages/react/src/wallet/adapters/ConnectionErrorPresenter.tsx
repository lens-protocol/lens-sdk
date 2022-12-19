import { makeVar, useReactiveVar } from '@apollo/client';
import {
  WalletConnectionError,
  WalletConnectionErrorReason,
  UserRejectedError,
  PendingSigningRequestError,
} from '@lens-protocol/domain/entities';
import { IConnectionErrorPresenter } from '@lens-protocol/domain/use-cases/wallets';

const connectionErrorVar = makeVar<
  PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
>(null);

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
  presentConnectionError(
    error: PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  ): void {
    if (isSigningRequestCancelled(error) || isConnectionRequestCancelled(error)) {
      return;
    }
    connectionErrorVar(error);
  }
}

export function useConnectionError() {
  return useReactiveVar(connectionErrorVar);
}
