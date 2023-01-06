import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreateComment, CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import { ProtocolCallUseCase } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { UploadHandler } from './UploadHandler';
import { CommentCallGateway } from './publication-call-gateways/CommentCallGateway';

export type UseCreateCommentControllerArgs = {
  upload: UploadHandler;
};

export function useCreateCommentController({ upload }: UseCreateCommentControllerArgs) {
  const {
    apolloClient,
    transactionFactory,
    activeWallet,
    transactionGateway,
    protocolCallRelayer,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreateCommentRequest) => {
    const gateway = new CommentCallGateway(apolloClient, transactionFactory, upload);

    const presenter = new PromiseResultPresenter<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const signedCreateComment = new ProtocolCallUseCase<CreateCommentRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );

    const createComment = new CreateComment(
      signedCreateComment,
      gateway,
      transactionQueue,
      presenter,
    );

    void createComment.execute(request);

    return presenter.asResult();
  };
}
