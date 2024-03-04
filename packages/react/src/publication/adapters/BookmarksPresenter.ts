import { isPrimaryPublication } from '@lens-protocol/api-bindings';
import { ITogglablePublicationPropertyPresenter } from '@lens-protocol/domain/use-cases/publications';

import { BookmarkRequest } from './BookmarksGateway';
import { IPublicationCacheManager } from './IPublicationCacheManager';

export class BookmarksPresenter implements ITogglablePublicationPropertyPresenter {
  constructor(private readonly publicationCacheManager: IPublicationCacheManager) {}

  // add
  async on({ id }: BookmarkRequest) {
    this.publicationCacheManager.update(id, (current) => {
      if (!isPrimaryPublication(current)) {
        return current;
      }

      return {
        ...current,
        operations: {
          ...current.operations,
          hasBookmarked: true,
        },
      };
    });
  }

  // remove
  async off({ id }: BookmarkRequest) {
    this.publicationCacheManager.update(id, (current) => {
      if (!isPrimaryPublication(current)) {
        return current;
      }

      return {
        ...current,
        operations: {
          ...current.operations,
          hasBookmarked: false,
        },
      };
    });
  }
}
