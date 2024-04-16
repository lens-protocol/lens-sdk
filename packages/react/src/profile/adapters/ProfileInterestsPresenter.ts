import { ProfileInterestTypes } from '@lens-protocol/api-bindings';
import { IProfileInterestsPresenter } from '@lens-protocol/domain/use-cases/profile';

import { IProfileCacheManager } from './IProfileCacheManager';
import { ProfileInterestsRequest } from './ProfileInterestsGateway';

export class ProfileInterestsPresenter implements IProfileInterestsPresenter {
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async add(request: ProfileInterestsRequest) {
    this.profileCacheManager.update(request.profileId, (current) => {
      return {
        ...current,
        interests: [...current.interests, ...request.interests],
      };
    });
  }

  async remove(request: ProfileInterestsRequest) {
    this.profileCacheManager.update(request.profileId, (current) => {
      return {
        ...current,
        interests: current.interests.filter(
          (interest) => !request.interests.includes(interest as ProfileInterestTypes),
        ),
      };
    });
  }
}
