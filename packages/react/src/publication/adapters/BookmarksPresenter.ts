import { isPrimaryPublication } from '@lens-protocol/api-bindings';
import {
  ITogglablePropertyPresenter,
  TogglePropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

import { BookmarkRequest } from './BookmarksGateway';
import { IPublicationCacheManager } from './IPublicationCacheManager';

export class BookmarksPresenter implements ITogglablePropertyPresenter<BookmarkRequest> {
  constructor(private readonly publicationCacheManager: IPublicationCacheManager) {}

  async add({ publicationId }: TogglePropertyRequest) {
    this.publicationCacheManager.update(publicationId, (current) => {
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

  async remove({ publicationId }: TogglePropertyRequest) {
    this.publicationCacheManager.update(publicationId, (current) => {
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
