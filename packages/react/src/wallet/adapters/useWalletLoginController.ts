import { ActiveProfileLoader } from '@lens-protocol/domain/use-cases/profile';
import { WalletLogin, WalletLoginRequest } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { ActiveWalletPresenter } from './ActiveWalletPresenter';
import { ConnectionErrorPresenter } from './ConnectionErrorPresenter';

export function useWalletLoginController() {
  const {
    activeProfileGateway,
    activeProfilePresenter,
    credentialsFactory,
    credentialsGateway,
    onError,
    profileGateway,
    walletFactory,
    walletGateway,
  } = useSharedDependencies();

  return (request: WalletLoginRequest) => {
    const activeWalletPresenter = new ActiveWalletPresenter();
    const connectionErrorPresenter = new ConnectionErrorPresenter(onError);
    const activeProfileLoader = new ActiveProfileLoader(
      profileGateway,
      activeProfileGateway,
      activeProfilePresenter,
    );
    const walletLogin = new WalletLogin(
      walletFactory,
      walletGateway,
      credentialsFactory,
      credentialsGateway,
      activeWalletPresenter,
      connectionErrorPresenter,
      activeProfileLoader,
    );

    void walletLogin.login(request);
  };
}
