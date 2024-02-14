import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type {
  FollowRevenueRequest,
  RevenueFromPublicationRequest,
  RevenueFromPublicationsRequest,
} from '../../graphql/types.generated';
import {
  commonQueryVariables,
  buildPaginatedQueryResult,
  PaginatedResult,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  getSdk,
  PublicationRevenueFragment,
  RevenueAggregateFragment,
  Sdk,
} from './graphql/revenue.generated';

/**
 * Fetch a profile or publications revenue.
 *
 * @group LensClient Modules
 */
export class Revenue {
  private readonly sdk: Sdk;

  /**
   * @internal
   */
  constructor(
    private readonly context: LensContext,
    authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(context);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Fetch a revenue from all follow actions.
   *
   * @param request - Request object for the query
   * @returns Aggregated revenue
   *
   * @example
   * ```ts
   * const result = await client.revenue.fromFollow({
   *   for: '0x123',
   * });
   * ```
   */
  async fromFollow(request: FollowRevenueRequest): Promise<RevenueAggregateFragment[]> {
    const result = await this.sdk.FollowRevenues({
      request,
      ...commonQueryVariables(this.context),
    });

    return result.data.result.revenues;
  }

  /**
   * Fetch a profile's revenue from a single publication.
   *
   * @param request - Request object for the query
   * @returns Publication revenue
   *
   * @example
   * ```ts
   * const result = await client.revenue.fromPublication({
   *   for: '0x123-0x456',
   * });
   * ```
   */
  async fromPublication(
    request: RevenueFromPublicationRequest,
  ): Promise<PublicationRevenueFragment | null> {
    const result = await this.sdk.RevenueFromPublication({
      request,
      ...commonQueryVariables(this.context),
    });

    return result.data.result;
  }

  /**
   * Fetch a profile's revenue for all their publications.
   *
   * @param request - Request object for the query
   * @returns {@link PublicationRevenueFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.revenue.fromPublications({
   *   for: '0x123',
   * });
   * ```
   */
  async fromPublications(
    request: RevenueFromPublicationsRequest,
  ): Promise<PaginatedResult<PublicationRevenueFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.RevenueFromPublications({
        request: currRequest,
        ...commonQueryVariables(this.context),
      });

      return result.data.result;
    }, request);
  }
}
