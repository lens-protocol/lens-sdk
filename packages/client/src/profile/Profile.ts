import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { InferResultType } from '../consts/types';
import {
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
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers/buildPaginatedQueryResult';
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
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Profiles({
        request: currRequest,
        observerId,
      });

      return result.data.result;
    }, request);
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
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.MutualFollowersProfiles({
        request: currRequest,
        observerId,
      });

      return result.data.result;
    }, request);
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
  ): Promise<PaginatedResult<FollowingFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Following({
        request: currRequest,
        observerId,
      });

      return result.data.result;
    }, request);
  }

  async allFollowers(
    request: FollowersRequest,
    observerId?: string,
  ): Promise<PaginatedResult<FollowerFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Followers({
        request: currRequest,
        observerId,
      });

      return result.data.result;
    }, request);
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
    InferResultType<CreateSetDispatcherTypedDataMutation>,
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
    InferResultType<CreateBurnProfileTypedDataMutation>,
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
    InferResultType<CreateFollowTypedDataMutation>,
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
    InferResultType<CreateUnfollowTypedDataMutation>,
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
