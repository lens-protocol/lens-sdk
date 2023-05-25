import {
  omitTypename,
  SafeApolloClient,
  CreateDataAvailabilityMirrorViaDispatcherData,
  CreateDataAvailabilityMirrorViaDispatcherVariables,
  CreateDataAvailabilityMirrorViaDispatcherDocument,
  CreateMirrorEip712TypedData,
  CreateDataAvailabilityMirrorTypedDataData,
  CreateDataAvailabilityMirrorTypedDataVariables,
  CreateDataAvailabilityMirrorTypedDataDocument,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IOffChainProtocolCallGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import {
  Data,
  SelfFundedProtocolTransactionRequest,
} from '../SelfFundedProtocolTransactionRequest';
import { handleRelayError, OffChainBroadcastReceipt } from '../relayer';

export class CreateOffChainMirrorGateway
  implements
    IDelegatedTransactionGateway<CreateMirrorRequest>,
    IOffChainProtocolCallGateway<CreateMirrorRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateMirrorRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreateMirrorRequest,
  ): PromiseResult<DataTransaction<CreateMirrorRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

    if (result.isFailure()) return failure(result.error);

    const receipt = result.value;
    const transaction = this.transactionFactory.createDataTransaction({
      id: receipt.id,
      request,
    });

    return success(transaction);
  }

  async createUnsignedProtocolCall(
    request: CreateMirrorRequest,
  ): Promise<UnsignedProtocolCall<CreateMirrorRequest>> {
    const data = await this.createTypedData(request);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data.result.typedData),
    });
  }

  private async broadcast(
    request: CreateMirrorRequest,
  ): PromiseResult<OffChainBroadcastReceipt, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<
      CreateDataAvailabilityMirrorViaDispatcherData,
      CreateDataAvailabilityMirrorViaDispatcherVariables
    >({
      mutation: CreateDataAvailabilityMirrorViaDispatcherDocument,
      variables: {
        request: {
          from: request.profileId,
          mirror: request.publicationId,
        },
      },
    });

    if (data.result.__typename === 'RelayError') {
      const typedData = await this.createTypedData(request);
      const fallback = this.createRequestFallback(request, typedData.result.typedData);

      return handleRelayError(data.result, fallback);
    }

    return success({
      id: data.result.id,
    });
  }

  private async createTypedData(
    request: CreateMirrorRequest,
  ): Promise<CreateDataAvailabilityMirrorTypedDataData> {
    const { data } = await this.apolloClient.mutate<
      CreateDataAvailabilityMirrorTypedDataData,
      CreateDataAvailabilityMirrorTypedDataVariables
    >({
      mutation: CreateDataAvailabilityMirrorTypedDataDocument,
      variables: {
        request: {
          from: request.profileId,
          mirror: request.publicationId,
        },
      },
    });
    return data;
  }

  private createRequestFallback(
    request: CreateMirrorRequest,
    data: CreateMirrorEip712TypedData,
  ): SelfFundedProtocolTransactionRequest<CreateMirrorRequest> {
    const contract = lensHub(data.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('mirror', [
      {
        profileId: data.value.profileId,
        profileIdPointed: data.value.profileIdPointed,
        pubIdPointed: data.value.pubIdPointed,
        referenceModuleData: data.value.referenceModuleData,
        referenceModule: data.value.referenceModule,
        referenceModuleInitData: data.value.referenceModuleInitData,
      },
    ]);
    return {
      ...request,
      contractAddress: data.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
