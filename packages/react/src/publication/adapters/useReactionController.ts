import { Reaction, ReactionRequest } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { ReactionGateway } from './ReactionGateway';
import { ReactionPresenter } from './ReactionPresenter';

export function useReactionController() {
  const { apolloClient, publicationCacheManager } = useSharedDependencies();

  const add = async (request: ReactionRequest) => {
    const presenter = new ReactionPresenter(publicationCacheManager);
    const gateway = new ReactionGateway(apolloClient);
    const reaction = new Reaction(gateway, presenter);

    await reaction.add(request);
  };

  const remove = async (request: ReactionRequest) => {
    const presenter = new ReactionPresenter(publicationCacheManager);
    const gateway = new ReactionGateway(apolloClient);
    const reaction = new Reaction(gateway, presenter);

    await reaction.remove(request);
  };

  return {
    add,
    remove,
  };
}
