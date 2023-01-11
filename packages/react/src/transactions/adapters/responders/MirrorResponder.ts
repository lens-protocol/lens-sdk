import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  PublicationByTxHashDocument,
  PublicationByTxHashQuery,
  PublicationByTxHashQueryVariables,
  PostFragment,
  PostFragmentDoc,
} from '@lens-protocol/api-bindings';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';

export class MirrorResponder implements ITransactionResponder<CreateMirrorRequest> {
  constructor(private client: ApolloClient<NormalizedCacheObject>) {}

  async prepare({ request }: TransactionData<CreateMirrorRequest>) {
    const postIdentifier = this.client.cache.identify({
      __typename: 'Post',
      id: request.publicationId,
    });

    const snapshot = this.client.cache.readFragment<PostFragment>({
      id: postIdentifier,
      fragmentName: 'Post',
      fragment: PostFragmentDoc,
    });

    if (snapshot) {
      this.client.cache.writeFragment({
        id: postIdentifier,
        fragmentName: 'Post',
        fragment: PostFragmentDoc,
        data: {
          ...snapshot,
          stats: {
            ...snapshot.stats,
            totalAmountOfMirrors: snapshot.stats.totalAmountOfMirrors + 1,
          },
        },
      });
    }
  }

  async commit({ request, txHash }: BroadcastedTransactionData<CreateMirrorRequest>) {
    // updates Publication in cache
    // need to refresh the publication to get new mirror id
    await this.client.query<PublicationByTxHashQuery, PublicationByTxHashQueryVariables>({
      query: PublicationByTxHashDocument,
      variables: { txHash, observerId: request.profileId },
      fetchPolicy: 'network-only',
    });
  }
}
