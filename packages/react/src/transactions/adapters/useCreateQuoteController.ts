import { CreateQuote, CreateQuoteRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  DelegableSigning,
  SubsidizeOffChain,
  SignedOnChain,
  TransactionData,
  PaidTransaction,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { NewPublicationPresenter } from './NewPublicationPresenter';
import { CreateMomokaQuoteGateway } from './publications/CreateMomokaQuoteGateway';
import { CreateOnChainQuoteGateway } from './publications/CreateOnChainQuoteGateway';

export function useCreateQuoteController() {
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

  return async (request: CreateQuoteRequest) => {
    const presenter = new NewPublicationPresenter((tx: TransactionData<CreateQuoteRequest>) =>
      publicationCacheManager.fetchNewQuote(tx),
    );

    const onChainGateway = new CreateOnChainQuoteGateway(
      config,
      providerFactory,
      apolloClient,
      transactionFactory,
    );

    const onChainQuote = new SignedOnChain(
      activeWallet,
      transactionGateway,
      onChainGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableOnChainQuote = new DelegableSigning(
      onChainQuote,
      onChainGateway,
      transactionQueue,
      presenter,
    );

    const offChainGateway = new CreateMomokaQuoteGateway(apolloClient, transactionFactory);

    const momokaQuote = new SubsidizeOffChain(
      activeWallet,
      offChainGateway,
      momokaRelayer,
      transactionQueue,
      presenter,
    );

    const delegableMomokaQuote = new DelegableSigning(
      momokaQuote,
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

    const createQuote = new CreateQuote(
      delegableOnChainQuote,
      delegableMomokaQuote,
      paidOnChainQuote,
    );

    await createQuote.execute(request);

    return presenter.asResult();
  };
}
