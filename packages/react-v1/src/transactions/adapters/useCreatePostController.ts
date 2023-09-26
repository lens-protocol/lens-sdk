import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { PublicationMetadataUploader } from '../infrastructure/PublicationMetadataUploader';
import { CreatePostController } from './CreatePostController';
import { MetadataUploadHandler } from './MetadataUploadHandler';
import { validateCreatePostRequest } from './schemas/validators';

export type UseCreatePostArgs = {
  upload: MetadataUploadHandler;
};

export function useCreatePostController({ upload }: UseCreatePostArgs) {
  const {
    activeWallet,
    apolloClient,
    offChainRelayer,
    onChainRelayer,
    publicationCacheManager,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreatePostRequest) => {
    validateCreatePostRequest(request);

    const uploader = PublicationMetadataUploader.create(upload);
    const controller = new CreatePostController({
      activeWallet,
      apolloClient,
      offChainRelayer,
      onChainRelayer,
      publicationCacheManager,
      transactionFactory,
      transactionGateway,
      transactionQueue,
      uploader,
    });

    return controller.execute(request);
  };
}
