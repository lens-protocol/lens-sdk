import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { OpenAction, OpenActionRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  DelegableSigning,
  PaidTransaction,
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
    config,
    onChainRelayer,
    providerFactory,
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
      | InsufficientGasError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();

    const onChainGateway = new OpenActionGateway(
      config,
      apolloClient,
      transactionFactory,
      providerFactory,
    );

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

    const paidExecution = new PaidTransaction(
      activeWallet,
      onChainGateway,
      presenter,
      transactionQueue,
    );

    const openAction = new OpenAction(
      tokenAvailability,
      signedExecution,
      delegableExecution,
      paidExecution,
      presenter,
    );

    await openAction.execute(request);

    return presenter.asResult();
  };
}
