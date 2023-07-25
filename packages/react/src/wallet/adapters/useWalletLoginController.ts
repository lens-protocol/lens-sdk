import { WalletLoginRequest } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { WalletLoginPresenter } from './WalletLoginPresenter';

export function useWalletLoginController() {
  const { profileCacheManager, walletLogin } = useSharedDependencies();

  return async (request: WalletLoginRequest) => {
    const loginPresenter = new WalletLoginPresenter(profileCacheManager);

    await walletLogin.login(request);

    return loginPresenter.asResult();
  };
}
