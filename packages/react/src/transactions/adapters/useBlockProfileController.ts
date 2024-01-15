import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BlockProfiles, BlockProfilesRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  DelegableSigning,
  PaidTransaction,
  SignedOnChain,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { BlockProfilesGateway } from './profiles/BlockProfilesGateway';

export function useBlockProfilesController() {
  const {
    activeWallet,
    apolloClient,
    config,
    transactionGateway,
    transactionQueue,
    transactionFactory,
    providerFactory,
    onChainRelayer,
  } = useSharedDependencies();

  return async (request: BlockProfilesRequest) => {
    const presenter = new TransactionResultPresenter<
      BlockProfilesRequest,
      | BroadcastingError
      | InsufficientGasError
      | PendingSigningRequestError
      | TransactionError
      | UserRejectedError
      | WalletConnectionError
    >();

    const gateway = new BlockProfilesGateway(
      config,
      providerFactory,
      apolloClient,
      transactionFactory,
    );

    const signedExecution = new SignedOnChain<BlockProfilesRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableExecution = new DelegableSigning<BlockProfilesRequest>(
      signedExecution,
      gateway,
      transactionQueue,
      presenter,
    );

    const paidExecution = new PaidTransaction<BlockProfilesRequest>(
      activeWallet,
      gateway,
      presenter,
      transactionQueue,
    );

    const blockProfile = new BlockProfiles(delegableExecution, paidExecution);

    await blockProfile.execute(request);

    const result = presenter.asResult();

    return result;
  };
}
