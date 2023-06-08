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
  SignlessSubsidizeOnChain,
  SubsidizeOnChain,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { CollectPublicationGateway } from './CollectPublicationGateway';
import { PromiseResultPresenter } from './PromiseResultPresenter';

export function useCollectController() {
  const {
    activeWallet,
    apolloClient,
    logger,
    onChainRelayer,
    tokenAvailability,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CollectRequest) => {
    const collectPublicationGateway = new CollectPublicationGateway(
      apolloClient,
      transactionFactory,
      logger,
    );

    const presenter = new PromiseResultPresenter<
      void,
      | BroadcastingError
      | InsufficientAllowanceError
      | InsufficientFundsError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();

    const signedCollect = new SubsidizeOnChain<CollectRequest>(
      activeWallet,
      transactionGateway,
      collectPublicationGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const signlessCollect = new SignlessSubsidizeOnChain<FreeCollectRequest>(
      collectPublicationGateway,
      transactionQueue,
      presenter,
    );

    const collectPublication = new CollectPublication(
      tokenAvailability,
      signedCollect,
      signlessCollect,
      presenter,
    );

    await collectPublication.execute(request);

    return presenter.asResult();
  };
}
