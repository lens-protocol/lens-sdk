import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { CreatePostController } from './CreatePostController';
import { IMetadataUploader } from './IMetadataUploader';

export type UseCreatePostArgs = {
  uploader: IMetadataUploader<CreatePostRequest>;
};

export function useCreatePostController({ uploader }: UseCreatePostArgs) {
  const {
    activeWallet,
    apolloClient,
    protocolCallRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreatePostRequest) => {
    const controller = new CreatePostController<CreatePostRequest>({
      activeWallet,
      apolloClient,
      protocolCallRelayer,
      transactionFactory,
      transactionGateway,
      transactionQueue,
      uploader,
    });

    return controller.execute(request);
  };
}
