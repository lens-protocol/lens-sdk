import { GraphQLClient } from 'graphql-request';

import { ReactionRequest } from '../graphql/types.generated';
import { getSdk, Sdk } from './graphql/reaction.generated';

export { ReactionTypes } from '../graphql/types.generated';

export class Reaction {
  private readonly sdk: Sdk;

  constructor(backendUrl: string, accessToken: string) {
    const client = new GraphQLClient(backendUrl);
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
