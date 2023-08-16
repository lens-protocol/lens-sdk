import { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type {
  LensProfileManagerRelayErrorFragment,
  ProfileFragment,
  RelaySuccessFragment,
} from '../graphql/fragments.generated';
import type {
  BlockRequest,
  ChangeProfileManagersRequest,
  ClaimProfileRequest,
  CreateProfileRequest,
  DismissRecommendedProfilesRequest,
  FollowRequest,
  FollowingRequest,
  MutualFollowersRequest,
  ProfileInterestsRequest,
  ProfileManagersRequest,
  ProfileRecommendationsRequest,
  ProfileRequest,
  ProfilesRequest,
  SetFollowModuleRequest,
  SetProfileImageRequest,
  SetProfileMetadataRequest,
  TypedDataOptions,
  UnblockRequest,
  UnfollowRequest,
} from '../graphql/types.generated';
import {
  PaginatedResult,
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  provideAuthHeaders,
  requireAuthHeaders,
} from '../helpers';
import {
  CreateBlockProfileBroadcastItemResultFragment,
  CreateChangeProfileManagersBroadcastItemResultFragment,
  CreateFollowBroadcastItemResultFragment,
  CreateProfileErrorResultFragment,
  CreateSetFollowModuleBroadcastItemResultFragment,
  CreateSetProfileImageBroadcastItemResultFragment,
  CreateSetProfileMetadataBroadcastItemResultFragment,
  CreateUnblockProfileBroadcastItemResultFragment,
  CreateUnfollowBroadcastItemResultFragment,
  getSdk,
  ProfileManagerFragment,
  Sdk,
} from './graphql/profile.generated';

/**
 * @group LensClient Modules
 */
export class Profile {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(
    private readonly config: LensConfig,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fetch(request: ProfileRequest): Promise<ProfileFragment | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Profile(
        {
          request,
          ...buildImageTransformsFromConfig(this.config.mediaTransforms),
        },
        headers,
      );

      return result.data.result;
    });
  }

  async fetchAll(request: ProfilesRequest): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Profiles(
          {
            request: currRequest,
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  async managers(
    request: ProfileManagersRequest,
  ): Promise<PaginatedResult<ProfileManagerFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.ProfileManagers(
          {
            request: currRequest,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  async recommendations(
    request: ProfileRecommendationsRequest,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.ProfileRecommendations(
          {
            request: currRequest,
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  async following(request: FollowingRequest): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Following(
          {
            request: currRequest,
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  async mutualFollowers(
    request: MutualFollowersRequest,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.MutualFollowers(
          {
            request: currRequest,
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  async claim(
    request: ClaimProfileRequest,
  ): PromiseResult<
    RelaySuccessFragment | CreateProfileErrorResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ClaimProfile({ request }, headers);
      return result.data.result;
    });
  }

  async create(
    request: CreateProfileRequest,
  ): PromiseResult<
    RelaySuccessFragment | CreateProfileErrorResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateProfile({ request }, headers);
      return result.data.result;
    });
  }

  async addInterests(
    request: ProfileInterestsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.AddProfileInterests({ request }, headers);
    });
  }

  async removeInterests(
    request: ProfileInterestsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.RemoveProfileInterests({ request }, headers);
    });
  }

  async setMetadata(
    request: SetProfileMetadataRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.SetProfileMetadata({ request }, headers);
      return result.data.result;
    });
  }

  async setImage(
    request: SetProfileImageRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.SetProfileImageURI({ request }, headers);
      return result.data.result;
    });
  }

  async setManager(
    request: ChangeProfileManagersRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.SetProfileManager({ request }, headers);
      return result.data.result;
    });
  }

  async block(
    request: BlockRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Block({ request }, headers);
      return result.data.result;
    });
  }

  async unblock(
    request: UnblockRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Unblock({ request }, headers);
      return result.data.result;
    });
  }

  async follow(
    request: FollowRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Follow({ request }, headers);
      return result.data.result;
    });
  }

  async unfollow(
    request: UnfollowRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Unfollow({ request }, headers);
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

  async createSetProfileMetadataTypedData(
    request: SetProfileMetadataRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateSetProfileMetadataBroadcastItemResultFragment,
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

  async createSetProfileImageTypedData(
    request: SetProfileImageRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateSetProfileImageBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateSetProfileImageTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createChangeProfileManagersTypedData(
    request: ChangeProfileManagersRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateChangeProfileManagersBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateChangeProfileManagersTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createBlockProfileTypedData(
    request: BlockRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateBlockProfileBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateBlockProfileTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createUnblockProfileTypedData(
    request: BlockRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateUnblockProfileBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateUnblockProfileTypedData(
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
    CreateFollowBroadcastItemResultFragment,
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
    CreateUnfollowBroadcastItemResultFragment,
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
    request: SetFollowModuleRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateSetFollowModuleBroadcastItemResultFragment,
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
}
