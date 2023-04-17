import { invariant } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type {
  CommentFragment,
  PostFragment,
  ProfileFragment,
} from '../graphql/fragments.generated';
import { buildPaginatedQueryResult, PaginatedResult, provideAuthHeaders } from '../helpers';
import {
  getSdk,
  Sdk,
  SearchProfilesQueryVariables,
  SearchPublicationsQueryVariables,
} from './graphql/search.generated';

/**
 * Search for profiles and publications.
 *
 * @group LensClient Modules
 */
export class Search {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Search for profiles.
   *
   * @param request - Request object for the query
   * @returns Array of {@link ProfileFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.search.profiles({
   *   query: 'lens',
   * });
   * ```
   */
  async profiles(request: SearchProfilesQueryVariables): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (variables) => {
        const response = await this.sdk.SearchProfiles(variables, headers);
        const result = response.data.result;

        invariant(
          result.__typename !== 'PublicationSearchResult',
          'PublicationSearchResult is not expected in this query',
        );

        return result;
      }, request);
    });
  }

  /**
   * Search for publications.
   *
   * @param request - Request object for the query
   * @returns Array of {@link CommentFragment} and/or {@link PostFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.search.publications({
   *  query: 'lens',
   * });
   * ```
   */
  async publications(
    request: SearchPublicationsQueryVariables,
  ): Promise<PaginatedResult<CommentFragment | PostFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (variables) => {
        const response = await this.sdk.SearchPublications(variables, headers);
        const result = response.data.result;

        invariant(
          result.__typename !== 'ProfileSearchResult',
          'ProfileSearchResult is not expected in this query',
        );

        return result;
      }, request);
    });
  }
}
