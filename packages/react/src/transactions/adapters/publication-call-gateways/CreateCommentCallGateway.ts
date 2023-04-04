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
  RelayErrorReasons,
} from '@lens-protocol/api-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import {
  CreateCommentRequest,
  ICreateCommentCallGateway,
} from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  BroadcastingErrorReason,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IMetadataUploader } from '../IMetadataUploader';
import { ITransactionFactory } from '../ITransactionFactory';
import { RelayReceipt } from '../RelayReceipt';
import { resolveCollectModule, resolveReferenceModule } from './utils';

export class CreateCommentCallGateway implements ICreateCommentCallGateway {
  constructor(
    private readonly apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
    private readonly uploader: IMetadataUploader<CreateCommentRequest>,
  ) {}

  async createDelegatedTransaction<T extends CreateCommentRequest>(
    request: T,
  ): PromiseResult<NativeTransaction<T>, BroadcastingError> {
    const result = await this.broadcast(await this.resolveCreateCommentRequestArg(request));

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
  ): Promise<UnsignedLensProtocolCall<CreateCommentRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreateCommentTypedDataData,
      CreateCommentTypedDataVariables
    >({
      mutation: CreateCommentTypedDataDocument,
      variables: {
        request: await this.resolveCreateCommentRequestArg(request),
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return new UnsignedLensProtocolCall(
      data.result.id,
      request,
      omitTypename(data.result.typedData),
    );
  }

  private async broadcast(
    requestArg: CreatePublicCommentRequestArg,
  ): PromiseResult<RelayReceipt, BroadcastingError> {
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
}
