import {
  LensApolloClient,
  PublicationByTxHashDocument,
  PublicationByTxHashData,
  PublicationByTxHashVariables,
  Sources,
} from '@lens-protocol/api-bindings';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

export class CreateMirrorResponder implements ITransactionResponder<CreateMirrorRequest> {
  constructor(private readonly client: LensApolloClient, private readonly sources: Sources) {}

  async commit({ request, txHash }: BroadcastedTransactionData<CreateMirrorRequest>) {
    // refresh the publication to get new mirror id from API
    await this.client.query<PublicationByTxHashData, PublicationByTxHashVariables>({
      query: PublicationByTxHashDocument,
      variables: {
        txHash,
        observerId: request.profileId,
        sources: this.sources,
      },
      fetchPolicy: 'network-only',
    });
  }
}
