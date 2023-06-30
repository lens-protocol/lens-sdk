import { ActiveProfileLoader } from '@lens-protocol/domain/use-cases/profile';
import { WalletLogin, WalletLoginRequest } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { WalletLoginPresenter } from './WalletLoginPresenter';

export function useWalletLoginController() {
  const {
    activeProfileGateway,
    credentialsFactory,
    credentialsGateway,
    profileCacheManager,
    profileGateway,
    sessionPresenter,
    walletFactory,
    walletGateway,
  } = useSharedDependencies();

  return async (request: WalletLoginRequest) => {
    const loginPresenter = new WalletLoginPresenter(profileCacheManager);
    const activeProfileLoader = new ActiveProfileLoader(profileGateway, activeProfileGateway);
    const walletLogin = new WalletLogin(
      walletFactory,
      walletGateway,
      credentialsFactory,
      credentialsGateway,
      loginPresenter,
      activeProfileLoader,
      sessionPresenter,
    );

    await walletLogin.login(request);

    return loginPresenter.asResult();
  };
}
