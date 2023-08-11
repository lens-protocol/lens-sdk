import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { CreateMirror, CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  DelegableSigning,
  SubsidizeOffChain,
  SubsidizeOnChain,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { CreateOffChainMirrorGateway } from './publication-call-gateways/CreateOffChainMirrorGateway';
import { CreateOnChainMirrorGateway } from './publication-call-gateways/CreateOnChainMirrorGateway';

export function useCreateMirrorController() {
  const {
    activeWallet,
    apolloClient,
    transactionFactory,
    transactionGateway,
    offChainRelayer,
    onChainRelayer,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreateMirrorRequest) => {
    const presenter = new TransactionResultPresenter<
      CreateMirrorRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const onChainGateway = new CreateOnChainMirrorGateway(apolloClient, transactionFactory);

    const onChainMirror = new SubsidizeOnChain<CreateMirrorRequest>(
      activeWallet,
      transactionGateway,
      onChainGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableOnChainMirror = new DelegableSigning<CreateMirrorRequest>(
      onChainMirror,
      onChainGateway,
      transactionQueue,
      presenter,
    );

    const offChainGateway = new CreateOffChainMirrorGateway(apolloClient, transactionFactory);

    const offChainMirror = new SubsidizeOffChain<CreateMirrorRequest>(
      activeWallet,
      offChainGateway,
      offChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableOffChainMirror = new DelegableSigning<CreateMirrorRequest>(
      offChainMirror,
      offChainGateway,
      transactionQueue,
      presenter,
    );

    const createMirror = new CreateMirror(delegableOnChainMirror, delegableOffChainMirror);

    await createMirror.execute(request);
    return presenter.asResult();
  };
}
