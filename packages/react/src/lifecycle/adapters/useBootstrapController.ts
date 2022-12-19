import { Bootstrap } from '@lens-protocol/domain/use-cases/lifecycle';

import { SharedDependencies } from '../../shared';
import { ActiveWalletPresenter } from '../../wallet/adapters/ActiveWalletPresenter';
import { ApplicationPresenter } from './ApplicationPresenter';

export function useBootstrapController({
  activeWallet,
  activeProfile,
  credentialsFactory,
  credentialsGateway,
  logoutPresenter,
}: SharedDependencies) {
  return () => {
    const activeWalletPresenter = new ActiveWalletPresenter();
    const applicationPresenter = new ApplicationPresenter();
    const bootstrap = new Bootstrap(
      activeWallet,
      credentialsGateway,
      credentialsFactory,
      activeWalletPresenter,
      applicationPresenter,
      logoutPresenter,
      activeProfile,
    );

    void bootstrap.start();
  };
}
