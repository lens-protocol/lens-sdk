import { CreateProfile, CreateProfileRequest } from '@lens-protocol/domain/use-cases/profile';

import { useSharedDependencies } from '../../shared';
import { CreateProfilePresenter } from './CreateProfilePresenter';
import { ProfileTransactionGateway } from './ProfileTransactionGateway';

export function useCreateProfileController() {
  const { apolloClient, profileCacheManager, transactionFactory, transactionQueue } =
    useSharedDependencies();

  return async (request: CreateProfileRequest) => {
    const presenter = new CreateProfilePresenter(profileCacheManager);
    const gateway = new ProfileTransactionGateway(apolloClient, transactionFactory);
    const createProfile = new CreateProfile(gateway, transactionQueue, presenter);

    await createProfile.execute(request);

    return presenter.asResult();
  };
}
