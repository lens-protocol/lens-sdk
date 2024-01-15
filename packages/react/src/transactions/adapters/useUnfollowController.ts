import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UnfollowProfile, UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  DelegableSigning,
  PaidTransaction,
  SignedOnChain,
} from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { AsyncTransactionResult } from './AsyncTransactionResult';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UnfollowProfileGateway } from './profiles/UnfollowProfileGateway';
import { validateUnfollowRequest } from './schemas/validators';

export function useUnfollowController() {
  const {
    activeWallet,
    apolloClient,
    config,
    onChainRelayer,
    providerFactory,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (
    request: UnfollowRequest,
  ): PromiseResult<
    AsyncTransactionResult<void>,
    | BroadcastingError
    | InsufficientGasError
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
  > => {
    validateUnfollowRequest(request);

    const presenter = new TransactionResultPresenter<
      UnfollowRequest,
      | BroadcastingError
      | InsufficientGasError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();
    const gateway = new UnfollowProfileGateway(
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

    const delegableExecution = new DelegableSigning<UnfollowRequest>(
      signedExecution,
      gateway,
      transactionQueue,
      presenter,
    );

    const paidExecution = new PaidTransaction(activeWallet, gateway, presenter, transactionQueue);

    const unfollowProfile = new UnfollowProfile(delegableExecution, paidExecution);

    await unfollowProfile.execute(request);

    return presenter.asResult();
  };
}
