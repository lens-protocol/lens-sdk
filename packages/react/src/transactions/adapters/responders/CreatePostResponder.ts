import { ApolloClient, makeReference, NormalizedCacheObject, Reference } from '@apollo/client';
import {
  PendingPostFragmentDoc,
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  PendingPostFragment,
  PublicationMainFocus,
  resolveFeedQueryCacheKey,
  PublicationByTxHashQuery,
  PublicationByTxHashQueryVariables,
  PublicationByTxHashDocument,
  PostFragmentDoc,
  ProfileFieldsFragment,
  Maybe,
  PaginatedResultInfo,
} from '@lens-protocol/api-bindings';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { invariant, never } from '@lens-protocol/shared-kernel';

type FeedItemFragmentEntry = {
  __typename: 'FeedItem';
  root: Reference;
  comments: Maybe<Reference[]>;
};

type PaginatedFeedResultEntry = {
  __typename: 'PaginatedFeedResult';
  items: FeedItemFragmentEntry[];
  pageInfo: PaginatedResultInfo;
};

function pendingPostFragment({
  id,
  author,
  request,
}: {
  id: string;
  author: ProfileFieldsFragment;
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

function feedItem(rootRef: Reference): FeedItemFragmentEntry {
  return {
    __typename: 'FeedItem',
    root: rootRef,
    comments: [],
  };
}

export class CreatePostResponder implements ITransactionResponder<CreatePostRequest> {
  constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {}

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

    const pendingPostRef =
      this.client.cache.writeFragment({
        data: pendingPost,
        fragment: PendingPostFragmentDoc,
        fragmentName: 'PendingPost',
      }) ?? never();

    const authorFeedCacheKey = resolveFeedQueryCacheKey({
      profileId: request.profileId,
    });
    this.client.cache.modify({
      id: this.client.cache.identify(makeReference('ROOT_QUERY')),
      fields: {
        [authorFeedCacheKey]: (previous: PaginatedFeedResultEntry) => {
          const newFeedItem = feedItem(pendingPostRef);

          return {
            ...previous,
            items: [newFeedItem, ...previous.items],
          };
        },
      },
    });
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

    const postRef =
      this.client.cache.writeFragment({
        data: publication,
        fragment: PostFragmentDoc,
        fragmentName: 'Post',
      }) ?? never();

    const authorFeedCacheKey = resolveFeedQueryCacheKey({
      profileId: request.profileId,
    });
    this.client.cache.modify({
      id: this.client.cache.identify(makeReference('ROOT_QUERY')),
      fields: {
        [authorFeedCacheKey]: (previous: PaginatedFeedResultEntry, { readField }) => {
          const newFeedItem = feedItem(postRef);

          return {
            ...previous,
            items: previous.items.map((item) => {
              const itemId = readField<string>('id', item.root);

              if (itemId === id) {
                return newFeedItem;
              }
              return item;
            }),
          };
        },
      },
    });
  }

  async rollback({ id, request }: TransactionData<CreatePostRequest>) {
    const authorFeedCacheKey = resolveFeedQueryCacheKey({
      profileId: request.profileId,
    });

    this.client.cache.modify({
      id: this.client.cache.identify(makeReference('ROOT_QUERY')),
      fields: {
        [authorFeedCacheKey]: (previous: PaginatedFeedResultEntry, { readField }) => {
          return {
            ...previous,
            items: previous.items.filter((item) => {
              const itemId = readField<string>('id', item.root);
              return itemId !== id;
            }),
          };
        },
      },
    });
  }
}
