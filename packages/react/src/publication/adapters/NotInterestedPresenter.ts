import { isPrimaryPublication } from '@lens-protocol/api-bindings';
import {
  ITogglablePropertyPresenter,
  TogglePropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

import { PublicationCacheManager } from '../infrastructure/PublicationCacheManager';
import { NotInterestedRequest } from './NotInterestedGateway';

export class NotInterestedPresenter implements ITogglablePropertyPresenter<NotInterestedRequest> {
  constructor(private readonly publicationCacheManager: PublicationCacheManager) {}

  async add({ publicationId }: TogglePropertyRequest) {
    this.publicationCacheManager.update(publicationId, (current) => {
      if (!isPrimaryPublication(current)) {
        return current;
      }

      return {
        ...current,
        operations: {
          ...current.operations,
          isNotInterested: true,
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
          isNotInterested: false,
        },
      };
    });
  }
}
