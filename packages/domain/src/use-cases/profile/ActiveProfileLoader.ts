import { invariant } from '@lens-protocol/shared-kernel';

import { IActiveProfileGateway } from './IActiveProfileGateway';
import { IActiveProfilePresenter } from './IActiveProfilePresenter';
import { IProfileGateway } from './IProfileGateway';
import { Profile } from '../../entities';

export class ActiveProfileLoader {
  constructor(
    private readonly profileGateway: IProfileGateway,
    private readonly activeProfileGateway: IActiveProfileGateway,
    private readonly activeProfilePresenter: IActiveProfilePresenter,
  ) {}

  async loadActiveProfileByOwnerAddress(walletAddress: string) {
    const activeProfile = await this.activeProfileGateway.getActiveProfile();

    if (activeProfile) {
      await this.activeProfilePresenter.presentActiveProfile(activeProfile);
      return;
    }
    const [firstProfile] = await this.profileGateway.getAllProfilesByOwnerAddress(walletAddress);

    if (firstProfile) {
      await this.storeAndPresent(firstProfile);
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
