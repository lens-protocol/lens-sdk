import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import { ProfileFragment } from '../graphql/fragments.generated';
import {
  DoesFollowRequest,
  FollowerNftOwnedTokenIdsRequest,
  FollowersRequest,
  FollowingRequest,
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

    return result.data.result;
  }

  async allRecommended(observerId?: string) {
    const result = await this.sdk.RecommendedProfiles({
      observerId,
    });

    return result.data.result;
  }

  async mutualFollowers(request: MutualFollowersProfilesQueryRequest, observerId?: string) {
    const result = await this.sdk.MutualFollowersProfiles({
      request,
      observerId,
    });

    return result.data.result;
  }

  async doesFollow(request: DoesFollowRequest) {
    const result = await this.sdk.DoesFollow({
      request,
    });

    return result.data.result;
  }

  async allFollowing(request: FollowingRequest, observerId?: string) {
    const result = await this.sdk.Following({
      request,
      observerId,
    });

    return result.data.result;
  }

  async allFollowers(request: FollowersRequest, observerId?: string) {
    const result = await this.sdk.Followers({
      observerId,
      request,
    });

    return result.data.result;
  }

  async followerNftOwnedTokenIds(request: FollowerNftOwnedTokenIdsRequest) {
    const result = await this.sdk.FollowerNftOwnedTokenIds({
      request,
    });

    return result.data.followerNftOwnedTokenIds;
  }
}
