import { ProfileMetadata } from '@lens-protocol/api-bindings';
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
import { MetadataUploaderErrorMiddleware } from '../infrastructure/MetadataUploaderErrorMiddleware';
import { IMetadataUploader } from './IMetadataUploader';
import { MetadataUploadHandler } from './MetadataUploadHandler';
import { ProfileMetadataCallGateway } from './ProfileMetadataCallGateway';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { validateUpdateProfileDetailsRequest } from './schemas/validators';

export type UseUpdateProfileDetailsControllerArgs = {
  upload: MetadataUploadHandler;
};

export function useUpdateProfileDetailsController({
  upload,
}: UseUpdateProfileDetailsControllerArgs) {
  const {
    activeWallet,
    apolloClient,
    mediaTransforms,
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: UpdateProfileDetailsRequest) => {
    validateUpdateProfileDetailsRequest(request);

    const uploader: IMetadataUploader<ProfileMetadata> = new MetadataUploaderErrorMiddleware(
      upload,
    );
    const gateway = new ProfileMetadataCallGateway(
      apolloClient,
      transactionFactory,
      uploader,
      mediaTransforms,
    );

    const presenter = new PromiseResultPresenter<
      void,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const signedUpdateProfiles = new SubsidizeOnChain<UpdateProfileDetailsRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
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
