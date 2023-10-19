import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UnlinkHandle, UnlinkHandleRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SubsidizeOnChain } from '@lens-protocol/domain/use-cases/transactions';
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
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (
    request: UnlinkHandleRequest,
  ): PromiseResult<
    AsyncTransactionResult<void>,
    BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  > => {
    validateUnlinkHandleRequest(request);

    const presenter = new TransactionResultPresenter<
      UnlinkHandleRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const gateway = new UnlinkHandleGateway(apolloClient, transactionFactory);

    const signedFollow = new SubsidizeOnChain(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const unlinkHandle = new UnlinkHandle(signedFollow, gateway, transactionQueue, presenter);

    await unlinkHandle.execute(request);

    return presenter.asResult();
  };
}
