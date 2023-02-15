import { GraphQLClient } from 'graphql-request';

import {
  getSdk,
  PublicationRevenueFragment,
  RevenueAggregateFragment,
  RevenueFragment,
  Sdk,
} from './graphql/revenue.generated';
import { LensConfig } from '../consts/config';
import { CommonPaginatedResultInfoFragment } from '../graphql/fragments.generated';
import {
  ProfileFollowRevenueQueryRequest,
  ProfilePublicationRevenueQueryRequest,
  PublicationRevenueQueryRequest,
} from '../graphql/types.generated';

export class Revenue {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
  }

  async profilePublication(request: ProfilePublicationRevenueQueryRequest): Promise<{
    items: PublicationRevenueFragment[];
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.ProfilePublicationRevenue({ request });

    return result.data.result;
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
