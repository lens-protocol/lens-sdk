import { LensClient } from '../LensClient';
import { ProfileFragment } from '../graphql/fragments.generated';
import { getSdk, Sdk } from './graphql/queries.generated';

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
}
