import {
  CreateCommentTypedDataDocument,
  CreateCommentTypedDataData,
  CreateCommentTypedDataVariables,
  CreateCommentViaDispatcherDocument,
  CreateCommentViaDispatcherData,
  CreateCommentViaDispatcherVariables,
  CreatePublicCommentRequest as CreatePublicCommentRequestArg,
  LensApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IUnsignedProtocolCallGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IMetadataUploader } from '../IMetadataUploader';
import { ITransactionFactory } from '../ITransactionFactory';
import {
  Data,
  SelfFundedProtocolTransactionRequest,
} from '../SelfFundedProtocolTransactionRequest';
import { handleRelayError, RelayReceipt } from '../relayer';
import { resolveCollectModule, resolveReferenceModule } from './utils';

export class CreateCommentCallGateway
  implements
    IDelegatedTransactionGateway<CreateCommentRequest>,
    IUnsignedProtocolCallGateway<CreateCommentRequest>
{
  constructor(
    private readonly apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateCommentRequest>,
    private readonly uploader: IMetadataUploader<CreateCommentRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreateCommentRequest,
  ): PromiseResult<NativeTransaction<CreateCommentRequest>, BroadcastingError> {
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
    request: CreateCommentRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CreateCommentRequest>> {
    const requestArg = await this.resolveCreateCommentRequestArg(request);

    const typedData = await this.createTypedData(requestArg, nonce);

    return UnsignedProtocolCall.create({
      id: typedData.result.id,
      request,
      typedData: omitTypename(typedData.result.typedData),
      fallback: this.createRequestFallback(request, typedData),
    });
  }

  private async broadcast(
    request: CreateCommentRequest,
  ): PromiseResult<RelayReceipt, BroadcastingError> {
    const requestArg = await this.resolveCreateCommentRequestArg(request);

    const { data } = await this.apolloClient.mutate<
      CreateCommentViaDispatcherData,
      CreateCommentViaDispatcherVariables
    >({
      mutation: CreateCommentViaDispatcherDocument,
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
    requestArg: CreatePublicCommentRequestArg,
    nonce?: Nonce,
  ): Promise<CreateCommentTypedDataData> {
    const { data } = await this.apolloClient.mutate<
      CreateCommentTypedDataData,
      CreateCommentTypedDataVariables
    >({
      mutation: CreateCommentTypedDataDocument,
      variables: {
        request: requestArg,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data;
  }
  private async resolveCreateCommentRequestArg(
    request: CreateCommentRequest,
  ): Promise<CreatePublicCommentRequestArg> {
    const contentURI = await this.uploader.upload(request);

    return {
      contentURI,
      profileId: request.profileId,
      publicationId: request.publicationId,
      collectModule: resolveCollectModule(request),
      referenceModule: resolveReferenceModule(request),
    };
  }

  private createRequestFallback(
    request: CreateCommentRequest,
    data: CreateCommentTypedDataData,
  ): SelfFundedProtocolTransactionRequest<CreateCommentRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('comment', [
      {
        profileId: data.result.typedData.value.profileId,
        contentURI: data.result.typedData.value.contentURI,
        profileIdPointed: data.result.typedData.value.profileIdPointed,
        pubIdPointed: data.result.typedData.value.pubIdPointed,
        referenceModuleData: data.result.typedData.value.referenceModuleData,
        collectModule: data.result.typedData.value.collectModule,
        collectModuleInitData: data.result.typedData.value.collectModuleInitData,
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
