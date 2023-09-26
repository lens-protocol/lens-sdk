import {
  GetPublicationData,
  GetPublicationDocument,
  GetPublicationVariables,
  getSession,
  PublicationStats,
  SafeApolloClient,
  SessionType,
  Sources,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import {
  mediaTransformConfigToQueryVariables,
  MediaTransformsConfig,
} from '../../../mediaTransforms';

export class CreateMirrorResponder implements ITransactionResponder<CreateMirrorRequest> {
  constructor(
    private readonly client: SafeApolloClient,
    private readonly sources: Sources,
    private readonly mediaTransforms: MediaTransformsConfig,
  ) {}

  async prepare({ request }: TransactionData<CreateMirrorRequest>) {
    const identifier = this.client.cache.identify({
      __typename: 'Post',
      id: request.publicationId,
    });
    this.client.cache.modify({
      id: identifier,
      fields: {
        stats(existing: PublicationStats) {
          return {
            ...existing,
            totalAmountOfMirrors: existing.totalAmountOfMirrors + 1,
          };
        },
      },
    });
  }

  async commit({ request }: TransactionData<CreateMirrorRequest>) {
    await this.refetchPublicationFromNetwork(request.publicationId);
  }

  async rollback({ request }: TransactionData<CreateMirrorRequest>) {
    await this.refetchPublicationFromNetwork(request.publicationId);
  }

  private async refetchPublicationFromNetwork(publicationId: PublicationId) {
    const session = getSession();

    await this.client.query<GetPublicationData, GetPublicationVariables>({
      query: GetPublicationDocument,
      variables: {
        request: {
          publicationId,
        },
        observerId: session?.type === SessionType.WithProfile ? session.profile.id : null,
        sources: this.sources,
        ...mediaTransformConfigToQueryVariables(this.mediaTransforms),
      },
      fetchPolicy: 'network-only',
    });
  }
}
