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
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { UpdateProfileImageRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IOnChainProtocolCallGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from './ITransactionFactory';
import { Data, SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';
import { handleRelayError, OnChainBroadcastReceipt } from './relayer';

export class ProfileImageCallGateway
  implements
    IDelegatedTransactionGateway<UpdateProfileImageRequest>,
    IOnChainProtocolCallGateway<UpdateProfileImageRequest>
{
  constructor(
    private apolloClient: LensApolloClient,
    private readonly transactionFactory: ITransactionFactory<UpdateProfileImageRequest>,
  ) {}

  async createDelegatedTransaction(
    request: UpdateProfileImageRequest,
  ): PromiseResult<NativeTransaction<UpdateProfileImageRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

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
  ): Promise<UnsignedProtocolCall<UpdateProfileImageRequest>> {
    const requestArg = this.resolveMutationRequestArg(request);

    const data = await this.createTypedData(requestArg, nonce);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  private async broadcast(
    request: UpdateProfileImageRequest,
  ): PromiseResult<OnChainBroadcastReceipt, BroadcastingError> {
    const requestArg = this.resolveMutationRequestArg(request);

    const { data } = await this.apolloClient.mutate<
      CreateSetProfileImageUriViaDispatcherData,
      CreateSetProfileImageUriViaDispatcherVariables
    >({
      mutation: CreateSetProfileImageUriViaDispatcherDocument,
      variables: {
        request: requestArg,
      },
    });

    if (data.result.__typename === 'RelayError') {
      const typedData = await this.createTypedData(requestArg);
      const fallback = this.createRequestFallback(request, typedData);

      return handleRelayError(data.result, fallback);
    }

    return success({
      indexingId: data.result.txId,
      txHash: data.result.txHash,
    });
  }

  private async createTypedData(
    requestArg: UpdateProfileImageRequestArgs,
    nonce?: Nonce,
  ): Promise<CreateSetProfileImageUriTypedDataData> {
    const { data } = await this.apolloClient.mutate<
      CreateSetProfileImageUriTypedDataData,
      CreateSetProfileImageUriTypedDataVariables
    >({
      mutation: CreateSetProfileImageUriTypedDataDocument,
      variables: {
        request: requestArg,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data;
  }

  private resolveMutationRequestArg(
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

  private createRequestFallback(
    request: UpdateProfileImageRequest,
    data: CreateSetProfileImageUriTypedDataData,
  ): SelfFundedProtocolTransactionRequest<UpdateProfileImageRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setProfileImageURI', [
      data.result.typedData.value.profileId,
      data.result.typedData.value.imageURI,
    ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
