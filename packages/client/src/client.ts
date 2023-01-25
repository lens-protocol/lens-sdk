import { GraphQLClient } from 'graphql-request';

import { Auth } from './auth/auth';
import { EnvironmentConfig } from './consts/environments';
import { Profile } from './profile/profile';
import { Publication } from './publication/publication';

export type LensClientConfig = {
  environment: EnvironmentConfig;
};

export class LensClient {
  readonly auth: Auth;
  readonly profile: Profile;
  readonly publication: Publication;

  constructor(config: LensClientConfig) {
    const client = new GraphQLClient(config.environment.backend);

    this.auth = new Auth(client);
    this.profile = new Profile(client);
    this.publication = new Publication(client);
  }
}
