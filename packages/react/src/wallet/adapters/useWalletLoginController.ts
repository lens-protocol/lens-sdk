import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ActiveProfileLoader } from '@lens-protocol/domain/use-cases/profile';
import { WalletLogin, WalletLoginRequest } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { ActiveWalletPresenter } from './ActiveWalletPresenter';

export function useWalletLoginController() {
  const {
    activeProfileGateway,
    activeProfilePresenter,
    credentialsFactory,
    credentialsGateway,
    profileGateway,
    walletFactory,
    walletGateway,
  } = useSharedDependencies();

  return async (request: WalletLoginRequest) => {
    const activeWalletPresenter = new ActiveWalletPresenter();
    const loginPresenter = new PromiseResultPresenter<
      void,
      PendingSigningRequestError | WalletConnectionError | UserRejectedError
    >();
    const activeProfileLoader = new ActiveProfileLoader(
      profileGateway,
      activeProfileGateway,
      activeProfilePresenter,
    );
    const walletLogin = new WalletLogin(
      walletFactory,
      walletGateway,
      credentialsFactory,
      credentialsGateway,
      activeWalletPresenter,
      loginPresenter,
      activeProfileLoader,
    );

    await walletLogin.login(request);

    return loginPresenter.asResult();
  };
}
