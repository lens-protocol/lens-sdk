import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateProfileImage,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SubsidizeOnChain } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { ProfileImageCallGateway } from './ProfileImageCallGateway';
import { TransactionResultPresenter } from './TransactionResultPresenter';

export function useUpdateProfileImageController() {
  const {
    activeWallet,
    apolloClient,
    transactionGateway,
    onChainRelayer,
    transactionQueue,
    transactionFactory,
  } = useSharedDependencies();

  return async (request: UpdateProfileImageRequest) => {
    const profileImageCallGateway = new ProfileImageCallGateway(apolloClient, transactionFactory);

    const presenter = new TransactionResultPresenter<
      UpdateProfileImageRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const signedUpdateProfileImage = new SubsidizeOnChain<UpdateProfileImageRequest>(
      activeWallet,
      transactionGateway,
      profileImageCallGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const updateProfileImage = new UpdateProfileImage(
      signedUpdateProfileImage,
      profileImageCallGateway,
      transactionQueue,
      presenter,
    );

    await updateProfileImage.execute(request);

    return presenter.asResult();
  };
}
