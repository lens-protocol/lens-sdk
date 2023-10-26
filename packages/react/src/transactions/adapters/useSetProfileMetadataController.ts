import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  SetProfileMetadata,
  SetProfileMetadataRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SignedOnChain } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { ProfileMetadataGateway } from './profiles/ProfileMetadataGateway';

export function useSetProfileMetadataController() {
  const {
    activeWallet,
    apolloClient,
    transactionGateway,
    transactionQueue,
    transactionFactory,
    onChainRelayer,
  } = useSharedDependencies();

  return async (request: SetProfileMetadataRequest) => {
    const presenter = new TransactionResultPresenter<
      SetProfileMetadataRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const gateway = new ProfileMetadataGateway(apolloClient, transactionFactory);

    const signedSetProfileMetadata = new SignedOnChain<SetProfileMetadataRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const setProfileMetadata = new SetProfileMetadata(
      signedSetProfileMetadata,
      gateway,
      transactionQueue,
      presenter,
    );

    await setProfileMetadata.execute(request);

    return presenter.asResult();
  };
}
