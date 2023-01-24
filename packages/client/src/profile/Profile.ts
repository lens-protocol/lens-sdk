import { GraphQLClient } from 'graphql-request';

import { ProfileFragment } from '../graphql/fragments.generated';
import { SingleProfileQueryRequest } from '../graphql/types.generated';
import { getSdk, Sdk } from './graphql/queries.generated';

export class Profile {
  private readonly sdk: Sdk;

  constructor(backendUrl: string) {
    const client = new GraphQLClient(backendUrl);
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

  async fetchDefault(address: string, observerId?: string): Promise<ProfileFragment | null> {
    const result = await this.sdk.DefaultProfile({
      address,
      observerId,
    });

    return result.data.result;
  }
}
