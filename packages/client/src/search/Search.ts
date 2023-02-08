import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import { buildPaginatedQueryResult } from '../helpers';
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
    return buildPaginatedQueryResult((variables) => this.sdk.SearchProfiles(variables), request);
  }

  async searchPublications(request: SearchPublicationsQueryVariables) {
    return buildPaginatedQueryResult(
      (variables) => this.sdk.SearchPublications(variables),
      request,
    );
  }
}
