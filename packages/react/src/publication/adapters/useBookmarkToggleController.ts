import { ToggleProperty } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { BookmarkRequest, BookmarksGateway } from './BookmarksGateway';
import { BookmarksPresenter } from './BookmarksPresenter';

export function useBookmarkToggleController() {
  const { apolloClient, publicationCacheManager } = useSharedDependencies();

  const add = async (request: BookmarkRequest) => {
    const presenter = new BookmarksPresenter(publicationCacheManager);
    const gateway = new BookmarksGateway(apolloClient);
    const reaction = new ToggleProperty(gateway, presenter);

    await reaction.add(request);
  };

  const remove = async (request: BookmarkRequest) => {
    const presenter = new BookmarksPresenter(publicationCacheManager);
    const gateway = new BookmarksGateway(apolloClient);
    const reaction = new ToggleProperty(gateway, presenter);

    await reaction.remove(request);
  };

  return {
    add,
    remove,
  };
}
