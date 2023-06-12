import {
  SafeApolloClient,
  Sources,
  activeProfileIdentifierVar,
  GetPublicationData,
  GetPublicationVariables,
  GetPublicationDocument,
} from '@lens-protocol/api-bindings';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

export class CreateMirrorResponder implements ITransactionResponder<CreateMirrorRequest> {
  constructor(private readonly client: SafeApolloClient, private readonly sources: Sources) {}

  async commit({ request }: TransactionData<CreateMirrorRequest>) {
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
