import { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type {
  LensProfileManagerRelayErrorFragment,
  ProfileFragment,
  RelaySuccessFragment,
} from '../../graphql/fragments.generated';
import type {
  BlockRequest,
  ChangeProfileManagersRequest,
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
  WhoActedOnPublicationRequest,
} from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  CreateBlockProfilesBroadcastItemResultFragment,
  CreateChangeProfileManagersBroadcastItemResultFragment,
  CreateFollowBroadcastItemResultFragment,
  CreateHandleLinkToProfileBroadcastItemResultFragment,
  CreateHandleUnlinkFromProfileBroadcastItemResultFragment,
  CreateOnchainSetProfileMetadataBroadcastItemResultFragment,
  CreateProfileWithHandleErrorResultFragment,
  CreateSetFollowModuleBroadcastItemResultFragment,
  CreateUnblockProfilesBroadcastItemResultFragment,
  CreateUnfollowBroadcastItemResultFragment,
  ProfileManagerFragment,
  ProfileStatsFragment,
  ProfileStatsQueryVariables,
  Sdk,
  getSdk,
} from './graphql/profile.generated';

/**
 * Profiles are the accounts that create publications and are owned by wallets
 *
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

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
    this.authentication = authentication;
  }

  /**
   * Fetch a single profile.
   *
   * @param request - Request object for the query
   * @returns Profile or null if not found
   *
   * @example
   * ```ts
   * const result = await client.profile.fetch({
   *   forProfileId: '0x01',
   * });
   * ```
   */
  async fetch(request: ProfileRequest): Promise<ProfileFragment | null> {
    const result = await this.sdk.Profile({
      request,
      ...buildImageTransformsFromConfig(this.config.mediaTransforms),
    });

    return result.data.result;
  }

  /**
   * Fetch all profiles by requested criteria
   *
   * @param request - Request object for the query
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.fetchAll({
   *   where: {
   *     ownedBy: ['0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2'],
   *   },
   * });
   * ```
   */
  async fetchAll(request: ProfilesRequest): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Profiles({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetches a profile's stats
   *
   * @param variables - Object defining all variables for the query
   * @returns Profile stats or undefined if not found
   *
   * @example
   * ```ts
   * const result = await client.profile.stats({
   *   request: {
   *     forProfileId: '0x01',
   *   },
   * });
   * ```
   */
  async stats(variables: ProfileStatsQueryVariables): Promise<ProfileStatsFragment | undefined> {
    const {
      request,
      profileStatsArg = {
        forApps: this.config.forApps,
      },
      profileStatsCountOpenActionArgs = { anyOf: [] },
    } = variables;

    const result = await this.sdk.ProfileStats({
      request,
      profileStatsArg,
      profileStatsCountOpenActionArgs,
    });

    return result.data.result?.stats;
  }

  /**
   * Fetches addresses of profile's managers
   *
   * @param request - Request object for the query
   * @returns Profile managers wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.managers({
   *   for: '0x01',
   * });
   * ```
   */
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

  /**
   * Fetch all recommended profiles
   *
   * @param request - Request object for the query
   * @returns Array of recommended profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.recommendations({
   *   for: '0x01',
   * });
   * ```
   */
  async recommendations(
    request: ProfileRecommendationsRequest,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ProfileRecommendations({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Dismiss profiles from the recommended list
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.profile.dismissRecommended({
   *   dismiss: ['0x01', '0x02', '0x03'],
   * });
   * ```
   */
  async dismissRecommended(
    request: DismissRecommendedProfilesRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.DismissRecommendedProfiles({ request }, headers);
    });
  }

  async following(request: FollowingRequest): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Following({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });

      return result.data.result;
    }, request);
  }

  async followers(request: FollowersRequest): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Followers({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch mutual followers between two profiles
   *
   * @param request - Request object for the query
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.mutualFollowers({
   *   observer: '0x01',
   *   viewing: '0x02',
   * });
   * ```
   */
  async mutualFollowers(
    request: MutualFollowersRequest,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.MutualFollowers({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch profiles that acted on a publication
   *
   * @param request - Request object for the query
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.whoActedOnPublication({
   *  on: '0x0635-0x0f',
   * });
   * ```
   */
  async whoActedOnPublication(
    request: WhoActedOnPublicationRequest,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.WhoActedOnPublication({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });

      return result.data.result;
    }, request);
  }

  /**
   * NOT IMPLEMENTED ON THE API SIDE
   */
  // async claim(
  //   request: ClaimProfileRequest,
  // ): PromiseResult<
  //   RelaySuccessFragment | CreateProfileWithHandleErrorResultFragment,
  //   CredentialsExpiredError | NotAuthenticatedError
  // > {
  //   return requireAuthHeaders(this.authentication, async (headers) => {
  //     const result = await this.sdk.ClaimProfile({ request }, headers);
  //     return result.data.result;
  //   });
  // }

  /**
   * Create a new profile
   *
   * @param request - Request object for the mutation
   * @returns Status of the transaction
   *
   * @example
   * ```ts
   * const result = await client.profile.create({
   *  handle: 'handle',
   *  to: '0x1234567890123456789012345678901234567890',
   * });
   * ```
   */
  async create(
    request: CreateProfileWithHandleRequest,
  ): Promise<RelaySuccessFragment | CreateProfileWithHandleErrorResultFragment> {
    const result = await this.sdk.CreateProfileWithHandle({ request });
    return result.data.result;
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

  async createOnchainSetProfileMetadataTypedData(
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

  async changeProfileManagers(
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

  async linkHandle(
    request: HandleLinkToProfileRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.HandleLinkToProfile({ request }, headers);
    });
  }

  async createLinkHandleTypedData(
    request: HandleLinkToProfileRequest,
  ): PromiseResult<
    CreateHandleLinkToProfileBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateHandleLinkToProfileTypedData({ request }, headers);

      return result.data.result;
    });
  }

  async unlinkHandle(
    request: HandleUnlinkFromProfileRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.HandleUnlinkFromProfile({ request }, headers);
    });
  }

  async createUnlinkHandleTypedData(
    request: HandleUnlinkFromProfileRequest,
  ): PromiseResult<
    CreateHandleUnlinkFromProfileBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateHandleUnlinkFromProfileTypedData({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Add interests to a profile.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * import { ProfileInterestTypes } from '@lens-protocol/client';
   *
   * await client.profile.addInterests({
   *   interests: [ProfileInterestTypes.Technology],
   * });
   * ```
   */
  async addInterests(
    request: ProfileInterestsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.AddProfileInterests({ request }, headers);
    });
  }

  /**
   * Remove interests from a profile.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * import { ProfileInterestTypes } from '@lens-protocol/client';
   *
   * await client.profile.removeInterests({
   *   interests: [ProfileInterestTypes.Technology],
   * });
   * ```
   */
  async removeInterests(
    request: ProfileInterestsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.RemoveProfileInterests({ request }, headers);
    });
  }
}
