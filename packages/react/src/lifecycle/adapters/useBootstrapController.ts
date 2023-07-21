import { Bootstrap } from '@lens-protocol/domain/use-cases/lifecycle';
import { ActiveProfileLoader } from '@lens-protocol/domain/use-cases/profile';

import { SharedDependencies } from '../../shared';

export function useBootstrapController({
  activeProfileGateway,
  activeWallet,
  credentialsFactory,
  credentialsGateway,
  profileGateway,
  sessionPresenter,
  transactionQueue,
  walletLogout,
}: SharedDependencies) {
  return function () {
    const activeProfileLoader = new ActiveProfileLoader(profileGateway, activeProfileGateway);

    const bootstrap = new Bootstrap(
      activeWallet,
      credentialsGateway,
      credentialsFactory,
      activeProfileLoader,
      transactionQueue,
      sessionPresenter,
      walletLogout,
    );

    void bootstrap.execute();
  };
}
