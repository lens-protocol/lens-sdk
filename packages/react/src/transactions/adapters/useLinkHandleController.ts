import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { LinkHandle, LinkHandleRequest } from '@lens-protocol/domain/use-cases/profile';
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
import { LinkHandleGateway } from './profiles/LinkHandleGateway';
import { validateLinkHandleRequest } from './schemas/validators';

export function useLinkHandleController() {
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
    request: LinkHandleRequest,
  ): PromiseResult<
    AsyncTransactionResult<void>,
    | BroadcastingError
    | InsufficientGasError
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
  > => {
    validateLinkHandleRequest(request);

    const presenter = new TransactionResultPresenter<
      LinkHandleRequest,
      | BroadcastingError
      | InsufficientGasError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();
    const gateway = new LinkHandleGateway(
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

    const delegableExecution = new DelegableSigning<LinkHandleRequest>(
      signedExecution,
      gateway,
      transactionQueue,
      presenter,
    );

    const paidExecution = new PaidTransaction<LinkHandleRequest>(
      activeWallet,
      gateway,
      presenter,
      transactionQueue,
    );

    const linkHandle = new LinkHandle(delegableExecution, paidExecution);

    await linkHandle.execute(request);

    return presenter.asResult();
  };
}
