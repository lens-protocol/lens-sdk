import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import type { PostFragment, QuoteFragment } from '../../graphql/fragments.generated';
import type { FeedHighlightsRequest, FeedRequest } from '../../graphql/types.generated';
import {
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  requireAuthHeaders,
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
    private readonly config: LensConfig,
    authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

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
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

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
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
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
  //           ...buildImageTransformsFromConfig(this.config.mediaTransforms),
  //         },
  //         headers,
  //       );
  //
  //       return result.data.result;
  //     }, request);
  //   });
  // }
}
