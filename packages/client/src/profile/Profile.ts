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
  AddProfileInterestsRequest,
  BurnProfileRequest,
  CreateProfileRequest,
  CreatePublicSetProfileMetadataUriRequest,
  CreateSetDefaultProfileRequest,
  CreateSetFollowModuleRequest,
  CreateSetFollowNftUriRequest,
  DoesFollowRequest,
  DoesFollowResponse,
  FollowerNftOwnedTokenIds,
  FollowerNftOwnedTokenIdsRequest,
  FollowersRequest,
  FollowingRequest,
  FollowRequest,
  MutualFollowersProfilesQueryRequest,
  PendingApprovalFollowsRequest,
  ProfileQueryRequest,
  RemoveProfileInterestsRequest,
  SetDispatcherRequest,
  SingleProfileQueryRequest,
  TypedDataOptions,
  UnfollowRequest,
  UpdateProfileImageRequest,
} from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers/buildPaginatedQueryResult';
import { execute } from '../helpers/execute';
import {
  CreateBurnProfileTypedDataMutation,
  CreateFollowTypedDataMutation,
  CreateSetDefaultProfileTypedDataMutation,
  CreateSetDispatcherTypedDataMutation,
  CreateSetFollowModuleTypedDataMutation,
  CreateSetFollowNftUriTypedDataMutation,
  CreateSetProfileImageUriTypedDataMutation,
  CreateSetProfileMetadataTypedDataMutation,
  CreateUnfollowTypedDataMutation,
  getSdk,
  ProfileStatsFragment,
  Sdk,
} from './graphql/profile.generated';
import { isValidHandle } from './helpers';

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

  async stats(
    request: SingleProfileQueryRequest,
    sources: string[],
  ): Promise<ProfileStatsFragment | undefined> {
    const result = await this.sdk.ProfileStats({
      request,
      sources,
    });

    return result.data.result?.stats;
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

    return result.data.result;
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

  isValidHandle(handle: string): boolean {
    return isValidHandle(handle);
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

  async createSetDefaultProfileTypedData(
    request: CreateSetDefaultProfileRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    InferResultType<CreateSetDefaultProfileTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateSetDefaultProfileTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createSetProfileMetadataTypedData(
    request: CreatePublicSetProfileMetadataUriRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    InferResultType<CreateSetProfileMetadataTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateSetProfileMetadataTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createSetProfileMetadataViaDispatcher(
    request: CreatePublicSetProfileMetadataUriRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateSetProfileMetadataViaDispatcher({ request }, headers);

      return result.data.result;
    });
  }

  async createSetProfileImageURITypedData(
    request: UpdateProfileImageRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    InferResultType<CreateSetProfileImageUriTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateSetProfileImageURITypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createSetProfileImageURIViaDispatcher(
    request: CreatePublicSetProfileMetadataUriRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateSetProfileMetadataViaDispatcher({ request }, headers);

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

  async createSetFollowModuleTypedData(
    request: CreateSetFollowModuleRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    InferResultType<CreateSetFollowModuleTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateSetFollowModuleTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createSetFollowNFTUriTypedData(
    request: CreateSetFollowNftUriRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    InferResultType<CreateSetFollowNftUriTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateSetFollowNFTUriTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async pendingApprovalFollows(
    request: PendingApprovalFollowsRequest,
    observerId?: string,
  ): PromiseResult<
    PaginatedResult<ProfileFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.PendingApprovalFollows(
          {
            request: currRequest,
            observerId,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  async allInterests(): Promise<string[]> {
    const result = await this.sdk.ProfileInterests();

    return result.data.result;
  }

  async addInterests(
    request: AddProfileInterestsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      await this.sdk.AddProfileInterest({ request }, headers);
    });
  }

  async removeInterests(
    request: RemoveProfileInterestsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      await this.sdk.RemoveProfileInterest({ request }, headers);
    });
  }
}
