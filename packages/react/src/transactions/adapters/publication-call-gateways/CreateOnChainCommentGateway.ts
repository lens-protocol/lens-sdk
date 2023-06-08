import {
  CreateCommentTypedDataDocument,
  CreateCommentTypedDataData,
  CreateCommentTypedDataVariables,
  CreateCommentViaDispatcherDocument,
  CreateCommentViaDispatcherData,
  CreateCommentViaDispatcherVariables,
  CreatePublicCommentRequest as CreatePublicCommentRequestArg,
  SafeApolloClient,
  omitTypename,
  CreateCommentEip712TypedData,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IOnChainProtocolCallGateway,
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
import { handleRelayError, OnChainBroadcastReceipt } from '../relayer';
import { resolveCollectModuleParams } from './resolveCollectModuleParams';
import { resolveReferenceModuleParams } from './resolveReferenceModuleParams';

export class CreateOnChainCommentGateway
  implements
    IDelegatedTransactionGateway<CreateCommentRequest>,
    IOnChainProtocolCallGateway<CreateCommentRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
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
      fallback: this.createRequestFallback(request, typedData.result.typedData),
    });
  }

  private async broadcast(
    request: CreateCommentRequest,
  ): PromiseResult<OnChainBroadcastReceipt, BroadcastingError> {
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
      const fallback = this.createRequestFallback(request, typedData.result.typedData);

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
      collectModule: resolveCollectModuleParams(request),
      referenceModule: resolveReferenceModuleParams(request),
    };
  }

  private createRequestFallback(
    request: CreateCommentRequest,
    data: CreateCommentEip712TypedData,
  ): SelfFundedProtocolTransactionRequest<CreateCommentRequest> {
    const contract = lensHub(data.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('comment', [
      {
        profileId: data.message.profileId,
        contentURI: data.message.contentURI,
        profileIdPointed: data.message.profileIdPointed,
        pubIdPointed: data.message.pubIdPointed,
        referenceModuleData: data.message.referenceModuleData,
        collectModule: data.message.collectModule,
        collectModuleInitData: data.message.collectModuleInitData,
        referenceModule: data.message.referenceModule,
        referenceModuleInitData: data.message.referenceModuleInitData,
      },
    ]);
    return {
      ...request,
      contractAddress: data.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
