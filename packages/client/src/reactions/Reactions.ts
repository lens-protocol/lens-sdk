import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { ReactionRequest } from '../graphql/types.generated';
import { getSdk, Sdk } from './graphql/reactions.generated';

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
    if (!this.authentication) {
      return failure(new NotAuthenticatedError());
    }

    const headerResult = await this.authentication.getRequestHeader();

    if (headerResult.isFailure()) {
      return failure(headerResult.error);
    }

    await this.sdk.AddReaction(request, headerResult.value);

    return success();
  }

  async remove(
    request: ReactionRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    if (!this.authentication) {
      return failure(new NotAuthenticatedError());
    }

    const headerResult = await this.authentication.getRequestHeader();

    if (headerResult.isFailure()) {
      return failure(headerResult.error);
    }

    await this.sdk.RemoveReaction(request, headerResult.value);

    return success();
  }
}
