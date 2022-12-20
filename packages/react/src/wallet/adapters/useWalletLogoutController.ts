import { LogoutReason, WalletLogout } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { ActiveWalletPresenter } from './ActiveWalletPresenter';

export function useWalletLogoutController() {
  const {
    activeWallet,
    activeProfileGateway,
    activeProfilePresenter,
    credentialsGateway,
    logoutPresenter,
    walletGateway,
  } = useSharedDependencies();

  return (reason: LogoutReason) => {
    const activeWalletPresenter = new ActiveWalletPresenter();
    const walletLogout = new WalletLogout(
      walletGateway,
      credentialsGateway,
      activeWallet,
      activeProfileGateway,
      activeProfilePresenter,
      activeWalletPresenter,
      logoutPresenter,
    );

    void walletLogout.logout(reason);
  };
}
