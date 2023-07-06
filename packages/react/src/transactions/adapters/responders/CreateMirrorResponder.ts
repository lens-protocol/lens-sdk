import {
  getAllPendingTransactions,
  GetPublicationData,
  GetPublicationDocument,
  GetPublicationVariables,
  getSession,
  isMirrorTransactionFor,
  PublicationStats,
  SafeApolloClient,
  SessionType,
  Sources
} from '@lens-protocol/api-bindings';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

export class CreateMirrorResponder implements ITransactionResponder<CreateMirrorRequest> {
  constructor(private readonly client: SafeApolloClient, private readonly sources: Sources) {}

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
    const session = getSession();

    const result = await this.client.query<GetPublicationData, GetPublicationVariables>({
      query: GetPublicationDocument,
      variables: {
        request: {
          publicationId: request.publicationId,
        },
        observerId: session?.type === SessionType.WithProfile ? session.profile.id : null,
        sources: this.sources,
      },
      fetchPolicy: 'no-cache',
    });

    const publication = result.data.result;

    invariant(publication, 'Publication not found');
    invariant(publication.__typename !== 'Mirror', 'Publication is a mirror');
    invariant(session?.type === SessionType.WithProfile, 'Session not found');

    // mirror
    const isMirrorTransactionForThisPublication = isMirrorTransactionFor({
      publicationId: publication.id,
      profileId: session.profile.id,
    });

    const mirrorPendingTxs = getAllPendingTransactions().filter((transaction) => {
      return isMirrorTransactionForThisPublication(transaction);
    });

    console.log(new Date().toISOString(), 'Updating cache');
    const identifier = this.client.cache.identify({
      __typename: publication.__typename,
      id: publication.id,
    });
    this.client.cache.modify({
      id: identifier,
      fields: {
        stats() {
          return {
            ...publication.stats,
            totalAmountOfMirrors: publication.stats.totalAmountOfMirrors + mirrorPendingTxs.length,
          };
        },
        mirrors: () => {
          return publication.mirrors;
        },
      },
    });
  }
}
