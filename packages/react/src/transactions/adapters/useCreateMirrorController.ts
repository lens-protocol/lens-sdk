import { CreateMirror, CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  DelegableSigning,
  SubsidizeOffChain,
  SignedOnChain,
  TransactionData,
  PaidTransaction,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { NewPublicationPresenter } from './NewPublicationPresenter';
import { CreateMomokaMirrorGateway } from './publications/CreateMomokaMirrorGateway';
import { CreateOnChainMirrorGateway } from './publications/CreateOnChainMirrorGateway';

export function useCreateMirrorController() {
  const {
    activeWallet,
    apolloClient,
    config,
    momokaRelayer,
    onChainRelayer,
    providerFactory,
    publicationCacheManager,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: CreateMirrorRequest) => {
    const presenter = new NewPublicationPresenter((tx: TransactionData<CreateMirrorRequest>) =>
      publicationCacheManager.fetchNewMirror(tx),
    );

    const onChainGateway = new CreateOnChainMirrorGateway(
      config,
      providerFactory,
      apolloClient,
      transactionFactory,
    );

    const onChainMirror = new SignedOnChain(
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

    const delegableMomokaMirror = new DelegableSigning(
      momokaMirror,
      offChainGateway,
      transactionQueue,
      presenter,
    );

    const paidOnChainQuote = new PaidTransaction(
      activeWallet,
      onChainGateway,
      presenter,
      transactionQueue,
    );

    const createMirror = new CreateMirror(
      delegableOnChainMirror,
      delegableMomokaMirror,
      paidOnChainQuote,
    );

    await createMirror.execute(request);

    return presenter.asResult();
  };
}
