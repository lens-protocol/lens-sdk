import { GraphQLClient } from 'graphql-request';

import { ProfileFragment } from '../graphql/fragments.generated';
import { getSdk as getMutationSdk, Sdk as MutationSdk } from './graphql/mutations.generated';
import { getSdk as getQuerySdk, Sdk as QuerySdk } from './graphql/queries.generated';

export class Profile {
  private readonly querySdk: QuerySdk;
  private readonly mutationSdk: MutationSdk;

  constructor(gqlClient: GraphQLClient) {
    this.querySdk = getQuerySdk(gqlClient);
    this.mutationSdk = getMutationSdk(gqlClient);
  }

  async getProfileById(profileId: string): Promise<ProfileFragment | null> {
    const result = await this.querySdk.Profile({
      request: {
        profileId,
      },
    });

    return result.data.result;
  }

  async getProfileByHandle(handle: string): Promise<ProfileFragment | null> {
    const result = await this.querySdk.Profile({
      request: {
        handle,
      },
    });

    return result.data.result;
  }

  async follow(profileId: string) {
    await this.mutationSdk.CreateFollowTypedData({
      request: {
        follow: [{ profile: profileId }],
      },
    });
  }

  async unfollow(profileId: string) {
    await this.mutationSdk.CreateUnfollowTypedData({
      request: {
        profile: profileId,
      },
    });
  }
}
