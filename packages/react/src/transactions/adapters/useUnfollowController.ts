import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UnfollowProfile, UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SubsidizeOnChain } from '@lens-protocol/domain/use-cases/transactions';
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
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (
    request: UnfollowRequest,
  ): PromiseResult<
    AsyncTransactionResult<void>,
    BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  > => {
    validateUnfollowRequest(request);

    const presenter = new TransactionResultPresenter<
      UnfollowRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const gateway = new UnfollowProfileGateway(apolloClient, transactionFactory);

    const signedFollow = new SubsidizeOnChain(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const unfollowProfile = new UnfollowProfile(signedFollow, gateway, transactionQueue, presenter);

    await unfollowProfile.execute(request);

    return presenter.asResult();
  };
}
