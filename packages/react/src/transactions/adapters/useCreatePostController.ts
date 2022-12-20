import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreatePost, CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { ProtocolCallUseCase } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { PublicationCallGateway } from './PublicationCallGateway';
import { UploadHandler } from './UploadHandler';

export type UseCreatePostControllerArgs = {
  upload: UploadHandler;
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
    const gateway = new PublicationCallGateway(apolloClient, transactionFactory, upload);

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

    void createPost.execute(request);

    return presenter.asResult();
  };
}
