import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateProfileImage,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { ProfileImageCallGateway } from './ProfileImageCallGateway';

export function useUpdateProfileImageController() {
  const { activeWallet, apolloClient, transactionGateway, protocolCallRelayer, transactionQueue } =
    useSharedDependencies();

  return async (request: UpdateProfileImageRequest) => {
    const profileImageCallGateway = new ProfileImageCallGateway(apolloClient);

    const presenter = new PromiseResultPresenter<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const updateProfileImage = new UpdateProfileImage(
      activeWallet,
      transactionGateway,
      profileImageCallGateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );

    void updateProfileImage.execute(request);

    return presenter.asResult();
  };
}
