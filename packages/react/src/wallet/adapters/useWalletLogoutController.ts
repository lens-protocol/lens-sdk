import { LogoutReason, WalletLogout } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { ActiveWalletPresenter } from './ActiveWalletPresenter';
import { LogoutPresenter } from './LogoutPresenter';

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
