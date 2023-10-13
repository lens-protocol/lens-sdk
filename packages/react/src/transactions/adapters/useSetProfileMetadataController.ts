import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateProfileDetails,
  UpdateProfileDetailsRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SubsidizeOnChain } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { ProfileMetadataGateway } from './ProfileMetadataGateway/ProfileMetadataGateway';
import { TransactionResultPresenter } from './TransactionResultPresenter';

export function useSetProfileMetadataController() {
  const {
    activeWallet,
    apolloClient,
    transactionGateway,
    transactionQueue,
    transactionFactory,
    onChainRelayer,
  } = useSharedDependencies();

  return async (request: UpdateProfileDetailsRequest) => {
    const presenter = new TransactionResultPresenter<
      UpdateProfileDetailsRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const gateway = new ProfileMetadataGateway(apolloClient, transactionFactory);

    const signedSetProfileMetadata = new SubsidizeOnChain<UpdateProfileDetailsRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const updateProfileDetails = new UpdateProfileDetails(
      signedSetProfileMetadata,
      gateway,
      transactionQueue,
      presenter,
    );

    await updateProfileDetails.execute(request);

    return presenter.asResult();
  };
}
