import { IHidePublicationPresenter } from '@lens-protocol/domain/use-cases/publications';

import { PublicationCacheManager } from '../../transactions/adapters/PublicationCacheManager';

export class HidePublicationPresenter implements IHidePublicationPresenter {
  constructor(private readonly publicationCacheManager: PublicationCacheManager) {}

  present(publicationId: string) {
    this.publicationCacheManager.update(publicationId, (current) => ({ ...current, hidden: true }));
  }
}
