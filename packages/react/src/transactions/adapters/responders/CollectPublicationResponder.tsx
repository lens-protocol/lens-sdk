import {
  LensApolloClient,
  Sources,
  activeProfileIdentifierVar,
  GetPublicationDocument,
  GetPublicationData,
  GetPublicationVariables,
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

    await this.client.query<GetPublicationData, GetPublicationVariables>({
      query: GetPublicationDocument,
      variables: {
        request: {
          publicationId: request.publicationId,
        },
        observerId: activeProfile?.id,
        sources: this.sources,
      },
      fetchPolicy: 'network-only',
    });
  }
}
