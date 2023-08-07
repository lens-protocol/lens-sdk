import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type { PublicationFragment } from '../graphql/types';
import type { PublicationRequest, PublicationsRequest } from '../graphql/types.generated';
import {
  buildMediaTransformsFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  provideAuthHeaders,
} from '../helpers';
import { getSdk, Sdk } from './graphql/publication.generated';

/**
 * @group LensClient Modules
 */
export class Publication {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(private readonly config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fetch(request: PublicationRequest): Promise<PublicationFragment | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Publication(
        {
          request,
          ...buildMediaTransformsFromConfig(this.config.mediaTransforms),
        },
        headers,
      );

      return result.data.result;
    });
  }

  async fetchAll(request: PublicationsRequest): Promise<PaginatedResult<PublicationFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Publications(
          {
            request: currRequest,
            ...buildMediaTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }
}
