import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { TypedDataResult } from '../consts/types';
import {
  CommonPaginatedResultInfoFragment,
  FollowerFragment,
  FollowingFragment,
  ProfileFragment,
  RelayerResultFragment,
  RelayErrorFragment,
} from '../graphql/fragments.generated';
import {
  BurnProfileRequest,
  CreateProfileRequest,
  DoesFollowRequest,
  DoesFollowResponse,
  FollowerNftOwnedTokenIds,
  FollowerNftOwnedTokenIdsRequest,
  FollowersRequest,
  FollowingRequest,
  FollowRequest,
  MutualFollowersProfilesQueryRequest,
  ProfileQueryRequest,
  SetDispatcherRequest,
  SingleProfileQueryRequest,
  TypedDataOptions,
  UnfollowRequest,
} from '../graphql/types.generated';
import { execute } from '../helpers/execute';
import {
  CreateBurnProfileTypedDataMutation,
  CreateFollowTypedDataMutation,
  CreateSetDispatcherTypedDataMutation,
  CreateUnfollowTypedDataMutation,
  getSdk,
  Sdk,
} from './graphql/profile.generated';

export class Profile {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
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

  async create(
    request: CreateProfileRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateProfile(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createSetDispatcherTypedData(
    request: SetDispatcherRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    TypedDataResult<CreateSetDispatcherTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateSetDispatcherTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createBurnProfileTypedData(
    request: BurnProfileRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    TypedDataResult<CreateBurnProfileTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateBurnProfileTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createFollowTypedData(
    request: FollowRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    TypedDataResult<CreateFollowTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateFollowTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }
  async createUnfollowTypedData(
    request: UnfollowRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    TypedDataResult<CreateUnfollowTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateUnfollowTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }
}
