import { GraphQLClient } from 'graphql-request';

import { CommentFragment, MirrorFragment, PostFragment } from '../graphql/fragments.generated';
import { getSdk, Sdk } from './graphql/publication.generated';

export type PublicationFragment = PostFragment | CommentFragment | MirrorFragment;

export class Publication {
  private readonly sdk: Sdk;

  constructor(gqlClient: GraphQLClient) {
    this.sdk = getSdk(gqlClient);
  }

  async getPublicationById(publicationId: string): Promise<PublicationFragment | null> {
    const result = await this.sdk.Publication({
      publicationId,
    });

    return result.data.result;
  }
}
