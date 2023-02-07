import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { NotAuthenticatedError } from '../consts/errors';
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

  async add(request: ReactionRequest) {
    if (!this.authentication) {
      throw new NotAuthenticatedError();
    }

    const headerResult = await this.authentication.getRequestHeader();

    if (headerResult.isFailure()) {
      throw headerResult.unwrap();
    }

    return this.sdk.AddReaction(request, headerResult.unwrap());
  }

  async remove(request: ReactionRequest) {
    if (!this.authentication) {
      throw new NotAuthenticatedError();
    }

    const headerResult = await this.authentication.getRequestHeader();

    if (headerResult.isFailure()) {
      throw headerResult.unwrap();
    }

    return this.sdk.RemoveReaction(request, headerResult.unwrap());
  }
}
