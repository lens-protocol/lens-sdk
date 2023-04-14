import {
  LensApolloClient,
  Sources,
  PublicationDocument,
  PublicationData,
  PublicationVariables,
  activeProfileIdentifierVar,
} from '@lens-protocol/api-bindings';
import { CollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

export class CollectPublicationResponder implements ITransactionResponder<CollectRequest> {
  constructor(private readonly client: LensApolloClient, private readonly sources: Sources) {}

  async commit({ request }: TransactionData<CollectRequest>) {
    const activeProfile = activeProfileIdentifierVar();

    await this.client.query<PublicationData, PublicationVariables>({
      query: PublicationDocument,
      variables: {
        publicationId: request.publicationId,
        observerId: activeProfile?.id,
        sources: this.sources,
      },
      fetchPolicy: 'network-only',
    });
  }
}
