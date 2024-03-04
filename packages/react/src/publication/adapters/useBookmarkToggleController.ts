import { TogglePublicationProperty } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { BookmarkRequest, BookmarksGateway } from './BookmarksGateway';
import { BookmarksPresenter } from './BookmarksPresenter';

export function useBookmarkToggleController() {
  const { apolloClient, publicationCacheManager } = useSharedDependencies();

  const add = async (request: BookmarkRequest) => {
    const presenter = new BookmarksPresenter(publicationCacheManager);
    const gateway = new BookmarksGateway(apolloClient);
    const toggle = new TogglePublicationProperty(gateway, presenter);

    await toggle.on(request);
  };

  const remove = async (request: BookmarkRequest) => {
    const presenter = new BookmarksPresenter(publicationCacheManager);
    const gateway = new BookmarksGateway(apolloClient);
    const toggle = new TogglePublicationProperty(gateway, presenter);

    await toggle.off(request);
  };

  return {
    add,
    remove,
  };
}
