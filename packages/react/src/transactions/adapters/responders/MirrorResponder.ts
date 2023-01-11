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
  PostFragmentDoc,
  getPublicationTypename,
  PublicationFragment,
} from '@lens-protocol/api-bindings';
import { TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import {} from '@lens-protocol/api-bindings/dist/esm';

export class MirrorResponder implements ITransactionResponder<CreateMirrorRequest> {
  constructor(private client: ApolloClient<NormalizedCacheObject>) {}

  async prepare({ request }: TransactionData<CreateMirrorRequest>) {
    const publicationIdentifier = this.client.cache.identify({
      __typename: getPublicationTypename(request.publicationType),
      id: request.publicationId,
    });

    const snapshot = this.client.cache.readFragment<PublicationFragment>({
      id: publicationIdentifier,
      fragmentName: getPublicationTypename(request.publicationType),
      fragment: PostFragmentDoc,
    });

    if (snapshot) {
      this.client.cache.writeFragment<PublicationFragment>({
        id: publicationIdentifier,
        fragmentName: getPublicationTypename(request.publicationType),
        fragment: PostFragmentDoc,
        data: {
          ...snapshot,
          isOptimisticMirroredByMe: true,
          stats: {
            ...snapshot.stats,
            totalAmountOfMirrors: snapshot.stats.totalAmountOfMirrors + 1,
          },
        },
      });
    }
  }

  async commit({ request, txHash }: BroadcastedTransactionData<CreateMirrorRequest>) {
    // refresh the publication to get new mirror id from API
    await this.client.query<PublicationByTxHashQuery, PublicationByTxHashQueryVariables>({
      query: PublicationByTxHashDocument,
      variables: { txHash, observerId: request.profileId },
      fetchPolicy: 'network-only',
    });

    const publicationIdentifier = this.client.cache.identify({
      __typename: getPublicationTypename(request.publicationType),
      id: request.publicationId,
    });

    const snapshot = this.client.cache.readFragment<PublicationFragment>({
      id: publicationIdentifier,
      fragmentName: getPublicationTypename(request.publicationType),
      fragment: PostFragmentDoc,
    });

    if (snapshot) {
      this.client.cache.writeFragment<PublicationFragment>({
        id: publicationIdentifier,
        fragmentName: getPublicationTypename(request.publicationType),
        fragment: PostFragmentDoc,
        data: {
          ...snapshot,
          isOptimisticMirroredByMe: false,
        },
      });
    }
  }
}
