import {
  LensApolloClient,
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
import {
  assertError,
  ChainType,
  failure,
  getID,
  ILogger,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';

import { ITransactionFactory } from './ITransactionFactory';
import { ProxyReceipt } from './ProxyReceipt';
import { ProxyActionUsageLimitExceededError } from '@lens-protocol/domain/src/use-cases/transactions/ProxyActionUsageLimitExceededError';

export class CollectProxyActionRelayer<T extends FreeCollectRequest>
  implements ISignlessSubsidizedCallRelayer<T>
{
  constructor(
    private apolloClient: LensApolloClient,
    private factory: ITransactionFactory<FreeCollectRequest>,
    private logger: ILogger,
  ) {}

  async createProxyTransaction(
    request: T,
  ): PromiseResult<ProxyTransaction<T>, ProxyActionUsageLimitExceededError> {
    try {
      const proxyReceipt = await this.proxy(request);

      return success(
        this.factory.createProxyTransaction({
          chainType: ChainType.POLYGON,
          id: getID(),
          request,
          proxyId: proxyReceipt.proxyId,
        }),
      );
    } catch (error) {
      assertError(error);
      this.logger.error(error, 'It was not possible to create the proxy transaction');
      if (error.message.includes('Usage limit exceeded')) {
        return failure(new ProxyActionUsageLimitExceededError(error.message));
      }
      throw error;
    }
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
