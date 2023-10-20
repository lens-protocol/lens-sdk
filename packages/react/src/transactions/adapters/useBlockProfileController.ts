import {
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BlockProfiles, BlockProfilesRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SubsidizeOnChain } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { BlockProfilesGateway } from './profiles/BlockProfilesGateway';

export function useBlockProfilesController() {
  const {
    activeWallet,
    apolloClient,
    transactionGateway,
    transactionQueue,
    transactionFactory,
    onChainRelayer,
  } = useSharedDependencies();

  const presenter = new TransactionResultPresenter<
    BlockProfilesRequest,
    | BroadcastingError
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | TransactionError
  >();

  const gateway = new BlockProfilesGateway(apolloClient, transactionFactory);

  const signedBlockProfiles = new SubsidizeOnChain<BlockProfilesRequest>(
    activeWallet,
    transactionGateway,
    gateway,
    onChainRelayer,
    transactionQueue,
    presenter,
  );

  return async (request: BlockProfilesRequest) => {
    const blockProfile = new BlockProfiles(
      signedBlockProfiles,
      gateway,
      transactionQueue,
      presenter,
    );

    await blockProfile.execute(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }

    return result;
  };
}
