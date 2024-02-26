import { ToggleProperty } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { HideCommentGateway, HideCommentRequest } from './HideCommentGateway';
import { HideCommentPresenter } from './HideCommentPresenter';

export function useHideCommentController() {
  const { apolloClient, publicationCacheManager } = useSharedDependencies();

  const hide = async (request: HideCommentRequest) => {
    const presenter = new HideCommentPresenter(publicationCacheManager);
    const gateway = new HideCommentGateway(apolloClient);
    const comment = new ToggleProperty(gateway, presenter);

    await comment.add(request);
  };

  const unhide = async (request: HideCommentRequest) => {
    const presenter = new HideCommentPresenter(publicationCacheManager);
    const gateway = new HideCommentGateway(apolloClient);
    const reaction = new ToggleProperty(gateway, presenter);

    await reaction.remove(request);
  };

  return {
    hide,
    unhide,
  };
}
