import { invariant } from '@lens-protocol/shared-kernel';

import { ProfileId } from '../../entities';
import { ISessionPresenter } from '../lifecycle/ISessionPresenter';
import { IActiveProfileGateway } from './IActiveProfileGateway';
import { IProfileGateway } from './IProfileGateway';

export type SwitchActiveProfileRequest = {
  profileId: ProfileId;
};

export class SwitchActiveProfile {
  constructor(
    private readonly profileGateway: IProfileGateway,
    private readonly activeProfileGateway: IActiveProfileGateway,
    private readonly sessionPresenter: ISessionPresenter,
  ) {}

  async switch(request: SwitchActiveProfileRequest) {
    const profile = await this.profileGateway.getProfileById(request.profileId);

    invariant(profile, 'Profile not found');

    await this.activeProfileGateway.setActiveProfile(profile);
    this.sessionPresenter.switchProfile(profile);
  }
}
