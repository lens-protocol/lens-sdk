import {
  CreateMirrorTypedDataDocument,
  CreateMirrorViaDispatcherDocument,
  CreateMirrorViaDispatcherData,
  CreateMirrorViaDispatcherVariables,
  CreateMirrorRequest as CreateMirrorRequestArg,
  omitTypename,
  CreateMirrorTypedDataData,
  CreateMirrorTypedDataVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IOnChainProtocolCallGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import {
  Data,
  SelfFundedProtocolTransactionRequest,
} from '../SelfFundedProtocolTransactionRequest';
import { handleRelayError, OnChainBroadcastReceipt } from '../relayer';

export class CreateMirrorCallGateway
  implements
    IDelegatedTransactionGateway<CreateMirrorRequest>,
    IOnChainProtocolCallGateway<CreateMirrorRequest>
{
  constructor(
    private readonly apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateMirrorRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreateMirrorRequest,
  ): PromiseResult<NativeTransaction<CreateMirrorRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

    if (result.isFailure()) return failure(result.error);

    const receipt = result.value;

    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      indexingId: receipt.indexingId,
      txHash: receipt.txHash,
    });

    return success(transaction);
  }

  async createUnsignedProtocolCall(
    request: CreateMirrorRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CreateMirrorRequest>> {
    const requestArg = await this.resolveCreateMirrorRequestArg(request);

    const data = await this.createTypedData(requestArg, nonce);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  private async broadcast(
    request: CreateMirrorRequest,
  ): PromiseResult<OnChainBroadcastReceipt, BroadcastingError> {
    const requestArg = await this.resolveCreateMirrorRequestArg(request);

    const { data } = await this.apolloClient.mutate<
      CreateMirrorViaDispatcherData,
      CreateMirrorViaDispatcherVariables
    >({
      mutation: CreateMirrorViaDispatcherDocument,
      variables: {
        request: requestArg,
      },
    });

    if (data.result.__typename === 'RelayError') {
      const typedData = await this.createTypedData(requestArg);
      const fallback = this.createRequestFallback(request, typedData);

      return handleRelayError(data.result, fallback);
    }

    return success({
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });
  }

  private async createTypedData(
    requestArg: CreateMirrorRequestArg,
    nonce?: Nonce,
  ): Promise<CreateMirrorTypedDataData> {
    const { data } = await this.apolloClient.mutate<
      CreateMirrorTypedDataData,
      CreateMirrorTypedDataVariables
    >({
      mutation: CreateMirrorTypedDataDocument,
      variables: {
        request: requestArg,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data;
  }

  private async resolveCreateMirrorRequestArg(
    request: CreateMirrorRequest,
  ): Promise<CreateMirrorRequestArg> {
    return {
      profileId: request.profileId,
      publicationId: request.publicationId,
    };
  }

  private createRequestFallback(
    request: CreateMirrorRequest,
    data: CreateMirrorTypedDataData,
  ): SelfFundedProtocolTransactionRequest<CreateMirrorRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('mirror', [
      {
        profileId: data.result.typedData.value.profileId,
        profileIdPointed: data.result.typedData.value.profileIdPointed,
        pubIdPointed: data.result.typedData.value.pubIdPointed,
        referenceModuleData: data.result.typedData.value.referenceModuleData,
        referenceModule: data.result.typedData.value.referenceModule,
        referenceModuleInitData: data.result.typedData.value.referenceModuleInitData,
      },
    ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
