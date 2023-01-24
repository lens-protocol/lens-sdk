import { CommentFragment, MirrorFragment, PostFragment, Sdk } from './graphql/generated';

export type PublicationFragment = PostFragment | CommentFragment | MirrorFragment;

export class Publication {
  constructor(private readonly sdk: Sdk) {}

  async getPublicationById(publicationId: string): Promise<PublicationFragment | null> {
    const result = await this.sdk.Publication({
      publicationId,
    });

    return result.data.result;
  }
}
