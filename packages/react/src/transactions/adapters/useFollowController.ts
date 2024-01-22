import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { FollowProfile, FollowRequest } from '@lens-protocol/domain/use-cases/profile';
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
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { FollowProfileGateway } from './profiles/FollowProfileGateway';
import { validateFollowRequest } from './schemas/validators';

export function useFollowController() {
  const {
    activeWallet,
    apolloClient,
    config,
    onChainRelayer,
    providerFactory,
    tokenAvailability,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: FollowRequest) => {
    validateFollowRequest(request);

    const presenter = new TransactionResultPresenter<
      FollowRequest,
      | BroadcastingError
      | InsufficientAllowanceError
      | InsufficientFundsError
      | InsufficientGasError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();
    const gateway = new FollowProfileGateway(
      config,
      providerFactory,
      apolloClient,
      transactionFactory,
    );

    const signedExecution = new SignedOnChain(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableExecution = new DelegableSigning(
      signedExecution,
      gateway,
      transactionQueue,
      presenter,
    );

    const paidExecution = new PaidTransaction(activeWallet, gateway, presenter, transactionQueue);

    const followProfile = new FollowProfile(
      tokenAvailability,
      signedExecution,
      delegableExecution,
      paidExecution,
      presenter,
    );

    await followProfile.execute(request);

    return presenter.asResult();
  };
}
