import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { Signer } from 'ethers';

import { useWalletLoginController } from './adapters/useWalletLoginController';
import { Operation, useOperation } from '../helpers';

export type WalletLoginOperation = Operation<
  void,
  PendingSigningRequestError | WalletConnectionError | UserRejectedError,
  [Signer]
>;

export function useWalletLogin(): WalletLoginOperation {
  const loginWallet = useWalletLoginController();

  return useOperation(async (signer: Signer) => {
    const address = await signer.getAddress();

    return loginWallet({
      address,
    });
  });
}
