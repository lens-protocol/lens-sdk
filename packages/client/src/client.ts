import { GraphQLClient } from 'graphql-request';

import { Auth } from './auth';
import { EnvironmentConfig } from './environments';
import { getSdk, Sdk } from './graphql/generated';
import { Profile } from './profile';
import { Publication } from './publication';

type LensClientConfig = {
  environment: EnvironmentConfig;
};

export class LensClient {
  private readonly sdk: Sdk;
  readonly auth: Auth;
  readonly profile: Profile;
  readonly publication: Publication;

  constructor(config: LensClientConfig) {
    const client = new GraphQLClient(config.environment.backend);
    this.sdk = getSdk(client);
    this.auth = new Auth(this.sdk);
    this.profile = new Profile(this.sdk);
    this.publication = new Publication(this.sdk);
  }
}
