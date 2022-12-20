import { WalletType } from '@lens-protocol/domain/entities';
import { Signer } from 'ethers';

import { useWalletLoginController } from './adapters/useWalletLoginController';

export function useWalletLogin() {
  const login = useWalletLoginController();

  return (signer: Signer, walletType: WalletType = WalletType.UNSPECIFIED) => {
    void signer.getAddress().then((address) => {
      login({
        address,
        type: walletType,
      });
    });
  };
}
