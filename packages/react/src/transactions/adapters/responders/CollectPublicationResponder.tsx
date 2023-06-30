import {
  GetPublicationData,
  GetPublicationDocument,
  GetPublicationVariables,
  getSession,
  SafeApolloClient,
  SessionType,
  Sources,
} from '@lens-protocol/api-bindings';
import { CollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

export class CollectPublicationResponder implements ITransactionResponder<CollectRequest> {
  constructor(private readonly client: SafeApolloClient, private readonly sources: Sources) {}

  async commit({ request }: TransactionData<CollectRequest>) {
    const session = getSession();

    await this.client.query<GetPublicationData, GetPublicationVariables>({
      query: GetPublicationDocument,
      variables: {
        request: {
          publicationId: request.publicationId,
        },
        observerId: session?.type === SessionType.WithProfile ? session.profile.id : null,
        sources: this.sources,
      },
      fetchPolicy: 'network-only',
    });
  }
}
