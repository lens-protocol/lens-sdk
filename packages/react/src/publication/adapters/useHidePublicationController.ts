import { HidePublication } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { HidePublicationGateway } from './HidePublicationGateway';
import { HidePublicationPresenter } from './HidePublicationPresenter';

export type HidePublicationControllerRequest = {
  publicationId: string;
};

export function useHidePublicationController() {
  const { apolloClient } = useSharedDependencies();

  return {
    hide: async ({ publicationId }: HidePublicationControllerRequest) => {
      const presenter = new HidePublicationPresenter(apolloClient.cache);
      const gateway = new HidePublicationGateway(apolloClient);
      const hidePublication = new HidePublication(gateway, presenter);

      await hidePublication.hide({ publicationId });
    },
  };
}
