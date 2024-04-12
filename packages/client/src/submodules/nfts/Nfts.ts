import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { ProfileFragment } from '../../graphql/fragments.generated';
import type {
  MutualNftCollectionsRequest,
  NftCollectionOwnersRequest,
  NftCollectionsRequest,
  NftGalleriesRequest,
  NftGalleryCreateRequest,
  NftGalleryDeleteRequest,
  NftGalleryUpdateInfoRequest,
  NftGalleryUpdateItemOrderRequest,
  NftGalleryUpdateItemsRequest,
  NftsRequest,
  PopularNftCollectionsRequest,
} from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildPaginatedQueryResult,
  commonQueryVariables,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  NftFragment,
  Sdk,
  getSdk,
  NftGalleryFragment,
  NftCollectionFragment,
  NftCollectionWithOwnersFragment,
} from './graphql/nfts.generated';

/**
 * Query owned NFTs. Create and manage NFT galleries.
 *
 * @experimental This module is not stable and may be removed in a future release
 * @group LensClient Modules
 */
export class Nfts {
  private readonly sdk: Sdk;

  /**
   * @internal
   */
  constructor(
    private readonly context: LensContext,
    private readonly authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(context);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Fetch NFTs for authenticated profile or for provided request params.
   *
   * If you are using `development` enviroment you can only query chainIds 5 and 80002.
   * If you are using `production` enviroment you can only query chainIds 1 and 137.
   *
   * @param request - Request object for the query
   * @returns NFTs wrapped in {@link PaginatedResult}
   * @experimental This function is not stable and may be removed in a future release
   *
   * @example
   * When authenticated
   * ```ts
   * const result = await client.nfts.fetch();
   * ```
   *
   * Without authentication
   * ```ts
   * const result = await client.nfts.fetch({
   *   where {
   *     profileId: '0x01',
   *   }
   * });
   * ```
   */
  async fetch(request: NftsRequest = {}): Promise<PaginatedResult<NftFragment>> {
    const buildRequest = async (): Promise<NftsRequest> => {
      const profileId = await this.authentication.getProfileId();

      if (profileId) {
        return {
          where: {
            forProfileId: profileId,
          },
        };
      }

      const walletAddress = await this.authentication.getWalletAddress();

      return {
        where: {
          forAddress: walletAddress,
        },
      };
    };

    const isAuthenticated = await this.authentication.isAuthenticated();

    if (!isAuthenticated && Object.keys(request).length === 0) {
      throw new NotAuthenticatedError();
    }

    // if no request is provided, use authenticated profileId or wallet address
    if (Object.keys(request).length === 0) {
      request = await buildRequest();
    }

    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Nfts({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch NFT collections.
   *
   * @param request - Request object for the query
   * @returns NFT collections wrapped in {@link PaginatedResult}
   * @experimental This function is not stable and may be removed in a future release
   *
   * @example
   * ```ts
   * const result = await client.nfts.collections();
   * ```
   */
  async collections(
    request: NftCollectionsRequest = {},
  ): Promise<PaginatedResult<NftCollectionFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.NftCollections({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch mutual NFT collections between two profiles.
   *
   * @param request - Request object for the query
   * @returns NFT collections wrapped in {@link PaginatedResult}
   * @experimental This function is not stable and may be removed in a future release
   *
   * @example
   * ```ts
   * const result = await client.nfts.mutualCollections({
   *   observer: '0x01',
   *   viewing: '0x02',
   * });
   * ```
   */
  async mutualCollections(
    request: MutualNftCollectionsRequest,
  ): Promise<PaginatedResult<NftCollectionFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.MutualNftCollections({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch popular NFT collections together with total number of owners.
   *
   * @param request - Request object for the query
   * @returns NFT collections with total owners wrapped in {@link PaginatedResult}
   * @experimental This function is not stable and may be removed in a future release
   *
   * @example
   * ```ts
   * const result = await client.nfts.popularCollections();
   * ```
   */
  async popularCollections(
    request: PopularNftCollectionsRequest = {},
  ): Promise<PaginatedResult<NftCollectionWithOwnersFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.PopularNftCollections({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch profiles who own a specific NFT collection.
   *
   * @param request - Request object for the query
   * @returns Profiles wrapped in {@link PaginatedResult}
   * @experimental This function is not stable and may be removed in a future release
   *
   * @example
   * ```ts
   * const result = await client.nfts.collectionOwners({
   *   for: collection.contract.address,
   *   chainId: collection.contract.chainId,
   * });
   * ```
   */
  async collectionOwners(
    request: NftCollectionOwnersRequest,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.NftCollectionOwners({
        request: currRequest,
        ...commonQueryVariables(this.context),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch NFT galleries of a profile.
   *
   * @param request - Request object for the query
   * @returns Array of NFT galleries wrapped in {@link PaginatedResult}
   * @experimental This function is not stable and may be removed in a future release
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
      const result = await this.sdk.NftGalleries({
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
   * If you are using `development` enviroment you can only query chainIds 5 and 80002.
   * If you are using `production` enviroment you can only query chainIds 1 and 137.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with the id of the new gallery
   * @experimental This function is not stable and may be removed in a future release
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
   * @experimental This function is not stable and may be removed in a future release
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
   * If you are using `development` enviroment you can only query chainIds 5 and 80002.
   * If you are using `production` enviroment you can only query chainIds 1 and 137.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   * @experimental This function is not stable and may be removed in a future release
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
   * If you are using `development` enviroment you can only query chainIds 5 and 80002.
   * If you are using `production` enviroment you can only query chainIds 1 and 137.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   * @experimental This function is not stable and may be removed in a future release
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
   * @experimental This function is not stable and may be removed in a future release
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
