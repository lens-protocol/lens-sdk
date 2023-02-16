import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreateMirror, CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import { ProtocolCallUseCase } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { CreateMirrorCallGateway } from './publication-call-gateways/CreateMirrorCallGateway';

export function useCreateMirrorController() {
  const {
    activeWallet,
    apolloClient,
    transactionFactory,
    transactionGateway,
    protocolCallRelayer,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreateMirrorRequest) => {
    const presenter = new PromiseResultPresenter<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const mirrorCallGateway = new CreateMirrorCallGateway(apolloClient, transactionFactory);

    const signedCreatePost = new ProtocolCallUseCase<CreateMirrorRequest>(
      activeWallet,
      transactionGateway,
      mirrorCallGateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );

    const createMirror = new CreateMirror(
      signedCreatePost,
      mirrorCallGateway,
      transactionQueue,
      presenter,
    );

    await createMirror.execute(request);

    return presenter.asResult();
  };
}
