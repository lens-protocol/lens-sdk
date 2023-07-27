import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type { ProfileFragment } from '../graphql/fragments.generated';
import type { PublicationFragment } from '../graphql/types';
import type { ExploreProfilesRequest, ExplorePublicationRequest } from '../graphql/types.generated';
import {
  buildMediaTransformsFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  provideAuthHeaders,
} from '../helpers';
import { getSdk, Sdk } from './graphql/explore.generated';

/**
 * Explore Lens Protocol.
 *
 * @group LensClient Modules
 */
export class Explore {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(private readonly config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Explore publications
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Array of {@link PublicationFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * import { PublicationSortCriteria } from '@lens-protocol/client';
   *
   * const result = await client.explore.publications({
   *   sortCriteria: PublicationSortCriteria.TopCommented
   * });
   * ```
   */
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
            ...buildMediaTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  /**
   * Explore profiles
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Array of {@link ProfileFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * import { ProfileSortCriteria } from '@lens-protocol/client';
   *
   * const result = await client.explore.profiles({
   *   sortCriteria: ProfileSortCriteria.MostFollowers
   * })
   * ```
   */
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
            ...buildMediaTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }
}
