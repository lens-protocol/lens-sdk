import { TogglePublicationProperty } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { HideCommentGateway, HideCommentRequest } from './HideCommentGateway';
import { HideCommentPresenter } from './HideCommentPresenter';

export function useHideCommentController() {
  const { apolloClient, publicationCacheManager } = useSharedDependencies();

  const hide = async (request: HideCommentRequest) => {
    const presenter = new HideCommentPresenter(publicationCacheManager);
    const gateway = new HideCommentGateway(apolloClient);
    const toggle = new TogglePublicationProperty(gateway, presenter);

    await toggle.on(request);
  };

  const unhide = async (request: HideCommentRequest) => {
    const presenter = new HideCommentPresenter(publicationCacheManager);
    const gateway = new HideCommentGateway(apolloClient);
    const toggle = new TogglePublicationProperty(gateway, presenter);

    await toggle.off(request);
  };

  return {
    hide,
    unhide,
  };
}
