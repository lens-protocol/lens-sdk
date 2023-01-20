import { Bootstrap } from '@lens-protocol/domain/use-cases/lifecycle';
import { ActiveProfileLoader } from '@lens-protocol/domain/use-cases/profile';
import { useCallback } from 'react';

import { SharedDependencies } from '../../shared';
import { ActiveWalletPresenter } from '../../wallet/adapters/ActiveWalletPresenter';
import { ApplicationPresenter } from './ApplicationPresenter';

export function useBootstrapController({
  activeProfileGateway,
  activeProfilePresenter,
  activeWallet,
  credentialsFactory,
  credentialsGateway,
  logoutPresenter,
  profileGateway,
  transactionQueue,
}: SharedDependencies) {
  return useCallback(() => {
    const activeWalletPresenter = new ActiveWalletPresenter();
    const applicationPresenter = new ApplicationPresenter();
    const activeProfileLoader = new ActiveProfileLoader(
      profileGateway,
      activeProfileGateway,
      activeProfilePresenter,
    );
    const bootstrap = new Bootstrap(
      activeWallet,
      credentialsGateway,
      credentialsFactory,
      activeWalletPresenter,
      applicationPresenter,
      logoutPresenter,
      activeProfileLoader,
      transactionQueue,
    );

    void bootstrap.start();
  }, [
    activeProfileGateway,
    activeProfilePresenter,
    activeWallet,
    credentialsFactory,
    credentialsGateway,
    logoutPresenter,
    profileGateway,
    transactionQueue,
  ]);
}
