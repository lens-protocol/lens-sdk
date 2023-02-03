import { GraphQLClient } from 'graphql-request';

import { Credentials } from '../authentication';
import { LensConfig } from '../consts/config';
import { NotAuthenticatedError } from '../consts/errors';
import { ReactionRequest } from '../graphql/types.generated';
import { getSdk, Sdk } from './graphql/reactions.generated';

export class Reactions {
  private readonly sdk: Sdk;

  constructor(config: LensConfig, private readonly credentials?: Credentials) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    if (credentials) {
      client.setHeader('authorization', `Bearer ${credentials.accessToken}`);
    }

    this.sdk = getSdk(client);
  }

  async add(request: ReactionRequest) {
    if (!this.credentials) {
      throw new NotAuthenticatedError();
    }

    return this.sdk.AddReaction(request);
  }

  async remove(request: ReactionRequest) {
    if (!this.credentials) {
      throw new NotAuthenticatedError();
    }

    return this.sdk.RemoveReaction(request);
  }
}
