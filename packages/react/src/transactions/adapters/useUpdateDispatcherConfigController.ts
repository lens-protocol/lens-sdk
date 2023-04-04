import {
  TransactionKind,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateDispatcherConfig,
  UpdateDispatcherConfigRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { DispatcherConfigCallGateway } from './DispatcherConfigCallGateway';
import { PromiseResultPresenter } from './PromiseResultPresenter';

export function useUpdateDispatcherConfigController() {
  const { activeWallet, transactionGateway, protocolCallRelayer, transactionQueue, apolloClient } =
    useSharedDependencies();

  return async (request: Omit<UpdateDispatcherConfigRequest, 'kind'>) => {
    const presenter = new PromiseResultPresenter<
      void,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const gateway = new DispatcherConfigCallGateway(apolloClient);
    const updateDispatcherConfig = new UpdateDispatcherConfig(
      activeWallet,
      transactionGateway,
      gateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );

    await updateDispatcherConfig.execute({
      ...request,
      kind: TransactionKind.UPDATE_DISPATCHER_CONFIG,
    });

    return presenter.asResult();
  };
}
