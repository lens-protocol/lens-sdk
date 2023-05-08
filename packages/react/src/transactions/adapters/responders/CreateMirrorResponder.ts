import {
  LensApolloClient,
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
import { invariant } from '@lens-protocol/shared-kernel';

export class CreateMirrorResponder implements ITransactionResponder<CreateMirrorRequest> {
  constructor(private readonly client: LensApolloClient, private readonly sources: Sources) {}

  async commit({ txHash }: TransactionData<CreateMirrorRequest>) {
    invariant(txHash, 'Cannot fetch publication by txHash without txHash');
    const activeProfile = activeProfileIdentifierVar();

    await this.client.query<GetPublicationData, GetPublicationVariables>({
      query: GetPublicationDocument,
      variables: {
        request: { txHash },
        observerId: activeProfile?.id,
        sources: this.sources,
      },
      fetchPolicy: 'network-only',
    });
  }
}
