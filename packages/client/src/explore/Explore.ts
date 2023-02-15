import { GraphQLClient } from 'graphql-request';

import { getSdk, Sdk } from './graphql/explore.generated';
import { LensConfig } from '../consts/config';
import {
  CommentFragment,
  CommonPaginatedResultInfoFragment,
  MirrorFragment,
  PostFragment,
  ProfileFragment,
} from '../graphql/fragments.generated';
import { ExploreProfilesRequest, ExplorePublicationRequest } from '../graphql/types.generated';

export class Explore {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
  }

  async publications(request: ExplorePublicationRequest): Promise<{
    items: Array<PostFragment | CommentFragment | MirrorFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.ExplorePublications({ request });
    return result.data.result;
  }

  async profiles(request: ExploreProfilesRequest): Promise<{
    items: Array<ProfileFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.ExploreProfiles({ request });
    return result.data.result;
  }
}
