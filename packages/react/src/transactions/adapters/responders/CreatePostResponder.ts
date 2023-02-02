import { makeVar } from '@apollo/client';
import {
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  PendingPostFragment,
  PublicationMainFocus,
  PublicationByTxHashQuery,
  PublicationByTxHashQueryVariables,
  PublicationByTxHashDocument,
  ProfileFragment,
  PostFragment,
  isPostPublication,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

function pendingPostFragment({
  id,
  author,
  request,
}: {
  id: string;
  author: ProfileFragment;
  request: CreatePostRequest;
}): PendingPostFragment {
  return {
    __typename: 'PendingPost',
    id,
    profile: author,
    content: request.content ?? null,
    mainContentFocus: PublicationMainFocus[request.contentFocus],
    media:
      request.media?.map((media) => ({
        __typename: 'Media',
        mimeType: media.mimeType,
        url: media.url,
      })) ?? null,
    locale: request.locale,
  };
}

export const recentPosts = makeVar<ReadonlyArray<PendingPostFragment | PostFragment>>([]);

export class CreatePostResponder implements ITransactionResponder<CreatePostRequest> {
  constructor(private readonly client: LensApolloClient) {}

  async prepare({ id, request }: TransactionData<CreatePostRequest>) {
    const result = await this.client.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: {
        request: {
          profileId: request.profileId,
        },
      },
      fetchPolicy: 'cache-first',
    });

    const author = result.data.result;
    invariant(author, 'Cannot find author profile');

    const pendingPost = pendingPostFragment({ id, author, request });

    recentPosts([pendingPost, ...recentPosts()]);
  }

  async commit({ id, txHash, request }: BroadcastedTransactionData<CreatePostRequest>) {
    const publicationResult = await this.client.query<
      PublicationByTxHashQuery,
      PublicationByTxHashQueryVariables
    >({
      query: PublicationByTxHashDocument,
      variables: {
        txHash,
        observerId: request.profileId,
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
