import { DocumentNode } from '@apollo/client';
import {
  CommentFragmentDoc,
  MirrorFragmentDoc,
  PostFragmentDoc,
  AnyPublicationFragment,
  isMirrorPublication,
  ContentPublicationFragment,
} from '@lens-protocol/api-bindings';
import { CollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { PublicationCacheManager } from '../PublicationCacheManager';

function optimisticUpdate(publication: ContentPublicationFragment) {
  return {
    ...publication,
    hasOptimisticCollectedByMe: true,
    stats: {
      ...publication.stats,
      totalAmountOfCollects: publication.stats.totalAmountOfCollects + 1,
    },
  };
}

function confirmUpdate(publication: ContentPublicationFragment) {
  return {
    ...publication,
    hasCollectedByMe: true,
    hasOptimisticCollectedByMe: false,
  };
}

function revertUpdate(publication: ContentPublicationFragment) {
  return {
    ...publication,
    hasCollectedByMe: false,
    hasOptimisticCollectedByMe: false,
    stats: {
      ...publication.stats,
      totalAmountOfCollects: publication.stats.totalAmountOfCollects - 1,
    },
  };
}

export class CollectPublicationResponder implements ITransactionResponder<CollectRequest> {
  constructor(private readonly publicationCacheManager: PublicationCacheManager) {}

  typeToFragmentMap: Record<AnyPublicationFragment['__typename'], DocumentNode> = {
    Post: PostFragmentDoc,
    Comment: CommentFragmentDoc,
    Mirror: MirrorFragmentDoc,
  };

  async prepare({ request }: TransactionData<CollectRequest>) {
    this.publicationCacheManager.update(request.publicationId, (current) => {
      if (isMirrorPublication(current)) {
        return {
          ...current,
          mirrorOf: optimisticUpdate(current.mirrorOf),
        };
      }

      return optimisticUpdate(current);
    });
  }

  async commit({ request }: BroadcastedTransactionData<CollectRequest>) {
    this.publicationCacheManager.update(request.publicationId, (current) => {
      if (isMirrorPublication(current)) {
        return {
          ...current,
          mirrorOf: confirmUpdate(current.mirrorOf),
        };
      }

      return confirmUpdate(current);
    });
  }

  async rollback({ request }: TransactionData<CollectRequest>) {
    this.publicationCacheManager.update(request.publicationId, (current) => {
      if (isMirrorPublication(current)) {
        return {
          ...current,
          mirrorOf: revertUpdate(current.mirrorOf),
        };
      }

      return revertUpdate(current);
    });
  }
}
