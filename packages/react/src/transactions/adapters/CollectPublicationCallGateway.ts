import {
  CreateCollectTypedDataDocument,
  CreateCollectTypedDataData,
  CreateCollectTypedDataVariables,
  LensApolloClient,
  omitTypename,
  ProxyActionData,
  ProxyActionDocument,
  ProxyActionRequest,
  ProxyActionVariables,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce, ProxyTransaction } from '@lens-protocol/domain/entities';
import { CollectRequest, FreeCollectRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IOnChainProtocolCallGateway,
  ISignlessSubsidizedCallRelayer,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  ChainType,
  ILogger,
  PromiseResult,
  assertError,
  failure,
  getID,
  invariant,
  success,
} from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from './ITransactionFactory';
import { ProxyReceipt } from './ProxyReceipt';
import { Data, SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

export class CollectPublicationCallGateway
  implements
    IOnChainProtocolCallGateway<CollectRequest>,
    ISignlessSubsidizedCallRelayer<FreeCollectRequest>
{
  constructor(
    private apolloClient: LensApolloClient,
    private factory: ITransactionFactory<FreeCollectRequest>,
    private logger: ILogger,
  ) {}

  async createProxyTransaction(
    request: FreeCollectRequest,
  ): PromiseResult<ProxyTransaction<FreeCollectRequest>, BroadcastingError> {
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

  async createUnsignedProtocolCall(
    request: CollectRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CollectRequest>> {
    const data = await this.generateCollectTypedData(request, nonce);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  private createRequestFallback(
    request: CollectRequest,
    data: CreateCollectTypedDataData,
  ): SelfFundedProtocolTransactionRequest<CollectRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('collect', [
      data.result.typedData.value.profileId,
      data.result.typedData.value.pubId,
      data.result.typedData.value.data,
    ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }

  private async proxy(request: FreeCollectRequest): PromiseResult<ProxyReceipt, BroadcastingError> {
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
      return failure(
        new BroadcastingError(
          error.message,
          this.createRequestFallback(request, await this.generateCollectTypedData(request)),
        ),
      );
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

  private async generateCollectTypedData(
    request: CollectRequest,
    nonce?: Nonce,
  ): Promise<CreateCollectTypedDataData> {
    const { data } = await this.apolloClient.mutate<
      CreateCollectTypedDataData,
      CreateCollectTypedDataVariables
    >({
      mutation: CreateCollectTypedDataDocument,
      variables: {
        request: {
          publicationId: request.publicationId,
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    invariant(data, 'Cannot generate typed data for collect');

    return data;
  }
}
