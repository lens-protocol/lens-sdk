import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { PublicationMetadataUploader } from '../infrastructure/PublicationMetadataUploader';
import { CreateCommentController } from './CreateCommentController';
import { MetadataUploadHandler } from './MetadataUploadHandler';
import { validateCreateCommentRequest } from './schemas/validators';

export type UseCreateCommentArgs = {
  upload: MetadataUploadHandler;
};

export function useCreateCommentController({ upload }: UseCreateCommentArgs) {
  const {
    activeWallet,
    apolloClient,
    offChainRelayer,
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreateCommentRequest) => {
    validateCreateCommentRequest(request);

    const uploader = PublicationMetadataUploader.create(upload);
    const controller = new CreateCommentController<CreateCommentRequest>({
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
