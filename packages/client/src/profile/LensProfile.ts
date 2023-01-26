import { LensClient } from '../LensClient';
import { ProfileFragment } from '../graphql/fragments.generated';
import { AllProfilesByOwnerAddressQueryVariables, getSdk, Sdk } from './graphql/queries.generated';

export class LensProfile {
  private readonly sdk: Sdk;

  constructor(lensClient: LensClient) {
    this.sdk = getSdk(lensClient.client);
  }

  async getProfileById({
    profileId,
    observerId,
  }: {
    profileId: string;
    observerId?: string;
  }): Promise<ProfileFragment | null> {
    const result = await this.sdk.Profile({
      request: {
        profileId,
      },
      observerId,
    });

    return result.data.result;
  }

  async getProfileByHandle({
    handle,
    observerId,
  }: {
    handle: string;
    observerId?: string;
  }): Promise<ProfileFragment | null> {
    const result = await this.sdk.Profile({
      request: {
        handle,
      },
      observerId,
    });

    return result.data.result;
  }

  async getDefaultProfile({
    address,
    observerId,
  }: {
    address: string;
    observerId?: string;
  }): Promise<ProfileFragment | null> {
    const result = await this.sdk.DefaultProfile({
      address,
      observerId,
    });

    return result.data.result;
  }

  async getAllProfilesByOwnerAddress(vars: AllProfilesByOwnerAddressQueryVariables) {
    const result = await this.sdk.AllProfilesByOwnerAddress(vars);

    return result.data.result;
  }
}
