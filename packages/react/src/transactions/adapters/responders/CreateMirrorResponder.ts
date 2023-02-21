import {
  isContentPublication,
  LensApolloClient,
  PublicationByTxHashDocument,
  PublicationByTxHashQuery,
  PublicationByTxHashQueryVariables,
  Sources,
} from '@lens-protocol/api-bindings';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { PublicationCacheManager } from '../PublicationCacheManager';

export class CreateMirrorResponder implements ITransactionResponder<CreateMirrorRequest> {
  constructor(
    private readonly client: LensApolloClient,
    private readonly publicationCacheManager: PublicationCacheManager,
    private readonly sources: Sources,
  ) {}

  async prepare({ request }: TransactionData<CreateMirrorRequest>) {
    this.publicationCacheManager.update(request.publicationId, (current) => {
      invariant(isContentPublication(current), `Cannot mirror a ${current.__typename}`);

      return {
        ...current,
        isOptimisticMirroredByMe: true,
        stats: {
          ...current.stats,
          totalAmountOfMirrors: current.stats.totalAmountOfMirrors + 1,
        },
      };
    });
  }

  async commit({ request, txHash }: BroadcastedTransactionData<CreateMirrorRequest>) {
    // refresh the publication to get new mirror id from API
    await this.client.query<PublicationByTxHashQuery, PublicationByTxHashQueryVariables>({
      query: PublicationByTxHashDocument,
      variables: { txHash, observerId: request.profileId, sources: this.sources },
      fetchPolicy: 'network-only',
    });

    this.publicationCacheManager.update(request.publicationId, (current) => {
      invariant(isContentPublication(current), `Cannot mirror a ${current.__typename}`);

      return {
        ...current,
        isOptimisticMirroredByMe: false,
      };
    });
  }

  async rollback({ request }: TransactionData<CreateMirrorRequest>) {
    this.publicationCacheManager.update(request.publicationId, (current) => {
      invariant(isContentPublication(current), `Cannot mirror a ${current.__typename}`);

      return {
        ...current,
        isOptimisticMirroredByMe: false,
        stats: {
          ...current.stats,
          totalAmountOfMirrors: current.stats.totalAmountOfMirrors - 1,
        },
      };
    });
  }
}
