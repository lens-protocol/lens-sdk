import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CreatePublicCommentRequest as CreatePublicCommentRequestArg,
  omitTypename,
  CreateCommentViaDispatcherDocument,
  CreateCommentViaDispatcherMutation,
  CreateCommentViaDispatcherMutationVariables,
  CreateCommentTypedDataMutationVariables,
  CreateCommentTypedDataDocument,
  CreateCommentTypedDataMutation,
} from '@lens-protocol/api-bindings';
import {
  NativeTransaction,
  Nonce,
  TransactionError,
  TransactionErrorReason,
} from '@lens-protocol/domain/entities';
import {
  CreateCommentRequest,
  ICreateCommentCallGateway,
} from '@lens-protocol/domain/use-cases/publications';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, invariant, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { AsyncRelayReceipt, ITransactionFactory } from '../ITransactionFactory';
import { UploadHandler } from '../UploadHandler';
import { createPublicationMetadata, resolveCollectModule, resolveReferenceModule } from './utils';

export class CommentCallGateway implements ICreateCommentCallGateway {
  constructor(
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
    private readonly upload: UploadHandler,
  ) {}

  async createDelegatedTransaction<T extends CreateCommentRequest>(
    request: T,
  ): Promise<NativeTransaction<T>> {
    return this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      asyncRelayReceipt: this.initiateCommentCreation(request),
    });
  }

  async createUnsignedProtocolCall(
    request: CreateCommentRequest,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<CreateCommentRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreateCommentTypedDataMutation,
      CreateCommentTypedDataMutationVariables
    >({
      mutation: CreateCommentTypedDataDocument,
      variables: {
        request: await this.resolveCreateCommentRequestArg(request),
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    invariant(data, 'Cannot generate typed data for comment creation');

    return new UnsignedLensProtocolCall(
      data.result.id,
      request,
      omitTypename(data.result.typedData),
    );
  }

  private async initiateCommentCreation(request: CreateCommentRequest): AsyncRelayReceipt {
    const { data } = await this.apolloClient.mutate<
      CreateCommentViaDispatcherMutation,
      CreateCommentViaDispatcherMutationVariables
    >({
      mutation: CreateCommentViaDispatcherDocument,
      variables: {
        request: await this.resolveCreateCommentRequestArg(request),
      },
    });

    invariant(data, 'Cannot create comment via dispatcher');

    if (data.result.__typename === 'RelayError') {
      return failure(new TransactionError(TransactionErrorReason.REJECTED));
    }

    return success({
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });
  }

  private async resolveCreateCommentRequestArg(
    request: CreateCommentRequest,
  ): Promise<CreatePublicCommentRequestArg> {
    return {
      profileId: request.profileId,
      publicationId: request.publicationId,
      contentURI: await this.uploadPublicationMetadata(request),
      collectModule: resolveCollectModule(request),
      referenceModule: resolveReferenceModule(request),
    };
  }

  private async uploadPublicationMetadata(request: CreateCommentRequest): Promise<string> {
    return this.upload(createPublicationMetadata(request));
  }
}
