import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import {
  CommonPaginatedResultInfoFragment,
  FollowerFragment,
  FollowingFragment,
  ProfileFragment,
} from '../graphql/fragments.generated';
import {
  DoesFollowRequest,
  DoesFollowResponse,
  FollowerNftOwnedTokenIds,
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

  async fetchAll(
    request: ProfileQueryRequest,
    observerId?: string,
  ): Promise<{
    items: ProfileFragment[];
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.Profiles({
      request,
      observerId,
    });

    return result.data.result;
  }

  async allRecommended(observerId?: string): Promise<ProfileFragment[]> {
    const result = await this.sdk.RecommendedProfiles({
      observerId,
    });

    return result.data.result;
  }

  async mutualFollowers(
    request: MutualFollowersProfilesQueryRequest,
    observerId?: string,
  ): Promise<{ items: ProfileFragment[]; pageInfo: CommonPaginatedResultInfoFragment }> {
    const result = await this.sdk.MutualFollowersProfiles({
      request,
      observerId,
    });

    return result.data.result;
  }

  async doesFollow(request: DoesFollowRequest): Promise<DoesFollowResponse[]> {
    const result = await this.sdk.DoesFollow({
      request,
    });

    return result.data.result;
  }

  async allFollowing(
    request: FollowingRequest,
    observerId?: string,
  ): Promise<{
    items: FollowingFragment[];
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.Following({
      request,
      observerId,
    });

    return result.data.result;
  }

  async allFollowers(
    request: FollowersRequest,
    observerId?: string,
  ): Promise<{
    items: FollowerFragment[];
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.Followers({
      observerId,
      request,
    });

    return result.data.result;
  }

  async followerNftOwnedTokenIds(
    request: FollowerNftOwnedTokenIdsRequest,
  ): Promise<FollowerNftOwnedTokenIds | null> {
    const result = await this.sdk.FollowerNftOwnedTokenIds({
      request,
    });

    return result.data.followerNftOwnedTokenIds;
  }
}
