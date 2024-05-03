import { ProfileInterestTypes } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { IProfileInterestsPresenter } from '@lens-protocol/domain/use-cases/profile';

import { IProfileCacheManager } from './IProfileCacheManager';
import { ProfileInterestsRequest } from './ProfileInterestsGateway';

export class ProfileInterestsPresenter implements IProfileInterestsPresenter<ProfileInterestTypes> {
  constructor(
    private readonly profileCacheManager: IProfileCacheManager,
    private readonly profileId: ProfileId,
  ) {}

  async add(request: ProfileInterestsRequest) {
    this.profileCacheManager.update(this.profileId, (current) => {
      return {
        ...current,
        interests: [...current.interests, ...request.interests],
      };
    });
  }

  async remove(request: ProfileInterestsRequest) {
    this.profileCacheManager.update(this.profileId, (current) => {
      return {
        ...current,
        interests: current.interests.filter(
          (interest) => !request.interests.includes(interest as ProfileInterestTypes),
        ),
      };
    });
  }
}
