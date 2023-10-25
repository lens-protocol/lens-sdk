import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { LinkHandleRequest, LinkHandle } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SubsidizeOnChain } from '@lens-protocol/domain/use-cases/transactions';
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
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (
    request: LinkHandleRequest,
  ): PromiseResult<
    AsyncTransactionResult<void>,
    BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  > => {
    validateLinkHandleRequest(request);

    const presenter = new TransactionResultPresenter<
      LinkHandleRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const gateway = new LinkHandleGateway(apolloClient, transactionFactory);

    const signedFollow = new SubsidizeOnChain(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const linkHandle = new LinkHandle(signedFollow, gateway, transactionQueue, presenter);

    await linkHandle.execute(request);

    return presenter.asResult();
  };
}
