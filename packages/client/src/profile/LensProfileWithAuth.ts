import { LensClient } from '../LensClient';
import { getSdk, Sdk } from './graphql/mutations.generated';

export class LensProfileWithAuth {
  private readonly sdk: Sdk;

  constructor(lensClient: LensClient, accessToken: string) {
    const gqlClient = lensClient.client;
    gqlClient.setHeader('authorization', `Bearer ${accessToken}`);

    this.sdk = getSdk(gqlClient);
  }

  async follow(profileId: string) {
    await this.sdk.CreateFollowTypedData({
      request: {
        follow: [{ profile: profileId }],
      },
    });
  }

  async unfollow(profileId: string) {
    await this.sdk.CreateUnfollowTypedData({
      request: {
        profile: profileId,
      },
    });
  }
}
