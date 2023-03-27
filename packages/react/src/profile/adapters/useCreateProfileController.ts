import {
  CreateProfile,
  CreateProfileRequest,
  DuplicatedHandleError,
} from '@lens-protocol/domain/use-cases/profile';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { ProfileTransactionGateway } from './ProfileTransactionGateway';

export function useCreateProfileController() {
  const { apolloClient, transactionFactory, transactionQueue } = useSharedDependencies();

  return async (request: CreateProfileRequest) => {
    const presenter = new PromiseResultPresenter<void, DuplicatedHandleError>();
    const gateway = new ProfileTransactionGateway(apolloClient, transactionFactory);
    const createProfile = new CreateProfile(gateway, presenter, transactionQueue);

    await createProfile.create(request);

    return presenter.asResult();
  };
}
