import { GraphQLClient } from 'graphql-request';

import { EnvironmentConfig } from './environments';
import { getSdk, Sdk } from './graphql/generated';

type LensClientConfig = {
  environment: EnvironmentConfig;
};
export class LensClient {
  private sdk: Sdk;

  constructor(config: LensClientConfig) {
    const client = new GraphQLClient(config.environment.backend);
    this.sdk = getSdk(client);
  }

  async generateChallenge(address: string): Promise<string> {
    const result = await this.sdk.AuthChallenge({ address });

    return result.data.result.text;
  }
}
