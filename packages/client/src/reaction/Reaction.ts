import { GraphQLClient } from 'graphql-request';

import { Environment } from '../consts/environments';
import { ReactionRequest } from '../graphql/types.generated';
import { getSdk, Sdk } from './graphql/reaction.generated';

export class Reaction {
  private readonly sdk: Sdk;

  constructor(env: Environment, accessToken: string) {
    const client = new GraphQLClient(env.gqlEndpoint);
    client.setHeader('authorization', `Bearer ${accessToken}`);
    this.sdk = getSdk(client);
  }

  async add(request: ReactionRequest) {
    return this.sdk.AddReaction(request);
  }

  async remove(request: ReactionRequest) {
    return this.sdk.RemoveReaction(request);
  }
}
