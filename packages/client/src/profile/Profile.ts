import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
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
  ProfileGuardianRequest,
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
  BurnProfileTypedDataFragment,
  FollowTypedDataFragment,
  getSdk,
  ProfileGuardianResultFragment,
  ProfileStatsFragment,
  Sdk,
  SetDefaultProfileTypedDataFragment,
  SetDispatcherTypedDataFragment,
  SetFollowModuleTypedDataFragment,
  SetFollowNftUriTypedDataFragment,
  SetProfileImageUriTypedDataFragment,
  SetProfileMetadataTypedDataFragment,
  UnfollowTypedDataFragment,
} from './graphql/profile.generated';

/**
 * Profiles are the accounts that create publications and are owned by wallets.
 *
 * @group LensClient Modules
 */
export class Profile {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch a single profile.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Profile or null if not found
   *
   * @example
   * ```ts
   * const result = await client.profile.fetch({ profileId: '0x123' });
   * ```
   */
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

  /**
   * Fetch a profile's stats.
   *
   * @param request - Request object for the query
   * @param sources - Required to calculate stats specific to provided appIds
   * @returns Profile stats or undefined if not found
   *
   * @example
   * ```ts
   * const result = await client.profile.stats({ profileId: '0x123' }, ['lenster']);
   * ```
   */
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

  /**
   * Fetch all profiles by requested criteria
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.fetchAll({
   *   ownedBy: ['0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2'],
   * });
   * ```
   */
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

  /**
   * Fetch all recommended profiles
   *
   * @param options - Optional options for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Array of recommended profiles
   *
   * @example
   * ```ts
   * const result = await client.profile.allRecommended();
   * ```
   */
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
   * const result = await client.profile.dismissRecommended({ profileIds: ['0x123'] });
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
   * Fetch mutual followers between two profiles
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.mutualFollowers({
   *   viewingProfileId: '0x123',
   *   yourProfileId: '0x456',
   * });
   * ```
   */
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

  /**
   * Check if the ethereum address follows a profile. Allows bulk request.
   *
   * @param request - Request object for the query
   * @returns Array of results for each requested pair
   *
   * @example
   * ```ts
   * const result = await client.profile.doesFollow({
   *   followInfos: [
   *     {
   *       followerAddress: '0xD020E01C0c90Ab005A01482d34B808874345FD82',
   *       profileId: '0x01'
   *     },
   *     {
   *       followerAddress: '0x248ba21F6ff51cf0CD4765C3Bc9fAD2030a591d5',
   *       profileId: '0x01'
   *     }
   *   ]
   * });
   * ```
   */
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

  /**
   * Fetch all profiles an ethereum address is following
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.allFollowing({
   *  address: '0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2',
   * });
   * ```
   */
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

  /**
   * Fetch all wallet addresses that follow a profile
   *
   * @param request - Request object for the query
   * @returns Wallets with default profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.allFollowers({
   *   profileId: '0x123',
   * });
   * ```
   */
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

  /**
   * Fetch follower NFT that the wallet address owns.
   * Remember a wallet can follow a profile as many times as they wish.
   *
   * @param request - Request object for the query
   * @returns Details of follower NFT like contract address and token ids
   *
   * @example
   * ```ts
   * const result = await client.profile.followerNftOwnedTokenIds({
   *   address: '0xD020E01C0c90Ab005A01482d34B808874345FD82',
   *   profileId: '0x01'
   * });
   * ```
   */
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

  /**
   * Create a new profile
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.create({
   *   handle: 'profilehandle',
   * });
   * ```
   */
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

  /**
   * Fetch typed data for setting the dispatcher
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for setting the dispatcher
   *
   * @example
   * ```ts
   * const result = await client.profile.createSetDispatcherTypedData({
   *   profileId: activeProfile.id,
   * });
   * ```
   */
  async createSetDispatcherTypedData(
    request: SetDispatcherRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    SetDispatcherTypedDataFragment,
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

  /**
   * Fetch typed data for setting the default profile
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for setting the default profile
   *
   * @example
   * ```ts
   * const result = await client.profile.createSetDefaultProfileTypedData({
   *   profileId: '0x0635', // must be a profile owned by authenticated wallet
   * });
   * ```
   */
  async createSetDefaultProfileTypedData(
    request: CreateSetDefaultProfileRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    SetDefaultProfileTypedDataFragment,
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

  /**
   * Fetch typed data for setting the profile's metadata
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for setting the profile's metadata
   *
   * @example
   * ```ts
   * const result = await client.profile.createSetProfileMetadataTypedData({
   *   profileId: '0x0635',
   *   metadata: 'ipfs://Qm...',
   * });
   * ```
   */
  async createSetProfileMetadataTypedData(
    request: CreatePublicSetProfileMetadataUriRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    SetProfileMetadataTypedDataFragment,
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

  /**
   * Set profile's metadata using dispatcher. Profile has to have the dispatcher enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.createSetProfileMetadataViaDispatcher({
   *   profileId: '0x0635',
   *   metadata: 'ipfs://Qm...',
   * });
   * ```
   */
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

  /**
   * Fetch typed data for setting the profile's image
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for setting the profile's image
   *
   * @example
   * ```ts
   * const result = await client.profile.createSetProfileImageURITypedData({
   *   profileId: '0x0635',
   *   url: 'ipfs://Qm...',
   * });
   * ```
   */
  async createSetProfileImageURITypedData(
    request: UpdateProfileImageRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    SetProfileImageUriTypedDataFragment,
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

  /**
   * Set profile's image using dispatcher. Profile has to have the dispatcher enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.profile.createSetProfileImageURIViaDispatcher({
   *   profileId: '0x0635',
   *   url: 'ipfs://Qm...',
   * });
   * ```
   */
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

  /**
   * Fetch typed data for burning a profile
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for burning a profile
   *
   * @example
   * ```ts
   * const result = await client.profile.createBurnProfileTypedData({
   *   profileId: '0x0635',
   * });
   * ```
   */
  async createBurnProfileTypedData(
    request: BurnProfileRequest,
    options?: TypedDataOptions,
  ): PromiseResult<BurnProfileTypedDataFragment, CredentialsExpiredError | NotAuthenticatedError> {
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

  /**
   * Fetch typed data for following a profile
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for following a profile
   *
   * @example
   * ```ts
   * const result = await client.profile.createFollowTypedData({
   *   follow: [
   *     { profile: '0x123' },
   *   ],
   * });
   * ```
   */
  async createFollowTypedData(
    request: FollowRequest,
    options?: TypedDataOptions,
  ): PromiseResult<FollowTypedDataFragment, CredentialsExpiredError | NotAuthenticatedError> {
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
   * Fetch typed data for unfollowing a profile
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for unfollowing a profile
   *
   * @example
   * ```ts
   * const result = await client.profile.createUnfollowTypedData({
   *   profile: '0x123',
   * });
   * ```
   */
  async createUnfollowTypedData(
    request: UnfollowRequest,
    options?: TypedDataOptions,
  ): PromiseResult<UnfollowTypedDataFragment, CredentialsExpiredError | NotAuthenticatedError> {
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
   * Fetch typed data for setting a profile's follow module
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for setting a profile's follow module
   *
   * @example
   * ```ts
   * const result = await client.profile.createSetFollowModuleTypedData({
   *   profileId: '0x123',
   *   followModule: {
   *     feeFollowModule: {
   *       amount: {
   *         currency: '0xD40282e050723Ae26Aeb0F77022dB14470f4e011',
   *         value: '0.01'
   *       },
   *       recipient: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF'
   *     }
   *   }
   * });
   * ```
   */
  async createSetFollowModuleTypedData(
    request: CreateSetFollowModuleRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    SetFollowModuleTypedDataFragment,
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
   * Fetch typed data for setting a profile's follow NFT URI.
   *
   * The follow NFT URI is the NFT metadata followers will mint when they follow your profile.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for setting a profile's follow NFT URI
   *
   * @example
   * ```ts
   * const result = await client.profile.createSetFollowNFTUriTypedData({
   *   profileId: '0x123',
   *   followNFTURI: 'ipfs://Qm...',
   * });
   * ```
   */
  async createSetFollowNFTUriTypedData(
    request: CreateSetFollowNftUriRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    SetFollowNftUriTypedDataFragment,
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

  /**
   * Fetch all the pending approval follow NFTs you have been sent
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.profile.pendingApprovalFollows();
   * ```
   */
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

  /**
   * Fetch all available interests.
   *
   * @returns Array of interests
   */
  async allInterests(): Promise<string[]> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ProfileInterests({}, headers);

      return result.data.result;
    });
  }

  /**
   * Add interests to a profile.
   *
   * ⚠️ Requires authenticated LensClient with the provided profileId.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * await client.profile.addInterests({
   *   interests: ['TECHNOLOGY__PROGRAMMING'],
   *   profileId: '0x123',
   * });
   * ```
   */
  async addInterests(
    request: AddProfileInterestsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.AddProfileInterest({ request }, headers);
    });
  }

  /**
   * Remove interests from a profile.
   *
   * ⚠️ Requires authenticated LensClient with the provided profileId.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * await client.profile.removeInterests({
   *   interests: ['TECHNOLOGY__PROGRAMMING'],
   *   profileId: '0x123',
   * });
   * ```
   */
  async removeInterests(
    request: RemoveProfileInterestsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.RemoveProfileInterest({ request }, headers);
    });
  }

  /**
   * Fetch profile guardian settings for the specified profile.
   *
   * ⚠️ Requires authenticated LensClient with the provided profileId.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link ProfileGuardianResultFragment}
   *
   * @example
   * ```ts
   * await client.profile.guardian({
   *   profileId: '0x123',
   * });
   * ```
   */
  async guardian(
    request: ProfileGuardianRequest,
  ): PromiseResult<ProfileGuardianResultFragment, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ProfileGuardian(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }
}
