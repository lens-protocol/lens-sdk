import { ITogglableProfilePropertyPresenter } from '@lens-protocol/domain/use-cases/profile';

import { IProfileCacheManager } from './IProfileCacheManager';
import { RecommendProfileRequest } from './RecommendProfileGateway';

export class RecommendProfilePresenter implements ITogglableProfilePropertyPresenter {
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  // recommend
  async on({ id }: RecommendProfileRequest) {
    this.profileCacheManager.update(id, (current) => {
      return {
        ...current,
        peerToPeerRecommendedByMe: true,
      };
    });
  }

  // unrecommend
  async off({ id }: RecommendProfileRequest) {
    this.profileCacheManager.update(id, (current) => {
      return {
        ...current,
        peerToPeerRecommendedByMe: false,
      };
    });
  }
}
