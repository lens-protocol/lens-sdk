import {
  CreateCommentEip712TypedData,
  CreateDataAvailabilityCommentRequest,
  CreateDataAvailabilityCommentTypedDataData,
  CreateDataAvailabilityCommentTypedDataDocument,
  CreateDataAvailabilityCommentTypedDataVariables,
  CreateDataAvailabilityCommentViaDispatcherData,
  CreateDataAvailabilityCommentViaDispatcherDocument,
  CreateDataAvailabilityCommentViaDispatcherVariables,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IOffChainProtocolCallGateway,
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

export class CreateOffChainCommentGateway
  implements
    IDelegatedTransactionGateway<CreateCommentRequest>,
    IOffChainProtocolCallGateway<CreateCommentRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateCommentRequest>,
    private readonly metadataUploader: IMetadataUploader<CreateCommentRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreateCommentRequest,
  ): PromiseResult<DataTransaction<CreateCommentRequest>, BroadcastingError> {
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
    request: CreateCommentRequest,
  ): Promise<UnsignedProtocolCall<CreateCommentRequest>> {
    const data = await this.createTypedData(request);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data.result.typedData),
    });
  }

  private async broadcast(
    request: CreateCommentRequest,
  ): PromiseResult<OffChainBroadcastReceipt, BroadcastingError> {
    const requestArg = await this.resolveCreateDataAvailabilityPostRequest(request);

    const { data } = await this.apolloClient.mutate<
      CreateDataAvailabilityCommentViaDispatcherData,
      CreateDataAvailabilityCommentViaDispatcherVariables
    >({
      mutation: CreateDataAvailabilityCommentViaDispatcherDocument,
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
    request: CreateCommentRequest,
  ): Promise<CreateDataAvailabilityCommentTypedDataData> {
    const { data } = await this.apolloClient.mutate<
      CreateDataAvailabilityCommentTypedDataData,
      CreateDataAvailabilityCommentTypedDataVariables
    >({
      mutation: CreateDataAvailabilityCommentTypedDataDocument,
      variables: {
        request: {
          commentOn: request.publicationId,
          contentURI: await this.metadataUploader.upload(request),
          from: request.profileId,
        },
      },
    });
    return data;
  }

  private async resolveCreateDataAvailabilityPostRequest(
    request: CreateCommentRequest,
  ): Promise<CreateDataAvailabilityCommentRequest> {
    return {
      commentOn: request.publicationId,
      contentURI: await this.metadataUploader.upload(request),
      from: request.profileId,
    };
  }

  private createRequestFallback(
    request: CreateCommentRequest,
    data: CreateCommentEip712TypedData,
  ): SelfFundedProtocolTransactionRequest<CreateCommentRequest> {
    const contract = lensHub(data.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('comment', [
      {
        profileId: data.value.profileId,
        contentURI: data.value.contentURI,
        profileIdPointed: data.value.profileIdPointed,
        pubIdPointed: data.value.pubIdPointed,
        referenceModuleData: data.value.referenceModuleData,
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
