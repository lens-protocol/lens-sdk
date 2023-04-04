import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CollectPublication,
  CollectRequest,
  FreeCollectRequest,
} from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  ProtocolCallUseCase,
  SignlessProtocolCallUseCase,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { CollectProxyActionRelayer } from './CollectProxyActionRelayer';
import { CollectPublicationCallGateway } from './CollectPublicationCallGateway';
import { PromiseResultPresenter } from './PromiseResultPresenter';

export function useCollectController() {
  const {
    activeWallet,
    apolloClient,
    logger,
    protocolCallRelayer,
    tokenAvailability,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CollectRequest) => {
    const collectPublicationCallGateway = new CollectPublicationCallGateway(apolloClient);

    const presenter = new PromiseResultPresenter<
      void,
      | BroadcastingError
      | InsufficientAllowanceError
      | InsufficientFundsError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();

    const signedFlow = new ProtocolCallUseCase<CollectRequest>(
      activeWallet,
      transactionGateway,
      collectPublicationCallGateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );

    const collectProxyActionRelayer = new CollectProxyActionRelayer(
      apolloClient,
      transactionFactory,
      logger,
    );
    const signlessFlow = new SignlessProtocolCallUseCase<FreeCollectRequest>(
      collectProxyActionRelayer,
      transactionQueue,
      presenter,
    );

    const collectPublication = new CollectPublication(
      tokenAvailability,
      signedFlow,
      signlessFlow,
      presenter,
    );

    await collectPublication.execute(request);

    return presenter.asResult();
  };
}
