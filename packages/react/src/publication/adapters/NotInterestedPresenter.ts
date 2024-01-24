import { isPrimaryPublication } from '@lens-protocol/api-bindings';
import {
  ITogglablePropertyPresenter,
  TogglePropertyRequest,
} from '@lens-protocol/domain/use-cases/publications';

import { IPublicationCacheManager } from './IPublicationCacheManager';
import { NotInterestedRequest } from './NotInterestedGateway';

export class NotInterestedPresenter implements ITogglablePropertyPresenter<NotInterestedRequest> {
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
          ...current.operations,
          isNotInterested: false,
        },
      };
    });
  }
}
