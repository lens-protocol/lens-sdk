import { DocumentNode } from '@apollo/client';
import {
  FragmentComment,
  FragmentMirror,
  FragmentPost,
  AnyPublication,
  isMirrorPublication,
  ContentPublication,
} from '@lens-protocol/api-bindings';
import { CollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { PublicationCacheManager } from '../PublicationCacheManager';

function optimisticUpdate(publication: ContentPublication) {
  return {
    ...publication,
    hasOptimisticCollectedByMe: true,
    stats: {
      ...publication.stats,
      totalAmountOfCollects: publication.stats.totalAmountOfCollects + 1,
    },
  };
}

function confirmUpdate(publication: ContentPublication) {
  return {
    ...publication,
    hasCollectedByMe: true,
    hasOptimisticCollectedByMe: false,
  };
}

function revertUpdate(publication: ContentPublication) {
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

  typeToFragmentMap: Record<AnyPublication['__typename'], DocumentNode> = {
    Post: FragmentPost,
    Comment: FragmentComment,
    Mirror: FragmentMirror,
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
