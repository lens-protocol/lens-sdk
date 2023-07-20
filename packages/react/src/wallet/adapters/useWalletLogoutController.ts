import { LogoutReason, WalletLogout } from '@lens-protocol/domain/use-cases/wallets';
import { PromiseResult, success } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';

export function useWalletLogoutController() {
  const {
    activeWallet,
    activeProfileGateway,
    credentialsGateway,
    sessionPresenter,
    walletGateway,
  } = useSharedDependencies();

  return async (reason: LogoutReason): PromiseResult<void, never> => {
    const walletLogout = new WalletLogout(
      walletGateway,
      credentialsGateway,
      activeWallet,
      activeProfileGateway,
      sessionPresenter,
    );

    await walletLogout.logout(reason);

    return success();
  };
}
