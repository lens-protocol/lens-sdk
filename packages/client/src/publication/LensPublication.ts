import { LensClient } from '../LensClient';
import { CommentFragment, MirrorFragment, PostFragment } from '../graphql/fragments.generated';
import { getSdk, Sdk } from './graphql/publication.generated';

export type PublicationFragment = PostFragment | CommentFragment | MirrorFragment;

export class LensPublication {
  private readonly sdk: Sdk;

  constructor(lensClient: LensClient) {
    this.sdk = getSdk(lensClient.client);
  }

  async getPublicationById(publicationId: string): Promise<PublicationFragment | null> {
    const result = await this.sdk.Publication({
      publicationId,
    });

    return result.data.result;
  }
}
