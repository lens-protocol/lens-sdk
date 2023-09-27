import {
  CreatePostTypedDataDocument,
  CreatePostTypedDataData,
  CreatePostTypedDataVariables,
  CreatePostViaDispatcherDocument,
  CreatePostViaDispatcherData,
  CreatePostViaDispatcherVariables,
  CreatePublicPostRequest as CreatePublicPostRequestArg,
  SafeApolloClient,
  omitTypename,
  CreatePostEip712TypedData,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
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

export class CreateOnChainPostGateway
  implements
    IDelegatedTransactionGateway<CreatePostRequest>,
    IOnChainProtocolCallGateway<CreatePostRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreatePostRequest>,
    private readonly metadataUploader: IMetadataUploader<CreatePostRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreatePostRequest,
  ): PromiseResult<NativeTransaction<CreatePostRequest>, BroadcastingError> {
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
    request: CreatePostRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CreatePostRequest>> {
    const requestArg = await this.resolveCreatePostRequestArg(request);
    const data = await this.createTypedData(requestArg, nonce);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data.result.typedData),
    });
  }

  private async broadcast(
    request: CreatePostRequest,
  ): PromiseResult<OnChainBroadcastReceipt, BroadcastingError> {
    const requestArg = await this.resolveCreatePostRequestArg(request);

    const { data } = await this.apolloClient.mutate<
      CreatePostViaDispatcherData,
      CreatePostViaDispatcherVariables
    >({
      mutation: CreatePostViaDispatcherDocument,
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
    requestArg: CreatePublicPostRequestArg,
    nonce?: Nonce,
  ): Promise<CreatePostTypedDataData> {
    const { data } = await this.apolloClient.mutate<
      CreatePostTypedDataData,
      CreatePostTypedDataVariables
    >({
      mutation: CreatePostTypedDataDocument,
      variables: {
        request: requestArg,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data;
  }

  private async resolveCreatePostRequestArg(
    request: CreatePostRequest,
  ): Promise<CreatePublicPostRequestArg> {
    return {
      contentURI: await this.metadataUploader.upload(request),
      profileId: request.profileId,
      collectModule: resolveCollectModuleParams(request),
      referenceModule: resolveReferenceModuleParams(request),
    };
  }

  private createRequestFallback(
    request: CreatePostRequest,
    data: CreatePostEip712TypedData,
  ): SelfFundedProtocolTransactionRequest<CreatePostRequest> {
    const contract = lensHub(data.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('post', [
      {
        profileId: data.message.profileId,
        contentURI: data.message.contentURI,
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
