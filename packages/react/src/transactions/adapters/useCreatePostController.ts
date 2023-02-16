import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreatePost, CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { ProtocolCallUseCase } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { MetadataUploadAdapter, MetadataUploadHandler } from './MetadataUploadAdapter';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { CreatePostCallGateway } from './publication-call-gateways/CreatePostCallGateway';

export type UseCreatePostControllerArgs = {
  upload: MetadataUploadHandler;
};

export function useCreatePostController({ upload }: UseCreatePostControllerArgs) {
  const {
    apolloClient,
    transactionFactory,
    activeWallet,
    transactionGateway,
    protocolCallRelayer,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreatePostRequest) => {
    const uploadAdapter = new MetadataUploadAdapter(upload);
    const gateway = new CreatePostCallGateway(apolloClient, transactionFactory, uploadAdapter);

    const presenter = new PromiseResultPresenter<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const signedCreatePost = new ProtocolCallUseCase<CreatePostRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );

    const createPost = new CreatePost(signedCreatePost, gateway, transactionQueue, presenter);

    await createPost.execute(request);

    return presenter.asResult();
  };
}
