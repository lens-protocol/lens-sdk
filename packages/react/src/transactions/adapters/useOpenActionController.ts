import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { OpenAction, OpenActionRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  DelegableSigning,
  SignedOnChain,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { OpenActionGateway } from './OpenActionGateway';
import { TransactionResultPresenter } from './TransactionResultPresenter';

export function useOpenActionController() {
  const {
    activeWallet,
    apolloClient,
    onChainRelayer,
    tokenAvailability,
    transactionGateway,
    transactionFactory,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: OpenActionRequest) => {
    const presenter = new TransactionResultPresenter<
      OpenActionRequest,
      | BroadcastingError
      | InsufficientAllowanceError
      | InsufficientFundsError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();

    const onChainGateway = new OpenActionGateway(apolloClient, transactionFactory);

    const signedExecution = new SignedOnChain(
      activeWallet,
      transactionGateway,
      onChainGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableExecution = new DelegableSigning(
      signedExecution,
      onChainGateway,
      transactionQueue,
      presenter,
    );

    const openAction = new OpenAction(
      tokenAvailability,
      signedExecution,
      delegableExecution,
      presenter,
    );

    await openAction.execute(request);

    return presenter.asResult();
  };
}
