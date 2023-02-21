import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import {
  ProfileFollowRevenueQueryRequest,
  ProfilePublicationRevenueQueryRequest,
  PublicationRevenueQueryRequest,
} from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers/buildPaginatedQueryResult';
import {
  getSdk,
  PublicationRevenueFragment,
  RevenueAggregateFragment,
  RevenueFragment,
  Sdk,
} from './graphql/revenue.generated';

export class Revenue {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
  }

  async profilePublication(
    request: ProfilePublicationRevenueQueryRequest,
    observerId?: string,
  ): Promise<PaginatedResult<PublicationRevenueFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ProfilePublicationRevenue({
        request: currRequest,
        observerId,
      });

      return result.data.result;
    }, request);
  }

  async profileFollow(
    request: ProfileFollowRevenueQueryRequest,
  ): Promise<RevenueAggregateFragment[]> {
    const result = await this.sdk.ProfileFollowRevenue({ request });

    return result.data.result.revenues;
  }

  async publication(request: PublicationRevenueQueryRequest): Promise<RevenueFragment | null> {
    const result = await this.sdk.PublicationRevenue({ request });

    return result.data.result;
  }
}
