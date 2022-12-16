import { WalletLogin, WalletLoginRequest } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { AuthApi } from '../infrastructure/AuthApi';
import { ActiveWalletPresenter } from './ActiveWalletPresenter';
import { ConnectionErrorPresenter } from './ConnectionErrorPresenter';
import { CredentialsFactory } from './CredentialsFactory';

export function useWalletLoginController() {
  const { activeProfile, apolloClient, credentialsGateway, walletFactory, walletGateway } =
    useSharedDependencies();

  return (request: WalletLoginRequest) => {
    const authApi = new AuthApi(apolloClient);
    const credentialsFactory = new CredentialsFactory(authApi);
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
