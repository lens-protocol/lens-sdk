import {
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateProfileManagers,
  UpdateProfileManagersRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UpdateProfileManagersCallGateway } from './UpdateProfileManagersCallGateway';
import { validateUpdateProfileManagersRequest } from './schemas/validators';

export function useUpdateProfileManagersController() {
  const { activeWallet, apolloClient, onChainRelayer, transactionGateway, transactionQueue } =
    useSharedDependencies();

  return async (
    request: UpdateProfileManagersRequest,
  ): PromiseResult<
    void,
    | BroadcastingError
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | TransactionError
  > => {
    validateUpdateProfileManagersRequest(request);

    const presenter = new TransactionResultPresenter<
      UpdateProfileManagersRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const gateway = new UpdateProfileManagersCallGateway(apolloClient);

    const updateProfileManagers = new UpdateProfileManagers(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    await updateProfileManagers.execute(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }
    return result;
  };
}
