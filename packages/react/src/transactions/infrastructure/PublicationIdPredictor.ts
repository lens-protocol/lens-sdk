/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  SafeApolloClient,
  GetPublicationsDocument,
  GetPublicationsData,
  GetPublicationsVariables,
} from '@lens-protocol/api-bindings';
import { ProfileId, PublicationId, TransactionKind } from '@lens-protocol/domain/entities';
import { hasAtLeastOne, never } from '@lens-protocol/shared-kernel';

import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { publicationId } from '../../utils';
import { PendingTransactionGateway } from '../adapters/PendingTransactionGateway';
import { IPublicationIdPredictor } from './AccessConditionBuilderFactory';

function formatPublicationId(profileId: ProfileId, newSequentialId: number): PublicationId {
  return publicationId(`${profileId}-0x${newSequentialId.toString(16)}`);
}

export class PublicationIdPredictor implements IPublicationIdPredictor {
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly pendingTransactionGateway: PendingTransactionGateway,
  ) {}

  async predictNextPublicationIdFor(profileId: ProfileId): Promise<PublicationId> {
    const { data } = await this.apolloClient.query<GetPublicationsData, GetPublicationsVariables>({
      query: GetPublicationsDocument,
      variables: {
        profileId,
        sources: [],
        limit: 1,
        ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
      },
    });

    if (hasAtLeastOne(data.result.items)) {
      const { id } = data.result.items[0];
      const onchainId =
        id.split('-').pop() ??
        never(`Publication id is not in the expected "<profile-id>-<sequential-id>" format: ${id}`);

      const last = parseInt(onchainId, 16);
      return formatPublicationId(profileId, await this.computeNextSequentialIdFor(last, profileId));
    }

    return formatPublicationId(profileId, await this.computeNextSequentialIdFor(0, profileId));
  }

  private async computeNextSequentialIdFor(
    baseline: number,
    profileId: ProfileId,
  ): Promise<number> {
    const pendingPublicationTransactions = await this.countPendingPublicationTransactionsFor(
      profileId,
    );
    return baseline + pendingPublicationTransactions + 1;
  }

  private async countPendingPublicationTransactionsFor(profileId: ProfileId): Promise<number> {
    const allPendingTransactions = await this.pendingTransactionGateway.getAll();
    const pendingPublicationTransactions = allPendingTransactions.filter((transaction) => {
      switch (transaction.request.kind) {
        case TransactionKind.CREATE_COMMENT:
        case TransactionKind.CREATE_POST:
        case TransactionKind.MIRROR_PUBLICATION:
          return transaction.request.profileId === profileId;
      }
      return false;
    });

    return pendingPublicationTransactions.length;
  }
}
