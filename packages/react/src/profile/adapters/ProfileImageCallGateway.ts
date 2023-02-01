import {
  CreateSetProfileImageUriTypedDataDocument,
  CreateSetProfileImageUriTypedDataMutation,
  CreateSetProfileImageUriTypedDataMutationVariables,
  CreateSetProfileImageUriViaDispatcherDocument,
  CreateSetProfileImageUriViaDispatcherMutation,
  CreateSetProfileImageUriViaDispatcherMutationVariables,
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
import { ChainType, failure, invariant, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import {
  AsyncRelayReceipt,
  ITransactionFactory,
} from '../../transactions/adapters/ITransactionFactory';
import { UnsignedLensProtocolCall } from '../../wallet/adapters/ConcreteWallet';

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
      CreateSetProfileImageUriTypedDataMutation,
      CreateSetProfileImageUriTypedDataMutationVariables
    >({
      mutation: CreateSetProfileImageUriTypedDataDocument,
      variables: {
        request: this.resolveMutationRequest(request),
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    invariant(data, 'Cannot set profile image uri');

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
      CreateSetProfileImageUriViaDispatcherMutation,
      CreateSetProfileImageUriViaDispatcherMutationVariables
    >({
      mutation: CreateSetProfileImageUriViaDispatcherDocument,
      variables: {
        request: requestArgs,
      },
    });

    invariant(data, 'Cannot update profile image via dispatcher');

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
