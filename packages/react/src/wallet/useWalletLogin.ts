import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { WalletLoginResult } from '@lens-protocol/domain/use-cases/wallets';
import { Signer } from 'ethers';

import { Operation, useOperation } from '../helpers/operations';
import { useWalletLoginController } from './adapters/useWalletLoginController';

export type WalletLoginOperation = Operation<
  WalletLoginResult,
  PendingSigningRequestError | WalletConnectionError | UserRejectedError,
  [Signer, string?]
>;

/**
 * @category Wallet
 * @group Hooks
 */
export function useWalletLogin(): WalletLoginOperation {
  const loginWallet = useWalletLoginController();

  return useOperation(async (signer: Signer, handle?: string) => {
    const address = await signer.getAddress();

    return loginWallet({
      address,
      handle,
    });
  });
}
