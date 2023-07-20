import { Bootstrap } from '@lens-protocol/domain/use-cases/lifecycle';
import { ActiveProfileLoader } from '@lens-protocol/domain/use-cases/profile';
import { WalletLogout } from '@lens-protocol/domain/use-cases/wallets';

import { SharedDependencies } from '../../shared';

export function useBootstrapController({
  activeProfileGateway,
  activeWallet,
  credentialsFactory,
  credentialsGateway,
  profileGateway,
  sessionPresenter,
  transactionQueue,
  walletGateway,
}: SharedDependencies) {
  return function () {
    const activeProfileLoader = new ActiveProfileLoader(profileGateway, activeProfileGateway);
    const walletLogout = new WalletLogout(
      walletGateway,
      credentialsGateway,
      activeWallet,
      activeProfileGateway,
      sessionPresenter,
    );
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
