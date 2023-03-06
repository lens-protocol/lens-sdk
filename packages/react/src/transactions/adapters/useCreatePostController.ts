import { LensApolloClient } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreatePost, CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  IMetaTransactionNonceGateway,
  IProtocolCallRelayer,
  ProtocolCallUseCase,
  TransactionQueue,
} from '@lens-protocol/domain/use-cases/transactions';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { IMetadataUploader } from './IMetadataUploader';
import { ITransactionFactory } from './ITransactionFactory';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { CreatePostCallGateway } from './publication-call-gateways/CreatePostCallGateway';

export type UseCreatePostControllerArgs = {
  uploader: IMetadataUploader<CreatePostRequest>;
};

export function useCreatePostController({ uploader }: UseCreatePostControllerArgs) {
  const {
    apolloClient,
    transactionFactory,
    activeWallet,
    transactionGateway,
    protocolCallRelayer,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreatePostRequest) => {
    const gateway = new CreatePostCallGateway(apolloClient, transactionFactory, uploader);

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

export type CreatePostControllerArgs<T extends CreatePostRequest> = {
  activeWallet: ActiveWallet;
  apolloClient: LensApolloClient;
  protocolCallRelayer: IProtocolCallRelayer<T>;
  transactionFactory: ITransactionFactory<T>;
  transactionGateway: IMetaTransactionNonceGateway;
  transactionQueue: TransactionQueue<T>;
  uploader: IMetadataUploader<T>;
};

export class CreatePostController<T extends CreatePostRequest> {
  private readonly presenter = new PromiseResultPresenter<
    void,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >();

  private readonly createPost: CreatePost;

  constructor({
    activeWallet,
    apolloClient,
    protocolCallRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    uploader,
  }: CreatePostControllerArgs<T>) {
    const gateway = new CreatePostCallGateway(apolloClient, transactionFactory, uploader);

    const signedCreatePost = new ProtocolCallUseCase<CreatePostRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      protocolCallRelayer,
      transactionQueue,
      this.presenter,
    );
    this.createPost = new CreatePost(signedCreatePost, gateway, transactionQueue, this.presenter);
  }

  async execute(request: CreatePostRequest) {
    await this.createPost.execute(request);
    return this.presenter.asResult();
  }
}
