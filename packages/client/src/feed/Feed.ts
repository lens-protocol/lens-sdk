import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { defaultMediaTransformParams } from '../consts/defaults';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type { PublicationFragment } from '../graphql/types';
import type {
  FeedHighlightsRequest,
  FeedRequest,
  MediaTransformParams,
} from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult, requireAuthHeaders } from '../helpers';
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
   * @param mediaTransformParams - Optional media transform params if you want to optimize media in the response
   * @returns {@link PromiseResult} with array of {@link FeedItemFragment} wrapped in {@link PaginatedResult}
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
    mediaTransformParams: MediaTransformParams = defaultMediaTransformParams,
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
            mediaTransformParams,
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
   * @param mediaTransformParams - Optional media transform params if you want to optimize media in the response
   * @returns {@link PromiseResult} with array of {@link PublicationFragment} wrapped in {@link PaginatedResult}
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
    mediaTransformParams: MediaTransformParams = defaultMediaTransformParams,
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
            mediaTransformParams,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }
}
