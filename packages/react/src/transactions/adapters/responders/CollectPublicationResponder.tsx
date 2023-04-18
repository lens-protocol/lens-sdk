import {
  LensApolloClient,
  Sources,
  PublicationDocument,
  PublicationData,
  PublicationVariables,
} from '@lens-protocol/api-bindings';
import { CollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

export class CollectPublicationResponder implements ITransactionResponder<CollectRequest> {
  constructor(private readonly client: LensApolloClient, private readonly sources: Sources) {}

  async commit({ request }: BroadcastedTransactionData<CollectRequest>) {
    await this.client.query<PublicationData, PublicationVariables>({
      query: PublicationDocument,
      variables: {
        publicationId: request.publicationId,
        sources: this.sources,
      },
      fetchPolicy: 'network-only',
    });
  }
}
