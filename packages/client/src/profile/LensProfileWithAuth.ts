import { LensClient } from '../LensClient';
import { SetDispatcherRequest } from '../graphql/types.generated';
import { getSdk, Sdk } from './graphql/mutations.generated';

export class LensProfileWithAuth {
  private readonly sdk: Sdk;

  constructor(lensClient: LensClient, accessToken: string) {
    const gqlClient = lensClient.client;
    gqlClient.setHeader('authorization', `Bearer ${accessToken}`);

    this.sdk = getSdk(gqlClient);
  }

  async createSetDispatcherTypedData(request: SetDispatcherRequest) {
    const result = await this.sdk.CreateSetDispatcherTypedData({
      request,
    });

    return result.data.result;
  }

  async createFollowTypedData(profileId: string) {
    const result = await this.sdk.CreateFollowTypedData({
      request: {
        follow: [{ profile: profileId }],
      },
    });

    return result.data.result;
  }

  async createUnfollowTypedData(profileId: string) {
    const result = await this.sdk.CreateUnfollowTypedData({
      request: {
        profile: profileId,
      },
    });

    return result.data.result;
  }
}
