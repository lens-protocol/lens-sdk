import {
  CreateSetProfileImageUriTypedDataDocument,
  CreateSetProfileImageUriTypedDataData,
  CreateSetProfileImageUriTypedDataVariables,
  CreateSetProfileImageUriViaDispatcherDocument,
  CreateSetProfileImageUriViaDispatcherData,
  CreateSetProfileImageUriViaDispatcherVariables,
  omitTypename,
  UpdateProfileImageRequest as UpdateProfileImageRequestArgs,
  LensApolloClient,
  RelayErrorReasons,
} from '@lens-protocol/api-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import {
  IProfileImageCallGateway,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  BroadcastingErrorReason,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from './ITransactionFactory';
import { RelayReceipt } from './RelayReceipt';

export class ProfileImageCallGateway implements IProfileImageCallGateway {
  constructor(
    private apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
  ) {}

  async createDelegatedTransaction(
    request: UpdateProfileImageRequest,
  ): PromiseResult<NativeTransaction<UpdateProfileImageRequest>, BroadcastingError> {
    const result = await this.broadcast(this.resolveMutationRequest(request));

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
    request: UpdateProfileImageRequest,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<UpdateProfileImageRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreateSetProfileImageUriTypedDataData,
      CreateSetProfileImageUriTypedDataVariables
    >({
      mutation: CreateSetProfileImageUriTypedDataDocument,
      variables: {
        request: this.resolveMutationRequest(request),
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
    requestArgs: UpdateProfileImageRequestArgs,
  ): PromiseResult<RelayReceipt, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<
      CreateSetProfileImageUriViaDispatcherData,
      CreateSetProfileImageUriViaDispatcherVariables
    >({
      mutation: CreateSetProfileImageUriViaDispatcherDocument,
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

  private resolveMutationRequest(
    request: UpdateProfileImageRequest,
  ): UpdateProfileImageRequestArgs {
    if ('signature' in request) {
      return {
        profileId: request.profileId,
        nftData: {
          id: request.signature.id,
          signature: request.signature.signature,
        },
      };
    }
    return {
      profileId: request.profileId,
      url: request.url,
    };
  }
}
