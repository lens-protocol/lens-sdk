import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateProfileManagers,
  UpdateProfileManagersRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  PaidTransaction,
  SignedOnChain,
} from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UpdateProfileManagersGateway } from './profiles/UpdateProfileManagersGateway';
import { validateUpdateProfileManagersRequest } from './schemas/validators';

export function useUpdateProfileManagersController() {
  const {
    activeWallet,
    apolloClient,
    config,
    onChainRelayer,
    providerFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (
    request: UpdateProfileManagersRequest,
  ): PromiseResult<
    void,
    | BroadcastingError
    | InsufficientGasError
    | PendingSigningRequestError
    | TransactionError
    | UserRejectedError
    | WalletConnectionError
  > => {
    validateUpdateProfileManagersRequest(request);

    const presenter = new TransactionResultPresenter<
      UpdateProfileManagersRequest,
      | BroadcastingError
      | InsufficientGasError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();
    const gateway = new UpdateProfileManagersGateway(config, providerFactory, apolloClient);

    const paidExecution = new PaidTransaction<UpdateProfileManagersRequest>(
      activeWallet,
      gateway,
      presenter,
      transactionQueue,
    );

    const sponsoredExecution = new SignedOnChain<UpdateProfileManagersRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const updateProfileManagers = new UpdateProfileManagers(sponsoredExecution, paidExecution);

    await updateProfileManagers.execute(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }
    return result;
  };
}
