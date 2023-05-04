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
} from '@lens-protocol/domain/use-cases/transactions';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/wallets';

import { IMetadataUploader } from './IMetadataUploader';
import { ITransactionFactory } from './ITransactionFactory';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { CreateOnChainPostGateway } from './publication-call-gateways/CreateOnChainPostGateway';

export type CreatePostControllerArgs<T extends CreatePostRequest> = {
  activeWallet: ActiveWallet;
  apolloClient: LensApolloClient;
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
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    uploader,
  }: CreatePostControllerArgs<T>) {
    const gateway = new CreateOnChainPostGateway(apolloClient, transactionFactory, uploader);

    const signedCreatePost = new SubsidizeOnChain<CreatePostRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
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
