import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type {
  PostFragment,
  ProfileFragment,
  QuoteFragment,
} from '../../graphql/fragments.generated';
import type {
  ExploreProfilesRequest,
  ExplorePublicationRequest,
} from '../../graphql/types.generated';
import {
  buildRequestFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import { getSdk, Sdk } from './graphql/explore.generated';

/**
 * Explore Lens Protocol.
 *
 * @group LensClient Modules
 */
export class Explore {
  private readonly sdk: Sdk;

  constructor(
    private readonly config: LensConfig,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Explore publications
   *
   * @param request - Request object for the query
   * @returns Publications wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * import { ExplorePublicationsOrderByType } from '@lens-protocol/client';
   *
   * const result = await client.explore.publications({
   *   orderBy: ExplorePublicationsOrderByType.Latest,
   * });
   * ```
   */
  async publications(
    request: ExplorePublicationRequest,
  ): Promise<PaginatedResult<PostFragment | QuoteFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ExplorePublications({
        request: currRequest,
        ...buildRequestFromConfig(this.config),
      });

      return result.data.result;
    }, request);
  }

  /**
   * Explore profiles
   *
   * @param request - Request object for the query
   * @returns Profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * import { ExploreProfilesOrderByType } from '@lens-protocol/client';
   *
   * const result = await client.explore.profiles({
   *   orderBy: ExploreProfilesOrderByType.MostFollowers,
   * });
   * ```
   */
  async profiles(request: ExploreProfilesRequest): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ExploreProfiles({
        request: currRequest,
        ...buildRequestFromConfig(this.config),
      });

      return result.data.result;
    }, request);
  }
}
