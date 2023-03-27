import {
  LensApolloClient,
  ProxyActionDocument,
  ProxyActionData,
  ProxyActionVariables,
  ProxyActionRequest,
} from '@lens-protocol/api-bindings';
import {
  ProxyTransaction,
  TransactionError,
  TransactionErrorReason,
} from '@lens-protocol/domain/entities';
import { FreeCollectRequest } from '@lens-protocol/domain/use-cases/publications';
import { ISignlessProtocolCallRelayer } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, getID, ILogger } from '@lens-protocol/shared-kernel';

import { ITransactionFactory, RelayProxyReceipt } from './ITransactionFactory';

export class CollectProxyActionRelayer<T extends FreeCollectRequest>
  implements ISignlessProtocolCallRelayer<T>
{
  constructor(
    private apolloClient: LensApolloClient,
    private factory: ITransactionFactory<T>,
    private logger: ILogger,
  ) {}

  async relaySignlessProtocolCall(request: T): Promise<ProxyTransaction<T>> {
    const relayProxyReceipt = await this.broadcast(request);

    return this.factory.createProxyTransaction({
      chainType: ChainType.POLYGON,
      id: getID(),
      request,
      proxyId: relayProxyReceipt.proxyId,
    });
  }

  private async broadcast(request: T): Promise<RelayProxyReceipt> {
    try {
      return await this.executeBroadcast({
        collect: {
          freeCollect: {
            publicationId: request.publicationId,
          },
        },
      });
    } catch (error) {
      this.logger.error(error, 'It was not possible to relay the transaction');
      throw new TransactionError(TransactionErrorReason.CANNOT_EXECUTE);
    }
  }

  private async executeBroadcast(request: ProxyActionRequest): Promise<RelayProxyReceipt> {
    const { data } = await this.apolloClient.mutate<ProxyActionData, ProxyActionVariables>({
      mutation: ProxyActionDocument,
      variables: {
        request,
      },
    });

    return { proxyId: data.result };
  }
}
