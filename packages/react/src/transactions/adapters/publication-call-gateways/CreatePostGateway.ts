import {
  CreatePostTypedDataDocument,
  CreatePostTypedDataData,
  CreatePostTypedDataVariables,
  CreatePostViaDispatcherDocument,
  CreatePostViaDispatcherData,
  CreatePostViaDispatcherVariables,
  CreatePublicPostRequest as CreatePublicPostRequestArg,
  LensApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
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

export class CreatePostGateway
  implements
    IDelegatedTransactionGateway<CreatePostRequest>,
    IUnsignedProtocolCallGateway<CreatePostRequest>
{
  constructor(
    private readonly apolloClient: LensApolloClient,
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
      fallback: this.createRequestFallback(request, data),
    });
  }

  private async broadcast(
    request: CreatePostRequest,
  ): PromiseResult<RelayReceipt, BroadcastingError> {
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
      const fallback = this.createRequestFallback(request, typedData);

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
      collectModule: resolveCollectModule(request),
      referenceModule: resolveReferenceModule(request),
    };
  }

  private createRequestFallback(
    request: CreatePostRequest,
    data: CreatePostTypedDataData,
  ): SelfFundedProtocolTransactionRequest<CreatePostRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('post', [
      {
        profileId: data.result.typedData.value.profileId,
        contentURI: data.result.typedData.value.contentURI,
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
