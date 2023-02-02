import {
  LensApolloClient,
  ProxyActionDocument,
  ProxyActionMutation,
  ProxyActionMutationVariables,
  ProxyActionRequest,
} from '@lens-protocol/api-bindings';
import {
  ProxyTransaction,
  TransactionError,
  TransactionErrorReason,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import { UnconstrainedFollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { FreeCollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  ISignlessProtocolCallRelayer,
  SignlessProtocolCallRequestModel,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, getID, ILogger, invariant } from '@lens-protocol/shared-kernel';

import { ITransactionFactory, RelayProxyReceipt } from './ITransactionFactory';

export class SignlessProtocolCallRelayer
  implements ISignlessProtocolCallRelayer<SignlessProtocolCallRequestModel>
{
  constructor(
    private apolloClient: LensApolloClient,
    private factory: ITransactionFactory<SupportedTransactionRequest>,
    private logger: ILogger,
  ) {}

  async relaySignlessProtocolCall<T extends SignlessProtocolCallRequestModel>(
    request: T,
  ): Promise<ProxyTransaction<T>> {
    const relayProxyReceipt = await this.broadcast(request);

    return this.factory.createProxyTransaction({
      chainType: ChainType.POLYGON,
      id: getID(),
      request,
      proxyId: relayProxyReceipt.proxyId,
    });
  }

  private async broadcast<T extends SignlessProtocolCallRequestModel>(
    request: T,
  ): Promise<RelayProxyReceipt> {
    try {
      switch (request.kind) {
        case TransactionKind.FOLLOW_PROFILES:
          return await this.broadcastFollow(request);
        case TransactionKind.COLLECT_PUBLICATION:
          return await this.broadcastCollect(request);
      }
    } catch (error) {
      this.logger.error(error, 'It was not possible to relay the transaction');
      throw new TransactionError(TransactionErrorReason.CANNOT_EXECUTE);
    }
  }

  private async broadcastFollow(request: UnconstrainedFollowRequest): Promise<RelayProxyReceipt> {
    return this.executeBroadcast({
      follow: {
        freeFollow: {
          profileId: request.profileId,
        },
      },
    });
  }

  private async broadcastCollect(request: FreeCollectRequest): Promise<RelayProxyReceipt> {
    return this.executeBroadcast({
      collect: {
        freeCollect: {
          publicationId: request.publicationId,
        },
      },
    });
  }

  private async executeBroadcast(request: ProxyActionRequest): Promise<RelayProxyReceipt> {
    const { data } = await this.apolloClient.mutate<
      ProxyActionMutation,
      ProxyActionMutationVariables
    >({
      mutation: ProxyActionDocument,
      variables: {
        request,
      },
    });

    invariant(data, `Cannot relay proxy transaction`);

    return { proxyId: data.result };
  }
}
