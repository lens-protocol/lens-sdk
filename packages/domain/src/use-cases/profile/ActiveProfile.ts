import { invariant } from '@lens-protocol/shared-kernel';

import { Profile } from '../../entities';
import { IActiveProfilePresenter } from './IActiveProfilePresenter';

export interface IProfileGateway {
  getAllProfilesByOwnerAddress(address: string): Promise<Profile[]>;

  getProfileByHandle(handle: string): Promise<Profile | null>;
}

export interface IActiveProfileGateway {
  setActiveProfile(profile: Profile): Promise<void>;
  getActiveProfile(): Promise<Profile | null>;
  reset(): Promise<void>;
}

export class ActiveProfile {
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

  async requireActiveProfile(): Promise<Profile> {
    const activeProfile = await this.activeProfileGateway.getActiveProfile();

    invariant(activeProfile, 'Active profile should be defined');

    return activeProfile;
  }

  private async storeAndPresent(profile: Profile) {
    await this.activeProfileGateway.setActiveProfile(profile);
    await this.activeProfilePresenter.presentActiveProfile(profile);
  }
}
