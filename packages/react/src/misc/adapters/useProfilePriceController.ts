import { UnspecifiedError } from '@lens-protocol/api-bindings';
import { GetProfilePrice, ProfilePrices } from '@lens-protocol/domain/use-cases/profile';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { ProfilePriceGateway } from './ProfilePriceGateway';

export type ProfilePriceResult = ProfilePrices;

export function useProfilePriceController() {
  const { config, providerFactory } = useSharedDependencies();

  return async (): PromiseResult<ProfilePriceResult, UnspecifiedError> => {
    const presenter = new PromiseResultPresenter<ProfilePriceResult, never>();
    const gateway = new ProfilePriceGateway(config, providerFactory);
    const profilePrice = new GetProfilePrice(gateway, presenter);

    void profilePrice.execute();

    return presenter.asResult();
  };
}
