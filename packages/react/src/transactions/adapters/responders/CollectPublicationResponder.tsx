import { ApolloCache, DocumentNode, NormalizedCacheObject } from '@apollo/client';
import {
  getPublicationTypename,
  PostFragmentDoc,
  CommentFragmentDoc,
  MirrorFragmentDoc,
  PostFragment,
  CommentFragment,
  MirrorFragment,
  PublicationFragment,
} from '@lens-protocol/api-bindings';
import { CollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

export class CollectPublicationResponder implements ITransactionResponder<CollectRequest> {
  constructor(private apolloCache: ApolloCache<NormalizedCacheObject>) {}

  typeToFragmentMap: Record<PublicationFragment['__typename'], DocumentNode> = {
    Post: PostFragmentDoc,
    Comment: CommentFragmentDoc,
    Mirror: MirrorFragmentDoc,
  };

  async prepare({ request }: TransactionData<CollectRequest>) {
    const typeName = getPublicationTypename(request.publicationType);

    const id = this.apolloCache.identify({
      __typename: typeName,
      id: request.publicationId,
    });

    this.apolloCache.updateFragment<PostFragment | CommentFragment | MirrorFragment>(
      {
        id,
        fragmentName: typeName,
        fragment: this.typeToFragmentMap[typeName],
      },
      (data) =>
        data
          ? {
              ...data,
              hasOptimisticCollectedByMe: true,
              stats: {
                ...data.stats,
                totalAmountOfCollects: data.stats.totalAmountOfCollects + 1,
              },
            }
          : undefined,
    );
  }

  async commit({ request }: BroadcastedTransactionData<CollectRequest>) {
    const typeName = getPublicationTypename(request.publicationType);

    const id = this.apolloCache.identify({
      __typename: typeName,
      id: request.publicationId,
    });

    this.apolloCache.updateFragment<PostFragment | CommentFragment | MirrorFragment>(
      {
        id,
        fragmentName: typeName,
        fragment: this.typeToFragmentMap[typeName],
      },
      (data) =>
        data
          ? {
              ...data,
              hasCollectedByMe: true,
            }
          : undefined,
    );
  }

  async rollback({ request }: TransactionData<CollectRequest>) {
    const typeName = getPublicationTypename(request.publicationType);

    const id = this.apolloCache.identify({
      __typename: typeName,
      id: request.publicationId,
    });

    this.apolloCache.updateFragment<PostFragment | CommentFragment | MirrorFragment>(
      {
        id,
        fragmentName: typeName,
        fragment: this.typeToFragmentMap[typeName],
      },
      (data) =>
        data
          ? {
              ...data,
              hasOptimisticCollectedByMe: false,
              stats: {
                ...data.stats,
                totalAmountOfCollects: data.stats.totalAmountOfCollects - 1,
              },
            }
          : undefined,
    );
  }
}
