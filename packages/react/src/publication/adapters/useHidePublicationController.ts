import { HidePublication } from '@lens-protocol/domain/use-cases/publications';

import { HidePublicationGateway } from './HidePublicationGateway';
import { HidePublicationPresenter } from './HidePublicationPresenter';
import { useSharedDependencies } from '../../shared';

export type HidePublicationControllerRequest = {
  publicationId: string;
};

export function useHidePublicationController() {
  const { apolloClient, publicationCacheManager } = useSharedDependencies();

  return {
    hide: async ({ publicationId }: HidePublicationControllerRequest) => {
      const presenter = new HidePublicationPresenter(publicationCacheManager);
      const gateway = new HidePublicationGateway(apolloClient);
      const hidePublication = new HidePublication(gateway, presenter);

      await hidePublication.hide({ publicationId });
    },
  };
}
