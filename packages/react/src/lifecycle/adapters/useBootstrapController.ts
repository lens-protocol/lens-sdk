import { Bootstrap } from '@lens-protocol/domain/use-cases/lifecycle';
import { useCallback } from 'react';

import { SharedDependencies } from '../../shared';
import { ActiveWalletPresenter } from '../../wallet/adapters/ActiveWalletPresenter';
import { ApplicationPresenter } from './ApplicationPresenter';

export function useBootstrapController({
  activeWallet,
  activeProfile,
  credentialsFactory,
  credentialsGateway,
  logoutPresenter,
  transactionQueue,
}: SharedDependencies) {
  return useCallback(() => {
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
      transactionQueue,
    );

    void bootstrap.start();
  }, [
    activeWallet,
    activeProfile,
    credentialsFactory,
    credentialsGateway,
    logoutPresenter,
    transactionQueue,
  ]);
}
