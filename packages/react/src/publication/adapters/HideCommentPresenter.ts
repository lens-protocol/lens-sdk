import { isCommentPublication } from '@lens-protocol/api-bindings';
import { ITogglablePublicationPropertyPresenter } from '@lens-protocol/domain/use-cases/publications';

import { HideCommentRequest } from './HideCommentGateway';
import { IPublicationCacheManager } from './IPublicationCacheManager';

export class HideCommentPresenter implements ITogglablePublicationPropertyPresenter {
  constructor(private readonly publicationCacheManager: IPublicationCacheManager) {}

  // hide
  async on({ id }: HideCommentRequest) {
    this.publicationCacheManager.update(id, (current) => {
      if (!isCommentPublication(current)) {
        return current;
      }

      return {
        ...current,
        hiddenByAuthor: true,
      };
    });
  }

  // unhide
  async off({ id }: HideCommentRequest) {
    this.publicationCacheManager.update(id, (current) => {
      if (!isCommentPublication(current)) {
        return current;
      }

      return {
        ...current,
        hiddenByAuthor: false,
      };
    });
  }
}
