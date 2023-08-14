import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
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
 * @group LensClient Modules
 */
export class Nfts {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch NFTs.
   *
   * @param request - Request object for the query
   * @returns Array of {@link NftFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.nfts.fetch();
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
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @returns {@link PromiseResult} with {@link NftOwnershipChallengeResultFragment}
   *
   * @example
   * ```ts
   * const result = await client.nfts.ownershipChallenge({
   *   for: '0xdfd7D26fd33473F475b57556118F8251464a24eb',
   *   nfts: [
   *     {
   *       contract: {
   *         address: '0x54439D4908A3E19356F876aa6022D67d0b3B12d6'
   *         chainId: 1,
   *       },
   *       tokenId: '5742',
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
   *   for: '0x0185',
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
   *   name: 'My favorite NFTs',
   *   items: [
   *     {
   *       contract: {
   *         address: '0x1234123412341234123412341234123412341234'
   *         chainId: 137,
   *       },
   *       tokenId: '1',
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
   *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
   *   toAdd: [{
   *     contract: {
   *       address: '0x1234123412341234123412341234123412341234'
   *       chainId: 137,
   *     },
   *     tokenId: '1',
   *   }],
   *   toRemove: [{
   *     contract: {
   *       address: '0x1234123412341234123412341234123412341234'
   *       chainId: 137,
   *     },
   *     tokenId: '2',
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
   *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
   *   updates: [{
   *     contract: {
   *       address: '0x1234123412341234123412341234123412341234'
   *       chainId: 137,
   *     },
   *     tokenId: '1',
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
