import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { ReactionRequest, WhoReactedPublicationRequest } from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers/buildPaginatedQueryResult';
import { execute } from '../helpers/execute';
import { getSdk, Sdk, WhoReactedResultFragment } from './graphql/reactions.generated';

export class Reactions {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async add(
    request: ReactionRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      await this.sdk.AddReaction(request, headers);
    });
  }

  async remove(
    request: ReactionRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      await this.sdk.RemoveReaction(request, headers);
    });
  }

  async toPublication(
    request: WhoReactedPublicationRequest,
    observerId?: string,
  ): Promise<PaginatedResult<WhoReactedResultFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.WhoReactedPublication({
        request: currRequest,
        observerId,
      });

      return result.data.result;
    }, request);
  }
}
