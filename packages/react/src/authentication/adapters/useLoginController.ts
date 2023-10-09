import { Login, LoginRequest } from '@lens-protocol/domain/use-cases/authentication';

import { useSharedDependencies } from '../../shared';
import { LoginPresenter } from './LoginPresenter';

export function useLoginController() {
  const {
    credentialsFactory,
    credentialsGateway,
    profileCacheManager,
    walletFactory,
    walletGateway,
  } = useSharedDependencies();

  return async (request: LoginRequest) => {
    const presenter = new LoginPresenter(profileCacheManager);
    const login = new Login(
      walletFactory,
      walletGateway,
      credentialsFactory,
      credentialsGateway,
      presenter,
    );

    await login.execute(request);

    return presenter.asResult();
  };
}
