import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { PublicationMetadataUploader } from '../infrastructure/PublicationMetadataUploader';
import { CreatePostController } from './CreatePostController';
import { MetadataUploadHandler } from './MetadataUploadHandler';

export type UseCreatePostArgs = {
  upload: MetadataUploadHandler;
};

export function useCreatePostController({ upload }: UseCreatePostArgs) {
  const uploader = new PublicationMetadataUploader(upload);

  const {
    activeWallet,
    apolloClient,
    offChainRelayer,
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreatePostRequest) => {
    const controller = new CreatePostController({
      activeWallet,
      apolloClient,
      offChainRelayer,
      onChainRelayer,
      transactionFactory,
      transactionGateway,
      transactionQueue,
      uploader,
    });

    return controller.execute(request);
  };
}
