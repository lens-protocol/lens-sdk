import { CreatePost, CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  DelegableSigning,
  SubsidizeOffChain,
  SignedOnChain,
  TransactionData,
  PaidTransaction,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { NewPublicationPresenter } from './NewPublicationPresenter';
import { CreateMomokaPostGateway } from './publications/CreateMomokaPostGateway';
import { CreateOnChainPostGateway } from './publications/CreateOnChainPostGateway';

export function useCreatePostController() {
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

  return async (request: CreatePostRequest) => {
    const presenter = new NewPublicationPresenter((tx: TransactionData<CreatePostRequest>) =>
      publicationCacheManager.fetchNewPost(tx),
    );

    const onChainGateway = new CreateOnChainPostGateway(
      config,
      providerFactory,
      apolloClient,
      transactionFactory,
    );

    const onChainPost = new SignedOnChain(
      activeWallet,
      transactionGateway,
      onChainGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableOnChainPost = new DelegableSigning(
      onChainPost,
      onChainGateway,
      transactionQueue,
      presenter,
    );

    const offChainGateway = new CreateMomokaPostGateway(apolloClient, transactionFactory);

    const momokaPost = new SubsidizeOffChain(
      activeWallet,
      offChainGateway,
      momokaRelayer,
      transactionQueue,
      presenter,
    );

    const delegableMomokaPost = new DelegableSigning(
      momokaPost,
      offChainGateway,
      transactionQueue,
      presenter,
    );

    const paidOnChainPost = new PaidTransaction(
      activeWallet,
      onChainGateway,
      presenter,
      transactionQueue,
    );

    const createPost = new CreatePost(delegableOnChainPost, delegableMomokaPost, paidOnChainPost);

    await createPost.execute(request);

    return presenter.asResult();
  };
}
