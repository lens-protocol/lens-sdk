import { CreateComment, CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  DelegableSigning,
  SubsidizeOffChain,
  SignedOnChain,
  TransactionData,
  PaidTransaction,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { NewPublicationPresenter } from './NewPublicationPresenter';
import { CreateMomokaCommentGateway } from './publications/CreateMomokaCommentGateway';
import { CreateOnChainCommentGateway } from './publications/CreateOnChainCommentGateway';

export function useCreateCommentController() {
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

  return async (request: CreateCommentRequest) => {
    const presenter = new NewPublicationPresenter((tx: TransactionData<CreateCommentRequest>) =>
      publicationCacheManager.fetchNewComment(tx),
    );

    const onChainGateway = new CreateOnChainCommentGateway(
      config,
      providerFactory,
      apolloClient,
      transactionFactory,
    );

    const onChainComment = new SignedOnChain(
      activeWallet,
      transactionGateway,
      onChainGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableOnChainComment = new DelegableSigning(
      onChainComment,
      onChainGateway,
      transactionQueue,
      presenter,
    );

    const offChainGateway = new CreateMomokaCommentGateway(apolloClient, transactionFactory);

    const momokaComment = new SubsidizeOffChain(
      activeWallet,
      offChainGateway,
      momokaRelayer,
      transactionQueue,
      presenter,
    );

    const delegableMomokaComment = new DelegableSigning(
      momokaComment,
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

    const createComment = new CreateComment(
      delegableOnChainComment,
      delegableMomokaComment,
      paidOnChainQuote,
    );

    await createComment.execute(request);

    return presenter.asResult();
  };
}
