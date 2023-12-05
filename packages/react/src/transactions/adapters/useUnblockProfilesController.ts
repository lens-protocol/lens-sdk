import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UnblockProfiles, UnblockProfilesRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  DelegableSigning,
  PaidTransaction,
  SignedOnChain,
} from '@lens-protocol/domain/use-cases/transactions';

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
    providerFactory,
  } = useSharedDependencies();

  return async (request: UnblockProfilesRequest) => {
    const presenter = new TransactionResultPresenter<
      UnblockProfilesRequest,
      | BroadcastingError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
      | InsufficientGasError
    >();

    const gateway = new UnblockProfilesGateway(providerFactory, apolloClient, transactionFactory);

    const signedExecution = new SignedOnChain<UnblockProfilesRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableExecution = new DelegableSigning<UnblockProfilesRequest>(
      signedExecution,
      gateway,
      transactionQueue,
      presenter,
    );

    const paidExecution = new PaidTransaction<UnblockProfilesRequest>(
      activeWallet,
      gateway,
      presenter,
      transactionQueue,
    );

    const blockProfile = new UnblockProfiles(delegableExecution, paidExecution);

    await blockProfile.execute(request);

    return presenter.asResult();
  };
}
