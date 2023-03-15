import { GraphQLClient } from 'graphql-request';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { ProfileFragment } from '../graphql/fragments.generated';
import type { PublicationFragment } from '../graphql/types';
import type { ExploreProfilesRequest, ExplorePublicationRequest } from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult, provideAuthHeaders } from '../helpers';
import { getSdk, Sdk } from './graphql/explore.generated';

export class Explore {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async publications(
    request: ExplorePublicationRequest,
    observerId?: string,
  ): Promise<PaginatedResult<PublicationFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.ExplorePublications(
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

  async profiles(
    request: ExploreProfilesRequest,
    observerId?: string,
  ): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.ExploreProfiles(
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
}
