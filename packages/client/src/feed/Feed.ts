import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type { PublicationFragment } from '../graphql/types';
import type { FeedHighlightsRequest, FeedRequest } from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult, requireAuthHeaders } from '../helpers';
import { FetchGraphQLClient } from '../helpers/FetchGraphQLClient';
import { FeedItemFragment, getSdk, Sdk } from './graphql/feed.generated';

/**
 * Feed is one of the most fundamental element to create a successful social media site.
 *
 * @group LensClient Modules
 */
export class Feed {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch feed items.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns {@link PromiseResult} with array of {@link FeedItemFragment} wrapped in the {@link PaginatedResult} helper
   *
   * @example
   * ```ts
   * const result = await client.feed.fetch({
   *   profileId: '0x123',
   * });
   * ```
   */
  async fetch(
    request: FeedRequest,
    observerId?: string,
  ): PromiseResult<
    PaginatedResult<FeedItemFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Feed(
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

  /**
   * Fetch feed highlights.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns {@link PromiseResult} with array of {@link PublicationFragment} wrapped in the {@link PaginatedResult} helper
   *
   * @example
   * ```ts
   * const result = await client.feed.fetchHighlights({
   *   profileId: '0x123',
   * });
   * ```
   */
  async fetchHighlights(
    request: FeedHighlightsRequest,
    observerId?: string,
  ): PromiseResult<
    PaginatedResult<PublicationFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.FeedHighlights(
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
