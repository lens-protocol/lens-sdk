import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ActiveProfileLoader } from '@lens-protocol/domain/use-cases/profile';
import {
  WalletLogin,
  WalletLoginRequest,
  WalletLoginResult,
} from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';

export function useWalletLoginController() {
  const {
    activeProfileGateway,
    credentialsFactory,
    credentialsGateway,
    profileGateway,
    sessionPresenter,
    walletFactory,
    walletGateway,
  } = useSharedDependencies();

  return async (request: WalletLoginRequest) => {
    const loginPresenter = new PromiseResultPresenter<
      WalletLoginResult,
      PendingSigningRequestError | WalletConnectionError | UserRejectedError
    >();
    const activeProfileLoader = new ActiveProfileLoader(profileGateway, activeProfileGateway);
    const walletLogin = new WalletLogin(
      walletFactory,
      walletGateway,
      credentialsFactory,
      credentialsGateway,
      loginPresenter,
      activeProfileLoader,
      sessionPresenter,
    );

    await walletLogin.login(request);

    return loginPresenter.asResult();
  };
}
