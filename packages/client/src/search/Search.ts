import { invariant } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import { CommentFragment, PostFragment, ProfileFragment } from '../graphql/fragments.generated';
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers/buildPaginatedQueryResult';
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

  async profiles(request: SearchProfilesQueryVariables): Promise<PaginatedResult<ProfileFragment>> {
    return buildPaginatedQueryResult(async (variables) => {
      const response = await this.sdk.SearchProfiles(variables);
      const result = response.data.result;

      invariant(
        result.__typename !== 'PublicationSearchResult',
        'PublicationSearchResult is not expected in this query',
      );

      return result;
    }, request);
  }

  async publications(
    request: SearchPublicationsQueryVariables,
  ): Promise<PaginatedResult<CommentFragment | PostFragment>> {
    return buildPaginatedQueryResult(async (variables) => {
      const response = await this.sdk.SearchPublications(variables);
      const result = response.data.result;

      invariant(
        result.__typename !== 'ProfileSearchResult',
        'ProfileSearchResult is not expected in this query',
      );

      return result;
    }, request);
  }
}
