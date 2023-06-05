import { IActiveProfileGateway } from './IActiveProfileGateway';
import { IProfileGateway } from './IProfileGateway';

export class ActiveProfileLoader {
  constructor(
    private readonly profileGateway: IProfileGateway,
    private readonly activeProfileGateway: IActiveProfileGateway,
  ) {}

  async loadActiveProfileByOwnerAddress(walletAddress: string, handle?: string) {
    const activeProfile = await this.activeProfileGateway.getActiveProfile();

    if (activeProfile) {
      return activeProfile;
    }

    const profiles = await this.profileGateway.getAllProfilesByOwnerAddress(walletAddress);
    const profile = handle ? profiles.find((p) => p.handle === handle) : profiles[0];

    if (profile) {
      await this.activeProfileGateway.setActiveProfile(profile);

      return profile;
    }

    return null;
  }
}
