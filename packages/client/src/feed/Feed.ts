import type { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type { PublicationFragment } from '../graphql/types';
import type { FeedHighlightsRequest, FeedRequest } from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult, requireAuthHeaders } from '../helpers';
import { FeedItemFragment, getSdk, Sdk } from './graphql/feed.generated';

export class Feed {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

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
