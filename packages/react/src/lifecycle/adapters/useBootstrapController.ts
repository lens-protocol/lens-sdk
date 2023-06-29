import { Bootstrap } from '@lens-protocol/domain/use-cases/lifecycle';
import { ActiveProfileLoader } from '@lens-protocol/domain/use-cases/profile';
import { useCallback } from 'react';

import { SharedDependencies } from '../../shared';

export function useBootstrapController({
  activeProfileGateway,
  activeWallet,
  credentialsFactory,
  credentialsGateway,
  profileGateway,
  sessionPresenter,
  transactionQueue,
}: SharedDependencies) {
  return useCallback(() => {
    const activeProfileLoader = new ActiveProfileLoader(profileGateway, activeProfileGateway);
    const bootstrap = new Bootstrap(
      activeWallet,
      credentialsGateway,
      credentialsFactory,
      activeProfileLoader,
      transactionQueue,
      sessionPresenter,
    );

    void bootstrap.execute();
  }, [
    activeProfileGateway,
    activeWallet,
    credentialsFactory,
    credentialsGateway,
    profileGateway,
    sessionPresenter,
    transactionQueue,
  ]);
}
