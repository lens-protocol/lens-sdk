import { isMirrorPublication } from '@lens-protocol/api-bindings';
import {
  ITogglablePropertyPresenter,
  TogglePropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

import { PublicationCacheManager } from '../../transactions/adapters/PublicationCacheManager';
import { BookmarkRequest } from './BookmarksGateway';

export class BookmarksPresenter implements ITogglablePropertyPresenter<BookmarkRequest> {
  constructor(private readonly publicationCacheManager: PublicationCacheManager) {}

  async add({ publicationId }: TogglePropertyRequest) {
    this.publicationCacheManager.update(publicationId, (current) => {
      if (isMirrorPublication(current)) {
        return current;
      }

      return {
        ...current,
        bookmarked: true,
      };
    });
  }

  async remove({ publicationId }: TogglePropertyRequest) {
    this.publicationCacheManager.update(publicationId, (current) => {
      if (isMirrorPublication(current)) {
        return current;
      }

      return {
        ...current,
        bookmarked: false,
      };
    });
  }
}
