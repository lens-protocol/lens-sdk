import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import {
  CommentFragment,
  CommonPaginatedResultInfoFragment,
  PostFragment,
  ProfileFragment,
} from '../graphql/fragments.generated';
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers';
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

  async searchProfiles(request: SearchProfilesQueryVariables): Promise<
    PaginatedResult<{
      items: ProfileFragment[];
      pageInfo: CommonPaginatedResultInfoFragment;
    }>
  > {
    return buildPaginatedQueryResult(async (variables) => {
      const result = await this.sdk.SearchProfiles(variables);

      return result.data.result;
    }, request);
  }

  async searchPublications(request: SearchPublicationsQueryVariables): Promise<
    PaginatedResult<{
      items: (CommentFragment | PostFragment)[];
      pageInfo: CommonPaginatedResultInfoFragment;
    }>
  > {
    return buildPaginatedQueryResult(async (variables) => {
      const result = await this.sdk.SearchPublications(variables);

      return result.data.result;
    }, request);
  }
}
