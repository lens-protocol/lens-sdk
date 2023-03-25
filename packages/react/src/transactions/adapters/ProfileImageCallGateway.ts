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
} from '@lens-protocol/api-bindings';
import {
  NativeTransaction,
  Nonce,
  TransactionError,
  TransactionErrorReason,
} from '@lens-protocol/domain/entities';
import {
  IProfileImageCallGateway,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedLensProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { AsyncRelayReceipt, ITransactionFactory } from './ITransactionFactory';

export class ProfileImageCallGateway implements IProfileImageCallGateway {
  constructor(
    private apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
  ) {}

  async createDelegatedTransaction(
    request: UpdateProfileImageRequest,
  ): Promise<NativeTransaction<UpdateProfileImageRequest>> {
    return this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      asyncRelayReceipt: this.initiateProfileImageUpdate(this.resolveMutationRequest(request)),
    });
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

  private async initiateProfileImageUpdate(
    requestArgs: UpdateProfileImageRequestArgs,
  ): AsyncRelayReceipt {
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
      return failure(new TransactionError(TransactionErrorReason.REJECTED));
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
