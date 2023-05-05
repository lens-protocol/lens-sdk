import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreateMirror, CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError, SubsidizeOnChain } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { CreateMirrorCallGateway } from './publication-call-gateways/CreateMirrorCallGateway';

export function useCreateMirrorController() {
  const {
    activeWallet,
    apolloClient,
    transactionFactory,
    transactionGateway,
    onChainRelayer,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreateMirrorRequest) => {
    const presenter = new PromiseResultPresenter<
      void,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const mirrorCallGateway = new CreateMirrorCallGateway(apolloClient, transactionFactory);

    const signedCreateMirror = new SubsidizeOnChain<CreateMirrorRequest>(
      activeWallet,
      transactionGateway,
      mirrorCallGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const createMirror = new CreateMirror(
      signedCreateMirror,
      mirrorCallGateway,
      transactionQueue,
      presenter,
    );

    await createMirror.execute(request);

    return presenter.asResult();
  };
}
