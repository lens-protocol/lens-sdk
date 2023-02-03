import {
  CreateMirrorTypedDataDocument,
  CreateMirrorViaDispatcherDocument,
  CreateMirrorViaDispatcherMutation,
  CreateMirrorViaDispatcherMutationVariables,
  CreateMirrorRequest as CreateMirrorRequestArg,
  omitTypename,
  CreateMirrorTypedDataMutation,
  CreateMirrorTypedDataMutationVariables,
  LensApolloClient,
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
import { ChainType, failure, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { AsyncRelayReceipt, ITransactionFactory } from '../ITransactionFactory';

export class CreateMirrorCallGateway implements ICreateMirrorCallGateway {
  constructor(
    private readonly apolloClient: LensApolloClient,
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
    };
  }
}
