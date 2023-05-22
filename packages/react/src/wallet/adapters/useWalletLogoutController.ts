import { LogoutReason, WalletLogout } from '@lens-protocol/domain/use-cases/wallets';

import { DisableConversationsGateway } from '../../inbox/adapters/DisableConversationsGateway';
import { useSharedDependencies } from '../../shared';
import { ActiveWalletPresenter } from './ActiveWalletPresenter';
import { LogoutPresenter } from './LogoutPresenter';

export function useWalletLogoutController() {
  const {
    activeProfileGateway,
    activeProfilePresenter,
    activeWallet,
    credentialsGateway,
    inboxKeyStorage,
    onLogout,
    walletGateway,
  } = useSharedDependencies();

  return async (reason: LogoutReason) => {
    const activeWalletPresenter = new ActiveWalletPresenter();
    const logoutPresenter = new LogoutPresenter(onLogout);
    const conversationGateway = new DisableConversationsGateway(inboxKeyStorage);

    const walletLogout = new WalletLogout(
      walletGateway,
      credentialsGateway,
      activeWallet,
      activeProfileGateway,
      conversationGateway,
      activeProfilePresenter,
      activeWalletPresenter,
      logoutPresenter,
    );

    await walletLogout.logout(reason);

    return logoutPresenter.asResult();
  };
}
