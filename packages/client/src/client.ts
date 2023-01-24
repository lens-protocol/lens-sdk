import { GraphQLClient } from 'graphql-request';

import { Auth } from './auth';
import { EnvironmentConfig } from './environments';
import { getSdk, Sdk } from './graphql/generated';

type LensClientConfig = {
  environment: EnvironmentConfig;
};

export class LensClient {
  private readonly sdk: Sdk;
  readonly auth: Auth;

  constructor(config: LensClientConfig) {
    const client = new GraphQLClient(config.environment.backend);
    this.sdk = getSdk(client);
    this.auth = new Auth(this.sdk);
  }
}
