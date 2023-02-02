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

  async loadActiveProfileByOwnerAddress(walletAddress: string, profileId?: string) {
    const activeProfile = await this.activeProfileGateway.getActiveProfile();

    if (activeProfile) {
      await this.activeProfilePresenter.presentActiveProfile(activeProfile);
      return;
    }
    const profiles = await this.profileGateway.getAllProfilesByOwnerAddress(walletAddress);

    if (profileId) {
      const profile = profiles.find((requestedProfile) => requestedProfile.id === profileId);

      if (profile) {
        await this.storeAndPresent(profile);

        return;
      }
    }

    const firstProfile = profiles[0];

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
