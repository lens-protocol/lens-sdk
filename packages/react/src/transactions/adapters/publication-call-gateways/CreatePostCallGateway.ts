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
  RelayErrorReasons,
} from '@lens-protocol/api-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import {
  CreatePostRequest,
  ICreatePostCallGateway,
} from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  BroadcastingErrorReason,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IMetadataUploader } from '../IMetadataUploader';
import { ITransactionFactory } from '../ITransactionFactory';
import { RelayReceipt } from '../RelayReceipt';
import { resolveCollectModule, resolveReferenceModule } from './utils';

export class CreatePostCallGateway<R extends CreatePostRequest> implements ICreatePostCallGateway {
  constructor(
    private readonly apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
    private readonly metadataUploader: IMetadataUploader<R>,
  ) {}

  async createDelegatedTransaction<T extends R>(
    request: T,
  ): PromiseResult<NativeTransaction<T>, BroadcastingError> {
    const result = await this.broadcast(await this.resolveCreatePostRequestArg(request));

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

  async createUnsignedProtocolCall<T extends R>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CreatePostRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreatePostTypedDataData,
      CreatePostTypedDataVariables
    >({
      mutation: CreatePostTypedDataDocument,
      variables: {
        request: await this.resolveCreatePostRequestArg(request),
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return UnsignedProtocolCall.create({
      contractAddress: data.result.typedData.domain.verifyingContract,
      functionName: 'postWithSig',
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
    });
  }

  private async broadcast(
    requestArgs: CreatePublicPostRequestArg,
  ): PromiseResult<RelayReceipt, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<
      CreatePostViaDispatcherData,
      CreatePostViaDispatcherVariables
    >({
      mutation: CreatePostViaDispatcherDocument,
      variables: {
        request: requestArgs,
      },
    });

    if (data.result.__typename === 'RelayError') {
      if (data.result.reason === RelayErrorReasons.Rejected) {
        return failure(new BroadcastingError(BroadcastingErrorReason.REJECTED));
      }
      return failure(new BroadcastingError(BroadcastingErrorReason.UNSPECIFIED));
    }

    return success({
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });
  }

  private async resolveCreatePostRequestArg<T extends R>(
    request: T,
  ): Promise<CreatePublicPostRequestArg> {
    return {
      contentURI: await this.metadataUploader.upload(request),
      profileId: request.profileId,
      collectModule: resolveCollectModule(request),
      referenceModule: resolveReferenceModule(request),
    };
  }
}
