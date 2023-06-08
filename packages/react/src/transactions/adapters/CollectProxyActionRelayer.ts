import {
  SafeApolloClient,
  ProxyActionDocument,
  ProxyActionData,
  ProxyActionVariables,
  ProxyActionRequest,
} from '@lens-protocol/api-bindings';
import { ProxyTransaction } from '@lens-protocol/domain/entities';
import { FreeCollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  ISignlessSubsidizedCallRelayer,
} from '@lens-protocol/domain/use-cases/transactions';
import { assertError, ChainType, getID, ILogger } from '@lens-protocol/shared-kernel';

import { ITransactionFactory } from './ITransactionFactory';
import { ProxyReceipt } from './ProxyReceipt';

export class CollectProxyActionRelayer<T extends FreeCollectRequest>
  implements ISignlessSubsidizedCallRelayer<T>
{
  constructor(
    private apolloClient: SafeApolloClient,
    private factory: ITransactionFactory<FreeCollectRequest>,
    private logger: ILogger,
  ) {}

  async createProxyTransaction(request: T): Promise<ProxyTransaction<T>> {
    const proxyReceipt = await this.proxy(request);

    return this.factory.createProxyTransaction({
      chainType: ChainType.POLYGON,
      id: getID(),
      request,
      proxyId: proxyReceipt.proxyId,
    });
  }

  private async proxy(request: T): Promise<ProxyReceipt> {
    try {
      return await this.broadcast({
        collect: {
          freeCollect: {
            publicationId: request.publicationId,
          },
        },
      });
    } catch (error) {
      assertError(error);
      this.logger.error(error, 'It was not possible to relay the transaction');
      throw new BroadcastingError(error.message);
    }
  }

  private async broadcast(request: ProxyActionRequest): Promise<ProxyReceipt> {
    const { data } = await this.apolloClient.mutate<ProxyActionData, ProxyActionVariables>({
      mutation: ProxyActionDocument,
      variables: {
        request,
      },
    });

    return { proxyId: data.result };
  }
}
