import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type { ProfileFragment } from '../../graphql/fragments.generated';
import { PrimaryPublicationFragment } from '../../graphql/types';
import { ProfileSearchRequest, PublicationSearchRequest } from '../../graphql/types.generated';
import {
  commonQueryVariables,
  buildPaginatedQueryResult,
  PaginatedResult,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import { getSdk, Sdk } from './graphql/search.generated';

/**
 * Search for profiles and publications.
 *
 * @group LensClient Modules
 */
export class Search {
  private readonly sdk: Sdk;

  /**
   * @internal
   */
  constructor(
    private readonly context: LensContext,
    authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(context);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Search for profiles.
   *
   * @param request - Request object for the query
   * @returns Array of profiles wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.search.profiles({
   *   query: 'lens',
   * });
   * ```
   */
  async profiles(request: ProfileSearchRequest): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const response = await this.sdk.SearchProfiles({
        request: currRequest,
        ...commonQueryVariables(this.context),
      });
      return response.data.result;
    }, request);
  }

  /**
   * Search for publications.
   *
   * @param request - Request object for the query
   * @returns Array of publications wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.search.publications({
   *   query: 'lens',
   * });
   * ```
   */
  async publications(
    request: PublicationSearchRequest,
  ): Promise<PaginatedResult<PrimaryPublicationFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const response = await this.sdk.SearchPublications({
        request: currRequest,
        ...commonQueryVariables(this.context),
      });
      return response.data.result;
    }, request);
  }
}
