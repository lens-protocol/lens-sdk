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
  IProtocolCallRelayer,
  ProtocolCallUseCase,
  SupportedTransactionRequest,
  TransactionQueue,
} from '@lens-protocol/domain/use-cases/transactions';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/wallets';

import { IMetadataUploader } from './IMetadataUploader';
import { ITransactionFactory } from './ITransactionFactory';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { CreateCommentCallGateway } from './publication-call-gateways/CreateCommentCallGateway';

export type CreateCommentControllerArgs<T extends CreateCommentRequest> = {
  activeWallet: ActiveWallet;
  apolloClient: LensApolloClient;
  protocolCallRelayer: IProtocolCallRelayer<T>;
  transactionFactory: ITransactionFactory<T>;
  transactionGateway: IMetaTransactionNonceGateway;
  transactionQueue: TransactionQueue<SupportedTransactionRequest>;
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
    protocolCallRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    uploader,
  }: CreateCommentControllerArgs<T>) {
    const gateway = new CreateCommentCallGateway(apolloClient, transactionFactory, uploader);

    const signedCreatePost = new ProtocolCallUseCase<CreateCommentRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      protocolCallRelayer,
      transactionQueue,
      this.presenter,
    );
    this.createComment = new CreateComment(
      signedCreatePost,
      gateway,
      transactionQueue,
      this.presenter,
    );
  }

  async execute(request: CreateCommentRequest) {
    await this.createComment.execute(request);
    return this.presenter.asResult();
  }
}
