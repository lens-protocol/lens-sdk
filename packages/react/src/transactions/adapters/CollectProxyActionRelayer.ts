import {
  LensApolloClient,
  ProxyActionData,
  ProxyActionDocument,
  ProxyActionRequest,
  ProxyActionVariables,
} from '@lens-protocol/api-bindings';
import { ProxyTransaction } from '@lens-protocol/domain/entities';
import { FreeCollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  ISignlessSubsidizedCallRelayer,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  ChainType,
  ILogger,
  PromiseResult,
  assertError,
  failure,
  getID,
  success,
} from '@lens-protocol/shared-kernel';

import { ITransactionFactory } from './ITransactionFactory';
import { ProxyReceipt } from './ProxyReceipt';

export class CollectProxyActionRelayer<T extends FreeCollectRequest>
  implements ISignlessSubsidizedCallRelayer<T>
{
  constructor(
    private apolloClient: LensApolloClient,
    private factory: ITransactionFactory<FreeCollectRequest>,
    private logger: ILogger,
  ) {}

  async createProxyTransaction(request: T): PromiseResult<ProxyTransaction<T>, BroadcastingError> {
    const proxyReceipt = await this.proxy(request);

    if (proxyReceipt.isFailure()) {
      return failure(proxyReceipt.error);
    }

    return success(
      this.factory.createProxyTransaction({
        chainType: ChainType.POLYGON,
        id: getID(),
        request,
        proxyId: proxyReceipt.value.proxyId,
      }),
    );
  }

  private async proxy(request: T): PromiseResult<ProxyReceipt, BroadcastingError> {
    try {
      const broadcastResult = await this.broadcast({
        collect: {
          freeCollect: {
            publicationId: request.publicationId,
          },
        },
      });
      return success(broadcastResult);
    } catch (error) {
      assertError(error);
      this.logger.error(error, 'It was not possible to relay the transaction');
      return failure(new BroadcastingError(error.message));
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
