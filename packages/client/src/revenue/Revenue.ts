import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type {
  FollowRevenueRequest,
  PublicationRevenueRequest,
  RevenueFromPublicationsRequest,
} from '../graphql/types.generated';
import {
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  provideAuthHeaders,
} from '../helpers';
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

  constructor(
    private readonly config: LensConfig,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fromPublications(
    request: RevenueFromPublicationsRequest,
  ): Promise<PaginatedResult<PublicationRevenueFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.RevenueFromPublications(
          {
            request: currRequest,
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  async fromFollow(request: FollowRevenueRequest): Promise<RevenueAggregateFragment[]> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.FollowRevenues(
        {
          request,
        },
        headers,
      );

      return result.data.result.revenues;
    });
  }

  async forPublication(
    request: PublicationRevenueRequest,
  ): Promise<PublicationRevenueFragment | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.RevenueForPublication(
        {
          request,
          ...buildImageTransformsFromConfig(this.config.mediaTransforms),
        },
        headers,
      );

      return result.data.result;
    });
  }
}
