import {
  CreatePostTypedDataDocument,
  CreatePostTypedDataMutation,
  CreatePostTypedDataMutationVariables,
  CreatePostViaDispatcherDocument,
  CreatePostViaDispatcherMutation,
  CreatePostViaDispatcherMutationVariables,
  CreatePublicPostRequest as CreatePublicPostRequestArg,
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
  CreatePostRequest,
  ICreatePostCallGateway,
} from '@lens-protocol/domain/use-cases/publications';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IMetadataUploader } from '../IMetadataUploader';
import { AsyncRelayReceipt, ITransactionFactory } from '../ITransactionFactory';
import { resolveCollectModule, resolveReferenceModule } from './utils';

export class CreatePostCallGateway<R extends CreatePostRequest> implements ICreatePostCallGateway {
  constructor(
    private readonly apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
    private readonly metadataUploader: IMetadataUploader<R>,
  ) {}

  async createDelegatedTransaction<T extends R>(request: T): Promise<NativeTransaction<T>> {
    return this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      asyncRelayReceipt: this.initiatePostCreation(await this.resolveCreatePostRequestArg(request)),
    });
  }

  async createUnsignedProtocolCall<T extends R>(
    request: T,
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

    if (data.result.__typename === 'RelayError') {
      return failure(new TransactionError(TransactionErrorReason.REJECTED));
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
