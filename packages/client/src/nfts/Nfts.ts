import type { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type {
  NftGalleriesRequest,
  NftGalleryCreateRequest,
  NftGalleryDeleteRequest,
  NftGalleryUpdateInfoRequest,
  NftGalleryUpdateItemOrderRequest,
  NftGalleryUpdateItemsRequest,
  NftOwnershipChallengeRequest,
  NfTsRequest,
} from '../graphql/types.generated';
import {
  buildPaginatedQueryResult,
  PaginatedResult,
  provideAuthHeaders,
  requireAuthHeaders,
} from '../helpers';
import {
  getSdk,
  NftFragment,
  NftGalleryFragment,
  NftOwnershipChallengeResultFragment,
  Sdk,
} from './graphql/nfts.generated';

/**
 * Query owned NFTs. Challenge ownership. Create and manage NFT galleries.
 *
 * @remarks
 *
 * You can set NFT images as profile pictures and the server will track if they still
 * own it every few hours. If they do not it will be removed from their profile picture.
 *
 * @group LensClient Modules
 */
export class Nfts {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch NFTs.
   *
   * If you are using `development` enviroment you can only query Polygon Mumbai (chainId: 80001).
   * If you are using `production` enviroment you can only query Ethereum Mainnet (chainId: 1) and Polygon Mainnet (chainId: 137).
   *
   * @param request - Request object for the query
   * @returns Array of {@link NftFragment} wrapped in the {@link PaginatedResult} helper
   *
   * @example
   * ```ts
   * const result = await client.nfts.fetch({
   *   chainIds: [1],
   *   ownerAddress: '0xA6D3a33a1C66083859765b9D6E407D095a908193',
   * });
   * ```
   */
  async fetch(request: NfTsRequest): Promise<PaginatedResult<NftFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Nfts(
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
   * Fetch NFT ownership challenge.
   *
   * If you are using `development` enviroment you can only query Polygon Mumbai (chainId: 80001).
   * If you are using `production` enviroment you can only query Ethereum Mainnet (chainId: 1) or Polygon Mainnet (chainId: 137).
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @returns {@link PromiseResult} with {@link NftOwnershipChallengeResultFragment}
   *
   * @example
   * ```ts
   * const result = await client.nfts.ownershipChallenge({
   *   ethereumAddress: '0xdfd7D26fd33473F475b57556118F8251464a24eb',
   *   nfts: [
   *     {
   *        contractAddress: '0x54439D4908A3E19356F876aa6022D67d0b3B12d6',
   *        tokenId: '5742',
   *        chainId: 1
   *     }
   *   ]
   * });
   * ```
   */
  async ownershipChallenge(
    request: NftOwnershipChallengeRequest,
  ): PromiseResult<
    NftOwnershipChallengeResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.NftOwnershipChallenge({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Fetch NFT galleries of a profile.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @returns Array of {@link NftGalleryFragment}
   *
   * @example
   * ```ts
   * const result = await client.nfts.fetchGalleries({
   *   profileId: '0x0185',
   * });
   * ```
   */
  async fetchGalleries(request: NftGalleriesRequest): Promise<NftGalleryFragment[]> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ProfileGalleries({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Create a new NFT gallery.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with the id of the new gallery
   *
   * @example
   * ```ts
   * const result = await client.nfts.createGallery({
   *   profileId: '0x0185',
   *   name: 'My favorite NFTs',
   *   items: [
   *     {
   *       contractAddress: '0x1234123412341234123412341234123412341234'
   *       tokenId: '1',
   *       chainId: 137
   *     }
   *   ]
   * });
   * ```
   */
  async createGallery(
    request: NftGalleryCreateRequest,
  ): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateNFTGallery({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Update a NFT gallery.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.nfts.updateGalleryInfo({
   *  profileId: '0x01',
   *  galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
   *  name: 'New name',
   * });
   * ```
   */
  async updateGalleryInfo(
    request: NftGalleryUpdateInfoRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.UpdateNFTGalleryInfo({ request }, headers);
    });
  }

  /**
   * Update a NFT gallery items.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.nfts.updateGalleryItems({
   *   profileId: '0x01',
   *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
   *   toAdd: [{
   *     contractAddress: '0x1234123412341234123412341234123412341234',
   *     tokenId: '1',
   *     chainId: 137
   *   }],
   *   toRemove: [{
   *     contractAddress: '0x0001000100010001000100010001000100010001',
   *     tokenId: '2',
   *     chainId: 137
   *   }]
   * });
   * ```
   */
  async updateGalleryItems(
    request: NftGalleryUpdateItemsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.UpdateNFTGalleryItems({ request }, headers);
    });
  }

  /**
   * Update a NFT gallery items order.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.nfts.updateGalleryOrder({
   *   profileId: '0x01',
   *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
   *   updates: [{
   *     contractAddress: '0x1234123412341234123412341234123412341234',
   *     tokenId: '1',
   *     chainId: 137,
   *     newOrder: 1,
   *   }]
   *  });
   * ```
   */
  async updateGalleryOrder(
    request: NftGalleryUpdateItemOrderRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.UpdateNFTGalleryOrder({ request }, headers);
    });
  }

  /**
   * Delete a NFT gallery.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.nfts.deleteGallery({
   *   profileId: '0x01',
   *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148'
   * });
   * ```
   */
  async deleteGallery(
    request: NftGalleryDeleteRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.DeleteNFTGallery({ request }, headers);
    });
  }
}
