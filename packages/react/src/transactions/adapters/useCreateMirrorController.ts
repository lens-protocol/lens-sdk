import { CreateMirror, CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  DelegableSigning,
  SubsidizeOffChain,
  SubsidizeOnChain,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { NewPublicationPresenter } from './NewPublicationPresenter';
import { CreateMomokaMirrorGateway } from './publications/CreateMomokaMirrorGateway';
import { CreateOnChainMirrorGateway } from './publications/CreateOnChainMirrorGateway';

export function useCreateMirrorController() {
  const {
    activeWallet,
    apolloClient,
    momokaRelayer,
    onChainRelayer,
    publicationCacheManager,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreateMirrorRequest) => {
    const presenter = new NewPublicationPresenter((tx: TransactionData<CreateMirrorRequest>) =>
      publicationCacheManager.fetchNewMirror(tx),
    );

    const onChainGateway = new CreateOnChainMirrorGateway(apolloClient, transactionFactory);

    const onChainMirror = new SubsidizeOnChain(
      activeWallet,
      transactionGateway,
      onChainGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableOnChainMirror = new DelegableSigning(
      onChainMirror,
      onChainGateway,
      transactionQueue,
      presenter,
    );

    const offChainGateway = new CreateMomokaMirrorGateway(apolloClient, transactionFactory);

    const momokaMirror = new SubsidizeOffChain(
      activeWallet,
      offChainGateway,
      momokaRelayer,
      transactionQueue,
      presenter,
    );

    const delegableOffChainMirror = new DelegableSigning(
      momokaMirror,
      offChainGateway,
      transactionQueue,
      presenter,
    );

    const createMirror = new CreateMirror(delegableOnChainMirror, delegableOffChainMirror);

    await createMirror.execute(request);

    return presenter.asResult();
  };
}
