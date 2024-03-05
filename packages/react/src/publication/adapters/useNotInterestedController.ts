import { TogglePublicationProperty } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { NotInterestedGateway, NotInterestedRequest } from './NotInterestedGateway';
import { NotInterestedPresenter } from './NotInterestedPresenter';

export function useNotInterestedController() {
  const { apolloClient, publicationCacheManager } = useSharedDependencies();

  const add = async (request: NotInterestedRequest) => {
    const presenter = new NotInterestedPresenter(publicationCacheManager);
    const gateway = new NotInterestedGateway(apolloClient);
    const toggle = new TogglePublicationProperty(gateway, presenter);

    await toggle.on(request);
  };

  const remove = async (request: NotInterestedRequest) => {
    const presenter = new NotInterestedPresenter(publicationCacheManager);
    const gateway = new NotInterestedGateway(apolloClient);
    const toggle = new TogglePublicationProperty(gateway, presenter);

    await toggle.off(request);
  };

  return {
    add,
    remove,
  };
}
