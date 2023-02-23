import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateProfileDetails,
  UpdateProfileDetailsRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { ProtocolCallUseCase } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { MetadataUploadAdapter, MetadataUploadHandler } from './MetadataUploadAdapter';
import { ProfileMetadataCallGateway } from './ProfileMetadataCallGateway';
import { PromiseResultPresenter } from './PromiseResultPresenter';

export type UseUpdateProfileDetailsControllerArgs = {
  upload: MetadataUploadHandler;
};

export function useUpdateProfileDetailsController({
  upload,
}: UseUpdateProfileDetailsControllerArgs) {
  const {
    activeWallet,
    apolloClient,
    transactionGateway,
    protocolCallRelayer,
    transactionQueue,
    transactionFactory,
    sources,
  } = useSharedDependencies();

  return async (request: UpdateProfileDetailsRequest) => {
    const uploadAdapter = new MetadataUploadAdapter(upload);
    const gateway = new ProfileMetadataCallGateway(
      apolloClient,
      transactionFactory,
      uploadAdapter,
      sources,
    );

    const presenter = new PromiseResultPresenter<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const signedUpdateProfiles = new ProtocolCallUseCase<UpdateProfileDetailsRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );
    const updateProfileDetails = new UpdateProfileDetails(
      signedUpdateProfiles,
      gateway,
      transactionQueue,
      presenter,
    );

    await updateProfileDetails.execute(request);

    return presenter.asResult();
  };
}
