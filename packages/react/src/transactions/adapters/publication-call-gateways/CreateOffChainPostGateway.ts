import {
  LensApolloClient,
  omitTypename,
  CreateDataAvailabilityPostTypedDataDocument,
  CreateDataAvailabilityPostTypedDataData,
  CreateDataAvailabilityPostTypedDataVariables,
  CreatePostEip712TypedData,
  CreateDataAvailabilityPostViaDispatcherDocument,
  CreateDataAvailabilityPostViaDispatcherData,
  CreateDataAvailabilityPostViaDispatcherVariables,
  CreateDataAvailabilityPostRequest,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { IOffChainProtocolCallGateway } from '@lens-protocol/domain/src/use-cases/transactions/SubsidizeOffChain';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IMetadataUploader } from '../IMetadataUploader';
import { ITransactionFactory } from '../ITransactionFactory';
import {
  Data,
  SelfFundedProtocolTransactionRequest,
} from '../SelfFundedProtocolTransactionRequest';
import { handleRelayError, OffChainBroadcastReceipt } from '../relayer';

export class CreateOffChainPostGateway
  implements
    IDelegatedTransactionGateway<CreatePostRequest>,
    IOffChainProtocolCallGateway<CreatePostRequest>
{
  constructor(
    private readonly apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreatePostRequest>,
    private readonly metadataUploader: IMetadataUploader<CreatePostRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreatePostRequest,
  ): PromiseResult<DataTransaction<CreatePostRequest>, BroadcastingError> {
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
    request: CreatePostRequest,
  ): Promise<UnsignedProtocolCall<CreatePostRequest>> {
    const data = await this.createTypedData(request);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data.result.typedData),
    });
  }

  private async broadcast(
    request: CreatePostRequest,
  ): PromiseResult<OffChainBroadcastReceipt, BroadcastingError> {
    const requestArg = await this.resolveCreateDataAvailabilityPostRequest(request);

    const { data } = await this.apolloClient.mutate<
      CreateDataAvailabilityPostViaDispatcherData,
      CreateDataAvailabilityPostViaDispatcherVariables
    >({
      mutation: CreateDataAvailabilityPostViaDispatcherDocument,
      variables: {
        request: requestArg,
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
    request: CreatePostRequest,
  ): Promise<CreateDataAvailabilityPostTypedDataData> {
    const { data } = await this.apolloClient.mutate<
      CreateDataAvailabilityPostTypedDataData,
      CreateDataAvailabilityPostTypedDataVariables
    >({
      mutation: CreateDataAvailabilityPostTypedDataDocument,
      variables: {
        request: {
          contentURI: await this.metadataUploader.upload(request),
          from: request.profileId,
        },
      },
    });
    return data;
  }

  private async resolveCreateDataAvailabilityPostRequest(
    request: CreatePostRequest,
  ): Promise<CreateDataAvailabilityPostRequest> {
    return {
      contentURI: await this.metadataUploader.upload(request),
      from: request.profileId,
    };
  }

  private createRequestFallback(
    request: CreatePostRequest,
    data: CreatePostEip712TypedData,
  ): SelfFundedProtocolTransactionRequest<CreatePostRequest> {
    const contract = lensHub(data.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('post', [
      {
        profileId: data.value.profileId,
        contentURI: data.value.contentURI,
        collectModule: data.value.collectModule,
        collectModuleInitData: data.value.collectModuleInitData,
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
