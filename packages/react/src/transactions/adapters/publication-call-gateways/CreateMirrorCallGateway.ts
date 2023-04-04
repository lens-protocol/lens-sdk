import {
  CreateMirrorTypedDataDocument,
  CreateMirrorViaDispatcherDocument,
  CreateMirrorViaDispatcherData,
  CreateMirrorViaDispatcherVariables,
  CreateMirrorRequest as CreateMirrorRequestArg,
  omitTypename,
  CreateMirrorTypedDataData,
  CreateMirrorTypedDataVariables,
  LensApolloClient,
  RelayErrorReasons,
} from '@lens-protocol/api-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import {
  CreateMirrorRequest,
  ICreateMirrorCallGateway,
} from '@lens-protocol/domain/use-cases/publications';
import {
  RelayError,
  RelayErrorReason,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import { RelayReceipt } from '../RelayReceipt';

export class CreateMirrorCallGateway implements ICreateMirrorCallGateway {
  constructor(
    private readonly apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
  ) {}

  async createDelegatedTransaction<T extends CreateMirrorRequest>(
    request: T,
  ): PromiseResult<NativeTransaction<T>, RelayError> {
    const result = await this.broadcast(await this.resolveCreateMirrorRequestArg(request));

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
    request: CreateMirrorRequest,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<CreateMirrorRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreateMirrorTypedDataData,
      CreateMirrorTypedDataVariables
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

  private async broadcast(
    requestArgs: CreateMirrorRequestArg,
  ): PromiseResult<RelayReceipt, RelayError> {
    const { data } = await this.apolloClient.mutate<
      CreateMirrorViaDispatcherData,
      CreateMirrorViaDispatcherVariables
    >({
      mutation: CreateMirrorViaDispatcherDocument,
      variables: {
        request: requestArgs,
      },
    });

    if (data.result.__typename === 'RelayError') {
      if (data.result.reason === RelayErrorReasons.Rejected) {
        return failure(new RelayError(RelayErrorReason.REJECTED));
      }
      return failure(new RelayError(RelayErrorReason.UNSPECIFIED));
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
