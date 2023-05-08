import { LensApolloClient } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreatePost, CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
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

import { IMetadataUploader } from './IMetadataUploader';
import { ITransactionFactory } from './ITransactionFactory';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { CreateOffChainPostGateway } from './publication-call-gateways/CreateOffChainPostGateway';
import { CreateOnChainPostGateway } from './publication-call-gateways/CreateOnChainPostGateway';

export type CreatePostControllerArgs<T extends CreatePostRequest> = {
  activeWallet: ActiveWallet;
  apolloClient: LensApolloClient;
  offChainRelayer: IOffChainRelayer<T>;
  onChainRelayer: IOnChainRelayer<T>;
  transactionFactory: ITransactionFactory<T>;
  transactionGateway: IMetaTransactionNonceGateway;
  transactionQueue: TransactionQueue<AnyTransactionRequest>;
  uploader: IMetadataUploader<T>;
};

export class CreatePostController<T extends CreatePostRequest> {
  private readonly presenter = new PromiseResultPresenter<
    void,
    BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >();

  private readonly createPost: CreatePost;

  constructor({
    activeWallet,
    apolloClient,
    offChainRelayer,
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    uploader,
  }: CreatePostControllerArgs<T>) {
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
