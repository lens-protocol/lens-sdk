import { GraphQLClient } from 'graphql-request';

import { EnvironmentConfig } from './consts/environments';

export type LensClientConfig = {
  environment: EnvironmentConfig;
};

interface IWithGraphQLClient {
  get client(): GraphQLClient;
}

export class LensClient implements IWithGraphQLClient {
  constructor(private readonly config: LensClientConfig) {}

  get client() {
    return new GraphQLClient(this.config.environment.backend);
  }
}
