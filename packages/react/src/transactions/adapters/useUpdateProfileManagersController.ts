import {
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/authentication';
import {
  UpdateProfileManagers,
  UpdateProfileManagersRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { OnChainRelayer } from './OnChainRelayer';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UpdateProfileManagersCallGateway } from './UpdateProfileManagersCallGateway';
import { validateUpdateProfileManagersRequest } from './schemas/validators';

export function useUpdateProfileManagersController() {
  const {
    apolloClient,
    credentialsGateway,
    logger,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    walletGateway,
  } = useSharedDependencies();

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
    const activeWallet = new ActiveWallet(credentialsGateway, walletGateway);
    const onChainRelayer = new OnChainRelayer(apolloClient, transactionFactory, logger);

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
