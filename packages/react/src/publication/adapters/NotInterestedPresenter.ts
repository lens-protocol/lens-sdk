import { isPrimaryPublication } from '@lens-protocol/api-bindings';
import { ITogglablePublicationPropertyPresenter } from '@lens-protocol/domain/use-cases/publications';

import { IPublicationCacheManager } from './IPublicationCacheManager';
import { NotInterestedRequest } from './NotInterestedGateway';

export class NotInterestedPresenter implements ITogglablePublicationPropertyPresenter {
  constructor(private readonly publicationCacheManager: IPublicationCacheManager) {}

  // add
  async on({ id }: NotInterestedRequest) {
    this.publicationCacheManager.update(id, (current) => {
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

  // remove
  async off({ id }: NotInterestedRequest) {
    this.publicationCacheManager.update(id, (current) => {
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
