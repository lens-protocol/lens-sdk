import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import {
  getSdk,
  Sdk,
  SearchProfilesQueryVariables,
  SearchPublicationsQueryVariables,
} from './graphql/search.generated';

export class Search {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
  }

  async searchProfiles(request: SearchProfilesQueryVariables) {
    return this.sdk.SearchProfiles(request);
  }

  async remove(request: SearchPublicationsQueryVariables) {
    return this.sdk.SearchPublications(request);
  }
}
