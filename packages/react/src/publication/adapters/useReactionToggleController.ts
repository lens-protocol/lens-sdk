import { TogglePublicationProperty } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { ReactionRequest, ReactionGateway } from './ReactionGateway';
import { ReactionPresenter } from './ReactionPresenter';

export function useReactionToggleController() {
  const { apolloClient, publicationCacheManager } = useSharedDependencies();

  const add = async (request: ReactionRequest) => {
    const presenter = new ReactionPresenter(publicationCacheManager);
    const gateway = new ReactionGateway(apolloClient);
    const toggle = new TogglePublicationProperty(gateway, presenter);

    await toggle.on(request);
  };

  const remove = async (request: ReactionRequest) => {
    const presenter = new ReactionPresenter(publicationCacheManager);
    const gateway = new ReactionGateway(apolloClient);
    const toggle = new TogglePublicationProperty(gateway, presenter);

    await toggle.off(request);
  };

  return {
    add,
    remove,
  };
}
