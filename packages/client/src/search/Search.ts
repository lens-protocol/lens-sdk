import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import {
  CommentFragment,
  CommonPaginatedResultInfoFragment,
  PostFragment,
  ProfileFragment,
} from '../graphql/fragments.generated';
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

  async profiles(request: SearchProfilesQueryVariables): Promise<{
    items: Array<ProfileFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.SearchProfiles(request);
    return result.data.result;
  }

  async publications(request: SearchPublicationsQueryVariables): Promise<{
    items: Array<PostFragment | CommentFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.SearchPublications(request);
    return result.data.result;
  }
}
