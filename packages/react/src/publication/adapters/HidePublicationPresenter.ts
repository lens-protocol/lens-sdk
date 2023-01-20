import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { IHidePublicationPresenter } from '@lens-protocol/domain/use-cases/publications';

import { PublicationCacheManager } from '../../transactions/adapters/PublicationCacheManager';

export class HidePublicationPresenter implements IHidePublicationPresenter {
  readonly publicationCacheManager: PublicationCacheManager;

  constructor(cache: ApolloCache<NormalizedCacheObject>) {
    this.publicationCacheManager = new PublicationCacheManager(cache);
  }

  present(publicationId: string) {
    this.publicationCacheManager.update(publicationId, (current) => ({ ...current, hidden: true }));
  }
}
