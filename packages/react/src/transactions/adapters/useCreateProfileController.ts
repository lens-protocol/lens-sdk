import { Profile } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreateProfile, CreateProfileRequest } from '@lens-protocol/domain/use-cases/profile';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { CreateProfilePresenter } from './CreateProfilePresenter';
import { CreateProfileTransactionGateway } from './CreateProfileTransactionGateway';

export function useCreateProfileController() {
  const {
    apolloClient,
    config,
    profileCacheManager,
    providerFactory,
    transactionQueue,
    walletGateway,
  } = useSharedDependencies();

  return async (
    request: CreateProfileRequest,
  ): PromiseResult<
    Profile,
    | PendingSigningRequestError
    | InsufficientGasError
    | UserRejectedError
    | WalletConnectionError
    | TransactionError
  > => {
    const gateway = new CreateProfileTransactionGateway(apolloClient, config, providerFactory);
    const presenter = new CreateProfilePresenter(
      profileCacheManager,
      config.environment.handleResolver,
    );

    const createProfile = new CreateProfile(walletGateway, gateway, presenter, transactionQueue);

    await createProfile.execute(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }
    return result;
  };
}
