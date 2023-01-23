import { GraphQLClient } from 'graphql-request';

import { getSdk, Sdk } from './graphql/queries.generated';
import { LensConfig } from '../consts/config';
import { ProfileFragment } from '../graphql/fragments.generated';
import { SingleProfileQueryRequest } from '../graphql/types.generated';

export class Profile {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk(client);
  }

  async fetch(
    request: SingleProfileQueryRequest,
    observerId?: string,
  ): Promise<ProfileFragment | null> {
    const result = await this.sdk.Profile({
      request,
      observerId,
    });

    return result.data.result;
  }
}
