import { isCommentPublication } from '@lens-protocol/api-bindings';
import {
  ITogglablePropertyPresenter,
  TogglePropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

import { HideCommentRequest } from './HideCommentGateway';
import { IPublicationCacheManager } from './IPublicationCacheManager';

export class HideCommentPresenter implements ITogglablePropertyPresenter<HideCommentRequest> {
  constructor(private readonly publicationCacheManager: IPublicationCacheManager) {}

  // hide
  async add({ publicationId }: TogglePropertyRequest) {
    this.publicationCacheManager.update(publicationId, (current) => {
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
  async remove({ publicationId }: TogglePropertyRequest) {
    this.publicationCacheManager.update(publicationId, (current) => {
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
