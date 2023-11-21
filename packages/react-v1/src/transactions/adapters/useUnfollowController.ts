import {
  PendingSigningRequestError,
  WalletConnectionError,
  UserRejectedError,
} from '@lens-protocol/domain/entities';
import { UnfollowProfile, UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UnfollowProfileCallGateway } from './UnfollowProfileCallGateway';

export function useUnfollowController() {
  const { activeWallet, apolloClient, transactionGateway, onChainRelayer, transactionQueue } =
    useSharedDependencies();

  return async (request: UnfollowRequest) => {
    const presenter = new TransactionResultPresenter<
      UnfollowRequest,
      BroadcastingError | PendingSigningRequestError | WalletConnectionError | UserRejectedError
    >();

    const unfollowProfileCallGateway = new UnfollowProfileCallGateway(apolloClient);

    const unfollowProfiles = new UnfollowProfile(
      activeWallet,
      transactionGateway,
      unfollowProfileCallGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    await unfollowProfiles.execute(request);

    return presenter.asResult();
  };
}
