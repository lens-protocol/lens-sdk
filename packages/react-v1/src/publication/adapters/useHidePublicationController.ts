import { PublicationId } from '@lens-protocol/domain/entities';
import { HidePublication } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { HidePublicationGateway } from './HidePublicationGateway';
import { HidePublicationPresenter } from './HidePublicationPresenter';

export type HidePublicationControllerRequest = {
  publicationId: PublicationId;
};

export function useHidePublicationController() {
  const { apolloClient, publicationCacheManager } = useSharedDependencies();

  return async ({ publicationId }: HidePublicationControllerRequest) => {
    const presenter = new HidePublicationPresenter(publicationCacheManager);
    const gateway = new HidePublicationGateway(apolloClient);
    const hidePublication = new HidePublication(gateway, presenter);

    await hidePublication.hide({ publicationId });
  };
}
