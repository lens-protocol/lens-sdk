import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreateComment, CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import { ProtocolCallUseCase } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { IMetadataUploader } from './IMetadataUploader';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { CreateCommentCallGateway } from './publication-call-gateways/CreateCommentCallGateway';

export type UseCreateCommentControllerArgs = {
  uploader: IMetadataUploader<CreateCommentRequest>;
};

export function useCreateCommentController({ uploader }: UseCreateCommentControllerArgs) {
  const {
    apolloClient,
    transactionFactory,
    activeWallet,
    transactionGateway,
    protocolCallRelayer,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreateCommentRequest) => {
    const gateway = new CreateCommentCallGateway(apolloClient, transactionFactory, uploader);

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

    await createComment.execute(request);

    return presenter.asResult();
  };
}
