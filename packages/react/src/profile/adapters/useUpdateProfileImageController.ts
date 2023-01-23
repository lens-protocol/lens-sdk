import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateProfileImage,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { ProtocolCallUseCase } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { ProfileImageCallGateway } from './ProfileImageCallGateway';

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
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const signedUpdateProfileImage = new ProtocolCallUseCase<UpdateProfileImageRequest>(
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
