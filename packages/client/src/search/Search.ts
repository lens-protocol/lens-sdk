import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type {
  CommentFragment,
  PostFragment,
  ProfileFragment,
  QuoteFragment,
} from '../graphql/fragments.generated';
import { ProfileSearchRequest, PublicationSearchRequest } from '../graphql/types.generated';
import {
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  provideAuthHeaders,
} from '../helpers';
import { getSdk, Sdk } from './graphql/search.generated';

/**
 * Search for profiles and publications.
 *
 * @group LensClient Modules
 */
export class Search {
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

  async profiles(request: ProfileSearchRequest): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const response = await this.sdk.SearchProfiles(
          {
            request: currRequest,
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );
        return response.data.result;
      }, request);
    });
  }

  async publications(
    request: PublicationSearchRequest,
    observerId?: string,
  ): Promise<PaginatedResult<CommentFragment | PostFragment | QuoteFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const response = await this.sdk.SearchPublications(
          {
            request: currRequest,
            observerId,
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );
        return response.data.result;
      }, request);
    });
  }
}
