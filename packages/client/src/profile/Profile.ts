import type { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { testHeaderWrapper } from '../__helpers__/testHeaderWrapper';
import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type { InferResultType } from '../consts/types';
import type {
  FollowerFragment,
  FollowingFragment,
  ProfileFragment,
  RelayerResultFragment,
  RelayErrorFragment,
} from '../graphql/fragments.generated';
import type {
  AddProfileInterestsRequest,
  BurnProfileRequest,
  CreateProfileRequest,
  CreatePublicSetProfileMetadataUriRequest,
  CreateSetDefaultProfileRequest,
  CreateSetFollowModuleRequest,
  CreateSetFollowNftUriRequest,
  DismissRecommendedProfilesRequest,
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
  RecommendedProfileOptions,
  RemoveProfileInterestsRequest,
  SetDispatcherRequest,
  SingleProfileQueryRequest,
  TypedDataOptions,
  UnfollowRequest,
  UpdateProfileImageRequest,
} from '../graphql/types.generated';
import {
  buildPaginatedQueryResult,
  PaginatedResult,
  provideAuthHeaders,
  requireAuthHeaders,
} from '../helpers';
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

export class Profile {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client, testHeaderWrapper);
    this.authentication = authentication;
  }

  async fetch(
    request: SingleProfileQueryRequest,
    observerId?: string,
  ): Promise<ProfileFragment | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Profile(
        {
          request,
          observerId,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async stats(
    request: SingleProfileQueryRequest,
    sources: string[],
  ): Promise<ProfileStatsFragment | undefined> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ProfileStats(
        {
          request,
          sources,
        },
        headers,
      );

      return result.data.result?.stats;
    });
  }

  async fetchAll(
    request: ProfileQueryRequest,
    observerId?: string,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Profiles(
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

  async allRecommended(
    options: RecommendedProfileOptions = {},
    observerId?: string,
  ): Promise<ProfileFragment[]> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.RecommendedProfiles(
        {
          options,
          observerId,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async dismissRecommended(
    request: DismissRecommendedProfilesRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.DismissRecommendedProfiles({ request }, headers);
    });
  }

  async mutualFollowers(
    request: MutualFollowersProfilesQueryRequest,
    observerId?: string,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.MutualFollowersProfiles(
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

  async doesFollow(request: DoesFollowRequest): Promise<DoesFollowResponse[]> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.DoesFollow(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async allFollowing(
    request: FollowingRequest,
    observerId?: string,
  ): Promise<PaginatedResult<FollowingFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Following(
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

  async allFollowers(
    request: FollowersRequest,
    observerId?: string,
  ): Promise<PaginatedResult<FollowerFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Followers(
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

  async followerNftOwnedTokenIds(
    request: FollowerNftOwnedTokenIdsRequest,
  ): Promise<FollowerNftOwnedTokenIds | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.FollowerNftOwnedTokenIds(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async create(
    request: CreateProfileRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    request: UpdateProfileImageRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateSetProfileImageURIViaDispatcher({ request }, headers);

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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return requireAuthHeaders(this.authentication, async (headers) => {
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
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ProfileInterests({}, headers);

      return result.data.result;
    });
  }

  async addInterests(
    request: AddProfileInterestsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.AddProfileInterest({ request }, headers);
    });
  }

  async removeInterests(
    request: RemoveProfileInterestsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.RemoveProfileInterest({ request }, headers);
    });
  }
}
