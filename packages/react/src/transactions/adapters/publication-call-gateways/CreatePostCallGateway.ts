import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CreatePostTypedDataDocument,
  CreatePostTypedDataMutation,
  CreatePostTypedDataMutationVariables,
  CreatePostViaDispatcherDocument,
  CreatePostViaDispatcherMutation,
  CreatePostViaDispatcherMutationVariables,
  CreatePublicPostRequest as CreatePublicPostRequestArg,
  omitTypename,
} from '@lens-protocol/api-bindings';
import {
  NativeTransaction,
  Nonce,
  TransactionError,
  TransactionErrorReason,
} from '@lens-protocol/domain/entities';
import {
  CreatePostRequest,
  ICreatePostCallGateway,
} from '@lens-protocol/domain/use-cases/publications';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, invariant, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { AsyncRelayReceipt, ITransactionFactory } from '../ITransactionFactory';
import { MetadataUploadAdapter } from '../MetadataUploadAdapter';
import { createPublicationMetadata, resolveCollectModule, resolveReferenceModule } from './utils';

export class CreatePostCallGateway implements ICreatePostCallGateway {
  constructor(
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
    private readonly uploadAdapter: MetadataUploadAdapter,
  ) {}

  async createDelegatedTransaction<T extends CreatePostRequest>(
    request: T,
  ): Promise<NativeTransaction<T>> {
    return this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      asyncRelayReceipt: this.initiatePostCreation(await this.resolveCreatePostRequestArg(request)),
    });
  }

  async createUnsignedProtocolCall(
    request: CreatePostRequest,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<CreatePostRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreatePostTypedDataMutation,
      CreatePostTypedDataMutationVariables
    >({
      mutation: CreatePostTypedDataDocument,
      variables: {
        request: await this.resolveCreatePostRequestArg(request),
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    invariant(data, 'Cannot generate typed data for post creation');

    return new UnsignedLensProtocolCall(
      data.result.id,
      request,
      omitTypename(data.result.typedData),
    );
  }

  private async initiatePostCreation(requestArgs: CreatePublicPostRequestArg): AsyncRelayReceipt {
    const { data } = await this.apolloClient.mutate<
      CreatePostViaDispatcherMutation,
      CreatePostViaDispatcherMutationVariables
    >({
      mutation: CreatePostViaDispatcherDocument,
      variables: {
        request: requestArgs,
      },
    });

    invariant(data, 'Cannot create post via dispatcher');

    if (data.result.__typename === 'RelayError') {
      return failure(new TransactionError(TransactionErrorReason.REJECTED));
    }

    return success({
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });
  }

  private async resolveCreatePostRequestArg(
    request: CreatePostRequest,
  ): Promise<CreatePublicPostRequestArg> {
    const contentURI = await this.uploadAdapter.upload(createPublicationMetadata(request));
    return {
      contentURI,
      profileId: request.profileId,
      collectModule: resolveCollectModule(request),
      referenceModule: resolveReferenceModule(request),
    };
  }
}
