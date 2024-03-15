import {
  GetProfilePrices,
  ProfilePrices,
  ReadPriceError,
} from '@lens-protocol/domain/use-cases/profile';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { ProfilePricesGateway } from './ProfilePricesGateway';

export function useProfilePricesController() {
  const { config, providerFactory } = useSharedDependencies();

  return async (): PromiseResult<ProfilePrices, ReadPriceError> => {
    const presenter = new PromiseResultPresenter<ProfilePrices, ReadPriceError>();
    const gateway = new ProfilePricesGateway(config, providerFactory);
    const profilePrices = new GetProfilePrices(gateway, presenter);

    void profilePrices.execute();

    return presenter.asResult();
  };
}
