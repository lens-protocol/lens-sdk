import { makeVar } from '@apollo/client';
import {
  PendingPost,
  PublicationMainFocus,
  Profile,
  Post,
  isPostPublication,
  SafeApolloClient,
  Sources,
  GetPublicationData,
  GetPublicationVariables,
  GetPublicationDocument,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import {
  MediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../../mediaTransforms';
import { IProfileCacheManager } from '../IProfileCacheManager';

function pendingPost({
  id,
  author,
  request,
}: {
  id: string;
  author: Profile;
  request: CreatePostRequest;
}): PendingPost {
  return {
    __typename: 'PendingPost',
    id,
    profile: author,
    content: request.content ?? null,
    mainContentFocus: PublicationMainFocus[request.contentFocus],
    media:
      request.media?.map((media) => ({
        __typename: 'Media',
        altTag: media.altTag ?? null,
        cover: media.cover ?? null,
        mimeType: media.mimeType,
        url: media.url,
      })) ?? null,
    locale: request.locale,
  };
}

export const recentPosts = makeVar<ReadonlyArray<PendingPost | Post>>([]);

export class CreatePostResponder implements ITransactionResponder<CreatePostRequest> {
  constructor(
    private readonly profileCacheManager: IProfileCacheManager,
    private readonly client: SafeApolloClient,
    private readonly sources: Sources,
    private readonly mediaTransforms: MediaTransformsConfig,
  ) {}

  async prepare({ id, request }: TransactionData<CreatePostRequest>) {
    const author = await this.profileCacheManager.fetchProfile({ id: request.profileId });

    invariant(author, 'Cannot find author profile');

    const post = pendingPost({ id, author, request });

    recentPosts([post, ...recentPosts()]);
  }

  async commit({ id, txHash, request }: TransactionData<CreatePostRequest>) {
    const publicationResult = await this.client.query<GetPublicationData, GetPublicationVariables>({
      query: GetPublicationDocument,
      variables: {
        request: txHash ? { txHash } : { publicationId: id as PublicationId },
        observerId: request.profileId,
        sources: this.sources,
        ...mediaTransformConfigToQueryVariables(this.mediaTransforms),
      },
      fetchPolicy: 'network-only',
    });

    const publication = publicationResult.data.result;
    invariant(publication, 'Publication by hash query should return data');
    invariant(isPostPublication(publication), 'Publication should be a post');

    recentPosts(
      recentPosts().map((post) => {
        if (post.id === id) {
          return publication;
        }
        return post;
      }),
    );
  }

  async rollback({ id }: TransactionData<CreatePostRequest>) {
    recentPosts(recentPosts().filter((post) => post.id !== id));
  }
}
