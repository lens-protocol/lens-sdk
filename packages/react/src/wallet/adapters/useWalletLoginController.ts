import { WalletLogin, WalletLoginRequest } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { ActiveWalletPresenter } from './ActiveWalletPresenter';
import { ConnectionErrorPresenter } from './ConnectionErrorPresenter';

export function useWalletLoginController() {
  const { activeProfile, credentialsFactory, credentialsGateway, walletFactory, walletGateway } =
    useSharedDependencies();

  return (request: WalletLoginRequest) => {
    const activeWalletPresenter = new ActiveWalletPresenter();
    const connectionErrorPresenter = new ConnectionErrorPresenter();
    const walletLogin = new WalletLogin(
      walletFactory,
      walletGateway,
      credentialsFactory,
      credentialsGateway,
      activeWalletPresenter,
      connectionErrorPresenter,
      activeProfile,
    );

    void walletLogin.login(request);
  };
}
