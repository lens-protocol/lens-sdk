import { Prettify, invariant } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { defaultMediaTransformParams } from '../consts/defaults';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type {
  CommentFragment,
  PostFragment,
  ProfileFragment,
} from '../graphql/fragments.generated';
import { MediaTransformParams } from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult, provideAuthHeaders } from '../helpers';
import {
  getSdk,
  Sdk,
  SearchProfilesQueryVariables,
  SearchPublicationsQueryVariables,
} from './graphql/search.generated';

export type SearchProfilesQuery = Prettify<
  Omit<SearchProfilesQueryVariables, 'mediaTransformParams'> & {
    mediaTransformParams?: MediaTransformParams;
  }
>;

export type SearchPublicationsQuery = Prettify<
  Omit<SearchPublicationsQueryVariables, 'mediaTransformParams'> & {
    mediaTransformParams?: MediaTransformParams;
  }
>;

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
  async profiles(request: SearchProfilesQuery): Promise<PaginatedResult<ProfileFragment>> {
    const actualRequest = {
      ...request,
      mediaTransformParams: request.mediaTransformParams ?? defaultMediaTransformParams,
    };

    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (variables) => {
        const response = await this.sdk.SearchProfiles(variables, headers);
        const result = response.data.result;

        invariant(
          result.__typename !== 'PublicationSearchResult',
          'PublicationSearchResult is not expected in this query',
        );

        return result;
      }, actualRequest);
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
    request: SearchPublicationsQuery,
  ): Promise<PaginatedResult<CommentFragment | PostFragment>> {
    const actualRequest = {
      ...request,
      mediaTransformParams: request.mediaTransformParams ?? defaultMediaTransformParams,
    };

    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (variables) => {
        const response = await this.sdk.SearchPublications(variables, headers);
        const result = response.data.result;

        invariant(
          result.__typename !== 'ProfileSearchResult',
          'ProfileSearchResult is not expected in this query',
        );

        return result;
      }, actualRequest);
    });
  }
}
