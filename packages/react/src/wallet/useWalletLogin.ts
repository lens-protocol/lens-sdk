import { Signer } from 'ethers';

import { useOperation } from '../helpers';
import { useWalletLoginController } from './adapters/useWalletLoginController';

export function useWalletLogin() {
  const loginWallet = useWalletLoginController();

  return useOperation(async (signer: Signer) => {
    const address = await signer.getAddress();

    return loginWallet({
      address,
    });
  });
}
