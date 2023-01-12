import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CreateMirrorTypedDataDocument,
  CreateMirrorViaDispatcherDocument,
  CreateMirrorViaDispatcherMutation,
  CreateMirrorViaDispatcherMutationVariables,
  CreateMirrorRequest as CreateMirrorRequestArg,
  omitTypename,
  CreateMirrorTypedDataMutation,
  CreateMirrorTypedDataMutationVariables,
} from '@lens-protocol/api-bindings';
import {
  NativeTransaction,
  Nonce,
  TransactionError,
  TransactionErrorReason,
} from '@lens-protocol/domain/entities';
import {
  CreateMirrorRequest,
  ICreateMirrorCallGateway,
} from '@lens-protocol/domain/use-cases/publications';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, invariant, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { AsyncRelayReceipt, ITransactionFactory } from '../ITransactionFactory';
import { resolveReferenceModule } from './utils';

export class MirrorCallGateway implements ICreateMirrorCallGateway {
  constructor(
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
  ) {}

  async createDelegatedTransaction<T extends CreateMirrorRequest>(
    request: T,
  ): Promise<NativeTransaction<T>> {
    return this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      asyncRelayReceipt: this.initiateMirrorCreation(
        await this.resolveCreateMirrorRequestArg(request),
      ),
    });
  }

  async createUnsignedProtocolCall(
    request: CreateMirrorRequest,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<CreateMirrorRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreateMirrorTypedDataMutation,
      CreateMirrorTypedDataMutationVariables
    >({
      mutation: CreateMirrorTypedDataDocument,
      variables: {
        request: await this.resolveCreateMirrorRequestArg(request),
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

  private async initiateMirrorCreation(requestArgs: CreateMirrorRequestArg): AsyncRelayReceipt {
    const { data } = await this.apolloClient.mutate<
      CreateMirrorViaDispatcherMutation,
      CreateMirrorViaDispatcherMutationVariables
    >({
      mutation: CreateMirrorViaDispatcherDocument,
      variables: {
        request: requestArgs,
      },
    });

    invariant(data, 'Cannot create mirror via dispatcher');

    if (data.result.__typename === 'RelayError') {
      return failure(new TransactionError(TransactionErrorReason.REJECTED));
    }

    return success({
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });
  }

  private async resolveCreateMirrorRequestArg(
    request: CreateMirrorRequest,
  ): Promise<CreateMirrorRequestArg> {
    return {
      profileId: request.profileId,
      publicationId: request.publicationId,
      referenceModule: resolveReferenceModule(request),
    };
  }
}
