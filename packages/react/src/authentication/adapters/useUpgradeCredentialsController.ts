import {
  UpgradeCredentials,
  UpgradeCredentialsRequest,
} from '@lens-protocol/domain/use-cases/authentication';

import { useSharedDependencies } from '../../shared';
import { CredentialsUpgrader } from './CredentialsUpgrader';
import { UpgradeCredentialsPresenter } from './UpgradeCredentialsPresenter';

export function useUpgradeCredentialsController() {
  const { apolloClient, credentialsGateway, profileCacheManager } = useSharedDependencies();

  return async (request: UpgradeCredentialsRequest) => {
    const presenter = new UpgradeCredentialsPresenter(profileCacheManager);
    const credentialsUpgrader = new CredentialsUpgrader(apolloClient);
    const upgrade = new UpgradeCredentials(credentialsUpgrader, credentialsGateway, presenter);

    await upgrade.execute(request);

    return presenter.asResult();
  };
}
