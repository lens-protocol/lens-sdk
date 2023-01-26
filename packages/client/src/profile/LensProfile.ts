import { LensClient } from '../LensClient';
import { ProfileFragment } from '../graphql/fragments.generated';
import { AllProfilesByOwnerAddressQueryVariables, getSdk, Sdk } from './graphql/queries.generated';

export class LensProfile {
  private readonly sdk: Sdk;

  constructor(lensClient: LensClient) {
    this.sdk = getSdk(lensClient.client);
  }

  async getProfileById(profileId: string): Promise<ProfileFragment | null> {
    const result = await this.sdk.Profile({
      request: {
        profileId,
      },
    });

    return result.data.result;
  }

  async getProfileByHandle(handle: string): Promise<ProfileFragment | null> {
    const result = await this.sdk.Profile({
      request: {
        handle,
      },
    });

    return result.data.result;
  }

  async getDefaultProfile(address: string): Promise<ProfileFragment | null> {
    const result = await this.sdk.DefaultProfile({
      address,
    });

    return result.data.result;
  }

  async getAllProfilesByOwnerAddress(vars: AllProfilesByOwnerAddressQueryVariables) {
    const result = await this.sdk.AllProfilesByOwnerAddress(vars);

    return result.data.result;
  }
}
