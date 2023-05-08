import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { CreateCommentController } from './CreateCommentController';
import { IMetadataUploader } from './IMetadataUploader';

export type UseCreateCommentArgs = {
  uploader: IMetadataUploader<CreateCommentRequest>;
};

export function useCreateCommentController({ uploader }: UseCreateCommentArgs) {
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
