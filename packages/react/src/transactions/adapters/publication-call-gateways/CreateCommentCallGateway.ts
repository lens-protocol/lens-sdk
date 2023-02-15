import {
  CreateCommentTypedDataDocument,
  CreateCommentTypedDataMutation,
  CreateCommentTypedDataMutationVariables,
  CreateCommentViaDispatcherDocument,
  CreateCommentViaDispatcherMutation,
  CreateCommentViaDispatcherMutationVariables,
  CreatePublicCommentRequest as CreatePublicCommentRequestArg,
  LensApolloClient,
  omitTypename,
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
import { ChainType, failure, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { createPublicationMetadata, resolveCollectModule, resolveReferenceModule } from './utils';
import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { AsyncRelayReceipt, ITransactionFactory } from '../ITransactionFactory';
import { MetadataUploadAdapter } from '../MetadataUploadAdapter';

export class CreateCommentCallGateway implements ICreateCommentCallGateway {
  constructor(
    private readonly apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
    private readonly uploadAdapter: MetadataUploadAdapter,
  ) {}

  async createDelegatedTransaction<T extends CreateCommentRequest>(
    request: T,
  ): Promise<NativeTransaction<T>> {
    return this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      asyncRelayReceipt: this.initiateCommentCreation(
        await this.resolveCreateCommentRequestArg(request),
      ),
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

    return new UnsignedLensProtocolCall(
      data.result.id,
      request,
      omitTypename(data.result.typedData),
    );
  }

  private async initiateCommentCreation(
    requestArg: CreatePublicCommentRequestArg,
  ): AsyncRelayReceipt {
    const { data } = await this.apolloClient.mutate<
      CreateCommentViaDispatcherMutation,
      CreateCommentViaDispatcherMutationVariables
    >({
      mutation: CreateCommentViaDispatcherDocument,
      variables: {
        request: requestArg,
      },
    });

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
    const contentURI = await this.uploadAdapter.upload(createPublicationMetadata(request));

    return {
      contentURI,
      profileId: request.profileId,
      publicationId: request.publicationId,
      collectModule: resolveCollectModule(request),
      referenceModule: resolveReferenceModule(request),
    };
  }
}
