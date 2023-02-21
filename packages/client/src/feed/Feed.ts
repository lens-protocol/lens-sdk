import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { PublicationFragment } from '../graphql/types';
import { FeedHighlightsRequest, FeedRequest } from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers/buildPaginatedQueryResult';
import { execute } from '../helpers/execute';
import { FeedItemFragment, getSdk, Sdk } from './graphql/feed.generated';

export class Feed {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
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
    return execute(this.authentication, async (headers) => {
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
    return execute(this.authentication, async (headers) => {
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
