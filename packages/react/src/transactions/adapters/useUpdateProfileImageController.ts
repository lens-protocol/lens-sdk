import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateProfileImage,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SubsidizedCall } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { ProfileImageCallGateway } from './ProfileImageCallGateway';
import { PromiseResultPresenter } from './PromiseResultPresenter';

export function useUpdateProfileImageController() {
  const {
    activeWallet,
    apolloClient,
    transactionGateway,
    protocolCallRelayer,
    transactionQueue,
    transactionFactory,
  } = useSharedDependencies();

  return async (request: UpdateProfileImageRequest) => {
    const profileImageCallGateway = new ProfileImageCallGateway(apolloClient, transactionFactory);

    const presenter = new PromiseResultPresenter<
      void,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const signedUpdateProfileImage = new SubsidizedCall<UpdateProfileImageRequest>(
      activeWallet,
      transactionGateway,
      profileImageCallGateway,
      protocolCallRelayer,
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
