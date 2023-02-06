import { DocumentNode } from '@apollo/client';
import {
  CommentFragmentDoc,
  MirrorFragmentDoc,
  PostFragmentDoc,
  PublicationFragment,
} from '@lens-protocol/api-bindings';
import { CollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { PublicationCacheManager } from '../PublicationCacheManager';

export class CollectPublicationResponder implements ITransactionResponder<CollectRequest> {
  constructor(private readonly publicationCacheManager: PublicationCacheManager) {}

  typeToFragmentMap: Record<PublicationFragment['__typename'], DocumentNode> = {
    Post: PostFragmentDoc,
    Comment: CommentFragmentDoc,
    Mirror: MirrorFragmentDoc,
  };

  async prepare({ request }: TransactionData<CollectRequest>) {
    this.publicationCacheManager.update(request.publicationId, (current) => ({
      ...current,
      hasOptimisticCollectedByMe: true,
      stats: {
        ...current.stats,
        totalAmountOfCollects: current.stats.totalAmountOfCollects + 1,
      },
    }));
  }

  async commit({ request }: BroadcastedTransactionData<CollectRequest>) {
    this.publicationCacheManager.update(request.publicationId, (current) => ({
      ...current,
      hasCollectedByMe: true,
    }));
  }

  async rollback({ request }: TransactionData<CollectRequest>) {
    this.publicationCacheManager.update(request.publicationId, (current) => ({
      ...current,
      hasOptimisticCollectedByMe: false,
      stats: {
        ...current.stats,
        totalAmountOfCollects: current.stats.totalAmountOfCollects - 1,
      },
    }));
  }
}
