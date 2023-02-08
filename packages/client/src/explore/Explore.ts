import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import { ExploreProfilesRequest, ExplorePublicationRequest } from '../graphql/types.generated';
import { getSdk, Sdk } from './graphql/explore.generated';

export class Explore {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
  }

  async explorePublications(request: ExplorePublicationRequest) {
    return this.sdk.ExplorePublications({ request });
  }

  async exploreProfiles(request: ExploreProfilesRequest) {
    return this.sdk.ExploreProfiles({ request });
  }
}
