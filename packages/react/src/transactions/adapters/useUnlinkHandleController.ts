import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UnlinkHandle, UnlinkHandleRequest } from '@lens-protocol/domain/use-cases/profile';
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
import { UnlinkHandleGateway } from './profiles/UnlinkHandleGateway';
import { validateUnlinkHandleRequest } from './schemas/validators';

export function useUnlinkHandleController() {
  const {
    activeWallet,
    apolloClient,
    config,
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    providerFactory,
  } = useSharedDependencies();

  return async (
    request: UnlinkHandleRequest,
  ): PromiseResult<
    AsyncTransactionResult<void>,
    | BroadcastingError
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | InsufficientGasError
  > => {
    validateUnlinkHandleRequest(request);

    const presenter = new TransactionResultPresenter<
      UnlinkHandleRequest,
      | BroadcastingError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
      | InsufficientGasError
    >();
    const gateway = new UnlinkHandleGateway(
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

    const delegableExecution = new DelegableSigning<UnlinkHandleRequest>(
      signedExecution,
      gateway,
      transactionQueue,
      presenter,
    );

    const paidExecution = new PaidTransaction(activeWallet, gateway, presenter, transactionQueue);

    const unlinkHandle = new UnlinkHandle(delegableExecution, paidExecution);

    await unlinkHandle.execute(request);

    return presenter.asResult();
  };
}
