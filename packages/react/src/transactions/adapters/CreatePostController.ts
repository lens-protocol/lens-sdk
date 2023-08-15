import { SafeApolloClient } from '@lens-protocol/api-bindings';
import { CreatePost, CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  IMetaTransactionNonceGateway,
  IOnChainRelayer,
  SubsidizeOnChain,
  AnyTransactionRequest,
  TransactionQueue,
  DelegableSigning,
  IOffChainRelayer,
  SubsidizeOffChain,
} from '@lens-protocol/domain/use-cases/transactions';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/wallets';

import { CreatePostPresenter, INewPostCacheManager } from './CreatePostPresenter';
import { IMetadataUploader } from './IMetadataUploader';
import { ITransactionFactory } from './ITransactionFactory';
import { CreateOffChainPostGateway } from './publication-call-gateways/CreateOffChainPostGateway';
import { CreateOnChainPostGateway } from './publication-call-gateways/CreateOnChainPostGateway';

export type CreatePostControllerArgs<T extends CreatePostRequest> = {
  activeWallet: ActiveWallet;
  apolloClient: SafeApolloClient;
  offChainRelayer: IOffChainRelayer<T>;
  onChainRelayer: IOnChainRelayer<T>;
  publicationCacheManager: INewPostCacheManager;
  transactionFactory: ITransactionFactory<T>;
  transactionGateway: IMetaTransactionNonceGateway;
  transactionQueue: TransactionQueue<AnyTransactionRequest>;
  uploader: IMetadataUploader<T>;
};

export class CreatePostController<T extends CreatePostRequest> {
  private readonly presenter: CreatePostPresenter;

  private readonly createPost: CreatePost;

  constructor({
    activeWallet,
    apolloClient,
    offChainRelayer,
    onChainRelayer,
    publicationCacheManager,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    uploader,
  }: CreatePostControllerArgs<T>) {
    this.presenter = new CreatePostPresenter(publicationCacheManager);

    const onChainGateway = new CreateOnChainPostGateway(apolloClient, transactionFactory, uploader);

    const onChainPost = new SubsidizeOnChain(
      activeWallet,
      transactionGateway,
      onChainGateway,
      onChainRelayer,
      transactionQueue,
      this.presenter,
    );

    const delegableOnChainPost = new DelegableSigning(
      onChainPost,
      onChainGateway,
      transactionQueue,
      this.presenter,
    );

    const offChainGateway = new CreateOffChainPostGateway(
      apolloClient,
      transactionFactory,
      uploader,
    );

    const offChainPost = new SubsidizeOffChain(
      activeWallet,
      offChainGateway,
      offChainRelayer,
      transactionQueue,
      this.presenter,
    );

    const delegableOffChainPost = new DelegableSigning(
      offChainPost,
      offChainGateway,
      transactionQueue,
      this.presenter,
    );

    this.createPost = new CreatePost(delegableOnChainPost, delegableOffChainPost);
  }

  async execute(request: CreatePostRequest) {
    await this.createPost.execute(request);
    return this.presenter.asResult();
  }
}
