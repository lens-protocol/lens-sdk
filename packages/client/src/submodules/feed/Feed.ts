import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type { PostFragment, QuoteFragment } from '../../graphql/fragments.generated';
import type { FeedHighlightsRequest, FeedRequest } from '../../graphql/types.generated';
import {
  buildRequestFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import { FeedItemFragment, getSdk, Sdk } from './graphql/feed.generated';

/**
 * Feed is one of the most fundamental element to create a successful social media site.
 *
 * @group LensClient Modules
 */
export class Feed {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(
    private readonly context: LensContext,
    authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(context);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
    this.authentication = authentication;
  }

  /**
   * Fetch feed items.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @returns Array of {@link FeedItemFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.feed.fetch({
   *   where: {
   *     for: '0x123',
   *   },
   * });
   * ```
   */
  async fetch(
    request: FeedRequest,
  ): PromiseResult<
    PaginatedResult<FeedItemFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Feed(
          {
            request: currRequest,
            ...buildRequestFromConfig(this.context),
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
   * @returns Array of publications wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.feed.highlights({
   *   where: {
   *     for: '0x123',
   *   },
   * });
   * ```
   */
  async highlights(
    request: FeedHighlightsRequest,
  ): PromiseResult<
    PaginatedResult<PostFragment | QuoteFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.FeedHighlights(
          {
            request: currRequest,
            ...buildRequestFromConfig(this.context),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  // Not yet ready to be exposed on production
  // async forYou(
  //   request: PublicationForYouRequest,
  // ): PromiseResult<
  //   PaginatedResult<PostFragment | QuoteFragment>,
  //   CredentialsExpiredError | NotAuthenticatedError
  // > {
  //   return requireAuthHeaders(this.authentication, async (headers) => {
  //     return buildPaginatedQueryResult(async (currRequest) => {
  //       const result = await this.sdk.ForYou(
  //         {
  //           request: currRequest,
  //           ...buildRequestFromConfig(this.context),
  //         },
  //         headers,
  //       );
  //
  //       return result.data.result;
  //     }, request);
  //   });
  // }
}
