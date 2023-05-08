import { LensApolloClient } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreateComment, CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IMetaTransactionNonceGateway,
  IOnChainRelayer,
  SubsidizeOnChain,
  AnyTransactionRequest,
  TransactionQueue,
  IOffChainRelayer,
  DelegableSigning,
  SubsidizeOffChain,
} from '@lens-protocol/domain/use-cases/transactions';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/wallets';

import { IMetadataUploader } from './IMetadataUploader';
import { ITransactionFactory } from './ITransactionFactory';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { CreateOffChainCommentGateway } from './publication-call-gateways/CreateOffChainCommentGateway';
import { CreateOnChainCommentGateway } from './publication-call-gateways/CreateOnChainCommentGateway';

export type CreateCommentControllerArgs<T extends CreateCommentRequest> = {
  activeWallet: ActiveWallet;
  apolloClient: LensApolloClient;
  offChainRelayer: IOffChainRelayer<T>;
  onChainRelayer: IOnChainRelayer<T>;
  transactionFactory: ITransactionFactory<T>;
  transactionGateway: IMetaTransactionNonceGateway;
  transactionQueue: TransactionQueue<AnyTransactionRequest>;
  uploader: IMetadataUploader<T>;
};

export class CreateCommentController<T extends CreateCommentRequest> {
  private readonly presenter = new PromiseResultPresenter<
    void,
    BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >();

  private readonly createComment: CreateComment;

  constructor({
    activeWallet,
    apolloClient,
    offChainRelayer,
    onChainRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    uploader,
  }: CreateCommentControllerArgs<T>) {
    const onChainGateway = new CreateOnChainCommentGateway(
      apolloClient,
      transactionFactory,
      uploader,
    );

    const onChainComment = new SubsidizeOnChain(
      activeWallet,
      transactionGateway,
      onChainGateway,
      onChainRelayer,
      transactionQueue,
      this.presenter,
    );

    const delegableOnChainComment = new DelegableSigning(
      onChainComment,
      onChainGateway,
      transactionQueue,
      this.presenter,
    );

    const offChainGateway = new CreateOffChainCommentGateway(
      apolloClient,
      transactionFactory,
      uploader,
    );

    const offChainComment = new SubsidizeOffChain(
      activeWallet,
      offChainGateway,
      offChainRelayer,
      transactionQueue,
      this.presenter,
    );

    const delegableOffChainComment = new DelegableSigning(
      offChainComment,
      offChainGateway,
      transactionQueue,
      this.presenter,
    );

    this.createComment = new CreateComment(delegableOnChainComment, delegableOffChainComment);
  }

  async execute(request: CreateCommentRequest) {
    await this.createComment.execute(request);
    return this.presenter.asResult();
  }
}
