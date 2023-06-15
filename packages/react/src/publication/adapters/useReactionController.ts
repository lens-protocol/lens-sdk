import { Reaction, ReactionRequest } from '@lens-protocol/domain/use-cases/publications';
import { useMemo } from 'react';

import { useSharedDependencies } from '../../shared';
import { ReactionGateway } from './ReactionGateway';
import { ReactionPresenter } from './ReactionPresenter';

export function useReactionController() {
  const { apolloClient, publicationCacheManager } = useSharedDependencies();

  // keep presenter state between renders
  const presenter = useMemo(
    () => new ReactionPresenter(publicationCacheManager),
    [publicationCacheManager],
  );

  const add = async (request: ReactionRequest) => {
    const gateway = new ReactionGateway(apolloClient);
    const reaction = new Reaction(gateway, presenter);

    await reaction.add(request);
  };

  const remove = async (request: ReactionRequest) => {
    const gateway = new ReactionGateway(apolloClient);
    const reaction = new Reaction(gateway, presenter);

    await reaction.remove(request);
  };

  return {
    add,
    remove,
  };
}
