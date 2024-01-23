import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type {
  NftGalleriesRequest,
  NftGalleryCreateRequest,
  NftGalleryDeleteRequest,
  NftGalleryUpdateInfoRequest,
  NftGalleryUpdateItemOrderRequest,
  NftGalleryUpdateItemsRequest,
  NftOwnershipChallengeRequest,
  NftsRequest,
} from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildPaginatedQueryResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  NftFragment,
  NftOwnershipChallengeResultFragment,
  Sdk,
  getSdk,
  NftGalleryFragment,
} from './graphql/nfts.generated';

/**
 * Query owned NFTs. Challenge ownership. Create and manage NFT galleries.
 *
 * @group LensClient Modules
 */
export class Nfts {
  private readonly sdk: Sdk;

  constructor(
    context: LensContext,
    private readonly authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(context);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Fetch NFTs.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * If you are using `development` enviroment you can only query chainIds 5 and 80001.
   * If you are using `production` enviroment you can only query chainIds 1 and 137.
   *
   * @param request - Request object for the query
   * @returns {@link PromiseResult} with NFTs wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.nfts.fetch();
   * ```
   */
  async fetch(
    request: NftsRequest = {},
  ): PromiseResult<PaginatedResult<NftFragment>, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
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
   * If you are using `development` enviroment you can only query chainIds 5 and 80001.
   * If you are using `production` enviroment you can only query chainIds 1 and 137.
   *
   * @param request - Request object for the query
   * @returns {@link PromiseResult} with {@link NftOwnershipChallengeResultFragment}
   *
   * @example
   * ```ts
   * const result = await client.nfts.ownershipChallenge({
   *   for: '0x1234567890123456789012345678901234567890',
   *   nfts: [
   *     {
   *       contract: {
   *         address: '0x1234123412341234123412341234123412341234', // an NFT that wallet owns
   *         chainId: 5,
   *       },
   *       tokenId: '1',
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
   * @param request - Request object for the query
   * @returns Array of NFT galleries wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.nfts.fetchGalleries({
   *   for: '0x01',
   * });
   * ```
   */
  async fetchGalleries(request: NftGalleriesRequest): Promise<PaginatedResult<NftGalleryFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ProfileGalleries({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  /**
   * Create a new NFT gallery.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * If you are using `development` enviroment you can only query chainIds 5 and 80001.
   * If you are using `production` enviroment you can only query chainIds 1 and 137.
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
   *         address: '0x1234123412341234123412341234123412341234', // an NFT that wallet owns
   *         chainId: 5,
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
   * Update an NFT gallery.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.nfts.updateGalleryInfo({
   *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
   *   name: 'New name',
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
   * If you are using `development` enviroment you can only query chainIds 5 and 80001.
   * If you are using `production` enviroment you can only query chainIds 1 and 137.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.nfts.updateGalleryItems({
   *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
   *   toAdd: [
   *     {
   *       contract: {
   *         address: '0x1234123412341234123412341234123412341234', // an NFT that wallet owns
   *         chainId: 5,
   *       },
   *       tokenId: '1',
   *     },
   *   ],
   *   toRemove: [
   *     {
   *       contract: {
   *         address: '0x1234123412341234123412341234123412341234', // an NFT that wallet owns
   *         chainId: 5,
   *       },
   *       tokenId: '2',
   *     },
   *   ],
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
   * If you are using `development` enviroment you can only query chainIds 5 and 80001.
   * If you are using `production` enviroment you can only query chainIds 1 and 137.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * const result = await client.nfts.updateGalleryOrder({
   *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
   *   updates: [
   *     {
   *       contract: {
   *         address: '0x1234123412341234123412341234123412341234', // an NFT that wallet owns
   *         chainId: 5,
   *       },
   *       tokenId: '1',
   *       newOrder: 1,
   *     },
   *   ],
   * });
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
