import { WalletType } from '@lens-protocol/domain/entities';
import { providers } from 'ethers';

import { useWalletLoginController } from './adapters/useWalletLoginController';

export function useWalletLogin() {
  const login = useWalletLoginController();

  return (signer: providers.JsonRpcSigner, walletType: WalletType = WalletType.UNSPECIFIED) => {
    void signer.getAddress().then((address) => {
      login({
        address,
        type: walletType,
      });
    });
  };
}
