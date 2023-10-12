import { CreatePost, CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  DelegableSigning,
  SubsidizeOffChain,
  SubsidizeOnChain,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { CreatePostPresenter } from './CreatePostPresenter';
import { CreateMomokaPostGateway } from './publications/CreateMomokaPostGateway';
import { CreateOnChainPostGateway } from './publications/CreateOnChainPostGateway';

export function useCreatePostController() {
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

  return async (request: CreatePostRequest) => {
    const presenter = new CreatePostPresenter(publicationCacheManager);

    const onChainGateway = new CreateOnChainPostGateway(apolloClient, transactionFactory);

    const onChainPost = new SubsidizeOnChain(
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

    const delegableOffChainPost = new DelegableSigning(
      momokaPost,
      offChainGateway,
      transactionQueue,
      presenter,
    );

    const createPost = new CreatePost(delegableOnChainPost, delegableOffChainPost);

    await createPost.execute(request);

    return presenter.asResult();
  };
}
