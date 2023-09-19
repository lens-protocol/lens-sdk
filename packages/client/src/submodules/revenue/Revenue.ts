import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type {
  FollowRevenueRequest,
  PublicationRevenueRequest,
  RevenueFromPublicationsRequest,
} from '../../graphql/types.generated';
import {
  buildImageTransformsFromConfig,
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
 * With built-in ways to earn on Lens Protocol, see the breakdown of what you have earned.
 *
 * @group LensClient Modules
 */
export class Revenue {
  private readonly sdk: Sdk;

  constructor(
    private readonly config: LensConfig,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  async fromPublications(
    request: RevenueFromPublicationsRequest,
  ): Promise<PaginatedResult<PublicationRevenueFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.RevenueFromPublications({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });

      return result.data.result;
    }, request);
  }

  async fromFollow(request: FollowRevenueRequest): Promise<RevenueAggregateFragment[]> {
    const result = await this.sdk.FollowRevenues({
      request,
    });

    return result.data.result.revenues;
  }

  async fromPublication(
    request: PublicationRevenueRequest,
  ): Promise<PublicationRevenueFragment | null> {
    const result = await this.sdk.RevenueFromPublication({
      request,
      ...buildImageTransformsFromConfig(this.config.mediaTransforms),
    });

    return result.data.result;
  }
}
