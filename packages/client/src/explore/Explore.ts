import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import { ProfileFragment } from '../graphql/fragments.generated';
import { PublicationFragment } from '../graphql/types';
import { ExploreProfilesRequest, ExplorePublicationRequest } from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers/buildPaginatedQueryResult';
import { getSdk, Sdk } from './graphql/explore.generated';

export class Explore {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
  }

  async publications(
    request: ExplorePublicationRequest,
    observerId?: string,
  ): Promise<PaginatedResult<PublicationFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ExplorePublications({
        request: currRequest,
        observerId,
      });

      return result.data.result;
    }, request);
  }

  async profiles(
    request: ExploreProfilesRequest,
    observerId?: string,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ExploreProfiles({
        request: currRequest,
        observerId,
      });

      return result.data.result;
    }, request);
  }
}
