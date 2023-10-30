import { CreateQuote, CreateQuoteRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  DelegableSigning,
  SubsidizeOffChain,
  SignedOnChain,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { NewPublicationPresenter } from './NewPublicationPresenter';
import { CreateMomokaQuoteGateway } from './publications/CreateMomokaQuoteGateway';
import { CreateOnChainQuoteGateway } from './publications/CreateOnChainQuoteGateway';

export function useCreateQuoteController() {
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

  return async (request: CreateQuoteRequest) => {
    const presenter = new NewPublicationPresenter((tx: TransactionData<CreateQuoteRequest>) =>
      publicationCacheManager.fetchNewQuote(tx),
    );

    const onChainGateway = new CreateOnChainQuoteGateway(apolloClient, transactionFactory);

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

    const delegableOffChainQuote = new DelegableSigning(
      momokaQuote,
      offChainGateway,
      transactionQueue,
      presenter,
    );

    const createQuote = new CreateQuote(delegableOnChainQuote, delegableOffChainQuote);

    await createQuote.execute(request);

    return presenter.asResult();
  };
}
