import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type {
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

export class Revenue {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async profilePublication(
    request: ProfilePublicationRevenueQueryRequest,
    observerId?: string,
  ): Promise<PaginatedResult<PublicationRevenueFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.ProfilePublicationRevenue(
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

  async publication(
    request: PublicationRevenueQueryRequest,
    observerId?: string,
  ): Promise<PublicationRevenueFragment | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.PublicationRevenue(
        {
          request,
          observerId,
        },
        headers,
      );

      return result.data.result;
    });
  }
}
