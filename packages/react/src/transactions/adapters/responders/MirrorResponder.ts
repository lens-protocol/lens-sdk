import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  PublicationByTxHashDocument,
  PublicationByTxHashQuery,
  PublicationByTxHashQueryVariables,
} from '@lens-protocol/api-bindings';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { PublicationCacheManager } from '../PublicationCacheManager';

export class MirrorResponder implements ITransactionResponder<CreateMirrorRequest> {
  readonly publicationCacheManager: PublicationCacheManager;

  constructor(private client: ApolloClient<NormalizedCacheObject>) {
    this.publicationCacheManager = new PublicationCacheManager(client.cache);
  }

  async prepare({ request }: TransactionData<CreateMirrorRequest>) {
    this.publicationCacheManager.update(request.publicationId, (current) => ({
      ...current,
      isOptimisticMirroredByMe: true,
      stats: {
        ...current.stats,
        totalAmountOfMirrors: current.stats.totalAmountOfMirrors + 1,
      },
    }));
  }

  async commit({ request, txHash }: BroadcastedTransactionData<CreateMirrorRequest>) {
    // refresh the publication to get new mirror id from API
    await this.client.query<PublicationByTxHashQuery, PublicationByTxHashQueryVariables>({
      query: PublicationByTxHashDocument,
      variables: { txHash, observerId: request.profileId },
      fetchPolicy: 'network-only',
    });

    this.publicationCacheManager.update(request.publicationId, (current) => ({
      ...current,
      isOptimisticMirroredByMe: false,
    }));
  }

  async rollback({ request }: TransactionData<CreateMirrorRequest>) {
    this.publicationCacheManager.update(request.publicationId, (current) => ({
      ...current,
      isOptimisticMirroredByMe: false,
      stats: {
        ...current.stats,
        totalAmountOfMirrors: current.stats.totalAmountOfMirrors - 1,
      },
    }));
  }
}
