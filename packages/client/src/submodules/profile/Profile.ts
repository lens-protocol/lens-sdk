import { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
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
  DefaultProfileRequest,
  DismissRecommendedProfilesRequest,
  FollowRequest,
  FollowersRequest,
  FollowingRequest,
  LinkHandleToProfileRequest,
  UnlinkHandleFromProfileRequest,
  MutualFollowersRequest,
  OnchainSetProfileMetadataRequest,
  ProfileActionHistoryRequest,
  ProfileInterestsRequest,
  ProfileManagersRequest,
  ProfileRecommendationsRequest,
  ProfileRequest,
  ProfilesRequest,
  SetDefaultProfileRequest,
  SetFollowModuleRequest,
  TypedDataOptions,
  UnblockRequest,
  UnfollowRequest,
  WhoActedOnPublicationRequest,
} from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildRequestFromConfig,
  buildPaginatedQueryResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  CreateBlockProfilesBroadcastItemResultFragment,
  CreateChangeProfileManagersBroadcastItemResultFragment,
  CreateFollowBroadcastItemResultFragment,
  CreateLinkHandleToProfileBroadcastItemResultFragment,
  CreateUnlinkHandleFromProfileBroadcastItemResultFragment,
  CreateOnchainSetProfileMetadataBroadcastItemResultFragment,
  CreateProfileWithHandleErrorResultFragment,
  CreateSetFollowModuleBroadcastItemResultFragment,
  CreateUnblockProfilesBroadcastItemResultFragment,
  CreateUnfollowBroadcastItemResultFragment,
  ProfileActionHistoryFragment,
  ProfileManagerFragment,
  Sdk,
  getSdk,
} from './graphql/profile.generated';
import { FetchProfileOptions } from './types';

/**
 * Profiles are the accounts that create publications and are owned by wallets
 *
 * @group LensClient Modules
 */
export class Profile {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(
    private readonly context: LensContext,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(context.environment.gqlEndpoint);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
    this.authentication = authentication;
  }

  /**
   * Fetch a single profile.
   *
   * @param request - Request object for the query
   * @param options - Additional options for the query
   * @returns Profile or null if not found
   *
   * @example
   * ```ts
   * const result = await client.profile.fetch({
   *   forProfileId: '0x01',
   * });
   * ```
   */
  async fetch(
    request: ProfileRequest,
    options?: FetchProfileOptions,
  ): Promise<ProfileFragment | null> {
    const result = await this.sdk.Profile({
      request,
      ...buildRequestFromConfig(this.context),
      ...options,
    });

    return result.data.result;
  }

  /**
   * Fetch all profiles by requested criteria.
   *
   * @param request - Request object for the query
   * @param options - Additional options for the query
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
  async fetchAll(
    request: ProfilesRequest,
    options?: FetchProfileOptions,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Profiles({
        request: currRequest,
        ...buildRequestFromConfig(this.context),
        ...options,
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch addresses of profile managers.
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
   * Fetch recommended profiles.
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
        ...buildRequestFromConfig(this.context),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Dismiss profiles from the recommended list.
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

  /**
   * Fetch the default profile for a given address.
   * If no default is explicitly set, it returns the oldest profile owned by the address.
   *
   * @param request - Request object for the query
   * @returns Profile or null if not found
   *
   * @example
   * ```ts
   * const result = await client.profile.fetchDefault({
   *   for: '0x1234567890123456789012345678901234567890',
   * });
   * ```
   */
  async fetchDefault(request: DefaultProfileRequest): Promise<ProfileFragment | null> {
    const result = await this.sdk.DefaultProfile({
      request,
      ...buildRequestFromConfig(this.context),
    });

    return result.data.result;
  }

  /**
   * Set default profile for authenticated address.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.profile.setDefault({
   *   profileId: '0x123',
   * });
   * ```
   */
  async setDefault(
    request: SetDefaultProfileRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.SetDefaultProfile({ request }, headers);
    });
  }

  /**
   * Fetch profiles that are followed by a requested profile.
   *
   * @param request - Request object for the query
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.following({
   *   for: '0x01',
   * });
   * ```
   */
  async following(request: FollowingRequest): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Following({
        request: currRequest,
        ...buildRequestFromConfig(this.context),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch profiles that follow a requested profile.
   *
   * @param request - Request object for the query
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.followers({
   *   of: '0x01',
   * });
   * ```
   */
  async followers(request: FollowersRequest): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Followers({
        request: currRequest,
        ...buildRequestFromConfig(this.context),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch mutual followers between two profiles.
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
        ...buildRequestFromConfig(this.context),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch profiles that acted on a publication.
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
        ...buildRequestFromConfig(this.context),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch profile action history.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @returns Profile action history item wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.actionHistory();
   * ```
   */
  async actionHistory(
    request: ProfileActionHistoryRequest = {},
  ): PromiseResult<
    PaginatedResult<ProfileActionHistoryFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.ProfileActionHistory(
          {
            request: currRequest,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
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
   * Create a new profile.
   *
   * @param request - Request object for the mutation
   * @returns Status of the transaction
   *
   * @example
   * ```ts
   * const result = await client.profile.create({
   *   handle: 'handle',
   *   to: '0x1234567890123456789012345678901234567890',
   * });
   * ```
   */
  async create(
    request: CreateProfileWithHandleRequest,
  ): Promise<RelaySuccessFragment | CreateProfileWithHandleErrorResultFragment> {
    const result = await this.sdk.CreateProfileWithHandle({ request });
    return result.data.result;
  }

  /**
   * Set profile metadata using Profile Manager. Profile has to have a Profile Manager enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelaySuccessFragment} or {@link LensProfileManagerRelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.setProfileMetadata({
   *   metadataURI: 'ipfs://Qm...',
   * });
   * ```
   */
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

  /**
   * Create typed data for setting the profile metadata.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastOnchain}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for setting the profile metadata
   *
   * @example
   * ```ts
   * const result = await client.profile.createSetProfileMetadataTypedData({
   *   metadataURI: 'ipfs://Qm...',
   * });
   * ```
   */
  async createSetProfileMetadataTypedData(
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

  /**
   * Create typed data for changing profile managers.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastOnchain}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for changing profile managers
   *
   * @example
   * ```ts
   * const result = await client.profile.createChangeProfileManagersTypedData({
   *   approveSignless: true,
   * });
   * ```
   */
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

  /**
   * Set profile follow module using Profile Manager. Profile has to have a Profile Manager enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelaySuccessFragment} or {@link LensProfileManagerRelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.setFollowModule({
   *   followModule: {
   *     freeFollowModule: true,
   *   },
   * });
   * ```
   */
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

  /**
   * Create typed data for setting a profile follow module.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastOnchain}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for setting a profile follow module
   *
   * @example
   * ```ts
   * const result = await client.profile.createSetFollowModuleTypedData({
   *   followModule: {
   *     freeFollowModule: true,
   *   },
   * });
   * ```
   */
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

  /**
   * Block a profile using Profile Manager. Profile has to have a Profile Manager enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelaySuccessFragment} or {@link LensProfileManagerRelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.block({
   *   profiles: ['0x01'],
   * });
   * ```
   */
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

  /**
   * Create typed data for blocking a profile.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastOnchain}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for requested transaction
   *
   * @example
   * ```ts
   * const result = await client.profile.createBlockProfilesTypedData({
   *   profiles: ['0x01'],
   * });
   * ```
   */
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

  /**
   * Unblock a profile using Profile Manager. Profile has to have a Profile Manager enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelaySuccessFragment} or {@link LensProfileManagerRelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.unblock({
   *   profiles: ['0x01'],
   * });
   * ```
   */
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

  /**
   * Create typed data for unblocking a profile.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastOnchain}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for requested transaction
   *
   * @example
   * ```ts
   * const result = await client.profile.createUnblockProfilesTypedData({
   *   profiles: ['0x01'],
   * });
   * ```
   */
  async createUnblockProfilesTypedData(
    request: UnblockRequest,
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

  /**
   * Follow a profile using Profile Manager. Profile has to have a Profile Manager enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelaySuccessFragment} or {@link LensProfileManagerRelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.follow({
   *   follow: [
   *     {
   *       profileId: '0x01',
   *     },
   *   ],
   * });
   * ```
   */
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

  /**
   * Create typed data for following a profile.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastOnchain}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for requested transaction
   *
   * @example
   * ```ts
   * const result = await client.profile.createFollowTypedData({
   *   follow: [
   *     {
   *       profileId: '0x01',
   *     },
   *   ],
   * });
   * ```
   */
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

  /**
   * Unfollow a profile using Profile Manager. Profile has to have a Profile Manager enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelaySuccessFragment} or {@link LensProfileManagerRelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.unfollow({
   *   unfollow: ['0x01'],
   * });
   * ```
   */
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

  /**
   * Create typed data for unfollowing a profile.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastOnchain}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for requested transaction
   *
   * @example
   * ```ts
   * const result = await client.profile.createUnfollowTypedData({
   *   unfollow: ['0x01'],
   * });
   * ```
   */
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

  /**
   * Link a profile to a handle using Profile Manager. Profile has to have a Profile Manager enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelaySuccessFragment} or {@link LensProfileManagerRelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.linkHandle({
   *   handle: 'my-handle',
   * });
   * ```
   */
  async linkHandle(
    request: LinkHandleToProfileRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.LinkHandleToProfile({ request }, headers);
      return result.data.result;
    });
  }

  /**
   * Create typed data for linking a profile to a handle.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastOnchain}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for requested transaction
   *
   * @example
   * ```ts
   * const result = await client.profile.createLinkHandleTypedData({
   *   handle: 'my-handle',
   * });
   * ```
   */
  async createLinkHandleTypedData(
    request: LinkHandleToProfileRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateLinkHandleToProfileBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateLinkHandleToProfileTypedData(
        { request, options },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Unlink a profile from a handle using Profile Manager. Profile has to have a Profile Manager enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelaySuccessFragment} or {@link LensProfileManagerRelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.unlinkHandle({
   *   handle: 'my-handle',
   * });
   * ```
   */
  async unlinkHandle(
    request: UnlinkHandleFromProfileRequest,
  ): PromiseResult<
    RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.UnlinkHandleFromProfile({ request }, headers);
      return result.data.result;
    });
  }

  /**
   * Create typed data for unlinking a profile from a handle.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastOnchain}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for requested transaction
   *
   * @example
   * ```ts
   * const result = await client.profile.createUnlinkHandleTypedData({
   *   handle: 'my-handle',
   * });
   * ```
   */
  async createUnlinkHandleTypedData(
    request: UnlinkHandleFromProfileRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateUnlinkHandleFromProfileBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateUnlinkHandleFromProfileTypedData(
        { request, options },
        headers,
      );

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
