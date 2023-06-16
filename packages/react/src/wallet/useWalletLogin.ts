import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { WalletLoginResult } from '@lens-protocol/domain/use-cases/wallets';
import { EthereumAddress } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useWalletLoginController } from './adapters/useWalletLoginController';

export type WalletLoginOperation = Operation<
  WalletLoginResult,
  PendingSigningRequestError | WalletConnectionError | UserRejectedError,
  [string, string?]
>;

/**
 * @category Wallet
 * @group Hooks
 */
export function useWalletLogin(): WalletLoginOperation {
  const loginWallet = useWalletLoginController();

  return useOperation(async (connectedWalletAddress: EthereumAddress, handle?: string) => {
    return loginWallet({
      address: connectedWalletAddress,
      handle,
    });
  });
}
