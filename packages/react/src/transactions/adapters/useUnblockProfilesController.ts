import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UnblockProfiles, UnblockProfilesRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SignedOnChain } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UnblockProfilesGateway } from './profiles/UnblockProfilesGateway';

export function useUnblockProfilesController() {
  const {
    activeWallet,
    apolloClient,
    transactionGateway,
    transactionQueue,
    transactionFactory,
    onChainRelayer,
  } = useSharedDependencies();

  const presenter = new TransactionResultPresenter<
    UnblockProfilesRequest,
    BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >();

  const gateway = new UnblockProfilesGateway(apolloClient, transactionFactory);

  const signedBlockProfiles = new SignedOnChain<UnblockProfilesRequest>(
    activeWallet,
    transactionGateway,
    gateway,
    onChainRelayer,
    transactionQueue,
    presenter,
  );

  return async (request: UnblockProfilesRequest) => {
    const blockProfile = new UnblockProfiles(
      signedBlockProfiles,
      gateway,
      transactionQueue,
      presenter,
    );

    await blockProfile.execute(request);

    return presenter.asResult();
  };
}
