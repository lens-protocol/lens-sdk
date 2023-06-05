import { invariant } from '@lens-protocol/shared-kernel';

import { ProfileId } from '../../entities';
import { IActiveProfileGateway } from './IActiveProfileGateway';
import { IActiveProfilePresenter } from './IActiveProfilePresenter';
import { IProfileGateway } from './IProfileGateway';

export type SwitchActiveProfileRequest = {
  profileId: ProfileId;
};

export class SwitchActiveProfile {
  constructor(
    private readonly profileGateway: IProfileGateway,
    private readonly activeProfileGateway: IActiveProfileGateway,
    private readonly activeProfilePresenter: IActiveProfilePresenter,
  ) {}

  async switch(request: SwitchActiveProfileRequest) {
    const profile = await this.profileGateway.getProfileById(request.profileId);

    invariant(profile, 'Profile not found');

    await this.activeProfileGateway.setActiveProfile(profile);
    this.activeProfilePresenter.presentActiveProfile(profile);
  }
}
