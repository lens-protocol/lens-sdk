import { invariant } from '@lens-protocol/shared-kernel';

import { Profile } from '../../entities';
import { IActiveProfileGateway } from './IActiveProfileGateway';
import { IActiveProfilePresenter } from './IActiveProfilePresenter';
import { IProfileGateway } from './IProfileGateway';

export class ActiveProfileLoader {
  constructor(
    private readonly profileGateway: IProfileGateway,
    private readonly activeProfileGateway: IActiveProfileGateway,
    private readonly activeProfilePresenter: IActiveProfilePresenter,
  ) {}

  async loadActiveProfileByOwnerAddress(walletAddress: string, handle?: string) {
    const activeProfile = await this.activeProfileGateway.getActiveProfile();

    if (activeProfile) {
      await this.activeProfilePresenter.presentActiveProfile(activeProfile);
      return;
    }
    const profiles = await this.profileGateway.getAllProfilesByOwnerAddress(walletAddress);
    const profile = handle ? profiles.find((p) => p.handle === handle) : profiles[0];

    if (profile) {
      await this.storeAndPresent(profile);
    }
  }

  async loadActiveProfileByHandle(handle: string) {
    const activeProfile = await this.activeProfileGateway.getActiveProfile();

    if (activeProfile?.handle === handle) {
      await this.activeProfilePresenter.presentActiveProfile(activeProfile);
      return;
    }
    const profile = await this.profileGateway.getProfileByHandle(handle);

    invariant(profile, 'Profile not found');

    await this.storeAndPresent(profile);
  }

  private async storeAndPresent(profile: Profile) {
    await this.activeProfileGateway.setActiveProfile(profile);
    await this.activeProfilePresenter.presentActiveProfile(profile);
  }
}
