import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { defaultMediaTransformParams } from '../consts/defaults';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type {
  MediaTransformParams,
  ProfileFollowRevenueQueryRequest,
  ProfilePublicationRevenueQueryRequest,
  PublicationRevenueQueryRequest,
} from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult, provideAuthHeaders } from '../helpers';
import {
  getSdk,
  PublicationRevenueFragment,
  RevenueAggregateFragment,
  Sdk,
} from './graphql/revenue.generated';

/**
 * With built-in ways to earn on Lens Protocol, see the breakdown of what you have earned.
 *
 * @group LensClient Modules
 */
export class Revenue {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch revenue of a profile's publications.
   * Return only publications that have earned any fees.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @param mediaTransformParams - Optional media transform params if you want to optimize media in the response
   * @returns Array of {@link PublicationRevenueFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.revenue.profilePublication({
   *   profileId: '0x123',
   * });
   * ```
   */
  async profilePublication(
    request: ProfilePublicationRevenueQueryRequest,
    observerId?: string,
    mediaTransformParams: MediaTransformParams = defaultMediaTransformParams,
  ): Promise<PaginatedResult<PublicationRevenueFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.ProfilePublicationRevenue(
          {
            request: currRequest,
            observerId,
            mediaTransformParams,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  /**
   * Fetch the amounts earned on the requested profile for all follows, grouped by currency.
   *
   * @param request - Request object for the query
   * @returns Array of {@link RevenueAggregateFragment}
   *
   * @example
   * ```ts
   * const result = await client.revenue.profileFollow({
   *   profileId: '0x123',
   * });
   * ```
   */
  async profileFollow(
    request: ProfileFollowRevenueQueryRequest,
  ): Promise<RevenueAggregateFragment[]> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ProfileFollowRevenue(
        {
          request,
        },
        headers,
      );

      return result.data.result.revenues;
    });
  }

  /**
   * Fetch the amounts earned on the requested publication.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @param mediaTransformParams - Optional media transform params if you want to optimize media in the response
   * @returns Publication revenue
   *
   * @example
   * ```ts
   * const result = await client.revenue.publication({
   *  publicationId: '0x123',
   * });
   * ```
   */
  async publication(
    request: PublicationRevenueQueryRequest,
    observerId?: string,
    mediaTransformParams: MediaTransformParams = defaultMediaTransformParams,
  ): Promise<PublicationRevenueFragment | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.PublicationRevenue(
        {
          request,
          observerId,
          mediaTransformParams,
        },
        headers,
      );

      return result.data.result;
    });
  }
}
