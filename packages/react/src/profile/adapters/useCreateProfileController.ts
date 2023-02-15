import { TransactionKind } from '@lens-protocol/domain/entities';
import { CreateProfile, DuplicatedHandleError } from '@lens-protocol/domain/use-cases/profile';

import { ProfileTransactionGateway } from './ProfileTransactionGateway';
import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';

export function useCreateProfileController() {
  const { apolloClient, transactionFactory, transactionQueue } = useSharedDependencies();

  return async (handle: string) => {
    const presenter = new PromiseResultPresenter<void, DuplicatedHandleError>();
    const gateway = new ProfileTransactionGateway(apolloClient, transactionFactory);
    const createProfile = new CreateProfile(gateway, presenter, transactionQueue);

    await createProfile.create({
      handle,
      kind: TransactionKind.CREATE_PROFILE,
    });

    return presenter.asResult();
  };
}
