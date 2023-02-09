import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import { ProfileFragment } from '../graphql/fragments.generated';
import {
  MutualFollowersProfilesQueryRequest,
  ProfileQueryRequest,
  SingleProfileQueryRequest,
} from '../graphql/types.generated';
import { getSdk, Sdk } from './graphql/queries.generated';

export class Profile {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk(client);
  }

  async fetch(
    request: SingleProfileQueryRequest,
    observerId?: string,
  ): Promise<ProfileFragment | null> {
    const result = await this.sdk.Profile({
      request,
      observerId,
    });

    return result.data.result;
  }

  async fetchAll(request: ProfileQueryRequest, observerId?: string) {
    const result = await this.sdk.Profiles({
      request,
      observerId,
    });

    return result;
  }

  async recommendedProfiles(observerId?: string) {
    const result = await this.sdk.RecommendedProfiles({
      observerId,
    });

    return result;
  }

  async mutualFollowersProfiles(request: MutualFollowersProfilesQueryRequest, observerId?: string) {
    const result = await this.sdk.MutualFollowersProfiles({
      request,
      observerId,
    });

    return result;
  }
}
