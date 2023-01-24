import { ProfileFragment, Sdk } from './graphql/generated';

export class Profile {
  constructor(private readonly sdk: Sdk) {}

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
