import { PromiseResult, success } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type {
  LensProfileManagerRelayErrorFragment,
  ProfileFragment,
  ProfileStatsFragment,
  RelaySuccessFragment,
} from '../../graphql/fragments.generated';
import type {
  BlockRequest,
  ChangeProfileManagersRequest,
  ClaimProfileRequest,
  CreateProfileWithHandleRequest,
  DismissRecommendedProfilesRequest,
  FollowRequest,
  FollowersRequest,
  FollowingRequest,
  HandleLinkToProfileRequest,
  HandleUnlinkFromProfileRequest,
  MutualFollowersRequest,
  OnchainSetProfileMetadataRequest,
  ProfileInterestsRequest,
  ProfileManagersRequest,
  ProfileRecommendationsRequest,
  ProfileRequest,
  ProfilesRequest,
  SetFollowModuleRequest,
  TypedDataOptions,
  UnblockRequest,
  UnfollowRequest,
} from '../../graphql/types.generated';
import {
  PaginatedResult,
  ProfileQueryOptions,
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  buildProfileQueryOptions,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  CreateBlockProfilesBroadcastItemResultFragment,
  CreateChangeProfileManagersBroadcastItemResultFragment,
  CreateFollowBroadcastItemResultFragment,
  CreateOnchainSetProfileMetadataBroadcastItemResultFragment,
  CreateProfileWithHandleErrorResultFragment,
  CreateSetFollowModuleBroadcastItemResultFragment,
  CreateUnblockProfilesBroadcastItemResultFragment,
  CreateUnfollowBroadcastItemResultFragment,
  ProfileManagerFragment,
  Sdk,
  getSdk,
} from './graphql/profile.generated';

/**
 * @group LensClient Modules
 */
export class Profile {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;
  private readonly defaultOptions: ProfileQueryOptions;

  constructor(
    private readonly config: LensConfig,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
    this.authentication = authentication;
    this.defaultOptions = buildProfileQueryOptions({
      config,
    });
  }

  async fetch(
    request: ProfileRequest,
    options?: ProfileQueryOptions,
  ): Promise<ProfileFragment | null> {
    const result = await this.sdk.Profile({
      request,
      ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      ...buildProfileQueryOptions({
        config: this.config,
        ...options,
      }),
    });

    return result.data.result;
  }

  async fetchAll(
    request: ProfilesRequest,
    options?: ProfileQueryOptions,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Profiles({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
        ...buildProfileQueryOptions({
          config: this.config,
          ...options,
        }),
      });

      return result.data.result;
    }, request);
  }

  async managers(
    request: ProfileManagersRequest,
  ): Promise<PaginatedResult<ProfileManagerFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ProfileManagers({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  async recommendations(
    request: ProfileRecommendationsRequest,
    options?: ProfileQueryOptions,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ProfileRecommendations({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
        ...buildProfileQueryOptions({
          config: this.config,
          ...options,
        }),
      });

      return result.data.result;
    }, request);
  }

  async following(
    request: FollowingRequest,
    options?: ProfileQueryOptions,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Following({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
        ...buildProfileQueryOptions({
          config: this.config,
          ...options,
        }),
      });

      return result.data.result;
    }, request);
  }

  async followers(
    request: FollowersRequest,
    options?: ProfileQueryOptions,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Followers({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
        ...buildProfileQueryOptions({
          config: this.config,
          ...options,
        }),
      });

      return result.data.result;
    }, request);
  }

  async mutualFollowers(
    request: MutualFollowersRequest,
    options?: ProfileQueryOptions,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.MutualFollowers({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
        ...buildProfileQueryOptions({
          config: this.config,
          ...options,
        }),
      });

      return result.data.result;
    }, request);
  }

  async claim(
    request: ClaimProfileRequest,
  ): PromiseResult<
    RelaySuccessFragment | CreateProfileWithHandleErrorResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ClaimProfile({ request }, headers);
      return result.data.result;
    });
  }

  async createWithHandle(
    request: CreateProfileWithHandleRequest,
  ): PromiseResult<RelaySuccessFragment | CreateProfileWithHandleErrorResultFragment, never> {
    const result = await this.sdk.CreateProfileWithHandle({ request });
    return success(result.data.result);
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

  async setProfileMetadata(
    request: OnchainSetProfileMetadataRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.SetProfileMetadata({ request }, headers);
      return result.data.result;
    });
  }

  async setManager(
    request: ChangeProfileManagersRequest,
  ): PromiseResult<
    CreateChangeProfileManagersBroadcastItemResultFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateChangeProfileManagersTypedData({ request }, headers);
      return result.data.result;
    });
  }

  async setFollowModule(
    request: SetFollowModuleRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.SetFollowModule({ request }, headers);
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

  async stats(
    request: ProfileRequest,
    options: ProfileQueryOptions = this.defaultOptions,
  ): Promise<ProfileStatsFragment | undefined> {
    const result = await this.sdk.Profile({
      request,
      ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      ...options,
    });

    return result.data.result?.stats;
  }

  async createOnChainSetProfileMetadataTypedData(
    request: OnchainSetProfileMetadataRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateOnchainSetProfileMetadataBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateOnchainSetProfileMetadataTypedData(
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

  async createBlockProfilesTypedData(
    request: BlockRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateBlockProfilesBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateBlockProfilesTypedData(
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
    CreateUnblockProfilesBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateUnblockProfilesTypedData(
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

  async linkHandle(
    request: HandleLinkToProfileRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.HandleLinkToProfile({ request }, headers);
    });
  }

  async unlinkHandleFromProfile(
    request: HandleUnlinkFromProfileRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.HandleUnlinkFromProfile({ request }, headers);
    });
  }
}
