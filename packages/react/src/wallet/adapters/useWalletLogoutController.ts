import { LogoutReason, WalletLogout } from '@lens-protocol/domain/use-cases/wallets';

import { ActiveWalletPresenter } from './ActiveWalletPresenter';
import { LogoutPresenter } from './LogoutPresenter';
import { useSharedDependencies } from '../../shared';

export function useWalletLogoutController() {
  const {
    activeWallet,
    activeProfileGateway,
    activeProfilePresenter,
    credentialsGateway,
    onLogout,
    walletGateway,
  } = useSharedDependencies();

  return async (reason: LogoutReason) => {
    const activeWalletPresenter = new ActiveWalletPresenter();
    const logoutPresenter = new LogoutPresenter(onLogout);
    const walletLogout = new WalletLogout(
      walletGateway,
      credentialsGateway,
      activeWallet,
      activeProfileGateway,
      activeProfilePresenter,
      activeWalletPresenter,
      logoutPresenter,
    );

    await walletLogout.logout(reason);

    return logoutPresenter.asResult();
  };
}
